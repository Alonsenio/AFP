// afiliacion_masiva.js

// ===== HELPERS =====
const $ = id => document.getElementById(id);
const userRUC    = sessionStorage.getItem('afpnet_ruc')     || '20603401574';
const uName      = sessionStorage.getItem('afpnet_usuario') || 'Usuario';
const razonSoc   = sessionStorage.getItem('afpnet_razon')   || 'EMPRESA S.A.C.';

// Key compartida con consulta_de_solicitudes
const BATCHES_KEY = 'afpnet_afiliacion_masiva_batches';

let loadedRows = [];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const dn = uName.charAt(0).toUpperCase() + uName.slice(1);
  const wName = $('w-name'); if (wName) wName.textContent = dn;
  const uNameEl = $('u-name'); if (uNameEl) uNameEl.textContent = dn;
  const uInit = $('u-init'); if (uInit) uInit.textContent = dn.substring(0, 2).toUpperCase();
  const tbRuc = $('tb-ruc'); if (tbRuc) tbRuc.textContent = userRUC;
  const tbRazon = $('tb-razon'); if (tbRazon) tbRazon.textContent = razonSoc;

  updClk();
  setInterval(updClk, 1000);

  $('btn-cargar')?.addEventListener('click', onCargar);
  $('btn-guia')?.addEventListener('click', () => alert('Aqui se abrira la guia de uso.'));
  $('btn-export')?.addEventListener('click', onExport);
  $('btn-clear')?.addEventListener('click', onClear);
  $('lnk-modelo')?.addEventListener('click', onDescargarModelo);

  loadLastBatch();
});

// ===== RELOJ =====
function updClk() {
  const n = new Date();
  const el = $('tb-time');
  if (!el) return;
  el.innerHTML =
    n.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) +
    '<br>' +
    n.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ===== MENSAJES =====
function showErr(msg) {
  const el = $('m-err'); const t = $('m-err-t');
  if (el && t) { t.textContent = msg; el.classList.add('vis'); }
  hideOk();
}
function hideErr() { $('m-err')?.classList.remove('vis'); }
function showOk(msg) {
  const el = $('m-ok'); const t = $('m-ok-t');
  if (el && t) { t.textContent = msg; el.classList.add('vis'); }
  hideErr();
}
function hideOk() { $('m-ok')?.classList.remove('vis'); }

// ===== GENERAR CODIGO DE CARGA =====
function generarCodCarga() {
  const now = new Date();
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  return 'MC' +
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());
}

// ===== CARGAR ARCHIVO =====
function onCargar() {
  hideErr(); hideOk();

  const fileInput = $('file');
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    showErr('Debe seleccionar un archivo antes de cargar.');
    return;
  }

  const file = fileInput.files[0];
  const name = file.name.toLowerCase();
  const btn = $('btn-cargar');

  if (btn) { btn.classList.add('loading'); btn.disabled = true; }

  const reader = new FileReader();

  if (name.endsWith('.txt') || name.endsWith('.csv')) {
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const rows = parseTxtCsv(text, name);
        finalizarCarga(rows, btn);
      } catch (err) {
        if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
        showErr('Error al leer el archivo: ' + err.message);
      }
    };
    reader.onerror = () => {
      if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
      showErr('Error al leer el archivo.');
    };
    reader.readAsText(file, 'UTF-8');

  } else if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const jsonRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        const rows = parseExcelRows(jsonRows);
        finalizarCarga(rows, btn);
      } catch (err) {
        if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
        showErr('Error al procesar el archivo Excel: ' + err.message);
      }
    };
    reader.onerror = () => {
      if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
      showErr('Error al leer el archivo.');
    };
    reader.readAsArrayBuffer(file);

  } else {
    if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
    showErr('Formato no soportado. Use .xlsx, .xls, .csv o .txt');
  }
}

// ===== PARSEAR TXT / CSV =====
function parseTxtCsv(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length === 0) throw new Error('El archivo esta vacio.');
  const sep = detectSeparator(lines[0]);
  const rows = [];
  for (const line of lines) {
    const cols = line.split(sep).map(c => c.trim());
    if (rows.length === 0 && isHeader(cols)) continue;
    if (cols.length < 6) continue;
    rows.push(mapColumns(cols));
  }
  return rows;
}

// ===== PARSEAR EXCEL =====
function parseExcelRows(jsonRows) {
  if (jsonRows.length === 0) throw new Error('El archivo esta vacio.');
  const rows = [];
  for (let i = 0; i < jsonRows.length; i++) {
    const cols = jsonRows[i].map(c => String(c ?? '').trim());
    if (i === 0 && isHeader(cols)) continue;
    if (cols.length < 6) continue;
    rows.push(mapColumns(cols));
  }
  return rows;
}

// ===== DETECTAR SEPARADOR =====
function detectSeparator(line) {
  const counts = {
    '|': (line.match(/\|/g) || []).length,
    ';': (line.match(/;/g) || []).length,
    ',': (line.match(/,/g) || []).length,
    '\t': (line.match(/\t/g) || []).length
  };
  let best = '|', max = 0;
  for (const [sep, count] of Object.entries(counts)) {
    if (count > max) { max = count; best = sep; }
  }
  return best;
}

// ===== DETECTAR SI ES ENCABEZADO =====
function isHeader(cols) {
  const first = (cols[0] || '').toLowerCase();
  return (
    first.includes('documento') || first.includes('dni') ||
    first.includes('nro') || first.includes('numero') ||
    first.includes('num') || first === 'n\u00b0' || first === 'n\u00ba'
  );
}

// =====================================================
// MAPEAR COLUMNAS — NOMBRES ESTANDARIZADOS
// Estos nombres son los mismos que usa consulta_de_solicitudes
// Formato: nroDoc | nombres | appat | apmat | fechaNac | email | fijo | movil | ubigeo | tipoVia | nombreVia | ... | origenONP
// =====================================================
function mapColumns(cols) {
  return {
    tipodoc:          'DNI',
    nro_documento:    cols[0]  || '',
    nombres:          cols[1]  || '',
    apellido_paterno: cols[2]  || '',
    apellido_materno: cols[3]  || '',
    fecha_nacimiento: cols[4]  || '',
    mail_principal:   cols[5]  || '',
    telefono_fijo:    cols[6]  || '',
    telefono_movil:   cols[7]  || '',
    ubigeo:           cols[8]  || '',
    tipo_via:         cols[9]  || '',
    nombre_via:       cols[10] || '',
    origen_onp:       cols[cols.length - 1] || '0'
  };
}

// ===== FINALIZAR CARGA =====
function finalizarCarga(rows, btn) {
  setTimeout(() => {
    if (btn) { btn.classList.remove('loading'); btn.disabled = false; }

    if (rows.length === 0) {
      showErr('No se encontraron registros validos en el archivo.');
      return;
    }
    if (rows.length > 1000) {
      showErr('El archivo excede el maximo de 1000 registros.');
      return;
    }

    const codCarga = generarCodCarga();
    loadedRows = rows;

    guardarBatch(codCarga, rows);
    renderResults(codCarga, rows);
    showOk('Se cargaron ' + rows.length + ' registro(s) correctamente. Codigo: ' + codCarga);
  }, 600);
}

// =====================================================
// GUARDAR EN LOCALSTORAGE — ESTRUCTURA ESTANDARIZADA
// Cada registro incluye TODOS los campos que consulta_de_solicitudes necesita
// =====================================================
function guardarBatch(codCarga, rows) {
  try {
    let batches = [];
    const raw = localStorage.getItem(BATCHES_KEY);
    if (raw) batches = JSON.parse(raw);

    batches.push({
      codigo_carga:     codCarga,
      fecha:            new Date().toISOString(),
      ruc:              userRUC,
      razon_social:     razonSoc,
      usuario_agente:   uName,
      estado_solicitud: 'REGISTRADA',
      estado_pre:       'SIN_PRE',
      registros:        rows.map(function(r) {
        return {
          codigo_carga:     codCarga,
          tipodoc:          r.tipodoc || 'DNI',
          nro_documento:    r.nro_documento,
          nombres:          r.nombres,
          apellido_paterno: r.apellido_paterno,
          apellido_materno: r.apellido_materno,
          fecha_nacimiento: r.fecha_nacimiento,
          mail_principal:   r.mail_principal,
          telefono_fijo:    r.telefono_fijo,
          telefono_movil:   r.telefono_movil,
          ubigeo:           r.ubigeo,
          tipo_via:         r.tipo_via,
          nombre_via:       r.nombre_via,
          origen_onp:       r.origen_onp,
          ruc:              userRUC,
          razon_social:     razonSoc,
          usuario_agente:   uName,
          estado_solicitud: 'REGISTRADA',
          estado_pre:       'SIN_PRE'
        };
      })
    });

    localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage:', e);
  }
}

// ===== CARGAR ULTIMO BATCH =====
function loadLastBatch() {
  try {
    const raw = localStorage.getItem(BATCHES_KEY);
    if (!raw) return;
    const batches = JSON.parse(raw);
    if (batches.length === 0) return;
    const last = batches[batches.length - 1];
    if (last.registros && last.registros.length > 0) {
      loadedRows = last.registros;
      renderResults(last.codigo_carga, last.registros);
    }
  } catch (_) {}
}

// ===== RENDER RESULTADOS =====
function renderResults(codCarga, rows) {
  const section = $('results');
  const tbody   = $('res-body');
  const countEl = $('res-count');
  const codView = $('cod-carga-view');

  if (!tbody || !section) return;
  tbody.innerHTML = '';

  if (codView) codView.textContent = codCarga;
  if (countEl) {
    countEl.innerHTML = 'Se encontraron <strong>' + rows.length + '</strong> registro' + (rows.length !== 1 ? 's' : '') + '.';
  }

  rows.forEach(function(r) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;color:var(--blue)">' + esc(codCarga) + '</td>' +
      '<td>' + esc(r.nro_documento) + '</td>' +
      '<td>' + esc(r.nombres) + '</td>' +
      '<td>' + esc(r.apellido_paterno) + '</td>' +
      '<td>' + esc(r.apellido_materno) + '</td>' +
      '<td>' + esc(r.fecha_nacimiento) + '</td>' +
      '<td>' + esc(r.mail_principal) + '</td>' +
      '<td>' + esc(r.telefono_fijo) + '</td>' +
      '<td>' + esc(r.telefono_movil) + '</td>' +
      '<td>' + esc(r.ubigeo) + '</td>' +
      '<td>' + esc(r.tipo_via) + '</td>' +
      '<td>' + esc(r.nombre_via) + '</td>' +
      '<td>' + esc(userRUC) + '</td>' +
      '<td>' + esc(razonSoc) + '</td>' +
      '<td>' + esc(uName) + '</td>' +
      '<td>' + esc(r.origen_onp) + '</td>';
    tbody.appendChild(tr);
  });

  section.classList.add('vis');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== ESCAPE HTML =====
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, function(m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m];
  });
}

// ===== EXPORTAR A EXCEL =====
function onExport() {
  if (loadedRows.length === 0) { showErr('No hay datos para exportar.'); return; }

  var headers = [
    'Codigo Carga', 'Nro Documento', 'Nombres', 'Apellido Paterno', 'Apellido Materno',
    'Fecha Nac.', 'Email', 'Tel. Fijo', 'Tel. Movil', 'Ubigeo',
    'Tipo Via', 'Nombre Via', 'RUC', 'Razon Social', 'Usuario Agente', 'Origen ONP'
  ];
  var codCarga = $('cod-carga-view')?.textContent || '-';
  var data = loadedRows.map(function(r) {
    return [
      codCarga, r.nro_documento, r.nombres, r.apellido_paterno, r.apellido_materno,
      r.fecha_nacimiento, r.mail_principal, r.telefono_fijo, r.telefono_movil, r.ubigeo,
      r.tipo_via, r.nombre_via, userRUC, razonSoc, uName, r.origen_onp
    ];
  });

  var ws = XLSX.utils.aoa_to_sheet([headers].concat(data));
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Afiliacion Masiva');
  XLSX.writeFile(wb, 'afiliacion_masiva_' + codCarga + '.xlsx');
}

// ===== LIMPIAR GUARDADO =====
function onClear() {
  if (!confirm('Esta seguro de limpiar todos los lotes guardados?')) return;
  localStorage.removeItem(BATCHES_KEY);
  loadedRows = [];
  var tbody = $('res-body');
  if (tbody) tbody.innerHTML = '';
  $('results')?.classList.remove('vis');
  hideErr();
  showOk('Datos limpiados correctamente.');
}

// ===== DESCARGAR MODELO =====
function onDescargarModelo(e) {
  e.preventDefault();
  var headers = [
    'Nro Documento', 'Nombres', 'Apellido Paterno', 'Apellido Materno',
    'Fecha Nacimiento', 'Email', 'Tel. Fijo', 'Tel. Movil', 'Ubigeo',
    'Tipo Via', 'Nombre Via', 'Origen ONP'
  ];
  var ejemplo = [
    '10379368', 'Nevardo Alcides', 'Alzamora', 'Lara',
    '04/09/1974', 'correo@mail.com', '014567890', '987654321', '150101',
    'Jr', 'San Antonio 452', '0'
  ];
  var ws = XLSX.utils.aoa_to_sheet([headers, ejemplo]);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Modelo');
  XLSX.writeFile(wb, 'modelo_afiliacion_masiva.xlsx');
}

// ===== SIDEBAR (compatibilidad) =====
function togSub(el) {
  var sub = el.nextElementSibling;
  if (!sub) return;
  var op = sub.classList.contains('open');
  document.querySelectorAll('.submenu.open').forEach(function(s) {
    if (s !== sub) { s.classList.remove('open'); s.previousElementSibling.classList.remove('open'); }
  });
  if (!op) { sub.classList.add('open'); el.classList.add('open'); }
  else { sub.classList.remove('open'); el.classList.remove('open'); }
}
function cerrarSesion() { sessionStorage.clear(); location.href = '../../login/login.php'; }