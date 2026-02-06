<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Resumen de Situación de Obligaciones de Pago</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./por_devengue.css">
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
    <div class="page-banner">RESUMEN DE SITUACIÓN DE OBLIGACIONES DE PAGO</div>
    <div class="content">
        <div class="filtros-section">
            <h2 class="filtros-title">Filtros de Búsqueda</h2>
            
            <form id="formBusqueda">
                <!-- Periodo de Devengue -->
                <div class="frow">
                    <label class="fl">Periodo de Devengue:</label>
                    <div class="periodo-group">
                        <span class="periodo-label">Inicial</span>
                        <select id="periodo-inicial" name="periodo-inicial">
                            <option value="">Seleccione</option>
                            <option value="202401">Enero 2024</option>
                            <option value="202402">Febrero 2024</option>
                            <option value="202403">Marzo 2024</option>
                            <option value="202404">Abril 2024</option>
                            <option value="202405">Mayo 2024</option>
                            <option value="202406">Junio 2024</option>
                            <option value="202407">Julio 2024</option>
                            <option value="202408">Agosto 2024</option>
                            <option value="202409">Septiembre 2024</option>
                            <option value="202410">Octubre 2024</option>
                            <option value="202411">Noviembre 2024</option>
                            <option value="202412">Diciembre 2024</option>
                            <option value="202501">Enero 2025</option>
                            <option value="202502">Febrero 2025</option>
                            <option value="202503">Marzo 2025</option>
                            <option value="202504">Abril 2025</option>
                            <option value="202505">Mayo 2025</option>
                            <option value="202506">Junio 2025</option>
                        </select>
                    </div>
                    <div class="periodo-group">
                        <span class="periodo-label">Final</span>
                        <select id="periodo-final" name="periodo-final">
                            <option value="">Seleccione</option>
                            <option value="202401">Enero 2024</option>
                            <option value="202402">Febrero 2024</option>
                            <option value="202403">Marzo 2024</option>
                            <option value="202404">Abril 2024</option>
                            <option value="202405">Mayo 2024</option>
                            <option value="202406">Junio 2024</option>
                            <option value="202407">Julio 2024</option>
                            <option value="202408">Agosto 2024</option>
                            <option value="202409">Septiembre 2024</option>
                            <option value="202410">Octubre 2024</option>
                            <option value="202411">Noviembre 2024</option>
                            <option value="202412">Diciembre 2024</option>
                            <option value="202501">Enero 2025</option>
                            <option value="202502">Febrero 2025</option>
                            <option value="202503">Marzo 2025</option>
                            <option value="202504">Abril 2025</option>
                            <option value="202505">Mayo 2025</option>
                            <option value="202506">Junio 2025</option>
                        </select>
                    </div>
                </div>

                <!-- Presuntas -->
                <div class="frow">
                    <label class="fl">Presuntas:</label>
                    <div class="toggle-group" id="toggle-presuntas">
                        <button type="button" class="toggle-btn inactive" data-value="si">SI</button>
                        <button type="button" class="toggle-btn inactive" data-value="no">NO</button>
                        <button type="button" class="toggle-btn active-sin" data-value="sin">SIN VALOR</button>
                    </div>
                </div>

                <!-- Ciertas con Deudas -->
                <div class="frow">
                    <label class="fl">Ciertas con Deudas:</label>
                    <div class="toggle-group" id="toggle-deudas">
                        <button type="button" class="toggle-btn inactive" data-value="si">SI</button>
                        <button type="button" class="toggle-btn inactive" data-value="no">NO</button>
                        <button type="button" class="toggle-btn active-sin" data-value="sin">SIN VALOR</button>
                    </div>
                </div>

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

<script src="./por_devengue.js"></script>
</body>
</html>