<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presentación y Pago de Planillas - AFPnet</title>
    <link rel="stylesheet" href="presentacion_y_pago_de_planillas.css">
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
            <h1>APORTES > PRESENTACIÓN Y PAGO DE PLANILLAS</h1>
        </div>

        <!-- Sección de Información -->
        <section class="info-section">
            <div class="info-box">
                <h3>Importante:</h3>
                <ul>
                    <li>Descargue el modelo para la declaración de planilla <a href="#" class="link-descarga">aquí</a> y el modelo para la declaración de las semanas contributivas <a href="#" class="link-descarga">aquí</a>.</li>
                    <li>Tenga en cuenta que solo puede trabajar la información de esta bandeja de trabajo hasta el final del día. Luego la información será borrada.</li>
                </ul>
            </div>
        </section>

        <!-- Sección de Carga de Archivo -->
        <section id="seccion-carga" class="content-section">
            <form id="form-carga" class="form-carga">
                <div class="form-group">
                    <label for="periodo">Periodo de Devengue: <span class="required">*</span></label>
                    <select id="periodo" name="periodo" required>
                        <option value="2025-01" selected>2025-01</option>
                        <option value="2024-12">2024-12</option>
                        <option value="2024-11">2024-11</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="planilla">Planilla única: <span class="required">*</span></label>
                    <div class="file-upload">
                        <input type="file" id="planilla" name="planilla" accept=".xlsx,.xls" style="display: none;">
                        <button type="button" class="btn-seleccionar" onclick="document.getElementById('planilla').click()">Seleccionar</button>
                        <span id="nombre-archivo" class="nombre-archivo">Planilla_Nuevo_Formato_Ejemplo.xlsx</span>
                    </div>
                </div>

                <div class="form-group checkbox-group">
                    <input type="checkbox" id="semana_contributiva" name="semana_contributiva">
                    <label for="semana_contributiva">Cargar semana contributiva</label>
                </div>

                <p class="nota-obligatorio">Los campos marcados con asterisco (*) son obligatorios.</p>

                <div class="form-actions">
                    <button type="button" class="btn btn-guia">GUÍA DE USO</button>
                    <button type="submit" class="btn btn-cargar">CARGAR</button>
                </div>
            </form>
        </section>

        <!-- Sección de Tabla (oculta inicialmente) -->
        <section id="seccion-tabla" class="content-section" style="display: none;">
            <div class="tabla-wrapper">
                <table class="tabla-datos">
                    <thead>
                        <tr>
                            <th>AFP</th>
                            <th>Tipo Trabajador</th>
                            <th>Rubro</th>
                            <th>N° de Afiliados</th>
                            <th>Fondo de pensiones</th>
                            <th>Retenciones y Retribuciones</th>
                            <th>Estado</th>
                            <th>N° de Planilla</th>
                            <th>Descargar</th>
                            <th>Presentar</th>
                            <th>Descartar</th>
                            <th>Ticket</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-body">
                        <!-- Se llenará dinámicamente con JavaScript -->
                    </tbody>
                </table>
            </div>
            <button type="button" class="btn btn-nueva-carga" onclick="iniciarNuevaCarga()">
                INICIAR NUEVA CARGA DE ARCHIVO
            </button>
        </section>

        <!-- Modal de Ticket -->
        <div id="modal-ticket" class="modal">
            <div class="modal-contenido">
                <h2>EMISIÓN DE TICKET</h2>
                
                <div class="ticket-info">
                    <div class="info-row">
                        <span class="label">Devengue:</span>
                        <span class="valor" id="ticket-devengue">2025-01</span>
                    </div>
                    <div class="info-row">
                        <span class="label">RUC:</span>
                        <span class="valor" id="ticket-ruc"></span>
                    </div>
                    <div class="info-row">
                        <span class="label">Razón Social:</span>
                        <span class="valor" id="ticket-razon"></span>
                    </div>
                    <div class="info-row">
                        <span class="label">AFP:</span>
                        <span class="valor">INTEGRA</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Fecha de Pago:</span>
                        <span class="valor" id="ticket-fecha">03/02/2025</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Número de Planilla:</span>
                        <span class="valor" id="ticket-numero"></span>
                    </div>
                    <div class="info-row">
                        <span class="label">Total monto fondo de pensiones (S/.):</span>
                        <span class="valor" id="ticket-fondo">565.00</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Total retenciones y retribuciones (S/.):</span>
                        <span class="valor" id="ticket-retenciones">77.40</span>
                    </div>
                </div>

                <p class="nota-ticket">El pago no está afecto a intereses debido a fecha de pago oportuna.</p>

                <div class="modal-actions">
                    <button type="button" class="btn btn-regresar" onclick="cerrarModal()">REGRESAR</button>
                    <button type="button" class="btn btn-emitir" onclick="emitirTicket()">EMITIR TICKET</button>
                </div>
            </div>
        </div>

        <!-- Overlay de Loading -->
        <div id="loading" class="loading-overlay" style="display: none;">
            <div class="spinner"></div>
        </div>
    </main>

    <script src="presentacion_y_pago_de_planillas.js"></script>
</body>
</html>