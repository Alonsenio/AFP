/*
 * USUARIOS.JS - Gestión de Usuarios AFPnet
 */

// ===== DATOS DE USUARIOS =====
var DATA_BACKUP = [
    { ruc: '12345678910', user: 'alonso',     nombres: 'Alonso',  apep: 'Lucas',     apem: 'Gomez',  perfil: 'Administrador', estado: 'ACTIVO' },
    { ruc: '12345678910', user: 'elder',      nombres: 'Elder',   apep: 'Alejandro', apem: 'Ruiz',   perfil: 'Operador',      estado: 'ACTIVO' },
    { ruc: '12345678910', user: 'mgarcia',    nombres: 'Maria',   apep: 'Garcia',    apem: 'Lopez',  perfil: 'Operador',      estado: 'ACTIVO' },
    { ruc: '12345678910', user: 'jquispe',    nombres: 'Juan',    apep: 'Quispe',    apem: 'Mamani', perfil: 'Administrador', estado: 'ACTIVO' },
    { ruc: '20987654321', user: 'gustavo',    nombres: 'Gustavo', apep: 'Adolfo',    apem: 'Perez',  perfil: 'Administrador', estado: 'ACTIVO' },
    { ruc: '12345678910', user: 'lrodriguez', nombres: 'Lucia',   apep: 'Rodriguez', apem: 'Soto',   perfil: 'Operador',      estado: 'ACTIVO' },
    { ruc: '20987654321', user: 'cflores',    nombres: 'Carlos',  apep: 'Flores',    apem: 'Rojas',  perfil: 'Operador',      estado: 'ACTIVO' }
];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    loadSessionData();
    ensureDb();
    renderUsers();
    bindEvents();
});

// ===== CARGAR DATOS DE SESIÓN =====
function loadSessionData() {
    var nom = sessionStorage.getItem('afpnet_nombre') || 'Usuario';
    var user = sessionStorage.getItem('afpnet_usuario') || 'Usuario';

    var wName = document.getElementById('w-name');
    var uName = document.getElementById('u-name');
    var uInit = document.getElementById('u-init');

    if (wName) wName.textContent = nom;
    if (uName) uName.textContent = user;
    if (uInit) uInit.textContent = user.charAt(0).toUpperCase();
}

// ===== INICIALIZAR BASE DE DATOS =====
function ensureDb() {
    var raw = localStorage.getItem('afpnet_db_usuarios');
    if (!raw) {
        localStorage.setItem('afpnet_db_usuarios', JSON.stringify(DATA_BACKUP));
    }
}

function getDbUsers() {
    var raw = localStorage.getItem('afpnet_db_usuarios');
    if (!raw) return DATA_BACKUP;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return DATA_BACKUP;
    }
}

function setDbUsers(list) {
    localStorage.setItem('afpnet_db_usuarios', JSON.stringify(list));
}

// ===== VINCULAR EVENTOS =====
function bindEvents() {
    var btnBuscar = document.getElementById('btn-buscar');
    var btnGuia = document.getElementById('btn-guia');
    var btnAgregar = document.getElementById('btn-agregar');
    var btnDesactivar = document.getElementById('btn-desactivar');
    var btnSaveUser = document.getElementById('btn-save-user');

    // Botón BUSCAR
    if (btnBuscar) {
        btnBuscar.onclick = function() {
            var user = document.getElementById('search-user');
            var apep = document.getElementById('search-apep');
            var apem = document.getElementById('search-apem');

            renderUsers({
                user: user ? user.value : '',
                apep: apep ? apep.value : '',
                apem: apem ? apem.value : ''
            });
        };
    }

    // Botón GUIA DE USO
    if (btnGuia) {
        btnGuia.onclick = function() {
            openM('mo-guia');
        };
    }

    // Botón AGREGAR
    if (btnAgregar) {
        btnAgregar.onclick = function() {
            openM('mo-user');
        };
    }

    // Botón DESACTIVAR (placeholder)
    if (btnDesactivar) {
        btnDesactivar.onclick = function() {
            alert('Funcionalidad DESACTIVAR: Seleccione un usuario de la tabla primero.');
        };
    }

    // Botón GUARDAR USUARIO
    if (btnSaveUser) {
        btnSaveUser.onclick = guardarUsuario;
    }

    // Enter en inputs dispara búsqueda
    var inputs = ['search-user', 'search-apep', 'search-apem'];
    for (var i = 0; i < inputs.length; i++) {
        var el = document.getElementById(inputs[i]);
        if (el) {
            el.onkeydown = function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    var btn = document.getElementById('btn-buscar');
                    if (btn) btn.click();
                }
            };
        }
    }
}

// ===== RENDERIZAR USUARIOS =====
function renderUsers(filters) {
    var tbody = document.getElementById('user-table-body');
    if (!tbody) return;

    var currentRuc = sessionStorage.getItem('afpnet_ruc') || '12345678910';
    var lista = getDbUsers();

    tbody.innerHTML = '';

    var f = filters || { user: '', apep: '', apem: '' };
    var fUser = (f.user || '').toLowerCase().trim();
    var fApep = (f.apep || '').toLowerCase().trim();
    var fApem = (f.apem || '').toLowerCase().trim();

    var filtrados = [];

    for (var i = 0; i < lista.length; i++) {
        var u = lista[i];

        // Filtrar por RUC
        if (String(u.ruc) !== String(currentRuc)) continue;

        // Filtrar por usuario
        if (fUser !== '' && (u.user || '').toLowerCase().indexOf(fUser) === -1) continue;

        // Filtrar por apellido paterno
        if (fApep !== '' && (u.apep || '').toLowerCase().indexOf(fApep) === -1) continue;

        // Filtrar por apellido materno
        if (fApem !== '' && (u.apem || '').toLowerCase().indexOf(fApem) === -1) continue;

        filtrados.push(u);
    }

    if (filtrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No se encontraron usuarios.</td></tr>';
        return;
    }

    for (var j = 0; j < filtrados.length; j++) {
        var usr = filtrados[j];
        var tr = document.createElement('tr');

        var nombreCompleto = (usr.nombres || '') + ' ' + (usr.apep || '') + ' ' + (usr.apem || '');
        var badgePerfil = usr.perfil === 'Administrador' ? 'badge-admin' : 'badge-user';
        var badgeEstado = usr.estado === 'ACTIVO' ? 'badge-pres' : 'badge-off';

        tr.innerHTML =
            '<td><strong>' + esc(usr.user) + '</strong></td>' +
            '<td>' + esc(nombreCompleto.trim()) + '</td>' +
            '<td>' + esc(usr.ruc) + '</td>' +
            '<td><span class="badge ' + badgePerfil + '">' + esc(usr.perfil) + '</span></td>' +
            '<td><span class="badge ' + badgeEstado + '">' + esc(usr.estado) + '</span></td>' +
            '<td style="display:flex; gap:6px;">' +
                '<button class="btn btn-blue btn-mini" title="Editar"><i class="fas fa-edit"></i></button>' +
                '<button class="btn btn-gray btn-mini" title="Activar/Desactivar" onclick="toggleEstado(\'' + esc(usr.user) + '\', \'' + esc(usr.ruc) + '\')"><i class="fas ' + (usr.estado === 'ACTIVO' ? 'fa-user-slash' : 'fa-user-check') + '"></i></button>' +
            '</td>';

        tbody.appendChild(tr);
    }
}

// ===== GUARDAR NUEVO USUARIO =====
function guardarUsuario() {
    var ruc = sessionStorage.getItem('afpnet_ruc') || '12345678910';
    var userEl = document.getElementById('in-user');
    var nameEl = document.getElementById('in-name');
    var perEl = document.getElementById('in-per');

    var user = userEl ? userEl.value.trim() : '';
    var nombreCompleto = nameEl ? nameEl.value.trim() : '';
    var perfil = perEl ? perEl.value : 'Operador';

    if (!user || !nombreCompleto) {
        alert('Complete Usuario y Nombre Completo.');
        return;
    }

    // Separar nombre en partes
    var parts = nombreCompleto.split(/\s+/);
    var nombres = parts.length > 2 ? parts.slice(0, parts.length - 2).join(' ') : parts[0] || '';
    var apep = parts.length >= 2 ? parts[parts.length - 2] : '';
    var apem = parts.length >= 3 ? parts[parts.length - 1] : '';

    var db = getDbUsers();

    // Verificar si ya existe
    for (var i = 0; i < db.length; i++) {
        if (db[i].ruc === ruc && db[i].user.toLowerCase() === user.toLowerCase()) {
            alert('Ese usuario ya existe para este RUC.');
            return;
        }
    }

    db.push({
        ruc: ruc,
        user: user,
        nombres: nombres,
        apep: apep,
        apem: apem,
        perfil: perfil,
        estado: 'ACTIVO'
    });

    setDbUsers(db);

    // Limpiar campos
    if (userEl) userEl.value = '';
    if (nameEl) nameEl.value = '';

    closeM('mo-user');
    renderUsers();
    alert('Usuario registrado correctamente.');
}

// ===== TOGGLE ESTADO =====
function toggleEstado(user, ruc) {
    var db = getDbUsers();
    for (var i = 0; i < db.length; i++) {
        if (db[i].ruc === ruc && db[i].user === user) {
            db[i].estado = db[i].estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
            break;
        }
    }
    setDbUsers(db);
    renderUsers();
}

// ===== HELPERS =====
function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function openM(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('vis');
}

function closeM(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('vis');
}