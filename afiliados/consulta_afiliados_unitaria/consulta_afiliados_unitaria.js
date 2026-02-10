/* CONSULTA AFILIADOS UNITARIA */

// ===== GLOBALS =====
const userRUC = sessionStorage.getItem('afpnet_ruc') || '20603401574';
const uName = sessionStorage.getItem('afpnet_usuario') || 'Usuario';

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    // Si tienes elementos en tu topbar para mostrar usuario/ruc:
    const elName = document.getElementById('w-name');
    if(elName) elName.textContent = uName;
    
    // Configuración básica
    updClk(); setInterval(updClk, 1000);
    setupRadios();
});

function updClk(){
    const n = new Date();
    const elTime = document.getElementById('tb-time');
    if(elTime) {
        elTime.innerHTML =
        n.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}) +
        '<br>' + n.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
    }
}


// ===== RADIO TOGGLE LOGIC =====
function setupRadios(){
    const radios = document.querySelectorAll('input[name="search-type"]');
    radios.forEach(r => r.addEventListener('change', updateInputStates));
    // Ejecutar una vez al inicio para setear estado
    if(radios.length > 0) updateInputStates();
}

function updateInputStates(){
    const selectedEl = document.querySelector('input[name="search-type"]:checked');
    if(!selectedEl) return;
    
    const selected = selectedEl.value;

    // CUSPP
    const inpCuspp = document.getElementById('inp-cuspp');
    if(inpCuspp) inpCuspp.disabled = selected !== 'cuspp';

    // Documento
    const selTipo = document.getElementById('sel-tipodoc');
    const inpNum = document.getElementById('inp-numdoc');
    if(selTipo) selTipo.disabled = selected !== 'documento';
    if(inpNum) inpNum.disabled = selected !== 'documento';

    // Nombres
    const inpAppat = document.getElementById('inp-appat');
    const inpApmat = document.getElementById('inp-apmat');
    const inpNom = document.getElementById('inp-nombres');
    
    if(inpAppat) inpAppat.disabled = selected !== 'nombres';
    if(inpApmat) inpApmat.disabled = selected !== 'nombres';
    if(inpNom) inpNom.disabled = selected !== 'nombres';

    // Limpiar campos al cambiar
    if(selected !== 'cuspp' && inpCuspp) inpCuspp.value = '';
    if(selected !== 'documento'){ 
        if(inpNum) inpNum.value = ''; 
        if(selTipo) selTipo.value = ''; 
    }
    if(selected !== 'nombres'){
        if(inpAppat) inpAppat.value = '';
        if(inpApmat) inpApmat.value = '';
        if(inpNom) inpNom.value = '';
    }
}

// ===== MESSAGES =====
function showE(m){
    document.getElementById('m-err-t').textContent=m;
    document.getElementById('m-err').classList.add('vis');
}
function hideE(){
    document.getElementById('m-err').classList.remove('vis');
}

// ===== SEARCH WITH AJAX =====
const btnBuscar = document.getElementById('btn-buscar');
if(btnBuscar){
    btnBuscar.addEventListener('click', function(){
        hideE();
        document.getElementById('results').classList.remove('vis');

        const type = document.querySelector('input[name="search-type"]:checked').value;
        
        // Preparar datos del formulario
        const formData = new FormData();
        formData.append('searchType', type);

        // Validar y agregar datos según el tipo de búsqueda
        if(type === 'cuspp'){
            const val = document.getElementById('inp-cuspp').value.trim().toUpperCase();
            if(!val){
                showE('Debe ingresar el código CUSPP.');
                return;
            }
            formData.append('cuspp', val);
        }
        else if(type === 'documento'){
            const num = document.getElementById('inp-numdoc').value.trim();
            if(!num){
                showE('Debe ingresar el número de documento.');
                return;
            }
            const tipo = document.getElementById('sel-tipodoc').value;
            formData.append('numdoc', num);
            formData.append('tipodoc', tipo);
        }
        else if(type === 'nombres'){
            const appat = document.getElementById('inp-appat').value.trim().toUpperCase();
            const apmat = document.getElementById('inp-apmat').value.trim().toUpperCase();
            const nombres = document.getElementById('inp-nombres').value.trim().toUpperCase();
            
            if(!appat && !apmat && !nombres){
                showE('Debe ingresar al menos un campo de nombre.');
                return;
            }
            
            formData.append('appat', appat);
            formData.append('apmat', apmat);
            formData.append('nombres', nombres);
        }

        // Loading effect
        const btn = this;
        btn.classList.add('loading'); 
        btn.disabled = true;

        // Realizar petición AJAX
        fetch('./buscar_afiliados.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            btn.classList.remove('loading'); 
            btn.disabled = false;

            if(data.success){
                renderResults(data.data);
            } else {
                showE(data.error || 'Error al realizar la búsqueda');
            }
        })
        .catch(error => {
            btn.classList.remove('loading'); 
            btn.disabled = false;
            showE('Error de conexión con el servidor');
            console.error('Error:', error);
        });
    });
}

// ===== RENDER RESULTS =====
function renderResults(data){
    const section = document.getElementById('results');
    const tbody = document.getElementById('res-body');
    const countEl = document.getElementById('res-count');

    tbody.innerHTML = '';

    if(data.length === 0){
        countEl.innerHTML = 'Se ha encontrado <strong>0</strong> registros.';
        section.classList.add('vis');
        return;
    }

    countEl.innerHTML = 'Se ha encontrado <strong>' + data.length + '</strong> registro' + (data.length > 1 ? 's' : '') + '.';

    data.forEach(a => {
        const tr = document.createElement('tr');
        // AQUÍ ESTÁ EL ORDEN CORREGIDO SEGÚN TU SOLICITUD:
        tr.innerHTML = `
            <td style="font-weight:600">${a.tipodoc} - ${a.numdoc}</td>
            <td>${a.appat}</td>
            <td>${a.apmat}</td>
            <td>${a.nombres}</td>
            <td style="font-weight:600;color:var(--blue)">${a.cuspp}</td>
            <td>${a.devmax}</td>
            <td>${a.motivo || '-'}</td>
            <td>${a.ultimo_devengue || '-'}</td>
            <td>${a.motivo_salida || '-'}</td>
            <td style="font-weight:600">${a.afp}</td>
            <td>${a.tipocom}</td>
            <td>${a.pctcom}</td>
        `;
        tbody.appendChild(tr);
    });

    section.classList.add('vis');
    section.scrollIntoView({behavior:'smooth',block:'start'});
}

// ===== Allow Enter key to trigger search =====
document.querySelectorAll('.search-input').forEach(inp => {
    inp.addEventListener('keypress', e => {
        if(e.key === 'Enter') {
            const btn = document.getElementById('btn-buscar');
            if(btn) btn.click();
        }
    });
});

// ===== Only numbers for document input =====
const inpNumDoc = document.getElementById('inp-numdoc');
if(inpNumDoc){
    inpNumDoc.addEventListener('input', function(){
        // Allow alphanumeric for CE/PAS if needed, but per request keeping logic simple
        const sel = document.getElementById('sel-tipodoc');
        const tipo = sel ? sel.value : '';
        if(!tipo || tipo === 'DNI'){
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
}