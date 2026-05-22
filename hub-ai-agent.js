// Hub SGI — hub-ai-agent.js
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
// 