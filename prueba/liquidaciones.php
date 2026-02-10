<?php
include('../bd/conexion.php');

$result = null;
$error = null;

$dni = $ap_paterno = $ap_materno = $nombres = "";

/* =====================================
   FUNCIONES Y DATOS AFP REALISTAS
===================================== */

function generarCUSPP() {
    $letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return rand(100000,999999)
        . $letras[rand(0,25)]
        . $letras[rand(0,25)]
        . $letras[rand(0,25)]
        . $letras[rand(0,25)]
        . rand(0,9);
}

/* AFP reales */
$afps = ["PROFUTURO", "PRIMA", "INTEGRA", "HABITAT"];

/* Tipos de comisión */
$tipos_comision = ["Flujo", "Mixta"];

/* Porcentajes reales */
$porcentaje_comision = [
    "Flujo" => [1.47, 1.55, 1.69, 1.74],
    "Mixta" => [0.18, 0.20, 0.23]
];

/* Motivos reales de salida */
$motivos_salida = [
    "Jubilación",
    "Retiro del 95.5%",
    "Invalidez",
    "Fallecimiento"
];

/* =====================================
   PROCESO DE BÚSQUEDA
===================================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $dni        = trim($_POST['dni'] ?? '');
    $ap_paterno = trim($_POST['apellido_paterno'] ?? '');
    $ap_materno = trim($_POST['apellido_materno'] ?? '');
    $nombres    = trim($_POST['nombres'] ?? '');

    if ($dni !== '' && !ctype_digit($dni)) {
        $error = "El DNI debe contener solo números.";
    } else {

        $where = [];
        $params = [];
        $types = "";

        if ($dni !== '') {
            $where[] = "Numero = ?";
            $params[] = $dni;
            $types .= "s";
        }

        if ($ap_paterno !== '') {
            $where[] = "SUBSTRING_INDEX(Apellidos,' ',1) LIKE ?";
            $params[] = "%$ap_paterno%";
            $types .= "s";
        }

        if ($ap_materno !== '') {
            $where[] = "SUBSTRING_INDEX(Apellidos,' ',-1) LIKE ?";
            $params[] = "%$ap_materno%";
            $types .= "s";
        }

        if ($nombres !== '') {
            $where[] = "Nombres LIKE ?";
            $params[] = "%$nombres%";
            $types .= "s";
        }

        $where_sql = $where ? "WHERE " . implode(" AND ", $where) : "";

        $sql = "
            SELECT 
                CONCAT(Tipoidentificacion, ' - ', Numero) AS tipo_nro_documento,
                SUBSTRING_INDEX(Apellidos,' ',1) AS apellido_paterno,
                SUBSTRING_INDEX(Apellidos,' ',-1) AS apellido_materno,
                Nombres
            FROM estudiantes
            $where_sql

            UNION

            SELECT 
                CONCAT('DNI - ', DNI) AS tipo_nro_documento,
                SUBSTRING_INDEX(Apellidos,' ',1) AS apellido_paterno,
                SUBSTRING_INDEX(Apellidos,' ',-1) AS apellido_materno,
                Nombres
            FROM profesores
            " . ($where ? "WHERE " . str_replace("Numero", "DNI", implode(" AND ", $where)) : "");

        $stmt = $conn->prepare($sql);

        if ($params) {
            $stmt->bind_param($types . $types, ...array_merge($params, $params));
        }

        $stmt->execute();
        $result = $stmt->get_result();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>AFPnet - Consulta de Afiliados</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./liquidaciones.css">
</head>

<body>

<div class="main">
<div class="content">

    <!-- BUSQUEDA -->
    <div class="search-card">
        <form method="post">
            <label>DNI</label>
            <input type="text" name="dni" maxlength="8" value="<?= htmlspecialchars($dni) ?>" class="search-input">

            <label>Apellido Paterno</label>
            <input type="text" name="apellido_paterno" value="<?= htmlspecialchars($ap_paterno) ?>" class="search-input">

            <label>Apellido Materno</label>
            <input type="text" name="apellido_materno" value="<?= htmlspecialchars($ap_materno) ?>" class="search-input">

            <label>Nombres</label>
            <input type="text" name="nombres" value="<?= htmlspecialchars($nombres) ?>" class="search-input">

            <br>
            <button class="btn btn-blue">Buscar</button>
        </form>
    </div>

    <!-- ERROR -->
    <?php if ($error): ?>
        <p style="color:#c0392b;"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>

    <!-- RESULTADOS -->
    <?php if ($result && $result->num_rows > 0): ?>
    <div class="tbl-wrap">
        <table>
            <thead>
            <tr>
                <th>Tipo y Nro. Documento</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Nombres</th>
                <th>CUSPP</th>
                <th>Motivo de pensión</th>
                <th>Último devengue en el SPP</th>
                <th>Motivo de salida del SPP</th>
                <th>AFP</th>
                <th>Tipo de Comisión</th>
                <th>Pocentaje de Comisión</th>
            </tr>
            </thead>
            <tbody>

            <?php while ($row = $result->fetch_assoc()): ?>

            <?php
                $cuspp = generarCUSPP();
                $motivo_pension = "Retiro del 95.5%";
                $ultimo_devengue = rand(2019, 2026) . "-" . str_pad(rand(1, 12), 2, "0", STR_PAD_LEFT);
                $motivo_salida = $motivos_salida[array_rand($motivos_salida)];
                $afp = $afps[array_rand($afps)];
                $tipo_comision = $tipos_comision[array_rand($tipos_comision)];

                $porc = $porcentaje_comision[$tipo_comision];
                $porcentaje = number_format($porc[array_rand($porc)], 2) . "%";
            ?>

            <tr>
                <td><?= htmlspecialchars($row['tipo_nro_documento']) ?></td>
                <td><?= htmlspecialchars($row['apellido_paterno']) ?></td>
                <td><?= htmlspecialchars($row['apellido_materno']) ?></td>
                <td><?= htmlspecialchars($row['Nombres']) ?></td>
                <td><?= $cuspp ?></td>
                <td><?= $motivo_pension ?></td>
                <td><?= $ultimo_devengue ?></td>
                <td><?= $motivo_salida ?></td>
                <td><?= $afp ?></td>
                <td><?= $tipo_comision ?></td>
                <td><?= $porcentaje ?></td>
            </tr>

            <?php endwhile; ?>

            </tbody>
        </table>
    </div>
    <?php endif; ?>

</div>
</div>

</body>
</html>
