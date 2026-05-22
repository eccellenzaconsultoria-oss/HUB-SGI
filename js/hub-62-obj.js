// Hub SGI — hub-62-obj.js
// MÓDULO 6.2 — OBJETIVOS E METAS
// ═══════════════════════════════════════════════════════════════════

// Estado global dos objetivos
if (!S.objectives) S.objectives = [];

var objFilter = 'all';
var objEditIdx = null;
var tempPAItems = [];

// ── Cores por norma e prioridade ────────────────────────────────
var OBJ_NORM_COLOR = { env:'#1D9E75', sst:'#185FA5', both:'#533AB7' };
var OBJ_PRIO_COLOR = { critica:'#A32D2D', alta:'#BA7517', media:'#185FA5', baixa:'#5F5E5A' };
var OBJ_PRIO_LABEL = { critica:'🔴 Crítica', alta:'🟡 Alta', media:'🔵 Média', baixa:'⚪ Baixa' };
var OBJ_NORM_LABEL = { env:'🌿 ISO 14001', sst:'⛑️ ISO 45001', both:'🌿+⛑️ Ambas' };

// ── Calcula status do objetivo ───────────────────────────────────
function calcObjStatus(obj) {
  var today = new Date().toISOString().slice(0,10);
  var done  = (obj.pas||[]).filter(function(p){return p.done;}).length;
  var total = (obj.pas||[]).length;
  var pct   = total ? Math.round(done/total*100) : 0;
  if (pct === 100) return {status:'concluido', pct:100, color:'#1D9E75'};
  if (obj.deadline && obj.deadline < today) return {status:'atrasado', pct:pct, color:'#A32D2D'};
  return {status:'aberto', pct:pct, color:'#185FA5'};
}

// ── Renderiza lista de objetivos ─────────────────────────────────
function renderObj() {
  updateObjStats();
  updateObjNavBadge();
  checkROSuggestions();

  var items = objFilter === 'all'
    ? S.objectives
    : S.objectives.filter(function(o){ return calcObjStatus(o).status === objFilter; });

  var el = document.getElementById('obj-list');
  if (!items.length) {
    el.innerHTML = '<div class="empty">'
      + (objFilter==='all'
          ? 'Nenhum objetivo cadastrado. Use "+ Novo objetivo" ou importe dos Riscos & Oportunidades.'
          : 'Nenhum objetivo com status "'+objFilter+'".')
      + '</div>';
    return;
  }

  el.innerHTML = items.map(function(obj) {
    var realIdx = S.objectives.indexOf(obj);
    var st = calcObjStatus(obj);
    var nc = OBJ_NORM_COLOR[obj.norm||'both'];
    var pc = OBJ_PRIO_COLOR[obj.priority||'media'];
    var done = (obj.pas||[]).filter(function(p){return p.done;}).length;
    var total = (obj.pas||[]).length;

    // R&O vinculado
    var roLinked = obj.roLink ? S.roItems.find(function(r,i){return i===obj.roLink;}) : null;
    var roTag = roLinked
      ? '<span class="ro-link-tag" style="border-color:'+pc+';color:'+pc+'">⛓ '+esc(roLinked.desc.substring(0,50))+(roLinked.desc.length>50?'…':'')+'</span>'
      : '';

    // Status badge
    var stBadge = st.status==='concluido'
      ? '<span class="sig sig-low">✅ Concluído</span>'
      : st.status==='atrasado'
        ? '<span class="sig sig-crit">🔴 Atrasado</span>'
        : '<span class="sig sig-med">🔵 Em andamento</span>';

    return '<div class="obj-card'+(obj._open?' expanded':'')+'" id="objcard-'+realIdx+'">'
      // Header clicável
      +'<div class="obj-header" onclick="toggleObj('+realIdx+')">'
      +'<div class="obj-num" style="background:'+nc+'">'+OBJ_NORM_LABEL[obj.norm||'both'].slice(0,2)+'</div>'
      +'<div style="flex:1;min-width:0">'
      +'<div class="obj-title">'+esc(obj.desc)+'</div>'
      +'<div class="obj-meta">'
      +stBadge
      +'<span style="font-size:10px;padding:2px 8px;border-radius:20px;background:'+pc+'22;color:'+pc+';border:1px solid '+pc+'44">'+OBJ_PRIO_LABEL[obj.priority||'media']+'</span>'
      +(obj.owner?'<span>👤 '+esc(obj.owner)+'</span>':'')
      +(obj.deadline?'<span>📅 '+obj.deadline.split('-').reverse().join('/')+'</span>':'')
      +(total?'<span>📋 '+done+'/'+total+' etapas</span>':'')
      +'</div>'
      // Barra de progresso inline
      +'<div class="prog-wrap" style="display:flex;align-items:center;gap:8px">'
      +'<div class="prog-bar-obj" style="flex:1"><div class="prog-fill-obj" style="width:'+st.pct+'%;background:'+st.color+'"></div></div>'
      +'<span class="prog-pct" style="color:'+st.color+'">'+st.pct+'%</span>'
      +'</div>'
      +(roTag?'<div style="margin-top:4px">'+roTag+'</div>':'')
      +'</div>'
      // Botões de ação
      +'<div style="display:flex;gap:6px;flex-shrink:0;align-items:flex-start">'
      +'<button onclick="event.stopPropagation();editObj('+realIdx+')" class="btn btn-sm" title="Editar">✏️</button>'
      +'<button onclick="event.stopPropagation();removeObj('+realIdx+')" style="background:none;border:none;cursor:pointer;font-size:16px;color:var(--text2)" title="Remover">×</button>'
      +'</div></div>'
      // Corpo expandível
      +'<div class="obj-body">'
      +renderObjBody(obj, realIdx)
      +'</div>'
      +'</div>';
  }).join('');
}

function renderObjBody(obj, idx) {
  var pas = obj.pas || [];
  var today = new Date().toISOString().slice(0,10);

  var paRows = pas.map(function(pa, j) {
    var over = !pa.done && pa.prazo && pa.prazo < today;
    return '<div class="pa-row'+(pa.done?' done':'')+'" style="'+(over?'border-left:3px solid var(--red)':'')+'">'
      +'<label style="margin:0;display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px">'
      +'<input type="checkbox" '+(pa.done?'checked':'')+' onchange="togglePA('+idx+','+j+',this.checked)">'
      +'<span>'+esc(pa.desc)+'</span></label>'
      +'<span style="font-size:11px;color:var(--text2)">👤 '+esc(pa.resp||'—')+'</span>'
      +'<span style="font-size:11px;color:'+(over?'var(--red)':'var(--text2)')+'">📅 '+(pa.prazo?pa.prazo.split('-').reverse().join('/'):'—')+'</span>'
      +'<button onclick="removePAItem('+idx+','+j+')" style="background:none;border:none;cursor:pointer;font-size:13px;color:var(--text2)">×</button>'
      +'</div>';
  }).join('');

  return '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:14px">'
    +'<div><span style="font-size:11px;color:var(--text2)">KPI / Indicador</span><div style="font-size:13px;font-weight:500;margin-top:2px">'+esc(obj.kpi||'—')+'</div></div>'
    +'<div><span style="font-size:11px;color:var(--text2)">Linha de base</span><div style="font-size:13px;font-weight:500;margin-top:2px">'+esc(obj.baseline||'—')+'</div></div>'
    +'<div><span style="font-size:11px;color:var(--text2)">Meta</span><div style="font-size:13px;font-weight:600;color:var(--green-d);margin-top:2px">'+esc(obj.target||'—')+'</div></div>'
    +'</div>'
    +(obj.resources?'<div style="font-size:12px;color:var(--text2);margin-bottom:12px">💰 Recursos: '+esc(obj.resources)+'</div>':'')
    +'<div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:8px">📋 Plano de ação</div>'
    +(paRows||'<div style="font-size:12px;color:var(--text3);font-style:italic;margin-bottom:8px">Nenhuma etapa cadastrada.</div>')
    // Adicionar etapa rápida inline
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;margin-top:8px">'
    +'<input type="text" id="qi-desc-'+idx+'" placeholder="Etapa..." style="font-size:12px">'
    +'<input type="text" id="qi-resp-'+idx+'" placeholder="Responsável..." style="font-size:12px">'
    +'<input type="date" id="qi-prazo-'+idx+'" style="font-size:12px">'
    +'<button class="btn btn-sm btn-g" onclick="quickAddPA('+idx+')">+</button>'
    +'</div>'
    // Atualização de progresso manual
    +'<div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--gray-b);display:flex;align-items:center;gap:12px">'
    +'<div style="flex:1"><label style="font-size:11px">Atualização de progresso (%)</label>'
    +'<input type="range" min="0" max="100" value="'+(obj.manualPct||calcObjStatus(obj).pct)+'" '
    +'oninput="updateObjPct('+idx+',this.value)" style="width:100%"></div>'
    +'<div style="text-align:center;min-width:50px"><div style="font-size:20px;font-weight:700;color:var(--green-d)" id="pct-display-'+idx+'">'+(obj.manualPct||calcObjStatus(obj).pct)+'%</div></div>'
    +'<div><label style="font-size:11px">Notas de atualização</label>'
    +'<input type="text" id="obj-note-'+idx+'" value="'+esc(obj.lastNote||'')+'" placeholder="Ex.: Monitoramento realizado em..." style="font-size:12px;width:200px"></div>'
    +'<button class="btn btn-sm btn-g" onclick="saveObjNote('+idx+')">💾 Salvar</button>'
    +'</div>';
}

function toggleObj(i) {
  S.objectives[i]._open = !S.objectives[i]._open;
  renderObj();
  if (S.objectives[i]._open) {
    setTimeout(function(){
      var el = document.getElementById('objcard-'+i);
      if(el) el.scrollIntoView({behavior:'smooth', block:'nearest'});
    }, 50);
  }
}

function togglePA(objIdx, paIdx, checked) {
  S.objectives[objIdx].pas[paIdx].done = checked;
  if (checked) S.objectives[objIdx].pas[paIdx].doneAt = new Date().toISOString().slice(0,10);
  S.objectives[objIdx]._open = true;
  renderObj();
}

function removePAItem(objIdx, paIdx) {
  S.objectives[objIdx].pas.splice(paIdx, 1);
  S.objectives[objIdx]._open = true;
  renderObj();
}

function quickAddPA(objIdx) {
  var desc  = document.getElementById('qi-desc-'+objIdx).value.trim();
  if (!desc) return;
  var resp  = document.getElementById('qi-resp-'+objIdx).value.trim();
  var prazo = document.getElementById('qi-prazo-'+objIdx).value;
  if (!S.objectives[objIdx].pas) S.objectives[objIdx].pas = [];
  S.objectives[objIdx].pas.push({desc:desc, resp:resp, prazo:prazo, done:false});
  S.objectives[objIdx]._open = true;
  renderObj();
}

function updateObjPct(objIdx, val) {
  var el = document.getElementById('pct-display-'+objIdx);
  if (el) el.textContent = val + '%';
  S.objectives[objIdx].manualPct = parseInt(val);
}

function saveObjNote(objIdx) {
  var note = document.getElementById('obj-note-'+objIdx);
  if (note) S.objectives[objIdx].lastNote = note.value;
  S.objectives[objIdx]._open = true;
  renderObj();
}

function removeObj(i) {
  if (!confirm('Remover o objetivo "'+S.objectives[i].desc+'"?')) return;
  S.objectives.splice(i, 1);
  renderObj();
}

function editObj(i) {
  objEditIdx = i;
  var obj = S.objectives[i];
  document.getElementById('obj-modal-title').textContent = '✏️ Editar Objetivo';
  document.getElementById('obj-desc').value      = obj.desc||'';
  document.getElementById('obj-norm').value      = obj.norm||'both';
  document.getElementById('obj-kpi').value       = obj.kpi||'';
  document.getElementById('obj-unit').value      = obj.unit||'';
  document.getElementById('obj-baseline').value  = obj.baseline||'';
  document.getElementById('obj-target').value    = obj.target||'';
  document.getElementById('obj-deadline').value  = obj.deadline||'';
  document.getElementById('obj-owner').value     = obj.owner||'';
  document.getElementById('obj-resources').value = obj.resources||'';
  document.getElementById('obj-priority').value  = obj.priority||'media';
  tempPAItems = JSON.parse(JSON.stringify(obj.pas||[]));
  renderTempPA();
  populateROSelect(obj.roLink);
  openMod('obj-modal');
}

// ── Modal: abrir novo objetivo ───────────────────────────────────
function openObjModal() {
  objEditIdx = null;
  document.getElementById('obj-modal-title').textContent = '➕ Novo Objetivo e Meta';
  ['obj-desc','obj-kpi','obj-unit','obj-baseline','obj-target','obj-owner','obj-resources'].forEach(function(id){
    document.getElementById(id).value = '';
  });
  document.getElementById('obj-deadline').value = '';
  document.getElementById('obj-norm').value = 'both';
  document.getElementById('obj-priority').value = 'media';
  tempPAItems = [];
  renderTempPA();
  populateROSelect(null);
  openMod('obj-modal');
}

function populateROSelect(selectedIdx) {
  var sel = document.getElementById('obj-ro-link');
  sel.innerHTML = '<option value="">— Sem vínculo direto —</option>';
  S.roItems.forEach(function(r, i) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = (r.type==='risk'?'⚠️':'🎯')+' '+r.desc.substring(0,70)+(r.desc.length>70?'…':'');
    if (selectedIdx !== null && selectedIdx !== undefined && parseInt(selectedIdx) === i) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.onchange = function() {
    var ctx = document.getElementById('obj-ro-context');
    if (sel.value !== '') {
      var r = S.roItems[parseInt(sel.value)];
      ctx.textContent = 'Score: '+r.score+' — '+{low:'Baixo',med:'Médio',high:'Alto',crit:'Crítico'}[r.cls]+' | Fonte: '+(r.src||'—');
    } else { ctx.textContent = ''; }
  };
}

function renderTempPA() {
  var el = document.getElementById('obj-pa-list');
  if (!el) return;
  el.innerHTML = tempPAItems.map(function(pa, i) {
    return '<div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;padding:7px 10px;background:var(--gray-l);border-radius:6px;margin-bottom:5px;font-size:12px;align-items:center">'
      +'<span>'+esc(pa.desc)+'</span>'
      +'<span>👤 '+esc(pa.resp||'—')+'</span>'
      +'<span>📅 '+(pa.prazo?pa.prazo.split('-').reverse().join('/'):'—')+'</span>'
      +'<button onclick="tempPAItems.splice('+i+',1);renderTempPA()" style="background:none;border:none;cursor:pointer;font-size:14px;color:var(--text2)">×</button>'
      +'</div>';
  }).join('') || '<div style="font-size:12px;color:var(--text3);font-style:italic;margin-bottom:6px">Nenhuma etapa adicionada.</div>';
}

function addPAItem() {
  var desc  = document.getElementById('pa-new-desc').value.trim();
  if (!desc) return;
  var resp  = document.getElementById('pa-new-resp').value.trim();
  var prazo = document.getElementById('pa-new-prazo').value;
  tempPAItems.push({desc:desc, resp:resp, prazo:prazo, done:false});
  document.getElementById('pa-new-desc').value  = '';
  document.getElementById('pa-new-resp').value  = '';
  document.getElementById('pa-new-prazo').value = '';
  renderTempPA();
  document.getElementById('pa-new-desc').focus();
}

function saveObj() {
  var desc = document.getElementById('obj-desc').value.trim();
  if (!desc) { alert('Informe a descrição do objetivo.'); return; }
  var roVal = document.getElementById('obj-ro-link').value;
  var obj = {
    desc:     desc,
    norm:     document.getElementById('obj-norm').value,
    kpi:      document.getElementById('obj-kpi').value.trim(),
    unit:     document.getElementById('obj-unit').value.trim(),
    baseline: document.getElementById('obj-baseline').value.trim(),
    target:   document.getElementById('obj-target').value.trim(),
    deadline: document.getElementById('obj-deadline').value,
    owner:    document.getElementById('obj-owner').value.trim(),
    resources:document.getElementById('obj-resources').value.trim(),
    priority: document.getElementById('obj-priority').value,
    roLink:   roVal !== '' ? parseInt(roVal) : null,
    pas:      JSON.parse(JSON.stringify(tempPAItems)),
    createdAt:new Date().toISOString().slice(0,10),
    _open:    true
  };
  if (objEditIdx !== null) {
    obj._open = S.objectives[objEditIdx]._open;
    S.objectives[objEditIdx] = obj;
  } else {
    S.objectives.push(obj);
  }
  closeMod('obj-modal');
  renderObj();
}

// ── Filtros ──────────────────────────────────────────────────────
function filterObj(f) {
  objFilter = f;
  ['all','open','risk','done'].forEach(function(x){
    var btn=document.getElementById('of-'+x);
    if(btn){btn.style.background='';btn.style.color='';btn.style.borderColor='';}
  });
  var activeId = f==='aberto'?'of-open':f==='atrasado'?'of-risk':f==='concluido'?'of-done':'of-all';
  var btn = document.getElementById(activeId);
  if(btn){btn.style.background='var(--green)';btn.style.color='#fff';btn.style.borderColor='var(--green)';}
  renderObj();
}

// ── Estatísticas ─────────────────────────────────────────────────
function updateObjStats() {
  var total   = S.objectives.length;
  var conc    = S.objectives.filter(function(o){return calcObjStatus(o).status==='concluido';}).length;
  var atras   = S.objectives.filter(function(o){return calcObjStatus(o).status==='atrasado';}).length;
  var aberto  = S.objectives.filter(function(o){return calcObjStatus(o).status==='aberto';}).length;
  var avgPct  = total ? Math.round(S.objectives.reduce(function(acc,o){return acc+calcObjStatus(o).pct;},0)/total) : 0;

  var el = document.getElementById('obj-stats');
  if (!el) return;
  el.innerHTML = [
    {v:total,  l:'Total de objetivos',  e:'🎯', c:'var(--white)'},
    {v:aberto, l:'Em andamento',         e:'🔵', c:'var(--blue-l)'},
    {v:atras,  l:'Atrasados',            e:'🔴', c:'var(--red-l)'},
    {v:conc,   l:'Concluídos',           e:'✅', c:'#e8f5ef'},
    {v:avgPct+'%', l:'Progresso médio',  e:'📈', c:'var(--amber-l)'},
  ].map(function(c){
    return '<div class="obj-stat" style="background:'+c.c+'">'
      +'<div style="font-size:18px;margin-bottom:3px">'+c.e+'</div>'
      +'<div class="obj-stat-v">'+c.v+'</div>'
      +'<div class="obj-stat-l">'+c.l+'</div>'
      +'</div>';
  }).join('');
}

function updateObjNavBadge() {
  var badge = document.getElementById('obj-nav-badge');
  if (!badge) return;
  var atras = S.objectives.filter(function(o){return calcObjStatus(o).status==='atrasado';}).length;
  var total = S.objectives.length;
  badge.textContent = total;
  badge.style.background = atras>0 ? 'var(--red-l)' : total>0 ? 'var(--amber-l)' : 'var(--gray-l)';
  badge.style.color      = atras>0 ? 'var(--red)'   : total>0 ? 'var(--amber-d)' : 'var(--text2)';
}

// ── Importar R&O como Objetivos ──────────────────────────────────
var selectedROforImport = [];

function checkROSuggestions() {
  var panel = document.getElementById('obj-ro-suggest');
  var list  = document.getElementById('obj-ro-list');
  if (!panel || !list) return;

  // R&O alto/crítico que ainda não têm objetivo vinculado
  var linked = S.objectives.map(function(o){return o.roLink;}).filter(function(x){return x!==null&&x!==undefined;});
  var candidates = S.roItems.filter(function(r, i){
    return (r.cls==='high'||r.cls==='crit') && linked.indexOf(i)===-1;
  });

  if (!candidates.length) { panel.style.display='none'; return; }
  panel.style.display = 'block';
  selectedROforImport = candidates.map(function(r){return S.roItems.indexOf(r);});

  list.innerHTML = candidates.map(function(r, i){
    var ri = S.roItems.indexOf(r);
    var tc = r.type==='risk'?'var(--red)':'var(--green-d)';
    return '<label style="display:flex;align-items:center;gap:8px;margin-bottom:6px;cursor:pointer;font-size:12px">'
      +'<input type="checkbox" checked onchange="toggleROImport('+ri+',this.checked)">'
      +'<span style="font-weight:500;color:'+tc+'">'+(r.type==='risk'?'⚠️':'🎯')+' '+esc(r.desc)+'</span>'
      +'<span class="sig sig-crit" style="font-size:10px">Score '+r.score+'</span>'
      +'</label>';
  }).join('');
}

function toggleROImport(ri, checked) {
  if (checked) { if(selectedROforImport.indexOf(ri)===-1) selectedROforImport.push(ri); }
  else { selectedROforImport = selectedROforImport.filter(function(x){return x!==ri;}); }
}

function importROasObj() {
  if (!selectedROforImport.length) { alert('Selecione ao menos um item.'); return; }
  selectedROforImport.forEach(function(ri) {
    var r = S.roItems[ri];
    if (!r) return;
    S.objectives.push({
      desc:     (r.type==='risk'?'Tratar risco: ':'Aproveitar oportunidade: ') + r.desc,
      norm:     r.norm || 'both',
      kpi:      '',
      target:   '',
      baseline: '',
      unit:     '',
      deadline: '',
      owner:    '',
      resources:'',
      priority: r.cls==='crit'?'critica':r.cls==='high'?'alta':'media',
      roLink:   ri,
      pas:      [],
      createdAt:new Date().toISOString().slice(0,10),
      _open:    false,
      autoGen:  true
    });
  });
  document.getElementById('obj-ro-suggest').style.display = 'none';
  renderObj();
  alert(selectedROforImport.length + ' objetivo(s) criado(s) a partir dos Riscos & Oportunidades. Complete o KPI, meta e plano de ação de cada um.');
}

// ── Help content 6.2 ─────────────────────────────────────────────
HELP_CONTENT['s7'] = {
  title: '🎯 Orientações — Cláusula 6.2: Objetivos e Metas',
  body: `
    <h4>O que a norma exige?</h4>
    <p>A ISO 14001 §6.2 e a ISO 45001 §6.2 estabelecem que os objetivos do SGI devem ser:</p>
    <ul>
      <li><strong>Consistentes</strong> com a política ambiental/SST</li>
      <li><strong>Mensuráveis</strong> (ou avaliáveis) — precisam de um indicador</li>
      <li><strong>Monitorados</strong> — progresso acompanhado periodicamente</li>
      <li><strong>Comunicados</strong> — as pessoas relevantes sabem que existem</li>
      <li><strong>Atualizados</strong> conforme apropriado</li>
    </ul>

    <h4>Vinculação com Riscos & Oportunidades</h4>
    <p>Todo objetivo deve nascer de algum lugar — preferencialmente dos <strong>riscos e oportunidades identificados na cláusula 6.1.1</strong>. Um auditor vai perguntar: <em>"De onde veio esse objetivo?"</em></p>
    <div class="ex">Risco: "Não conformidade com novos limites de efluentes" → Objetivo: "Adequar o sistema de tratamento de efluentes para atender aos novos limites da resolução CONAMA até jun/2026"</div>
    <div class="ex">Oportunidade: "Demanda de clientes por fornecedores certificados" → Objetivo: "Obter certificação ISO 14001 até dez/2026"</div>

    <h4>Plano de ação (§6.2.2)</h4>
    <p>Para cada objetivo, a norma exige um plano com:</p>
    <ul>
      <li>O que será feito (etapas)</li>
      <li>Quais recursos serão necessários</li>
      <li>Quem será responsável</li>
      <li>Quando será concluído</li>
      <li>Como os resultados serão avaliados</li>
    </ul>
    <div class="warn">⚠️ Objetivo sem plano de ação é não conformidade. O auditor vai perguntar: "Como vocês pretendem atingir essa meta?"</div>

    <h4>KPI e linha de base</h4>
    <p>Sem indicador, não há como saber se o objetivo foi atingido. A <strong>linha de base</strong> é o valor atual — de onde você parte. A <strong>meta</strong> é onde quer chegar. A diferença entre os dois define o <strong>desafio</strong>.</p>
    <div class="ex">Linha de base: 450 kg/mês de resíduo perigoso gerado → Meta: 315 kg/mês → Redução de 30% até dez/2026</div>
  `
};

// ── Sugestões rápidas de fatores ────────────────────────────────
function suggestFactor(kind, desc, type, norm) {
  document.getElementById(kind+'-desc').value = desc;
  document.getElementById(kind+'-type').value = type;
  document.getElementById(kind+'-norm').value = norm;
  document.getElementById(kind+'-rel').value  = 'sim';
  // Destaca o campo para o usuário perceber
  var el = document.getElementById(kind+'-desc');
  el.style.borderColor = 'var(--green)';
  el.style.boxShadow   = '0 0 0 3px rgba(29,158,117,.15)';
  el.focus();
  setTimeout(function(){ el.style.borderColor=''; el.style.boxShadow=''; }, 1800);
}

// INIT
renderFactors(); updateSWOT();
renderPI();
renderAP(); filterAP('all');
buildMatrix(); renderRO();

