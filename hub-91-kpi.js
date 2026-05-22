// Hub SGI — hub-91-kpi.js
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
// 