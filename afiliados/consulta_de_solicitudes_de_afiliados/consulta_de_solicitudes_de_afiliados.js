// =====================
// Helpers safe
// =====================
function $(id){ return document.getElementById(id); }
function on(id, evt, fn){
  const el = $(id);
  if(!el) return;
  el.addEventListener(evt, fn);
}

// Stubs sidebar
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
// Storage
// =====================
const STORAGE_KEY = 'afpnet_afiliacion_masiva';

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

  // init view
  hideTable();
  setMsg('No se encontraron resultados en la búsqueda.');
});

// =====================
function updClk(){
  if(!$('tb-time')) return;
  const n = new Date();
  $('tb-time').innerHTML =
    n.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}) +
    '<br>' + n.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
}

function wireSidebar(){
  const sb = $('sb');
  const mc = $('mc');
  const sov = $('sov');
  const btn = $('btn-tog');
  if(btn){
    btn.onclick = () => {
      if(!sb) return;
      if(innerWidth<=768){ sb.classList.toggle('mob'); sov?.classList.toggle('vis'); }
      else { sb.classList.toggle('collapsed'); mc?.classList.toggle('exp'); }
    };
  }
  if(sov){
    sov.onclick = () => { sb?.classList.remove('mob'); sov.classList.remove('vis'); };
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
// Mode enable/disable
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

  // solo numeros si es DNI
  on('inp-numdoc','input', function(){
    const tipo = $('sel-tipodoc')?.value || '';
    if(!tipo || tipo === 'DNI'){
      this.value = this.value.replace(/[^0-9]/g,'');
    }
  });
}

// =====================
// Load data from afiliacion masiva and create "solicitudes"
// =====================
function loadBase(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    const arr = JSON.parse(raw);
    if(!Array.isArray(arr)) return [];
    return arr;
  }catch(_){ return []; }
}

// Para esta pantalla: generamos campos de solicitud (simulados) pero estables
function toSolicitudes(baseArr){
  return baseArr.map((r, idx) => {
    // En afiliación masiva no guardaste tipo doc, entonces lo asumimos DNI
    const tipodoc = r.tipodoc || 'DNI';

    // codigo carga: si viene, usa; si no, genera uno estable por idx
    const codigo_carga = r.codigo_carga || `CM-${new Date().getFullYear()}-${String(idx+1).padStart(4,'0')}`;

    // estados: si vienen, usa; sino asigna por patrón
    const estados = ['REGISTRADA','OBSERVADA','APROBADA','RECHAZADA'];
    const preest = ['SIN_PRE','PRE_REGISTRADA','PRE_OBSERVADA'];

    const estado_solicitud = r.estado_solicitud || estados[idx % estados.length];
    const estado_pre = r.estado_pre || preest[idx % preest.length];

    return {
      codigo_carga,
      estado_solicitud,
      estado_pre,
      tipodoc,
      nro_documento: String(r.nro_documento || '').trim(),
      apellido_paterno: String(r.apellido_paterno || '').trim(),
      apellido_materno: String(r.apellido_materno || '').trim(),
      nombres: String(r.nombres || '').trim(),
      ruc: String(r.ruc || '').trim(),
      razon_social: String(r.razon_social || '').trim(),
      usuario_agente: String(r.usuario_agente || '').trim(),
      origen_onp: String(r.origen_onp || '').trim(),
      fecha_nacimiento: String(r.fecha_nacimiento || '').trim(),
      mail_principal: String(r.mail_principal || '').trim(),
    };
  });
}

function norm(s){ return String(s||'').trim().toUpperCase().replace(/\s+/g,' '); }
function esc(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}

// =====================
// Search
// =====================
let lastResults = [];

function onBuscar(){
  hideE(); hideOK();
  hideTable();
  setMsg('Buscando...');

  const btn = $('btn-buscar');
  btn?.classList.add('loading'); if(btn) btn.disabled = true;

  try{
    const base = loadBase();
    if(base.length === 0){
      setMsg('No hay solicitudes guardadas. Primero carga un Excel en "Afiliación Masiva".');
      showE('No se encontró data en localStorage para afiliación masiva.');
      return;
    }

    const data = toSolicitudes(base);

    // filtros generales
    const fEstadoSol = ($('sel-estado-sol')?.value || '').trim();
    const fEstadoPre = ($('sel-estado-pre')?.value || '').trim();
    const fCodCarga  = ($('inp-cod-carga')?.value || '').trim().toUpperCase();

    let filtered = data.filter(x => {
      if(fEstadoSol && x.estado_solicitud !== fEstadoSol) return false;
      if(fEstadoPre && x.estado_pre !== fEstadoPre) return false;
      if(fCodCarga && !String(x.codigo_carga).toUpperCase().includes(fCodCarga)) return false;
      return true;
    });

    // modo doc / nombres
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
      setMsg('No se encontraron resultados en la búsqueda.');
      showOK('Búsqueda finalizada. 0 resultados.');
      return;
    }

    renderTable(filtered);
    setMsg(`Se encontraron ${filtered.length} resultado${filtered.length>1?'s':''}.`);
    showOK(`Búsqueda OK. Resultados: ${filtered.length}.`);
  }catch(err){
    console.error(err);
    setMsg('No se encontraron resultados en la búsqueda.');
    showE(err?.message ? `Error: ${err.message}` : 'Error en búsqueda.');
  }finally{
    btn?.classList.remove('loading'); if(btn) btn.disabled = false;
  }
}

// =====================
// Render
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
      <td style="font-weight:800">${esc(x.codigo_carga)}</td>
      <td><span class="pill p-${esc(x.estado_solicitud)}">${esc(x.estado_solicitud)}</span></td>
      <td><span class="pill p-pre">${esc(x.estado_pre)}</span></td>
      <td>${esc(x.tipodoc)}</td>
      <td style="font-weight:800">${esc(x.nro_documento)}</td>
      <td>${esc(x.apellido_paterno)}</td>
      <td>${esc(x.apellido_materno)}</td>
      <td>${esc(x.nombres)}</td>
      <td>${esc(x.ruc)}</td>
      <td>${esc(x.razon_social)}</td>
      <td>${esc(x.usuario_agente)}</td>
      <td>${esc(x.origen_onp)}</td>
      <td>${esc(x.fecha_nacimiento)}</td>
      <td>${esc(x.mail_principal)}</td>
    `;
    tbody.appendChild(tr);
  });

  showTable();
  $('results')?.classList.add('vis');
  $('results')?.scrollIntoView({behavior:'smooth', block:'start'});
}

// =====================
// Download Excel
// =====================
function onDescargar(){
  hideE(); hideOK();

  if(!lastResults || lastResults.length === 0){
    showE('No hay resultados para descargar. Primero realiza una búsqueda.');
    return;
  }
  if(typeof XLSX === 'undefined'){
    showE('XLSX no está disponible (CDN).');
    return;
  }

  const aoa = [];
  aoa.push([
    'CodigoCarga','EstadoSolicitud','EstadoPre','TipoDoc','NroDoc','ApellidoPaterno','ApellidoMaterno','Nombres',
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

  showOK('Archivo descargado.');
}