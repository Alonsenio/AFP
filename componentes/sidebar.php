<style>
    * { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ; }
    /* ===== SIDEBAR ===== */
    .sidebar {
        position: fixed;
        top: 54px;
        left: 0;
        bottom: 0;
        width: 250px;
        background: #f5f7fa;
        border-right: 1px solid #dce1e8;
        overflow-y: auto;
        overflow-x: hidden;
        z-index: 90;
        transition: transform .3s ease, width .3s ease;
    }

    .sidebar-nav {
        padding: 8px 0;
    }

    /* ===== ITEMS PRINCIPALES ===== */
    .nav-item {
        border-bottom: 1px solid #e8ecf1;
    }
    .nav-item:last-child {
        border-bottom: none;
    }

    .nav-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px;
        color: #3a5070;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background .15s, color .15s;
        text-decoration: none;
        user-select: none;
    }
    .nav-link:hover {
        background: #eaf0f7;
        color: #1a3a6c;
    }

    /* Flecha desplegable */
    .nav-link .arrow {
        font-size: 10px;
        color: #4a7abf;
        transition: transform .25s;
        flex-shrink: 0;
    }
    .nav-link.open .arrow {
        transform: rotate(180deg);
    }

    /* ===== SUBMENU ===== */
    .submenu {
        max-height: 0;
        overflow: hidden;
        transition: max-height .3s ease;
        background: #fff;
    }
    .submenu.open {
        max-height: 400px;
    }

    .submenu a {
        display: block;
        padding: 10px 20px 10px 32px;
        color: #5a6f8a;
        font-size: 13px;
        text-decoration: none;
        transition: background .15s, color .15s;
        border-left: 3px solid transparent;
    }
    .submenu a:hover {
        background: #f0f4f9;
        color: #1a3a6c;
    }
    /* Item activo: borde naranja a la izquierda */
    .submenu a.act {
        border-left: 3px solid #e67e22;
        color: #1a3a6c;
        font-weight: 600;
        background: #fdf6ef;
    }

    /* ===== SEPARADOR ===== */
    .nav-separator {
        height: 1px;
        background: #dce1e8;
        margin: 4px 0;
    }

    /* ===== CERRAR SESIÓN ===== */
    
    .nav-link-danger:hover {
        background: #fdf0ef !important;
        color: #a93226 !important;
    }

    /* ===== SIDEBAR COLAPSADO (desktop) ===== */
    .sidebar.collapsed {
        width: 0;
        transform: translateX(-260px);
    }

    /* ===== SIDEBAR OVERLAY ===== */
    .sidebar-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.35);
        z-index: 85;
    }
    .sidebar-overlay.visible {
        display: block;
    }

    /* ===== MOBILE ===== */
    @media (max-width: 768px) {
        .sidebar {
            transform: translateX(-260px);
            width: 260px;
        }
        .sidebar.mobile-open {
            transform: translateX(0);
        }
    }
</style>

<aside class="sidebar" id="sidebar">
    <nav class="sidebar-nav">

        <!-- Inicio -->
        <div class="nav-item">
            <div class="nav-link" onclick="location.href='/AFP/inicio/inicio.php'">
                <span>Inicio</span>
            </div>
        </div>

        <!-- Administración -->
        <div class="nav-item">
            <div class="nav-link" onclick="toggleSubmenu(this)">
                <span>Administración</span>
                <i class="fas fa-caret-down arrow"></i>
            </div>
            <div class="submenu">
                <a href="/AFP/administracion/datos_de_la_empresa/datos_de_la_empresa.php">Datos de la Empresa</a>
                <a href="/AFP/administracion/usuarios/usuarios.php">Usuarios</a>
            </div>
        </div>

        <!-- Aportes -->
        <div class="nav-item">
            <div class="nav-link" onclick="toggleSubmenu(this)">
                <span>Aportes</span>
                <i class="fas fa-caret-down arrow"></i>
            </div>
            <div class="submenu">
                <a href="/AFP/aportes/presentacion_y_pago_de_planillas/presentacion_y_pago_de_planillas.php">Presentación y Pago de Planillas</a>
                <a href="/AFP/aportes/consulta_y_pago_de_planillas/consulta_y_pago_de_planillas.php">Consulta y Pago de Planillas</a>
                <a href="#">Consulta y Pago de Regularizaciones</a>
                <a href="/AFP/aportes/pagos_pendientes_de_2da_firma/pagos_pendientes_de_2da_firma.php">Pagos Pendientes de 2da Firma</a>
            </div>
        </div>

        <!-- Afiliados -->
        <div class="nav-item">
            <div class="nav-link" onclick="toggleSubmenu(this)">
                <span>Afiliados</span>
                <i class="fas fa-caret-down arrow"></i>
            </div>
            <div class="submenu">
                <a href="/AFP/afiliados/consulta_afiliados_unitaria/consulta_afiliados_unitaria.php">Consulta de Afiliados Unitaria</a>
                <a href="/AFP/afiliados/consulta_afiliados_masiva/consulta_afiliados_masiva.php">Consulta de Afiliados Masiva</a>
                <a href="/AFP/afiliados/afiliacion_unitaria/vista1/condiciones_para_afiliar.php">Afiliación Unitaria</a>
                <a href="/AFP/afiliados/afiliacion_masiva/afiliacion_masiva.php">Afiliación Masiva</a>
                <a href="/AFP/afiliados/consulta_de_solicitudes_de_afiliados/consulta_de_solicitudes_de_afiliados.php">Consulta de Solicitudes de Afiliación</a>
            </div>
        </div>

        <!-- Módulo REPRO -->
        <div class="nav-item">
            <div class="nav-link" onclick="toggleSubmenu(this)">
                <span>Módulo REPRO</span>
                <i class="fas fa-caret-down arrow"></i>
            </div>
            <div class="submenu">
                <a href="/AFP/modulo_repro/consultas_de_cuotas/consultas_de_cuotas.php">Consultas de Cuotas</a>
                <a href="#">Consulta de convenios REPRO</a>
            </div>
        </div>

        <!-- Obligaciones de Pago -->
        <div class="nav-item">
            <div class="nav-link" onclick="toggleSubmenu(this)">
                <span>Obligaciones de Pago</span>
                <i class="fas fa-caret-down arrow"></i>
            </div>
            <div class="submenu">
                <a href="/AFP/obligaciones_de_pago/por_afiliados/por_afiliados.php">Por Afiliados</a>
                <a href="/AFP/obligaciones_de_pago/por_devengue/por_devengue.php">Por Devengue</a>
                <a href="/AFP/obligaciones_de_pago/planilla_movimiento_laboral/planilla_movimiento_laboral.php">Planilla Movimiento laboral</a>
            </div>
        </div>

        <!-- Deudas Ciertas y Presuntas -->
        <div class="nav-item">
            <div class="nav-link" onclick="toggleSubmenu(this)">
                <span>Deudas Ciertas y Presuntas</span>
                <i class="fas fa-caret-down arrow"></i>
            </div>
            <div class="submenu">
                <a href="/AFP/prueba/liquidaciones.php">Liquidaciones</a>
                <a href="#">Descargos de Cobranza</a>
            </div>
        </div>

        <div class="nav-separator"></div>

        <!-- Cambiar Contraseña -->
        <div class="nav-item">
            <div class="nav-link" onclick="location.href='#'">
                <span>Cambiar Contraseña</span>
            </div>
        </div>

        <!-- Cerrar Sesión -->
        <div class="nav-item">
            <div class="nav-link nav-link-danger" onclick="cerrarSesion()">
                <span>Cerrar Sesión</span>
            </div>
        </div>

    </nav>
</aside>

<script>
(function(){
    // Toggle submenu
    window.toggleSubmenu = function(el) {
        const submenu = el.nextElementSibling;
        if (!submenu) return;
        const isOpen = submenu.classList.contains('open');

        // Cerrar todos los demás
        document.querySelectorAll('.submenu.open').forEach(s => {
            s.classList.remove('open');
            if (s.previousElementSibling) s.previousElementSibling.classList.remove('open');
        });

        if (!isOpen) {
            submenu.classList.add('open');
            el.classList.add('open');
        }
    };

    // Marcar item activo según la URL actual
    const currentPath = window.location.pathname;
    document.querySelectorAll('.submenu a').forEach(a => {
        if (a.getAttribute('href') === currentPath) {
            a.classList.add('act');
            // Abrir el submenu padre
            const submenu = a.closest('.submenu');
            if (submenu) {
                submenu.classList.add('open');
                const navLink = submenu.previousElementSibling;
                if (navLink) navLink.classList.add('open');
            }
        }
    });
})();
</script>