<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Registrar Movimientos Laborales</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./planilla_movimiento_laboral.css">
</head>
<body>

<!-- TOPBAR -->
<?php
    require "../../componentes/topbar.php"
?>
<div class="sov" id="sov"></div>

<!-- SIDEBAR -->
<?php
    require "../../componentes/sidebar.php"
?>

<!-- CONTENIDO -->
<main class="main" id="mc">
    <div class="page-banner">REGISTRAR MOVIMIENTOS LABORALES</div>
    <div class="content">
        
        <!-- IMPORTANTE -->
        <div class="importante-box">
            <h3>Importante:</h3>
            <ul>
                <li>Descargue el modelo para la declaración de planilla <a href="#" id="link-modelo">aquí</a></li>
            </ul>
        </div>

        <!-- FORMULARIO -->
        <div class="form-section">
            <form id="formCarga">
                <!-- Archivo -->
                <div class="file-row">
                    <label>Archivo: <span class="req">*</span></label>
                    <div class="file-input-wrapper">
                        <div class="file-display" id="file-display">Seleccione Archivo</div>
                        <button type="button" class="file-btn" onclick="document.getElementById('file-input').click()">
                            Seleccionar
                        </button>
                    </div>
                    <input type="file" id="file-input" accept=".txt,.csv">
                </div>

                <!-- Tipo de Archivo -->
                <div class="type-row">
                    <label>Tipo de Archivo:</label>
                    <div class="type-display">TXT</div>
                </div>

                <!-- Notas -->
                <p class="note-required">Los campos marcados con asterisco (*) son obligatorios.</p>
                <p class="note-warning">Si el campo Estado de su archivo cargado indica FL(FALLIDO), debe volver a cargarlo.</p>

                <!-- Botón Cargar -->
                <div class="btn-row">
                    <button type="button" class="btn btn-blue" id="btn-cargar">
                        <span class="spinner"></span>
                        <i class="fas fa-upload"></i>
                        CARGAR
                    </button>
                </div>
            </form>
        </div>

        <!-- ÚLTIMOS ARCHIVOS CARGADOS -->
        <div class="ultimos-section">
            <h3 class="ultimos-title">Últimos Archivos Cargados</h3>
            <div id="ultimos-container">
                <div class="ultimos-empty">No hay archivos cargados recientemente</div>
            </div>
        </div>

    </div>
</main>

<script src="./planilla_movimiento_laboral.js"></script>
</body>
</html>