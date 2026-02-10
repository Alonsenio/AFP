<?php
header('Content-Type: application/json');
include('../../bd/conexion.php'); // Asegúrate que esta ruta sea correcta en tu proyecto

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

/* Motivos de salida del SPP */
$motivos_salida_spp = [
    "", // Vacío (activo en el sistema)
    "Jubilación",
    "Invalidez temporal",
    "Invalidez permanente",
    "Fallecimiento",
    "Retiro 95.5%",
    "Traspaso ONP"
];

/* =====================================
   PROCESO DE BÚSQUEDA
===================================== */

$response = [
    'success' => false,
    'data' => [],
    'error' => null
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $searchType = $_POST['searchType'] ?? '';
    
    try {
        $results = [];

        // 1. BÚSQUEDA POR CUSPP 
        if ($searchType === 'cuspp') {
            $cuspp = trim($_POST['cuspp'] ?? '');
            if (empty($cuspp)) {
                throw new Exception('Debe ingresar el código CUSPP.');
            }
            // Retorna vacío porque es simulado
            $response['success'] = true;
            $response['data'] = [];
            
        }
        // 2. BÚSQUEDA POR DOCUMENTO
        else if ($searchType === 'documento') {
            $numdoc = trim($_POST['numdoc'] ?? '');
            $tipodoc = trim($_POST['tipodoc'] ?? '');
            
            if (empty($numdoc)) {
                throw new Exception('Debe ingresar el número de documento.');
            }

            // A. Buscar en tabla estudiantes
            // Nota: Se asume que en estudiantes el 'Tipoidentificacion' y 'Numero' existen
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
                // Si tipodoc viene vacío de BD, asignamos DNI por defecto o lo que venga
                if(empty($row['tipodoc'])) $row['tipodoc'] = 'DNI';
                $results[] = $row;
            }

            // B. Buscar en tabla profesores
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
        }
        // 3. BÚSQUEDA POR NOMBRES
        else if ($searchType === 'nombres') {
            $appat = trim($_POST['appat'] ?? '');
            $apmat = trim($_POST['apmat'] ?? '');
            $nombres = trim($_POST['nombres'] ?? '');
            
            if (empty($appat) && empty($apmat) && empty($nombres)) {
                throw new Exception('Debe ingresar al menos un campo de nombre.');
            }

            // Construir condiciones WHERE dinámicas
            $whereCommon = [];
            $paramsCommon = [];
            $types = "";

            if (!empty($appat)) {
                $whereCommon[] = "SUBSTRING_INDEX(Apellidos,' ',1) LIKE ?";
                $paramsCommon[] = "%$appat%";
                $types .= "s";
            }
            if (!empty($apmat)) {
                $whereCommon[] = "SUBSTRING_INDEX(Apellidos,' ',-1) LIKE ?";
                $paramsCommon[] = "%$apmat%";
                $types .= "s";
            }
            if (!empty($nombres)) {
                $whereCommon[] = "Nombres LIKE ?";
                $paramsCommon[] = "%$nombres%";
                $types .= "s";
            }

            // A. Estudiantes
            $sql = "SELECT 
                        Tipoidentificacion as tipodoc,
                        Numero as numdoc,
                        SUBSTRING_INDEX(Apellidos,' ',1) AS appat,
                        SUBSTRING_INDEX(Apellidos,' ',-1) AS apmat,
                        Nombres as nombres
                    FROM estudiantes
                    WHERE " . implode(" AND ", $whereCommon);
            
            $stmt = $conn->prepare($sql);
            if(!empty($paramsCommon)){
                $stmt->bind_param($types, ...$paramsCommon);
            }
            $stmt->execute();
            $res = $stmt->get_result();
            while ($row = $res->fetch_assoc()) {
                if(empty($row['tipodoc'])) $row['tipodoc'] = 'DNI';
                $results[] = $row;
            }

            // B. Profesores
            $sql = "SELECT 
                        'DNI' as tipodoc,
                        DNI as numdoc,
                        SUBSTRING_INDEX(Apellidos,' ',1) AS appat,
                        SUBSTRING_INDEX(Apellidos,' ',-1) AS apmat,
                        Nombres as nombres
                    FROM profesores
                    WHERE " . implode(" AND ", $whereCommon);
            
            $stmt = $conn->prepare($sql);
            if(!empty($paramsCommon)){
                $stmt->bind_param($types, ...$paramsCommon);
            }
            $stmt->execute();
            $res = $stmt->get_result();
            while ($row = $res->fetch_assoc()) {
                $results[] = $row;
            }
        }

        // PROCESAR RESULTADOS Y COMPLETAR DATOS FALTANTES (SIMULACIÓN)
        $processedResults = [];
        foreach ($results as $row) {
            // Generar datos AFP aleatorios para completar la tabla visualmente
            $afp = $afps[array_rand($afps)];
            $tipo_comision = $tipos_comision[array_rand($tipos_comision)];
            $porcArr = $porcentaje_comision[$tipo_comision];
            $porcentaje = number_format($porcArr[array_rand($porcArr)], 2) . "%";
            
            // Devengue futuro (fecha)
            $devmax = rand(2025, 2026) . "-" . str_pad(rand(1, 12), 2, "0", STR_PAD_LEFT);
            
            $motivo = $motivos_pension[array_rand($motivos_pension)];
            
            // Último devengue en el SPP (fecha pasada reciente)
            $ultimo_devengue = rand(2023, 2024) . "-" . str_pad(rand(1, 12), 2, "0", STR_PAD_LEFT);
            
            // Motivo de salida del SPP
            $motivo_salida = $motivos_salida_spp[array_rand($motivos_salida_spp)];
            
            // Armamos el objeto final
            $processedResults[] = [
                'tipodoc' => $row['tipodoc'],
                'numdoc' => $row['numdoc'],
                'appat' => $row['appat'],
                'apmat' => $row['apmat'],
                'nombres' => $row['nombres'],
                'cuspp' => generarCUSPP(), // Dato generado
                'devmax' => $devmax,       // Dato generado
                'motivo' => $motivo,       // Dato generado
                'ultimo_devengue' => $ultimo_devengue, // Dato generado (nuevo campo)
                'motivo_salida' => $motivo_salida,     // Dato generado (nuevo campo)
                'afp' => $afp,             // Dato generado
                'tipocom' => $tipo_comision, // Dato generado
                'pctcom' => $porcentaje    // Dato generado
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