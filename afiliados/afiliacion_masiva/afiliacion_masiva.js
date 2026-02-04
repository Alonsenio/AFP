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
// Session topbar
// =====================
const userRUC = sessionStorage.getItem('afpnet_ruc') || '20603401574';
const uName = sessionStorage.getItem('afpnet_nombre') || sessionStorage.getItem('afpnet_usuario') || 'Usuario';
const uPerfil = 'Administrador';

// =====================
// Storage key
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

  on('btn-cargar','click', onCargar);
  on('btn-export','click', exportExcel);
  on('btn-clear','click', clearStored);
  on('btn-guia','click', () => alert('Aquí abrirás tu guía.'));
  on('lnk-modelo','click', (e)=>{ e.preventDefault(); downloadModel(); });

  // Si ya hay data guardada, mostrarla
  const saved = loadStored();
  if(saved.length) renderResults(saved);
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

// =====================
// Messages
// =====================
function showE(m){ hideOK(); $('m-err-t') && ($('m-err-t').textContent=m); $('m-err')?.classList.add('vis'); }
function hideE(){ $('m-err')?.classList.remove('vis'); }
function showOK(m){ hideE(); $('m-ok-t') && ($('m-ok-t').textContent=m); $('m-ok')?.classList.add('vis'); }
function hideOK(){ $('m-ok')?.classList.remove('vis'); }

// =====================
// Read file robust (xls/xlsx/csv/txt)
// =====================
function readFileToRows(file){
  const ext = (file.name.split('.').pop() || '').toLowerCase();

  // TXT (tab o coma o |)
  if(ext === 'txt'){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result || '');
        const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
        const rows = lines.map(l => {
          let sep = '\t';
          if(l.includes('|')) sep = '|';
          else if(l.includes(',')) sep = ',';
          return l.split(sep).map(x => String(x ?? '').trim());
        });
        resolve(rows);
      };
      reader.onerror = () => reject(new Error('No se pudo leer el TXT.'));
      reader.readAsText(file, 'utf-8');
    });
  }

  // CSV
  if(ext === 'csv'){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result || '');
        const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
        const rows = lines.map(l => {
          const sep = l.includes('\t') ? '\t' : ',';
          return l.split(sep).map(x => String(x ?? '').trim());
        });
        resolve(rows);
      };
      reader.onerror = () => reject(new Error('No se pudo leer el CSV.'));
      reader.readAsText(file, 'utf-8');
    });
  }

  // XLS / XLSX
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = (e)=>{
      try{
        if(typeof XLSX === 'undefined'){
          reject(new Error('XLSX no cargó (CDN).'));
          return;
        }

        const buf = e.target.result;
        if(!buf){ reject(new Error('No se pudo leer el archivo.')); return; }

        const u8 = new Uint8Array(buf);

        // Detecta "xls falso"
        const head = Array.from(u8.slice(0, 80)).map(b => String.fromCharCode(b)).join('').toLowerCase();
        if(head.includes('<html') || head.includes('<!doctype') || head.includes('<table')){
          reject(new Error('El archivo parece HTML, no Excel válido. Guárdalo como .xlsx real.'));
          return;
        }

        const wb = XLSX.read(u8, { type:'array', dense:true, cellDates:true });
        if(!wb.SheetNames || wb.SheetNames.length === 0){
          reject(new Error('El Excel no contiene hojas.'));
          return;
        }

        let best = null;
        for(const name of wb.SheetNames){
          const ws = wb.Sheets[name];
          if(!ws) continue;

          const aoa = XLSX.utils.sheet_to_json(ws, { header:1, raw:false });
          const cleaned = (aoa || [])
            .filter(r => Array.isArray(r) && r.some(c => String(c ?? '').trim() !== ''))
            .map(r => r.map(c => String(c ?? '').trim()));

          if(cleaned.length > 0){
            best = cleaned;
            break;
          }
        }

        if(!best){
          reject(new Error('No se encontró data en ninguna hoja.'));
          return;
        }

        resolve(best);
      }catch(_){
        reject(new Error('Excel inválido o no soportado. Guárdalo como .xlsx.'));
      }
    };
    reader.onerror = () => reject(new Error('No se pudo leer el Excel.'));
    reader.readAsArrayBuffer(file);
  });
}

// =====================
// Normalizar rows del modelo AFPNet (ignorar filas amarillas)
// =====================
function normalizeRows(rows){
  // El modelo AFPNet tiene filas de cabecera y "Dato Obligatorio".
  // Nos quedamos con filas cuyo primer campo sea un NRO DOC numérico (>=6 dígitos)
  const out = [];

  for(const r of rows){
    const c0 = String(r?.[0] ?? '').trim();
    const docNum = c0.replace(/\D/g,''); // solo números
    if(docNum.length < 6) continue; // ignora cabeceras

    out.push({
      nro_documento: docNum,
      nombres: String(r?.[1] ?? '').trim(),
      apellido_paterno: String(r?.[2] ?? '').trim(),
      apellido_materno: String(r?.[3] ?? '').trim(),
      fecha_nacimiento: String(r?.[4] ?? '').trim(),
      mail_principal: String(r?.[5] ?? '').trim(),
      telefono_fijo: String(r?.[6] ?? '').trim(),
      telefono_movil: String(r?.[7] ?? '').trim(),
      ubigeo: String(r?.[8] ?? '').trim(),
      tipo_via: String(r?.[9] ?? '').trim(),
      nombre_via: String(r?.[10] ?? '').trim(),
      tipo_localidad: String(r?.[11] ?? '').trim(),
      nombre_localidad: String(r?.[12] ?? '').trim(),
      ruc: String(r?.[13] ?? '').trim(),
      razon_social: String(r?.[14] ?? '').trim(),
      usuario_agente: String(r?.[15] ?? '').trim(),
      origen_onp: String(r?.[16] ?? '').trim(), // 0 o 1
    });
  }

  return out;
}

// =====================
// Store
// =====================
function saveStored(arr){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}
function loadStored(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  }catch(_){ return []; }
}

// =====================
// Main action
// =====================
let lastData = [];

async function onCargar(){
  hideE(); hideOK();
  $('results')?.classList.remove('vis');

  const file = $('file')?.files?.[0];
  if(!file){ showE('Debe seleccionar un archivo.'); return; }

  const btn = $('btn-cargar');
  btn?.classList.add('loading');
  if(btn) btn.disabled = true;

  try{
    const rows = await readFileToRows(file);
    const data = normalizeRows(rows);

    if(data.length === 0){
      showE('No se encontraron filas válidas. Asegúrate que la columna A sea el Nro de Documento.');
      return;
    }

    // Guardar
    saveStored(data);
    lastData = data;

    renderResults(data);
    showOK(`Cargado OK. Registros guardados: ${data.length}.`);
  }catch(err){
    console.error(err);
    showE(err?.message ? `Error: ${err.message}` : 'Error al procesar el archivo.');
  }finally{
    btn?.classList.remove('loading');
    if(btn) btn.disabled = false;
  }
}

// =====================
// Render
// =====================
function esc(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}

function renderResults(data){
  const section = $('results');
  const tbody = $('res-body');
  const countEl = $('res-count');

  if(!section || !tbody || !countEl){
    showE('Faltan contenedores (results/res-body/res-count).');
    return;
  }

  tbody.innerHTML = '';
  countEl.innerHTML = `Se han cargado <strong>${data.length}</strong> registros.`;

  data.slice(0, 200).forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:800">${esc(a.nro_documento)}</td>
      <td>${esc(a.nombres)}</td>
      <td>${esc(a.apellido_paterno)}</td>
      <td>${esc(a.apellido_materno)}</td>
      <td>${esc(a.fecha_nacimiento)}</td>
      <td>${esc(a.mail_principal)}</td>
      <td>${esc(a.telefono_fijo)}</td>
      <td>${esc(a.telefono_movil)}</td>
      <td>${esc(a.ubigeo)}</td>
      <td>${esc(a.tipo_via)}</td>
      <td>${esc(a.nombre_via)}</td>
      <td>${esc(a.ruc)}</td>
      <td>${esc(a.razon_social)}</td>
      <td>${esc(a.usuario_agente)}</td>
      <td>${esc(a.origen_onp)}</td>
    `;
    tbody.appendChild(tr);
  });

  if(data.length > 200){
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="15" style="text-align:center;color:#666;font-weight:700">Mostrando 200 de ${data.length} registros</td>`;
    tbody.appendChild(tr);
  }

  section.classList.add('vis');
  section.scrollIntoView({behavior:'smooth', block:'start'});
}

// =====================
// Export
// =====================
function exportExcel(){
  const data = lastData.length ? lastData : loadStored();
  if(!data.length){ showE('No hay data para exportar.'); return; }
  if(typeof XLSX === 'undefined'){ showE('XLSX no está disponible (CDN).'); return; }

  const aoa = [];
  aoa.push([
    'NroDocumento','Nombres','ApellidoPaterno','ApellidoMaterno','FechaNacimiento','MailPrincipal',
    'TelefonoFijo','TelefonoMovil','Ubigeo','TipoVia','NombreVia','TipoLocalidad','NombreLocalidad',
    'RUC','RazonSocial','UsuarioAgente','OrigenONP'
  ]);

  data.forEach(r=>{
    aoa.push([
      r.nro_documento, r.nombres, r.apellido_paterno, r.apellido_materno, r.fecha_nacimiento, r.mail_principal,
      r.telefono_fijo, r.telefono_movil, r.ubigeo, r.tipo_via, r.nombre_via, r.tipo_localidad, r.nombre_localidad,
      r.ruc, r.razon_social, r.usuario_agente, r.origen_onp
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'AfiliacionMasiva');
  XLSX.writeFile(wb, `afiliacion_masiva_${new Date().toISOString().slice(0,10)}.xlsx`);
}

// =====================
// Clear stored
// =====================
function clearStored(){
  localStorage.removeItem(STORAGE_KEY);
  lastData = [];
  $('results')?.classList.remove('vis');
  showOK('Se limpió el almacenamiento local.');
}

// =====================
// Modelo (genera un xlsx simple)
// =====================
function downloadModel(){
  if(typeof XLSX === 'undefined'){ showE('XLSX no está disponible (CDN).'); return; }

  const aoa = [];
  aoa.push([
    'NumeroDocumento','Nombres','ApellidoPaterno','ApellidoMaterno','FechaNacimiento','MailPrincipal',
    'TelefonoFijo','TelefonoMovil','Ubigeo','TipoVia','NombreVia','TipoLocalidad','NombreLocalidad',
    'RUC','RazonSocial','UsuarioAgente','OrigenONP'
  ]);

  aoa.push(['10379368','Nevardo Alcides','Alzamora','Lara','04/09/1974','neal_tato@hotmail.com','5436505','954778576','15316','Jr','San Antonio 452','','','20603401574','EMPRESA S.A.C.','usuario1','0']);

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Modelo');
  XLSX.writeFile(wb, 'modelo_afiliacion_masiva.xlsx');
}