// Hub SGI — hub-actions.js
// GESTÃO DE AÇÕES — ORIGEM / CAUSA RAIZ / EFICÁCIA
// ═══════════════════════════════════════════════════════════════════

var ORIG_CSS_MAP  = {ro:'orig-ro',obj:'orig-obj',nc:'orig-nc',inc:'orig-inc',aud:'orig-aud',ac:'orig-ac',man:'orig-man'};
var ORIG_LBL_MAP  = {ro:'R&O 6.1.1',obj:'Objetivos 6.2',nc:'NC 10.2',inc:'Incidente 10.1',aud:'Auditoria 9.2',ac:'An. Crítica 9.3',man:'Manual'};
var actionOriginFilter = 'all';

// ── Render: bloco de Causa Raiz (5 Porquês) ─────────────────────
function renderCausaRaiz(ri, ai, a) {
  var cr = a.causaRaiz;
  if (!cr) return '';
  var porqueLabels = [
    'o problema ocorreu?',
    'isso aconteceu?',
    'isso permitiu?',
    'esse sistema falhou?',
    'a causa raiz nao foi evitada?'
  ];
  var pqs = (cr.porques||['','','','','']).map(function(p, pi) {
    var h = '';
    h += '<div class="porques-item">';
    h += '<div class="porques-num">'+(pi+1)+'</div>';
    h += '<input type="text" value="'+esc(p)+'"';
    h += ' placeholder="Por que '+porqueLabels[pi]+'"';
    h += ' oninput="updatePorque('+ri+','+ai+','+pi+',this.value)"';
    h += ' style="flex:1;font-size:12px;padding:5px 8px">';
    h += '</div>';
    return h;
  }).join('');
  var h = '';
  h += '<div class="causa-panel">';
  h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
  h += '<label>Analise de Causa Raiz</label>';
  h += '<select onchange="updateCausaMetodo('+ri+','+ai+',this.value)" style="font-size:11px;padding:2px 6px">';
  h += '<option value="5porques"'+(cr.metodologia==='5porques'?' selected':'')+'>5 Porques</option>';
  h += '<option value="ishikawa"'+(cr.metodologia==='ishikawa'?' selected':'')+'>Ishikawa</option>';
  h += '</select></div>';
  h += '<div class="porques-wrap">'+pqs+'</div>';
  h += '<div style="margin-top:8px">';
  h += '<label>Causa raiz identificada (conclusao)</label>';
  h += '<input type="text" value="'+esc(cr.conclusao||'')+'"';
  h += ' placeholder="Ex.: Ausencia de procedimento formal"';
  h += ' oninput="updateCausaConclusao('+ri+','+ai+',this.value)"';
  h += ' style="width:100%;font-size:12px;margin-top:3px">';
  h += '</div></div>';
  return h;
}
function updatePorque(ri, ai, pi, val) {
  if (!S.roItems[ri].actions[ai].causaRaiz) return;
  S.roItems[ri].actions[ai].causaRaiz.porques[pi] = val;
}
function updateCausaMetodo(ri, ai, val) {
  if (!S.roItems[ri].actions[ai].causaRaiz) return;
  S.roItems[ri].actions[ai].causaRaiz.metodologia = val;
}
function updateCausaConclusao(ri, ai, val) {
  if (!S.roItems[ri].actions[ai].causaRaiz) return;
  S.roItems[ri].actions[ai].causaRaiz.conclusao = val;
}

// ── Render: bloco de Verificação de Eficácia ────────────────────
function renderEficacia(ri, ai, a) {
  var ef = a.eficacia || {status:'pendente',resp:'',prazoVerif:'',resultado:'',verificadoEm:''};
  var stBadge = '';
  if (ef.status==='ok')       stBadge = '<span class="efic-badge efic-ok">OK: Eficaz</span>';
  else if (ef.status==='nok') stBadge = '<span class="efic-badge efic-nok">Ineficaz</span>';
  else                        stBadge = '<span class="efic-badge efic-pend">Aguardando verificacao</span>';
  var fResp = 'resp', fPrazo = 'prazoVerif', fRes = 'resultado';
  var h = '';
  h += '<div class="efic-panel">';
  h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
  h += '<label>Verificacao de Eficacia</label>' + stBadge + '</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px">';
  h += '<div><label style="font-size:11px;font-weight:400;color:var(--text2)">Responsavel</label>';
  h += '<input type="text" value="' + esc(ef.resp||'') + '" placeholder="Quem ira verificar?"';
  h += ' oninput="updateEficaciaField(' + ri + ',' + ai + ',\'' + fResp + '\',this.value)"';
  h += ' style="font-size:12px;width:100%"></div>';
  h += '<div><label style="font-size:11px;font-weight:400;color:var(--text2)">Prazo</label>';
  h += '<input type="date" value="' + esc(ef.prazoVerif||'') + '"';
  h += ' onchange="updateEficaciaField(' + ri + ',' + ai + ',\'' + fPrazo + '\',this.value)"';
  h += ' style="font-size:12px;width:100%"></div>';
  h += '<div><label style="font-size:11px;font-weight:400;color:var(--text2)">Resultado</label>';
  h += '<input type="text" value="' + esc(ef.resultado||'') + '" placeholder="Evidencia"';
  h += ' oninput="updateEficaciaField(' + ri + ',' + ai + ',\'' + fRes + '\',this.value)"';
  h += ' style="font-size:12px;width:100%"></div>';
  h += '</div>';
  h += '<div style="display:flex;gap:8px">';
  h += '<button class="btn btn-sm" style="background:var(--green);color:#fff;border-color:var(--green)"';
  h += ' onclick="setEficacia(' + ri + ',' + ai + ',\'ok\')">OK: Confirmar eficacia</button>';
  h += '<button class="btn btn-sm" style="background:var(--red);color:#fff;border-color:var(--red)"';
  h += ' onclick="setEficacia(' + ri + ',' + ai + ',\'nok\')">Ineficaz: reabrir</button>';
  h += '</div></div>';
  return h;
}
function updateEficaciaField(ri, ai, field, val) {
  if (!S.roItems[ri].actions[ai].eficacia) S.roItems[ri].actions[ai].eficacia = {};
  S.roItems[ri].actions[ai].eficacia[field] = val;
}

function setEficacia(ri, ai, st) {
  if (!S.roItems[ri].actions[ai].eficacia) S.roItems[ri].actions[ai].eficacia = {};
  S.roItems[ri].actions[ai].eficacia.status = st;
  S.roItems[ri].actions[ai].eficacia.verificadoEm = new Date().toISOString().slice(0,10);
  if (st === 'nok') {
    // Reabre a ação para nova intervenção
    S.roItems[ri].actions[ai].status = 'em andamento';
    alert('Ação marcada como ineficaz. Uma nova análise de causa e ação devem ser planejadas.');
  }
  S.roItems[ri]._panelOpen = true;
  renderRO();
}

// ── Filtro por origem no painel de gestão ───────────────────────
function filterActionsOrigin(orig) {
  actionOriginFilter = orig;
  document.querySelectorAll('[id^="afo-"]').forEach(function(b){
    b.style.background=''; b.style.borderColor='';
  });
  var btn = document.getElementById('afo-'+orig);
  if (btn) { btn.style.background='var(--purple-l)'; btn.style.borderColor='var(--purple)'; }
  renderActionMgr();
}

var actionFilter = 'all';
function filterActions(f) {
  actionFilter = f;
  ['all','pend','prog','over','done'].forEach(function(x){
    var id='af-'+(x==='pend'?'pend':x==='prog'?'prog':x==='over'?'over':x==='done'?'done':'all');
    var btn=document.getElementById(id);
    if(btn){btn.style.background='';btn.style.color='';btn.style.borderColor='';}
  });
  var activeId='af-'+(f==='pendente'?'pend':f==='em andamento'?'prog':f==='atrasada'?'over':f==='concluida'?'done':'all');
  var activeBtn=document.getElementById(activeId);
  if(activeBtn){activeBtn.style.background='var(--green)';activeBtn.style.color='#fff';activeBtn.style.borderColor='var(--green)';}
  renderActionMgr();
}

function renderActionMgr() {
  // Estatísticas
  var stats={total:0,pendente:0,'em andamento':0,concluida:0,atrasada:0};
  S.roItems.forEach(function(r){(r.actions||[]).forEach(function(a){stats.total++;stats[a.status]=(stats[a.status]||0)+1;});});
  var sc=document.getElementById('action-stats');
  if(sc) sc.innerHTML=[
    {v:stats.total,        l:'Total de ações',     e:'📋', bg:'var(--white)'},
    {v:stats.atrasada||0,  l:'Atrasadas',          e:'🔴', bg:'var(--red-l)'},
    {v:stats['em andamento']||0, l:'Em andamento', e:'🔄', bg:'var(--blue-l)'},
    {v:stats.concluida||0, l:'Concluídas',         e:'✅', bg:'#e8f5ef'},
  ].map(function(c){
    return '<div style="background:'+c.bg+';border:1px solid var(--gray-b);border-radius:var(--r);padding:14px;text-align:center">'
      +'<div style="font-size:20px;margin-bottom:3px">'+c.e+'</div>'
      +'<div style="font-size:24px;font-weight:600;color:var(--text);line-height:1">'+c.v+'</div>'
      +'<div style="font-size:11px;color:var(--text2);margin-top:3px">'+c.l+'</div>'
      +'</div>';
  }).join('');

  // Lista consolidada
  var el=document.getElementById('action-mgr-list');
  var items=[];
  S.roItems.forEach(function(r,ri){
    (r.actions||[]).forEach(function(a,ai){
      var matchStatus = actionFilter==='all'||a.status===actionFilter;
      var matchOrigin = actionOriginFilter==='all'||(a.origem||'ro')===actionOriginFilter;
      if(matchStatus && matchOrigin) {
        items.push({r:r,a:a,ri:ri,ai:ai});
      }
    });
  });
  // Ordena: atrasadas primeiro, depois por prazo
  items.sort(function(x,y){
    var ord={atrasada:0,pendente:1,'em andamento':2,concluida:3};
    if(ord[x.a.status]!==ord[y.a.status]) return ord[x.a.status]-ord[y.a.status];
    return (x.a.prazo||'9999')>(y.a.prazo||'9999')?1:-1;
  });
  var lbl={low:'Baixo',med:'Médio',high:'Alto',crit:'Crítico'};
  var dots={low:'#1D9E75',med:'#BA7517',high:'#E85D24',crit:'#A32D2D'};
  var stLbl={pendente:'🕐 Pendente','em andamento':'🔄 Em andamento',concluida:'✅ Concluída',atrasada:'🔴 Atrasada'};
  var stCls={pendente:'st-pend','em andamento':'st-prog',concluida:'st-done',atrasada:'st-over'};
  var lbl2=document.getElementById('action-filter-label');
  if(lbl2) lbl2.textContent=items.length+' ação(ões) exibida(s)';

  if(!items.length){
    el.innerHTML='<div class="empty">'+(actionFilter==='all'?'Nenhuma ação cadastrada ainda. Adicione ações nos itens da aba Riscos & Oportunidades.':'Nenhuma ação com status "'+(stLbl[actionFilter]||actionFilter)+'".')+'</div>';
    return;
  }

  el.innerHTML=items.map(function(it){
    var a=it.a, r=it.r;
    var overdue=a.status==='atrasada';
    var prazoStr=a.prazo?a.prazo.split('-').reverse().join('/'):'—';
    var origCss = ORIG_CSS_MAP[a.origem||'ro']||'orig-man';
    var origLbl = ORIG_LBL_MAP[a.origem||'ro']||'Manual';
    var efSt = a.eficacia ? a.eficacia.status : 'pendente';
    var efBadgeMgr = a.status==='concluida'
      ? ' <span class="efic-badge '+(efSt==='ok'?'efic-ok':efSt==='nok'?'efic-nok':'efic-pend')+'">'
        +(efSt==='ok'?'✅ Eficaz':efSt==='nok'?'❌ Ineficaz':'⏳ Verificar eficácia')+'</span>'
      : '';
    var hasCausa = a.causaRaiz && (a.causaRaiz.conclusao || (a.causaRaiz.porques||[]).some(function(p){return p;}));
    return '<div class="action-mgr-item" style="'+(overdue?'border-color:var(--red);background:#fff8f8':'')+'">'
      +'<div class="action-priority-dot" style="background:'+dots[r.cls]+'"></div>'
      +'<div style="flex:1">'
      +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">'
      +'<span class="orig-tag '+origCss+'">'+origLbl+'</span>'
      +efBadgeMgr
      +(hasCausa?'<span style="font-size:10px;padding:1px 6px;border-radius:10px;background:var(--amber-l);color:var(--amber-d)">🔍 Causa raiz</span>':'')
      +'</div>'
      +'<div style="font-size:13px;font-weight:500;color:var(--text);margin-bottom:3px">'+esc(a.desc)+'</div>'
      +'<div style="font-size:11px;color:var(--text2);margin-bottom:4px;font-style:italic">'+esc(r.desc)+'</div>'
      +'<div class="flex" style="gap:8px;flex-wrap:wrap">'
      +(a.resp?'<span style="font-size:11px;color:var(--text2)">👤 '+esc(a.resp)+'</span>':'')
      +'<span style="font-size:11px;color:'+(overdue?'var(--red)':'var(--text2)')+'">📅 '+prazoStr+'</span>'
      +(a.evid?'<span style="font-size:11px;color:var(--text2)">📎 '+esc(a.evid)+'</span>':'')
      +'<span class="sig '+(r.cls==='low'?'sig-low':r.cls==='med'?'sig-med':'sig-crit')+'" style="font-size:10px">Score '+r.score+' — '+lbl[r.cls]+'</span>'
      +'</div>'
      +'</div>';
  }).join('');
}
// RESUMO
function buildSumm(){
  var nFat=S.factors.int.length+S.factors.ext.length;
  var nRel=S.factors.int.concat(S.factors.ext).filter(function(f){return f.rel==='sim';}).length;
  var nPI=S.pi.filter(function(p){return p.sel;}).length;
  var nAP=S.apItems.length;
  var nRisk=S.roItems.filter(function(r){return r.type==='risk';}).length;
  var nOpp=S.roItems.filter(function(r){return r.type==='opp';}).length;
  var nHigh=S.apItems.filter(function(a){return a.cls==='high'||a.cls==='crit';}).length;
  var nROH=S.roItems.filter(function(r){return r.cls==='high'||r.cls==='crit';}).length;
  document.getElementById('stat-cards').innerHTML=[
    {v:nFat,l:'Fatores contexto',e:'📊'},{v:nRel,l:'Relevantes SGI',e:'✅'},
    {v:nPI,l:'Partes interessadas',e:'👥'},{v:nAP,l:'Aspectos/Perigos',e:'⚠️'},
    {v:nRisk+nOpp,l:'Riscos & Oport.',e:'🎯'}
  ].map(function(c){return '<div class="stat-card"><div style="font-size:20px;margin-bottom:3px">'+c.e+'</div><div class="stat-v">'+c.v+'</div><div class="stat-l">'+c.l+'</div></div>';}).join('');
  var checks=[
    {l:'4.1 — Organização identificada',d:!!document.getElementById('org-name').value},
    {l:'4.1 — Fatores internos registrados',d:S.factors.int.length>0},
    {l:'4.1 — Fatores externos registrados',d:S.factors.ext.length>0},
    {l:'4.1 — Relevância avaliada',d:nRel>0},
    {l:'4.2 — Partes interessadas selecionadas',d:nPI>0},
    {l:'4.2 — Necessidades × expectativas detalhadas',d:nPI>0},
    {l:'6.1.2 — Aspectos/perigos cadastrados',d:nAP>0},
    {l:'6.1.1 — Riscos e oportunidades registrados',d:S.roItems.length>0},
  ];
  var done=checks.filter(function(c){return c.d;}).length;
  var pct=Math.round(done/checks.length*100);
  document.getElementById('prog-sec').innerHTML=
    '<div class="prog-lbl"><span>Completude</span><span style="font-weight:600;color:var(--green)">'+pct+'%</span></div>'
    +'<div class="prog-bar"><div class="prog-f" style="width:'+pct+'%"></div></div>'
    +checks.map(function(c){return '<div class="chk-row"><div class="chk-ico'+(c.d?' done':'')+'">'+( c.d?'✓':'')+'</div><span style="font-size:13px;color:'+(c.d?'var(--text)':'var(--text2)')+'">'+c.l+'</span></div>';}).join('');
  var piSel=S.pi.filter(function(p){return p.sel;});
  document.getElementById('summ-content').innerHTML=
    '<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text2);text-transform:uppercase;margin-bottom:8px">4.1 — Contexto</div>'
    +'<p style="font-size:13px;margin-bottom:4px"><b>Fatores registrados:</b> '+nFat+' total · '+nRel+' relevantes ao SGI</p>'
    +'<p style="font-size:13px;margin-bottom:4px"><b>Relevantes internos:</b> '+S.factors.int.filter(function(f){return f.rel==='sim';}).map(function(f){return esc(f.desc);}).join(', ')||'—'+'</p>'
    +'<p style="font-size:13px;margin-bottom:4px"><b>Relevantes externos:</b> '+S.factors.ext.filter(function(f){return f.rel==='sim';}).map(function(f){return esc(f.desc);}).join(', ')||'—'+'</p>'
    +'<div class="divider"></div>'
    +'<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text2);text-transform:uppercase;margin-bottom:8px">4.2 — Partes Interessadas</div>'
    +'<p style="font-size:13px;margin-bottom:4px"><b>Selecionadas:</b> '+piSel.map(function(p){return esc(p.name);}).join(' · ')+'</p>'
    +'<p style="font-size:13px;margin-bottom:4px"><b>Com obrigação de conformidade:</b> '+piSel.filter(function(p){return p.obrig==='sim';}).map(function(p){return esc(p.name);}).join(', ')||'—'+'</p>'
    +'<div class="divider"></div>'
    +'<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text2);text-transform:uppercase;margin-bottom:8px">6.1.2 — Aspectos & Perigos</div>'
    +'<p style="font-size:13px;margin-bottom:4px"><b>Total:</b> '+nAP+' · <b>Alta/Crítica:</b> <span style="color:var(--red)">'+nHigh+'</span></p>'
    +(nHigh?'<p style="font-size:12px;color:var(--red)">⚠️ Requerem controles operacionais prioritários e tratamento no §6.2.</p>':'')
    +'<div class="divider"></div>'
    +'<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text2);text-transform:uppercase;margin-bottom:8px">6.1.1 — Riscos & Oportunidades</div>'
    +'<p style="font-size:13px;margin-bottom:4px"><b>Riscos:</b> '+nRisk+' · <b>Oportunidades:</b> '+nOpp+' · <b>Alto/Crítico:</b> <span style="color:var(--red)">'+nROH+'</span></p>';
}

function exportTxt(){
  var org=document.getElementById('org-name').value||'—';
  var sector=document.getElementById('org-sector').value||'—';
  var scope=document.getElementById('org-scope').value||'—';
  var L=[
    'SISTEMA DE GESTÃO INTEGRADO — CONTEXTO DA ORGANIZAÇÃO',
    'ISO 14001:2015 + ISO 45001:2018 | Cláusulas 4.1 · 4.2 · 6.1',
    '='.repeat(65),'',
    'CLÁUSULA 4.1 — CONTEXTO DA ORGANIZAÇÃO','-'.repeat(45),
    'Organização: '+org,'Setor/CNAE: '+sector,'Escopo: '+scope,'',
    'FATORES INTERNOS RELEVANTES:'
  ];
  S.factors.int.filter(function(f){return f.rel==='sim';}).forEach(function(f){L.push('  ['+(f.type==='fav'?'FORÇA':'FRAQUEZA')+'] '+f.desc+' ['+f.norm+'] | '+f.dir+(f.just?' | '+f.just:''));});
  L.push('','FATORES EXTERNOS RELEVANTES:');
  S.factors.ext.filter(function(f){return f.rel==='sim';}).forEach(function(f){L.push('  ['+(f.type==='fav'?'OPORTUNIDADE':'AMEAÇA')+'] '+f.desc+' ['+f.norm+'] | '+f.dir+(f.just?' | '+f.just:''));});
  L.push('','CLÁUSULA 4.2 — PARTES INTERESSADAS','-'.repeat(45));
  S.pi.filter(function(p){return p.sel;}).forEach(function(p){
    L.push('','Parte: '+p.name+' ['+p.norm+'] | Obrigação conformidade: '+p.obrig);
    L.push('  Necessidades:'); p.needs.forEach(function(n){L.push('    • '+n);});
    L.push('  Expectativas:'); p.exps.forEach(function(e){L.push('    - '+e);});
  });
  L.push('','CLÁUSULA 6.1.2 — ASPECTOS E PERIGOS','-'.repeat(45));
  S.apItems.forEach(function(a){L.push('  ['+(a.type==='env'?'AMBIENTAL':'SST')+'] '+a.asp+' | P:'+a.prob+' S:'+a.sev+' Score:'+a.score+' ('+{low:'Baixo',med:'Médio',high:'Alto',crit:'Crítico'}[a.cls]+')');});
  L.push('','CLÁUSULA 6.1.1 — RISCOS E OPORTUNIDADES','-'.repeat(45));
  S.roItems.forEach(function(r){L.push('  ['+(r.type==='risk'?'RISCO':'OPORTUNIDADE')+'] '+r.desc+' | Score:'+r.score+(r.action?' | Ação: '+r.action:''));});
  L.push('','='.repeat(65),'Documento gerado em: '+new Date().toLocaleString('pt-BR'));
  var blob=new Blob([L.join('\n')],{type:'text/plain;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='SGI_Contexto_v2.txt'; a.click();
}

// MODALS
function openMod(id){document.getElementById(id).classList.add('open');}
function closeMod(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-bg').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)m.classList.remove('open');});});

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// ===== CATÁLOGO PADRONIZADO =====
var CATALOG = [
  // ---- AMBIENTAIS (env) ----
  {code:'A01',type:'env',asp:'Geração de resíduo sólido não perigoso',imp:'Contaminação do solo; sobrecarga de aterros sanitários',prob:3,sev:2},
  {code:'A02',type:'env',asp:'Geração de resíduo sólido perigoso (Classe I)',imp:'Contaminação do solo e lençol freático; risco à saúde humana',prob:3,sev:4},
  {code:'A03',type:'env',asp:'Geração de efluente líquido industrial',imp:'Contaminação de corpos hídricos; mortandade de fauna aquática',prob:3,sev:4},
  {code:'A04',type:'env',asp:'Geração de efluente doméstico (esgoto sanitário)',imp:'Contaminação microbiológica de solo e água',prob:2,sev:3},
  {code:'A05',type:'env',asp:'Emissão de material particulado (poeira/fumaça)',imp:'Poluição atmosférica; problemas respiratórios na comunidade',prob:3,sev:3},
  {code:'A06',type:'env',asp:'Emissão de COVs (compostos orgânicos voláteis)',imp:'Poluição atmosférica; formação de ozônio troposférico',prob:3,sev:3},
  {code:'A07',type:'env',asp:'Emissão de gases de combustão (CO₂, NOx, SOx)',imp:'Contribuição ao efeito estufa; chuva ácida',prob:3,sev:3},
  {code:'A08',type:'env',asp:'Emissão de ruído acima do limite (NR-15 / CONAMA 01)',imp:'Poluição sonora; incômodo à comunidade; perda auditiva',prob:3,sev:3},
  {code:'A09',type:'env',asp:'Emissão de vibração',imp:'Incômodo à comunidade; danos a edificações vizinhas',prob:2,sev:2},
  {code:'A10',type:'env',asp:'Geração de odor ofensivo',imp:'Incômodo à comunidade; impacto na qualidade de vida',prob:2,sev:2},
  {code:'A11',type:'env',asp:'Consumo excessivo de água',imp:'Esgotamento de recursos hídricos; aumento de custos',prob:3,sev:3},
  {code:'A12',type:'env',asp:'Consumo excessivo de energia elétrica',imp:'Aumento da pegada de carbono; dependência energética',prob:3,sev:2},
  {code:'A13',type:'env',asp:'Consumo de combustível fóssil (diesel, gasolina, GNV)',imp:'Emissão de GEE; esgotamento de recursos não renováveis',prob:3,sev:3},
  {code:'A14',type:'env',asp:'Vazamento de óleo lubrificante ou hidráulico',imp:'Contaminação do solo e da água superficial',prob:3,sev:4},
  {code:'A15',type:'env',asp:'Vazamento de produto químico perigoso',imp:'Contaminação de solo, água e ar; risco à biota',prob:2,sev:5},
  {code:'A16',type:'env',asp:'Derramamento acidental de substância perigosa',imp:'Contaminação imediata do ambiente; passivo ambiental',prob:2,sev:5},
  {code:'A17',type:'env',asp:'Descarte inadequado de embalagens contaminadas',imp:'Contaminação do solo; veiculação de substâncias perigosas',prob:2,sev:3},
  {code:'A18',type:'env',asp:'Uso de substâncias ozonodepletoras (CFCs, HCFCs)',imp:'Destruição da camada de ozônio',prob:2,sev:4},
  {code:'A19',type:'env',asp:'Supressão de vegetação nativa',imp:'Perda de biodiversidade; erosão do solo',prob:1,sev:4},
  {code:'A20',type:'env',asp:'Geração de resíduo de construção e demolição (RCD)',imp:'Disposição irregular; contaminação do solo',prob:2,sev:2},
  {code:'A21',type:'env',asp:'Emissão de luz artificial (poluição luminosa)',imp:'Perturbação da fauna noturna; incômodo à comunidade',prob:2,sev:1},
  {code:'A22',type:'env',asp:'Contaminação do solo por resíduo industrial',imp:'Passivo ambiental; risco à saúde humana e ecossistema',prob:2,sev:4},
  {code:'A23',type:'env',asp:'Descarte de REEE (lixo eletrônico)',imp:'Metais pesados no solo; contaminação da cadeia trófica',prob:2,sev:3},
  {code:'A24',type:'env',asp:'Geração de lodo de ETE/ETA',imp:'Disposição incorreta pode contaminar solo e água',prob:2,sev:3},
  {code:'A25',type:'env',asp:'Uso de agrotóxico ou pesticida',imp:'Contaminação de solo e água; impacto na biodiversidade',prob:2,sev:4},
  // ---- SST (sst) ----
  {code:'S01',type:'sst',asp:'Queda de pessoa em mesmo nível (escorregão, tropeço)',imp:'Contusão, fratura, afastamento',prob:4,sev:2},
  {code:'S02',type:'sst',asp:'Queda de pessoa em nível diferente (>2m — NR-35)',imp:'Fratura grave, TCE, óbito',prob:3,sev:5},
  {code:'S03',type:'sst',asp:'Queda de objeto ou material sobre trabalhador',imp:'Contusão, fratura, TCE, óbito',prob:3,sev:4},
  {code:'S04',type:'sst',asp:'Contato com superfícies cortantes ou perfurantes',imp:'Laceração, perfuração, infecção',prob:4,sev:2},
  {code:'S05',type:'sst',asp:'Contato com partes móveis de máquinas (NR-12)',imp:'Amputação, esmagamento, óbito',prob:2,sev:5},
  {code:'S06',type:'sst',asp:'Aprisionamento / enrolamento em equipamento rotativo',imp:'Amputação, esmagamento, óbito',prob:2,sev:5},
  {code:'S07',type:'sst',asp:'Choque elétrico — contato direto (NR-10)',imp:'Queimadura, parada cardiorrespiratória, óbito',prob:2,sev:5},
  {code:'S08',type:'sst',asp:'Choque elétrico — contato indireto',imp:'Queimadura, parada cardiorrespiratória',prob:2,sev:4},
  {code:'S09',type:'sst',asp:'Incêndio / explosão em área de risco',imp:'Queimaduras, intoxicação, óbito, dano patrimonial',prob:2,sev:5},
  {code:'S10',type:'sst',asp:'Exposição a ruído acima do limite (NR-15)',imp:'PAIR — Perda Auditiva Induzida por Ruído',prob:4,sev:3},
  {code:'S11',type:'sst',asp:'Exposição a calor excessivo (NR-15 Anexo 3)',imp:'Estresse térmico, insolação, óbito',prob:3,sev:4},
  {code:'S12',type:'sst',asp:'Exposição a frio abaixo do limite (NR-15 Anexo 9)',imp:'Hipotermia, lesão por frio',prob:2,sev:3},
  {code:'S13',type:'sst',asp:'Exposição a vibração de corpo inteiro',imp:'Doença da coluna vertebral, LER/DORT',prob:3,sev:3},
  {code:'S14',type:'sst',asp:'Exposição a vibração mãos-braços',imp:'Síndrome de Raynaud, LER/DORT',prob:3,sev:3},
  {code:'S15',type:'sst',asp:'Exposição a agente químico por inalação',imp:'Intoxicação aguda ou crônica, doença ocupacional',prob:3,sev:4},
  {code:'S16',type:'sst',asp:'Exposição a agente químico por contato dérmico',imp:'Dermatite, queimadura química, absorção tóxica',prob:3,sev:3},
  {code:'S17',type:'sst',asp:'Exposição a agente biológico (bactérias, vírus, fungos)',imp:'Infecção, doença ocupacional',prob:2,sev:4},
  {code:'S18',type:'sst',asp:'Sobrecarga física — levantamento manual de cargas (NR-17)',imp:'LER/DORT, hérnia de disco, afastamento',prob:4,sev:3},
  {code:'S19',type:'sst',asp:'Postura inadequada prolongada',imp:'LER/DORT, lombalgia, afastamento',prob:4,sev:2},
  {code:'S20',type:'sst',asp:'Movimentos repetitivos',imp:'LER/DORT, tendinite, síndrome do túnel do carpo',prob:4,sev:2},
  {code:'S21',type:'sst',asp:'Colisão de veículos / empilhadeiras em área interna',imp:'Trauma grave, esmagamento, óbito',prob:2,sev:5},
  {code:'S22',type:'sst',asp:'Acidente de trânsito em deslocamento a trabalho',imp:'Trauma, invalidez, óbito',prob:3,sev:4},
  {code:'S23',type:'sst',asp:'Exposição a radiação ionizante',imp:'Queimadura por radiação, câncer, óbito',prob:1,sev:5},
  {code:'S24',type:'sst',asp:'Exposição a radiação não ionizante (UV, laser, IR)',imp:'Lesão ocular, queimadura de pele',prob:2,sev:3},
  {code:'S25',type:'sst',asp:'Risco de afogamento (trabalho próximo a água)',imp:'Afogamento, óbito',prob:1,sev:5},
  {code:'S26',type:'sst',asp:'Trabalho em espaço confinado (NR-33)',imp:'Asfixia, intoxicação, óbito',prob:2,sev:5},
  {code:'S27',type:'sst',asp:'Trabalho com eletricidade em alta tensão (NR-10)',imp:'Arco elétrico, queimadura grave, óbito',prob:1,sev:5},
  {code:'S28',type:'sst',asp:'Violência / assédio no trabalho',imp:'Dano psicológico, estresse, afastamento',prob:2,sev:3},
  {code:'S29',type:'sst',asp:'Exposição a estresse térmico no trabalho externo',imp:'Insolação, desidratação, colapso',prob:3,sev:3},
  {code:'S30',type:'sst',asp:'Fadiga / sobrecarga mental',imp:'Erro humano, acidente, burnout, afastamento',prob:3,sev:3},
];

var catEditIndex = null;

function applyCatalogCode(val) {
  var code = val.trim().toUpperCase();
  var item = CATALOG.find(function(c){return c.code === code;});
  if (item) applyCatalogItem(item);
}

function searchCatalog(q) {
  var filter = document.getElementById('cat-filter').value;
  var term = (q||'').toLowerCase().trim();
  var results = CATALOG.filter(function(c){
    if (filter !== 'all' && c.type !== filter) return false;
    if (!term) return true;
    return c.code.toLowerCase().includes(term) ||
           c.asp.toLowerCase().includes(term) ||
           c.imp.toLowerCase().includes(term);
  });
  var el = document.getElementById('cat-results');
  if (!results.length) {
    el.innerHTML = '<div style="padding:12px;text-align:center;font-size:12px;color:var(--text3)">Nenhum item encontrado</div>';
    return;
  }
  el.innerHTML = results.slice(0,12).map(function(c){
    var tc = c.type==='env'?'var(--green-d)':'var(--blue-d)';
    var tb = c.type==='env'?'var(--green-l)':'var(--blue-l)';
    return '<div onclick="applyCatalogItem(CATALOG.find(function(x){return x.code===\''+c.code+'\'}))" '
      +'style="display:flex;align-items:flex-start;gap:10px;padding:8px 12px;cursor:pointer;border-bottom:1px solid var(--gray-b);transition:background .12s" '
      +'onmouseover="this.style.background=\'var(--gray-l)\'" onmouseout="this.style.background=\'\'">'
      +'<span style="font-family:\'DM Mono\',monospace;font-size:11px;font-weight:600;background:'+tb+';color:'+tc+';padding:2px 7px;border-radius:5px;flex-shrink:0;margin-top:1px">'+c.code+'</span>'
      +'<div style="flex:1;min-width:0">'
      +'<div style="font-size:12px;font-weight:500;color:var(--text)">'+esc(c.asp)+'</div>'
      +'<div style="font-size:11px;color:var(--text2);margin-top:1px">'+esc(c.imp)+'</div>'
      +'</div>'
      +'<span style="font-size:10px;color:var(--text3);white-space:nowrap;flex-shrink:0">P'+c.prob+' · S'+c.sev+'</span>'
      +'</div>';
  }).join('') + (results.length>12?'<div style="padding:8px 12px;font-size:11px;color:var(--text2);text-align:center">... e mais '+(results.length-12)+' resultados. Refine a pesquisa.</div>':'');
}

function applyCatalogItem(item) {
  if (!item) return;
  document.getElementById('ap-type').value = item.type;
  document.getElementById('ap-asp').value  = item.asp;
  document.getElementById('ap-imp').value  = item.imp;
  document.getElementById('ap-prob').value = item.prob;
  document.getElementById('ap-sev').value  = item.sev;
  var codeTag = document.getElementById('ap-asp-code');
  codeTag.textContent = item.code;
  codeTag.style.display = 'inline';
  document.getElementById('cat-code').value = item.code;
  document.getElementById('cat-results').innerHTML = '';
  document.getElementById('cat-search').value = '';
  document.getElementById('ap-proc').focus();
}

// Gerenciador
function openCatalogManager() {
  closeMod('ap-modal');
  catEditIndex = null;
  document.getElementById('cat-add-form').style.display = 'none';
  renderCatalogManager();
  openMod('catalog-modal');
}

function renderCatalogManager() {
  var q = (document.getElementById('cat-mgr-search').value||'').toLowerCase();
  var f = document.getElementById('cat-mgr-filter').value;
  var items = CATALOG.filter(function(c){
    if (f !== 'all' && c.type !== f) return false;
    return !q || c.code.toLowerCase().includes(q) || c.asp.toLowerCase().includes(q) || c.imp.toLowerCase().includes(q);
  });
  document.getElementById('cat-count').textContent = items.length + ' de ' + CATALOG.length + ' itens';
  var clsMap={env:'<span style="font-size:10px;padding:1px 6px;border-radius:10px;background:var(--green-l);color:var(--green-d);font-weight:600">🌿 Ambiental</span>',
              sst:'<span style="font-size:10px;padding:1px 6px;border-radius:10px;background:var(--blue-l);color:var(--blue-d);font-weight:600">⛑️ SST</span>'};
  var body = document.getElementById('cat-mgr-body');
  body.innerHTML = items.map(function(c, i){
    var realIdx = CATALOG.indexOf(c);
    return '<tr>'
      +'<td style="font-family:\'DM Mono\',monospace;font-weight:600;font-size:11px">'+c.code+'</td>'
      +'<td>'+clsMap[c.type]+'</td>'
      +'<td style="font-weight:500">'+esc(c.asp)+'</td>'
      +'<td style="color:var(--text2)">'+esc(c.imp)+'</td>'
      +'<td style="text-align:center">'+c.prob+'</td>'
      +'<td style="text-align:center">'+c.sev+'</td>'
      +'<td style="white-space:nowrap">'
      +'<button onclick="editCatalogItem('+realIdx+')" style="background:none;border:none;cursor:pointer;font-size:13px;color:var(--blue-d)" title="Editar">✏️</button>'
      +'<button onclick="removeCatalogItem('+realIdx+')" style="background:none;border:none;cursor:pointer;font-size:13px;color:var(--red)" title="Remover">×</button>'
      +'</td>'
      +'</tr>';
  }).join('');
}

function openAddCatalogItem() {
  catEditIndex = null;
  document.getElementById('cat-form-title').textContent = 'Novo item no catálogo';
  document.getElementById('cat-new-code').value='';
  document.getElementById('cat-new-asp').value='';
  document.getElementById('cat-new-imp').value='';
  document.getElementById('cat-new-type').value='env';
  document.getElementById('cat-new-prob').value='3';
  document.getElementById('cat-new-sev').value='3';
  document.getElementById('cat-add-form').style.display='block';
  document.getElementById('cat-new-code').focus();
}

function editCatalogItem(i) {
  var c = CATALOG[i];
  catEditIndex = i;
  document.getElementById('cat-form-title').textContent = 'Editar item — '+c.code;
  document.getElementById('cat-new-code').value = c.code;
  document.getElementById('cat-new-type').value = c.type;
  document.getElementById('cat-new-asp').value  = c.asp;
  document.getElementById('cat-new-imp').value  = c.imp;
  document.getElementById('cat-new-prob').value = c.prob;
  document.getElementById('cat-new-sev').value  = c.sev;
  document.getElementById('cat-add-form').style.display='block';
  document.getElementById('cat-new-asp').focus();
}

function saveCatalogItem() {
  var code = document.getElementById('cat-new-code').value.trim().toUpperCase();
  var asp  = document.getElementById('cat-new-asp').value.trim();
  var imp  = document.getElementById('cat-new-imp').value.trim();
  if (!code || !asp) { alert('Preencha o código e o aspecto/perigo.'); return; }
  // verifica código duplicado (exceto na edição do próprio item)
  var dup = CATALOG.findIndex(function(c){return c.code===code;});
  if (dup !== -1 && dup !== catEditIndex) { alert('Código "'+code+'" já existe no catálogo.'); return; }
  var item = {
    code: code,
    type: document.getElementById('cat-new-type').value,
    asp:  asp, imp:  imp,
    prob: parseInt(document.getElementById('cat-new-prob').value),
    sev:  parseInt(document.getElementById('cat-new-sev').value)
  };
  if (catEditIndex !== null) CATALOG[catEditIndex] = item;
  else CATALOG.push(item);
  cancelCatForm();
  renderCatalogManager();
}

function cancelCatForm() {
  document.getElementById('cat-add-form').style.display='none';
  catEditIndex = null;
}

function removeCatalogItem(i) {
  if (!confirm('Remover "'+CATALOG[i].code+' — '+CATALOG[i].asp+'" do catálogo?')) return;
  CATALOG.splice(i,1);
  renderCatalogManager();
}

function exportCatalog() {
  var lines = ['# SGI — CATÁLOGO PADRONIZADO DE ASPECTOS/PERIGOS','# Formato: codigo,tipo,aspecto,impacto,prob_sugerida,sev_sugerida','codigo,tipo,aspecto,impacto,prob_sugerida,sev_sugerida'];
  CATALOG.forEach(function(c){
    lines.push([c.code,c.type,c.asp,c.imp,c.prob,c.sev].map(csvEscape).join(','));
  });
  var blob = new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='SGI_Catalogo_Padronizado.csv'; a.click();
}

function importCatalog(input) {
  var file = input.files[0]; if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var text = e.target.result.replace(/^\uFEFF/,'');
    var lines = text.split(/\r?\n/);
    var added=0, updated=0;
    lines.forEach(function(line){
      if(!line.trim()||line.startsWith('#')) return;
      var cols = parseCSVLine(line);
      if(cols.length<4) return;
      var code=cols[0].trim().toUpperCase();
      if(code==='CODIGO'||!code) return;
      var item={code:code,type:cols[1].trim()||'env',asp:cols[2].trim(),imp:cols[3].trim(),
                prob:parseInt(cols[4])||3,sev:parseInt(cols[5])||3};
      var idx=CATALOG.findIndex(function(c){return c.code===code;});
      if(idx!==-1){CATALOG[idx]=item;updated++;}else{CATALOG.push(item);added++;}
    });
    input.value='';
    alert('Catálogo atualizado: '+added+' adicionado(s), '+updated+' atualizado(s).');
    renderCatalogManager();
  };
  reader.readAsText(file,'UTF-8');
}

function openAPModal() {
  document.getElementById('cat-code').value='';
  document.getElementById('cat-search').value='';
  document.getElementById('cat-results').innerHTML='';
  document.getElementById('ap-asp-code').style.display='none';
  // mostra os primeiros itens ao abrir
  searchCatalog('');
  openMod('ap-modal');
}

// ===== EXPORTAR / IMPORTAR CAMPO =====

var CSV_HEADER = [
  'Codigo (catalogo)',
  'Tipo (env=Ambiental / sst=SST)',
  'Processo / Atividade',
  'Aspecto Ambiental ou Perigo SST',
  'Impacto / Consequencia',
  'Condicao (N=Normal / A=Anormal / E=Emergencia)',
  'Probabilidade (1=MuitoBaixa 2=Baixa 3=Media 4=Alta 5=MuitoAlta)',
  'Severidade (1=Insignificante 2=Menor 3=Moderada 4=Maior 5=Catastrofica)',
  'Responsavel pelo levantamento',
  'Area / Setor',
  'Observacoes de campo'
];

var CSV_EXAMPLES = [
  ['A14','env','Geração de resíduos sólidos','Descarte inadequado de óleo lubrificante usado','Contaminação do solo e lençol freático','N','3','4','','Manutenção',''],
  ['S02','sst','Operação em altura','Queda de pessoa em nível diferente (>2m)','Fratura grave, TCE, óbito','N','2','5','','Manutenção','Verificar andaimes e cintos'],
  ['A06','env','Processos de pintura','Emissão de COVs (compostos orgânicos voláteis)','Poluição atmosférica local','N','4','3','','Produção',''],
  ['S05','sst','Operação de prensas','Contato com partes móveis de máquinas (NR-12)','Amputação, esmagamento, óbito','N','2','5','','Produção','NR-12 — proteções verificadas?'],
  ['A03','env','Lavagem de peças','Geração de efluente líquido industrial','Contaminação de corpos hídricos','N','3','3','','Qualidade',''],
];

function csvEscape(v) {
  var s = String(v == null ? '' : v);
  if (s.indexOf(',') !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// ===== DADOS DOS CATÁLOGOS PARA EXPORT =====
var CATALOG_ENV_DATA = [
  ["A01","Geracao de residuo solido nao perigoso","Contaminacao do solo; sobrecarga de aterros sanitarios","3","2"],
  ["A02","Geracao de residuo solido perigoso (Classe I)","Contaminacao do solo e lencol freatico; risco a saude humana","3","4"],
  ["A03","Geracao de efluente liquido industrial","Contaminacao de corpos hidricos; mortandade de fauna aquatica","3","4"],
  ["A04","Geracao de efluente domestico (esgoto sanitario)","Contaminacao microbiologica de solo e agua","2","3"],
  ["A05","Emissao de material particulado (poeira/fumaca)","Poluicao atmosferica; problemas respiratorios na comunidade","3","3"],
  ["A06","Emissao de COVs (compostos organicos volateis)","Poluicao atmosferica; formacao de ozonio troposferico","3","3"],
  ["A07","Emissao de gases de combustao (CO2, NOx, SOx)","Contribuicao ao efeito estufa; chuva acida","3","3"],
  ["A08","Emissao de ruido acima do limite (NR-15/CONAMA 01)","Poluicao sonora; incomodo a comunidade","3","3"],
  ["A09","Emissao de vibracao","Incomodo a comunidade; danos a edificacoes vizinhas","2","2"],
  ["A10","Geracao de odor ofensivo","Incomodo a comunidade; impacto na qualidade de vida","2","2"],
  ["A11","Consumo excessivo de agua","Esgotamento de recursos hidricos; aumento de custos","3","3"],
  ["A12","Consumo excessivo de energia eletrica","Aumento da pegada de carbono; dependencia energetica","3","2"],
  ["A13","Consumo de combustivel fossil","Emissao de GEE; esgotamento de recursos nao renovaveis","3","3"],
  ["A14","Vazamento de oleo lubrificante ou hidraulico","Contaminacao do solo e da agua superficial","3","4"],
  ["A15","Vazamento de produto quimico perigoso","Contaminacao de solo, agua e ar; risco a biota","2","5"],
  ["A16","Derramamento acidental de substancia perigosa","Contaminacao imediata do ambiente; passivo ambiental","2","5"],
  ["A17","Descarte inadequado de embalagens contaminadas","Contaminacao do solo; veiculacao de substancias perigosas","2","3"],
  ["A18","Uso de substancias ozonodepletoras (CFCs, HCFCs)","Destruicao da camada de ozonio","2","4"],
  ["A19","Supressao de vegetacao nativa","Perda de biodiversidade; erosao do solo","1","4"],
  ["A20","Geracao de residuo de construcao e demolicao","Disposicao irregular; contaminacao do solo","2","2"],
  ["A21","Emissao de luz artificial (poluicao luminosa)","Perturbacao da fauna noturna; incomodo a comunidade","2","1"],
  ["A22","Contaminacao do solo por residuo industrial","Passivo ambiental; risco a saude humana e ecossistema","2","4"],
  ["A23","Descarte de REEE (lixo eletronico)","Metais pesados no solo; contaminacao da cadeia trofica","2","3"],
  ["A24","Geracao de lodo de ETE/ETA","Disposicao incorreta pode contaminar solo e agua","2","3"],
  ["A25","Uso de agrotóxico ou pesticida","Contaminacao de solo e agua; impacto na biodiversidade","2","4"],
];

var CATALOG_SST_DATA = [
  ["S01","Queda em mesmo nivel (escorregao, tropeco)","Contusao, fratura, afastamento","4","2"],
  ["S02","Queda em nivel diferente (>2m - NR-35)","Fratura grave, TCE, obito","3","5"],
  ["S03","Queda de objeto ou material sobre trabalhador","Contusao, fratura, TCE, obito","3","4"],
  ["S04","Contato com superficies cortantes ou perfurantes","Laceracao, perfuracao, infeccao","4","2"],
  ["S05","Contato com partes moveis de maquinas (NR-12)","Amputacao, esmagamento, obito","2","5"],
  ["S06","Aprisionamento/enrolamento em equipamento rotativo","Amputacao, esmagamento, obito","2","5"],
  ["S07","Choque eletrico - contato direto (NR-10)","Queimadura, parada cardiorrespiratoria, obito","2","5"],
  ["S08","Choque eletrico - contato indireto","Queimadura, parada cardiorrespiratoria","2","4"],
  ["S09","Incendio/explosao em area de risco","Queimaduras, intoxicacao, obito","2","5"],
  ["S10","Exposicao a ruido acima do limite (NR-15)","PAIR - Perda Auditiva Induzida por Ruido","4","3"],
  ["S11","Exposicao a calor excessivo (NR-15 Anexo 3)","Estresse termico, insolacao, obito","3","4"],
  ["S12","Exposicao a frio abaixo do limite (NR-15 Anexo 9)","Hipotermia, lesao por frio","2","3"],
  ["S13","Exposicao a vibracao de corpo inteiro","Doenca da coluna vertebral, LER/DORT","3","3"],
  ["S14","Exposicao a vibracao maos-bracos","Sindrome de Raynaud, LER/DORT","3","3"],
  ["S15","Exposicao a agente quimico por inalacao","Intoxicacao aguda ou cronica, doenca ocupacional","3","4"],
  ["S16","Exposicao a agente quimico por contato dermico","Dermatite, queimadura quimica, absorcao toxica","3","3"],
  ["S17","Exposicao a agente biologico","Infeccao, doenca ocupacional","2","4"],
  ["S18","Sobrecarga fisica - levantamento manual (NR-17)","LER/DORT, hernia de disco, afastamento","4","3"],
  ["S19","Postura inadequada prolongada","LER/DORT, lombalgia, afastamento","4","2"],
  ["S20","Movimentos repetitivos","LER/DORT, tendinite, sindrome do tunel do carpo","4","2"],
  ["S21","Colisao de veiculos/empilhadeiras em area interna","Trauma grave, esmagamento, obito","2","5"],
  ["S22","Acidente de transito em deslocamento a trabalho","Trauma, invalidez, obito","3","4"],
  ["S23","Exposicao a radiacao ionizante","Queimadura por radiacao, cancer, obito","1","5"],
  ["S24","Exposicao a radiacao nao ionizante (UV, laser, IR)","Lesao ocular, queimadura de pele","2","3"],
  ["S25","Risco de afogamento (trabalho proximo a agua)","Afogamento, obito","1","5"],
  ["S26","Trabalho em espaco confinado (NR-33)","Asfixia, intoxicacao, obito","2","5"],
  ["S27","Trabalho com eletricidade em alta tensao (NR-10)","Arco eletrico, queimadura grave, obito","1","5"],
  ["S28","Violencia/assedio no trabalho","Dano psicologico, estresse, afastamento","2","3"],
  ["S29","Exposicao a estresse termico no trabalho externo","Insolacao, desidratacao, colapso","3","3"],
  ["S30","Fadiga/sobrecarga mental","Erro humano, acidente, burnout, afastamento","3","3"],
];

// ===== GERA CSV COM ENCODING WINDOWS-1252 VIA BLOB =====
function toWin1252CSV(rows, sep) {
  // Monta string CSV com separador definido
  sep = sep || ';';
  function qf(v) {
    var s = String(v == null ? '' : v).replace(/"/g,'""');
    if (s.indexOf(sep) !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) return '"'+s+'"';
    return s;
  }
  return rows.map(function(r){ return r.map(qf).join(sep); }).join('\r\n');
}

function downloadCSV(content, filename) {
  // Converte para Windows-1252 caracter a caracter usando TextEncoder não disponível
  // Usa ISO-8859-1 que o Excel BR aceita igualmente (superconjunto para pt-BR)
  var bytes = [];
  for (var i = 0; i < content.length; i++) {
    var cc = content.charCodeAt(i);
    // Caracteres especiais pt-BR mais comuns mapeados para latin-1
    bytes.push(cc > 255 ? 63 : cc); // 63 = '?' para caracteres fora do range
  }
  var blob = new Blob([new Uint8Array(bytes)], { type: 'text/csv;charset=windows-1252' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// ===== EXPORTAR ISO 14001 =====
function exportCSV14001() {
  var org = document.getElementById('org-name').value || 'Organizacao';
  var dt  = new Date().toLocaleDateString('pt-BR');
  var SEP = ';';
  var N = 14; // numero de colunas
  function W(t){ return [t].concat(Array(N-1).fill('')); }
  function B(){ return Array(N).fill(''); }

  var rows = [
    ['sep=;'].concat(Array(N-1).fill('')),
    W('SGI - ISO 14001:2026 | LEVANTAMENTO DE ASPECTOS E IMPACTOS AMBIENTAIS'),
    W('Identificacao por Atividade / Produto / Servico com Perspectiva de Ciclo de Vida'),
    W('Organizacao: ' + org + '   |   Data: ' + dt),
    B(),
    W('INSTRUCOES:'),
    W('1. Identifique cada aspecto para cada Atividade, Produto ou Servico da organizacao.'),
    W('2. Para cada item, indique a Etapa do Ciclo de Vida (veja opcoes abaixo).'),
    W('3. Use o Codigo do catalogo (secao abaixo) para padronizar o aspecto e impacto.'),
    W('4. Score = Probabilidade x Severidade. Defina a Significancia com base no criterio da organizacao.'),
    W('5. Salve o arquivo sem mudar o formato e use o botao IMPORTAR 14001 na ferramenta SGI.'),
    B(),
    W('ETAPAS DO CICLO DE VIDA (ISO 14001:2026 clausula 6.1.2):'),
    W('   1-Aquisicao de materias-primas'),
    W('   2-Design/Projeto'),
    W('   3-Producao/Operacao'),
    W('   4-Transporte/Entrega'),
    W('   5-Utilizacao pelo cliente'),
    W('   6-Tratamento fim de vida'),
    B(),
    W('LEGENDA: Condicao: N=Normal | A=Anormal | E=Emergencia'),
    W('Probabilidade: 1=Muito baixa | 2=Baixa | 3=Media | 4=Alta | 5=Muito alta'),
    W('Severidade: 1=Insignificante | 2=Menor | 3=Moderada | 4=Maior | 5=Catastrofica'),
    W('Score P x S: 1-4 Baixo | 5-9 Medio | 10-16 Alto | 17-25 Critico'),
    W('Significancia: S=Significativo (requer objetivo/meta/controle) | N=Nao significativo'),
    B(),
    W('>>> AREA DE PREENCHIMENTO - apague os exemplos e preencha abaixo <<<'),
    ['Codigo (catalogo)','Atividade / Produto / Servico','Etapa do Ciclo de Vida','Aspecto Ambiental','Impacto Ambiental','Condicao [N/A/E]','Probabilidade [1-5]','Severidade [1-5]','Score (P x S)','Significancia [S/N]','Criterio de Significancia','Responsavel','Area / Setor','Observacoes'],
    // Exemplos
    ['A14','Manutencao de maquinas','3-Producao/Operacao','Vazamento de oleo lubrificante','Contaminacao do solo e agua subterranea','N','3','4','12','S','Score >= 10','Tecnico Amb.','Manutencao','Verificar bandeja de contencao'],
    ['A06','Pintura de pecas','3-Producao/Operacao','Emissao de COVs','Poluicao atmosferica','N','4','3','12','S','Score >= 10','Tecnico Amb.','Producao',''],
    ['A11','Todos os processos','3-Producao/Operacao','Consumo excessivo de agua','Esgotamento de recursos hidricos','N','3','3','9','N','Score < 10','Tecnico Amb.','Utilidades',''],
    ['A01','Escritorios','3-Producao/Operacao','Geracao de residuo solido','Contaminacao do solo','N','3','2','6','N','Score < 10','Tecnico Amb.','Administrativo',''],
    ['A15','Almoxarifado de quimicos','3-Producao/Operacao','Vazamento de produto quimico','Contaminacao de solo agua e ar','E','2','5','10','S','Emergencia=sempre significativo','Tecnico Amb.','Almoxarifado',''],
  ];
  // 50 linhas em branco
  for (var i=0; i<50; i++) rows.push(B());
  rows.push(W('>>> FIM DA AREA DE PREENCHIMENTO <<<'));
  rows.push(B());
  rows.push(W('CATALOGO DE REFERENCIA - use os codigos acima | Esta secao NAO sera importada pela ferramenta'));
  rows.push(B());
  rows.push(['Codigo','Aspecto Ambiental','Impacto / Consequencia','P suger.','S suger.'].concat(Array(9).fill('')));
  CATALOG_ENV_DATA.forEach(function(c){ rows.push(c.concat(Array(9).fill(''))); });

  downloadCSV(toWin1252CSV(rows, SEP), 'SGI_14001_Aspectos_Impactos_' + new Date().toISOString().slice(0,10) + '.csv');
}

// ===== EXPORTAR ISO 45001 =====
function exportCSV45001() {
  var org = document.getElementById('org-name').value || 'Organizacao';
  var dt  = new Date().toLocaleDateString('pt-BR');
  var SEP = ';';
  var M = 16;
  function W(t){ return [t].concat(Array(M-1).fill('')); }
  function B(){ return Array(M).fill(''); }

  var rows = [
    ['sep=;'].concat(Array(M-1).fill('')),
    W('SGI - ISO 45001:2018 | LEVANTAMENTO DE PERIGOS E AVALIACAO DE RISCOS DE SST'),
    W('Identificacao por Atividade / Produto / Servico com Hierarquia de Controles'),
    W('Organizacao: ' + org + '   |   Data: ' + dt),
    B(),
    W('INSTRUCOES:'),
    W('1. Identifique cada perigo para cada Atividade, Produto ou Servico da organizacao.'),
    W('2. Use o Codigo do catalogo (secao abaixo) para padronizar.'),
    W('3. Grau do Risco = Probabilidade x Severidade: 1-4 Baixo | 5-9 Medio | 10-16 Alto | 17-25 Critico.'),
    W('4. Informe o Controle EXISTENTE e seu nivel na hierarquia. Indique Controle ADICIONAL se necessario.'),
    W('5. Salve sem mudar o formato e use o botao IMPORTAR 45001 na ferramenta SGI.'),
    B(),
    W('HIERARQUIA DE CONTROLES (ISO 45001:2018 clausula 8.1.2 - maior para menor preferencia):'),
    W('   1-Eliminacao (remover o perigo)'),
    W('   2-Substituicao (substituir por algo menos perigoso)'),
    W('   3-Controles de Engenharia (isolamento, enclausuramento)'),
    W('   4-Controles Administrativos (procedimentos, treinamento, sinalizacao)'),
    W('   5-EPI (equipamento de protecao individual - ultimo recurso)'),
    B(),
    W('LEGENDA: Condicao: N=Normal | A=Anormal | E=Emergencia'),
    W('Probabilidade: 1=Muito baixa | 2=Baixa | 3=Media | 4=Alta | 5=Muito alta'),
    W('Severidade: 1=Insignificante | 2=Menor | 3=Moderada | 4=Maior | 5=Catastrofica'),
    B(),
    W('>>> AREA DE PREENCHIMENTO - apague os exemplos e preencha abaixo <<<'),
    ['Codigo (catalogo)','Atividade / Produto / Servico','Perigo SST','Risco / Consequencia','Condicao [N/A/E]','Probabilidade [1-5]','Severidade [1-5]','Grau do Risco (P x S)','Nivel do Risco','Controle Existente','Nivel Hierarquia [1-5]','Controle Adicional Necessario','Responsavel','Prazo','Area / Setor','Observacoes / NR Aplicavel'],
    // Exemplos
    ['S02','Trabalho em telhados e estruturas','Queda em nivel diferente (>2m)','Fratura grave, TCE, obito','N','2','5','10','Alto','Linha de vida fixa','3-Eng.','Implementar ancoragem movel','Jose Silva','30/06/2026','Manutencao','NR-35'],
    ['S05','Operacao de prensa hidraulica','Contato com partes moveis de maquinas','Amputacao, esmagamento','N','2','5','10','Alto','Grade de protecao','3-Eng.','Verificar intertravamento','Ana Costa','15/06/2026','Producao','NR-12'],
    ['S10','Operacao de compressores','Exposicao a ruido acima do limite','PAIR','N','4','3','12','Alto','Protetor auricular','5-EPI','Avaliar enclausuramento','Pedro Lima','30/07/2026','Utilidades','NR-15'],
    ['S18','Movimentacao manual de cargas','Sobrecarga fisica - levantamento','LER/DORT, hernia de disco','N','4','3','12','Alto','Treinamento NR-17','4-Adm.','Avaliar uso de carrinho/elevador','Maria Souza','30/06/2026','Logistica','NR-17'],
    ['S07','Manutencao de painel eletrico','Choque eletrico - contato direto','Queimadura, parada cardiaca, obito','A','2','5','10','Alto','Procedimento de bloqueio','4-Adm.','Implementar LOTO formal','Carlos Mendes','15/06/2026','Manutencao','NR-10'],
  ];
  for (var i=0; i<50; i++) rows.push(B());
  rows.push(W('>>> FIM DA AREA DE PREENCHIMENTO <<<'));
  rows.push(B());
  rows.push(W('CATALOGO DE REFERENCIA - use os codigos acima | Esta secao NAO sera importada pela ferramenta'));
  rows.push(B());
  rows.push(['Codigo','Perigo SST','Consequencia / Risco','P suger.','S suger.'].concat(Array(11).fill('')));
  CATALOG_SST_DATA.forEach(function(c){ rows.push(c.concat(Array(11).fill(''))); });

  downloadCSV(toWin1252CSV(rows, SEP), 'SGI_45001_Perigos_Riscos_' + new Date().toISOString().slice(0,10) + '.csv');
}

// ===== IMPORTAR ISO 14001 =====
function importCSV14001(input) {
  importGeneric(input, '14001', 'import-status-14001');
}

// ===== IMPORTAR ISO 45001 =====
function importCSV45001(input) {
  importGeneric(input, '45001', 'import-status-45001');
}

function importGeneric(input, norma, statusId) {
  var file = input.files[0];
  if (!file) return;
  var status = document.getElementById(statusId);
  status.innerHTML = 'Lendo arquivo...';
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var text = e.target.result.replace(/^\uFEFF/, '');
      var lines = text.split(/\r?\n/);
      var imported = 0, skipped = 0;
      var inZone = false, stop = false;

      lines.forEach(function(line, idx) {
        if (stop) return;
        var trimmed = line.trim();
        if (!trimmed) return;
        if (trimmed.toLowerCase().startsWith('sep=')) return;
        if (trimmed.indexOf('AREA DE PREENCHIMENTO') !== -1 && trimmed.indexOf('FIM') === -1) { inZone = true; return; }
        if (trimmed.indexOf('FIM DA AREA') !== -1 || trimmed.indexOf('CATALOGO DE REFERENCIA') !== -1) { stop = true; return; }
        if (!inZone) return;

        var cols = parseCSVLine(trimmed);
        var first = (cols[0]||'').trim().toLowerCase();
        // ignora cabeçalhos de coluna
        if (first.indexOf('codigo') !== -1 || first === '') return;

        var catCode = (cols[0]||'').trim().toUpperCase();
        var tipo    = norma === '14001' ? 'env' : 'sst';

        if (norma === '14001') {
          // cols: Codigo, Atividade/Prod/Serv, Etapa Ciclo Vida, Aspecto, Impacto, Cond, P, S, Score, Sig, Criterio, Resp, Area, Obs
          var proc  = (cols[1]||'').trim();
          var ciclo = (cols[2]||'').trim();
          var asp   = (cols[3]||'').trim();
          var imp   = (cols[4]||'').trim();
          var cond  = (cols[5]||'N').trim().toUpperCase();
          var prob  = parseInt(cols[6]) || 3;
          var sev   = parseInt(cols[7]) || 3;
          var sig   = (cols[9]||'').trim().toUpperCase();

          // auto-fill pelo catálogo se aspecto vazio
          if (catCode && !asp) {
            var ci = CATALOG.find(function(c){ return c.code === catCode; });
            if (ci) { asp = ci.asp; imp = ci.imp; if(!prob||prob<1) prob=ci.prob; if(!sev||sev<1) sev=ci.sev; }
          }
          if (!asp && !proc) return;
          if (prob<1||prob>5) prob=3; if (sev<1||sev>5) sev=3;
          if (cond!=='N'&&cond!=='A'&&cond!=='E') cond='N';
          var score = prob*sev;
          S.apItems.push({
            type:'env', proc: proc||'(nao informado)', asp: asp||'(nao informado)',
            imp: imp||'', cond: cond, prob: prob, sev: sev, score: score,
            cls: score<=4?'low':score<=9?'med':score<=16?'high':'crit',
            catCode: catCode, ciclo: ciclo, sig: sig, origem:'campo'
          });
          imported++;

        } else {
          // cols: Codigo, Atividade, Perigo, Risco/Conseq, Cond, P, S, Grau, Nivel, ControleExist, NivelHier, ControleAd, Resp, Prazo, Area, Obs
          var proc  = (cols[1]||'').trim();
          var asp   = (cols[2]||'').trim();  // perigo
          var imp   = (cols[3]||'').trim();  // consequencia
          var cond  = (cols[4]||'N').trim().toUpperCase();
          var prob  = parseInt(cols[5]) || 3;
          var sev   = parseInt(cols[6]) || 3;
          var hierCtrl = (cols[9]||'').trim();
          var hierNivel= (cols[10]||'').trim();
          var ctrlAd   = (cols[11]||'').trim();

          if (catCode && !asp) {
            var ci = CATALOG.find(function(c){ return c.code === catCode; });
            if (ci) { asp = ci.asp; imp = ci.imp; if(!prob||prob<1) prob=ci.prob; if(!sev||sev<1) sev=ci.sev; }
          }
          if (!asp && !proc) return;
          if (prob<1||prob>5) prob=3; if (sev<1||sev>5) sev=3;
          if (cond!=='N'&&cond!=='A'&&cond!=='E') cond='N';
          var score = prob*sev;
          S.apItems.push({
            type:'sst', proc: proc||'(nao informado)', asp: asp||'(nao informado)',
            imp: imp||'', cond: cond, prob: prob, sev: sev, score: score,
            cls: score<=4?'low':score<=9?'med':score<=16?'high':'crit',
            catCode: catCode, hierCtrl: hierCtrl, hierNivel: hierNivel, ctrlAd: ctrlAd, origem:'campo'
          });
          imported++;
        }
      });

      input.value = '';
      var msg = imported + ' item(s) importado(s) com sucesso.';
      if (skipped) msg += ' ' + skipped + ' ignorado(s).';
      status.innerHTML = '<span style="color:var(--green-d);font-weight:500">OK: ' + msg + '</span>';
      renderAP();
    } catch(err) {
      status.innerHTML = '<span style="color:var(--red)">Erro: ' + err.message + '</span>';
    }
  };
  reader.readAsText(file, 'windows-1252');
}

function exportFieldCSV() {
  var org = document.getElementById('org-name').value || 'Organização';
  var dt  = new Date().toLocaleDateString('pt-BR');
  var SEP = ';';   // ponto e vírgula — padrão Brasil no Excel
  var rows = [];

  // ── helpers ──────────────────────────────────────────────────────────────
  function q(v) {
    // escapa campo: se contém SEP, aspas ou quebra de linha, envolve em aspas duplas
    var s = String(v == null ? '' : v).replace(/"/g, '""');
    if (s.indexOf(SEP) !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
      return '"' + s + '"';
    }
    return s;
  }
  function row() {
    return Array.prototype.slice.call(arguments).map(q).join(SEP);
  }
  function blank() {
    return SEP+SEP+SEP+SEP+SEP+SEP+SEP+SEP+SEP+SEP;  // 10 separadores = 11 colunas vazias
  }
  function wide(text) {   // célula que ocupa toda a linha visualmente
    return q(text)+SEP+SEP+SEP+SEP+SEP+SEP+SEP+SEP+SEP+SEP;
  }

  // ── Primeira linha especial: instrui o Excel BR a usar ; como separador ──
  rows.push('sep=;');

  // ════════════════════════════════════════════════════════════════════════
  // BLOCO 1 — CABEÇALHO INFORMATIVO
  // ════════════════════════════════════════════════════════════════════════
  rows.push(wide('SGI — PLANILHA DE LEVANTAMENTO DE CAMPO  |  ISO 14001:2015 + ISO 45001:2018'));
  rows.push(row('Organização: ' + org, '', '', '', '', 'Data: ' + dt, '', '', '', '', ''));
  rows.push(blank());
  rows.push(wide('COMO USAR:'));
  rows.push(wide('1. Preencha uma linha por aspecto ou perigo identificado em campo.'));
  rows.push(wide('2. Use o CÓDIGO do catálogo (seção abaixo) para padronizar — o sistema preenche aspecto e impacto automaticamente.'));
  rows.push(wide('3. Sem código? Preencha Tipo, Aspecto e Impacto livremente.'));
  rows.push(wide('4. Salve o arquivo normalmente (não mude o formato!) e clique em IMPORTAR na ferramenta SGI.'));
  rows.push(blank());

  // ════════════════════════════════════════════════════════════════════════
  // BLOCO 2 — LEGENDA RÁPIDA
  // ════════════════════════════════════════════════════════════════════════
  rows.push(row('LEGENDA', 'TIPO', 'CONDIÇÃO', '', 'PROBABILIDADE (P)', '', '', 'SEVERIDADE (S)', '', '', ''));
  rows.push(row('', 'env = Aspecto Ambiental (ISO 14001)', 'N = Normal', '', '1 = Muito baixa', '2 = Baixa', '3 = Média', '1 = Insignificante', '2 = Menor', '3 = Moderada', ''));
  rows.push(row('', 'sst = Perigo SST (ISO 45001)', 'A = Anormal', '', '4 = Alta', '5 = Muito alta', '', '4 = Maior', '5 = Catastrófica', '', ''));
  rows.push(row('', '', 'E = Emergência', '', 'Score P×S: 1-4 Baixo', '5-9 Médio', '10-16 Alto', '17-25 Crítico', '', '', ''));
  rows.push(blank());

  // ════════════════════════════════════════════════════════════════════════
  // BLOCO 3 — ÁREA DE PREENCHIMENTO
  // ════════════════════════════════════════════════════════════════════════
  rows.push(wide('>>> ÁREA DE PREENCHIMENTO — apague os exemplos e preencha abaixo <<<'));

  // Cabeçalho das colunas
  rows.push(row(
    'Codigo (catalogo)',
    'Tipo  [env / sst]',
    'Processo / Atividade',
    'Aspecto Ambiental ou Perigo SST',
    'Impacto / Consequencia',
    'Condicao  [N / A / E]',
    'Probabilidade  [1 a 5]',
    'Severidade  [1 a 5]',
    'Responsavel',
    'Area / Setor',
    'Observacoes de campo'
  ));

  // Exemplos
  CSV_EXAMPLES.forEach(function(r) {
    rows.push(r.map(q).join(SEP));
  });

  // 40 linhas em branco para preenchimento
  for (var i = 0; i < 40; i++) rows.push(blank());

  rows.push(wide('>>> FIM DA ÁREA DE PREENCHIMENTO <<<'));
  rows.push(blank());

  // ════════════════════════════════════════════════════════════════════════
  // BLOCO 4 — CATÁLOGO DE REFERÊNCIA (apenas consulta — importador ignora)
  // ════════════════════════════════════════════════════════════════════════
  rows.push(wide('CATÁLOGO DE REFERÊNCIA — use os códigos acima no campo "Codigo (catalogo)"'));
  rows.push(wide('Esta seção é apenas para consulta em campo. Não será importada pela ferramenta SGI.'));
  rows.push(blank());

  rows.push(wide('— ASPECTOS AMBIENTAIS (ISO 14001) —'));
  rows.push(row('Código', 'Tipo', 'Aspecto Ambiental', 'Impacto / Consequência', 'P sugerida', 'S sugerida', '', '', '', '', ''));
  CATALOG.filter(function(c){ return c.type === 'env'; }).forEach(function(c) {
    var pL = {1:'1-Muito baixa',2:'2-Baixa',3:'3-Média',4:'4-Alta',5:'5-Muito alta'}[c.prob] || c.prob;
    var sL = {1:'1-Insignificante',2:'2-Menor',3:'3-Moderada',4:'4-Maior',5:'5-Catastrófica'}[c.sev] || c.sev;
    rows.push(row(c.code, 'Ambiental', c.asp, c.imp, pL, sL, '', '', '', '', ''));
  });

  rows.push(blank());
  rows.push(wide('— PERIGOS SST (ISO 45001) —'));
  rows.push(row('Código', 'Tipo', 'Perigo SST', 'Consequência', 'P sugerida', 'S sugerida', '', '', '', '', ''));
  CATALOG.filter(function(c){ return c.type === 'sst'; }).forEach(function(c) {
    var pL = {1:'1-Muito baixa',2:'2-Baixa',3:'3-Média',4:'4-Alta',5:'5-Muito alta'}[c.prob] || c.prob;
    var sL = {1:'1-Insignificante',2:'2-Menor',3:'3-Moderada',4:'4-Maior',5:'5-Catastrófica'}[c.sev] || c.sev;
    rows.push(row(c.code, 'SST', c.asp, c.imp, pL, sL, '', '', '', '', ''));
  });

  // ── Gera e baixa ─────────────────────────────────────────────────────────
  var bom  = '\uFEFF';   // BOM UTF-8 — garante acentos no Excel
  var blob = new Blob([bom + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  var a    = document.createElement('a');
  a.href   = URL.createObjectURL(blob);
  a.download = 'SGI_Levantamento_Campo_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
}


function exportFieldXLSX() {
  var org = document.getElementById('org-name').value || 'Organização';
  var dt  = new Date().toLocaleDateString('pt-BR');

  // ── Estilos globais ──
  var baseStyle = [
    'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;margin:0}',
    'h2{font-size:13pt;color:#0d6b50;margin:0 0 4px}',
    '.info{font-size:9pt;color:#555;margin-bottom:12px;line-height:1.7}',
    'table{border-collapse:collapse;width:100%}',
    'th{padding:7px 10px;text-align:left;font-size:10pt;border:1px solid #999}',
    'td{padding:6px 10px;border:1px solid #ccc;font-size:10pt;vertical-align:top}',
    '.th-data{background:#1D9E75;color:white}',
    '.th-cat{background:#185FA5;color:white}',
    'tr:nth-child(even) td{background:#f7fdf9}',
    '.ex td{background:#fffde7}',
    '.blank td{background:#ffffff;height:22px}',
    '.leg{font-size:9pt;color:#444;margin-top:16px;line-height:2;border-top:1px solid #ddd;padding-top:10px}',
    '.leg b{color:#185FA5}',
    '.cat-env{background:#d1f5e8;color:#0d6b50;font-size:9pt;padding:1px 6px;border-radius:4px;font-weight:600}',
    '.cat-sst{background:#dbeeff;color:#0e3d6e;font-size:9pt;padding:1px 6px;border-radius:4px;font-weight:600}',
    '.code{font-family:Courier New,monospace;font-weight:700;font-size:10pt}',
    'h3{font-size:12pt;color:#185FA5;margin:0 0 8px}',
    'p.note{font-size:9pt;color:#888;margin-bottom:10px}',
  ].join('');

  // ── ABA 1: Levantamento de campo ──
  var exRows = CSV_EXAMPLES.map(function(r) {
    return '<tr class="ex"><td class="code">' + (r[0]||'') + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td>'
      + '<td>' + r[3] + '</td><td>' + r[4] + '</td><td>' + r[5] + '</td><td>' + r[6] + '</td><td>' + r[7] + '</td>'
      + '<td>' + r[8] + '</td><td>' + r[9] + '</td><td>' + r[10] + '</td></tr>';
  }).join('');
  var blankRows = '';
  for (var i=0; i<40; i++) blankRows += '<tr class="blank"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';

  var sheet1 = '<html><head><meta charset="UTF-8"><style>' + baseStyle + '</style></head><body>'
    + '<h2>SGI — Planilha de Levantamento de Campo · ISO 14001 + ISO 45001</h2>'
    + '<div class="info">'
    + 'Organização: <b>' + org + '</b> &nbsp;·&nbsp; Emitido em: ' + dt + '<br>'
    + '📌 <b>Como usar:</b> Apague os exemplos (linhas amarelas) e preencha uma linha por aspecto/perigo.<br>'
    + 'Use o código do catálogo (aba "Catálogo de Referência") no campo <b>Codigo</b> para padronizar.<br>'
    + 'Salve como <b>.csv (UTF-8)</b> e importe na ferramenta SGI.'
    + '</div>'
    + '<table><thead><tr>'
    + '<th class="th-data">Código<br><small>(catálogo)</small></th>'
    + '<th class="th-data">Tipo<br><small>env / sst</small></th>'
    + '<th class="th-data">Processo / Atividade</th>'
    + '<th class="th-data">Aspecto / Perigo</th>'
    + '<th class="th-data">Impacto / Consequência</th>'
    + '<th class="th-data">Condição<br><small>N / A / E</small></th>'
    + '<th class="th-data">Prob.<br><small>1–5</small></th>'
    + '<th class="th-data">Sev.<br><small>1–5</small></th>'
    + '<th class="th-data">Responsável</th>'
    + '<th class="th-data">Área / Setor</th>'
    + '<th class="th-data">Observações</th>'
    + '</tr></thead><tbody>' + exRows + blankRows + '</tbody></table>'
    + '<div class="leg">'
    + '<b>Tipo:</b> env = Aspecto Ambiental (ISO 14001) &nbsp;|&nbsp; sst = Perigo SST (ISO 45001)<br>'
    + '<b>Condição:</b> N = Normal &nbsp;|&nbsp; A = Anormal &nbsp;|&nbsp; E = Emergência<br>'
    + '<b>Probabilidade:</b> 1=Muito baixa · 2=Baixa · 3=Média · 4=Alta · 5=Muito alta<br>'
    + '<b>Severidade:</b> 1=Insignificante · 2=Menor · 3=Moderada · 4=Maior · 5=Catastrófica<br>'
    + '<b>Score (P × S):</b> 1–4 Baixo &nbsp;|&nbsp; 5–9 Médio &nbsp;|&nbsp; 10–16 Alto &nbsp;|&nbsp; 17–25 Crítico'
    + '</div></body></html>';

  // ── ABA 2: Catálogo de referência completo ──
  var catRows = CATALOG.map(function(c) {
    var badge = c.type==='env'
      ? '<span class="cat-env">🌿 Ambiental</span>'
      : '<span class="cat-sst">⛑️ SST</span>';
    var sLevel = {1:'Insignificante',2:'Menor',3:'Moderada',4:'Maior',5:'Catastrófica'}[c.sev] || c.sev;
    var pLevel = {1:'Muito baixa',2:'Baixa',3:'Média',4:'Alta',5:'Muito alta'}[c.prob] || c.prob;
    return '<tr>'
      + '<td class="code">' + c.code + '</td>'
      + '<td>' + badge + '</td>'
      + '<td style="font-weight:600">' + c.asp + '</td>'
      + '<td style="color:#444">' + c.imp + '</td>'
      + '<td style="text-align:center">' + c.prob + ' – ' + pLevel + '</td>'
      + '<td style="text-align:center">' + c.sev + ' – ' + sLevel + '</td>'
      + '</tr>';
  }).join('');

  var sheet2 = '<html><head><meta charset="UTF-8"><style>' + baseStyle + '</style></head><body>'
    + '<h3>Catálogo Padronizado de Aspectos e Perigos — SGI</h3>'
    + '<p class="note">Use os códigos desta tabela na coluna "Código" da planilha de levantamento para garantir padronização.</p>'
    + '<table><thead><tr>'
    + '<th class="th-cat" style="width:70px">Código</th>'
    + '<th class="th-cat" style="width:110px">Tipo</th>'
    + '<th class="th-cat">Aspecto / Perigo</th>'
    + '<th class="th-cat">Impacto / Consequência</th>'
    + '<th class="th-cat" style="width:140px">P sugerida</th>'
    + '<th class="th-cat" style="width:140px">S sugerida</th>'
    + '</tr></thead><tbody>' + catRows + '</tbody></table>'
    + '</body></html>';

  // ── Gera arquivo .xls com duas "abas" via folhas HTML separadas ──
  // Formato: workbook com duas worksheets (compatível Excel / LibreOffice)
  var workbook = '<html xmlns:o="urn:schemas-microsoft-com:office:office" '
    + 'xmlns:x="urn:schemas-microsoft-com:office:excel" '
    + 'xmlns="http://www.w3.org/TR/REC-html40">'
    + '<head><meta charset="UTF-8">'
    + '<xml><x:ExcelWorkbook><x:ExcelWorksheets>'
    + '<x:ExcelWorksheet><x:Name>Levantamento de Campo</x:Name><x:WorksheetOptions><x:Selected/></x:WorksheetOptions></x:ExcelWorksheet>'
    + '<x:ExcelWorksheet><x:Name>Catálogo de Referência</x:Name></x:ExcelWorksheet>'
    + '</x:ExcelWorksheets></x:ExcelWorkbook></xml>'
    + '<style>' + baseStyle + '</style></head>'
    + '<body>'
    // Aba 1
    + '<table x:str ss:Table="Levantamento de Campo">'
    + '<tr><td colspan="11" style="font-size:13pt;font-weight:bold;color:#0d6b50;padding:8px">SGI — Planilha de Levantamento de Campo · ISO 14001 + ISO 45001</td></tr>'
    + '<tr><td colspan="11" style="font-size:9pt;color:#555;padding:4px 8px">Organização: ' + org + ' · Emitido em: ' + dt + ' · Apague os exemplos e preencha uma linha por aspecto/perigo. Salve como .csv UTF-8 e importe no SGI.</td></tr>'
    + '<tr>'
    + '<th class="th-data">Código</th><th class="th-data">Tipo</th><th class="th-data">Processo / Atividade</th>'
    + '<th class="th-data">Aspecto / Perigo</th><th class="th-data">Impacto / Consequência</th>'
    + '<th class="th-data">Condição</th><th class="th-data">P (1-5)</th><th class="th-data">S (1-5)</th>'
    + '<th class="th-data">Responsável</th><th class="th-data">Área</th><th class="th-data">Observações</th>'
    + '</tr>'
    + CSV_EXAMPLES.map(function(r){ return '<tr class="ex">' + r.map(function(c){return '<td>'+c+'</td>';}).join('') + '</tr>'; }).join('')
    + Array(40).fill('<tr class="blank">' + Array(11).fill('<td> </td>').join('') + '</tr>').join('')
    + '<tr><td colspan="11" style="font-size:9pt;color:#777;padding:6px 8px;border-top:2px solid #1D9E75">Legenda: Tipo env=Ambiental/sst=SST · Condição N=Normal/A=Anormal/E=Emergência · P×S: 1-4 Baixo | 5-9 Médio | 10-16 Alto | 17-25 Crítico</td></tr>'
    + '</table>'
    // Separador de aba (page break para Excel interpretar como nova aba)
    + '<br style="page-break-before:always">'
    // Aba 2
    + '<table x:str ss:Table="Catálogo de Referência">'
    + '<tr><td colspan="6" style="font-size:13pt;font-weight:bold;color:#185FA5;padding:8px">Catálogo Padronizado de Aspectos e Perigos</td></tr>'
    + '<tr><td colspan="6" style="font-size:9pt;color:#555;padding:4px 8px">Use os códigos desta tabela na coluna Código da planilha de levantamento.</td></tr>'
    + '<tr>'
    + '<th class="th-cat">Código</th><th class="th-cat">Tipo</th><th class="th-cat">Aspecto / Perigo</th>'
    + '<th class="th-cat">Impacto / Consequência</th><th class="th-cat">P sugerida</th><th class="th-cat">S sugerida</th>'
    + '</tr>'
    + CATALOG.map(function(c){
        var pL={1:'Muito baixa',2:'Baixa',3:'Média',4:'Alta',5:'Muito alta'}[c.prob]||c.prob;
        var sL={1:'Insignificante',2:'Menor',3:'Moderada',4:'Maior',5:'Catastrófica'}[c.sev]||c.sev;
        return '<tr>'
          +'<td style="font-family:Courier New,monospace;font-weight:bold">'+c.code+'</td>'
          +'<td>'+(c.type==='env'?'🌿 Ambiental':'⛑️ SST')+'</td>'
          +'<td style="font-weight:600">'+c.asp+'</td>'
          +'<td>'+c.imp+'</td>'
          +'<td style="text-align:center">'+c.prob+' – '+pL+'</td>'
          +'<td style="text-align:center">'+c.sev+' – '+sL+'</td>'
          +'</tr>';
      }).join('')
    + '</table>'
    + '</body></html>';

  var bom = '\uFEFF';
  var blob = new Blob([bom + workbook], { type: 'application/vnd.ms-excel;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'SGI_Levantamento_Campo_' + new Date().toISOString().slice(0,10) + '.xls';
  a.click();
}

function importCSV(input) {
  var file = input.files[0];
  if (!file) return;
  var status = document.getElementById('import-status');
  status.innerHTML = '⏳ Lendo arquivo...';
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var text = e.target.result;
      text = text.replace(/^\uFEFF/, ''); // remove BOM
      var lines = text.split(/\r?\n/);
      var imported = 0, skipped = 0, errors = [];
      var inDataZone = false;  // só lê linhas DENTRO da área de preenchimento
      var stopReading = false; // para ao chegar no catálogo de referência

      lines.forEach(function(line, idx) {
        if (stopReading) return;

        var trimmed = line.trim();
        if (!trimmed) return;

        // Ignora a diretiva sep= do Excel BR
        if (trimmed.toLowerCase().startsWith('sep=')) return;

        // Detecta início da área de preenchimento
        if (trimmed.indexOf('REA DE PREENCHIMENTO') !== -1) {
          inDataZone = true;
          return;
        }
        // Detecta fim da área de preenchimento / início do catálogo
        if (trimmed.indexOf('FIM DA') !== -1 ||
            trimmed.indexOf('CATÁLOGO DE REFER') !== -1 ||
            trimmed.indexOf('CATALOGO DE REFER') !== -1) {
          stopReading = true;
          return;
        }

        // Fora da zona de dados: ignora
        if (!inDataZone) return;

        // Linha de cabeçalho das colunas — ignora
        var firstRaw = parseCSVLine(trimmed)[0] || '';
        var first = firstRaw.trim().toLowerCase();
        if (first.indexOf('codigo') !== -1 || first.indexOf('código') !== -1) return;

        var cols = parseCSVLine(trimmed);
        if (cols.length < 4) return;

        // Col 0 = código catálogo, Col 1 = tipo, Col 2 = processo...
        var catCode = cols[0].trim().toUpperCase();
        var tipo    = cols[1].trim().toLowerCase();
        var proc    = cols[2].trim();
        var asp     = cols[3].trim();
        var imp     = cols[4].trim();
        var cond    = (cols[5]||'').trim().toUpperCase();
        var prob    = parseInt(cols[6]);
        var sev     = parseInt(cols[7]);

        // Se tem código do catálogo e aspecto/impacto estão vazios, busca no catálogo
        if (catCode) {
          var catItem = CATALOG.find(function(c){ return c.code === catCode; });
          if (catItem) {
            if (!asp) asp = catItem.asp;
            if (!imp) imp = catItem.imp;
            if (!tipo || (tipo !== 'env' && tipo !== 'sst')) tipo = catItem.type;
            if (isNaN(prob) || prob < 1 || prob > 5) prob = catItem.prob;
            if (isNaN(sev)  || sev  < 1 || sev  > 5) sev  = catItem.sev;
          }
        }

        // Linha totalmente vazia de conteúdo útil
        if (!asp && !proc && !catCode) return;

        // Validações finais
        if (tipo !== 'env' && tipo !== 'sst') {
          if (asp || proc) { skipped++; errors.push('Linha '+(idx+1)+': tipo inválido "'+tipo+'"'); }
          return;
        }
        if (isNaN(prob) || prob < 1 || prob > 5) prob = 3;
        if (isNaN(sev)  || sev  < 1 || sev  > 5) sev  = 3;
        if (cond !== 'N' && cond !== 'A' && cond !== 'E') cond = 'N';

        var score = prob * sev;
        S.apItems.push({
          type: tipo,
          proc: proc || '(não informado)',
          asp:  asp  || '(não informado)',
          imp:  imp  || '',
          cond: cond,
          prob: prob, sev: sev, score: score,
          cls: score<=4?'low':score<=9?'med':score<=16?'high':'crit',
          catCode: catCode || '',
          origem: 'campo'
        });
        imported++;
      });

      renderAP();
      input.value = '';
      var msg = '✅ '+imported+' item(s) importado(s)';
      if (skipped) msg += ' · ⚠️ '+skipped+' linha(s) ignorada(s)';
      if (errors.length) msg += '<br><small style="color:var(--red)">'+errors.slice(0,3).join('<br>')+'</small>';
      status.innerHTML = '<span style="color:var(--green-d);font-weight:500">'+msg+'</span>';
    } catch(err) {
      status.innerHTML = '<span style="color:var(--red)">❌ Erro ao ler o arquivo: '+err.message+'</span>';
    }
  };
  reader.readAsText(file, 'UTF-8');
}

function parseCSVLine(line) {
  // Detecta separador: ; (Brasil) ou , (internacional)
  var sep = (line.indexOf(';') !== -1 && line.indexOf(';') < (line.indexOf(',') === -1 ? 9999 : line.indexOf(','))) ? ';' : ',';
  var result = [], cur = '', inQ = false;
  for (var i = 0; i < line.length; i++) {
    var c = line[i];
    if (c === '"') {
      if (inQ && line[i+1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === sep && !inQ) {
      result.push(cur); cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

function clearAP() {
  if (!S.apItems.length) return;
  if (!confirm('Deseja realmente remover todos os ' + S.apItems.length + ' itens cadastrados?')) return;
  S.apItems = [];
  renderAP();
}


// ═══════════════════════════════════════════════════════════
// ORIENTAÇÕES — conteúdo por seção
// ═══════════════════════════════════════════════════════════
var HELP_CONTENT = {
  s0: {
    title: '📋 Orientações — Cláusula 4.1: Contexto da Organização',
    body: `
      <h4>O que é o contexto organizacional?</h4>
      <p>É o diagnóstico do <strong>momento atual</strong> da organização — um retrato fiel de forças, fraquezas, oportunidades e ameaças que afetam a capacidade de alcançar os resultados do SGI.</p>

      <h4>Fatores Internos</h4>
      <p>São aspectos <strong>dentro da própria organização</strong> que influenciam o SGI:</p>
      <ul>
        <li><strong>Favorável (Força):</strong> o que a organização <em>tem e faz bem</em> — ex.: equipe qualificada, processos documentados, liderança comprometida, tecnologia adequada.</li>
        <li><strong>Desfavorável (Fraqueza):</strong> o que a organização <em>não tem ou faz mal</em> — ex.: alta rotatividade, falta de recursos, processos inconsistentes.</li>
      </ul>
      <div class="warn">⚠️ Um fator interno <strong>não pode ser Força e Fraqueza ao mesmo tempo</strong>. A SWOT retrata o momento atual. Se hoje os recursos são insuficientes, registre como Fraqueza. Se são adequados, registre como Força. A SWOT deve ser revisada periodicamente.</div>

      <h4>Fatores Externos</h4>
      <p>São aspectos <strong>fora da organização</strong> que podem influenciar o SGI:</p>
      <ul>
        <li><strong>Favorável (Oportunidade):</strong> o que o ambiente oferece para aproveitar — ex.: incentivos fiscais para sustentabilidade, demanda crescente por produtos certificados, novas tecnologias limpas disponíveis.</li>
        <li><strong>Desfavorável (Ameaça):</strong> o que o ambiente impõe como risco — ex.: novas exigências legais, pressão da comunidade, escassez de recursos naturais, instabilidade econômica.</li>
      </ul>

      <h4>Relevância para o SGI</h4>
      <p>Nem todo fator precisa ser listado — apenas os que <strong>afetam a capacidade da organização de alcançar os resultados pretendidos</strong> do SGI. Pergunte-se: <em>"Este fator impacta meu desempenho ambiental ou de SST?"</em></p>
      <div class="ex">Exemplo relevante: "Alta rotatividade de operadores de máquinas" → afeta diretamente o SST.<br>Exemplo não relevante: "Mudança na cor do uniforme" → não afeta o SGI.</div>

      <h4>⚠️ Fatores críticos que nunca devem ser esquecidos</h4>
      <p>Dois fatores internos são tão universais e impactantes que toda organização deveria avaliá-los explicitamente — independente do setor ou porte:</p>

      <p><strong>1. Engajamento e comprometimento da Alta Direção com o SGI</strong></p>
      <p>A ISO 45001 (cláusula 5.1) e a ISO 14001 (cláusula 5.1) são explícitas: a Alta Direção deve demonstrar liderança e comprometimento — não apenas assinar documentos. Suas decisões afetam diretamente a capacidade do SGI de funcionar.</p>
      <ul>
        <li><strong>Se o engajamento é alto → Força:</strong> liderança presente, SGI tratado como estratégia, recursos garantidos.</li>
        <li><strong>Se o engajamento é baixo → Fraqueza:</strong> SGI visto como custo, recursos contingenciados, equipe desmotivada — e isso vira não conformidade em auditoria.</li>
      </ul>
      <div class="ex">Exemplo de fator desfavorável: <em>"Baixo engajamento da Alta Direção com o SGI — participação limitada nas análises críticas e revisões"</em> → Fraqueza → gera Risco de perda de eficácia do sistema.</div>
      <div class="ex">Exemplo de fator favorável: <em>"Alta Direção comprometida — participa ativamente das análises críticas e inclui SST e meio ambiente na pauta estratégica"</em> → Força → gera Oportunidade de melhoria contínua acelerada.</div>

      <p style="margin-top:10px"><strong>2. Decisões de alocação de recursos pela Alta Direção</strong></p>
      <p>Uma decisão de cortar ou ampliar recursos de SST ou ambiental não é apenas gestão financeira — é um fator interno que afeta diretamente o SGI e gera riscos ou oportunidades reais:</p>
      <div class="warn">⚠️ Cortar verba de SST para financiar expansão pode gerar: não atendimento de requisitos legais (NR-12, NR-35...), aumento de acidentes, autuações da DRT, passivo trabalhista. Isso é um <strong>Risco que precisa estar na cláusula 6.1.1</strong>.</div>
      <div class="ex">Exemplo favorável: <em>"Decisão da Alta Direção de ampliar recursos para adequação à NR-12 em 2026"</em> → Força → Oportunidade: conformidade legal, redução de acidentes, redução de multas e interdições.</div>
      <p>Essas decisões vão em <strong>4.1 como fatores internos</strong> — não em 4.2 como partes interessadas — e automaticamente alimentam os Riscos & Oportunidades da <strong>cláusula 6.1.1</strong>.</p>

      <h4>Finalizar revisão</h4>
      <p>Clique em <strong>✅ Finalizar revisão</strong> após concluir o levantamento. A data e hora ficam registradas na SWOT e o botão de geração automática de Riscos & Oportunidades será ativado.</p>
    `
  },
  s1: {
    title: '👥 Orientações — Cláusula 4.2: Partes Interessadas',
    body: `
      <h4>O que são partes interessadas?</h4>
      <p>São pessoas, grupos ou organizações que podem <strong>afetar ou ser afetados</strong> pelo SGI. A ISO 45001 exige que os trabalhadores e seus representantes sejam explicitamente considerados.</p>

      <h4>Necessidade × Expectativa — qual a diferença?</h4>
      <ul>
        <li><strong>Necessidade:</strong> requisito <em>explícito, formal e obrigatório</em> — está em lei, contrato, licença ou regulamento. Não cumprir gera consequência legal ou contratual.<br>
          <div class="ex">Ex.: O IBAMA exige relatório anual de monitoramento de efluentes → Necessidade.</div></li>
        <li><strong>Expectativa:</strong> desejo <em>implícito, não formalizado</em>, mas que se ignorado gera conflito ou perda de confiança.<br>
          <div class="ex">Ex.: A comunidade espera que a empresa não gere odor, mesmo sem lei específica → Expectativa.</div></li>
      </ul>
      <div class="warn">⚠️ A norma não exige atender todas as expectativas — mas exige que a organização <strong>decida conscientemente</strong> quais se tornam obrigações de conformidade (cláusula 6.1.3). Registre essa decisão na coluna "Obrigação de conformidade".</div>

      <h4>Por que isso alimenta os Riscos & Oportunidades?</h4>
      <p>Necessidades não atendidas → Risco. Expectativas superadas → Oportunidade. Por isso a geração automática de R&O usa as partes interessadas selecionadas como fonte.</p>

      <h4>Como adicionar novas partes?</h4>
      <p>Clique em <strong>+ Nova parte interessada</strong>. Você pode cadastrar necessidades e expectativas separadamente, definir influência e interesse no mapa, e indicar se gera obrigação de conformidade.</p>
    `
  },
  s3: {
    title: '⚡ Orientações — Cláusula 6.1.1: Riscos e Oportunidades',
    body: `
      <h4>De onde devem vir os Riscos e Oportunidades?</h4>
      <p>A cláusula 6.1.1 é explícita: os R&O devem ser determinados <strong>considerando</strong>:</p>
      <ul>
        <li><strong>4.1 — Contexto (SWOT):</strong> Ameaças → Riscos · Oportunidades → Oportunidades · Fraquezas → Riscos internos</li>
        <li><strong>4.2 — Partes Interessadas:</strong> Necessidades não atendidas → Riscos · Expectativas superadas → Oportunidades</li>
        <li><strong>6.1.2 — Aspectos e Perigos:</strong> Aspectos/perigos com score Alto ou Crítico → Riscos prioritários</li>
      </ul>
      <div class="warn">⚠️ R&O <strong>sem rastreabilidade de origem</strong> é uma não conformidade frequente em auditorias. Use sempre a geração automática ou informe a origem normativa ao adicionar manualmente.</div>

      <h4>Como usar a geração automática?</h4>
      <ul>
        <li><strong>🌿 Da SWOT:</strong> cada Ameaça vira um Risco sugerido · cada Oportunidade externa vira uma Oportunidade · Fraquezas relevantes geram Riscos internos.</li>
        <li><strong>👥 Das Partes Interessadas:</strong> cada parte selecionada com obrigação de conformidade gera um Risco de descumprimento e uma Oportunidade de relacionamento.</li>
        <li><strong>⚠️ Dos Aspectos & Perigos:</strong> itens com score Alto (10-16) ou Crítico (17-25) geram Riscos com probabilidade e severidade já preenchidas.</li>
      </ul>
      <p>Após gerar, <strong>revise cada item</strong> — ajuste probabilidade, severidade e ação planejada conforme o julgamento da equipe.</p>

      <h4>Risco × Oportunidade</h4>
      <ul>
        <li><strong>Risco:</strong> efeito negativo da incerteza — algo que pode impedir o SGI de alcançar seus resultados.</li>
        <li><strong>Oportunidade:</strong> efeito positivo da incerteza — algo que pode melhorar o desempenho ou criar valor.</li>
      </ul>
      <div class="ex">Ameaça SWOT: "Novas exigências do IBAMA para efluentes" → Risco: "Não conformidade legal com novos limites de lançamento de efluentes" (P=3, S=4, Score=12, Alto)</div>
    `
  }
};

function openHelp(section) {
  var h = HELP_CONTENT[section];
  if (!h) return;
  document.getElementById('help-title').textContent = h.title;
  document.getElementById('help-body').innerHTML = h.body;
  openMod('help-modal');
}

// ═══════════════════════════════════════════════════════════
// SWOT — Finalizar revisão
// ═══════════════════════════════════════════════════════════
function finalizeSWOT() {
  var now = new Date();
  var dtStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'});
  S.swotRevDate = dtStr;
  document.getElementById('swot-rev-date').innerHTML =
    '<span style="color:var(--green-d)">✅ Revisado em ' + dtStr + '</span>';
  document.getElementById('swot-suggest-btn').style.display = 'block';
  // Feedback visual breve
  var btn = event.target;
  btn.textContent = '✅ Salvo!';
  btn.style.background = 'var(--green-d)';
  setTimeout(function(){ btn.textContent = '✅ Finalizar revisão'; btn.style.background = 'var(--green)'; }, 2000);
}

// ═══════════════════════════════════════════════════════════
// GERAÇÃO AUTOMÁTICA DE RISCOS & OPORTUNIDADES
// ═══════════════════════════════════════════════════════════
function generateROFromSWOT() {
  var added = 0;
  var existing = S.roItems.map(function(r){ return r.desc.toLowerCase(); });

  function push(type, norm, desc, src, prob, sev, origin) {
    if (existing.indexOf(desc.toLowerCase()) !== -1) return; // evita duplicata
    var score = prob * sev;
    S.roItems.push({
      type:type, norm:norm, desc:desc, src:src, prob:prob, sev:sev, score:score,
      cls: score<=4?'low':score<=9?'med':score<=16?'high':'crit',
      action:'', origin:origin, autoGen:true
    });
    existing.push(desc.toLowerCase());
    added++;
  }

  // Ameaças → Riscos
  S.factors.ext.filter(function(f){ return f.type==='des' && f.rel==='sim'; }).forEach(function(f) {
    push('risk', f.norm==='env'?'env':f.norm==='sst'?'sst':'both',
      'Risco decorrente de ameaça: ' + f.desc,
      '4.1 — Contexto externo (Ameaça SWOT)', 3, 3, '4.1-swot');
  });

  // Oportunidades externas → Oportunidades
  S.factors.ext.filter(function(f){ return f.type==='fav' && f.rel==='sim'; }).forEach(function(f) {
    push('opp', f.norm==='env'?'env':f.norm==='sst'?'sst':'both',
      'Oportunidade: ' + f.desc,
      '4.1 — Contexto externo (Oportunidade SWOT)', 3, 2, '4.1-swot');
  });

  // Fraquezas → Riscos internos
  S.factors.int.filter(function(f){ return f.type==='des' && f.rel==='sim'; }).forEach(function(f) {
    push('risk', f.norm==='env'?'env':f.norm==='sst'?'sst':'both',
      'Risco interno decorrente de fraqueza: ' + f.desc,
      '4.1 — Contexto interno (Fraqueza SWOT)', 2, 3, '4.1-swot');
  });

  renderRO(); buildMatrix();
  alert(added > 0
    ? added + ' item(s) gerado(s) a partir da SWOT. Revise probabilidade, severidade e ação planejada.'
    : 'Nenhum item novo gerado. Verifique se há fatores marcados como relevantes na aba 4.1.');
}

function generateROFromPI() {
  var added = 0;
  var existing = S.roItems.map(function(r){ return r.desc.toLowerCase(); });
  function push(type, norm, desc, src, prob, sev, origin) {
    if (existing.indexOf(desc.toLowerCase()) !== -1) return;
    var score = prob * sev;
    S.roItems.push({type:type,norm:norm,desc:desc,src:src,prob:prob,sev:sev,score:score,
      cls:score<=4?'low':score<=9?'med':score<=16?'high':'crit',action:'',origin:origin,autoGen:true});
    existing.push(desc.toLowerCase()); added++;
  }

  S.pi.filter(function(p){ return p.sel; }).forEach(function(p) {
    var norm = p.norm;
    // Risco: não atender necessidades/obrigações desta parte
    if (p.obrig === 'sim' || p.obrig === 'parcial') {
      push('risk', norm,
        'Não atendimento das necessidades de: ' + p.name,
        '4.2 — Parte interessada: ' + p.name + ' (obrigação de conformidade)',
        p.inf >= 4 ? 3 : 2, p.inf >= 4 ? 4 : 3, '4.2-pi');
    }
    // Oportunidade: superar expectativas desta parte
    push('opp', norm,
      'Oportunidade de fortalecer relacionamento com: ' + p.name,
      '4.2 — Parte interessada: ' + p.name + ' (expectativas)',
      2, 2, '4.2-pi');
  });

  renderRO(); buildMatrix();
  alert(added > 0
    ? added + ' item(s) gerado(s) a partir das Partes Interessadas. Revise e ajuste conforme necessário.'
    : 'Nenhum item novo gerado. Verifique se há partes interessadas selecionadas na aba 4.2.');
}

function generateROFromAP() {
  var added = 0;
  var existing = S.roItems.map(function(r){ return r.desc.toLowerCase(); });
  function push(type, norm, desc, src, prob, sev, origin) {
    if (existing.indexOf(desc.toLowerCase()) !== -1) return;
    var score = prob * sev;
    S.roItems.push({type:type,norm:norm,desc:desc,src:src,prob:prob,sev:sev,score:score,
      cls:score<=4?'low':score<=9?'med':score<=16?'high':'crit',action:'',origin:origin,autoGen:true});
    existing.push(desc.toLowerCase()); added++;
  }

  // Apenas itens com score Alto (>=10) ou Crítico (>=17)
  S.apItems.filter(function(a){ return a.score >= 10; }).forEach(function(a) {
    push('risk', a.type === 'env' ? 'env' : 'sst',
      (a.type==='env'?'Risco ambiental: ':'Risco de SST: ') + a.asp + ' → ' + (a.imp || 'impacto não especificado'),
      '6.1.2 — ' + (a.type==='env'?'Aspecto ambiental':'Perigo SST') + (a.catCode?' ('+a.catCode+')':'') + ' · Score ' + a.score,
      a.prob, a.sev, '6.1.2-ap');
  });

  // Aspectos com controles bons (score baixo) → oportunidade de benchmarking/certificação
  var lowItems = S.apItems.filter(function(a){ return a.score <= 4; });
  if (lowItems.length >= 3) {
    push('opp', 'both',
      'Oportunidade: desempenho ambiental/SST consolidado como diferencial competitivo',
      '6.1.2 — ' + lowItems.length + ' aspecto(s)/perigo(s) com risco baixo controlado',
      2, 2, '6.1.2-ap');
  }

  renderRO(); buildMatrix();
  alert(added > 0
    ? added + ' item(s) gerado(s) a partir dos Aspectos & Perigos (score ≥ 10). Revise e adicione ações planejadas.'
    : 'Nenhum item gerado. Verifique se há aspectos/perigos com score ≥ 10 na aba 6.1.2.');
}

function clearRO() {
  if (!S.roItems.length) return;
  if (!confirm('Remover todos os ' + S.roItems.length + ' itens de Riscos & Oportunidades?')) return;
  S.roItems = [];
  renderRO(); buildMatrix();
}


// ═══════════════════════════════════════════════════════════════════
// 