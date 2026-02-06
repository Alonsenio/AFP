<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta y Pago de Planillas - AFPnet</title>
    <link rel="stylesheet" href="consulta_y_pago_de_planillas.css">
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
            <h1>APORTES > CONSULTA Y PAGO DE PLANILLAS</h1>
        </div>

        <!-- Sección de Filtros -->
        <section class="content-section">
            <div class="filtros-header">
                <h2 class="section-title">Filtros de Búsqueda</h2>
                <button type="button" class="btn btn-ayuda" onclick="mostrarAyuda()">AYUDA</button>
            </div>

            <div class="filtros-container">
                <!-- Opción Avanzada -->
                <div class="filtro-opcion">
                    <label class="radio-label">
                        <input type="radio" name="tipo_busqueda" value="avanzada" checked onchange="cambiarTipoBusqueda('avanzada')">
                        <span>Avanzada:</span>
                    </label>
                    <div id="filtros-avanzada" class="filtro-campos">
                        <div class="campo-fila">
                            <label class="campo-label">AFP:</label>
                            <select id="filtro-afp" class="form-select">
                                <option value="">Seleccione</option>
                                <option value="INTEGRA">INTEGRA</option>
                                <option value="PRIMA">PRIMA</option>
                                <option value="PROFUTURO">PROFUTURO</option>
                                <option value="HABITAT">HABITAT</option>
                            </select>
                        </div>
                        <div class="campo-fila">
                            <label class="campo-label">Periodo de Devengue:</label>
                            <div class="campo-rango">
                                <span class="rango-label">Inicial</span>
                                <select id="filtro-periodo-ini" class="form-select form-select-sm">
                                    <option value="2025-12">2025-12</option>
                                    <option value="2025-11">2025-11</option>
                                    <option value="2025-10">2025-10</option>
                                    <option value="2025-09">2025-09</option>
                                    <option value="2025-08">2025-08</option>
                                    <option value="2025-07">2025-07</option>
                                    <option value="2025-06">2025-06</option>
                                    <option value="2025-05">2025-05</option>
                                    <option value="2025-04">2025-04</option>
                                    <option value="2025-03">2025-03</option>
                                    <option value="2025-02">2025-02</option>
                                    <option value="2025-01">2025-01</option>
                                    <option value="2024-12">2024-12</option>
                                </select>
                                <span class="rango-label">Final</span>
                                <select id="filtro-periodo-fin" class="form-select form-select-sm">
                                    <option value="2026-01">2026-01</option>
                                    <option value="2025-12" selected>2025-12</option>
                                    <option value="2025-11">2025-11</option>
                                    <option value="2025-10">2025-10</option>
                                    <option value="2025-09">2025-09</option>
                                    <option value="2025-08">2025-08</option>
                                    <option value="2025-07">2025-07</option>
                                    <option value="2025-06">2025-06</option>
                                    <option value="2025-05">2025-05</option>
                                    <option value="2025-04">2025-04</option>
                                    <option value="2025-03">2025-03</option>
                                    <option value="2025-02">2025-02</option>
                                    <option value="2025-01">2025-01</option>
                                </select>
                            </div>
                        </div>
                        <div class="campo-fila">
                            <label class="campo-label">Estado:</label>
                            <select id="filtro-estado" class="form-select">
                                <option value="">Seleccione</option>
                                <option value="PAGADA">PAGADA</option>
                                <option value="PRESENTADA">PRESENTADA</option>
                                <option value="PENDIENTE">PENDIENTE</option>
                            </select>
                        </div>
                        <div class="campo-fila">
                            <label class="campo-label">Fecha de Declaración:</label>
                            <div class="campo-rango">
                                <span class="rango-label">Inicial</span>
                                <input type="date" id="filtro-fecha-decla-ini" class="form-input form-input-sm">
                                <span class="rango-label">Final</span>
                                <input type="date" id="filtro-fecha-decla-fin" class="form-input form-input-sm">
                            </div>
                        </div>
                        <div class="campo-fila">
                            <label class="campo-label">Fecha de Pago:</label>
                            <div class="campo-rango">
                                <span class="rango-label">Inicial</span>
                                <input type="date" id="filtro-fecha-pago-ini" class="form-input form-input-sm">
                                <span class="rango-label">Final</span>
                                <input type="date" id="filtro-fecha-pago-fin" class="form-input form-input-sm">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Opción Por Planilla -->
                <div class="filtro-opcion">
                    <label class="radio-label">
                        <input type="radio" name="tipo_busqueda" value="planilla" onchange="cambiarTipoBusqueda('planilla')">
                        <span>Por Planilla:</span>
                    </label>
                    <div id="filtros-planilla" class="filtro-campos" style="display: none;">
                        <div class="campo-fila">
                            <label class="campo-label">N° de Planilla:</label>
                            <input type="text" id="filtro-num-planilla" class="form-input">
                        </div>
                    </div>
                </div>

                <!-- Opción Por Ticket -->
                <div class="filtro-opcion">
                    <label class="radio-label">
                        <input type="radio" name="tipo_busqueda" value="ticket" onchange="cambiarTipoBusqueda('ticket')">
                        <span>Por Ticket:</span>
                    </label>
                    <div id="filtros-ticket" class="filtro-campos" style="display: none;">
                        <div class="campo-fila">
                            <label class="campo-label">N° de Ticket:</label>
                            <input type="text" id="filtro-num-ticket" class="form-input">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="filtros-acciones">
                <button type="button" class="btn btn-guia" onclick="mostrarAyuda()">GUIA DE USO</button>
                <button type="button" class="btn btn-buscar" onclick="buscar()">BUSCAR</button>
                <button type="button" class="btn btn-descargar-excel" onclick="descargarExcel()">DESCARGAR</button>
            </div>
        </section>

        <!-- Sección de Resultados -->
        <section id="seccion-resultados" class="content-section" style="display: none;">
            <p class="contador-registros">Se han encontrado <strong id="total-registros">0</strong> registros.</p>

            <div class="tabla-agrupada-wrapper">
                <table class="tabla-agrupada">
                    <thead>
                        <tr>
                            <th style="width: 40px;"></th>
                            <th>Devengue</th>
                            <th>Total<br>Fondo de Pensiones</th>
                            <th>Total<br>Retenciones y Retribuciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-agrupada-body">
                        <!-- Se llenará dinámicamente -->
                    </tbody>
                </table>
            </div>

            <!-- Botón IMPRIMIR general -->
            <div class="imprimir-general">
                <button type="button" class="btn btn-imprimir-general" onclick="imprimirTodo()">IMPRIMIR</button>
            </div>
        </section>

        <!-- Overlay de Loading -->
        <div id="loading" class="loading-overlay" style="display: none;">
            <div class="spinner"></div>
        </div>
    </main>

    <script src="consulta_y_pago_de_planillas.js"></script>
</body>
</html>