/*
// Base de datos local (COMENTADA - ahora se usa consulta al servidor)
*/

// ===== GLOBALS =====
const userRUC = sessionStorage.getItem("afpnet_ruc") || "20603401574";
const uName = sessionStorage.getItem("afpnet_nombre") || "Usuario";
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

function showInfo(m) {
  const infoEl = document.getElementById("m-info");
  if (infoEl) {
    document.getElementById("m-info-t").textContent = m;
    infoEl.classList.add("vis");
  }
}
function hideInfo() {
  const infoEl = document.getElementById("m-info");
  if (infoEl) infoEl.classList.remove("vis");
}

// ===== SEARCH =====
function onBuscar() {
  hideE();
  hideInfo();
  selectedAffiliate = null;

  const section = document.getElementById("results");
  section.classList.remove("vis");

  const tipo = document.getElementById("sel-tipodoc").value; // puede ser "" (todos)
  const num = document.getElementById("inp-numdoc").value.trim();

  if (!num) {
    showE("Debe ingresar el número de documento.");
    return;
  }

  // Preparar datos del formulario
  const formData = new FormData();
  formData.append('numdoc', num);
  formData.append('tipodoc', tipo);

  // Loading effect
  const btn = document.getElementById("btn-buscar");
  btn.classList.add("loading");
  btn.disabled = true;

  // Realizar petición AJAX
  fetch('./buscar_trabajador_backend.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return response.json();
  })
  .then(data => {
    btn.classList.remove("loading");
    btn.disabled = false;

    if (data.success) {
      // Mostrar mensaje informativo si se usan datos locales
      if (data.info) {
        showInfo(data.info);
      }
      renderResults(data.data);
    } else {
      showE(data.error || 'Error al realizar la búsqueda');
    }
  })
  .catch(error => {
    btn.classList.remove("loading");
    btn.disabled = false;
    showE('Error de conexión con el servidor. Usando datos locales de respaldo.');
    console.error('Error:', error);
  });
}

// ===== RENDER RESULTS =====
function renderResults(data) {
  const section = document.getElementById("results");
  const thead = document.querySelector("#results table thead tr");
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

  // Detectar si algún registro tiene AFP
  const tieneAFP = data.some(a => a.cuspp && a.cuspp !== "");

  // Cambiar encabezados según si tiene AFP o no
  if (tieneAFP) {
    // ESTRUCTURA 2: CON AFP
    thead.innerHTML = `
      <th>CUSPP</th>
      <th>AFP</th>
      <th>Tipo Doc</th>
      <th>Numero Doc</th>
      <th>Apellido Paterno</th>
      <th>Apellido Materno</th>
      <th>Nombres</th>
      <th>Fecha Nacimiento</th>
    `;
  } else {
    // ESTRUCTURA 1: SIN AFP
    thead.innerHTML = `
      <th>DNI</th>
      <th>Apellido Paterno</th>
      <th>Apellido Materno</th>
      <th>Nombres</th>
      <th>Fecha Nacimiento</th>
      <th>Sexo</th>
      <th>Estado Civil</th>
    `;
  }

  data.forEach(a => {
    const tr = document.createElement("tr");

    // dataset para identificar
    tr.dataset.tipodoc = a.tipodoc;
    tr.dataset.numdoc = a.numdoc;

    // Renderizar según estructura
    if (tieneAFP) {
      // ESTRUCTURA 2: CON AFP
      tr.innerHTML = `
        <td style="font-weight:600;color:var(--blue)">${a.cuspp || "-"}</td>
        <td style="font-weight:600">${a.afp || ""}</td>
        <td>${a.tipodoc}</td>
        <td style="font-weight:600">${a.numdoc}</td>
        <td>${a.appat}</td>
        <td>${a.apmat}</td>
        <td>${a.nombres}</td>
        <td>${a.fechanac || "-"}</td>
      `;
    } else {
      // ESTRUCTURA 1: SIN AFP
      tr.innerHTML = `
        <td style="font-weight:600">${a.numdoc}</td>
        <td>${a.appat}</td>
        <td>${a.apmat}</td>
        <td>${a.nombres}</td>
        <td>${a.fechanac || "-"}</td>
        <td>${a.sexo || "-"}</td>
        <td>${a.estcivil || "-"}</td>
      `;
    }

    tr.addEventListener("click", () => {
      tbody.querySelectorAll("tr").forEach(r => r.classList.remove("sel"));
      tr.classList.add("sel");
      selectedAffiliate = a;
    });

    // Doble clic: quitar selección
    tr.addEventListener("dblclick", () => {
      tr.classList.remove("sel");
      selectedAffiliate = null;
    });

    tbody.appendChild(tr);
  });

  section.classList.add("vis");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}