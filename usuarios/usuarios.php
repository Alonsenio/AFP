<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Gestión de Usuarios</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../planillas/planillas.css">
    <style>
        /* Ajustes específicos para este módulo */
        .btn-mini { padding: 5px 10px; font-size: 11px; }
        .badge-admin { background: #e8edf8; color: #1c3997; }
        .badge-user { background: #f0f2f5; color: #6c757d; }
    </style>
</head>
<body>

<header class="topbar">
    <div class="topbar-left">
        <div class="topbar-logo" onclick="location.href='../dashboard/dashboard.php'">AFPnet<span>PAGO FÁCIL</span></div>
        <button class="btn-menu" id="btn-tog"><i class="fas fa-bars"></i></button>
        <div class="topbar-welcome">Bienvenido Sr(a). <strong id="w-name">Usuario</strong></div>
    </div>
    <div class="topbar-right">
        <div class="user-badge"><div class="user-avatar" id="u-init">U</div><span id="u-name">Usuario</span></div>
    </div>
</header>

<div class="sov" id="sov"></div>

<!-- SIDEBAR -->
<aside class="sidebar" id="sb">
    <nav class="sidebar-nav">
        <div><a class="nav-link" href="../dashboard/dashboard.php"><span><i class="fas fa-home" style="width:18px;margin-right:8px"></i> Inicio</span></a></div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-cogs" style="width:18px;margin-right:8px"></i> Administración</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="../usuarios/usuarios.php">Usuarios</a><a href="#">Permisos</a><a href="#">Datos de la empresa</a></div>
        </div>
        <div>
            <div class="nav-link active open" onclick="togSub(this)"><span><i class="fas fa-file-invoice-dollar" style="width:18px;margin-right:8px"></i> Aportes</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu open"><a href="../planillas/planillas.php" class="act">Presentación y Pago de Planillas</a><a href="#">Consulta y Pago de Planillas</a><a href="#">Consulta y Pago de Regularizaciones</a><a href="#">Pagos Pendientes de 2da firma</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-users" style="width:18px;margin-right:8px"></i> Afiliados</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="../afiliados/afiliados.php">Consultar afiliados</a><a href="#">Afiliar trabajadores al SPP</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-clipboard-list" style="width:18px;margin-right:8px"></i> Módulo REPRO</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Consultas</a><a href="#">Reportes</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-money-check-alt" style="width:18px;margin-right:8px"></i> Obligaciones de Pago</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Ver obligaciones</a><a href="#">Historial de pagos</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-exclamation-triangle" style="width:18px;margin-right:8px"></i> Deudas Ciertas y Presuntas</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Liquidaciones</a><a href="#">Descargos de cobranza</a></div>
        </div>
        <div class="nav-sep"></div>
        <div><a class="nav-link" href="#"><span><i class="fas fa-key" style="width:18px;margin-right:8px"></i> Cambiar Contraseña</span></a></div>
        <div><div class="nav-link nav-danger" onclick="cerrarSesion()"><span><i class="fas fa-sign-out-alt" style="width:18px;margin-right:8px"></i> Cerrar Sesión</span></div></div>
    </nav>
</aside>

<main class="main" id="mc">
    <div class="page-banner"><span>ADMINISTRACIÓN &gt;</span> GESTIÓN DE USUARIOS</div>
    <div class="content">
        
        <div class="fcard">
            <div class="btn-row" style="justify-content: space-between; align-items: center; margin-bottom: 0;">
                <p style="font-size: 14px; color: #555;">Lista de usuarios con acceso al RUC: <strong id="current-ruc"></strong></p>
                <button class="btn btn-blue" onclick="openM('mo-user')"><i class="fas fa-user-plus"></i> NUEVO USUARIO</button>
            </div>
        </div>
 
        <div class="fcard" style="margin-bottom: 15px; padding: 15px 28px;">
            <div class="frow" style="margin-bottom: 0; gap: 20px;">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 5px;">
                    <label class="fl" style="min-width: auto; text-align: left;">Buscar usuario o nombre:</label>
                    <div style="position: relative;">
                        <i class="fas fa-search" style="position: absolute; left: 12px; top: 12px; color: #aaa;"></i>
                        <input type="text" id="search-input" placeholder="Ej: alonso..." style="width: 100%; padding: 10px 10px 10px 35px; border: 1px solid var(--gray-bd); border-radius: 6px;">
                    </div>
                </div>
                <div style="width: 200px; display: flex; flex-direction: column; gap: 5px;">
                    <label class="fl" style="min-width: auto; text-align: left;">Perfil:</label>
                    <select id="filter-perfil" style="min-width: auto; width: 100%;">
                        <option value="todos">Todos</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Operador">Operador</option>
                    </select>
                </div>
                <div style="display: flex; align-items: flex-end;">
                    <button class="btn btn-gray" id="btn-clear" title="Limpiar Filtros">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
        </div>

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
                        <tbody id="user-table-body">
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>

<div class="mo" id="mo-user">
    <div class="modal" style="max-width: 500px;">
        <div class="mh mh-blue">REGISTRAR NUEVO USUARIO<button class="mx" onclick="closeM('mo-user')"><i class="fas fa-times"></i></button></div>
        <div class="mb">
            <div class="frow" style="flex-direction: column; align-items: stretch;">
                <label class="fl" style="text-align: left; margin-bottom: 5px;">Usuario (ID):</label>
                <input type="text" id="in-user" style="padding:10px; border:1px solid #ddd; border-radius:6px;">
            </div>
            <div class="frow" style="flex-direction: column; align-items: stretch;">
                <label class="fl" style="text-align: left; margin-bottom: 5px;">Nombre Completo:</label>
                <input type="text" id="in-name" style="padding:10px; border:1px solid #ddd; border-radius:6px;">
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
            <button class="btn btn-gray" onclick="closeM('mo-user')">CANCELAR</button>
            <button class="btn btn-blue" id="btn-save-user">GUARDAR USUARIO</button>
        </div>
    </div>
</div>

<script src="usuarios.js"></script>
</body>
</html>