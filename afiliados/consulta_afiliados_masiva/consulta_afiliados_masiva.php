<?php
session_start();
$ruc = $_SESSION['afpnet_ruc'] ?? '20603401574';
$usuario = $_SESSION['afpnet_usuario'] ?? 'Usuario';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Consulta de Afiliados Masiva</title>
    <link rel="stylesheet" href="afiliados_masiva.css">
</head>
<body>

<!-- TOPBAR (igual al unitario) -->
<div class="topbar">
    <div class="topbar-left">
        <button class="btn-menu" id="btn-tog">☰</button>
        <div class="topbar-logo">AFPNet <span>SISTEMA</span></div>
        <div class="topbar-info">
            <div class="ruc" id="tb-ruc"><?= $ruc ?></div>
            <div id="tb-razon">EMPRESA S.A.C.</div>
        </div>
    </div>
    <div class="topbar-right">
        <div class="topbar-time" id="tb-time"></div>
        <div class="user-badge">
            <div class="user-avatar"><?= strtoupper(substr($usuario,0,2)) ?></div>
            <span><?= ucfirst($usuario) ?></span>
        </div>
    </div>
</div>

<!-- SIDEBAR -->
<?php
    require "../../componentes/sidebar.php"
?>

<div class="sov" id="sov"></div>

<!-- MAIN -->
<div class="main" id="mc">
    <div class="page-banner">
        AFILIADOS <span> &gt; CONSULTA DE AFILIADOS MASIVA</span>
    </div>

    <div class="content">

        <!-- INFO -->
        <div class="msg msg-info vis">
            Descargue el modelo para la consulta masiva y cargue el archivo Excel.
        </div>

        <!-- CARD -->
        <div class="search-card">

            <div class="search-option">
                <span class="field-label">Periodo de Devengue:</span>
                <select class="search-select" id="periodo">
                    <option value="2026-01">2026-01</option>
                    <option value="2026-02">2026-02</option>
                </select>
            </div>

            <div class="search-option">
                <span class="field-label">Archivo a cargar:</span>
                <input type="file" id="file-excel" class="search-input" accept=".xls,.xlsx">
            </div>

            <div class="search-option">
                <span class="field-label">Texto de la imagen:</span>
                <strong style="letter-spacing:2px">PTA2</strong>
                <input type="text" id="captcha" class="search-input w-doc" placeholder="Ingrese captcha">
            </div>

            <div class="btn-row">
                <button class="btn btn-blue" id="btn-cargar">
                    <span class="spinner"></span>
                    CARGAR
                </button>
            </div>

        </div>

    </div>
</div>

<script src="./consulta_afiliados_masiva.js"></script>
<script>
/* reloj igual al unitario */
function updClk(){
    const n=new Date();
    document.getElementById('tb-time').innerHTML =
        n.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true})+
        '<br>'+n.toLocaleDateString('es-PE');
}
updClk();setInterval(updClk,1000);
</script>

</body>
</html>
