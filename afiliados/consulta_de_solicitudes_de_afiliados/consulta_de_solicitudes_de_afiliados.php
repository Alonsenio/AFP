<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFPnet - Consulta de Solicitudes de Afiliación</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./consulta_de_solicitudes_de_afiliados.css">
</head>
<body>

<!-- TOPBAR -->
<?php
    require "../../componentes/topbar.php"
?>

<div class="sov" id="sov"></div>

<!-- SIDEBAR -->
<?php require "../../componentes/sidebar.php"; ?>

<!-- MAIN -->
<main class="main" id="mc">
  <div class="page-banner"><span>AFILIADOS &gt;</span> CONSULTA DE SOLICITUDES DE AFILIACIÓN</div>

  <div class="content">

    <div class="card">
      <div class="msg msg-err" id="m-err"><i class="fas fa-exclamation-circle"></i><span id="m-err-t"></span></div>
      <div class="msg msg-ok" id="m-ok"><i class="fas fa-circle-check"></i><span id="m-ok-t"></span></div>

      <div class="grid-2">
        <div class="field">
          <label>Estado de solicitud:</label>
          <select id="sel-estado-sol">
            <option value="">Seleccione</option>
            <option value="REGISTRADA">Registrada</option>
            <option value="OBSERVADA">Observada</option>
            <option value="APROBADA">Aprobada</option>
            <option value="RECHAZADA">Rechazada</option>
          </select>
        </div>

        <div class="field">
          <label>Estado de Pre-Solicitud:</label>
          <select id="sel-estado-pre">
            <option value="">Seleccione</option>
            <option value="SIN_PRE">Sin Pre-Solicitud</option>
            <option value="PRE_REGISTRADA">Pre-Registrada</option>
            <option value="PRE_OBSERVADA">Pre-Observada</option>
          </select>
        </div>

        <div class="field">
          <label>Código de Carga Masiva:</label>
          <input type="text" id="inp-cod-carga" placeholder="">
          <small class="hint">Ejemplo: CM-2026-0001 (si no usas código, se filtra vacío)</small>
        </div>

        <div class="field"></div>
      </div>

      <div class="radio-area">
        <div class="radio-col">
          <label class="radio-label">
            <input type="radio" name="modo" id="r-doc" value="doc" checked>
            Por Documento:
          </label>
        </div>

        <div class="doc-row">
          <label class="lbl-min">Documento de Identidad:</label>
          <select id="sel-tipodoc">
            <option value="">Seleccione</option>
            <option value="DNI">DNI</option>
            <option value="CE">Carnet de Extranjería</option>
            <option value="PAS">Pasaporte</option>
            <option value="PTP">PTP</option>
          </select>
          <input type="text" id="inp-numdoc" placeholder="" maxlength="15">
        </div>

        <div class="radio-col">
          <label class="radio-label">
            <input type="radio" name="modo" id="r-nom" value="nom">
            Por Apellidos y Nombres:
          </label>
        </div>

        <div class="nom-row">
          <label class="lbl-min">Apellido Paterno:</label>
          <input type="text" id="inp-appat" disabled>
          <label class="lbl-min">Apellido Materno:</label>
          <input type="text" id="inp-apmat" disabled>
          <label class="lbl-min">Nombres:</label>
          <input type="text" id="inp-nombres" disabled>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-green" id="btn-guia" type="button"><i class="fas fa-book"></i> GUIA DE USO</button>
        <button class="btn btn-orange" id="btn-buscar" type="button">
          <span class="spinner"></span><i class="fas fa-search"></i> BUSCAR
        </button>
        <button class="btn btn-green" id="btn-descargar" type="button"><i class="fas fa-download"></i> DESCARGAR</button>
      </div>
    </div>

    <div class="results" id="results">
      <h3 class="res-title">Resultados de Búsqueda</h3>
      <p class="res-sub" id="res-msg">No se encontraron resultados en la búsqueda.</p>

      <div class="tbl-wrap" id="tbl-wrap">
        <div class="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th>Código Carga</th>
                <th>Estado Solicitud</th>
                <th>Estado Pre</th>
                <th>Tipo Doc</th>
                <th>Nro Doc</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Nombres</th>
                <th>RUC</th>
                <th>Razón Social</th>
                <th>Usuario Agente</th>
                <th>Origen ONP</th>
                <th>Fecha Nac.</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody id="res-body"></tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="./consulta_de_solicitudes_de_afiliados.js"></script>
</body>
</html>