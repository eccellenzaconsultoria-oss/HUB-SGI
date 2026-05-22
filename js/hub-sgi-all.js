// Hub SGI — Módulo completo SGI


var S = {
  objectives: [],
  apoio: {funcoes:[], requisitos:[], colaboradores:[], treinamentos:[], documentos:[]},
  kpis: [],
  factors: { int:[], ext:[] },
  pi: [
    {id:'workers', name:'Trabalhadores (próprios e contratados)', needs:['Ambiente de trabalho seguro e saudável','Participação nas decisões de SST','Informação sobre riscos e medidas de controle de cada área','Requisitos de SST repassados aos contratados antes do início das atividades','Supervisão e monitoramento das condições de trabalho de contratados'], exps:['Reconhecimento e valorização','Canal de comunicação efetivo com a liderança','Contratados tratados com os mesmos padrões de SST dos empregados próprios'], norm:'sst', inf:5, int:5, obrig:'sim', sel:true},
    {id:'ibama', name:'IBAMA / Órgãos Ambientais', needs:['Conformidade com licenças ambientais','Relatórios periódicos de monitoramento','Plano de emergência ambiental atualizado'], exps:['Transparência proativa das informações','Ações de melhoria contínua do desempenho'], norm:'env', inf:5, int:3, obrig:'sim', sel:true},
    {id:'mte', name:'MTE / Auditores SST', needs:['Conformidade com NRs vigentes (NR-1, NR-9, NR-15...)', 'PGR e PCMSO atualizados','Registros de treinamentos e EPIs'], exps:['Cultura de SST evidenciada','Proatividade na gestão de riscos'], norm:'sst', inf:5, int:2, obrig:'sim', sel:true},
    {id:'clients', name:'Clientes', needs:['Produtos/serviços conformes e com qualidade assegurada','Certificações ISO comprovadas'], exps:['Relatórios de desempenho ambiental e SST','Fornecedor referência em ESG'], norm:'both', inf:4, int:4, obrig:'sim', sel:true},
    {id:'community', name:'Comunidade local', needs:['Ausência de alteração da qualidade do solo e da água','Conformidade com limites de ruído e emissões'], exps:['Participação em projetos socioambientais locais','Transparência sobre as atividades da empresa'], norm:'env', inf:3, int:3, obrig:'parcial', sel:false},
    {id:'suppliers', name:'Fornecedores', needs:['Recebimento claro dos requisitos ambientais e SST','Processo de homologação definido'], exps:['Parceria de longo prazo','Apoio para adequação às exigências'], norm:'both', inf:2, int:2, obrig:'parcial', sel:false},
    {id:'investors', name:'Acionistas / Investidores', needs:['Relatório de desempenho ESG','Gestão de passivos ambientais e SST'], exps:['Rating ESG elevado','Redução contínua de acidentes e incidentes'], norm:'both', inf:4, int:3, obrig:'sim', sel:false},
    {id:'insurers', name:'Seguradores', needs:['Histórico de acidentes atualizado','Planos de controle de riscos operacionais'], exps:['Proatividade na prevenção','Redução de sinistros ao longo do tempo'], norm:'sst', inf:3, int:2, obrig:'parcial', sel:false},
    {id:'sesmt', name:'SESMT', needs:['Suporte da liderança para implementação das NRs','Acesso às áreas e processos para levantamentos','Recursos para execução do PPRA/PGR/PCMSO'], exps:['Participação nas decisões de SST','Reconhecimento como área estratégica do SGI'], norm:'sst', inf:5, int:5, obrig:'sim', sel:false},
    {id:'cipa', name:'CIPA', needs:['Suporte da alta direção','Acesso a informações de SST','Participação nas investigações de acidentes'], exps:['Atuação efetiva na prevenção de acidentes','Canal de comunicação com os trabalhadores'], norm:'sst', inf:4, int:5, obrig:'sim', sel:false},
    {id:'certbody', name:'Organismo Certificador', needs:['Documentação do SGI atualizada','Conformidade com todos os requisitos das normas','Acesso para realização de auditorias'], exps:['Maturidade do SGI','Comprometimento da liderança'], norm:'both', inf:4, int:3, obrig:'sim', sel:false},
    // ── Órgãos Reguladores / Anuentes ──────────────────────────────
    {id:'reg-mte-drt', name:'MTE / DRT — Ministério do Trabalho e Delegacia Regional', needs:['Conformidade com todas as NRs aplicáveis (NR-1 PGR NR-7 PCMSO NR-9 NR-15 etc.)','PGR e PCMSO vigentes e efetivamente implementados','Registros de treinamentos EPIs fornecidos CAT emitidas','Laudo de insalubridade e periculosidade atualizado','CIPA constituída e funcionando (quando obrigatório)'], exps:['Proatividade na eliminação de riscos — não só documentação','Cultura de SST evidenciada na prática do dia a dia','Redução contínua de acidentes e doenças ocupacionais','Transparência e cooperação durante fiscalizações'], norm:'sst', inf:5, int:2, obrig:'sim', sel:false, group:'reg'},
    {id:'reg-ibama', name:'IBAMA / SEMA / Órgão Ambiental Estadual', needs:['Licenças ambientais vigentes (LP LI LO)','Relatórios de monitoramento de efluentes e emissões','Plano de Emergência Ambiental atualizado','Pagamento de taxas e cumprimento de condicionantes'], exps:['Transparência e comunicação proativa','Ações de melhoria além do exigido'], norm:'env', inf:5, int:2, obrig:'sim', sel:false, group:'reg'},
    {id:'reg-bombeiros', name:'Corpo de Bombeiros', needs:['AVCB (Auto de Vistoria) válido','Plano de Prevenção e Proteção Contra Incêndio (PPCI)','Brigada de incêndio treinada e dimensionada','Equipamentos de combate a incêndio dentro do prazo'], exps:['Simulados periódicos realizados','Brigadistas com treinamento avançado'], norm:'sst', inf:5, int:2, obrig:'sim', sel:false, group:'reg'},
    {id:'reg-vigilancia', name:'Vigilância Sanitária (ANVISA/VISA)', needs:['Alvará sanitário vigente','Boas práticas de fabricação/manipulação','Controle de pragas e vetores'], exps:['Programas de qualidade superiores ao mínimo legal'], norm:'sst', inf:4, int:2, obrig:'sim', sel:false, group:'reg'},
    {id:'reg-dre', name:'Secretaria Municipal / Estadual (alvarás e licenças)', needs:['Alvará de funcionamento e localização válido','Conformidade com código de obras e zoneamento'], exps:['Boa relação institucional com o poder público local'], norm:'both', inf:3, int:1, obrig:'sim', sel:false, group:'reg'},
    // ── Sociedade, ONGs e Parceiros ──────────────────────────────
    {id:'soc-ong-amb', name:'ONGs Ambientalistas', needs:['Transparência sobre impactos ambientais da operação','Divulgação de dados de desempenho ambiental'], exps:['Redução voluntária de impactos além do exigido por lei','Diálogo aberto e participação em consultas públicas','Programas de compensação ambiental'], norm:'env', inf:3, int:4, obrig:'parcial', sel:false, group:'soc'},
    {id:'soc-ong-trab', name:'ONGs de Direitos Trabalhistas / Sindicatos', needs:['Respeito às convenções coletivas e NRs','Canal de denúncia e ouvidoria acessíveis','Transparência sobre condições de trabalho'], exps:['Saúde e bem-estar dos trabalhadores como prioridade','Participação dos trabalhadores nas decisões de SST'], norm:'sst', inf:3, int:4, obrig:'parcial', sel:false, group:'soc'},
    {id:'soc-univ', name:'Universidades / Institutos de Pesquisa', needs:['Acesso a dados e processos para pesquisa','Disponibilidade para estudos de caso e publicações','Cumprimento de protocolos de pesquisa acordados'], exps:['Parceria de longo prazo','Apoio financeiro ou logístico para pesquisas','Co-autoria e reconhecimento em publicações'], norm:'both', inf:2, int:3, obrig:'parcial', sel:false, group:'soc'},
    {id:'soc-escola', name:'Escolas e Comunidade Escolar (entorno)', needs:['Ausência de emissões de ruído poluição e risco no entorno da escola','Comunicação prévia sobre atividades que possam gerar impactos'], exps:['Programas de educação ambiental e SST com alunos e professores','Parceria em projetos socioambientais da comunidade'], norm:'env', inf:2, int:3, obrig:'parcial', sel:false, group:'soc'},
    {id:'soc-midia', name:'Mídia / Imprensa', needs:['Acesso a informações verídicas sobre a organização','Porta-voz designado para comunicação institucional'], exps:['Transparência proativa — não apenas reativa a crises','Histórias positivas de responsabilidade socioambiental'], norm:'both', inf:3, int:2, obrig:'parcial', sel:false, group:'soc'},
    // ── Conselhos de Classe Profissional ─────────────────────────
    {id:'cfc-crea', name:'CREA — Conselho Regional de Engenharia e Agronomia', needs:['ART (Anotação de Responsabilidade Técnica) emitida para laudos projetos e atividades obrigatórias','Responsável técnico habilitado e registrado','Cumprimento do Código de Ética Profissional'], exps:['Profissionais atualizados e com qualificação contínua','Uso correto do título e atribuições profissionais'], norm:'both', inf:4, int:2, obrig:'sim', sel:false, group:'cfc'},
    {id:'cfc-crm', name:'CRM — Conselho Regional de Medicina', needs:['Médico do Trabalho com CRM ativo responsável pelo PCMSO','Emissão de ASO (Atestado de Saúde Ocupacional) conforme NR-7','Cumprimento do Código de Ética Médica'], exps:['Atuação médica efetiva — não apenas documental','Programas de promoção da saúde além do PCMSO'], norm:'sst', inf:4, int:2, obrig:'sim', sel:false, group:'cfc'},
    {id:'cfc-crefito', name:'CREFITO — Conselho de Fisioterapia e Terapia Ocupacional', needs:['Fisioterapeuta do Trabalho registrado quando aplicável','RRT (Registro de Responsabilidade Técnica) emitido para laudos ergonômicos','Cumprimento do Código de Ética Profissional'], exps:['Programas de ergonomia e prevenção de LER/DORT efetivos'], norm:'sst', inf:3, int:2, obrig:'sim', sel:false, group:'cfc'},
    {id:'cfc-crq', name:'CRQ — Conselho Regional de Química', needs:['Químico responsável técnico registrado quando há processos com substâncias perigosas','Responsabilidade técnica formal sobre laudos e processos químicos'], exps:['Gestão segura e ambientalmente responsável dos processos químicos'], norm:'both', inf:3, int:2, obrig:'sim', sel:false, group:'cfc'},
    {id:'cfc-cra', name:'CRA — Conselho Regional de Administração', needs:['Administrador responsável técnico registrado quando aplicável','RRT emitido para atividades que exijam responsabilidade técnica'], exps:['Gestão profissional e ética da organização'], norm:'both', inf:2, int:1, obrig:'parcial', sel:false, group:'cfc'},
    {id:'cfc-outros', name:'Outros Conselhos de Classe (CRO CFN CRMV CFT etc.)', needs:['Profissionais com registro ativo no conselho competente','Responsabilidade técnica formalizada para atividades regulamentadas','Cumprimento do código de ética da categoria'], exps:['Qualificação contínua dos profissionais da área'], norm:'both', inf:3, int:2, obrig:'sim', sel:false, group:'cfc'},
    {id:'reg-prefeitura', name:'Prefeitura / Secretaria Municipal', needs:['Alvará de funcionamento e localização válido','Conformidade com código de obras e zoneamento','Controle de ruído e resíduos conforme lei municipal'], exps:['Boa relação com a comunidade local','Participação em programas municipais de sustentabilidade'], norm:'both', inf:4, int:2, obrig:'sim', sel:false, group:'reg'},
    {id:'reg-aneel', name:'ANEEL / Concessionária de Energia (quando aplicável)', needs:['Instalações elétricas conforme NR-10 e ABNT','Medição e faturamento regulares'], exps:['Eficiência energética e redução de consumo'], norm:'env', inf:3, int:1, obrig:'parcial', sel:false, group:'reg'},
    {id:'reg-ana', name:'ANA / Órgão Gestor de Recursos Hídricos', needs:['Outorga de uso da água vigente (quando aplicável)','Relatórios de consumo e qualidade de efluentes'], exps:['Programas de uso racional da água'], norm:'env', inf:4, int:2, obrig:'sim', sel:false, group:'reg'},
  ],
  apItems: [],
  roItems: [],
  newNeeds: [],
  newExps: []
};

// NAV
function goTo(id) {
  ['s0','s1','s2','s3','s7','s8','s9','s5','s6','s4'].forEach(function(s,i){
    document.getElementById(s).classList.toggle('on',s===id);
    document.querySelectorAll('.nav-item')[i].classList.toggle('on',s===id);
  });
  if(id==='s4') buildSumm();
  if(id==='s5') renderActionMgr();
  if(id==='s6') initACSummary();
  if(id==='s8') initApoio();
  if(id==='s9') initKPI();
  if(id==='s7') renderObj();
}

// FACTORS
function addFactor(k) {
  var desc = document.getElementById(k+'-desc').value.trim();
  if (!desc) return;
  S.factors[k].push({
    desc: desc,
    type: document.getElementById(k+'-type').value,
    norm: document.getElementById(k+'-norm').value,
    dir: document.getElementById(k+'-dir').value,
    rel: document.getElementById(k+'-rel').value,
    just: document.getElementById(k+'-just').value.trim()
  });
  document.getElementById(k+'-desc').value='';
  document.getElementById(k+'-just').value='';
  renderFactors(); updateSWOT();
}
function removeFactor(k,i){ S.factors[k].splice(i,1); renderFactors(); updateSWOT(); }
function renderFactors(){
  ['int','ext'].forEach(function(k){
    var el=document.getElementById(k+'-list');
    if(!S.factors[k].length){el.innerHTML='';return;}
    var dirLbl={in:'⬅ externo→SGI',out:'➡ SGI→externo',both:'↔ bidirecional'};
    var dirCls={in:'dir-in',out:'dir-out',both:'dir-both'};
    var nlbl={both:'Ambas',env:'14001',sst:'45001'};
    el.innerHTML=S.factors[k].map(function(f,i){
      var cls=f.type==='fav'?'fitem-fav':'fitem-des';
      var notRel=f.rel==='nao';
      return '<div class="fitem '+cls+'" style="'+(notRel?'opacity:.5':'')+'">'
        +'<div class="fitem-head"><span class="fitem-desc">'+esc(f.desc)+'</span>'
        +'<button onclick="removeFactor(\''+k+'\','+i+')" title="Remover" style="background:none;border:none;cursor:pointer;font-size:15px;flex-shrink:0">×</button></div>'
        +'<div class="fitem-tags">'
        +'<span class="fitem-meta">'+nlbl[f.norm]+'</span>'
        +'<span class="dir-badge '+dirCls[f.dir]+'">'+dirLbl[f.dir]+'</span>'
        +(notRel?'<span class="dir-badge" style="background:#f0f0f0;color:#999">❌ Não relevante</span>':'<span class="dir-badge" style="background:#e8f5ef;color:#0d6b50">✅ Relevante</span>')
        +'</div>'
        +(f.just?'<div class="fitem-rel">💬 '+esc(f.just)+'</div>':'')
        +'</div>';
    }).join('');
  });
}
function updateSWOT(){
  function items(k,t){
    var r=S.factors[k].filter(function(f){return f.type===t&&f.rel==='sim';}).map(function(f){return '• '+esc(f.desc);});
    return r.length?r.join('<br>'):'<em style="opacity:.5">Nenhum ainda</em>';
  }
  document.getElementById('sw-s').innerHTML=items('int','fav');
  document.getElementById('sw-w').innerHTML=items('int','des');
  document.getElementById('sw-o').innerHTML=items('ext','fav');
  document.getElementById('sw-t').innerHTML=items('ext','des');
}

// PI
function renderPI(){
  var g=document.getElementById('pi-grid');
  var clr={env:'var(--green-d)',sst:'var(--blue-d)',both:'var(--amber-d)'};
  var nlb={env:'🌿 14001',sst:'⛑️ 45001',both:'🌿+⛑️ Ambas'};

  // Agrupa por categoria
  var regular    = S.pi.filter(function(p){ return !p.group; });
  var reguladores= S.pi.filter(function(p){ return p.group==='reg'; });
  var sociedade  = S.pi.filter(function(p){ return p.group==='soc'; });

  var groupDefs = {
    reg: { label:'⚖️ Órgãos Reguladores / Anuentes',       sub:'Obrigação legal · selecione os aplicáveis à sua organização',
           bg:'var(--red-l)',    color:'var(--red)',    badge:'⚖️ Regulador',  bbg:'var(--red-l)',    bc:'var(--red)' },
    soc: { label:'🤝 Sociedade, ONGs & Parceiros',           sub:'Relevância variável · avalie o contexto local da organização',
           bg:'var(--purple-l)',color:'var(--purple)', badge:'🤝 Sociedade',   bbg:'var(--purple-l)',bc:'var(--purple)' },
    cfc: { label:'🎓 Conselhos de Classe Profissional',       sub:'Aplicável quando há profissional com ART/RRT ou responsabilidade técnica registrada',
           bg:'var(--amber-l)', color:'var(--amber-d)',badge:'🎓 Conselho',    bbg:'var(--amber-l)', bc:'var(--amber-d)' }
  };

  function makeCard(p){
    var realIdx = S.pi.indexOf(p);
    var gd = p.group ? groupDefs[p.group] : null;
    return '<div class="pi-card'+(p.sel?' sel':'')+'" onclick="togglePI('+realIdx+')">'
      +'<div class="pi-ck">'+(p.sel?'✓':'')+'</div>'
      +'<div class="pi-nm">'+esc(p.name)+'</div>'
      +'<div class="pi-nr">📌 '+p.needs.length+' necessidade(s) · 💬 '+p.exps.length+' expectativa(s)</div>'
      +'<div class="pi-tags mt">'
      +'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:var(--gray-l);color:'+clr[p.norm||'both']+'">'+nlb[p.norm||'both']+'</span>'
      +(p.obrig==='sim'?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:#e8f5ef;color:var(--green-d)">⚖️ Obrigação conf.</span>':p.obrig==='parcial'?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:var(--amber-l);color:var(--amber-d)">🔶 Parcial</span>':'')
      +(p.relevante&&p.relevante==='nao'?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:var(--gray-l);color:var(--text2)">📋 Monitorar</span>':'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:var(--green-l);color:var(--green-d)">✅ Relevante SGA</span>')
      +(p.condAmb&&p.condAmb.length?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:#e8f4ff;color:var(--blue-d)">🌍 '+p.condAmb.join(', ')+'</span>':'')
      +(p.tratSGA&&p.tratSGA.length?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:var(--purple-l);color:var(--purple)">⚙️ '+p.tratSGA.join(' · ')+'</span>':'')
      +(gd?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:'+gd.bbg+';color:'+gd.bc+';font-weight:600">'+gd.badge+'</span>':'')
      +'</div></div>';
  }

  function makeGroupHeader(gd, items){
    var selCount = items.filter(function(p){return p.sel;}).length;
    return '<div style="grid-column:1/-1;margin-top:10px;padding:8px 14px;background:'+gd.bg+';border-radius:8px;display:flex;align-items:center;justify-content:space-between">'
      +'<span style="font-size:12px;font-weight:600;color:'+gd.color+'">'+gd.label+'</span>'
      +'<span style="font-size:11px;color:'+gd.color+';opacity:.8">'+gd.sub+(selCount?' · '+selCount+' selecionada(s)':'')+'</span>'
      +'</div>';
  }

  var conselhos = S.pi.filter(function(p){ return p.group==='cfc'; });

  var html = regular.map(makeCard).join('');
  if(reguladores.length) html += makeGroupHeader(groupDefs.reg, reguladores) + reguladores.map(makeCard).join('');
  if(sociedade.length)   html += makeGroupHeader(groupDefs.soc, sociedade)   + sociedade.map(makeCard).join('');
  if(conselhos.length)   html += makeGroupHeader(groupDefs.cfc, conselhos)   + conselhos.map(makeCard).join('');

  g.innerHTML = html;
  renderPIDetail(); renderPIMap();
}
function togglePI(i){S.pi[i].sel=!S.pi[i].sel;renderPI();}
function renderPIDetail(){
  var sel=S.pi.filter(function(p){return p.sel;});
  var tb=document.getElementById('pi-detail-body');
  if(!sel.length){tb.innerHTML='<tr><td colspan="6" class="empty">Nenhuma parte selecionada.</td></tr>';return;}
  var nlb={env:'ISO 14001',sst:'ISO 45001',both:'14001 + 45001'};
  var mon={5:'Mensal',4:'Trimestral',3:'Semestral',2:'Anual',1:'Eventual'};
  tb.innerHTML=sel.map(function(p){
    var needsHtml=p.needs.map(function(n){return '<div><span class="need-tag nt-n">Necessidade</span> '+esc(n)+'</div>';}).join('');
    var expsHtml=p.exps.map(function(e){return '<div><span class="need-tag nt-e">Expectativa</span> '+esc(e)+'</div>';}).join('');
    var ob=p.obrig==='sim'?'<span class="sig sig-crit">✅ Sim — é obrigação</span>':p.obrig==='parcial'?'<span class="sig sig-high">🔶 Parcialmente</span>':'<span class="sig sig-low">❌ Não assumida</span>';
    return '<tr>'
      +'<td style="font-weight:600;white-space:nowrap">'+esc(p.name)+'</td>'
      +'<td>'+needsHtml+'</td>'
      +'<td>'+expsHtml+'</td>'
      +'<td>'+ob+'</td>'
      +'<td>'+nlb[p.norm]+'</td>'
      +'<td>'+mon[p.inf]+'</td>'
      +'</tr>';
  }).join('');
}
function renderPIMap(){
  var sel=S.pi.filter(function(p){return p.sel;});
  // Quadrantes: t=alta influência(>=3), b=baixa; r=alto interesse(>=3), l=baixo
  var qs={tl:[],tr:[],bl:[],br:[]};
  sel.forEach(function(p){
    var key=(p.inf>=3?'t':'b')+(p.int>=3?'r':'l');
    qs[key].push(p);
  });
  var clr={env:'#1D9E75',sst:'#185FA5',both:'#BA7517'};
  ['tl','tr','bl','br'].forEach(function(q){
    var el=document.getElementById('mq-'+q);
    if(!el)return;
    el.innerHTML=qs[q].length
      ? qs[q].map(function(p){
          var gcl = p.group==='reg'?'var(--red)':p.group==='soc'?'var(--purple)':p.group==='cfc'?'var(--amber)':clr[p.norm||'both'];
      return '<span class="pi-dot-m" style="border-color:'+gcl+';color:'+gcl+'">'+esc(p.name)+'</span>';
        }).join('')
      : '<span style="font-size:11px;color:var(--text3);font-style:italic">—</span>';
  });
}

// PI modal
var tempNeeds=[], tempExps=[];
function addNE(type){
  var list=type==='need'?tempNeeds:tempExps;
  list.push('');
  renderNEList();
}
function renderNEList(){
  var nd=document.getElementById('needs-list');
  var ex=document.getElementById('exps-list');
  nd.innerHTML=tempNeeds.map(function(n,i){
    return '<div class="ne-item"><input type="text" value="'+esc(n)+'" placeholder="Descreva a necessidade formal..." oninput="tempNeeds['+i+']=this.value"><button onclick="tempNeeds.splice('+i+',1);renderNEList()" style="background:none;border:none;cursor:pointer;color:var(--text2);font-size:14px">×</button></div>';
  }).join('');
  ex.innerHTML=tempExps.map(function(e,i){
    return '<div class="ne-item"><input type="text" value="'+esc(e)+'" placeholder="Descreva a expectativa..." oninput="tempExps['+i+']=this.value"><button onclick="tempExps.splice('+i+',1);renderNEList()" style="background:none;border:none;cursor:pointer;color:var(--text2);font-size:14px">×</button></div>';
  }).join('');
}
function openAddPI(){
  tempNeeds=['']; tempExps=[''];
  renderNEList();
  document.getElementById('pi-nm').value='';
  var grpSel=document.getElementById('pi-group');
  if(grpSel) grpSel.value='';
  openMod('pi-modal');
}
function savePI(){
  var nm=document.getElementById('pi-nm').value.trim();
  if(!nm)return alert('Informe o nome da parte interessada.');
  var needs=tempNeeds.filter(function(n){return n.trim();});
  var exps=tempExps.filter(function(e){return e.trim();});
  var grpEl=document.getElementById('pi-group');

  // ISO 14001:2026 §4.2 — coleta condições ambientais
  var condAmb=[];
  ['pol','rec','clim','bio','eco'].forEach(function(c){
    var el=document.getElementById('pi-cond-'+c);
    if(el&&el.checked) condAmb.push({'pol':'Níveis de poluição','rec':'Recursos naturais','clim':'Alterações climáticas','bio':'Biodiversidade','eco':'Saúde dos ecossistemas'}[c]);
  });

  // Coleta tratamentos no SGA
  var tratSGA=[];
  [['ro','6.1.1 R&O'],['ap','6.1.2 Aspectos'],['obj','6.2 Objetivos'],['op','8.1 Controles'],['com','7.4 Comunicação']].forEach(function(t){
    var el=document.getElementById('pi-trat-'+t[0]);
    if(el&&el.checked) tratSGA.push(t[1]);
  });

  var relevante    = (document.getElementById('pi-relevante')||{}).value || 'sim';
  var obrigOrigem  = (document.getElementById('pi-obrig-origem')||{}).value || 'legal';
  var obrigVal     = document.getElementById('pi-obrig').value;

  S.pi.push({
    id:'c'+Date.now(), name:nm,
    needs:needs.length?needs:['(não especificado)'],
    exps:exps.length?exps:['(não especificado)'],
    norm:document.getElementById('pi-norm').value,
    inf:parseInt(document.getElementById('pi-inf').value),
    int:parseInt(document.getElementById('pi-int').value),
    obrig:obrigVal,
    group: grpEl&&grpEl.value?grpEl.value:undefined,
    // ISO 14001:2026
    relevante:   relevante,
    obrigOrigem: obrigOrigem,
    condAmb:     condAmb,
    tratSGA:     tratSGA,
    sel:true
  });

  // Auto-gera R&O se relevante e marcou 6.1.1
  if(relevante==='sim' && tratSGA.indexOf('6.1.1 R&O')!==-1){
    if(!S.ros) S.ros=[];
    S.ros.push({
      id:'pi-ro-'+Date.now(),
      orig:'pi', origLabel:'PI: '+nm,
      type: obrigVal==='sim'?'risk':'opp',
      desc: 'Necessidade de "'+nm+'" requer tratamento no SGA',
      impact: needs.length?needs[0]:'(ver necessidades)',
      priority: obrigVal==='sim'?'high':'med',
      autoGen:true, condAmb:condAmb
    });
  }

  closeMod('pi-modal'); renderPI();
}

// ASPECTOS
var apF='all';
function openAPModal(){openMod('ap-modal');}
function saveAP(){
  var proc=document.getElementById('ap-proc').value.trim();
  var asp=document.getElementById('ap-asp').value.trim();
  if(!proc||!asp){alert('Preencha processo e aspecto/perigo.');return;}
  var f=parseInt(document.getElementById('ap-freq').value)||3;
  var p=parseInt(document.getElementById('ap-prob').value)||3;
  var s=parseInt(document.getElementById('ap-sev').value)||3;
  var a=parseInt(document.getElementById('ap-abrang').value)||2;
  var sc=f*p*s*a;
  var catCodeVal = document.getElementById('ap-asp-code').textContent || '';
  var scoreData = getAPScoreData();
  S.apItems.push({type:document.getElementById('ap-type').value,proc:proc,asp:asp,imp:document.getElementById('ap-imp').value,cond:document.getElementById('ap-cond').value,prob:p,sev:s,score:sc,cls:sc>=250?'crit':sc>=100?'high':sc>=25?'med':'low',catCode:catCodeVal});
  document.getElementById('ap-proc').value=''; document.getElementById('ap-asp').value=''; document.getElementById('ap-imp').value='';
  closeMod('ap-modal'); renderAP();
}
function removeAP(i){S.apItems.splice(i,1);renderAP();}
function filterAP(f){
  apF=f;
  ['all','env','sst'].forEach(function(x){
    var b=document.getElementById('fa-'+x);
    b.style.background=x===f?'var(--green)':'';
    b.style.color=x===f?'#fff':'';
    b.style.borderColor=x===f?'var(--green)':'';
  });
  renderAP();
}
function renderAP(){
  var items=apF==='all'?S.apItems:S.apItems.filter(function(a){return a.type===apF;});
  var bd=document.getElementById('ap-body');
  var em=document.getElementById('ap-empty');
  if(!items.length){bd.innerHTML='';em.style.display='block';return;}
  em.style.display='none';
  var cls={low:'sig-low',med:'sig-med',high:'sig-high',crit:'sig-crit'};
  var lbl={low:'Baixo',med:'Médio',high:'Alto',crit:'Crítico'};
  var cnd={N:'Normal',A:'Anormal',E:'Emergência'};
  bd.innerHTML=items.map(function(a,i){
    return '<tr>'
      +'<td>'+(a.type==='env'?'<span class="sig sig-low">🌿 Ambiental</span>':'<span class="sig sig-med">⛑️ SST</span>')+'</td>'
      +'<td>'+esc(a.proc)+'</td><td style="font-weight:500">'+(a.catCode?'<span style="font-size:10px;background:var(--green-l);color:var(--green-d);padding:1px 6px;border-radius:4px;margin-right:4px;font-weight:600">'+esc(a.catCode)+'</span>':'')+esc(a.asp)+'</td><td>'+esc(a.imp)+'</td>'
      +'<td style="font-size:11px;color:var(--text2)">'+cnd[a.cond]+'</td>'
      +'<td style="text-align:center;font-weight:700">'+a.prob+'</td>'
      +'<td style="text-align:center;font-weight:700">'+a.sev+'</td>'
      +'<td><span class="sig '+cls[a.cls]+'">'+a.score+' — '+lbl[a.cls]+'</span></td>'
      +'<td style="font-size:11px">'+(a.sig?'<span style="font-weight:600;color:'+(a.sig==='S'?'var(--red)':'var(--green-d)')+';">'+(a.sig==='S'?'Significativo':'Nao signif.')+'</span>':a.hierNivel?'<span style="font-size:10px;color:var(--blue-d)">Hier. '+esc(a.hierNivel)+'</span>':'-')+'</td>'
      +'<td style="font-size:11px;color:var(--text2)">'+(a.ciclo?'&#x1F504; '+esc(a.ciclo):a.ctrlAd?'&#x2795; '+esc(a.ctrlAd):'-')+'</td>'
      +'<td><button onclick="removeAP('+i+')" style="background:none;border:none;cursor:pointer;font-size:15px;color:var(--text2)">×</button></td>'
      +'</tr>';
  }).join('');
}

// MATRIZ
function buildMatrix(){
  var rows=['P5','P4','P3','P2','P1'];
  var cols=[['m-med','m-high','m-high','m-crit','m-crit'],['m-low','m-med','m-high','m-high','m-crit'],['m-low','m-med','m-med','m-high','m-high'],['m-low','m-low','m-med','m-med','m-high'],['m-low','m-low','m-low','m-med','m-med']];
  var t='<thead><tr><th style="width:60px;text-align:left;padding:4px 6px;font-size:11px">P \\ S</th>';
  for(var s=1;s<=5;s++) t+='<th>S'+s+'</th>';
  t+='</tr></thead><tbody>';
  for(var ri=0;ri<5;ri++){
    var p=5-ri;
    t+='<tr><th style="text-align:left;font-size:10px;padding:4px 6px;background:var(--gray-l)">'+rows[ri]+'</th>';
    for(var ci=0;ci<5;ci++){
      var sc=p*(ci+1);
      var cnt=S.roItems.filter(function(x){return x.prob===p&&x.sev===(ci+1);}).length;
      t+='<td class="'+cols[ri][ci]+'" onclick="selectCell('+p+','+(ci+1)+')" title="Clique para selecionar P='+p+', S='+(ci+1)+'">'
        +'<span class="mscore">'+sc+'</span>'+(cnt?'<span class="mcnt">'+cnt+'✔</span>':'')+'</td>';
    }
    t+='</tr>';
  }
  t+='</tbody>';
  document.getElementById('risk-matrix').innerHTML=t;
}
function selectCell(p,s){
  document.getElementById('ro-prob').value=p;
  document.getElementById('ro-sev').value=s;
  document.getElementById('ro-desc').focus();
}

// RO
function addRO(){
  var desc=document.getElementById('ro-desc').value.trim();
  if(!desc){alert('Informe a descrição.');return;}
  var p=parseInt(document.getElementById('ro-prob').value);
  var s=parseInt(document.getElementById('ro-sev').value);
  var sc=p*s;
  S.roItems.push({type:document.getElementById('ro-type').value,norm:document.getElementById('ro-norm').value,desc:desc,src:document.getElementById('ro-src').value,prob:p,sev:s,score:sc,cls:sc>=250?'crit':sc>=100?'high':sc>=25?'med':'low',action:document.getElementById('ro-action').value,origin:document.getElementById('ro-origin').value,autoGen:false});
  document.getElementById('ro-desc').value=''; document.getElementById('ro-src').value=''; document.getElementById('ro-action').value='';
  renderRO(); buildMatrix();
}
function removeRO(i){S.roItems.splice(i,1);renderRO();buildMatrix();}
function renderRO(){
  var el=document.getElementById('ro-items');
  var cEl=document.getElementById('ro-count');
  if(cEl){
    var nr=S.roItems.filter(function(r){return r.type==='risk';}).length;
    var no=S.roItems.filter(function(r){return r.type==='opp';}).length;
    var npend=S.roItems.filter(function(r){return !r.actions||!r.actions.length||r.actions.some(function(a){return a.status==='pendente';});}).length;
    cEl.textContent=nr+' risco(s) · '+no+' oportunidade(s)';
  }
  updateActionBadge();
  if(!S.roItems.length){el.innerHTML='<div class="empty">Nenhum item registrado. Use a geração automática ou adicione manualmente.</div>';return;}
  var dots={low:'#1D9E75',med:'#BA7517',high:'#E85D24',crit:'#A32D2D'};
  var lbl={low:'Baixo',med:'Médio',high:'Alto',crit:'Crítico'};
  var nlb={env:'ISO 14001',sst:'ISO 45001',both:'14001+45001'};
  el.innerHTML=S.roItems.map(function(r,i){
    var tp=r.type==='risk'?'⚠️ Risco':'🎯 Oportunidade';
    var tbg=r.type==='risk'?'var(--red-l)':'var(--green-l)';
    var tc=r.type==='risk'?'var(--red)':'var(--green-d)';
    var originMap={'4.1-swot':'<span class="ro-origin-tag rot-swot">4.1 SWOT</span>','4.2-pi':'<span class="ro-origin-tag rot-pi">4.2 Partes Int.</span>','6.1.2-ap':'<span class="ro-origin-tag rot-ap">6.1.2 Asp./Perigo</span>','manual':'<span class="ro-origin-tag rot-manual">Manual</span>'};
    var originTag=originMap[r.origin||'manual']||'<span class="ro-origin-tag rot-manual">Manual</span>';
    var autoTag=r.autoGen?'<span style="font-size:10px;padding:1px 6px;border-radius:10px;background:var(--purple-l);color:var(--purple);font-weight:600">⚡ Auto</span>':'';
    // Resumo das ações
    var acts=r.actions||[];
    var actSummary='';
    if(acts.length){
      var stCounts={pendente:0,'em andamento':0,concluida:0,atrasada:0};
      acts.forEach(function(a){stCounts[a.status]=(stCounts[a.status]||0)+1;});
      var parts=[];
      if(stCounts.atrasada) parts.push('<span class="status-badge st-over">🔴 '+stCounts.atrasada+' atrasada(s)</span>');
      if(stCounts['em andamento']) parts.push('<span class="status-badge st-prog">🔄 '+stCounts['em andamento']+' em andamento</span>');
      if(stCounts.pendente) parts.push('<span class="status-badge st-pend">🕐 '+stCounts.pendente+' pendente(s)</span>');
      if(stCounts.concluida) parts.push('<span class="status-badge st-done">✅ '+stCounts.concluida+' concluída(s)</span>');
      actSummary='<div style="margin-top:5px;display:flex;gap:5px;flex-wrap:wrap">'+parts.join('')+'</div>';
    } else {
      actSummary='<div style="margin-top:4px;font-size:11px;color:var(--text3);font-style:italic">Nenhuma ação cadastrada</div>';
    }
    var panelId='ro-panel-'+i;
    var panelOpen=r._panelOpen?'block':'none';
    return '<div class="ro-item" style="flex-direction:column;align-items:stretch">'
      // Cabeçalho clicável
      +'<div style="display:flex;align-items:flex-start;gap:12px;cursor:pointer" onclick="toggleROPanel('+i+')">'
      +'<div class="ro-dot" style="background:'+dots[r.cls]+';margin-top:6px"></div>'
      +'<div style="flex:1">'
      +'<div class="flex" style="gap:5px;flex-wrap:wrap;margin-bottom:4px">'
      +'<span style="font-size:11px;padding:2px 8px;border-radius:20px;background:'+tbg+';color:'+tc+'">'+tp+'</span>'
      +'<span class="sig '+(r.cls==='low'?'sig-low':r.cls==='med'?'sig-med':'sig-crit')+'">Score '+r.score+' — '+lbl[r.cls]+'</span>'
      +'<span style="font-size:11px;color:var(--text2)">'+nlb[r.norm]+'</span>'
      +originTag+autoTag
      +'</div>'
      +'<div class="ro-t">'+esc(r.desc)+'</div>'
      +(r.src?'<div class="ro-m">📍 '+esc(r.src)+'</div>':'')
      +actSummary
      +'</div>'
      +'<div style="display:flex;gap:6px;flex-shrink:0">'
      +'<button onclick="event.stopPropagation();toggleROPanel('+i+')" class="btn btn-sm" style="font-size:11px">✏️ Ações</button>'
      +'<button onclick="event.stopPropagation();removeRO('+i+')" style="background:none;border:none;cursor:pointer;font-size:16px;color:var(--text2)">×</button>'
      +'</div></div>'
      // Painel expandível de ações
      +'<div id="'+panelId+'" style="display:'+panelOpen+'">'
      +renderActionPanel(i)
      +'</div>'
      +'</div>';
  }).join('');
}

function toggleROPanel(i) {
  S.roItems[i]._panelOpen = !S.roItems[i]._panelOpen;
  renderRO();
  // Scroll suave até o painel aberto
  setTimeout(function(){
    var el=document.getElementById('ro-panel-'+i);
    if(el&&S.roItems[i]._panelOpen) el.scrollIntoView({behavior:'smooth',block:'nearest'});
  },50);
}

function renderActionPanel(i) {
  var r = S.roItems[i];
  if(!r.actions) r.actions=[];
  var acts = r.actions;
  var today = new Date().toISOString().slice(0,10);

  var actRows = acts.map(function(a,j){
    var stMap={pendente:'st-pend',  'em andamento':'st-prog', concluida:'st-done', atrasada:'st-over'};
    var stLbl={pendente:'🕐 Pendente','em andamento':'🔄 Em andamento',concluida:'✅ Concluída',atrasada:'🔴 Atrasada'};
    var ORIG_CSS2={ro:'orig-ro',obj:'orig-obj',nc:'orig-nc',inc:'orig-inc',aud:'orig-aud',ac:'orig-ac',man:'orig-man'};
    var ORIG_LBL2={ro:'R&O 6.1.1',obj:'Obj. 6.2',nc:'NC 10.2',inc:'Incidente',aud:'Auditoria',ac:'An. Crítica',man:'Manual'};
    // Verifica se está atrasada automaticamente
    if(a.status!=='concluida' && a.prazo && a.prazo < today) a.status='atrasada';
    // Eficácia badge
    var efSt = a.eficacia ? a.eficacia.status : 'pendente';
    var efBadge = a.status==='concluida'
      ? '<span class="efic-badge '+(efSt==='ok'?'efic-ok':efSt==='nok'?'efic-nok':'efic-pend')+'">'
        +(efSt==='ok'?'✅ Eficaz':efSt==='nok'?'❌ Ineficaz':'⏳ Eficácia pendente')+'</span>'
      : '';
    var origTag = a.origem ? '<span class="orig-tag '+( ORIG_CSS2[a.origem]||'orig-man')+'">'+( ORIG_LBL2[a.origem]||'Manual')+'</span>' : '';
    return '<div style="border:1px solid var(--gray-b);border-radius:6px;background:var(--white);margin-bottom:6px;overflow:hidden">'
      +'<div style="display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:center;padding:7px 10px">'
      +'<div>'
      +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">'+origTag+(efBadge?'&nbsp;'+efBadge:'')+'</div>'
      +'<div style="font-size:12px;font-weight:500;color:var(--text)">'+esc(a.desc)+'</div>'
      +'<div style="font-size:11px;color:var(--text2);margin-top:2px">'
      +(a.resp?'👤 '+esc(a.resp):'<em>Sem responsável</em>')
      +(a.prazo?' &nbsp;📅 '+a.prazo:'')
      +(a.evid?' &nbsp;📎 '+esc(a.evid):'')
      +'</div>'
      +'</div>'
      +'<select onchange="updateActionStatus('+i+','+j+',this.value)" style="font-size:11px;padding:3px 7px;border-radius:20px;border:1px solid var(--gray-b)">'
      +['pendente','em andamento','concluida','atrasada'].map(function(s){
          return '<option value="'+s+'"'+(a.status===s?' selected':'')+'>'+stLbl[s]+'</option>';
        }).join('')
      +'</select>'
      +'<button onclick="editAction('+i+','+j+')" style="background:none;border:none;cursor:pointer;font-size:13px;color:var(--blue-d)" title="Editar">✏️</button>'
      +'<button onclick="removeAction('+i+','+j+')" style="background:none;border:none;cursor:pointer;font-size:14px;color:var(--text2)" title="Remover">×</button>'
      +'</div>'
      // Bloco de causa raiz (NC e Incidentes)
      +(a.causaRaiz ? renderCausaRaiz(i,j,a) : '')
      // Bloco de verificação de eficácia (quando concluída)
      +(a.status==='concluida' ? renderEficacia(i,j,a) : '')
      +'</div>';
  }).join('');

  var ORIG_LABELS = {ro:'R&O 6.1.1',obj:'Objetivos 6.2',nc:'NC 10.2',inc:'Incidente 10.1',aud:'Auditoria 9.2',ac:'An. Crítica 9.3',man:'Manual'};
  var ORIG_CSS    = {ro:'orig-ro',obj:'orig-obj',nc:'orig-nc',inc:'orig-inc',aud:'orig-aud',ac:'orig-ac',man:'orig-man'};

  return '<div class="ro-action-panel">'
    +'<div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:8px">📋 Ações planejadas para este item</div>'
    +(actRows || '<div style="font-size:12px;color:var(--text3);font-style:italic;margin-bottom:8px">Nenhuma ação cadastrada.</div>')
    +'<div style="border-top:1px dashed var(--gray-b);padding-top:10px;margin-top:4px">'
    +'<div style="font-size:11px;font-weight:600;color:var(--text2);margin-bottom:8px">➕ Nova ação</div>'
    +'<div class="action-row">'
    +'<div><label>Descrição da ação</label><input type="text" id="na-desc-'+i+'" placeholder="Ex.: Implantar controle operacional" style="width:100%"></div>'
    +'<div><label>Responsável</label><input type="text" id="na-resp-'+i+'" placeholder="Nome do responsável" style="width:100%"></div>'
    +'<div><label>Prazo</label><input type="date" id="na-prazo-'+i+'" style="width:100%"></div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;align-items:end;margin-top:6px">'
    +'<div><label>Origem da ação</label>'
    +'<select id="na-orig-'+i+'">'
    +'<option value="ro">R&O — Risco / Oportunidade (6.1.1)</option>'
    +'<option value="obj">Objetivo e Meta (6.2)</option>'
    +'<option value="nc">Não Conformidade (10.2)</option>'
    +'<option value="inc">Incidente de SST (10.1)</option>'
    +'<option value="aud">Auditoria Interna (9.2)</option>'
    +'<option value="ac">Análise Crítica (9.3)</option>'
    +'<option value="man">Identificação direta / Manual</option>'
    +'</select></div>'
    +'<div><label>Evidência / Como verificar eficácia</label><input type="text" id="na-evid-'+i+'" placeholder="Ex.: Relatório de monitoramento arquivado" style="width:100%"></div>'
    +'<button class="btn btn-sm btn-g" onclick="addAction('+i+')" style="white-space:nowrap">+ Adicionar</button>'
    +'</div>'
    +'</div>'
    +'</div>';
}

function addAction(i) {
  var desc  = document.getElementById('na-desc-'+i).value.trim();
  if (!desc) { alert('Informe a descrição da ação.'); return; }
  var resp  = document.getElementById('na-resp-'+i).value.trim();
  var prazo = document.getElementById('na-prazo-'+i).value;
  var evid  = document.getElementById('na-evid-'+i).value.trim();
  var origEl= document.getElementById('na-orig-'+i);
  var orig  = origEl ? origEl.value : 'ro';
  var today = new Date().toISOString().slice(0,10);
  var status = (prazo && prazo < today) ? 'atrasada' : 'pendente';
  // Ações de NC ou Incidente têm causa raiz e verificação de eficácia
  var needsCausa = (orig === 'nc' || orig === 'inc');
  if (!S.roItems[i].actions) S.roItems[i].actions = [];
  S.roItems[i].actions.push({
    desc: desc, resp: resp, prazo: prazo, evid: evid,
    status: status, created: today, origem: orig,
    // Campos específicos por tipo
    causaRaiz:    needsCausa ? {porques:['','','','',''], metodologia:'5porques', conclusao:''} : null,
    eficacia:     {status:'pendente', resp:'', prazoVerif:'', resultado:'', verificadoEm:''},
  });
  S.roItems[i]._panelOpen = true;
  renderRO();
}

function removeAction(i, j) {
  if (!confirm('Remover esta ação?')) return;
  S.roItems[i].actions.splice(j,1);
  S.roItems[i]._panelOpen = true;
  renderRO();
}

function updateActionStatus(i, j, status) {
  S.roItems[i].actions[j].status = status;
  S.roItems[i]._panelOpen = true;
  renderRO();
}

function editAction(i, j) {
  var a = S.roItems[i].actions[j];
  var desc  = prompt('Descrição da ação:', a.desc);   if(desc===null) return;
  var resp  = prompt('Responsável:', a.resp||'');
  var prazo = prompt('Prazo (AAAA-MM-DD):', a.prazo||'');
  var evid  = prompt('Evidência / Como verificar:', a.evid||'');
  a.desc=desc||a.desc; a.resp=resp; a.prazo=prazo; a.evid=evid;
  if(a.status!=='concluida' && prazo && prazo<new Date().toISOString().slice(0,10)) a.status='atrasada';
  S.roItems[i]._panelOpen = true;
  renderRO();
}

function updateActionBadge() {
  var pending = 0, overdue = 0;
  S.roItems.forEach(function(r){
    (r.actions||[]).forEach(function(a){
      if(a.status==='atrasada') overdue++;
      else if(a.status==='pendente'||a.status==='em andamento') pending++;
    });
  });
  var badge = document.getElementById('action-nav-badge');
  if(badge){
    var total = pending+overdue;
    badge.textContent = total;
    badge.style.background = overdue>0?'var(--red-l)':total>0?'var(--amber-l)':'#e8f5ef';
    badge.style.color = overdue>0?'var(--red)':total>0?'var(--amber)':'var(--green-d)';
  }
}

// ─── Painel de gestão consolidada (S5) ──────────────────────────

// ═══════════════════════════════════════════════════════════════════
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
  {code:'A01',type:'env',asp:'Geração de resíduo sólido não perigoso',imp:'Alteração da qualidade do solo; sobrecarga de aterros sanitários',prob:3,sev:2},
  {code:'A02',type:'env',asp:'Geração de resíduo sólido perigoso (Classe I)',imp:'Potencial alteração da qualidade do solo e lençol freático; risco à saúde humana',prob:3,sev:4},
  {code:'A03',type:'env',asp:'Geração de efluente líquido industrial',imp:'Potencial alteração da qualidade dos corpos hídricos; mortandade de fauna aquática',prob:3,sev:4},
  {code:'A04',type:'env',asp:'Geração de efluente doméstico (esgoto sanitário)',imp:'Potencial alteração microbiológicaobiológica de solo e água',prob:2,sev:3},
  {code:'A05',type:'env',asp:'Emissão de material particulado (poeira/fumaça)',imp:'Alteração da qualidade do ar; problemas respiratórios na comunidade',prob:3,sev:3},
  {code:'A06',type:'env',asp:'Emissão de COVs (compostos orgânicos voláteis)',imp:'Alteração da qualidade do ar; formação de ozônio troposférico',prob:3,sev:3},
  {code:'A07',type:'env',asp:'Emissão de gases de combustão (CO₂, NOx, SOx)',imp:'Contribuição ao efeito estufa; chuva ácida',prob:3,sev:3},
  {code:'A08',type:'env',asp:'Emissão de ruído acima do limite (NR-15 / CONAMA 01)',imp:'Poluição sonora; incômodo à comunidade; perda auditiva',prob:3,sev:3},
  {code:'A09',type:'env',asp:'Emissão de vibração',imp:'Incômodo à comunidade; danos a edificações vizinhas',prob:2,sev:2},
  {code:'A10',type:'env',asp:'Geração de odor ofensivo',imp:'Incômodo à comunidade; impacto na qualidade de vida',prob:2,sev:2},
  {code:'A11',type:'env',asp:'Consumo excessivo de água',imp:'Esgotamento de recursos hídricos; aumento de custos',prob:3,sev:3},
  {code:'A12',type:'env',asp:'Consumo excessivo de energia elétrica',imp:'Aumento da pegada de carbono; dependência energética',prob:3,sev:2},
  {code:'A13',type:'env',asp:'Consumo de combustível fóssil (diesel, gasolina, GNV)',imp:'Emissão de GEE; esgotamento de recursos não renováveis',prob:3,sev:3},
  {code:'A14',type:'env',asp:'Vazamento de óleo lubrificante ou hidráulico',imp:'Potencial alteração da qualidade do solo e da água superficial',prob:3,sev:4},
  {code:'A15',type:'env',asp:'Vazamento de produto químico perigoso',imp:'Potencial alteração da qualidade do solo, água e ar; risco à biota',prob:2,sev:5},
  {code:'A16',type:'env',asp:'Derramamento acidental de substância perigosa',imp:'Potencial alteração imediata da qualidade ambiental; passivo ambiental',prob:2,sev:5},
  {code:'A17',type:'env',asp:'Descarte inadequado de embalagens contaminadas',imp:'Potencial alteração da qualidade do solo; veiculação de substâncias perigosas',prob:2,sev:3},
  {code:'A18',type:'env',asp:'Uso de substâncias ozonodepletoras (CFCs, HCFCs)',imp:'Destruição da camada de ozônio',prob:2,sev:4},
  {code:'A19',type:'env',asp:'Supressão de vegetação nativa',imp:'Perda de biodiversidade; erosão do solo',prob:1,sev:4},
  {code:'A20',type:'env',asp:'Geração de resíduo de construção e demolição (RCD)',imp:'Disposição irregular; alteração da qualidade do solo',prob:2,sev:2},
  {code:'A21',type:'env',asp:'Emissão de luz artificial (poluição luminosa)',imp:'Perturbação da fauna noturna; incômodo à comunidade',prob:2,sev:1},
  {code:'A22',type:'env',asp:'Alteração da qualidade do solo por resíduo industrial',imp:'Passivo ambiental; risco à saúde humana e ecossistema',prob:2,sev:4},
  {code:'A23',type:'env',asp:'Descarte de REEE (lixo eletrônico)',imp:'Presença de metais pesados no solo; comprometimento da cadeia trófica',prob:2,sev:3},
  {code:'A24',type:'env',asp:'Geração de lodo de ETE/ETA',imp:'Disposição incorreta pode contaminar solo e água',prob:2,sev:3},
  {code:'A25',type:'env',asp:'Uso de agrotóxico ou pesticida',imp:'Potencial alteração da qualidade do solo e água; impacto na biodiversidade',prob:2,sev:4},
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
  ['A14','env','Geração de resíduos sólidos','Descarte inadequado de óleo lubrificante usado','Alteração da qualidade do solo e lençol freático','N','3','4','','Manutenção',''],
  ['S02','sst','Operação em altura','Queda de pessoa em nível diferente (>2m)','Fratura grave, TCE, óbito','N','2','5','','Manutenção','Verificar andaimes e cintos'],
  ['A06','env','Processos de pintura','Emissão de COVs (compostos orgânicos voláteis)','Poluição atmosférica local','N','4','3','','Produção',''],
  ['S05','sst','Operação de prensas','Contato com partes móveis de máquinas (NR-12)','Amputação, esmagamento, óbito','N','2','5','','Produção','NR-12 — proteções verificadas?'],
  ['A03','env','Lavagem de peças','Geração de efluente líquido industrial','Potencial alteração da qualidade dos corpos hídricos','N','3','3','','Qualidade',''],
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


// ===== EXPORTAR ISO 14001 — XLSX via SheetJS (com catálogo, dropdowns e fórmulas) =====
function exportCSV14001() {
  var org = document.getElementById('org-name').value || 'Organizacao';
  var dt  = new Date().toLocaleDateString('pt-BR');

  function doExport14001() {
    var XL = window.XLSX;
    if (!XL) { alert('Biblioteca XLSX não carregada. Tente novamente.'); return; }

    var wb = XL.utils.book_new();

    // ── Catálogo de aspectos (aba oculta para PROCV) ──────────────
    var CAT14 = [
      ['Codigo','Aspecto Ambiental','Impacto Ambiental Típico'],
      ['A01','Geração de resíduo sólido não perigoso','Comprometimento da capacidade de disposição de resíduos sólidos'],
      ['A02','Geração de resíduo perigoso (Classe I)','Potencial alteração da qualidade do solo e dos recursos hídricos subterrâneos'],
      ['A03','Consumo de energia elétrica','Esgotamento de recursos energéticos não renováveis / contribuição ao efeito estufa'],
      ['A04','Consumo de água','Comprometimento da disponibilidade dos recursos hídricos'],
      ['A05','Lançamento de efluente líquido','Potencial alteração da qualidade dos corpos d\'água superficiais'],
      ['A06','Emissão atmosférica (COVs / fumos / poeiras)','Alteração da qualidade do ar / comprometimento da saúde humana'],
      ['A07','Consumo de matéria-prima / insumos','Esgotamento de recursos naturais renováveis e não renováveis'],
      ['A08','Geração de ruído e vibração','Alteração da qualidade sonora / incômodo à comunidade e fauna'],
      ['A09','Potencial vazamento ou derramamento de óleo / produto químico','Potencial alteração da qualidade do solo e dos recursos hídricos'],
      ['A10','Emissão de CO₂ e gases de efeito estufa (GEE)','Contribuição ao aquecimento global / alteração climática'],
      ['A11','Consumo excessivo de combustível','Esgotamento de recursos não renováveis / emissão de GEE'],
      ['A12','Geração de efluente sanitário','Potencial alteração da qualidade dos recursos hídricos superficiais e subterrâneos'],
      ['A13','Geração de embalagens e resíduos de papel','Comprometimento da capacidade de disposição de resíduos sólidos'],
      ['A14','Potencial vazamento de óleo lubrificante','Potencial alteração da qualidade do solo e dos recursos hídricos subterrâneos'],
      ['A15','Armazenamento inadequado de produtos químicos','Risco de alteração da qualidade do solo e dos recursos hídricos'],
      ['A16','Uso de substâncias perigosas','Risco de alteração da qualidade ambiental e comprometimento da saúde humana'],
      ['A17','Emissão de material particulado','Alteração da qualidade do ar / comprometimento da visibilidade e saúde'],
      ['A18','Geração de resíduo de construção civil (RCC)','Comprometimento da qualidade do solo / alteração da drenagem local'],
      ['A19','Descarte inadequado de lâmpadas fluorescentes','Risco de alteração da qualidade do solo por substâncias tóxicas'],
      ['A20','Descarte inadequado de pilhas e baterias','Risco de alteração da qualidade do solo por metais pesados'],
      ['A21','Consumo de papel e materiais de escritório','Esgotamento de recursos florestais / geração de resíduos sólidos'],
      ['A22','Uso de refrigerantes (CFC/HFC)','Comprometimento da camada de ozônio / contribuição ao efeito estufa'],
      ['A23','Disposição inadequada de resíduos sólidos','Alteração da qualidade do solo / comprometimento da drenagem e paisagem'],
      ['A24','Supressão de vegetação / impermeabilização','Redução da biodiversidade / alteração do ciclo hidrológico local'],
      ['A25','Geração de odores','Alteração da qualidade do ar / incômodo à comunidade do entorno'],
    ];

    var wsCat = XL.utils.aoa_to_sheet(CAT14);
    wsCat['!cols'] = [{wch:10},{wch:45},{wch:50}];
    XL.utils.book_append_sheet(wb, wsCat, 'Catalogo14001');

    // ── Aba de dados com fórmulas ─────────────────────────────────
    var HEADER = [
      'Codigo','Atividade / Produto / Serviço','Etapa do Ciclo de Vida',
      'Aspecto Ambiental','Impacto Ambiental',
      'Condição [N/A/E]','Probabilidade [1-5]','Severidade [1-5]',
      'Score (P x S)','Significância [S/N]',
      'Critério de Significância','Responsável','Área / Setor','Observações'
    ];

    var ETAPAS = [
      '1-Aquisição de matérias-primas','2-Design/Projeto',
      '3-Produção/Operação','4-Transporte/Entrega',
      '5-Utilização pelo cliente','6-Tratamento fim de vida'
    ];

    // Linhas de dados com fórmulas
    var dataRows = [HEADER];
    for (var r = 0; r < 50; r++) {
      var rowNum = r + 2; // linha no Excel (1=header, 2=primeira linha de dados)
      var colA   = 'A' + rowNum;
      var colG   = 'G' + rowNum;
      var colH   = 'H' + rowNum;
      var colI   = 'I' + rowNum;
      dataRows.push([
        { t:'s', v:'' },  // A: Codigo (usuário digita — ex.: A09, A14)
        { t:'s', v:'' },  // B: Atividade / Produto / Serviço
        { t:'s', v:'' },  // C: Etapa do Ciclo de Vida (dropdown)
        // D: Aspecto — preenchido automaticamente pelo PROCV
        { t:'s', f:'IF(UPPER('+colA+')="","",IFERROR(VLOOKUP(UPPER('+colA+'),Catalogo14001!$A:$B,2,0),"Código não encontrado — preencha manualmente"))' },
        // E: Impacto — preenchido automaticamente pelo PROCV
        { t:'s', f:'IF(UPPER('+colA+')="","",IFERROR(VLOOKUP(UPPER('+colA+'),Catalogo14001!$A:$C,3,0),""))' },
        { t:'s', v:'' },  // F: Condição [N/A/E] (dropdown)
        { t:'n', v:null }, // G: Probabilidade [1-5]
        { t:'n', v:null }, // H: Severidade [1-5]
        // I: Score = Probabilidade × Severidade (automático)
        { t:'n', f:'IF(AND(ISNUMBER('+colG+'),ISNUMBER('+colH+')),'+colG+'*'+colH+',"")' },
        // J: Significância automática (S se Score>=10, N se Score<10)
        { t:'s', f:'IF('+colI+'="","",IF('+colI+'>=10,"S","N"))' },
        // K: Critério de Significância (automático)
        { t:'s', f:'IF('+colI+'="","",IF('+colI+'>=17,"Crítico (17-25)",IF('+colI+'>=10,"Alto/Crítico — Score >= 10 (SIGNIFICATIVO)","Score < 10 — Não significativo")))' },
        { t:'s', v:'' },  // L: Responsável
        { t:'s', v:'' },  // M: Área / Setor
        { t:'s', v:'' },  // N: Observações
      ]);
    }

    var ws14 = XL.utils.aoa_to_sheet(dataRows);

    // Larguras das colunas
    ws14['!cols'] = [
      {wch:12}, // Codigo
      {wch:32}, // Atividade
      {wch:26}, // Etapa
      {wch:40}, // Aspecto (preenchido por fórmula)
      {wch:40}, // Impacto (preenchido por fórmula)
      {wch:14}, // Condição
      {wch:16}, // Probabilidade
      {wch:14}, // Severidade
      {wch:14}, // Score (fórmula)
      {wch:16}, // Significância (fórmula)
      {wch:30}, // Critério (fórmula)
      {wch:20}, // Responsável
      {wch:20}, // Área
      {wch:30}, // Observações
    ];

    // Freeze cabeçalho
    ws14['!freeze'] = {xSplit:0, ySplit:1};

    // Validação de dados — dropdown para Etapa do Ciclo de Vida (coluna C)
    if (!ws14['!dataValidation']) ws14['!dataValidation'] = [];
    ws14['!dataValidation'].push({
      sqref: 'C2:C51',
      type: 'list',
      formula1: '"' + ETAPAS.join(',') + '"',
      showDropDown: false,
      showErrorMessage: true,
      errorTitle: 'Valor inválido',
      error: 'Selecione uma etapa do ciclo de vida da lista.'
    });
    // Dropdown Condição
    ws14['!dataValidation'].push({
      sqref: 'F2:F51',
      type: 'list',
      formula1: '"N,A,E"',
      showDropDown: false
    });

    XL.utils.book_append_sheet(wb, ws14, 'Aspectos e Impactos');

    // ── Aba de instruções ─────────────────────────────────────────
    var instrRows = [
      ['SGI — ISO 14001 | LEVANTAMENTO DE ASPECTOS E IMPACTOS AMBIENTAIS'],
      ['Organização: ' + org + '   |   Data: ' + dt],
      [''],
      ['COMO USAR:'],
      ['1. Na aba "Aspectos e Impactos", preencha a coluna A com o CÓDIGO do catálogo (ex.: A01, A14)'],
      ['   → O Aspecto e o Impacto serão preenchidos AUTOMATICAMENTE por fórmula PROCV'],
      ['2. Se o aspecto não estiver no catálogo, deixe o código em branco e preencha manualmente as colunas D e E'],
      ['3. Preencha Probabilidade (G) e Severidade (H) com valores de 1 a 5'],
      ['   → O Score (I) e a Significância (J) serão calculados AUTOMATICAMENTE'],
      ['4. Preencha as colunas manuais: Condição, Responsável, Área e Observações'],
      ['5. Salve o arquivo e importe de volta no SGI pelo botão IMPORTAR 14001'],
      [''],
      ['CATÁLOGO DE CÓDIGOS (também na aba "Catalogo14001"):'],
      ['A01 — Geração de resíduo sólido não perigoso'],
      ['A02 — Geração de resíduo perigoso (Classe I)'],
      ['A03 — Consumo de energia elétrica'],
      ['A04 — Consumo de água'],
      ['A05 — Emissão de efluente líquido'],
      ['A06 — Emissão atmosférica (COVs / fumos / poeiras)'],
      ['A07 — Consumo de matéria-prima / insumos'],
      ['A08 — Geração de ruído'],
      ['A09 — Vazamento / derramamento de óleo ou produto químico'],
      ['A10 — Emissão de CO₂ e gases de efeito estufa'],
      ['... (ver aba Catalogo14001 para lista completa)'],
      [''],
      ['ETAPAS DO CICLO DE VIDA:'],
      ['1-Aquisição de matérias-primas | 2-Design/Projeto | 3-Produção/Operação'],
      ['4-Transporte/Entrega | 5-Utilização pelo cliente | 6-Tratamento fim de vida'],
      [''],
      ['LEGENDA PROBABILIDADE: 1=Muito baixa | 2=Baixa | 3=Média | 4=Alta | 5=Muito alta'],
      ['LEGENDA SEVERIDADE: 1=Insignificante | 2=Menor | 3=Moderada | 4=Maior | 5=Catastrófica'],
      ['SCORE: 1-4 Baixo | 5-9 Médio | 10-16 Alto | 17-25 Crítico'],
      ['SIGNIFICÂNCIA AUTOMÁTICA: Score >= 10 = S (Significativo) | Score < 10 = N'],
    ];
    var wsInstr = XL.utils.aoa_to_sheet(instrRows);
    wsInstr['!cols'] = [{wch:90}];
    XL.utils.book_append_sheet(wb, wsInstr, 'Instrucoes');

    XL.writeFile(wb, 'SGI_14001_Aspectos_Impactos_' + new Date().toISOString().slice(0,10) + '.xlsx');
  }

  if (!window.XLSX) {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    s.onload = doExport14001;
    document.head.appendChild(s);
  } else { doExport14001(); }
}

// ===== EXPORTAR ISO 45001 — XLSX via SheetJS (com catálogo, dropdowns e fórmulas) =====
function exportCSV45001() {
  var org = document.getElementById('org-name').value || 'Organizacao';
  var dt  = new Date().toLocaleDateString('pt-BR');

  function doExport45001() {
    var XL = window.XLSX;
    if (!XL) { alert('Biblioteca XLSX não carregada.'); return; }

    var wb = XL.utils.book_new();

    // Catálogo SST
    var CAT45 = [
      ['Codigo','Perigo SST','Risco / Consequência Típica'],
      ['S01','Trabalho em altura (>2m)','Queda com fraturas graves, TCE ou óbito'],
      ['S02','Operação de máquinas com partes móveis','Esmagamento, amputação, cortes graves'],
      ['S03','Manuseio de produtos químicos perigosos','Intoxicação, queimadura química, doenças ocupacionais'],
      ['S04','Exposição ao ruído acima do limite (NR-15)','Perda auditiva induzida por ruído (PAIR)'],
      ['S05','Exposição ao calor excessivo','Exaustão térmica, insolação, queimaduras'],
      ['S06','Atividades com esforço repetitivo / posturas inadequadas','LER/DORT, tendinite, lombalgia'],
      ['S07','Operação de empilhadeira / veículos internos','Atropelamento, colisão, queda de carga'],
      ['S08','Trabalho em espaço confinado','Asfixia, intoxicação, soterramento'],
      ['S09','Instalações elétricas / trabalho com energia','Choque elétrico, arco elétrico, queimadura, óbito'],
      ['S10','Manuseio e levantamento de cargas pesadas','Lombalgia, hérnia de disco, distensão muscular'],
      ['S11','Exposição a agentes biológicos','Infecções, doenças transmissíveis'],
      ['S12','Atividades com ferramentas manuais cortantes','Cortes, perfurações, abrasões'],
      ['S13','Exposição a vibrações (mãos-braços ou corpo inteiro)','SDBB, lombalgias, neuropatias'],
      ['S14','Trabalho em superfícies escorregadias','Queda no mesmo nível com contusões ou fraturas'],
      ['S15','Exposição a poeiras / fibras (sílica, amianto, etc.)','Silicose, asbestose, cânceres ocupacionais'],
      ['S16','Trabalho noturno / turnos prolongados','Fadiga, distúrbios do sono, erros operacionais'],
      ['S17','Incêndio / explosão','Queimaduras graves, intoxicação por fumaça, óbito'],
      ['S18','Uso de EPI inadequado ou sem uso','Agravamento de todos os outros riscos'],
      ['S19','Pressão psicológica / assédio moral','Burnout, ansiedade, depressão, afastamentos'],
      ['S20','Exposição a radiações ionizantes','Cânceres, leucemia, danos genéticos'],
      ['S21','Trabalho em ambientes com iluminação inadequada','Fadiga visual, acidentes por falta de visibilidade'],
      ['S22','Contato com superfícies quentes / frias extremas','Queimaduras térmicas / criogênicas'],
      ['S23','Uso de equipamentos de pressão (vasos, caldeiras)','Explosão, liberação de vapor, queimadura'],
      ['S24','Transporte e armazenagem de materiais inflamáveis','Incêndio, explosão, intoxicação'],
      ['S25','Trabalho em proximidade a linhas elétricas de alta tensão','Arco elétrico, eletrocussão'],
      ['S26','Atividades com animais peçonhentos / vetores','Acidentes ofídicos, escorpiônicos, doenças'],
      ['S27','Trabalho sob chuva / intempéries','Queda, choque elétrico, hipotermia'],
      ['S28','Operação de caldeiras e vasos de pressão','Explosão, queimadura por vapor'],
      ['S29','Falta de sinalização de segurança','Acidentes por desconhecimento de riscos'],
      ['S30','Trabalho isolado / sem supervisão','Agravamento de acidentes por falta de socorro'],
    ];

    var wsCat = XL.utils.aoa_to_sheet(CAT45);
    wsCat['!cols'] = [{wch:10},{wch:45},{wch:55}];
    XL.utils.book_append_sheet(wb, wsCat, 'Catalogo45001');

    // Hierarquias
    var HIERARQ = [
      '1-Eliminação','2-Substituição',
      '3-Controles de engenharia','4-Controles administrativos','5-EPI'
    ];

    var HEADER45 = [
      'Codigo','Atividade / Produto / Serviço','Perigo SST','Risco / Consequência',
      'Condição [N/A/E]','Probabilidade [1-5]','Severidade [1-5]',
      'Grau do Risco (P x S)','Nível do Risco',
      'Controle Existente','Nível Hierarquia','Controle Adicional Necessário',
      'Responsável','Prazo','Área / Setor','Observações / NR Aplicável'
    ];

    var dataRows45 = [HEADER45];
    for (var r = 0; r < 50; r++) {
      var rowNum = r + 2; // linha 2 = primeira linha de dados
      var colA = 'A' + rowNum;
      var colF = 'F' + rowNum;
      var colG = 'G' + rowNum;
      var colH = 'H' + rowNum;
      dataRows45.push([
        { t:'s', v:'' },  // A: Código (usuário digita — ex.: S01, S09)
        { t:'s', v:'' },  // B: Atividade / Produto / Serviço
        // C: Perigo SST — preenchido automaticamente
        { t:'s', f:'IF(UPPER('+colA+')="","",IFERROR(VLOOKUP(UPPER('+colA+'),Catalogo45001!$A:$B,2,0),"Código não encontrado — preencha manualmente"))' },
        // D: Risco/Consequência — preenchido automaticamente
        { t:'s', f:'IF(UPPER('+colA+')="","",IFERROR(VLOOKUP(UPPER('+colA+'),Catalogo45001!$A:$C,3,0),""))' },
        { t:'s', v:'' },  // E: Condição [N/A/E] (dropdown)
        { t:'n', v:null }, // F: Probabilidade [1-5]
        { t:'n', v:null }, // G: Severidade [1-5]
        // H: Grau do Risco = P × S (automático)
        { t:'n', f:'IF(AND(ISNUMBER('+colF+'),ISNUMBER('+colG+')),'+colF+'*'+colG+',"")' },
        // I: Nível do Risco (automático)
        { t:'s', f:'IF('+colH+'="","",IF('+colH+'>=17,"CRÍTICO (17-25)",IF('+colH+'>=10,"ALTO (10-16)",IF('+colH+'>=5,"MÉDIO (5-9)","BAIXO (1-4)"))))' },
        { t:'s', v:'' },  // J: Controle Existente
        { t:'s', v:'' },  // K: Nível Hierarquia (dropdown)
        { t:'s', v:'' },  // L: Controle Adicional Necessário
        { t:'s', v:'' },  // M: Responsável
        { t:'s', v:'' },  // N: Prazo
        { t:'s', v:'' },  // O: Área / Setor
        { t:'s', v:'' },  // P: Observações / NR Aplicável
      ]);
    }

    var ws45 = XL.utils.aoa_to_sheet(dataRows45);
    ws45['!cols'] = [
      {wch:12},{wch:32},{wch:40},{wch:40},{wch:14},
      {wch:16},{wch:14},{wch:16},{wch:14},
      {wch:30},{wch:24},{wch:35},
      {wch:20},{wch:14},{wch:20},{wch:30}
    ];
    ws45['!freeze'] = {xSplit:0, ySplit:1};

    // Dropdowns
    if (!ws45['!dataValidation']) ws45['!dataValidation'] = [];
    ws45['!dataValidation'].push({
      sqref:'E2:E51', type:'list', formula1:'"N,A,E"', showDropDown:false
    });
    ws45['!dataValidation'].push({
      sqref:'K2:K51', type:'list',
      formula1:'"' + HIERARQ.join(',') + '"', showDropDown:false
    });

    XL.utils.book_append_sheet(wb, ws45, 'Perigos e Riscos');

    // Instruções
    var instrRows45 = [
      ['SGI — ISO 45001 | LEVANTAMENTO DE PERIGOS E RISCOS DE SST'],
      ['Organização: ' + org + '   |   Data: ' + dt],
      [''],
      ['COMO USAR:'],
      ['1. Na aba "Perigos e Riscos", preencha a coluna A com o CÓDIGO do catálogo (ex.: S01, S09)'],
      ['   → O Perigo e o Risco serão preenchidos AUTOMATICAMENTE por fórmula PROCV'],
      ['2. Se o perigo não estiver no catálogo, deixe o código em branco e preencha manualmente C e D'],
      ['3. Preencha Probabilidade (F) e Severidade (G) com valores de 1 a 5'],
      ['   → Grau do Risco (H) e Nível do Risco (I) serão calculados AUTOMATICAMENTE'],
      ['4. Preencha Controle Existente, Hierarquia (dropdown), Controle Adicional, Responsável etc.'],
      ['5. Salve e importe de volta no SGI pelo botão IMPORTAR 45001'],
      [''],
      ['HIERARQUIA DE CONTROLES (ISO 45001):'],
      ['1-Eliminação: remover o perigo completamente (mais eficaz)'],
      ['2-Substituição: substituir por algo menos perigoso'],
      ['3-Controles de engenharia: isolamento, enclausuramento, ventilação'],
      ['4-Controles administrativos: procedimentos, treinamento, sinalização'],
      ['5-EPI: proteção individual (último recurso)'],
      [''],
      ['GRAU DO RISCO = Probabilidade x Severidade'],
      ['1-4 = Baixo | 5-9 = Médio | 10-16 = Alto | 17-25 = Crítico'],
    ];
    var wsInstr45 = XL.utils.aoa_to_sheet(instrRows45);
    wsInstr45['!cols'] = [{wch:90}];
    XL.utils.book_append_sheet(wb, wsInstr45, 'Instrucoes');

    XL.writeFile(wb, 'SGI_45001_Perigos_Riscos_' + new Date().toISOString().slice(0,10) + '.xlsx');
  }

  if (!window.XLSX) {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    s.onload = doExport45001;
    document.head.appendChild(s);
  } else { doExport45001(); }
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
// ANÁLISE CRÍTICA — AGENTE DE IA (§9.3 ISO 14001 + ISO 45001)
// ═══════════════════════════════════════════════════════════════════

var AC = {
  briefing: '',
  deliberations: [],
  ataGenerated: false,
  timestamp: ''
};

// ── Inicializa dados disponíveis ─────────────────────────────────
function initACSummary() {
  var nFat  = S.factors.int.length + S.factors.ext.length;
  var nRel  = S.factors.int.concat(S.factors.ext).filter(function(f){return f.rel==='sim';}).length;
  var nPI   = S.pi.filter(function(p){return p.sel;}).length;
  var nAP   = S.apItems.length;
  var nAPHi = S.apItems.filter(function(a){return a.cls==='high'||a.cls==='crit';}).length;
  var nRO   = S.roItems.length;
  var nROHi = S.roItems.filter(function(r){return r.cls==='high'||r.cls==='crit';}).length;
  var allActs=[]; S.roItems.forEach(function(r){(r.actions||[]).forEach(function(a){allActs.push(a);});});
  var nAct  = allActs.length;
  var nOver = allActs.filter(function(a){return a.status==='atrasada';}).length;
  var nDone = allActs.filter(function(a){return a.status==='concluida';}).length;
  var org   = document.getElementById('org-name').value || '(não informado)';

  var el = document.getElementById('ac-data-summary');
  if(!el) return;
  el.innerHTML = [
    {icon:'🏭', label:'Organização', val: org},
    {icon:'📊', label:'Fatores de contexto', val: nFat + ' (' + nRel + ' relevantes)'},
    {icon:'👥', label:'Partes interessadas', val: nPI + ' selecionadas'},
    {icon:'⚠️', label:'Aspectos / Perigos', val: nAP + ' (' + nAPHi + ' alto/crítico)'},
    {icon:'🎯', label:'Riscos & Oportunidades', val: nRO + ' registrados (' + nROHi + ' alto/crítico)'},
    {icon:'📋', label:'Ações planejadas', val: nAct + ' total · ' + nOver + ' atrasadas · ' + nDone + ' concluídas'},
    {icon:'📅', label:'SWOT revisada em', val: S.swotRevDate || '⚠️ Não revisada'},
  ].map(function(r){
    var color = (r.label.includes('atrasadas') && nOver>0) ? 'color:var(--red)' :
                (r.label.includes('SWOT') && !S.swotRevDate) ? 'color:var(--amber)' : '';
    return '<div style="display:flex;justify-content:space-between;border-bottom:1px dashed var(--gray-b);padding:3px 0">'
      +'<span>'+r.icon+' '+r.label+'</span>'
      +'<span style="font-weight:500;'+color+'">'+r.val+'</span>'
      +'</div>';
  }).join('');

  // Pré-preenche datas
  var today = new Date();
  var yearAgo = new Date(today); yearAgo.setFullYear(yearAgo.getFullYear()-1);
  document.getElementById('ac-date-to').value   = today.toISOString().slice(0,10);
  document.getElementById('ac-date-from').value = yearAgo.toISOString().slice(0,10);
}

// ── Monta o prompt completo para o agente ───────────────────────
function buildAgentPrompt() {
  var org     = document.getElementById('org-name').value || 'Organização não informada';
  var sector  = document.getElementById('org-sector').value || 'Setor não informado';
  var scope   = document.getElementById('org-scope').value || 'Escopo não informado';
  var acType  = document.getElementById('ac-type').value;
  var dateFrom= document.getElementById('ac-date-from').value;
  var dateTo  = document.getElementById('ac-date-to').value;

  // Fatores de contexto
  var intFav = S.factors.int.filter(function(f){return f.type==='fav'&&f.rel==='sim';}).map(function(f){return f.desc;});
  var intDes = S.factors.int.filter(function(f){return f.type==='des'&&f.rel==='sim';}).map(function(f){return f.desc;});
  var extFav = S.factors.ext.filter(function(f){return f.type==='fav'&&f.rel==='sim';}).map(function(f){return f.desc;});
  var extDes = S.factors.ext.filter(function(f){return f.type==='des'&&f.rel==='sim';}).map(function(f){return f.desc;});

  // Partes interessadas
  var piSel  = S.pi.filter(function(p){return p.sel;}).map(function(p){
    return p.name + ' (obrig.:'+p.obrig+', inf:'+p.inf+', int:'+p.int+')';
  });

  // Aspectos/Perigos críticos
  var apHigh = S.apItems.filter(function(a){return a.cls==='high'||a.cls==='crit';}).map(function(a){
    return '['+a.type.toUpperCase()+'] '+a.asp+' → '+a.imp+' (Score:'+a.score+'/25)';
  });

  // Riscos altos/críticos
  var roHigh = S.roItems.filter(function(r){return r.cls==='high'||r.cls==='crit';}).map(function(r){
    return '['+r.type+'] '+r.desc+' (Score:'+r.score+', Origem:'+r.origin+')';
  });

  // Todas as ações
  var allActs=[];
  S.roItems.forEach(function(r){
    (r.actions||[]).forEach(function(a){
      allActs.push({desc:a.desc, resp:a.resp, prazo:a.prazo, status:a.status, ro:r.desc});
    });
  });
  var actsOver = allActs.filter(function(a){return a.status==='atrasada';});
  var actsPend = allActs.filter(function(a){return a.status==='pendente';});
  var actsDone = allActs.filter(function(a){return a.status==='concluida';});

  var tipoMap = {trimestral:'Análise parcial trimestral', semestral:'Análise semestral', anual:'Análise crítica anual completa'};

  return `Você é um especialista sênior em Sistemas de Gestão Integrado (SGI), com profundo conhecimento em ISO 14001:2015 e ISO 45001:2018. Sua função é atuar como AGENTE DE ANÁLISE CRÍTICA — preparar um briefing executivo para deliberação da Alta Direção, conforme §9.3 de ambas as normas.

## DADOS DO SGI — ${org}
- Setor/CNAE: ${sector}
- Escopo: ${scope}
- Tipo de análise: ${tipoMap[acType]}
- Período: ${dateFrom} a ${dateTo}
- SWOT revisada em: ${S.swotRevDate || 'NÃO REVISADA — ATENÇÃO'}

## AÇÕES POR ORIGEM (visão consolidada)
${(function(){
  var byOrig={};
  S.roItems.forEach(function(r){(r.actions||[]).forEach(function(a){
    var o=a.origem||'ro'; if(!byOrig[o]) byOrig[o]=[];
    byOrig[o].push(a.desc+' ['+a.status+(a.status==='atrasada'?' ⚠️':'')+']');
  });});
  return Object.keys(byOrig).map(function(o){
    return ORIG_LBL_MAP[o]+': '+byOrig[o].join(' | ');
  }).join('\n') || 'Nenhuma ação registrada';
})()}

## 9.1 INDICADORES DE DESEMPENHO (KPIs)
Total: ${S.kpis.length} | Na meta: ${S.kpis.filter(function(k){return calcSemaphore(k).sem==='grn';}).length} | Atencao: ${S.kpis.filter(function(k){return calcSemaphore(k).sem==='amb';}).length} | Fora da meta: ${S.kpis.filter(function(k){return calcSemaphore(k).sem==='red';}).length}
${S.kpis.filter(function(k){return calcSemaphore(k).sem==='red'||calcSemaphore(k).sem==='amb';}).map(function(k){
  var s=calcSemaphore(k);
  var lastKey=null;
  for(var m=11;m>=0;m--){var k2=periodKey(new Date().getFullYear(),m);if(k.data&&k.data[k2]!==undefined){lastKey=k2;break;}}
  var causa = lastKey&&k.dataCausa&&k.dataCausa[lastKey] ? ' | Causa: '+k.dataCausa[lastKey] : ' | Sem justificativa registrada';
  var acao  = lastKey&&k.dataAcao&&k.dataAcao[lastKey]  ? ' | Acao: '+k.dataAcao[lastKey]   : '';
  return '['+( s.sem==='red'?'FORA DA META':'ATENCAO')+'] '+k.name+': '+s.val+' '+k.unit+' (meta: '+k.target+')'+causa+acao;
}).join('\n')}

## 7 APOIO — COMPETENCIAS E DOCUMENTOS
Colaboradores cadastrados: ${S.apoio.colaboradores.length}
Treinamentos: ${S.apoio.treinamentos.length} total, ${S.apoio.treinamentos.filter(function(t){return t.status==='atrasado';}).length} atrasados, ${S.apoio.treinamentos.filter(function(t){return t.status==='realizado';}).length} realizados
Documentos: ${S.apoio.documentos.length} total, ${S.apoio.documentos.filter(function(d){return d.status==='revisao';}).length} em revisao, ${S.apoio.documentos.filter(function(d){return d.status==='obsoleto';}).length} obsoletos

## 6.2 OBJETIVOS E METAS
${(S.objectives && S.objectives.length ? S.objectives.map(function(o){
  var st=calcObjStatus(o);
  return o.desc+' | Meta: '+(o.target||'—')+' | Status: '+st.status+' ('+st.pct+'%) | Prazo: '+(o.deadline||'—');
}).join('\n') : 'Nenhum objetivo cadastrado')}

## 4.1 CONTEXTO — SWOT (apenas fatores relevantes)
FORÇAS: ${intFav.length ? intFav.join(' | ') : 'Nenhuma registrada'}
FRAQUEZAS: ${intDes.length ? intDes.join(' | ') : 'Nenhuma registrada'}
OPORTUNIDADES: ${extFav.length ? extFav.join(' | ') : 'Nenhuma registrada'}
AMEAÇAS: ${extDes.length ? extDes.join(' | ') : 'Nenhuma registrada'}

## 4.2 PARTES INTERESSADAS SELECIONADAS (${piSel.length})
${piSel.join('\n')}

## 6.1.2 ASPECTOS/PERIGOS COM SCORE ALTO OU CRÍTICO (${apHigh.length})
${apHigh.length ? apHigh.join('\n') : 'Nenhum item crítico/alto identificado'}

## 6.1.1 RISCOS E OPORTUNIDADES ALTOS/CRÍTICOS (${roHigh.length})
${roHigh.length ? roHigh.join('\n') : 'Nenhum item crítico/alto identificado'}

## GESTÃO DE AÇÕES
- Total de ações: ${allActs.length}
- ATRASADAS (${actsOver.length}): ${actsOver.map(function(a){return a.desc+' [Resp:'+a.resp+', Prazo:'+a.prazo+']';}).join(' | ') || 'Nenhuma'}
- Pendentes: ${actsPend.length}
- Concluídas: ${actsDone.length}

## SUA TAREFA
Produza um BRIEFING EXECUTIVO estruturado em linguagem de negócio (não de norma) para a Alta Direção. Use este formato EXATO com estes marcadores HTML:

<h3>🚨 Pontos Críticos que Exigem Decisão Imediata</h3>
[Liste apenas o que é urgente, em ordem de criticidade. Se não houver, diga explicitamente.]

<h3>📊 Situação Geral do SGI</h3>
[Avaliação executiva: o SGI está saudável, em risco, ou em colapso? Por quê? Seja direto.]

<h3>⚠️ Principais Riscos e Vulnerabilidades</h3>
[Top 5 riscos mais relevantes com impacto em linguagem de negócio — multas, acidentes, perda de clientes, passivo]

<h3>🎯 Oportunidades Identificadas</h3>
[O que a organização pode aproveitar para ganho competitivo, conformidade ou redução de custos]

<h3>📋 Status das Ações em Andamento</h3>
[Avaliação da execução: ações atrasadas são críticas — aponte quem está em atraso e o impacto]

<h3>💡 Recomendações do Agente para a Alta Direção</h3>
[3 a 5 recomendações estratégicas priorizadas, com justificativa normativa quando relevante]

<h3>❓ Pontos que Requerem Deliberação da Alta Direção</h3>
[Liste em formato JSON dentro de uma tag <script type="application/json" id="deliberation-points">:
[
  {
    "id": 1,
    "prioridade": "critica|alta|media",
    "pergunta": "Pergunta direta para a Alta Direção deliberar",
    "contexto": "Por que isso importa e qual o impacto da decisão",
    "opcoes": [
      {"label": "Texto da opção", "color": "green|red|amber|blue", "acao": "O que essa escolha implica em ação"}
    ]
  }
]
<\/script>]

Seja DIRETO, OBJETIVO e use linguagem executiva. Não use jargão de norma sem explicar o impacto em negócio. Priorize o que é mais crítico. Máximo 5 pontos de deliberação.`;
}

// ── Executa a análise via API Anthropic ─────────────────────────
async function runAIAnalysis() {
  initACSummary();
  var org = document.getElementById('org-name').value;
  if (!org) { alert('Informe o nome da organização na aba 4.1 antes de iniciar a análise.'); return; }

  // Mostra a área de briefing
  document.getElementById('ac-briefing-wrap').style.display = 'block';
  document.getElementById('ac-briefing-body').innerHTML =
    '<div style="text-align:center;padding:40px;color:var(--text2)">'
    +'<div style="font-size:40px;margin-bottom:12px">🧠</div>'
    +'<div class="typing-cursor" style="font-size:14px;font-weight:500">Agente analisando todos os módulos do SGI</div>'
    +'<div style="font-size:12px;margin-top:8px;opacity:.7">Contexto · Partes Interessadas · Aspectos · Perigos · Riscos · Ações</div>'
    +'</div>';
  document.getElementById('ac-briefing-status').textContent = '⏳ Analisando...';
  document.getElementById('ac-briefing-status').style.background = 'var(--amber-l)';
  document.getElementById('ac-briefing-status').style.color = 'var(--amber-d)';
  document.getElementById('ac-delib-card').style.display = 'none';

  AC.timestamp = new Date().toLocaleString('pt-BR');
  document.getElementById('ac-briefing-timestamp').textContent = 'Análise gerada em ' + AC.timestamp;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        messages: [{ role: 'user', content: buildAgentPrompt() }]
      })
    });

    const data = await response.json();
    var text = data.content && data.content[0] ? data.content[0].text : '';

    AC.briefing = text;

    // Extrai os pontos de deliberação do JSON embutido
    var deliberations = [];
    var jsonMatch = text.match(/<script type="application\/json" id="deliberation-points">([\s\S]*?)<\/script>/);
    if (jsonMatch) {
      try { deliberations = JSON.parse(jsonMatch[1].trim()); } catch(e) { deliberations = []; }
      text = text.replace(/<script[\s\S]*?<\/script>/, '');
    }
    AC.deliberations = deliberations;

    // Renderiza o briefing
    document.getElementById('ac-briefing-body').innerHTML = text;
    document.getElementById('ac-briefing-status').textContent = '✅ Análise concluída';
    document.getElementById('ac-briefing-status').style.background = '#e8f5ef';
    document.getElementById('ac-briefing-status').style.color = 'var(--green-d)';

    // Renderiza pontos de deliberação
    renderDeliberations(deliberations);
    document.getElementById('ac-delib-card').style.display = 'block';

    // Scroll suave
    setTimeout(function(){
      document.getElementById('ac-briefing-wrap').scrollIntoView({behavior:'smooth'});
    }, 300);

  } catch(err) {
    document.getElementById('ac-briefing-body').innerHTML =
      '<div style="padding:20px;color:var(--red)">❌ Erro ao conectar com o agente: ' + err.message
      + '<br><br><small>Verifique sua conexão e tente novamente.</small></div>';
    document.getElementById('ac-briefing-status').textContent = '❌ Erro';
    document.getElementById('ac-briefing-status').style.background = 'var(--red-l)';
    document.getElementById('ac-briefing-status').style.color = 'var(--red)';
  }
}

function rerunAnalysis() {
  AC.deliberations = [];
  AC.ataGenerated = false;
  document.getElementById('ac-ata-card').style.display = 'none';
  runAIAnalysis();
}

// ── Renderiza pontos de deliberação ─────────────────────────────
function renderDeliberations(items) {
  var el = document.getElementById('ac-delib-list');
  if (!items || !items.length) {
    el.innerHTML = '<div class="empty">Nenhum ponto de deliberação identificado pelo agente. O SGI aparenta estar em ordem.</div>';
    return;
  }
  var priCls = {critica:'var(--red)', alta:'var(--amber)', media:'var(--blue)'};
  var priLbl = {critica:'🔴 Crítica', alta:'🟡 Alta', media:'🔵 Média'};

  el.innerHTML = items.map(function(item, idx) {
    return '<div class="delib-item" id="delib-'+idx+'">'
      +'<div style="display:flex;align-items:flex-start;gap:12px">'
      +'<div class="delib-num">'+item.id+'</div>'
      +'<div style="flex:1">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
      +'<span style="font-size:11px;padding:2px 9px;border-radius:20px;background:'+priCls[item.prioridade]+'22;color:'+priCls[item.prioridade]+';font-weight:600;border:1px solid '+priCls[item.prioridade]+'44">'+priLbl[item.prioridade]+'</span>'
      +'</div>'
      +'<div class="delib-question">'+item.pergunta+'</div>'
      +'<div class="delib-context">'+item.contexto+'</div>'
      +'<div class="delib-options">'
      +item.opcoes.map(function(op, oi){
        return '<button class="delib-opt" id="opt-'+idx+'-'+oi+'" onclick="selectDelib('+idx+','+oi+',\''+op.color+'\')">'
          +op.label+'</button>';
      }).join('')
      +'</div>'
      +'<textarea class="delib-notes" id="delib-notes-'+idx+'" placeholder="Observações da Alta Direção sobre este ponto (opcional)..."></textarea>'
      +'</div></div>'
      +'</div>';
  }).join('');
}

function selectDelib(idx, optIdx, color) {
  // Desmarca todos os botões deste item
  var item = AC.deliberations[idx];
  item.opcoes.forEach(function(op, oi){
    var btn = document.getElementById('opt-'+idx+'-'+oi);
    if(btn){ btn.className='delib-opt'; }
  });
  // Marca o selecionado
  var sel = document.getElementById('opt-'+idx+'-'+optIdx);
  if(sel){ sel.className='delib-opt selected-'+color; }
  // Salva a decisão
  AC.deliberations[idx]._decisao = item.opcoes[optIdx].label;
  AC.deliberations[idx]._acao    = item.opcoes[optIdx].acao;
  AC.deliberations[idx]._color   = color;
  // Marca o card
  var card = document.getElementById('delib-'+idx);
  if(card){
    card.classList.add('answered');
    if(color==='red') card.classList.add('risk');
    else card.classList.remove('risk');
  }
}

// ── Gera a ata ──────────────────────────────────────────────────
async function generateAta() {
  var director = document.getElementById('ac-director').value || '(não informado)';
  var parts    = document.getElementById('ac-participants').value || '(não informado)';
  var dateFrom = document.getElementById('ac-date-from').value;
  var dateTo   = document.getElementById('ac-date-to').value;
  var obs      = document.getElementById('ac-obs').value;
  var org      = document.getElementById('org-name').value || 'Organização';
  var sector   = document.getElementById('org-sector').value || '';
  var now      = new Date().toLocaleString('pt-BR');
  var acType   = document.getElementById('ac-type').value;
  var tipoMap  = {trimestral:'Análise parcial trimestral', semestral:'Análise semestral', anual:'Análise crítica anual completa'};

  // Deliberações respondidas
  var deliberStr = AC.deliberations.map(function(d,i){
    return '<div style="margin-bottom:12px;padding:10px 12px;border-left:3px solid '+(d._color?'var(--'+d._color+')':'var(--gray-b)')+';background:var(--gray-l);border-radius:0 6px 6px 0">'
      +'<strong>'+d.pergunta+'</strong><br>'
      +(d._decisao?'<span style="color:var(--green-d)">✅ Decisão: '+d._decisao+'</span><br>':'<span style="color:var(--amber)">⚠️ Não deliberado</span><br>')
      +(d._acao?'<small>Ação implicada: '+d._acao+'</small><br>':'')
      +(document.getElementById('delib-notes-'+i)&&document.getElementById('delib-notes-'+i).value?'<small><em>Obs.: '+document.getElementById('delib-notes-'+i).value+'</em></small>':'')
      +'</div>';
  }).join('');

  // Ações atrasadas
  var actsOver=[];
  S.roItems.forEach(function(r){
    (r.actions||[]).filter(function(a){return a.status==='atrasada';}).forEach(function(a){
      actsOver.push({desc:a.desc,resp:a.resp,prazo:a.prazo,ro:r.desc});
    });
  });

  var ataHTML =
    '<h2>ATA DE ANÁLISE CRÍTICA PELA DIREÇÃO</h2>'
    +'<div class="ata-meta">'
    +org+(sector?' · '+sector:'')+'<br>'
    +'ISO 14001:2015 + ISO 45001:2018 · Cláusula 9.3<br>'
    +'<strong>'+tipoMap[acType]+'</strong> · Período: '+dateFrom+' a '+dateTo+'<br>'
    +'Gerado em: '+now
    +'</div>'

    +'<h3>1. Identificação</h3>'
    +'<p><strong>Responsável / Presidência:</strong> '+director+'<br>'
    +'<strong>Participantes:</strong> '+parts+'</p>'

    +'<h3>2. Entradas da Análise Crítica (§9.3.2)</h3>'
    +'<p>Todos os dados analisados foram extraídos automaticamente do Sistema de Gestão Integrado — Hub SGI:</p>'
    +'<ul>'
    +'<li>Contexto da organização (cláusula 4.1): '+(S.factors.int.length+S.factors.ext.length)+' fatores identificados, '+(S.factors.int.concat(S.factors.ext).filter(function(f){return f.rel==='sim';}).length)+' relevantes ao SGI</li>'
    +'<li>Partes interessadas (cláusula 4.2): '+S.pi.filter(function(p){return p.sel;}).length+' partes selecionadas com necessidades e expectativas mapeadas</li>'
    +'<li>Aspectos ambientais e perigos de SST (cláusula 6.1.2): '+S.apItems.length+' itens, '+S.apItems.filter(function(a){return a.cls==='high'||a.cls==='crit';}).length+' com score alto/crítico</li>'
    +'<li>Riscos e oportunidades (cláusula 6.1.1): '+S.roItems.length+' itens registrados</li>'
    +'<li>Ações planejadas: '+S.roItems.reduce(function(acc,r){return acc+(r.actions||[]).length;},0)+' ações, '+actsOver.length+' com atraso</li>'
    +'</ul>'

    +'<h3>3. Análise e Síntese do Agente SGI</h3>'
    +'<div style="background:var(--purple-l);border-left:3px solid var(--purple);padding:12px 16px;border-radius:0 6px 6px 0;font-size:12px">'
    +'<em>Análise gerada automaticamente pelo Agente SGI em '+AC.timestamp+'</em></div>'
    +'<div style="margin-top:10px;font-size:12px;line-height:1.8">'+AC.briefing.replace(/<script[\s\S]*?<\/script>/g,'')+'</div>'

    +(actsOver.length?
      '<h3>4. Ações com Atraso — Requer Atenção Imediata</h3>'
      +'<div style="background:var(--red-l);border-left:3px solid var(--red);padding:10px 14px;border-radius:0 6px 6px 0">'
      +actsOver.map(function(a){return '<div>⚠️ <strong>'+a.desc+'</strong> · Resp.: '+a.resp+' · Prazo: '+a.prazo+'<br><small>Vinculado a: '+a.ro+'</small></div>';}).join('<br>')
      +'</div>'
    :'')

    +'<h3>'+(actsOver.length?'5':'4')+'. Deliberações da Alta Direção</h3>'
    +(deliberStr || '<p>Nenhum ponto de deliberação formal registrado nesta análise.</p>')

    +(obs?'<h3>'+(actsOver.length?'6':'5')+'. Observações e Encaminhamentos Adicionais</h3><p>'+obs+'</p>':'')

    +'<h3>'+(actsOver.length?'7':'6')+'. Assinaturas</h3>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:20px">'
    +'<div style="text-align:center"><div style="border-top:1px solid var(--text);padding-top:8px;font-size:12px">'+director+'<br><small>Alta Direção</small></div></div>'
    +'<div style="text-align:center"><div style="border-top:1px solid var(--text);padding-top:8px;font-size:12px">Representante do SGI<br><small>Gestor do Sistema</small></div></div>'
    +'</div>'
    +'<div style="margin-top:20px;font-size:10px;color:var(--text2);text-align:center;border-top:1px solid var(--gray-b);padding-top:10px">'
    +'Documento gerado automaticamente pelo Hub SGI · '+now+' · Cláusula 9.3 ISO 14001:2015 e ISO 45001:2018'
    +'</div>';

  document.getElementById('ac-ata-content').innerHTML = ataHTML;
  document.getElementById('ac-ata-card').style.display = 'block';
  AC.ataGenerated = true;
  setTimeout(function(){ document.getElementById('ac-ata-card').scrollIntoView({behavior:'smooth'}); }, 200);
}

function printAta() { window.print(); }

function exportAta() {
  var org  = document.getElementById('org-name').value || 'SGI';
  var text = document.getElementById('ac-ata-content').innerText || '';
  var blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='Ata_Analise_Critica_'+org.replace(/\s+/g,'_')+'_'+new Date().toISOString().slice(0,10)+'.txt';
  a.click();
}



// ═══════════════════════════════════════════════════════════════════
// NOVA MATRIZ DE SIGNIFICÂNCIA: F × P × S × A (1–625)
// Frequência × Probabilidade × Severidade × Abrangência
// ═══════════════════════════════════════════════════════════════════

// Limite de significância padrão (configurável pela organização)
var SIG_LIMITE = 50;

// Definições das escalas
var ESCALA_FREQ = [
  {v:1, label:'1 — Rara',          desc:'Menos de 1x/ano'},
  {v:2, label:'2 — Ocasional',     desc:'1 a 12 vezes/ano'},
  {v:3, label:'3 — Frequente',     desc:'Mensal'},
  {v:4, label:'4 — Muito freq.',   desc:'Semanal'},
  {v:5, label:'5 — Contínua',      desc:'Diária ou permanente'},
];

var ESCALA_PROB = [
  {v:1, label:'1 — Muito improvável', desc:'Nunca ocorreu nesta instalação'},
  {v:2, label:'2 — Improvável',       desc:'Já ocorreu no setor'},
  {v:3, label:'3 — Possível',         desc:'Já ocorreu nesta instalação'},
  {v:4, label:'4 — Provável',         desc:'Ocorre algumas vezes/ano'},
  {v:5, label:'5 — Muito provável',   desc:'Ocorre regularmente'},
];

var ESCALA_SEV = [
  {v:1, label:'1 — Insignificante', desc:'Impacto imperceptível ou reversível imediato'},
  {v:2, label:'2 — Menor',         desc:'Impacto local reversível em curto prazo'},
  {v:3, label:'3 — Moderada',      desc:'Impacto reversível em médio prazo'},
  {v:4, label:'4 — Maior',         desc:'Impacto reversível em longo prazo'},
  {v:5, label:'5 — Catastrófica',  desc:'Impacto irreversível ou permanente'},
];

var ESCALA_ABRANG = [
  {v:1, label:'1 — Local',         desc:'Dentro dos limites da instalação'},
  {v:2, label:'2 — Vizinhança',    desc:'Imóveis e vias lindeiras'},
  {v:3, label:'3 — Comunidade',    desc:'Bairro ou comunidade próxima'},
  {v:4, label:'4 — Município',     desc:'Abrange o município'},
  {v:5, label:'5 — Regional',      desc:'Bacia hidrográfica, região ou transfronteiriço'},
];

// Calcula nível e cor baseado no score F×P×S×A (max 625)
function scoreInfoFPSA(score) {
  if (!score) return {color:'var(--gray)', nivel:'Aguardando', cls:'low'};
  if (score >= 250) return {color:'#A32D2D', nivel:'CRÍTICO',  cls:'crit'};
  if (score >= 100) return {color:'#E85D24', nivel:'ALTO',     cls:'high'};
  if (score >= 25)  return {color:'#BA7517', nivel:'MÉDIO',    cls:'med'};
  return               {color:'#1D9E75', nivel:'BAIXO',    cls:'low'};
}

// ── Atualiza modal de Aspectos/Perigos no S2 ─────────────────────
// Adiciona os 4 campos à lógica de cálculo do modal
function calcAPScore() {
  var f = parseInt((document.getElementById('ap-freq')||{}).value)   || 0;
  var p = parseInt((document.getElementById('ap-prob')||{}).value)   || 0;
  var s = parseInt((document.getElementById('ap-sev')||{}).value)    || 0;
  var a = parseInt((document.getElementById('ap-abrang')||{}).value) || 0;
  var score = f && p && s && a ? f*p*s*a : 0;
  var info  = scoreInfoFPSA(score);

  var scoreEl = document.getElementById('ap-score-display');
  var sigEl   = document.getElementById('ap-sig-display');

  if (scoreEl) {
    scoreEl.innerHTML = '<div style="font-size:28px;font-weight:800;color:'+info.color+'">'+
      (score||'—')+'</div><div style="font-size:11px;color:'+info.color+';font-weight:600">'+
      info.nivel+' (máx. 625)</div>';
    scoreEl.style.background = score ? info.color+'12' : 'var(--gray-l)';
    scoreEl.style.borderColor = score ? info.color : 'var(--gray-b)';
  }
  if (sigEl && score) {
    var isSig = score >= SIG_LIMITE;
    sigEl.innerHTML = '<span class="sig '+(isSig?'cs-s':'cs-n')+'">'+
      (isSig ? '⚠️ SIGNIFICATIVO (score ≥ '+SIG_LIMITE+')' : '✅ Não significativo (score < '+SIG_LIMITE+')')+
      '</span>';
  } else if (sigEl) {
    sigEl.innerHTML = '';
  }
  return {f:f, p:p, s:s, a:a, score:score, cls:info.cls, isSig: score >= SIG_LIMITE};
}

// Salva o score na estrutura do item
function getAPScoreData() {
  var r = calcAPScore();
  return {
    freq:   r.f, prob: r.p, sev: r.s, abrang: r.a,
    score:  r.score, cls: r.cls,
    sig:    r.score >= SIG_LIMITE ? 'S' : 'N',
    sigCrit: r.score >= SIG_LIMITE ? 'Score '+r.score+' ≥ '+SIG_LIMITE+' (significativo)' : 'Score '+r.score+' < '+SIG_LIMITE+' (não significativo)',
    nivel:  scoreInfoFPSA(r.score).nivel
  };
}



// ═══════════════════════════════════════════════════════════════════
// MUDANÇAS CLIMÁTICAS — 4.1 ISO 14001 + ISO 45001 (Anexo SL/HLS)
// ═══════════════════════════════════════════════════════════════════

// Estado do módulo de clima
if (!S.clima) S.clima = {
  riscos:     [],   // riscos físicos (clima → organização)
  esc1:       '',   // emissões Escopo 1
  esc2:       '',   // emissões Escopo 2
  esc3:       '',   // emissões Escopo 3
  mitig:      '',   // mitigações em andamento
  afeta:      '',   // afeta objetivos do SGI?
  norma:      'both',
  conclusao:  '',
  resp:       '',
  data:       '',
  revisao:    '',
  analisado:  false
};

// Riscos climáticos pré-definidos como sugestões
var CLIMA_RISCOS_SUGEST = [
  { tipo:'Físico agudo',   desc:'Eventos extremos de chuva / enchentes',         impacto:'Interrupção das operações, danos à infraestrutura, risco de afogamento',    norma:'both' },
  { tipo:'Físico agudo',   desc:'Estiagem prolongada / seca',                    impacto:'Restrição de água para processo produtivo e consumo humano',                norma:'both' },
  { tipo:'Físico agudo',   desc:'Ondas de calor extremo',                        impacto:'Risco de doenças ocupacionais por calor (NR-15), queda de produtividade',   norma:'sst'  },
  { tipo:'Físico agudo',   desc:'Tempestades / ventos fortes / raios',           impacto:'Danos à estrutura, interrupção de energia, risco a trabalhadores externos', norma:'both' },
  { tipo:'Físico crônico', desc:'Aumento de temperatura média regional',         impacto:'Maior consumo de energia para climatização, stress térmico ocupacional',   norma:'both' },
  { tipo:'Físico crônico', desc:'Alteração no regime hídrico (chuvas irregulares)', impacto:'Impacto na disponibilidade de água e na geração de efluentes',          norma:'env'  },
  { tipo:'Físico crônico', desc:'Aumento de incêndios em áreas naturais',        impacto:'Qualidade do ar, risco de propagação, plano de emergência ambiental',      norma:'both' },
  { tipo:'Transição',      desc:'Novas regulamentações de emissão de GEE',       impacto:'Obrigações de conformidade, custos de adequação, oportunidade de crédito', norma:'env'  },
  { tipo:'Transição',      desc:'Exigência de relatório de carbono por clientes','impacto':'Obrigação contratual de inventário de GEE, pressão ESG',                 norma:'env'  },
  { tipo:'Oportunidade',   desc:'Eficiência energética e energias renováveis',   impacto:'Redução de custos, melhoria da imagem, objetivo ambiental',                norma:'env'  },
];

var climaTabAtual = 1;

function switchClimaTab(n) {
  climaTabAtual = n;
  [1,2,3].forEach(function(i) {
    var tab = document.getElementById('clima-tab-'+i);
    var cont = document.getElementById('clima-tab-content-'+i);
    if (!tab || !cont) return;
    var isActive = i === n;
    tab.style.borderBottomColor = isActive ? '#1a6b9e' : 'transparent';
    tab.style.color = isActive ? '#1a6b9e' : 'var(--text2)';
    cont.style.display = isActive ? 'block' : 'none';
  });
}

function addClimaRisco(sugest) {
  var risco = sugest || {
    tipo:'Físico agudo', desc:'', impacto:'', norma:'both',
    relevancia:'media', acao:''
  };
  var id = 'cr-' + Date.now();
  var tipoOpts = ['Físico agudo','Físico crônico','Transição','Oportunidade'].map(function(t){
    return '<option value="'+t+'"'+(risco.tipo===t?' selected':'')+'>'+t+'</option>';
  }).join('');
  var normaOpts = [['both','🌿+⛑️ Ambas'],['env','🌿 14001'],['sst','⛑️ 45001']].map(function(n){
    return '<option value="'+n[0]+'"'+(risco.norma===n[0]?' selected':'')+'>'+n[1]+'</option>';
  }).join('');
  var relOpts = [['alta','🔴 Alta'],['media','🟡 Média'],['baixa','🟢 Baixa']].map(function(r){
    return '<option value="'+r[0]+'"'+(( risco.relevancia||'media')===r[0]?' selected':'')+'>'+r[1]+'</option>';
  }).join('');

  var html = '<div id="'+id+'" style="background:var(--gray-l);border:1px solid var(--gray-b);border-radius:8px;padding:12px;display:grid;grid-template-columns:130px 1fr 1fr 100px 36px;gap:8px;align-items:start">'
    + '<div><label style="font-size:10px">Tipo</label><select style="font-size:11px" onchange="saveClimaData()">'+tipoOpts+'</select></div>'
    + '<div><label style="font-size:10px">Risco / Oportunidade climática</label><input type="text" value="'+esc(risco.desc)+'" placeholder="Ex.: Ondas de calor extremo" style="font-size:12px" oninput="saveClimaData()"></div>'
    + '<div><label style="font-size:10px">Impacto nos objetivos do SGI</label><input type="text" value="'+esc(risco.impacto)+'" placeholder="Ex.: Stress térmico, risco NR-15" style="font-size:12px" oninput="saveClimaData()"></div>'
    + '<div><label style="font-size:10px">Relevância</label><select style="font-size:11px" onchange="saveClimaData()">'+relOpts+'</select>'
    + '<label style="font-size:10px;margin-top:4px">Norma</label><select style="font-size:11px" onchange="saveClimaData()">'+normaOpts+'</select></div>'
    + '<div style="padding-top:20px"><button onclick="removeClimaRisco(\''+id+'\')" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--text3)">×</button></div>'
    + '</div>';

  var list = document.getElementById('clima-riscos-list');
  if (list) list.insertAdjacentHTML('beforeend', html);
  updateClimaStatus();
}

function removeClimaRisco(id) {
  var el = document.getElementById(id);
  if (el) { el.remove(); updateClimaStatus(); }
}

function saveClimaData() {
  updateClimaStatus();
}

function updateClimaStatus() {
  var conclusao = (document.getElementById('clima-conclusao')||{}).value || '';
  var afeta     = (document.getElementById('clima-afeta')||{}).value || '';
  var resp      = (document.getElementById('clima-resp')||{}).value || '';
  var data      = (document.getElementById('clima-data')||{}).value || '';
  var riscos    = document.querySelectorAll('#clima-riscos-list > div') || [];
  var esc1      = (document.getElementById('clima-esc1')||{}).value || '';

  var analisado = conclusao.length > 20 && afeta && resp && data;
  var badge     = document.getElementById('clima-status-badge');

  if (badge) {
    if (analisado) {
      badge.style.background = 'var(--green-l)';
      badge.style.color = 'var(--green-d)';
      badge.textContent = '✅ Análise registrada';
    } else if (conclusao.length > 0 || riscos.length > 0 || esc1.length > 0) {
      badge.style.background = 'var(--amber-l)';
      badge.style.color = 'var(--amber-d)';
      badge.textContent = '🔶 Em preenchimento';
    } else {
      badge.style.background = 'var(--red-l)';
      badge.style.color = 'var(--red)';
      badge.textContent = '⚠️ Não analisado';
    }
  }

  // Salva no estado S
  if (!S.clima) S.clima = {};
  S.clima.conclusao = conclusao;
  S.clima.afeta     = afeta;
  S.clima.resp      = resp;
  S.clima.data      = data;
  S.clima.revisao   = (document.getElementById('clima-revisao')||{}).value || '';
  S.clima.esc1      = esc1;
  S.clima.esc2      = (document.getElementById('clima-esc2')||{}).value || '';
  S.clima.esc3      = (document.getElementById('clima-esc3')||{}).value || '';
  S.clima.mitig     = (document.getElementById('clima-mitig')||{}).value || '';
  S.clima.norma     = (document.getElementById('clima-norma')||{}).value || 'both';
  S.clima.analisado = analisado;

  // Atualiza resumo de evidência
  var resumo = document.getElementById('clima-evidencia-resumo');
  if (resumo && analisado) {
    resumo.style.display = 'block';
    var afetaLabel = {
      'sim-relevante':'Sim — afeta de forma relevante',
      'sim-baixo':'Sim — afeta de forma baixa (monitorar)',
      'nao':'Não afeta os objetivos do SGI'
    }[afeta] || afeta;
    resumo.innerHTML = '<div style="font-weight:700;color:#1a6b9e;margin-bottom:8px">📋 Evidência de Análise — Pronta para auditoria</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:11px">'
      + '<div><strong>Responsável:</strong> '+esc(resp)+'</div>'
      + '<div><strong>Data:</strong> '+(data ? new Date(data+'T12:00:00').toLocaleDateString('pt-BR') : '—')+'</div>'
      + '<div><strong>Próx. revisão:</strong> '+(S.clima.revisao ? new Date(S.clima.revisao+'T12:00:00').toLocaleDateString('pt-BR') : '—')+'</div>'
      + '</div>'
      + '<div style="margin-top:8px;font-size:11px"><strong>Conclusão:</strong> '+esc(conclusao.substring(0,200))+(conclusao.length>200?'...':'')+'</div>'
      + '<div style="margin-top:6px;font-size:11px"><strong>Afeta objetivos SGI:</strong> '+afetaLabel+'</div>'
      + '<div style="margin-top:6px;font-size:11px"><strong>Riscos climáticos identificados:</strong> '+(riscos.length)+' item(ns)</div>';
  } else if (resumo) {
    resumo.style.display = 'none';
  }
}

// Gera Riscos & Oportunidades a partir da análise climática
function gerarROClima() {
  if (!S.clima || !S.clima.conclusao) {
    alert('Preencha a conclusão da análise climática antes de gerar R&O.');
    switchClimaTab(3);
    return;
  }
  var added = 0;
  if (!S.ros) S.ros = [];

  // Gera a partir dos riscos identificados
  var riscoEls = document.querySelectorAll('#clima-riscos-list > div');
  riscoEls.forEach(function(el) {
    var inputs = el.querySelectorAll('input,select');
    if (inputs.length < 3) return;
    var tipo   = inputs[0].value;
    var desc   = inputs[1].value;
    var impact = inputs[2].value;
    var relEl  = inputs[3];
    var rel    = relEl ? relEl.value : 'media';
    if (!desc) return;

    S.ros.push({
      id:        'clima-ro-'+Date.now()+'-'+added,
      orig:      'clima',
      origLabel: '🌡️ Mudanças Climáticas (4.1)',
      type:      tipo === 'Oportunidade' ? 'opp' : 'risk',
      desc:      desc,
      impact:    impact || 'Ver análise climática',
      priority:  rel === 'alta' ? 'high' : rel === 'baixa' ? 'low' : 'med',
      autoGen:   true,
      condAmb:   ['Alterações climáticas']
    });
    added++;
  });

  // Gera um R&O geral a partir da conclusão
  if (S.clima.afeta && S.clima.afeta !== 'nao') {
    S.ros.push({
      id:        'clima-geral-'+Date.now(),
      orig:      'clima',
      origLabel: '🌡️ Mudanças Climáticas (4.1)',
      type:      'risk',
      desc:      'Mudanças climáticas identificadas como fator de contexto relevante para o SGI',
      impact:    S.clima.conclusao.substring(0,150),
      priority:  S.clima.afeta === 'sim-relevante' ? 'high' : 'med',
      autoGen:   true,
      condAmb:   ['Alterações climáticas']
    });
    added++;
  }

  if (added > 0) {
    if (typeof renderRO === 'function') renderRO();
    alert('✅ '+added+' Risco(s) & Oportunidade(s) gerado(s) a partir da análise climática!\n\nAcesse a cláusula 6.1.1 para visualizar.');
  } else {
    alert('Adicione ao menos um risco climático na Aba 1 antes de gerar R&O.');
    switchClimaTab(1);
  }
}

// Imprime evidência para auditoria
function printClimaEvidencia() {
  if (!S.clima || !S.clima.conclusao) {
    alert('Preencha a análise climática antes de imprimir a evidência.');
    switchClimaTab(3);
    return;
  }
  var org  = document.getElementById('org-name') ? document.getElementById('org-name').value : '—';
  var data = S.clima.data ? new Date(S.clima.data+'T12:00:00').toLocaleDateString('pt-BR') : '—';
  var afetaLabel = {
    'sim-relevante':'Sim — afeta de forma relevante os objetivos do SGI',
    'sim-baixo':'Sim — afeta de forma baixa (monitorar no próximo ciclo)',
    'nao':'Não — a análise concluiu que mudanças climáticas não afetam materialmente os objetivos do SGI neste ciclo'
  }[S.clima.afeta] || '—';

  var riscoEls = document.querySelectorAll('#clima-riscos-list > div');
  var riscosHtml = '';
  riscoEls.forEach(function(el, i) {
    var inputs = el.querySelectorAll('input,select');
    if (inputs.length < 3) return;
    riscosHtml += '<tr>'
      + '<td style="padding:5px 8px;border:1px solid #ccc">'+(i+1)+'</td>'
      + '<td style="padding:5px 8px;border:1px solid #ccc">'+esc(inputs[0].value)+'</td>'
      + '<td style="padding:5px 8px;border:1px solid #ccc">'+esc(inputs[1].value)+'</td>'
      + '<td style="padding:5px 8px;border:1px solid #ccc">'+esc(inputs[2].value)+'</td>'
      + '<td style="padding:5px 8px;border:1px solid #ccc;text-align:center">'+esc((inputs[3]||{}).value||'—')+'</td>'
      + '</tr>';
  });

  var win = window.open('','_blank');
  win.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<title>Evidência Mudanças Climáticas — '+esc(org)+'</title>'
    + '<style>body{font-family:Arial,sans-serif;font-size:12px;padding:30px;color:#111}'
    + 'h1{font-size:16px;margin-bottom:4px}h2{font-size:13px;color:#1a6b9e;margin:16px 0 8px}'
    + 'table{width:100%;border-collapse:collapse;margin:8px 0}'
    + 'th{background:#e8f4ff;padding:6px 8px;border:1px solid #ccc;text-align:left;font-size:11px}'
    + 'td{padding:6px 8px;border:1px solid #ccc;vertical-align:top}'
    + '.box{background:#f5f5f5;border-left:4px solid #1a6b9e;padding:10px 14px;margin:8px 0;border-radius:4px}'
    + '.sig{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:30px}'
    + '.sig-line{border-top:1px solid #999;padding-top:4px;margin-top:24px;font-size:11px}'
    + '@media print{button{display:none}}'
    + '</style></head><body>'
    + '<button onclick="window.print()" style="margin-bottom:20px;padding:8px 18px;background:#1a6b9e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">🖨️ Imprimir / Salvar PDF</button>'
    + '<h1>EVIDÊNCIA DE ANÁLISE — MUDANÇAS CLIMÁTICAS NO CONTEXTO ORGANIZACIONAL</h1>'
    + '<div style="font-size:11px;color:#666;margin-bottom:16px">ISO 14001:2015/2026 §4.1 + ISO 45001:2018 §4.1 · Anexo SL (HLS)</div>'
    + '<table><tr>'
    + '<td style="width:25%;background:#f5f5f5;font-weight:600;padding:6px 8px;border:1px solid #ccc">Organização</td>'
    + '<td style="padding:6px 8px;border:1px solid #ccc">'+esc(org)+'</td>'
    + '<td style="width:20%;background:#f5f5f5;font-weight:600;padding:6px 8px;border:1px solid #ccc">Responsável</td>'
    + '<td style="padding:6px 8px;border:1px solid #ccc">'+esc(S.clima.resp)+'</td>'
    + '</tr><tr>'
    + '<td style="background:#f5f5f5;font-weight:600;padding:6px 8px;border:1px solid #ccc">Data da análise</td>'
    + '<td style="padding:6px 8px;border:1px solid #ccc">'+data+'</td>'
    + '<td style="background:#f5f5f5;font-weight:600;padding:6px 8px;border:1px solid #ccc">Próx. revisão</td>'
    + '<td style="padding:6px 8px;border:1px solid #ccc">'+(S.clima.revisao ? new Date(S.clima.revisao+'T12:00:00').toLocaleDateString('pt-BR') : '—')+'</td>'
    + '</tr><tr>'
    + '<td style="background:#f5f5f5;font-weight:600;padding:6px 8px;border:1px solid #ccc">Norma(s)</td>'
    + '<td style="padding:6px 8px;border:1px solid #ccc">'+({'both':'ISO 14001:2015/2026 + ISO 45001:2018','env':'ISO 14001:2015/2026','sst':'ISO 45001:2018'}[S.clima.norma]||'—')+'</td>'
    + '<td style="background:#f5f5f5;font-weight:600;padding:6px 8px;border:1px solid #ccc">Afeta objetivos SGI?</td>'
    + '<td style="padding:6px 8px;border:1px solid #ccc">'+afetaLabel+'</td>'
    + '</tr></table>'
    + '<h2>1. Conclusão da Análise</h2>'
    + '<div class="box">'+esc(S.clima.conclusao).replace(/\n/g,'<br>')+'</div>'
    + '<h2>2. Riscos e Oportunidades Climáticos Identificados</h2>'
    + (riscosHtml ? '<table><thead><tr><th>#</th><th>Tipo</th><th>Risco / Oportunidade</th><th>Impacto nos objetivos do SGI</th><th>Relevância</th></tr></thead><tbody>'+riscosHtml+'</tbody></table>' : '<p style="color:#666;font-size:11px">Nenhum risco climático específico identificado.</p>')
    + '<h2>3. Emissões de GEE Identificadas</h2>'
    + '<table><tr><th style="width:20%">Escopo</th><th>Fontes identificadas</th></tr>'
    + '<tr><td>🔴 Escopo 1 (diretas)</td><td>'+(S.clima.esc1||'Não identificado')+'</td></tr>'
    + '<tr><td>🟡 Escopo 2 (energia)</td><td>'+(S.clima.esc2||'Não identificado')+'</td></tr>'
    + '<tr><td>🔵 Escopo 3 (cadeia)</td><td>'+(S.clima.esc3||'Não identificado')+'</td></tr>'
    + '<tr><td>✅ Mitigações</td><td>'+(S.clima.mitig||'Nenhuma em andamento')+'</td></tr>'
    + '</table>'
    + '<div class="sig">'
    + '<div><div class="sig-line">Responsável pelo levantamento e análise</div></div>'
    + '<div><div class="sig-line">Representante da Alta Direção / Aprovação</div></div>'
    + '</div>'
    + '</body></html>');
  win.document.close();
}

// Modal de ajuda sobre como analisar clima
function openClimaHelp() {
  alert('📋 COMO FAZER A ANÁLISE DE MUDANÇAS CLIMÁTICAS\n\n'
    + '1. ABA "Clima → Organização":\n'
    + '   • Identifique riscos físicos (enchentes, secas, calor extremo)\n'
    + '   • Avalie o impacto em cada objetivo do SGI\n'
    + '   • Use as sugestões clicando em "+ Adicionar risco"\n\n'
    + '2. ABA "Organização → Clima":\n'
    + '   • Identifique as fontes de GEE por Escopo (1, 2 e 3)\n'
    + '   • Liste iniciativas de mitigação já em andamento\n\n'
    + '3. ABA "Conclusão & Evidência":\n'
    + '   • Registre a conclusão (mesmo que seja "não afeta")\n'
    + '   • Preencha responsável, data e próxima revisão\n'
    + '   • Clique "Imprimir evidência" para gerar o registro para auditoria\n\n'
    + '⚠️ ATENÇÃO: Se o clima NÃO afeta, você precisa provar que ANALISOU.\n'
    + 'A ausência de análise é não conformidade — a conclusão pode ser "não afeta",\n'
    + 'mas a análise precisa estar documentada.');
}

// Inicializa os campos de clima se já houver dados salvos
function initClimaFromState() {
  if (!S.clima) return;
  var fields = {
    'clima-esc1':      S.clima.esc1,
    'clima-esc2':      S.clima.esc2,
    'clima-esc3':      S.clima.esc3,
    'clima-mitig':     S.clima.mitig,
    'clima-conclusao': S.clima.conclusao,
    'clima-resp':      S.clima.resp,
    'clima-data':      S.clima.data,
    'clima-revisao':   S.clima.revisao,
  };
  Object.keys(fields).forEach(function(id) {
    var el = document.getElementById(id);
    if (el && fields[id]) el.value = fields[id];
  });
  if (S.clima.afeta) {
    var el = document.getElementById('clima-afeta');
    if (el) el.value = S.clima.afeta;
  }
  if (S.clima.norma) {
    var el = document.getElementById('clima-norma');
    if (el) el.value = S.clima.norma;
  }
  if (S.clima.riscos && S.clima.riscos.length) {
    S.clima.riscos.forEach(function(r) { addClimaRisco(r); });
  }
  updateClimaStatus();
}

// Inicializa botões de sugestão rápida de riscos climáticos
function initClimaSugestBtns() {
  var container = document.getElementById('clima-sugest-btns');
  if (!container) return;
  var SUGEST = [
    'Ondas de calor extremo','Enchentes / eventos extremos de chuva',
    'Estiagem / seca prolongada','Novas regulamentações de GEE','Eficiência energética'
  ];
  SUGEST.forEach(function(s) {
    var btn = document.createElement('button');
    btn.className = 'btn btn-sm';
    btn.style.cssText = 'font-size:10px;padding:3px 10px;border-color:var(--blue-d);color:var(--blue-d)';
    btn.textContent = s;
    btn.onclick = function() {
      var found = CLIMA_RISCOS_SUGEST.find(function(r){ return r.desc.indexOf(s.split(' ')[0]) !== -1; });
      addClimaRisco(found || {tipo:'Físico agudo',desc:s,impacto:'',norma:'both',relevancia:'media'});
    };
    container.appendChild(btn);
  });
}

// Chama init quando a página carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initClimaFromState);
} else {
  setTimeout(function(){ initClimaFromState(); initClimaSugestBtns(); }, 300);
}



// ═══════════════════════════════════════════════════════════════════
// IMPORTAR JSON DO FORMULÁRIO DE CAMPO STANDALONE
// ═══════════════════════════════════════════════════════════════════
function importCampoJSON(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (!data.itens || !data.itens.length) {
        alert('Arquivo JSON não contém itens válidos.'); return;
      }
      var added = 0;
      data.itens.forEach(function(item) {
        // Normaliza campos do formulário de campo para o formato do SGI
        S.apItems.push({
          type:      item.type || (data.tipo.includes('14001') ? 'env' : 'sst'),
          catCode:   item.codigo || '',
          asp:       item.asp || '',
          imp:       item.imp || '',
          lifecycle: item.ciclo || item.lifecycle || '',
          cond:      item.cond || 'N',
          prob:      item.prob, sev: item.sev, score: item.score,
          cls:       item.cls || (item.score>=17?'crit':item.score>=10?'high':item.score>=5?'med':'low'),
          sig:       item.sig || (item.score>=10?'S':'N'),
          sigCrit:   item.sigTexto || (item.score>=10?'Score >= 10':'Score < 10'),
          activity:  item.atividade || item.activity || '',
          owner:     item.responsavel || item.owner || '',
          sector:    item.area || item.sector || '',
          obs:       item.obs || '',
          // 45001 específico
          control:   item.controle || item.control || '',
          hierarchy: item.hierarquia || item.hierarchy || '',
          addControl:item.addControl || '',
          nivel:     item.nivel || '',
          fromField: true,
          fromJSON:  true,
          importedAt: new Date().toISOString().slice(0,10)
        });
        added++;
      });
      input.value = '';
      renderAPItems();
      alert('✅ ' + added + ' item(ns) importado(s) do formulário de campo!'
        + '\n\nOrganização: ' + (data.organizacao||'—')
        + '\nResponsável: ' + (data.responsavel||'—')
        + '\nData: ' + (data.data||'—'));
    } catch(err) {
      alert('Erro ao ler o arquivo JSON: ' + err.message);
    }
  };
  reader.readAsText(file, 'utf-8');
}

// ═══════════════════════════════════════════════════════════════════
// FORMULÁRIOS DE CAMPO — 14001 e 45001
// ═══════════════════════════════════════════════════════════════════

// Catálogos inline para os formulários
var CAMPO_CAT14 = {
  'A01':['Geração de resíduo sólido não perigoso','Comprometimento da capacidade de disposição de resíduos sólidos'],
  'A02':['Geração de resíduo perigoso (Classe I)','Potencial alteração da qualidade do solo e dos recursos hídricos subterrâneos'],
  'A03':['Consumo de energia elétrica','Esgotamento de recursos energéticos não renováveis / contribuição ao efeito estufa'],
  'A04':['Consumo de água','Comprometimento da disponibilidade dos recursos hídricos'],
  'A05':['Lançamento de efluente líquido','Potencial alteração da qualidade dos corpos d\'água superficiais'],
  'A06':['Emissão atmosférica (COVs / fumos / poeiras)','Alteração da qualidade do ar / comprometimento da saúde humana'],
  'A07':['Consumo de matéria-prima / insumos','Esgotamento de recursos naturais renováveis e não renováveis'],
  'A08':['Geração de ruído e vibração','Alteração da qualidade sonora / incômodo à comunidade e fauna'],
  'A09':['Potencial vazamento ou derramamento de óleo / produto químico','Potencial alteração da qualidade do solo e dos recursos hídricos'],
  'A10':['Emissão de CO₂ e gases de efeito estufa (GEE)','Contribuição ao aquecimento global / alteração climática'],
  'A11':['Consumo excessivo de combustível','Esgotamento de recursos não renováveis / emissão de GEE'],
  'A12':['Geração de efluente sanitário','Potencial alteração da qualidade dos recursos hídricos superficiais e subterrâneos'],
  'A13':['Geração de embalagens e resíduos de papel','Comprometimento da capacidade de disposição de resíduos sólidos'],
  'A14':['Potencial vazamento de óleo lubrificante','Potencial alteração da qualidade do solo e dos recursos hídricos subterrâneos'],
  'A15':['Armazenamento inadequado de produtos químicos','Risco de alteração da qualidade do solo e dos recursos hídricos'],
  'A16':['Uso de substâncias perigosas','Risco de alteração da qualidade ambiental e comprometimento da saúde humana'],
  'A17':['Emissão de material particulado','Alteração da qualidade do ar / comprometimento da visibilidade e saúde'],
  'A18':['Geração de resíduo de construção civil (RCC)','Comprometimento da qualidade do solo / alteração da drenagem local'],
  'A19':['Descarte inadequado de lâmpadas fluorescentes','Risco de alteração da qualidade do solo por substâncias tóxicas'],
  'A20':['Descarte inadequado de pilhas e baterias','Risco de alteração da qualidade do solo por metais pesados'],
  'A21':['Consumo de papel e materiais de escritório','Esgotamento de recursos florestais / geração de resíduos sólidos'],
  'A22':['Uso de refrigerantes (CFC/HFC)','Comprometimento da camada de ozônio / contribuição ao efeito estufa'],
  'A23':['Alteração da qualidade do solo por resíduos sólidos','Alteração da qualidade do solo / comprometimento da drenagem e paisagem'],
  'A24':['Supressão de vegetação / impermeabilização','Redução da biodiversidade / alteração do ciclo hidrológico local'],
  'A25':['Geração de odores','Alteração da qualidade do ar / incômodo à comunidade do entorno'],
};

var CAMPO_CAT45 = {
  'S01':['Trabalho em altura (>2m)','Queda com fraturas graves, TCE ou óbito'],
  'S02':['Operação de máquinas com partes móveis','Esmagamento, amputação, cortes graves'],
  'S03':['Manuseio de produtos químicos perigosos','Intoxicação, queimadura química, doenças ocupacionais'],
  'S04':['Exposição ao ruído acima do limite (NR-15)','Perda auditiva induzida por ruído (PAIR)'],
  'S05':['Exposição ao calor excessivo','Exaustão térmica, insolação, queimaduras'],
  'S06':['Atividades com esforço repetitivo / posturas inadequadas','LER/DORT, tendinite, lombalgia'],
  'S07':['Operação de empilhadeira / veículos internos','Atropelamento, colisão, queda de carga'],
  'S08':['Trabalho em espaço confinado','Asfixia, intoxicação, soterramento'],
  'S09':['Instalações elétricas / trabalho com energia','Choque elétrico, arco elétrico, queimadura, óbito'],
  'S10':['Manuseio e levantamento de cargas pesadas','Lombalgia, hérnia de disco, distensão muscular'],
  'S11':['Exposição a agentes biológicos','Infecções, doenças transmissíveis'],
  'S12':['Atividades com ferramentas manuais cortantes','Cortes, perfurações, abrasões'],
  'S13':['Exposição a vibrações (mãos-braços ou corpo inteiro)','SDBB, lombalgias, neuropatias'],
  'S14':['Trabalho em superfícies escorregadias','Queda no mesmo nível com contusões ou fraturas'],
  'S15':['Exposição a poeiras / fibras (sílica, amianto, etc.)','Silicose, asbestose, cânceres ocupacionais'],
  'S16':['Trabalho noturno / turnos prolongados','Fadiga, distúrbios do sono, erros operacionais'],
  'S17':['Incêndio / explosão','Queimaduras graves, intoxicação por fumaça, óbito'],
  'S18':['Uso de EPI inadequado ou sem uso','Agravamento de todos os outros riscos'],
  'S19':['Pressão psicológica / assédio moral','Burnout, ansiedade, depressão, afastamentos'],
  'S20':['Exposição a radiações ionizantes','Cânceres, leucemia, danos genéticos'],
  'S21':['Trabalho em ambientes com iluminação inadequada','Fadiga visual, acidentes por falta de visibilidade'],
  'S22':['Contato com superfícies quentes / frias extremas','Queimaduras térmicas / criogênicas'],
  'S23':['Uso de equipamentos de pressão (vasos, caldeiras)','Explosão, liberação de vapor, queimadura'],
  'S24':['Transporte e armazenagem de materiais inflamáveis','Incêndio, explosão, intoxicação'],
  'S25':['Trabalho em proximidade a linhas elétricas de alta tensão','Arco elétrico, eletrocussão'],
  'S26':['Atividades com animais peçonhentos / vetores','Acidentes ofídicos, escorpiônicos, doenças'],
  'S27':['Trabalho sob chuva / intempéries','Queda, choque elétrico, hipotermia'],
  'S28':['Operação de caldeiras e vasos de pressão','Explosão, queimadura por vapor'],
  'S29':['Falta de sinalização de segurança','Acidentes por desconhecimento de riscos'],
  'S30':['Trabalho isolado / sem supervisão','Agravamento de acidentes por falta de socorro'],
};

var ETAPAS_CV = [
  '','1-Aquisição de matérias-primas','2-Design/Projeto',
  '3-Produção/Operação','4-Transporte/Entrega',
  '5-Utilização pelo cliente','6-Tratamento fim de vida'
];

var HIERARQ_SST = [
  '','1-Eliminação','2-Substituição',
  '3-Controles de engenharia','4-Controles administrativos','5-EPI'
];

var campo14Rows = 0;
var campo45Rows = 0;

// ── Helpers ──────────────────────────────────────────────────────
function calcScore14(rowId) {
  var p = parseInt(document.getElementById('c14-prob-'+rowId).value) || 0;
  var s = parseInt(document.getElementById('c14-sev-'+rowId).value)  || 0;
  var score = p && s ? p * s : 0;
  var scoreEl = document.getElementById('c14-score-'+rowId);
  var sigEl   = document.getElementById('c14-sig-'+rowId);
  if (!scoreEl) return;
  var color = score >= 17 ? '#A32D2D' : score >= 10 ? '#E85D24' : score >= 5 ? '#BA7517' : score > 0 ? '#1D9E75' : '#9e9c99';
  var nivel = score >= 17 ? 'Crítico' : score >= 10 ? 'Alto' : score >= 5 ? 'Médio' : score > 0 ? 'Baixo' : '—';
  scoreEl.innerHTML = '<div class="campo-score" style="color:'+color+';background:'+color+'15">'+(score||'—')+'</div><div class="campo-score-label">'+nivel+'</div>';
  if (sigEl) {
    var sig = score >= 10 ? 'S' : score > 0 ? 'N' : '—';
    var sigClass = sig === 'S' ? 'cs-s' : sig === 'N' ? 'cs-n' : '';
    sigEl.innerHTML = '<span class="campo-sig '+sigClass+'">'+(sig==='S'?'⚠️ Significativo':sig==='N'?'✅ Não significativo':'—')+'</span>';
  }
}

function calcScore45(rowId) {
  var p = parseInt(document.getElementById('c45-prob-'+rowId).value) || 0;
  var s = parseInt(document.getElementById('c45-sev-'+rowId).value)  || 0;
  var score = p && s ? p * s : 0;
  var scoreEl = document.getElementById('c45-score-'+rowId);
  if (!scoreEl) return;
  var color = score >= 17 ? '#A32D2D' : score >= 10 ? '#E85D24' : score >= 5 ? '#BA7517' : score > 0 ? '#1D9E75' : '#9e9c99';
  var nivel = score >= 17 ? 'CRÍTICO' : score >= 10 ? 'ALTO' : score >= 5 ? 'MÉDIO' : score > 0 ? 'BAIXO' : '—';
  scoreEl.innerHTML = '<div class="campo-score" style="color:'+color+';background:'+color+'15">'+(score||'—')+'</div><div class="campo-score-label">'+nivel+'</div>';
}

function fillCat14(rowId) {
  var code = document.getElementById('c14-code-'+rowId).value.toUpperCase().trim();
  var aspEl = document.getElementById('c14-asp-'+rowId);
  var impEl = document.getElementById('c14-imp-'+rowId);
  var cat = CAMPO_CAT14[code];
  if (cat) {
    if (aspEl && !aspEl.value) aspEl.value = cat[0];
    if (impEl && !impEl.value) impEl.value = cat[1];
    aspEl.style.borderColor = 'var(--green)';
    impEl.style.borderColor = 'var(--green)';
    setTimeout(function(){ if(aspEl) aspEl.style.borderColor=''; if(impEl) impEl.style.borderColor=''; }, 2000);
  }
  document.getElementById('c14-code-'+rowId).value = code; // força maiúsculo
}

function fillCat45(rowId) {
  var code = document.getElementById('c45-code-'+rowId).value.toUpperCase().trim();
  var perEl = document.getElementById('c45-per-'+rowId);
  var risEl = document.getElementById('c45-ris-'+rowId);
  var cat = CAMPO_CAT45[code];
  if (cat) {
    if (perEl && !perEl.value) perEl.value = cat[0];
    if (risEl && !risEl.value) risEl.value = cat[1];
    perEl.style.borderColor = 'var(--blue)';
    risEl.style.borderColor = 'var(--blue)';
    setTimeout(function(){ if(perEl) perEl.style.borderColor=''; if(risEl) risEl.style.borderColor=''; }, 2000);
  }
  document.getElementById('c45-code-'+rowId).value = code;
}

// ── Formulário 14001 ─────────────────────────────────────────────
function openCampo14001() {
  campo14Rows = 0;
  document.getElementById('campo14001-rows').innerHTML = '';
  document.getElementById('c14-activity').value = '';
  document.getElementById('c14-owner').value = '';
  document.getElementById('c14-sector').value = '';
  addCampo14001Row();
  addCampo14001Row();
  document.getElementById('campo14001-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCampo14001() {
  document.getElementById('campo14001-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function addCampo14001Row() {
  campo14Rows++;
  var id = campo14Rows;
  var etapasOpts = ETAPAS_CV.map(function(e){
    return '<option value="'+e+'">'+e+'</option>';
  }).join('');
  var probOpts = '<option value="">—</option>' + [1,2,3,4,5].map(function(n){
    return '<option value="'+n+'">'+n+'</option>';
  }).join('');

  var html = '<div class="campo-item" id="c14-item-'+id+'">'
    + '<div style="display:grid;grid-template-columns:36px 130px 1fr 1fr 100px 70px 70px 90px 90px 36px;gap:8px;align-items:start">'
    // Número
    + '<div style="padding-top:8px"><div class="campo-item-num" style="background:var(--green-d)">'+id+'</div></div>'
    // Código
    + '<div><input type="text" id="c14-code-'+id+'" placeholder="Ex.: A09" maxlength="4" '
    + 'oninput="fillCat14('+id+')" '
    + 'style="font-family:monospace;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:.05em;text-align:center">'
    + '<div style="font-size:9px;color:var(--text3);margin-top:3px;text-align:center">A01–A25</div></div>'
    // Aspecto
    + '<div><input type="text" id="c14-asp-'+id+'" placeholder="Preenchido automaticamente pelo código ou digite aqui" style="font-size:12px"></div>'
    // Impacto
    + '<div><input type="text" id="c14-imp-'+id+'" placeholder="Preenchido automaticamente pelo código ou digite aqui" style="font-size:12px"></div>'
    // Etapa
    + '<div><select id="c14-etapa-'+id+'" style="font-size:11px">'+etapasOpts+'</select></div>'
    // Prob
    + '<div><select id="c14-prob-'+id+'" onchange="calcScore14('+id+')" style="font-size:13px;font-weight:600;text-align:center">'+probOpts+'</select>'
    + '<div style="font-size:9px;color:var(--text3);margin-top:2px;text-align:center">Prob.</div></div>'
    // Sev
    + '<div><select id="c14-sev-'+id+'" onchange="calcScore14('+id+')" style="font-size:13px;font-weight:600;text-align:center">'+probOpts+'</select>'
    + '<div style="font-size:9px;color:var(--text3);margin-top:2px;text-align:center">Sev.</div></div>'
    // Score
    + '<div id="c14-score-'+id+'"><div class="campo-score" style="color:#9e9c99;background:#f5f5f3">—</div><div class="campo-score-label">Score</div></div>'
    // Significância
    + '<div id="c14-sig-'+id+'"><span class="campo-sig" style="color:#9e9c99">—</span></div>'
    // Remover
    + '<div style="padding-top:6px"><button onclick="removeCampo14Row('+id+')" '
    + 'style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--text3)" title="Remover">×</button></div>'
    + '</div>'
    // Linha extra: condição e observação
    + '<div style="display:grid;grid-template-columns:100px 1fr;gap:8px;margin-top:8px;padding-top:8px;border-top:1px dashed var(--gray-b)">'
    + '<div><label style="font-size:10px;color:var(--text2)">Condição</label>'
    + '<select id="c14-cond-'+id+'" style="font-size:12px">'
    + '<option value="N">N — Normal</option><option value="A">A — Anormal</option><option value="E">E — Emergência</option>'
    + '</select></div>'
    + '<div><label style="font-size:10px;color:var(--text2)">Observação</label>'
    + '<input type="text" id="c14-obs-'+id+'" placeholder="Observações adicionais..." style="font-size:12px"></div>'
    + '</div>'
    + '</div>';

  var container = document.getElementById('campo14001-rows');
  container.insertAdjacentHTML('beforeend', html);
  updateCampo14Count();

  // Foca no campo de código da nova linha
  setTimeout(function(){
    var el = document.getElementById('c14-code-'+id);
    if (el) el.focus();
  }, 100);
}

function removeCampo14Row(id) {
  var el = document.getElementById('c14-item-'+id);
  if (el) { el.style.animation='fi .2s reverse'; setTimeout(function(){ if(el) el.remove(); updateCampo14Count(); }, 180); }
}

function updateCampo14Count() {
  var rows = document.querySelectorAll('[id^="c14-item-"]');
  var el = document.getElementById('c14-count');
  if (el) el.textContent = rows.length + ' aspecto(s) no formulário';
}

function saveCampo14001() {
  var activity = document.getElementById('c14-activity').value.trim();
  var owner    = document.getElementById('c14-owner').value.trim();
  var sector   = document.getElementById('c14-sector').value.trim();
  var added = 0, skipped = 0;

  for (var id = 1; id <= campo14Rows; id++) {
    var itemEl = document.getElementById('c14-item-'+id);
    if (!itemEl) continue;
    var asp  = (document.getElementById('c14-asp-'+id)||{}).value;
    var imp  = (document.getElementById('c14-imp-'+id)||{}).value;
    var prob = parseInt((document.getElementById('c14-prob-'+id)||{}).value) || 0;
    var sev  = parseInt((document.getElementById('c14-sev-'+id)||{}).value)  || 0;
    if (!asp || !prob || !sev) { skipped++; continue; }
    var score = prob * sev;
    var cls   = score >= 17 ? 'crit' : score >= 10 ? 'high' : score >= 5 ? 'med' : 'low';
    S.apItems.push({
      type:'env',
      catCode: (document.getElementById('c14-code-'+id)||{}).value || '',
      asp:     asp,
      imp:     imp,
      lifecycle: (document.getElementById('c14-etapa-'+id)||{}).value || '3-Produção/Operação',
      cond:    (document.getElementById('c14-cond-'+id)||{}).value || 'N',
      prob:    prob, sev: sev, score: score, cls: cls,
      activity: activity, owner: owner, sector: sector,
      obs:     (document.getElementById('c14-obs-'+id)||{}).value || '',
      sig:     score >= 10 ? 'S' : 'N',
      sigCrit: score >= 10 ? 'Score >= 10 (significativo)' : 'Score < 10 (não significativo)',
      fromField: true
    });
    added++;
  }

  closeCampo14001();
  if (added > 0) {
    renderAPItems();
    alert('✅ ' + added + ' aspecto(s) adicionado(s) ao SGI com sucesso!'
      + (skipped > 0 ? '\n\n⚠️ ' + skipped + ' linha(s) ignorada(s) por falta de aspecto ou probabilidade/severidade.' : ''));
    goTo('s2');
  } else {
    alert('Nenhum aspecto foi adicionado. Verifique se preencheu pelo menos o Aspecto, Probabilidade e Severidade.');
  }
}

// ── Formulário 45001 ─────────────────────────────────────────────
function openCampo45001() {
  campo45Rows = 0;
  document.getElementById('campo45001-rows').innerHTML = '';
  document.getElementById('c45-activity').value = '';
  document.getElementById('c45-owner').value = '';
  document.getElementById('c45-sector').value = '';
  document.getElementById('c45-nr').value = '';
  addCampo45001Row();
  addCampo45001Row();
  document.getElementById('campo45001-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCampo45001() {
  document.getElementById('campo45001-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function addCampo45001Row() {
  campo45Rows++;
  var id = campo45Rows;
  var hierOpts = HIERARQ_SST.map(function(h){
    return '<option value="'+h+'">'+h+'</option>';
  }).join('');
  var probOpts = '<option value="">—</option>' + [1,2,3,4,5].map(function(n){
    return '<option value="'+n+'">'+n+'</option>';
  }).join('');

  var html = '<div class="campo-item" id="c45-item-'+id+'">'
    + '<div style="display:grid;grid-template-columns:36px 130px 1fr 1fr 70px 70px 90px 120px 36px;gap:8px;align-items:start">'
    // Número
    + '<div style="padding-top:8px"><div class="campo-item-num" style="background:var(--blue-d)">'+id+'</div></div>'
    // Código
    + '<div><input type="text" id="c45-code-'+id+'" placeholder="Ex.: S09" maxlength="4" '
    + 'oninput="fillCat45('+id+')" '
    + 'style="font-family:monospace;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:.05em;text-align:center">'
    + '<div style="font-size:9px;color:var(--text3);margin-top:3px;text-align:center">S01–S30</div></div>'
    // Perigo
    + '<div><input type="text" id="c45-per-'+id+'" placeholder="Preenchido automaticamente pelo código ou digite aqui" style="font-size:12px"></div>'
    // Risco
    + '<div><input type="text" id="c45-ris-'+id+'" placeholder="Preenchido automaticamente pelo código ou digite aqui" style="font-size:12px"></div>'
    // Prob
    + '<div><select id="c45-prob-'+id+'" onchange="calcScore45('+id+')" style="font-size:13px;font-weight:600;text-align:center">'+probOpts+'</select>'
    + '<div style="font-size:9px;color:var(--text3);margin-top:2px;text-align:center">Prob.</div></div>'
    // Sev
    + '<div><select id="c45-sev-'+id+'" onchange="calcScore45('+id+')" style="font-size:13px;font-weight:600;text-align:center">'+probOpts+'</select>'
    + '<div style="font-size:9px;color:var(--text3);margin-top:2px;text-align:center">Sev.</div></div>'
    // Grau
    + '<div id="c45-score-'+id+'"><div class="campo-score" style="color:#9e9c99;background:#f5f5f3">—</div><div class="campo-score-label">Grau</div></div>'
    // Nível
    + '<div id="c45-nivel-'+id+'" style="padding-top:6px;font-size:11px;color:var(--text2)">—</div>'
    // Remover
    + '<div style="padding-top:6px"><button onclick="removeCampo45Row('+id+')" '
    + 'style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--text3)" title="Remover">×</button></div>'
    + '</div>'
    // Linha extra: controle existente + hierarquia + controle adicional
    + '<div style="display:grid;grid-template-columns:1fr 160px 1fr;gap:8px;margin-top:8px;padding-top:8px;border-top:1px dashed var(--gray-b)">'
    + '<div><label style="font-size:10px;color:var(--text2)">Controle Existente</label>'
    + '<input type="text" id="c45-ctrl-'+id+'" placeholder="Ex.: Linha de vida, sinalização" style="font-size:12px"></div>'
    + '<div><label style="font-size:10px;color:var(--text2)">Hierarquia de Controle</label>'
    + '<select id="c45-hier-'+id+'" style="font-size:11px">'+hierOpts+'</select></div>'
    + '<div><label style="font-size:10px;color:var(--text2)">Controle Adicional Necessário</label>'
    + '<input type="text" id="c45-cadd-'+id+'" placeholder="Ex.: Implementar ancoragem móvel" style="font-size:12px"></div>'
    + '</div>'
    + '</div>';

  var container = document.getElementById('campo45001-rows');
  container.insertAdjacentHTML('beforeend', html);
  updateCampo45Count();

  setTimeout(function(){
    var el = document.getElementById('c45-code-'+id);
    if (el) el.focus();
  }, 100);
}

function removeCampo45Row(id) {
  var el = document.getElementById('c45-item-'+id);
  if (el) { el.style.animation='fi .2s reverse'; setTimeout(function(){ if(el) el.remove(); updateCampo45Count(); }, 180); }
}

function updateCampo45Count() {
  var rows = document.querySelectorAll('[id^="c45-item-"]');
  var el = document.getElementById('c45-count');
  if (el) el.textContent = rows.length + ' perigo(s) no formulário';
}

function saveCampo45001() {
  var activity = document.getElementById('c45-activity').value.trim();
  var owner    = document.getElementById('c45-owner').value.trim();
  var sector   = document.getElementById('c45-sector').value.trim();
  var nr       = document.getElementById('c45-nr').value.trim();
  var added = 0, skipped = 0;

  for (var id = 1; id <= campo45Rows; id++) {
    var itemEl = document.getElementById('c45-item-'+id);
    if (!itemEl) continue;
    var per  = (document.getElementById('c45-per-'+id)||{}).value;
    var ris  = (document.getElementById('c45-ris-'+id)||{}).value;
    var prob = parseInt((document.getElementById('c45-prob-'+id)||{}).value) || 0;
    var sev  = parseInt((document.getElementById('c45-sev-'+id)||{}).value)  || 0;
    if (!per || !prob || !sev) { skipped++; continue; }
    var score = prob * sev;
    var cls   = score >= 17 ? 'crit' : score >= 10 ? 'high' : score >= 5 ? 'med' : 'low';
    var nivel = score >= 17 ? 'Crítico' : score >= 10 ? 'Alto' : score >= 5 ? 'Médio' : 'Baixo';
    S.apItems.push({
      type:'sst',
      catCode:   (document.getElementById('c45-code-'+id)||{}).value || '',
      asp:       per,
      imp:       ris,
      control:   (document.getElementById('c45-ctrl-'+id)||{}).value || '',
      hierarchy: (document.getElementById('c45-hier-'+id)||{}).value || '',
      addControl:(document.getElementById('c45-cadd-'+id)||{}).value || '',
      prob:    prob, sev: sev, score: score, cls: cls,
      activity: activity, owner: owner, sector: sector,
      obs:     nr,
      nivel:   nivel,
      fromField: true
    });
    added++;
  }

  closeCampo45001();
  if (added > 0) {
    renderAPItems();
    alert('✅ ' + added + ' perigo(s) adicionado(s) ao SGI com sucesso!'
      + (skipped > 0 ? '\n\n⚠️ ' + skipped + ' linha(s) ignorada(s) por falta de perigo ou probabilidade/severidade.' : ''));
    goTo('s2');
  } else {
    alert('Nenhum perigo foi adicionado. Verifique se preencheu pelo menos o Perigo, Probabilidade e Severidade.');
  }
}

// Atualiza o display de Nível no 45001 (chamado no calcScore45)
var _calcScore45Orig = calcScore45;
calcScore45 = function(rowId) {
  _calcScore45Orig(rowId);
  var p = parseInt((document.getElementById('c45-prob-'+rowId)||{}).value) || 0;
  var s = parseInt((document.getElementById('c45-sev-'+rowId)||{}).value)  || 0;
  var score = p && s ? p * s : 0;
  var nivelEl = document.getElementById('c45-nivel-'+rowId);
  if (nivelEl) {
    var nivel = score >= 17 ? 'CRÍTICO' : score >= 10 ? 'ALTO' : score >= 5 ? 'MÉDIO' : score > 0 ? 'BAIXO' : '—';
    var color = score >= 17 ? 'var(--red)' : score >= 10 ? '#E85D24' : score >= 5 ? 'var(--amber)' : score > 0 ? 'var(--green-d)' : 'var(--text3)';
    nivelEl.innerHTML = '<span style="font-weight:700;color:'+color+'">'+nivel+'</span>';
  }
};



// ═══════════════════════════════════════════════════════════════════
// MÓDULO 9.1 — INDICADORES DE DESEMPENHO (KPI)
// ═══════════════════════════════════════════════════════════════════

if (!S.kpis) S.kpis = [];

var kpiFilter    = 'all';
var kpiEditIdx   = null;
var kpiEntryIdx  = null;
var kpiEntryKey  = null;
var MONTHS_PT    = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

// ── Catálogo pré-carregado ───────────────────────────────────────
var KPI_CATALOG = [
  // SST
  {code:'S01',type:'sst',name:'Taxa de Frequência de Acidentes com Afastamento (TF)',unit:'acid./milhão HH',formula:'(Nº acid. c/ afastamento x 1.000.000) / HH trabalhadas',direction:'lte',tolerance:10,normRef:'ISO 45001 §9.1.1 / NBR 14280',source:'CAT registradas / Controle interno'},
  {code:'S02',type:'sst',name:'Taxa de Gravidade (TG)',unit:'dias perdidos/milhão HH',formula:'(Dias perdidos + debitados x 1.000.000) / HH trabalhadas',direction:'lte',tolerance:10,normRef:'ISO 45001 §9.1.1 / NBR 14280',source:'Registros médicos / RH'},
  {code:'S03',type:'sst',name:'Número de Acidentes com Afastamento',unit:'acidentes/mês',formula:'Contagem direta',direction:'lte',tolerance:0,normRef:'ISO 45001 §9.1.1',source:'CAT / eSocial'},
  {code:'S04',type:'sst',name:'Número de Quase-Acidentes Reportados',unit:'ocorrências/mês',formula:'Contagem de registros de quase-acidentes',direction:'gte',tolerance:10,normRef:'ISO 45001 §9.1.1',source:'Fichas de quase-acidente'},
  {code:'S05',type:'sst',name:'Dias Perdidos por Acidentes',unit:'dias/mês',formula:'Soma dos dias de afastamento no período',direction:'lte',tolerance:10,normRef:'ISO 45001 §9.1.1',source:'Controle de atestados / RH'},
  {code:'S06',type:'sst',name:'Horas de Treinamento de SST',unit:'horas/mês',formula:'Soma das horas de treinamentos SST realizados',direction:'gte',tolerance:10,normRef:'ISO 45001 §7.2',source:'Registros de treinamento'},
  {code:'S07',type:'sst',name:'Percentual de EPIs inspecionados',unit:'%',formula:'(EPIs inspecionados / EPIs em uso) x 100',direction:'gte',tolerance:5,normRef:'NR-6 / ISO 45001 §8.1',source:'Fichas de entrega e inspeção de EPI'},
  {code:'S08',type:'sst',name:'Número de Não Conformidades de SST',unit:'NCs/mês',formula:'Contagem de NCs abertas no período',direction:'lte',tolerance:0,normRef:'ISO 45001 §10.2',source:'Registro de NCs do SGI'},
  {code:'S09',type:'sst',name:'Taxa de Doenças Ocupacionais',unit:'casos/1000 trabalhadores',formula:'(Casos novos x 1000) / Nº trabalhadores',direction:'lte',tolerance:10,normRef:'ISO 45001 §9.1.1',source:'PCMSO / Médico do Trabalho'},
  {code:'S10',type:'sst',name:'Número de Inspeções de Segurança Realizadas',unit:'inspeções/mês',formula:'Contagem direta de inspeções realizadas',direction:'gte',tolerance:10,normRef:'ISO 45001 §9.1',source:'Relatórios de inspeção'},
  // Ambientais
  {code:'A01',type:'env',name:'Consumo de Água',unit:'m³/mês',formula:'Leitura do hidrômetro',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1',source:'Conta de água / Hidrômetro'},
  {code:'A02',type:'env',name:'Consumo de Energia Elétrica',unit:'kWh/mês',formula:'Leitura do medidor / Conta de energia',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1',source:'Conta de energia / Medidor'},
  {code:'A03',type:'env',name:'Geração de Resíduo Sólido Não Perigoso',unit:'kg/mês',formula:'Pesagem na coleta ou estimativa',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1',source:'Manifesto de resíduos / Pesagem'},
  {code:'A04',type:'env',name:'Geração de Resíduo Perigoso (Classe I)',unit:'kg/mês',formula:'Manifesto de transporte / Pesagem',direction:'lte',tolerance:5,normRef:'ISO 14001 §9.1.1 / CONAMA 313',source:'MTR / Manifesto de resíduos'},
  {code:'A05',type:'env',name:'Volume de Efluente Líquido Gerado',unit:'m³/mês',formula:'Medição no ponto de lançamento',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1',source:'Medidor de vazão / ETE'},
  {code:'A06',type:'env',name:'Consumo de Combustível Fóssil',unit:'litros/mês',formula:'Notas de abastecimento',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1',source:'Controle de abastecimento'},
  {code:'A07',type:'env',name:'Emissão de CO₂ Equivalente',unit:'tCO₂eq/mês',formula:'Consumo combustível x Fator de emissão IPCC',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1 / GHG Protocol',source:'Controle de combustível / Cálculo'},
  {code:'A08',type:'env',name:'Taxa de Reciclagem de Resíduos',unit:'%',formula:'(Resíduo reciclado / Total gerado) x 100',direction:'gte',tolerance:5,normRef:'ISO 14001 §9.1.1',source:'Manifesto de resíduos / Cooperativa'},
  {code:'A09',type:'env',name:'Número de Não Conformidades Ambientais',unit:'NCs/mês',formula:'Contagem de NCs ambientais abertas',direction:'lte',tolerance:0,normRef:'ISO 14001 §10.2',source:'Registro de NCs do SGI'},
  {code:'A10',type:'env',name:'Número de Reclamações da Comunidade',unit:'reclamações/mês',formula:'Contagem de registros de reclamações',direction:'lte',tolerance:0,normRef:'ISO 14001 §9.1.1',source:'Canal de ouvidoria / Registros'},
  {code:'A11',type:'env',name:'Consumo de Água por Produto',unit:'m³/unidade',formula:'Consumo total / Qtd. produzida',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1',source:'Hidrômetro + ERP produção'},
  {code:'A12',type:'env',name:'Intensidade de Energia',unit:'kWh/unidade',formula:'Consumo total / Qtd. produzida',direction:'lte',tolerance:10,normRef:'ISO 14001 §9.1.1',source:'Medidor + ERP produção'},
];

// ── Inicialização ────────────────────────────────────────────────
function initKPI() {
  // Popula select de ano
  var yearSel = document.getElementById('kpi-year');
  if (yearSel && !yearSel.options.length) {
    var cy = new Date().getFullYear();
    for (var y = cy; y >= cy - 4; y--) {
      var opt = document.createElement('option');
      opt.value = y; opt.textContent = y;
      yearSel.appendChild(opt);
    }
  }
  renderKPIGrid();
  updateKPIStats();
}

// ── Gera chave de período ────────────────────────────────────────
function periodKey(year, month) {
  return year + '-' + String(month + 1).padStart(2, '0');
}

// ── Semáforo ─────────────────────────────────────────────────────
function calcSemaphore(kpi) {
  var year = parseInt(document.getElementById('kpi-year') ?
    document.getElementById('kpi-year').value : new Date().getFullYear());
  var period = parseInt(document.getElementById('kpi-period') ?
    document.getElementById('kpi-period').value : 12);
  // Pega o valor mais recente com dado
  var val = null;
  for (var m = 11; m >= 0; m--) {
    var key = periodKey(year, m);
    if (kpi.data && kpi.data[key] !== undefined && kpi.data[key] !== '') {
      val = parseFloat(kpi.data[key]);
      break;
    }
  }
  if (val === null) return {sem:'gry', label:'Sem dados', val:null};
  var target = parseFloat(kpi.target);
  if (isNaN(target)) return {sem:'gry', label:'Meta não definida', val:val};
  var tol = (parseFloat(kpi.tolerance) || 10) / 100;
  var dir = kpi.direction || 'lte';
  var ok, warn;
  if (dir === 'lte') {
    ok   = val <= target;
    warn = val <= target * (1 + tol);
  } else if (dir === 'gte') {
    ok   = val >= target;
    warn = val >= target * (1 - tol);
  } else {
    ok   = Math.abs(val - target) / (target || 1) <= tol / 2;
    warn = Math.abs(val - target) / (target || 1) <= tol;
  }
  return {
    sem:   ok ? 'grn' : warn ? 'amb' : 'red',
    label: ok ? 'Na meta' : warn ? 'Atenção' : 'Fora da meta',
    val:   val
  };
}

// ── Calcula tendência ────────────────────────────────────────────
function calcTrend(kpi, year) {
  var vals = [];
  for (var m = 0; m < 12; m++) {
    var v = kpi.data && kpi.data[periodKey(year, m)];
    if (v !== undefined && v !== '') vals.push(parseFloat(v));
  }
  if (vals.length < 2) return {icon:'—', color:'var(--text3)'};
  var last  = vals[vals.length - 1];
  var prev  = vals[vals.length - 2];
  var delta = last - prev;
  var dir   = kpi.direction || 'lte';
  var good  = (dir === 'lte' && delta < 0) || (dir === 'gte' && delta > 0);
  var neutral = Math.abs(delta) < 0.001;
  return neutral
    ? {icon:'→', color:'var(--text2)'}
    : good
      ? {icon:'↓' + (dir==='gte'?'':'') + (dir==='lte'?'↓':'↑'), color:'var(--green-d)'}
      : {icon:(dir==='lte'?'↑':'↓'), color:'var(--red)'};
}

// ── Renderiza o grid de KPIs ─────────────────────────────────────
function renderKPIGrid() {
  var el = document.getElementById('kpi-grid');
  if (!el) return;
  var year = parseInt((document.getElementById('kpi-year')||{value:new Date().getFullYear()}).value);
  var items = S.kpis.filter(function(k) {
    if (kpiFilter === 'env') return k.type === 'env';
    if (kpiFilter === 'sst') return k.type === 'sst';
    if (kpiFilter === 'red') return calcSemaphore(k).sem === 'red';
    if (kpiFilter === 'grn') return calcSemaphore(k).sem === 'grn';
    return true;
  });
  if (!items.length) {
    el.innerHTML = '<div class="empty" style="grid-column:1/-1">Nenhum indicador'
      + (kpiFilter!=='all'?' com este filtro':'') + '. Use o Catálogo de KPIs ou "+ Novo indicador".</div>';
    return;
  }
  el.innerHTML = items.map(function(kpi) {
    var realIdx = S.kpis.indexOf(kpi);
    var sem     = calcSemaphore(kpi);
    var trend   = calcTrend(kpi, year);
    var nc      = kpi.type === 'env' ? 'var(--green-d)' : 'var(--blue-d)';
    var nb      = kpi.type === 'env' ? 'var(--green-l)' : 'var(--blue-l)';
    var valStr  = sem.val !== null ? sem.val.toLocaleString('pt-BR') : '—';
    var tgtStr  = kpi.target !== '' && kpi.target !== undefined ? parseFloat(kpi.target).toLocaleString('pt-BR') : '—';
    var semCss  = 'kpi-sem-' + sem.sem;
    // Sparkline — barras dos 6 últimos meses
    var sparkData = [];
    for (var m = 0; m < 12; m++) {
      var v = kpi.data && kpi.data[periodKey(year, m)];
      sparkData.push(v !== undefined && v !== '' ? parseFloat(v) : null);
    }
    var maxVal = Math.max.apply(null, sparkData.filter(function(v){return v!==null;})) || 1;
    var sparkBars = sparkData.slice(-6).map(function(v, si) {
      var globalIdx = 6 + si; // últimos 6 meses
      var month = globalIdx < 12 ? MONTHS_PT[globalIdx] : '—';
      if (v === null) return '<div style="display:flex;flex-direction:column;align-items:center;gap:2px">'
        + '<div style="width:14px;height:2px;background:var(--gray-b);border-radius:1px"></div>'
        + '<span style="font-size:9px;color:var(--text3)">'+MONTHS_PT[globalIdx < 12 ? globalIdx : 0]+'</span></div>';
      var pct  = Math.round((v / maxVal) * 48);
      var clr  = calcSemaphore(Object.assign({}, kpi, {data:Object.assign({}, kpi.data, {[periodKey(year, globalIdx < 12 ? globalIdx : 0)]: v})})).sem;
      var barColor = clr==='grn'?'#1D9E75':clr==='amb'?'#BA7517':'#A32D2D';
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer" onclick="event.stopPropagation();openKPIEntry('+realIdx+',\''+periodKey(year, globalIdx < 12 ? globalIdx : 0)+'\')">'
        + '<div style="width:14px;height:'+Math.max(pct,4)+'px;background:'+barColor+';border-radius:2px 2px 0 0;transition:height .3s"></div>'
        + '<span style="font-size:9px;color:var(--text2)">'+MONTHS_PT[globalIdx < 12 ? globalIdx : 0]+'</span></div>';
    }).join('');

    return '<div class="kpi-card'+(kpi._open?' expanded':'')+'">'
      // Header
      + '<div class="kpi-header" onclick="toggleKPI('+realIdx+')">'
      + '<div class="kpi-sem '+semCss+'"></div>'
      + '<div style="flex:1;min-width:0">'
      + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">'
      + '<span style="font-size:10px;padding:1px 7px;border-radius:10px;background:'+nb+';color:'+nc+';font-weight:600">'+(kpi.type==='env'?'🌿 Ambiental':'⛑️ SST')+'</span>'
      + (kpi.normRef?'<span style="font-size:10px;color:var(--text3)">'+esc(kpi.normRef)+'</span>':'')
      + '</div>'
      + '<div class="kpi-title">'+esc(kpi.name)+'</div>'
      + '<div style="display:flex;align-items:baseline;gap:8px;margin:4px 0">'
      + '<span class="kpi-val" style="color:'+('grn'===sem.sem?'var(--green-d)':'red'===sem.sem?'var(--red)':'var(--amber)') +'">'+valStr+'</span>'
      + '<span style="font-size:11px;color:var(--text2)">'+esc(kpi.unit||'')+'</span>'
      + '<span class="kpi-trend" style="color:'+trend.color+'" title="Tendência">'+trend.icon+'</span>'
      + '</div>'
      + '<div class="kpi-meta">Meta: '+tgtStr+(kpi.unit?' '+esc(kpi.unit):'')
      + ' &nbsp;|&nbsp; '+sem.label
      + (kpi.owner?' &nbsp;|&nbsp; 👤 '+esc(kpi.owner):'')+'</div>'
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">'
      + '<button onclick="event.stopPropagation();openKPIModal('+realIdx+')" class="btn btn-sm" style="font-size:11px">✏️</button>'
      + '<button onclick="event.stopPropagation();removeKPI('+realIdx+')" style="background:none;border:none;cursor:pointer;font-size:15px;color:var(--text2)">×</button>'
      + '</div></div>'
      // Body expandível
      + '<div class="kpi-body">'
      + '<div style="font-size:11px;font-weight:600;color:var(--text2);margin-bottom:8px">Últimos 6 meses — clique na barra para inserir/editar valor</div>'
      + '<div style="display:flex;gap:4px;align-items:flex-end;height:60px;margin-bottom:4px">'
      + sparkBars
      + '</div>'
      + (kpi.formula?'<div style="font-size:11px;color:var(--text2);margin-top:6px">📐 Fórmula: '+esc(kpi.formula)+'</div>':'')
      + (kpi.source?'<div style="font-size:11px;color:var(--text2)">📋 Fonte: '+esc(kpi.source)+'</div>':'')
      // Última justificativa registrada
      + (function(){
          var lastKey=null, lastObs='', lastCausa='', lastAcao='';
          for(var m=11;m>=0;m--){
            var k2=periodKey(year,m);
            if(kpi.data&&kpi.data[k2]!==undefined){lastKey=k2;break;}
          }
          if(!lastKey) return '';
          lastObs   = (kpi.dataObs   && kpi.dataObs[lastKey])   || '';
          lastCausa = (kpi.dataCausa && kpi.dataCausa[lastKey])  || '';
          lastAcao  = (kpi.dataAcao  && kpi.dataAcao[lastKey])   || '';
          var html  = '';
          if(lastObs)   html += '<div style="margin-top:8px;font-size:11px;background:var(--gray-l);border-radius:6px;padding:7px 10px"><span style="font-weight:600;color:var(--text2)">💬 Obs.:</span> '+esc(lastObs)+'</div>';
          if(lastCausa) html += '<div style="margin-top:5px;font-size:11px;background:var(--red-l);border-radius:6px;padding:7px 10px"><span style="font-weight:600;color:var(--red)">🔍 Causa:</span> '+esc(lastCausa)+'</div>';
          if(lastAcao)  html += '<div style="margin-top:5px;font-size:11px;background:var(--amber-l);border-radius:6px;padding:7px 10px"><span style="font-weight:600;color:var(--amber-d)">⚡ Ação prevista:</span> '+esc(lastAcao)+'</div>';
          return html;
        })()
      + '<div style="margin-top:10px;padding-top:8px;border-top:1px dashed var(--gray-b)">'
      + '<button class="btn btn-sm btn-g" onclick="openKPIEntry('+realIdx+',null)">+ Inserir valor do mês atual</button>'
      + '</div></div>'
      + '</div>';
  }).join('');
  updateKPIStats();
}

function toggleKPI(i) {
  S.kpis[i]._open = !S.kpis[i]._open;
  renderKPIGrid();
}

// ── Stats ────────────────────────────────────────────────────────
function updateKPIStats() {
  var el = document.getElementById('kpi-stats');
  if (!el) return;
  var grn = S.kpis.filter(function(k){return calcSemaphore(k).sem==='grn';}).length;
  var amb = S.kpis.filter(function(k){return calcSemaphore(k).sem==='amb';}).length;
  var red = S.kpis.filter(function(k){return calcSemaphore(k).sem==='red';}).length;
  var gry = S.kpis.filter(function(k){return calcSemaphore(k).sem==='gry';}).length;
  el.innerHTML = [
    {v:S.kpis.length, l:'Total de KPIs',   e:'📊', bg:'var(--white)'},
    {v:grn,           l:'Na meta',          e:'🟢', bg:'#e8f5ef'},
    {v:amb,           l:'Atenção',          e:'🟡', bg:'var(--amber-l)'},
    {v:red,           l:'Fora da meta',     e:'🔴', bg:'var(--red-l)'},
    {v:gry,           l:'Sem dados',        e:'⚪', bg:'var(--gray-l)'},
  ].map(function(c){
    return '<div style="background:'+c.bg+';border:1px solid var(--gray-b);border-radius:var(--r);padding:12px;text-align:center">'
      +'<div style="font-size:18px;margin-bottom:2px">'+c.e+'</div>'
      +'<div style="font-size:22px;font-weight:700;color:var(--text)">'+c.v+'</div>'
      +'<div style="font-size:11px;color:var(--text2)">'+c.l+'</div>'
      +'</div>';
  }).join('');
}

// ── Filtros ──────────────────────────────────────────────────────
function filterKPI(f) {
  kpiFilter = f;
  ['all','env','sst','red','grn'].forEach(function(x){
    var b=document.getElementById('kf-'+x);
    if(b){b.style.background='';b.style.color='';b.style.borderColor='';}
  });
  var btn=document.getElementById('kf-'+f);
  if(btn){btn.style.background='var(--green)';btn.style.color='#fff';btn.style.borderColor='var(--green)';}
  renderKPIGrid();
}

// ── Modal de KPI ─────────────────────────────────────────────────
function openKPIModal(editIdx) {
  kpiEditIdx = (editIdx !== undefined) ? editIdx : null;
  document.getElementById('kpi-modal-title').textContent =
    kpiEditIdx !== null ? 'Editar Indicador' : 'Novo Indicador de Desempenho';
  var k = kpiEditIdx !== null ? S.kpis[kpiEditIdx] : {};
  document.getElementById('kpi-name').value      = k.name||'';
  document.getElementById('kpi-type').value      = k.type||'sst';
  document.getElementById('kpi-unit').value      = k.unit||'';
  document.getElementById('kpi-formula').value   = k.formula||'';
  document.getElementById('kpi-target').value    = k.target !== undefined ? k.target : '';
  document.getElementById('kpi-direction').value = k.direction||'lte';
  document.getElementById('kpi-tolerance').value = k.tolerance !== undefined ? k.tolerance : 10;
  document.getElementById('kpi-owner').value     = k.owner||'';
  document.getElementById('kpi-freq').value      = k.freq||'mensal';
  document.getElementById('kpi-norm-ref').value  = k.normRef||'';
  document.getElementById('kpi-source').value    = k.source||'';
  document.getElementById('kpi-obs').value       = k.obs||'';
  // Popula objetivos
  var objSel = document.getElementById('kpi-obj-link');
  objSel.innerHTML = '<option value="">— Sem vínculo —</option>';
  (S.objectives||[]).forEach(function(o,oi){
    var opt=document.createElement('option');
    opt.value=oi; opt.textContent=esc(o.desc.substring(0,60));
    if(k.objLink===oi) opt.selected=true;
    objSel.appendChild(opt);
  });
  // Campos históricos
  renderKPIHistInputs(k);
  openMod('kpi-modal');
}

function renderKPIHistInputs(k) {
  var wrap = document.getElementById('kpi-hist-inputs');
  if (!wrap) return;
  var year = new Date().getFullYear();
  var html = '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px">';
  for (var m = 0; m < 12; m++) {
    var key = periodKey(year, m);
    var val = k.data && k.data[key] !== undefined ? k.data[key] : '';
    html += '<div><label style="font-size:10px;color:var(--text2)">'+MONTHS_PT[m]+'/'+year+'</label>'
      + '<input type="number" step="any" id="kpi-hist-'+m+'" value="'+val+'" '
      + 'placeholder="—" style="width:100%;font-size:12px;padding:4px 6px"></div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
}

function saveKPI() {
  var name = document.getElementById('kpi-name').value.trim();
  if (!name) { alert('Informe o nome do indicador.'); return; }
  var year = new Date().getFullYear();
  var existingData = kpiEditIdx !== null && S.kpis[kpiEditIdx].data ? S.kpis[kpiEditIdx].data : {};
  for (var m = 0; m < 12; m++) {
    var el = document.getElementById('kpi-hist-'+m);
    if (el && el.value !== '') existingData[periodKey(year, m)] = parseFloat(el.value);
  }
  var objVal = document.getElementById('kpi-obj-link').value;
  var k = {
    name:name, type:document.getElementById('kpi-type').value,
    unit:document.getElementById('kpi-unit').value,
    formula:document.getElementById('kpi-formula').value,
    target:document.getElementById('kpi-target').value,
    direction:document.getElementById('kpi-direction').value,
    tolerance:parseFloat(document.getElementById('kpi-tolerance').value)||10,
    owner:document.getElementById('kpi-owner').value,
    freq:document.getElementById('kpi-freq').value,
    normRef:document.getElementById('kpi-norm-ref').value,
    source:document.getElementById('kpi-source').value,
    obs:document.getElementById('kpi-obs').value,
    objLink: objVal !== '' ? parseInt(objVal) : null,
    data: existingData,
    _open: kpiEditIdx !== null ? S.kpis[kpiEditIdx]._open : false,
    createdAt: new Date().toISOString().slice(0,10)
  };
  if (kpiEditIdx !== null) S.kpis[kpiEditIdx] = k;
  else S.kpis.push(k);
  closeMod('kpi-modal');
  renderKPIGrid();
}

function removeKPI(i) {
  if (!confirm('Remover o indicador "'+S.kpis[i].name+'"?')) return;
  S.kpis.splice(i,1);
  renderKPIGrid();
}

// ── Inserir valor do mês ─────────────────────────────────────────
function openKPIEntry(kpiIdx, key) {
  kpiEntryIdx = kpiIdx;
  var kpi = S.kpis[kpiIdx];
  if (!key) {
    var now = new Date();
    key = periodKey(now.getFullYear(), now.getMonth());
  }
  kpiEntryKey = key;
  var parts = key.split('-');
  var monthName = MONTHS_PT[parseInt(parts[1])-1] + '/' + parts[0];
  document.getElementById('kpi-entry-title').textContent = 'Inserir valor — ' + esc(kpi.name);
  var dirLabel = {lte:'Meta: reduzir para', gte:'Meta: atingir pelo menos', eq:'Meta: manter em'}[kpi.direction||'lte']||'Meta:';
  document.getElementById('kpi-entry-context').innerHTML =
    '<strong>Período:</strong> ' + monthName
    + ' &nbsp;|&nbsp; <strong>' + dirLabel + '</strong> ' + (kpi.target||'—') + ' ' + esc(kpi.unit||'')
    + (kpi.freq ? ' &nbsp;|&nbsp; Frequência: ' + kpi.freq : '')
    + (kpi.owner ? ' &nbsp;|&nbsp; 👤 ' + esc(kpi.owner) : '');
  var existing = kpi.data && kpi.data[key] !== undefined ? kpi.data[key] : '';
  document.getElementById('kpi-entry-val').value = existing;
  document.getElementById('kpi-entry-obs').value   = (kpi.dataObs  && kpi.dataObs[key])  || '';
  document.getElementById('kpi-entry-causa').value  = (kpi.dataCausa && kpi.dataCausa[key])  || '';
  document.getElementById('kpi-entry-acao').value   = (kpi.dataAcao && kpi.dataAcao[key])   || '';
  // Mostra/oculta painel de análise conforme valor existente
  checkKPIEntryAlert();
  // Adiciona listener no campo de valor para mostrar alerta em tempo real
  var valEl = document.getElementById('kpi-entry-val');
  valEl.oninput = checkKPIEntryAlert;
  openMod('kpi-entry-modal');
  setTimeout(function(){ valEl.focus(); }, 100);
}

function checkKPIEntryAlert() {
  var kpi = S.kpis[kpiEntryIdx];
  var val = parseFloat(document.getElementById('kpi-entry-val').value);
  var target = parseFloat(kpi.target);
  var panel = document.getElementById('kpi-entry-analysis');
  if (!panel) return;
  if (isNaN(val) || isNaN(target)) { panel.style.display='none'; return; }
  var tol = (parseFloat(kpi.tolerance)||10)/100;
  var dir = kpi.direction||'lte';
  var ok = dir==='lte' ? val<=target*(1+tol) : dir==='gte' ? val>=target*(1-tol) : Math.abs(val-target)/(target||1)<=tol;
  panel.style.display = ok ? 'none' : 'block';
}

function saveKPIEntry() {
  var val = document.getElementById('kpi-entry-val').value;
  if (val === '') { alert('Informe o valor medido.'); return; }
  // Verifica se painel de causa está visível e se a causa foi preenchida
  var panel = document.getElementById('kpi-entry-analysis');
  var causa = document.getElementById('kpi-entry-causa').value.trim();
  if (panel && panel.style.display !== 'none' && !causa) {
    if (!confirm('Valor fora da meta sem justificativa. Deseja salvar mesmo assim?')) return;
  }
  var obs   = document.getElementById('kpi-entry-obs').value.trim();
  var acao  = document.getElementById('kpi-entry-acao').value.trim();
  var kpi   = S.kpis[kpiEntryIdx];
  if (!kpi.data)       kpi.data = {};
  if (!kpi.dataObs)    kpi.dataObs = {};
  if (!kpi.dataCausa)  kpi.dataCausa = {};
  if (!kpi.dataAcao)   kpi.dataAcao = {};
  kpi.data[kpiEntryKey]      = parseFloat(val);
  kpi.dataObs[kpiEntryKey]   = obs;
  kpi.dataCausa[kpiEntryKey] = causa;
  kpi.dataAcao[kpiEntryKey]  = acao;
  kpi._open = true;
  closeMod('kpi-entry-modal');
  renderKPIGrid();
}

// ── Catálogo ─────────────────────────────────────────────────────
function openKPICatalog() {
  renderKPICatalogList();
  openMod('kpi-catalog-modal');
}

function renderKPICatalogList() {
  var q  = (document.getElementById('cat-kpi-search')||{value:''}).value.toLowerCase();
  var ft = (document.getElementById('cat-kpi-filter')||{value:'all'}).value;
  var el = document.getElementById('kpi-catalog-list');
  if (!el) return;
  var items = KPI_CATALOG.filter(function(c){
    if (ft !== 'all' && c.type !== ft) return false;
    return !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
  });
  var existingNames = S.kpis.map(function(k){return k.name.toLowerCase();});
  var nc = {env:'var(--green-d)',sst:'var(--blue-d)'};
  var nb = {env:'var(--green-l)',sst:'var(--blue-l)'};
  el.innerHTML = items.map(function(c) {
    var already = existingNames.indexOf(c.name.toLowerCase()) !== -1;
    return '<div class="kpi-cat-item" onclick="'+(already?'alert(\'Este indicador já está no seu painel.\')':'addFromCatalog(\''+c.code+'\')')+'">'
      + '<span class="kpi-cat-code" style="background:'+nb[c.type]+';color:'+nc[c.type]+'">'+c.code+'</span>'
      + '<div style="flex:1">'
      + '<div style="font-size:12px;font-weight:500;color:var(--text)">'+esc(c.name)+'</div>'
      + '<div style="font-size:11px;color:var(--text2)">'+esc(c.unit)+' &nbsp;|&nbsp; '+esc(c.normRef)+'</div>'
      + '</div>'
      + (already
          ? '<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:#e8f5ef;color:var(--green-d)">✓ Adicionado</span>'
          : '<button class="btn btn-sm" style="font-size:11px;white-space:nowrap">+ Adicionar</button>')
      + '</div>';
  }).join('') || '<div class="empty">Nenhum indicador encontrado.</div>';
}

function addFromCatalog(code) {
  var c = KPI_CATALOG.find(function(x){ return x.code === code; });
  if (!c) return;
  if (S.kpis.some(function(k){return k.name.toLowerCase()===c.name.toLowerCase();})) {
    alert('Este indicador já está no seu painel.'); return;
  }
  S.kpis.push(Object.assign({}, c, {data:{}, dataObs:{}, _open:false, createdAt:new Date().toISOString().slice(0,10), objLink:null}));
  renderKPICatalogList();
  renderKPIGrid();
}

// ── Importar CSV ─────────────────────────────────────────────────
function openKPIImport() { openMod('kpi-import-modal'); }

function exportKPITemplate() {
  var rows = ['sep=;'];
  rows.push('MODELO DE IMPORTACAO DE HISTORICO DE INDICADORES');
  rows.push('Preencha o valor de cada mes para cada indicador. Deixe em branco se nao houver dado.');
  rows.push('');
  var header = ['Codigo','Nome do Indicador','Tipo','Unidade'];
  var year = new Date().getFullYear();
  MONTHS_PT.forEach(function(m){ header.push(m+'/'+year); });
  rows.push(header.join(';'));
  S.kpis.forEach(function(k, i) {
    var row = ['KPI'+(i+1), k.name, k.type==='env'?'Ambiental':'SST', k.unit||''];
    for (var m = 0; m < 12; m++) {
      var key = periodKey(year, m);
      row.push(k.data && k.data[key] !== undefined ? k.data[key] : '');
    }
    rows.push(row.join(';'));
  });
  // Template em branco para novos
  KPI_CATALOG.forEach(function(c) {
    if (S.kpis.some(function(k){return k.name===c.name;})) return;
    var row = [c.code, c.name, c.type==='env'?'Ambiental':'SST', c.unit];
    for (var m = 0; m < 12; m++) row.push('');
    rows.push(row.join(';'));
  });
  var blob = new Blob([rows.join('\r\n')], {type:'text/csv;charset=utf-8'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'SGI_KPIs_Historico_'+new Date().getFullYear()+'.csv'; a.click();
}

function importKPICSV(input) {
  var file = input.files[0]; if(!file) return;
  var status = document.getElementById('kpi-import-status');
  status.innerHTML = 'Lendo arquivo...';
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var text = e.target.result.replace(/^\uFEFF/,'');
      var lines = text.split(/\r?\n/);
      var imported = 0, updated = 0;
      var headerLine = null;
      lines.forEach(function(line) {
        var trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('sep=') || trimmed.startsWith('MODELO') || trimmed.startsWith('Preencha')) return;
        var cols = trimmed.split(';');
        // Detecta linha de cabeçalho
        if (cols[0]==='Codigo' || cols[0]==='Código') { headerLine = cols; return; }
        if (!headerLine) return;
        var code = cols[0].trim(), name = cols[1].trim(), type = cols[2].trim(), unit = cols[3].trim();
        if (!name) return;
        // Encontra ou cria o KPI
        var existing = S.kpis.find(function(k){
          return k.name.toLowerCase()===name.toLowerCase() || (code && k.name.toLowerCase().startsWith(code.toLowerCase()));
        });
        if (!existing) {
          var catItem = KPI_CATALOG.find(function(c){return c.code===code||c.name.toLowerCase()===name.toLowerCase();});
          existing = catItem ? Object.assign({},catItem,{data:{},dataObs:{},_open:false,createdAt:new Date().toISOString().slice(0,10),objLink:null}) : {name:name,type:type==='Ambiental'?'env':'sst',unit:unit,data:{},dataObs:{},_open:false,createdAt:new Date().toISOString().slice(0,10)};
          S.kpis.push(existing);
          imported++;
        } else { updated++; }
        // Insere dados históricos (cols 4 em diante = meses)
        var year = new Date().getFullYear();
        for (var ci = 4; ci < cols.length && (ci-4) < 12; ci++) {
          var v = cols[ci].trim();
          if (v !== '') existing.data[periodKey(year, ci-4)] = parseFloat(v.replace(',','.'));
        }
      });
      input.value='';
      status.innerHTML = '<span style="color:var(--green-d);font-weight:500">OK: '+imported+' criado(s), '+updated+' atualizado(s).</span>';
      renderKPIGrid();
    } catch(err) {
      status.innerHTML = '<span style="color:var(--red)">Erro: '+err.message+'</span>';
    }
  };
  reader.readAsText(file,'cp1252');
}

// ── Exportar relatório ───────────────────────────────────────────
function exportKPIReport() {
  var org  = document.getElementById('org-name').value || 'SGI';
  var year = (document.getElementById('kpi-year')||{value:new Date().getFullYear()}).value;
  var rows = ['sep=;'];
  rows.push('RELATORIO DE MONITORAMENTO DE INDICADORES - '+org);
  rows.push('Periodo: '+year+' | Gerado em: '+new Date().toLocaleString('pt-BR'));
  rows.push('');
  var header = ['Indicador','Tipo','Unidade','Meta','Direcao','Status atual'];
  MONTHS_PT.forEach(function(m){ header.push(m+'/'+year); });
  header.push('Responsavel','Referencia Normativa');
  rows.push(header.join(';'));
  S.kpis.forEach(function(k) {
    var sem = calcSemaphore(k);
    var row = [k.name, k.type==='env'?'Ambiental':'SST', k.unit||'', k.target||'',
      {lte:'Menor ou igual',gte:'Maior ou igual',eq:'Igual'}[k.direction]||'',
      sem.label];
    for (var m = 0; m < 12; m++) {
      var key = periodKey(year, m);
      row.push(k.data&&k.data[key]!==undefined ? k.data[key] : '');
    }
    row.push(k.owner||'', k.normRef||'');
    rows.push(row.join(';'));
  });
  var blob = new Blob([rows.join('\r\n')],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='SGI_Relatorio_KPI_'+year+'.csv'; a.click();
}

// ── Help KPI ─────────────────────────────────────────────────────
HELP_CONTENT['s9'] = {
  title: 'Orientacoes — Clausula 9.1: Indicadores de Desempenho',
  body: '<h4>O que a norma exige?</h4>'
    + '<p>A ISO 14001 e 45001 §9.1.1 exigem que a organizacao monitore, meca, analise e avalie seu desempenho de forma sistematica.</p>'
    + '<h4>Como usar o semaforo</h4>'
    + '<p>Verde = na meta | Amarelo = dentro da tolerancia (padrao 10%) | Vermelho = fora da meta | Cinza = sem dados inseridos</p>'
    + '<h4>Tendencia</h4>'
    + '<p>A seta mostra a direcao em relacao ao mes anterior. Para indicadores de reducao (TF, residuos), seta para baixo e positivo. Para indicadores de aumento (reciclagem, treinamentos), seta para cima e positivo.</p>'
    + '<h4>Dica de auditoria</h4>'
    + '<div class="warn">O auditor vai perguntar: De onde vem esse dado? Quem coleta? Com que frequencia? Preencha sempre a Fonte dos dados e o Responsavel pelo monitoramento.</div>'
};

// Integra com buildAgentPrompt


// ═══════════════════════════════════════════════════════════════════
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
