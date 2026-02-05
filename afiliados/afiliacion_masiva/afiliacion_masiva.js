// ===== DATOS DE RESPALDO =====
const DATA_BACKUP = [
    { ruc: '20603401574', user: 'jcalderon', nombre: 'Jose Luis Calderon Ormeño', appat: 'Calderon', apmat: 'Ormeño', perfil: 'Administrador', estado: 'ACTIVO' },
    { ruc: '20603401574', user: 'mgarcia',   nombre: 'Maria Garcia Lopez',       appat: 'Garcia',   apmat: 'Lopez',   perfil: 'Operador',       estado: 'ACTIVO' },
    { ruc: '20603401574', user: 'jquispe',   nombre: 'Juan Quispe Rojas',        appat: 'Quispe',   apmat: 'Rojas',   perfil: 'Operador',       estado: 'ACTIVO' },
    { ruc: '20603401574', user: 'cflores',   nombre: 'Carlos Flores Diaz',       appat: 'Flores',   apmat: 'Diaz',    perfil: 'Administrador',  estado: 'ACTIVO' },
    { ruc: '20603401574', user: 'lrodriguez',nombre: 'Lucia Rodriguez Pena',     appat: 'Rodriguez', apmat: 'Pena',   perfil: 'Operador',       estado: 'INACTIVO' },
];

// ===== HELPERS =====
const $ = id => document.getElementById(id);
let editingIndex = -1;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initData();
    bindEvents();
    // Mostrar todos al cargar
    onBuscar();
});

function initData() {
    const currentRuc = sessionStorage.getItem('afpnet_ruc') || '20603401574';

    let existentes = [];
    try {
        const raw = localStorage.getItem('afpnet_db_usuarios');
        if (raw) existentes = JSON.parse(raw);
    } catch(_) {}

    const tieneDelRuc = Array.isArray(existentes) && existentes.some(u => String(u.ruc) === String(currentRuc));

    if (!tieneDelRuc) {
        const adaptados = DATA_BACKUP.map(u => ({ ...u, ruc: currentRuc }));
        const merged = Array.isArray(existentes) ? [...existentes, ...adaptados] : adaptados;
        localStorage.setItem('afpnet_db_usuarios', JSON.stringify(merged));
    }
}

function bindEvents() {
    $('btn-buscar')?.addEventListener('click', onBuscar);
    $('btn-agregar')?.addEventListener('click', () => openAgregar());
    $('btn-desactivar')?.addEventListener('click', onDesactivar);
    $('btn-guia')?.addEventListener('click', () => alert('Aquí abrirás tu guía de uso.'));
    $('btn-save-user')?.addEventListener('click', onGuardar);
    $('chk-all')?.addEventListener('change', onCheckAll);
}

// ===== CARGAR USUARIOS =====
function getUsuarios() {
    try {
        const raw = localStorage.getItem('afpnet_db_usuarios');
        return raw ? JSON.parse(raw) : [];
    } catch (_) { return []; }
}
function saveUsuarios(arr) {
    localStorage.setItem('afpnet_db_usuarios', JSON.stringify(arr));
}

// ===== BUSCAR =====
function onBuscar() {
    const fUser  = ($('inp-usuario')?.value || '').trim().toLowerCase();
    const fAppat = ($('inp-appat')?.value || '').trim().toLowerCase();
    const fApmat = ($('inp-apmat')?.value || '').trim().toLowerCase();

    const currentRuc = sessionStorage.getItem('afpnet_ruc') || '20603401574';
    const todos = getUsuarios();

    const filtered = todos.filter(u => {
        if (String(u.ruc) !== String(currentRuc)) return false;

        // Filtro por usuario
        if (fUser && !(u.user || '').toLowerCase().includes(fUser)) return false;

        // Filtro por apellido paterno (busca en appat y en nombre)
        if (fAppat) {
            const enAppat  = (u.appat || '').toLowerCase().includes(fAppat);
            const enNombre = (u.nombre || '').toLowerCase().includes(fAppat);
            if (!enAppat && !enNombre) return false;
        }

        // Filtro por apellido materno (busca en apmat y en nombre)
        if (fApmat) {
            const enApmat  = (u.apmat || '').toLowerCase().includes(fApmat);
            const enNombre = (u.nombre || '').toLowerCase().includes(fApmat);
            if (!enApmat && !enNombre) return false;
        }

        return true;
    });

    renderTable(filtered);
}

// ===== RENDER TABLA =====
function renderTable(arr) {
    const tbody = $('user-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (arr.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px;color:#999;">No se encontraron usuarios.</td></tr>`;
        return;
    }

    arr.forEach((u) => {
        const esActivo = (u.estado || 'ACTIVO') === 'ACTIVO';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align:center;"><input type="checkbox" class="chk-row" data-user="${esc(u.user)}"></td>
            <td><strong>${esc(u.user)}</strong></td>
            <td>${esc(u.nombre)}</td>
            <td>${esc(u.ruc)}</td>
            <td><span class="badge ${u.perfil === 'Administrador' ? 'badge-admin' : 'badge-user'}">${esc(u.perfil)}</span></td>
            <td><span class="badge ${esActivo ? 'badge-pres' : 'badge-pend'}">${esActivo ? 'ACTIVO' : 'INACTIVO'}</span></td>
            <td>
                <button class="btn btn-blue btn-mini" onclick="openEditar('${esc(u.user)}')" title="Editar"><i class="fas fa-edit"></i></button>
                <button class="btn btn-pink btn-mini" onclick="eliminarUser('${esc(u.user)}')" title="Eliminar"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
}

// ===== CHECKBOX ALL =====
function onCheckAll() {
    const checked = $('chk-all')?.checked || false;
    document.querySelectorAll('.chk-row').forEach(c => c.checked = checked);
}

// ===== AGREGAR =====
function openAgregar() {
    editingIndex = -1;
    const title = $('mo-user-title');
    if (title) title.textContent = 'REGISTRAR NUEVO USUARIO';
    if ($('in-user')) { $('in-user').value = ''; $('in-user').disabled = false; }
    if ($('in-name')) $('in-name').value = '';
    if ($('in-per')) $('in-per').value = 'Operador';
    openM('mo-user');
}

// ===== EDITAR =====
function openEditar(userId) {
    const todos = getUsuarios();
    const idx = todos.findIndex(u => u.user === userId);
    if (idx < 0) return;

    editingIndex = idx;
    const u = todos[idx];
    const title = $('mo-user-title');
    if (title) title.textContent = 'EDITAR USUARIO';
    if ($('in-user')) { $('in-user').value = u.user; $('in-user').disabled = true; }
    if ($('in-name')) $('in-name').value = u.nombre;
    if ($('in-per')) $('in-per').value = u.perfil;
    openM('mo-user');
}

// ===== GUARDAR (AGREGAR / EDITAR) =====
function onGuardar() {
    const user = ($('in-user')?.value || '').trim();
    const name = ($('in-name')?.value || '').trim();
    const perf = $('in-per')?.value || 'Operador';

    if (!user) { alert('Ingrese el Usuario (ID).'); return; }
    if (!name) { alert('Ingrese el Nombre Completo.'); return; }

    const currentRuc = sessionStorage.getItem('afpnet_ruc') || '20603401574';
    const todos = getUsuarios();

    if (editingIndex >= 0) {
        todos[editingIndex].nombre = name;
        todos[editingIndex].perfil = perf;
        saveUsuarios(todos);
        closeM('mo-user');
        alert(`Usuario "${user}" actualizado.`);
    } else {
        if (todos.some(u => u.user === user && String(u.ruc) === String(currentRuc))) {
            alert('Ya existe un usuario con ese ID.');
            return;
        }
        const partes = name.split(' ');
        todos.push({
            ruc: currentRuc,
            user: user,
            nombre: name,
            appat: partes[0] || '',
            apmat: partes[1] || '',
            perfil: perf,
            estado: 'ACTIVO'
        });
        saveUsuarios(todos);
        closeM('mo-user');
        alert(`Usuario "${user}" registrado.`);
    }

    onBuscar();
}

// ===== ELIMINAR =====
function eliminarUser(userId) {
    if (!confirm(`¿Eliminar al usuario "${userId}"?`)) return;

    const todos = getUsuarios();
    const idx = todos.findIndex(u => u.user === userId);
    if (idx < 0) return;

    todos.splice(idx, 1);
    saveUsuarios(todos);
    alert(`Usuario "${userId}" eliminado.`);
    onBuscar();
}

// ===== DESACTIVAR SELECCIONADOS =====
function onDesactivar() {
    const checks = document.querySelectorAll('.chk-row:checked');
    if (checks.length === 0) {
        alert('Seleccione al menos un usuario para desactivar.');
        return;
    }

    const users = Array.from(checks).map(c => c.dataset.user);
    if (!confirm(`¿Desactivar ${users.length} usuario(s)?`)) return;

    const todos = getUsuarios();
    users.forEach(uid => {
        const u = todos.find(x => x.user === uid);
        if (u) u.estado = 'INACTIVO';
    });
    saveUsuarios(todos);
    alert(`${users.length} usuario(s) desactivado(s).`);
    onBuscar();
}

// ===== MODALES =====
function openM(id) { $(id)?.classList.add('vis'); }
function closeM(id) { $(id)?.classList.remove('vis'); }