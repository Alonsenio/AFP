<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Portal del Empleador</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./inicio.css">
</head>
<body>
    <!-- ===== SECCION DE TOP BAR ===== -->
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
    <!-- ===== SIDEBAR ===== -->
    <?php
        require "../componentes/sidebar.php"
    ?>
    <!-- ===== CONTENIDO ===== -->
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
                    <div class="card" style="margin-bottom: 24px; ">
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
                        <div class="card-header">
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
    <script src="./iniciio.js"></script>
    
</body>
</html>
