// 1. Base de datos simulada de usuarios
const USUARIOS_VALIDOS = [
    { ruc: '20123456789', user: 'alonso', pass: '123456', nombre: 'Alonso Lucas', perfil: 'Administrador' },
    { ruc: '20123456789', user: 'elder', pass: '123456', nombre: 'Elder Alejandro', perfil: 'Operador' },
    { ruc: '20123456789', user: 'pooul', pass: '123456', nombre: 'Pooul Garcia', perfil: 'Operador' },
    { ruc: '20123456789', user: 'anthony', pass: '123456', nombre: 'Anthony Quispe', perfil: 'Administrador' },
    { ruc: '20987654321', user: 'gustavo', pass: '123456', nombre: 'Gustavo Adolfo', perfil: 'Administrador' },
    { ruc: '20987654321', user: 'angel', pass: '123456', nombre: 'Angel Rodriguez', perfil: 'Operador' },
    { ruc: '20987654321', user: 'maria', pass: '123456', nombre: 'Maria Flores', perfil: 'Operador' },
    { ruc: '20554433221', user: 'admin', pass: 'admin123', nombre: 'Administrador Sistema', perfil: 'Administrador' },
    { ruc: '20554433221', user: 'soporte', pass: 'soporte123', nombre: 'Soporte Tecnico', perfil: 'Operador' }
];

// Cambio de pestañas (Tabs)
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
    });
});

function refreshCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    const el = document.getElementById('captcha-display');
    if(el) el.textContent = code;
}

const rucInput = document.getElementById('ruc');
if(rucInput) {
    rucInput.addEventListener('input', function() { this.value = this.value.replace(/[^0-9]/g, ''); });
}

function showError(msg) {
    const el = document.getElementById('form-error');
    const txt = document.getElementById('error-text');
    if(el && txt) { txt.textContent = msg; el.classList.add('visible'); }
}

function hideError() {
    const el = document.getElementById('form-error');
    if(el) el.classList.remove('visible');
}

refreshCaptcha();

document.getElementById('frm-login-empleador').addEventListener('submit', function (e) {
    e.preventDefault();
    hideError();

    const ruc = document.getElementById('ruc').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const pass = document.getElementById('contrasenia').value.trim();
    const capIn = document.getElementById('captcha-input').value.trim().toUpperCase();
    const capCo = document.getElementById('captcha-display').textContent.trim();

    if (ruc.length !== 11) { showError('El RUC debe tener 11 dígitos.'); return; }
    if (capIn !== capCo) { showError('Captcha incorrecto.'); refreshCaptcha(); return; }

    const auth = USUARIOS_VALIDOS.find(u => 
        u.ruc === ruc && u.user.toLowerCase() === usuario.toLowerCase() && u.pass === pass
    );

    if (!auth) {
        showError('RUC, usuario o contraseña incorrectos.');
        refreshCaptcha();
        return;
    }

    // GUARDAR TODO
    sessionStorage.setItem('afpnet_sesion', 'true');
    sessionStorage.setItem('afpnet_ruc', auth.ruc);
    sessionStorage.setItem('afpnet_usuario', auth.user);
    sessionStorage.setItem('afpnet_nombre', auth.nombre);
    
    // Guardar BD en localStorage
    localStorage.setItem('afpnet_db_usuarios', JSON.stringify(USUARIOS_VALIDOS));

    const btn = document.getElementById('btn-ingresar');
    btn.innerHTML = 'INGRESANDO...';
    btn.disabled = true;

    setTimeout(() => { window.location.href = '../dashboard/dashboard.php'; }, 1000);
});