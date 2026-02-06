// Planilla Movimiento Laboral - Registrar Movimientos Laborales
// JavaScript para manejo de carga de archivos

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const fileInput = document.getElementById('file-input');
    const fileDisplay = document.getElementById('file-display');
    const btnCargar = document.getElementById('btn-cargar');
    const linkModelo = document.getElementById('link-modelo');
    const ultimosContainer = document.getElementById('ultimos-container');
    
    // Variable para almacenar el archivo seleccionado
    let selectedFile = null;
    
    // Array para almacenar historial de archivos cargados (simulación)
    let archivosHistorial = [];

    // Manejar selección de archivo
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Validar tipo de archivo
            const extension = file.name.split('.').pop().toLowerCase();
            
            if (extension !== 'txt' && extension !== 'csv') {
                alert('Error: Solo se permiten archivos TXT o CSV');
                fileInput.value = '';
                return;
            }
            
            // Validar tamaño (máximo 10MB)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                alert('Error: El archivo no debe superar los 10MB');
                fileInput.value = '';
                return;
            }
            
            // Actualizar display
            selectedFile = file;
            fileDisplay.textContent = file.name;
            fileDisplay.classList.add('has-file');
            
            console.log('Archivo seleccionado:', file.name, '(' + formatFileSize(file.size) + ')');
        } else {
            resetFileInput();
        }
    });

    // Función para resetear el input de archivo
    function resetFileInput() {
        selectedFile = null;
        fileDisplay.textContent = 'Seleccione Archivo';
        fileDisplay.classList.remove('has-file');
        fileInput.value = '';
    }

    // Función para formatear tamaño de archivo
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Función para cargar archivo
    function cargarArchivo() {
        // Validar que se haya seleccionado un archivo
        if (!selectedFile) {
            alert('Error: Debe seleccionar un archivo antes de cargar');
            return;
        }

        // Mostrar loading
        btnCargar.disabled = true;
        btnCargar.classList.add('loading');

        console.log('Cargando archivo:', selectedFile.name);

        // Aquí harías la petición AJAX a tu backend
        // Simulación de carga con FormData
        /*
        const formData = new FormData();
        formData.append('archivo', selectedFile);
        formData.append('tipo', 'movimiento_laboral');

        fetch('cargar_movimiento.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Archivo cargado exitosamente\n\nID: ' + data.id);
                agregarArchivoHistorial(data);
                resetFileInput();
            } else {
                alert('Error al cargar el archivo: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar el archivo');
        })
        .finally(() => {
            btnCargar.disabled = false;
            btnCargar.classList.remove('loading');
        });
        */

        // Simulación de carga exitosa
        setTimeout(() => {
            btnCargar.disabled = false;
            btnCargar.classList.remove('loading');

            // Simular respuesta exitosa
            const resultado = {
                id: Math.floor(Math.random() * 10000),
                nombre: selectedFile.name,
                fecha: new Date().toLocaleString('es-PE'),
                estado: 'PROCESADO',
                registros: Math.floor(Math.random() * 100) + 50
            };

            alert('Archivo cargado exitosamente\n\n' +
                  'Nombre: ' + resultado.nombre + '\n' +
                  'ID: ' + resultado.id + '\n' +
                  'Registros procesados: ' + resultado.registros);

            agregarArchivoHistorial(resultado);
            resetFileInput();
        }, 2000);
    }

    // Función para agregar archivo al historial
    function agregarArchivoHistorial(archivo) {
        archivosHistorial.unshift(archivo);
        
        // Mantener solo los últimos 10
        if (archivosHistorial.length > 10) {
            archivosHistorial = archivosHistorial.slice(0, 10);
        }
        
        renderizarHistorial();
    }

    // Función para renderizar el historial de archivos
    function renderizarHistorial() {
        if (archivosHistorial.length === 0) {
            ultimosContainer.innerHTML = '<div class="ultimos-empty">No hay archivos cargados recientemente</div>';
            return;
        }

        let html = '<div class="table-wrapper"><table>';
        html += '<thead><tr>';
        html += '<th>ID</th>';
        html += '<th>Nombre de Archivo</th>';
        html += '<th>Fecha de Carga</th>';
        html += '<th>Estado</th>';
        html += '<th>Registros</th>';
        html += '<th>Acciones</th>';
        html += '</tr></thead><tbody>';

        archivosHistorial.forEach(archivo => {
            const estadoClass = archivo.estado === 'PROCESADO' ? 'badge-success' : 
                               archivo.estado === 'FALLIDO' ? 'badge-error' : 'badge-pending';
            
            html += '<tr>';
            html += '<td>' + archivo.id + '</td>';
            html += '<td>' + archivo.nombre + '</td>';
            html += '<td>' + archivo.fecha + '</td>';
            html += '<td><span class="badge ' + estadoClass + '">' + archivo.estado + '</span></td>';
            html += '<td>' + archivo.registros + '</td>';
            html += '<td><button class="btn-link" onclick="verDetalle(' + archivo.id + ')"><i class="fas fa-eye"></i> Ver</button></td>';
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        ultimosContainer.innerHTML = html;
    }

    // Función para ver detalle de archivo
    window.verDetalle = function(id) {
        const archivo = archivosHistorial.find(a => a.id === id);
        if (archivo) {
            alert('DETALLE DEL ARCHIVO\n\n' +
                  'ID: ' + archivo.id + '\n' +
                  'Nombre: ' + archivo.nombre + '\n' +
                  'Fecha: ' + archivo.fecha + '\n' +
                  'Estado: ' + archivo.estado + '\n' +
                  'Registros: ' + archivo.registros);
        }
    };

    // Función para descargar modelo
    function descargarModelo() {
        alert('DESCARGA DE MODELO\n\n' +
              'El modelo de archivo para movimientos laborales será descargado.\n\n' +
              'Formato: TXT\n' +
              'Estructura: Según especificaciones AFP');
        
        // Aquí implementarías la descarga real
        // window.location.href = 'descargar_modelo.php?tipo=movimiento_laboral';
    }

    // Event Listeners
    btnCargar.addEventListener('click', cargarArchivo);
    linkModelo.addEventListener('click', function(e) {
        e.preventDefault();
        descargarModelo();
    });

    // Permitir drag & drop (opcional)
    const formSection = document.querySelector('.form-section');
    
    formSection.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.background = '#f0f7ff';
    });

    formSection.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.background = '';
    });

    formSection.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.background = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileInput.dispatchEvent(new Event('change'));
        }
    });

    // Log inicial
    console.log('Módulo Planilla Movimiento Laboral cargado correctamente');
});

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