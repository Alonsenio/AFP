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
function cerrarSesion(){sessionStorage.clear();location.href='/afp/afp.php'}

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

// ===== DESCARGAR PDF (Professional Planilla) =====
function dlPDF(i){
const r=planillaData[i];
const{jsPDF}=window.jspdf;
const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
const W=297,H=210;
const blue=[28,57,151],dk=[20,40,100],wh=[255,255,255];

// Get workers for this AFP
const afpIdx=afpNames.indexOf(r.afp);
const workers=parsedRows.filter((_,idx)=>idx%afpNames.length===afpIdx);

// ===== HEADER =====
// AFP Name top-left
doc.setFontSize(18);doc.setTextColor(...dk);
doc.setFont(undefined,'bold');doc.text('AFP'+r.afp,14,14);
doc.setFontSize(8);doc.setTextColor(100,100,100);
doc.setFont(undefined,'normal');doc.text('Una empresa del SPP',14,18);

// Title centered
doc.setFontSize(13);doc.setTextColor(0);doc.setFont(undefined,'bold');
doc.text('PLANILLA DE DECLARACIÓN Y PAGO DE APORTES PREVISIONALES',W/2,14,{align:'center'});

// AFPnet top-right
doc.setFontSize(14);doc.setTextColor(...blue);doc.setFont(undefined,'bold');
doc.text('AFPnet',W-14,12,{align:'right'});
doc.setFontSize(7);doc.setTextColor(240,160,48);doc.setFont(undefined,'bold');
doc.text('PAGO FÁCIL',W-14,16,{align:'right'});

// Line separator
doc.setDrawColor(...blue);doc.setLineWidth(0.5);doc.line(14,20,W-14,20);

// ===== PLANILLA NUMBER & PERIOD =====
let y=27;
doc.setFontSize(9);doc.setTextColor(0);doc.setFont(undefined,'normal');
doc.text('Número de Planilla:',90,y);
doc.setDrawColor(0);doc.setLineWidth(0.3);doc.rect(135,y-4,40,6);
doc.setFont(undefined,'bold');doc.text(String(r.nPlan),137,y);
doc.text('Periodo de Devengue:',195,y);
doc.rect(235,y-4,30,6);doc.text(selectedPeriodo,237,y);

// ===== IDENTIFICACIÓN DEL EMPLEADOR =====
y=35;
doc.setFillColor(...blue);doc.setTextColor(...wh);doc.setFontSize(8);doc.setFont(undefined,'bold');
doc.rect(14,y,W-28,6,'F');doc.text('IDENTIFICACIÓN DEL EMPLEADOR',16,y+4.5);
y+=6;doc.setTextColor(0);doc.setFont(undefined,'normal');doc.setFontSize(7.5);

// Row 1
const bw=0.2;doc.setLineWidth(bw);doc.setDrawColor(150);
doc.rect(14,y,130,6);doc.text('Nombre o R. Social: '+userName.toUpperCase(),16,y+4.2);
doc.rect(144,y,W-28-130,6);doc.text('RUC: '+userRUC,146,y+4.2);
y+=6;
// Row 2
doc.rect(14,y,(W-28)/2,6);doc.text('Dirección: Av. Principal 123',16,y+4.2);
doc.rect(14+(W-28)/2,y,(W-28)/2,6);doc.text('Urbanización: Centro',16+(W-28)/2,y+4.2);
y+=6;
// Row 3
const cw=(W-28)/4;
doc.rect(14,y,cw,6);doc.text('Distrito: LIMA',16,y+4.2);
doc.rect(14+cw,y,cw,6);doc.text('Provincia: LIMA',16+cw,y+4.2);
doc.rect(14+cw*2,y,cw,6);doc.text('Departamento: LIMA',16+cw*2,y+4.2);
doc.rect(14+cw*3,y,cw,6);doc.text('Teléfono: ',16+cw*3,y+4.2);
y+=6;
// Row 4
doc.setFillColor(200,210,240);
doc.rect(14,y,(W-28)/2,6,'FD');doc.text('Representante Legal: ',16,y+4.2);
doc.rect(14+(W-28)/2,y,(W-28)/4,6,'FD');doc.text('Elaborado por: ',16+(W-28)/2,y+4.2);
doc.rect(14+(W-28)*3/4,y,(W-28)/4,6,'FD');doc.text('Teléfono: ',16+(W-28)*3/4,y+4.2);

// ===== THREE SUMMARY SECTIONS =====
y+=14;
const secW=85,gap=7,sx1=14,sx2=sx1+secW+gap,sx3=sx2+secW+gap;

// -- RESUMEN DE APORTES AL FONDO --
doc.setFillColor(...blue);doc.setTextColor(...wh);doc.setFontSize(7.5);doc.setFont(undefined,'bold');
doc.rect(sx1,y,secW,5,'F');doc.text('RESUMEN DE APORTES AL FONDO',sx1+2,y+3.7);
let ay=y+5;doc.setTextColor(0);doc.setFont(undefined,'normal');doc.setFontSize(7);
const fondoTotal=parseFloat(r.fondo);
const aportes=[
    ['Aporte Obligatorio','S/.',r.fondo],
    ['Aporte Complementario - Trabajador','S/.','0.00'],
    ['Aporte Complementario - Empleador','S/.','0.00'],
    ['Aporte Voluntario con Fin Previsional','S/.','0.00'],
    ['Aporte Voluntario sin Fin Previsional','S/.','0.00'],
    ['Aporte Voluntario del Empleador','S/.','0.00'],
    ['Sub-Total Fondo de Pensiones','S/.',r.fondo],
    ['Intereses Moratorios','S/.','0.00'],
];
aportes.forEach(a=>{
    doc.rect(sx1,ay,52,5);doc.text(a[0],sx1+1,ay+3.5);
    doc.rect(sx1+52,ay,10,5);doc.text(a[1],sx1+53,ay+3.5);
    doc.rect(sx1+62,ay,23,5);doc.text(a[2],sx1+83,ay+3.5,{align:'right'});
    ay+=5;
});
doc.setFont(undefined,'bold');doc.setFontSize(7.5);
doc.rect(sx1,ay,52,6);doc.text('Total Fondo Pensiones',sx1+1,ay+4.2);
doc.rect(sx1+52,ay,10,6);doc.text('S/.',sx1+53,ay+4.2);
doc.rect(sx1+62,ay,23,6);doc.text(r.fondo,sx1+83,ay+4.2,{align:'right'});

// -- RESUMEN DE RETENCIONES Y RETRIBUCIONES --
doc.setFillColor(...blue);doc.setTextColor(...wh);doc.setFontSize(7.5);
doc.rect(sx2,y,secW,5,'F');doc.text('RESUMEN DE RETENCIONES Y RETRIBUCIONES A',sx2+2,y+3.7);
let ry=y+5;doc.setTextColor(0);doc.setFont(undefined,'normal');doc.setFontSize(7);
const retTotal=parseFloat(r.ret);
const rets=[
    ['Prima de Seguro Previsional','S/.',r.ret],
    ['Comisión AFP','S/.','0.00'],
    ['Sub-total Retenciones y Retribuciones','S/.',r.ret],
    ['Intereses Moratorios','S/.','0.00'],
];
rets.forEach(rt=>{
    doc.rect(sx2,ry,52,5);doc.text(rt[0],sx2+1,ry+3.5);
    doc.rect(sx2+52,ry,10,5);doc.text(rt[1],sx2+53,ry+3.5);
    doc.rect(sx2+62,ry,23,5);doc.text(rt[2],sx2+83,ry+3.5,{align:'right'});
    ry+=5;
});
doc.setFont(undefined,'bold');doc.setFontSize(7.5);
doc.rect(sx2,ry,52,6);doc.text('Total Retenciones y Retribuciones',sx2+1,ry+4.2);
doc.rect(sx2+52,ry,10,6);doc.text('S/.',sx2+53,ry+4.2);
doc.rect(sx2+62,ry,23,6);doc.text(r.ret,sx2+83,ry+4.2,{align:'right'});

// -- OTROS --
doc.setFillColor(...blue);doc.setTextColor(...wh);doc.setFontSize(7.5);
doc.rect(sx3,y,secW,5,'F');doc.text('OTROS',sx3+2,y+3.7);
let oy=y+5;doc.setTextColor(0);doc.setFont(undefined,'normal');doc.setFontSize(7);
const otros=[
    ['AFP',r.afp],['Tipo de Trabajador','DEPENDIENTE'],['Tipo de Riesgo','NORMAL'],
    ['Nro. de Afiliados Declarados',String(r.afil)],['Estado de la Planilla',r.estado]
];
otros.forEach(o=>{
    doc.rect(sx3,oy,48,5);doc.text(o[0],sx3+1,oy+3.5);
    doc.rect(sx3+48,oy,37,5);doc.text(o[1],sx3+49,oy+3.5);
    oy+=5;
});

// ===== WATERMARK =====
doc.setTextColor(220,220,220);doc.setFontSize(60);doc.setFont(undefined,'bold');
doc.text(r.estado,W/2,H/2+10,{align:'center',angle:35});

// ===== WORKER DETAIL TABLE =====
const tblY=Math.max(ay,ry,oy)+12;
const headers=[['Nro','CUSPP','Nombre','Rel.\nLab.','Inicio\nRL','Cese\nRL','Excep.\naportar','Remuneración\nAsegurable','Aporte\nObligatorio','Ap. Comp.\nTrabajador','Ap. Comp.\nEmpleador','Ap. Vol.\nCon Fin','Ap. Vol.\nSin Fin','Ap. Vol.\nEmpleador','Prima de\nSeguro','Comisión\nAFP']];

const bodyRows=workers.map((w,wi)=>{
    const cuspp=w[1]||'';
    const nombre=((w[4]||'')+' '+(w[5]||'')+' '+(w[6]||'')).trim()||'Trabajador '+(wi+1);
    const rem=parseFloat(w[11])||1000;
    const aporte=(rem*0.1).toFixed(2);
    const prima=(rem*0.0154).toFixed(2);
    return[String(wi+1),cuspp,nombre,w[7]||'S','','N','N',rem.toFixed(2),aporte,'0.00','0.00','0.00','0.00','0.00',prima,'0.00'];
});

doc.autoTable({
    head:headers,body:bodyRows,startY:tblY,
    theme:'grid',
    styles:{fontSize:6.5,cellPadding:1.5,lineColor:[150,150,150],lineWidth:0.2,textColor:[0,0,0]},
    headStyles:{fillColor:blue,textColor:wh,fontSize:6,fontStyle:'bold',halign:'center',valign:'middle',cellPadding:1},
    columnStyles:{
        0:{halign:'center',cellWidth:8},
        1:{cellWidth:22},
        2:{cellWidth:35},
        3:{halign:'center',cellWidth:10},
        4:{halign:'center',cellWidth:14},
        5:{halign:'center',cellWidth:10},
        6:{halign:'center',cellWidth:12},
        7:{halign:'right',cellWidth:20},
        8:{halign:'right',cellWidth:16},
        9:{halign:'right',cellWidth:16},
        10:{halign:'right',cellWidth:16},
        11:{halign:'right',cellWidth:16},
        12:{halign:'right',cellWidth:16},
        13:{halign:'right',cellWidth:16},
        14:{halign:'right',cellWidth:16},
        15:{halign:'right',cellWidth:16},
    },
    margin:{left:14,right:14},
    didDrawPage:function(data){
        doc.setFontSize(7);doc.setTextColor(150);
        doc.text('Documento generado por AFPnet - '+new Date().toLocaleString('es-PE'),14,H-5);
    }
});

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

// ===== PRINT TICKET PDF (Professional Ticket de Pago) =====
document.getElementById('btn-print').onclick=()=>{
const t=window._tk;if(!t)return;
const{jsPDF}=window.jspdf;const doc=new jsPDF();
const W=210,blue=[28,57,151],wh=[255,255,255];
const total=(parseFloat(t.r.fondo)+parseFloat(t.r.ret)).toFixed(2);

// Generate 3 consecutive payment dates
const baseDate=new Date();
const dates=[];
for(let d=0;d<3;d++){
    const dt=new Date(baseDate);dt.setDate(dt.getDate()+d);
    dates.push(dt.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'}));
}
const emitTime=baseDate.toLocaleDateString('es-PE',{day:'2-digit',month:'2-digit',year:'numeric'})+' '+baseDate.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',hour12:false});

// ===== HEADER BAR =====
doc.setFillColor(220,235,250);doc.rect(0,0,W,8,'F');

// ===== AFPNET LOGO (top left) =====
doc.setFontSize(16);doc.setTextColor(...blue);doc.setFont(undefined,'bold');
doc.text('AFPnet',18,22);
doc.setFontSize(7);doc.setTextColor(240,160,48);
doc.text('PAGO FÁCIL',18,26);

// ===== TITLE =====
doc.setFontSize(18);doc.setTextColor(...blue);doc.setFont(undefined,'bold');
doc.text('TICKET DE PAGO',W/2,22,{align:'center'});
doc.setFontSize(12);
doc.text('AFP '+t.r.afp+' - N° '+t.tNum,W/2,30,{align:'center'});

// User avatar (top right) - small circle
doc.setFillColor(...blue);doc.circle(W-20,20,6,'F');
doc.setTextColor(...wh);doc.setFontSize(8);
doc.text(uName.substring(0,2).toUpperCase(),W-23,22);

// Line separator
doc.setDrawColor(...blue);doc.setLineWidth(0.5);doc.line(14,35,W-14,35);

// ===== EMPLOYER INFO =====
let y=44;
doc.setFontSize(10);doc.setTextColor(0);
doc.setFont(undefined,'normal');doc.text('Empleador',18,y);
doc.setFont(undefined,'bold');
doc.setFillColor(100,130,200);doc.rect(70,y-4,90,6,'F');
doc.setTextColor(...wh);doc.text(uName.toUpperCase(),72,y);
y+=9;
doc.setTextColor(0);doc.setFont(undefined,'normal');doc.text('N° de RUC',18,y);
doc.setFont(undefined,'bold');doc.text(userRUC,70,y);
y+=9;
doc.setFont(undefined,'normal');doc.text('Monto a Pagar',18,y);
doc.setFont(undefined,'bold');doc.text(':',60,y);
y+=4;

// ===== PAYMENT TABLE =====
const tblX=55,tblW=120;
y+=4;
doc.autoTable({
    head:[['Fecha\nde Pago','Fondo\nde Pensiones','Retenciones y\nRetribuciones','Total']],
    body:[
        [dates[0],t.r.fondo,t.r.ret,total],
        [dates[1],t.r.fondo,t.r.ret,total],
        [dates[2],t.r.fondo,t.r.ret,total],
    ],
    startY:y,
    theme:'grid',
    styles:{fontSize:9,cellPadding:3,textColor:[0,0,0],lineColor:[150,150,150],lineWidth:0.3,halign:'right'},
    headStyles:{fillColor:[240,240,240],textColor:[0,0,0],fontStyle:'bold',halign:'center',valign:'middle'},
    columnStyles:{0:{halign:'center',cellWidth:30}},
    margin:{left:tblX,right:W-tblX-tblW},
    tableWidth:tblW,
});

// ===== EMITTED / PRINTED =====
y=doc.lastAutoTable.finalY+10;
doc.setFontSize(9);doc.setFont(undefined,'bold');doc.setTextColor(0);
doc.text('Emitido',18,y);doc.setFont(undefined,'normal');
doc.text(':   '+emitTime,42,y);
doc.setFont(undefined,'bold');doc.text('Impreso:',110,y);
doc.setFont(undefined,'normal');doc.text(emitTime,133,y);

// ===== SEPARATOR =====
y+=8;doc.setDrawColor(0);doc.setLineWidth(0.3);doc.line(14,y,W-14,y);

// ===== NOTES =====
y+=8;doc.setFontSize(9);doc.setFont(undefined,'normal');
doc.text('Los montos corresponden a las fechas indicadas. Si desea conocer los montos a pagar en una fecha distinta,',18,y);
y+=5;doc.text('emita el ticket indicando la nueva fecha de pago.',18,y);

y+=10;doc.setFont(undefined,'bold');
doc.text('El ticket se puede pagar desde el '+dates[0]+' a las 3:00PM hasta el '+t.nd+'. Para pagar después, será',18,y);
y+=5;doc.text('necesario emitirlo nuevamente.',18,y);

y+=10;doc.setFont(undefined,'normal');
doc.text('Puede pagar este ticket en los siguientes bancos:',18,y);
y+=6;doc.setFont(undefined,'bold');
doc.text('- BANBIF',22,y);y+=5;
doc.text('- BBVA - WEB Y AGENTES',22,y);y+=5;
doc.text('- SCOTIABANK',22,y);

y+=10;doc.setFont(undefined,'bold');
doc.text('Para efectuar el pago basta indicar la AFP y el número de ticket, no es necesario imprimir el presente formato.',18,y);

// ===== FOOTER =====
doc.setFontSize(7);doc.setTextColor(150);doc.setFont(undefined,'normal');
doc.text('Documento generado por AFPnet - '+new Date().toLocaleString('es-PE'),14,287);

doc.save('Ticket_'+t.r.afp+'_'+t.tNum+'.pdf');
};

// ===== NUEVA CARGA =====
function nuevaCarga(){document.getElementById('results').classList.remove('vis');planillaData=[];parsedRows=[];resetF();document.getElementById('sel-per').value='';document.getElementById('chk-sem').checked=false;hideE();hideO();scrollTo({top:0,behavior:'smooth'})}

// ===== MODALS =====
function openM(id){document.getElementById(id).classList.add('vis')}
function closeM(id){document.getElementById(id).classList.remove('vis')}