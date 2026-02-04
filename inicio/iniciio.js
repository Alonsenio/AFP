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

// Set active nav item
function setActive(el) {
    document.querySelectorAll('.nav-link.active').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}

// Logout
function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = '../login/login.php';
}
