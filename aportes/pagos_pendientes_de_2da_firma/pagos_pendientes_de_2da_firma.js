// ================================================
// INICIALIZACIÓN
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
});

function inicializarEventos() {
    // Enter en el input para buscar
    const inputNumero = document.getElementById('numero_documento');
    if (inputNumero) {
        inputNumero.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscar();
            }
        });
    }
}

// ================================================
// BÚSQUEDA
// ================================================
function buscar() {
    const numero = document.getElementById('numero_documento').value.trim();
    const tipo = document.getElementById('tipo_documento').value;

    mostrarLoading(true);

    // Simular llamada al backend
    setTimeout(() => {
        mostrarLoading(false);

        // Simulación: si se ingresa un número, mostrar resultados de ejemplo
        if (numero !== '') {
            mostrarResultados(numero, tipo);
        } else {
            mostrarSinResultados();
        }
    }, 1000);
}

function mostrarResultados(numero, tipo) {
    document.getElementById('sin-resultados').style.display = 'none';
    document.getElementById('seccion-resultados').style.display = 'block';

    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';

    // Datos de ejemplo
    const resultados = [
        {
            num_documento: numero,
            tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
            afp: 'INTEGRA',
            periodo: '2025-01',
            monto: '642.40',
            estado: 'PENDIENTE',
            fecha: '30/01/2026'
        }
    ];

    resultados.forEach(item => {
        const fila = document.createElement('tr');
        const estadoClase = item.estado === 'PENDIENTE' ? 'estado-pendiente' : 'estado-firmado';

        fila.innerHTML = `
            <td>${item.num_documento}</td>
            <td>${item.tipo}</td>
            <td>${item.afp}</td>
            <td>${item.periodo}</td>
            <td>${item.monto}</td>
            <td><span class="estado-badge ${estadoClase}">${item.estado}</span></td>
            <td>${item.fecha}</td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-tabla btn-ver" onclick="verDetalle('${item.num_documento}')">VER</button>
                    <button class="btn-tabla btn-firmar" onclick="firmar('${item.num_documento}')">FIRMAR</button>
                </div>
            </td>
        `;

        tbody.appendChild(fila);
    });
}

function mostrarSinResultados() {
    document.getElementById('sin-resultados').style.display = 'block';
    document.getElementById('seccion-resultados').style.display = 'none';
}

// ================================================
// ACCIONES
// ================================================
function verDetalle(numDocumento) {
    // Aquí iría la lógica para ver el detalle del documento
    mostrarExito('Cargando detalle del documento ' + numDocumento);
}

function firmar(numDocumento) {
    if (!confirm('¿Está seguro que desea firmar el documento ' + numDocumento + '?')) {
        return;
    }

    mostrarLoading(true);

    // Simular firma
    setTimeout(() => {
        mostrarLoading(false);
        mostrarExito('Documento ' + numDocumento + ' firmado exitosamente');

        // Actualizar estado en la tabla
        buscar();
    }, 1500);
}

function mostrarGuiaUso() {
    mostrarExito('Abriendo guía de uso...');
}

// ================================================
// UTILIDADES
// ================================================
function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = mostrar ? 'flex' : 'none';
    }
}

function mostrarExito(mensaje) {
    const div = document.createElement('div');
    div.className = 'mensaje-exito';
    div.textContent = mensaje;
    document.body.appendChild(div);

    setTimeout(() => {
        div.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            div.remove();
        }, 300);
    }, 3000);
}