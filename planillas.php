<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Presentación y Pago de Planillas</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"></script>
    <link rel="stylesheet" href="planillas.css">
</head>
<body>

<!-- TOPBAR -->
<header class="topbar">
    <div class="topbar-left">
        <div class="topbar-logo" onclick="location.href='dashboard.php'">AFPnet<span>PAGO FÁCIL</span></div>
        <button class="btn-menu" id="btn-tog"><i class="fas fa-bars"></i></button>
        <div class="topbar-welcome">Bienvenido Sr(a). <strong id="w-name">Usuario</strong></div>
    </div>
    <div class="topbar-right">
        <div class="topbar-time" id="tb-time"></div>
        <div class="user-badge"><div class="user-avatar" id="u-init">U</div><span id="u-name">Usuario</span></div>
    </div>
</header>

<div class="sov" id="sov"></div>

<!-- SIDEBAR -->
<aside class="sidebar" id="sb">
    <nav class="sidebar-nav">
        <div><a class="nav-link" href="dashboard.php"><span><i class="fas fa-home" style="width:18px;margin-right:8px"></i> Inicio</span></a></div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-cogs" style="width:18px;margin-right:8px"></i> Administración</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Usuarios</a><a href="#">Permisos</a><a href="#">Datos de la empresa</a></div>
        </div>
        <div>
            <div class="nav-link active open" onclick="togSub(this)"><span><i class="fas fa-file-invoice-dollar" style="width:18px;margin-right:8px"></i> Aportes</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu open"><a href="planillas.php" class="act">Presentación y Pago de Planillas</a><a href="#">Consulta y Pago de Planillas</a><a href="#">Consulta y Pago de Regularizaciones</a><a href="#">Pagos Pendientes de 2da firma</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-users" style="width:18px;margin-right:8px"></i> Afiliados</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="afiliados.php">Consultar afiliados</a><a href="#">Afiliar trabajadores al SPP</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-clipboard-list" style="width:18px;margin-right:8px"></i> Módulo REPRO</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Consultas</a><a href="#">Reportes</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-money-check-alt" style="width:18px;margin-right:8px"></i> Obligaciones de Pago</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Ver obligaciones</a><a href="#">Historial de pagos</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-exclamation-triangle" style="width:18px;margin-right:8px"></i> Deudas Ciertas y Presuntas</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Liquidaciones</a><a href="#">Descargos de cobranza</a></div>
        </div>
        <div class="nav-sep"></div>
        <div><a class="nav-link" href="#"><span><i class="fas fa-key" style="width:18px;margin-right:8px"></i> Cambiar Contraseña</span></a></div>
        <div><div class="nav-link nav-danger" onclick="cerrarSesion()"><span><i class="fas fa-sign-out-alt" style="width:18px;margin-right:8px"></i> Cerrar Sesión</span></div></div>
    </nav>
</aside>

<!-- MAIN -->
<main class="main" id="mc">
    <div class="page-banner"><span>APORTES &gt;</span> PRESENTACIÓN Y PAGO DE PLANILLAS</div>
    <div class="content">
        <div class="imp-box">
            <h3>Importante:</h3>
            <ul>
                <li>Descargue el modelo para la declaración de planilla <a href="#">aquí</a> y el modelo para la declaración de las semanas contributivas <a href="#">aquí</a>.</li>
                <li>Tenga en cuenta que solo puede trabajar la información de esta bandeja de trabajo hasta el final del día. Luego la información será borrada.</li>
            </ul>
        </div>

        <div class="fcard">
            <div class="msg msg-err" id="m-err"><i class="fas fa-exclamation-circle"></i><span id="m-err-t"></span></div>
            <div class="msg msg-ok" id="m-ok"><i class="fas fa-check-circle"></i><span id="m-ok-t"></span></div>
            <div class="frow">
                <label class="fl">Periodo de Devengue: <span class="req">*</span></label>
                <select id="sel-per"><option value="">Seleccione</option></select>
            </div>
            <div class="frow">
                <label class="fl">Planilla única: <span class="req">*</span></label>
                <div class="fu-wrap" id="fu-w">
                    <div class="fu-name" id="fu-n">Ningún archivo seleccionado</div>
                    <button type="button" class="fu-btn" onclick="document.getElementById('file-input').click()">Seleccionar</button>
                </div>
                <input type="file" id="file-input" accept=".xlsx,.xls,.csv">
            </div>
            <div class="chk-row"><input type="checkbox" id="chk-sem"><label for="chk-sem">Cargar semana contributiva</label></div>
            <p class="req-note">Los campos marcados con asterisco (*) son obligatorios.</p>
            <div class="btn-row">
                <button class="btn btn-green"><i class="fas fa-book"></i> GUÍA DE USO</button>
                <button class="btn btn-blue" id="btn-cargar"><span class="spinner"></span><i class="fas fa-upload"></i> CARGAR</button>
            </div>
        </div>

        <div class="results" id="results">
            <p class="results-info">Seleccione la AFP con la que desee trabajar, así como el tipo de operación.</p>
            <div class="tbl-wrap">
                <div class="tbl-scroll">
                    <table>
                        <thead><tr>
                            <th>AFP</th><th>Tipo<br>Trabajador</th><th>Rubro</th><th>N° de<br>Afiliados</th>
                            <th>Fondo de<br>pensiones</th><th>Retenciones y<br>Retribuciones</th>
                            <th>Estado</th><th>N° de Planilla</th>
                            <th>Descargar</th><th>Presentar</th><th>Descartar</th><th>Ticket</th>
                        </tr></thead>
                        <tbody id="res-body"></tbody>
                    </table>
                </div>
                <div class="tbl-footer">
                    <button class="btn btn-orange" onclick="nuevaCarga()"><i class="fas fa-plus-circle"></i> INICIAR NUEVA CARGA DE ARCHIVO</button>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- MODAL: EMITIR -->
<div class="mo" id="mo-emit">
    <div class="modal">
        <div class="mh mh-blue">EMISIÓN DE TICKET<button class="mx" onclick="closeM('mo-emit')"><i class="fas fa-times"></i></button></div>
        <div class="mb"><div class="ig" id="emit-ig"></div><p style="font-size:13px;color:#555;font-weight:600">El pago no está afecto a intereses debido a fecha de pago oportuna.</p></div>
        <div class="mf"><button class="btn btn-gray" onclick="closeM('mo-emit')">REGRESAR</button><button class="btn btn-blue" id="btn-do-emit">EMITIR TICKET</button></div>
    </div>
</div>

<!-- MODAL: TICKET EMITIDO -->
<div class="mo" id="mo-ticket">
    <div class="modal">
        <div class="mh mh-green">TICKET EMITIDO<button class="mx" onclick="closeM('mo-ticket')"><i class="fas fa-times"></i></button></div>
        <div class="mb" id="ticket-mb"></div>
        <div class="mf"><button class="btn btn-gray" onclick="closeM('mo-ticket')">REGRESAR</button><button class="btn btn-blue" id="btn-print"><i class="fas fa-print"></i> IMPRIMIR TICKET</button></div>
    </div>
</div>
<script src="planillas.js"></script>
</body>
</html>
