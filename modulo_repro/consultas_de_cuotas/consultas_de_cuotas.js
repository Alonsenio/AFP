// Módulo REPRO - Consulta de Cuotas
// JavaScript para manejo de eventos y validaciones

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del formulario
    const formBusqueda = document.getElementById('formBusqueda');
    const btnBuscar = document.getElementById('btnBuscar');
    const btnExportar = document.getElementById('btnExportar');
    
    // Campos del formulario
    const afp = document.getElementById('afp');
    const mesInicial = document.getElementById('mesInicial');
    const mesFinal = document.getElementById('mesFinal');
    const fechaInicial = document.getElementById('fechaInicial');
    const fechaFinal = document.getElementById('fechaFinal');
    const banco = document.getElementById('banco');
    const estado = document.getElementById('estado');
    const ticket = document.getElementById('ticket');
    const repro = document.getElementById('repro');

    // Función para obtener los datos del formulario
    function obtenerDatosFormulario() {
        return {
            afp: afp.value,
            mesInicial: mesInicial.value,
            mesFinal: mesFinal.value,
            fechaInicial: fechaInicial.value,
            fechaFinal: fechaFinal.value,
            banco: banco.value,
            estado: estado.value,
            ticket: ticket.value,
            repro: repro.value
        };
    }

    // Función para validar fechas
    function validarFechas() {
        if (fechaInicial.value && fechaFinal.value) {
            const inicial = new Date(fechaInicial.value);
            const final = new Date(fechaFinal.value);
            
            if (inicial > final) {
                alert('La fecha inicial no puede ser mayor que la fecha final');
                return false;
            }
        }
        return true;
    }

    // Función para validar meses
    function validarMeses() {
        if (mesInicial.value && mesFinal.value) {
            const inicial = parseInt(mesInicial.value);
            const final = parseInt(mesFinal.value);
            
            if (inicial > final) {
                alert('El mes inicial no puede ser mayor que el mes final');
                return false;
            }
        }
        return true;
    }

    // Función para validar el formulario
    function validarFormulario() {
        const datos = obtenerDatosFormulario();
        
        // Verificar que al menos un filtro esté seleccionado
        const hayFiltros = Object.values(datos).some(valor => valor !== '');
        
        if (!hayFiltros) {
            alert('Debe seleccionar al menos un filtro para realizar la búsqueda');
            return false;
        }

        // Validar fechas
        if (!validarFechas()) {
            return false;
        }

        // Validar meses
        if (!validarMeses()) {
            return false;
        }

        return true;
    }

    // Función para realizar la búsqueda
    function realizarBusqueda() {
        if (!validarFormulario()) {
            return;
        }

        const datos = obtenerDatosFormulario();
        console.log('Datos de búsqueda:', datos);

        // Aquí puedes hacer una petición AJAX a tu backend
        // Ejemplo con fetch:
        /*
        fetch('procesar_busqueda.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resultados:', data);
            // Mostrar resultados en la página
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al realizar la búsqueda');
        });
        */

        // Simulación de búsqueda exitosa
        alert('Búsqueda realizada con éxito\n\nDatos enviados:\n' + JSON.stringify(datos, null, 2));
    }

    // Función para exportar datos
    function exportarDatos() {
        if (!validarFormulario()) {
            return;
        }

        const datos = obtenerDatosFormulario();
        console.log('Exportando datos:', datos);

        // Aquí puedes implementar la lógica de exportación
        // Ejemplo: generar un archivo Excel o CSV
        /*
        fetch('exportar_datos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.blob())
        .then(blob => {
            // Crear un link de descarga
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'consulta_cuotas_' + new Date().getTime() + '.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al exportar los datos');
        });
        */

        // Simulación de exportación exitosa
        alert('Datos exportados con éxito\n\nDatos exportados:\n' + JSON.stringify(datos, null, 2));
    }

    // Función para limpiar el formulario
    function limpiarFormulario() {
        formBusqueda.reset();
    }

    // Event Listeners
    btnBuscar.addEventListener('click', realizarBusqueda);
    btnExportar.addEventListener('click', exportarDatos);

    // Validación en tiempo real para fechas
    fechaInicial.addEventListener('change', validarFechas);
    fechaFinal.addEventListener('change', validarFechas);

    // Validación en tiempo real para meses
    mesInicial.addEventListener('change', validarMeses);
    mesFinal.addEventListener('change', validarMeses);

    // Permitir solo números en el campo de ticket
    ticket.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Log inicial
    console.log('Módulo REPRO - Consulta de Cuotas cargado correctamente');
});

// Funciones auxiliares globales (si las necesitas)
function formatearFecha(fecha) {
    if (!fecha) return '';
    const f = new Date(fecha);
    const dia = String(f.getDate()).padStart(2, '0');
    const mes = String(f.getMonth() + 1).padStart(2, '0');
    const año = f.getFullYear();
    return `${dia}/${mes}/${año}`;
}

function obtenerNombreMes(numeroMes) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[parseInt(numeroMes) - 1] || '';
}