// Hub SGI — hub-sgi-core.js


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
    {id:'community', name:'Comunidade local', needs:['Ausência de contaminação de solo e água','Conformidade com limites de ruído e emissões'], exps:['Participação em projetos socioambientais locais','Transparência sobre as atividades da empresa'], norm:'env', inf:3, int:3, obrig:'parcial', sel:false},
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
      +(p.obrig==='sim'?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:#e8f5ef;color:var(--green-d)">Obrigação conf.</span>':p.obrig==='parcial'?'<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:var(--amber-l);color:var(--amber-d)">Parcial</span>':'')
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
  S.pi.push({
    id:'c'+Date.now(), name:nm,
    needs:needs.length?needs:['(não especificado)'],
    exps:exps.length?exps:['(não especificado)'],
    norm:document.getElementById('pi-norm').value,
    inf:parseInt(document.getElementById('pi-inf').value),
    int:parseInt(document.getElementById('pi-int').value),
    obrig:document.getElementById('pi-obrig').value,
    group: grpEl&&grpEl.value?grpEl.value:undefined,
    sel:true
  });
  closeMod('pi-modal'); renderPI();
}

// ASPECTOS
var apF='all';
function openAPModal(){openMod('ap-modal');}
function saveAP(){
  var proc=document.getElementById('ap-proc').value.trim();
  var asp=document.getElementById('ap-asp').value.trim();
  if(!proc||!asp){alert('Preencha processo e aspecto/perigo.');return;}
  var p=parseInt(document.getElementById('ap-prob').value);
  var s=parseInt(document.getElementById('ap-sev').value);
  var sc=p*s;
  var catCodeVal = document.getElementById('ap-asp-code').textContent || '';
  S.apItems.push({type:document.getElementById('ap-type').value,proc:proc,asp:asp,imp:document.getElementById('ap-imp').value,cond:document.getElementById('ap-cond').value,prob:p,sev:s,score:sc,cls:sc<=4?'low':sc<=9?'med':sc<=16?'high':'crit',catCode:catCodeVal});
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
  S.roItems.push({type:document.getElementById('ro-type').value,norm:document.getElementById('ro-norm').value,desc:desc,src:document.getElementById('ro-src').value,prob:p,sev:s,score:sc,cls:sc<=4?'low':sc<=9?'med':sc<=16?'high':'crit',action:document.getElementById('ro-action').value,origin:document.getElementById('ro-origin').value,autoGen:false});
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
// 