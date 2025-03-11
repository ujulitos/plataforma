<?php

$archivo = $_FILES["archivo"]; 
$nombre_archivo = $_FILES["archivo"]['name']; 
$nombre_archivo_tmp = $_FILES["archivo"]['tmp_name']; 
$usuario_id = $_POST["elUsuarioId"]; 
$ruta = "../usuarios/" . $usuario_id;
 
 if (!file_exists($ruta)) {
    mkdir($ruta, 0777, true);
 }
 move_uploaded_file($nombre_archivo_tmp, $ruta . "/profile_foto.jpg");
        
    
?>
