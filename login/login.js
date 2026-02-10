// 1. Base de datos simulada de usuarios

const USUARIOS_VALIDOS = [
    { ruc: '20601234567', user: 'MYPE01', pass: 'mype2025', rs: 'EMPRESA DEMO MYPE S.A.C.', perfil: 'Administrador', regimen: 'MYPE TRIBUTARIO', codigoTributo: '3121', porcentajeRenta: 1.0, nombre: "JOSE LUIS CALDERON ORMEÑO" },
    { ruc: '20609876543', user: 'MYPE02', pass: 'tributario', rs: 'COMERCIAL EJEMPLO MYPE E.I.R.L.', perfil: 'Operador', regimen: 'MYPE TRIBUTARIO', codigoTributo: '3121', porcentajeRenta: 1.0 },
    { ruc: '10456789012', user: 'PMYPE1', pass: 'persona10', rs: 'GARCIA RODRIGUEZ JUAN CARLOS', perfil: 'Operador', regimen: 'MYPE TRIBUTARIO', codigoTributo: '3121', porcentajeRenta: 1.0 },
    { ruc: '20501122334', user: 'ESPE01', pass: 'especial01', rs: 'SERVICIOS ESPECIAL S.R.L.', perfil: 'Administrador', regimen: 'REGIMEN ESPECIAL', codigoTributo: '3111', porcentajeRenta: 1.5 },
    { ruc: '20507788990', user: 'ESPE02', pass: 'rer2025', rs: 'DISTRIBUIDORA RER S.A.C.', perfil: 'Administrador', regimen: 'REGIMEN ESPECIAL', codigoTributo: '3111', porcentajeRenta: 1.5 },
    { ruc: '10321654987', user: 'PESPE1', pass: 'persona15', rs: 'MARTINEZ LOPEZ MARIA ELENA', perfil: 'Operador', regimen: 'REGIMEN ESPECIAL', codigoTributo: '3111', porcentajeRenta: 1.5 },
    { ruc: '20100123456', user: 'GENE01', pass: 'general01', rs: 'CORPORACION GENERAL S.A.', perfil: 'Operador', regimen: 'REGIMEN GENERAL', codigoTributo: '3031', porcentajeRenta: 1.5 },
    { ruc: '20100654321', user: 'GENE02', pass: 'general02', rs: 'INDUSTRIAS PERU S.A.C.', perfil: 'Administrador', regimen: 'REGIMEN GENERAL', codigoTributo: '3031', porcentajeRenta: 1.5 }
];

// MOSTRAR CREDENCIALES
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const registrate = document.getElementById("registrate");

if(registrate) {
    registrate.addEventListener("click", (e) => {
        e.preventDefault();
        const u = USUARIOS_VALIDOS[0]; // aquí decides cuál mostrar
        document.getElementById("cred-ruc").textContent = u.ruc;
        document.getElementById("cred-user").textContent = u.user;
        document.getElementById("cred-pass").textContent = u.pass;
        modal.style.display = "block";
    });
}
if(closeBtn) closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };



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
    sessionStorage.setItem('afpnet_razon', auth.rs);
    sessionStorage.setItem('afpnet_nombre', auth.nombre);
    
    // Guardar BD en localStorage
    localStorage.setItem('afpnet_db_usuarios', JSON.stringify(USUARIOS_VALIDOS));

    const btn = document.getElementById('btn-ingresar');
    btn.innerHTML = 'INGRESANDO...';
    btn.disabled = true;

    setTimeout(() => { window.location.href = '../inicio/inicio.php'; }, 1000);
});