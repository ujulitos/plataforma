/* Panel Admin uJL 2016 */

var baseOk;
var conLogs = true;
var elCurso_ = '';
var usuarioId;
var usuarioVisible;
var elPerfilDisplay;
var elPerfil;
var elPerfilNombre;
var elUsuarioNivel;
var elContenido;
var elContenidoLanzado = false;
var cuantosUsuarios;
var usuarioKey;
// var usuarioClave;
var contadorKey = 0;
var connected = false;
var sidebarAbierto;
var nuevoUsuarioData = {};
var laFecha;
var laFechaInicial;
var laFechaFinal;
var laFechaFormateada;
var cualContenido;
var laSesionActual;
var minutosMaxSession = 30;
var that;
var those;
var thar;

var modoAgregar = false;
// vars Recursos //
var elRecursoIndex = 0;
var IdRecurso = '';
var Portada = '';
var Liga = '';
var FileName = '';
var elFileName = '';
var laLigaRecurso;
// vars Recursos //

// vars Cursos //
var elCursoIndex = 0;
var IdCurso = '';
// vars Cursos //

var mensajeConexion = 'Revisando conexión...';
var mensajeError = 'Por favor ingresa datos válidos.';
var mensajeErrorLogin = 'Por favor ingresa datos válidos.';
var mensajeVisibleLogin = 'Este usuario no está habilitado.';
var mensajeErrorColaborador = 'No hay un nombre asociado a ese número de empleado.';


var revisaConexion = function() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
        connected = false;
        $('#divBloqConexion').show();
        if (snap.val() === true) {
            connected = true;
            log("connected", connected);
            $('#divBloqConexion').hide();
            return connected;
        }
    });
}


function generarId() {
    var caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var longitud = 4;
    code = '';
    for (x = 0; x < longitud; x++) {
        rand = Math.floor(Math.random() * caracteres.length);
        code += caracteres.substr(rand, 1);
    }
    var tiempo = moment().format('YYMMDDHHmmss');
    var idNuevo = (tiempo) + code;
    // log(idNuevo);

    return idNuevo;
};


var email = 'demo@demo.com';
var password = 'demo@demo.com';

function login(cualUsuario, cualPassword) {
    // log(cualUsuario, ' y ', cualPassword);

    cargador('muestra');
    var elPassword = md5(cualPassword);
    // log('elPassword', elPassword);

    $('#botonEntrar').addClass('disabled');
    baseOk = firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
            //  log('baseOk', baseOk);

            var user = firebase.auth().currentUser;
            var name, email, uid, perfil;

            user.updateProfile({
                displayName: "Usuario"
            }).then(function() {
                // Update successful.
            }, function(error) {
                // An error happened.
            });
            log('user.displayName', user.displayName);

            if (user != null) {

                elPerfilDisplay = user.displayName;
                log("elPerfilDisplay", elPerfilDisplay);

                if (elPerfilDisplay === "SuperAdmin" || elPerfilDisplay === "Administrador" || elPerfilDisplay === "Usuario" || elPerfilDisplay === "Participante") {

                    var valBuscar1 = 'Id';
                    var valBuscar2 = cualUsuario;

                    firebase.database().ref(laUrlBase + 'Usuarios').orderByChild(valBuscar1).equalTo(valBuscar2).once('value').then(function(snapshot) {

                        if (snapshot.val() != null) {
                            // log('snapshot.val()', snapshot.val());

                            snapshot.forEach(function(childSnapshot) {
                                usuarioKey = childSnapshot.key;
                                // log('usuarioKey', usuarioKey);
                                usuarioId = snapshot.child(childSnapshot.key).child('Id').val();
                                // log('usuarioId', usuarioId); 
                                // usuarioClave = snapshot.child(childSnapshot.key).child('Clave').val();
                                // log('usuarioClave', usuarioClave);
                                usuarioContrasena = snapshot.child(childSnapshot.key).child('Contrasena').val();
                                // log('usuarioContrasena', usuarioContrasena);
                                usuarioVisible = snapshot.child(childSnapshot.key).child('Visible').val();
                                // log('usuarioVisible', usuarioVisible);
                            });
                            if (elPassword === usuarioContrasena) {
                                if (usuarioVisible) {
                                    registraLocalStorage(cualUsuario, cualPassword);
                                    ingresa(usuarioId);
                                } else {
                                    cargador('oculta');
                                    log('mensaje_error_login');
                                    $('.mensaje_error_login').text(mensajeVisibleLogin);
                                    $('#botonEntrar').removeClass('disabled');
                                }
                            } else {
                                cargador('oculta');
                                log('mensaje_error_login');
                                $('.mensaje_error_login').text(mensajeErrorLogin);
                                $('#botonEntrar').removeClass('disabled');
                            }
                        } else {
                            cargador('oculta');
                            log('mensaje_error_login');
                            $('.mensaje_error_login').text(mensajeErrorLogin);
                            $('#botonEntrar').removeClass('disabled');
                        }
                    });
                }

            }
        },
        function(error) {
            $('.mensaje_error_login').text(mensajeErrorLogin);
            $('#botonEntrar').removeClass('disabled');
        });
}



function obtenersesionExpirada(cualFecha) {
    laFechaHoyPrev = obtenerFecha();
    laFechaHoy = moment(laFechaHoyPrev);
    cualFecha = moment(cualFecha);
    // log('cualFecha', cualFecha);
    // log('laFechaHoy', laFechaHoy);
    var laSessionMinutos = laFechaHoy.diff(cualFecha, 'minutes');
    log('laSessionMinutos', laSessionMinutos);

    if (laSessionMinutos < minutosMaxSession) {
        log('todavía no expira la session');
        return false;
    } else {
        log('ya expiró la session');
        return true;
    };
};

function registraLocalStorage(user, password) {
    if ('localStorage' in window && window['localStorage'] !== null) {
        localStorage.usr = user;
        localStorage.psw = password;
        localStorage.fch_ini = obtenerFecha();
        // log('usr', localStorage.usr, ' y psw', localStorage.psw);
    } else {
        log('localStorage no está soportado en este navegador.');
    }
}

function leeLocalStorage() {
    // $("#inputUsuario, #inputPassword").attr("disabled", "disabled");
    try {
        usr = localStorage.usr;
        psw = localStorage.psw;
        if (usr != null && psw != null) {
            var sesionExpirada = obtenersesionExpirada(localStorage.fch_ini);
            log('sesionExpirada', sesionExpirada);
            if (sesionExpirada == false) {
                login(usr, psw);
            } else {
                login($("#inputUsuario").val(), $("#inputPassword").val());
                $("#inputUsuario, #inputPassword").removeAttr("disabled");
                eliminaLocalStorage();
            }
        } else {
            $("#inputUsuario, #inputPassword").removeAttr("disabled");
        }
    } catch (e) {
        storage = {};
    }
}

function eliminaLocalStorage() {
    localStorage.clear();
}



function ingresa(usuarioId) {
    log('usuarioId', usuarioId);

    var laFechaHoy = obtenerFecha();
    log('laFechaHoy', laFechaHoy);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            ingresaOK();
            log('Sincronización realizada. ingresaOK');
        }
    };

    if (usuarioId != null) {

        if (revisaConexion) {
            firebase.database().ref(laUrlBase + 'Usuarios').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshot) {
                if (snapshot.val() != null) {
                    snapshot.forEach(function(childSnapshot) {
                        var elNombreRes = snapshot.child(childSnapshot.key).child('Nombre').val();
                        var elApellidoPatRes = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                        var elApellidoMatRes = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                        elUsuarioNivel = snapshot.child(childSnapshot.key).child('Nivel').val();
                        log('elUsuarioNivel', elUsuarioNivel)
                        elPerfil = snapshot.child(childSnapshot.key).child('Perfil').val();
                        log('elPerfil', elPerfil)
                        var usuarioIdRes = snapshot.child(childSnapshot.key).child('Id').val();
                        elPerfilNombre = elNombreRes + ' ' + elApellidoPatRes + ' ' + elApellidoMatRes;

                        firebase.database().ref(laUrlBase + 'Usuarios/' + usuarioKey).update({
                            "Activo": true,
                            "Fecha_ingreso_plataforma": laFechaHoy
                        }, onComplete);

                    });
                } else {
                    log('no se encuentra usuario');
                }
            });
        }
    } else {
        ingresaOK();
    }

    function ingresaOK() {

        $('.main-panel').removeClass('main-panel_100');

        $('.panel-header, .sidebar_main, .navbar-toggler').show();
        $('.perfil').css({
            'display': 'flex'
        });
        $('.navbar').css({
            'opacity': '1'
        });
        $('.panel-header').css({
            'width': '100%'
        });
        $('.page-header-image, #divLogin').hide();
        log('sidebarAbierto', sidebarAbierto);

        var elAncho = $(window).width();
        if (elAncho < 991) {
            $('#botonOcultarSidebar').show();
        }
        laSesionActual = true;

        habilitaBoton($('#botonEntrar'), false);
        $('#botonPerfil').show();
        $("#inputUsuario").val('');
        $("#inputPassword").val('');
        $('.mensaje_nombre_perfil').text('');
        $('.mensaje_error_login').text('');
        $('.contenido').show();
        $('.nombre_perfil').text(elPerfilNombre);
        $('.nombre_perfil_int').text(elPerfilNombre);


        cargador('oculta');
        // QUITAR
        // navega('inicio');
        navega('recursos');
    }
}


function cierraSesion() {
    log('cerrando sesion');

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {

            firebase.auth().signOut().then(function() {

                $('.contenido').hide();
                $('.main-panel').addClass('main-panel_100');
                $('.panel-header, .sidebar_main, .navbar-toggler').hide();
                $('.navbar').css({
                    'opacity': '0'
                });
                $('.perfil').css({
                    'display': 'none'
                });
                $('.panel-header').css({
                    // 'width': '100%'
                });
                $('.page-header-image, #divLogin').show();
                $('#botonOcultarSidebar').hide();
                laSesionActual = false;

                habilitaBoton($('#botonEntrar'), true);
                $("#inputUsuario, #inputPassword").removeAttr("disabled");
                eliminaLocalStorage();
                $('#botonPerfil').hide();
                $('.nombre_perfil').text('');
                $('.nombre_perfil_int').text('');

            }, function(error) {

            });
            usuarioId = '';
            log('Sincronización realizada.');
        }
    };

    firebase.database().ref(laUrlBase + 'Usuarios/' + usuarioKey).update({
        "Activo": false
    }, onComplete);
    // onComplete();

}









function pintaInicio() {

    // function pintaChart(cualChart, valor, duracion, colorBarra) {
    //     $('#chart' + cualChart).easyPieChart({
    //         size: 150,
    //         animate: duracion,
    //         lineWidth: 20,
    //         barColor: colorBarra,
    //         trackColor: '#e7e7e7 ',
    //         lineCap: 'butt',
    //         onStep: function (from, to, currentValue) {
    //             $('#porciento' + cualChart).text(~~currentValue + '%');
    //         }
    //     });

    //     if ($('.inicio_int').length != 0) {
    //         $('#chart' + cualChart).data('easyPieChart').update(valor);
    //     }
    // };



    // pintaChart(1, 85, 2000, '#ff5722');
    // setTimeout(function () {
    //     pintaChart(1, 38, 3000);
    // }, 5000);

    // pintaChart(2, 41, 2000, '#8bc34a');
    // setTimeout(function () {
    //     pintaChart(2, 76, 2000);
    // }, 6000);

    // pintaChart(3, 27, 2000, '#ff9800');
    // setTimeout(function () {
    //     pintaChart(3, 98, 1500);
    // }, 5500);

    // pintaChart(4, 79, 2000, '#2196f3');
    // setTimeout(function () {
    //     pintaChart(4, 12, 3000);
    // }, 6500);


    $('#subtituloSeccion').html('');
    $('#subseccion').html('');
}

function pintaAyuda() {
    $('#subtituloSeccion').html('');
    $('#subseccion').html('');
}


function activaSecInicio() {
    pintaInicio();
    // componentHandler.upgradeAllRegistered();  
}

function activaSecAyuda() {
    pintaAyuda();
    // componentHandler.upgradeAllRegistered();  
}

function activaSecCursos() {
    cuentaCursos();
    // componentHandler.upgradeAllRegistered();
}

function activaSecRecursos() {
    cuentaRecursos();
    // componentHandler.upgradeAllRegistered();
}


///////////////////////////////// fechas ///////////////////////////////////////

function obtenerFecha() {
    moment.locale('es');
    var laFecha = moment().format();
    log('laFecha', laFecha);

    return laFecha;
}
//obtenerFecha();

function obtenerFechaInicial() {
    moment.locale('es');
    laFechaInicial = moment().format();
    log('laFechaInicial', laFechaInicial);

    return laFechaInicial;
}
//obtenerFechaInicial();

function obtenerDuracion() {
    moment.locale('es');
    laFechaFinal = moment().format();
    laDuracion = moment(laFechaInicial).fromNow(true);
    log('laDuracion', laDuracion);

    return laDuracion;
}
//obtenerDuracion();


laFecha = obtenerFecha();
laFechaInicial = obtenerFechaInicial();
laFechaFinal = moment().format('LL');
var laDuracionSesion = obtenerDuracion();
//
// log('laFecha', laFecha);
// log('laFechaInicial', laFechaInicial);
// log('laFechaFinal', laFechaFinal);
log('laDuracionSesion', laDuracionSesion);


function obtenerFechaFormateada() {
    var laFechaFormateada = moment().locale('es').format('DD-MM-YYYY');
    log('laFechaFormateada', laFechaFormateada);

    return laFechaFormateada;
}



function habilitaBoton(cualBoton, modo) {
    if (modo == false) {
        cualBoton.addClass('disabled');
    } else {
        cualBoton.removeClass("disabled");
    }
}


/////////////////////////////// navegación /////////////////////////////////////

function navega(cualSeccion) {
    log('navega', cualSeccion);
    cargador('muestra');

    if (cualSeccion == '' || cualSeccion == null || cualSeccion == undefined) {
        cualSeccion = 'inicio';
    }

    $("#content").empty();
    $("#content").load('inc/' + cualSeccion + '.html', function() {
        // log('cualSeccion', cualSeccion, 'cargada.');
        $("#boton_inicio, #boton_cursos, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_admin, #boton_resultados, #boton_ayuda, #boton_entregas").parent().removeClass('active').addClass('inactive');
        $("#boton_" + cualSeccion).parent().removeClass('inactive').addClass('active');
    });

    // $("#boton_inicio, #boton_cursos, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_admin, #boton_resultados, #boton_ayuda").show();

    $("#boton_admin").parent().addClass('oculto');
    $("#boton_recursos").parent().addClass('oculto');
    $("#boton_usuarios").parent().addClass('oculto');
    if (elPerfil === "Administrador" || elPerfil === "SuperAdmin" || elPerfil === "Prueba") {
        $("#boton_admin").parent().removeClass('oculto');
        $("#boton_recursos").parent().removeClass('oculto');
        $("#boton_usuarios").parent().removeClass('oculto');
    }
    if (elPerfil === "Creador de contenidos") {
        $("#boton_recursos").parent().removeClass('oculto');
    }

    // TODO por perfil
    // if (elPerfil === "Administrador") {
    //     $("#boton_resultados").parent().removeClass('oculto');
    // } else {
    //     $("#boton_resultados").parent().addClass('oculto');
    // }

    cargador('oculta');
}



$(window).on('beforeunload', function() {
    log('unload body');

    if (elPerfil === 'Observador') {
        eliminaRegistroUsuario();
    }
    if (elContenidoLanzado == true) {
        registraUltimaConexionRecurso();
    }

});


function detectaUnloadContenido() {
    $(window).on('unload', function() {
        log('unload body');

        cierraSesion();

    });
}


function eliminaRegistroUsuario() {
    log('eliminaRegistroUsuario');

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
        }
    };

    // if (revisaConexion) {
    // firebase.database().ref(laUrlBase + 'Lecciones/' + usuarioId).once('value').then(function(snapshot) {
    firebase.database().ref(laUrlBase + 'Lecciones/' + usuarioId).remove(onComplete);
    // });
    // }

}

function registraUltimaConexionRecurso() {
    log('registraUltimaConexionRecurso');

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
        }
    };

    var laFechaHoy = obtenerFecha();
    log('laFechaHoy', laFechaHoy);

    // if (revisaConexion) {
    // firebase.database().ref(laUrlBase + 'Lecciones/' + usuarioId).once('value').then(function(snapshot) {
    firebase.database().ref(laUrlBase + 'Lecciones/' + usuarioId + '/' + laRutaRecursoAnterior).update({
        'Fecha_fin': laFechaHoy,
    }, onComplete);
    // });
    // }

}


function cargador(evento) {
    var duracion = 300;
    switch (evento) {
        case 'muestra':
            $("#cargando").show();
            $("#cargando").animate({
                'opacity': '1'
            }, duracion, function() {
                // cargador('oculta');
            });
            break;
        case 'oculta':
            $("#cargando").animate({
                'opacity': '0'
            }, duracion, function() {
                $('#cargando').css({
                    'display': 'none'
                });
            });
            break;
        default:
            break;
    }
}

function muestraOculta(elemento, modo, duracion) {
    switch (modo) {
        case 'muestra':
            $(elemento).css({
                'display': 'flex',
                'opacity': '0'
            });
            $(elemento).slideDown();
            $("#divConFechas").animate({
                'opacity': '1'
            }, duracion, function() {
                //
            });
            break;
        case 'oculta':
            $(elemento).css({
                'opacity': '1'
            });
            $(elemento).slideDown();
            $("#divConFechas").animate({
                'opacity': '0'
            }, duracion, function() {
                $(elemento).css({
                    'display': 'none'
                });
            });
            break;
        default:
            break;
    }
}


$(window).resize(function() {

    if (elContenidoLanzado == true) {
        ajustaEscalaContenido();
    }

    $('.cargando_spinner').css({
        position: 'absolute',
        left: ($(window).width() - $('.className').outerWidth()) / 2,
        top: ($(window).height() - $('.className').outerHeight()) / 2
    });

    var elAncho = $(window).width();

    if (elAncho >= 991) {
        sidebarAbierto = false;

        $('.sidebar_main').css({
            'transform': 'translate3d(0px,0,0)'
        });
        $('.main-panel').css({
            'transform': 'translate3d(0px,0,0)'
        });
        $('.boton_sidebar').css({
            'position': 'absolute'
        });
        $('.boton_sidebar_texto').html('ocultar');
    } else {
        sidebarAbierto = true;

        $('.sidebar_main').css({
            'transform': 'translate3d(-260px,0,0)'
        });
        $('.main-panel').css({
            'transform': 'translate3d(0px,0,0)'
        });
        $('.boton_sidebar').css({
            'position': 'fixed'
        });
        $('.boton_sidebar_texto').html('mostrar');
    }

});


function log(...mensaje) {
    if (conLogs) {
        console.log(mensaje);
    }
}

$(document).ready(function() {

    // conectaBase();


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/sw.js', {
                scope: '/js/'
            })
            .then(function(registration) {
                log('Service Worker Registered');
            });

        navigator.serviceWorker.ready.then(function(registration) {
            log('Service Worker Ready');
        });
    }


    $('.cargando_spinner').css({
        position: 'absolute',
        left: ($(window).width() - $('.className').outerWidth()) / 2,
        top: ($(window).height() - $('.className').outerHeight()) / 2
    });

    laFechaFormateada = obtenerFechaFormateada();

    $('.main-panel').addClass('main-panel_100').show();
    $('.contenido').hide();
    $('#botonPerfil').hide();
    $("#inputUsuario").val('');
    $("#inputPassword").val('');
    $('#botonOcultarSidebar').hide();

    $("#inputUsuario, #inputPassword").keypress(function(e) {
        if (e.which == 13) {
            login($("#inputUsuario").val(), $("#inputPassword").val());
        }
    });


    $("#botonEntrar").click(function(event) {
        event.preventDefault();
        login($("#inputUsuario").val(), $("#inputPassword").val());
    });

    $('#botonCerrar').click(function(event) {
        event.preventDefault();

        $('#modalCerrarSesion').modal({
            closable: false,
            // duration: 300,
            transition: 'scale'
        }).modal('show');

        $(document).off('click', '#botonCancelarCerrarSesion').on('click', '#botonCancelarCerrarSesion', function(e) {
            // dialog.close();
        });
        $(document).off('click', '#botonAceptarCerrarSesion').on('click', '#botonAceptarCerrarSesion', function(e) {
            cierraSesion();
            // dialog.close();
        });

    });


    var elAncho = $(window).width();

    if (elAncho >= 991) {
        sidebarAbierto = false;
    } else {
        sidebarAbierto = true;
    }


    $(document).off('click', '#botonOcultarSidebar').on('click', '#botonOcultarSidebar', function(e) {
        log('sidebarAbierto', sidebarAbierto);
        if (sidebarAbierto) {
            $('.sidebar_main').css({
                'transform': 'translate3d(0px,0,0)'
            });
            $('.main-panel').css({
                'transform': 'translate3d(260px,0,0)'
            });
            $('.boton_sidebar').css({
                'position': 'fixed'
            });
            $('.boton_sidebar_texto').html('ocultar');
            sidebarAbierto = false;
        } else {
            $('.sidebar_main').css({
                'transform': 'translate3d(-260px,0,0)'
            });
            $('.main-panel').css({
                'transform': 'translate3d(0px,0,0)'
            });
            $('.boton_sidebar').css({
                'position': 'absolute'
            });
            $('.boton_sidebar_texto').html('mostrar');
            sidebarAbierto = true;
        }
    });


    $('#botonCerrarContenido').click(function(event) {
        event.preventDefault();

        $('#modalCerrarContenido').modal({
            closable: false,
            // duration: 300,
            transition: 'scale'
        }).modal('show');

        $(document).off('click', '#botonCancelarCerrarContenido').on('click', '#botonCancelarCerrarContenido', function(e) {
            // dialog.close();
        });
        $(document).off('click', '#botonAceptarCerrarContenido').on('click', '#botonAceptarCerrarContenido', function(e) {
            cierraContenido();
            // dialog.close();
        });

    });


    $("#boton_inicio, #boton_cursos, #boton_recursos, #boton_usuarios, #boton_lecciones, #boton_admin, #boton_resultados, #boton_ayuda, #boton_entregas").click(function(event) {
        if ($(this).css('cursor') == 'pointer') {
            var cualSeccion = $(this).attr('id').substr(6, $(this).attr('id').length);
            event.preventDefault();

            navega(cualSeccion);
        }
    });


    $(document).on('mouseover mousedown press mouseup', '.botonInputMenos, .botonInputMas', function() {
        $(this).parent().find($('input')).focus();
    });
    $(document).on('mouseleave', '.botonInputMenos, .botonInputMas', function() {
        $(this).parent().find($('input')).blur();
    });
    $(document).off('click', '.botonInputMenos, .botonInputMas').on('click', '.botonInputMenos, .botonInputMas', function(e) {
        ajustaValorInput($(this));
    });



    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode != 46 && charCode > 31 &&
            (charCode < 48 || charCode > 57))
            return false;

        return true;
    }


    function isInputNumber(evt) {
        var ch = String.fromCharCode(evt.which);
        if (!(/[0-9]/.test(ch))) {
            evt.preventDefault();
        }
    }

    function ajustaValorInput(cualBoton) {
        //  log('ajustaValorInput', cualBoton);

        var elValorCont = parseInt($(cualBoton).parent().find($('input')).val());
        var elMin = $(cualBoton).parent().find($('input')).attr('minimo');
        var elMax = $(cualBoton).parent().find($('input')).attr('maximo');
        // log('elMin', elMin, 'elMax', elMax);

        if (isNaN(elValorCont)) {
            if (!isNaN(elMin)) {
                elValorCont = elMin;
            } else {
                elValorCont = 0;
            }
        }

        if ($(cualBoton).hasClass('menos')) {
            if (elMin != undefined) {
                if (elValorCont > elMin) {
                    elValorCont--;
                }
            } else {
                elValorCont--;
            }
        }

        if ($(cualBoton).hasClass('mas')) {
            if (elMax != undefined) {
                if (elValorCont < elMax) {
                    elValorCont++;
                }
            } else {
                elValorCont++;
            }
        }
        // log('elValorCont', elValorCont);
        if (!$(cualBoton).parent().find($('input')).attr('disabled')) {
            $(cualBoton).parent().find($('input')).val(elValorCont).trigger("change");
        }

    }


    detectaUnloadContenido();

    leeLocalStorage();

    // ran = generarId();
    // location.hash = "?" + ran;


});