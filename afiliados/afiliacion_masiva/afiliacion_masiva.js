// afiliacion_masiva.js

// =====================
// Helpers
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

// ===== TOPBAR SESSION =====
const userRUC = sessionStorage.getItem('afpnet_ruc') || '20603401574';
const uName = sessionStorage.getItem('afpnet_nombre') || sessionStorage.getItem('afpnet_usuario') || 'Usuario';
const uPerfil = 'Administrador';

// ===== STORAGE =====
const BATCHES_KEY = 'afpnet_afiliacion_masiva_batches';

// ===== UI INIT =====
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

  on('btn-cargar','click', onCargar);
  on('btn-export','click', exportExcelUltimoLote);
  on('btn-clear','click', clearSaved);
  on('btn-guia','click', () => alert('Aquí abrirás tu guía de uso.'));
  on('lnk-modelo','click', (e) => { e.preventDefault(); descargarModelo(); });

  renderUltimoLote();
});

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

// ===== Messages =====
function showE(m){ hideOK(); $('m-err-t') && ($('m-err-t').textContent=m); $('m-err')?.classList.add('vis'); }
function hideE(){ $('m-err')?.classList.remove('vis'); }
function showOK(m){ hideE(); $('m-ok-t') && ($('m-ok-t').textContent=m); $('m-ok')?.classList.add('vis'); }
function hideOK(){ $('m-ok')?.classList.remove('vis'); }

// ===== Utils =====
function esc(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}
function norm(s){ return String(s||'').trim(); }

// ===================================================================
// Genera CM-YYYY-0001 incremental por año (único y consistente)
// ===================================================================
function genCodigoCarga(){
  const year = new Date().getFullYear();
  const key = `afpnet_cm_counter_${year}`;
  const last = parseInt(localStorage.getItem(key) || '0', 10);
  const next = last + 1;
  localStorage.setItem(key, String(next));
  return `CM-${year}-${String(next).padStart(4,'0')}`;
}

// ===================================================================
// Asigna un estado simulado individual a cada registro
// Esto permite que en Consulta se vean estados variados por persona
// ===================================================================
function asignarEstadoIndividual(){
  const estados = ['REGISTRADA','REGISTRADA','REGISTRADA','OBSERVADA','APROBADA'];
  return estados[Math.floor(Math.random() * estados.length)];
}
function asignarEstadoPre(){
  const estados = ['SIN_PRE','SIN_PRE','PRE_REGISTRADA','PRE_OBSERVADA'];
  return estados[Math.floor(Math.random() * estados.length)];
}

// ===== LocalStorage batches =====
function loadBatches(){
  try{
    const raw = localStorage.getItem(BATCHES_KEY);
    if(!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  }catch(_){ return []; }
}
function saveBatches(arr){
  localStorage.setItem(BATCHES_KEY, JSON.stringify(arr));
}

// ===== Parse file (.xlsx/.xls/.csv/.txt) =====
async function readFileToRows(file){
  const ext = (file.name.split('.').pop() || '').toLowerCase();

  if(ext === 'txt'){
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
    return lines.map(l => l.split('|').map(x => String(x ?? '').trim()));
  }

  if(ext === 'csv'){
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
    return lines.map(l => {
      const sep = l.includes('\t') ? '\t' : ',';
      return l.split(sep).map(x => String(x ?? '').trim());
    });
  }

  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = (e)=>{
      try{
        if(typeof XLSX === 'undefined'){
          reject(new Error('La librería XLSX no cargó (CDN).'));
          return;
        }
        const buf = e.target.result;
        if(!buf){ reject(new Error('No se pudo leer el archivo.')); return; }
        const u8 = new Uint8Array(buf);
        const wb = XLSX.read(u8, { type:'array', dense:true, cellDates:true });
        if(!wb.SheetNames || wb.SheetNames.length === 0){
          reject(new Error('El Excel no contiene hojas.'));
          return;
        }
        for(const name of wb.SheetNames){
          const ws = wb.Sheets[name];
          if(!ws) continue;
          const aoa = XLSX.utils.sheet_to_json(ws, { header:1, raw:false });
          const cleaned = (aoa || [])
            .filter(r => Array.isArray(r) && r.some(c => String(c ?? '').trim() !== ''))
            .map(r => r.map(c => String(c ?? '').trim()));
          if(cleaned.length > 0){ resolve(cleaned); return; }
        }
        reject(new Error('No se encontró data en ninguna hoja.'));
      }catch(_){
        reject(new Error('Excel inválido o no soportado. Guárdalo como .xlsx.'));
      }
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsArrayBuffer(file);
  });
}

// ===== Normalización según formato =====
function normalizeRows(rows){
  const first = (rows?.[0] || []).join(' ').toLowerCase();
  const start = (first.includes('document') || first.includes('nro') || first.includes('apellido') || first.includes('nombres')) ? 1 : 0;

  const out = [];
  for(let i=start;i<rows.length;i++){
    const r = rows[i] || [];
    const nro_documento = norm(r[0]);
    const nombres = norm(r[1]);
    const apellido_paterno = norm(r[2]);
    const apellido_materno = norm(r[3]);

    if(!nro_documento && !nombres && !apellido_paterno && !apellido_materno) continue;

    out.push({
      tipodoc: 'DNI',
      nro_documento,
      nombres,
      apellido_paterno,
      apellido_materno,
      fecha_nacimiento: norm(r[4]),
      mail_principal: norm(r[5]),
      tel_fijo: norm(r[6]),
      tel_movil: norm(r[7]),
      ubigeo: norm(r[8]),
      tipo_via: norm(r[9]),
      nombre_via: norm(r[10]),
      ruc: norm(r[11]) || userRUC,
      razon_social: norm(r[12]) || 'EMPRESA S.A.C.',
      usuario_agente: norm(r[13]) || (String(uName).trim() || 'Usuario'),
      origen_onp: norm(r[14]) || '0',
    });
  }
  return out;
}

// ===== Cargar y guardar lote =====
let lastBatch = null;

async function onCargar(){
  hideE(); hideOK();
  $('results')?.classList.remove('vis');
  if($('results')) $('results').style.display = 'none';

  const file = $('file')?.files?.[0];
  if(!file){ showE('Debe seleccionar un archivo (.txt, .xls, .xlsx, .csv)'); return; }

  const btn = $('btn-cargar');
  btn?.classList.add('loading'); if(btn) btn.disabled = true;

  try{
    const rows = await readFileToRows(file);
    const registros = normalizeRows(rows);

    if(registros.length === 0){
      showE('El archivo no contiene filas válidas.');
      return;
    }

    // ✅ Generar código único para este lote
    const codigo = genCodigoCarga();

    // ✅ Cada registro recibe su propio estado individual
    const batch = {
      codigo_carga: codigo,
      created_at: new Date().toISOString(),
      file_name: file.name,
      ruc: userRUC,
      razon_social: 'EMPRESA S.A.C.',
      usuario_agente: (String(uName).trim() || 'Usuario'),
      registros: registros.map(x => ({
        ...x,
        codigo_carga: codigo,
        estado_solicitud: asignarEstadoIndividual(),
        estado_pre: asignarEstadoPre()
      }))
    };

    const batches = loadBatches();
    batches.push(batch);
    saveBatches(batches);

    lastBatch = batch;
    renderBatch(batch);

    showOK(`✅ Carga exitosa — Código: ${codigo} — ${batch.registros.length} registro(s). Use este código en "Consulta de Solicitudes" para ver el estado de cada persona.`);
  }catch(err){
    console.error(err);
    showE(err?.message ? `Error: ${err.message}` : 'Error al cargar archivo.');
  }finally{
    btn?.classList.remove('loading'); if(btn) btn.disabled = false;
  }
}

function renderUltimoLote(){
  const batches = loadBatches();
  if(!batches.length) return;
  lastBatch = batches[batches.length - 1];
  renderBatch(lastBatch);
}

function renderBatch(batch){
  const section = $('results');
  const tbody = $('res-body');
  const countEl = $('res-count');
  const codeView = $('cod-carga-view');
  if(!section || !tbody || !countEl) return;

  // ✅ Mostrar código prominente
  if(codeView) codeView.textContent = batch.codigo_carga || '-';

  tbody.innerHTML = '';

  countEl.innerHTML =
    `Se cargó <strong>${batch.registros.length}</strong> registro(s) con código ` +
    `<strong>${esc(batch.codigo_carga)}</strong>`;

  batch.registros.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:900;color:#1c3997">${esc(batch.codigo_carga)}</td>
      <td style="font-weight:800">${esc(r.nro_documento)}</td>
      <td>${esc(r.nombres)}</td>
      <td>${esc(r.apellido_paterno)}</td>
      <td>${esc(r.apellido_materno)}</td>
      <td>${esc(r.fecha_nacimiento)}</td>
      <td>${esc(r.mail_principal)}</td>
      <td>${esc(r.tel_fijo)}</td>
      <td>${esc(r.tel_movil)}</td>
      <td>${esc(r.ubigeo)}</td>
      <td>${esc(r.tipo_via)}</td>
      <td>${esc(r.nombre_via)}</td>
      <td>${esc(r.ruc)}</td>
      <td>${esc(r.razon_social)}</td>
      <td>${esc(r.usuario_agente)}</td>
      <td>${esc(r.origen_onp)}</td>
    `;
    tbody.appendChild(tr);
  });

  section.classList.add('vis');
  section.style.display = 'block';
  section.scrollIntoView({behavior:'smooth', block:'start'});
}

// ===== Export / Clear =====
function exportExcelUltimoLote(){
  hideE(); hideOK();
  const batch = lastBatch;
  if(!batch || !batch.registros || batch.registros.length === 0){
    showE('No hay un lote cargado para exportar.');
    return;
  }
  if(typeof XLSX === 'undefined'){
    showE('XLSX no está disponible (CDN).');
    return;
  }
  const aoa = [];
  aoa.push([
    'CodigoCarga','NroDocumento','Nombres','ApellidoPaterno','ApellidoMaterno','FechaNac','Email','TelFijo','TelMovil',
    'Ubigeo','TipoVia','NombreVia','RUC','RazonSocial','UsuarioAgente','OrigenONP','EstadoSolicitud','EstadoPre'
  ]);
  batch.registros.forEach(r => {
    aoa.push([
      batch.codigo_carga,
      r.nro_documento, r.nombres, r.apellido_paterno, r.apellido_materno, r.fecha_nacimiento, r.mail_principal,
      r.tel_fijo, r.tel_movil, r.ubigeo, r.tipo_via, r.nombre_via,
      r.ruc, r.razon_social, r.usuario_agente, r.origen_onp,
      r.estado_solicitud || 'REGISTRADA', r.estado_pre || 'SIN_PRE'
    ]);
  });
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'CargaMasiva');
  XLSX.writeFile(wb, `afiliacion_masiva_${batch.codigo_carga}.xlsx`);
  showOK('Excel descargado.');
}

function clearSaved(){
  if(!confirm('¿Seguro que desea borrar todo lo guardado?')) return;
  localStorage.removeItem(BATCHES_KEY);
  lastBatch = null;
  $('results') && ($('results').style.display = 'none');
  $('cod-carga-view') && ($('cod-carga-view').textContent = '-');
  showOK('Guardado eliminado.');
}

// ===== Modelo =====
function descargarModelo(){
  if(typeof XLSX === 'undefined'){
    showE('XLSX no está disponible (CDN).');
    return;
  }
  const aoa = [];
  aoa.push(['NroDoc','Nombres','ApellidoPaterno','ApellidoMaterno','FechaNac','Email','TelFijo','TelMovil','Ubigeo','TipoVia','NombreVia','RUC','RazonSocial','UsuarioAgente','OrigenONP']);
  aoa.push(['10379368','NEVARDO ALCIDES','ALZAMORA','LARA','04/09/1974','neal_tato@hotmail.com','5436505','954778576','15316','Jr','San Antonio 452','','','','0']);
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Modelo');
  XLSX.writeFile(wb, 'modelo_afiliacion_masiva.xlsx');
}
