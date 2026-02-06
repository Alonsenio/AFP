<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Módulo REPRO - Consulta de Cuotas</title>
    <link rel="stylesheet" href="./consultas_de_cuotas.css">
     <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- ===== TOP BAR ===== -->
    <?php
        require "../../componentes/topbar.php"
    ?>
    <!-- ===== SIDEBAR ===== -->
    <?php
        require "../../componentes/sidebar.php"
    ?>
    
    <div class="container">
        <!-- Header -->
        <div class="page-banner"><span>MODULO REPRO &gt;</span> CONSULTA DE CONVENIOS REPRO</div>

        <!-- Filtros de Búsqueda -->
        <div class="filtros-container">
            <h2 class="filtros-title">Filtros de Búsqueda</h2>
            
            <form id="formBusqueda" class="form-filtros">
                <!-- AFP -->
                <div class="form-group">
                    <label for="afp">AFP:</label>
                    <select id="afp" name="afp" class="form-control">
                        <option value="">Seleccione</option>
                        <option value="integra">Integra</option>
                        <option value="prima">Prima</option>
                        <option value="profuturo">Profuturo</option>
                        <option value="habitat">Habitat</option>
                    </select>
                </div>

                <!-- Mes de Cuota -->
                <div class="form-group mes-cuota">
                    <label>Mes de Cuota:</label>
                    <div class="input-group">
                        <div class="input-wrapper">
                            <label for="mesInicial" class="sub-label">Inicial</label>
                            <select id="mesInicial" name="mesInicial" class="form-control">
                                <option value="">Seleccione</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <div class="input-wrapper">
                            <label for="mesFinal" class="sub-label">Final</label>
                            <select id="mesFinal" name="mesFinal" class="form-control">
                                <option value="">Seleccione</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                <option value="04">Abril</option>
                                <option value="05">Mayo</option>
                                <option value="06">Junio</option>
                                <option value="07">Julio</option>
                                <option value="08">Agosto</option>
                                <option value="09">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Fecha de Pago -->
                <div class="form-group fecha-pago">
                    <label>Fecha de Pago:</label>
                    <div class="input-group">
                        <div class="input-wrapper">
                            <label for="fechaInicial" class="sub-label">Inicial</label>
                            <input type="date" id="fechaInicial" name="fechaInicial" class="form-control">
                        </div>
                        <div class="input-wrapper">
                            <label for="fechaFinal" class="sub-label">Final</label>
                            <input type="date" id="fechaFinal" name="fechaFinal" class="form-control">
                        </div>
                    </div>
                </div>

                <!-- Banco -->
                <div class="form-group">
                    <label for="banco">Banco:</label>
                    <select id="banco" name="banco" class="form-control">
                        <option value="">Seleccione</option>
                        <option value="bcp">BCP</option>
                        <option value="bbva">BBVA</option>
                        <option value="interbank">Interbank</option>
                        <option value="scotiabank">Scotiabank</option>
                        <option value="banbif">BanBif</option>
                    </select>
                </div>

                <!-- Estado -->
                <div class="form-group">
                    <label for="estado">Estado:</label>
                    <select id="estado" name="estado" class="form-control">
                        <option value="">Seleccione</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="procesado">Procesado</option>
                        <option value="pagado">Pagado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </div>

                <!-- Nº de Ticket -->
                <div class="form-group">
                    <label for="ticket">Nº de Ticket:</label>
                    <input type="text" id="ticket" name="ticket" class="form-control" placeholder="">
                </div>

                <!-- REPRO -->
                <div class="form-group">
                    <label for="repro">REPRO:</label>
                    <select id="repro" name="repro" class="form-control">
                        <option value="">Seleccione</option>
                        <option value="repro1">REPRO 1</option>
                        <option value="repro2">REPRO 2</option>
                        <option value="repro3">REPRO 3</option>
                    </select>
                </div>

                <!-- Botones -->
                <div class="form-buttons">
                    <button type="button" id="btnBuscar" class="btn btn-buscar">BUSCAR</button>
                    <button type="button" id="btnExportar" class="btn btn-exportar">EXPORTAR</button>
                </div>
            </form>
        </div>
    </div>

    <script src="./consultas_de_cuotas.js"></script>
</body>
</html>