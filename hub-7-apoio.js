// Hub SGI — hub-7-apoio.js
// MÓDULO 7 — APOIO (7.2 Competências · 7.3/7.4 Treinamentos · 7.5 Docs)
// ═══════════════════════════════════════════════════════════════════

// Estado global
if (!S.apoio) S.apoio = {
  funcoes:    [],   // {id, nome, descricao}
  requisitos: [],   // {id, nome, norma, clausula}
  colaboradores: [],// {id, nome, funcaoId, matriz:{reqId: status}}
  treinamentos:  [],
  documentos:    []
};

var apoioCompModalMode = 'func';
var apoioTrainEditIdx  = null;
var apoioDocEditIdx    = null;
var apoioTrainFilter   = 'all';
var apoioDocFilter     = 'all';

// ── Inicialização ────────────────────────────────────────────────
function initApoio() {
  renderCompMatrix();
  renderTrainList();
  renderDocList();
  updateTrainStats();
  updateDocStats();
  renderTrainCalendar();
}

function switchApoio(sub) {
  document.querySelectorAll('.apoio-sub').forEach(function(el){ el.classList.remove('on'); });
  document.querySelectorAll('.apoio-tab').forEach(function(el){ el.classList.remove('on'); });
  document.getElementById(sub).classList.add('on');
  var tabs = document.querySelectorAll('.apoio-tab');
  var map  = {a72:0, a734:1, a75:2};
  if (tabs[map[sub]]) tabs[map[sub]].classList.add('on');
}

// ═══════════════════════════════════════════════════════════════════
// 7.2 — MATRIZ DE COMPETÊNCIAS
// ═══════════════════════════════════════════════════════════════════
var STATUS_CYCLE = ['ok','plan','gap','na'];
var STATUS_ICON  = {ok:'✅', plan:'⚠️', gap:'❌', na:'—'};
var STATUS_CSS   = {ok:'cc-ok', plan:'cc-plan', gap:'cc-gap', na:'cc-na'};
var STATUS_LBL   = {ok:'Qualificado', plan:'Trein. planejado', gap:'Gap de competência', na:'Não aplicável'};

function openCompModal(mode) {
  apoioCompModalMode = mode;
  var titles = {func:'Nova Função / Cargo', req:'Novo Requisito de Competência', add:'Novo Colaborador'};
  document.getElementById('comp-modal-title').textContent = titles[mode];
  var body = '';
  if (mode === 'func') {
    body = '<label>Nome da função / cargo</label>'
      + '<input type="text" id="cm-func-name" placeholder="Ex.: Técnico de Segurança do Trabalho">'
      + '<label>Descrição (opcional)</label>'
      + '<input type="text" id="cm-func-desc" placeholder="Ex.: Responsável pelo PGR e PPRA">';
  } else if (mode === 'req') {
    body = '<label>Requisito de competência</label>'
      + '<input type="text" id="cm-req-name" placeholder="Ex.: Conhecimento em NR-12 — Segurança em Máquinas">'
      + '<div class="row"><div><label>Norma</label>'
      + '<select id="cm-req-norm"><option value="both">Ambas</option><option value="env">ISO 14001</option><option value="sst">ISO 45001</option></select></div>'
      + '<div><label>Cláusula</label><input type="text" id="cm-req-clause" placeholder="Ex.: 7.2 / NR-12"></div></div>';
  } else {
    body = '<label>Nome do colaborador</label>'
      + '<input type="text" id="cm-col-name" placeholder="Ex.: João da Silva">'
      + '<label>Função / Cargo</label>'
      + '<select id="cm-col-func">'
      + (S.apoio.funcoes.length
          ? S.apoio.funcoes.map(function(f){return '<option value="'+f.id+'">'+esc(f.nome)+'</option>';}).join('')
          : '<option value="">Cadastre uma função primeiro</option>')
      + '</select>';
  }
  document.getElementById('comp-modal-body').innerHTML = body;
  openMod('comp-modal');
}

function saveCompEntry() {
  var mode = apoioCompModalMode;
  if (mode === 'func') {
    var nome = document.getElementById('cm-func-name').value.trim();
    if (!nome) { alert('Informe o nome da função.'); return; }
    S.apoio.funcoes.push({id:'f'+Date.now(), nome:nome, desc:(document.getElementById('cm-func-desc')||{}).value||''});
  } else if (mode === 'req') {
    var nome = document.getElementById('cm-req-name').value.trim();
    if (!nome) { alert('Informe o requisito.'); return; }
    S.apoio.requisitos.push({id:'r'+Date.now(), nome:nome,
      norma:document.getElementById('cm-req-norm').value,
      clausula:(document.getElementById('cm-req-clause')||{}).value||''});
  } else {
    var nome = document.getElementById('cm-col-name').value.trim();
    var funcId = document.getElementById('cm-col-func').value;
    if (!nome) { alert('Informe o nome do colaborador.'); return; }
    var matriz = {};
    S.apoio.requisitos.forEach(function(r){ matriz[r.id] = 'na'; });
    S.apoio.colaboradores.push({id:'c'+Date.now(), nome:nome, funcaoId:funcId, matriz:matriz});
  }
  closeMod('comp-modal');
  renderCompMatrix();
}

function cycleCell(colId, reqId) {
  var col = S.apoio.colaboradores.find(function(c){ return c.id === colId; });
  if (!col) return;
  if (!col.matriz) col.matriz = {};
  var cur = col.matriz[reqId] || 'na';
  var idx = STATUS_CYCLE.indexOf(cur);
  col.matriz[reqId] = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
  renderCompMatrix();
}

function renderCompMatrix() {
  var head  = document.getElementById('comp-matrix-head');
  var body  = document.getElementById('comp-matrix-body');
  var empty = document.getElementById('comp-empty');
  var gaps  = document.getElementById('comp-gaps');
  var ap    = S.apoio;

  if (!ap.colaboradores.length && !ap.funcoes.length) {
    if(head) head.innerHTML = '';
    if(body) body.innerHTML = '';
    if(empty) empty.style.display = 'block';
    if(gaps) gaps.innerHTML = '';
    return;
  }
  if(empty) empty.style.display = 'none';

  // Cabeçalho
  var thHtml = '<tr><th class="func-col">Colaborador / Função</th>';
  ap.requisitos.forEach(function(r){
    thHtml += '<th title="'+esc(r.clausula)+'" style="max-width:120px;font-size:10px">'
      + esc(r.nome.length>30 ? r.nome.substring(0,28)+'…' : r.nome) + '</th>';
  });
  thHtml += '<th>Gaps</th></tr>';
  if(head) head.innerHTML = thHtml;

  // Corpo
  var gapTotal = 0;
  var trHtml = ap.colaboradores.map(function(col) {
    var func = ap.funcoes.find(function(f){ return f.id === col.funcaoId; });
    var colGaps = 0;
    var cells = ap.requisitos.map(function(r) {
      var st = (col.matriz && col.matriz[r.id]) || 'na';
      if (st === 'gap') { colGaps++; gapTotal++; }
      return '<td><div class="comp-cell '+STATUS_CSS[st]+'" '
        + 'onclick="cycleCell(\''+col.id+'\',\''+r.id+'\')" '
        + 'title="'+STATUS_LBL[st]+' — clique para alterar">'
        + STATUS_ICON[st] + '</div></td>';
    }).join('');
    var gapBadge = colGaps === 0
      ? '<span class="gap-badge gap-none">✅ Sem gaps</span>'
      : '<span class="gap-badge gap-crit">❌ '+colGaps+' gap(s)</span>';
    return '<tr>'
      + '<td><div style="font-size:12px;font-weight:500">'+esc(col.nome)+'</div>'
      + '<div style="font-size:10px;color:var(--text2)">'+esc(func?func.nome:'—')+'</div></td>'
      + cells
      + '<td>'+gapBadge+'</td>'
      + '</tr>';
  }).join('');
  if(body) body.innerHTML = trHtml || '<tr><td colspan="99" class="empty">Nenhum colaborador cadastrado.</td></tr>';

  // Painel de gaps
  if(gaps) {
    gaps.innerHTML = '<span style="font-size:12px;font-weight:600;color:var(--text2)">Visão de gaps:</span>'
      + (gapTotal === 0
          ? '<span class="gap-badge gap-none">✅ Nenhum gap identificado</span>'
          : '<span class="gap-badge gap-crit">❌ '+gapTotal+' gap(s) total</span>')
      + '<span class="gap-badge" style="background:var(--amber-l);color:var(--amber-d)">⚠️ Clique em cada célula para alternar o status</span>'
      + '<span style="font-size:11px;color:var(--text2)">✅ Qualificado &nbsp;⚠️ Planejado &nbsp;❌ Gap &nbsp;— N/A</span>';
  }
}

// ═══════════════════════════════════════════════════════════════════
// 7.3/7.4 — TREINAMENTOS E COMUNICAÇÃO
// ═══════════════════════════════════════════════════════════════════
function openTrainModal(editIdx) {
  apoioTrainEditIdx = (editIdx !== undefined) ? editIdx : null;
  document.getElementById('train-modal-title').textContent =
    apoioTrainEditIdx !== null ? 'Editar Treinamento' : 'Novo Treinamento / Comunicacao';
  var t = apoioTrainEditIdx !== null ? S.apoio.treinamentos[apoioTrainEditIdx] : {};
  document.getElementById('tr-title').value      = t.title||'';
  document.getElementById('tr-type').value       = t.type||'sst';
  document.getElementById('tr-hours').value      = t.hours||'';
  document.getElementById('tr-mode').value       = t.mode||'presencial';
  document.getElementById('tr-period').value     = t.period||'unico';
  document.getElementById('tr-date-plan').value  = t.datePlan||'';
  document.getElementById('tr-date-done').value  = t.dateDone||'';
  document.getElementById('tr-status').value     = t.status||'planejado';
  document.getElementById('tr-instructor').value = t.instructor||'';
  document.getElementById('tr-norm-req').value   = t.normReq||'';
  document.getElementById('tr-audience').value   = t.audience||'';
  document.getElementById('tr-npart').value      = t.npart||'';
  document.getElementById('tr-evid').value       = t.evid||'';
  document.getElementById('tr-obs').value        = t.obs||'';
  openMod('train-modal');
}

function saveTrain() {
  var title = document.getElementById('tr-title').value.trim();
  if (!title) { alert('Informe o titulo do treinamento.'); return; }
  var today = new Date().toISOString().slice(0,10);
  var datePlan = document.getElementById('tr-date-plan').value;
  var dateDone = document.getElementById('tr-date-done').value;
  var status   = document.getElementById('tr-status').value;
  // Auto-detecta atraso
  if (status === 'planejado' && datePlan && datePlan < today && !dateDone) status = 'atrasado';
  var t = {
    title:title, type:document.getElementById('tr-type').value,
    hours:document.getElementById('tr-hours').value,
    mode:document.getElementById('tr-mode').value,
    period:document.getElementById('tr-period').value,
    datePlan:datePlan, dateDone:dateDone, status:status,
    instructor:document.getElementById('tr-instructor').value,
    normReq:document.getElementById('tr-norm-req').value,
    audience:document.getElementById('tr-audience').value,
    npart:document.getElementById('tr-npart').value,
    evid:document.getElementById('tr-evid').value,
    obs:document.getElementById('tr-obs').value,
    createdAt:today
  };
  if (apoioTrainEditIdx !== null) S.apoio.treinamentos[apoioTrainEditIdx] = t;
  else S.apoio.treinamentos.push(t);
  closeMod('train-modal');
  renderTrainList(); updateTrainStats(); renderTrainCalendar();
}

function removeTrain(i) {
  if (!confirm('Remover este treinamento?')) return;
  S.apoio.treinamentos.splice(i,1);
  renderTrainList(); updateTrainStats(); renderTrainCalendar();
}

function filterTrain(f) {
  apoioTrainFilter = f;
  ['all','plan','done','late'].forEach(function(x){
    var b=document.getElementById('tf-'+x);
    if(b){b.style.background='';b.style.color='';b.style.borderColor='';}
  });
  var id = f==='planejado'?'tf-plan':f==='realizado'?'tf-done':f==='atrasado'?'tf-late':'tf-all';
  var btn = document.getElementById(id);
  if(btn){btn.style.background='var(--green)';btn.style.color='#fff';btn.style.borderColor='var(--green)';}
  renderTrainList();
}

function updateTrainStats() {
  var all = S.apoio.treinamentos;
  var nPlan = all.filter(function(t){return t.status==='planejado';}).length;
  var nDone = all.filter(function(t){return t.status==='realizado';}).length;
  var nLate = all.filter(function(t){return t.status==='atrasado';}).length;
  var nPart = all.reduce(function(acc,t){return acc+(parseInt(t.npart)||0);},0);
  var el = document.getElementById('train-stats');
  if(!el) return;
  el.innerHTML = [
    {v:all.length,  l:'Total',        e:'📚', bg:'var(--white)'},
    {v:nPlan,       l:'Planejados',   e:'📅', bg:'var(--blue-l)'},
    {v:nLate,       l:'Atrasados',    e:'🔴', bg:'var(--red-l)'},
    {v:nDone,       l:'Realizados',   e:'✅', bg:'#e8f5ef'},
  ].map(function(c){
    return '<div style="background:'+c.bg+';border:1px solid var(--gray-b);border-radius:var(--r);padding:12px;text-align:center">'
      +'<div style="font-size:18px;margin-bottom:2px">'+c.e+'</div>'
      +'<div style="font-size:22px;font-weight:700;color:var(--text)">'+c.v+'</div>'
      +'<div style="font-size:11px;color:var(--text2)">'+c.l+'</div>'
      +'</div>';
  }).join('');
}

function renderTrainCalendar() {
  var el = document.getElementById('train-calendar');
  if (!el) return;
  var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  var byMonth = {};
  S.apoio.treinamentos.forEach(function(t) {
    var d = t.datePlan || t.dateDone;
    if (!d) return;
    var m = parseInt(d.split('-')[1]) - 1;
    if (!byMonth[m]) byMonth[m] = [];
    byMonth[m].push(t);
  });
  el.innerHTML = months.map(function(mon, mi) {
    var items = byMonth[mi] || [];
    var hasLate = items.some(function(t){return t.status==='atrasado';});
    var hasплан = items.some(function(t){return t.status==='planejado';});
    var hasDone = items.some(function(t){return t.status==='realizado';});
    var bg = items.length === 0 ? 'var(--gray-l)'
           : hasLate ? 'var(--red-l)'
           : hasPlano ? 'var(--blue-l)'
           : '#e8f5ef';
    var color = items.length === 0 ? 'var(--text3)'
              : hasLate ? 'var(--red)'
              : hasPlano ? 'var(--blue-d)'
              : 'var(--green-d)';
    return '<div style="background:'+bg+';border-radius:6px;padding:8px 4px;text-align:center;cursor:default" '
      + 'title="'+items.length+' treinamento(s) em '+mon+'">'
      + '<div style="font-size:11px;font-weight:600;color:'+color+'">'+mon+'</div>'
      + '<div style="font-size:16px;font-weight:700;color:'+color+'">'+items.length+'</div>'
      + '</div>';
  }).join('');
}

function renderTrainList() {
  var el = document.getElementById('train-list');
  if (!el) return;
  var items = apoioTrainFilter === 'all'
    ? S.apoio.treinamentos
    : S.apoio.treinamentos.filter(function(t){return t.status===apoioTrainFilter;});
  if (!items.length) {
    el.innerHTML = '<div class="empty">Nenhum treinamento'+(apoioTrainFilter!=='all'?' com status "'+apoioTrainFilter+'"':'')+'.</div>';
    return;
  }
  var stColor = {planejado:'tsb-plan', realizado:'tsb-done', atrasado:'tsb-late', cancelado:'tsb-canc'};
  var stLbl   = {planejado:'📅 Planejado', realizado:'✅ Realizado', atrasado:'🔴 Atrasado', cancelado:'❌ Cancelado'};
  var typeCSS = {sst:'tt-sst', env:'tt-env', both:'tt-both', int:'tt-int'};
  var typeLbl = {sst:'⛑️ SST', env:'🌿 Ambiental', both:'🌿+⛑️', int:'🔧 Integração'};
  el.innerHTML = items.map(function(t, i) {
    var realIdx = S.apoio.treinamentos.indexOf(t);
    var hasEvid = !!t.evid;
    return '<div class="train-card">'
      + '<div class="train-status-bar '+stColor[t.status||'planejado']+'"></div>'
      + '<div style="flex:1">'
      + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">'
      + '<span class="train-type '+(typeCSS[t.type]||'tt-both')+'">'+typeLbl[t.type||'both']+'</span>'
      + '<span style="font-size:11px;padding:2px 8px;border-radius:20px;background:var(--gray-l);color:var(--text2)">'+stLbl[t.status||'planejado']+'</span>'
      + (t.normReq?'<span style="font-size:11px;color:var(--text2)">📋 '+esc(t.normReq)+'</span>':'')
      + (hasEvid?'<span style="font-size:10px;padding:1px 6px;border-radius:10px;background:#e8f5ef;color:var(--green-d)">📎 Com evidência</span>':'')
      + '</div>'
      + '<div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:3px">'+esc(t.title)+'</div>'
      + '<div style="font-size:11px;color:var(--text2);display:flex;gap:12px;flex-wrap:wrap">'
      + (t.datePlan?'<span>📅 Planejado: '+t.datePlan.split('-').reverse().join('/')+'</span>':'')
      + (t.dateDone?'<span>✅ Realizado: '+t.dateDone.split('-').reverse().join('/')+'</span>':'')
      + (t.hours?'<span>⏱️ '+t.hours+'h</span>':'')
      + (t.mode?'<span>'+{presencial:'🏫 Presencial',ead:'💻 EAD',hibrido:'🔄 Híbrido',pratico:'🔧 Prático'}[t.mode]+'</span>':'')
      + (t.instructor?'<span>👤 '+esc(t.instructor)+'</span>':'')
      + (t.audience?'<span>👥 '+esc(t.audience)+'</span>':'')
      + (t.npart?'<span>👨‍👩‍👧‍👦 '+t.npart+' participantes</span>':'')
      + '</div>'
      + (t.obs?'<div style="font-size:11px;color:var(--text2);margin-top:4px;font-style:italic">'+esc(t.obs)+'</div>':'')
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">'
      + '<button onclick="openTrainModal('+realIdx+')" class="btn btn-sm">✏️</button>'
      + '<button onclick="removeTrain('+realIdx+')" style="background:none;border:none;cursor:pointer;font-size:15px;color:var(--text2)">×</button>'
      + '</div>'
      + '</div>';
  }).join('');
}

// ═══════════════════════════════════════════════════════════════════
// 7.5 — INFORMAÇÃO DOCUMENTADA
// ═══════════════════════════════════════════════════════════════════
var DOC_TYPE_LBL = {proc:'Procedimento',inst:'Instrução',form:'Formulário',pol:'Política',man:'Manual',plan:'Plano',prog:'Programa',ext:'Doc. Externo'};

function openDocModal(editIdx) {
  apoioDocEditIdx = (editIdx !== undefined) ? editIdx : null;
  document.getElementById('doc-modal-title').textContent =
    apoioDocEditIdx !== null ? 'Editar Documento' : 'Novo Documento';
  var d = apoioDocEditIdx !== null ? S.apoio.documentos[apoioDocEditIdx] : {};
  document.getElementById('doc-code').value     = d.code||'';
  document.getElementById('doc-title').value    = d.title||'';
  document.getElementById('doc-type').value     = d.type||'proc';
  document.getElementById('doc-rev').value      = d.rev||'01';
  document.getElementById('doc-norm').value     = d.norm||'both';
  document.getElementById('doc-date').value     = d.date||'';
  document.getElementById('doc-next').value     = d.next||'';
  document.getElementById('doc-status').value   = d.status||'vigente';
  document.getElementById('doc-author').value   = d.author||'';
  document.getElementById('doc-approver').value = d.approver||'';
  document.getElementById('doc-location').value = d.location||'';
  document.getElementById('doc-clause').value   = d.clause||'';
  openMod('doc-modal');
}

function saveDoc() {
  var code  = document.getElementById('doc-code').value.trim();
  var title = document.getElementById('doc-title').value.trim();
  if (!code || !title) { alert('Informe o codigo e o titulo do documento.'); return; }
  var today = new Date().toISOString().slice(0,10);
  var nextDate = document.getElementById('doc-next').value;
  var status   = document.getElementById('doc-status').value;
  if (status === 'vigente' && nextDate && nextDate < today) status = 'revisao';
  var d = {
    code:code, title:title,
    type:document.getElementById('doc-type').value,
    rev:document.getElementById('doc-rev').value,
    norm:document.getElementById('doc-norm').value,
    date:document.getElementById('doc-date').value,
    next:nextDate, status:status,
    author:document.getElementById('doc-author').value,
    approver:document.getElementById('doc-approver').value,
    location:document.getElementById('doc-location').value,
    clause:document.getElementById('doc-clause').value,
    createdAt:today
  };
  if (apoioDocEditIdx !== null) S.apoio.documentos[apoioDocEditIdx] = d;
  else S.apoio.documentos.push(d);
  closeMod('doc-modal');
  renderDocList(); updateDocStats();
}

function removeDoc(i) {
  if (!confirm('Remover o documento "'+S.apoio.documentos[i].code+'"?')) return;
  S.apoio.documentos.splice(i,1);
  renderDocList(); updateDocStats();
}

function filterDocs(f) {
  apoioDocFilter = f;
  ['all','vig','rev','obs'].forEach(function(x){
    var b=document.getElementById('df-'+x);
    if(b){b.style.background='';b.style.color='';b.style.borderColor='';}
  });
  var id=f==='vigente'?'df-vig':f==='revisao'?'df-rev':f==='obsoleto'?'df-obs':'df-all';
  var btn=document.getElementById(id);
  if(btn){btn.style.background='var(--green)';btn.style.color='#fff';btn.style.borderColor='var(--green)';}
  renderDocList();
}

function updateDocStats() {
  var all = S.apoio.documentos;
  var nVig = all.filter(function(d){return d.status==='vigente';}).length;
  var nRev = all.filter(function(d){return d.status==='revisao';}).length;
  var nObs = all.filter(function(d){return d.status==='obsoleto';}).length;
  var el = document.getElementById('doc-stats');
  if(!el) return;
  el.innerHTML = [
    {v:all.length, l:'Total de documentos', e:'📁', bg:'var(--white)'},
    {v:nVig,       l:'Vigentes',            e:'✅', bg:'#e8f5ef'},
    {v:nRev,       l:'Em revisão',          e:'⚠️', bg:'var(--amber-l)'},
    {v:nObs,       l:'Obsoletos',           e:'🔴', bg:'var(--red-l)'},
  ].map(function(c){
    return '<div style="background:'+c.bg+';border:1px solid var(--gray-b);border-radius:var(--r);padding:12px;text-align:center">'
      +'<div style="font-size:18px;margin-bottom:2px">'+c.e+'</div>'
      +'<div style="font-size:22px;font-weight:700;color:var(--text)">'+c.v+'</div>'
      +'<div style="font-size:11px;color:var(--text2)">'+c.l+'</div>'
      +'</div>';
  }).join('');
}

function renderDocList() {
  var tbody = document.getElementById('doc-tbody');
  var empty = document.getElementById('doc-empty');
  if (!tbody) return;
  var items = apoioDocFilter === 'all'
    ? S.apoio.documentos
    : S.apoio.documentos.filter(function(d){return d.status===apoioDocFilter;});
  if (!items.length) {
    tbody.innerHTML = '';
    if(empty) empty.style.display = 'block';
    return;
  }
  if(empty) empty.style.display = 'none';
  var stCSS = {vigente:'ds-vig', revisao:'ds-rev', obsoleto:'ds-obs'};
  var stLbl = {vigente:'✅ Vigente', revisao:'⚠️ Em revisão', obsoleto:'🔴 Obsoleto'};
  var normLbl = {env:'🌿 14001', sst:'⛑️ 45001', both:'🌿+⛑️'};
  var today = new Date().toISOString().slice(0,10);
  tbody.innerHTML = items.map(function(d) {
    var realIdx = S.apoio.documentos.indexOf(d);
    var nextOk = !d.next || d.next >= today;
    return '<tr>'
      + '<td><span class="doc-code">'+esc(d.code)+'</span></td>'
      + '<td style="font-weight:500">'+esc(d.title)
      + (d.clause?'<div style="font-size:10px;color:var(--text2)">'+esc(d.clause)+'</div>':'')+'</td>'
      + '<td style="font-size:11px;color:var(--text2)">'+esc(DOC_TYPE_LBL[d.type]||d.type)+'</td>'
      + '<td style="text-align:center;font-weight:600">Rev. '+esc(d.rev||'01')+'</td>'
      + '<td style="font-size:11px">'+(d.date?d.date.split('-').reverse().join('/'):'—')+'</td>'
      + '<td style="font-size:11px;color:'+(nextOk?'var(--text2)':'var(--red)')+'">'
      + (d.next?d.next.split('-').reverse().join('/'):'—')+(nextOk?'':'⚠️')+'</td>'
      + '<td style="font-size:11px">'+(d.author?esc(d.author):'—')+'</td>'
      + '<td><span class="doc-status '+(stCSS[d.status]||'ds-vig')+'">'+stLbl[d.status||'vigente']+'</span></td>'
      + '<td style="font-size:10px;color:var(--text2)">'+normLbl[d.norm||'both']+'</td>'
      + '<td><div style="display:flex;gap:4px">'
      + '<button onclick="openDocModal('+realIdx+')" style="background:none;border:none;cursor:pointer;font-size:13px" title="Editar">✏️</button>'
      + '<button onclick="removeDoc('+realIdx+')" style="background:none;border:none;cursor:pointer;font-size:14px;color:var(--text2)" title="Remover">×</button>'
      + '</div></td>'
      + '</tr>';
  }).join('');
}

function exportDocList() {
  var org = document.getElementById('org-name').value || 'SGI';
  var rows = ['sep=;'];
  rows.push('LISTA MESTRE DE DOCUMENTOS - '+org);
  rows.push('Gerado em: '+new Date().toLocaleString('pt-BR'));
  rows.push('');
  rows.push(['Codigo','Titulo','Tipo','Revisao','Data Revisao','Proxima Revisao','Elaborador','Aprovador','Status','Norma','Clausula','Localizacao'].join(';'));
  S.apoio.documentos.forEach(function(d){
    rows.push([d.code,d.title,DOC_TYPE_LBL[d.type]||d.type,d.rev,d.date,d.next,d.author,d.approver,d.status,d.norm,d.clause,d.location].map(function(v){
      var s=String(v||''); return s.indexOf(';')!==-1?'"'+s+'"':s;
    }).join(';'));
  });
  var blob = new Blob([rows.join('\r\n')],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='Lista_Mestre_Documentos_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
}

// ── Help content 7 ───────────────────────────────────────────────
HELP_CONTENT['s8'] = {
  title: '📚 Orientacoes — Clausula 7: Apoio',
  body: '<h4>7.2 Competencias</h4>'
    + '<p>A norma exige que a organizacao determine as competencias necessarias para as pessoas que afetam o SGI, garanta que sejam competentes e tome acoes quando houver gaps.</p>'
    + '<div class="ex">Clique em cada celula para alternar: OK (qualificado), Planejado (treinamento previsto), Gap (nao qualificado), N/A (nao aplicavel a esta funcao)</div>'
    + '<h4>7.3/7.4 Conscientizacao e Comunicacao</h4>'
    + '<p>Treinamentos sao a evidencia de que os colaboradores conhecem: a politica, os objetivos, sua contribuicao para o SGI e as consequencias de nao conformar.</p>'
    + '<div class="warn">O auditor vai perguntar diretamente ao colaborador se ele conhece os riscos do posto de trabalho. Sem treinamento registrado com evidencia, e nao conformidade.</div>'
    + '<h4>7.5 Informacao Documentada</h4>'
    + '<p>A lista mestre e o controle de documentos e registros. Inclui criacao, aprovacao, revisao e descarte. Documentos obsoletos nao podem estar em uso.</p>'
};

// Adiciona ao buildAgentPrompt: apoio


// ═══════════════════════════════════════════════════════════════════
// 