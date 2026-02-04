// =====================
//  HELPERS: binding seguro (evita null.addEventListener)
// =====================
function $(id){ return document.getElementById(id); }
function on(id, evt, fn){
  const el = $(id);
  if(!el) return;
  el.addEventListener(evt, fn);
}

// =====================
//  STUBS para sidebar.php (evita errores de funciones faltantes)
// =====================
function setActive(){ /* si sidebar lo llama, no rompe */ }
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
//  "BD" SIMULADA + REGLAS
// =====================
const affiliatesDB = [
  { tipodoc:'DNI', numdoc:'43131480', appat:'ABRIL', apmat:'BUENO', nombres:'KRISTEL MARIA', cuspp:'610110KABIN4', devmax:'2026-01', motivo:'', afp:'INTEGRA', tipocom:'Mixta', pctcom:'1.55%' },
  { tipodoc:'DNI', numdoc:'44080285', appat:'ACHING', apmat:'SANCHEZ', nombres:'JOEL HOMER', cuspp:'596491JASIC5', devmax:'2026-01', motivo:'', afp:'PRIMA', tipocom:'Flujo', pctcom:'1.69%' },
  { tipodoc:'DNI', numdoc:'40596665', appat:'ACHONG', apmat:'PADILLA', nombres:'SHARON LINDSAY', cuspp:'595120SAPOI0', devmax:'2026-01', motivo:'', afp:'HABITAT', tipocom:'Mixta', pctcom:'1.47%' },
  { tipodoc:'DNI', numdoc:'10602526', appat:'ADVINCULA', apmat:'CLEMENTE', nombres:'JOSE ANTONIO', cuspp:'583161JACIM2', devmax:'2026-01', motivo:'', afp:'PROFUTURO', tipocom:'Flujo', pctcom:'1.69%' },
  { tipodoc:'DNI', numdoc:'41587772', appat:'AGUILAR', apmat:'CHACON', nombres:'JOSE CARLOS', cuspp:'599621JACIC0', devmax:'2026-01', motivo:'', afp:'INTEGRA', tipocom:'Mixta', pctcom:'1.55%' },
];

const AFP_RULES = [
  { afp:'INTEGRA', tipocom:'Mixta', pctcom:'1.55%' },
  { afp:'PRIMA', tipocom:'Flujo', pctcom:'1.69%' },
  { afp:'HABITAT', tipocom:'Mixta', pctcom:'1.47%' },
  { afp:'PROFUTURO', tipocom:'Flujo', pctcom:'1.69%' },
];
const MOTIVOS = ['Retiro del 95.5%','Jubilación anticipada','Invalidez','Pensión de sobrevivencia',''];

// TipoDocCode -> texto
function mapTipoDoc(code){
  const c = String(code ?? '').trim();
  if(c==='0') return 'DNI';
  if(c==='1') return 'CE';
  if(c==='4') return 'PAS';
  if(c==='9') return 'OTR';
  return 'DNI';
}
function norm(s){ return String(s||'').trim().toUpperCase().replace(/\s+/g,' '); }
function escapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}

// =====================
//  UI INIT
// =====================
const userRUC = sessionStorage.getItem('afpnet_ruc') || '20603401574';
const uName = sessionStorage.getItem('afpnet_nombre') || sessionStorage.getItem('afpnet_usuario') || 'Usuario';
const uPerfil = 'Administrador';

window.addEventListener('DOMContentLoaded', () => {
  const dn = String(uName).trim() || 'Usuario';
  if($('w-name')) $('w-name').textContent = dn;
  if($('u-name')) $('u-name').textContent = dn;
  if($('u-init')) $('u-init').textContent = (dn.substring(0,2) || 'U').toUpperCase();
  if($('w-perfil')) $('w-perfil').textContent = uPerfil;
  if($('tb-ruc')) $('tb-ruc').textContent = userRUC;
  if($('tb-razon')) $('tb-razon').textContent = 'EMPRESA S.A.C.';
  updClk(); setInterval(updClk, 1000);

  wireSidebar();
  setupCaptcha();

  on('btn-procesar','click', onProcesar);
  on('btn-export','click', exportExcel);
  on('btn-modelo','click', descargarModelo);
  on('btn-guia','click', () => alert('Guía de uso: aquí puedes abrir tu manual.'));
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
//  MENSAJES
// =====================
function showE(m){ hideOK(); if($('m-err-t')) $('m-err-t').textContent=m; $('m-err')?.classList.add('vis'); }
function hideE(){ $('m-err')?.classList.remove('vis'); }
function showOK(m){ hideE(); if($('m-ok-t')) $('m-ok-t').textContent=m; $('m-ok')?.classList.add('vis'); }
function hideOK(){ $('m-ok')?.classList.remove('vis'); }

// =====================
//  CAPTCHA
// =====================
let currentCaptcha = '';
function setupCaptcha(){
  on('btn-capref','click', refreshCaptcha);
  refreshCaptcha();
}
function refreshCaptcha(){
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code='';
  for(let i=0;i<4;i++) code += chars.charAt(Math.floor(Math.random()*chars.length));
  currentCaptcha = code;
  if($('captcha-display')) $('captcha-display').textContent = code;
  if($('captcha-input')) $('captcha-input').value='';
}
function validateCaptcha(){
  const capIn = ( $('captcha-input')?.value || '' ).trim().toUpperCase();
  if(!capIn) return { ok:false, msg:'Debe ingresar el texto del captcha.' };
  if(capIn !== currentCaptcha) return { ok:false, msg:'Captcha incorrecto. Intente nuevamente.' };
  return { ok:true };
}

// =====================
//  PROCESO
// =====================
let lastProcessedRows = [];

async function onProcesar(){
  hideE(); hideOK();
  $('results')?.classList.remove('vis');

  const cap = validateCaptcha();
  if(!cap.ok){ showE(cap.msg); refreshCaptcha(); return; }

  const file = $('file')?.files?.[0];
  if(!file){ showE('Debe seleccionar un archivo .xlsx / .xls / .csv'); return; }

  const btn = $('btn-procesar');
  btn?.classList.add('loading');
  if(btn) btn.disabled = true;

  try{
    const rows = await readFileToRows(file);

    if(!rows || rows.length === 0){
      showE('El archivo no contiene registros.');
      return;
    }

    const devRef = ( $('inp-dev')?.value || '' ).trim();
    const input = normalizeInputRows(rows);

    if(input.length === 0){
      showE('No se detectaron filas válidas (revise el formato A-E).');
      return;
    }

    const output = input.map(r => enrichRow(r, devRef));
    lastProcessedRows = output;

    renderResults(output);
    showOK(`Procesado OK. Registros: ${output.length}.`);
  }catch(err){
    console.error(err);
    showE(err?.message ? `Error: ${err.message}` : 'Error al procesar el archivo.');
  }finally{
    btn?.classList.remove('loading');
    if(btn) btn.disabled = false;
  }
}

// =====================
//  LECTURA XLS/XLSX/CSV ROBUSTA (SOLUCIONA undefined[0])
// =====================
function readFileToRows(file){
  const ext = (file.name.split('.').pop() || '').toLowerCase();

  // CSV (soporta coma o tab)
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

  // XLS/XLSX
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

        // Detecta "xls falso" (HTML renombrado)
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

        let bestAoa = null;
        for(const name of wb.SheetNames){
          const ws = wb.Sheets[name];
          if(!ws) continue;

          const aoa = XLSX.utils.sheet_to_json(ws, { header:1, raw:false });
          const cleaned = (aoa || [])
            .filter(r => Array.isArray(r) && r.some(c => String(c ?? '').trim() !== ''))
            .map(r => r.map(c => String(c ?? '').trim()));

          if(cleaned.length > 0){
            bestAoa = cleaned;
            break;
          }
        }

        if(!bestAoa){
          reject(new Error('No se encontró data en ninguna hoja.'));
          return;
        }

        resolve(bestAoa);
      }catch(_){
        reject(new Error('Excel inválido o no soportado. Guárdalo como .xlsx (Excel moderno).'));
      }
    };
    reader.onerror = () => reject(new Error('No se pudo leer el Excel.'));
    reader.readAsArrayBuffer(file);
  });
}

// A-E: [TipoDocCode, NroDoc, Appat, Apmat, Nombres]
function normalizeInputRows(rows){
  let start = 0;
  const first0 = String(rows?.[0]?.[0] ?? '').toLowerCase();
  if(first0.includes('tipo') || first0.includes('doc')) start = 1;

  const out = [];
  for(let i=start;i<rows.length;i++){
    const r = rows[i] || [];
    const tipoCode = String(r[0] ?? '').trim();
    const numdoc   = String(r[1] ?? '').trim();
    const appat    = String(r[2] ?? '').trim();
    const apmat    = String(r[3] ?? '').trim();
    const nombres  = String(r[4] ?? '').trim();

    if(!tipoCode && !numdoc && !appat && !apmat && !nombres) continue;

    out.push({
      tipoCode,
      tipodoc: mapTipoDoc(tipoCode),
      numdoc,
      appat,
      apmat,
      nombres
    });
  }
  return out;
}

// =====================
//  ENRIQUECER DATA
// =====================
function enrichRow(r, devRef){
  const found = affiliatesDB.find(a => a.tipodoc === r.tipodoc && String(a.numdoc) === String(r.numdoc));

  const foundByName = !found ? affiliatesDB.find(a =>
    norm(a.appat) === norm(r.appat) &&
    norm(a.apmat) === norm(r.apmat) &&
    norm(a.nombres) === norm(r.nombres)
  ) : null;

  const base = found || foundByName;
  const gen = base ? base : generateAffiliate(r);

  const devmax = devRef ? devRef : (gen.devmax || genRandomDev());
  const estado = base ? 'ENCONTRADO' : 'GENERADO';

  return {
    tipodoc: r.tipodoc,
    numdoc: r.numdoc,
    tipo_nro: `${r.tipodoc} - ${r.numdoc}`,
    appat: (r.appat || gen.appat || '').toUpperCase(),
    apmat: (r.apmat || gen.apmat || '').toUpperCase(),
    nombres: (r.nombres || gen.nombres || '').toUpperCase(),
    cuspp: gen.cuspp,
    devmax,
    motivo: (gen.motivo && String(gen.motivo).trim()) ? gen.motivo : '-',
    afp: gen.afp,
    tipocom: gen.tipocom,
    pctcom: gen.pctcom,
    estado
  };
}

function generateAffiliate(r){
  const rule = AFP_RULES[Math.floor(Math.random()*AFP_RULES.length)];
  return {
    cuspp: genCUSPP(r),
    devmax: genRandomDev(),
    motivo: MOTIVOS[Math.floor(Math.random()*MOTIVOS.length)] || '-',
    afp: rule.afp,
    tipocom: rule.tipocom,
    pctcom: rule.pctcom,
    appat: (r.appat || '').toUpperCase(),
    apmat: (r.apmat || '').toUpperCase(),
    nombres: (r.nombres || '').toUpperCase(),
  };
}

function genRandomDev(){
  const d = new Date();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  return `${d.getFullYear()}-${mm}`;
}

function genCUSPP(r){
  const n = String(r.numdoc || '').replace(/\D/g,'');
  const a = (norm(r.appat).substring(0,2) || 'XX');
  const b = (norm(r.nombres).substring(0,2) || 'YY');
  const seed = (n + a + b).toUpperCase();

  let sum = 0;
  for(let i=0;i<seed.length;i++) sum += seed.charCodeAt(i)*(i+1);

  const prefix = String(500000 + (sum % 499999));
  const letters = (a + b + 'A').substring(0,5).padEnd(5,'X');
  const check = String(sum % 10);
  return `${prefix}${letters}${check}`.toUpperCase();
}

// =====================
//  RENDER
// =====================
function renderResults(data){
  const section = $('results');
  const tbody = $('res-body');
  const countEl = $('res-count');

  if(!section || !tbody || !countEl){
    showE('Faltan elementos results/res-body/res-count en el HTML.');
    return;
  }

  tbody.innerHTML = '';
  countEl.innerHTML = `Se ha procesado <strong>${data.length}</strong> registro${data.length>1?'s':''}.`;

  data.forEach(a=>{
    const tr = document.createElement('tr');
    const stClass = a.estado === 'ENCONTRADO' ? 'st-ok' : 'st-gen';
    tr.innerHTML = `
      <td style="font-weight:800">${escapeHtml(a.tipo_nro)}</td>
      <td>${escapeHtml(a.appat)}</td>
      <td>${escapeHtml(a.apmat)}</td>
      <td>${escapeHtml(a.nombres)}</td>
      <td style="font-weight:900;color:var(--blue)">${escapeHtml(a.cuspp)}</td>
      <td>${escapeHtml(a.devmax)}</td>
      <td>${escapeHtml(a.motivo)}</td>
      <td style="font-weight:900">${escapeHtml(a.afp)}</td>
      <td>${escapeHtml(a.tipocom)}</td>
      <td>${escapeHtml(a.pctcom)}</td>
      <td><span class="st ${stClass}">${escapeHtml(a.estado)}</span></td>
    `;
    tbody.appendChild(tr);
  });

  section.classList.add('vis');
  section.scrollIntoView({behavior:'smooth', block:'start'});
}

// =====================
//  EXPORT EXCEL
// =====================
function exportExcel(){
  if(!lastProcessedRows || lastProcessedRows.length === 0){
    showE('No hay resultados para exportar.');
    return;
  }
  if(typeof XLSX === 'undefined'){
    showE('XLSX no está disponible (CDN).');
    return;
  }

  const aoa = [];
  aoa.push([
    'TipoDoc','NroDoc','ApellidoPaterno','ApellidoMaterno','Nombres',
    'CUSPP','DevengueMaximoAporta','MotivoPension','AFP','TipoComision','PctComision','Estado'
  ]);

  lastProcessedRows.forEach(r=>{
    aoa.push([
      r.tipodoc, r.numdoc, r.appat, r.apmat, r.nombres,
      r.cuspp, r.devmax, r.motivo, r.afp, r.tipocom, r.pctcom, r.estado
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
  XLSX.writeFile(wb, `consulta_afiliados_masiva_${new Date().toISOString().slice(0,10)}.xlsx`);
}

// =====================
//  MODELO
// =====================
function descargarModelo(){
  if(typeof XLSX === 'undefined'){
    showE('XLSX no está disponible (CDN).');
    return;
  }
  const aoa = [];
  aoa.push(['TipoDocCode','NroDoc','ApellidoPaterno','ApellidoMaterno','Nombres']);
  aoa.push(['0','43131480','ABRIL','BUENO','KRISTEL MARIA']);
  aoa.push(['0','8038661','ACEVEDO','FARFAN','PABLO RICARDO']);
  aoa.push(['0','44080285','ACHING','SANCHEZ','JOEL HOMER']);

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Modelo');
  XLSX.writeFile(wb, 'modelo_consulta_afiliados_masiva.xlsx');
}