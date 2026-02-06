<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Consulta y Actualización de Obligación de Pago por Afiliado</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./por_afiliados.css">
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
    <div class="page-banner">CONSULTA Y ACTUALIZACIÓN DE OBLIGACIÓN DE PAGO POR AFILIADO</div>
    <div class="content">
        <div class="filtros-section">
            <h2 class="filtros-title">Filtros de Búsqueda</h2>
            
            <form id="formBusqueda">
                <!-- CUSPP -->
                <div class="frow">
                    <label class="fl">CUSPP:</label>
                    <input type="text" id="cuspp" name="cuspp" placeholder="">
                </div>

                <!-- Doc. de Identidad -->
                <div class="frow">
                    <label class="fl">Doc. de Identidad: <span class="req">*</span></label>
                    <div class="radio-group">
                        <div class="radio-item">
                            <input type="radio" id="radio-dni" name="doc-tipo" value="dni" checked>
                            <label for="radio-dni">DNI</label>
                        </div>
                        <select id="select-dni" name="select-dni">
                            <option value="">DNI</option>
                            <option value="dni">DNI</option>
                            <option value="ce">Carnet de Extranjería</option>
                            <option value="pasaporte">Pasaporte</option>
                        </select>
                    </div>
                    <div class="ruc-group">
                        <label>RUC: <span class="req">*</span></label>
                        <input type="text" id="ruc" name="ruc" value="" placeholder="20603401574">
                    </div>
                </div>

                <!-- Nombres y Apellidos -->
                <div class="frow">
                    <label class="fl">Nombres y Apellidos:</label>
                    <input type="text" id="nombres" name="nombres" placeholder="" style="min-width: 400px;">
                </div>

                <!-- Nota de campos obligatorios -->
                <p class="req-note">Los campos marcados con asterisco (*) son obligatorios.</p>

                <!-- Botones -->
                <div class="btn-row">
                    <button type="button" class="btn btn-green" id="btn-guia">
                        <i class="fas fa-book"></i> GUÍA DE USO
                    </button>
                    <button type="button" class="btn btn-orange" id="btn-ayuda">
                        <i class="fas fa-question-circle"></i> AYUDA
                    </button>
                    <button type="button" class="btn btn-orange" id="btn-buscar">
                        <i class="fas fa-search"></i> BUSCAR
                    </button>
                </div>
            </form>
        </div>

        <!-- Aquí se mostrarían los resultados de búsqueda -->
        <div class="resultados-section" id="resultados" style="display:none;">
            <!-- Los resultados se cargarían aquí dinámicamente -->
        </div>
    </div>
</main>

<script src="./por_afiliados.js"></script>
</body>
</html>