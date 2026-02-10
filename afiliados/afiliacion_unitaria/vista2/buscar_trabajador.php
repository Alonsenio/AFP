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
<?php
    require "../../../componentes/topbar.php"
?>
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
            <!-- Mensaje de error -->
            <div class="msg msg-err" id="m-err"><i class="fas fa-exclamation-circle"></i><span id="m-err-t"></span></div>

            <!-- Mensaje informativo (BD offline) -->
            <div class="msg msg-info" id="m-info" style="background:#fff3cd;color:#856404;border-left:4px solid #ffc107;">
                <i class="fas fa-info-circle"></i>
                <span id="m-info-t"></span>
            </div>

            <!-- DNIs de Prueba Disponibles -->
            <div class="msg msg-info vis" style="background:#e3f2fd;color:#1565c0;border-left:4px solid #1976d2;margin-bottom:20px;">
                <i class="fas fa-info-circle"></i>
                <span><strong>DNIs de prueba disponibles:</strong> 
                    <code style="background:#fff;padding:2px 6px;border-radius:3px;font-weight:bold;">12345678</code>  | 
                    <code style="background:#fff;padding:2px 6px;border-radius:3px;font-weight:bold;">87654321</code>  | 
                    <code style="background:#fff;padding:2px 6px;border-radius:3px;font-weight:bold;">11111111</code>  | 
                    <code style="background:#fff;padding:2px 6px;border-radius:3px;font-weight:bold;">22222222</code> 
                </span>
            </div>

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

    <div class="btn-row">
        <button class="btn btn-blue" id="btn-continuar">
            <i class="fas fa-arrow-right"></i> CONTINUAR
        </button>
    </div>


</main>
<script src="./buscar_trabajador.js"></script>
</body>
</html>