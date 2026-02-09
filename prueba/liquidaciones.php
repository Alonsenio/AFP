<?php
include('../bd/conexion.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['dni'])) {
    $dni = $_POST['dni'];

    // Consulta a la base de datos para obtener los datos de la tabla "profesores" y "estudiantes"
    $sql = "SELECT Tipo, `Nro. Documento`, `Apellido Paterno`, `Apellido Materno`, Nombres
            FROM (SELECT Tipo, `Nro. Documento`, `Apellido Paterno`, `Apellido Materno`, Nombres FROM profesores 
                  UNION ALL
                  SELECT Tipo, `Nro. Documento`, `Apellido Paterno`, `Apellido Materno`, Nombres FROM estudiantes) AS combined
            WHERE `Nro. Documento` = '$dni'";

    $result = $conn->query($sql);

    // Verificar si se encontró un resultado
    if ($result->num_rows > 0) {
        // Mostrar los resultados
        while ($row = $result->fetch_assoc()) {
            echo "Tipo de Documento: " . $row['Tipo'] . "<br>";
            echo "Número de Documento: " . $row['Nro. Documento'] . "<br>";
            echo "Apellido Paterno: " . $row['Apellido Paterno'] . "<br>";
            echo "Apellido Materno: " . $row['Apellido Materno'] . "<br>";
            echo "Nombres: " . $row['Nombres'] . "<br><br>";
        }
    } else {
        echo "No se encontraron registros con el DNI ingresado.";
    }
}
?>

<!-- Formulario para ingresar el DNI -->
<form method="post" action="">
    <label for="dni">Ingrese DNI:</label>
    <input type="text" name="dni" id="dni" required>
    <input type="submit" value="Buscar">
</form>
