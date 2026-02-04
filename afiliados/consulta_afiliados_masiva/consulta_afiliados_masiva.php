<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFPnet - Consulta de Afiliados Masiva</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./consulta_afiliados_masiva.css">
</head>
<body>

<!-- TOPBAR -->
<header class="topbar">
  <div class="topbar-left">
    <div class="topbar-logo" onclick="location.href='../../inicio/inicio.php'">AFPnet<span>PAGO FÁCIL</span></div>
    <button class="btn-menu" id="btn-tog" type="button"><i class="fas fa-bars"></i></button>

    <div class="topbar-info">
      <span class="ruc" id="tb-ruc">20100000001</span> - <span id="tb-razon">EMPRESA</span><br>
      Bienvenido Sr(a). <strong id="w-name">Usuario</strong> (<span id="w-perfil">Administrador</span>)
    </div>
  </div>

  <div class="topbar-right">
    <div class="topbar-time" id="tb-time"></div>
    <div class="user-badge">
      <div class="user-avatar" id="u-init">U</div>
      <span id="u-name">Usuario</span>
    </div>
  </div>
</header>

<div class="sov" id="sov"></div>

<!-- SIDEBAR -->
<?php require "../../componentes/sidebar.php"; ?>

<!-- MAIN -->
<main class="main" id="mc">
  <div class="page-banner"><span>AFILIADOS &gt;</span> CONSULTA DE AFILIADOS MASIVA</div>

  <div class="content">

    <div class="info-card">
      <div class="info-title">Importante:</div>
      <ul class="info-list">
        <li>Sube un archivo <strong>Excel (.xlsx / .xls)</strong> o <strong>CSV (.csv)</strong>.</li>
        <li>Formato por fila: <strong>TipoDocCode</strong>, <strong>NroDoc</strong>, <strong>Apellido Paterno</strong>, <strong>Apellido Materno</strong>, <strong>Nombres</strong>.</li>
        
      </ul>
    </div>

    <div class="search-card">
      <div class="msg msg-err" id="m-err"><i class="fas fa-exclamation-circle"></i><span id="m-err-t"></span></div>
      <div class="msg msg-ok" id="m-ok"><i class="fas fa-circle-check"></i><span id="m-ok-t"></span></div>

      <div class="form-grid">
        <div class="form-group">
          <label class="lbl">Periodo de Devengue (opcional)</label>
          <input type="month" class="inp" id="inp-dev" value="">
          <small class="hint">Si lo llenas, se usará como referencia. Si no, se autogenera.</small>
        </div>

        <div class="form-group">
          <label class="lbl">Archivo a cargar *</label>
          <div class="file-row">
            <input type="file" id="file" class="file"
              accept=".xlsx,.xls,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv">
            <button class="btn btn-gray" id="btn-modelo" type="button">
              <i class="fas fa-download"></i> MODELO
            </button>
          </div>
          <small class="hint">.xlsx recomendado. .xls soportado. CSV también.</small>
        </div>
      </div>

      <div class="captcha-card">
        <div class="captcha-row">
          <div class="captcha-img" id="captcha-display">----</div>
          <button type="button" class="captcha-refresh" id="btn-capref" title="Refrescar captcha">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>

        <div class="captcha-inp">
          <label class="lbl">Texto de la imagen *</label>
          <input type="text" class="inp" id="captcha-input" maxlength="4" autocomplete="off" style="text-transform:uppercase">
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-green" id="btn-guia" type="button"><i class="fas fa-book"></i> GUIA DE USO</button>
        <button class="btn btn-orange" id="btn-procesar" type="button">
          <span class="spinner"></span><i class="fas fa-upload"></i> PROCESAR
        </button>
      </div>
    </div>

    <div class="results" id="results">
      <div class="results-head">
        <p class="results-count" id="res-count"></p>
        <div class="results-actions">
          <button class="btn btn-blue" id="btn-export" type="button"><i class="fas fa-file-excel"></i> DESCARGAR EXCEL</button>
        </div>
      </div>

      <div class="tbl-wrap">
        <div class="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th>Tipo y Nro. Documento</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Nombres</th>
                <th>CUSPP</th>
                <th>Devengue máximo<br>para aportar</th>
                <th>Motivo de pensión</th>
                <th>AFP</th>
                <th>Tipo de Comisión</th>
                <th>% de Comisión</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody id="res-body"></tbody>
          </table>
        </div>
      </div>

      <div class="note">
        <strong>*Nota:</strong> Demo sin BD real. Genera “data faltante” con reglas + BD simulada.
      </div>
    </div>

  </div>
</main>

<!-- SOLO SCRIPTS EXTERNOS (sin addEventListener en PHP) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="./consulta_afiliados_masiva.js"></script>
</body>
</html>