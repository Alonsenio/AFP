// Por Afiliados - Consulta y Actualización de Obligación de Pago
// JavaScript para manejo de eventos y validaciones

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del formulario
    const formBusqueda = document.getElementById('formBusqueda');
    const btnGuia = document.getElementById('btn-guia');
    const btnAyuda = document.getElementById('btn-ayuda');
    const btnBuscar = document.getElementById('btn-buscar');
    
    // Campos del formulario
    const cuspp = document.getElementById('cuspp');
    const radioDni = document.getElementById('radio-dni');
    const selectDni = document.getElementById('select-dni');
    const ruc = document.getElementById('ruc');
    const nombres = document.getElementById('nombres');
    
    // Manejar el cambio entre DNI y RUC
    radioDni.addEventListener('change', function() {
        if (this.checked) {
            selectDni.disabled = false;
            ruc.disabled = true;
            ruc.value = '';
        }
    });

    // Función para validar el formulario
    function validarFormulario() {
        // Al menos uno de los campos debe estar lleno
        const hayCuspp = cuspp.value.trim() !== '';
        const hayDni = selectDni.value.trim() !== '';
        const hayRuc = ruc.value.trim() !== '';
        const hayNombres = nombres.value.trim() !== '';
        
        if (!hayCuspp && !hayDni && !hayRuc && !hayNombres) {
            alert('Debe ingresar al menos un criterio de búsqueda');
            return false;
        }

        // Validar CUSPP (12 dígitos)
        if (hayCuspp && cuspp.value.length !== 12) {
            alert('El CUSPP debe tener 12 dígitos');
            cuspp.focus();
            return false;
        }

        // Validar RUC (11 dígitos)
        if (hayRuc && ruc.value.length !== 11) {
            alert('El RUC debe tener 11 dígitos');
            ruc.focus();
            return false;
        }

        return true;
    }

    // Función para obtener los datos del formulario
    function obtenerDatosFormulario() {
        return {
            cuspp: cuspp.value.trim(),
            tipoDoc: radioDni.checked ? selectDni.value : 'ruc',
            numeroDoc: radioDni.checked ? '' : ruc.value.trim(),
            nombres: nombres.value.trim()
        };
    }

    // Función para realizar la búsqueda
    function realizarBusqueda() {
        if (!validarFormulario()) {
            return;
        }

        const datos = obtenerDatosFormulario();
        console.log('Datos de búsqueda:', datos);

        // Mostrar loading en el botón
        btnBuscar.disabled = true;
        btnBuscar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> BUSCANDO...';

        // Aquí harías la petición AJAX a tu backend
        // Ejemplo con fetch:
        /*
        fetch('buscar_afiliado.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resultados:', data);
            mostrarResultados(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al realizar la búsqueda');
        })
        .finally(() => {
            btnBuscar.disabled = false;
            btnBuscar.innerHTML = '<i class="fas fa-search"></i> BUSCAR';
        });
        */

        // Simulación de búsqueda exitosa
        setTimeout(() => {
            btnBuscar.disabled = false;
            btnBuscar.innerHTML = '<i class="fas fa-search"></i> BUSCAR';
            alert('Búsqueda realizada con éxito\n\nDatos enviados:\n' + JSON.stringify(datos, null, 2));
        }, 1500);
    }

    // Función para mostrar resultados
    function mostrarResultados(data) {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.style.display = 'block';
        // Aquí implementarías la lógica para mostrar los resultados
    }

    // Función para mostrar guía de uso
    function mostrarGuia() {
        alert('GUÍA DE USO\n\nPara buscar un afiliado puede usar:\n\n1. CUSPP: Código Único de Seguridad Social (12 dígitos)\n2. Documento de Identidad: DNI, CE o Pasaporte\n3. RUC: Registro Único de Contribuyentes (11 dígitos)\n4. Nombres y Apellidos: Nombre completo del afiliado\n\nPuede combinar varios criterios para refinar su búsqueda.');
    }

    // Función para mostrar ayuda
    function mostrarAyuda() {
        alert('AYUDA\n\n¿Necesita ayuda?\n\nContacte con:\n- Soporte técnico: soporte@afpnet.com\n- Teléfono: (01) 123-4567\n- Horario: Lunes a Viernes 8:00 AM - 6:00 PM');
    }

    // Event Listeners
    btnBuscar.addEventListener('click', realizarBusqueda);
    btnGuia.addEventListener('click', mostrarGuia);
    btnAyuda.addEventListener('click', mostrarAyuda);

    // Permitir solo números en CUSPP
    cuspp.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 12);
    });

    // Permitir solo números en RUC
    ruc.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 11);
    });

    // Permitir enter para buscar
    formBusqueda.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            realizarBusqueda();
        }
    });

    // Log inicial
    console.log('Módulo Por Afiliados cargado correctamente');
});

// Función para limpiar formulario
function limpiarFormulario() {
    document.getElementById('formBusqueda').reset();
    document.getElementById('resultados').style.display = 'none';
}

// Toggle del sidebar (si es necesario)
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const main = document.getElementById('mc');
    const sov = document.getElementById('sov');
    
    sidebar.classList.toggle('mob');
    sov.classList.toggle('vis');
}

// Cerrar sidebar al hacer click en overlay
document.getElementById('sov')?.addEventListener('click', function() {
    toggleSidebar();
});