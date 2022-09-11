<?php 

$r = array();
$r['OK'] = 0;
$r['MSG'] = '';

function renombra($string) {
     $utf8 = array(
          '/[áàâãªä]/u'   =>   'a',
          '/[ÁÀÂÃÄ]/u'    =>   'A',
          '/[ÍÌÎÏ]/u'     =>   'I',
          '/[íìîï]/u'     =>   'i',
          '/[éèêë]/u'     =>   'e',
          '/[ÉÈÊË]/u'     =>   'E',
          '/[óòôõºö]/u'   =>   'o',
          '/[ÓÒÔÕÖ]/u'    =>   'O',
          '/[úùûü]/u'     =>   'u',
          '/[ÚÙÛÜ]/u'     =>   'U',
          '/ç/'           =>   'c',
          '/Ç/'           =>   'C',
          '/ñ/'           =>   'n',
          '/Ñ/'           =>   'N',
          '/,/'           =>   '',
          '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
          '/[’‘‹›‚]/u'    =>   '', // Literally a single quote
          '/[“”«»„]/u'    =>   '', // Double quote
          '/ /'           =>   '-' // nonbreaking space (equiv. to 0x160)
      );
      return preg_replace(array_keys($utf8), array_values($utf8), $string);
}


function remove_dir($dir) {
     $directory = "../recursos/".$dir;
     foreach (glob($directory) as $file) {
          if (is_dir($file)) { 
               rmrf("$file/*");
               rmdir($file);
          } else {
               unlink($file);
          }
     }
}


function subeFoto() {           
     $archivo = $_FILES["archivo"]; 
     $nombre_archivo = $_FILES["archivo"]['name']; 
     $nombre_archivo_tmp = $_FILES["archivo"]['tmp_name']; 
     $IdRecurso = $_POST["IdRecurso"]; 
     $ruta = "../recursos/" . $IdRecurso;
      
     if (!file_exists($ruta)) {
          mkdir($ruta, 0777, true);
     }
     move_uploaded_file($nombre_archivo_tmp, $ruta . "/objeto_portada.jpg");
      
     echo $ruta;       
     return;   
 }  


 function subeRecurso() {   
     $output = '';  
     $file_name1 = $_FILES['zip_file']['name'];  
    
     $array = explode(".", $file_name1);  
     $name = $array[0];  
     $name = renombra($name);
     $ext = $array[1]; 
     $file_nameF = $name . '.' . $ext;
     $recurso = $_POST["rename"];              
     $path = "../recursos/".$recurso."/"; 
     if (!file_exists($path)) {
          mkdir($path, 0777, true);
     }

     $location = $path . $file_nameF; 
     $ruta_recurso = ''; 
                            
     if($ext == 'zip') { 
          
          if (move_uploaded_file($_FILES['zip_file']['tmp_name'], $location)) {  
               
               $zip = new ZipArchive;  
               if($zip->open($location))  
               {  
                    $zip->extractTo($path);  
                    $zip->close();  
               }  
               $files = scandir($path . $name);
               $ficheroName = explode(".", $file_nameF)[0];                               
                             
               
               // $where = $path.$ficheroName."/"."index.html";
               if (file_exists($path.'imsmanifest.xml')) {              
                   
                    $xml = simplexml_load_file($path.'imsmanifest.xml');
                    if ($xml->resources != null) {
                         $ruta_recurso = $xml->resources->resource->attributes()['href'];
                         $r['file_nameF'] = $ruta_recurso;                                       
                        
                         $r['OK'] = 1;
                         $r['MSG'] = 'PERFECTO';
                         $r['FN'] = $ficheroName;	
                         
                         unlink($location); 
                         
                         echo $ruta_recurso; 
                         return $ruta_recurso;
                    } else {
                         echo "No existe el recurso, por favor revisa el paquete.";
                         return "No existe el recurso, por favor revisa el paquete.";
                    }
                                                                                                       
               } else {
                    $r['OK'] = 2;
                    $r['MSG'] = 'No se pudo leer el manifiesto, por favor revisa el paquete.';	

                    echo 'No se pudo leer el manifiesto, por favor revisa el paquete.';	
                    return 'No se pudo leer el manifiesto, por favor revisa el paquete.';	
               }                         
                                                                      
          }

          return;

     } else {      

          if (move_uploaded_file($_FILES['zip_file']['tmp_name'], $location)) { 
               // subeFoto();
              
               echo $file_nameF;
               return $file_nameF;
          }

     }
     
 } 

 subeFoto();
 subeRecurso();

 ?>