<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Consulta de Afiliados Unitaria</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./buscar_trabajador.css">
</head>
<body>

<!-- TOPBAR -->
<header class="topbar">
    <div class="topbar-left">
        <div class="topbar-logo" onclick="location.href='../../inicio/inicio.php'">AFPnet<span>PAGO FÁCIL</span></div>
        <button class="btn-menu" id="btn-tog"><i class="fas fa-bars"></i></button>
        <div class="topbar-info">
            <span class="ruc" id="tb-ruc">20100000001</span> - <span id="tb-razon">EMPRESA</span><br>
            Bienvenido Sr(a). <strong id="w-name">Usuario</strong> (Administrador)
        </div>
    </div>
    <div class="topbar-right">
        <div class="topbar-time" id="tb-time"></div>
        <div class="user-badge"><div class="user-avatar" id="u-init">U</div><span id="u-name">Usuario</span></div>
    </div>
</header>
<div class="sov" id="sov"></div>
<!-- SIDEBAR -->
<?php
    require "../../../componentes/sidebar.php"
?>
<!-- CONTENIDO -->
<main class="main" id="mc">
    <div class="page-banner"><span>AFILIADOS &gt;</span> CONSULTA DE AFILIADOS UNITARIA</div>
    <div class="content">

        <!-- SEARCH FORM -->
        <div class="search-card">
            <div class="msg msg-err" id="m-err"><i class="fas fa-exclamation-circle"></i><span id="m-err-t"></span></div>

            <!-- Option 2: Tipo Documento -->
            <div class="search-option">
                <label class="radio-label">
                    <input type="radio" name="search-type" value="documento" id="r-doc" checked>
                    Tipo Documento:
                </label>
                <select class="search-select" id="sel-tipodoc">
                    <option value="">- TODOS -</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">Carnet de Extranjería</option>
                    <option value="PAS">Pasaporte</option>
                    <option value="PTP">PTP</option>
                </select>
                <input type="text" class="search-input w-doc" id="inp-numdoc" placeholder="" maxlength="15" autocomplete="off">
            </div>

           
            <!-- Buttons -->
            <div class="btn-row">
                <button class="btn btn-green"><i class="fas fa-book"></i> GUIA DE USO</button>
                <button class="btn btn-orange" id="btn-buscar"><span class="spinner"></span><i class="fas fa-search"></i> BUSCAR</button>
            </div>
        </div>

        <!-- RESULTS -->
        <div class="results" id="results">
            <p class="results-count" id="res-count"></p>
            <div class="tbl-wrap">
                <div class="tbl-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo y Nro. Documento</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Nombres</th>
                                <th>CUSPP</th>
                                <th>Devengue máximo<br>para aportar</th>
                                <th>Motivo de pensión</th>
                                <th>AFP</th>
                                <th>Tipo de Comisión</th>
                                <th>% de Comisión</th>
                            </tr>
                        </thead>
                        <tbody id="res-body"></tbody>
                    </table>
                </div>
            </div>
            <p class="important-note"><strong>*Importante:</strong> La AFP, el tipo y el porcentaje de comisión que se muestran corresponden al devengue máximo para aportar</p>
        </div>

    </div>
</main>
<script src="./buscar_trabajador.js"></script>
</body>
</html>
