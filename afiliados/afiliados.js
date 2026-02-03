
// ===== SAMPLE DATA (simulated affiliates database) =====
const affiliatesDB = [
    {tipodoc:'DNI',numdoc:'10379368',appat:'ALZAMORA',apmat:'LARA',nombres:'NEVARDO ALCIDES',cuspp:'572741NALAA6',devmax:'2026-01',motivo:'Retiro del 95.5%',afp:'INTEGRA',tipocom:'Mixta',pctcom:'1.55%'},
    {tipodoc:'DNI',numdoc:'45678912',appat:'GARCIA',apmat:'LOPEZ',nombres:'MARIA ELENA',cuspp:'612345MGLPE2',devmax:'2026-02',motivo:'',afp:'PRIMA',tipocom:'Flujo',pctcom:'1.69%'},
    {tipodoc:'DNI',numdoc:'78912345',appat:'RODRIGUEZ',apmat:'HUAMAN',nombres:'CARLOS EMILIO',cuspp:'578912CREHU4',devmax:'2026-01',motivo:'',afp:'HABITAT',tipocom:'Mixta',pctcom:'1.47%'},
    {tipodoc:'DNI',numdoc:'32165498',appat:'MENDEZ',apmat:'GONZALES',nombres:'PEDRO LUIS',cuspp:'534561PLMEG8',devmax:'2025-12',motivo:'',afp:'PROFUTURO',tipocom:'Flujo',pctcom:'1.69%'},
    {tipodoc:'CE',numdoc:'CE201456',appat:'TORRES',apmat:'SILVA',nombres:'ANA PATRICIA',cuspp:'623456APTSI1',devmax:'2026-01',motivo:'',afp:'INTEGRA',tipocom:'Mixta',pctcom:'1.55%'},
    {tipodoc:'DNI',numdoc:'11223344',appat:'QUISPE',apmat:'MAMANI',nombres:'JUAN CARLOS',cuspp:'511223JCQMA3',devmax:'2026-02',motivo:'',afp:'PRIMA',tipocom:'Flujo',pctcom:'1.69%'},
    {tipodoc:'DNI',numdoc:'99887766',appat:'FLORES',apmat:'DIAZ',nombres:'ROSA MARIA',cuspp:'599887RMFLD7',devmax:'2025-11',motivo:'Jubilación anticipada',afp:'HABITAT',tipocom:'Mixta',pctcom:'1.47%'},
    {tipodoc:'PAS',numdoc:'PA445566',appat:'VARGAS',apmat:'CASTRO',nombres:'DIEGO FERNANDO',cuspp:'644556DFVCA5',devmax:'2026-01',motivo:'',afp:'PROFUTURO',tipocom:'Flujo',pctcom:'1.69%'},
];

// ===== GLOBALS =====
const userRUC = sessionStorage.getItem('afpnet_ruc') || '20603401574';
const uName = sessionStorage.getItem('afpnet_usuario') || 'Usuario';

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    const dn = uName.charAt(0).toUpperCase() + uName.slice(1);
    document.getElementById('w-name').textContent = dn;
    document.getElementById('u-name').textContent = dn;
    document.getElementById('u-init').textContent = dn.substring(0,2).toUpperCase();
    document.getElementById('tb-ruc').textContent = userRUC;
    document.getElementById('tb-razon').textContent = 'EMPRESA S.A.C.';
    updClk(); setInterval(updClk, 1000);
    setupRadios();
});

function updClk(){
    const n = new Date();
    document.getElementById('tb-time').innerHTML =
        n.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}) +
        '<br>' + n.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
}

// ===== SIDEBAR =====
const sb=document.getElementById('sb'),mc=document.getElementById('mc'),sov=document.getElementById('sov');
document.getElementById('btn-tog').onclick=()=>{
    if(innerWidth<=768){sb.classList.toggle('mob');sov.classList.toggle('vis')}
    else{sb.classList.toggle('collapsed');mc.classList.toggle('exp')}
};
sov.onclick=()=>{sb.classList.remove('mob');sov.classList.remove('vis')};
function togSub(el){
    const sub=el.nextElementSibling;if(!sub)return;
    const op=sub.classList.contains('open');
    document.querySelectorAll('.submenu.open').forEach(s=>{if(s!==sub){s.classList.remove('open');s.previousElementSibling.classList.remove('open')}});
    if(!op){sub.classList.add('open');el.classList.add('open')}else{sub.classList.remove('open');el.classList.remove('open')}
}
function cerrarSesion(){sessionStorage.clear();location.href='../afp/afp.php'}

// ===== RADIO TOGGLE LOGIC =====
function setupRadios(){
    const radios = document.querySelectorAll('input[name="search-type"]');
    radios.forEach(r => r.addEventListener('change', updateInputStates));
    updateInputStates();
}

function updateInputStates(){
    const selected = document.querySelector('input[name="search-type"]:checked').value;

    // CUSPP
    document.getElementById('inp-cuspp').disabled = selected !== 'cuspp';

    // Documento
    document.getElementById('sel-tipodoc').disabled = selected !== 'documento';
    document.getElementById('inp-numdoc').disabled = selected !== 'documento';

    // Nombres
    document.getElementById('inp-appat').disabled = selected !== 'nombres';
    document.getElementById('inp-apmat').disabled = selected !== 'nombres';
    document.getElementById('inp-nombres').disabled = selected !== 'nombres';

    // Clear disabled inputs
    if(selected !== 'cuspp') document.getElementById('inp-cuspp').value = '';
    if(selected !== 'documento'){ document.getElementById('inp-numdoc').value = ''; document.getElementById('sel-tipodoc').value = ''; }
    if(selected !== 'nombres'){
        document.getElementById('inp-appat').value = '';
        document.getElementById('inp-apmat').value = '';
        document.getElementById('inp-nombres').value = '';
    }
}

// ===== MESSAGES =====
function showE(m){document.getElementById('m-err-t').textContent=m;document.getElementById('m-err').classList.add('vis')}
function hideE(){document.getElementById('m-err').classList.remove('vis')}

// ===== SEARCH =====
document.getElementById('btn-buscar').addEventListener('click', function(){
    hideE();
    document.getElementById('results').classList.remove('vis');

    const type = document.querySelector('input[name="search-type"]:checked').value;
    let results = [];

    if(type === 'cuspp'){
        const val = document.getElementById('inp-cuspp').value.trim().toUpperCase();
        if(!val){showE('Debe ingresar el código CUSPP.');return}
        results = affiliatesDB.filter(a => a.cuspp.toUpperCase().includes(val));
    }
    else if(type === 'documento'){
        const num = document.getElementById('inp-numdoc').value.trim();
        if(!num){showE('Debe ingresar el número de documento.');return}
        const tipo = document.getElementById('sel-tipodoc').value;
        results = affiliatesDB.filter(a => {
            const matchNum = a.numdoc.includes(num);
            const matchTipo = !tipo || a.tipodoc === tipo;
            return matchNum && matchTipo;
        });
    }
    else if(type === 'nombres'){
        const appat = document.getElementById('inp-appat').value.trim().toUpperCase();
        const apmat = document.getElementById('inp-apmat').value.trim().toUpperCase();
        const nombres = document.getElementById('inp-nombres').value.trim().toUpperCase();
        if(!appat && !apmat && !nombres){showE('Debe ingresar al menos un campo de nombre.');return}
        results = affiliatesDB.filter(a => {
            let match = true;
            if(appat) match = match && a.appat.toUpperCase().includes(appat);
            if(apmat) match = match && a.apmat.toUpperCase().includes(apmat);
            if(nombres) match = match && a.nombres.toUpperCase().includes(nombres);
            return match;
        });
    }

    // Loading effect
    const btn = this;
    btn.classList.add('loading'); btn.disabled = true;

    setTimeout(()=>{
        btn.classList.remove('loading'); btn.disabled = false;
        renderResults(results);
    }, 800);
});

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
        tr.innerHTML = `
            <td style="font-weight:600">${a.tipodoc} - ${a.numdoc}</td>
            <td>${a.appat}</td>
            <td>${a.apmat}</td>
            <td>${a.nombres}</td>
            <td style="font-weight:600;color:var(--blue)">${a.cuspp}</td>
            <td>${a.devmax}</td>
            <td>${a.motivo || '-'}</td>
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
        if(e.key === 'Enter') document.getElementById('btn-buscar').click();
    });
});

// ===== Only numbers for document input =====
document.getElementById('inp-numdoc').addEventListener('input', function(){
    // Allow alphanumeric for CE/PAS
    const tipo = document.getElementById('sel-tipodoc').value;
    if(!tipo || tipo === 'DNI'){
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});
