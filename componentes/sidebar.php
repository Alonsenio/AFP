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
                    <a href="/administracion/usuarios/usuarios.php">Usuarios</a>
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
                    <a href="/aportes/presentacion_y_pago_de_planillas/presentacion_y_pago_de_planillas.php">Presentación y Pago de Planillas</a>
                    <a href="#">Consulta y Pago de Planillas</a>}
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
                    <a href="/afiliados/consulta_afiliados_unitaria/consulta_afiliados_unitaria.php" class="act">Consulta de Afiliados Unitaria</a>
                    <a href="/afiliados/consulta_afiliados_masiva/consulta_afiliados_masiva.php">Consulta de Afiliados Masiva</a>
                    <a href="#">Afiliación Unitaria</a>
                    <a href="#">Afiliación Masiva</a>
                    <a href="#">Consulta de Solicitudes de Afiliación</a>
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
    <script>
        // Toggle sidebar
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        const overlay = document.getElementById('sidebar-overlay');

        document.getElementById('btn-toggle-sidebar').addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('mobile-open');
                overlay.classList.toggle('visible');
            } else {
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
            }
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('visible');
        });

        // Toggle submenu
        function toggleSubmenu(el) {
            const submenu = el.nextElementSibling;
            const isOpen = submenu.classList.contains('open');

            // Close all other submenus
            document.querySelectorAll('.submenu.open').forEach(s => {
                s.classList.remove('open');
                s.previousElementSibling.classList.remove('open');
            });

            if (!isOpen) {
                submenu.classList.add('open');
                el.classList.add('open');
            }
        }
    </script>