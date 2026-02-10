<?php
header('Content-Type: application/json');

// Intentar conectar a la BD, pero capturar errores
$usarDatosLocales = false;
try {
    include('../../bd/conexion.php');
    // Verificar si la conexión es válida
    if (!isset($conn) || !$conn || $conn->connect_error) {
        $usarDatosLocales = true;
    }
} catch (Exception $e) {
    $usarDatosLocales = true;
}

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
   DATOS LOCALES DE RESPALDO (FALLBACK)
===================================== */
$datosLocales = [
    [
        'tipodoc' => 'DNI',
        'numdoc' => '12345678',
        'appat' => 'GARCIA',
        'apmat' => 'LOPEZ',
        'nombres' => 'JUAN CARLOS'
    ],
    [
        'tipodoc' => 'DNI',
        'numdoc' => '87654321',
        'appat' => 'RODRIGUEZ',
        'apmat' => 'MARTINEZ',
        'nombres' => 'MARIA ELENA'
    ],
    [
        'tipodoc' => 'DNI',
        'numdoc' => '11111111',
        'appat' => 'PEREZ',
        'apmat' => 'SANCHEZ',
        'nombres' => 'CARLOS ALBERTO'
    ],
    [
        'tipodoc' => 'CE',
        'numdoc' => '001234567',
        'appat' => 'GONZALEZ',
        'apmat' => 'RAMIREZ',
        'nombres' => 'ANA LUCIA'
    ]
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

            // Si la BD está disponible, intentar buscar
            if (!$usarDatosLocales) {
                try {
                    // A. Buscar en tabla estudiantes
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
                } catch (Exception $dbError) {
                    // Si falla la consulta a BD, marcar para usar datos locales
                    $usarDatosLocales = true;
                    $results = []; // Limpiar resultados parciales
                }
            }

            // Si no hay resultados de BD o la BD no está disponible, usar datos locales
            if ($usarDatosLocales || empty($results)) {
                foreach ($datosLocales as $dato) {
                    // Buscar coincidencias parciales
                    if (stripos($dato['numdoc'], $numdoc) !== false) {
                        // Si se especificó tipo de documento, filtrar
                        if (empty($tipodoc) || $dato['tipodoc'] === $tipodoc) {
                            $results[] = $dato;
                        }
                    }
                }
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

            // Si la BD está disponible, intentar buscar
            if (!$usarDatosLocales) {
                try {
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
                } catch (Exception $dbError) {
                    $usarDatosLocales = true;
                    $results = [];
                }
            }

            // Si no hay resultados de BD o la BD no está disponible, usar datos locales
            if ($usarDatosLocales || empty($results)) {
                foreach ($datosLocales as $dato) {
                    $match = true;
                    if (!empty($appat) && stripos($dato['appat'], $appat) === false) $match = false;
                    if (!empty($apmat) && stripos($dato['apmat'], $apmat) === false) $match = false;
                    if (!empty($nombres) && stripos($dato['nombres'], $nombres) === false) $match = false;
                    
                    if ($match) {
                        $results[] = $dato;
                    }
                }
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
                'ultimo_devengue' => $ultimo_devengue, // Dato generado
                'motivo_salida' => $motivo_salida,     // Dato generado
                'afp' => $afp,             // Dato generado
                'tipocom' => $tipo_comision, // Dato generado
                'pctcom' => $porcentaje    // Dato generado
            ];
        }

        $response['success'] = true;
        $response['data'] = $processedResults;
        
        // Si se usaron datos locales, agregar una nota informativa
        if ($usarDatosLocales && !empty($processedResults)) {
            $response['info'] = 'Usando datos de respaldo';
        }
        
    } catch (Exception $e) {
        $response['error'] = $e->getMessage();
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>