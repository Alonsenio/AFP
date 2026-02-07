<style>
    * { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ; }
    /* ===== VARIABLES ===== */
    :root {
        --sidebar-width: 240px;
        --topbar-height: 54px;
    }

    .topbar {
        position: fixed;
        top: 0; left: 0; right: 0;
        height: var(--topbar-height);
        background: linear-gradient(180deg, #1a2a6c 0%, #0f1b4d 100%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px 0 0;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0,0,0,.35);
       
    }

    /* ===== LEFT ===== */
    .topbar-left {
        display: flex;
        align-items: center;
        gap: 0;
    }

    /* CONTENEDOR MENU - mismo ancho que el sidebar */
    .menu-container {
        width: var(--sidebar-width);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        border-right: 1px solid rgba(255,255,255,.15);
        margin-right: 14px;
        transition: width 0.3s ease;
        flex-shrink: 0;
    }

    /* Cuando el sidebar está colapsado */
    .menu-container.collapsed {
        width: 60px;
        justify-content: center;
    }

    .menu-container.collapsed .topbar-logo {
        display: none;
    }

    /* LOGO */
    .topbar-logo {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .topbar-logo img {
        height: 36px;
        width: auto;
        display: block;
    }

    /* BOTON MENU */
    .btn-menu {
        background: rgba(255,255,255,.08);
        border: none;
        color: rgba(255,255,255,.9);
        font-size: 18px;
        cursor: pointer;
        width: 38px;
        height: 38px;
        border-radius: 6px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .btn-menu:hover {
        background: rgba(255,255,255,.15);
        transform: scale(1.05);
    }
    .btn-menu:active {
        transform: scale(0.95);
    }

    /* Animación del ícono hamburguesa/X */
    .btn-menu i {
        transition: transform 0.3s ease;
    }
    .btn-menu.active i {
        transform: rotate(90deg);
    }

    /* INFO RUC + BIENVENIDA */
    .topbar-info {
        color: rgba(255,255,255,.9);
        font-size: 12.5px;
        line-height: 1.45;
    }
    .topbar-info .ruc {
        font-weight: 700;
        color: #fff;
        letter-spacing: .3px;
    }
    .topbar-info strong {
        color: #ffd54f;
    }

    /* ===== RIGHT ===== */
    .topbar-right {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    /* RELOJ */
    .topbar-time {
        color: rgba(255,255,255,.85);
        font-size: 12px;
        text-align: right;
        line-height: 1.35;
        font-family: 'Segoe UI', Tahoma, sans-serif;
    }

    /* CAMPANA DE NOTIFICACIONES */
    .topbar-bell {
        position: relative;
        cursor: pointer;
        padding: 6px;
        border-radius: 6px;
        transition: background 0.2s;
    }
    .topbar-bell:hover {
        background: rgba(255,255,255,.1);
    }
    .topbar-bell i {
        font-size: 20px;
        color: rgba(255,255,255,.85);
        transition: color .2s;
    }
    .topbar-bell:hover i {
        color: #fff;
    }
    .topbar-bell-badge {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 18px;
        height: 18px;
        background: #e74c3c;
        color: #fff;
        font-size: 10px;
        font-weight: 800;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        border: 2px solid #0f1b4d;
        line-height: 1;
    }

    /* AVATAR */
    .user-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,.08);
        padding: 4px 12px 4px 6px;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .user-badge:hover {
        background: rgba(255,255,255,.15);
    }
    .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #2e4aad;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        border: 2px solid rgba(255,255,255,.2);
    }
    .user-badge > span {
        color: #fff;
        font-size: 12px;
        font-weight: 500;
    }

    /* ===== MAIN CONTENT - debe existir en tu página ===== */
    .main-content {
        margin-left: var(--sidebar-width);
        margin-top: var(--topbar-height);
        transition: margin-left 0.3s ease;
    }
    .main-content.expanded {
        margin-left: 0;
    }

    /* ===== SIDEBAR OVERLAY ===== */
    .sidebar-overlay {
        display: none;
        position: fixed;
        top: var(--topbar-height);
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index: 85;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .sidebar-overlay.visible {
        display: block;
        opacity: 1;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 992px) {
        .topbar-info {
            font-size: 11px;
        }
        .topbar-info .ruc {
            display: block;
        }
    }

    @media (max-width: 768px) {
        .topbar {
            padding: 0 10px 0 0;
        }

        .menu-container {
            width: auto;
            border-right: none;
            margin-right: 10px;
            padding: 0 10px;
            justify-content: flex-start;
            gap: 10px;
        }

        .menu-container.collapsed {
            width: auto;
        }

        .menu-container.collapsed .topbar-logo {
            display: flex;
        }

        .topbar-logo img {
            height: 30px;
        }

        .topbar-info {
            display: none;
        }

        .user-badge > span {
            display: none;
        }

        .user-badge {
            padding: 4px;
        }

        .topbar-time {
            display: none;
        }

        .topbar-right {
            gap: 8px;
        }

        .btn-menu {
            width: 36px;
            height: 36px;
            font-size: 16px;
        }
    }

    @media (max-width: 480px) {
        .topbar-logo img {
            height: 26px;
        }
    }
</style>

<header class="topbar">
    <div class="topbar-left">
        <!-- CONTENEDOR MENU - alineado con el sidebar -->
        <div class="menu-container" id="menu-container">
            <!-- LOGO -->
            <div class="topbar-logo" onclick="location.href='/AFP/inicio/inicio.php'">
                <img src="/AFP/img/logo_home.png" alt="AFPnet">
            </div>

            <!-- BOTÓN MENÚ -->
            <button class="btn-menu" id="btn-toggle-sidebar" type="button" title="Mostrar/Ocultar menú">
                <i class="fas fa-bars"></i>
            </button>
        </div>

        <!-- INFO: RUC + Bienvenida -->
        <div class="topbar-info">
            <span class="ruc" id="tb-ruc">20603401574</span> - <span id="tb-razon">CORPORACION DE FORMACION CONTINUA DEL PERU S.A.C.</span><br>
            Bienvenido Sr(a). <strong id="w-name">Usuario</strong> (<span id="w-perfil">Administrador</span>)
        </div>
    </div>

    <div class="topbar-right">
        <!-- RELOJ -->
        <div class="topbar-time" id="tb-time"></div>

        <!-- CAMPANA NOTIFICACIONES -->
        <div class="topbar-bell" id="tb-bell" title="Notificaciones">
            <i class="fas fa-bell"></i>
            <span class="topbar-bell-badge" id="tb-bell-count">0</span>
        </div>

        <!-- AVATAR + NOMBRE -->
        <div class="user-badge">
            <div class="user-avatar" id="u-init">U</div>
            <span id="u-name">Usuario</span>
        </div>
    </div>
</header>

<!-- Overlay para sidebar móvil -->
<div class="sidebar-overlay" id="sidebar-overlay"></div>

<script>
(function(){
    // ===== SESSION =====
    const userRUC  = sessionStorage.getItem('afpnet_ruc') || '20603401574';
    const uNombre  = sessionStorage.getItem('afpnet_nombre') || sessionStorage.getItem('afpnet_usuario') || 'Usuario';
    const uPerfil  = sessionStorage.getItem('afpnet_perfil') || 'Administrador';
    const uRazon   = sessionStorage.getItem('afpnet_razon') || 'CORPORACION DE FORMACION CONTINUA DEL PERU S.A.C.';

    // Capitalizar nombre
    const dn = uNombre.charAt(0).toUpperCase() + uNombre.slice(1);

    // Setear datos en el topbar
    const el = id => document.getElementById(id);
    if(el('w-name'))   el('w-name').textContent = dn;
    if(el('u-name'))   el('u-name').textContent = dn;
    if(el('u-init'))   el('u-init').textContent = (dn.substring(0,2) || 'U').toUpperCase();
    if(el('w-perfil')) el('w-perfil').textContent = uPerfil;
    if(el('tb-ruc'))   el('tb-ruc').textContent = userRUC;
    if(el('tb-razon')) el('tb-razon').textContent = uRazon;

    // ===== RELOJ =====
    function updClk(){
        const n = new Date();
        if(el('tb-time')){
            el('tb-time').innerHTML =
                n.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}) +
                '<br>' +
                n.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
        }
    }
    updClk();
    setInterval(updClk, 1000);

    // ===== SIDEBAR TOGGLE =====
    const sidebar       = document.getElementById('sidebar');
    const mainContent   = document.getElementById('main-content');
    const overlay       = document.getElementById('sidebar-overlay');
    const btnToggle     = document.getElementById('btn-toggle-sidebar');
    const menuContainer = document.getElementById('menu-container');

    if(btnToggle){
        btnToggle.addEventListener('click', function(){
            if(!sidebar) {
                console.warn('Sidebar no encontrado. Asegúrate de incluir sidebar.php');
                return;
            }

            const isMobile = window.innerWidth <= 768;

            if(isMobile){
                // MÓVIL: slide in/out
                sidebar.classList.toggle('mobile-open');
                if(overlay) overlay.classList.toggle('visible');
            } else {
                // DESKTOP: colapsar/expandir
                sidebar.classList.toggle('collapsed');
                if(mainContent) mainContent.classList.toggle('expanded');
                if(menuContainer) menuContainer.classList.toggle('collapsed');
            }

            // Animación del botón
            btnToggle.classList.toggle('active');
        });
    }

    // Cerrar sidebar al hacer click en overlay
    if(overlay){
        overlay.addEventListener('click', function(){
            if(sidebar) sidebar.classList.remove('mobile-open');
            overlay.classList.remove('visible');
            if(btnToggle) btnToggle.classList.remove('active');
        });
    }

    // Ajustar al cambiar tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            const isMobile = window.innerWidth <= 768;

            if(isMobile){
                // Resetear estados de desktop
                if(sidebar) sidebar.classList.remove('collapsed');
                if(mainContent) mainContent.classList.remove('expanded');
                if(menuContainer) menuContainer.classList.remove('collapsed');
            } else {
                // Resetear estados de móvil
                if(sidebar) sidebar.classList.remove('mobile-open');
                if(overlay) overlay.classList.remove('visible');
            }
            if(btnToggle) btnToggle.classList.remove('active');
        }, 100);
    });

    // ===== CERRAR SESIÓN (global) =====
    window.cerrarSesion = function(){
        sessionStorage.clear();
        location.href = '/AFP/login/login.php';
    };
})();
</script>