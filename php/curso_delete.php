<?php 

function remove_dir() {
     $directory = "../cursos/" . $_POST["directorio"];  
    
     $files = glob($directory . '/*'); // get all file names
     foreach($files as $file){ // iterate files
       if(is_file($file)) {
         unlink($file); // delete file
       }
     }
    
     if( file_exists($directory) ){ 
          rmdir($directory); 
     }

     echo $directory;       
     return;   

}

remove_dir();

?>