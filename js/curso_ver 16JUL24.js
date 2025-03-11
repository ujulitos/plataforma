var anchoTemario = 240;
var conTemario = true;
var cuantosTemas;
var cuantosRecursosTema;
var elCursoLanzado = {};
var laClaveRecurso;
var laLigaRecurso;
var laCategoriaRecurso;
var elTipoEntregaRecurso;
var elNombreRecurso;
var elNombreRecursoActual;
var laRutaRecursoAnterior;
var laRutaRecursoActual;
var laCalificacionTotal = 0;
// var laDescRecurso;
// var laDescRecursoActual;
var laInstrRecurso;
var laInstrRecursoActual;
var laLigaEntrega;
var laRutaRecurso;
var losComentariosEntrega;
var eliminaEntregaAnterior = true;
var elNumCurso;
var elNumTema;
var elNumRecurso;
var elNumRecursoActual;
var elIdRecurso;
var cuantasEntregas;
var cuantosComentarios;
var editorRetroEntregableMinimo = 300;
var editorRetroEntregableLength = false;
var arrayMisGrupos = new Array();
var arrayMisUsuarios1 = new Array();
var arrayMisUsuarios2 = new Array();
var these;
var those;
var thise;
var thatt;
var thattt;
var thet;

function lanzaContenido(cualContenido) {
    console.log('lanzaContenido', cualContenido);
    elNumCurso = cualContenido;
    console.log('cursoId', that['cursoId' + elNumCurso]);

    cargador('muestra');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos/' + that['cursoId' + cualContenido]).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                // console.log('el curso lanzado', snapshot.val());

                elCursoLanzado = snapshot.val();
                // console.log('el curso lanzado', elCursoLanzado);
                // console.log('el curso lanzado', Object.values(elCursoLanzado.Temas));
                // console.log('el curso lanzado', Object.keys(elCursoLanzado.Temas));

                // habilitaBoton($('#botonPerfil'), false);
                $('#botonPerfil').css({
                    'display': 'none'
                });
                if (elPerfil === "Usuario") {
                    // $("#boton_usuarios, #boton_lecciones").hide();
                }

                $('.main-panel').addClass('main-panel_100');
                $('.panel-header, .sidebar_main, .navbar-toggler').hide();
                $('.panel-header').css({
                    'width': '100%'
                });
                $('.navbar').hide();
                $('#barra_player, .sidebar_curso').show();
                // $('.barra_player_texto').text(that['cursoNombre' + elContenido]);
                $("#cursoTitulo").html('');
                $("#cursoSubtitulo").html('');
                $("#content").empty();
                $('#temas').empty();


                elContenidoLanzado = true;
                return cuentaRecursos(elContenidoLanzado);

            }
        });
    }

}


function pintaTemas() {

    var contadorTemas = 0;
    var contadorRecursos = 0;
    var losTemas = '';

    $('#temas').empty();


    cuantosTemas = 0;
    for (a = 0; a < Object.keys(elCursoLanzado.Temas).length; a++) {
        if (Object.keys(elCursoLanzado.Temas)[a] != 'val') {
            cuantosTemas++;

            var contadorRecursosTema = 0;
            for (b = 0; b < Object.keys(elCursoLanzado.Temas['tema_' + cuantosTemas].Recursos).length; b++) {
                contadorRecursosTema++;

                // this['Tema' + cuantosTemas + 'Recurso' + contadorRecursosTema + 'Id'] = elCursoLanzado.Temas['tema_' + cuantosTemas].Recursos['recurso_' + contadorRecursosTema].Id;
                // console.log('recursoId', cuantosTemas, contadorRecursosTema, this['Tema' + cuantosTemas + 'Recurso' + contadorRecursosTema + 'Id']);

            }
            this['cuantosRecTema' + cuantosTemas] = contadorRecursosTema;
            console.log('cuantosRecTema', cuantosTemas, 'cuantos Recursos', this['cuantosRecTema' + cuantosTemas]);

            thar = this;
        }
    }
    cuantosRecursosTema = contadorRecursosTema;

    // var elNombreDelRecurso;

    for (a = 1; a <= cuantosTemas; a++) {
        contadorTemas++;
        contadorRecursos = 0;

        losTemas += '<div id="tema' + contadorTemas + '" class="tema">';
        losTemas += '   <div id="tema' + contadorTemas + '_texto" class="tema_texto">' + elCursoLanzado.Temas['tema_' + contadorTemas].Nombre + '</div>';

        for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {
            contadorRecursos++;


            for (c = 1; c <= cuantosRecursosVisibles; c++) {

                // console.log('recursoNombree1', a, b, cuantosRecursosVisibles, elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id, that_['recursoNombre' + c]);
                if (elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id == that_['recursoId' + c]) {
                    // console.log('recursoNombree2', a, b, elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id, that_['recursoId' + c]);
                    elNumRecursoActual = c;
                    // elNombreDelRecurso = that_['recursoNombre' + elNumRecurso];
                    console.log('elNumRecursoActual', elNumRecursoActual);

                    break;
                }

            }


            losTemas += '      <div id="tema' + contadorTemas + 'Recurso' + contadorRecursos + '" class="tema_recurso">';
            losTemas += '         <div id="tema_senal" class="tema_senal_no"></div>';
            losTemas += '         <div id="tema_senal_int" class="tema_senal_int_no"></div>';
            losTemas += '         <div id="tema' + contadorTemas + 'Recurso' + contadorRecursos + '_texto" class="tema_recurso_texto" liga="' + that_['recursoLiga' + elNumRecursoActual] + '" idrec="' + elCursoLanzado.Temas['tema_' + contadorTemas].Recursos['recurso_' + b].Id + '" clave="' + that_['recursoClave' + elNumRecursoActual] + '" catrec="' + that_['recursoCategoria' + elNumRecursoActual] + '" tipoentrec="' + that_['TipoEntrega' + elNumRecursoActual] + '" califautorec="' + that_['recursoCalifManual' + elNumRecursoActual] + '">' + that_['recursoNombre' + elNumRecursoActual] + '</div>';
            losTemas += '         <span id="icono_recurso_estatus_' + contadorTemas + '_' + contadorRecursos + '" class="icono_status_rec"><i class="nc-icon-outline weather_moon-full icon_estatus_scorm icon_gris"></i></span>';
            losTemas += '      </div>';

        }

        losTemas += '</div>';

    }


    $('#temas').append(losTemas);

    $("#cursoTitulo").html(that['cursoNombre' + elNumCurso]);
    $("#cursoSubtitulo").html('');
    $('#botonOcultarTemas').css({
        'display': 'flex'
    });
    $('#botonOcultarTemas').css({
        'color': '#fff'
    });
    $('.boton_temas_texto').html('Ocultar');



    var elRefDatos1 = laUrlBase + 'Lecciones/' + usuarioId + '/' + that['cursoId' + elNumCurso];
    console.log('elRefDatos1: ', elRefDatos1);
    var elRefDatos2 = laUrlBase + 'Lecciones/' + usuarioId;
    console.log('elRefDatos2: ', elRefDatos2);

    firebase.database().ref(elRefDatos1).once('value').then(function(snapshot) {
        console.log('snapshot.val()', snapshot.val());
        console.log('elCursoLanzado', elCursoLanzado);

        var elCursoTemas = {};

        var onComplete = function(error) {
            if (error) {
                console.log('Ocurrió un error en la sincronización.');
            } else {
                console.log('Sincronización realizada.');
            }
        };

        if (snapshot.val() == null) {

            elNumTema = 1;
            elNumRecurso = 1;

            for (a = 1; a <= cuantosTemas; a++) {
                for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {
                    console.log('recursoVisible', a, b, that['curso' + elNumCurso + 'Tema' + a + 'RecursoVisible' + b])

                    if (that['curso' + elNumCurso + 'Tema' + a + 'RecursoVisible' + b] == 'si') {
                        elNumRecurso = b;
                        break;
                    }
                }
            }
            console.log('elNumRecurso', elNumRecurso);

            elIdRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('idrec');
            laClaveRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('clave');
            laLigaRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('liga');
            laCategoriaRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('catrec');
            elTipoEntregaRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('tipoentrec');
            elNombreRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Nombre;
            elNombreRecursoActual = elNombreRecurso;
            laRutaRecurso = [elCursoLanzado.Id] + '/Temas/' + 'tema_' + elNumTema + '/Recursos/' + 'recurso_' + elNumRecurso + '/' + elIdRecurso;
            laRutaRecursoActual = 'laRutaRecurso';
            laCalificacionTotal = 0;
            // laDescRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Descripcion;
            laInstrRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Instrucciones;

            // elCurso //
            elCurso = {
                [elCursoLanzado.Id]: {
                    Estatus: 'incompleto',
                    IngresosCurso: 1,
                    TemaActual: elNumTema,
                    RecursoActual: elNumRecurso,
                    IdRecursoActual: elIdRecurso,
                    NombreRecursoActual: elNombreRecurso,
                    RutaRecursoActual: laRutaRecurso,
                    ClaveRecursoActual: laClaveRecurso,
                    LigaRecursoActual: laLigaRecurso,
                    CategoriaRecursoActual: laCategoriaRecurso,
                    TipoEntregaRecursoActual: elTipoEntregaRecurso,
                    CalificacionTotal: laCalificacionTotal,
                    // DescripcionRecursoActual: laDescRecurso,
                    InstruccionesRecursoActual: laInstrRecurso,
                    Temas: {}
                }
            };


            laLigaEntrega = false;
            losComentariosEntrega = false;

            for (a = 1; a <= cuantosTemas; a++) {

                elCurso[elCursoLanzado.Id].Temas[Object.keys(elCursoLanzado.Temas)[(a - 1)]] = {
                    Recursos: {}
                }

                for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {

                    if (elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Categoria == 'Entregable') {
                        laRutaRecurso = [elCursoLanzado.Id] + '/Temas/' + ['tema_' + a] + '/Recursos/' + ['recurso_' + b] + '/' + [elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id] + '/';
                        console.log('laRutaRecurso', laRutaRecurso);
                        // losComentariosEntrega = 'Ok';
                    }

                    elCurso[elCursoLanzado.Id].Temas[Object.keys(elCursoLanzado.Temas)[(a - 1)]].Recursos[[Object.keys(elCursoLanzado.Temas['tema_' + a].Recursos)[(b - 1)]]] = {

                        [elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id]: {
                            'Activo': true,
                            'Calificacion': 0,
                            'Revisado': false,
                            'Aprobada': false,
                            'Duracion': "",
                            'Fecha_fin': "",
                            'Fecha_inicio': laFechaInicial,
                            'Marcador': "",
                            'Entregada': false,
                            'Calificada': false,
                            'LigaEntrega': laLigaEntrega,
                            'ComentariosEntrega': losComentariosEntrega,
                            'ComentariosEntregaRetro': false,
                            'TipoEntrega': $('#tema' + a + 'Recurso' + b + '_texto').attr('tipoentrec'),
                            'IntentoEntrega': 0,
                            'FechaEntrega': 'sin_entrega',
                            SCORM_12: {
                                'cmi_core_lesson_status': 'not attempted',
                                'cmi_core_session_time': '00:00:00',
                                'cmi_suspend_data': '',
                                'cmi_core_lesson_location': '',
                                'cmi_core_score_min': '0',
                                'cmi_core_score_raw': '0',
                                'cmi_core_exit': 'suspend'
                            }
                        }
                    }

                }
            }

            elCursoTemas = elCurso[elCursoLanzado.Id].Temas;

            // elCurso //

            var updates = {};
            updates[elRefDatos1] = elCurso[elCursoLanzado.Id];
            firebase.database().ref().update(updates, onComplete);

        } else {

            elCursoTemas = snapshot.val();

        }

        console.log('elCursoTemas', elCursoTemas);
        var totalRec = 0;
        var progreso = 0;
        laCalificacionTotal = 0;

        for (a = 1; a <= cuantosTemas; a++) {
            for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {
                totalRec++;

                this['lesson_status' + a + '_' + b] = Object.values(elCursoTemas.Temas['tema_' + a].Recursos['recurso_' + b])[0].SCORM_12.cmi_core_lesson_status;
                console.log('lesson_status', a, b, this['lesson_status' + a + '_' + b]);


                if (this['lesson_status' + a + '_' + b] == 'not attempted') {
                    // $('#icono_recurso_estatus' + contador).html('circle').addClass('icon_gris');
                }
                if (this['lesson_status' + a + '_' + b] == 'incomplete') {
                    // $('#icono_recurso_estatus' + contador).html('history_toggle_off').addClass('icon_amarillo');
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').removeClass('nc-icon-outline');
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').addClass('nc-icon-glyph ui-2_time icon_amarillo');
                    progreso += 0.5;
                }
                if (this['lesson_status' + a + '_' + b] == 'completed') {
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').removeClass('nc-icon-outline');
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').addClass('nc-icon-glyph ui-1_check-circle-08 icon_verde');
                    progreso += 1;
                }
                if (this['lesson_status' + a + '_' + b] == 'passed') {
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').removeClass('nc-icon-outline');
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').addClass('nc-icon-glyph ui-1_check-circle-08 icon_verde');
                    progreso += 1;
                }
                if (this['lesson_status' + a + '_' + b] == 'failed') {
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').removeClass('nc-icon-outline');
                    $('#icono_recurso_estatus_' + a + '_' + b + ' > i').addClass('nc-icon-glyph ui-1_circle-remove icon_rojo');
                }

                var califRec = Object.values(elCursoTemas.Temas['tema_' + a].Recursos['recurso_' + b])[0].Calificacion;
                califRec = parseInt(Math.round(califRec));
                console.log("califRec", califRec);
                laCalificacionTotal += califRec;
                console.log('laCalificacionTotal', laCalificacionTotal);

            }
        }

        // console.log('progreso', progreso, totalRec);
        // console.log('progreso_tot', $('.progreso_tot').width());

        var progreso_total = Math.round(((progreso * 100) / totalRec));
        // console.log('laCalificacionTotal', laCalificacionTotal);
        // $('#progreso_calif').html('');
        $('#progreso_texto').html('Calificación: <b>' + laCalificacionTotal + '</b> / Progreso: <b>' + progreso_total + '%</b>');
        $('.progreso_act').css({
            'width': Math.round(((progreso * $('.progreso_tot').width()) / totalRec)) + 'px'
        });
        ///////////////
        updateCalificacionTotalPinta(usuarioId, laCalificacionTotal);
        ///////////////

        these = this;

        // Si los Recursos son Obligatorios
        for (a = 1; a <= cuantosTemas; a++) {
            for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {
                // console.log('aaaaaaaaaaaaaa', a, b, elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Obligatorio, these['lesson_status' + a + '_' + b]);

                if (b == elNumRecurso) {
                    elNombreRecursoActual = [elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Nombre];
                    console.log('elNombreRecursoActual', elNombreRecursoActual);
                    laLigaEntrega = 'cursos/' + [elCursoLanzado.Id] + '/' + usuarioId + '/' + elIdRecursoActual + '/';
                    console.log('laLigaEntrega', laLigaEntrega);

                    laRutaRecurso = [elCursoLanzado.Id] + '/Temas/' + ['tema_' + a] + '/Recursos/' + ['recurso_' + b] + '/' + [elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id] + '/';
                    console.log('laRutaRecurso', laRutaRecurso);
                }

                $('#tema' + a + 'Recurso' + (b + 1)).css({
                    'pointer-events': 'all'
                });
                if ((these['lesson_status' + a + '_' + b] == 'not attempted') || (these['lesson_status' + a + '_' + b] == 'incomplete')) {

                    if (elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Obligatorio) {
                        $('#tema' + a + 'Recurso' + (b + 1)).css({
                            'pointer-events': 'none'
                        });
                        $('#tema' + (a + 1) + 'Recurso' + (b - 1)).css({
                            'pointer-events': 'none'
                        });
                        $('#tema' + (a + 1) + 'Recurso' + b).css({
                            'pointer-events': 'none'
                        });

                        // console.log('bbbbbbbbbb', a, b, (a + 1), (b - 1));
                    }
                }

            }
        }

    });


    for (a = 1; a <= cuantosTemas; a++) {
        for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {

            //////////// registraUltimaConexionRecurso ////////////
            laRutaRecursoAnterior = [elCursoLanzado.Id] + '/Temas/' + 'tema_' + elNumTema + '/Recursos/' + 'recurso_' + elNumRecurso + '/' + elIdRecurso;;
            console.log('laRutaRecursoAnterior', laRutaRecursoAnterior, elNumTema, elNumRecurso);
            //////////// registraUltimaConexionRecurso ////////////

            $('#tema' + a + 'Recurso' + b).click(function(event) {
                event.preventDefault();

                //////////// registraUltimaConexionRecurso ////////////
                registraUltimaConexionRecurso();
                //////////// registraUltimaConexionRecurso ////////////

                elNumTema = parseInt($(this).attr('id').split('tema')[1].split('Recurso')[0]);
                console.log('elNumTema', elNumTema);
                elNumRecurso = parseInt($(this).attr('id').split('Recurso')[1]);
                console.log('elNumRecurso', elNumRecurso);
                laClaveRecurso = $(this).find('.tema_recurso_texto').attr('clave');
                console.log("laClaveRecurso " + laClaveRecurso);
                laLigaRecurso = $(this).find('.tema_recurso_texto').attr('liga');
                console.log("laLigaRecurso " + laLigaRecurso);
                elIdRecurso = $(this).find('.tema_recurso_texto').attr('idrec');
                console.log("elIdRecurso " + elIdRecurso);
                laCategoriaRecurso = $(this).find('.tema_recurso_texto').attr('catrec');
                console.log("laCategoriaRecurso " + laCategoriaRecurso);
                elTipoEntregaRecurso = $(this).find('.tema_recurso_texto').attr('tipoentrec');
                console.log("elTipoEntregaRecurso " + elTipoEntregaRecurso);
                elNombreRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Nombre;
                console.log("elNombreRecurso", elNombreRecurso);
                elNombreRecursoActual = elNombreRecurso;
                console.log('elNombreRecursoActual', elNombreRecursoActual);
                laRutaRecurso = [elCursoLanzado.Id] + '/Temas/' + 'tema_' + elNumTema + '/Recursos/' + 'recurso_' + elNumRecurso + '/' + elIdRecurso;
                console.log("laRutaRecurso", laRutaRecurso);
                laRutaRecursoActual = laRutaRecurso;
                console.log('laRutaRecursoActual', laRutaRecursoActual);

                // Descripción no necesaria
                // laDescRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Descripcion;
                // console.log("laDescRecurso " + laDescRecurso);
                // Descripción no necesaria

                laInstrRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Instrucciones;
                console.log("laInstrRecurso " + laInstrRecurso);

                updateCursoActual(true);
            });
        }
    }

    $(document).off('click', '#botonOcultarTemas').on('click', '#botonOcultarTemas', function(event) {
        event.preventDefault();
        var laDuracion = 300;

        if (conTemario) {
            conTemario = false;

            $('.sidebar_curso').animate({
                'margin-left': '-' + anchoTemario + 'px'
            }, laDuracion, function() {
                $('.sidebar_curso').css({
                    'display': 'none'
                });
                $('#botonOcultarTemas').css({
                    'color': '#2c2c2c',
                    'background-color': '#e6e6fa'
                });
                ajustaEscalaContenido(conTemario);
            });

            $('.boton_temas_texto ').html('Mostrar');

        } else {
            conTemario = true;

            $('.sidebar_curso').css({
                'display': 'flex'
            });
            $('.sidebar_curso').animate({
                'margin-left': '0'
            }, 0, function() {
                $('#botonOcultarTemas').css({
                    'color': '#fff',
                    'background-color': '#616161'
                });
                ajustaEscalaContenido(conTemario);
            });

            $('.boton_temas_texto ').html('Ocultar');

        }
    });

    $("#botonImprimir").click(function() {
        window.open("pdf/pdf" + (paginaActual + 1) + ".pdf", "_blank");
    });

    $("#botonSalir").click(function(event) {
        event.preventDefault();
        salir();
    });
    $("#botonSalirSi").click(function(event) {
        event.preventDefault();
        window.close();
    });

    $("#botonAyuda").click(function(event) {
        event.preventDefault();
        mostrarAyuda();
    });

    $("#botonAnterior").click(function(event) {
        event.preventDefault();
        paginaAnterior();
    });
    $("#botonSiguiente, #botonSiguiente_inf").click(function(event) {
        event.preventDefault();
        paginaSiguiente();
    });


    return $.ajax();
}


function cargaContent() {
    console.log('cargaContent', laClaveRecurso);

    // $("#content").html('');
    cargador('muestra');
    // if (elPerfil === 'Administrador' || elPerfil === 'Asesor Académico') {
    // cuentaEntregas(nada);
    // }

    function nada() {}

    ////////////////////////
    console.log('laCategoriaRecurso', laCategoriaRecurso);

    setTimeout(function() {

        switch (laCategoriaRecurso) {

            case 'SCORM':
                $("#content").html('<iframe name="curso" id="curso" src="' + laLigaRecurso + '" frameborder="0" scrolling="no" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');
                break;
            case 'PDF':
                $("#content").html('<iframe name="curso" id="curso" src="' + laLigaRecurso + '" frameborder="0" scrolling="no" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');
                break;
            case 'Video':
                $("#content").html('<iframe name="curso" id="curso" src="' + laLigaRecurso + '" frameborder="0" scrolling="no" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');
                break;
            case 'Imagen':
                $("#content").html('<iframe name="curso" id="curso" src="' + laLigaRecurso + '" frameborder="0" scrolling="no" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');
                break;
            case 'Audio':
                $("#content").html('<iframe name="curso" id="curso" src="' + laLigaRecurso + '" frameborder="0" scrolling="no" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');
                break;

            case 'Word':
                var laRutaCrecLms = 'https://campusdigital360.com/lms/';
                $("#content").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laRutaCrecLms + laLigaRecurso + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');
                break;

            case 'PowerPoint':
                var laRutaCrecLms = 'https://campusdigital360.com/lms/';
                $("#content").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laRutaCrecLms + laLigaRecurso + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');
                break;

            case 'Entregable':

                if (elPerfil === 'Administrador' || elPerfil === 'Asesor Académico') {

                    // return comparaGrupos().then(function() {
                    cuentaEntregas(lanzaEntregable);
                    // });

                } else {
                    // comparaGrupos();
                    cuentaMiEntrega(lanzaEntregable);
                }

                function lanzaEntregable() {
                    console.log('lanzaEntregable');

                    var elContenido = '';

                    // if (elPerfil === "Administrador") {
                    if (elPerfil === 'Participante' || elPerfil === 'Observador') {
                        // $("#content").empty();

                        elContenido += '<br> <br>';
                        elContenido += '<div class="row">';
                        elContenido += '<div class="col-11" style="margin: 0 auto;">';
                        elContenido += '<div class="titulo_label">';
                        // descripción no necesaria
                        // elContenido += '   <h6 class="input_label">' + laDescrRecursoActual + '</h6>';
                        // descripción no necesaria
                        // elContenido += '<br>';
                        // elContenido += '   <p class="texto|">' + elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Instrucciones + '</p>';
                        // elContenido += '<div class="divisor">';
                        elContenido += '   <div class="texto texto_back">' + lasInstrRecursoActual + '</div>';
                        // elContenido += '<div class="divisor">';
                        elContenido += '<br> <br>';

                        elContenido += '<div class="areaEntregada mb-5">Tu tarea se ha entregado correctamente.<br>';
                        elContenido += '<div class="areaEntregadaCalif">Espera retroalimentación de tu Asesor Académico.</div>';
                        elContenido += '</div>';
                        elContenido += '<div class="areaEntregadaReset"><button id="botonResetearEntrega" class="btn btn-azul btn-round ml-auto">Quiero reenviar mi tarea</button></div>';

                        elContenido += '<div class="areaEntrega">';
                        if (elTipoEntregaActual != 2) {
                            elContenido += '    <p class="texto">Agrega tus comentarios:</p>';
                            elContenido += '    <textarea id="editorRecursoEntregable" name="contentt" class="area_editor"></textarea>';
                            elContenido += '    <br> <br>';
                        }
                        if (elTipoEntregaActual != 1) {
                            elContenido += '    <p class="texto">Sube tu archivo aquí:</p>';
                            elContenido += '    <p class="texto_subtitulo texto_formato_ent">El archivo debe ser en formato "pdf".<br>El documento no debe pesar más de 15Mb.';
                            // elContenido += '<br><br>   <a href="docs/formato_entregable.docx">Descargar formato de ejemplo <b>aquí</b></a>';
                            elContenido += '   </p>';
                            elContenido += '   <form id="formZipEntregable" class="input_archivo _recurso" method="post" enctype="multipart/form-data">';
                            elContenido += '       <input id="inputZipEntregable" type="file" class="_recurso" accept=".pdf" style="width: 100%; padding: 30px;">';
                            elContenido += '   </form>';
                            elContenido += '<br> <br>';
                        }
                        elContenido += '<div class="col-12 text-right">';
                        elContenido += '    <span id="texto_error_Curso" class="texto_error"></span>';
                        // elContenido += '    <button id="botonCancelarCurso" class="btn btn-naranja btn-round ml-auto">Cancelar</button>';
                        elContenido += '    <button id="botonEnviarEntregable" class="btn btn-verde2 btn-round ml-auto" disabled="disabled">Enviar tarea</button>';
                        elContenido += '</div>';
                        elContenido += '</div>';

                        elContenido += '</div>';
                        elContenido += '</div>';


                        $("#content").html(elContenido);
                        // $("#content").css({
                        //     'background-color': '#ffffff',
                        //     'overflow-y': 'auto',
                        //     'overflow-x': 'hidden'
                        // });

                        if (elPerfil === 'Observador') {
                            $('#inputZipEntregable').prop('disabled', 'disabled');
                            $('#botonEnviarEntregable').prop('disabled', 'disabled');
                        }

                        if (elTipoEntregaActual != 2) {
                            ClassicEditor.create(document.querySelector('#editorRecursoEntregable'), {
                                toolbar: [
                                    'undo',
                                    'redo',
                                    // 'bold',
                                    // 'italic',
                                    // 'link',
                                    // 'bulletedList',
                                    // 'numberedList',
                                ],
                                link: {
                                    addTargetToExternalLinks: true
                                }
                            }).then(editorRecursoEntregable => {
                                // editorRecursoEntregable.data.set('hola');
                                $('#editorRecursoEntregable').next().find('.ck-editor__editable').keyup(function(e) {
                                    // var keyCode = e.which;
                                    // console.log('keyCode', e.which);

                                    var editorLength;
                                    if ($('#editorRecursoEntregable').next().find('.ck-editor__editable').html() == '<p><br data-cke-filler="true"></p>') {
                                        editorLength = 0;
                                    } else {
                                        editorLength = $('#editorRecursoEntregable').next().find('.ck-editor__editable').html().length;
                                    }
                                    if (editorLength >= 1) {
                                        $('#botonEnviarEntregable').prop('disabled', false);
                                    } else {
                                        $('#botonEnviarEntregable').prop('disabled', 'disabled');
                                    }
                                });
                            }).catch(error => {
                                console.error(error);
                            });
                        } else {

                            $('#inputZipEntregable').on('change', function() {
                                console.log($("#inputZipEntregable")[0].files[0]);
                                if ($("#inputZipEntregable")[0].files[0] != undefined) {
                                    $('#botonEnviarEntregable').prop('disabled', false);
                                }
                            });

                            // $('#botonEnviarEntregable').prop('disabled', false);
                        }

                        $(document).off('click', '#botonEnviarEntregable').on('click', '#botonEnviarEntregable', function(event) {
                            event.preventDefault();
                            subirEntregable($("#inputZipEntregable")[0]);
                        });

                        $(document).off('click', '#botonResetearEntrega').on('click', '#botonResetearEntrega', function(event) {
                            event.preventDefault();
                            Swal.fire({
                                title: "Reenviar entrega",
                                type: "question",
                                showCancelButton: false,
                                // showconfirmButton: false,
                                html: 'Esto eliminará tu entrega actual<br>y reiniciará tu intento.<br><br>Estás seguro? <br><br> <div class="actions text-center"><div id="botonCancelarResetearEntrega" class="btn btn-naranja cancel btn-round" style="margin-right: 20px;">Cancelar<i class="nc-icon-outline ui-1_simple-remove" style="padding-left: 5px;"></i></div><div id="botonAceptarResetearEntrega" class="btn btn-verde2 ok btn-round">Aceptar<i class="nc-icon-outline ui-1_check" style="padding-left: 5px;"></i></div></div>'
                            });

                            $(document).off('click', '#botonCancelarResetearEntrega').on('click', '#botonCancelarResetearEntrega', function(event) {
                                event.preventDefault();
                                swal.close();
                            });
                            $(document).off('click', '#botonAceptarResetearEntrega').on('click', '#botonAceptarResetearEntrega', function(event) {
                                event.preventDefault();
                                eliminarEntregable(false, false);
                            });
                        });

                        // setTimeout(function() {
                        $('.areaEntrega').show();
                        $('.areaEntregada').hide();
                        $('.areaEntregadaReset').hide();
                        // }, 500);

                        for (a = 1; a <= cuantasEntregas; a++) {

                            // console.log('cuantasEntregas', a, elNumRecurso, thatt['usuIdEntrega' + a], usuarioId, thatt['laTareaEntregada' + a]);
                            if (thatt['usuIdEntrega' + a] == usuarioId) {

                                if (thatt['laTareaEntregada' + a] == true) {
                                    $('.areaEntrega').hide();
                                    $('.areaEntregada').show();
                                    $('.areaEntregadaReset').show();
                                }

                                if (thatt['laTareaRevisada' + a] == true) {
                                    // $('.areaEntregadaCalif').html('<br>Se te ha asignado una calificación de:<br><b>' + thatt['laTareaCalificada' + a] + '</b> <br><br>Comentarios de tu Asesor Académico:<br><b>' + thatt['laTareaComentariosRetro' + a] + '</b>');
                                    $('.areaEntregadaReset').hide();
                                    if (thatt['laTareaAprobada' + a] == true) {
                                        $('.areaEntregadaCalif').html('<br>Tu tarea ha sido revisada. <br><br>Tu tarea ha sido revisada y calificada con <b>' + thatt['laTareaCalificion' + a] + '</b>. <br><br>Comentarios de tu Asesor Académico:<br><br><b>' + thatt['laTareaComentariosRetro' + a] + '</b>');
                                    } else {
                                        if (thatt['laTareaCalificada' + a] == false) {
                                            // $('.areaEntregadaCalif').show();
                                            $('.areaEntregada').html('Tu tarea se ha entregado correctamente.<br>Espera retroalimentación de tu Asesor Académico.');
                                            // $('.areaEntregadaCalif').html('Espera retroalimentación de tu Asesor Académico.');
                                            $('.areaEntrega').hide();
                                        } else {
                                            $('.areaEntregadaCalif').html('<br>Tu tarea ha sido revisada. <br><br>Comentarios de tu Asesor Académico:<br><br><b>' + thatt['laTareaComentariosRetro' + a] + '</b> <br><br><span class="texto_error_gde">Tu tarea <b>no ha sido aprobada</b>, por favor intenta nuevamente.</span>');
                                            $('.areaEntrega').show();
                                        }
                                    }
                                }

                            }

                        }

                    } else if (elPerfil === 'Administrador' || elPerfil === 'Asesor Académico') {

                        elContenido += '<div class="row">';


                        // TODO selecciona grupos
                        elContenido += '<div id="columna_grupos_izq" class="columna_grupos_izq card pb-1">';
                        elContenido += '<br><br>';

                        elContenido += '<div class="columna_grupos_izq_int pt-0 pl-3 pr-3 py-3 bg-white rounded">';
                        elContenido += '<h6 class="input_label">Selecciona un Grupo a visualizar:</h6>';

                        elContenido += '<br><br><br>';

                        for (a = 0; a < arrayMisGrupos.length; a++) {
                            elContenido += '<div class="el_grupo check-radio mb-4">' + arrayMisGrupos[a];
                            elContenido += '<div id="botonRadioVerGrupo' + a + '" class="el_handle btn btn-sm btn-toggle btn-radio" data-toggle="button" aria-pressed="false">';
                            elContenido += '<div class="handle"></div>';
                            elContenido += '</div>';
                            elContenido += '</div>';
                        }

                        elContenido += '</div>';
                        elContenido += '</div>';

                        elContenido += '<div id="columna_grupos_der" class="columna_grupos_der card_">';
                        // elContenido += '<div>';
                        // elContenido += '<br><br>';
                        // elContenido += '<input id="buscadorEntCurso" class="form-control form-control1" type="text" placeholder="Buscar..." />';
                        // elContenido += '<i id="buscadorClean" class="nc-icon-glyph ui-1_simple-remove form-control form-control2"></i>';
                        // elContenido += '</div>';


                        elContenido += '<div class="pt-4 pl-5 pr-5 py-3 bg-white rounded tabla_entregas_lista">';

                        //// ---->
                        // elContenido += '<table class="table entregas_lista">';
                        // elContenido += '    <thead>';
                        // elContenido += '        <tr>';
                        // elContenido += '            <th class="col-4">';
                        // elContenido += '                <h6 class="input_label">Usuario</h6>';
                        // elContenido += '            </th>';
                        // elContenido += '            <th class="col-2">';
                        // elContenido += '                <h6 class="input_label">Grupo</h6>';
                        // elContenido += '            </th>';
                        // elContenido += '            <th class="col-2">';
                        // elContenido += '                <h6 class="input_label">Fecha de entrega</h6>';
                        // elContenido += '            </th>';
                        // elContenido += '            <th class="col-2">';
                        // elContenido += '                <h6 class="input_label">Estatus</h6>';
                        // elContenido += '            </th>';
                        // elContenido += '            <th class="col-2">';
                        // elContenido += '                <h6 class="input_label">Calificar</h6>';
                        // elContenido += '            </th>';
                        // elContenido += '        </tr>';
                        // elContenido += '    </thead>';
                        // elContenido += '    <tbody>';


                        // // arrayMisUsuarios1.push({
                        // //     'usuIdEntrega': thattt['usuIdEntrega' + contadorEntregas],
                        // //     'usuNombreEntrega': thattt['usuNombreEntrega' + contadorEntregas],
                        // //     'usuGrupoEntrega': thattt['usuGrupoEntrega' + contadorEntregas]
                        // // });

                        // // arrayMisUsuarios2.push({
                        // //     'laTareaEntregada': this['laTareaEntregada' + contadorEntregas],
                        // //     'fechaEntregada': this['fechaEntregada' + contadorEntregas],
                        // //     'laTareaCalificada': this['laTareaCalificada' + contadorEntregas],
                        // //     'laTareaCalificion': this['laTareaCalificion' + contadorEntregas],
                        // //     'laTareaRevisada': this['laTareaRevisada' + contadorEntregas],
                        // //     'laTareaAprobada': this['laTareaAprobada' + contadorEntregas],
                        // //     'laTareaLiga': this['laTareaLiga' + contadorEntregas],
                        // //     'elTipoEntrega': this['elTipoEntrega' + contadorEntregas],
                        // //     'elIntentoEntrega': this['elIntentoEntrega' + contadorEntregas],
                        // //     'laTareaComentarios': this['laTareaComentarios' + contadorEntregas],
                        // //     'laTareaComentariosRetro': this['laTareaComentariosRetro' + contadorEntregas]
                        // // });

                        // // TODO si es el grupo seleccionado
                        // console.log('arrayMisUsuarios1.length', arrayMisUsuarios1.length);
                        // for (a = 0; a < arrayMisUsuarios1.length; a++) {
                        //     for (b = 0; b < arrayMisGrupos.length; b++) {
                        //         // console.log('usuGrupoEntrega.length', thatt['usuGrupoEntrega' + a], arrayMisGrupos[0].split(',')[b]);

                        //         // if (arrayMisUsuarios2[a].fechaEntregada != null && arrayMisUsuarios2[a].fechaEntregada != 'sin_entrega') {

                        //         if (arrayMisUsuarios1[a].usuGrupoEntrega == arrayMisGrupos[b]) {
                        //             elContenido += '<tr>';
                        //             elContenido += '<td>';
                        //             elContenido += '<p id="usuario_nombre' + (a + 1) + '" class="usuario_nombre_entrega">' + arrayMisUsuarios1[a].usuNombreEntrega + '</p>';
                        //             elContenido += '</td>';
                        //             elContenido += '<td>';
                        //             elContenido += '<p id="usuario_grupo' + (a + 1) + '" class="usuario_grupo_entrega">' + arrayMisUsuarios1[a].usuGrupoEntrega + '</p>';
                        //             elContenido += '</td>';
                        //             elContenido += '<td>';
                        //             if (arrayMisUsuarios2[a].laTareaEntregada != false && arrayMisUsuarios2[a].laTareaEntregada != 'false' && arrayMisUsuarios2[a].laTareaEntregada != null) {
                        //                 elContenido += '<p id="fecha_entrega' + (a + 1) + '" class="fecha_entrega_entrega">' + arrayMisUsuarios2[a].fechaEntregada + '</p>';
                        //             } else {
                        //                 elContenido += '<p id="fecha_entrega' + (a + 1) + '" class="fecha_entrega_entrega"></p>';
                        //             }
                        //             elContenido += '</td>';
                        //             elContenido += '<td id="recurso_estatus' + (a + 1) + '" class="recurso_estatus_entrega">';

                        //             if (arrayMisUsuarios2[a].laTareaEntregada == false || arrayMisUsuarios2[a].laTareaEntregada == 'false' || arrayMisUsuarios2[a].laTareaEntregada == null) {
                        //                 elContenido += '<div class="div_flex"><i class="icon_estatus_entrega nc-icon-outline weather_moon-full mr-2"></i><p class=" ">No entregada</p></div>';
                        //             } else {
                        //                 if (arrayMisUsuarios2[a].laTareaRevisada == false || arrayMisUsuarios2[a].laTareaRevisada == 'false') {
                        //                     elContenido += '<div class="div_flex"><i class="icon_estatus_entrega nc-icon-glyph ui-2_time icon_amarillo mr-2"></i><p class=" ">No revisada</p></div>';
                        //                 } else {
                        //                     if (arrayMisUsuarios2[a].laTareaAprobada == false || arrayMisUsuarios2[a].laTareaAprobada == 'false') {
                        //                         elContenido += '<div class="div_flex"><i class="icon_estatus_entrega nc-icon-glyph ui-1_circle-remove icon_rojo mr-2"></i><p class=" ">No aprobada</p></div>';
                        //                     } else {
                        //                         elContenido += '<div class="div_flex"><i class="icon_estatus_entrega nc-icon-glyph ui-1_check-circle-08 icon_verde mr-2"></i><p class=" ">Aprobada</p></div>';
                        //                     }
                        //                 }
                        //             }

                        //             elContenido += '</td>';
                        //             elContenido += '<td id="recurso_calif' + (a + 1) + '">';

                        //             if (arrayMisUsuarios2[a].laTareaEntregada != false && arrayMisUsuarios2[a].laTareaEntregada != 'false' && arrayMisUsuarios2[a].laTareaEntregada != null) {
                        //                 if (arrayMisUsuarios2[a].laTareaRevisada == false || arrayMisUsuarios2[a].laTareaRevisada == 'false') {
                        //                     elContenido += '<div id="botonCalificarEntrega' + (a + 1) + '" class="btn btn-round btn-azul botonCalificarEntrega" data-toggle="modal" data-target="#modalCalificarEntrega">';
                        //                     elContenido += '<i class="nc-icon-outline ui-1_pencil" style="padding-right: 10px;"></i>';
                        //                     elContenido += 'Calificar</div>';
                        //                 } else {
                        //                     elContenido += '<div id="botonCalificarEntrega' + (a + 1) + '" class="btn btn-round btn-verde2 botonCalificarEntrega" data-toggle="modal" data-target="#modalCalificarEntrega">';
                        //                     elContenido += '<i class="nc-icon-outline education_glasses" style="padding-right: 10px;"></i>';
                        //                     elContenido += 'Revisar</div>';
                        //                 }
                        //             }

                        //             // } else {
                        //             // elContenido += '        <div class=" ">' + thatt['laTareaAprobada' + a] + '</div>';
                        //             // }

                        //             elContenido += '</td>';
                        //             elContenido += '</tr>';

                        //         }

                        //         // }
                        //     }
                        // }

                        // elContenido += '</tbody>';
                        // elContenido += '</table>';
                        //// <----

                        elContenido += '</div>';
                        elContenido += '</div>';

                        elContenido += '</div>';

                        $("#content").html(elContenido);
                        // $("#content").css({
                        //     'background-color': '#ffffff',
                        //     'overflow-y': 'auto',
                        //     'overflow-x': 'hidden'
                        // });


                        function pintaTablaGrupo(cualGrupo) {
                            console.log('pintaTablaGrupo', cualGrupo);

                        }

                        // buscadorEntCurso //
                        // TODO mejorar toggles
                        // $("#buscadorEntCurso").keyup(function(event) {
                        //     event.preventDefault();
                        //     if ($(this).val().length > 2) {
                        //         console.log("buscando ok", $("#buscadorEntCurso").val(), $('.usuario_nombre_entrega').html().toLowerCase());

                        //         // for (a = 1; a <= cuantasEntregas; a++) {
                        //         //     $('#usuario_nombre' + a).parent().parent().hide();
                        //         // }

                        //         $('.usuario_nombre_entrega').each(function(index, element) {
                        //             console.log("buscandooo", index, $(element).html());

                        //             $(element).parent().parent().hide();

                        //             if ($(element).html().toLowerCase().includes($("#buscadorEntCurso").val().toLowerCase())) {
                        //                 // || that['recursoDesc' + b].toLowerCase().includes($(this).val().toLowerCase())) 
                        //                 console.log('Encontré la palabra', $("#buscadorEntCurso").val(), 'con el usuario', index, $(element)[0]);

                        //                 setTimeout(function() {
                        //                     $(element).parent().parent().fadeIn();
                        //                 }, 50);

                        //             } else {
                        //                 console.log('No encontré nada');
                        //             }
                        //         });
                        //         $('.usuario_grupo_entrega').each(function(index, element) {
                        //             console.log("buscandooo", index, $(element).html());

                        //             $(element).parent().parent().hide();

                        //             if ($(element).html().toLowerCase().includes($("#buscadorEntCurso").val().toLowerCase())) {
                        //                 // || that['recursoDesc' + b].toLowerCase().includes($(this).val().toLowerCase())) 
                        //                 console.log('Encontré la palabra', $("#buscadorEntCurso").val(), 'con el usuario', index, $(element)[0]);

                        //                 setTimeout(function() {
                        //                     $(element).parent().parent().fadeIn();
                        //                 }, 50);

                        //             } else {
                        //                 console.log('No encontré nada');
                        //             }
                        //         });
                        //         $('.fecha_entrega_entrega').each(function(index, element) {
                        //             console.log("buscandooo", index, $(element).html());

                        //             $(element).parent().parent().hide();

                        //             if ($(element).html().toLowerCase().includes($("#buscadorEntCurso").val().toLowerCase())) {
                        //                 // || that['recursoDesc' + b].toLowerCase().includes($(this).val().toLowerCase())) 
                        //                 console.log('Encontré la palabra', $("#buscadorEntCurso").val(), 'con el usuario', index, $(element)[0]);

                        //                 setTimeout(function() {
                        //                     $(element).parent().parent().fadeIn();
                        //                 }, 50);

                        //             } else {
                        //                 console.log('No encontré nada');
                        //             }
                        //         });
                        //         $('.recurso_estatus_entrega').find('p').each(function(index, element) {
                        //             console.log("buscandooo", index, $(element).html());

                        //             $(element).parent().parent().hide();

                        //             if ($(element).html().toLowerCase().includes($("#buscadorEntCurso").val().toLowerCase())) {
                        //                 // || that['recursoDesc' + b].toLowerCase().includes($(this).val().toLowerCase())) 
                        //                 console.log('Encontré la palabra', $("#buscadorEntCurso").val(), 'con el usuario', index, $(element)[0]);

                        //                 setTimeout(function() {
                        //                     $(element).parent().parent().fadeIn();
                        //                 }, 50);

                        //             } else {
                        //                 console.log('No encontré nada');
                        //             }
                        //         });

                        //     } else {
                        //         for (a = 0; a < arrayMisUsuarios1.length; a++) {
                        //             $('#usuario_nombre' + (a + 1)).parent().parent().show();
                        //             //     $('#usuario_nombre' + b).parent().parent().parent().parent().css({
                        //             //         'display': 'table-row'
                        //             //     });
                        //             //     $('#usuario_nombre' + b).parent().parent().parent().parent().animate({
                        //             //         'opacity': '1'
                        //             //     }, 400, function() {});
                        //         }
                        //     }

                        // });


                        // $("#buscadorClean").click(function(e) {
                        //     e.preventDefault();
                        //     $("#buscadorEntCurso").val('');
                        //     $("#buscadorEntCurso").keyup();
                        // });
                        // buscadorEntCurso //


                        // TODO pinta tabla grupos
                        // RadiosVerGrupos //
                        function activaRadiosVerGrupos() {
                            $(document).off('click', '.btn-radio').on('click', '.btn-radio', function(event) {
                                event.preventDefault();

                                $('.btn-radio').removeClass('active');
                                $(this).addClass('active');
                                /////////////////
                                cualGrupo = parseInt($(this).attr('id').substr(18, 3));
                                // console.log('cualGrupo', cualGrupo);
                                pintaTablaGrupo(cualGrupo);
                                /////////////////
                            });
                        }
                        activaRadiosVerGrupos();
                        // RadiosVerGrupos //


                        $(".botonCalificarEntrega").click(function(event) {
                            event.preventDefault();
                            var _Pos = $(this).attr('id').indexOf('_');
                            var cualRecurso = $(this).attr('id').substr(21, $(this).attr('id').length - (_Pos + 1));
                            // var cualPos = $(this).attr('id').substr(21, $(this).attr('id').length - (_Pos + 1));
                            // var cualRecurso = arrayMisUsuarios2[cualPos];

                            console.log('botonCalificarEntrega', cualRecurso, _Pos);
                            ////////////////
                            lanzamodalCalificarEntrega(cualRecurso);
                            ////////////////
                        });

                    }

                }

                break;


            case 'Foro':

                cuentaForos(lanzaForo);

                function lanzaForo() {

                    var elContenido = '';

                    elContenido += '<br> <br>';
                    elContenido += '<div class="row">';
                    elContenido += '<div class="col-11" style="margin: 0 auto;">';
                    elContenido += '<div class="titulo_label">';
                    // descripción no necesaria
                    // elContenido += '   <h6 class="input_label">' + laDescrRecursoActual + '</h6>';
                    // descripción no necesaria
                    // elContenido += '<br>';
                    // elContenido += '   <p class="texto|">' + elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Instrucciones + '</p>';
                    // elContenido += '<div class="divisor">';
                    elContenido += '   <div class="texto texto_back">' + lasInstrRecursoActual + '</div>';
                    // elContenido += '<div class="divisor">';
                    elContenido += '<br>';

                    for (a = 1; a <= cuantosComentarios; a++) {
                        elContenido += '<div class="areaComentarios">';
                        // elContenido += '<p>' + thet['usuIdComentario' + a] + '</p>';
                        elContenido += '<div class="areaComentariosNombre"><i class="nc-icon-outline users_single-05"></i> &nbsp;' + thet['usuNombreComentario' + a] + '</div>';
                        elContenido += '<div class="areaComentariosCom">' + thet['usuComentario' + a] + '</div>';
                        elContenido += '</div>';
                        elContenido += '<br>';
                    }


                    if (elPerfil === 'Participante' || elPerfil === 'Observador') {
                        // $("#content").empty();

                        elContenido += '<br>';
                        elContenido += '    <p class="texto">Agrega tus comentarios:</p>';
                        elContenido += '    <textarea id="editorRecursoComentario" name="contentt" class="area_editor"></textarea>';

                        elContenido += '<br> <br>';

                        elContenido += '<div class="col-12 text-right">';
                        elContenido += '    <span id="texto_error_Curso" class="texto_error"></span>';
                        // elContenido += '    <button id="botonCancelarCurso" class="btn btn-naranja btn-round ml-auto">Cancelar</button>';
                        elContenido += '    <button id="botonEnviarComentario" class="btn btn-verde2 btn-round ml-auto">Enviar comentarios</button>';
                        elContenido += '</div>';


                        elContenido += '<div class="areaEntregada">Tu tarea se ha entregado correctamente.<br>';
                        elContenido += '<div class="areaEntregadaCalif">Espera retroalimentación de tu Asesor Académico.</div>';
                        elContenido += '</div>';

                        elContenido += '</div>';
                        elContenido += '</div>';

                        $("#content").html(elContenido);
                        // $("#content").css({
                        //     'background-color': '#ffffff',
                        //     'overflow-y': 'auto',
                        //     'overflow-x': 'hidden'
                        // });


                        if (elPerfil === 'Observador') {
                            $('#botonEnviarComentario').prop('disabled', 'disabled');
                        }

                        ClassicEditor.create(document.querySelector('#editorRecursoComentario'), {
                            toolbar: [
                                'undo',
                                'redo',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                            ],
                            link: {
                                addTargetToExternalLinks: true
                            }
                        }).then(editorRecursoComentario => {
                            // editorRecursoComentario.data.set('hola');
                        }).catch(error => {
                            console.error(error);
                        });

                        $(document).off('click', '#botonEnviarComentario').on('click', '#botonEnviarComentario', function(event) {
                            event.preventDefault();
                            subirComentario($('#editorRecursoComentario').next().find('.ck-editor__editable').html());
                        });



                    } else if (elPerfil === 'Administrador' || elPerfil === 'Asesor Académico') {


                        elContenido += '<div class="pt-4 pl-5 pr-5 py-3 bg-white rounded tabla_recursos">';

                        elContenido += '<table class="table entregas_lista">';
                        elContenido += '    <thead>';
                        elContenido += '        <tr>';
                        elContenido += '            <th class="col-6">';
                        elContenido += '                <h6 class="input_label">Usuario</h6>';
                        elContenido += '            </th>';
                        elContenido += '            <th class="col-3">';
                        elContenido += '                <h6 class="input_label">Estatus</h6>';
                        elContenido += '            </th>';
                        elContenido += '            <th class="col-3">';
                        elContenido += '                <h6 class="input_label">Calificación</h6>';
                        elContenido += '            </th>';
                        elContenido += '        </tr>';
                        elContenido += '    </thead>';
                        elContenido += '    <tbody>';


                        for (a = 0; a < arrayMisUsuarios1.length; a++) {

                            elContenido += '            <tr>';
                            elContenido += '                <td>';

                            elContenido += '           <p id="usuario_nombre' + (a + 1) + '" class=" ">' + thatt['usuNombreEntrega' + (a + 1)] + '</p>';
                            elContenido += '     </td>';
                            elContenido += '    <td id="recurso_estatus' + (a + 1) + '">';

                            if (thatt['laTareaCalificada' + (a + 1)] == false || thatt['laTareaCalificada' + (a + 1)] == 'false') {
                                elContenido += '        <p class=" ">No calificada</p>';
                            } else {
                                elContenido += '        <p class=" ">Calificada</p>';
                            }

                            elContenido += '    </td>';
                            elContenido += '    <td id="recurso_calif' + (a + 1) + '">';

                            if (thatt['laTareaCalificada' + (a + 1)] == false || thatt['laTareaCalificada' + (a + 1)] == 'false') {
                                elContenido += '        <div id="botonCalificarEntrega' + a + '" class="btn btn-round btn-icon btn-verde2 botonCalificarEntrega" data-toggle="modal" data-target="#modalCalificarEntrega">';
                                elContenido += '            <i class="nc-icon-outline ui-1_pencil"></i>';
                                elContenido += '      </div>';
                            } else {
                                elContenido += '        <div class=" ">' + thatt['laTareaCalificada' + (a + 1)] + '</div>';
                            }

                            elContenido += '      </td>';
                            elContenido += '   </tr>';

                        }

                        elContenido += '           </tbody>';
                        elContenido += '    </table>';

                        elContenido += ' </div>';


                        $("#content").html(elContenido);
                        // $("#content").css({
                        //     'background-color': '#ffffff',
                        //     'overflow-y': 'auto',
                        //     'overflow-x': 'hidden'
                        // });


                        $(".botonCalificarEntrega").click(function(event) {
                            event.preventDefault();
                            var _Pos = $(this).attr('id').indexOf('_');
                            var cualRecurso = $(this).attr('id').substr(21, $(this).attr('id').length - (_Pos + 1));

                            console.log('botonCalificarEntrega', cualRecurso, _Pos, cualRecurso);
                            ////////////////
                            lanzamodalCalificarEntrega(cualRecurso);
                            ////////////////
                        });

                    }
                }


                break;

            default:
                break;
        }

    }, 000);



    ////////////////////////

    for (a = 1; a <= cuantosTemas; a++) {
        for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {

            $('#tema' + a + 'Recurso' + b + ' > #tema_senal').removeClass('tema_senal').addClass('tema_senal_no');
            $('#tema' + a + 'Recurso' + b + ' > #tema_senal_int').removeClass('tema_senal_int').addClass('tema_senal_int_no');
            $('#tema' + a + 'Recurso' + b + '_texto').addClass('tema_recurso_texto_no');

            $('#tema' + a + 'Recurso' + b).css({
                // 'pointer-events': 'all'
            });
            // $('#tema' + a + 'Recurso' + b + ' > .tema_recurso_texto').css({
            //     'color': '#2c2c2c',
            //     'font-weight': 'normal'
            // });

            console.log('recursoVisible', a, b, that['curso' + elNumCurso + 'Tema' + a + 'RecursoVisible' + b])
            if (that['curso' + elNumCurso + 'Tema' + a + 'RecursoVisible' + b] == 'no') {
                $('#tema' + a + 'Recurso' + b).addClass('recurso_deshabilitado');
            }

        }
    }

    $('#tema' + elNumTema + 'Recurso' + elNumRecurso + ' > #tema_senal').removeClass('tema_senal_no').addClass('tema_senal animated bounceIn');
    $('#tema' + elNumTema + 'Recurso' + elNumRecurso + ' > #tema_senal_int').removeClass('tema_senal_int_no').addClass('tema_senal_int animated bounceIn');
    $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').removeClass('tema_recurso_texto_no');

    $('#tema' + elNumTema + 'Recurso' + elNumRecurso).css({
        'pointer-events': 'none'
    });
    // $('#tema' + elNumTema + 'Recurso' + elNumRecurso + ' > .tema_recurso_texto').css({
    //     'color': '#fff',
    //     'font-weight': 'bold'
    // });



    setTimeout(function() {
        ajustaEscalaContenido(conTemario);
    }, 100);

    // cargador('oculta');


    return $.ajax();

}

function subirEntregable(cualEntregable) {
    console.log("subirEntregable", cualEntregable, elNumRecurso, laClaveRecurso);

    $('#modalSubirEntregable').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarSubirEntregable').on('click', '#botonCancelarSubirEntregable', function(e) {});
    $(document).off('click', '#botonAceptarSubirEntregable').on('click', '#botonAceptarSubirEntregable', function(e) {
        subirEntregableOK(cualEntregable);
    });

};


function subirEntregableOK(input) {
    console.log('subirEntregableOK', input);

    $('.areaEntregada').html('Tu tarea se ha entregado correctamente.<br>Espera retroalimentación de tu Asesor Académico.');
    $('.areaEntregadaReset').html('<div class="areaEntregadaReset"><button id="botonResetearEntrega" class="btn btn-azul btn-round ml-auto">Quiero reenviar mi tarea</button></div>');
    // $('.areaEntregadaCalif').html('Espera retroalimentación de tu Asesor Académico.');
    $('.areaEntrega').hide();

    cargador('muestra');
    IdCurso = [elCursoLanzado.Id];
    IdRec = [elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Id];

    if (elTipoEntregaActual != 1) {

        // TODO validar faltantes
        var nombreConcatenado = ([elCursoLanzado.Clave] + '_' + usuarioId + '_' + laClaveRecurso + '_' + input.files[0].name);
        var formIm = $("#formZipEntregable")[0];
        var formData = new FormData(formIm);
        formData.append("el_file", input.files[0]);
        formData.append("curso", IdCurso);
        formData.append("usuario", usuarioId);
        formData.append("recurso", IdRec);
        formData.append("nombreConcat", nombreConcatenado);
        formData.append("eliminaAnterior", eliminaEntregaAnterior);
        console.log("formData", input.files[0]);
        console.log("type", input.files[0].type);
        console.log("size", input.files[0].size);

        if (input.files[0].type == 'application/pdf') {
            if (input.files[0].size <= 15000000) {

                $.ajax({
                    url: "php/entregable_upload.php",
                    type: "post",
                    dataType: "html",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data) {

                        console.log("La Entrega se ha realizado correctamente");
                        guardaEntregadoBD(IdRec, nombreConcatenado);

                        $('.texto_formato_ent').css({
                            'color': '#5d5d5d'
                        });
                        cargador('oculta');
                        return data;
                    },
                    error: function() {
                        console.log('Error occured');
                        cargador('oculta');
                    }
                });

            } else {
                $('.areaEntrega').show();
                $('.areaEntregada').hide();
                $('.areaEntregadaReset').hide();
                $('.texto_formato_ent').css({
                    'color': '#f5593d'
                });
                cargador('oculta');
            }
        } else {
            $('.areaEntrega').show();
            $('.areaEntregada').hide();
            $('.areaEntregadaReset').hide();
            $('.texto_formato_ent').css({
                'color': '#f5593d'
            });
            cargador('oculta');
        }

    } else {
        guardaEntregadoBD(IdRec, 'no');
    }

}


function guardaEntregadoBD(elRecurso, elArchivo) {
    console.log('guardaEntregadoBD: ', elRecurso, elArchivo, laRutaRecursoActual);

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
            $('.areaEntrega').hide();
            $('.areaEntregada').show();
            $('.areaEntregadaReset').show();
            cargador('oculta');
        }
    };

    if (revisaConexion) {

        var elRefEntregado = laUrlBase + 'Lecciones/' + usuarioId + '/' + laRutaRecursoActual;
        console.log('elRefEntregado: ', elRefEntregado);

        if (elTipoEntregaActual == 1) {
            firebase.database().ref(elRefEntregado).update({
                'Entregada': true,
                'Calificada': false,
                'Revisado': false,
                'ComentariosEntrega': $('#editorRecursoEntregable').next().find('.ck-editor__editable').html(),
                'LigaEntrega': 'no',
                'TipoEntrega': elTipoEntregaRecurso,
                'FechaEntrega': laFechaFormateada,
                'SCORM_12': {
                    'cmi_core_lesson_status': 'incomplete',
                }
            }, onComplete);
        }
        if (elTipoEntregaActual == 2) {
            firebase.database().ref(elRefEntregado).update({
                'Entregada': true,
                'Calificada': false,
                'Revisado': false,
                'ComentariosEntrega': 'no',
                'LigaEntrega': laLigaEntrega + elArchivo,
                'TipoEntrega': elTipoEntregaRecurso,
                'FechaEntrega': laFechaFormateada,
                'SCORM_12': {
                    'cmi_core_lesson_status': 'incomplete',
                }
            }, onComplete);
        }
        if (elTipoEntregaActual == 3) {
            firebase.database().ref(elRefEntregado).update({
                'Entregada': true,
                'Calificada': false,
                'Revisado': false,
                'ComentariosEntrega': $('#editorRecursoEntregable').next().find('.ck-editor__editable').html(),
                'LigaEntrega': laLigaEntrega + elArchivo,
                'TipoEntrega': elTipoEntregaRecurso,
                'FechaEntrega': laFechaFormateada,
                'SCORM_12': {
                    'cmi_core_lesson_status': 'incomplete',
                }
            }, onComplete);
        }

    }
}


function cuentaMiEntrega(callback) {
    console.log('cuentaMiEntrega');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + elIdRecursoActual).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                // descripción no necesaria
                // laDescrRecursoActual = snapshot.child('Descripcion').val();
                // console.log('laDescrRecursoActual', laDescrRecursoActual);
                // descripción no necesaria
                lasInstrRecursoActual = snapshot.child('Instrucciones').val();
                // console.log('lasInstrRecursoActual', lasInstrRecursoActual);
                elTipoEntregaActual = snapshot.child('TipoDeEntrega').val();
                // console.log('elTipoEntregaActual', elTipoEntregaActual);
                // laRutaRecursoActual = snapshot.child('RutaRecursoActual').val();
                // console.log('laRutaRecursoActual', laRutaRecursoActual);


                firebase.database().ref(laUrlBase + 'Cursos/' + that['cursoId' + elNumCurso] + '/Asignacion/' + usuarioId).once('value').then(function(snapshot) {

                    arrayMisGrupos[0] = snapshot.child('Grupos').val();
                    arrayMisGrupos = arrayMisGrupos[0].split(',');
                    console.log('arrayMisGrupos', arrayMisGrupos);

                });


                firebase.database().ref(laUrlBase + 'Lecciones/').orderByKey().equalTo(usuarioId).once('value').then(function(snapshot) {
                    if (snapshot.val() != null) {
                        var contadorUsuarios = 0;
                        var contadorEntregas = 0;
                        var contadorTemas = 0;
                        var cuantosUsuarios = 0;


                        snapshot.forEach(function(childSnapshot) {
                            // console.log('childSnapshot.key ', childSnapshot.key);
                            if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val' && childSnapshot.key != '_foros') {
                                contadorUsuarios++;
                                // console.log('childSnapshot.key ', childSnapshot.key, elIdRecursoActual, contadorUsuarios);


                                // firebase.database().ref(laUrlBase + 'Usuarios/').orderByChild('Id').equalTo(usuarioId).once('value').then(function(snapshott) {

                                firebase.database().ref(laUrlBase + 'Usuarios/').orderByChild('Id').equalTo(childSnapshot.key).once('value').then(function(snapshott) {
                                    snapshott.forEach(function(childSnapshott) {
                                        cuantosUsuarios++;


                                        childSnapshot.forEach(function(childSnapshot2) {
                                            // console.log('childSnapshot2.key ', childSnapshot2.key, that['cursoId' + elNumCurso]);

                                            // el curso
                                            if (childSnapshot2.key == that['cursoId' + elNumCurso]) {

                                                // var oras = [elCursoLanzado.Id] + '/Temas/' + ['tema_' + a] + '/Recursos/' + ['recurso_' + b] + '/' + [elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id] + '/';

                                                childSnapshot2.forEach(function(childSnapshot3) {

                                                    // los temas
                                                    if (childSnapshot3.key == 'Temas') {
                                                        // contadorTemas++;
                                                        // console.log('cursooo', childSnapshot3.numChildren(), childSnapshot3.key);


                                                        childSnapshot3.forEach(function(childSnapshot4) {
                                                            // console.log('cursoooo', childSnapshot4.numChildren(), childSnapshot4.key);

                                                            childSnapshot4.forEach(function(childSnapshot5) {
                                                                // console.log('cursooooo', childSnapshot5.numChildren(), childSnapshot5.key);

                                                                // los recursos
                                                                if (childSnapshot5.key == 'Recursos') {
                                                                    // console.log('cursoooooo', childSnapshot5.numChildren(), childSnapshot5.key);


                                                                    childSnapshot5.forEach(function(childSnapshot6) {
                                                                        // console.log('cursoooooo', childSnapshot5.numChildren(), childSnapshot6.key);

                                                                        childSnapshot6.forEach(function(childSnapshot7) {
                                                                            // console.log('cursooooooo', childSnapshot6.numChildren(), childSnapshot7.key, childSnapshot7.child('Entregada').val());

                                                                            if (childSnapshot7.child('Entregada').val() == true) {
                                                                                // console.log('cursoooooooo', childSnapshot6.numChildren(), childSnapshot7.key, elIdRecursoActual);

                                                                                if (childSnapshot7.key == elIdRecursoActual) {
                                                                                    // console.log('cursooooooooo', childSnapshot6.numChildren(), childSnapshot7.key, childSnapshot.key, elIdRecursoActual);
                                                                                    contadorEntregas++;

                                                                                    this['usuIdEntrega' + contadorEntregas] = childSnapshott.child('Id').val();
                                                                                    // console.log('Id', contadorEntregas, this['usuIdEntrega' + contadorEntregas]);

                                                                                    this['usuNombreEntrega' + contadorEntregas] = childSnapshott.child('Nombre').val() + ' ' + childSnapshott.child('Apellido_Paterno').val() + ' ' + childSnapshott.child('Apellido_Materno').val();
                                                                                    // console.log('Nombre', contadorEntregas, this['usuNombreEntrega' + contadorEntregas]);

                                                                                    this['usuGrupoEntrega' + contadorEntregas] = childSnapshott.child('Grupo').val();
                                                                                    // console.log('Grupo', contadorEntregas, this['usuGrupoEntrega' + contadorEntregas]);

                                                                                    this['laTareaEntregada' + contadorEntregas] = childSnapshot7.child('Entregada').val();
                                                                                    // console.log('laTareaEntregada', contadorEntregas, this['laTareaEntregada' + contadorEntregas]);

                                                                                    this['fechaEntregada' + contadorEntregas] = childSnapshot7.child('FechaEntrega').val();
                                                                                    // console.log('fechaEntregada', contadorEntregas, this['fechaEntregada' + contadorEntregas]);

                                                                                    this['laTareaCalificada' + contadorEntregas] = childSnapshot7.child('Calificada').val();
                                                                                    // console.log('laTareaCalificada', contadorEntregas, this['laTareaCalificada' + contadorEntregas]);

                                                                                    this['laTareaCalificion' + contadorEntregas] = childSnapshot7.child('Calificacion').val();
                                                                                    // console.log('laTareaCalificion', contadorEntregas, this['laTareaCalificion' + contadorEntregas]);

                                                                                    this['laTareaRevisada' + contadorEntregas] = childSnapshot7.child('Revisado').val();
                                                                                    // console.log('laTareaRevisada', contadorEntregas, this['laTareaRevisada' + contadorEntregas]);

                                                                                    this['laTareaAprobada' + contadorEntregas] = childSnapshot7.child('Aprobada').val();
                                                                                    // console.log('laTareaAprobada', contadorEntregas, this['laTareaAprobada' + contadorEntregas]);

                                                                                    this['laTareaLiga' + contadorEntregas] = childSnapshot7.child('LigaEntrega').val();
                                                                                    // console.log('laTareaLiga', contadorEntregas, this['laTareaLiga' + contadorEntregas]);

                                                                                    this['elTipoEntrega' + contadorEntregas] = childSnapshot7.child('TipoEntrega').val();
                                                                                    // console.log('elTipoEntrega', contadorEntregas, this['elTipoEntrega' + contadorEntregas]);

                                                                                    this['elIntentoEntrega' + contadorEntregas] = childSnapshot7.child('IntentoEntrega').val();
                                                                                    // console.log('elIntentoEntrega', contadorEntregas, this['elIntentoEntrega' + contadorEntregas]);

                                                                                    this['laTareaComentarios' + contadorEntregas] = childSnapshot7.child('ComentariosEntrega').val();
                                                                                    // console.log('laTareaComentarios', contadorEntregas, this['laTareaComentarios' + contadorEntregas]);

                                                                                    this['laTareaComentariosRetro' + contadorEntregas] = childSnapshot7.child('ComentariosEntregaRetro').val();
                                                                                    // console.log('laTareaComentariosRetro', contadorEntregas, this['laTareaComentariosRetro' + contadorEntregas]);
                                                                                }

                                                                            }


                                                                        });
                                                                    });

                                                                }

                                                            });

                                                        });

                                                    }

                                                });
                                            }

                                        });

                                    });

                                    thatt = this;
                                    cuantasEntregas = contadorEntregas;
                                    callback();

                                });

                            }
                        });

                    }

                });


                console.log('lasInstrRecursoActual', lasInstrRecursoActual);

            }
        });

        return;

    }
}


function cuentaEntregas(callback) {
    console.log('cuentaEntregas');
    cargador('muestra');

    arrayMisUsuarios1 = new Array();
    arrayMisUsuarios2 = new Array();

    if (revisaConexion) {


        firebase.database().ref(laUrlBase + 'Recursos/' + elIdRecursoActual).once('value').then(function(snapshot_) {
            if (snapshot_.val() != null) {

                // descripción no necesaria
                // laDescrRecursoActual = snapshot_.child('Descripcion').val();
                // console.log('laDescrRecursoActual', laDescrRecursoActual);
                // descripción no necesaria
                lasInstrRecursoActual = snapshot_.child('Instrucciones').val();
                // console.log('lasInstrRecursoActual', lasInstrRecursoActual);
                elTipoEntregaActual = snapshot_.child('TipoDeEntrega').val();
                // console.log('elTipoEntregaActual', elTipoEntregaActual);
                // laRutaRecursoActual = snapshot_.child('RutaRecursoActual').val();
                // console.log('laRutaRecursoActual', laRutaRecursoActual);

                console.log('lasInstrRecursoActual', lasInstrRecursoActual);

            }
        });



        var contadorEntregas = 0;
        var contadorUsuarios = 0;

        // var contadorUsuarios2 = 0;
        // var contadorGrupos = 0;
        // firebase.database().ref(laUrlBase + 'Cursos/' + that['cursoId' + elNumCurso] + '/Asignacion/' + usuarioId).once('value').then(function(snapshot) {
        //     if (snapshot.val() != null) {
        //         console.log('Asignacion snapshot.val()', snapshot.val());

        //         //  busco mi perfil en CUrsos y busco qué grupos superviso

        //         arrayMisUsuarios.push(snapshot.child('Id').val());
        //         console.log('arrayMisUsuarios', arrayMisUsuarios);

        //     }
        // });


        firebase.database().ref(laUrlBase + 'Cursos/' + that['cursoId' + elNumCurso] + '/Asignacion/' + usuarioId).once('value').then(function(snapshot) {


            arrayMisGrupos[0] = snapshot.child('Grupos').val();
            arrayMisGrupos = arrayMisGrupos[0].split(',');
            console.log('arrayMisGrupos', arrayMisGrupos);

            // contadorUsuarios2++;

            // console.log('arrayMisGrupos2', arrayMisGrupos.length, arrayMisGrupos);

            for (a = 0; a < arrayMisGrupos.length; a++) {
                firebase.database().ref(laUrlBase + 'Usuarios/').orderByChild('Grupo').equalTo(arrayMisGrupos[a]).once('value').then(function(snapshott) {
                    snapshott.forEach(function(childSnapshott) {
                        // if (childSnapshott.val() != null) {

                        // firebase.database().ref(laUrlBase + 'Lecciones/').orderByKey().equalTo(childSnapshott.child('Id').val()).once('value').then(function(snapshot_) {
                        //     if (childSnapshott.val() != null) {
                        //         contadorUsuarios++;

                        //     }
                        // });

                        contadorUsuarios++;
                        // contadorEntregas++;

                        this['usuIdEntrega' + contadorUsuarios] = childSnapshott.child('Id').val();
                        console.log('usuIdEntrega', contadorUsuarios, this['usuIdEntrega' + contadorUsuarios]);

                        this['usuNombreEntrega' + contadorUsuarios] = childSnapshott.child('Nombre').val() + ' ' + childSnapshott.child('Apellido_Paterno').val() + ' ' + childSnapshott.child('Apellido_Materno').val();
                        console.log('usuNombreEntrega', contadorUsuarios, this['usuNombreEntrega' + contadorUsuarios]);

                        this['usuGrupoEntrega' + contadorUsuarios] = childSnapshott.child('Grupo').val();
                        console.log('usuGrupoEntrega', contadorUsuarios, this['usuGrupoEntrega' + contadorUsuarios]);


                        // if (this['usuIdEntrega' + contadorUsuarios] != null && thattt['fechaEntregada' + contadorEntregas] != 'sin_entrega') {
                        // arrayMisUsuarios1.push({
                        //     'usuIdEntrega': this['usuIdEntrega' + contadorUsuarios],
                        //     'usuNombreEntrega': this['usuNombreEntrega' + contadorUsuarios],
                        //     'usuGrupoEntrega': this['usuGrupoEntrega' + contadorUsuarios]
                        // });
                        // }


                        thattt = this;
                        return cuentaDatos2();



                        // }
                    });

                });

            }



            function cuentaDatos2() {
                console.log('aaa', contadorUsuarios, thattt['usuIdEntrega' + contadorUsuarios]);

                firebase.database().ref(laUrlBase + 'Lecciones/' + thattt['usuIdEntrega' + contadorUsuarios] + '/' + laRutaRecursoActual).once('value').then(function(snapshot_) {
                    // if (snapshot_.val() != null) {

                    // if (snapshot_.child('Entregada').val() == true) {
                    console.log('snapshot_ ', snapshot_.val(), snapshot_.key);
                    contadorEntregas++;

                    this['laTareaEntregada' + contadorEntregas] = snapshot_.child('Entregada').val();
                    // console.log('laTareaEntregada', contadorEntregas, this['laTareaEntregada' + contadorEntregas]);

                    this['fechaEntregada' + contadorEntregas] = snapshot_.child('FechaEntrega').val();
                    // console.log('fechaEntregada', contadorEntregas, this['fechaEntregada' + contadorEntregas]);

                    this['laTareaCalificada' + contadorEntregas] = snapshot_.child('Calificada').val();
                    // console.log('laTareaCalificada', contadorEntregas, this['laTareaCalificada' + contadorEntregas]);

                    this['laTareaCalificion' + contadorEntregas] = snapshot_.child('Calificacion').val();
                    // console.log('laTareaCalificion', contadorEntregas, this['laTareaCalificion' + contadorEntregas]);

                    this['laTareaRevisada' + contadorEntregas] = snapshot_.child('Revisado').val();
                    // console.log('laTareaRevisada', contadorEntregas, this['laTareaRevisada' + contadorEntregas]);

                    this['laTareaAprobada' + contadorEntregas] = snapshot_.child('Aprobada').val();
                    // console.log('laTareaAprobada', contadorEntregas, this['laTareaAprobada' + contadorEntregas]);

                    this['laTareaLiga' + contadorEntregas] = snapshot_.child('LigaEntrega').val();
                    // console.log('laTareaLiga', contadorEntregas, this['laTareaLiga' + contadorEntregas]);

                    this['elTipoEntrega' + contadorEntregas] = snapshot_.child('TipoEntrega').val();
                    // console.log('elTipoEntrega', contadorEntregas, this['elTipoEntrega' + contadorEntregas]);

                    this['elIntentoEntrega' + contadorEntregas] = snapshot_.child('IntentoEntrega').val();
                    // console.log('elIntentoEntrega', contadorEntregas, this['elIntentoEntrega' + contadorEntregas]);

                    this['laTareaComentarios' + contadorEntregas] = snapshot_.child('ComentariosEntrega').val();
                    // console.log('laTareaComentarios', contadorEntregas, this['laTareaComentarios' + contadorEntregas]);

                    this['laTareaComentariosRetro' + contadorEntregas] = snapshot_.child('ComentariosEntregaRetro').val();
                    // console.log('laTareaComentariosRetro', contadorEntregas, this['laTareaComentariosRetro' + contadorEntregas]);



                    arrayMisUsuarios1.push({
                        'usuIdEntrega': thattt['usuIdEntrega' + contadorEntregas],
                        'usuNombreEntrega': thattt['usuNombreEntrega' + contadorEntregas],
                        'usuGrupoEntrega': thattt['usuGrupoEntrega' + contadorEntregas]
                    });


                    arrayMisUsuarios2.push({
                        'laTareaEntregada': this['laTareaEntregada' + contadorEntregas],
                        'fechaEntregada': this['fechaEntregada' + contadorEntregas],
                        'laTareaCalificada': this['laTareaCalificada' + contadorEntregas],
                        'laTareaCalificion': this['laTareaCalificion' + contadorEntregas],
                        'laTareaRevisada': this['laTareaRevisada' + contadorEntregas],
                        'laTareaAprobada': this['laTareaAprobada' + contadorEntregas],
                        'laTareaLiga': this['laTareaLiga' + contadorEntregas],
                        'elTipoEntrega': this['elTipoEntrega' + contadorEntregas],
                        'elIntentoEntrega': this['elIntentoEntrega' + contadorEntregas],
                        'laTareaComentarios': this['laTareaComentarios' + contadorEntregas],
                        'laTareaComentariosRetro': this['laTareaComentariosRetro' + contadorEntregas]
                    });

                    // arrayMisUsuarios2.sort(function(a, b) {
                    //     var a1 = a.fechaEntregada,
                    //         b1 = b.fechaEntregada;
                    //     if (a1 == b1) return 0;
                    //     return a1 > b1 ? 1 : -1;
                    // });
                    // arrayMisUsuarios2.reverse();

                    thatt = this;
                    cuantasEntregas = contadorEntregas;

                    console.log('arrayMisUsuarios1', arrayMisUsuarios1);
                    console.log('arrayMisUsuarios2', arrayMisUsuarios2);

                    callback();


                });

            }

        });


        return;

    }
}


// function comparaGrupos() {

//     console.log('comparaGrupos', that['cursoId' + elNumCurso]);

//     if (revisaConexion) {
//         firebase.database().ref(laUrlBase + 'Cursos/' + that['cursoId' + elNumCurso] + '/Asignacion/' + usuarioId).once('value').then(function(snapshot) {

//             arrayMisGrupos[0] = snapshot.child('Grupos').val();
//             arrayMisGrupos = arrayMisGrupos[0].split(',');
//             console.log('arrayMisGrupos', arrayMisGrupos);

//         });

//         return $.ajax();

//     }
// }




function subirComentario() {
    console.log("subirComentario");

    $('#modalSubirComentario').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarSubirComentario').on('click', '#botonCancelarSubirComentario', function(e) {});
    $(document).off('click', '#botonAceptarSubirComentario').on('click', '#botonAceptarSubirComentario', function(e) {
        subirComentarioBD();
    });

};


function subirComentarioBD() {
    console.log('guardaComentarioBD: ', that['cursoId' + elNumCurso], elIdRecursoActual);

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');

            cargaContent();
        }
    };

    if (revisaConexion) {

        var nuevoId = generarId();
        var elRefEntregado = laUrlBase + 'Lecciones/' + '_foros/' + that['cursoId' + elNumCurso] + '/' + elIdRecursoActual + '/' + nuevoId;
        console.log('elRefEntregado: ', elRefEntregado);

        firebase.database().ref(elRefEntregado).update({
            'UsuarioId': usuarioId,
            'Comentario': $('#editorRecursoComentario').next().find('.ck-editor__editable').html(),
            'UsuarioNombre': elPerfilNombre
        }, onComplete);

    }
}


function cuentaForos(callback) {
    console.log('cuentaForos');

    // TODO cuentaForos
    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + elIdRecursoActual).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                // descripción no necesaria
                //  laDescrRecursoActual = snapshot.child('Descripcion').val();
                // console.log('laDescrRecursoActual', laDescrRecursoActual);
                // descripción no necesaria
                lasInstrRecursoActual = snapshot.child('Instrucciones').val();
                console.log('lasInstrRecursoActual', lasInstrRecursoActual);

                firebase.database().ref(laUrlBase + 'Lecciones/').once('value').then(function(snapshott) {
                    if (snapshot.val() != null) {

                        snapshott.forEach(function(childSnapshott) {
                            console.log('childSnapshott.key', childSnapshott.key);

                            if (childSnapshott.key == '_foros') {
                                childSnapshott.forEach(function(childSnapshott2) {

                                    if (childSnapshott2.key == that['cursoId' + elNumCurso]) {
                                        console.log('childSnapshott2.key', childSnapshott2.key, that['cursoId' + elNumCurso], elIdRecursoActual);

                                        childSnapshott2.forEach(function(childSnapshott3) {
                                            if (childSnapshott3.key == elIdRecursoActual) {
                                                var contadorComentarios = 0;
                                                var contadorUsuarios = 0;

                                                console.log('childSnapshott3.key', childSnapshott3.numChildren(), childSnapshott3.key, childSnapshott3.val());

                                                childSnapshott3.forEach(function(childSnapshott4) {
                                                    contadorComentarios++;

                                                    // console.log('childSnapshott4.key', contadorComentarios, childSnapshott4.val());


                                                    this['usuIdComentario' + contadorComentarios] = childSnapshott4.child('UsuarioId').val();
                                                    console.log('usuIdComentario', contadorComentarios, this['usuIdComentario' + contadorComentarios]);

                                                    this['usuNombreComentario' + contadorComentarios] = childSnapshott4.child('UsuarioNombre').val();
                                                    console.log('usuNombreComentario', contadorComentarios, this['usuNombreComentario' + contadorComentarios]);

                                                    this['usuComentario' + contadorComentarios] = childSnapshott4.child('Comentario').val();
                                                    console.log('usuComentario', contadorComentarios, this['usuComentario' + contadorComentarios]);




                                                    // firebase.database().ref(laUrlBase + 'Usuarios/').orderByChild('Id').equalTo(this['usuIdComentario' + contadorComentarios]).once('value').then(function(snapshottt) {
                                                    //     console.log('snapshottt.val', contadorUsuarios, contadorComentarios, snapshottt.val());

                                                    //     snapshottt.forEach(function(childSnapshottt) {
                                                    //         contadorUsuarios++;

                                                    //         console.log('childSnapshottt.key', contadorUsuarios, contadorComentarios, childSnapshottt.key);

                                                    //         this['usuNombreComentario' + contadorUsuarios] = childSnapshottt.child('Nombre').val() + ' ' + childSnapshottt.child('Apellido_Paterno').val() + ' ' + childSnapshottt.child('Apellido_Materno').val();
                                                    //         console.log('usuNombreComentario', contadorUsuarios, this['usuNombreComentario' + contadorUsuarios]);



                                                    thet = this;
                                                    cuantosComentarios = contadorComentarios;
                                                    callback();


                                                    //     });
                                                    // });
                                                });
                                            }
                                        });
                                    }


                                });
                            }
                        });

                    }

                });

            }
        });


        return true;
    }
}


function lanzamodalCalificarEntrega(cualContenido) {
    console.log('lanzamodalCalificarEntrega', cualContenido);

    $("#modalCalificarEntrega_body").empty();
    var elContenido = '';


    elContenido += '<br> <br>';
    elContenido += '<div class="row">';
    elContenido += '<div class="col-11" style="margin: 0 auto;">';
    elContenido += '<div class="titulo_label">';
    // descripción no necesaria
    // elContenido += '   <h6 class="input_label">' + that['recursoDesc' + cualContenido] + '</h6>';
    // elContenido += '   <h6 class="input_label">' + laDescrRecursoActual + '</h6>';
    // descripción no necesaria
    // elContenido += '<br>';
    // elContenido += '   <p class="texto">' + that['recursoInstr' + cualContenido] + '</p>';
    // elContenido += '<div class="divisor">';
    elContenido += '   <div class="texto texto_back">' + lasInstrRecursoActual + '</div>';
    // elContenido += '<div class="divisor">';
    elContenido += '<br> <br>';

    for (a = 0; a < arrayMisUsuarios1.length; a++) {
        // console.log('aaaaaaaaaaaaa', a, elNumRecurso, thatt['usuIdEntrega' + a], usuarioId, thatt['laTareaLiga' + a]);
        if ((a + 1) == cualContenido) {

            var usuarioACalifId = thatt['usuIdEntrega' + (a + 1)];


            // elContenido += '<div class="row">';
            if (elTipoEntregaActual == 1 || elTipoEntregaActual == 3) {
                // elContenido += '<div class="col-md-8">';
                elContenido += '<p class="texto">Comentarios del Participante:</p>';
                elContenido += '<div class="areaComentarios">' + thatt['laTareaComentarios' + (a + 1)] + '</div>';
                // elContenido += '</div>';
            }
            if (elTipoEntregaActual == 2 || elTipoEntregaActual == 3) {
                // elContenido += '<div class="col-md-4">';
                elContenido += '<br>';
                elContenido += '<button id="botonVerEntregable' + (a + 1) + '" class="btn btn-azul btn-round ml-auto botonVerEntregable">Ver tarea</button>';
                // elContenido += '</div>';
            }
            // elContenido += '</div>';
            // elContenido += '<div class="titulo_label">';
            elContenido += '<br> <br>';

            console.log('ok', (a + 1), elNumRecurso, thatt['usuIdEntrega' + (a + 1)], usuarioId, thatt['laTareaLiga' + (a + 1)]);
            var verEditor = true;

            if (thatt['laTareaRevisada' + (a + 1)] == false) {
                elContenido += '<h6 class="input_label">Retroalimentación al Participante:</h6>';
                elContenido += '<span id="texto_error_retroEntregable" class="texto_error"></span>';
                elContenido += '<textarea id="editorRetroEntregable" name="contentt" class="area_editor"></textarea>';
                elContenido += '</div>';
                elContenido += '<br> <br>';

                elContenido += '<div class="col-12 text-right">';
                // elContenido += '    <span id="texto_error_Curso" class="texto_error"></span>';
                // elContenido += '    <button id="botonCancelarCalificarEntregable" class="btn btn-gris btn-round ml-auto">Cerrar</button>';
                elContenido += '    <button id="botonRechazarEntregable" class="btn btn-naranja btn-round ml-auto" disabled="disabled"><i class="nc-icon-outline ui-1_simple-remove" style="padding-right: 10px;"></i> <b>No Aprobada</b></button>';
                elContenido += '    <button id="botonCalificarEntregable" class="btn btn-verde2 btn-round ml-auto" disabled="disabled"><i class="nc-icon-outline ui-1_check" style="padding-right: 10px;"></i> <b>Aprobada</b></button>';
                elContenido += '</div>';
            } else {
                // if (thatt['laTareaAprobada' + a] == true) {
                elContenido += '<p class="texto">Retroalimentación al Participante:</p>';
                elContenido += '<div class="areaComentarios" style="background-color: #ece9ff !important;">' + thatt['laTareaComentariosRetro' + (a + 1)] + '</div>';
                elContenido += '<br><div class="areaRevisada mb-5">La tarea ha sido revisada y calificada con <b>' + thatt['laTareaCalificion' + (a + 1)] + '</b>.';
                elContenido += '</div>';
                verEditor = false;
                // } else {
                // }
            }

            elContenido += '<div class="col-12 text-right">';
            elContenido += '    <button id="botonEliminarEntrega" class="btn btn-fsm btn-rojo btn-round ml-auto"><i class="nc-icon-outline ui-1_trash-simple" style="padding-right: 10px;"></i> <b>Eliminar Entrega</b></button>';
            elContenido += '</div>';

        }
    }

    elContenido += '</div>';
    elContenido += '</div>';


    $("#modalCalificarEntrega_body").html(elContenido);


    for (a = 0; a < arrayMisUsuarios1.length; a++) {
        $('#botonVerEntregable' + (a + 1)).data('ligaEntrega_', thatt['laTareaLiga' + (a + 1)]);
        // console.log('sssssssssss', $('#botonVerEntregable' + a).data('ligaEntrega_'));
    }

    if (verEditor) {
        ClassicEditor.create(document.querySelector('#editorRetroEntregable'), {
            toolbar: [
                'undo',
                'redo',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
            ],
            link: {
                addTargetToExternalLinks: true
            }
        }).then(editorRetroEntregable => {

            $('#editorRetroEntregable').next().find('.ck-editor__editable').keyup(function(e) {
                // var keyCode = e.which;
                // console.log('keyCode', e.which);

                var editorLength;
                if ($('#editorRetroEntregable').next().find('.ck-editor__editable').html() == '<p><br data-cke-filler="true"></p>') {
                    editorLength = 0;
                } else {
                    editorLength = $('#editorRetroEntregable').next().find('.ck-editor__editable').html().length;
                }
                if (editorLength >= editorRetroEntregableMinimo) {
                    $('#texto_error_retroEntregable').css({
                        'color': '#58bd2a'
                    });
                    $('#botonRechazarEntregable').prop('disabled', false);
                    $('#botonCalificarEntregable').prop('disabled', false);
                    editorRetroEntregableLength = true;
                } else {
                    $('#texto_error_retroEntregable').css({
                        'color': '#f5593d'
                    });
                    $('#botonRechazarEntregable').prop('disabled', 'disabled');
                    $('#botonCalificarEntregable').prop('disabled', 'disabled');
                }
                // console.log('editorRetroEntregable', editorLength);
                $('#texto_error_retroEntregable').html(editorLength + ' de ' + editorRetroEntregableMinimo + ' caracteres mínimos.');

            });
        }).catch(error => {
            console.error(error);
        });
    }

    $(document).off('click', '#botonRechazarEntregable').on('click', '#botonRechazarEntregable', function(event) {
        event.preventDefault();
        calificarEntregable(usuarioACalifId, false, 'no', 0);
    });
    $(document).off('click', '#botonCalificarEntregable').on('click', '#botonCalificarEntregable', function(event) {
        event.preventDefault();

        var laCal = 0;
        // TODO actualizar CalifAutomatica?
        var laCalAuto = that['curso' + elNumCurso + 'Tema' + elNumTema + 'RecursoCalifAuto' + elNumRecurso];
        // var laCalAuto = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('califautorec');
        console.log('laCalAuto', laCalAuto);

        if (laCalAuto == 'no') {
            Swal.fire({
                title: "Asignar calificación",
                // type: "question",
                showCancelButton: false,
                // showconfirmButton: false,
                html: 'Esta tarea requiere una calificación.<br>Desliza el indicador para asignarla.<br>La tarea se calificará con base en la máxima calificación previamente configurada.<br><br> <div class="calif_asig_range"><h6 class="califAsig">100</h6><input type="range" min="0" max="100" value="100" step="any" /></div> <br><br> <div class="actions text-center"><div id="botonCancelarCalifAuto" class="btn btn-naranja cancel btn-round" style="margin-right: 20px;">Cancelar<i class="nc-icon-outline ui-1_simple-remove" style="padding-left: 5px;"></i></div><div id="botonAceptarCalifAuto" class="btn btn-verde2 ok btn-round">Aceptar<i class="nc-icon-outline ui-1_check" style="padding-left: 5px;"></i></div></div>'
            });

            laCal = 100;
            const rangeInputs = document.querySelectorAll('input[type="range"]');

            function inputChange(e) {
                var target = e.target;
                var val = Math.round(target.value);
                laCal = val;

                $(this).prev().html(Math.round(target.value));
                $(this).css({
                    'background-size': target.value + '% 100%'
                });
            }
            rangeInputs.forEach(input => {
                input.addEventListener('input', inputChange);
            });

            $(document).off('click', '#botonCancelarCalifAuto').on('click', '#botonCancelarCalifAuto', function(event) {
                event.preventDefault();
                swal.close();
            });
            $(document).off('click', '#botonAceptarCalifAuto').on('click', '#botonAceptarCalifAuto', function(event) {
                event.preventDefault();
                calificarEntregable(usuarioACalifId, true, laCalAuto, laCal);
            });

        } else {
            event.preventDefault();
            laCal = that['curso' + elNumCurso + 'Tema' + elNumTema + 'RecursoPuntosObtener' + elNumRecurso];
            calificarEntregable(usuarioACalifId, true, laCalAuto, laCal);
        }

    });

    $(document).off('click', '#botonCancelarCalificarEntregable').on('click', '#botonCancelarCalificarEntregable', function(event) {
        event.preventDefault();
        $("#modalCalificarEntrega .close").click();
    });

    $(document).off('click', '.botonVerEntregable').on('click', '.botonVerEntregable', function(event) {
        event.preventDefault();
        var laLiga_ = $(this).data('ligaEntrega_');
        verEntrega(laLiga_);
    });

    $(document).off('click', '#botonEliminarEntrega').on('click', '#botonEliminarEntrega', function(event) {
        event.preventDefault();
        Swal.fire({
            title: "Eliminar entrega",
            type: "question",
            showCancelButton: false,
            // showconfirmButton: false,
            html: 'Esto eliminará la entrega del participante.<br>Estás seguro? <br><br> <div class="actions text-center"><div id="botonCancelarEliminarEntrega" class="btn btn-naranja cancel btn-round" style="margin-right: 20px;">Cancelar<i class="nc-icon-outline ui-1_simple-remove" style="padding-left: 5px;"></i></div><div id="botonAceptarEliminarEntrega" class="btn btn-verde2 ok btn-round">Aceptar<i class="nc-icon-outline ui-1_check" style="padding-left: 5px;"></i></div></div>'
        });

        $(document).off('click', '#botonCancelarEliminarEntrega').on('click', '#botonCancelarEliminarEntrega', function(event) {
            event.preventDefault();
            swal.close();
        });
        $(document).off('click', '#botonAceptarEliminarEntrega').on('click', '#botonAceptarEliminarEntrega', function(event) {
            event.preventDefault();
            eliminarEntregable(true, usuarioACalifId);
        });
    });

    ///////////////////////
    ajustaEscalaModalEntrega();
    setTimeout(function() {
        detectaModalEntrega();
    }, 300);

}

function verEntrega(cualEntrega) {
    console.log("verEntrega", cualEntrega);

    window.open(cualEntrega, '_blank');
}

function calificarEntregable(usuarioACalifId, aprobado, califAuto, cualCalif) {
    console.log("calificarEntregable", usuarioACalifId, aprobado, califAuto, cualCalif);

    $('#modalCalificarEntregable').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarCalificarEntregable').on('click', '#botonCancelarCalificarEntregable', function(e) {});
    $(document).off('click', '#botonAceptarCalificarEntregable').on('click', '#botonAceptarCalificarEntregable', function(e) {
        if (editorRetroEntregableLength == true) {
            $('#texto_error_retroEntregable').html('');
            calificarEntregableOK(usuarioACalifId, aprobado, califAuto, cualCalif);
        }
        // console.log($('#editorRetroEntregable').next().find('.ck-editor__editable').html());
    });

};

function calificarEntregableOK(usuarioACalifId, aprobado, califAuto, cualCalif) {
    console.log('calificarEntregableOK', aprobado, califAuto, cualCalif);
    cargador('muestra');

    function cuentaCalifsUsuario(cualUsuario) {
        console.log('cuentaCalifsUsuario', cualUsuario, aprobado, califAuto, cualCalif);

        var elRefDatos = laUrlBase + 'Lecciones/' + cualUsuario + '/' + that['cursoId' + elNumCurso];
        console.log('elRefDatos: ', elRefDatos);

        firebase.database().ref(elRefDatos).once('value').then(function(snapshot) {
            console.log('snapshot.val()', snapshot.val());

            elCursoTemas = snapshot.val();
            laCalificacionTotal = 0;
            if (cualCalif == 'no') {
                cualCalif = 100;
            }

            var laCalifRecurso;
            if (califAuto == 'no') {
                laCalifRecurso = (((that['curso' + elNumCurso + 'Tema' + elNumTema + 'RecursoPuntosObtener' + elNumRecurso] / 100) * cualCalif));
            } else {
                laCalifRecurso = (that['curso' + elNumCurso + 'Tema' + elNumTema + 'RecursoPuntosObtener' + elNumRecurso]);
            }

            for (a = 1; a <= cuantosTemas; a++) {
                for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {
                    var califRec = Object.values(elCursoTemas.Temas['tema_' + a].Recursos['recurso_' + b])[0].Calificacion;
                    califRec = parseInt(Math.round(califRec));
                    console.log("califRec", califRec);
                    laCalificacionTotal += califRec;
                    console.log('laCalificacionTotal', laCalificacionTotal);
                }
            }
            laCalificacionTotal -= Object.values(elCursoTemas.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso])[0].Calificacion;
            console.log('laCalificacionTotal2', laCalifRecurso, laCalificacionTotal);
            laCalificacionTotal += laCalifRecurso;
            console.log('laCalificacionTotal3', laCalifRecurso, laCalificacionTotal);

            calificarEntregableBD(usuarioACalifId, aprobado, laCalifRecurso);
        });

    }
    cuentaCalifsUsuario(usuarioACalifId);

}

function calificarEntregableBD(usuarioACalifId, aprobado, laCalifRecurso) {

    // var laCalifBD = $('#calificacionRecurso').val();
    var losComentsBD = $('#editorRetroEntregable').next().find('.ck-editor__editable').html();
    console.log('guardaEntregadoBD:', losComentsBD, aprobado, laCalifRecurso);

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
            updateCalificacionTotalPinta(usuarioACalifId, laCalificacionTotal);
            swal.close();
            $("#modalCalificarEntrega .close").click();
            pintaTemas();
            cargaContent();
            cargador('oculta');
        }
    };

    if (revisaConexion) {

        var elRefEntregado = laUrlBase + 'Lecciones/' + usuarioACalifId + '/' + laRutaRecursoActual;
        console.log('elRefEntregado: ', elRefEntregado);

        // TODO leer y agregar intento
        var pasado;
        var numIntento = 1;

        if (aprobado == true) {
            pasado = 'passed';
        } else {
            pasado = 'incomplete';
        }

        firebase.database().ref(elRefEntregado).update({
            'Calificada': true,
            'Aprobada': aprobado,
            'ComentariosEntregaRetro': losComentsBD,
            'IntentoEntrega': numIntento,
            'Calificacion': laCalifRecurso,
            'Revisado': true,
            'FechaEntrega': laFechaFormateada,
            'SCORM_12': {
                'cmi_core_lesson_status': pasado,
            }
        }, onComplete);

    }
}

function eliminarEntregable(esAdmin, cualUsuario) {

    if (cualUsuario != false) {
        usuarioId = cualUsuario;
    }
    console.log('eliminarEntregable', esAdmin, usuarioId);

    IdCurso = [elCursoLanzado.Id];
    IdRec = [elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Id];

    var formData = new FormData();
    formData.append("curso", IdCurso);
    formData.append("usuario", usuarioId);
    formData.append("recurso", IdRec);
    formData.append("eliminaAnterior", eliminaEntregaAnterior);

    $.ajax({
        url: "php/entregable_delete.php",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {

            console.log("La Entrega se ha eliminado correctamente");
            eliminarEntregableBD();

            return data;
        },
        error: function() {
            console.log('Error occured');
            cargador('oculta');
        }
    });

    function eliminarEntregableBD() {

        var onComplete = function(error) {
            if (error) {
                console.log('Ocurrió un error en la sincronización.');
            } else {
                console.log('Sincronización realizada.');
                updateCalificacionTotalPinta(usuarioId, laCalificacionTotal);
                swal.close();
                if (esAdmin) {
                    $("#modalCalificarEntrega .close").click();
                }
                pintaTemas();
                cargaContent();
                cargador('oculta');
            }
        };

        if (revisaConexion) {

            var elRefEliminado = laUrlBase + 'Lecciones/' + usuarioId + '/' + laRutaRecursoActual;
            console.log('elRefEliminado: ', elRefEliminado);

            firebase.database().ref(elRefEliminado).update({
                'Activo': true,
                'Calificacion': 0,
                'Revisado': false,
                'Aprobada': false,
                'Duracion': "",
                'Fecha_fin': "",
                'Entregada': false,
                'Calificada': false,
                'LigaEntrega': false,
                'ComentariosEntrega': false,
                'ComentariosEntregaRetro': false,
                'IntentoEntrega': 0,
                'FechaEntrega': 'sin_entrega',
                SCORM_12: {
                    'cmi_core_lesson_status': 'not attempted',
                    'cmi_core_session_time': '00:00:00',
                    'cmi_suspend_data': '',
                    'cmi_core_lesson_location': '',
                    'cmi_core_score_min': '0',
                    'cmi_core_score_raw': '0',
                    'cmi_core_exit': 'suspend'
                }
            }, onComplete);

        }
    }

}

function ajustaEscalaModalEntrega() {

    elAncho = $(window).width();
    elAlto = $(window).height();
    // console.log('elAncho', elAncho, 'y elAlto', elAlto);

    // if (elContenidoLanzado == true) {
    $("#modalCalificarEntregaContent").css({
        'height': (elAlto - 50) + 'px',
        'width': (elAncho - 50) + 'px'
    });
    $("#modalCalificarEntregaDialog").css({
        'margin-left': '30px'
    });
    // } 

}

function cierraContenidoRecurso() {

    $('#modalCalificarEntrega').on('hide.bs.modal', function() {
        $("#modalCalificarEntrega_body").empty();
    });

}

function detectaModalEntrega() {

    $('#modalCalificarEntrega').on('hide.bs.modal', function() {
        $("#modalCalificarEntrega_body").empty();
    });

}



function cierraContenido() {
    console.log('cierraContenido!');

    // registraRevisado();
    elContenidoLanzado = false;
    registraUltimaConexionRecurso();

    conTemario = true;

    // habilitaBoton($('#botonPerfil'), true);
    $('#botonPerfil').css({
        'display': 'block'
    });
    $("#content").empty();
    $('#barra_player, .sidebar_curso').hide();
    $('.main-panel').removeClass('main-panel_100');
    $('.panel-header, .sidebar_main, .navbar-toggler').show();
    $('.panel-header').css({
        'width': '100%'
    });
    $('#botonOcultarTemas').css({
        'display': 'none'
    });
    $('.navbar').show();
    ajustaEscalaContenido(conTemario);

    navega('cursos');
}



function detectaUnload() {
    if (elContenidoLanzado == true) {
        $("#content").bind('DOMNodeRemoved', function(event) {
            console.log('unload!');

            // setTimeout(function() {
            if (elPerfil === 'Observador') {
                eliminaRegistroUsuario();
            }
            if (elContenidoLanzado == true) {
                registraUltimaConexionRecurso();
            }
            // }, 1000);

            // registraRevisado();
            // elContenidoLanzado = false;
            // // habilitaBoton($('#botonPerfil'), true);
            // $('#botonPerfil').css({
            //     'display': 'block'
            // });
            // $('#barra_player').hide();
            // $('.panel-header').show();
            // $('.navbar').show();
            // ajustaEscalaContenido();
            // $("#content").unbind();
        });
    }

    return $.ajax();
}


function ajustaEscalaContenido(conTemario) {
    console.log('ajustaEscalaContenido', conTemario);

    var elAlto = $(window).height();
    var elAncho = $(window).width();
    var elAnchoTemario;

    if (conTemario) {
        elAnchoTemario = anchoTemario;
    } else {
        elAnchoTemario = 0;
    }

    console.log('elAncho', elAncho, elContenidoLanzado, conTemario, elAnchoTemario);

    // if (elAncho < 991) {
    //     conTemario = false;
    // } else {
    //     conTemario = true;
    // }

    if (elContenidoLanzado == true) {
        $("#contenido").css({
            'padding': '0px',
            'margin-top': '50px'
        });
        $(".sidebar-wrapper").css({
            'height': '100vh'
        });
        $('#botonOcultarSidebar').hide();

        if (elAncho >= 991) {
            $("#content").css({
                'height': (elAlto - 50) + 'px',
                'width': (elAncho - elAnchoTemario) + 'px',
                'margin-left': elAnchoTemario + 'px',
                'background-color': '#ffffff',
                'overflow-y': 'auto',
                'overflow-x': 'hidden'
            });
            $(".barra_player").css({
                'width': (elAncho - elAnchoTemario) + 'px',
                'margin-left': elAnchoTemario + 'px'
            });

            $(".sidebar_curso").css({
                'margin-left': '0px'
            });

        } else {
            if (conTemario) {
                $("#content").css({
                    'height': (elAlto - 50) + 'px',
                    'width': (elAncho - elAnchoTemario) + 'px',
                    'margin-left': elAnchoTemario + 'px',
                    'background-color': '#ffffff',
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden'
                });
                $(".barra_player").css({
                    'width': (elAncho - elAnchoTemario) + 'px',
                    'margin-left': elAnchoTemario + 'px'
                });
            } else {
                $("#content").css({
                    'height': (elAlto - 50) + 'px',
                    'width': elAncho + 'px',
                    'margin-left': '0px',
                    'background-color': '#ffffff',
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden'
                });
                $(".barra_player").css({
                    'width': elAncho + 'px',
                    'margin-left': '0px'
                });
            }
            $(".sidebar_curso").css({
                'margin-left': (elAnchoTemario + 20) + 'px'
            });

            $(".sidebar-wrapper").css({
                'height': '100vh'
            });

        }
    } else {
        if (elAncho >= 991) {
            $("#content").css({
                'height': '0px',
                'width': (elAncho - anchoTemario - 60) + 'px',
                'margin-left': 0 + 'px',
                'background-color': '#ffffff',
                'overflow-y': 'visible',
                'overflow-x': 'visible'
            });
            $("#contenido").css({
                'padding': '30px',
                'margin-top': '0px'
            });
        } else {
            $("#content").css({
                'height': '0px',
                'width': (elAncho - 60) + 'px',
                'margin-left': 0 + 'px',
                'background-color': '#ffffff',
                'overflow-y': 'visible',
                'overflow-x': 'visible'
            });
            $("#contenido").css({
                'padding': '30px',
                'margin-top': '0px'
            });
            $('#botonOcultarSidebar').show();
        }
    }

    return $.ajax();
}



function registraRevisado() {
    // console.log('registraRevisado', $("#elVideo")[0].currentTime);

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
            registraIniciado();
        }
    };

    if (revisaConexion) {

        var elRefRevisado = laUrlBase + 'Lecciones/' + usuarioId + '/' + that['cursoId' + elNumCurso] + '/' + that['recursoId' + elNumCurso];
        console.log('elRefRevisado: ', elRefRevisado);

        firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
            console.log('snapshot.val()', snapshot.val());

            if (snapshot.val() != null) {

                // var elRevisado = snapshot.child('Revisado').val();
                // console.log('elRevisado', elRevisado);
                var laFechaHoy = obtenerFecha();
                console.log('laFechaHoy', laFechaHoy);
                var laFecha_ini = snapshot.child('Fecha_inicio').val();
                console.log('laFecha_ini', laFecha_ini);
                var laDuracion = obtenerDuracion(laFecha_ini);
                console.log('laDuracion', laDuracion);

                firebase.database().ref(elRefRevisado).update({
                    'Activo': false,
                    'Revisado': true,
                    'Duracion': laDuracion,
                    'Fecha_fin': laFechaHoy
                }, onComplete);

            }
        });
    }
}



function registraCalificacion(cualCalificacion) {
    console.log('registraCalificacion: ', cualCalificacion);

    var rutaRec = [elCursoLanzado.Id] + '/Temas/' + ['tema_' + elNumTema] + '/Recursos/' + ['recurso_' + elNumRecurso] + '/' + [elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Id] + '/';
    var elRefCalificacion = laUrlBase + 'Lecciones/' + usuarioId + '/' + rutaRec;
    console.log('elRefCalificacion: ', elRefCalificacion);

    var laCalifRecurso = (((that['curso' + elNumCurso + 'Tema' + elNumTema + 'RecursoPuntosObtener' + elNumRecurso] / 100) * cualCalificacion));

    if (revisaConexion) {
        firebase.database().ref(elRefCalificacion).once('value').then(function(snapshot) {

            var onComplete = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                }
            };

            var updates = {};
            updates[elRefCalificacion + '/' + 'Calificacion'] = laCalifRecurso;
            // updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'IngresosCurso'] = nuevoData;
            firebase.database().ref().update(updates, onComplete);

        });
    }
}




/////////////////////////////////////////////////////////////////////////////////////////////
//////////*************************  uJL API  **************************************/////////
/////////////////////////////////////////////////////////////////////////////////////////////

function registraIniciado() {

    console.log('el curso lanzado', elCursoLanzado);
    // console.log('el curso lanzado', Object.values(elCursoLanzado.Temas));
    // console.log('el curso lanzado', Object.keys(elCursoLanzado.Temas));

    var elCurso = {};


    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    };

    if (revisaConexion) {

        var elRefIniciado = laUrlBase + 'Lecciones/' + usuarioId;
        console.log('elRefIniciado: ', elRefIniciado);

        firebase.database().ref(elRefIniciado).once('value').then(function(snapshot) {
            // console.log('snapshot.val()', snapshot.val());

            if (snapshot.val() == null) {

                elNumTema = 1;
                elNumRecurso = 1;

                for (a = 1; a <= cuantosTemas; a++) {
                    for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {
                        console.log('recursoVisible', a, b, that['curso' + elNumCurso + 'Tema' + a + 'RecursoVisible' + b])

                        if (that['curso' + elNumCurso + 'Tema' + a + 'RecursoVisible' + b] == 'si') {
                            elNumRecurso = b;
                            break;
                        }

                    }
                }
                console.log('elNumRecurso', elNumRecurso);

                elIdRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('idrec');
                laClaveRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('clave');
                laLigaRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('liga');
                laCategoriaRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('catrec');
                elTipoEntregaRecurso = $('#tema' + elNumTema + 'Recurso' + elNumRecurso + '_texto').attr('tipoentrec');
                elNombreRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Nombre;
                laRutaRecurso = [elCursoLanzado.Id] + '/Temas/' + 'tema_' + elNumTema + '/Recursos/' + 'recurso_' + elNumRecurso + '/' + elIdRecurso;
                // laDescRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Descripcion;
                laInstrRecurso = elCursoLanzado.Temas['tema_' + elNumTema].Recursos['recurso_' + elNumRecurso].Instrucciones;

                // elCurso //
                elCurso = {
                    [elCursoLanzado.Id]: {
                        Estatus: 'incompleto',
                        IngresosCurso: 1,
                        TemaActual: elNumTema,
                        RecursoActual: elNumRecurso,
                        IdRecursoActual: elIdRecurso,
                        RutaRecursoActual: laRutaRecurso,
                        ClaveRecursoActual: laClaveRecurso,
                        LigaRecursoActual: laLigaRecurso,
                        CategoriaRecursoActual: laCategoriaRecurso,
                        TipoEntregaRecursoActual: elTipoEntregaRecurso,
                        NombreRecursoActual: elNombreRecurso,
                        // DescripcionRecursoActual: laDescRecurso,
                        InstruccionesRecursoActual: laInstrRecurso,
                        Temas: {}
                    }
                };


                for (a = 1; a <= cuantosTemas; a++) {

                    elCurso[elCursoLanzado.Id].Temas[Object.keys(elCursoLanzado.Temas)[(a - 1)]] = {
                        Recursos: {}
                    }

                    for (b = 1; b <= thar['cuantosRecTema' + a]; b++) {

                        elCurso[elCursoLanzado.Id].Temas[Object.keys(elCursoLanzado.Temas)[(a - 1)]].Recursos[[Object.keys(elCursoLanzado.Temas['tema_' + a].Recursos)[(b - 1)]]] = {

                            [elCursoLanzado.Temas['tema_' + a].Recursos['recurso_' + b].Id]: {
                                'Activo': true,
                                'Calificacion': 0,
                                'Revisado': false,
                                'Duracion': "",
                                'Fecha_fin': "",
                                'Fecha_inicio': laFechaInicial,
                                'Marcador': "",
                                SCORM_12: {
                                    'cmi_core_lesson_status': 'not attempted',
                                    'cmi_core_session_time': '00:00:00',
                                    'cmi_suspend_data': '',
                                    'cmi_core_lesson_location': '',
                                    'cmi_core_score_min': '0',
                                    'cmi_core_score_raw': '0',
                                    'cmi_core_exit': 'suspend'
                                }
                            }
                        }

                    }
                }

                // elCurso //

                var updates = {};
                updates[elRefIniciado] = elCurso;
                firebase.database().ref().update(updates, onComplete);

            }

            console.log('elCurso', elCurso);
        });

    }

    setTimeout(function() {
        updateCursoActual(false);
    }, 300);

    setTimeout(function() {
        updateNumIngresoCurso();
    }, 500);

    setTimeout(function() {
        inicializaAPI();
    }, 1000);

    return $.ajax();
}


function updateNumIngresoCurso() {

    var elRefIniciado = laUrlBase + 'Lecciones/' + usuarioId;
    // console.log('elRefIniciado: ', elRefIniciado);

    firebase.database().ref(elRefIniciado).once('value').then(function(snapshot) {

        var onComplete1 = function(error) {
            if (error) {
                console.log('Ocurrió un error en la sincronización.');
            } else {
                console.log('Sincronización realizada.');
            }
        };

        elNumIngresoCurso = parseInt(snapshot.child(elCursoLanzado.Id).child('IngresosCurso').val());
        // console.log('elNumIngresoCurso', elNumIngresoCurso);
        elNumIngresoCurso++;

        var updates = {};
        updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'IngresosCurso'] = elNumIngresoCurso;
        // updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'IngresosCurso'] = nuevoData;
        firebase.database().ref().update(updates, onComplete1);

    });
}


function updateCalificacionTotalPinta(cualUserId, cualCalif) {
    laCalificacionTotal = cualCalif;
    console.log('updateCalificacionTotalPinta', cualUserId, laCalificacionTotal);

    var elRefIniciado = laUrlBase + 'Lecciones/' + cualUserId;
    // console.log('elRefIniciado: ', elRefIniciado);

    firebase.database().ref(elRefIniciado).once('value').then(function(snapshot) {

        var onComplete = function(error) {
            if (error) {
                console.log('Ocurrió un error en la sincronización.');
            } else {
                cargador('oculta');
                console.log('Sincronización realizada.');
            }
        };

        var updates = {};
        updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'CalificacionTotal'] = laCalificacionTotal;
        firebase.database().ref().update(updates, onComplete);

    });
}

function updateCursoActual(conClick) {
    $("#content").html('');
    cargador('muestra');


    var elRefIniciado = laUrlBase + 'Lecciones/' + usuarioId;
    // console.log('elRefIniciado: ', elRefIniciado);

    firebase.database().ref(elRefIniciado).once('value').then(function(snapshot) {

        function updateTemaActual() {
            var onComplete2 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateRecursoActual();
                }
            };

            if (elNumTema == undefined || elNumTema == 'undefined' || elNumTema == null) {
                elNumTema = 1;
            }
            if (!conClick) {
                elNumTema = parseInt(snapshot.child(elCursoLanzado.Id).child('TemaActual').val());
            }

            elTemaActual = elNumTema;
            console.log('elTemaActual', elTemaActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'TemaActual'] = elTemaActual;
            firebase.database().ref().update(updates, onComplete2);
        }

        function updateRecursoActual() {
            var onComplete3 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateIdRecursoActual();
                }
            };

            if (elNumRecurso == undefined || elNumRecurso == 'undefined' || elNumRecurso == null) {
                elNumRecurso = 1;
            }
            if (!conClick) {
                elNumRecurso = parseInt(snapshot.child(elCursoLanzado.Id).child('RecursoActual').val());
            }

            elRecursoActual = elNumRecurso;
            console.log('elRecursoActual', elRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'RecursoActual'] = elRecursoActual;
            firebase.database().ref().update(updates, onComplete3);
        }

        function updateIdRecursoActual() {
            var onComplete4 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateNombreRecursoActual();
                }
            };

            if (elIdRecurso == undefined || elIdRecurso == 'undefined' || elIdRecurso == null) {
                elIdRecurso = $('#tema' + 1 + 'Recurso' + 1 + '_texto').attr('idrec');
            }
            if (!conClick) {
                elIdRecurso = snapshot.child(elCursoLanzado.Id).child('IdRecursoActual').val();
            }

            elIdRecursoActual = elIdRecurso;
            console.log('elIdRecursoActual', elIdRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'IdRecursoActual'] = elIdRecursoActual;
            firebase.database().ref().update(updates, onComplete4);
        }

        function updateNombreRecursoActual() {
            var onComplete5 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateCatRecursoActual();
                }
            };

            if (elNombreRecurso == undefined || elNombreRecurso == 'undefined' || elNombreRecurso == null) {
                elNombreRecurso = $('#tema' + 1 + 'Recurso' + 1 + '_texto').html();
            }
            if (!conClick) {
                elNombreRecurso = snapshot.child(elCursoLanzado.Id).child('NombreRecursoActual').val();
            }

            elNombreRecursoActual = elNombreRecurso;
            console.log('elNombreRecursoActual', elNombreRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'NombreRecursoActual'] = elNombreRecursoActual;
            firebase.database().ref().update(updates, onComplete5);
        }

        function updateCatRecursoActual() {
            var onComplete6 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateTipoEntRecursoActual();
                }
            };

            if (laCategoriaRecurso == undefined || laCategoriaRecurso == 'undefined' || laCategoriaRecurso == null) {
                laCategoriaRecurso = $('#tema' + 1 + 'Recurso' + 1 + '_texto').attr('catrec');
            }
            if (!conClick) {
                laCategoriaRecurso = snapshot.child(elCursoLanzado.Id).child('CategoriaRecursoActual').val();
            }

            laCategoriaRecursoActual = laCategoriaRecurso;
            console.log('laCategoriaRecursoActual', laCategoriaRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'CategoriaRecursoActual'] = laCategoriaRecursoActual;
            firebase.database().ref().update(updates, onComplete6);
        }


        function updateTipoEntRecursoActual() {
            var onComplete7 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateDescRecursoActual();
                }
            };

            if (elTipoEntregaRecurso == undefined || elTipoEntregaRecurso == 'undefined' || elTipoEntregaRecurso == null) {
                elTipoEntregaRecurso = $('#tema' + 1 + 'Recurso' + 1 + '_texto').attr('tipoentrec');
            }
            if (!conClick) {
                elTipoEntregaRecurso = snapshot.child(elCursoLanzado.Id).child('TipoEntregaRecursoActual').val();
            }

            elTipoEntregaRecursoActual = elTipoEntregaRecurso;
            console.log('elTipoEntregaRecursoActual', elTipoEntregaRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'TipoEntregaRecursoActual'] = elTipoEntregaRecursoActual;
            firebase.database().ref().update(updates, onComplete7);
        }


        function updateDescRecursoActual() {
            var onComplete8 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateInstrRecursoActual();
                }
            };

            // Descripción no necesaria
            // if (laDescRecurso == undefined || laDescRecurso == 'undefined' || laDescRecurso == null) {
            //     laDescRecurso = elCursoLanzado.Temas['tema_' + 1].Recursos['recurso_' + 1].Descripcion;
            // }
            // if (!conClick) {
            //     laDescRecurso = snapshot.child(elCursoLanzado.Id).child('DescripcionRecursoActual').val();
            // }

            // laDescRecursoActual = laDescRecurso;
            // console.log('laDescRecursoActual', laDescRecursoActual);

            // var updates = {};
            // updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'DescripcionRecursoActual'] = laDescRecursoActual;
            // firebase.database().ref().update(updates, onComplete6);
            // Descripción no necesaria

            onComplete8();
        }


        function updateInstrRecursoActual() {
            var onComplete9 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateRutaRecursoActual();
                }
            };

            if (laInstrRecurso == undefined || laInstrRecurso == 'undefined' || laInstrRecurso == null) {
                laInstrRecurso = elCursoLanzado.Temas['tema_' + 1].Recursos['recurso_' + 1].Instrucciones;
            }
            if (!conClick) {
                laInstrRecurso = snapshot.child(elCursoLanzado.Id).child('InstruccionesRecursoActual').val();
            }

            laInstrRecursoActual = laInstrRecurso;
            console.log('laInstrRecursoActual', laInstrRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'InstruccionesRecursoActual'] = laInstrRecursoActual;
            firebase.database().ref().update(updates, onComplete9);
        }


        function updateRutaRecursoActual() {
            var onComplete10 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateClaveRecursoActual();
                }
            };

            if (laRutaRecurso == undefined || laRutaRecurso == 'undefined' || laRutaRecurso == null) {
                laRutaRecurso = [elCursoLanzado.Id] + '/Temas/' + 'tema_' + 1 + '/Recursos/' + 'recurso_' + 1 + '/' + elIdRecurso;
            }
            if (!conClick) {
                laRutaRecurso = snapshot.child(elCursoLanzado.Id).child('RutaRecursoActual').val();
            }

            laRutaRecursoActual = laRutaRecurso;
            console.log('laRutaRecursoActual', laRutaRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'RutaRecursoActual'] = laRutaRecursoActual;
            firebase.database().ref().update(updates, onComplete10);
        }


        function updateClaveRecursoActual() {
            var onComplete11 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateCalificacionTotal();
                }
            };

            if (laClaveRecurso == undefined || laClaveRecurso == 'undefined' || laClaveRecurso == null) {
                laClaveRecurso = $('#tema' + 1 + 'Recurso' + 1 + '_texto').attr('clave');
            }
            if (!conClick) {
                laClaveRecurso = snapshot.child(elCursoLanzado.Id).child('ClaveRecursoActual').val();
            }

            laClaveRecursoActual = laClaveRecurso;
            console.log('laClaveRecursoActual', laClaveRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'ClaveRecursoActual'] = laClaveRecursoActual;
            firebase.database().ref().update(updates, onComplete11);
        }

        function updateCalificacionTotal() {
            var onComplete12 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');
                    updateLigaRecursoActual();
                }
            };

            if (laCalificacionTotal == undefined || laCalificacionTotal == 'undefined' || laCalificacionTotal == null) {
                laCalificacionTotal = 0;
            }
            if (!conClick) {
                laCalificacionTotal = snapshot.child(elCursoLanzado.Id).child('CalificacionTotal').val();
            }

            console.log('laCalificacionTotal', laCalificacionTotal);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'CalificacionTotal'] = laCalificacionTotal;
            firebase.database().ref().update(updates, onComplete12);
        }


        function updateLigaRecursoActual() {
            var onComplete13 = function(error) {
                if (error) {
                    console.log('Ocurrió un error en la sincronización.');
                } else {
                    console.log('Sincronización realizada.');

                    // console.log('elTemaActual', elTemaActual);
                    // console.log('elRecursoActual', elRecursoActual);
                    // console.log('elRecursoActual', elCursoLanzado.Temas['tema_' + elTemaActual].Recursos['recurso_' + elRecursoActual].Obligatorio);

                    ////////////////////                        
                    pintaTemas();
                    cargaContent();
                    ////////////////////
                }
            };

            if (laLigaRecurso == undefined || laLigaRecurso == 'undefined' || laLigaRecurso == null) {
                laLigaRecurso = $('#tema' + 1 + 'Recurso' + 1 + '_texto').attr('liga');
            }
            if (!conClick) {
                laLigaRecurso = snapshot.child(elCursoLanzado.Id).child('LigaRecursoActual').val();
            }

            laLigaRecursoActual = laLigaRecurso;
            console.log('laLigaRecursoActual', laLigaRecursoActual);

            var updates = {};
            updates[elRefIniciado + '/' + elCursoLanzado.Id + '/' + 'LigaRecursoActual'] = laLigaRecursoActual;
            firebase.database().ref().update(updates, onComplete13);
        }

        updateTemaActual();
    });

}

/////////////////////////////////////////////////////////////////////////////////////////////
//////////*************************  uJL API  **************************************/////////
/////////////////////////////////////////////////////////////////////////////////////////////


$(window).resize(function() {
    ajustaEscalaContenido(conTemario);
    ajustaEscalaModalEntrega();
});

$(document).ready(function() {

});