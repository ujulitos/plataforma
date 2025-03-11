<?php 

// function remove_dir($dir) {
//      $directory = "../recursos/".$dir;
//      foreach (glob($directory) as $file) {
//           if (is_dir($file)) { 
//                rmrf("$file/*");
//                rmdir($file);
//           } else {
//                unlink($file);
//           }
//      }
// }

function subeFoto() {           
     $ruta = "../cursos/" . $_POST["IdCurso"];   
     // $archivo = $_FILES["portada"]; 
     // $target_file = $target_dir . basename($_FILES["portada"]["name"]);
     // $nombre_archivo = $_FILES["portada"]['name']; 
     $nombre_archivo_tmp = $_FILES['imagenCurso']['tmp_name']; 
          
     if (!file_exists($ruta)) {
          mkdir($ruta, 0777, true);
     }
     move_uploaded_file($nombre_archivo_tmp, $ruta . "/curso_portada.jpg");

     echo $ruta;       
     return;   
 }  

 subeFoto();

 ?>