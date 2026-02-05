<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AFPnet - Afiliación Unitaria</title>
    <link rel="stylesheet" href="./condiciones_para_afiliar.css">
</head>
<body>
    <!-- TOPBAR -->
    <header class="topbar">
        <div class="topbar-left">
            <div class="topbar-logo" onclick="location.href='../../../inicio/inicio.php'">
                AFPnet<span>PAGO FÁCIL</span>
            </div>
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
    <?php require "../../../componentes/sidebar.php"; ?>

    <!-- CONTENIDO -->
    <main class="main" id="mc">
        <div class="page-banner"><span>AFILIADOS &gt;</span> AFILIACIÓN UNITARIA</div>

        <div class="content">
            <div class="card condiciones">
                <h2>Antes de afiliar a su(s) trabajador(es) confirme lo siguiente:</h2>
                <ul class="condiciones-list">
                    <li>
                        <input type="checkbox" id="chk-nuevos">
                        <label for="chk-nuevos">
                            Para trabajadores nuevos en la empresa se debe tener en cuenta lo siguiente:<br>
                            - Haber entregado el Boletín Informativo al trabajador.<br>
                            - Haber recibido el Formato de Elección del Sistema Pensionario del trabajador o haberse vencido el plazo de 10 días calendario desde la entrega del Boletín Informativo.
                        </label>
                    </li>
                    <li>
                        <input type="checkbox" id="chk-antiguos" checked>
                        <label for="chk-antiguos">
                            Para trabajadores antiguos en la empresa, se sugiere:<br>
                            - Entregar el Boletín Informativo al trabajador.<br>
                            - Contar con el Formato de Elección del Sistema Pensionario del trabajador.
                        </label>
                    </li>
                    <li>
                        <input type="checkbox" id="chk-declaracion" checked>
                        <label for="chk-declaracion">
                            Los datos que ingrese son la base del contrato de afiliación y tienen carácter de declaración jurada. Cualquier información contraria a la verdad podría perjudicar al trabajador y generar una responsabilidad legal.
                        </label>
                    </li>
                    <li>
                        <input type="checkbox" id="chk-contacto" checked>
                        <label for="chk-contacto">
                            Asegúrese que sus datos de contacto siguientes son correctos, si necesita corregirlos contacte al Usuario Administrador de AFPnet de su empresa:<br>
                            - Correo Electrónico: josecalderon1402@gmail.com<br>
                            - Teléfono: 
                        </label>
                    </li>
                    <li>
                        <input type="checkbox" id="chk-datos" checked>
                        <label for="chk-datos">
                            Los datos de dirección, teléfonos y correo electrónico, que usted ingrese en las siguientes pantallas, deben corresponder al trabajador. Por ningún motivo debe ingresar datos del empleador o de un tercero.
                        </label>
                    </li>
                </ul>

                <div class="btn-row">
                    <button class="btn btn-green" id="btn-guia" type="button"><i class="fas fa-book"></i> GUIA DE USO</button>
                    <a href="../vista2/buscar_trabajador.php" class="btn btn-orange"> <i class="fas fa-check"></i> CONFIRMAR </a>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
