/* Panel Admin uJL 2016 */

var baseOk;
var usuarioId;
var usuarioVisible;
var elPerfilDisplay;
var elPerfil;
var elPerfilNombre;
var elUsuarioNivel;
var usuarioKey;
// var IdCurso = 'curso_240919144107ezxn';
var IdCurso;

var cursoId;
var cursoNombre;
var cursoClave;
var cursoDescripcion;
var cursoObjetivos;
var cursoTemario;
var cursoConFechas;
var cursoFecha_abre;
var cursoFecha_cierra;
var cursoVisible;
var cursoPortada;


var cuantosTemas;
var cuantosRecursosTema;
var elCurso = {};
var elCursoTemas = {};
var elNombreRecurso;
var thatCurso;

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
            console.log("connected", connected);
            $('#divBloqConexion').hide();
            return connected;
        }
    });
}

var email = 'demo@demo.com';
var password = 'demo@demo.com';


function leeDatosCurso(cualCurso) {
    console.log('leeDatosCurso');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos/' + cualCurso).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                elCurso = snapshot.val();
                console.log('el curso', elCurso);
                console.log('el curso', Object.values(elCurso.Temas));
                // console.log('el curso', Object.keys(elCurso.Temas));

                cursoId = elCurso.Id;
                console.log('cursoId', cursoId);
                cursoNombre = elCurso.Nombre;
                console.log('cursoNombre', cursoNombre);
                cursoClave = elCurso.Clave;
                console.log('cursoClave', cursoClave);
                cursoDescripcion = elCurso.Descripcion;
                console.log('cursoDescripcion', cursoDescripcion);
                cursoObjetivos = elCurso.Objetivos;
                console.log('cursoObjetivos ', cursoObjetivos);
                cursoTemario = elCurso.Temario;
                console.log('cursoTemario ', cursoTemario);

                cursoConFechas = elCurso.conFechas;
                console.log('cursoConFechas ', cursoConFechas);
                if (cursoConFechas != false) {
                    cursoFecha_abre = elCurso.conFechas.Fecha_abre;
                    console.log('cursoFecha_abre ', cursoFecha_abre);
                    cursoFecha_cierra = elCurso.conFechas.Fecha_cierra;
                    console.log('cursoFecha_cierra ', cursoFecha_cierra);
                }

                cursoVisible = elCurso.Visible;
                console.log('cursoVisible ', cursoVisible);
                cursoPortada = elCurso.Portada;
                console.log('Portada del Curso: ', cursoPortada);



                cuantosTemas = 0;
                for (a = 0; a < Object.keys(elCurso.Temas).length; a++) {
                    if (Object.keys(elCurso.Temas)[a] != 'val') {
                        cuantosTemas++;
                        contadorRecursos = 0;

                        console.log('Tema', cuantosTemas, 'Nombre', elCurso.Temas['tema_' + cuantosTemas].Nombre);


                        var contadorRecursosTema = Object.keys(elCurso.Temas['tema_' + cuantosTemas].Recursos).length;
                        // for (b = 0; b < Object.keys(elCurso.Temas['tema_' + cuantosTemas].Recursos).length; b++) {
                        //     contadorRecursosTema++;

                        //     // this['Tema' + cuantosTemas + 'Recurso' + contadorRecursosTema + 'Id'] = elCurso.Temas['tema_' + cuantosTemas].Recursos['recurso_' + contadorRecursosTema].Id;
                        //     // console.log('recursoId', cuantosTemas, contadorRecursosTema, this['Tema' + cuantosTemas + 'Recurso' + contadorRecursosTema + 'Id']);

                        // }

                        this['cuantosRecTema' + cuantosTemas] = contadorRecursosTema;
                        console.log('cuantos Recursos del tema', cuantosTemas, this['cuantosRecTema' + cuantosTemas]);


                        for (b = 1; b <= contadorRecursosTema; b++) {

                            this['cursoTema' + cuantosTemas + 'elRecursoId' + contadorRecursosTema] = elCurso.Temas['tema_' + cuantosTemas].Recursos['recurso_' + b].Id;
                            console.log('Tema', b, 'Recurso', b, 'Id', this['cursoTema' + cuantosTemas + 'elRecursoId' + contadorRecursosTema]);

                            this['cursoTema' + cuantosTemas + 'elRecursoNombre' + contadorRecursosTema] = elCurso.Temas['tema_' + cuantosTemas].Recursos['recurso_' + b].Nombre;
                            console.log('Tema', b, 'Recurso', b, 'Nombre', this['cursoTema' + cuantosTemas + 'elRecursoNombre' + contadorRecursosTema]);

                            this['cursoTema' + cuantosTemas + 'elRecursoCategoria' + contadorRecursosTema] = elCurso.Temas['tema_' + cuantosTemas].Recursos['recurso_' + b].Categoria;
                            console.log('Tema', b, 'Recurso', b, 'Categoria', this['cursoTema' + cuantosTemas + 'elRecursoCategoria' + contadorRecursosTema]);

                        }

                        thatCurso = this;
                    }
                }

                cuantosRecursosTema = contadorRecursosTema;


                // for (a = 1; a <= cuantosTemas; a++) {
                //     for (b = 1; b <= contadorRecursosTema; b++) {

                //     }
                // }







                // cuantosTemasPorCurso = 0;

                // var cursoId = snapshot.child('Id').val();
                // console.log('cursoId', cursoId);
                // var cursoClave = snapshot.child('Clave').val();
                // console.log('cursoClave', cursoClave);
                // var cursoNombre = snapshot.child('Nombre').val();
                // console.log('cursoNombre', cursoNombre);
                // var cursoDescripcion = snapshot.child('Descripcion').val();
                // console.log('cursoDescripcion', cursoDescripcion);
                // var cursoObjetivos = snapshot.child('Objetivos').val();
                // console.log('cursoObjetivos ', cursoObjetivos);
                // var cursoTemario = snapshot.child('Temario').val();
                // console.log('cursoTemario ', cursoTemario);

                // var cursoConFechas = snapshot.child('conFechas').val();
                // console.log('cursoConFechas ', cursoConFechas);
                // if (cursoConFechas != false) {
                //     snapshot.forEach(function(childSnapshot) {
                //         if (childSnapshot.key == "conFechas") {
                //             var cursoFecha_abre = snapshot.child(childSnapshot.key).child('Fecha_abre').val();
                //             console.log('cursoFecha_abre ', cursoFecha_abre);
                //             var cursoFecha_cierra = snapshot.child(childSnapshot.key).child('Fecha_cierra').val();
                //             console.log('cursoFecha_cierra ', cursoFecha_cierra);
                //         }
                //     });
                // }

                // var cursoVisible = snapshot.child('Visible').val();
                // console.log('cursoVisible ', cursoVisible);
                // var cursoPortada = snapshot.child('Portada').val();
                // console.log('Portada del Curso: ', cursoPortada);


                // snapshot.forEach(function(childSnapshot) {
                //     // console.log('childSnapshot', childSnapshot.key); 

                //     if (childSnapshot.key == "Temas") {
                //         var cuantosTemas = (childSnapshot.numChildren() - 1);
                //         console.log('cuantosTemas del Curso', cuantosTemas);

                //         var contadorTemasPorCurso = 0;
                //         childSnapshot.forEach(function(childSnapshot2) {
                //             if (childSnapshot2.key != undefined && childSnapshot2.key != null && childSnapshot2.key != '' && childSnapshot2.key != 'undefined' && childSnapshot2.key != 'val') {

                //                 contadorTemasPorCurso++;

                //                 this['cursoTemaId' + contadorTemasPorCurso] = childSnapshot.child(childSnapshot2.key).child('Id').val();
                //                 console.log('CursoTema', contadorTemasPorCurso, 'Id', this['cursoTemaId' + contadorTemasPorCurso]);

                //                 this['cursoTemaNombre' + contadorTemasPorCurso] = childSnapshot.child(childSnapshot2.key).child('Nombre').val();
                //                 console.log('CursoTema', contadorTemasPorCurso, 'Nombre', this['cursoTemaNombre' + contadorTemasPorCurso]);

                //                 this['cursoTemaOrden' + contadorTemasPorCurso] = childSnapshot.child(childSnapshot2.key).child('Orden').val();
                //                 console.log('CursoTema', contadorTemasPorCurso, 'Orden', this['cursoTemaOrden' + contadorTemasPorCurso]);

                //                 var contadorRecursosPorTema = 0;
                //                 childSnapshot2.forEach(function(childSnapshot3) {
                //                     console.log('childSnapshot3', childSnapshot3.key);

                //                     if (childSnapshot3.key == "Recursos") {
                //                         this['cuantosRecursosTemaCurso' + contadorTemasPorCurso] = childSnapshot3.numChildren();
                //                         // console.log('cuantosRecursos del Curso', contadorCursos, 'Tema', contadorTemasPorCurso, this['cuantosRecursosTemaCurso' + contadorTemasPorCurso]);

                //                         childSnapshot3.forEach(function(childSnapshot4) {
                //                             contadorRecursosPorTema++;

                //                             this['cursoTema' + contadorTemasPorCurso + 'elRecursoId' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Id').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Id', this['cursoTema' + contadorTemasPorCurso + 'elRecursoId' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'elRecursoClave' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Clave').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Clave', this['cursoTema' + contadorTemasPorCurso + 'elRecursoClave' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'elRecursoNombre' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Nombre').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Nombre', this['cursoTema' + contadorTemasPorCurso + 'elRecursoNombre' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoLiga' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Liga').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Liga', this['cursoTema' + contadorTemasPorCurso + 'RecursoLiga' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoCategoria' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Categoria').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Categoria', this['cursoTema' + contadorTemasPorCurso + 'RecursoCategoria' + contadorRecursosPorTema]);

                //                             // this['cursoTema' + contadorTemasPorCurso + 'RecursoCalifAuto' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('CalifAutomatica').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'CalifAuto', this['cursoTema' + contadorTemasPorCurso + 'RecursoCalifAuto' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'Tipo'] = childSnapshot3.child(childSnapshot4.key).child('TipoDeCalificacion').child('Tipo').val();
                //                             console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Tipo de Calificacion Tipo', this['cursoTema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'Tipo']);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'IdRubrica'] = childSnapshot3.child(childSnapshot4.key).child('TipoDeCalificacion').child('IdRubrica').val();
                //                             console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Tipo de Calificacion IdRubrica', this['cursoTema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'IdRubrica']);

                //                             // descripción no necesaria
                //                             // this['cursoTema' + contadorTemasPorCurso + 'RecursoDescripcion' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Descripcion').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Descripcion', this['cursoTema' + contadorTemasPorCurso + 'RecursoDescripcion' + contadorRecursosPorTema]);
                //                             // descripción no necesaria

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoTipoEntrega' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('TipoDeEntrega').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'TipoDeEntrega', this['cursoTema' + contadorTemasPorCurso + 'RecursoTipoEntrega' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoInstrucciones' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Instrucciones').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Instrucciones', this['cursoTema' + contadorTemasPorCurso + 'RecursoInstrucciones' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoOrden' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Orden').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Orden', this['cursoTema' + contadorTemasPorCurso + 'RecursoOrden' + contadorRecursosPorTema]);

                //                             // Intentos no necesarios
                //                             // this['cursoTema' + contadorTemasPorCurso + 'RecursoIntentos' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Intentos').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Intentos', this['cursoTema' + contadorTemasPorCurso + 'RecursoIntentos' + contadorRecursosPorTema]);
                //                             // Intentos no necesarios

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoVisible' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('RecursoVisible').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'RecursoVisible', this['cursoTema' + contadorTemasPorCurso + 'RecursoVisible' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoObligatorio' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Obligatorio').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Obligatorio', this['cursoTema' + contadorTemasPorCurso + 'RecursoObligatorio' + contadorRecursosPorTema]);

                //                             // CalifMasAlta no necesaria
                //                             // this['cursoTema' + contadorTemasPorCurso + 'RecursoCalifMasAlta' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('CalifMasAlta').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'CalifMasAlta', this['cursoTema' + contadorTemasPorCurso + 'RecursoCalifMasAlta' + contadorRecursosPorTema]);
                //                             // CalifMasAlta no necesaria

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoPromediable' + contadorRecursosPorTema] = childSnapshot3.child(childSnapshot4.key).child('Promediable').val();
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Promediable', this['cursoTema' + contadorTemasPorCurso + 'RecursoPromediable' + contadorRecursosPorTema]);

                //                             this['cursoTema' + contadorTemasPorCurso + 'RecursoPuntosObtener' + contadorRecursosPorTema] = parseInt(childSnapshot3.child(childSnapshot4.key).child('PuntosObtener').val());
                //                             // console.log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'PuntosObtener', this['cursoTema' + contadorTemasPorCurso + 'RecursoPuntosObtener' + contadorRecursosPorTema]);

                //                             // cuantosRecursosPorTema = contadorRecursosPorTema;
                //                         });

                //                     }
                //                 });
                //             }
                //         });
                //         cuantosTemasPorCurso = contadorTemasPorCurso;
                //     }

                //     if (childSnapshot.key == "Asignacion") {

                //         var cuantosAsignadosvar = (childSnapshot.numChildren() - 1);
                //         console.log('cuantosAsignados del Curso', cuantosAsignadosvar);
                //         contadorUsuAsigPorCurso = 0;

                //         childSnapshot.forEach(function(childSnapshot3) {
                //             if (childSnapshot3.key != undefined && childSnapshot3.key != null && childSnapshot3.key != '' && childSnapshot3.key != 'undefined' && childSnapshot3.key != 'val') {
                //                 contadorUsuAsigPorCurso++;

                //                 this['cursoUsuAsigId' + contadorUsuAsigPorCurso] = childSnapshot.child(childSnapshot3.key).child('Id').val();
                //                 console.log('CursoUsuAsig', contadorUsuAsigPorCurso, 'Id', this['cursoUsuAsigId' + contadorUsuAsigPorCurso]);

                //                 this['cursoUsuGrupos' + contadorUsuAsigPorCurso] = childSnapshot.child(childSnapshot3.key).child('Grupos').val();
                //                 console.log('CursoUsuAsig', contadorUsuAsigPorCurso, 'Grupos', this['cursoUsuGrupos' + contadorUsuAsigPorCurso]);

                //                 this['cursoUsuClase' + contadorUsuAsigPorCurso] = childSnapshot.child(childSnapshot3.key).child('Clase').val();
                //                 console.log('CursoUsuAsig', contadorUsuAsigPorCurso, 'Clase', this['cursoUsuClase' + contadorUsuAsigPorCurso]);

                //                 this['cursoUsuFecha_abre' + contadorUsuAsigPorCurso] = childSnapshot.child(childSnapshot3.key).child('Fecha_abre').val();
                //                 console.log('CursoUsuAsig', contadorUsuAsigPorCurso, 'Fecha_abre', this['cursoUsuFecha_abre' + contadorUsuAsigPorCurso]);

                //                 this['cursoUsuFecha_cierra' + contadorUsuAsigPorCurso] = childSnapshot.child(childSnapshot3.key).child('Fecha_cierra').val();
                //                 console.log('CursoUsuAsig', contadorUsuAsigPorCurso, 'Fecha_cierra', this['cursoUsuFecha_cierra' + contadorUsuAsigPorCurso]);

                //                 cuantosUsuAsigPorCurso = contadorUsuAsigPorCurso;
                //             }

                //         });
                //     }


                // });

                // thatCurso = this;



                return pintaCurso().then(function() {
                    // cargador('oculta');                  
                });

            }
        });
    }
}


function pintaCurso() {

    $("#preloader").animate({
        'opacity': '0'
    }, 600, function() {
        setTimeout(function() {
            $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
    });


    $('#tituloCurso > h1').html(cursoNombre);
    // $('#tituloCurso > p').html(cursoDescripcion);

    $('#tituloCurso2 > h3').html(cursoNombre);
    $('#tituloCurso2 > #descripcionCurso').html(cursoDescripcion);
    $('#tituloCurso2 > #temarioCurso').html(cursoTemario);
    $('#tituloCurso2 > #objetivosCurso').html(cursoObjetivos);

    $('#header').css({
        'background-image': 'url(../' + cursoPortada + ')'
    });
    $('#imgCurso1 > img').attr('src', '../' + cursoPortada);
    $('#imgCurso2 > img').attr('src', '../' + cursoPortada);
    $('#imgCurso3 > img').attr('src', '../' + cursoPortada);

    $('#cardCurso > h5').html(cursoNombre);
    $('#cardCurso > p').append('<br><br>');
    $('#cardCurso > p').html(cursoDescripcion);
    $('#cardCurso > p').append('<br><br>');
    $('#cardCurso > p').append(cursoObjetivos);

    return $.ajax();
}


$(window).on('beforeunload', function() {
    console.log('unload body');

});


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


$(window).resize(function() {

});


$(document).ready(function() {

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                IdCurso = sParameterName[1];
                console.log('el curso', IdCurso);
                leeDatosCurso(IdCurso);
                return IdCurso;
            }
        }
    }
    GetURLParameter('curso');

});