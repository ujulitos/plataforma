function activaSecRecursos() {
    console.log('activaSecRecursos');
    $('.panel-header div h3').html('Objetos de Aprendizaje');
    $('#subtituloSeccion').html('');

    return cuentaRecursos()
}



function cuentaRecursos() {
    console.log('cuentaRecursos');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorRecursos = 0;
                var contadorRecursosVisbles = 0;
                cuantosRecursos = snapshot.numChildren();
                console.log('cuantosRecursos', cuantosRecursos);

                snapshot.forEach(function(childSnapshot) {
                    contadorRecursos++;

                    this['CursoId' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Id').val();
                    console.log('CursoId' + contadorRecursos + ': ', this['CursoId' + contadorRecursos]);
                    this['cursoNombre' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    console.log('cursoNombre ' + contadorRecursos + ': ', this['cursoNombre' + contadorRecursos]);
                    this['cursoVisible' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Visible').val();
                    // console.log('cursoVisible ' + contadorRecursos + ': ', this['cursoVisible' + contadorRecursos]);
                    this['cursoNivel' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Nivel').val();
                    console.log('cursoNivel', this['cursoNivel' + contadorRecursos]);
                    if (this['cursoVisible' + contadorRecursos] == true) {
                        if (this['cursoNivel' + contadorRecursos] <= elUsuarioNivel) {
                            contadorRecursosVisbles++;
                        }
                    }

                    this['cursoCategoria' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Categoria').val();
                    // console.log('cursoCategoria ' + contadorRecursos + ': ', this['cursoCategoria' + contadorRecursos]);
                    this['cursoDesc' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                    // console.log('Descripcion del Curso: ', this['cursoDesc' + contadorRecursos]);
                    this['cursoDurac' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Duracion').val();
                    // console.log('Duración del Curso: ', this['cursoDurac' + contadorRecursos]);
                    this['cursoObj' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Objetivos').val();
                    // console.log('Objetivos del Curso: ', this['cursoObj' + contadorRecursos]);
                    this['cursoTemario' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Temario').val();
                    // console.log('Temario del Curso: ', this['cursoTemario' + contadorRecursos]);
                    this['cursoLiga' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Liga').val();
                    // console.log('Liga del Curso: ', this['cursoLiga' + contadorRecursos]);
                    this['cursoPortada' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                    // console.log('Portada del Curso: ', this['cursoPortada' + contadorRecursos]);
                    that = this;

                    cuantosRecursos = contadorRecursos;
                    cuantosRecursosVisibles = contadorRecursosVisbles;
                    leeEstatusCurso(contadorRecursos);

                });

                return pintaCategorias().then(function() {
                    pintaCursos().then(function() {
                        activaBotonesCategprias().then(function() {
                            activaLanzarCursos();
                        });
                    });
                });

            }
        });
    }
}



function leeEstatusCurso(estatusNo) {
    if (revisaConexion) {

        var elRefRevisado = laUrlBase + 'Lecciones/' + usuarioId + '/objeto_' + that['CursoId' + estatusNo];
        // console.log('elRefRevisado', elRefRevisado);
        // var contador = 0;

        firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                var cursoRevisado = snapshot.child('Revisado').val();
                console.log('Curso Revisado: ', cursoRevisado);

                if (cursoRevisado == true) {
                    $('#estatus_curso' + estatusNo + ' > i').addClass('material-icons');
                    $('#estatus_curso' + estatusNo + ' > i').text('check_circle');
                }
            }
        });

        // SCORM //
        elRefSCORM = laUrlBase + 'Lecciones/' + usuarioId + '/objeto_' + that['CursoId' + estatusNo] + '/SCORM_12';
        // console.log('elRefSCORM', elRefSCORM);

        firebase.database().ref(elRefSCORM).once('value').then(function(snapshot) {
            // console.log('el snapshot.val() es', snapshot.val());

            if (snapshot.val() != null) {

                var f_lesson_status = snapshot.child('cmi_core_lesson_status').val();
                console.log('lesson_status: ', f_lesson_status);

                if (f_lesson_status == 'not attempted') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('material-icons icon_gris');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').text('radio_button_unchecked');
                }
                if (f_lesson_status == 'incomplete') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('material-icons icon_amarillo');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').text('incomplete_circle');
                }
                if (f_lesson_status == 'completed') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    // $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('nc-icon-glyph weather_moon-full');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('material-icons icon_verde');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').text('check_circle');
                }
                if (f_lesson_status == 'passed') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('material-icons icon_verde');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').text('check_circle');
                }
                if (f_lesson_status == 'failed') {
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').removeClass('material-icons');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').addClass('material-icons icon_rojo');
                    $('#estatus_curso_scorm' + estatusNo + ' > i').text('error');
                }
            }
        });

    }
}


function pintaCategorias() {

    var contenidoCategorias = '';
    $('#categorias').empty();

    var arrayCategoriasPrev = new Array();
    for (a = 1; a <= cuantosRecursosVisibles; a++) {
        arrayCategoriasPrev.push(that['cursoCategoria' + a]);
    }
    console.log('arrayCategoriasPrev', arrayCategoriasPrev);

    function unique(arrayCategoriasPrev) {
        return $.grep(arrayCategoriasPrev, function(el, index) {
            return index == $.inArray(el, arrayCategoriasPrev);
        });
    }
    arrayCategorias = unique(arrayCategoriasPrev);
    // console.log('arrayCategorias', arrayCategorias);
    cuantasCategorias = arrayCategorias.length;
    console.log('cuantasCategorias', cuantasCategorias);

    // for (a = 1; a <= cuantasCategorias; a++) {
    //     contenidoCategorias += '<div class="categoria">';
    //     contenidoCategorias += arrayCategorias[(a - 1)];
    //     contenidoCategorias += '<div  id="botonCategoria' + a + '" class="btn btn-sm btn-toggle btn-categoria active" data-toggle="button">';
    //     contenidoCategorias += '<div class="handle"></div>';
    //     contenidoCategorias += '</div>';
    //     contenidoCategorias += '</div>';
    // }

    // $('#categorias').append(contenidoCategorias);

    return $.ajax();
}


function pintaCursos() {

    var anchoColumnas = 6;
    // if (cuantosRecursosVisibles >= 3) {
    if (cuantosRecursos >= 3) {
        anchoColumnas = 4;
    }
    var contenidoSecCursos = '';
    $('.recursos_int').empty();


    for (a = 1; a <= cuantasCategorias; a++) {
        this['cuantosElemPorCategoria' + a] = 0;

        contenidoSecCursos += '<div id="grupoCategoria' + a + '" class="grupo_categoria">';
        contenidoSecCursos += '<p class="titulo_categoria">' + arrayCategorias[(a - 1)] + ' </p>';

        contenidoSecCursos += '<div class="row">';
        contenidoSecCursos += '<div class="col-md-10 ml-auto mr-auto">';
        contenidoSecCursos += '<div class="row">';


        for (b = 1; b <= cuantosRecursos; b++) {

            if (that['cursoCategoria' + b] == arrayCategorias[(a - 1)]) {
                this['cuantosElemPorCategoria' + a]++;

                var noCache = generarId();

                // console.log('cursoNivel', b, ' ', that['cursoNivel' + b], ' y elUsuarioNivel', elUsuarioNivel);
                if (that['cursoNivel' + b] <= elUsuarioNivel) {

                    // contenidoSecCursos += '<div class="col-md-' + anchoColumnas + ' ml-auto mr-auto">';
                    contenidoSecCursos += '<div class="col-md-' + anchoColumnas + '">';
                    contenidoSecCursos += '<div id="tarjeta' + b + '" class="card">';
                    contenidoSecCursos += '<img class="card-img-top" src="' + this['cursoPortada' + b] + '?' + noCache + '"></img>';

                    contenidoSecCursos += '<div class="card-body">';
                    // contenidoSecCursos += '<h6 class="category text-danger">' + this['cursoCategoria' + b] + '</h6>';
                    contenidoSecCursos += '<h5 id="curso_titulo' + b + '" class="curso_titulo card-title">' + this['cursoNombre' + b] + '</h5>';

                    contenidoSecCursos += '<div class="card-desc">';
                    contenidoSecCursos += '<p class="card-text" ><b>Descripción: </b><br>' + this['cursoDesc' + b] + '</p>';
                    contenidoSecCursos += '<p class="card-text" ><b>Duración: </b><br>' + this['cursoDurac' + b] + '</p>';
                    if (this['cursoObj' + b] != null) {
                        contenidoSecCursos += '<p class="card-text" ><b>Objetivos: </b><br>' + this['cursoObj' + b] + '</p>';
                    }
                    if (this['cursoTemario' + b] != null) {
                        contenidoSecCursos += '<p class="card-text" ><b>Temario: </b><br>' + this['cursoTemario' + b] + '</p>';
                    }
                    contenidoSecCursos += '</div>';

                    contenidoSecCursos += '<div class="mdl-card__actions mdl-card--border">';
                    // contenidoSecCursos += '<div id="estatus_curso' + b + '" class="icono_status" style="float:left; margin: 10px 20px;"><i class="now-ui-icons check-circle-07 icon_estatus"></i></div>';
                    contenidoSecCursos += '<div id="estatus_curso_scorm' + b + '" class="icono_status" style="float:left; margin: 10px 0px;"><i class="material-icons icon_estatus_scorm">radio_button_unchecked</i></div>';

                    contenidoSecCursos += '<div class="card-botones">';
                    // contenidoSecCursos += '<div id="botonMasInfo' + b + '" class="btn btn-sm btn-round botonMasInfo">Más info <i class="nc-icon-outline arrows-1_minimal-down"></i></div>';
                    // contenidoSecCursos += '<div id="botonEditar' + b + '" class="btn btn-sm btn-round botonEditar">Editar</div>';
                    // contenidoSecCursos += '<div id="botonAsignar' + b + '" class="btn btn-sm btn-round botonAsignar">Asignar</div>';
                    if (this['cursoVisible' + b]) {
                        contenidoSecCursos += '<div id="botonIniciarCurso' + b + '" class="btn btn-verde btn-round botonIniciarCurso">Ver</div>';
                    } else {
                        contenidoSecCursos += '<div id="botonIniciarCurso' + b + '" class="btn btn-verde btn-round botonIniciarCurso" disabled>Ver</div>';
                    }
                    contenidoSecCursos += '</div>';

                    contenidoSecCursos += '</div>';
                    contenidoSecCursos += '</div>';
                    contenidoSecCursos += '</div>';
                    contenidoSecCursos += '</div>';

                }
            }

        }

        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';

        console.log(arrayCategorias[(a - 1)], this['cuantosElemPorCategoria' + a]);

    }




    $('.recursos_int').append(contenidoSecCursos);
    $('#subtituloSeccion').html('<a  >' + cuantosRecursosVisibles + '</a> recursos en total');

    return $.ajax();

}


function activaBotonesCategprias() {

    for (a = 1; a <= cuantasCategorias; a++) {
        $("#botonCategoria" + a).click(function(event) {
            event.preventDefault();
            var cualCategoria = $(this).attr('id').substr(14, 3);
            $('#grupoCategoria' + cualCategoria).slideToggle();
        });
    }

    return $.ajax();
}


function activaLanzarCursos() {


    for (a = 1; a <= cuantosRecursos; a++) {
        this['carta_abierta' + a] = false;
        var that = this;

        $("#botonMasInfo" + a).click(function(event) {
            event.preventDefault();
            var cualCard = $(this).attr('id').substr(12, 3);
            $('#tarjeta' + cualCard).find('.card-desc').slideToggle();
            if (that['carta_abierta' + cualCard] == false) {
                $(this).html('Menos info<i class="nc-icon-outline arrows-1_minimal-up"></i>');
                that['carta_abierta' + cualCard] = true;
            } else {
                $(this).html('Más info<i class="nc-icon-outline arrows-1_minimal-down"></i>');
                that['carta_abierta' + cualCard] = false;
            }
        });
    }

    for (a = 1; a <= cuantosRecursos; a++) {
        $("#botonIniciarCurso" + a).click(function(event) {
            event.preventDefault();
            elContenido = $(this).attr('id').substr(17, 3);
            // console.log('elContenido', elContenido);
            // window.open(that['cursoLiga' + elContenido]);
            lanzaContenido(elContenido);
        });
    }
}



function lanzaContenido(cualContenido) {
    console.log('cualContenido', elContenido);
    console.log('CursoId', that['CursoId' + elContenido]);

    var laLiga = that['cursoLiga' + elContenido];

    habilitaBoton($('#botonCerrar'), false);

    if (elRol === "Participante") {
        //TODO
        // $("#boton_usuarios, #boton_lecciones").hide();
    }

    $('.main-panel').addClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').hide();
    $('.panel-header').css({
        'width': '100%'
    });
    $('#barra_player').show();
    $("#content").empty();

    elContenidoLanzado = true;
    // i4L API //
    registraIniciado();

    setTimeout(function() {

        $("#content").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="no" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

        ajustaEscalaContenido();
        detectaUnload();

    }, 700);

}



function cierraContenido() {

    registraRevisado();
    elContenidoLanzado = false;

    habilitaBoton($('#botonCerrar'), true);
    $("#content").empty();
    $('#barra_player').hide();
    $('.main-panel').removeClass('main-panel_100');
    $('.panel-header, .sidebar, .navbar-toggler').show();
    $('.panel-header').css({
        'width': '100%'
    });
    ajustaEscalaContenido();

    navega('recursos');
}



function detectaUnload() {
    if (elContenidoLanzado == true) {
        $("#content").bind('DOMNodeRemoved', function(event) {
            console.log('unload!');

            registraRevisado();
            elContenidoLanzado = false;
            habilitaBoton($('#botonCerrar'), true);
            $('#barra_player').hide();
            $('.panel-header').show();
            ajustaEscalaContenido();
            $("#content").unbind();
        });
    }
}


function ajustaEscalaContenido() {

    elAlto = $(window).height();
    elAncho = $(window).width();

    if (elContenidoLanzado == true) {
        $("#content").css({
            'height': (elAlto - 128) + 'px'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '0px',
            'margin-top': '125px'
        });
    } else {
        $("#content").css({
            'height': '0px'
            // 'width': elAncho + 'px'
        });
        $("#contenido").css({
            'padding': '30px',
            'margin-top': '0px'
        });
    }

}


$(window).resize(function() {

    // ajustaEscalaContenidoVer();

});
