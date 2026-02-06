// ================================================
// BASE DE DATOS SIMULADA
// ================================================
const BD_EMPRESA = {
    ruc: '20603401574',
    razon_social: 'CORPORACION DE FORMACION CONTINUA DEL PERU S.A.C.',
    direccion: 'AV.-RIVERA NAVARRETE 451',
    urbanizacion: 'URB.-JARDIN',
    distrito: 'SAN ISIDRO',
    provincia: 'LIMA',
    departamento: 'LIMA',
    telefono: '994489051',
    representante_legal: 'CALDERON ORMEÑO',
    dni_representante: '',
    elaborado_por: 'CALDERON ORMEÑO, JOSE',
    area: 'GestionarEmpleador'
};

const BD_PLANILLAS = [
    {
        id: 1,
        afp: 'INTEGRA',
        num_planilla: '2222409982',
        nominal_fondo: 368.00,
        nominal_ryr: 50.42,
        estado: 'PAGADA',
        tipo_trabajador: 'DEPENDIENTE',
        tipo_riesgo: 'NORMAL',
        fecha_declaracion: '15/01/2026',
        fecha_pago: '28/01/2026',
        num_ticket: '2514777586',
        banco: 'BBVA CONTINENTAL',
        forma_pago: 'PT',
        devengue: '2025-12',
        intereses_moratorios_fondo: 2.21,
        intereses_moratorios_ryr: 0.30,
        comision_afp: 0.00,
        prima_seguro: 50.42,
        afiliados: [
            { nro: 1, cuspp: '674580DPGOR5', nombre: 'RODRIGUEZ PEREZ MARIA', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,250.00', aporte_oblig: '125.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '17.13', comision: '0.00' },
            { nro: 2, cuspp: '681740GSRUD5', nombre: 'GARCIA LOPEZ CARLOS', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,200.00', aporte_oblig: '120.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '16.44', comision: '0.00' },
            { nro: 3, cuspp: '672071GTQQS6', nombre: 'TORRES DIAZ ANA', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,230.00', aporte_oblig: '123.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '16.85', comision: '0.00' }
        ]
    },
    {
        id: 2,
        afp: 'PRIMA',
        num_planilla: '2517763612',
        nominal_fondo: 140.00,
        nominal_ryr: 19.18,
        estado: 'PAGADA',
        tipo_trabajador: 'DEPENDIENTE',
        tipo_riesgo: 'NORMAL',
        fecha_declaracion: '15/01/2026',
        fecha_pago: '28/01/2026',
        num_ticket: '5514777675',
        banco: 'BBVA CONTINENTAL',
        forma_pago: 'PT',
        devengue: '2025-12',
        intereses_moratorios_fondo: 0.84,
        intereses_moratorios_ryr: 0.11,
        comision_afp: 0.00,
        prima_seguro: 19.18,
        afiliados: [
            { nro: 1, cuspp: '556890ABCDE', nombre: 'QUISPE HUAMAN LUIS', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,400.00', aporte_oblig: '140.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '19.18', comision: '0.00' }
        ]
    },
    {
        id: 3,
        afp: 'PROFUTURO',
        num_planilla: '2314808181',
        nominal_fondo: 113.00,
        nominal_ryr: 15.48,
        estado: 'PAGADA',
        tipo_trabajador: 'DEPENDIENTE',
        tipo_riesgo: 'NORMAL',
        fecha_declaracion: '15/01/2026',
        fecha_pago: '28/01/2026',
        num_ticket: '3514777713',
        banco: 'BBVA CONTINENTAL',
        forma_pago: 'PT',
        devengue: '2025-12',
        intereses_moratorios_fondo: 0.68,
        intereses_moratorios_ryr: 0.09,
        comision_afp: 0.00,
        prima_seguro: 15.48,
        afiliados: [
            { nro: 1, cuspp: '778901FGHIJ', nombre: 'RAMIREZ SOTO JOSE', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,130.00', aporte_oblig: '113.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '15.48', comision: '0.00' }
        ]
    },
    {
        id: 4,
        afp: 'INTEGRA',
        num_planilla: '2222510001',
        nominal_fondo: 450.00,
        nominal_ryr: 61.65,
        estado: 'PRESENTADA',
        tipo_trabajador: 'DEPENDIENTE',
        tipo_riesgo: 'NORMAL',
        fecha_declaracion: '10/01/2026',
        fecha_pago: '',
        num_ticket: '',
        banco: '',
        forma_pago: '',
        devengue: '2025-11',
        intereses_moratorios_fondo: 0.00,
        intereses_moratorios_ryr: 0.00,
        comision_afp: 0.00,
        prima_seguro: 61.65,
        afiliados: [
            { nro: 1, cuspp: '674580DPGOR5', nombre: 'RODRIGUEZ PEREZ MARIA', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,250.00', aporte_oblig: '125.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '17.13', comision: '0.00' },
            { nro: 2, cuspp: '681740GSRUD5', nombre: 'GARCIA LOPEZ CARLOS', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,200.00', aporte_oblig: '120.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '16.44', comision: '0.00' },
            { nro: 3, cuspp: '889012KLMNO', nombre: 'MENDOZA VARGAS PEDRO', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '1,500.00', aporte_oblig: '150.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '20.55', comision: '0.00' },
            { nro: 4, cuspp: '990123PQRST', nombre: 'SILVA CASTILLO ROSA', rel_lab: 'S', inicio_rl: 'N', cese_rl: 'N', excep: '', rem_aseg: '400.00', aporte_oblig: '55.00', comp_trab: '0.00', comp_empl: '0.00', vol_confin: '0.00', vol_sinfin: '0.00', vol_empl: '0.00', prima: '7.53', comision: '0.00' }
        ]
    }
];

// ================================================
// INICIALIZACIÓN
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    // Nada extra por ahora
});

// ================================================
// CAMBIO DE TIPO DE BÚSQUEDA
// ================================================
function cambiarTipoBusqueda(tipo) {
    document.getElementById('filtros-avanzada').style.display = tipo === 'avanzada' ? 'block' : 'none';
    document.getElementById('filtros-planilla').style.display = tipo === 'planilla' ? 'block' : 'none';
    document.getElementById('filtros-ticket').style.display = tipo === 'ticket' ? 'block' : 'none';
}

// ================================================
// BÚSQUEDA CON FILTROS
// ================================================
function buscar() {
    const tipoBusqueda = document.querySelector('input[name="tipo_busqueda"]:checked').value;
    let resultados = [];

    mostrarLoading(true);

    setTimeout(() => {
        if (tipoBusqueda === 'avanzada') {
            resultados = busquedaAvanzada();
        } else if (tipoBusqueda === 'planilla') {
            resultados = busquedaPorPlanilla();
        } else if (tipoBusqueda === 'ticket') {
            resultados = busquedaPorTicket();
        }

        mostrarLoading(false);

        if (resultados.length === 0) {
            mostrarMensaje('No se encontraron resultados con los filtros aplicados.', 'error');
            document.getElementById('seccion-resultados').style.display = 'none';
        } else {
            renderizarResultados(resultados);
        }
    }, 800);
}

function busquedaAvanzada() {
    const afp = document.getElementById('filtro-afp').value;
    const periodoIni = document.getElementById('filtro-periodo-ini').value;
    const periodoFin = document.getElementById('filtro-periodo-fin').value;
    const estado = document.getElementById('filtro-estado').value;
    const fechaDeclaIni = document.getElementById('filtro-fecha-decla-ini').value;
    const fechaDeclaFin = document.getElementById('filtro-fecha-decla-fin').value;
    const fechaPagoIni = document.getElementById('filtro-fecha-pago-ini').value;
    const fechaPagoFin = document.getElementById('filtro-fecha-pago-fin').value;

    return BD_PLANILLAS.filter(p => {
        // Filtro AFP
        if (afp && p.afp !== afp) return false;

        // Filtro Periodo
        if (periodoIni && p.devengue < periodoIni) return false;
        if (periodoFin && p.devengue > periodoFin) return false;

        // Filtro Estado
        if (estado && p.estado !== estado) return false;

        // Filtro Fecha Declaración
        if (fechaDeclaIni || fechaDeclaFin) {
            const fechaDecla = parsearFecha(p.fecha_declaracion);
            if (fechaDecla) {
                if (fechaDeclaIni && fechaDecla < new Date(fechaDeclaIni)) return false;
                if (fechaDeclaFin && fechaDecla > new Date(fechaDeclaFin + 'T23:59:59')) return false;
            }
        }

        // Filtro Fecha Pago
        if (fechaPagoIni || fechaPagoFin) {
            if (!p.fecha_pago) return false;
            const fechaPago = parsearFecha(p.fecha_pago);
            if (fechaPago) {
                if (fechaPagoIni && fechaPago < new Date(fechaPagoIni)) return false;
                if (fechaPagoFin && fechaPago > new Date(fechaPagoFin + 'T23:59:59')) return false;
            }
        }

        return true;
    });
}

function busquedaPorPlanilla() {
    const num = document.getElementById('filtro-num-planilla').value.trim();
    if (!num) {
        mostrarMensaje('Ingrese un número de planilla.', 'error');
        return [];
    }
    return BD_PLANILLAS.filter(p => p.num_planilla.includes(num));
}

function busquedaPorTicket() {
    const num = document.getElementById('filtro-num-ticket').value.trim();
    if (!num) {
        mostrarMensaje('Ingrese un número de ticket.', 'error');
        return [];
    }
    return BD_PLANILLAS.filter(p => p.num_ticket.includes(num));
}

// ================================================
// RENDERIZAR RESULTADOS AGRUPADOS
// ================================================
function renderizarResultados(resultados) {
    const seccion = document.getElementById('seccion-resultados');
    seccion.style.display = 'block';
    document.getElementById('total-registros').textContent = resultados.length;

    // Agrupar por devengue
    const grupos = {};
    resultados.forEach(p => {
        if (!grupos[p.devengue]) {
            grupos[p.devengue] = [];
        }
        grupos[p.devengue].push(p);
    });

    const tbody = document.getElementById('tabla-agrupada-body');
    tbody.innerHTML = '';

    let idx = 0;
    for (const devengue in grupos) {
        const planillas = grupos[devengue];
        const totalFondo = planillas.reduce((s, p) => s + p.nominal_fondo, 0);
        const totalRyR = planillas.reduce((s, p) => s + p.nominal_ryr, 0);

        // Fila de grupo
        const filaGrupo = document.createElement('tr');
        filaGrupo.className = 'fila-grupo';
        filaGrupo.setAttribute('data-grupo', idx);
        filaGrupo.onclick = function() { toggleGrupo(idx); };
        filaGrupo.innerHTML = `
            <td><button class="toggle-icon" id="toggle-${idx}">−</button></td>
            <td style="text-align:center;">${devengue}</td>
            <td class="monto-total">${totalFondo.toFixed(2)}</td>
            <td class="monto-total">${totalRyR.toFixed(2)}</td>
        `;
        tbody.appendChild(filaGrupo);

        // Fila detalle (sub-tabla)
        const filaDetalle = document.createElement('tr');
        filaDetalle.className = 'fila-detalle visible';
        filaDetalle.id = `detalle-${idx}`;

        let filasHTML = '';
        planillas.forEach(p => {
            const esPagada = p.estado === 'PAGADA';
            filasHTML += `
            <tr>
                <td>${p.afp}</td>
                <td>${p.num_planilla}</td>
                <td style="text-align:right;">${p.nominal_fondo.toFixed(2)}</td>
                <td style="text-align:right;">${p.nominal_ryr.toFixed(2)}</td>
                <td>${p.estado}</td>
                <td>${p.tipo_trabajador}</td>
                <td>${p.fecha_declaracion}</td>
                <td>${p.fecha_pago || '-'}</td>
                <td>${p.num_ticket || '-'}</td>
                <td>${p.banco || '-'}</td>
                <td>${p.forma_pago || '-'}</td>
                <td>
                    <div class="acciones-cell">
                        <button class="btn-accion btn-accion-imprimir" onclick="event.stopPropagation(); imprimirPlanilla(${p.id})">IMPRIMIR</button>
                        <button class="btn-accion btn-accion-anular" onclick="event.stopPropagation(); anularPlanilla(${p.id})" ${esPagada ? '' : 'disabled style="opacity:0.5;cursor:not-allowed;"'}>ANULAR</button>
                        <button class="btn-accion btn-accion-pagar" onclick="event.stopPropagation(); pagarEnLinea(${p.id})" ${esPagada ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>PAGAR EN LÍNEA</button>
                        <button class="btn-accion btn-accion-emitir" onclick="event.stopPropagation(); emitirTicketConsulta(${p.id})" ${esPagada ? '' : ''}>EMITIR TICKET</button>
                    </div>
                </td>
            </tr>`;
        });

        filaDetalle.innerHTML = `
            <td colspan="4" style="padding:0;">
                <div class="subtabla-wrapper">
                    <table class="subtabla">
                        <thead>
                            <tr>
                                <th>AFP</th>
                                <th>N° de Planilla</th>
                                <th>Nominal Fondo</th>
                                <th>Nominal RyR</th>
                                <th>Estado</th>
                                <th>Tipo de Trabajador</th>
                                <th>F. Declaración</th>
                                <th>F. Pago</th>
                                <th>N° de Ticket</th>
                                <th>Banco</th>
                                <th>Forma de Pago</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>${filasHTML}</tbody>
                    </table>
                </div>
            </td>
        `;
        tbody.appendChild(filaDetalle);

        idx++;
    }

    // Scroll suave a resultados
    seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ================================================
// TOGGLE ACCORDION
// ================================================
function toggleGrupo(idx) {
    const detalle = document.getElementById(`detalle-${idx}`);
    const icon = document.getElementById(`toggle-${idx}`);

    if (detalle.classList.contains('visible')) {
        detalle.classList.remove('visible');
        icon.textContent = '+';
        icon.classList.remove('abierto');
    } else {
        detalle.classList.add('visible');
        icon.textContent = '−';
        icon.classList.add('abierto');
    }
}

// ================================================
// IMPRIMIR PLANILLA (PDF en nueva ventana)
// ================================================
function imprimirPlanilla(id) {
    const p = BD_PLANILLAS.find(x => x.id === id);
    if (!p) return;

    const emp = BD_EMPRESA;
    const totalFondo = (p.nominal_fondo + p.intereses_moratorios_fondo).toFixed(2);
    const subtotalRyr = p.nominal_ryr.toFixed(2);
    const totalRyr = (p.nominal_ryr + p.intereses_moratorios_ryr).toFixed(2);

    let filasAfiliados = '';
    p.afiliados.forEach(af => {
        filasAfiliados += `
        <tr>
            <td>${af.nro}</td>
            <td>${af.cuspp}</td>
            <td style="text-align:left;">${af.nombre}</td>
            <td>${af.rel_lab}</td>
            <td>${af.inicio_rl}</td>
            <td>${af.cese_rl}</td>
            <td>${af.excep}</td>
            <td class="num">${af.rem_aseg}</td>
            <td class="num">${af.aporte_oblig}</td>
            <td class="num">${af.comp_trab}</td>
            <td class="num">${af.comp_empl}</td>
            <td class="num">${af.vol_confin}</td>
            <td class="num">${af.vol_sinfin}</td>
            <td class="num">${af.vol_empl}</td>
            <td class="num">${af.prima}</td>
            <td class="num">${af.comision}</td>
        </tr>`;
    });

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Planilla ${p.num_planilla}</title>
<style>
    @media print { body { margin: 0; } .no-print { display: none !important; } }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 10px; color: #000; padding: 15px; background: #fff; position: relative; }
    .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg); font-size: 90px; color: rgba(200,200,200,0.15); font-weight: bold; letter-spacing: 12px; pointer-events: none; z-index: 0; }
    .container { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 2px solid #003973; padding-bottom: 8px; }
    .header-left .logo-text { font-size: 20px; font-weight: bold; }
    .header-left .logo-text span { color: #003973; }
    .header-left .logo-text .integra { color: #0066cc; }
    .header-left .sub { font-size: 8px; color: #666; }
    .header-center { text-align: center; flex: 1; }
    .header-center h1 { font-size: 13px; font-weight: bold; }
    .header-right .logo-afpnet { font-size: 16px; font-weight: bold; color: #003973; }
    .header-right .pago-facil { font-size: 8px; color: #e67e00; font-weight: bold; }
    .info-line { display: flex; justify-content: center; gap: 40px; margin: 6px 0 10px; font-size: 10px; }
    .info-line .item { display: flex; align-items: center; gap: 5px; }
    .info-line .item label { font-weight: bold; }
    .info-line .item .val { border: 1px solid #999; padding: 2px 10px; min-width: 80px; text-align: center; }
    .section-title { font-size: 10px; font-weight: bold; margin: 8px 0 4px; text-decoration: underline; }
    .tbl-emp { width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 9px; }
    .tbl-emp td { border: 1px solid #999; padding: 3px 6px; }
    .tbl-emp .lbl { font-weight: bold; background: #f0f0f0; white-space: nowrap; }
    .resumenes { display: flex; gap: 10px; margin-bottom: 10px; }
    .resumen-box { flex: 1; }
    .resumen-box h4 { font-size: 9px; font-weight: bold; margin-bottom: 3px; text-decoration: underline; }
    .tbl-res { width: 100%; border-collapse: collapse; font-size: 9px; }
    .tbl-res td { border: 1px solid #999; padding: 2px 5px; }
    .tbl-res .concepto { width: 65%; }
    .tbl-res .moneda { width: 10%; text-align: center; font-weight: bold; }
    .tbl-res .monto { width: 25%; text-align: right; }
    .tbl-res .total { font-weight: bold; background: #f5f5f5; }
    .tbl-otros { width: 100%; border-collapse: collapse; font-size: 9px; }
    .tbl-otros td { border: 1px solid #999; padding: 2px 5px; }
    .tbl-det { width: 100%; border-collapse: collapse; font-size: 8px; margin-top: 10px; }
    .tbl-det th { background: #003973; color: #fff; padding: 3px 2px; text-align: center; font-size: 7.5px; border: 1px solid #002255; }
    .tbl-det td { border: 1px solid #999; padding: 2px 3px; text-align: center; }
    .tbl-det td.num { text-align: right; }
    .tbl-det th.grupo { background: #004a99; }
    .btn-print { position: fixed; top: 12px; right: 12px; padding: 10px 22px; background: #003973; color: #fff; border: none; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; z-index: 100; }
    .btn-print:hover { background: #0056b3; }
</style>
</head>
<body>
<div class="watermark">${p.estado}</div>
<button class="btn-print no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
<div class="container">
    <div class="header">
        <div class="header-left">
            <div class="logo-text"><span>AFP</span><span class="integra">Integra</span></div>
            <div class="sub">Una empresa <b>sura</b></div>
        </div>
        <div class="header-center"><h1>PLANILLA DE DECLARACIÓN Y PAGO DE APORTES PREVISIONALES</h1></div>
        <div class="header-right">
            <div class="logo-afpnet">AFPnet</div>
            <div class="pago-facil">PAGO FÁCIL</div>
        </div>
    </div>
    <div class="info-line">
        <div class="item"><label>Número de Planilla:</label><span class="val">${p.num_planilla}</span></div>
        <div class="item"><label>Periodo de Devengue:</label><span class="val">${p.devengue}</span></div>
    </div>
    <div class="section-title">IDENTIFICACIÓN DEL EMPLEADOR</div>
    <table class="tbl-emp">
        <tr><td class="lbl">Nombre o Razón Social:</td><td colspan="3">${emp.razon_social}</td><td class="lbl">RUC:</td><td>${emp.ruc}</td></tr>
        <tr><td class="lbl">Dirección:</td><td colspan="3">${emp.direccion}</td><td class="lbl">Urbanización o Localidad:</td><td>${emp.urbanizacion}</td></tr>
        <tr><td class="lbl">Distrito:</td><td>${emp.distrito}</td><td class="lbl">Provincia:</td><td>${emp.provincia}</td><td class="lbl">Departamento:</td><td>${emp.departamento}</td></tr>
        <tr><td class="lbl">Representante Legal:</td><td>${emp.representante_legal}</td><td class="lbl">DNI:</td><td>${emp.dni_representante}</td><td class="lbl">Elaborado por:</td><td>${emp.elaborado_por}</td></tr>
        <tr><td colspan="4"></td><td class="lbl">Área:</td><td>${emp.area}</td></tr>
        <tr><td colspan="4"></td><td class="lbl">Teléfono:</td><td>${emp.telefono}</td></tr>
    </table>
    <div class="resumenes">
        <div class="resumen-box">
            <h4>RESUMEN DE APORTES AL FONDO</h4>
            <table class="tbl-res">
                <tr><td class="concepto">Aporte Obligatorio</td><td class="moneda">S/.</td><td class="monto">${p.nominal_fondo.toFixed(2)}</td></tr>
                <tr><td class="concepto">Aporte Complementario - Trabajador</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Complementario - Empleador</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Voluntario con Fin Previsional</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Voluntario sin Fin Previsional</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Aporte Voluntario del Empleador</td><td class="moneda">S/.</td><td class="monto">0.00</td></tr>
                <tr><td class="concepto">Sub-Total Fondo de Pensiones</td><td class="moneda">S/.</td><td class="monto">${p.nominal_fondo.toFixed(2)}</td></tr>
                <tr><td class="concepto">Intereses Moratorios</td><td class="moneda">S/.</td><td class="monto">${p.intereses_moratorios_fondo.toFixed(2)}</td></tr>
                <tr class="total"><td class="concepto"><b>Total Fondo Pensiones</b></td><td class="moneda"><b>S/.</b></td><td class="monto"><b>${totalFondo}</b></td></tr>
            </table>
        </div>
        <div class="resumen-box">
            <h4>RESUMEN DE RETENCIONES Y RETRIBUCIONES A</h4>
            <table class="tbl-res">
                <tr><td class="concepto">Prima de Seguro Previsional</td><td class="moneda">S/.</td><td class="monto">${p.prima_seguro.toFixed(2)}</td></tr>
                <tr><td class="concepto">Comisión AFP</td><td class="moneda">S/.</td><td class="monto">${p.comision_afp.toFixed(2)}</td></tr>
                <tr><td class="concepto">Sub-total Retenciones y Retribuciones</td><td class="moneda">S/.</td><td class="monto">${subtotalRyr}</td></tr>
                <tr><td class="concepto">Intereses Moratorios</td><td class="moneda">S/.</td><td class="monto">${p.intereses_moratorios_ryr.toFixed(2)}</td></tr>
                <tr class="total"><td class="concepto"><b>Total Retenciones y Retribuciones</b></td><td class="moneda"><b>S/.</b></td><td class="monto"><b>${totalRyr}</b></td></tr>
            </table>
        </div>
        <div class="resumen-box">
            <h4>OTROS</h4>
            <table class="tbl-otros">
                <tr><td>AFP</td><td>${p.afp}</td></tr>
                <tr><td>Tipo de Trabajador</td><td>${p.tipo_trabajador}</td></tr>
                <tr><td>Tipo de Riesgo</td><td>${p.tipo_riesgo}</td></tr>
                <tr><td>Nro. de Afiliados Declarados</td><td>${p.afiliados.length}</td></tr>
                <tr><td>Estado de la Planilla</td><td>${p.estado}</td></tr>
                <tr><td>Fecha de Presentación</td><td>${p.fecha_declaracion}</td></tr>
                <tr><td>Nro. de Ticket</td><td>${p.num_ticket || '-'}</td></tr>
                ${p.forma_pago ? `<tr><td>Forma de Pago</td><td>Pagada vía AFPnet ticket</td></tr>` : ''}
                ${p.fecha_pago ? `<tr><td>Fecha de Pago</td><td>${p.fecha_pago}</td></tr>` : ''}
                ${p.banco ? `<tr><td>Banco</td><td>${p.banco}</td></tr>` : ''}
            </table>
        </div>
    </div>
    <table class="tbl-det">
        <thead>
            <tr>
                <th rowspan="2">Nro</th><th rowspan="2">CUSPP</th><th rowspan="2">Nombre</th>
                <th rowspan="2">Rel. Lab.</th><th rowspan="2">Inicio RL</th><th rowspan="2">Cese RL</th>
                <th rowspan="2">Excep. de aportar</th><th rowspan="2">Remuneración Asegurable</th>
                <th rowspan="2">Aporte Obligatorio</th>
                <th colspan="2" class="grupo">Aportes Complementarios</th>
                <th colspan="3" class="grupo">Aportes Voluntarios</th>
                <th rowspan="2">Prima de Seguro</th><th rowspan="2">Comisión AFP</th>
            </tr>
            <tr>
                <th>Trabajador</th><th>Empleador</th>
                <th>Con Fin Prev.</th><th>Sin Fin Prev.</th><th>Empleador</th>
            </tr>
        </thead>
        <tbody>${filasAfiliados}</tbody>
    </table>
</div>
</body></html>`;

    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
}

// ================================================
// ANULAR PLANILLA
// ================================================
function anularPlanilla(id) {
    const p = BD_PLANILLAS.find(x => x.id === id);
    if (!p) return;

    if (!confirm(`¿Está seguro que desea anular la planilla ${p.num_planilla}?\nEsta acción no se puede deshacer.`)) {
        return;
    }

    mostrarLoading(true);
    setTimeout(() => {
        mostrarLoading(false);
        mostrarMensaje(`Planilla ${p.num_planilla} anulada correctamente.`, 'exito');
    }, 1000);
}

// ================================================
// PAGAR EN LÍNEA
// ================================================
function pagarEnLinea(id) {
    const p = BD_PLANILLAS.find(x => x.id === id);
    if (!p) return;

    if (p.estado === 'PAGADA') {
        mostrarMensaje('Esta planilla ya se encuentra pagada.', 'error');
        return;
    }

    if (!confirm(`¿Desea proceder con el pago en línea de la planilla ${p.num_planilla}?`)) {
        return;
    }

    mostrarLoading(true);
    setTimeout(() => {
        mostrarLoading(false);
        mostrarMensaje(`Redirigiendo a pasarela de pago para planilla ${p.num_planilla}...`, 'exito');
    }, 1000);
}

// ================================================
// EMITIR TICKET DESDE CONSULTA
// ================================================
function emitirTicketConsulta(id) {
    const p = BD_PLANILLAS.find(x => x.id === id);
    if (!p) return;

    const emp = BD_EMPRESA;
    const fondo = p.nominal_fondo + p.intereses_moratorios_fondo;
    const ret = p.nominal_ryr + p.intereses_moratorios_ryr;
    const total = (fondo + ret).toFixed(2);
    const numTicket = p.num_ticket || ('TK' + Date.now());

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
    const fechaLimite = new Date(fechaBase);
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Ticket de Pago - AFP ${p.afp}</title>
<style>
    @media print { body { margin: 0; } .no-print { display: none !important; } }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #000; padding: 30px; background: #fff; }
    .container { max-width: 700px; margin: 0 auto; border: 2px solid #003973; padding: 30px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #003973; }
    .header-left .logo { font-size: 22px; font-weight: bold; color: #003973; }
    .header-left .pago-facil { font-size: 10px; color: #e67e00; font-weight: bold; }
    .header-right { text-align: center; }
    .header-right h1 { font-size: 20px; font-weight: bold; margin-bottom: 3px; }
    .header-right h2 { font-size: 14px; font-weight: bold; color: #003973; }
    .info-emp { margin-bottom: 20px; font-size: 12px; line-height: 1.8; }
    .info-emp .row { display: flex; gap: 10px; }
    .info-emp .lbl { font-weight: bold; min-width: 120px; }
    .tbl-montos { width: 100%; border-collapse: collapse; margin: 15px 0 20px; }
    .tbl-montos th { background: #003973; color: #fff; padding: 10px 12px; text-align: center; font-size: 11px; border: 1px solid #002255; }
    .tbl-montos td { padding: 8px 12px; text-align: center; border: 1px solid #999; }
    .tbl-montos tr:first-child td { font-weight: bold; }
    .fechas { display: flex; justify-content: space-between; margin: 15px 0; font-size: 11px; }
    .fechas span { font-weight: bold; }
    .nota { margin: 12px 0; font-size: 11px; line-height: 1.6; color: #333; }
    .nota-bancos { margin: 12px 0; font-size: 11px; }
    .nota-bancos ul { margin: 5px 0 5px 20px; }
    .nota-final { margin-top: 12px; font-size: 11px; color: #333; }
    .btn-print { position: fixed; top: 12px; right: 12px; padding: 10px 22px; background: #003973; color: #fff; border: none; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; z-index: 100; }
    .btn-print:hover { background: #0056b3; }
</style>
</head>
<body>
<button class="btn-print no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
<div class="container">
    <div class="header">
        <div class="header-left"><div class="logo">AFPnet</div><div class="pago-facil">PAGO FÁCIL</div></div>
        <div class="header-right"><h1>TICKET DE PAGO</h1><h2>AFP ${p.afp} - N° ${numTicket}</h2></div>
    </div>
    <div class="info-emp">
        <div class="row"><span class="lbl">Empleador</span><span>: ${emp.razon_social}</span></div>
        <div class="row"><span class="lbl">N° de RUC</span><span>: ${emp.ruc}</span></div>
        <div class="row"><span class="lbl">Monto a Pagar</span><span>:</span></div>
    </div>
    <table class="tbl-montos">
        <thead><tr><th>Fecha de Pago</th><th>Fondo de Pensiones</th><th>Retenciones y Retribuciones</th><th>Total</th></tr></thead>
        <tbody>
            <tr><td><b>${fechas[0]}</b></td><td><b>${fondo.toFixed(2)}</b></td><td><b>${ret.toFixed(2)}</b></td><td><b>${total}</b></td></tr>
            <tr><td>${fechas[1]}</td><td>${fondo.toFixed(2)}</td><td>${ret.toFixed(2)}</td><td>${total}</td></tr>
            <tr><td>${fechas[2]}</td><td>${fondo.toFixed(2)}</td><td>${ret.toFixed(2)}</td><td>${total}</td></tr>
        </tbody>
    </table>
    <div class="fechas"><div><span>Emitido</span> : ${fechaEmision} ${horaEmision}</div><div><span>Impreso</span>: ${fechaEmision} ${horaEmision}</div></div>
    <p class="nota">Los montos corresponden a las fechas indicadas. Si desea conocer los montos a pagar en una fecha distinta, emita el ticket indicando la nueva fecha de pago.</p>
    <p class="nota">El ticket se puede pagar desde el ${fechas[0]} a las 3:00PM hasta el ${formatearFecha(fechaLimite)}. Para pagar después, será necesario emitirlo nuevamente.</p>
    <div class="nota-bancos"><p>Puede pagar este ticket en los siguientes bancos:</p><ul><li>BANBIF</li><li>BBVA - WEB Y AGENTES</li><li>SCOTIABANK</li></ul></div>
    <p class="nota-final">Para efectuar el pago basta indicar la AFP y el número de ticket, no es necesario imprimir el presente formato.</p>
</div>
</body></html>`;

    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    mostrarMensaje('Ticket generado correctamente', 'exito');
}

// ================================================
// IMPRIMIR TODO (resumen general)
// ================================================
function imprimirTodo() {
    window.print();
}

// ================================================
// DESCARGAR EXCEL (simulado)
// ================================================
function descargarExcel() {
    mostrarMensaje('Descarga de Excel en desarrollo...', 'exito');
}

// ================================================
// AYUDA
// ================================================
function mostrarAyuda() {
    mostrarMensaje('Abriendo guía de uso...', 'exito');
}

// ================================================
// UTILIDADES
// ================================================
function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = mostrar ? 'flex' : 'none';
}

function mostrarMensaje(mensaje, tipo) {
    const div = document.createElement('div');
    div.className = tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error';
    div.textContent = mensaje;
    document.body.appendChild(div);

    setTimeout(() => {
        div.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

function parsearFecha(fechaStr) {
    if (!fechaStr || fechaStr === '-') return null;
    const partes = fechaStr.split('/');
    if (partes.length !== 3) return null;
    return new Date(partes[2], partes[1] - 1, partes[0]);
}