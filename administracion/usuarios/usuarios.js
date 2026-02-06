(function() {
    'use strict';

    // ===== VARIABLES GLOBALES =====
    let usuariosDB = [];
    let usuariosFiltrados = [];
    const rucActual = sessionStorage.getItem('afpnet_ruc');

    // ===== ELEMENTOS =====
    const btnBuscar = document.getElementById('btn-buscar');
    const btnAgregar = document.getElementById('btn-agregar');
    const btnGuia = document.getElementById('btn-guia');
    const btnDesactivar = document.getElementById('btn-desactivar');
    const btnSaveUser = document.getElementById('btn-save-user');
    const tableBody = document.getElementById('user-table-body');

    // Inputs de búsqueda
    const searchUser = document.getElementById('search-user');
    const searchApep = document.getElementById('search-apep');
    const searchApem = document.getElementById('search-apem');

    // ===== INICIALIZACIÓN =====
    function init() {
        cargarUsuarios();
        mostrarUsuarios(usuariosDB);
        setupEventListeners();
    }

    // ===== CARGAR USUARIOS DE LOCALSTORAGE =====
    function cargarUsuarios() {
        const dbString = localStorage.getItem('afpnet_db_usuarios');
        
        if (dbString) {
            const todosUsuarios = JSON.parse(dbString);
            // Filtrar solo usuarios del RUC actual
            usuariosDB = todosUsuarios.filter(u => u.ruc === rucActual);
        } else {
            usuariosDB = [];
        }
        
        usuariosFiltrados = [...usuariosDB];
    }

    // ===== MOSTRAR USUARIOS EN TABLA =====
    function mostrarUsuarios(usuarios) {
        if (!tableBody) return;

        tableBody.innerHTML = '';

        if (usuarios.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #999;">
                        <i class="fas fa-inbox" style="font-size: 48px; display: block; margin-bottom: 12px; opacity: 0.3;"></i>
                        No se encontraron usuarios
                    </td>
                </tr>
            `;
            return;
        }

        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            
            // Extraer apellidos del nombre completo
            const nombreParts = usuario.nombre.split(' ');
            const apPaterno = nombreParts[0] || '';
            const apMaterno = nombreParts[1] || '';
            
            // Badge de perfil
            let badgeClass = 'badge-user';
            if (usuario.perfil === 'Administrador') badgeClass = 'badge-admin';
            else if (usuario.perfil === 'Operador') badgeClass = 'badge-user';

            // Estado (por defecto activo)
            const estado = usuario.estado || 'Activo';
            const badgeEstado = estado === 'Activo' ? 'badge-pres' : 'badge-off';

            tr.innerHTML = `
                <td><strong>${usuario.user}</strong></td>
                <td>${usuario.nombre}</td>
                <td>${usuario.ruc}</td>
                <td><span class="badge ${badgeClass}">${usuario.perfil}</span></td>
                <td><span class="badge ${badgeEstado}">${estado}</span></td>
                <td>
                    <button class="btn btn-mini btn-blue" onclick="editarUsuario('${usuario.user}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    ${estado === 'Activo' ? 
                        `<button class="btn btn-mini btn-pink" onclick="desactivarUsuario('${usuario.user}')">
                            <i class="fas fa-ban"></i> Desactivar
                        </button>` : 
                        `<button class="btn btn-mini btn-green" onclick="activarUsuario('${usuario.user}')">
                            <i class="fas fa-check"></i> Activar
                        </button>`
                    }
                </td>
            `;

            tableBody.appendChild(tr);
        });
    }

    // ===== EVENT LISTENERS =====
    function setupEventListeners() {
        if (btnBuscar) {
            btnBuscar.addEventListener('click', buscarUsuarios);
        }

        if (btnAgregar) {
            btnAgregar.addEventListener('click', () => {
                window.location.href = './nuevo-usuario.php';
            });
        }

        if (btnGuia) {
            btnGuia.addEventListener('click', () => openM('mo-guia'));
        }

        if (btnDesactivar) {
            btnDesactivar.addEventListener('click', desactivarSeleccionados);
        }

        if (btnSaveUser) {
            btnSaveUser.addEventListener('click', guardarNuevoUsuario);
        }

        // Enter para buscar
        [searchUser, searchApep, searchApem].forEach(input => {
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') buscarUsuarios();
                });
            }
        });
    }

    // ===== BUSCAR USUARIOS =====
    function buscarUsuarios() {
        const user = searchUser?.value.toLowerCase().trim() || '';
        const apep = searchApep?.value.toLowerCase().trim() || '';
        const apem = searchApem?.value.toLowerCase().trim() || '';

        usuariosFiltrados = usuariosDB.filter(u => {
            const nombreParts = u.nombre.toLowerCase().split(' ');
            const matchUser = !user || u.user.toLowerCase().includes(user);
            const matchApep = !apep || nombreParts[0]?.includes(apep);
            const matchApem = !apem || nombreParts[1]?.includes(apem);

            return matchUser && matchApep && matchApem;
        });

        mostrarUsuarios(usuariosFiltrados);

        if (usuariosFiltrados.length > 0) {
            mostrarMensaje(`Se encontraron ${usuariosFiltrados.length} usuario(s)`, 'info');
        } else {
            mostrarMensaje('No se encontraron usuarios con los criterios especificados', 'warning');
        }
    }

    // ===== GUARDAR NUEVO USUARIO =====
    function guardarNuevoUsuario() {
        const inUser = document.getElementById('in-user');
        const inName = document.getElementById('in-name');
        const inPer = document.getElementById('in-per');

        const user = inUser?.value.trim() || '';
        const name = inName?.value.trim() || '';
        const perfil = inPer?.value || 'Operador';

        // Validaciones
        if (!user || !name) {
            mostrarMensaje('Complete todos los campos', 'error');
            return;
        }

        if (user.length < 4) {
            mostrarMensaje('El usuario debe tener al menos 4 caracteres', 'error');
            return;
        }

        // Verificar si el usuario ya existe
        const existe = usuariosDB.find(u => u.user.toLowerCase() === user.toLowerCase());
        if (existe) {
            mostrarMensaje('El usuario ya existe', 'error');
            return;
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
            ruc: rucActual,
            user: user,
            pass: '123456', // Contraseña por defecto
            nombre: name,
            perfil: perfil,
            estado: 'Activo'
        };

        // Agregar a la BD local
        usuariosDB.push(nuevoUsuario);

        // Actualizar localStorage con TODOS los usuarios
        const todosUsuarios = JSON.parse(localStorage.getItem('afpnet_db_usuarios') || '[]');
        todosUsuarios.push(nuevoUsuario);
        localStorage.setItem('afpnet_db_usuarios', JSON.stringify(todosUsuarios));

        // Actualizar vista
        usuariosFiltrados = [...usuariosDB];
        mostrarUsuarios(usuariosFiltrados);

        // Limpiar formulario y cerrar modal
        if (inUser) inUser.value = '';
        if (inName) inName.value = '';
        closeM('mo-user');

        mostrarMensaje('Usuario creado correctamente. Contraseña por defecto: 123456', 'success');
    }

    // ===== DESACTIVAR USUARIOS SELECCIONADOS =====
    function desactivarSeleccionados() {
        // Por ahora solo mostrar mensaje
        mostrarMensaje('Seleccione usuarios en la tabla para desactivar', 'info');
    }

    // ===== FUNCIONES GLOBALES PARA ONCLICK =====
    window.editarUsuario = function(username) {
        mostrarMensaje(`Función de edición para usuario: ${username}`, 'info');
    };

    window.desactivarUsuario = function(username) {
        if (!confirm(`¿Está seguro de desactivar al usuario ${username}?`)) return;

        // Buscar y actualizar estado
        const usuario = usuariosDB.find(u => u.user === username);
        if (usuario) {
            usuario.estado = 'Inactivo';

            // Actualizar en localStorage
            const todosUsuarios = JSON.parse(localStorage.getItem('afpnet_db_usuarios') || '[]');
            const idx = todosUsuarios.findIndex(u => u.user === username && u.ruc === rucActual);
            if (idx !== -1) {
                todosUsuarios[idx].estado = 'Inactivo';
                localStorage.setItem('afpnet_db_usuarios', JSON.stringify(todosUsuarios));
            }

            mostrarUsuarios(usuariosFiltrados);
            mostrarMensaje(`Usuario ${username} desactivado`, 'success');
        }
    };

    window.activarUsuario = function(username) {
        // Buscar y actualizar estado
        const usuario = usuariosDB.find(u => u.user === username);
        if (usuario) {
            usuario.estado = 'Activo';

            // Actualizar en localStorage
            const todosUsuarios = JSON.parse(localStorage.getItem('afpnet_db_usuarios') || '[]');
            const idx = todosUsuarios.findIndex(u => u.user === username && u.ruc === rucActual);
            if (idx !== -1) {
                todosUsuarios[idx].estado = 'Activo';
                localStorage.setItem('afpnet_db_usuarios', JSON.stringify(todosUsuarios));
            }

            mostrarUsuarios(usuariosFiltrados);
            mostrarMensaje(`Usuario ${username} activado`, 'success');
        }
    };

    // ===== CONTROL DE MODALES =====
    window.openM = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('vis');
    };

    window.closeM = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('vis');
    };

    // ===== MENSAJES TOAST =====
    function mostrarMensaje(texto, tipo) {
        const anterior = document.querySelector('.toast-mensaje');
        if (anterior) anterior.remove();

        const colores = {
            success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724', icon: '✓' },
            error: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24', icon: '✕' },
            warning: { bg: '#fff3cd', border: '#ffeeba', color: '#856404', icon: '⚠' },
            info: { bg: '#d1ecf1', border: '#bee5eb', color: '#0c5460', icon: 'ℹ' }
        };

        const config = colores[tipo] || colores.info;

        const toast = document.createElement('div');
        toast.className = 'toast-mensaje';
        toast.innerHTML = `<span style="font-size:16px;margin-right:8px;">${config.icon}</span> ${texto}`;
        toast.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            padding: 14px 20px;
            background: ${config.bg};
            border: 1px solid ${config.border};
            color: ${config.color};
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            display: flex;
            align-items: center;
            font-size: 14px;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ===== INIT =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();