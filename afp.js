
// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
    });
});

// Captcha
function refreshCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    document.getElementById('captcha-display').textContent = code;
}

// RUC: only numbers
document.getElementById('ruc').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// Show error
function showError(msg) {
    const el = document.getElementById('form-error');
    document.getElementById('error-text').textContent = msg;
    el.classList.add('visible');
}

function hideError() {
    document.getElementById('form-error').classList.remove('visible');
}

// Login form submission
document.getElementById('frm-login-empleador').addEventListener('submit', function (e) {
    e.preventDefault();
    hideError();

    const ruc = document.getElementById('ruc').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const contrasenia = document.getElementById('contrasenia').value.trim();
    const captchaInput = document.getElementById('captcha-input').value.trim().toUpperCase();
    const captchaCode = document.getElementById('captcha-display').textContent.trim();

    // Validations
    if (!ruc || ruc.length !== 11) {
        showError('El RUC debe tener 11 dígitos.');
        return;
    }
    if (!usuario || usuario.length < 6) {
        showError('El nombre de usuario debe tener al menos 6 caracteres.');
        return;
    }
    if (!contrasenia || contrasenia.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    if (!captchaInput) {
        showError('Ingrese el texto de la imagen.');
        return;
    }
    if (captchaInput !== captchaCode) {
        showError('El texto ingresado no coincide con la imagen.');
        refreshCaptcha();
        return;
    }

    // Show loading
    const btn = document.getElementById('btn-ingresar');
    btn.classList.add('loading');
    btn.disabled = true;

    // Save to session & redirect
    sessionStorage.setItem('afpnet_ruc', ruc);
    sessionStorage.setItem('afpnet_usuario', usuario);

    setTimeout(() => {
        window.location.href = 'dashboard.php';
    }, 1200);
});
