// datos_trabajador.js

const userRUC = sessionStorage.getItem("afpnet_ruc") || "20603401574";
const uName = sessionStorage.getItem("afpnet_usuario") || "Usuario";

window.addEventListener("DOMContentLoaded", () => {
  // Topbar
  const dn = uName.charAt(0).toUpperCase() + uName.slice(1);
  document.getElementById("w-name").textContent = dn;
  document.getElementById("u-name").textContent = dn;
  document.getElementById("u-init").textContent = dn.substring(0, 2).toUpperCase();
  document.getElementById("tb-ruc").textContent = userRUC;
  document.getElementById("tb-razon").textContent = "EMPRESA S.A.C.";
  updClk();
  setInterval(updClk, 1000);

  

  // Cargar trabajador desde sessionStorage
  const raw = sessionStorage.getItem("afpnet_selected_worker");
  if (!raw) {
    alert("No hay trabajador seleccionado. Regrese a la búsqueda.");
    window.location.href = "./buscar_trabajador.php";
    return;
  }
  const w = JSON.parse(raw);

  // Datos de solicitud
  document.getElementById("solicitud_num").value = "SOL-" + Date.now();
  document.getElementById("solicitud_fecha").value = new Date().toLocaleDateString("es-PE");
  document.getElementById("solicitud_razon").value = document.getElementById("tb-razon").textContent;

  // Nombres
  const parts = (w.nombres || "").trim().split(/\s+/).filter(Boolean);
  const pnom = parts[0] || "";
  const snom = parts.slice(1).join(" ") || ""; // si quieres solo 1 palabra: parts[1] || ""

  setVal("t_pnom", pnom);
  setVal("t_snom", snom);
  setVal("t_appat", w.appat || "");
  setVal("t_apmat", w.apmat || "");
  setVal("t_tipodoc", w.tipodoc || "");
  setVal("t_numdoc", w.numdoc || "");
  setVal("t_fechanac", w.fechanac || "");

  // Selects disabled
  document.getElementById("t_sexo").value = w.sexo || "MASCULINO";
  document.getElementById("t_estcivil").value = w.estcivil || "SOLTERO";

  // Lugar nacimiento
  setVal("t_dep", w.depNac || "");
  setVal("t_prov", w.provNac || "");
  setVal("t_dist", w.distNac || "");
  setVal("t_nac", w.nacionalidad || "PERÚ");

  // Datos AFP opcional
  const hasAFP = !!(w.cuspp && w.cuspp.trim()) || !!(w.afp && w.afp.trim());
  const afpTitle = document.getElementById("afp_title");
  const afpBox = document.getElementById("afp_box");

  if (hasAFP) {
    afpTitle.style.display = "block";
    afpBox.style.display = "grid";
    setVal("t_cuspp", w.cuspp || "");
    setVal("t_afp", w.afp || "");
    setVal("t_tipocom", w.tipocom || "");
    setVal("t_pctcom", w.pctcom || "");
    setVal("t_devmax", w.devmax || "");
    setVal("t_motivo", w.motivo || "");
  }

  // Relación laboral
  setVal("rl_ruc", userRUC);

  // Botones
  document.getElementById("btn-cancelar").addEventListener("click", () => {
    window.location.href = "./buscar_trabajador.php";
  });

  document.getElementById("btn-confirmar").addEventListener("click", () => {
    // Validación rápida de obligatorios
    const reqIds = ["d_tipovia","d_nombrevia","d_dep","d_prov","d_dist","c_mail1","c_movil","rl_inicio"];
    for (const id of reqIds) {
      const el = document.getElementById(id);
      if (!el.value || !el.value.trim()) {
        el.focus();
        alert("Complete los campos obligatorios (*) antes de confirmar.");
        return;
      }
    }

    const payload = {
      trabajador: w,
      direccion: {
        tipoVia: v("d_tipovia"),
        nombreVia: v("d_nombrevia"),
        numero: v("d_numero"),
        tipoLocalidad: v("d_tipoloc"),
        nombreLocalidad: v("d_nombreloc"),
        referencia: v("d_ref"),
        dep: v("d_dep"),
        prov: v("d_prov"),
        dist: v("d_dist")
      },
      contacto: {
        mail1: v("c_mail1"),
        mail2: v("c_mail2"),
        fijo: v("c_fijo"),
        movil: v("c_movil"),
        envioEstadoCuenta: document.getElementById("c_envio").checked
      },
      relacionLaboral: {
        empleadorRuc: v("rl_ruc"),
        tipoTrabajador: v("rl_tipotrab"),
        origen: document.querySelector('input[name="origen"]:checked')?.value || "",
        fechaInicio: v("rl_inicio")
      },
      fechaRegistro: new Date().toISOString()
    };

    // Guardado simulado
    sessionStorage.setItem("afpnet_last_affiliation", JSON.stringify(payload));
    alert("Registro completado (simulado). Se guardó en sessionStorage: afpnet_last_affiliation");
  });
});

function setVal(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value ?? "";
}
function v(id) {
  return (document.getElementById(id)?.value || "").trim();
}

function updClk() {
  const n = new Date();
  document.getElementById("tb-time").innerHTML =
    n.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }) +
    "<br>" +
    n.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
}



// Si tu sidebar.php usa estas funciones:
function togSub(el){
  const sub=el.nextElementSibling;if(!sub)return;
  const op=sub.classList.contains('open');
  document.querySelectorAll('.submenu.open').forEach(s=>{if(s!==sub){s.classList.remove('open');s.previousElementSibling.classList.remove('open')}});  
  if(!op){sub.classList.add('open');el.classList.add('open')}else{sub.classList.remove('open');el.classList.remove('open')}
}
function cerrarSesion(){sessionStorage.clear();location.href='../../login/login.php'}