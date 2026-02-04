<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Afiliación Unitaria</title>
    <link rel="stylesheet" href="./afilaicion_unitaria.css">
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
</body>
</html>