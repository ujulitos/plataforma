var dataSet;
var tablaUsuarios;
var cuantosUsuarios;
var elCorreoUsuExiste;
var that;

/////////////////Registrar Usuario x Administrador[Inicio]\\\\\\\\\\\\\\\\\\\\\
function _cleanFieldsRegistro() {
    $("._registro").val('');
    $("#_usuNvoPerfil").val('Participante');
    $("#_usuNvoPais").val('México');
    $("#_usuNvoFechaGenero").val('Femenino');
    $("#_usuNvoNotificaciones").addClass('active');
    $("#_errorRegistro").html("").addClass('ocultar');
}

function __RegistroUsuario() {
    console.log("Registro de Usuarios");
    var _listError = "";
    var userToRegister = {};
    userToRegister.Nombre = $("#_usuNvoNombre").val();
    if (userToRegister.Nombre.length === 0) {
        _listError += "<li><strong>Nombre</strong> está vacío.</li>";
    }
    userToRegister.Apellido_Paterno = $("#_usuNvoAPaterno").val();
    if (userToRegister.Apellido_Paterno.length === 0) {
        _listError += "<li><strong>Apellido Paterno</strong> está vacío.</li>";
    }
    userToRegister.Apellido_Materno = $("#_usuNvoAMaterno").val();
    if (userToRegister.Apellido_Materno.length === 0) {
        _listError += "<li><strong>Apellido Materno</strong> está vacío.</li>";
    }
    userToRegister.Organizacion = $("#_usuNvoOrganizacion").val();
    // if (userToRegister.Organizacion.length === 0) {
    //     _listError += "<li><strong>Organización</strong> está vacío.</li>";
    // }
    userToRegister.Area_funcional = $("#_usuNvoArea").val();
    // if (userToRegister.Area_funcional.length === 0) {
    //     _listError += "<li><strong>Área</strong> está vacío.</li>";
    // }
    userToRegister.Puesto = $("#_usuNvoPuesto").val();
    // if (userToRegister.Puesto.length === 0) {
    //     _listError += "<li><strong>Puesto</strong> está vacío.</li>";
    // }
    userToRegister.Fecha_nacimiento = $("#_usuNvoFechaNacimiento").val();
    // if (userToRegister.Fecha_nacimiento.length === 0) {
    //     _listError += "<li><strong>Fecha Nacimiento</strong> está vacío.</li>";
    // }
    userToRegister.Fecha_ingreso = $("#_usuNvoFechaIngreso").val();
    // if (userToRegister.Fecha_ingreso.length === 0) {
    //     _listError += "<li><strong>Fecha Ingreso</strong> está vacío.</li>";
    // }
    userToRegister.Nivel = $("#_usuNvoNivel").val();
    // if (userToRegister.Nivel.length === 0) {
    //     _listError += "<li><strong>Nivel</strong> está vacío.</li>";
    // }
    userToRegister.Nombre_jefe = $("#_usuNvoNombreJefe").val();
    // if (userToRegister.Nombre_jefe.length === 0) {
    //     _listError += "<li><strong>Nombre del Jefe</strong> está vacío.</li>";
    // }
    userToRegister.Correo_jefe = $("#_usuNvoCorreoJefe").val();
    // if (userToRegister.Correo_jefe.length === 0) {
    //     _listError += "<li><strong>Correo del Jefe</strong> está vacío.</li>";
    // }
    // if (!EmailSimpleValidator(userToRegister.Correo_jefe)) {
    //     _listError += "<li>Formato del <strong>Correo del Jefe</strong> incorrecto.</li>";
    // }
    userToRegister.RFC = $("#_usuNvoRFC").val();
    // if (userToRegister.RFC.length === 0) {
    //     _listError += "<li><strong>RFC</strong> está vacío.</li>";
    // }
    userToRegister.CURP = $("#_usuNvoCurp").val();
    // if (userToRegister.CURP.length === 0) {
    //     _listError += "<li><strong>CURP</strong> está vacío.</li>";
    // }
    userToRegister.Numero_colaborador = $("#_usuNvoNumeroColaborador").val();
    if (userToRegister.Numero_colaborador.length === 0) {
        _listError += "<li><strong>Número de Colaborador</strong> está vacío.</li>";
    }

    userToRegister.Correo = $("#_usuNvoCorreo").val();
    if (userToRegister.Correo.length === 0) {
        _listError += "<li><strong>Correo</strong> está vacío.</li>";
    }
    if (!EmailSimpleValidator(userToRegister.Correo)) {
        _listError += "<li>Formato del <strong>Correo</strong> incorrecto.</li>";
    }

    console.log('elCorreoUsuExiste', elCorreoUsuExiste);

    if (elCorreoUsuExiste == true) {
        _listError += "<li><strong>El Correo ingresado ya existe,</strong> por favor utilice otro.</li>";
    }

    userToRegister.Contrasena = $("#_usuNvoContrasena1").val();
    if (userToRegister.Contrasena.length === 0) {
        _listError += "<li><strong>Contraseña</strong> está vacío.</li>";
    }
    if (userToRegister.Contrasena.length < 6) {
        _listError += "<li>Su contraseña <strong> debe tener al menos 6 caracteres</strong></li>";
    }
    var password_repeat = $("#_usuNvoContrasena2").val();
    if (password_repeat.length === 0) {
        _listError += "<li><strong>Confirmar contraseña</strong> está vacío.</li>";
    }
    if (userToRegister.Contrasena !== password_repeat) {
        _listError += "<li>Sus <strong>contraseñas</strong> no coinciden.</li>";
    }

    userToRegister.Pais = $("#_usuNvoPais").val();
    userToRegister.Perfil = $("#_usuNvoPerfil").val();
    // userToRegister.Notificaciones = $("#_usuNvoNotificaciones").hasClass('active');
    userToRegister.Notificaciones = true;
    userToRegister.Genero = $("#_usuNvoFechaGenero").val();

    if (_listError.length > 0) {
        var mensajeError = "<strong>Campos con problemas: </strong><ul>" + _listError + "</ul>";
        $("#_errorRegistro").html(mensajeError).removeClass('ocultar');
    } else {
        _listError = "";
        var usuarioId = generarId();
        userToRegister.Id = "usuario_" + usuarioId;
        // userToRegister.FechaAlta = moment().format();
        userToRegister.Visible = true;
        userToRegister.Activo = false;
        userToRegister.Fecha_nacimiento = moment(userToRegister.Fecha_nacimiento, "DD/MM/YYYY").format();
        userToRegister.Fecha_ingreso = moment(userToRegister.Fecha_ingreso, "DD/MM/YYYY").format();
        userToRegister.Contrasena = md5(userToRegister.Contrasena);


        _saveUser(userToRegister);
    }
}

function _saveUser(userToRegister) {

    var onComplete = function(error) {
        $("#modalAgregaUsuario .close").click();

        if (error) {
            $.notify({
                message: 'Ocurrió un error en la sincronización.'
            }, {
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Ocurrió un error en la sincronización.');
            $(".mensaje_error_nvo_usuario").text('');
        } else {
            tablaUsuarios.destroy();
            _cleanFieldsRegistro();
            $("#modalAgregaUsuario .close").click();
            setTimeout(cuentaUsuarios(), 100);
            $.notify({
                message: 'El usuario se agregó correctamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
        }
    };
    console.log('[ADMINISTRADOR: registro] Usuario a Registrar: ');
    console.log(userToRegister);

    if (revisaConexion) {
        var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
        var keyUsuario = dataRef.ref.child(userToRegister.Id);

        console.log('[ADMINISTRADOR: registro] Registrando: ' + userToRegister.Nombre);
        firebase.database().ref(keyUsuario).set(userToRegister, onComplete);
    }


}
/////////////////Registrar Usuario x Administrador[Final]\\\\\\\\\\\\\\\\\\\\\

////////////////Editar Usuario[Inicio]\\\\\\\\\\\\\\\\\\\\\\\\\\\
function cleanFieldsEditUser() {
    $("._registro").val('');
    $("#e_usuNvoPerfil").val('Participante');
    $("#e_usuNvoPais").val('México');
    $("#e_usuNvoFechaGenero").val('Femenino');
    $("#e_usuNvoNotificaciones").addClass('active');
    $("#e_errorRegistro").html("").addClass('ocultar');
}

function EditarUsuario() {
    console.log("Registro de Usuarios");
    var IdUser = $("#ideuser").html();
    console.log("IDUsuario:");
    console.log(IdUser);
    var listError = "";
    var userToEdit = {};
    userToEdit.Nombre = $("#e_usuNvoNombre").val();
    if (userToEdit.Nombre.length === 0) {
        listError += "<li><strong>Nombre</strong> está vacío.</li>";
    }
    userToEdit.Apellido_Paterno = $("#e_usuNvoAPaterno").val();
    if (userToEdit.Apellido_Paterno.length === 0) {
        listError += "<li><strong>Apellido Paterno</strong> está vacío.</li>";
    }
    userToEdit.Apellido_Materno = $("#e_usuNvoAMaterno").val();
    if (userToEdit.Apellido_Materno.length === 0) {
        listError += "<li><strong>Apellido Materno</strong> está vacío.</li>";
    }
    userToEdit.Organizacion = $("#e_usuNvoOrganizacion").val();
    // if (userToEdit.Organizacion.length === 0) {
    //     listError += "<li><strong>Organización</strong> está vacío.</li>";
    // }
    userToEdit.Area_funcional = $("#e_usuNvoArea").val();
    // if (userToEdit.Area_funcional.length === 0) {
    //     listError += "<li><strong>Área</strong> está vacío.</li>";
    // }
    userToEdit.Puesto = $("#e_usuNvoPuesto").val();
    // if (userToEdit.Puesto.length === 0) {
    //     listError += "<li><strong>Puesto</strong> está vacío.</li>";
    // }
    userToEdit.Fecha_nacimiento = $("#e_usuNvoFechaNacimiento").val();
    // if (userToEdit.Fecha_nacimiento.length === 0) {
    //     listError += "<li><strong>Fecha Nacimiento</strong> está vacío.</li>";
    // }
    userToEdit.Fecha_ingreso = $("#e_usuNvoFechaIngreso").val();
    // if (userToEdit.Fecha_ingreso.length === 0) {
    //     listError += "<li><strong>Fecha Ingreso</strong> está vacío.</li>";
    // }
    userToEdit.Nivel = $("#e_usuNvoNivel").val();
    // if (userToEdit.Nivel.length === 0) {
    //     listError += "<li><strong>Nivel</strong> está vacío.</li>";
    // }
    userToEdit.Nombre_jefe = $("#e_usuNvoNombreJefe").val();
    // if (userToEdit.Nombre_jefe.length === 0) {
    //     listError += "<li><strong>Nombre del Jefe</strong> está vacío.</li>";
    // }
    userToEdit.Correo_jefe = $("#e_usuNvoCorreoJefe").val();
    // if (userToEdit.Correo_jefe.length === 0) {
    //     listError += "<li><strong>Correo del Jefe</strong> está vacío.</li>";
    // }
    // if (!EmailSimpleValidator(userToEdit.Correo_jefe)) {
    //     listError += "<li>Formato del <strong>Correo del Jefe</strong> incorrecto.</li>";
    // }
    userToEdit.RFC = $("#e_usuNvoRFC").val();
    // if (userToEdit.RFC.length === 0) {
    //     listError += "<li><strong>RFC</strong> está vacío.</li>";
    // }
    userToEdit.CURP = $("#e_usuNvoCurp").val();
    // if (userToEdit.CURP.length === 0) {
    //     listError += "<li><strong>CURP</strong> está vacío.</li>";
    // }
    userToEdit.Numero_colaborador = $("#e_usuNvoNumeroColaborador").val();
    if (userToEdit.Numero_colaborador.length === 0) {
        listError += "<li><strong>Número de Colaborador</strong> está vacío.</li>";
    }

    userToEdit.Correo = $("#e_usuNvoCorreo").val();
    if (userToEdit.Correo.length === 0) {
        listError += "<li><strong>Correo</strong> está vacío.</li>";
    }
    if (!EmailSimpleValidator(userToEdit.Correo)) {
        listError += "<li>Formato del <strong>Correo</strong> incorrecto.</li>";
    }

    var Contrasena = $("#e_usuNvoContrasena1").val();
    var flag = false;
    if (Contrasena.length !== 0) {
        flag = true; /*Aviso para indicar que se cambiará la contraseña*/
    }
    if (flag && Contrasena.length < 6) {
        listError += "<li>Su contraseña <strong> debe tener al menos 6 caracteres</strong></li>";
    }
    var password_repeat = $("#e_usuNvoContrasena2").val();
    if (flag && password_repeat.length === 0) {
        listError += "<li><strong>Confirmar contraseña</strong> está vacío.</li>";
    }
    if (flag && Contrasena !== password_repeat) {
        listError += "<li>Sus <strong>contraseñas</strong> no coinciden.</li>";
    }

    if (flag) {
        userToEdit.Contrasena = md5(Contrasena);
    }

    userToEdit.Pais = $("#e_usuNvoPais").val();
    userToEdit.Perfil = $("#e_usuNvoPerfil").val();
    // userToEdit.Notificaciones = $("#e_usuNvoNotificaciones").hasClass('active');
    userToEdit.Notificaciones = true;
    userToEdit.Visible = $("#e_visible").hasClass('active');
    userToEdit.Genero = $("#e_usuNvoFechaGenero").val();




    if (listError.length > 0) {
        var mensajeError = "<strong>Campos con problemas: </strong><ul>" + listError + "</ul>";
        $("#e_errorRegistro").html(mensajeError).removeClass('ocultar');
    } else {
        listError = "";
        // userToEdit.FechaAlta = moment().format();
        userToEdit.Fecha_nacimiento = moment(userToEdit.Fecha_nacimiento, "DD/MM/YYYY").format();
        userToEdit.Fecha_ingreso = moment(userToEdit.Fecha_ingreso, "DD/MM/YYYY").format();
        editUser(userToEdit, IdUser);
    }
}

function editUser(userToEdit, IdUser) {

    var onComplete = function(error) {
        if (error) {
            $.notify({
                message: 'Ocurrió un error en la sincronización.'
            }, {
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Ocurrió un error en la sincronización.');
            $(".mensaje_error_nvo_usuario").text('');
        } else {
            tablaUsuarios.destroy();
            cleanFieldsEditUser();
            $("#modalEditarUsuario .close").click();
            setTimeout(cuentaUsuarios(), 100);
            $.notify({
                message: 'El usuario se editó correctamente'
            }, {
                type: 'success',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
        }
    };

    var user = firebase.auth().currentUser;
    if (user != null) {
        var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
        var __user = dataRef.ref.child(IdUser);
        __user.update(userToEdit, onComplete);

        $("#modalEditarUsuario .close").click();
    } else {
        console.log("[Administrador no autenticado]");
        onComplete(1);
    }
}
////////////////Editar Usuario [Final]\\\\\\\\\\\\\\\\\\\\\\\\\\\


function activaSecUsuarios() {
    $("#_botonGuardaNuevoUsuario").click(function() {
        console.log("clik[Administrador]: _botonGuardaNuevoUsuario");
        $("#_errorRegistro").html("").addClass("ocultar");
        setTimeout(function() {
            __RegistroUsuario();
        }, 300);
    });

    $("#botonGuardaEditarUsuario").click(function() {
        console.log("clik[Administrador]: botonGuardaEditarUsuario");
        EditarUsuario();
    });
    console.log('activaSecUsuarios');
    $('.panel-header div h3').html('Usuarios');
    $('#subtituloSeccion').html('');


    $("#e_wizard-picture").change(function() {
        console.log("Eligiendo Foto 📥");
        readURLSet(this);
    });

    function readURLSet(input) {
        if (input.files && input.files[0]) {


            var e_usuarioId = $("#ideuser").html();

            // actualiza foto en el servidor
            var formData = new FormData();
            formData.append("archivo", input.files[0]);
            formData.append("elUsuarioId", e_usuarioId);

            $.ajax({
                url: "php/foto_upload.php",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(res) {
                console.log("Respuesta: " + res);
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#e_wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            });
        }
    }

    $('#modalAgregaUsuario').on('hidden.bs.modal', function() {
        // console.log('limipando modalAgregaUsuario');
        _cleanFieldsRegistro();
    })


    return cuentaUsuarios();
}


function cuentaUsuarios() {
    console.log('cuentaUsuarios');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorUsuariosPre = 0;
                var contadorUsuarios = 0;
                var contadorUsuariosVisbles = 0;
                // cuantosUsuarios = snapshot.numChildren();
                // console.log('cuantosUsuarios', cuantosUsuarios);

                snapshot.forEach(function(childSnapshot) {
                    contadorUsuariosPre++;
                    // console.log('%c losRecursos', 'color: orange; font-size:30px;font-weight:900;', childSnapshot.val());
                    // snapshot.val().Nombre;
                    this['usuarioId' + contadorUsuariosPre] = snapshot.child(childSnapshot.key).child('Id').val();
                    console.log(this['usuarioId' + contadorUsuariosPre], this['usuarioId' + contadorUsuariosPre]);
                    if (this['usuarioId' + contadorUsuariosPre] != undefined && this['usuarioId' + contadorUsuariosPre] != null) {
                        contadorUsuarios++;
                        this['usuarioId' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                        this['usuarioNombre' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        this['usuarioApellido_Paterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        this['usuarioApellido_Materno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        this['usuarioArea' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Area').val();
                        this['usuarioContrasena' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Contrasena').val();
                        this['usuarioCorreo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo').val();
                        this['usuarioDescripcion' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                        this['usuarioEdad' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Edad').val();
                        this['usuarioFecha_Alta' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Fecha_Alta').val();
                        this['usuarioFecha_Nacimiento' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Fecha_Nacimiento').val();
                        this['usuarioNotificaciones' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Notificaciones').val();
                        this['usuarioPerfil' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        this['usuarioPuesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                        this['usuarioVisible' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Visible').val();

                        this['Activo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Activo').val();
                        this['Apellido_Materno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        this['Apellido_Paterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        this['Area_funcional' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Area_funcional').val();
                        this['CURP' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('CURP').val();
                        //  this['Contrasena' + contadorUsuarios] =snapshot.child(childSnapshot.key).child('Contrasena').val(); 
                        this['Correo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo').val();
                        this['Correo_jefe' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo_jefe').val();
                        // this['FechaAlta' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('FechaAlta').val();
                        this['Fecha_ingreso' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Fecha_ingreso').val();
                        this['Fecha_nacimiento' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Fecha_nacimiento').val();
                        this['Genero' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Genero').val();
                        this['Id' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                        this['Nivel' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nivel').val();
                        this['Nombre' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        this['Nombre_jefe' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre_jefe').val();
                        this['Notificaciones' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Notificaciones').val();
                        this['Numero_colaborador' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Numero_colaborador').val();
                        this['Organizacion' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Organizacion').val();
                        this['Pais' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Pais').val();
                        this['Perfil' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        this['Puesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                        this['RFC' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('RFC').val();
                        this['Visible' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Visible').val();
                        this['img' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('img').val();
                    }
                    that = this;

                    cuantosUsuarios = contadorUsuarios;
                    cuantosUsuariosVisibles = contadorUsuariosVisbles;
                });

                return pintaUsuarios().then(function() {
                    activaBotonesUsuarios().then(function() {
                        cargador('oculta');
                    });
                });
            }
        });
    }
};


function pintaUsuarios() {
    console.log('pintaUsuarios');
    console.log("Lista de  usuarios");
    console.log(that);
    var dataSet = [];

    for (a = 1; a <= cuantosUsuarios; a++) {
        // switch (elPerfil) {
        // case "SuperAdmin":
        dataSet[(a - 1)] = [that['usuarioNombre' + a] + ' ' + that['usuarioApellido_Paterno' + a] + ' ' +
            that['usuarioApellido_Materno' + a], that['usuarioCorreo' + a],
            '<div id="botonEliminarUsuario' + a + '" class="btn btn-round btn-icon btn-primary float-right botonEliminarUsuario">' + '<i class="material-icons-outlined">delete</i></div>' + ' ' +
            '<div id="botonEditarUsuario' + a + '" class="btn btn-round btn-icon btn-neutral float-right botonEditarUsuario" data-toggle="modal" data-target="#modalEditarUsuario" onClick="clickEditarUsuario(' + a + ')">' +
            '<i class="material-icons-outlined">edit</i></div>'
        ];
        // break;
    };
    // console.log('dataSet ', dataSet);
    tablaUsuarios = $('#tablaUsuarios').DataTable({
        data: dataSet,
        "language": {
            "url": "js/dataTable_spanish.json"
        },
        columns: [{
            title: 'Nombre'
        }, {
            title: 'Correo'
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

    $('#_usuNvoFechaNacimiento, #_usuNvoFechaIngreso, #e_usuNvoFechaNacimiento, #e_usuNvoFechaIngreso').datepicker({
        language: "es",
        format: "dd/mm/yyyy"
    });

    // $('.usuarios_int').append(contenidoSecCursos);
    $('#subtituloSeccion').html('<a>' + cuantosUsuarios + '</a> usuarios en total');

    return $.ajax();
};



function clickBorrarUsuario(quien) {
    // event.preventDefault();
    console.log("Quien " + quien);
    // for (b = 1; b <= cuantosUsuarios; b++) {
    $('#modalBorrarUsuario').modal({
        closable: false,
        // duration: 0,
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarBorrarUsuario').on('click', '#botonCancelarBorrarUsuario', function(e) {});
    $(document).off('click', '#botonAceptarBorrarUsuario').on('click', '#botonAceptarBorrarUsuario', function(e) {
        borrarUsuario(that['usuarioId' + quien]);
    });
    // };
};

function clickEditarUsuario(quien) {
    console.log("Quien " + quien);
    loadDataFromUserToEdit(quien);
};



function activaBotonesUsuarios() {
    console.log('activaBotonesUsuarios');
    $("#botonGuardaNuevoUsuario").click(function(e) {
        console.log("Click en registro!!");
        //revisaNuevoUsuario();
    });

    /* $("#botonGuardaNuevoUsuario").off('click').on('click', function (e) {
         console.log("Click en registro!!");
         //revisaNuevoUsuario();
     });*/

    /*
    $("#botonAgregaUsuario").off('click').on('click', function (e) {    
        
    });
    */

    $("#_usuNvoCorreo").change(function() {
        buscaCorreoUsuNvo($(this).val());
    });

    for (a = 1; a <= cuantosUsuarios; a++) {
        $('#botonEliminarUsuario' + a).click(function(event) {
            var cualUsuario = $(this).attr('id').substr(20, $(this).attr('id').length);
            console.log('botonEliminarUsuario', cualUsuario);
            event.preventDefault();
            clickBorrarUsuario(cualUsuario);
        });
    }

    return $.ajax();
};

/////////// Borrar Usuario ↓ /////////////
function borrarUsuario(cualUsuario) {
    console.log('borrarUsuario', cualUsuario);

    var onComplete = function(error) {
        if (error) {
            $.notify({
                // options
                message: 'Ocurrió un error en la sincronización.'
            }, {
                // settings
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
            console.log('Ocurrió un error en la sincronización.');
        } else {
            tablaUsuarios.destroy();
            $.notify({
                // options
                message: 'El usuario se borró correctamente'
            }, {
                // settings
                type: 'info',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false,
            });
            setTimeout(cuentaUsuarios(), 100);
            console.log('Sincronización realizada.');
        };
    };

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                console.log('cualUsuario', cualUsuario);
                firebase.database().ref().child('Usuarios/' + cualUsuario).remove(onComplete); //usuario_
                return;
            };
        });
    };
};
/////////// Borrar Usuario ↑ /////////////


/////////// Editar Usuario ↓ /////////////
function loadDataFromUserToEdit(pos) {
    $("#e_errorRegistro").html("").addClass("ocultar");

    console.log("USER_ID:");
    console.log(that['Id' + pos]);

    $("#ideuser").html(that['Id' + pos]);
    $('#e_usuNvoNombre').val(that['Nombre' + pos]);
    $('#e_usuNvoAPaterno').val(that['Apellido_Paterno' + pos]);
    $('#e_usuNvoAMaterno').val(that['Apellido_Materno' + pos]);
    $('#e_usuNvoOrganizacion').val(that['Organizacion' + pos]);
    $('#e_usuNvoArea').val(that['Area_funcional' + pos]);
    $('#e_usuNvoPuesto').val(that['Puesto' + pos]);

    var dateBorn = moment(that['Fecha_nacimiento' + pos]).locale('es').format('DD/MM/YYYY');
    $('#e_usuNvoFechaNacimiento').val(dateBorn);

    console.log("FECHA INGRESO:");
    var fi = that['Fecha_ingreso' + pos];
    console.log(fi);
    var dateIn = moment(that['Fecha_ingreso' + pos]).locale('es').format('DD/MM/YYYY');
    console.log(dateIn);
    $('#e_usuNvoFechaIngreso').val(dateIn);

    $('#e_usuNvoNivel').val(that['Nivel' + pos]);
    $('#e_usuNvoFechaGenero').val(that['Genero' + pos]);
    $('#e_usuNvoPais').val(that['Pais' + pos]);
    $('#e_usuNvoNombreJefe').val(that['Nombre_jefe' + pos]);
    $('#e_usuNvoCorreoJefe').val(that['Correo_jefe' + pos]);
    $('#e_usuNvoRFC').val(that['RFC' + pos]);
    $('#e_usuNvoCurp').val(that['CURP' + pos]);
    $('#e_usuNvoNumeroColaborador').val(that['Numero_colaborador' + pos]);
    $('#e_usuNvoPerfil').val(that['Perfil' + pos]);
    if (that['Notificaciones' + pos]) {
        $('#e_usuNvoNotificaciones').addClass('active');
    } else {
        $('#e_usuNvoNotificaciones').removeClass('active');
    }

    if (that['Visible' + pos]) {
        $('#e_visible').addClass('active');
    } else {
        $('#e_visible').removeClass('active');
    }

    var noCache = generarId();
    var idu = "" + that['Id' + pos] + "";
    var url_image = "usuarios/" + idu + "/profile_foto.jpg?" + noCache;
    $("#e_wizardPicturePreview").ready(function() {
        $("#e_wizardPicturePreview").attr('src', url_image);
    });

    $('#e_usuNvoCorreo').val(that['Correo' + pos]);

}

function actualizaUsuario(cualIdEdita, cualFechaEdita, cualBoton) {
    var usuEditNombre = $("#usuEditNombre").val();
    var usuEditAPaterno = $("#usuEditAPaterno").val();
    var usuEditAMaterno = $("#usuEditAMaterno").val();
    var usuEditEdad = $("#usuEditEdad").val();
    var usuEditArea = $("#usuEditArea").val();
    var usuEditDescripcion = $("#usuEditDescripcion").val();
    var usuEditPuesto = $("#usuEditPuesto").val();
    var usuEditPerfil = $("#usuEditPerfil").val();
    // var usuEditNotificaciones = $("#usuEditNotificaciones").attr("aria-pressed");
    var usuEditNotificaciones = true;
    var usuEditCorreo = $("#usuEditCorreo").val();
    var usuEditContrasena1 = $("#usuEditContrasena1").val();
    var usuEditContrasena2 = $("#usuEditContrasena2").val();

    if (typeof usuEditContrasena1 != 'undefined' && usuEditContrasena1 &&
        typeof usuEditContrasena2 != 'undefined' && usuEditContrasena2) {
        if (usuEditContrasena1 == usuEditContrasena2) {
            if (usuEditContrasena1.length >= 6) {
                var usuEditContrasenaVal = md5(usuEditContrasena2);
                // var usuEditContrasenaVal = usuEditContrasena2;
                console.log("Contraseña cambiada ↓ ");
                console.log("Nueva " + md5(usuEditContrasena2));
                console.log("Vieja " + that['usuarioContrasena' + cualBoton]);
                validaCamposEdit();
            } else {
                console.log("Error 2 mayor a 6");
                $('#textoErrorCamposEdit').text('La contraseña tiene que tener minimo 6 caracteres').show();
            }
        } else {
            console.log("Error 1 no son iguales");
            $('#textoErrorCamposEdit').text('Recuerda que las contraseñas tienen que coincidir').show();
        }
    } else {
        var usuEditContrasenaVal = that['usuarioContrasena' + cualBoton];
        console.log("Contraseña NO cambiada ↓ ");
        console.log("Original " + usuEditContrasenaVal);
        validaCamposEdit();
    };



    function validaCamposEdit() {

        if (usuEditNombre == undefined || usuEditNombre == "" || usuEditNombre == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 1').show();
        } else if (usuEditAPaterno == undefined || usuEditAPaterno == "" || usuEditAPaterno == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 2').show();
        } else if (usuEditAMaterno == undefined || usuEditAMaterno == "" || usuEditAMaterno == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 3').show();
        } else if (usuEditEdad == undefined || usuEditEdad == "" || usuEditEdad == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 4').show();
        } else if (usuEditArea == undefined || usuEditArea == "" || usuEditArea == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 5').show();
        } else if (usuEditDescripcion == undefined || usuEditDescripcion == "" || usuEditDescripcion == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 6').show();
        } else if (usuEditPuesto == undefined || usuEditPuesto == "" || usuEditPuesto == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 7').show();
        } else if (usuEditPerfil == undefined || usuEditPerfil == "" || usuEditPerfil == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 8').show();
        } else if (usuEditNotificaciones == undefined || usuEditNotificaciones == "" || usuEditNotificaciones == null) {
            $('#textoErrorCamposEdit').text('Recuerda llenar todos los campos 9').show();
        } else if (usuEditCorreo == undefined || usuEditCorreo == "" || usuEditCorreo == null) {
            $('#textoErrorCamposEdit').text('Recuerda ingresar un correo correcto').show();
        } else {
            console.log("Todo Correcto ");
            validaCorreo();
        };
    }; ////

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    function validaCorreo() {
        var $result = $("#result");
        var email = usuEditCorreo;
        $result.text("");

        if (validateEmail(email)) {
            console.log("Correo valido ");
            // var usuEditContrasenaVal = usuEditContrasena1;
            var editaUsuarioData = {
                Nombre: usuEditNombre,
                Apellido_Paterno: usuEditAPaterno,
                Apellido_Materno: usuEditAMaterno,
                Edad: usuEditEdad,
                Area: usuEditArea,
                Descripcion: usuEditDescripcion,
                Puesto: usuEditPuesto,
                Perfil: usuEditPerfil,
                Correo: usuEditCorreo,
                Contrasena: usuEditContrasenaVal,
            };
            if (revisaConexion) {
                console.log('Actualizando . . . ');
                var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
                var keyUsuario = dataRef.ref.child(cualIdEdita); //"usuario_" + 
                console.log('dataRef ' + dataRef);
                console.log('keyUsuario ' + keyUsuario);
                console.log('DATOS: ↓');
                console.log(editaUsuarioData);
                firebase.database().ref(keyUsuario).update(editaUsuarioData, onComplete());
                $("#modalEditarUsuario .close").click();
            };

            function onComplete(error) {
                if (error) {
                    $.notify({
                        // options
                        message: 'Ocurrió un error en la sincronización.'
                    }, {
                        // settings
                        type: 'danger',
                        allow_dismiss: true,
                        delay: 1500,
                        allow_dismiss: false,
                    });
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    tablaUsuarios.destroy();
                    $.notify({
                        // options
                        message: 'El usuario se editó correctamente'
                    }, {
                        // settings
                        type: 'info',
                        allow_dismiss: true,
                        delay: 1500,
                        allow_dismiss: false,
                    });
                    setTimeout(cuentaUsuarios(), 100);
                    console.log('Sincronización realizada.');
                };
            };
        } else {
            console.log("correo NO Válido ");
        };
        return false;
    };
    // if (usuEditContrasena1.length < 6) {
    //     $('#textoErrorCamposEdit').text('La contraseña tiene que tener minimo 6 caracteres').show();
    // } else if (usuEditContrasena2.length < 6) {
    //     $('#textoErrorCamposEdit').text('La contraseña tiene que tener minimo 6 caracteres').show();
    // } else if (usuEditContrasena2.length > 6) {
    //     $('#textoErrorCamposEdit').text('La contraseña tiene que tener minimo 6 caracteres').show();
    // var usuEditContrasenaVal = md5(usuEditContrasena1);
    // };
};
/////////// Editar Usuario ↑ /////////////



/////////// Agrega Nuevo Usuario ↓ /////////////
function revisaNuevoUsuario() {
    console.log("revisaNuevoUsuario *****")
    var usuNvoNombre = $("#usuNvoNombre").val();
    var usuNvoAPaterno = $("#usuNvoAPaterno").val();
    var usuNvoAMaterno = $("#usuNvoAMaterno").val();
    var usuNvoEdad = $("#usuNvoEdad").val();
    var usuNvoArea = $("#usuNvoArea").val();
    var usuNvoDescripcion = $("#usuNvoDescripcion").val();
    var usuNvoPuesto = $("#usuNvoPuesto").val();
    var usuNvoPerfil = $("#usuNvoPerfil").val();
    // var usuNvoNotificaciones = $("#usuNvoNotificaciones").attr("aria-pressed");
    var usuNvoNotificaciones = true;
    var usuNvoCorreo = $("#usuNvoCorreo").val();
    var usuNvoContrasena1 = $("#usuNvoContrasena1").val();
    var usuNvoContrasena2 = $("#usuNvoContrasena2").val();
    var usuNvoContrasena1 = $("#usuNvoContrasena1").val();
    // if (usuNvoContrasena1 == usuNvoContrasena2) {
    //     var usuNvoContrasenaVal = usuNvoContrasena2;
    // } else {
    //     console.log("No coinciden las contraseñas")
    // };

    if (usuNvoNombre == undefined || usuNvoNombre == "" || usuNvoNombre == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoAPaterno == undefined || usuNvoAPaterno == "" || usuNvoAPaterno == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoAMaterno == undefined || usuNvoAMaterno == "" || usuNvoAMaterno == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
        // } else if (usuNvoEdad == undefined || usuNvoEdad == "" || usuNvoEdad == null) {
        //     $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
        // } else if (usuNvoArea == undefined || usuNvoArea == "" || usuNvoArea == null) {
        //     $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
        // } else if (usuNvoDescripcion == undefined || usuNvoDescripcion == "" || usuNvoDescripcion == null) {
        //     $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
        // } else if (usuNvoPuesto == undefined || usuNvoPuesto == "" || usuNvoPuesto == null) {
        //     $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoPerfil == undefined || usuNvoPerfil == "" || usuNvoPerfil == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoNotificaciones == undefined || usuNvoNotificaciones == "" || usuNvoNotificaciones == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoCorreo == undefined || usuNvoCorreo == "" || usuNvoCorreo == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoContrasena1 == undefined || usuNvoContrasena1 == "" || usuNvoContrasena1 == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoContrasena2 == undefined || usuNvoContrasena2 == "" || usuNvoContrasena2 == null) {
        $('#textoErrorCampos').text('Recuerda llenar todos los campos').show();
    } else if (usuNvoContrasena1 != usuNvoContrasena2) {
        $('#textoErrorCampos').text('Recuerda que las contraseñas tienen que coincidir').show();
        console.log("Error contraseñas! ");
    } else if (usuNvoContrasena1.length < 6) {
        $('#textoErrorCampos').text('La contraseña tiene que tener minimo 6 caracteres').show();
    } else {
        validaCorreo();
    };


    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    function validaCorreo() {
        var $result = $("#result");
        var email = usuNvoCorreo;
        $result.text("");

        if (validateEmail(email)) {
            console.log("Correo valido********");
            if (revisaConexion) {
                var usuNvoContrasenaVal = md5(usuNvoContrasena2);
                agregaUsuario(usuNvoNombre, usuNvoAPaterno, usuNvoAMaterno, usuNvoEdad, usuNvoArea, usuNvoDescripcion, usuNvoPuesto, usuNvoPerfil, usuNvoNotificaciones, usuNvoCorreo, usuNvoContrasenaVal);
            };
        } else {
            console.log("correo NO Valido ");
        };
        return false;
    };
    // console.log('usuNvoNombre ' + usuNvoNombre);
    // console.log('usuNvoAPaterno ' + usuNvoAPaterno);
    // console.log('usuNvoAMaterno ' + usuNvoAMaterno);
    // console.log('usuNvoEdad ' + usuNvoEdad);
    // console.log('usuNvoArea ' + usuNvoArea);
    // console.log('usuNvoDescripcion ' + usuNvoDescripcion);
    // console.log('usuNvoPuesto ' + usuNvoPuesto);
    // console.log('usuNvoPerfil ' + usuNvoPerfil);
    // console.log('usuNvoNotificaciones ' + usuNvoNotificaciones);
    // console.log('usuNvoCorreo ' + usuNvoCorreo);
    // console.log('usuNvoContrasena1 ' + usuNvoContrasena1);
    // console.log('usuNvoContrasena2 ' + usuNvoContrasena2);
    // console.log('usuNvoContrasenaVal ' + usuNvoContrasenaVal);
};


function agregaUsuario(usuNvoNombre, usuNvoAPaterno, usuNvoAMaterno, usuNvoEdad, usuNvoArea, usuNvoDescripcion, usuNvoPuesto, usuNvoPerfil, usuNvoNotificaciones, usuNvoCorreo, usuNvoContrasenaVal) {
    var idNuevo = generarId();
    // var fechaAlta = nuevaAlta();
    var onComplete = function(error) {
        if (error) {
            $.notify({
                // options
                message: 'Ocurrió un error en la sincronización.'
            }, {
                // settings
                type: 'danger',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Ocurrió un error en la sincronización.');
            $(".mensaje_error_nvo_usuario").text('');
        } else {
            $("#modalAgregaUsuario .close").click();
            tablaUsuarios.destroy();
            setTimeout(cuentaUsuarios(), 100);
            $.notify({
                // options
                message: 'El usuario se agregó correctamente'
            }, {
                // settings
                type: 'info',
                allow_dismiss: true,
                delay: 1500,
                allow_dismiss: false
            });
            console.log('Sincronización realizada.');
        };
    };

    var nuevoUsuarioData = {
        Nombre: usuNvoNombre,
        Apellido_Paterno: usuNvoAPaterno,
        Apellido_Materno: usuNvoAMaterno,
        Edad: usuNvoEdad,
        Area: usuNvoArea,
        Descripcion: usuNvoDescripcion,
        Puesto: usuNvoPuesto,
        Perfil: usuNvoPerfil,
        Notificaciones: usuNvoNotificaciones,
        Correo: usuNvoCorreo,
        Contrasena: usuNvoContrasenaVal,
        // Fecha_Alta: fechaAlta,
        Id: 'usuario_' + idNuevo,
        Visible: true,
        Activo: false
    };

    console.log('Guardando . . . ');
    var dataRef = firebase.database().ref(laUrlBase + 'Usuarios');
    var keyUsuario = dataRef.ref.child("usuario_" + idNuevo);
    // console.log('dataRef ' + dataRef);
    // console.log('keyUsuario ' + keyUsuario);
    // console.log('idNuevo ' + idNuevo);
    console.log('DATOS: ' + nuevoUsuarioData);
    console.log(nuevoUsuarioData);
    // console.log('fechaAlta ' + fechaAlta);
    firebase.database().ref(keyUsuario).set(nuevoUsuarioData, onComplete);
    $("#modalAgregaUsuario .close").click();
};

/////////// Agrega Nuevo Usuario ↑ /////////////


function buscaCorreoUsuNvo(cualCorreo) {
    console.log('buscando si ya existe el correo:', cualCorreo);

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Correo').equalTo(cualCorreo).once('value').then(function(snapshot) {

            if (snapshot.val() != null) {
                console.log('Ese correo ya existe, por favor ingrese otro.');
                elCorreoUsuExiste = true;
            } else {
                console.log('Ese correo está disponible, adelante.');
                elCorreoUsuExiste = false;
            }
            return elCorreoUsuExiste;

        });
    }
}
