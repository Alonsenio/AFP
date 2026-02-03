// Load user data from sessionStorage
window.addEventListener('DOMContentLoaded', () => {
    const ruc = sessionStorage.getItem('afpnet_ruc') || '20100000001';
    const usuario = sessionStorage.getItem('afpnet_usuario') || 'Usuario';

    const displayName = usuario.charAt(0).toUpperCase() + usuario.slice(1);
    const initials = displayName.substring(0, 2).toUpperCase();

    document.getElementById('welcome-name').textContent = displayName;
    document.getElementById('user-display-name').textContent = displayName;
    document.getElementById('user-initials').textContent = initials;
});

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

// Set active nav item
function setActive(el) {
    document.querySelectorAll('.nav-link.active').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}

// Logout
function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = '../afp/afp.php';
}
