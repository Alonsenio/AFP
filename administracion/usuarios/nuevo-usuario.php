<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Nuevo Usuario de Empresa</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./nuevo-usuario.css">
</head>
<body>

<div class="sov" id="sov"></div>

<!-- TOPBAR -->
<?php require "../../componentes/topbar.php"; ?>

<!-- SIDEBAR -->
<?php require "../../componentes/sidebar.php"; ?>

<!-- CONTENIDO PRINCIPAL -->
<main class="main" id="mc">
    <div class="page-banner"><span>ADMINISTRACIÓN &gt;</span> NUEVO USUARIO DE EMPRESA</div>

    <div class="content">
        <div class="form-container">
            

            <form id="formNuevoUsuario" class="user-form">
                <div class="form-grid">
                    <!-- COLUMNA IZQUIERDA -->
                    <div class="form-column">
                        <div class="form-row">
                            <label class="form-label required">Primer Nombre:</label>
                            <input type="text" id="primerNombre" class="form-input" placeholder="Primer Nombre" required>
                        </div>

                        <div class="form-row">
                            <label class="form-label required">Apellido Paterno:</label>
                            <input type="text" id="apellidoPaterno" class="form-input" placeholder="Apellido Paterno" required>
                        </div>

                        <div class="form-row">
                            <label class="form-label required">Doc. de Identidad:</label>
                            <select id="tipoDoc" class="form-input" required>
                                <option value="DNI">DNI</option>
                                <option value="CE">Carnet de Extranjería</option>
                                <option value="PASAPORTE">Pasaporte</option>
                            </select>
                        </div>

                        <div class="form-row">
                            <label class="form-label">Área:</label>
                            <input type="text" id="area" class="form-input" placeholder="Área">
                        </div>

                        <div class="form-row">
                            <label class="form-label required">Correo Electrónico:</label>
                            <input type="email" id="correo" class="form-input" placeholder="Correo Electrónico" required>
                        </div>

                        <div class="form-row">
                            <label class="form-label required">Confirmar Correo Electrónico:</label>
                            <input type="email" id="confirmarCorreo" class="form-input" placeholder="Correo Electrónico" required>
                        </div>
                    </div>

                    <!-- COLUMNA DERECHA -->
                    <div class="form-column">
                        <div class="form-row">
                            <label class="form-label">Segundo Nombre:</label>
                            <input type="text" id="segundoNombre" class="form-input" placeholder="Segundo Nombre">
                        </div>

                        <div class="form-row">
                            <label class="form-label required">Apellido Materno:</label>
                            <input type="text" id="apellidoMaterno" class="form-input" placeholder="Apellido Materno" required>
                        </div>

                        <div class="form-row">
                            <label class="form-label">Puesto:</label>
                            <input type="text" id="puesto" class="form-input" placeholder="Puesto">
                        </div>

                        <div class="form-row">
                            <label class="form-label required">Teléfono fijo:</label>
                            <select id="telefonoFijo" class="form-input" required>
                                <option value="">Seleccione</option>
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>
                            </select>
                        </div>

                        <div class="form-row">
                            <label class="form-label required">Celular:</label>
                            <input type="tel" id="celular" class="form-input" placeholder="Celular" maxlength="9" required>
                        </div>
                    </div>
                </div>

                <!-- CHECKBOXES -->
                <div class="form-checks">
                    <div class="check-item">
                        <input type="checkbox" id="verDetalle" class="form-checkbox">
                        <label for="verDetalle" class="check-label">Ver detalle de planillas</label>
                    </div>

                    <div class="check-item">
                        <input type="checkbox" id="activo" class="form-checkbox" checked>
                        <label for="activo" class="check-label">Activo</label>
                    </div>
                </div>

                <!-- NOTA -->
                <div class="form-note">
                    Los campos marcados con asterisco (*) son obligatorios.
                </div>

                <!-- BOTONES -->
                <div class="form-actions">
                    <button type="button" class="btn btn-cancel" id="btnCancelar">CANCELAR</button>
                    <button type="submit" class="btn btn-save" id="btnGrabar">GRABAR</button>
                </div>
            </form>
        </div>
    </div>
</main>

<script src="./nuevo-usuario.js"></script>
</body>
</html>