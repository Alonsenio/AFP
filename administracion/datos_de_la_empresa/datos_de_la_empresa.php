<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Actualización de Datos de la Empresa</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./datos_de_la_empresa.css">
</head>
<body>
    <!-- ===== TOP BAR ===== -->
    <?php require "../../componentes/topbar.php"; ?>
    
    <!-- ===== SIDEBAR ===== -->
    <?php require "../../componentes/sidebar.php"; ?>
    
    <!-- ===== CONTENIDO PRINCIPAL ===== -->
    <main class="main" id="main-content">
        <!-- Banner de página -->
        
        <div class="page-banner"><span>ADMINISTRACIÓN &gt;</span>DATOS DE LA EMPRESA</div>

        <div class="content">
            <form id="formDatosEmpresa">
                
                <!-- ========== SECCIÓN: DATOS DE LA EMPRESA ========== -->
                <div class="form-section">
                    <!-- Fila: RUC y Fecha -->
                    <div class="form-row">
                        <div class="form-field">
                            <label>RUC:</label>
                            <input type="text" id="ruc" value="20603401574" readonly class="input-readonly">
                        </div>
                        <div class="form-field">
                            <label>Fecha de Actualización:</label>
                            <input type="text" id="fechaActualizacion" value="08/09/2025" readonly class="input-readonly input-small">
                        </div>
                    </div>

                    <!-- Fila: Razón Social -->
                    <div class="form-row">
                        <div class="form-field full">
                            <label>Razón Social: *</label>
                            <input type="text" id="razonSocial" value="CORPORACION DE FORMACION CONTINUA DEL PERU S.A.C." readonly class="input-readonly">
                        </div>
                    </div>

                    <!-- Fila: Teléfono fijo -->
                    <div class="form-row">
                        <div class="form-field">
                            <label>Teléfono fijo: *</label>
                            <div class="input-combo">
                                <select id="prefijoTelEmpresa">
                                    <option value="">Seleccione</option>
                                    <option value="01">01</option>
                                    <option value="042">042</option>
                                    <option value="043">043</option>
                                    <option value="044">044</option>
                                </select>
                                <input type="text" id="telefonoFijoEmpresa">
                            </div>
                        </div>
                    </div>

                    <!-- Fila: Celular -->
                    <div class="form-row">
                        <div class="form-field">
                            <label>Celular: *</label>
                            <input type="text" id="celularEmpresa" value="970705816">
                        </div>
                    </div>
                </div>

                <!-- ========== SECCIÓN: DIRECCIÓN ========== -->
                <div class="form-section">
                    <h3 class="section-title">Dirección declarada por el Empleador</h3>

                    <!-- Fila: Vía -->
                    <div class="form-row">
                        <div class="form-field full">
                            <label>Vía: *</label>
                            <div class="input-combo wide">
                                <select id="tipoVia">
                                    <option value="AV.">AV.</option>
                                    <option value="JR.">JR.</option>
                                    <option value="CALLE">CALLE</option>
                                    <option value="PSJE.">PSJE.</option>
                                </select>
                                <input type="text" id="via" value="RIVERA NAVARRETE">
                            </div>
                        </div>
                    </div>

                    <!-- Fila: Número, Dpto, Interior -->
                    <div class="form-row triple">
                        <div class="form-field">
                            <label>Número:</label>
                            <input type="text" id="numero" value="451">
                        </div>
                        <div class="form-field">
                            <label>Dpto:</label>
                            <input type="text" id="dpto">
                        </div>
                        <div class="form-field">
                            <label>Interior:</label>
                            <input type="text" id="interior">
                        </div>
                    </div>

                    <!-- Fila: Manzana, Lote, Kilometro -->
                    <div class="form-row triple">
                        <div class="form-field">
                            <label>Manzana:</label>
                            <input type="text" id="manzana">
                        </div>
                        <div class="form-field">
                            <label>Lote:</label>
                            <input type="text" id="lote">
                        </div>
                        <div class="form-field">
                            <label>Kilometro:</label>
                            <input type="text" id="kilometro">
                        </div>
                    </div>

                    <!-- Fila: Localidad -->
                    <div class="form-row">
                        <div class="form-field full">
                            <label>Localidad:</label>
                            <div class="input-combo wide">
                                <select id="tipoLocalidad">
                                    <option value="URB.">URB.</option>
                                    <option value="AA.HH.">AA.HH.</option>
                                    <option value="COOP.">COOP.</option>
                                </select>
                                <input type="text" id="localidad" value="JARDIN">
                            </div>
                        </div>
                    </div>

                    <!-- Fila: Referencia -->
                    <div class="form-row">
                        <div class="form-field full">
                            <label>Referencia:</label>
                            <input type="text" id="referencia" class="input-wide">
                        </div>
                    </div>

                    <!-- Fila: Ubigeo -->
                    <div class="form-row ubigeo-row">
                        <div class="form-field">
                            <label>Ubigeo:</label>
                            <div class="ubigeo-selects">
                                <div class="ubigeo-item">
                                    <span class="ubigeo-label">Departamento *</span>
                                    <select id="departamento">
                                        <option value="LIMA">LIMA</option>
                                        <option value="AREQUIPA">AREQUIPA</option>
                                        <option value="CUSCO">CUSCO</option>
                                    </select>
                                </div>
                                <div class="ubigeo-item">
                                    <span class="ubigeo-label">Provincia *</span>
                                    <select id="provincia">
                                        <option value="LIMA">LIMA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-row ubigeo-row-2">
                        <div class="form-field">
                            <label></label>
                            <div class="ubigeo-selects">
                                <div class="ubigeo-item">
                                    <span class="ubigeo-label">Distrito *</span>
                                    <select id="distrito">
                                        <option value="SAN ISIDRO">SAN ISIDRO</option>
                                        <option value="MIRAFLORES">MIRAFLORES</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ========== SECCIÓN: REPRESENTANTE LEGAL ========== -->
                <div class="form-section">
                    <h3 class="section-title">Representante Legal de la Empresa</h3>

                    <!-- Fila: Apellidos -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Apellido Paterno: *</label>
                            <input type="text" id="apPaternoRep">
                        </div>
                        <div class="form-field">
                            <label>Apellido Materno: *</label>
                            <input type="text" id="apMaternoRep">
                        </div>
                    </div>

                    <!-- Fila: Nombres -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Primer Nombre: *</label>
                            <input type="text" id="primerNombreRep">
                        </div>
                        <div class="form-field">
                            <label>Segundo Nombre:</label>
                            <input type="text" id="segundoNombreRep">
                        </div>
                    </div>

                    <!-- Fila: Documento -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Tipo de Documento: *</label>
                            <select id="tipoDocRep">
                                <option value="DNI">DNI - DNI</option>
                                <option value="CE">CE - Carnet de Extranjería</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label>Nro. documento: *</label>
                            <input type="text" id="nroDocRep">
                        </div>
                    </div>

                    <!-- Fila: Correos -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Correo Electrónico: *</label>
                            <input type="email" id="correoRep">
                        </div>
                        <div class="form-field">
                            <label>Confirmar Correo Electrónico: *</label>
                            <input type="email" id="confirmarCorreoRep">
                        </div>
                    </div>

                    <!-- Fila: Teléfonos -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Teléfono fijo: *</label>
                            <div class="input-combo">
                                <select id="prefijoTelRep">
                                    <option value="">Seleccione</option>
                                    <option value="01">01</option>
                                </select>
                                <input type="text" id="telefonoFijoRep">
                            </div>
                        </div>
                        <div class="form-field">
                            <label>Celular: *</label>
                            <input type="text" id="celularRep">
                        </div>
                    </div>

                    <!-- Fila: Cargo -->
                    <div class="form-row">
                        <div class="form-field">
                            <label>Cargo: *</label>
                            <input type="text" id="cargoRep">
                        </div>
                    </div>
                </div>

                <!-- ========== SECCIÓN: DATOS DEL CONTACTO ========== -->
                <div class="form-section">
                    <h3 class="section-title">Datos del Contacto</h3>

                    <!-- Fila: Apellidos -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Apellido Paterno: *</label>
                            <input type="text" id="apPaternoCont" value="CALDERON">
                        </div>
                        <div class="form-field">
                            <label>Apellido Materno: *</label>
                            <input type="text" id="apMaternoCont" value="ORMEÑO">
                        </div>
                    </div>

                    <!-- Fila: Nombres -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Primer Nombre: *</label>
                            <input type="text" id="primerNombreCont" value="JOSE">
                        </div>
                        <div class="form-field">
                            <label>Segundo Nombre:</label>
                            <input type="text" id="segundoNombreCont" value="LUIS">
                        </div>
                    </div>

                    <!-- Fila: Documento -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Tipo de Documento: *</label>
                            <select id="tipoDocCont">
                                <option value="DNI">DNI - DNI</option>
                                <option value="CE">CE - Carnet de Extranjería</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label>Nro. documento: *</label>
                            <input type="text" id="nroDocCont" value="07274147">
                        </div>
                    </div>

                    <!-- Fila: Correos -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Correo Electrónico: *</label>
                            <input type="email" id="correoCont" value="josecalderon1402@gmail.com">
                        </div>
                        <div class="form-field">
                            <label>Confirmar Correo Electrónico: *</label>
                            <input type="email" id="confirmarCorreoCont">
                        </div>
                    </div>

                    <!-- Fila: Teléfonos -->
                    <div class="form-row double">
                        <div class="form-field">
                            <label>Teléfono fijo: *</label>
                            <div class="input-combo">
                                <select id="prefijoTelCont">
                                    <option value="">Seleccione</option>
                                    <option value="01">01</option>
                                </select>
                                <input type="text" id="telefonoFijoCont">
                            </div>
                        </div>
                        <div class="form-field">
                            <label>Celular: *</label>
                            <input type="text" id="celularCont" value="994489051">
                        </div>
                    </div>

                    <!-- Fila: Cargo -->
                    <div class="form-row">
                        <div class="form-field">
                            <label>Cargo: *</label>
                            <input type="text" id="cargoCont" value="RESPONSABLE CONTABILIDAD">
                        </div>
                    </div>
                </div>

                <!-- ========== SECCIÓN: DOBLE FIRMA ========== -->
                <div class="form-section doble-firma">
                    <div class="doble-firma-content">
                        <label class="checkbox-label">
                            Pago en Línea con Doble Firma:
                            <input type="checkbox" id="dobleFirma">
                        </label>
                        <button type="button" class="btn-activacion" id="btnActivacion">
                            SOLICITAR ACTIVACIÓN
                        </button>
                    </div>
                </div>

                <!-- ========== MENSAJES DE AYUDA ========== -->
                <div class="form-messages">
                    <p class="msg-warning">Antes de guardar, verifique que los datos ingresados son correctos.</p>
                    <p class="msg-info">Los campos marcados con asterisco (*) son obligatorios.</p>
                </div>

                <!-- ========== BOTONES ========== -->
                <div class="form-buttons">
                    <button type="submit" class="btn-guardar">GUARDAR</button>
                    <button type="button" class="btn-cancelar" id="btnCancelar">CANCELAR</button>
                </div>

            </form>
        </div>
    </main>

    <script src="./datos_de_la_empresa.js"></script>
    
</body>
</html>