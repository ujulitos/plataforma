<?php

$r[ 'OK' ] = 0;
$r[ 'MSG' ] = '';

function eliminaRecurso() {

    $output = '';

    $curso = $_POST[ 'curso' ];
    $usuario = $_POST[ 'usuario' ];
    $recurso = $_POST[ 'recurso' ];
    $eliminaFileAnterior = $_POST[ 'eliminaAnterior' ];
     
    $path = '../cursos/'.$curso.'/'.$usuario.'/'.$recurso.'/';

    if ( !file_exists( $path ) ) {
        mkdir( $path, 0777, true );
    }
   
    $files = glob($path.'/*'); // get all file names
    foreach($files as $file){ // iterate files
        if (is_dir($file)) {
            deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($path);
}

eliminaRecurso();

?>