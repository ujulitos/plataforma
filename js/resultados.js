var cuantasLecciones;
var cuantosUsuariosPre;
var cuantasAsignacionesPre;
var cuantosUsuarios;
var cuantosRecursos;
var cuantosRecAsig;
var laFechaFormat;
var laFechaFormat2;
var that;
var thatt;
var those;
var there;
var arrayLecciones = [];
var arrayLeccionesAsig = [];
var nuevoArray = [];
moment.locale('es');

function activaSecResultados() {
    log('activaSecResultados');
    $('#subtituloSeccion').html('');

    return leeRecNombresRes();
}


function leeRecNombresRes() {
    // log('leeRecNombresRes');
    var contadorRecursos = 0;

    firebase.database().ref(laUrlBase + 'Recursos').once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                if (snapshot.val() != null) {

                    if (childSnapshot.key.split('d')[1] == 'x') {
                        contadorRecursos++;
                        // log('childSnapshot.key', childSnapshot.key);

                        this['elRecursoNombre' + contadorRecursos] = childSnapshot.child('Nombre').val();
                        // log('elRecursoNombre', contadorRecursos, this['elRecursoNombre' + contadorRecursos]);

                    }
                }
            });
            those = this;
            return leeLeccionesRes();
        }
    });
}

function leeLeccionesRes() {
    log('leeLeccionesRes');
    var contadorKeys = 0;
    var contador = 0;
    var contadorLecciones_dx = 0;
    var contadorLecciones_oc = 0;

    firebase.database().ref(laUrlBase + 'Lecciones').orderByKey().equalTo(usuarioId).once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                if (snapshot.val() != null) {

                    if (childSnapshot.key == usuarioId) {
                        log('usuarioId', usuarioId);

                        contadorKeys++;
                        this['leccionesTomadasKeys' + contadorKeys] = childSnapshot.key;
                        log('leccionesTomadasKeys', contadorKeys, this['leccionesTomadasKeys' + contadorKeys]);
                    }

                    childSnapshot.forEach(function(childSnapshot2) {

                        if (childSnapshot2.key.split('oc')[1] == '') {
                            contador++;
                            this['elIdObjeto' + contador] = childSnapshot2.key.split('objeto_sco_')[1].split('oc')[0];

                            log('elIdObjeto', this['elIdObjeto' + contador]);

                            this['elNombreObjeto' + contador] = childSnapshot2.key;
                            log('elNombreObjeto', this['elNombreObjeto' + contador]);

                            // log('leeLeccionesRes', contador, childSnapshot.key, childSnapshot2.key, those['usuarioId' + contador], those['usuarioPerfilInt' + contador]);

                        }

                        if (childSnapshot2.key.split('oc')[1] == '') {
                            contadorLecciones_oc++;

                            this['elRecursoCalificacion_oc' + contadorLecciones_oc] = childSnapshot2.child('SCORM_12').child('cmi_core_score_raw').val();

                            this['elRecursoEstatus_oc' + contadorLecciones_oc] = childSnapshot2.child('SCORM_12').child('cmi_core_lesson_status').val();

                            log('elRecursoCalificacion_oc', contadorKeys, this['leccionesTomadasKeys' + contadorKeys], contadorLecciones_oc, this['elNombreObjeto' + contador], this['elRecursoCalificacion_oc' + contadorLecciones_oc], this['elRecursoEstatus_oc' + contadorLecciones_oc]);


                            arrayLecciones[(contadorLecciones_oc - 1)] = ({
                                'usuarioId': this['leccionesTomadasKeys' + contadorKeys],
                                'usuarioNombre': '',
                                'objetoId': parseInt(this['elIdObjeto' + contador]),
                                'objetoNombre': '',
                                'califOC': this['elRecursoCalificacion_oc' + contadorLecciones_oc],
                                'estatusOC': this['elRecursoEstatus_oc' + contadorLecciones_oc],
                                'clase': ''
                            });


                        }


                    });
                }
            });

            // log('arrayLecciones', arrayLecciones);

            there = this;
            cuantasLecciones = contadorKeys;

            return cuentaLeccionesRes();
        }
    });
}


function cuentaLeccionesRes() {
    log('cuentaLeccionesRes');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                // var contadorClases = 0;
                var contadorRecAsig = 0;
                var contadorUsuarios = 0;
                var contadorPerfiles = 0;
                arrayLeccionesAsig = [];
                nuevoArray = [];

                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot.key ', childSnapshot.key);
                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined') {
                        contadorPerfiles++;
                        this['usuarioPerfil' + contadorPerfiles] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        // log('usuarioPerfil', contadorPerfiles, this['usuarioPerfil' + contadorPerfiles]);

                        // if (this['usuarioPerfil' + contadorPerfiles] != 'Administrador' && this['usuarioPerfil' + contadorPerfiles] != 'Prueba') {
                        contadorUsuarios++;
                        this['usuarioId' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                        // log(contadorUsuarios, this['usuarioId' + contadorUsuarios]);

                        this['usuarioNombre' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        this['usuarioApellido_Paterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        this['usuarioApellido_Materno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        // this['usuarioContrasena' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Contrasena').val();
                        // this['usuarioCorreo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo').val();
                        this['usuarioPerfilInt' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        // log('usuarioPerfilInt', this['usuarioPerfilInt' + contadorUsuarios]);
                        // this['usuarioPuesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                        // this['usuarioVisible' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Visible').val();
                        // this['Activo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Activo').val();

                        childSnapshot.forEach(function(childSnapshot2) {
                            childSnapshot2.forEach(function(childSnapshot3) {

                                // if (childSnapshot3.key == "Clase") {
                                //     contadorClases++;
                                //     this['laClase' + contadorClases] = childSnapshot2.child('Clase').val();
                                //      log('laClase', contadorClases, this['laClase' + contadorClases]);
                                // }

                                // if (childSnapshot3.key != 'Clase') {
                                contadorRecAsig++;

                                this['elRecursoKey' + contadorRecAsig] = childSnapshot3.key;
                                // log('elRecursoKey', contadorRecAsig, this['elRecursoKey' + contadorRecAsig]);

                                this['laClase' + contadorRecAsig] = childSnapshot3.child('Clase').val();
                                // log('laClase', contadorRecAsig, this['laClase' + contadorRecAsig]);

                                this['laFechaCierra' + contadorRecAsig] = childSnapshot3.child('Fecha_cierra').val();
                                log('laFechaCierra', contadorRecAsig, this['laFechaCierra' + contadorRecAsig]);

                                this['elRecursoId' + contadorRecAsig] = childSnapshot3.child('Id').val();

                                log('la Asignación', contadorRecAsig, 'Usuario Id', this['usuarioId' + contadorUsuarios], 'Usuario Nombre', this['usuarioNombre' + contadorUsuarios], 'el Recurso Id', this['elRecursoId' + contadorRecAsig], 'la Clase', this['laClase' + contadorRecAsig]);


                                arrayLeccionesAsig.push({
                                    'usuarioId': this['usuarioId' + contadorUsuarios],
                                    'usuarioNombre': this['usuarioNombre' + contadorUsuarios],
                                    'objetoId': this['elRecursoId' + contadorRecAsig],
                                    'objetoNombre': those['elRecursoNombre' + this['elRecursoId' + contadorRecAsig]],
                                    'califOC': 'Sin registro',
                                    'estatusOC': 'Sin registro',
                                    'fechaCierre': this['laFechaCierra' + contadorRecAsig],
                                    'clase': this['laClase' + contadorRecAsig]
                                });

                            });

                        });

                        // }
                    }
                });

                log('arrayLecciones', arrayLecciones);
                log('arrayLeccionesAsig', arrayLeccionesAsig);

                that = this;
                cuantosUsuarios = contadorUsuarios;
                cuantosRecAsig = contadorRecAsig;


                // busca, compara y crea un nuevo array completo
                function busca() {
                    log('buscando');

                    var conta = 0;
                    var elEstatusOCEsp;

                    arrayLeccionesAsig.forEach(x => {
                        var repetido = false;

                        switch (arrayLecciones[conta].estatusOC) {
                            case 'passed':
                                elEstatusOCEsp = 'Aprobado';
                                break;
                            case 'failed':
                                elEstatusOCEsp = 'No aprobado';
                                break;
                            case 'incomplete':
                                elEstatusOCEsp = 'Incompleto';
                                break;
                            default:
                                elEstatusOCEsp = 'No iniciado';
                                break;
                        }

                        arrayLecciones.forEach(y => {
                            if (x.usuarioId === y.usuarioId && x.objetoId === y.objetoId) {
                                repetido = true;
                                return;
                            }
                        });

                        if (repetido) {
                            nuevoArray.push({
                                'usuarioId': x.usuarioId,
                                'usuarioNombre': x.usuarioNombre,
                                'objetoId': x.objetoId,
                                'objetoNombre': x.objetoNombre,
                                'califOC': arrayLecciones[conta].califOC,
                                'estatusOC': elEstatusOCEsp,
                                'fechaCierre': x.fechaCierre,
                                'clase': x.clase
                            });
                            if (conta >= (arrayLecciones.length - 1)) {
                                conta = 0;
                            } else {
                                conta++;
                            }
                        } else {
                            nuevoArray.push(x);

                        }
                    });

                    cuantosRecursos = nuevoArray.length;
                    log('nuevoArray', nuevoArray);
                }
                busca();


                return pintaResultados().then(function() {
                    activaBotonesResultados().then(function() {
                        cargador('oculta');
                    });
                });
            }
        });
    }
}


function pintaResultados() {

    var elIcono;
    var botonDipVisible;
    var contador = 0;

    var contenidoSecDiplomas = '';
    $('.resultados_int').empty();


    contenidoSecDiplomas += '<div class="row">';
    contenidoSecDiplomas += '<div class="col-md-10 ml-auto mr-auto">';
    contenidoSecDiplomas += '<br>';


    for (a = 1; a <= cuantosRecursos; a++) {

        laFechaFormat = moment(nuevoArray[(a - 1)].fechaCierre, ["DD/MM/YYYY"]).format();
        laFechaFormat2 = moment(laFechaFormat).format("LL");
        // log('laFechaFormat', laFechaFormat);

        switch (nuevoArray[(a - 1)].estatusOC) {
            case 'Aprobado':
                elIcono = 'nc-icon-glyph ui-1_check-circle-08 icon_verde';
                break;
            case 'No aprobado':
                elIcono = 'nc-icon-glyph ui-1_circle-remove icon_rojo';
                break;
            case 'Incompleto':
                elIcono = 'nc-icon-glyph ui-2_time icon_amarillo';
                break;
            default:
                elIcono = 'nc-icon-outline weather_moon-full icon_gris';
                break;
        }

        if (nuevoArray[(a - 1)].estatusOC == 'Aprobado') {
            botonDipVisible = true;
        } else {
            botonDipVisible = false;
        }



        contenidoSecDiplomas += '<div id="tarjeta' + a + '" class="card card_con_bg card_con_sombra" style="display: none;">';
        contenidoSecDiplomas += '<div class="card-header card_header">Curso:</div>';
        contenidoSecDiplomas += '<div class="card-body">';
        contenidoSecDiplomas += '<h5 class="card-text card_titulo">' + nuevoArray[(a - 1)].objetoNombre + '</h5>';
        contenidoSecDiplomas += '<div class="card_subtext">Finaliza el ' + laFechaFormat2 + '.</div>';
        contenidoSecDiplomas += '</div>';
        contenidoSecDiplomas += '<br>';
        contenidoSecDiplomas += '<div class="card-footer card_foot">';
        contenidoSecDiplomas += '<div class="estatus_curso">';
        contenidoSecDiplomas += '<div id="estatus_curso_scorm' + a + '" class="icono_status" style="float:left; margin: 10px 0px;"><i class="' + elIcono + ' icon_estatus_scorm"></i>';
        contenidoSecDiplomas += '<div class="estatus_texto">' + nuevoArray[(a - 1)].estatusOC + '</div>';
        contenidoSecDiplomas += '</div>';
        contenidoSecDiplomas += '</div>';
        contenidoSecDiplomas += '<div class="card_botones_res">';
        if (botonDipVisible) {
            contenidoSecDiplomas += '<div id="botonDiploma' + a + '" class="btn btn-verde2 btn-round">Descargar diploma</div>';
        }
        contenidoSecDiplomas += '</div>';
        contenidoSecDiplomas += '</div>';
        contenidoSecDiplomas += '</div>';

        contenidoSecDiplomas += '<br>';
    }

    contenidoSecDiplomas += '</div>';
    contenidoSecDiplomas += '</div>';


    $('.resultados_int').append(contenidoSecDiplomas);
    // $('#subtituloSeccion').html('<a  >' + cuantosRecursos + '</a> recursos en total');


    //////////////// por asignación ////////////////      
    for (c = 1; c <= cuantosRecursos; c++) {
        contador++;

        $('#tarjeta' + c).css({
            'opacity': '0',
            'display': 'flex'
        });
        $('#tarjeta' + c).animate({
            opacity: 1
        });

    }
    log('cuantosRecursos', cuantosRecursos);

    return $.ajax();

}



function activaBotonesResultados() {
    log('activaBotonesResultados');

    for (a = 1; a <= cuantosRecursos; a++) {
        $("#botonDiploma" + a).click(function(event) {
            event.preventDefault();
            var cualDiploma = $(this).attr('id').split('botonDiploma')[1];
            // log('cualDiploma', cualDiploma);

            laFechaFormat = moment(nuevoArray[(cualDiploma - 1)].fechaCierre, ["DD/MM/YYYY"]).format();
            laFechaFormat2 = moment(laFechaFormat).format("LL");

            decargaDiploma(cualDiploma, nuevoArray[(cualDiploma - 1)].usuarioNombre, nuevoArray[(cualDiploma - 1)].objetoNombre, laFechaFormat2);
        });
    }

    return $.ajax();
};



$(document).ready(function() {

});