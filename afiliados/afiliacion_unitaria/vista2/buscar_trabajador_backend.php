<?php
header('Content-Type: application/json');
include('../../../bd/conexion.php'); // Ajusta esta ruta según tu proyecto

/* =====================================
   FUNCIONES DE GENERACIÓN (SIMULACIÓN)
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

/* Porcentajes reales (referencial) */
$porcentaje_comision = [
    "Flujo" => [1.47, 1.55, 1.69, 1.74],
    "Mixta" => [0.18, 0.20, 0.23]
];

/* Motivos de pensión */
$motivos_pension = [
    "", // Vacío (activo)
    "Jubilación anticipada",
    "Retiro del 95.5%",
    "Invalidez"
];

/* Estados civiles */
$estados_civiles = ["SOLTERO", "CASADO", "VIUDO", "DIVORCIADO", "CONVIVIENTE"];

/* Sexos */
$sexos = ["MASCULINO", "FEMENINO"];

/* Departamentos del Perú */
$departamentos = ["LIMA", "AREQUIPA", "CUSCO", "PIURA", "LA LIBERTAD", "JUNIN", "ICA", "ANCASH", "AYACUCHO", "CAJAMARCA"];

/* =====================================
   PROCESO DE BÚSQUEDA
===================================== */

$response = [
    'success' => false,
    'data' => [],
    'error' => null
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    try {
        $results = [];
        
        $numdoc = trim($_POST['numdoc'] ?? '');
        $tipodoc = trim($_POST['tipodoc'] ?? '');
        
        if (empty($numdoc)) {
            throw new Exception('Debe ingresar el número de documento.');
        }

        // A. Buscar en tabla estudiantes
        // EXACTAMENTE IGUAL QUE buscar_afiliados.php
        $sql = "SELECT 
                    Tipoidentificacion as tipodoc,
                    Numero as numdoc,
                    SUBSTRING_INDEX(Apellidos,' ',1) AS appat,
                    SUBSTRING_INDEX(Apellidos,' ',-1) AS apmat,
                    Nombres as nombres
                FROM estudiantes
                WHERE Numero LIKE ?";
        
        $stmt = $conn->prepare($sql);
        $searchParam = "%$numdoc%";
        $stmt->bind_param("s", $searchParam);
        $stmt->execute();
        $res = $stmt->get_result();
        while ($row = $res->fetch_assoc()) {
            // Si tipodoc viene vacío de BD, asignamos DNI por defecto
            if(empty($row['tipodoc'])) $row['tipodoc'] = 'DNI';
            $results[] = $row;
        }

        // B. Buscar en tabla profesores
        // EXACTAMENTE IGUAL QUE buscar_afiliados.php
        $sql = "SELECT 
                    'DNI' as tipodoc,
                    DNI as numdoc,
                    SUBSTRING_INDEX(Apellidos,' ',1) AS appat,
                    SUBSTRING_INDEX(Apellidos,' ',-1) AS apmat,
                    Nombres as nombres
                FROM profesores
                WHERE DNI LIKE ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $searchParam);
        $stmt->execute();
        $res = $stmt->get_result();
        while ($row = $res->fetch_assoc()) {
            $results[] = $row;
        }

        // PROCESAR RESULTADOS Y COMPLETAR DATOS FALTANTES (SIMULACIÓN)
        $processedResults = [];
        foreach ($results as $row) {
            // Decidir aleatoriamente si tiene AFP o no (60% tiene, 40% no tiene)
            $tieneAFP = rand(1, 100) <= 60;
            
            if ($tieneAFP) {
                // Generar datos AFP aleatorios
                $afp = $afps[array_rand($afps)];
                $tipo_comision = $tipos_comision[array_rand($tipos_comision)];
                $porcArr = $porcentaje_comision[$tipo_comision];
                $porcentaje = number_format($porcArr[array_rand($porcArr)], 2) . "%";
                $devmax = rand(2025, 2026) . "-" . str_pad(rand(1, 12), 2, "0", STR_PAD_LEFT);
                $motivo = $motivos_pension[array_rand($motivos_pension)];
                $cuspp = generarCUSPP();
            } else {
                // Sin AFP
                $afp = "";
                $tipo_comision = "";
                $porcentaje = "";
                $devmax = "";
                $motivo = "";
                $cuspp = "";
            }
            
            // Generar datos personales aleatorios (ya que no están en las tablas originales)
            $fechanac = rand(1970, 2005) . "-" . str_pad(rand(1, 12), 2, "0", STR_PAD_LEFT) . "-" . str_pad(rand(1, 28), 2, "0", STR_PAD_LEFT);
            $sexo = $sexos[array_rand($sexos)];
            $estcivil = $estados_civiles[array_rand($estados_civiles)];
            $nacionalidad = "PERÚ";
            
            // Generar datos de ubicación
            $depNac = $departamentos[array_rand($departamentos)];
            $provNac = $depNac; // Simplificado
            $distNac = $depNac; // Simplificado
            
            // Armamos el objeto final
            $processedResults[] = [
                'tipodoc' => $row['tipodoc'],
                'numdoc' => $row['numdoc'],
                'appat' => $row['appat'],
                'apmat' => $row['apmat'],
                'nombres' => $row['nombres'],
                'fechanac' => $fechanac,
                'sexo' => $sexo,
                'estcivil' => $estcivil,
                'depNac' => $depNac,
                'provNac' => $provNac,
                'distNac' => $distNac,
                'nacionalidad' => $nacionalidad,
                'cuspp' => $cuspp,
                'afp' => $afp,
                'tipocom' => $tipo_comision,
                'pctcom' => $porcentaje,
                'devmax' => $devmax,
                'motivo' => $motivo
            ];
        }

        $response['success'] = true;
        $response['data'] = $processedResults;
        
    } catch (Exception $e) {
        $response['error'] = $e->getMessage();
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>