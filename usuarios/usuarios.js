// Red de seguridad: Datos por defecto si el localStorage falla
const DATA_BACKUP = [
    { ruc: '20123456789', user: 'alonso', nombre: 'Alonso Lucas', perfil: 'Administrador' },
    { ruc: '20123456789', user: 'elder', nombre: 'Elder Alejandro', perfil: 'Operador' },
    { ruc: '20123456789', user: 'mgarcia', nombre: 'Maria Garcia', perfil: 'Operador' },
    { ruc: '20123456789', user: 'jquispe', nombre: 'Juan Quispe', perfil: 'Administrador' },
    { ruc: '20987654321', user: 'gustavo', nombre: 'Gustavo Adolfo', perfil: 'Administrador' },
    { ruc: '20987654321', user: 'lrodriguez', nombre: 'Lucia Rodriguez', perfil: 'Operador' },
    { ruc: '20987654321', user: 'cflores', nombre: 'Carlos Flores', perfil: 'Operador' }
];

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    renderUsers(); 
    initMenu();
    initFilters(); 
});

function loadUserData() {
    if (!sessionStorage.getItem('afpnet_sesion')) {
        window.location.href = '../afp/afp.php';
        return;
    }
    const ruc = sessionStorage.getItem('afpnet_ruc');
    const user = sessionStorage.getItem('afpnet_usuario');
    const nom = sessionStorage.getItem('afpnet_nombre');
    
    document.getElementById('w-name').textContent = nom;
    document.getElementById('u-name').textContent = user;
    document.getElementById('u-init').textContent = user.charAt(0).toUpperCase();
    document.getElementById('current-ruc').textContent = ruc;
}

function renderUsers(filterText = '', filterPerfil = 'todos') {
    const tbody = document.getElementById('user-table-body');
    const currentRuc = sessionStorage.getItem('afpnet_ruc') || '20123456789';
    
    // Intentar leer de localStorage, si no hay nada, usar BACKUP
    let rawData = localStorage.getItem('afpnet_db_usuarios');
    let listaTotal = rawData ? JSON.parse(rawData) : DATA_BACKUP;
    
    tbody.innerHTML = '';

    const filtrados = listaTotal.filter(u => {
        const mismoRuc = String(u.ruc) === String(currentRuc);
        const coincideT = (u.nombre || '').toLowerCase().includes(filterText.toLowerCase()) || 
                          (u.user || '').toLowerCase().includes(filterText.toLowerCase());
        const coincideP = (filterPerfil === 'todos' || u.perfil === filterPerfil);
        return mismoRuc && coincideT && coincideP;
    });

    if (filtrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No hay usuarios.</td></tr>`;
        return;
    }

    filtrados.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${u.user}</strong></td>
            <td>${u.nombre}</td>
            <td>${u.ruc}</td>
            <td><span class="badge ${u.perfil === 'Administrador' ? 'badge-admin' : 'badge-user'}">${u.perfil}</span></td>
            <td><span class="badge badge-pres">ACTIVO</span></td>
            <td>
                <button class="btn btn-blue btn-mini"><i class="fas fa-edit"></i></button>
                <button class="btn btn-pink btn-mini"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function initFilters() {
    const sIn = document.getElementById('search-input');
    const fPe = document.getElementById('filter-perfil');
    const bCl = document.getElementById('btn-clear');

    if(sIn) sIn.addEventListener('input', () => renderUsers(sIn.value, fPe.value));
    if(fPe) fPe.addEventListener('change', () => renderUsers(sIn.value, fPe.value));
    if(bCl) bCl.addEventListener('click', () => { sIn.value = ''; fPe.value = 'todos'; renderUsers(); });
}

function togSub(el) {
    const sub = el.nextElementSibling;
    const isOp = sub.classList.contains('open');
    document.querySelectorAll('.submenu').forEach(s => s.classList.remove('open'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('open'));
    if(!isOp) { sub.classList.add('open'); el.classList.add('open'); }
}

function initMenu() {
    const btn = document.getElementById('btn-tog');
    const sb = document.getElementById('sb');
    const mc = document.getElementById('mc');
    const sov = document.getElementById('sov');
    if(btn) {
        btn.addEventListener('click', () => {
            if(window.innerWidth <= 768) { sb.classList.toggle('mob'); sov.classList.toggle('vis'); }
            else { sb.classList.toggle('collapsed'); mc.classList.toggle('exp'); }
        });
    }
}

function openM(id) { document.getElementById(id).classList.add('vis'); }
function closeM(id) { document.getElementById(id).classList.remove('vis'); }

function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = '../afp/afp.php';
}