(function() {
    'use strict';

    // ===== ELEMENTOS =====
    const form = document.getElementById('formNuevoUsuario');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnGrabar = document.getElementById('btnGrabar');

    // Inputs del formulario
    const primerNombre = document.getElementById('primerNombre');
    const segundoNombre = document.getElementById('segundoNombre');
    const apellidoPaterno = document.getElementById('apellidoPaterno');
    const apellidoMaterno = document.getElementById('apellidoMaterno');
    const tipoDoc = document.getElementById('tipoDoc');
    const area = document.getElementById('area');
    const puesto = document.getElementById('puesto');
    const telefonoFijo = document.getElementById('telefonoFijo');
    const celular = document.getElementById('celular');
    const correo = document.getElementById('correo');
    const confirmarCorreo = document.getElementById('confirmarCorreo');
    const verDetalle = document.getElementById('verDetalle');
    const activo = document.getElementById('activo');

    // ===== INICIALIZACIÓN =====
    function init() {
        setupEventListeners();
        setupValidaciones();
    }

    // ===== EVENT LISTENERS =====
    function setupEventListeners() {
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }

        if (btnCancelar) {
            btnCancelar.addEventListener('click', handleCancelar);
        }

        // Validación en tiempo real de correos
        if (confirmarCorreo && correo) {
            confirmarCorreo.addEventListener('blur', validarCorreos);
            confirmarCorreo.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validarCorreos();
                }
            });
        }
    }

    // ===== VALIDACIONES =====
    function setupValidaciones() {
        // Solo letras en nombres y apellidos
        const camposTexto = [primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno];
        camposTexto.forEach(input => {
            if (input) {
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/[^a-záéíóúñA-ZÁÉÍÓÚÑ\s]/g, '').toUpperCase();
                });
            }
        });

        // Solo números en celular
        if (celular) {
            celular.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
        }

        // Validar email
        [correo, confirmarCorreo].forEach(input => {
            if (input) {
                input.addEventListener('blur', function() {
                    if (this.value && !validarEmail(this.value)) {
                        this.classList.add('error');
                        mostrarMensaje('Ingrese un correo electrónico válido', 'error');
                    } else {
                        this.classList.remove('error');
                    }
                });
            }
        });
    }

    // ===== VALIDAR CORREOS COINCIDAN =====
    function validarCorreos() {
        if (!correo || !confirmarCorreo) return true;

        if (confirmarCorreo.value && correo.value !== confirmarCorreo.value) {
            confirmarCorreo.classList.add('error');
            return false;
        } else {
            confirmarCorreo.classList.remove('error');
            return true;
        }
    }

    // ===== VALIDAR EMAIL =====
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ===== VALIDAR FORMULARIO =====
    function validarFormulario() {
        let valido = true;
        let primerError = null;

        // Campos obligatorios
        const camposRequeridos = [
            { campo: primerNombre, nombre: 'Primer Nombre' },
            { campo: apellidoPaterno, nombre: 'Apellido Paterno' },
            { campo: apellidoMaterno, nombre: 'Apellido Materno' },
            { campo: tipoDoc, nombre: 'Tipo de Documento' },
            { campo: correo, nombre: 'Correo Electrónico' },
            { campo: confirmarCorreo, nombre: 'Confirmar Correo' },
            { campo: telefonoFijo, nombre: 'Teléfono Fijo' },
            { campo: celular, nombre: 'Celular' }
        ];

        // Validar campos vacíos
        camposRequeridos.forEach(item => {
            if (item.campo && !item.campo.value.trim()) {
                item.campo.classList.add('error');
                valido = false;
                if (!primerError) primerError = item.campo;
            } else if (item.campo) {
                item.campo.classList.remove('error');
            }
        });

        // Validar formato de correo
        if (correo && correo.value && !validarEmail(correo.value)) {
            correo.classList.add('error');
            valido = false;
            if (!primerError) primerError = correo;
        }

        // Validar que correos coincidan
        if (!validarCorreos()) {
            valido = false;
            if (!primerError) primerError = confirmarCorreo;
        }

        // Validar celular (9 dígitos)
        if (celular && celular.value && celular.value.length !== 9) {
            celular.classList.add('error');
            valido = false;
            mostrarMensaje('El celular debe tener 9 dígitos', 'error');
            if (!primerError) primerError = celular;
        }

        if (!valido) {
            mostrarMensaje('Complete todos los campos obligatorios correctamente', 'error');
            if (primerError) {
                primerError.focus();
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return valido;
    }

    // ===== MANEJAR SUBMIT =====
    function handleSubmit(e) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        // Construir nombre completo
        const nombreCompleto = [
            primerNombre.value,
            segundoNombre.value,
            apellidoPaterno.value,
            apellidoMaterno.value
        ].filter(Boolean).join(' ').trim();

        // Generar username automático (primera letra nombre + apellido paterno)
        const username = (primerNombre.value.charAt(0) + apellidoPaterno.value).toLowerCase().replace(/\s/g, '');

        // Obtener RUC actual
        const rucActual = sessionStorage.getItem('afpnet_ruc');

        // Crear objeto de usuario
        const nuevoUsuario = {
            ruc: rucActual,
            user: username,
            pass: '123456', // Contraseña por defecto
            nombre: nombreCompleto,
            perfil: 'Operador', // Por defecto operador
            estado: activo.checked ? 'Activo' : 'Inactivo',
            datosAdicionales: {
                primerNombre: primerNombre.value,
                segundoNombre: segundoNombre.value || '',
                apellidoPaterno: apellidoPaterno.value,
                apellidoMaterno: apellidoMaterno.value,
                tipoDoc: tipoDoc.value,
                area: area.value || '',
                puesto: puesto.value || '',
                telefonoFijo: telefonoFijo.value,
                celular: celular.value,
                correo: correo.value,
                verDetalle: verDetalle.checked
            }
        };

        // Guardar en localStorage
        const todosUsuarios = JSON.parse(localStorage.getItem('afpnet_db_usuarios') || '[]');
        
        // Verificar si el usuario ya existe
        const existe = todosUsuarios.find(u => u.user === username && u.ruc === rucActual);
        if (existe) {
            mostrarMensaje('Ya existe un usuario con ese nombre en el sistema', 'error');
            return;
        }

        todosUsuarios.push(nuevoUsuario);
        localStorage.setItem('afpnet_db_usuarios', JSON.stringify(todosUsuarios));

        // Deshabilitar botón
        btnGrabar.disabled = true;
        btnGrabar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GUARDANDO...';

        // Simular guardado
        setTimeout(() => {
            mostrarMensaje('Usuario creado exitosamente. Usuario: ' + username + ' | Contraseña: 123456', 'success');
            
            setTimeout(() => {
                window.location.href = './usuarios.php';
            }, 2000);
        }, 1000);
    }

    // ===== MANEJAR CANCELAR =====
    function handleCancelar() {
        if (confirm('¿Está seguro de cancelar? Los datos ingresados se perderán.')) {
            window.location.href = './usuarios.php';
        }
    }

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
            max-width: 450px;
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
        }, tipo === 'success' ? 5000 : 4000);
    }

    // ===== INIT =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();