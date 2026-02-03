<?php
// ===== BLINDAJE TOTAL =====
error_reporting(0);
ini_set('display_errors', 0);
while (ob_get_level()) ob_end_clean();
ob_start();

require __DIR__ . '/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// ===== VALIDACIÓN =====
if (!isset($_FILES['archivo']) || $_FILES['archivo']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    exit;
}

// ===== DATA ALEATORIA =====
$afps = [
    ['INTEGRA','Mixta','1.55%'],
    ['PRIMA','Flujo','1.69%'],
    ['HABITAT','Mixta','1.47%'],
    ['PROFUTURO','Flujo','1.69%'],
];

$motivos = [
    'Jubilación',
    'Invalidez',
    'Sobrevivencia',
    'Retiro del 95.5%'
];

function generarCUSPP($dni){
    $letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return rand(5,6)
        . str_pad($dni,8,'0',STR_PAD_LEFT)
        . $letras[rand(0,25)]
        . $letras[rand(0,25)]
        . rand(1,9);
}

function devengueAleatorio(){
    $anio = rand(2024,2026);
    $mes  = str_pad(rand(1,12),2,'0',STR_PAD_LEFT);
    return "$anio-$mes";
}

// ===== LEER EXCEL ENTRADA =====
$input = IOFactory::load($_FILES['archivo']['tmp_name']);
$rows  = $input->getActiveSheet()->toArray(null,true,true,false);

// ===== CREAR EXCEL SALIDA =====
$out = new Spreadsheet();
$sheet = $out->getActiveSheet();

$sheet->fromArray([
    'DNI',
    'Apellido Paterno',
    'Apellido Materno',
    'Nombres',
    'CUSPP',
    'Devengue máximo para aportar',
    'Motivo de pensión',
    'AFP',
    'Tipo de Comisión',
    '% de Comisión'
], null, 'A1');

$fila = 2;

foreach ($rows as $r) {

    if (!isset($r[1]) || trim($r[1]) === '') continue;

    $dni   = trim($r[1]);
    $appat = trim($r[2] ?? '');
    $apmat = trim($r[3] ?? '');
    $nom   = trim($r[4] ?? '');

    $afp = $afps[array_rand($afps)];

    $sheet->fromArray([
        $dni,
        $appat,
        $apmat,
        $nom,
        generarCUSPP($dni),
        devengueAleatorio(),
        $motivos[array_rand($motivos)],
        $afp[0],
        $afp[1],
        $afp[2]
    ], null, 'A' . $fila);

    $fila++;
}

// ===== DESCARGA LIMPIA =====
header_remove();
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment; filename="Consulta_Afiliados_Masiva.xlsx"');
header('Cache-Control: max-age=0');
header('Pragma: public');

$writer = new Xlsx($out);
$writer->save('php://output');

ob_end_flush();
exit;
