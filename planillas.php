<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Presentación y Pago de Planillas</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <link rel="stylesheet" href="planillas.css">
</head>
<body>

<!-- TOPBAR -->
<header class="topbar">
    <div class="topbar-left">
        <div class="topbar-logo" onclick="location.href='dashboard.php'">AFPnet<span>PAGO FÁCIL</span></div>
        <button class="btn-menu" id="btn-tog"><i class="fas fa-bars"></i></button>
        <div class="topbar-welcome">Bienvenido Sr(a). <strong id="w-name">Usuario</strong></div>
    </div>
    <div class="topbar-right">
        <div class="topbar-time" id="tb-time"></div>
        <div class="user-badge"><div class="user-avatar" id="u-init">U</div><span id="u-name">Usuario</span></div>
    </div>
</header>

<div class="sov" id="sov"></div>

<!-- SIDEBAR -->
<aside class="sidebar" id="sb">
    <nav class="sidebar-nav">
        <div><a class="nav-link" href="dashboard.php"><span><i class="fas fa-home" style="width:18px;margin-right:8px"></i> Inicio</span></a></div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-cogs" style="width:18px;margin-right:8px"></i> Administración</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Usuarios</a><a href="#">Permisos</a><a href="#">Datos de la empresa</a></div>
        </div>
        <div>
            <div class="nav-link active open" onclick="togSub(this)"><span><i class="fas fa-file-invoice-dollar" style="width:18px;margin-right:8px"></i> Aportes</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu open"><a href="planillas.php" class="act">Presentación y Pago de Planillas</a><a href="#">Consulta y Pago de Planillas</a><a href="#">Consulta y Pago de Regularizaciones</a><a href="#">Pagos Pendientes de 2da firma</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-users" style="width:18px;margin-right:8px"></i> Afiliados</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Consultar afiliados</a><a href="#">Afiliar trabajadores al SPP</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-clipboard-list" style="width:18px;margin-right:8px"></i> Módulo REPRO</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Consultas</a><a href="#">Reportes</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-money-check-alt" style="width:18px;margin-right:8px"></i> Obligaciones de Pago</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Ver obligaciones</a><a href="#">Historial de pagos</a></div>
        </div>
        <div>
            <div class="nav-link" onclick="togSub(this)"><span><i class="fas fa-exclamation-triangle" style="width:18px;margin-right:8px"></i> Deudas Ciertas y Presuntas</span><i class="fas fa-chevron-down chv"></i></div>
            <div class="submenu"><a href="#">Liquidaciones</a><a href="#">Descargos de cobranza</a></div>
        </div>
        <div class="nav-sep"></div>
        <div><a class="nav-link" href="#"><span><i class="fas fa-key" style="width:18px;margin-right:8px"></i> Cambiar Contraseña</span></a></div>
        <div><div class="nav-link nav-danger" onclick="cerrarSesion()"><span><i class="fas fa-sign-out-alt" style="width:18px;margin-right:8px"></i> Cerrar Sesión</span></div></div>
    </nav>
</aside>

<!-- MAIN -->
<main class="main" id="mc">
    <div class="page-banner"><span>APORTES &gt;</span> PRESENTACIÓN Y PAGO DE PLANILLAS</div>
    <div class="content">
        <div class="imp-box">
            <h3>Importante:</h3>
            <ul>
                <li>Descargue el modelo para la declaración de planilla <a href="#">aquí</a> y el modelo para la declaración de las semanas contributivas <a href="#">aquí</a>.</li>
                <li>Tenga en cuenta que solo puede trabajar la información de esta bandeja de trabajo hasta el final del día. Luego la información será borrada.</li>
            </ul>
        </div>

        <div class="fcard">
            <div class="msg msg-err" id="m-err"><i class="fas fa-exclamation-circle"></i><span id="m-err-t"></span></div>
            <div class="msg msg-ok" id="m-ok"><i class="fas fa-check-circle"></i><span id="m-ok-t"></span></div>
            <div class="frow">
                <label class="fl">Periodo de Devengue: <span class="req">*</span></label>
                <select id="sel-per"><option value="">Seleccione</option></select>
            </div>
            <div class="frow">
                <label class="fl">Planilla única: <span class="req">*</span></label>
                <div class="fu-wrap" id="fu-w">
                    <div class="fu-name" id="fu-n">Ningún archivo seleccionado</div>
                    <button type="button" class="fu-btn" onclick="document.getElementById('file-input').click()">Seleccionar</button>
                </div>
                <input type="file" id="file-input" accept=".xlsx,.xls,.csv">
            </div>
            <div class="chk-row"><input type="checkbox" id="chk-sem"><label for="chk-sem">Cargar semana contributiva</label></div>
            <p class="req-note">Los campos marcados con asterisco (*) son obligatorios.</p>
            <div class="btn-row">
                <button class="btn btn-green"><i class="fas fa-book"></i> GUÍA DE USO</button>
                <button class="btn btn-blue" id="btn-cargar"><span class="spinner"></span><i class="fas fa-upload"></i> CARGAR</button>
            </div>
        </div>

        <div class="results" id="results">
            <p class="results-info">Seleccione la AFP con la que desee trabajar, así como el tipo de operación.</p>
            <div class="tbl-wrap">
                <div class="tbl-scroll">
                    <table>
                        <thead><tr>
                            <th>AFP</th><th>Tipo<br>Trabajador</th><th>Rubro</th><th>N° de<br>Afiliados</th>
                            <th>Fondo de<br>pensiones</th><th>Retenciones y<br>Retribuciones</th>
                            <th>Estado</th><th>N° de Planilla</th>
                            <th>Descargar</th><th>Presentar</th><th>Descartar</th><th>Ticket</th>
                        </tr></thead>
                        <tbody id="res-body"></tbody>
                    </table>
                </div>
                <div class="tbl-footer">
                    <button class="btn btn-orange" onclick="nuevaCarga()"><i class="fas fa-plus-circle"></i> INICIAR NUEVA CARGA DE ARCHIVO</button>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- MODAL: EMITIR -->
<div class="mo" id="mo-emit">
    <div class="modal">
        <div class="mh mh-blue">EMISIÓN DE TICKET<button class="mx" onclick="closeM('mo-emit')"><i class="fas fa-times"></i></button></div>
        <div class="mb"><div class="ig" id="emit-ig"></div><p style="font-size:13px;color:#555;font-weight:600">El pago no está afecto a intereses debido a fecha de pago oportuna.</p></div>
        <div class="mf"><button class="btn btn-gray" onclick="closeM('mo-emit')">REGRESAR</button><button class="btn btn-blue" id="btn-do-emit">EMITIR TICKET</button></div>
    </div>
</div>

<!-- MODAL: TICKET EMITIDO -->
<div class="mo" id="mo-ticket">
    <div class="modal">
        <div class="mh mh-green">TICKET EMITIDO<button class="mx" onclick="closeM('mo-ticket')"><i class="fas fa-times"></i></button></div>
        <div class="mb" id="ticket-mb"></div>
        <div class="mf"><button class="btn btn-gray" onclick="closeM('mo-ticket')">REGRESAR</button><button class="btn btn-blue" id="btn-print"><i class="fas fa-print"></i> IMPRIMIR TICKET</button></div>
    </div>
</div>

<script>
// ===== GLOBALS =====
let parsedRows=[], planillaData=[], selectedPeriodo='';
const afpNames=['HABITAT','INTEGRA','PRIMA','PROFUTURO'];
const userRUC=sessionStorage.getItem('afpnet_ruc')||'20100000001';
const uName=sessionStorage.getItem('afpnet_usuario')||'Usuario';

// ===== INIT =====
window.addEventListener('DOMContentLoaded',()=>{
    const dn=uName.charAt(0).toUpperCase()+uName.slice(1);
    document.getElementById('w-name').textContent=dn;
    document.getElementById('u-name').textContent=dn;
    document.getElementById('u-init').textContent=dn.substring(0,2).toUpperCase();
    genPer();updClk();setInterval(updClk,1000);
});

function updClk(){const n=new Date();document.getElementById('tb-time').innerHTML=n.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true})+'<br>'+n.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'})}

function genPer(){const s=document.getElementById('sel-per');const n=new Date();let y=n.getFullYear(),m=n.getMonth()+1;for(let i=0;i<36;i++){const mo=String(m).padStart(2,'0');const o=document.createElement('option');o.value=y+'-'+mo;o.textContent=y+'-'+mo;s.appendChild(o);m--;if(m===0){m=12;y--}}}

// ===== SIDEBAR =====
const sb=document.getElementById('sb'),mc=document.getElementById('mc'),sov=document.getElementById('sov');
document.getElementById('btn-tog').onclick=()=>{if(innerWidth<=768){sb.classList.toggle('mob');sov.classList.toggle('vis')}else{sb.classList.toggle('collapsed');mc.classList.toggle('exp')}};
sov.onclick=()=>{sb.classList.remove('mob');sov.classList.remove('vis')};
function togSub(el){const sub=el.nextElementSibling;if(!sub)return;const op=sub.classList.contains('open');document.querySelectorAll('.submenu.open').forEach(s=>{if(s!==sub){s.classList.remove('open');s.previousElementSibling.classList.remove('open')}});if(!op){sub.classList.add('open');el.classList.add('open')}else{sub.classList.remove('open');el.classList.remove('open')}}
function cerrarSesion(){sessionStorage.clear();location.href='index.php'}

// ===== FILE =====
const fi=document.getElementById('file-input'),fn=document.getElementById('fu-n'),fw=document.getElementById('fu-w');
fi.onchange=function(){if(this.files.length){fn.textContent=this.files[0].name;fn.style.color='var(--green)';fw.classList.add('has')}else resetF()};
function resetF(){fi.value='';fn.textContent='Ningún archivo seleccionado';fn.style.color='#aab';fw.classList.remove('has')}

// ===== MESSAGES =====
function showE(m){hideO();document.getElementById('m-err-t').textContent=m;document.getElementById('m-err').classList.add('vis')}
function hideE(){document.getElementById('m-err').classList.remove('vis')}
function showO(m){hideE();document.getElementById('m-ok-t').textContent=m;document.getElementById('m-ok').classList.add('vis')}
function hideO(){document.getElementById('m-ok').classList.remove('vis')}

// ===== CARGAR =====
document.getElementById('btn-cargar').onclick=function(){
    hideE();hideO();
    selectedPeriodo=document.getElementById('sel-per').value;
    if(!selectedPeriodo){showE('Debe seleccionar un Periodo de Devengue.');return}
    if(!fi.files||!fi.files.length){showE('Debe seleccionar un archivo de Planilla única.');return}
    const file=fi.files[0];
    const ext=file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if(!['.xlsx','.xls','.csv'].includes(ext)){showE('El archivo debe ser formato Excel (.xlsx, .xls) o CSV.');return}
    const btn=this;btn.classList.add('loading');btn.disabled=true;
    const reader=new FileReader();
    reader.onload=function(e){
        try{
            const data=new Uint8Array(e.target.result);
            const wb=XLSX.read(data,{type:'array'});
            const ws=wb.Sheets[wb.SheetNames[0]];
            parsedRows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
            if(!parsedRows.length){showE('El archivo está vacío.');btn.classList.remove('loading');btn.disabled=false;return}
            setTimeout(()=>{procesar();showO('Archivo cargado correctamente. '+parsedRows.length+' registros procesados.');btn.classList.remove('loading');btn.disabled=false},1500);
        }catch(err){showE('Error: '+err.message);btn.classList.remove('loading');btn.disabled=false}
    };
    reader.onerror=()=>{showE('Error al leer el archivo.');btn.classList.remove('loading');btn.disabled=false};
    reader.readAsArrayBuffer(file);
};

// ===== PROCESS =====
function procesar(){
    const map={};
    parsedRows.forEach((row,i)=>{
        const afp=afpNames[i%afpNames.length];
        if(!map[afp])map[afp]={c:0,f:0,r:0};
        map[afp].c++;
        const rem=parseFloat(row[11])||1000;
        map[afp].f+=rem*0.1;
        map[afp].r+=rem*0.0154;
    });
    planillaData=[];
    Object.keys(map).forEach(afp=>{
        const d=map[afp];
        planillaData.push({afp,tipo:'D',rubro:'N',afil:d.c,fondo:d.f.toFixed(2),ret:d.r.toFixed(2),estado:'PENDIENTE',nPlan:Math.floor(2200000000+Math.random()*99999999),ticket:null});
    });
    renderTbl();
    document.getElementById('results').classList.add('vis');
    document.getElementById('results').scrollIntoView({behavior:'smooth'});
}

// ===== RENDER TABLE =====
function renderTbl(){
    const tb=document.getElementById('res-body');tb.innerHTML='';
    planillaData.forEach((r,i)=>{
        const pr=r.estado==='PRESENTADA';
        const tr=document.createElement('tr');
        tr.innerHTML=`
            <td style="font-weight:700">${r.afp}</td>
            <td>${r.tipo}</td><td>${r.rubro}</td>
            <td style="font-weight:600">${r.afil}</td>
            <td style="text-align:right;font-weight:600">${r.fondo}</td>
            <td style="text-align:right;font-weight:600">${r.ret}</td>
            <td><span class="badge ${pr?'badge-pres':'badge-pend'}">${r.estado}</span></td>
            <td style="font-size:11px;color:#666">${r.nPlan}</td>
            <td><button class="btn btn-blue" style="padding:6px 12px;font-size:11px" onclick="dlPDF(${i})"><i class="fas fa-download"></i> DESCARGAR</button></td>
            <td><button class="btn ${pr?'btn-gray':'btn-green'}" style="padding:6px 12px;font-size:11px" onclick="presentar(${i})" ${pr?'disabled':''}><i class="fas fa-paper-plane"></i> PRESENTAR</button></td>
            <td><button class="btn btn-pink" style="padding:6px 12px;font-size:11px" onclick="descartar(${i})" ${pr?'disabled':''}><i class="fas fa-times-circle"></i> DESCARTAR</button></td>
            <td><button class="btn btn-purple" style="padding:6px 12px;font-size:11px" onclick="emitir(${i})" ${!pr?'disabled':''}><i class="fas fa-ticket-alt"></i> EMITIR</button></td>`;
        tb.appendChild(tr);
    });
}

// ===== DESCARGAR PDF =====
function dlPDF(i){
    const r=planillaData[i];const{jsPDF}=window.jspdf;const doc=new jsPDF();
    doc.setFontSize(18);doc.setTextColor(28,57,151);doc.text('AFPnet - Detalle de Planilla',14,22);
    doc.setDrawColor(28,57,151);doc.setLineWidth(.5);doc.line(14,26,196,26);
    doc.setFontSize(11);doc.setTextColor(51);
    const fs=[['Devengue:',selectedPeriodo],['RUC:',userRUC],['AFP:',r.afp],['Tipo Trabajador:',r.tipo],['Rubro:',r.rubro],['N° de Afiliados:',String(r.afil)],['N° de Planilla:',String(r.nPlan)],['Total Fondo de Pensiones (S/.):',r.fondo],['Total Retenciones y Retribuciones (S/.):',r.ret],['Estado:',r.estado]];
    fs.forEach((f,j)=>{doc.setFont(undefined,'bold');doc.text(f[0],20,38+j*10);doc.setFont(undefined,'normal');doc.text(f[1],110,38+j*10)});
    doc.setFontSize(9);doc.setTextColor(150);doc.text('Documento generado por AFPnet - '+new Date().toLocaleString('es-PE'),14,280);
    doc.save('Planilla_'+r.afp+'_'+selectedPeriodo+'.pdf');
}

// ===== PRESENTAR =====
function presentar(i){if(confirm('¿Presentar la declaración de '+planillaData[i].afp+'?')){planillaData[i].estado='PRESENTADA';renderTbl();showO('Declaración de '+planillaData[i].afp+' presentada correctamente.')}}

// ===== DESCARTAR =====
function descartar(i){if(confirm('¿Descartar la planilla de '+planillaData[i].afp+'?')){planillaData.splice(i,1);renderTbl();if(!planillaData.length)document.getElementById('results').classList.remove('vis')}}

// ===== EMITIR =====
let eIdx=-1;
function emitir(i){
    eIdx=i;const r=planillaData[i];
    const td=new Date().toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
    document.getElementById('emit-ig').innerHTML=`
        <div class="il">Devengue:</div><div class="iv">${selectedPeriodo}</div>
        <div class="il">RUC:</div><div class="iv">${userRUC}</div>
        <div class="il">Razón Social:</div><div class="iv blur">EMPRESA EJEMPLO S.A.C.</div>
        <div class="il">AFP:</div><div class="iv">${r.afp}</div>
        <div class="il">Fecha de Pago:</div><div class="iv">${td}</div>
        <div class="il">Número de Planilla:</div><div class="iv">${r.nPlan}</div>
        <div class="il">Total monto fondo de pensiones (S/.):</div><div class="iv">${r.fondo}</div>
        <div class="il">Total retenciones y retribuciones (S/.):</div><div class="iv">${r.ret}</div>`;
    openM('mo-emit');
}

document.getElementById('btn-do-emit').onclick=()=>{
    if(eIdx<0)return;
    const r=planillaData[eIdx];
    const tNum=Math.floor(2400000000+Math.random()*99999999);
    r.ticket=tNum;
    const now=new Date();
    const td=now.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
    const nm=new Date(now);nm.setMonth(nm.getMonth()+1);
    const nd=nm.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'});
    closeM('mo-emit');
    document.getElementById('ticket-mb').innerHTML=`
        <div class="ig">
            <div class="il" style="font-weight:700">Número de ticket:</div><div class="iv" style="font-size:16px;color:var(--blue)">${tNum}</div>
            <div class="il">Devengue:</div><div class="iv">${selectedPeriodo}</div>
            <div class="il">RUC:</div><div class="iv">${userRUC}</div>
            <div class="il">Razón Social:</div><div class="iv blur">EMPRESA EJEMPLO S.A.C.</div>
            <div class="il">AFP:</div><div class="iv">${r.afp}</div>
            <div class="il">Fecha de Pago:</div><div class="iv">${td}</div>
            <div class="il">Fecha de Emisión:</div><div class="iv">${td}</div>
            <div class="il">Número de Planilla:</div><div class="iv">${r.nPlan}</div>
            <div class="il">Total Monto Fondo de Pensiones (S/.):</div><div class="iv">${r.fondo}</div>
            <div class="il">Total Retenciones y Retribuciones (S/.):</div><div class="iv">${r.ret}</div>
        </div>
        <div class="tn">Este ticket se puede pagar desde el ${td} a las 3:00PM hasta el ${nd}. Para pagar después, será necesario emitirlo nuevamente.<br><br>Puede pagar este ticket en los siguientes bancos:</div>
        <ul class="tb-list"><li>BANBIF</li><li>BBVA - WEB Y AGENTES</li><li>SCOTIABANK</li></ul>
        <p class="tfn">Para efectuar el pago basta indicar la AFP y el número de ticket, no es necesario imprimir el presente formato.</p>`;
    window._tk={tNum,r,td,nd,per:selectedPeriodo};
    openM('mo-ticket');
};

// ===== PRINT TICKET PDF =====
document.getElementById('btn-print').onclick=()=>{
    const t=window._tk;if(!t)return;
    const{jsPDF}=window.jspdf;const doc=new jsPDF();
    doc.setFillColor(28,57,151);doc.rect(0,0,210,18,'F');
    doc.setFontSize(14);doc.setTextColor(255);doc.text('TICKET EMITIDO',14,12);
    doc.setTextColor(51);doc.setFontSize(11);
    const fs=[['Número de ticket:',String(t.tNum)],['Devengue:',t.per],['RUC:',userRUC],['AFP:',t.r.afp],['Fecha de Pago:',t.td],['Fecha de Emisión:',t.td],['Número de Planilla:',String(t.r.nPlan)],['Total Monto Fondo de Pensiones (S/.):',t.r.fondo],['Total Retenciones y Retribuciones (S/.):',t.r.ret]];
    fs.forEach((f,i)=>{doc.setFont(undefined,'bold');doc.text(f[0],16,30+i*10);doc.setFont(undefined,'normal');doc.text(f[1],110,30+i*10)});
    const yN=30+fs.length*10+10;
    doc.setFontSize(10);doc.setFont(undefined,'bold');
    doc.text('Este ticket se puede pagar desde el '+t.td+' a las 3:00PM hasta el '+t.nd+'.',16,yN);
    doc.text('Para pagar después, será necesario emitirlo nuevamente.',16,yN+7);
    doc.text('Puede pagar este ticket en los siguientes bancos:',16,yN+18);
    doc.setFont(undefined,'normal');
    doc.text('- BANBIF',20,yN+26);doc.text('- BBVA - WEB Y AGENTES',20,yN+33);doc.text('- SCOTIABANK',20,yN+40);
    doc.setFont(undefined,'bold');doc.text('Para efectuar el pago basta indicar la AFP y el número de ticket.',16,yN+53);
    doc.setFontSize(9);doc.setTextColor(150);doc.text('Documento generado por AFPnet - '+new Date().toLocaleString('es-PE'),14,280);
    doc.save('Ticket_'+t.r.afp+'_'+t.tNum+'.pdf');
};

// ===== NUEVA CARGA =====
function nuevaCarga(){document.getElementById('results').classList.remove('vis');planillaData=[];parsedRows=[];resetF();document.getElementById('sel-per').value='';document.getElementById('chk-sem').checked=false;hideE();hideO();scrollTo({top:0,behavior:'smooth'})}

// ===== MODALS =====
function openM(id){document.getElementById(id).classList.add('vis')}
function closeM(id){document.getElementById(id).classList.remove('vis')}
</script>
</body>
</html>
