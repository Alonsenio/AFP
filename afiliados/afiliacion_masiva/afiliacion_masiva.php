<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFPnet - Afiliación Masiva</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./afiliacion_masiva.css">
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

<!-- CONTENIDO -->
<main class="main" id="mc">
  <div class="page-banner"><span>AFILIADOS &gt;</span> AFILIACIÓN MASIVA</div>

  <div class="content">

    <div class="info-card">
      <div class="info-title">Importante:</div>
      <ul class="info-list">
        <li>Descargue el modelo para la afiliación masiva para Empresa <a href="#" id="lnk-modelo">Aquí</a></li>
        <li>Tipos permitidos: <strong>txt, xls, xlsx, csv</strong></li>
        <li>El sistema guardará los registros por <strong>lotes</strong> y lo almacenará en <strong>localStorage</strong> para consultas posteriores.</li>
      </ul>
    </div>

    <div class="card">
      <div class="msg msg-err" id="m-err"><i class="fas fa-exclamation-circle"></i><span id="m-err-t"></span></div>
      <div class="msg msg-ok" id="m-ok"><i class="fas fa-circle-check"></i><span id="m-ok-t"></span></div>

      <div class="form-row">
        <label class="lbl">Archivo: <span class="req">*</span></label>
        <div class="file-row">
          <input type="file" id="file" class="file"
                 accept=".xlsx,.xls,.csv,.txt,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain">
        </div>
        <div class="hint">Ejemplo (TXT): 10379368 | Nevardo Alcides | Alzamora | Lara | 04/09/1974 | correo@ | fijo | movil | ubigeo | Jr | San Antonio 452 | ... | 0</div>
      </div>

      <div class="btn-row">
        <button class="btn btn-green" id="btn-guia" type="button"><i class="fas fa-book"></i> GUIA DE USO</button>
        <button class="btn btn-orange" id="btn-cargar" type="button">
          <span class="spinner"></span><i class="fas fa-upload"></i> CARGAR
        </button>
      </div>
    </div>

    <!-- RESULTS -->
    <div class="results" id="results">
      <div class="results-head">
        <p class="results-count" id="res-count"></p>

        <!-- Badge para mostrar el código sí o sí -->
        <div style="margin-top:8px;font-size:13px;">
          <strong>Código de Carga:</strong>
          <span id="cod-carga-view" style="display:inline-block;padding:4px 10px;border-radius:10px;background:#e8edf8;color:#1c3997;font-weight:800;">-</span>
        </div>

        <div class="results-actions" style="margin-top:14px;">
          <button class="btn btn-blue" id="btn-export" type="button"><i class="fas fa-file-excel"></i> DESCARGAR EXCEL</button>
          <button class="btn btn-gray" id="btn-clear" type="button"><i class="fas fa-trash"></i> LIMPIAR GUARDADO</button>
        </div>
      </div>

      <div class="tbl-wrap">
        <div class="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th>Código Carga</th>
                <th>Nro Documento</th>
                <th>Nombres</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Fecha Nac.</th>
                <th>Email</th>
                <th>Tel. Fijo</th>
                <th>Tel. Móvil</th>
                <th>Ubigeo</th>
                <th>Tipo Vía</th>
                <th>Nombre Vía</th>
                <th>RUC</th>
                <th>Razón Social</th>
                <th>Usuario Agente</th>
                <th>Origen ONP</th>
              </tr>
            </thead>
            <tbody id="res-body"></tbody>
          </table>
        </div>
      </div>

      <div class="note">
        Se guardó en: <code>localStorage["afpnet_afiliacion_masiva_batches"]</code>
      </div>
    </div>

  </div>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="./afiliacion_masiva.js"></script>
</body>
</html>
