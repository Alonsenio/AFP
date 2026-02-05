
const affiliatesDB = [
  // --- TIPO A (sin AFP) ---
  {
    tipodoc: "DNI",
    numdoc: "77658978",
    appat: "ALBUJAR",
    apmat: "TORRES",
    nombres: "FELIX ALONSO",
    fechanac: "1998-04-02",
    sexo: "MASCULINO",
    estcivil: "SOLTERO",
    depNac: "ICA",
    provNac: "ICA",
    distNac: "ICA",
    nacionalidad: "PERÚ",

    // AFP opcional (vacío en tipo A)
    cuspp: "",
    afp: "",
    tipocom: "",
    pctcom: "",
    devmax: "",
    motivo: ""
  },
  {
    tipodoc: "DNI",
    numdoc: "32165498",
    appat: "MENDEZ",
    apmat: "GONZALES",
    nombres: "PEDRO LUIS",
    fechanac: "1995-11-18",
    sexo: "MASCULINO",
    estcivil: "CASADO",
    depNac: "LIMA",
    provNac: "LIMA",
    distNac: "ATE",
    nacionalidad: "PERÚ",
    cuspp: "",
    afp: "",
    tipocom: "",
    pctcom: "",
    devmax: "",
    motivo: ""
  },

  // --- TIPO B (con AFP) ---
  {
    tipodoc: "DNI",
    numdoc: "10379368",
    appat: "ALZAMORA",
    apmat: "LARA",
    nombres: "NEVARDO ALCIDES",
    fechanac: "1989-06-10",
    sexo: "MASCULINO",
    estcivil: "SOLTERO",
    depNac: "PIURA",
    provNac: "PIURA",
    distNac: "CASTILLA",
    nacionalidad: "PERÚ",

    cuspp: "572741NALAA6",
    afp: "INTEGRA",
    tipocom: "Mixta",
    pctcom: "1.55%",
    devmax: "2026-01",
    motivo: "Retiro del 95.5%"
  },
  {
    tipodoc: "DNI",
    numdoc: "45678912",
    appat: "GARCIA",
    apmat: "LOPEZ",
    nombres: "MARIA ELENA",
    fechanac: "1993-02-21",
    sexo: "FEMENINO",
    estcivil: "SOLTERA",
    depNac: "AREQUIPA",
    provNac: "AREQUIPA",
    distNac: "YANAHUARA",
    nacionalidad: "PERÚ",

    cuspp: "612345MGLPE2",
    afp: "PRIMA",
    tipocom: "Flujo",
    pctcom: "1.69%",
    devmax: "2026-02",
    motivo: ""
  },
  {
    tipodoc: "CE",
    numdoc: "CE201456",
    appat: "TORRES",
    apmat: "SILVA",
    nombres: "ANA PATRICIA",
    fechanac: "1990-09-03",
    sexo: "FEMENINO",
    estcivil: "CASADA",
    depNac: "CUSCO",
    provNac: "CUSCO",
    distNac: "WANCHAQ",
    nacionalidad: "PERÚ",

    cuspp: "623456APTSI1",
    afp: "INTEGRA",
    tipocom: "Mixta",
    pctcom: "1.55%",
    devmax: "2026-01",
    motivo: ""
  }
];

// ===== GLOBALS =====
const userRUC = sessionStorage.getItem("afpnet_ruc") || "20603401574";
const uName = sessionStorage.getItem("afpnet_usuario") || "Usuario";
let selectedAffiliate = null;

// ===== INIT =====
window.addEventListener("DOMContentLoaded", () => {
  const dn = uName.charAt(0).toUpperCase() + uName.slice(1);
  document.getElementById("w-name").textContent = dn;
  document.getElementById("u-name").textContent = dn;
  document.getElementById("u-init").textContent = dn.substring(0, 2).toUpperCase();
  document.getElementById("tb-ruc").textContent = userRUC;
  document.getElementById("tb-razon").textContent = "EMPRESA S.A.C.";

  updClk();
  setInterval(updClk, 1000);

  // Sidebar
  setupSidebar();

  // Buscar
  document.getElementById("btn-buscar").addEventListener("click", onBuscar);

  // Enter en input
  document.querySelectorAll(".search-input").forEach(inp => {
    inp.addEventListener("keypress", e => {
      if (e.key === "Enter") document.getElementById("btn-buscar").click();
    });
  });

  // Solo números si el tipo es DNI
  document.getElementById("inp-numdoc").addEventListener("input", function () {
    const tipo = document.getElementById("sel-tipodoc").value;
    if (!tipo || tipo === "DNI") this.value = this.value.replace(/[^0-9]/g, "");
  });

  // Continuar
  document.getElementById("btn-continuar").addEventListener("click", () => {
    if (!selectedAffiliate) {
      alert("Seleccione un trabajador de la tabla antes de continuar.");
      return;
    }
    sessionStorage.setItem("afpnet_selected_worker", JSON.stringify(selectedAffiliate));
    window.location.href = `../vista3/datos_trabajador.php`;
  });
});

function updClk() {
  const n = new Date();
  document.getElementById("tb-time").innerHTML =
    n.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }) +
    "<br>" +
    n.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// ===== SIDEBAR =====
function setupSidebar() {
  const sb = document.getElementById("sb"),
    mc = document.getElementById("mc"),
    sov = document.getElementById("sov");

  document.getElementById("btn-tog").onclick = () => {
    if (innerWidth <= 768) {
      sb.classList.toggle("mob");
      sov.classList.toggle("vis");
    } else {
      sb.classList.toggle("collapsed");
      mc.classList.toggle("exp");
    }
  };
  sov.onclick = () => {
    sb.classList.remove("mob");
    sov.classList.remove("vis");
  };
}

// Si tu sidebar.php usa esta función:
function togSub(el) {
  const sub = el.nextElementSibling;
  if (!sub) return;
  const op = sub.classList.contains("open");
  document.querySelectorAll(".submenu.open").forEach(s => {
    if (s !== sub) {
      s.classList.remove("open");
      s.previousElementSibling.classList.remove("open");
    }
  });
  if (!op) {
    sub.classList.add("open");
    el.classList.add("open");
  } else {
    sub.classList.remove("open");
    el.classList.remove("open");
  }
}
function cerrarSesion() {
  sessionStorage.clear();
  location.href = "../../login/login.php";
}

// ===== MESSAGES =====
function showE(m) {
  document.getElementById("m-err-t").textContent = m;
  document.getElementById("m-err").classList.add("vis");
}
function hideE() {
  document.getElementById("m-err").classList.remove("vis");
}

// ===== SEARCH =====
function onBuscar() {
  hideE();
  selectedAffiliate = null;

  const section = document.getElementById("results");
  section.classList.remove("vis");

  const tipo = document.getElementById("sel-tipodoc").value; // puede ser "" (todos)
  const num = document.getElementById("inp-numdoc").value.trim();

  if (!num) {
    showE("Debe ingresar el número de documento.");
    return;
  }

  let results = affiliatesDB.filter(a => {
    const matchNum = a.numdoc.includes(num);
    const matchTipo = !tipo || a.tipodoc === tipo;
    return matchNum && matchTipo;
  });

  // Loading effect
  const btn = document.getElementById("btn-buscar");
  btn.classList.add("loading");
  btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove("loading");
    btn.disabled = false;
    renderResults(results);
  }, 600);
}

// ===== RENDER RESULTS =====
function renderResults(data) {
  const section = document.getElementById("results");
  const tbody = document.getElementById("res-body");
  const countEl = document.getElementById("res-count");

  tbody.innerHTML = "";

  if (data.length === 0) {
    countEl.innerHTML = 'Se ha encontrado <strong>0</strong> registros.';
    section.classList.add("vis");
    return;
  }

  countEl.innerHTML =
    'Se ha encontrado <strong>' +
    data.length +
    "</strong> registro" +
    (data.length > 1 ? "s" : "") +
    ". (Haga clic en una fila para seleccionar)";

  data.forEach(a => {
    const tr = document.createElement("tr");

    // dataset para identificar
    tr.dataset.tipodoc = a.tipodoc;
    tr.dataset.numdoc = a.numdoc;

    tr.innerHTML = `
      <td style="font-weight:600">${a.tipodoc} - ${a.numdoc}</td>
      <td>${a.appat}</td>
      <td>${a.apmat}</td>
      <td>${a.nombres}</td>
      <td style="font-weight:600;color:var(--blue)">${a.cuspp ? a.cuspp : "-"}</td>
      <td>${a.devmax ? a.devmax : "-"}</td>
      <td>${a.motivo ? a.motivo : "-"}</td>
      <td style="font-weight:600">${a.afp ? a.afp : "-"}</td>
      <td>${a.tipocom ? a.tipocom : "-"}</td>
      <td>${a.pctcom ? a.pctcom : "-"}</td>
    `;

    tr.addEventListener("click", () => {
      // quitar selección previa
      tbody.querySelectorAll("tr").forEach(r => r.classList.remove("sel"));
      tr.classList.add("sel");
      selectedAffiliate = a;
    });

    tbody.appendChild(tr);
  });

  section.classList.add("vis");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}
