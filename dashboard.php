<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Portal del Empleador</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>

    <!-- ===== TOP BAR ===== -->
    <header class="topbar">
        <div class="topbar-left">
            <div class="topbar-logo">
                AFPnet
                <span>PAGO FÁCIL</span>
            </div>
            <button class="btn-menu-toggle" id="btn-toggle-sidebar" title="Menú">
                <i class="fas fa-bars"></i>
            </button>
            <div class="topbar-welcome">
                Bienvenido Sr(a). <strong id="welcome-name">Usuario</strong>
            </div>
        </div>
        <div class="topbar-right">
            <div class="user-badge">
                <div class="user-avatar" id="user-initials">U</div>
                <span id="user-display-name">Usuario</span>
            </div>
        </div>
    </header>

    <!-- ===== SIDEBAR OVERLAY ===== -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <!-- ===== SIDEBAR ===== -->
    <aside class="sidebar" id="sidebar">
        <nav class="sidebar-nav">
            <div class="nav-item">
                <div class="nav-link active" onclick="setActive(this)">
                    <span><i class="fas fa-home" style="width:18px; margin-right:8px;"></i> Inicio</span>
                </div>
            </div>

            <div class="nav-item">
                <div class="nav-link" onclick="toggleSubmenu(this)">
                    <span><i class="fas fa-cogs" style="width:18px; margin-right:8px;"></i> Administración</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="submenu">
                    <a href="#">Usuarios</a>
                    <a href="#">Permisos</a>
                    <a href="#">Datos de la empresa</a>
                </div>
            </div>

            <div class="nav-item">
                <div class="nav-link" onclick="toggleSubmenu(this)">
                    <span><i class="fas fa-file-invoice-dollar" style="width:18px; margin-right:8px;"></i> Aportes</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="submenu">
                    <a href="planillas.php">Presentación y Pago de Planillas</a>
                    <a href="#">Consulta y Pago de Planillas</a>
                    <a href="#">Consulta y Pago de Regularizaciones</a>
                    <a href="#">Pagos Pendientes de 2da firma</a>
                </div>
            </div>

            <div class="nav-item">
                <div class="nav-link" onclick="toggleSubmenu(this)">
                    <span><i class="fas fa-users" style="width:18px; margin-right:8px;"></i> Afiliados</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="submenu">
                    <a href="afiliados.php">Consultar afiliados</a>
                    <a href="#">Afiliar trabajadores al SPP</a>
                </div>
            </div>

            <div class="nav-item">
                <div class="nav-link" onclick="toggleSubmenu(this)">
                    <span><i class="fas fa-clipboard-list" style="width:18px; margin-right:8px;"></i> Módulo RE</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="submenu">
                    <a href="#">Consultas</a>
                    <a href="#">Reportes</a>
                </div>
            </div>

            <div class="nav-item">
                <div class="nav-link" onclick="toggleSubmenu(this)">
                    <span><i class="fas fa-money-check-alt" style="width:18px; margin-right:8px;"></i> Obligaciones de Pago</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="submenu">
                    <a href="#">Ver obligaciones</a>
                    <a href="#">Historial de pagos</a>
                </div>
            </div>

            <div class="nav-item">
                <div class="nav-link" onclick="toggleSubmenu(this)">
                    <span><i class="fas fa-exclamation-triangle" style="width:18px; margin-right:8px;"></i> Deudas Ciertas y Presuntas</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="submenu">
                    <a href="#">Liquidaciones</a>
                    <a href="#">Descargos de cobranza</a>
                </div>
            </div>

            <div class="nav-separator"></div>

            <div class="nav-item">
                <div class="nav-link" onclick="setActive(this)">
                    <span><i class="fas fa-key" style="width:18px; margin-right:8px;"></i> Cambiar Contraseña</span>
                </div>
            </div>

            <div class="nav-item">
                <div class="nav-link nav-link-danger" onclick="cerrarSesion()">
                    <span><i class="fas fa-sign-out-alt" style="width:18px; margin-right:8px;"></i> Cerrar Sesión</span>
                </div>
            </div>
        </nav>
    </aside>

    <!-- ===== MAIN CONTENT ===== -->
    <main class="main" id="main-content">
        <div class="page-banner">
            BIENVENIDO AL PORTAL DE LA ASOCIACIÓN DE AFP
        </div>

        <div class="content">
            <p class="content-subtitle">Usted ha ingresado al módulo de Empleador</p>

            <div class="dashboard-grid">
                <!-- Left Column -->
                <div>
                    <!-- What you can do -->
                    <div class="card" style="margin-bottom: 24px;">
                        <div class="card-header">
                            A través de este módulo usted podrá realizar:
                        </div>
                        <div class="card-body">
                            <ul>
                                <li>Crear usuarios</li>
                                <li>Asignar permisos</li>
                                <li>Declarar y pagar planillas</li>
                                <li>Afiliar a sus trabajadores al SPP</li>
                                <li>Actualizar datos de la empresa</li>
                                <li>Recibir y consultar liquidaciones previas de deuda presunta</li>
                                <li>Presentar descargos de cobranza</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Guides -->
                    <div class="card">
                        <div class="card-header orange">
                            Guías para el uso de AFPnet:
                        </div>
                        <div class="card-body">
                            <ul>
                                <li>Administrar usuarios y permisos. Dar clic <a href="#" class="guide-link">aquí</a></li>
                                <li>Afiliar nuevos trabajadores al SPP. Dar clic <a href="#" class="guide-link">aquí</a></li>
                                <li>Consultar afiliados al SPP. Dar clic <a href="#" class="guide-link">aquí</a></li>
                                <li>Declarar y pagar planillas y regularizaciones. Dar clic <a href="#" class="guide-link">aquí</a></li>
                                <li>Gestionar Obligaciones de pago. Dar clic <a href="#" class="guide-link">aquí</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Alerts -->
                <div>
                    <div class="alert-card">
                        <div class="alert-header">
                            <i class="fas fa-bell" style="margin-right: 8px;"></i> Alertas
                        </div>
                        <div class="alert-body">
                            <div class="alert-item">
                                <p>Usted tiene <strong>5 Obligaciones de Pago Presuntas</strong> pendientes por declarar en el devengue 2025-01.</p>
                                <button class="btn-orange">VER OBLIGACIONES DE PAGO</button>
                            </div>
                            <div class="alert-item">
                                <p>Tiene <strong>2 liquidaciones previas</strong> de deuda presunta pendientes de revisión.</p>
                                <button class="btn-orange">VER LIQUIDACIONES</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- ===== SCRIPTS ===== -->
    <script src="dashboard.js"></script>
</body>
</html>
