var cuantosUsuarios;
var arrayUsuarios = [];
var dataSet = [];
var elUsuarioEditar;
var selectedFile;
var jsonGpoUsuarios;

function activaSecUsuarios() {
    log('activaSecUsuarios');

    // $('.panel-header div h3').html('Objetos de Aprendizaje');
    $('#subtituloSeccion').html('');


    cuentaUsuarios();

    // QUITAR
    // enviarCorreo('ujulitos@mailinator.com');
}


function cuentaUsuarios() {
    log('cuentaUsuarios');

    var contadorUsuarios = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            // log('snapshot.val()', snapshot.val());
            arrayUsuarios = [];

            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot', childSnapshot.key);

                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        // log('childSnapshot.key', childSnapshot.key);

                        contadorUsuarios++;

                        this['usuarioId' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                        // log(contadorUsuarios, 'usuarioId', this['usuarioId' + contadorUsuarios]);
                        // this['usuarioClave' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Clave').val();
                        // log(contadorUsuarios, 'usuarioClave', this['usuarioClave' + contadorUsuarios]);
                        this['usuarioNombre' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        // log(contadorUsuarios, 'usuarioNombre', this['usuarioNombre' + contadorUsuarios]);
                        this['usuarioApellidoPaterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        // log(contadorUsuarios, 'ApellidoPaterno', this['usuarioApellidoPaterno' + contadorUsuarios]);
                        this['usuarioApellidoMaterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        // log(contadorUsuarios, 'usuarioApellidoMaterno', this['usuarioApellidoMaterno' + contadorUsuarios]);  
                        this['usuarioPuesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                        // log(contadorUsuarios, 'usuarioPuesto', this['usuarioPuesto' + contadorUsuarios]);  
                        this['usuarioGrupo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Grupo').val();
                        // log(contadorUsuarios, 'usuarioGrupo', this['usuarioGrupo' + contadorUsuarios]);
                        this['usuarioCorreo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo').val();
                        // log(contadorUsuarios, 'usuarioCorreo', this['usuarioCorreo' + contadorUsuarios]);
                        this['usuarioNivel' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nivel').val();
                        // log(contadorUsuarios, 'usuarioNivel', this['usuarioNivel' + contadorUsuarios]);
                        this['usuarioPerfil' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        // log(contadorUsuarios, 'usuarioPerfil', this['usuarioPerfil' + contadorUsuarios]);
                        this['usuarioPuesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                        // log(contadorUsuarios, 'usuarioPuesto', this['usuarioPuesto' + contadorUsuarios]);
                        this['usuarioVisible' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Visible').val();
                        // log(contadorUsuarios, 'usuarioVisible', this['usuarioVisible' + contadorUsuarios]); 
                        // this['usuarioActivo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Activo').val();
                        // log(contadorUsuarios, 'usuarioActivo', this['usuarioActivo' + contadorUsuarios]);

                        arrayUsuarios.push({
                            'usuarioId': this['usuarioId' + contadorUsuarios],
                            // 'usuarioClave': this['usuarioClave' + contadorUsuarios],
                            'usuarioNombre': this['usuarioNombre' + contadorUsuarios],
                            'usuarioApellidoPaterno': this['usuarioApellidoPaterno' + contadorUsuarios],
                            'usuarioApellidoMaterno': this['usuarioApellidoMaterno' + contadorUsuarios],
                            'usuarioPuesto': this['usuarioPuesto' + contadorUsuarios],
                            'usuarioGrupo': this['usuarioGrupo' + contadorUsuarios],
                            'usuarioCorreo': this['usuarioCorreo' + contadorUsuarios],
                            'usuarioPerfil': this['usuarioPerfil' + contadorUsuarios],
                            'usuarioPuesto': this['usuarioPuesto' + contadorUsuarios],
                            'usuarioVisible': this['usuarioVisible' + contadorUsuarios]
                        });
                    }

                });

                cuantosUsuarios = contadorUsuarios;
                log('arrayUsuarios', arrayUsuarios);
                those = this;

                return pintaUsuarios().then(function() {
                    activaBotonesUsuarios().then(function() {
                        cargador('oculta');
                    });
                });

            }
        });

    }
}


function pintaUsuarios() {
    log('pintaUsuarios');
    dataSet = [];
    var elUsuarioVisible;

    for (a = 0; a < arrayUsuarios.length; a++) {
        if (arrayUsuarios[a].usuarioVisible) {
            elUsuarioVisible = '<div id="botonVisibleUsu' + a + '" usuVisibleId="' + arrayUsuarios[a].usuarioId + '" class="btn btn-sm btn-toggle btn-visibleUsuario active" data-toggle="button"> <div class="handle"></div> </div>';
        } else {
            elUsuarioVisible = '<div id="botonVisibleUsu' + a + '" usuVisibleId="' + arrayUsuarios[a].usuarioId + '" class="btn btn-sm btn-toggle btn-visibleUsuario" data-toggle="button"> <div class="handle"></div> </div>';
        }

        dataSet[a] = [
            arrayUsuarios[a].usuarioId,
            // arrayUsuarios[a].usuarioClave,
            arrayUsuarios[a].usuarioNombre + ' ' + arrayUsuarios[a].usuarioApellidoPaterno + ' ' + arrayUsuarios[a].usuarioApellidoMaterno,
            arrayUsuarios[a].usuarioCorreo,
            elUsuarioVisible,

            '<div style="display: flex;">' +
            '<div id="botonEditarUsuario' + (a + 1) + '" usuid="' + arrayUsuarios[a].usuarioId + '" class="btn btn-round btn-icon btn-verde2 float-right botonEditarUsuario" data-toggle="modal" data-target="#modalEditarUsuario">' +
            '<i class="nc-icon-outline ui-1_pencil"></i></div>' + ' ' +
            '<div id="botonEliminarUsuario' + (a + 1) + '" usuid="' + arrayUsuarios[a].usuarioId + '" class="btn btn-round btn-icon btn-primary float-right botonEliminarUsuario">' + '<i class="nc-icon-outline ui-1_trash-simple"></i></div>' +
            '</div>'
        ];
    }
    log('dataSet ', dataSet);



    var contenidoSecUsuarios = '';
    $('.usuarios_int').empty();

    contenidoSecUsuarios += '<br><br><br>';
    contenidoSecUsuarios += '<label id="botonAgregarUsuario" class="btn btn-primary btn-round item boton_gris2_alt" style="float: right; margin-top: -60px; margin-right: 250px;"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Usuario</label>';

    contenidoSecUsuarios += '<label id="botonAgregarGrupoUsuarios" class="btn btn-primary btn-round item boton_gris2_alt" style="float: right; margin-top: -60px;"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp;<i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Grupo de Usuarios</label>';

    contenidoSecUsuarios += '<div class="card cardUsuarios">';
    contenidoSecUsuarios += '   <div class="card-body">';
    contenidoSecUsuarios += '       <table id="tablaUsuarios" class="table table-striped dataTable dtr-inline" role="grid" aria-describedby="datatable_info" style="width: 100%;" width="100%" cellspacing="0">';
    contenidoSecUsuarios += '           <thead></thead>';
    contenidoSecUsuarios += '       </table>';
    contenidoSecUsuarios += '       <div class="toolbar"></div>';
    contenidoSecUsuarios += '   </div>';
    contenidoSecUsuarios += '</div>';


    $('.usuarios_int').append(contenidoSecUsuarios);

    $('.usuarios_int').css({
        'display': 'block'
    });


    tablaUsuarios = $('#tablaUsuarios').DataTable({
        data: dataSet,
        "destroy": true,
        "language": {
            "url": "js/dataTable_spanish.json"
        },
        columns: [{
            //     title: 'Id'
            // }, {
            title: 'Clave'
        }, {
            title: 'Nombre'
        }, {
            title: 'Correo'
        }, {
            title: 'Visible'
        }, {
            title: ' '
        }],
        "initComplete": function(settings) {
            $('input[type=search]').val('-');
            setTimeout(function() {
                $('input[type=search]').val('');
            }, 300);
        }
    });


    return $.ajax();
};


function activaBotonesUsuarios() {
    log('activaBotonesUsuarios');

    $(document).off('click', '#botonAgregarUsuario').on('click', '#botonAgregarUsuario', function(event) {
        event.preventDefault();
        elUsuarioEditar = null;
        secAgregaEditaUsuario(true);
    });

    $(document).off('click', '#botonAgregarGrupoUsuarios').on('click', '#botonAgregarGrupoUsuarios', function(event) {
        event.preventDefault();
        secAgregaGrupoUsuarios();
    });

    for (a = 1; a <= cuantosUsuarios; a++) {

        $(document).off('click', '#botonVisibleUsu' + a).on('click', '#botonVisibleUsu' + a, function(event) {
            event.preventDefault();

            var elUsuario = $(this).attr('usuvisibleid');
            var elVisible = false;
            if ($(this).hasClass('active')) {
                elVisible = true;
            }
            editaVisibleUsuario(elUsuario, elVisible);
        });

        $(document).off('click', '#botonEditarUsuario' + a).on('click', '#botonEditarUsuario' + a, function(event) {
            event.preventDefault();
            elUsuarioEditar = parseInt($(this).attr('id').substr(18, 5));
            log('elUsuarioEditar', elUsuarioEditar);
            secAgregaEditaUsuario(false);
        });

        $(document).off('click', '#botonEliminarUsuario' + a).on('click', '#botonEliminarUsuario' + a, function(event) {
            event.preventDefault();
            var elUsuario = $(this).attr('usuid');
            log('elUsuario', elUsuario);
            eliminarUsuario(elUsuario);
        });

    }

    $(document).off('click', '#botonCancelarUsuario').on('click', '#botonCancelarUsuario', function(event) {
        event.preventDefault();
        regresaUsuarios();
    });
    $(document).off('click', '#botonCancelarGpoUsuarios').on('click', '#botonCancelarGpoUsuarios', function(event) {
        event.preventDefault();
        regresaUsuarios();
    });

    $(document).off('click', '#botonGuardaUsuario').on('click', '#botonGuardaUsuario', function(event) {
        event.preventDefault();
        guardaUsuario();
    });


    // grupo de usuarios
    $(document).off('change', '#fileUpload').on('change', '#fileUpload', function(event) {
        event.preventDefault();
        selectedFile = event.target.files[0];
        log("selectedFile", selectedFile);
        $('#uploadExcel').show();
        habilitaBoton($('#botonGuardaGpoUsuarios'), false);
    });

    $(document).off('click', '#uploadExcel').on('click', '#uploadExcel', function(event) {
        event.preventDefault();
        subeGrupoUsuarios(selectedFile);
    });

    $(document).off('click', '#botonGuardaGpoUsuarios').on('click', '#botonGuardaGpoUsuarios', function(event) {
        event.preventDefault();
        var conErrores = false;
        var listaErrores = [];

        $('#texto_error_nombreUsu').html('');

        /////////////////////
        guardaGpoUsuarioBD();
        /////////////////////

    });


    return $.ajax();
}


function guardaUsuario() {
    var conErrores = false;
    var listaErrores = [];
    var usuarioId;

    $('#texto_error_idUsu').html('');
    // $('#texto_error_claveUsu').html('');
    $('#texto_error_nombreUsu').html('');
    $('#texto_error_apellidoPatUsu').html('');
    $('#texto_error_apellidoMatUsu').html('');
    $('#texto_error_puestoUsu').html('');
    $('#texto_error_grupoUsu').html('');
    $('#texto_error_correoUsu').html('');
    $('#texto_error_perfilUsu').html('');
    $('#texto_error_contrasenaUsu').html('');


    if ($('#idUsuario').val().length <= 0) {
        $('#texto_error_idUsu').html('* Este campo es requerido');
        listaErrores[0] = 'idUsuario';
    } else {
        listaErrores[0] = ''
    }
    // if ($('#claveUsuario').val().length <= 0) {
    //     $('#texto_error_claveUsu').html('* Este campo es requerido');
    //     listaErrores[0] = 'claveUsuario';
    // } else {
    //     listaErrores[0] = ''
    // }
    if ($('#nombreUsuario').val().length <= 0) {
        $('#texto_error_nombreUsu').html('* Este campo es requerido');
        listaErrores[1] = 'nombreUsuario';
    } else {
        listaErrores[1] = ''
    }
    if ($('#apellidoPatUsuario').val().length <= 0) {
        $('#texto_error_apellidoPatUsu').html('* Este campo es requerido');
        listaErrores[2] = 'apellidoPatUsuario';
    } else {
        listaErrores[2] = ''
    }
    if ($('#apellidoMatUsuario').val().length <= 0) {
        $('#texto_error_apellidoMatUsu').html('* Este campo es requerido');
        listaErrores[3] = 'apellidoMatUsuario';
    } else {
        listaErrores[3] = ''
    }
    if ($('#puestoUsuario').val().length <= 0) {
        $('#texto_error_puestoUsu').html('* Este campo es requerido');
        listaErrores[4] = 'puestoUsuario';
    } else {
        listaErrores[4] = ''
    }
    if ($('#grupoUsuario').val().length <= 0) {
        $('#texto_error_grupoUsu').html('* Este campo es requerido');
        listaErrores[5] = 'grupoUsuario';
    } else {
        listaErrores[5] = ''
    }
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!regex.test($('#correoUsuario').val().trim())) {
        $('#texto_error_correoUsu').html('* El formato del correo introducido no es correcto');
        listaErrores[6] = 'correoUsuario';
    } else {
        listaErrores[6] = ''
    }
    if ($('#perfilUsuario').val() <= 0) {
        $('#texto_error_perfilUsu').html('* Este campo es requerido');
        listaErrores[7] = 'perfilUsuario';
    } else {
        listaErrores[7] = ''
    }
    if ($('#contrasenaUsuario1').val().length <= 7 || ($('#contrasenaUsuario1').val() != $('#contrasenaUsuario2').val())) {
        $('#texto_error_contrasenaUsu').html('* La contraseña debe tener mínimo 8 caracteres y los dos campos deben coincidir');
        listaErrores[8] = 'contrasenaUsuario';
    } else {
        listaErrores[8] = ''
    }

    log('listaErrores:', listaErrores);
    var cont = 0;
    for (a = 0; a < listaErrores.length; a++) {
        if (listaErrores[a] != '') {
            conErrores = true;
            log('con errores');
        }
    }
    if (!conErrores) {
        log('sin errores');

        // TODO validar id duplicados
        // if (elUsuarioEditar == null) {
        //     usuarioId = generarId();
        //     IdUsuario = usuarioId;
        // } else {
        //     IdUsuario = arrayUsuarios[(elUsuarioEditar - 1)].usuarioId;
        // }
        // log("IdUsuario", IdUsuario);

        var usuarioVisible = false;
        if ($('#botonVisibleUsuario').hasClass('active')) {
            usuarioVisible = true;
        }
        var laContrasena = md5($('#contrasenaUsuario1').val());

        var usuario = {};
        usuario.Id = $('#idUsuario').val();
        // usuario.Clave = $('#claveUsuario').val();
        usuario.Nombre = $('#nombreUsuario').val();
        usuario.Apellido_Paterno = $('#apellidoPatUsuario').val();
        usuario.Apellido_Materno = $('#apellidoMatUsuario').val();
        usuario.Puesto = $('#puestoUsuario').val();
        usuario.Grupo = $('#grupoUsuario').val();
        usuario.Correo = $('#correoUsuario').val();
        usuario.Perfil = $('#perfilUsuario').val();
        usuario.Contrasena = laContrasena;
        usuario.Visible = usuarioVisible;
        usuario.Nivel = 1;
        usuario.Puesto = 'Empleado';

        /////////////////////
        guardaUsuarioBD(usuario);
        /////////////////////

    }
}


function subeGrupoUsuarios(selectedFile) {

    var formatoOK = false;

    if (selectedFile) {
        log("subeGrupoUsuarios");

        $('#uploadExcel').hide();

        var fileReader = new FileReader();
        fileReader.onload = function(event) {
            var data = event.target.result;

            var workbook = XLSX.read(data, {
                type: "binary",
            });
            workbook.SheetNames.forEach((sheet) => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets[sheet]
                );
                let jsonObject = JSON.stringify(rowObject);

                jsonObject = JSON.parse(jsonObject);
                var elKey;

                log("jsonObject", jsonObject);
                log("Object.keys(jsonObject).length", Object.keys(jsonObject).length);

                // se valida el formato
                for (a = 0; a < Object.keys(jsonObject).length; a++) {
                    if (
                        // jsonObject[a].Id &&
                        jsonObject[a].Clave &&
                        jsonObject[a].Nombre &&
                        jsonObject[a].Contrasena &&
                        jsonObject[a].Correo &&
                        jsonObject[a].Apellido_Paterno &&
                        jsonObject[a].Apellido_Materno &&
                        jsonObject[a].Puesto &&
                        jsonObject[a].Perfil &&
                        jsonObject[a].Grupo &&
                        jsonObject[a].Visible
                    ) {
                        formatoOK = true;
                    }
                    log("formatoOK", formatoOK);
                }
                if (formatoOK) {

                    for (a = 0; a < Object.keys(jsonObject).length; a++) {
                        // TODO validar id duplicados
                        // elKey = generarId();
                        elKey = jsonObject[a].Clave;
                        delete jsonObject[a].Clave;
                        jsonObject[a]["usuario_" + elKey] = {};
                        jsonObject[a]["usuario_" + elKey].Id = elKey;
                        delete jsonObject[a].Id;
                        // jsonObject[a]["usuario_" + elKey].Clave = jsonObject[a].Clave;
                        // delete jsonObject[a].Clave;
                        jsonObject[a]["usuario_" + elKey].Activo = false;
                        jsonObject[a]["usuario_" + elKey].Nivel = 1;
                        // jsonObject[a]["usuario_" + elKey].Asignacion = {
                        //     'val': true
                        // };
                        jsonObject[a]["usuario_" + elKey].Nombre = jsonObject[a].Nombre;
                        delete jsonObject[a].Nombre;
                        jsonObject[a]["usuario_" + elKey].Contrasena = jsonObject[a].Contrasena.replaceAll(jsonObject[a].Contrasena, md5(jsonObject[a].Contrasena));
                        delete jsonObject[a].Contrasena;
                        jsonObject[a]["usuario_" + elKey].Correo = jsonObject[a].Correo;
                        delete jsonObject[a].Correo;
                        jsonObject[a]["usuario_" + elKey].Apellido_Paterno = jsonObject[a].Apellido_Paterno;
                        delete jsonObject[a].Apellido_Paterno;
                        jsonObject[a]["usuario_" + elKey].Apellido_Materno = jsonObject[a].Apellido_Materno;
                        delete jsonObject[a].Apellido_Materno;
                        if (jsonObject[a].Perfil == 1 || jsonObject[a].Perfil == '1') {
                            jsonObject[a]["usuario_" + elKey].Perfil = 'Administrador';
                        }
                        if (jsonObject[a].Perfil == 2 || jsonObject[a].Perfil == '2') {
                            jsonObject[a]["usuario_" + elKey].Perfil = 'Creador de contenidos';
                        }
                        if (jsonObject[a].Perfil == 3 || jsonObject[a].Perfil == '3') {
                            jsonObject[a]["usuario_" + elKey].Perfil = 'Asesor Académico';
                        }
                        if (jsonObject[a].Perfil == 4 || jsonObject[a].Perfil == '4') {
                            jsonObject[a]["usuario_" + elKey].Perfil = 'Observador';
                        }
                        if (jsonObject[a].Perfil == 5 || jsonObject[a].Perfil == '5') {
                            jsonObject[a]["usuario_" + elKey].Perfil = 'Participante';
                        }
                        delete jsonObject[a].Perfil;
                        jsonObject[a]["usuario_" + elKey].Puesto = jsonObject[a].Puesto;
                        delete jsonObject[a].Puesto;
                        jsonObject[a]["usuario_" + elKey].Grupo = jsonObject[a].Grupo;
                        delete jsonObject[a].Grupo;
                        jsonObject[a]["usuario_" + elKey].Visible = jsonObject[a].Visible;
                        delete jsonObject[a].Visible;
                    }

                    jsonObject = JSON.stringify(jsonObject);
                    let jsonObjectResult;

                    function reemplaza() {
                        jsonObjectResult = jsonObject;
                        jsonObjectResult = jsonObjectResult.replaceAll('[{', '{');
                        jsonObjectResult = jsonObjectResult.replaceAll('}]', '}');
                        jsonObjectResult = jsonObjectResult.replaceAll('}},{', '},');
                        jsonObjectResult = jsonObjectResult.replaceAll('"true"', 'true');
                        jsonObjectResult = jsonObjectResult.replaceAll('"false"', 'false');

                        log('jsonObjectResult', jsonObjectResult);
                        jsonGpoUsuarios = JSON.parse(jsonObjectResult);
                        log('jsonGpoUsuarios', jsonGpoUsuarios);
                    }

                    reemplaza();


                    $('#modalOKGpoUsuarios').modal({
                        transition: 'scale'
                    }).modal('show');
                    $('#texto_error_GpoUsu').html('');
                    habilitaBoton($('#botonGuardaGpoUsuarios'), true);
                    $(document).off('click', '#botonOKGpoUsuarios').on('click', '#botonOKGpoUsuarios', function(e) {});

                } else {
                    $('#texto_error_GpoUsu').html('* El formato no es correcto');
                    $('#uploadExcel').show();
                    habilitaBoton($('#botonGuardaGpoUsuarios'), false);
                }
                // document.getElementById("jsonData").innerHTML = jsonObjectResult;
            });
        };
        fileReader.readAsBinaryString(selectedFile);

    } else {

        $('#texto_error_GpoUsu').html('* El formato no es correcto');
        $('#uploadExcel').show();
        habilitaBoton($('#botonGuardaGpoUsuarios'), false);

    }
}


// TODO enviar correo
function enviarCorreo(cualCorreo) {
    log('enviarCorreo', cualCorreo);

    function onSuccess() {
        log('correo enviado a ' + cualCorreo);
        regresaUsuarios();
    }

    function onError(error) {
        log('no se pudo enviar el correo');
    }

    $.post('php/send_mail.php' + '?destino=' + cualCorreo,
        onSuccess
    ).fail(onError);

    return false;
}


function secAgregaEditaUsuario(modoAgregar) {
    log('secAgregaEditaUsuario', elUsuarioEditar, modoAgregar);

    $(window).scrollTop(0);

    elRecursoIndex = 0;

    $('.usuarios_int').css({
        'display': 'none'
    });
    $("#secEditarUsuario").css({
        'display': 'block'
    });

    if (modoAgregar) {
        $("#titulo_modal_usuario").html('Agregar Usuario');

        $("#idUsuario").val('');
        // $("#claveUsuario").val('');
        $("#nombreUsuario").val('');
        $('#apellidoPatUsuario').val('');
        $('#apellidoMatUsuario').val('');
        $('#puestoUsuario').val('');
        $('#grupoUsuario').val('');
        $('#correoUsuario').val('');
        $('#perfilUsuario').val('');
        $('#botonVisibleUsuario').removeClass('active');
        $('#contrasenaUsuario1').val('');
        $('#contrasenaUsuario2').val('');
    } else {
        $("#titulo_modal_usuario").html('Editar Usuario');

        $("#idUsuario").val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioId);
        // $("#claveUsuario").val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioClave);
        $("#nombreUsuario").val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioNombre);
        $('#apellidoPatUsuario').val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioApellidoPaterno);
        $('#apellidoMatUsuario').val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioApellidoMaterno);
        $('#puestoUsuario').val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioPuesto);
        $('#grupoUsuario').val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioGrupo);
        $('#correoUsuario').val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioCorreo);
        // $('#perfilUsuario').val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioPerfil); 
        $('#botonVisibleUsuario').removeClass('active');
        if (arrayUsuarios[(elUsuarioEditar - 1)].usuarioVisible) {
            $('#botonVisibleUsuario').addClass('active');
        }
        $('#contrasenaUsuario1').val('');
        $('#contrasenaUsuario2').val('');



        // var res = arrayUsuarios.findIndex(arrayUsuarios => arrayUsuarios.usuarioId === elUsuarioEditar);
        // log('res', res);
        log(arrayUsuarios[(elUsuarioEditar - 1)]);
    }

    // mensajes de error //
    $('#texto_error_idUsu').html('');
    // $('#texto_error_claveUsu').html('');
    $('#texto_error_nombreUsu').html('');
    $('#texto_error_apellidoPatUsu').html('');
    $('#texto_error_apellidoMatUsu').html('');
    $('#texto_error_puestoUsu').html('');
    $('#texto_error_grupoUsu').html('');
    $('#texto_error_correoUsu').html('');
    $('#texto_error_perfilUsu').html('');
    $('#texto_error_contrasenaUsu').html('');

    $('.perfilesContenido').empty();

    $.getJSON("data/perfiles.json", function(result) {
        var options = "";
        $.each(result, function(i, pf) {
            if (pf.perfil === "Selecciona una opción") {
                options += "<option value='" + pf.perfil + "' selected disabled>" + pf.perfil + "</option>";
            } else if (pf.perfil === "Multi") {
                pf.perfil = null;
            } else if (pf.perfil === "SuperAdmin") {
                pf.perfil = null;
            } else {
                options += "<option value='" + pf.perfil + "' id='perfilUsuario" + i + "'>" + pf.perfil + "</option>";
            }

        });
        // log('options', options);
        $('.perfilesContenido').append(options);

        if (!modoAgregar) {
            $('#perfilUsuario').val(arrayUsuarios[(elUsuarioEditar - 1)].usuarioPerfil);
        }
    });

}

function secAgregaGrupoUsuarios() {
    log('secAgregaGrupoUsuarios');

    $(window).scrollTop(0);


    $("#titulo_modal_gpo_usuario").html('Agregar Grupo de Usuarios');
    $('.usuarios_int').css({
        'display': 'none'
    });
    $("#secGrupoUsuarios").css({
        'display': 'block'
    });
    $('#uploadExcel').show();
    habilitaBoton($('#botonGuardaGpoUsuarios'), false);

    // mensajes de error //
    $('#texto_error_GpoUsu').html('');

}

function guardaUsuarioBD(elUsuario) {
    log("guardaUsuarioBD", elUsuario);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
            // enviarCorreo($("#correoUsuario").val());
            regresaUsuarios();
        }
    };

    if (revisaConexion) {

        var elRefNuevoUsuario = laUrlBase + 'Usuarios/' + 'usuario_' + elUsuario.Id;
        log('elRefNuevoUsuario: ', elRefNuevoUsuario);

        firebase.database().ref(elRefNuevoUsuario).once('value').then(function(snapshot) {
            firebase.database().ref(elRefNuevoUsuario).update(elUsuario, onComplete);
        });

    }
}


function guardaGpoUsuarioBD() {
    log('guardaGpoUsuarioBD', jsonGpoUsuarios);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
            regresaUsuarios();
        }
    };

    if (revisaConexion) {

        var elRefNuevoGpoUsuarios = laUrlBase + 'Usuarios/';
        log('elRefNuevoGpoUsuarios: ', elRefNuevoGpoUsuarios);

        firebase.database().ref(elRefNuevoGpoUsuarios).once('value').then(function(snapshot) {
            firebase.database().ref(elRefNuevoGpoUsuarios).update(jsonGpoUsuarios, onComplete);
        });

    }
}


function eliminarUsuario(cualUsuario) {
    log("eliminarUsuario", cualUsuario);

    $('#modalBorrarUsuario').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarBorrarUsuario').on('click', '#botonCancelarBorrarUsuario', function(e) {});
    $(document).off('click', '#botonAceptarBorrarUsuario').on('click', '#botonAceptarBorrarUsuario', function(e) {

        eliminaUsuarioBD(cualUsuario);
    });

};

function eliminaUsuarioBD(usuarioEliminar) {
    log('eliminaUsuarioBD: ', usuarioEliminar);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
            regresaUsuarios();
        }
    };

    if (revisaConexion) {

        var elRefEliminaUsuario = laUrlBase + 'Usuarios/' + 'usuario_' + usuarioEliminar;
        log('elRefEliminaUsuario: ', elRefEliminaUsuario);

        firebase.database().ref(elRefEliminaUsuario).once('value').then(function(snapshot) {
            firebase.database().ref(elRefEliminaUsuario).remove(onComplete);
        });

    }
}


function editaVisibleUsuario(cualUsuarioVisible, siVisible) {
    log("editaVisibleUsuario", cualUsuarioVisible, siVisible);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
            // $('.btn-VisibleUsuario').find(cualUsuarioVisible).addClass('active');
            // cuentaUsuarios();
        }
    };

    if (revisaConexion) {

        var usuario = {};
        usuario.Visible = siVisible;


        var elRefVisibleUsuario = laUrlBase + 'Usuarios/' + 'usuario_' + cualUsuarioVisible;
        log('elRefVisibleUsuario: ', elRefVisibleUsuario);

        firebase.database().ref(elRefVisibleUsuario).once('value').then(function(snapshot) {
            firebase.database().ref(elRefVisibleUsuario).update(usuario, onComplete);
        });

    }
};


function regresaUsuarios() {

    $('#texto_error_idUsu').html('');
    // $('#texto_error_claveUsu').html('');
    $('#texto_error_nombreUsu').html('');
    $('#texto_error_apellidoPatUsu').html('');
    $('#texto_error_apellidoMatUsu').html('');
    $('#texto_error_puestoUsu').html('');
    $('#texto_error_grupoUsu').html('');

    $("#secEditarUsuario").css({
        'display': 'none'
    });
    $("#secGrupoUsuarios").css({
        'display': 'none'
    });

    cuentaUsuarios();

}