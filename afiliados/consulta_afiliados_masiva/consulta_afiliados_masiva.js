document.getElementById('btn-cargar').addEventListener('click',()=>{

    const file=document.getElementById('file-excel').files[0];
    const captcha=document.getElementById('captcha').value.trim();
    const btn=document.getElementById('btn-cargar');

    if(!file) return alert('Seleccione un archivo');
    if(captcha!=='PTA2') return alert('Captcha incorrecto');

    const fd=new FormData();
    fd.append('archivo',file);

    btn.classList.add('loading');
    btn.disabled=true;

    fetch('procesar_masiva.php',{method:'POST',body:fd})
        .then(r=>r.blob())
        .then(b=>{
            const a=document.createElement('a');
            a.href=URL.createObjectURL(b);
            a.download='Consulta_Afiliados_Masiva.xlsx';
            a.click();
        })
        .finally(()=>{
            btn.classList.remove('loading');
            btn.disabled=false;
        });
});
