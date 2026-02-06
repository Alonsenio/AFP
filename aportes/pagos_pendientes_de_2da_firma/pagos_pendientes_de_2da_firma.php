<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagos Pendientes de 2da Firma - AFPnet</title>
    <link rel="stylesheet" href="pagos_pendientes_de_2da_firma.css">
</head>
<body>
    <!-- ===== TOP BAR ===== -->
    <?php
        require "../../componentes/topbar.php"
    ?>
    
    <!-- ===== SIDEBAR ===== -->
    <?php
        require "../../componentes/sidebar.php"
    ?>

    <!-- ===== CONTENIDO PRINCIPAL ===== -->
    <main class="main-content">
        <!-- Breadcrumb -->
        <div class="page-header">
            <h1>APORTES > PAGOS PENDIENTES DE 2DA FIRMA</h1>
        </div>

        <!-- Sección de Filtros de Búsqueda -->
        <section class="content-section">
            <h2 class="section-title">Filtros de Búsqueda</h2>

            <div class="filtros-form">
                <div class="form-group">
                    <label for="numero_documento">N° de Planilla / Regularización: / N° de Ticket REPRO</label>
                    <input type="text" id="numero_documento" name="numero_documento" class="form-input" placeholder="">
                </div>

                <div class="form-group">
                    <label for="tipo_documento">Tipo de Documento:</label>
                    <select id="tipo_documento" name="tipo_documento" class="form-select">
                        <option value="planilla" selected>Planilla</option>
                        <option value="regularizacion">Regularización</option>
                        <option value="ticket_repro">Ticket REPRO</option>
                    </select>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-guia" onclick="mostrarGuiaUso()">GUIA DE USO</button>
                    <button type="button" class="btn btn-buscar" onclick="buscar()">BUSCAR</button>
                </div>
            </div>
        </section>

        <!-- Sección de Resultados -->
        <section class="content-section">
            <h2 class="section-title">Resultados de Búsqueda</h2>

            <!-- Mensaje sin resultados -->
            <div id="sin-resultados" class="sin-resultados">
                <p>No se encontraron resultados en la búsqueda.</p>
            </div>

            <!-- Tabla de resultados (oculta inicialmente) -->
            <div id="seccion-resultados" class="tabla-wrapper" style="display: none;">
                <table class="tabla-datos">
                    <thead>
                        <tr>
                            <th>N° Documento</th>
                            <th>Tipo</th>
                            <th>AFP</th>
                            <th>Periodo</th>
                            <th>Monto Total (S/.)</th>
                            <th>Estado</th>
                            <th>Fecha Presentación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-body">
                        <!-- Se llenará dinámicamente -->
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Overlay de Loading -->
        <div id="loading" class="loading-overlay" style="display: none;">
            <div class="spinner"></div>
        </div>
    </main>

    <script src="pagos_pendientes_de_2da_firma.js"></script>
</body>
</html>