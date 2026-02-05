<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFPnet - Afiliación del trabajador</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./datos_trabajador.css">
</head>
<body>

<!-- TOPBAR -->
<header class="topbar">
  <div class="topbar-left">
    <div class="topbar-logo" onclick="location.href='../../inicio/inicio.php'">AFPnet<span>PAGO FÁCIL</span></div>
    <button class="btn-menu" id="btn-tog"><i class="fas fa-bars"></i></button>
    <div class="topbar-info">
      <span class="ruc" id="tb-ruc">20100000001</span> - <span id="tb-razon">EMPRESA</span><br>
      Bienvenido Sr(a). <strong id="w-name">Usuario</strong> (Administrador)
    </div>
  </div>
  <div class="topbar-right">
    <div class="topbar-time" id="tb-time"></div>
    <div class="user-badge"><div class="user-avatar" id="u-init">U</div><span id="u-name">Usuario</span></div>
  </div>
</header>

<div class="sov" id="sov"></div>

<!-- SIDEBAR -->
<?php require "../../../componentes/sidebar.php"; ?>

<!-- CONTENIDO -->
<main class="main" id="mc">
  <div class="page-banner"><span>AFILIADOS &gt;</span> AFILIACIÓN DEL TRABAJADOR</div>

  <div class="content">
    <div class="form-card">
      <div class="form-title">AFILIACIÓN DEL TRABAJADOR</div>

      <!-- DATOS SOLICITUD -->
      <div class="section">
        <div class="section-title">Datos de la Solicitud:</div>

        <div class="grid-3">
          <div class="field">
            <label>N° de Solicitud:</label>
            <input type="text" id="solicitud_num" readonly>
          </div>
          <div class="field">
            <label>Fecha de Solicitud:</label>
            <input type="text" id="solicitud_fecha" readonly>
          </div>
          <div class="field span-3">
            <label>Razón Social:</label>
            <input type="text" id="solicitud_razon" readonly>
          </div>
        </div>
      </div>

      <!-- DATOS TRABAJADOR -->
      <div class="section">
        <div class="section-title">Datos del trabajador:</div>

        <div class="grid-2">
          <div class="field">
            <label>Primer Nombre:</label>
            <input type="text" id="t_pnom" readonly>
          </div>
          <div class="field">
            <label>Segundo Nombre:</label>
            <input type="text" id="t_snom" readonly>
          </div>

          <div class="field">
            <label>Apellido Paterno:</label>
            <input type="text" id="t_appat" readonly>
          </div>
          <div class="field">
            <label>Apellido Materno:</label>
            <input type="text" id="t_apmat" readonly>
          </div>

          <div class="field">
            <label>* Sexo:</label>
            <select id="t_sexo" disabled>
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
            </select>
          </div>
          <div class="field">
            <label>* Estado Civil:</label>
            <select id="t_estcivil" disabled>
              <option value="SOLTERO">SOLTERO</option>
              <option value="SOLTERA">SOLTERA</option>
              <option value="CASADO">CASADO</option>
              <option value="CASADA">CASADA</option>
              <option value="CONVIVIENTE">CONVIVIENTE</option>
              <option value="DIVORCIADO">DIVORCIADO</option>
              <option value="VIUDO">VIUDO</option>
            </select>
          </div>

          <div class="field">
            <label>Tipo DI:</label>
            <input type="text" id="t_tipodoc" readonly>
          </div>
          <div class="field">
            <label>Número DI:</label>
            <input type="text" id="t_numdoc" readonly>
          </div>

          <div class="field">
            <label>Fecha de Nacimiento:</label>
            <input type="text" id="t_fechanac" readonly>
          </div>
        </div>

        <div class="sub-title">Lugar de Nacimiento:</div>
        <div class="grid-3">
          <div class="field">
            <label>Departamento:</label>
            <input type="text" id="t_dep" readonly>
          </div>
          <div class="field">
            <label>Provincia:</label>
            <input type="text" id="t_prov" readonly>
          </div>
          <div class="field">
            <label>Distrito:</label>
            <input type="text" id="t_dist" readonly>
          </div>
          <div class="field">
            <label>Nacionalidad:</label>
            <input type="text" id="t_nac" readonly>
          </div>
        </div>

        <!-- DATOS AFP (solo si existe CUSPP/AFP) -->
        <div class="sub-title" id="afp_title" style="display:none;">Datos AFP:</div>
        <div class="grid-3" id="afp_box" style="display:none;">
          <div class="field">
            <label>CUSPP:</label>
            <input type="text" id="t_cuspp" readonly>
          </div>
          <div class="field">
            <label>AFP:</label>
            <input type="text" id="t_afp" readonly>
          </div>
          <div class="field">
            <label>Tipo de Comisión:</label>
            <input type="text" id="t_tipocom" readonly>
          </div>
          <div class="field">
            <label>% Comisión:</label>
            <input type="text" id="t_pctcom" readonly>
          </div>
          <div class="field">
            <label>Devengue máximo:</label>
            <input type="text" id="t_devmax" readonly>
          </div>
          <div class="field span-3">
            <label>Motivo de pensión:</label>
            <input type="text" id="t_motivo" readonly>
          </div>
        </div>
      </div>

      <!-- DIRECCIÓN -->
      <div class="section">
        <div class="section-title">Dirección del trabajador:</div>

        <div class="grid-2">
          <div class="field">
            <label>* Tipo de Vía:</label>
            <select name="tipo_via" id="d_tipovia" required>
              <option value="">Seleccione</option>
              <option>AV</option>
              <option>JR</option>
              <option>CALLE</option>
              <option>PASAJE</option>
              <option>CARRETERA</option>
            </select>
          </div>
          <div class="field">
            <label>* Nombre de la Vía:</label>
            <input type="text" name="nombre_via" id="d_nombrevia" required>
          </div>

          <div class="field">
            <label>Número:</label>
            <input type="text" name="numero" id="d_numero">
          </div>
          <div class="field">
            <label>Tipo de Localidad:</label>
            <select name="tipo_localidad" id="d_tipoloc">
              <option value="">Seleccione</option>
              <option>URB</option>
              <option>AA.HH</option>
              <option>CP</option>
              <option>ASOC</option>
            </select>
          </div>

          <div class="field">
            <label>Nombre de Localidad:</label>
            <input type="text" name="nombre_localidad" id="d_nombreloc">
          </div>
          <div class="field span-2">
            <label>Referencia:</label>
            <input type="text" name="referencia" id="d_ref">
          </div>

          <div class="field">
            <label>* Departamento:</label>
            <input type="text" name="dep_dir" id="d_dep" required>
          </div>
          <div class="field">
            <label>* Provincia:</label>
            <input type="text" name="prov_dir" id="d_prov" required>
          </div>
          <div class="field">
            <label>* Distrito:</label>
            <input type="text" name="dist_dir" id="d_dist" required>
          </div>
        </div>
      </div>

      <!-- CONTACTO -->
      <div class="section">
        <div class="section-title">Datos de contacto del trabajador:</div>

        <div class="grid-2">
          <div class="field">
            <label>* Correo Electrónico Principal:</label>
            <input type="email" id="c_mail1" required>
          </div>
          <div class="field">
            <label>Correo Electrónico Secundario:</label>
            <input type="email" id="c_mail2">
          </div>

          <div class="field">
            <label>Teléfono Fijo:</label>
            <input type="text" id="c_fijo" placeholder="">
          </div>
          <div class="field">
            <label>* Teléfono Móvil:</label>
            <input type="text" id="c_movil" required>
          </div>

          <div class="field span-2 checkline">
            <label class="chk">
              <input type="checkbox" id="c_envio">
              Envío de estado de cuenta por correo electrónico
            </label>
          </div>
        </div>
      </div>

      <!-- RELACIÓN LABORAL -->
      <div class="section">
        <div class="section-title">Datos de la relación laboral:</div>

        <div class="grid-2">
          <div class="field">
            <label>Empleador:</label>
            <input type="text" id="rl_ruc" readonly>
          </div>

          <div class="field">
            <label>Tipo de trabajador:</label>
            <select id="rl_tipotrab">
              <option value="DEPENDIENTE">DEPENDIENTE</option>
              <option value="INDEPENDIENTE">INDEPENDIENTE</option>
            </select>
          </div>
        </div>

        <div class="radbox">
          <div class="rad-title">Origen:</div>
          <label><input type="radio" name="origen" value="PRIMER EMPLEO" checked> PRIMER EMPLEO</label>
          <label><input type="radio" name="origen" value="DECRETO LEY 19990"> DECRETO LEY 19990</label>
          <label><input type="radio" name="origen" value="DECRETO LEY 20530"> DECRETO LEY 20530</label>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>* Fecha de inicio de labores:</label>
            <input type="date" id="rl_inicio" required>
          </div>
        </div>

        <div class="note">
          Los campos marcados con asterisco (*) son obligatorios.
        </div>
      </div>

      <div class="btns">
        <button class="btn btn-blue" id="btn-confirmar" type="button">CONFIRMAR</button>
        <button class="btn btn-gray" id="btn-cancelar" type="button">CANCELAR</button>
      </div>

    </div>
  </div>
</main>

<script src="./datos_trabajador.js"></script>
</body>
</html>
