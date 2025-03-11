<?php

$r = array();
$r[ 'OK' ] = 0;
$r[ 'MSG' ] = '';

function renombra( $string ) {
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
        '/–/'           =>   '-', // UTF-8 hyphen to 'normal' hyphen
        '/[’‘‹›‚]/u'    =>   '', // Literally a single quote
        '/[“”«»„]/u'    =>   '', // Double quote
        '/ /'           =>   '-' // nonbreaking space ( equiv. to 0x160 )
    );
    return preg_replace( array_keys( $utf8 ), array_values( $utf8 ), $string );
}


function subeRecurso() {

    $output = '';

    $file_name1 = $_FILES[ 'el_file' ][ 'name' ];

    $array = explode( '.', $file_name1 );

    $name = $array[ 0 ];

    $name = renombra( $name );
    $ext = $array[ 1 ];

    $curso = $_POST[ 'curso' ];
    $usuario = $_POST[ 'usuario' ];
    $recurso = $_POST[ 'recurso' ];
    $nombreFinal = $_POST[ 'nombreConcat' ];
    $eliminaFileAnterior = $_POST[ 'eliminaAnterior' ];
    // $file_nameF = $nombreFinal . '.' . $ext;
    $file_nameF = $nombreFinal;
    
    $path = '../cursos/'.$curso.'/'.$usuario.'/'.$recurso.'/';

    if ( !file_exists( $path ) ) {
        mkdir( $path, 0777, true );
    }

    $location = $path . $file_nameF;
   
    if ($eliminaFileAnterior == 'true') {
        $files = glob($path.'/*'); // get all file names
        foreach($files as $file){ // iterate files
            if (is_file($file)) {
                unlink($file); // delete file
            }
        }
    }

    $ruta_recurso = '';
   
        if ( move_uploaded_file( $_FILES[ 'el_file' ][ 'tmp_name' ], $location ) ) {

            // subeFoto();

            echo $file_nameF;
            return $file_nameF;
        }

    }


subeRecurso();

?>