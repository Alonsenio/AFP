// consulta_de_solicitudes_de_afiliados.js

// =====================
// Helpers
// =====================
function $(id){ return document.getElementById(id); }
function on(id, evt, fn){
  const el = $(id);
  if(!el) return;
  el.addEventListener(evt, fn);
}

// =====================
// Stubs sidebar.php
// =====================
function setActive(){}
function togSub(el){
  const sub=el?.nextElementSibling; if(!sub) return;
  const op=sub.classList.contains('open');
  document.querySelectorAll('.submenu.open').forEach(s=>{
    if(s!==sub){ s.classList.remove('open'); s.previousElementSibling?.classList.remove('open'); }
  });
  if(!op){ sub.classList.add('open'); el.classList.add('open'); }
  else { sub.classList.remove('open'); el.classList.remove('open'); }
}
function cerrarSesion(){ sessionStorage.clear(); location.href='../../login/login.php'; }

// =====================
// Topbar session
// =====================
const userRUC = sessionStorage.getItem('afpnet_ruc') || '20603401574';
const uName = sessionStorage.getItem('afpnet_nombre') || sessionStorage.getItem('afpnet_usuario') || 'Usuario';
const uPerfil = 'Administrador';

// =====================
// STORAGE KEY — debe ser la misma que usa afiliacion_masiva.js
// =====================
const BATCHES_KEY = 'afpnet_afiliacion_masiva_batches';

// =====================
// INIT
// =====================
window.addEventListener('DOMContentLoaded', () => {
  const dn = String(uName).trim() || 'Usuario';
  $('w-name') && ($('w-name').textContent = dn);
  $('u-name') && ($('u-name').textContent = dn);
  $('u-init') && ($('u-init').textContent = (dn.substring(0,2) || 'U').toUpperCase());
  $('w-perfil') && ($('w-perfil').textContent = uPerfil);
  $('tb-ruc') && ($('tb-ruc').textContent = userRUC);
  $('tb-razon') && ($('tb-razon').textContent = 'EMPRESA S.A.C.');
  updClk(); setInterval(updClk, 1000);

  wireSidebar();
  setupMode();

  on('btn-buscar','click', onBuscar);
  on('btn-descargar','click', onDescargar);
  on('btn-guia','click', () => alert('Aquí abrirás tu guía de uso.'));

  hideTable();
  setMsg('Ingrese un Código de Carga Masiva y presione BUSCAR para consultar los estados.');

  // Si hay batches, mostrar los códigos disponibles como ayuda
  mostrarCodigosDisponibles();
});

function updClk(){
  if(!$('tb-time')) return;
  const n = new Date();
  $('tb-time').innerHTML =
    n.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}) +
    '<br>' + n.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
}

function wireSidebar(){
  var sb = document.getElementById('sb');
  var mc = document.getElementById('mc');
  var sov = document.getElementById('sov');
  var btnTog = document.getElementById('btn-tog') || document.querySelector('.btn-menu');

  if(btnTog){
    btnTog.onclick = function(){
      if(!sb) return;
      if(innerWidth<=768){ sb.classList.toggle('mob'); if(sov) sov.classList.toggle('vis'); }
      else { sb.classList.toggle('collapsed'); if(mc) mc.classList.toggle('exp'); }
    };
  }
  if(sov){
    sov.onclick = function(){ if(sb) sb.classList.remove('mob'); sov.classList.remove('vis'); };
  }
}

// =====================
// Messages
// =====================
function showE(m){ hideOK(); $('m-err-t') && ($('m-err-t').textContent=m); $('m-err')?.classList.add('vis'); }
function hideE(){ $('m-err')?.classList.remove('vis'); }
function showOK(m){ hideE(); $('m-ok-t') && ($('m-ok-t').textContent=m); $('m-ok')?.classList.add('vis'); }
function hideOK(){ $('m-ok')?.classList.remove('vis'); }

// =====================
// Mode enable/disable (doc vs nombres)
// =====================
function setupMode(){
  const setMode = () => {
    const mode = document.querySelector('input[name="modo"]:checked')?.value || 'doc';
    const docOn = mode === 'doc';
    const nomOn = mode === 'nom';

    $('sel-tipodoc') && ($('sel-tipodoc').disabled = !docOn);
    $('inp-numdoc') && ($('inp-numdoc').disabled = !docOn);

    $('inp-appat') && ($('inp-appat').disabled = !nomOn);
    $('inp-apmat') && ($('inp-apmat').disabled = !nomOn);
    $('inp-nombres') && ($('inp-nombres').disabled = !nomOn);

    if(!docOn){
      $('sel-tipodoc') && ($('sel-tipodoc').value = '');
      $('inp-numdoc') && ($('inp-numdoc').value = '');
    }
    if(!nomOn){
      $('inp-appat') && ($('inp-appat').value = '');
      $('inp-apmat') && ($('inp-apmat').value = '');
      $('inp-nombres') && ($('inp-nombres').value = '');
    }
  };

  document.querySelectorAll('input[name="modo"]').forEach(r => r.addEventListener('change', setMode));
  setMode();

  on('inp-numdoc','input', function(){
    const tipo = $('sel-tipodoc')?.value || '';
    if(!tipo || tipo === 'DNI'){
      this.value = this.value.replace(/[^0-9]/g,'');
    }
  });
}

// =====================
// Utils
// =====================
function norm(s){ return String(s||'').trim().toUpperCase().replace(/\s+/g,' '); }
function esc(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}

// =====================
// Colores para badges de estado
// =====================
function badgeEstado(estado){
  const colors = {
    'REGISTRADA':  { bg:'#e8f0fe', color:'#1a56db', border:'#93b4f5' },
    'OBSERVADA':   { bg:'#fef3cd', color:'#856404', border:'#f0d77c' },
    'APROBADA':    { bg:'#d4edda', color:'#155724', border:'#82cfab' },
    'RECHAZADA':   { bg:'#f8d7da', color:'#721c24', border:'#f1a7ad' },
  };
  const c = colors[estado] || { bg:'#f0f0f0', color:'#333', border:'#ccc' };
  return `<span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;
    background:${c.bg};color:${c.color};border:1px solid ${c.border}">${esc(estado || '-')}</span>`;
}

function badgeEstadoPre(estado){
  const colors = {
    'SIN_PRE':        { bg:'#f0f0f0', color:'#666', border:'#ccc' },
    'PRE_REGISTRADA': { bg:'#e8f0fe', color:'#1a56db', border:'#93b4f5' },
    'PRE_OBSERVADA':  { bg:'#fef3cd', color:'#856404', border:'#f0d77c' },
  };
  const c = colors[estado] || { bg:'#f0f0f0', color:'#333', border:'#ccc' };
  const label = (estado || '-').replace(/_/g,' ');
  return `<span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;
    background:${c.bg};color:${c.color};border:1px solid ${c.border}">${esc(label)}</span>`;
}

// =====================
// Leer batches desde localStorage (misma key que afiliacion_masiva)
// =====================
function loadBatches(){
  try{
    const raw = localStorage.getItem(BATCHES_KEY);
    if(!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  }catch(_){ return []; }
}

// =====================
// Aplanar batches → solicitudes individuales con estado por persona
// Compatible con formato viejo (nroDoc/appat/apmat) y nuevo (nro_documento/apellido_paterno/apellido_materno)
// =====================
function buildSolicitudes(batches){
  var out = [];
  batches.forEach(function(batch){
    // codigo_carga: formato nuevo = batch.codigo_carga, formato viejo = batch.codigo
    var codigo = batch.codigo_carga || batch.codigo || '';
    (batch.registros || []).forEach(function(r){
      out.push({
        codigo_carga:     r.codigo_carga || codigo,
        estado_solicitud: r.estado_solicitud || batch.estado_solicitud || 'REGISTRADA',
        estado_pre:       r.estado_pre || batch.estado_pre || 'SIN_PRE',
        tipodoc:          r.tipodoc || 'DNI',
        nro_documento:    String(r.nro_documento || r.nroDoc || '').trim(),
        apellido_paterno: String(r.apellido_paterno || r.appat || '').trim(),
        apellido_materno: String(r.apellido_materno || r.apmat || '').trim(),
        nombres:          String(r.nombres || '').trim(),
        ruc:              String(r.ruc || batch.ruc || '').trim(),
        razon_social:     String(r.razon_social || batch.razon_social || batch.razon || '').trim(),
        usuario_agente:   String(r.usuario_agente || batch.usuario_agente || batch.usuario || '').trim(),
        origen_onp:       String(r.origen_onp || r.origenONP || '').trim(),
        fecha_nacimiento: String(r.fecha_nacimiento || r.fechaNac || '').trim(),
        mail_principal:   String(r.mail_principal || r.email || '').trim(),
      });
    });
  });
  return out;
}

// =====================
// Mostrar códigos disponibles como ayuda visual
// =====================
function mostrarCodigosDisponibles(){
  const batches = loadBatches();
  if(batches.length === 0) return;

  const codigos = batches.map(b => b.codigo_carga || b.codigo).filter(Boolean);
  if(codigos.length === 0) return;

  // Agregar hint debajo del campo de código
  const hint = document.querySelector('#inp-cod-carga + .hint');
  if(hint){
    hint.innerHTML =
      'Códigos disponibles: ' +
      codigos.map(c =>
        `<span class="cod-chip" style="display:inline-block;padding:2px 8px;margin:2px;border-radius:10px;
          background:#e8edf8;color:#1c3997;font-weight:700;font-size:11px;cursor:pointer"
          onclick="document.getElementById('inp-cod-carga').value='${esc(c)}'">${esc(c)}</span>`
      ).join(' ');
  }
}

// =====================
// BUSCAR
// =====================
let lastResults = [];

function onBuscar(){
  hideE(); hideOK();
  hideTable();
  setMsg('Buscando...');

  const btn = $('btn-buscar');
  btn?.classList.add('loading'); if(btn) btn.disabled = true;

  try{
    const batches = loadBatches();

    if(batches.length === 0){
      setMsg('No hay solicitudes guardadas. Primero realice una carga en "Afiliación Masiva".');
      showE('No se encontró data. Vaya a Afiliación Masiva y cargue un archivo primero.');
      return;
    }

    const data = buildSolicitudes(batches);

    // ===== Filtros =====
    const fEstadoSol = ($('sel-estado-sol')?.value || '').trim();
    const fEstadoPre = ($('sel-estado-pre')?.value || '').trim();
    const fCodCarga  = ($('inp-cod-carga')?.value || '').trim().toUpperCase();

    let filtered = data.filter(x => {
      // Filtro por estado de solicitud
      if(fEstadoSol && x.estado_solicitud !== fEstadoSol) return false;
      // Filtro por estado de pre-solicitud
      if(fEstadoPre && x.estado_pre !== fEstadoPre) return false;
      // Filtro por código de carga (búsqueda parcial)
      if(fCodCarga && !String(x.codigo_carga).toUpperCase().includes(fCodCarga)) return false;
      return true;
    });

    // ===== Filtro por documento o nombres =====
    const mode = document.querySelector('input[name="modo"]:checked')?.value || 'doc';

    if(mode === 'doc'){
      const tipo = ($('sel-tipodoc')?.value || '').trim();
      const num  = ($('inp-numdoc')?.value || '').trim();
      if(tipo || num){
        filtered = filtered.filter(x => {
          const okTipo = !tipo || x.tipodoc === tipo;
          const okNum  = !num  || String(x.nro_documento).includes(num);
          return okTipo && okNum;
        });
      }
    }else{
      const a1 = norm($('inp-appat')?.value || '');
      const a2 = norm($('inp-apmat')?.value || '');
      const nm = norm($('inp-nombres')?.value || '');
      if(a1 || a2 || nm){
        filtered = filtered.filter(x => {
          let ok = true;
          if(a1) ok = ok && norm(x.apellido_paterno).includes(a1);
          if(a2) ok = ok && norm(x.apellido_materno).includes(a2);
          if(nm) ok = ok && norm(x.nombres).includes(nm);
          return ok;
        });
      }
    }

    lastResults = filtered;

    if(filtered.length === 0){
      setMsg('No se encontraron resultados con los filtros aplicados.');
      showOK('Búsqueda finalizada. 0 resultados.');
      return;
    }

    // ===== Resumen de estados =====
    const resumen = {};
    filtered.forEach(x => {
      resumen[x.estado_solicitud] = (resumen[x.estado_solicitud] || 0) + 1;
    });
    const resumenTxt = Object.entries(resumen).map(([k,v]) => `${k}: ${v}`).join(' | ');

    renderTable(filtered);
    setMsg(`Se encontraron ${filtered.length} resultado(s). [ ${resumenTxt} ]`);
    showOK(`Búsqueda OK — ${filtered.length} registro(s) encontrados.`);
  }catch(err){
    console.error(err);
    setMsg('Error en la búsqueda.');
    showE(err?.message ? `Error: ${err.message}` : 'Error en búsqueda.');
  }finally{
    btn?.classList.remove('loading'); if(btn) btn.disabled = false;
  }
}

// =====================
// Render tabla con badges de estado por persona
// =====================
function setMsg(msg){
  $('res-msg') && ($('res-msg').textContent = msg);
  $('results')?.classList.add('vis');
}
function hideTable(){
  $('tbl-wrap') && ($('tbl-wrap').style.display = 'none');
}
function showTable(){
  $('tbl-wrap') && ($('tbl-wrap').style.display = 'block');
}

function renderTable(arr){
  const tbody = $('res-body');
  if(!tbody){ showE('No existe #res-body en el HTML.'); return; }

  tbody.innerHTML = '';
  arr.forEach(x => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:800;color:#1c3997">${esc(x.codigo_carga || '-')}</td>
      <td>${badgeEstado(x.estado_solicitud)}</td>
      <td>${badgeEstadoPre(x.estado_pre)}</td>
      <td>${esc(x.tipodoc || '-')}</td>
      <td style="font-weight:800">${esc(x.nro_documento || '-')}</td>
      <td>${esc(x.apellido_paterno || '-')}</td>
      <td>${esc(x.apellido_materno || '-')}</td>
      <td>${esc(x.nombres || '-')}</td>
      <td>${esc(x.ruc || '-')}</td>
      <td>${esc(x.razon_social || '-')}</td>
      <td>${esc(x.usuario_agente || '-')}</td>
      <td>${esc(x.origen_onp || '-')}</td>
      <td>${esc(x.fecha_nacimiento || '-')}</td>
      <td>${esc(x.mail_principal || '-')}</td>
    `;
    tbody.appendChild(tr);
  });

  showTable();
  $('results')?.classList.add('vis');
  $('results')?.scrollIntoView({behavior:'smooth', block:'start'});
}

// =====================
// Descargar Excel
// =====================
function onDescargar(){
  hideE(); hideOK();

  if(!lastResults || lastResults.length === 0){
    showE('No hay resultados para descargar. Primero realice una búsqueda.');
    return;
  }
  if(typeof XLSX === 'undefined'){
    showE('XLSX no está disponible (CDN).');
    return;
  }

  const aoa = [];
  aoa.push([
    'CodigoCarga','EstadoSolicitud','EstadoPre','TipoDoc','NroDoc',
    'ApellidoPaterno','ApellidoMaterno','Nombres',
    'RUC','RazonSocial','UsuarioAgente','OrigenONP','FechaNacimiento','Email'
  ]);

  lastResults.forEach(x => {
    aoa.push([
      x.codigo_carga, x.estado_solicitud, x.estado_pre, x.tipodoc, x.nro_documento,
      x.apellido_paterno, x.apellido_materno, x.nombres,
      x.ruc, x.razon_social, x.usuario_agente, x.origen_onp,
      x.fecha_nacimiento, x.mail_principal
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Solicitudes');
  XLSX.writeFile(wb, `solicitudes_afiliacion_${new Date().toISOString().slice(0,10)}.xlsx`);

  showOK('Archivo Excel descargado.');
}