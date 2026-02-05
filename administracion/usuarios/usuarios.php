<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Gestión de Usuarios</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./usuarios.css">
</head>
<body>

<div class="sov" id="sov"></div>
<!-- TOBAR -->
<?php require "../../componentes/topbar.php"; ?>

<!-- SIDEBAR -->
<?php require "../../componentes/sidebar.php"; ?>

<!-- CONTENIDO -->
<main class="main" id="mc">
    <div class="page-banner"><span>ADMINISTRACIÓN &gt;</span> USUARIOS</div>

    <div class="content">
    
        <!-- FILTROS DE BÚSQUEDA -->
        <div class="filter-card">
            <div class="filter-title">Filtros de Búsqueda</div>
            
            <div class="filter-grid">
                <div class="filter-row">
                    <label>Cuenta de Usuario:</label>
                    <input type="text" id="search-user" placeholder="Cuenta de Usuario">
                </div>
                <div class="filter-row">
                    <label>Apellido Paterno:</label>
                    <input type="text" id="search-apep" placeholder="Apellido Paterno">
                </div>
                <div class="filter-row">
                    <label>Apellido Materno:</label>
                    <input type="text" id="search-apem" placeholder="Apellido Materno">
                </div>
            </div>

            <!-- 4 BOTONES DE COLORES -->
            <div class="filter-buttons">
                <button class="btn-filter btn-orange" id="btn-buscar" type="button">
                    BUSCAR
                </button>
                <button class="btn-filter btn-green" id="btn-guia" type="button">
                    GUIA DE USO
                </button>
                <button class="btn-filter btn-blue-action" id="btn-agregar" type="button">
                    AGREGAR
                </button>
                <button class="btn-filter btn-red" id="btn-desactivar" type="button">
                    DESACTIVAR
                </button>
            </div>
        </div>

        <!-- TABLA DE RESULTADOS -->
        <div class="results vis">
            <div class="tbl-wrap">
                <div class="tbl-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Nombre Completo</th>
                                <th>RUC Asociado</th>
                                <th>Perfil</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="user-table-body"></tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</main>

<!-- MODAL: REGISTRAR NUEVO USUARIO -->
<div class="mo" id="mo-user">
    <div class="modal" style="max-width: 500px;">
        <div class="mh mh-blue">
            REGISTRAR NUEVO USUARIO
            <button class="mx" onclick="closeM('mo-user')"><i class="fas fa-times"></i></button>
        </div>
        <div class="mb">
            <div class="frow" style="flex-direction: column; align-items: stretch;">
                <label class="fl" style="text-align: left; margin-bottom: 5px;">Usuario (ID):</label>
                <input type="text" id="in-user">
            </div>
            <div class="frow" style="flex-direction: column; align-items: stretch;">
                <label class="fl" style="text-align: left; margin-bottom: 5px;">Nombre Completo:</label>
                <input type="text" id="in-name" placeholder="Ej: Juan Perez Rojas">
            </div>
            <div class="frow" style="flex-direction: column; align-items: stretch;">
                <label class="fl" style="text-align: left; margin-bottom: 5px;">Perfil:</label>
                <select id="in-per" style="width: 100%;">
                    <option value="Administrador">Administrador</option>
                    <option value="Operador">Operador</option>
                </select>
            </div>
        </div>
        <div class="mf">
            <button class="btn btn-gray" type="button" onclick="closeM('mo-user')">CANCELAR</button>
            <button class="btn btn-blue" type="button" id="btn-save-user">GUARDAR USUARIO</button>
        </div>
    </div>
</div>

<!-- MODAL: GUIA DE USO -->
<div class="mo" id="mo-guia">
    <div class="modal" style="max-width: 520px;">
        <div class="mh mh-blue">
            GUIA DE USO
            <button class="mx" onclick="closeM('mo-guia')"><i class="fas fa-times"></i></button>
        </div>
        <div class="mb" style="line-height:1.6; color:#444; font-size:14px;">
            <p><strong>BUSCAR:</strong> Complete Usuario y/o Apellidos y presione BUSCAR.</p>
            <p><strong>AGREGAR:</strong> Registra un nuevo usuario con acceso al RUC actual.</p>
            <p><strong>DESACTIVAR:</strong> Inhabilita el acceso de un usuario (no se elimina).</p>
            <p><strong>GUIA DE USO:</strong> Muestra esta ventana de ayuda.</p>
        </div>
        <div class="mf">
            <button class="btn btn-blue" type="button" onclick="closeM('mo-guia')">ENTENDIDO</button>
        </div>
    </div>
</div>

<script src="./usuarios.js"></script>
</body>
</html>