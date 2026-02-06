// Por Devengue - Resumen de Situación de Obligaciones de Pago
// JavaScript para manejo de eventos y validaciones

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del formulario
    const formBusqueda = document.getElementById('formBusqueda');
    const btnGuia = document.getElementById('btn-guia');
    const btnAyuda = document.getElementById('btn-ayuda');
    const btnBuscar = document.getElementById('btn-buscar');
    
    // Campos del formulario
    const periodoInicial = document.getElementById('periodo-inicial');
    const periodoFinal = document.getElementById('periodo-final');
    
    // Toggle groups
    const togglePresuntas = document.getElementById('toggle-presuntas');
    const toggleDeudas = document.getElementById('toggle-deudas');
    
    // Variables para almacenar selecciones
    let presuntasValue = 'sin';
    let deudasValue = 'sin';

    // Función para manejar los toggle buttons
    function setupToggleGroup(toggleGroup, callback) {
        const buttons = toggleGroup.querySelectorAll('.toggle-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover todas las clases active
                buttons.forEach(btn => {
                    btn.classList.remove('active-si', 'active-no', 'active-sin');
                    btn.classList.add('inactive');
                });
                
                // Agregar clase active al botón clickeado
                const value = this.getAttribute('data-value');
                this.classList.remove('inactive');
                this.classList.add('active-' + value);
                
                // Ejecutar callback con el valor seleccionado
                if (callback) {
                    callback(value);
                }
            });
        });
    }

    // Configurar toggle buttons
    setupToggleGroup(togglePresuntas, function(value) {
        presuntasValue = value;
        console.log('Presuntas:', value);
    });

    setupToggleGroup(toggleDeudas, function(value) {
        deudasValue = value;
        console.log('Ciertas con Deudas:', value);
    });

    // Función para validar el formulario
    function validarFormulario() {
        // Validar que se haya seleccionado periodo inicial
        if (!periodoInicial.value) {
            alert('Debe seleccionar el periodo inicial');
            periodoInicial.focus();
            return false;
        }

        // Validar que se haya seleccionado periodo final
        if (!periodoFinal.value) {
            alert('Debe seleccionar el periodo final');
            periodoFinal.focus();
            return false;
        }

        // Validar que el periodo inicial no sea mayor al final
        if (parseInt(periodoInicial.value) > parseInt(periodoFinal.value)) {
            alert('El periodo inicial no puede ser mayor al periodo final');
            periodoInicial.focus();
            return false;
        }

        return true;
    }

    // Función para obtener los datos del formulario
    function obtenerDatosFormulario() {
        return {
            periodoInicial: periodoInicial.value,
            periodoFinal: periodoFinal.value,
            presuntas: presuntasValue,
            ciertasConDeudas: deudasValue
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
        fetch('buscar_devengue.php', {
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
            
            // Crear mensaje con los datos de búsqueda
            const mensaje = `Búsqueda realizada con éxito\n\n` +
                          `Periodo: ${getPeriodoNombre(datos.periodoInicial)} - ${getPeriodoNombre(datos.periodoFinal)}\n` +
                          `Presuntas: ${datos.presuntas.toUpperCase()}\n` +
                          `Ciertas con Deudas: ${datos.ciertasConDeudas.toUpperCase()}`;
            
            alert(mensaje);
        }, 1500);
    }

    // Función auxiliar para obtener nombre del periodo
    function getPeriodoNombre(periodo) {
        const select = periodoInicial;
        const option = select.querySelector(`option[value="${periodo}"]`);
        return option ? option.textContent : periodo;
    }

    // Función para mostrar resultados
    function mostrarResultados(data) {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.style.display = 'block';
        // Aquí implementarías la lógica para mostrar los resultados
    }

    // Función para mostrar guía de uso
    function mostrarGuia() {
        alert('GUÍA DE USO\n\n' +
              'RESUMEN DE SITUACIÓN DE OBLIGACIONES DE PAGO\n\n' +
              '1. Seleccione el periodo de devengue (inicial y final)\n' +
              '2. Configure los filtros de Presuntas:\n' +
              '   - SI: Mostrar solo obligaciones presuntas\n' +
              '   - NO: Excluir obligaciones presuntas\n' +
              '   - SIN VALOR: Mostrar todas\n' +
              '3. Configure los filtros de Ciertas con Deudas:\n' +
              '   - SI: Mostrar solo con deudas\n' +
              '   - NO: Excluir con deudas\n' +
              '   - SIN VALOR: Mostrar todas\n' +
              '4. Haga clic en BUSCAR para ver los resultados');
    }

    // Función para mostrar ayuda
    function mostrarAyuda() {
        alert('AYUDA\n\n' +
              '¿Necesita ayuda?\n\n' +
              'Contacte con:\n' +
              '- Soporte técnico: soporte@afpnet.com\n' +
              '- Teléfono: (01) 123-4567\n' +
              '- Horario: Lunes a Viernes 8:00 AM - 6:00 PM\n\n' +
              'DEFINICIONES:\n' +
              '- Presuntas: Obligaciones pendientes de confirmación\n' +
              '- Ciertas con Deudas: Obligaciones confirmadas con saldo pendiente');
    }

    // Event Listeners
    btnBuscar.addEventListener('click', realizarBusqueda);
    btnGuia.addEventListener('click', mostrarGuia);
    btnAyuda.addEventListener('click', mostrarAyuda);

    // Permitir enter para buscar
    formBusqueda.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            realizarBusqueda();
        }
    });

    // Sincronizar periodo final cuando cambia el inicial
    periodoInicial.addEventListener('change', function() {
        if (!periodoFinal.value || parseInt(periodoFinal.value) < parseInt(this.value)) {
            periodoFinal.value = this.value;
        }
    });

    // Log inicial
    console.log('Módulo Por Devengue cargado correctamente');
});

// Función para limpiar formulario
function limpiarFormulario() {
    document.getElementById('formBusqueda').reset();
    document.getElementById('resultados').style.display = 'none';
    
    // Resetear toggle buttons a SIN VALOR
    const toggleGroups = document.querySelectorAll('.toggle-group');
    toggleGroups.forEach(group => {
        const buttons = group.querySelectorAll('.toggle-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active-si', 'active-no', 'active-sin');
            btn.classList.add('inactive');
        });
        const sinValorBtn = group.querySelector('[data-value="sin"]');
        if (sinValorBtn) {
            sinValorBtn.classList.remove('inactive');
            sinValorBtn.classList.add('active-sin');
        }
    });
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