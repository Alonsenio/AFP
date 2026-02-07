// Variables globales
let datosActuales = null;
let estadoActual = 'PENDIENTE';

// ================================================
// INICIALIZACIÓN
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
});

function inicializarEventos() {
    const formCarga = document.getElementById('form-carga');
    if (formCarga) {
        formCarga.addEventListener('submit', manejarCargaArchivo);
    }

    const inputArchivo = document.getElementById('planilla');
    if (inputArchivo) {
        inputArchivo.addEventListener('change', actualizarNombreArchivo);
    }
}

// ================================================
// MANEJO DE ARCHIVO
// ================================================
function actualizarNombreArchivo(e) {
    const archivo = e.target.files[0];
    const nombreArchivo = document.getElementById('nombre-archivo');
    
    if (archivo) {
        nombreArchivo.textContent = archivo.name;
        nombreArchivo.style.background = 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)';
        nombreArchivo.style.color = 'white';
        nombreArchivo.style.border = '2px solid #4CAF50';
        nombreArchivo.style.fontStyle = 'normal';
    } else {
        nombreArchivo.textContent = 'Ningún archivo seleccionado';
        nombreArchivo.style.background = '#f9fafb';
        nombreArchivo.style.color = '#1f2937';
        nombreArchivo.style.border = '2px solid #e5e7eb';
        nombreArchivo.style.fontStyle = 'italic';
    }
}

function manejarCargaArchivo(e) {
    e.preventDefault();
    
    const periodo = document.getElementById('periodo').value;
    const inputArchivo = document.getElementById('planilla');
    const archivo = inputArchivo.files[0];
    
    if (!archivo) {
        mostrarAlerta('Por favor seleccione un archivo', 'error');
        return;
    }
    
    const extension = archivo.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(extension)) {
        mostrarAlerta('Solo se permiten archivos Excel (.xlsx, .xls)', 'error');
        return;
    }
    
    mostrarLoading(true);
    
    const formData = new FormData();
    formData.append('periodo', periodo);
    formData.append('planilla', archivo);
    formData.append('semana_contributiva', document.getElementById('semana_contributiva').checked);
    
    setTimeout(() => {
        datosActuales = {
            afp: 'INTEGRA',
            tipo_trabajador: 'D',
            tipo_trabajador_texto: 'DEPENDIENTE',
            rubro: 'N',
            tipo_riesgo: 'NORMAL',
            num_afiliados: 5,
            fondo_pensiones: '565.00',
            retenciones: '77.40',
            comision_afp: '0.00',
            prima_seguro: '77.40',
            intereses_moratorios_fondo: '0.00',
            intereses_moratorios_ret: '0.00',
            periodo: periodo,
            ruc: '20123456789',
            razon_social: 'EMPRESA EJEMPLO S.A.C.',
            direccion: 'Calle Ejemplo 123',
            urbanizacion: '',
            distrito: 'CALLAO',
            provincia: 'CALLAO',
            departamento: 'CALLAO',
            telefono: '999999999',
            representante_legal: 'JUAN PEREZ',
            elaborado_por: 'PEDRO GARCIA',
            num_planilla: null,
            afiliados: [
                { nro: 1, cuspp: '123456ABCDE', nombre: 'GARCIA LOPEZ MARIA', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep_aporte: '', rem_asegurable: '1,130.00', aporte_oblig: '113.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima_seguro: '15.48', comision_afp: '0.00' },
                { nro: 2, cuspp: '234567BCDEF', nombre: 'MARTINEZ ROJAS CARLOS', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep_aporte: '', rem_asegurable: '1,130.00', aporte_oblig: '113.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima_seguro: '15.48', comision_afp: '0.00' },
                { nro: 3, cuspp: '345678CDEFG', nombre: 'TORRES DIAZ ANA', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep_aporte: '', rem_asegurable: '1,130.00', aporte_oblig: '113.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima_seguro: '15.48', comision_afp: '0.00' },
                { nro: 4, cuspp: '456789DEFGH', nombre: 'QUISPE HUAMAN LUIS', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep_aporte: '', rem_asegurable: '1,130.00', aporte_oblig: '113.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima_seguro: '15.48', comision_afp: '0.00' },
                { nro: 5, cuspp: '567890EFGHI', nombre: 'RAMIREZ SOTO JOSE', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep_aporte: '', rem_asegurable: '1,130.00', aporte_oblig: '113.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima_seguro: '15.48', comision_afp: '0.00' }
            ]
        };
        
        estadoActual = 'PENDIENTE';
        mostrarSeccionTabla();
        cargarDatosTabla();
        mostrarLoading(false);
        mostrarExito('Archivo cargado correctamente');
    }, 1500);
}

// ================================================
// MANEJO DE SECCIONES
// ================================================
function mostrarSeccionTabla() {
    document.getElementById('seccion-carga').style.display = 'none';
    document.getElementById('seccion-tabla').style.display = 'block';
}

function iniciarNuevaCarga() {
    document.getElementById('form-carga').reset();
    document.getElementById('nombre-archivo').textContent = 'Planilla_Nuevo_Formato_Ejemplo.xlsx';
    document.getElementById('nombre-archivo').style.background = '#003973';
    
    datosActuales = null;
    estadoActual = 'PENDIENTE';
    
    document.getElementById('seccion-carga').style.display = 'block';
    document.getElementById('seccion-tabla').style.display = 'none';
}

// ================================================
// TABLA
// ================================================
function cargarDatosTabla() {
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';
    
    const fila = document.createElement('tr');
    
    const estadoClase = estadoActual === 'PENDIENTE' ? 'estado-pendiente' : 'estado-presentada';
    const presentarDisabled = estadoActual === 'PRESENTADA' ? 'disabled' : '';
    const ticketDisabled = estadoActual === 'PENDIENTE' ? 'disabled' : '';
    
    fila.innerHTML = `
        <td>${datosActuales.afp}</td>
        <td>${datosActuales.tipo_trabajador}</td>
        <td>${datosActuales.rubro}</td>
        <td>${datosActuales.num_afiliados}</td>
        <td>${datosActuales.fondo_pensiones}</td>
        <td>${datosActuales.retenciones}</td>
        <td><span class="estado-badge ${estadoClase}">${estadoActual}</span></td>
        <td>${datosActuales.num_planilla || '-'}</td>
        <td><button class="btn-tabla btn-descargar" onclick="descargarPlanilla()">DESCARGAR</button></td>
        <td><button class="btn-tabla btn-presentar" onclick="presentarPlanilla()" ${presentarDisabled}>PRESENTAR</button></td>
        <td><button class="btn-tabla btn-descartar" onclick="descartarPlanilla()">DESCARTAR</button></td>
        <td><button class="btn-tabla btn-ticket" onclick="mostrarModalTicket()" ${ticketDisabled}>EMITIR</button></td>
    `;
    
    tbody.appendChild(fila);
}

// ================================================
// GENERAR PDF PLANILLA EN NUEVA VENTANA
// ================================================
function descargarPlanilla() {
    if (!datosActuales) return;

    const d = datosActuales;
    const estadoTexto = estadoActual;

    // Generar filas de afiliados
    let filasAfiliados = '';
    d.afiliados.forEach(af => {
        filasAfiliados += `
        <tr>
            <td>${af.nro}</td>
            <td>${af.cuspp}</td>
            <td>${af.nombre}</td>
            <td>${af.rel_lab}</td>
            <td>${af.inicio_rl}</td>
            <td>${af.cese_rl}</td>
            <td>${af.excep_aporte}</td>
            <td class="num">${af.rem_asegurable}</td>
            <td class="num">${af.aporte_oblig}</td>
            <td class="num">${af.comp_trab}</td>
            <td class="num">${af.comp_empl}</td>
            <td class="num">${af.vol_confin}</td>
            <td class="num">${af.vol_sinfin}</td>
            <td class="num">${af.vol_empl}</td>
            <td class="num">${af.prima_seguro}</td>
            <td class="num">${af.comision_afp}</td>
        </tr>`;
    });

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Planilla de Declaración y Pago de Aportes Previsionales</title>
<style>
    @media print {
        body { margin: 0; }
        .no-print { display: none !important; }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #000; padding: 20px; background: #fff; position: relative; }
    .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg); font-size: 100px; color: rgba(200,200,200,0.15); font-weight: bold; letter-spacing: 15px; pointer-events: none; z-index: 0; white-space: nowrap; }
    .container { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }
    
    /* Header */
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 2px solid #003973; padding-bottom: 10px; }
    .header-left { display: flex; align-items: center; gap: 8px; }
    .header-left .logo-text { font-size: 22px; font-weight: bold; }
    .header-left .logo-text span { color: #003973; }
    .header-left .logo-text .integra { color: #0066cc; }
    .header-left .sub { font-size: 9px; color: #666; }
    .header-center { text-align: center; flex: 1; }
    .header-center h1 { font-size: 14px; font-weight: bold; color: #000; letter-spacing: 1px; }
    .header-right { text-align: right; }
    .header-right .logo-afpnet { font-size: 18px; font-weight: bold; color: #003973; }
    .header-right .pago-facil { font-size: 9px; color: #e67e00; font-weight: bold; }
    
    /* Info línea */
    .info-line { display: flex; justify-content: center; gap: 40px; margin: 8px 0 15px; font-size: 11px; }
    .info-line .item { display: flex; align-items: center; gap: 5px; }
    .info-line .item label { font-weight: bold; }
    .info-line .item .val { border: 1px solid #999; padding: 3px 12px; min-width: 80px; text-align: center; }
    
    /* Sección título */
    .section-title { font-size: 11px; font-weight: bold; margin: 12px 0 5px; text-decoration: underline; }
    
    /* Tabla empleador */
    .tbl-empleador { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10px; }
    .tbl-empleador td { border: 1px solid #999; padding: 4px 8px; }
    .tbl-empleador .lbl { font-weight: bold; background: #f0f0f0; white-space: nowrap; width: 140px; }
    
    /* Resúmenes */
    .resumenes { display: flex; gap: 15px; margin-bottom: 15px; }
    .resumen-box { flex: 1; }
    .resumen-box h4 { font-size: 10px; font-weight: bold; margin-bottom: 5px; text-decoration: underline; }
    .tbl-resumen { width: 100%; border-collapse: collapse; font-size: 10px; }
    .tbl-resumen td { border: 1px solid #999; padding: 3px 6px; }
    .tbl-resumen .concepto { width: 65%; }
    .tbl-resumen .moneda { width: 10%; text-align: center; font-weight: bold; }
    .tbl-resumen .monto { width: 25%; text-align: right; }
    .tbl-resumen .total { font-weight: bold; background: #f5f5f5; }
    .tbl-otros { width: 100%; border-collapse: collapse; font-size: 10px; }
    .tbl-otros td { border: 1px solid #999; padding: 3px 6px; }
    .tbl-otros .lbl { font-weight: normal; width: 60%; }
    
    /* Tabla detalle */
    .tbl-detalle { width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 15px; }
    .tbl-detalle th { background: #003973; color: #fff; padding: 4px 3px; text-align: center; font-size: 8px; font-weight: bold; border: 1px solid #002255; }
    .tbl-detalle td { border: 1px solid #999; padding: 3px 4px; text-align: center; }
    .tbl-detalle td.num { text-align: right; }
    .tbl-detalle th.grupo { background: #004a99; }
    
    /* Botón imprimir */
    .btn-print { position: fixed; top: 15px; right: 15px; padding: 10px 25px; background: #003973; color: #fff; border: none; border-radius: 6px; font-size: 13px; font-weight: bold; cursor: pointer; z-index: 100; }
    .btn-print:hover { background: #0056b3; }
</style>
</head>
<body>

<div class="watermark">${estadoTexto}</div>

<button class="btn-print no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>

<div class="container">
    <!-- HEADER -->
    <div class="header">
        <div class="header-left">
            <div>
                <div class="logo-text"><span>AFP</span><span class="integra">Integra</span></div>
                <div class="sub">Una empresa <b>sura</b></div>
            </div>
        </div>
        <div class="header-center">
            <h1>PLANILLA DE DECLARACIÓN Y PAGO DE APORTES PREVISIONALES</h1>
        </div>
        <div class="header-right">
            <div class="logo-afpnet">AFPnet</div>
            <div class="pago-facil">PAGO FÁCIL</div>
        </div>
    </div>

    <!-- Info planilla -->
    <div class="info-line">
        <div class="item">
            <label>Número de Planilla:</label>
            <span class="val">${d.num_planilla || ''}</span>
        </div>
        <div class="item">
            <label>Periodo de Devengue:</label>
            <span class="val">${d.periodo}</span>
        </div>
    </div>

    <!-- IDENTIFICACIÓN DEL EMPLEADOR -->
    <div class="section-title">IDENTIFICACIÓN DEL EMPLEADOR</div>
    <table class="tbl-empleador">
        <tr>
            <td class="lbl">Nombre o R. Social:</td>
            <td colspan="3">${d.razon_social}</td>
            <td class="lbl">RUC:</td>
            <td>${d.ruc}</td>
        </tr>
        <tr>
            <td class="lbl">Dirección:</td>
            <td colspan="3">${d.direccion}</td>
            <td class="lbl">Urbanización:</td>
            <td>${d.urbanizacion}</td>
        </tr>
        <tr>
            <td class="lbl">Distrito:</td>
            <td>${d.distrito}</td>
            <td class="lbl">Provincia:</td>
            <td>${d.provincia}</td>
            <td class="lbl">Departamento:</td>
            <td>${d.departamento}</td>
        </tr>
        <tr>
            <td class="lbl">Representante Legal:</td>
            <td colspan="2">${d.representante_legal}</td>
            <td class="lbl">Elaborado por:</td>
            <td colspan="2">${d.elaborado_por}</td>
        </tr>
    </table>

    <!-- RESÚMENES -->
    <div class="resumenes">
        <div class="resumen-box">
            <h4>RESUMEN DE APORTES AL FONDO</h4>
            <table class="tbl-resumen">
                <tr><td class="concepto">Aporte Obligatorio</td><td class="moneda">S/.</td><td class="monto">${d.fondo_pensiones}</td></tr>
                <tr><td class="concepto">Aporte Complementario - Trabajador</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Complementario - Empleador</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Voluntario con Fin Previsional</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Voluntario sin Fin Previsional</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Voluntario del Empleador</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Sub-Total Fondo de Pensiones</td><td class="moneda">S/.</td><td class="monto">${d.fondo_pensiones}</td></tr>
                <tr><td class="concepto">Intereses Moratorios</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr class="total"><td class="concepto"><b>Total Fondo Pensiones</b></td><td class="moneda"><b>S/.</b></td><td class="monto"><b>${d.fondo_pensiones}</b></td></tr>
            </table>
        </div>
        <div class="resumen-box">
            <h4>RESUMEN DE RETENCIONES Y RETRIBUCIONES A</h4>
            <table class="tbl-resumen">
                <tr><td class="concepto">Prima de Seguro Previsional</td><td class="moneda">S/.</td><td class="monto">${d.prima_seguro || d.retenciones}</td></tr>
                <tr><td class="concepto">Comisión AFP</td><td class="moneda">S/.</td><td class="monto">${d.comision_afp}</td></tr>
                <tr><td class="concepto">Sub-total Retenciones y Retribuciones</td><td class="moneda">S/.</td><td class="monto">${d.retenciones}</td></tr>
                <tr><td class="concepto">Intereses Moratorios</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr class="total"><td class="concepto"><b>Total Retenciones y Retribuciones</b></td><td class="moneda"><b>S/.</b></td><td class="monto"><b>${d.retenciones}</b></td></tr>
            </table>
        </div>
        <div class="resumen-box">
            <h4>OTROS</h4>
            <table class="tbl-otros">
                <tr><td class="lbl">AFP</td><td>${d.afp}</td></tr>
                <tr><td class="lbl">Tipo de Trabajador</td><td>${d.tipo_trabajador_texto}</td></tr>
                <tr><td class="lbl">Tipo de Riesgo</td><td>${d.tipo_riesgo}</td></tr>
                <tr><td class="lbl">Nro. de Afiliados Declarados</td><td>${d.num_afiliados}</td></tr>
                <tr><td class="lbl">Estado de la Planilla</td><td>${estadoTexto}</td></tr>
            </table>
        </div>
    </div>

    <!-- TABLA DETALLE -->
    <table class="tbl-detalle">
        <thead>
            <tr>
                <th rowspan="2">Nro</th>
                <th rowspan="2">CUSPP</th>
                <th rowspan="2">Nombre</th>
                <th rowspan="2">Rel. Lab.</th>
                <th rowspan="2">Inicio RL</th>
                <th rowspan="2">Cese RL</th>
                <th rowspan="2">Excep. de aporte</th>
                <th rowspan="2">Remuneración Asegurable</th>
                <th rowspan="2">Aporte Obligatorio</th>
                <th colspan="2" class="grupo">Aportes Complementarios</th>
                <th colspan="3" class="grupo">Aportes Voluntarios</th>
                <th rowspan="2">Prima de Seguro</th>
                <th rowspan="2">Comisión AFP</th>
            </tr>
            <tr>
                <th>Trabajador</th>
                <th>Empleador</th>
                <th>Con Fin Prev.</th>
                <th>Sin Fin Prev.</th>
                <th>Empleador</th>
            </tr>
        </thead>
        <tbody>
            ${filasAfiliados}
        </tbody>
    </table>
</div>

</body>
</html>`;

    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    mostrarExito('Planilla generada correctamente');
}

// ================================================
// ACCIONES DE PLANILLA
// ================================================
function presentarPlanilla() {
    if (!confirm('¿Está seguro que desea presentar esta planilla?')) {
        return;
    }
    
    mostrarLoading(true);
    
    setTimeout(() => {
        const numPlanilla = 'PL' + Date.now();
        datosActuales.num_planilla = numPlanilla;
        estadoActual = 'PRESENTADA';
        
        cargarDatosTabla();
        mostrarLoading(false);
        mostrarExito('Planilla presentada exitosamente');
    }, 1000);
}

function descartarPlanilla() {
    if (!confirm('¿Está seguro que desea descartar esta planilla? Esta acción no se puede deshacer.')) {
        return;
    }
    
    mostrarLoading(true);
    
    setTimeout(() => {
        mostrarLoading(false);
        mostrarExito('Planilla descartada exitosamente');
        
        setTimeout(() => {
            iniciarNuevaCarga();
        }, 1500);
    }, 1000);
}

// ================================================
// MODAL DE TICKET
// ================================================
function mostrarModalTicket() {
    const modal = document.getElementById('modal-ticket');
    
    document.getElementById('ticket-devengue').textContent = datosActuales.periodo || '2025-01';
    document.getElementById('ticket-ruc').textContent = datosActuales.ruc || '';
    document.getElementById('ticket-razon').textContent = datosActuales.razon_social || '';
    document.getElementById('ticket-numero').textContent = datosActuales.num_planilla || '';
    document.getElementById('ticket-fondo').textContent = datosActuales.fondo_pensiones || '565.00';
    document.getElementById('ticket-retenciones').textContent = datosActuales.retenciones || '77.40';
    
    const fechaPago = new Date();
    fechaPago.setDate(fechaPago.getDate() + 3);
    const fechaStr = formatearFecha(fechaPago);
    document.getElementById('ticket-fecha').textContent = fechaStr;
    
    modal.classList.add('activo');
}

function cerrarModal() {
    const modal = document.getElementById('modal-ticket');
    modal.classList.remove('activo');
}

// ================================================
// GENERAR PDF TICKET EN NUEVA VENTANA
// ================================================
function emitirTicket() {
    cerrarModal();

    if (!datosActuales) return;

    const d = datosActuales;
    const numTicket = d.num_planilla || ('TK' + Date.now());
    const fondo = parseFloat(d.fondo_pensiones) || 565.00;
    const ret = parseFloat(d.retenciones) || 77.40;
    const total = (fondo + ret).toFixed(2);

    // Generar 3 fechas de pago consecutivas
    const fechaBase = new Date();
    fechaBase.setDate(fechaBase.getDate() + 3);
    const fechas = [];
    for (let i = 0; i < 3; i++) {
        const f = new Date(fechaBase);
        f.setDate(f.getDate() + i);
        fechas.push(formatearFecha(f));
    }

    const ahora = new Date();
    const fechaEmision = formatearFecha(ahora);
    const horaEmision = ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Fecha límite (1 mes después)
    const fechaLimite = new Date(fechaBase);
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    const fechaLimiteStr = formatearFecha(fechaLimite);

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Ticket de Pago - AFP ${d.afp}</title>
<style>
    @media print {
        body { margin: 0; }
        .no-print { display: none !important; }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #000; padding: 30px; background: #fff; }
    .container { max-width: 700px; margin: 0 auto; border: 2px solid #003973; padding: 30px; }
    
    /* Header */
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #003973; }
    .header-left .logo { font-size: 22px; font-weight: bold; color: #003973; }
    .header-left .pago-facil { font-size: 10px; color: #e67e00; font-weight: bold; }
    .header-right { text-align: center; }
    .header-right h1 { font-size: 20px; font-weight: bold; color: #000; margin-bottom: 3px; }
    .header-right h2 { font-size: 14px; font-weight: bold; color: #003973; }
    
    /* Info empleador */
    .info-emp { margin-bottom: 20px; font-size: 12px; line-height: 1.8; }
    .info-emp .row { display: flex; gap: 10px; }
    .info-emp .lbl { font-weight: bold; min-width: 120px; }
    
    /* Tabla de montos */
    .tbl-montos { width: 100%; border-collapse: collapse; margin: 15px 0 20px; }
    .tbl-montos th { background: #003973; color: #fff; padding: 10px 12px; text-align: center; font-size: 11px; font-weight: bold; border: 1px solid #002255; }
    .tbl-montos td { padding: 8px 12px; text-align: center; border: 1px solid #999; font-size: 12px; }
    .tbl-montos tr:first-child td { font-weight: bold; }
    .tbl-montos .total { font-weight: bold; }
    
    /* Fechas emisión */
    .fechas-emision { display: flex; justify-content: space-between; margin: 15px 0; font-size: 11px; }
    .fechas-emision .item span { font-weight: bold; }
    
    /* Notas */
    .nota { margin: 12px 0; font-size: 11px; line-height: 1.6; color: #333; }
    .nota-bancos { margin: 12px 0; font-size: 11px; }
    .nota-bancos ul { margin: 5px 0 5px 20px; }
    .nota-bancos li { padding: 2px 0; }
    .nota-final { margin-top: 12px; font-size: 11px; color: #333; line-height: 1.6; }
    
    /* Botón imprimir */
    .btn-print { position: fixed; top: 15px; right: 15px; padding: 10px 25px; background: #003973; color: #fff; border: none; border-radius: 6px; font-size: 13px; font-weight: bold; cursor: pointer; z-index: 100; }
    .btn-print:hover { background: #0056b3; }
</style>
</head>
<body>

<button class="btn-print no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>

<div class="container">
    <!-- HEADER -->
    <div class="header">
        <div class="header-left">
            <div class="logo">AFPnet</div>
            <div class="pago-facil">PAGO FÁCIL</div>
        </div>
        <div class="header-right">
            <h1>TICKET DE PAGO</h1>
            <h2>AFP ${d.afp} - N° ${numTicket}</h2>
        </div>
    </div>

    <!-- Info Empleador -->
    <div class="info-emp">
        <div class="row"><span class="lbl">Empleador</span><span>: ${d.razon_social}</span></div>
        <div class="row"><span class="lbl">N° de RUC</span><span>: ${d.ruc}</span></div>
        <div class="row"><span class="lbl">Monto a Pagar</span><span>:</span></div>
    </div>

    <!-- Tabla Montos -->
    <table class="tbl-montos">
        <thead>
            <tr>
                <th>Fecha de Pago</th>
                <th>Fondo de Pensiones</th>
                <th>Retenciones y Retribuciones</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><b>${fechas[0]}</b></td>
                <td><b>${fondo.toFixed(2)}</b></td>
                <td><b>${ret.toFixed(2)}</b></td>
                <td><b>${total}</b></td>
            </tr>
            <tr>
                <td>${fechas[1]}</td>
                <td>${fondo.toFixed(2)}</td>
                <td>${ret.toFixed(2)}</td>
                <td>${total}</td>
            </tr>
            <tr>
                <td>${fechas[2]}</td>
                <td>${fondo.toFixed(2)}</td>
                <td>${ret.toFixed(2)}</td>
                <td>${total}</td>
            </tr>
        </tbody>
    </table>

    <!-- Fechas de emisión -->
    <div class="fechas-emision">
        <div class="item"><span>Emitido</span> : ${fechaEmision} ${horaEmision}</div>
        <div class="item"><span>Impreso</span>: ${fechaEmision} ${horaEmision}</div>
    </div>

    <!-- Notas -->
    <p class="nota">Los montos corresponden a las fechas indicadas. Si desea conocer los montos a pagar en una fecha distinta, emita el ticket indicando la nueva fecha de pago.</p>

    <p class="nota">El ticket se puede pagar desde el ${fechas[0]} a las 3:00PM hasta el ${fechaLimiteStr}. Para pagar después, será necesario emitirlo nuevamente.</p>

    <div class="nota-bancos">
        <p>Puede pagar este ticket en los siguientes bancos:</p>
        <ul>
            <li>BANBIF</li>
            <li>BBVA - WEB Y AGENTES</li>
            <li>SCOTIABANK</li>
        </ul>
    </div>

    <p class="nota-final">Para efectuar el pago basta indicar la AFP y el número de ticket, no es necesario imprimir el presente formato.</p>
</div>

</body>
</html>`;

    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    mostrarExito('Ticket generado correctamente');
}

// ================================================
// UTILIDADES
// ================================================
function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = mostrar ? 'flex' : 'none';
    }
}

function mostrarExito(mensaje) {
    const div = document.createElement('div');
    div.className = 'mensaje-exito';
    div.textContent = mensaje;
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            div.remove();
        }, 300);
    }, 3000);
}

function mostrarAlerta(mensaje, tipo = 'info') {
    alert(mensaje);
}

function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

// ================================================
// CERRAR MODAL AL HACER CLICK FUERA
// ================================================
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-ticket');
    if (e.target === modal) {
        cerrarModal();
    }
});

// ================================================
// ESC PARA CERRAR MODAL
// ================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});