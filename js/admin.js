var tablaReporte;
var cuantasLecciones;
var cuantosUsuariosPre;
var cuantasAsignacionesPre;
var cuantosUsuarios;
var cuantosRecursos;
var cuantosRecAsig;
var elCorreoUsuExiste;
var that;
var thatt;
var those;
var there;
var arrayLecciones = [];
var arrayLeccionesAsig = [];
var nuevoArray = [];
var dataSet = [];

function activaSecAdmin() {
    log('activaSecAdmin');
    $('#subtituloSeccion').html('');

    // QUITAR para leer calificaciones
    // return LlenaLecciones();
    return leeRecNombres();
}


function leeRecNombres() {
    // log('leeRecNombres');
    var contadorRecursos = 0;

    firebase.database().ref(laUrlBase + 'Recursos').once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                if (snapshot.val() != null) {

                    if (childSnapshot.key.split('d')[1] == 'x') {
                        contadorRecursos++;
                        // log('childSnapshot.key', childSnapshot.key);

                        this['elRecursoIdVisible' + contadorRecursos] = childSnapshot.child('IdVisible').val();
                        // log('elRecursoIdVisible', contadorRecursos, this['elRecursoIdVisible' + contadorRecursos]);

                        this['elRecursoNombre' + contadorRecursos] = childSnapshot.child('Nombre').val();
                        // log('elRecursoNombre', contadorRecursos, this['elRecursoNombre' + contadorRecursos]);

                    }
                }
            });
            those = this;
            return leeLecciones();
        }
    });
}


function leeLecciones() {
    log('leeLecciones');
    var contadorKeys = 0;
    var contador = 0;
    var contadorLecciones_dx = 0;
    var contadorLecciones_oc = 0;

    firebase.database().ref(laUrlBase + 'Lecciones').once('value').then(function(snapshot) {
        if (snapshot.val() != null) {
            snapshot.forEach(function(childSnapshot) {
                if (snapshot.val() != null) {

                    // QUITAR perfiles Admin
                    if (childSnapshot.key != 'imp0001' && childSnapshot.key != 'imp0002' && childSnapshot.key != 'imp0003' && childSnapshot.key != 'imp0004' && childSnapshot.key != 'imp0005' && childSnapshot.key != 'impdavid' && childSnapshot.key != 'demo' && childSnapshot.key != 'val') {
                        contadorKeys++;
                        this['leccionesTomadasKeys' + contadorKeys] = childSnapshot.key;
                        // log('leccionesTomadasKeys', contadorKeys, this['leccionesTomadasKeys' + contadorKeys]);
                    }

                    // this['objetosTomados' + contador] = childSnapshot.key;
                    // log('objetosTomados', contador, this['objetosTomados' + contador]);

                    childSnapshot.forEach(function(childSnapshot2) {

                        // QUITAR perfiles Admin
                        if (childSnapshot.key != 'imp0001' && childSnapshot.key != 'imp0002' && childSnapshot.key != 'imp0003' && childSnapshot.key != 'imp0004' && childSnapshot.key != 'imp0005' && childSnapshot.key != 'impdavid' && childSnapshot.key != 'demo' && childSnapshot.key != 'val') {
                            contador++;

                            if (childSnapshot2.key.split('d')[1] == 'x') {
                                this['elIdObjeto' + contador] = childSnapshot2.key.split('objeto_sco_')[1].split('dx')[0];
                            }
                            if (childSnapshot2.key.split('oc')[1] == '') {
                                this['elIdObjeto' + contador] = childSnapshot2.key.split('objeto_sco_')[1].split('oc')[0];
                            }
                            // log('elIdObjeto', this['elIdObjeto' + contador]);

                            this['elNombreObjeto' + contador] = childSnapshot2.key;
                            // log('elNombreObjeto', this['elNombreObjeto' + contador]);

                            // log('leeLecciones', contador, childSnapshot.key, childSnapshot2.key, those['usuarioId' + contador], those['usuarioPerfilInt' + contador]);




                            if (childSnapshot2.key.split('d')[1] == 'x') {
                                contadorLecciones_dx++;

                                this['elRecursoCalificacion_dx' + contadorLecciones_dx] = childSnapshot2.child('SCORM_12').child('cmi_core_score_raw').val();

                                this['elRecursoEstatus_dx' + contadorLecciones_dx] = childSnapshot2.child('SCORM_12').child('cmi_core_lesson_status').val();

                                // log('elRecursoCalificacion_dx', contadorKeys, this['leccionesTomadasKeys' + contadorKeys], contadorLecciones_dx, this['elNombreObjeto' + contador], this['elRecursoCalificacion_dx' + contadorLecciones_dx], this['elRecursoEstatus_dx' + contadorLecciones_dx]);


                                arrayLecciones[(contadorLecciones_dx - 1)] = ({
                                    'usuarioId': this['leccionesTomadasKeys' + contadorKeys],
                                    'usuarioNombre': '',
                                    'objetoId': parseInt(this['elIdObjeto' + contador]),
                                    'objetoNombre': '',
                                    'califDX': this['elRecursoCalificacion_dx' + contadorLecciones_dx],
                                    'estatusDX': this['elRecursoEstatus_dx' + contadorLecciones_dx],
                                    'califOC': '',
                                    'estatusOC': '',
                                    'clase': ''
                                });

                            }
                            if (childSnapshot2.key.split('oc')[1] == '') {
                                contadorLecciones_oc++;

                                this['elRecursoCalificacion_oc' + contadorLecciones_oc] = childSnapshot2.child('SCORM_12').child('cmi_core_score_raw').val();

                                this['elRecursoEstatus_oc' + contadorLecciones_oc] = childSnapshot2.child('SCORM_12').child('cmi_core_lesson_status').val();

                                // log('elRecursoCalificacion_oc', contadorKeys, this['leccionesTomadasKeys' + contadorKeys], contadorLecciones_oc, this['elNombreObjeto' + contador], this['elRecursoCalificacion_oc' + contadorLecciones_oc], this['elRecursoEstatus_oc' + contadorLecciones_oc]);


                                arrayLecciones[(contadorLecciones_oc - 1)].califOC = this['elRecursoCalificacion_oc' + contadorLecciones_oc];
                                arrayLecciones[(contadorLecciones_oc - 1)].estatusOC = this['elRecursoEstatus_oc' + contadorLecciones_oc];

                            }

                        }
                    });
                }
            });

            // log('arrayLecciones', arrayLecciones);

            there = this;
            cuantasLecciones = contadorKeys;

            return cuentaLecciones();
        }
    });
}


function cuentaLecciones() {
    log('cuentaLecciones');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
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

                        if (this['usuarioPerfil' + contadorPerfiles] != 'Administrador' && this['usuarioPerfil' + contadorPerfiles] != 'Prueba') {
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

                                    this['elRecursoId' + contadorRecAsig] = childSnapshot3.child('Id').val();
                                    // log('elRecursoId', contadorRecAsig, this['elRecursoId' + contadorRecAsig]);

                                    // log('la Asignación', contadorRecAsig, 'Usuario Id', this['usuarioId' + contadorUsuarios], 'Usuario Nombre', this['usuarioNombre' + contadorUsuarios], 'el Recurso Id', this['elRecursoId' + contadorRecAsig], 'la Clase', this['laClase' + contadorRecAsig]);

                                    var elIdVisible = parseInt(those['elRecursoIdVisible' + this['elRecursoId' + contadorRecAsig]].split('dx')[0].split('sco_')[1]);

                                    arrayLeccionesAsig.push({
                                        'usuarioId': this['usuarioId' + contadorUsuarios],
                                        'usuarioNombre': this['usuarioNombre' + contadorUsuarios],
                                        'objetoId': this['elRecursoId' + contadorRecAsig],
                                        'objetoIdVisible': elIdVisible,
                                        'objetoNombre': those['elRecursoNombre' + this['elRecursoId' + contadorRecAsig]],
                                        'califDX': 'Sin registro',
                                        'estatusDX': 'Sin registro',
                                        'califOC': 'Sin registro',
                                        'estatusOC': 'Sin registro',
                                        'clase': this['laClase' + contadorRecAsig]
                                    });

                                });

                            });

                        }
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

                    var conta1 = 0;
                    var conta2 = 0;
                    var elEstatusDXEsp;
                    var elEstatusOCEsp;

                    arrayLeccionesAsig.forEach(x => {
                        var repetido = false;

                        switch (arrayLecciones[conta1].estatusDX) {
                            case 'passed':
                                elEstatusDXEsp = 'Aprobado';
                                break;
                            case 'failed':
                                elEstatusDXEsp = 'No aprobado';
                                break;
                            case 'incomplete':
                                elEstatusDXEsp = 'Incompleto';
                                break;
                            case 'completed':
                                elEstatusDXEsp = 'Completo';
                                break;
                            default:
                                elEstatusDXEsp = 'No iniciado';
                                break;
                        }
                        switch (arrayLecciones[conta2].estatusOC) {
                            case 'passed':
                                elEstatusOCEsp = 'Aprobado';
                                break;
                            case 'failed':
                                elEstatusOCEsp = 'No aprobado';
                                break;
                            case 'incomplete':
                                elEstatusOCEsp = 'Incompleto';
                                break;
                            case 'completed':
                                elEstatusOCEsp = 'Completo';
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
                                'objetoIdVisible': x.objetoIdVisible,
                                'objetoNombre': x.objetoNombre,
                                'califDX': arrayLecciones[conta1].califDX,
                                'estatusDX': elEstatusDXEsp,
                                'califOC': arrayLecciones[conta2].califOC,
                                'estatusOC': elEstatusOCEsp,
                                'clase': x.clase
                            });
                            if (conta1 >= (arrayLecciones.length - 1)) {
                                conta1 = 0;
                            } else {
                                conta1++;
                            }
                            if (conta2 >= (arrayLecciones.length - 1)) {
                                conta2 = 0;
                            } else {
                                conta2++;
                            }
                        } else {
                            nuevoArray.push(x);

                        }
                    });

                    log('nuevoArray', nuevoArray);
                }
                busca();


                return pintaAdmin().then(function() {
                    activaBotonesAdmin().then(function() {
                        cargador('oculta');
                    });
                });
            }
        });
    }
}



function pintaAdmin() {
    log('pintaAdmin');


    for (a = 0; a < nuevoArray.length; a++) {
        dataSet[a] = [
            nuevoArray[a].usuarioId,
            nuevoArray[a].usuarioNombre,
            // nuevoArray[a].objetoId,
            nuevoArray[a].objetoIdVisible,
            nuevoArray[a].objetoNombre,
            nuevoArray[a].califDX,
            nuevoArray[a].estatusDX,
            nuevoArray[a].califOC,
            nuevoArray[a].estatusOC,
            nuevoArray[a].clase
        ];
    }


    // log('dataSet ', dataSet);
    tablaReporte = $('#tablaReporte').DataTable({
        data: dataSet,
        // dom: 'Blfrtip',
        dom: "Br<'row'<'col-sm-6'l><'col-sm-6 text-right'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [{
                extend: 'excelHtml5',
                title: "Reporte",
                text: 'Descargar Excel'
            },
            {
                extend: 'pdfHtml5',
                title: "Reporte",
                text: "Descargar PDF"
            }
        ],
        "language": {
            "url": "js/dataTable_spanish.json"
        },
        columns: [{
            title: 'Id de Empleado'
        }, {
            title: 'Nombre de Empleado'
        }, {
            title: 'Número de Curso'
        }, {
            title: 'Nombre de Curso'
        }, {
            title: 'Diagnóstico Calificación'
        }, {
            title: 'Diagnóstico Estatus'
        }, {
            title: 'Contenido Calificación'
        }, {
            title: 'Contenido Estatus'
        }, {
            title: 'Etapa'
        }],
        "initComplete": function(settings) {
            $('input[type=search]').val('-');
            $('.dt-buttons').addClass('text-center');
            $('.dt-button').addClass('btn btn-round btn-verde2 ml-3 mr-3').fadeIn();
            setTimeout(function() {
                $('input[type=search]').val('');
            }, 300);
        }
    });



    return $.ajax();
};



function activaBotonesAdmin() {
    log('activaBotonesAdmin');

    $("#botonDescargarReporte").click(function() {
        log("botonDescargarReporte");

        // var table2excel = new Table2Excel();
        // table2excel.export($('#tablaReporte'), 'Reporte');

        // setTimeout(function() {

        //     if (revisaConexion) {
        //         firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
        //             if (snapshot.val() != null) {

        //                 log('botonDescargarReporte en firebase');
        //                 // firebase.database().ref().child('Usuarios/' + cualUsuario).remove(onComplete); //usuario_
        //                 return;
        //             };
        //         });
        //     }

        // }, 300);
    });


    return $.ajax();
};