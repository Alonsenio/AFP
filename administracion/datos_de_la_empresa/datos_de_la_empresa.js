/**
 * ========================================
 * DATOS DE LA EMPRESA - JAVASCRIPT
 * ========================================
 */

(function() {
    'use strict';

    // ===== ELEMENTOS DEL DOM =====
    const form = document.getElementById('formDatosEmpresa');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnActivacion = document.getElementById('btnActivacion');
    const checkDobleFirma = document.getElementById('dobleFirma');

    // Selectores de ubigeo
    const selectDepartamento = document.getElementById('departamento');
    const selectProvincia = document.getElementById('provincia');
    const selectDistrito = document.getElementById('distrito');

    // ===== DATOS DE UBIGEO (simplificado) =====
    const ubigeoData = {
        'LIMA': {
            provincias: {
                'LIMA': ['SAN ISIDRO', 'MIRAFLORES', 'SAN BORJA', 'SURCO', 'LA MOLINA', 'LINCE', 'JESUS MARIA', 'MAGDALENA', 'SAN MIGUEL', 'PUEBLO LIBRE', 'BREÑA', 'RIMAC', 'CERCADO DE LIMA', 'ATE', 'SANTA ANITA', 'EL AGUSTINO', 'SAN JUAN DE LURIGANCHO', 'COMAS', 'LOS OLIVOS', 'SAN MARTIN DE PORRES', 'INDEPENDENCIA', 'VILLA EL SALVADOR', 'VILLA MARIA DEL TRIUNFO', 'SAN JUAN DE MIRAFLORES', 'CHORRILLOS', 'BARRANCO', 'SURQUILLO'],
                'HUARAL': ['HUARAL', 'CHANCAY', 'AUCALLAMA'],
                'CAÑETE': ['SAN VICENTE DE CAÑETE', 'IMPERIAL', 'MALA', 'ASIA']
            }
        },
        'AREQUIPA': {
            provincias: {
                'AREQUIPA': ['AREQUIPA', 'CAYMA', 'YANAHUARA', 'CERRO COLORADO', 'SACHACA', 'JOSE LUIS BUSTAMANTE Y RIVERO', 'PAUCARPATA', 'HUNTER', 'SOCABAYA', 'CHARACATO'],
                'CAMANA': ['CAMANA', 'SAMUEL PASTOR', 'OCOÑA']
            }
        },
        'CUSCO': {
            provincias: {
                'CUSCO': ['CUSCO', 'SAN SEBASTIAN', 'SAN JERONIMO', 'SANTIAGO', 'WANCHAQ'],
                'URUBAMBA': ['URUBAMBA', 'OLLANTAYTAMBO', 'MACHU PICCHU']
            }
        },
        'LA LIBERTAD': {
            provincias: {
                'TRUJILLO': ['TRUJILLO', 'VICTOR LARCO HERRERA', 'LA ESPERANZA', 'EL PORVENIR', 'FLORENCIA DE MORA', 'HUANCHACO', 'MOCHE', 'SALAVERRY'],
                'PACASMAYO': ['SAN PEDRO DE LLOC', 'PACASMAYO', 'GUADALUPE']
            }
        }
    };

    // ===== INICIALIZACIÓN =====
    function init() {
        cargarDatosSessionStorage();
        setupEventListeners();
        setupUbigeo();
        setupValidaciones();
    }

    // ===== CARGAR DATOS DESDE SESSION STORAGE =====
    function cargarDatosSessionStorage() {
        const ruc = sessionStorage.getItem('afpnet_ruc');
        const razon = sessionStorage.getItem('afpnet_razon');

        if (ruc) {
            const inputRuc = document.getElementById('ruc');
            if (inputRuc) inputRuc.value = ruc;
        }

        if (razon) {
            const inputRazon = document.getElementById('razonSocial');
            if (inputRazon) inputRazon.value = razon;
        }
    }

    // ===== SETUP EVENT LISTENERS =====
    function setupEventListeners() {
        // Formulario submit
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }

        // Botón Cancelar
        if (btnCancelar) {
            btnCancelar.addEventListener('click', handleCancelar);
        }

        // Botón Solicitar Activación
        if (btnActivacion) {
            btnActivacion.addEventListener('click', handleActivacion);
        }

        // Checkbox Doble Firma
        if (checkDobleFirma) {
            checkDobleFirma.addEventListener('change', handleDobleFirmaChange);
        }
    }

    // ===== SETUP UBIGEO =====
    function setupUbigeo() {
        if (selectDepartamento) {
            // Limpiar y poblar departamentos
            selectDepartamento.innerHTML = '';
            Object.keys(ubigeoData).forEach(dep => {
                const option = document.createElement('option');
                option.value = dep;
                option.textContent = dep;
                selectDepartamento.appendChild(option);
            });

            // Evento cambio de departamento
            selectDepartamento.addEventListener('change', function() {
                actualizarProvincias(this.value);
            });

            // Cargar provincias iniciales
            actualizarProvincias(selectDepartamento.value);
        }

        if (selectProvincia) {
            selectProvincia.addEventListener('change', function() {
                actualizarDistritos(selectDepartamento.value, this.value);
            });
        }
    }

    function actualizarProvincias(departamento) {
        if (!selectProvincia) return;

        selectProvincia.innerHTML = '';
        
        if (ubigeoData[departamento]) {
            const provincias = Object.keys(ubigeoData[departamento].provincias);
            provincias.forEach(prov => {
                const option = document.createElement('option');
                option.value = prov;
                option.textContent = prov;
                selectProvincia.appendChild(option);
            });

            // Actualizar distritos con la primera provincia
            if (provincias.length > 0) {
                actualizarDistritos(departamento, provincias[0]);
            }
        }
    }

    function actualizarDistritos(departamento, provincia) {
        if (!selectDistrito) return;

        selectDistrito.innerHTML = '';

        if (ubigeoData[departamento] && ubigeoData[departamento].provincias[provincia]) {
            const distritos = ubigeoData[departamento].provincias[provincia];
            distritos.forEach(dist => {
                const option = document.createElement('option');
                option.value = dist;
                option.textContent = dist;
                selectDistrito.appendChild(option);
            });
        }
    }

    // ===== SETUP VALIDACIONES =====
    function setupValidaciones() {
        // Validación de correos
        const correosInputs = [
            { correo: 'correoRep', confirmar: 'confirmarCorreoRep' },
            { correo: 'correoCont', confirmar: 'confirmarCorreoCont' }
        ];

        correosInputs.forEach(pair => {
            const correoInput = document.getElementById(pair.correo);
            const confirmarInput = document.getElementById(pair.confirmar);

            if (confirmarInput) {
                confirmarInput.addEventListener('blur', function() {
                    if (correoInput && correoInput.value !== this.value) {
                        this.style.borderColor = '#e74c3c';
                        mostrarError(this, 'Los correos electrónicos no coinciden');
                    } else {
                        this.style.borderColor = '';
                        ocultarError(this);
                    }
                });
            }
        });

        // Validación de números (solo dígitos)
        const inputsNumericos = ['celularEmpresa', 'celularRep', 'celularCont', 'nroDocRep', 'nroDocCont', 'numero', 'telefonoFijoEmpresa', 'telefonoFijoRep', 'telefonoFijoCont'];
        
        inputsNumericos.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/[^0-9]/g, '');
                });
            }
        });

        // Validación de textos (solo letras y espacios)
        const inputsTexto = ['apPaternoRep', 'apMaternoRep', 'primerNombreRep', 'segundoNombreRep', 'apPaternoCont', 'apMaternoCont', 'primerNombreCont', 'segundoNombreCont'];
        
        inputsTexto.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').toUpperCase();
                });
            }
        });
    }

    // ===== HANDLERS =====
    function handleSubmit(e) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        // Recopilar datos
        const formData = new FormData(form);
        const datos = {};
        
        for (let [key, value] of formData.entries()) {
            datos[key] = value;
        }

        console.log('Datos a guardar:', datos);

        // Simular envío
        mostrarMensaje('Guardando datos...', 'info');

        setTimeout(() => {
            mostrarMensaje('Los datos de la empresa han sido actualizados correctamente.', 'success');
        }, 1500);
    }

    function handleCancelar() {
        if (confirm('¿Está seguro de cancelar? Los cambios no guardados se perderán.')) {
            window.location.href = '/AFP/inicio/inicio.php';
        }
    }

    function handleActivacion() {
        if (!checkDobleFirma || !checkDobleFirma.checked) {
            mostrarMensaje('Debe marcar la opción "Pago en Línea con Doble Firma" para solicitar la activación.', 'warning');
            return;
        }

        if (confirm('¿Desea solicitar la activación del pago en línea con doble firma?')) {
            mostrarMensaje('Solicitud de activación enviada correctamente. Recibirá una confirmación por correo electrónico.', 'success');
        }
    }

    function handleDobleFirmaChange() {
        if (this.checked) {
            btnActivacion.style.opacity = '1';
            btnActivacion.style.pointerEvents = 'auto';
        } else {
            btnActivacion.style.opacity = '0.6';
            btnActivacion.style.pointerEvents = 'none';
        }
    }

    // ===== VALIDACIÓN DEL FORMULARIO =====
    function validarFormulario() {
        const camposRequeridos = [
            { id: 'celularEmpresa', nombre: 'Celular de la empresa' },
            { id: 'via', nombre: 'Vía' },
            { id: 'departamento', nombre: 'Departamento' },
            { id: 'provincia', nombre: 'Provincia' },
            { id: 'distrito', nombre: 'Distrito' },
            { id: 'apPaternoCont', nombre: 'Apellido Paterno del Contacto' },
            { id: 'apMaternoCont', nombre: 'Apellido Materno del Contacto' },
            { id: 'primerNombreCont', nombre: 'Primer Nombre del Contacto' },
            { id: 'nroDocCont', nombre: 'Nro. Documento del Contacto' },
            { id: 'correoCont', nombre: 'Correo del Contacto' },
            { id: 'celularCont', nombre: 'Celular del Contacto' },
            { id: 'cargoCont', nombre: 'Cargo del Contacto' }
        ];

        let esValido = true;
        let primerCampoInvalido = null;

        camposRequeridos.forEach(campo => {
            const input = document.getElementById(campo.id);
            if (input && !input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                esValido = false;
                if (!primerCampoInvalido) {
                    primerCampoInvalido = input;
                }
            } else if (input) {
                input.style.borderColor = '';
            }
        });

        // Validar coincidencia de correos
        const correoCont = document.getElementById('correoCont');
        const confirmarCorreoCont = document.getElementById('confirmarCorreoCont');
        
        if (correoCont && confirmarCorreoCont && correoCont.value !== confirmarCorreoCont.value) {
            confirmarCorreoCont.style.borderColor = '#e74c3c';
            esValido = false;
            if (!primerCampoInvalido) {
                primerCampoInvalido = confirmarCorreoCont;
            }
        }

        if (!esValido) {
            mostrarMensaje('Por favor, complete todos los campos obligatorios correctamente.', 'error');
            if (primerCampoInvalido) {
                primerCampoInvalido.focus();
                primerCampoInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return esValido;
    }

    // ===== UTILIDADES =====
    function mostrarMensaje(mensaje, tipo) {
        // Remover mensaje anterior si existe
        const mensajeAnterior = document.querySelector('.mensaje-flotante');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }

        const colores = {
            success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724', icon: 'fa-check-circle' },
            error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24', icon: 'fa-exclamation-circle' },
            warning: { bg: '#fff3cd', border: '#ffeeba', text: '#856404', icon: 'fa-exclamation-triangle' },
            info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460', icon: 'fa-info-circle' }
        };

        const config = colores[tipo] || colores.info;

        const div = document.createElement('div');
        div.className = 'mensaje-flotante';
        div.innerHTML = `<i class="fas ${config.icon}"></i> ${mensaje}`;
        div.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            padding: 16px 24px;
            background: ${config.bg};
            border: 1px solid ${config.border};
            color: ${config.text};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;

        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(div);

        // Auto-remover después de 4 segundos
        setTimeout(() => {
            div.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => div.remove(), 300);
        }, 4000);
    }

    function mostrarError(input, mensaje) {
        ocultarError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error-msg';
        errorDiv.textContent = mensaje;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 11px;
            margin-top: 4px;
        `;
        
        input.parentNode.appendChild(errorDiv);
    }

    function ocultarError(input) {
        const errorExistente = input.parentNode.querySelector('.input-error-msg');
        if (errorExistente) {
            errorExistente.remove();
        }
    }

    // ===== INICIAR CUANDO EL DOM ESTÉ LISTO =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();