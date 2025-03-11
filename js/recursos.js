var elTipoRecurso;
var jsonEvaOM;
var that_;
// Tipos de entrega:
// Tipo 1: Comentarios
// Tipo 2: Documento
// Tipo 3:Ambos

function activaSecRecursos() {
    log('activaSecRecursos');

    // $('.panel-header div h3').html('Objetos de Aprendizaje');
    $('#subtituloSeccion').html('');


    // $.getJSON("data/tipos.json", function(result) {
    //     var options = "";
    //     $.each(result, function(i, tp) {
    //         if (tp.tipo === "Selecciona una opción") {
    //             options += "<option value='" + tp.tipo + "' selected disabled>" + tp.tipo + "</option>";
    //         } else {
    //             options += "<option value='" + tp.tipo + "'>" + tp.tipo + "</option>";
    //         }

    //     });
    //     $("#rCategoria").html(options);
    //     $("#erCategoria").html(options);
    // });


    // $("#rCategoria, #erCategoria").change(function() {
    //     if ($(this).val() != 'Selecciona una opción') {
    //         cambiaAttrInput($(this).val());
    //     }
    // });


    // buscadorRecursos //
    // TODO mejorar toggles
    $("#buscadorRecursos").keyup(function(event) {
        event.preventDefault();
        if ($(this).val().length > 2) {
            log("buscando ok", $(this).val());

            for (b = 1; b <= cuantosRecursosVisibles; b++) {
                $('#recurso_titulo' + b).parent().parent().parent().parent().hide();
                if (that_['recursoNombre' + b].toLowerCase().includes($(this).val().toLowerCase())) {
                    // || that_['recursoDesc' + b].toLowerCase().includes($(this).val().toLowerCase())) 
                    log('Encontré la palabra', $(this).val(), 'con el recurso', that_['recursoNombre' + b], b);
                    // $('#recurso_titulo' + b).fadeIn();
                    var cont = b;
                    // setTimeout(function() {
                    $('#recurso_titulo' + cont).parent().parent().parent().parent().show();
                    // }, 500);

                    // $('#recurso_titulo' + cont).parent().parent().parent().parent().animate({
                    //     'opacity': '1'
                    // }, 400, function() {
                    //     $('#recurso_titulo' + cont).parent().parent().parent().parent().css({
                    //         'display': 'table-row'
                    //     });
                    // });

                    // return;
                } else {
                    log('No encontré nada');
                }
            }

        } else {
            for (b = 1; b <= cuantosRecursosVisibles; b++) {
                $('#recurso_titulo' + b).parent().parent().parent().parent().show();

                //     $('#recurso_titulo' + b).parent().parent().parent().parent().css({
                //         'display': 'table-row'
                //     });
                //     $('#recurso_titulo' + b).parent().parent().parent().parent().animate({
                //         'opacity': '1'
                //     }, 400, function() {});
            }
        }
        // pintaRecursos();
    });


    $("#buscadorClean").click(function(e) {
        e.preventDefault();
        $("#buscadorRecursos").val('');
        $("#buscadorRecursos").keyup();
    });
    // buscadorRecursos //


    cuentaRecursos();

}


function cuentaRecursos(elContenidoLanzado) {
    log('cuentaRecursos', elContenidoLanzado, elCurso_);

    cuantosRecursosVisibles = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + elCurso_).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorRecursos = 0;
                var contadorRecursosVisbles = 0;
                // cuantosRecursos = snapshot.numChildren();
                // log('cuantosRecursos', cuantosRecursos);

                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        contadorRecursos++;
                        // log('%c losRecursos', 'color: orange; font-weight:900;', childSnapshot.val());

                        this['recursoId' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Id').val();
                        log('recursoId' + contadorRecursos + ': ', this['recursoId' + contadorRecursos]);
                        this['recursoClave' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Clave').val();
                        log('recursoClave' + contadorRecursos + ': ', this['recursoClave' + contadorRecursos]);
                        this['recursoNombre' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        // log('recurso ' + contadorRecursos + ': ', this['recursoNombre' + contadorRecursos]);
                        this['recursoVisible' + contadorRecursos] = snapshot.child(childSnapshot.key).child('RecursoVisible').val();
                        // log('recurso ' + contadorRecursos + ': ', this['recursoVisible' + contadorRecursos]);
                        //if (this['recursoVisible' + contadorRecursos] == true) {
                        contadorRecursosVisbles++;
                        //};
                        this['recursoCategoria' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Categoria').val();
                        // log('recurso ' + contadorRecursos + ': ', this['recursoCategoria' + contadorRecursos]);
                        // Descripción no necesaria
                        //  this['recursoDesc' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                        // log('Descripcion del recurso: ', this['recursoDesc' + contadorRecursos]);
                        // Descripción no necesaria
                        this['recursoDuracion' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Duracion').val();
                        // log('Duración del recurso: ', this['recursoDuracion' + contadorRecursos]); 
                        this['recursoInstr' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Instrucciones').val();
                        // log('Instrucciones del recurso: ', this['recursoInstr' + contadorRecursos]);
                        this['recursoCalifManual' + contadorRecursos] = snapshot.child(childSnapshot.key).child('CalificacionManual').val();
                        // log('Calificación del recurso: ', this['recursoCalifManual' + contadorRecursos]);

                        this['TipoEntrega' + contadorRecursos] = snapshot.child(childSnapshot.key).child('TipoDeEntrega').val();
                        if (this['TipoEntrega' + contadorRecursos] == null) {
                            this['TipoEntrega' + contadorRecursos] = 'no';
                        }
                        log('Tipo de Entrega del recurso: ', this['TipoEntrega' + contadorRecursos]);
                        this['recursoLiga' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Liga').val();
                        // log('Liga del recurso: ', this['recursoLiga' + contadorRecursos]);
                        // this['recursoPortada' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                        // log('Portada del recurso: ', this['recursoPortada' + contadorRecursos]);

                        if (this['recursoCategoria' + contadorRecursos] == 'Rúbrica 4x4') {

                            var cuantosDescriptores = parseInt(this['recursoCategoria' + contadorRecursos].split(' ')[1].split('x')[0]);
                            // log('cuantosDescriptores', cuantosDescriptores);
                            var cuantosNiveles = parseInt(this['recursoCategoria' + contadorRecursos].split(' ')[1].split('x')[1]);
                            // log('cuantosNiveles', cuantosNiveles);

                            for (a = 1; a <= cuantosDescriptores; a++) {
                                this['recurso' + a + 'DescriptorTexto' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descriptores/descriptor_' + a + '/DescriptorTexto').val();
                                log('Descriptor ' + a + ' Texto:', this['recurso' + a + 'DescriptorTexto' + contadorRecursos]);
                                this['recurso' + a + 'DescriptorTipo' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descriptores/descriptor_' + a + '/Tipo').val();
                                log('Descriptor ' + a + ' Tipo:', this['recurso' + a + 'DescriptorTipo' + contadorRecursos]);

                                for (b = 1; b <= cuantosNiveles; b++) {
                                    this['recurso' + a + 'Nivel' + b + 'Texto' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descriptores/descriptor_' + a + '/Niveles/nivel_' + b + '/NivelTexto').val();
                                    log('Nivel ' + b + ' Texto:', this['recurso' + a + 'Nivel' + b + 'Texto' + contadorRecursos]);
                                    this['recursoNivel' + b + 'Puntos' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descriptores/descriptor_' + a + '/Niveles/nivel_' + b + '/NivelPuntos').val();
                                    log('Nivel ' + b + ' Puntos:', this['recursoNivel' + b + 'Puntos' + contadorRecursos]);
                                }
                            }
                        }

                        if (this['recursoCategoria' + contadorRecursos] == 'Evaluación Opción Múltiple') {

                            this['recursoPregAleatorias' + contadorRecursos] = snapshot.child(childSnapshot.key).child('PregAleatorias').val();
                            log('recursoPregAleatorias', this['recursoPregAleatorias' + contadorRecursos]);
                            this['recursoRespAleatorias' + contadorRecursos] = snapshot.child(childSnapshot.key).child('RespAleatorias').val();
                            log('recursoRespAleatorias', this['recursoRespAleatorias' + contadorRecursos]);
                            this['recursoPregScroll' + contadorRecursos] = snapshot.child(childSnapshot.key).child('PregScroll').val();
                            log('recursoPregScroll', this['recursoPregScroll' + contadorRecursos]);
                            this['recursoRespEnPantalla' + contadorRecursos] = snapshot.child(childSnapshot.key).child('RespEnPantalla').val();
                            log('recursoRespEnPantalla', this['recursoRespEnPantalla' + contadorRecursos]);
                            this['recursoTotalReactivos' + contadorRecursos] = snapshot.child(childSnapshot.key).child('TotalReactivos').val();
                            log('recursoTotalReactivos', this['recursoTotalReactivos' + contadorRecursos]);
                            this['recursoMinimoAprobatorio' + contadorRecursos] = snapshot.child(childSnapshot.key).child('MinimoAprobatorio').val();
                            log('recursoMinimoAprobatorio', this['recursoMinimoAprobatorio' + contadorRecursos]);
                            this['recursoIntentos' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Intentos').val();
                            log('recursoIntentos', this['recursoIntentos' + contadorRecursos]);
                            this['recursoTiempoLimite' + contadorRecursos] = snapshot.child(childSnapshot.key).child('TiempoLimite').val();
                            log('recursoTiempoLimite', this['recursoTiempoLimite' + contadorRecursos]);

                            // this['numReactivos' + contadorRecursos] = parseInt(snapshot.child(childSnapshot.key).child('Reactivos').numChildren());
                            // log('numReactivos', this['numReactivos' + contadorRecursos]);

                            // for (a = 1; a <= this['numReactivos' + contadorRecursos]; a++) {
                            // }

                            this['losReactivos' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Reactivos').val();
                            log('losReactivos', this['losReactivos' + contadorRecursos]);

                        }


                        that_ = this;
                        cuantosRecursos = contadorRecursos;
                        cuantosRecursosVisibles = contadorRecursosVisbles;

                    }
                });

                // losRecursos = snapshot.val();
                // log('%c losRecursos', 'color: orange; font-weight:900;', losRecursos);

            }

            if (elContenidoLanzado) {

                return pintaTemas().then(function() {
                    // cargaContent().then(function() {
                    ajustaEscalaContenido().then(function() {
                        detectaUnload().then(function() {
                            registraIniciado().then(function() {
                                cargador('oculta');
                            });
                        });
                    });
                    // });
                });


            } else {

                return pintaCategorias().then(function() {
                    return pintaRecursos().then(function() {
                        activaBotonesCategorias().then(function() {
                            activaBotonesRecursos().then(function() {
                                activaLanzarRecursos().then(function() {
                                    cargador('oculta');
                                });
                            });
                        });
                    });
                });

            }

        });
    };
};



function pintaCategorias() {

    var contenidoCategorias = '';
    $('#categorias').empty();

    var arrayCategoriasPrev = new Array();
    for (a = 1; a <= cuantosRecursosVisibles; a++) {
        arrayCategoriasPrev.push(that_['recursoCategoria' + a]);
    }
    // log('arrayCategoriasPrev', arrayCategoriasPrev);

    function unique(arrayCategoriasPrev) {
        return $.grep(arrayCategoriasPrev, function(el, index) {
            return index == $.inArray(el, arrayCategoriasPrev);
        });
    }
    arrayCategorias = unique(arrayCategoriasPrev);
    // log('arrayCategorias', arrayCategorias);
    cuantasCategorias = arrayCategorias.length;
    log('cuantasCategorias', cuantasCategorias);

    for (a = 1; a <= cuantasCategorias; a++) {
        contenidoCategorias += '<div class="categoria">';
        contenidoCategorias += arrayCategorias[(a - 1)];
        contenidoCategorias += '<div id="botonCategoria' + a + '" class="btn btn-sm btn-toggle btn-categoria active" data-toggle="button">';
        contenidoCategorias += '<div class="handle"></div>';
        contenidoCategorias += '</div>';
        contenidoCategorias += '</div>';
    }

    $('#categorias').append(contenidoCategorias);

    return $.ajax();
}

function activaBotonesCategorias() {

    for (a = 1; a <= cuantasCategorias; a++) {
        $("#botonCategoria" + a).click(function(event) {
            event.preventDefault();
            var cualCategoria = $(this).parent().text();
            // this['visible' + cualCategoria] = true;           

            if (cualCategoria === 'Rúbrica 4x4') {
                cualCategoria = 'Rubrica_4x4';
            }
            if (cualCategoria === 'Evaluación Opción Múltiple') {
                cualCategoria = 'EvaluacionOM';
            }
            log('cualCategoria', cualCategoria, this['visible' + cualCategoria]);

            // TODO mejorar toggles
            // $('.recursoCategoria_' + cualCategoria).parent().parent().parent().parent().slideToggle();
            // $('.recursoCategoria_' + cualCategoria).parent().parent().parent().parent().addClass('hide');
            if (this['visible' + cualCategoria] == undefined || this['visible' + cualCategoria] == true) {
                $('.recursoCategoria_' + cualCategoria).parent().parent().parent().parent().animate({
                    'opacity': '0'
                }, 400, function() {
                    $('.recursoCategoria_' + cualCategoria).parent().parent().parent().parent().css({
                        'display': 'none'
                    });
                });
                this['visible' + cualCategoria] = false;
            } else {
                $('.recursoCategoria_' + cualCategoria).parent().parent().parent().parent().css({
                    'display': 'table-row'
                });
                $('.recursoCategoria_' + cualCategoria).parent().parent().parent().parent().animate({
                    'opacity': '1'
                }, 400, function() {});
                this['visible' + cualCategoria] = true;
            }

        });
    }

    return $.ajax();
}


function pintaRecursos() {

    // var anchoColumnas = 6;
    // if (cuantosRecursosVisibles >= 3) {
    //     anchoColumnas = 4;
    // }
    var contenidoSecRecursos = '';
    $('.recursos_int').empty();

    // Agregar Recurso // <input type="file" accept="image/x-png,image/jpeg">
    /*contenidoSecRecursos += '<label class="btn btn-primary btn-round" style="float: right; margin-top: -50px;">Agregar Recurso';
    contenidoSecRecursos += '<input id="inputUploadResource" type="file" accept=".zip" style="display: none;">';
    contenidoSecRecursos += '</label>';*/
    // Agregar Recurso //


    contenidoSecRecursos += '<label id="botonAgregarRecurso" class="btn btn-primary btn-round item boton_gris2_alt" style="float: right; margin-top: -60px;"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Recurso';
    // contenidoSecRecursos += '<button  type="file" accept=".zip,.pdf,.ppt,.pptx,video/*" style="display: none;" data-toggle="modal" data-target="#modalAddRecurso"></button>';
    // contenidoSecRecursos += '<button    style="display: none;" onClick="abreMenuRecursos()"></button>';
    contenidoSecRecursos += '</label>';


    // contenidoSecRecursos += '<div class="pull-right">';
    // contenidoSecRecursos += '<div id="menu_add_recurso" class="ui vertical menu menu_sesiones" style="display: none; position: absolute; z-index: 99; margin-left: -210px; margin-top: -5px;">';
    // contenidoSecRecursos += '<a class="item boton_gris1_alt" data-toggle="modal" data-target="#modalAddRecurso">';
    // contenidoSecRecursos += '<h4 class="ui header" style="margin-bottom: 20px;">Subir Objeto<i class="nc-icon-glyph arrows-2_file-upload-93 pull-right"></i></h4>';
    // contenidoSecRecursos += '<p>Se sube un objeto a la librería de Objetos de Aprendizaje.</p>';
    // contenidoSecRecursos += '</a>';
    // contenidoSecRecursos += '<a class="item boton_gris2_alt" data-toggle="modal" data-target="#modalAddPregunta" onClick="abreModalPregunta(' + "'agregar'" + ')">';
    // contenidoSecRecursos += '<h4 class="ui header" style="margin-bottom: 20px;">Crear Pregunta<i class="nc-icon-glyph design_pen-01 pull-right"></i></h4>';
    // contenidoSecRecursos += '<p>Se crea una pregunta para ser utilizada en la librería de Objetos de Aprendizaje.</p>';
    // contenidoSecRecursos += '</a>';
    // contenidoSecRecursos += '</div>';
    // contenidoSecRecursos += '</div>';


    contenidoSecRecursos += '<div class="pt-4 pl-5 pr-5 py-3 bg-white rounded tabla_recursos">';

    contenidoSecRecursos += '<table class="table recursos_lista">';
    contenidoSecRecursos += '    <thead>';
    contenidoSecRecursos += '        <tr>';
    contenidoSecRecursos += '            <th class="col-8">';
    contenidoSecRecursos += '                <h6 class="input_label">Recurso</h6>';
    contenidoSecRecursos += '            </th>';

    // Descripción no necesaria
    // contenidoSecRecursos += '            <th class="col-3">';
    // contenidoSecRecursos += '                <h6 class="input_label">Descripción</h6>';
    // contenidoSecRecursos += '            </th>';
    // Descripción no necesaria

    contenidoSecRecursos += '            <th class="col-2">';
    contenidoSecRecursos += '                <h6 class="input_label">Duración</h6>';
    contenidoSecRecursos += '            </th>';
    contenidoSecRecursos += '            <th class="col-2">';
    contenidoSecRecursos += '                <h6 class="input_label">Acciones</h6>';
    contenidoSecRecursos += '            </th>';
    contenidoSecRecursos += '        </tr>';
    contenidoSecRecursos += '    </thead>';
    contenidoSecRecursos += '    <tbody>';

    for (a = 1; a <= cuantosRecursos; a++) {

        contenidoSecRecursos += '            <tr>';
        contenidoSecRecursos += '                <td>';
        contenidoSecRecursos += '        <div class="recurso_nombre">';
        // Portada no necesaria
        // contenidoSecRecursos += '           <div id="recurso_imagen' + a + '" class="recurso_imagen">';
        // contenidoSecRecursos += '                <img src="' + that_['recursoPortada' + a] + '" alt="">';
        // contenidoSecRecursos += '            </div>';
        // Portada no necesaria
        contenidoSecRecursos += '            <div class="recurso_nombre_int">';

        if (that_['recursoCategoria' + a] === 'Rúbrica 4x4') {
            this['miRecursoCategoria' + a] = 'Rubrica_4x4';
        } else if (that_['recursoCategoria' + a] === 'Evaluación Opción Múltiple') {
            this['miRecursoCategoria' + a] = 'EvaluacionOM';
        } else {
            this['miRecursoCategoria' + a] = that_['recursoCategoria' + a];
        }
        contenidoSecRecursos += '                <h6 id="recurso_clave' + a + '" class="curso_subtitulo">' + that_['recursoClave' + a] + '</h6>';
        contenidoSecRecursos += '                <span id="recurso_titulo' + a + '" class="recurso_titulo recursoCategoria_' + this['miRecursoCategoria' + a] + '">' + that_['recursoNombre' + a] + '</span>';
        contenidoSecRecursos += '                <br>';
        contenidoSecRecursos += '                <span id="recurso_subtitulo' + a + '" class="badge badge-pill badge_azul recurso_subtitulo">' + that_['recursoCategoria' + a] + '</span>';
        contenidoSecRecursos += '            </div>';
        contenidoSecRecursos += '         </div>';
        contenidoSecRecursos += '     </td>';

        // Descripción no necesaria
        // contenidoSecRecursos += '    <td id="recurso_descripcion' + a + '">';
        // contenidoSecRecursos += '        <p class="texto_limitado">' + that_['recursoDesc' + a] + '</p>';
        // contenidoSecRecursos += '    </td>';
        // Descripción no necesaria

        contenidoSecRecursos += '    <td id="recurso_duracion' + a + '">' + that_['recursoDuracion' + a] + ' minutos</td>';
        contenidoSecRecursos += '    <td>';
        contenidoSecRecursos += '        <div id="botonVerRecurso' + a + '" class="btn btn-round btn-icon btn-verde2 botonVerRecurso" data-toggle="modal" data-target="#modalVerRecurso">';
        contenidoSecRecursos += '            <i class="nc-icon-outline education_glasses"></i>';
        contenidoSecRecursos += '      </div>';
        contenidoSecRecursos += '      <div id="botonEditarRecurso' + a + '" class="btn btn-round btn-icon botonEditarRecurso">';
        contenidoSecRecursos += '          <i class="nc-icon-outline ui-1_pencil"></i>';
        contenidoSecRecursos += '     </div>';
        contenidoSecRecursos += '        <div id="botonEliminarRecurso' + a + '" class="btn btn-round btn-icon botonEliminarRecurso">';
        contenidoSecRecursos += '             <i class="nc-icon-outline ui-1_trash-simple"></i>';
        contenidoSecRecursos += '         </div>';
        contenidoSecRecursos += '      </td>';
        contenidoSecRecursos += '   </tr>';

    };

    contenidoSecRecursos += '           </tbody>';
    contenidoSecRecursos += '    </table>';

    contenidoSecRecursos += ' </div>';


    $('.recursos_int').append(contenidoSecRecursos);

    $('.recursos_int').css({
        'display': 'block'
    });

    // $('#subtituloSeccion').html('<a  >' + cuantosRecursosVisibles + '</a> objetos en total');


    return $.ajax();

}


function subirRecurso(input) {
    log("[SUBIENDO RECURSO]", elRecursoIndex, modoAgregar, elTipoRecurso, input);
    cargador('muestra');

    if (modoAgregar == true) {
        // if (IdRecurso.length === 0) {
        var recursoId_ = generarId();
        IdRecurso = "recurso_" + recursoId_;
        // }
    } else {
        IdRecurso = that_['recursoId' + elRecursoIndex];
    }
    log("IdRecurso", IdRecurso);

    var formIm = $("#formZip")[0];
    var formData = new FormData(formIm);
    formData.append("zip_file", input.files[0]);
    formData.append("rename", IdRecurso);
    // formData.append("CODE_RESOURCE", "UPLOAD_RESOURCE");
    // formData.append("CODE_PHOTO", "UPLOAD_PHOTO");
    log("input.files[0]", FormData);

    var tipoRecurso = $('.tipoBoton').html();
    log('tipoRecurso', tipoRecurso);


    var recurso = {};
    recurso.Id = IdRecurso;
    recurso.Clave = $('#claveRecurso').val();
    recurso.Nombre = $('#nombreRecurso').val();
    // Descripción no necesaria
    // recurso.Descripcion = $('#editorRecursoDesc').next().find('.ck-editor__editable').html();
    // recurso.Descripcion = 'no';
    // Descripción no necesaria
    recurso.Duracion = $('#duracionRecurso').val();
    recurso.Visible = true;
    recurso.Nivel = 1;
    recurso.Categoria = elTipoRecurso;
    // recurso.Portada = 'recursos/' + IdRecurso + '/objeto_portada.jpg';
    recurso.Instrucciones = false;
    recurso.CalificacionManual = false;
    recurso.Liga = false;


    // if (tipoRecurso == 'zip') {
    //     elTipoRecurso = 'SCORM';
    // }
    // if (tipoRecurso == 'doc' || tipoRecurso == 'docx') {
    //     elTipoRecurso = 'Word';
    // }
    // if (tipoRecurso == 'ppt' || tipoRecurso == 'pptx') {
    //     elTipoRecurso = 'PowerPoint';
    // }
    // if (tipoRecurso == 'pdf') {
    //     elTipoRecurso = 'PDF';
    // }
    // if (tipoRecurso == 'mp3' || tipoRecurso == 'wav' || tipoRecurso == 'm4a') {
    //     elTipoRecurso = 'Audio';
    // }
    // if (tipoRecurso == 'mp4' || tipoRecurso == 'mkv' || tipoRecurso == 'ogg') {
    //     elTipoRecurso = 'Video';
    // }
    // if (tipoRecurso == 'jpg' || tipoRecurso == 'jpeg' || tipoRecurso == 'png') {
    //     elTipoRecurso = 'Imagen';
    // }


    if (elTipoRecurso == 'SCORM' || elTipoRecurso == 'Word' || elTipoRecurso == 'PowerPoint' || elTipoRecurso == 'PowerPoint' || elTipoRecurso == 'PDF' || elTipoRecurso == 'Audio' || elTipoRecurso == 'Video' || elTipoRecurso == 'Imagen') {


        $.ajax({
            url: "php/recurso_upload.php",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                var dataFinal = data.split('..')[0];

                if (elTipoRecurso == 'SCORM') {
                    recurso.Liga = "recursos/" + IdRecurso + '/' + dataFinal;
                } else {
                    var nombreRecurso = input.files[0].name;
                    log('nombreRecurso', nombreRecurso);
                    recurso.Liga = "recursos/" + IdRecurso + '/' + nombreRecurso;
                }
                log("Recurso agregado exitosamente", recurso);
                guardaRecursoBD(recurso);
                return;
            },
            error: function() {
                log('Error occured');
                cargador('oculta');
            }
        });


        // } else if (elTipoRecurso == 'Entregable' || elTipoRecurso == 'Foro' || elTipoRecurso == 'Rúbrica 4x4' || elTipoRecurso == 'Evaluación Opción Múltiple') {
    } else {

        if (elTipoRecurso == 'Entregable') {
            recurso.Instrucciones = $('#editorRecursoInstr').next().find('.ck-editor__editable').html();
            recurso.CalificacionManual = $('.btn-califManual').hasClass('active');
            recurso.TipoDeEntrega = parseInt($('.btn-radio.active').attr('id').substr(20, 2));
        } else if (elTipoRecurso == 'Foro') {
            recurso.Instrucciones = $('#editorRecursoInstr').next().find('.ck-editor__editable').html();
            recurso.CalificacionManual = $('.btn-califManual').hasClass('active');
        } else if (elTipoRecurso == 'Rúbrica 4x4') {
            recurso.Instrucciones = $('#editorRubricaInstr').next().find('.ck-editor__editable').html();
            recurso.Descriptores = {};

            var cuantosDescriptores = parseInt(elTipoRecurso.split(' ')[1].split('x')[0]);
            // log('cuantosDescriptores', cuantosDescriptores);
            var cuantosNiveles = parseInt(elTipoRecurso.split(' ')[1].split('x')[1]);
            // log('cuantosNiveles', cuantosNiveles);

            for (a = 1; a <= cuantosDescriptores; a++) {
                recurso.Descriptores['descriptor_' + a] = {};
                recurso.Descriptores['descriptor_' + a].DescriptorTexto = $('#rubricaDescriptor' + a).val();
                recurso.Descriptores['descriptor_' + a].Tipo = '1';
                recurso.Descriptores['descriptor_' + a].Niveles = {};

                for (b = 1; b <= cuantosNiveles; b++) {
                    recurso.Descriptores['descriptor_' + a].Niveles['nivel_' + b] = {};
                    recurso.Descriptores['descriptor_' + a].Niveles['nivel_' + b].NivelTexto = $('#rubricaNivel_d' + a + '_n' + b).val();
                    recurso.Descriptores['descriptor_' + a].Niveles['nivel_' + b].NivelPuntos = parseInt($('#puntajeTexto' + b).html().split(' puntos')[0]);
                }
            }

        } else if (elTipoRecurso == 'Evaluación Opción Múltiple') {
            recurso.Instrucciones = $('#editorEvaOMInstr').next().find('.ck-editor__editable').html();
            recurso.PregAleatorias = $('#pregAleatoriasEvaOM').hasClass('active');
            recurso.RespAleatorias = $('#respAleatoriasEvaOM').hasClass('active');
            recurso.PregScroll = $('#pregTodasEvaOM').hasClass('active');
            recurso.RespEnPantalla = $('#respPantallaEvaOM').hasClass('active');
            recurso.TotalReactivos = $('#numReactivosEvaOM').val();
            recurso.MinimoAprobatorio = $('#minAprobatorioEvaOM').val();
            recurso.Intentos = $('#numIntentosEvaOM').val();
            recurso.TiempoLimite = $('#tiempoMaxEvaOM').val();
            recurso.Reactivos = jsonEvaOM;
        }

        log("Recurso agregado exitosamente", recurso);
        guardaRecursoBD(recurso);
        return;

    }

}


function subirPortadaRecurso(divInput) {
    log("[SUBIENDO PORTADA]", divInput);

    var elInput = $('#imagenRec')[0];
    log("elInput", elInput);

    // if (IdRecurso.length === 0) {
    //     var recursoId = generarId();
    //     IdRecurso = "recurso_" + recursoId;
    // }
    log("IdRecurso", IdRecurso);

    if (elInput) {
        // actualiza portada del recurso en el servidor
        var formIm = $('#formImg')[0];
        var formData = new FormData(formIm);
        formData.append("zip_file", divInput.files[0]);
        // formData.append("CODE_RESOURCE", "UPLOAD_RESOURCE");
        // formData.append("CODE_PHOTO", "UPLOAD_PHOTO");
        formData.append("IdRecurso", IdRecurso);
        // formData.append("FileName", FileName);
        log("formData", divInput.files[0]);

        $.ajax({
            url: "php/recurso_upload.php",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                Portada = laUrlBase + "recursos/" + IdRecurso + "/objeto_portada.jpg";
                log("Portada agregada exitosamente");

                regresaRecursos();
                return data;
            },
            error: function() {
                log('Error occured');
            }
        });
    }
}


function guardaRecursoBD(elRecurso) {
    log('guardaRecursoBD: ', elRecurso);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');

            // portada //
            // subirPortadaRecurso($('#imagenRec')[0]);
            regresaRecursos();
            // portada //  
        }
    };

    if (revisaConexion) {

        var elRefNuevoRecurso = laUrlBase + 'Recursos/' + elRecurso.Id;
        log('elRefNuevoRecurso: ', elRefNuevoRecurso);

        firebase.database().ref(elRefNuevoRecurso).once('value').then(function(snapshot) {
            firebase.database().ref(elRefNuevoRecurso).update(elRecurso, onComplete);
        });

    }
}


function eliminaRecursoBD(recursoEliminar) {
    log('eliminaRecursoBD: ', recursoEliminar);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
            regresaRecursos();
        }
    };

    if (revisaConexion) {

        var elRefEliminaRecurso = laUrlBase + 'Recursos/' + recursoEliminar;
        log('elRefEliminaRecurso: ', elRefEliminaRecurso);

        firebase.database().ref(elRefEliminaRecurso).once('value').then(function(snapshot) {
            firebase.database().ref(elRefEliminaRecurso).remove(onComplete);
        });

    }
}

function eliminaDirectorio(cualRecurso) {
    log("eliminaDirectorio", cualRecurso, that_['recursoId' + cualRecurso]);

    $.ajax({
        url: "php/recurso_delete.php",
        type: "post",
        data: {
            directorio: that_['recursoId' + cualRecurso]
        },
        cache: false,
        success: function() {
            log("Directorio eliminado exitosamente");

            eliminaRecursoBD(that_['recursoId' + cualRecurso]);

            return;
        },
        error: function() {
            log('Error occured');
        }
    });

}


function eliminarRecurso(cualRecurso) {
    log("eliminarRecurso", cualRecurso);

    $('#modalBorrarRecurso').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarBorrarRecurso').on('click', '#botonCancelarBorrarRecurso', function(e) {});
    $(document).off('click', '#botonAceptarBorrarRecurso').on('click', '#botonAceptarBorrarRecurso', function(e) {

        eliminaDirectorio(cualRecurso);
    });

};



function activaBotonesRecursos() {

    $(document).off('click', '#botonAgregarRecurso').on('click', '#botonAgregarRecurso', function(event) {
        event.preventDefault();
        secAgregaRecurso();
    });

    for (a = 1; a <= cuantosRecursos; a++) {

        $(document).off('click', '#botonEditarRecurso' + a).on('click', '#botonEditarRecurso' + a, function(event) {
            event.preventDefault();
            var elRecurso = $(this).attr('id').substr(18, 3);
            log('elRecurso', elRecurso);
            secEditaRecurso(elRecurso);
        });

        $(document).off('click', '#botonEliminarRecurso' + a).on('click', '#botonEliminarRecurso' + a, function(event) {
            event.preventDefault();
            var elRecurso = $(this).attr('id').substr(20, 3);
            log('elRecurso', elRecurso);
            eliminarRecurso(elRecurso);
        });

    }

    $(document).off('click', '#botonCancelarRecurso').on('click', '#botonCancelarRecurso', function(event) {
        event.preventDefault();
        regresaRecursos();
    });

    $(document).off('click', '#botonGuardaRecurso').on('click', '#botonGuardaRecurso', function(event) {
        event.preventDefault();

        // log('nombreRecurso', $('#nombreRecurso').val(), $('#nombreRecurso').val().length);
        // log('descripcionRecurso', $('.ck-editor__editable').html());
        // log('duracionRecurso', $('#duracionRecurso').val(), $('#duracionRecurso').val().length);
        // log('inputZip', $('#inputZip').val(), $('#inputZip').val().length);
        // log('uploaded-image', $('.uploaded-image>img').attr('src'));

        // mensajes de error //
        $('#texto_error_claveRec').html('');
        $('#texto_error_nombreRec').html('');
        // $('#texto_error_descripcionRec').html('');
        $('#texto_error_duracionRec').html('');
        $('#texto_error_tipoRec').html('');
        $('#texto_error_instrRec').html('');
        $('#texto_error_instrRecEvaOM').html('');
        $('#texto_error_archivoRec').html('');
        $('#texto_error_instrRubrica').html('');
        $('#texto_error_Rubrica').html('');
        // $('#texto_error_imagenRec').html('');
        var conErrores = false;
        var listaErrores = [];

        if ($('#claveRecurso').val().length <= 0) {
            $('#texto_error_claveRec').html('* Este campo es requerido');
            listaErrores[0] = 'claveRecurso';
        } else {
            listaErrores[0] = ''
        }

        if ($('#nombreRecurso').val().length <= 0) {
            $('#texto_error_nombreRec').html('* Este campo es requerido');
            listaErrores[1] = 'nombreRecurso';
        } else {
            listaErrores[1] = ''
        }
        // Descripción no necesaria
        //  if ($('#editorRecursoDesc').next().find('.ck-editor__editable').html() === '<p><br data-cke-filler="true"></p>') {
        //     $('#texto_error_descripcionRec').html('* Este campo es requerido');
        //     listaErrores[1] = 'descripcionRecurso';
        // }
        // Descripción no necesaria
        if ($('#duracionRecurso').val() <= 0) {
            $('#texto_error_duracionRec').html('* Este campo debe ser mayor que 0');
            listaErrores[2] = 'duracionRecurso';
        }
        if (elTipoRecurso == null || elTipoRecurso == undefined || elTipoRecurso == '') {
            $('#texto_error_tipoRec').html('* Por favor selecciona un tipo de Recurso');
            listaErrores[3] = 'TipoRecurso';
        } else if (elTipoRecurso == 'Entregable') {
            if ($('#editorRecursoInstr').next().find('.ck-editor__editable').html() === '<p><br data-cke-filler="true"></p>') {
                $('#texto_error_instrRec').html('* Este campo es requerido');
                listaErrores[3] = 'InstruccionesRecurso';
            }
        } else if (elTipoRecurso == 'Foro') {
            if ($('#editorRecursoInstr').next().find('.ck-editor__editable').html() === '<p><br data-cke-filler="true"></p>') {
                $('#texto_error_instrRec').html('* Este campo es requerido');
                listaErrores[3] = 'InstruccionesRecurso';
            }
        } else if (elTipoRecurso == 'Rúbrica 4x4') {
            if ($('#editorRubricaInstr').next().find('.ck-editor__editable').html() === '<p><br data-cke-filler="true"></p>') {
                $('#texto_error_instrRubrica').html('* Este campo es requerido');
                listaErrores[3] = 'InstruccionesRubrica';
            }
            var cuantosDescriptores = parseInt(elTipoRecurso.split(' ')[1].split('x')[0]);
            log('cuantosDescriptores', cuantosDescriptores);
            var cuantosNiveles = parseInt(elTipoRecurso.split(' ')[1].split('x')[1]);
            log('cuantosNiveles', cuantosNiveles);

            for (a = 1; a <= cuantosDescriptores; a++) {
                if ($('#rubricaDescriptor' + a).val().length <= 0) {
                    $('#texto_error_Rubrica').html('* Revisar campos vacíos');
                    listaErrores[4] = 'RubricaDatos';
                }
                for (b = 1; b <= cuantosNiveles; b++) {
                    if ($('#rubricaNivel_d' + a + '_n' + b).val().length <= 0) {
                        $('#texto_error_Rubrica').html('* Revisar campos vacíos');
                        listaErrores[4] = 'RubricaDatos';
                    }
                }
            }

        } else if (elTipoRecurso == 'Evaluación Opción Múltiple') {
            if ($('#editorEvaOMInstr').next().find('.ck-editor__editable').html() === '<p><br data-cke-filler="true"></p>') {
                $('#texto_error_instrRecEvaOM').html('* Este campo es requerido');
                listaErrores[3] = 'InstruccionesEvaOM';
            }
        } else {
            if ($('#inputZip').val().length <= 0) {
                $('#texto_error_archivoRec').html('* Archivo requerido');
                listaErrores[3] = 'archivoRecurso';
            }
        }
        // imagen no requerida
        // if ($('.uploaded-image>img').attr('src') == undefined) {
        //     $('#texto_error_imagenRec').html('* Imagen requerida');
        //     listaErrores[4] = 'imagenRecurso';
        // }

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
            subirRecurso($("#inputZip")[0]);
        }
    });

    // QUITAR
    // secAgregaRecurso();   


    return $.ajax();
}


function activaLanzarRecursos() {

    for (a = 1; a <= cuantosRecursosVisibles; a++) {
        this['carta_abierta' + a] = false;
        var thar = this;

        $("#botonMasInfo" + a).click(function(event) {
            event.preventDefault();
            var cualCard = $(this).attr('id').substr(12, 3);
            $('#tarjeta' + cualCard).find('.card-desc').slideToggle();
            if (thar['carta_abierta' + cualCard] == false) {
                $(this).html('Menos info <i class="nc-icon-outline arrows-1_minimal-up" style="margin-left: 5px;"></i>');
                thar['carta_abierta' + cualCard] = true;
            } else {
                $(this).html('Más info <i class="nc-icon-outline arrows-1_minimal-down" style="margin-left: 5px;"></i>');
                thar['carta_abierta' + cualCard] = false;
            }
        });
    }

    $(".botonVerRecurso").click(function(event) {
        event.preventDefault();
        var _Pos = $(this).attr('id').indexOf('_');
        var cualRecurso = $(this).attr('id').substr(15, $(this).attr('id').length - (_Pos + 1));

        // QUITAR
        // cualRecurso = '3';

        log('botonVerRecurso', cualRecurso);
        ////////////////
        lanzaObjetoVisualizar(cualRecurso);
        ////////////////
    });



    // QUITAR
    // lanzaObjetoVisualizar('3');
    // $(".botonVerRecurso").click();


    return $.ajax();
}



function secAgregaRecurso() {
    log('secAgregaRecurso');

    $(window).scrollTop(0);
    modoAgregar = true;
    elRecursoIndex = 0;
    elTipoRecurso = '';

    $('#catRecursos').css({
        'display': 'none'
    });
    $('.recursos_int').css({
        'display': 'none'
    });
    $("#secEditarRecurso").css({
        'display': 'block'
    });
    $('.sec_tipo').css({
        'display': 'none'
    });
    $('.recTipoEntrega').css({
        'display': 'none'
    });
    $('.recTipoRubrica').css({
        'display': 'none'
    });


    $("#titulo_modal_recurso").html('Agregar Recurso');
    $("#claveRecurso").val('');
    $("#claveRecurso").prop('disabled', false);
    $("#nombreRecurso").val('');
    $("#duracionRecurso").val('1');
    $(".tipoBoton").html('Selecciona un tipo de Recurso');

    // mensajes de error //
    $('#texto_error_claveRec').html('');
    $('#texto_error_nombreRec').html('');
    // $('#texto_error_descripcionRec').html('');
    $('#texto_error_duracionRec').html('');
    $('#texto_error_tipoRec').html('');
    $('#texto_error_instrRec').html('');
    $('#texto_error_instrRecEvaOM').html('');
    $('#texto_error_archivoRec').html('');
    $('#texto_error_instrRubrica').html('');
    $('#texto_error_Rubrica').html('');
    // $('#texto_error_imagenRec').html('');

    // Editor //
    // $('#editorRecursoDesc').remove();
    // Descripción no necesaria
    // ClassicEditor.create(document.querySelector('#editorRecursoDesc')).then(editor => {
    //     $(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    //     // $('#editorRecursoDesc').next().find(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    // }).catch(error => {
    //     console.error(error);
    // });
    // Descripción no necesaria
    // Editor //

    // Editor //
    // $('#editorRecursoInstr').remove();
    ClassicEditor.create(document.querySelector('#editorRecursoInstr'), {
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
    }).then(editor => {
        $(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
        // $('#editorRecursoInstr').next().find(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    }).catch(error => {
        console.error(error);
    });
    // Editor //

    // Editor Rúbrica //
    // $('#editorRubricaInstr').remove();
    ClassicEditor.create(document.querySelector('#editorRubricaInstr'), {
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
    }).then(editor => {
        $(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
        // $('#editorRubricaInstr').next().find(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    }).catch(error => {
        console.error(error);
    });
    // Editor Rúbrica // 

    // Editor EvaOM //
    // $('#editorEvaOMInstr').remove();
    ClassicEditor.create(document.querySelector('#editorEvaOMInstr'), {
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
    }).then(editor => {
        $(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
        // $('#editorEvaOMInstr').next().find(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    }).catch(error => {
        console.error(error);
    });
    // Editor EvaOM //

    // Tipos de Recurso //
    $('.drpodown_tipo').empty();
    $.getJSON("data/tipos.json", function(result) {
        var options = "";
        $.each(result, function(i, tp) {

            if (tp.tipo != "Selecciona una opción") {
                options += '<li role="option" class="dropdown-item tipoItem"><span class="text" value="' + tp.tipo + '" id="recTipo' + i + '" >' + tp.tipo + '</span></li>';
            }

        });
        $('.drpodown_tipo').append(options);
    });

    $(document).off('click', '.tipoItem').on('click', '.tipoItem', function(event) {
        event.preventDefault();
        var elValue = $(this).find('span').attr('value');
        var elId = $(this).find('span').attr('id');
        $(this).parent().parent().find('.tipoBoton').html(elValue);
        $(this).parent().parent().find('.tipoBoton').attr('id', elId);
        ajustaTipoRecurso(elValue);
    });
    // Tipos de Recurso //

    // QUITAR
    // ajustaTipoRecurso('Evaluación Opción Múltiple');


    // upload image //
    $('.image-uploader').remove();

    $('.input-images').imageUploader({
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
        mimes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
        // preloaded: preloaded,
        imagesInputName: 'imagenRec',
        preloadedInputName: 'imagenRec',
        label: 'Arrastre la imagen aquí o haga clic para buscarla',
        maxSize: 1 * 1024 * 1024,
        maxFiles: 1
    });
    // upload image //
}

function ajustaTipoRecurso(cualTipo) {
    elTipoRecurso = cualTipo;
    log('ajustaTipoRecurso', elTipoRecurso);

    habilitaBoton($('#botonGuardaRecurso'), true);

    switch (elTipoRecurso) {
        case 'SCORM':
            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', '.zip');
                $('.texto_tipo').html('El archivo debe ser en formato <b>zip</b>.<br>El archivo debe pesar máximo 50 Mb.');
                $('.recTipoEntrega').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoArchivo').show();
                $('.sec_tipo').slideDown();
            });
            break;
        case 'PDF':
            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', '.pdf');
                $('.texto_tipo').html('El archivo debe ser en formato <b>pdf</b>.<br>El archivo debe pesar máximo 50 Mb.');
                $('.recTipoEntrega').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoArchivo').show();
                $('.sec_tipo').slideDown();
            });
            break;
        case 'Video':
            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', 'video/*');
                $('.texto_tipo').html('El archivo debe ser en formato <b>mp4</b>.<br>El archivo debe pesar máximo 50 Mb.');
                $('.recTipoEntrega').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoArchivo').show();
                $('.sec_tipo').slideDown();
            });
            break;
        case 'Imagen':
            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', '.jpg,.jpeg,.png');
                $('.texto_tipo').html('El archivo debe ser en formato <b>jpg</b> o <b>png</b>.<br>El archivo debe pesar máximo 50 Mb.');
                $('.recTipoEntrega').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoArchivo').show();
                $('.sec_tipo').slideDown();
            });
            break;
        case 'Audio':
            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', 'audio/*');
                $('.texto_tipo').html('El archivo debe ser en formato <b>mp3</b>.<br>El archivo debe pesar máximo 50 Mb.');
                $('.recTipoEntrega').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoArchivo').show();
                $('.sec_tipo').slideDown();
            });
            break;
        case 'Word':
            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', '.doc,.docx');
                $('.texto_tipo').html('El archivo debe ser en formato <b>doc</b> o <b>docx</b>.<br>El archivo debe pesar máximo 50 Mb.');
                $('.recTipoEntrega').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoArchivo').show();
                $('.sec_tipo').slideDown();
            });
            break;
        case 'PowerPoint':
            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', '.ppt,.pptx');
                $('.texto_tipo').html('El archivo debe ser en formato <b>ppt</b> o <b>pptx</b>.<br>El archivo debe pesar máximo 50 Mb.');
                $('.recTipoEntrega').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoArchivo').show();
                $('.sec_tipo').slideDown();
            });
            break;
            // case 'Pregunta':
            //     $('.texto_tipo').html('');
            //     break;
        case 'Entregable':
            $('.sec_tipo').slideUp("slow", function() {
                $('.recTipoArchivo').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEvaOM').hide();
                $('.recTipoEntrega').show();
                $('.sec_tipo').slideDown();
                activaRadiosEntregables();
            });
            break;
            // case 'Foro':
            //     $('.sec_tipo').slideUp("slow", function() {
            //         $('.recTipoEntrega').slideDown();
            //     });
            //     break;
        case 'Rúbrica 4x4':
            $('.sec_tipo').slideUp("slow", function() {
                $('.recTipoArchivo').hide();
                $('.recTipoEntrega').hide();
                $('.recTipoEvaOM').hide();

                if ($('#laRubrica4x4').is(':empty')) {

                    // creamos rúbricas dinámicas //
                    var cuantosDescriptores = parseInt(elTipoRecurso.split(' ')[1].split('x')[0]);
                    log('cuantosDescriptores', cuantosDescriptores);
                    var cuantosNiveles = parseInt(elTipoRecurso.split(' ')[1].split('x')[1]);
                    log('cuantosNiveles', cuantosNiveles);

                    var elPlaceholder = ['No cumple...', 'Cumple medianamente...', 'Cumple suficientemente...', 'Cumple excelentemente...'];
                    // TODO hacer dinámico
                    var elPuntaje = [10, 15, 20, 25];

                    var elContenidoRubrica4x4 = '';
                    $('#laRubrica4x4').empty();

                    elContenidoRubrica4x4 += '<div class="col-4 col_ch">';
                    elContenidoRubrica4x4 += '  <div>Descriptores:</div>';
                    elContenidoRubrica4x4 += '</div>';
                    elContenidoRubrica4x4 += '<div class="col-8 col_ch">';
                    elContenidoRubrica4x4 += '  <div>Criterios o Niveles:</div>';
                    elContenidoRubrica4x4 += '</div>';
                    elContenidoRubrica4x4 += '<br> <br>';

                    for (a = 1; a <= cuantosDescriptores; a++) {
                        elContenidoRubrica4x4 += '<!-- desriptor ' + a + ' -->';
                        elContenidoRubrica4x4 += '<div class="col-4 col_ch mb-3">';
                        elContenidoRubrica4x4 += '   <textarea id="rubricaDescriptor' + a + '" class="form-control area_editor_simple" placeholder="Descriptor ' + a + '..."></textarea>';
                        // elContenidoRubrica4x4 += '   <span id="texto_error_Descriptor' + a + '" class="texto_error"></span>';
                        elContenidoRubrica4x4 += '</div>';

                        for (b = 1; b <= cuantosNiveles; b++) {

                            elContenidoRubrica4x4 += '<div class="col-2 col_ch mb-3">';
                            elContenidoRubrica4x4 += '   <textarea id="rubricaNivel_d' + a + '_n' + b + '" class="form-control area_editor_simple" placeholder="' + elPlaceholder[(b - 1)] + '"></textarea>';
                            // elContenidoRubrica4x4 += '   <span id="texto_error_d' + a + '_n' + b + '" class="texto_error"></span>';
                            elContenidoRubrica4x4 += '</div>';
                        }
                        elContenidoRubrica4x4 += '<!-- desriptor ' + a + ' -->';
                    }

                    elContenidoRubrica4x4 += '<div class="col-4 col_ch"></div>';
                    for (c = 1; c <= cuantosNiveles; c++) {
                        elContenidoRubrica4x4 += '<div class="col-2 col_ch mt-n2">';
                        elContenidoRubrica4x4 += '  <div id="puntajeTexto' + c + '" class="font-weight-bold">' + elPuntaje[(c - 1)] + ' puntos</div>';
                        elContenidoRubrica4x4 += '</div>';
                    }


                    $('#laRubrica4x4').append(elContenidoRubrica4x4);

                }

                $('.recTipoRubrica').show();
                $('.sec_tipo').slideDown();
            });
            break;
        case 'Evaluación Opción Múltiple':
            // mensajes de error //
            $('#texto_error_archivoEvaOM').html('');

            $('.sec_tipo').slideUp("slow", function() {
                $('._recurso').prop('accept', '.xls,.xlsx');
                $('.texto_tipo').html('El archivo debe ser en formato <b>xlsx</b>.<br>El archivo debe pesar máximo 50 Mb.<br><a href="docs/formato_evaluacion_opcion_multiple.xlsx">Descargar formato de ejemplo <b>aquí</b></a>');
                $('.recTipoArchivo').hide();
                $('.recTipoRubrica').hide();
                $('.recTipoEntrega').hide();
                $('.recTipoEvaOM').show();
                $('.sec_tipo').slideDown();
                activaBotonesEvaOM();
                habilitaBoton($('#botonGuardaRecurso'), false);
            });
            break;

        default:
            break;
    }
}


function activaRadiosEntregables() {
    // tipoDeEntrega = parseInt($('.btn-radio.active').attr('id').substr(20, 2));
    // log('tipoDeEntrega', tipoDeEntrega);

    $(document).off('click', '.btn-radio').on('click', '.btn-radio', function(event) {
        event.preventDefault();

        $('.btn-radio').removeClass('active');
        $(this).addClass('active');

        // if ($(this).hasClass('active')) {
        //     tipoDeEntrega = parseInt($(this).attr('id').substr(20, 2));
        //     log('tipoDeEntrega', tipoDeEntrega);
        // }
    });
}

function activaBotonesEvaOM() {
    log('tipo EvaOM');

    $(document).off('change', '#inputXLSEvaOM').on('change', '#inputXLSEvaOM', function(event) {
        event.preventDefault();
        selectedFile = event.target.files[0];
        log("selectedFile", selectedFile);
        $('#uploadExcelEvaOM').show();
        habilitaBoton($('#botonGuardaRecurso'), false);
    });

    $(document).off('click', '#uploadExcelEvaOM').on('click', '#uploadExcelEvaOM', function(event) {
        event.preventDefault();
        subeEvaOM(selectedFile);
    });

}


function secEditaRecurso(cualRecurso) {
    log('secEditaRecurso', cualRecurso);

    $(window).scrollTop(0);
    modoAgregar = false;
    elRecursoIndex = cualRecurso;

    $('#catRecursos').css({
        'display': 'none'
    });
    $('.recursos_int').css({
        'display': 'none'
    });
    $("#secEditarRecurso").css({
        'display': 'block'
    });


    ajustaTipoRecurso(that_['recursoCategoria' + cualRecurso]);


    $("#titulo_modal_recurso").html('Editar Recurso');
    $("#claveRecurso").val(that_['recursoClave' + cualRecurso]);
    $("#claveRecurso").prop('disabled', true);
    $("#nombreRecurso").val(that_['recursoNombre' + cualRecurso]);
    $("#duracionRecurso").val(that_['recursoDuracion' + cualRecurso]);

    // $(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    // $('#editorRecursoDesc').next().find(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    // $('#editorRecursoDesc').next().find(".ck-editor__editable_inline>p").html('');

    // Editor //
    // Descripción no necesaria
    // ClassicEditor.create(document.querySelector('#editorRecursoDesc')).then(editorRecursoDesc => {
    //     editorRecursoDesc.data.set(that_['recursoDesc' + cualRecurso]);
    // }).catch(error => {
    //     console.error(error);
    // });
    // Descripción no necesaria
    // Editor //

    // Editor //
    ClassicEditor.create(document.querySelector('#editorRecursoInstr'), {
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
    }).then(editorRecursoInstr => {
        editorRecursoInstr.data.set(that_['recursoInstr' + cualRecurso]);
    }).catch(error => {
        console.error(error);
    });
    // Editor //

    // Editor Rúbrica//
    ClassicEditor.create(document.querySelector('#editorRubricaInstr'), {
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
    }).then(editorRubricaInstr => {
        editorRubricaInstr.data.set(that_['recursoInstr' + cualRecurso]);
    }).catch(error => {
        console.error(error);
    });
    // Editor Rúbrica//


    // Tipos de Recurso //
    $('.drpodown_tipo').empty();
    $.getJSON("data/tipos.json", function(result) {
        var options = "";
        $.each(result, function(i, tp) {

            if (tp.tipo != "Selecciona una opción") {
                options += '<li role="option" class="dropdown-item tipoItem"><span class="text" value="' + tp.tipo + '" id="recTipo' + i + '" >' + tp.tipo + '</span></li>';
            }

        });
        $('.drpodown_tipo').append(options);
    });

    $('.tipoBoton').html(that_['recursoCategoria' + cualRecurso]);

    if (that_['recursoCalifManual' + cualRecurso] == true) {
        $('.btn-califManual').addClass('active');
    } else {
        $('.btn-califManual').removeClass('active');
    }


    $(document).off('click', '.tipoItem').on('click', '.tipoItem', function(event) {
        event.preventDefault();
        var elValue = $(this).find('span').attr('value');
        var elId = $(this).find('span').attr('id');
        $(this).parent().parent().find('.tipoBoton').html(elValue);
        $(this).parent().parent().find('.tipoBoton').attr('id', elId);
        ajustaTipoRecurso(elValue);
    });
    // Tipos de Recurso //

    // Tipo de Entrega //
    $('.btn-radio').removeClass('active');
    $('#botonRadioEntregable' + that_['TipoEntrega' + cualRecurso]).addClass('active');
    // Tipo de Entrega //

    // Tipo Rúbrica 4x4 //
    setTimeout(function() {
        if (elTipoRecurso == 'Rúbrica 4x4') {
            var cuantosDescriptores = parseInt(elTipoRecurso.split(' ')[1].split('x')[0]);
            log('cuantosDescriptores', cuantosDescriptores);
            var cuantosNiveles = parseInt(elTipoRecurso.split(' ')[1].split('x')[1]);
            log('cuantosNiveles', cuantosNiveles);

            for (a = 1; a <= cuantosDescriptores; a++) {
                $('#rubricaDescriptor' + a).val(that_['recurso' + a + 'DescriptorTexto' + cualRecurso]);
                for (b = 1; b <= cuantosNiveles; b++) {
                    $('#rubricaNivel_d' + a + '_n' + b).val(that_['recurso' + a + 'Nivel' + b + 'Texto' + cualRecurso]);
                }
            }
        }
    }, 1000);
    // Tipo Rúbrica 4x4 //

    // Tipo de Evaluación OM //       
    // Editor Evaluación OM//
    ClassicEditor.create(document.querySelector('#editorEvaOMInstr'), {
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
    }).then(editorEvaOMInstr => {
        editorEvaOMInstr.data.set(that_['recursoInstr' + cualRecurso]);
    }).catch(error => {
        console.error(error);
    });
    // Editor Evaluación OM//

    if (that_['recursoPregAleatorias' + cualRecurso] == true) {
        $('#pregAleatoriasEvaOM').addClass('active');
    }
    if (that_['recursoRespAleatorias' + cualRecurso] == true) {
        $('#respAleatoriasEvaOM').addClass('active');
    }
    if (that_['recursoPregScroll' + cualRecurso] == true) {
        $('#pregScrollEvaOM').addClass('active');
    }
    if (that_['recursoRespEnPantalla' + cualRecurso] == true) {
        $('#respPantallaEvaOM').addClass('active');
    }
    $('#numReactivosEvaOM').val(that_['recursoTotalReactivos' + cualRecurso]);
    $('#minAprobatorioEvaOM').val(that_['recursoMinimoAprobatorio' + cualRecurso]);
    $('#numIntentosEvaOM').val(that_['recursoIntentos' + cualRecurso]);
    $('#tiempoMaxEvaOM').val(that_['recursoTiempoLimite' + cualRecurso]);

    // Tipo de Evaluación OM //


    // upload image //
    // let preloaded_img = [{
    //     id: 1,
    //     src: that_['recursoPortada' + cualRecurso]
    // }, ];

    // $('.image-uploader').remove();

    // $('.input-images').imageUploader({
    //     extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
    //     mimes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
    //     preloaded: preloaded_img,
    //     imagesInputName: 'imagenRec',
    //     preloadedInputName: 'imagenRec',
    //     label: 'Arrastre la imagen aquí o haga clic para buscarla',
    //     maxSize: 1 * 1024 * 1024,
    //     maxFiles: 1
    // });
    // upload image //

}


function subeEvaOM(selectedFile) {

    var formatoOK = false;
    // var formato1OK = false;
    // var formato2OK = false;
    let jsonObject;
    // let jsonObject1;
    // let jsonObject2;
    let jsonObjectFull = new Object;
    let laCorrecta = '1';

    if (selectedFile) {
        log("subeEvaOM");

        $('#uploadExcelEvaOM').hide();

        var fileReader = new FileReader();
        fileReader.onload = function(event) {
            var data = event.target.result;

            var workbook = XLSX.read(data, {
                type: "binary",
            });
            workbook.SheetNames.forEach((sheet) => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                log("rowObject", rowObject);

                // se valida el formato primera parte
                // if (sheet == 'parametros') {
                //     laSheet1 = sheet;
                //     jsonObject1 = rowObject;
                //     log("jsonObject1", sheet, jsonObject1);
                //     log("Object.keys(jsonObject1).length", Object.keys(jsonObject1).length);

                //     for (a = 0; a < Object.keys(rowObject).length; a++) {
                //         if (
                //             rowObject[a].nombre &&
                //             rowObject[a].instrucciones &&
                //             rowObject[a].retroBien &&
                //             rowObject[a].retroMal
                //         ) {
                //             formato1OK = true;
                //         }
                //         log("formato1 OK", a, formato1OK);
                //     }
                // }

                // se valida el formato segunda parte
                // if (sheet == 'reactivos') {
                //     laSheet2 = sheet;
                //     jsonObject2 = rowObject;
                //     log("jsonObject2", sheet, jsonObject2);
                //     log("Object.keys(jsonObject2).length", Object.keys(jsonObject2).length);

                //     jsonObject2 = new Object;
                //     jsonObject2[sheet] = {};

                //     for (a = 0; a < Object.keys(rowObject).length; a++) {
                //         if (
                //             rowObject[0].pregunta
                //         ) {
                //             // jsonObject2[sheet] = {};
                //             jsonObject2[sheet]['reactivo_' + (a + 1)] = {};
                //             jsonObject2[sheet]['reactivo_' + (a + 1)] = rowObject[a];
                //             // delete rowObject[a];

                //             formato2OK = true;
                //         }
                //         log("formato2 OK", a, formato2OK);
                //     }
                //     log('jsonObject2', jsonObject2);
                // }

                // se valida el formato única parte
                // if (sheet == 'reactivos') {

                jsonObject = rowObject;
                log("jsonObject", sheet, jsonObject);
                log("Object.keys(jsonObject).length", Object.keys(jsonObject).length);

                jsonObject = new Object;
                // jsonObject[sheet] = {};
                jsonObject = {};

                for (a = 0; a < Object.keys(rowObject).length; a++) {
                    if (
                        rowObject[0].pregunta
                    ) {
                        // jsonObject[sheet] = {};
                        // jsonObject[sheet]['reactivo_' + (a + 1)] = {};
                        // jsonObject[sheet]['reactivo_' + (a + 1)] = rowObject[a];
                        // jsonObject[sheet]['reactivo_' + (a + 1)].correcta = laCorrecta;
                        jsonObject['reactivo_' + (a + 1)] = {};
                        jsonObject['reactivo_' + (a + 1)] = rowObject[a];
                        jsonObject['reactivo_' + (a + 1)].correcta = laCorrecta;
                        // delete rowObject[a];

                        formatoOK = true;
                    }
                    log("formato OK", a, formatoOK);
                }
                log('jsonObject', jsonObject);
                // }

            });

            // if (formato1OK && formato2OK) {
            if (formatoOK) {

                delete rowObject;
                // jsonObject1 = JSON.stringify(jsonObject1);
                // jsonObject2 = JSON.stringify(jsonObject2);
                jsonObject = JSON.stringify(jsonObject);
                // jsonObjectFull = (jsonObject1 + ',' + jsonObject2);
                jsonObjectFull = jsonObject;
                // log('jsonObjectFull', jsonObjectFull);

                let jsonObjectResult;

                function reemplaza() {
                    jsonObjectResult = jsonObjectFull;
                    jsonObjectResult = jsonObjectResult.replaceAll('[{', '{');
                    jsonObjectResult = jsonObjectResult.replaceAll('}]', '}');
                    jsonObjectResult = jsonObjectResult.replaceAll('}},{', '},');
                    jsonObjectResult = jsonObjectResult.replaceAll('},{', ',');
                    jsonObjectResult = jsonObjectResult.replaceAll('"true"', 'true');
                    jsonObjectResult = jsonObjectResult.replaceAll('"false"', 'false');

                    log('jsonObjectResult', jsonObjectResult);
                    jsonEvaOM = JSON.parse(jsonObjectResult);
                    log('jsonEvaOM', jsonEvaOM);
                }
                reemplaza();


                $('#modalEvaOM').modal({
                    transition: 'scale'
                }).modal('show');
                $('#texto_error_archivoEvaOM').html('');
                habilitaBoton($('#botonGuardaRecurso'), true);
                $(document).off('click', '#botonOKGpoUsuarios').on('click', '#botonOKGpoUsuarios', function(e) {});

            } else {
                $('#texto_error_archivoEvaOM').html('* El formato no es correcto');
                $('#uploadExcelEvaOM').show();
                habilitaBoton($('#botonGuardaRecurso'), false);
            }
            // document.getElementById("jsonData").innerHTML = jsonObjectResult;


        };
        fileReader.readAsBinaryString(selectedFile);

    } else {

        $('#texto_error_archivoEvaOM').html('* El formato no es correcto');
        $('#uploadExcelEvaOM').show();
        habilitaBoton($('#botonGuardaRecurso'), false);

    }
}


function regresaRecursos() {

    $('#texto_error_claveRec').html('');
    $('#texto_error_nombreRec').html('');
    // $('#texto_error_descripcionRec').html('');
    $('#texto_error_duracionRec').html('');
    $('#texto_error_tipoRec').html('');
    $('#texto_error_instrRec').html('');
    $('#texto_error_instrRecEvaOM').html('');
    $('#texto_error_archivoRec').html('');
    $('#texto_error_instrRubrica').html('');
    $('#texto_error_Rubrica').html('');
    // $('#texto_error_imagenRec').html('');

    log('elTipoRecurso', elTipoRecurso);

    if (elTipoRecurso == 'Rúbrica 4x4') {
        var cuantosDescriptores = parseInt(elTipoRecurso.split(' ')[1].split('x')[0]);
        // log('cuantosDescriptores', cuantosDescriptores);
        var cuantosNiveles = parseInt(elTipoRecurso.split(' ')[1].split('x')[1]);
        // log('cuantosNiveles', cuantosNiveles);

        for (a = 1; a <= cuantosDescriptores; a++) {
            $('#rubricaDescriptor' + a).val('');
            for (b = 1; b <= cuantosNiveles; b++) {
                $('#rubricaNivel_d' + a + '_n' + b).val('');
            }
        }
    }

    if (elTipoRecurso == 'Evaluación Opción Múltiple') {
        $('#pregAleatoriasEvaOM').removeClass('active');
        $('#respAleatoriasEvaOM').removeClass('active');
        $('#pregScrollEvaOM').removeClass('active');
        $('#respPantallaEvaOM').removeClass('active');
        $('#numReactivosEvaOM').val('0');
        $('#minAprobatorioEvaOM').val('80');
        $('#numIntentosEvaOM').val('0');
        $('#tiempoMaxEvaOM').val('0');
    }


    // $('.recursos_int').css({
    //     'display': 'block'
    // });
    $('#catRecursos').css({
        'display': 'block'
    });
    $("#secEditarRecurso").css({
        'display': 'none'
    });

    // Editor //
    $('.ck-editor').remove();

    // upload image //
    $('.image-uploader').remove();

    $('#inputZip').prop('type', 'text');
    $('#inputZip').prop('type', 'file');
    $('#inputXLS').prop('type', 'text');
    $('#inputXLS').prop('type', 'file');

    cuentaRecursos();

}


// menús verticales //
// function abreMenuRecursos() {
//     $('#menu_add_recurso').fadeIn('fast');
// }

// function cierraMenuRecursos() {
//     $(".menu_recursos").fadeOut('fast');
// }

// $(document).on('mouseup', 'body *', function(e) {
//     if (!$(".menu_recursos").is(e.target) && !$('.btn-menu_neutral').is(e.target)) {
//         cierraMenuRecursos();
//     }
//     if (!$(".menu_recursos").is(e.target) && !$('.btn-menu_blanco').is(e.target)) {
//         cierraMenuRecursos();
//     }
// });
// menús verticales //


function lanzaObjetoVisualizar(cualContenido) {
    log('lanzaObjetoVisualizar', cualContenido);

    $("#modalVerRecurso_body").empty();
    var elContenido = '';
    // elContenidoLanzado = true;

    var laLiga = that_['recursoLiga' + cualContenido];
    log('laLiga', laLiga);
    log('Categoria', that_['recursoCategoria' + cualContenido]);

    switch (that_['recursoCategoria' + cualContenido]) {

        case 'SCORM':

            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            break;

        case 'Audio':

            setTimeout(function() {
                elContenido += '<div name="curso" id="curso" style="width:100%; height:100%; background-color: #000000;">';
                elContenido += '<audio id="elAudio" style="display: flex; width:50%; height:50%; margin-left: auto; margin-right: auto;" autobuffer controls autoplay controlsList="nodownload">';
                elContenido += '<source src="' + laLiga + '" type="audio/mpeg" />';
                elContenido += '</audio>';
                elContenido += '</div>';

                $("#modalVerRecurso_body").html(elContenido);
            }, 500);

            break;

        case 'Imagen':

            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            break;

        case 'PDF':

            elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            elContenido += '<embed src="' + laLiga + '" width="100%" height="100%"></embed>';
            // elContenido += '<object src="' + laLiga + '" width="100%" height="100%"></object>';
            elContenido += '</div>';

            $("#modalVerRecurso_body").html(elContenido);

            break;

        case 'Video':

            // $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="' + laLiga + '" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            elContenido += '<div name="curso" id="curso" style="background-color: #000000;">';
            elContenido += '<video id="elVideo" style="width:100%; height:100%;" autobuffer controls autoplay controlsList="nodownload">';
            elContenido += '<source src="' + laLiga + '" type="video/mp4" />';
            elContenido += '</video>';
            elContenido += '</div>';

            $("#modalVerRecurso_body").html(elContenido);

            break;

        case 'Word':

            var laRutaCrecLms = 'https://campusdigital360.com/lms/';
            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laRutaCrecLms + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;

        case 'PowerPoint':

            var laRutaCrecLms = 'https://campusdigital360.com/lms/';
            $("#modalVerRecurso_body").html('<iframe name="curso" id="curso" src="https://docs.google.com/gview?url=' + laRutaCrecLms + laLiga + '&embedded=true" frameborder="0" scrolling="yes" border="0" style="display: block; height: 100vh; width: 100vw; width:100%; height:100%;"></iframe>');

            // elContenido += '<div name="curso" id="curso" style="width:100%; height:100%;">';
            // elContenido += '<img  id="laImagen" src="' + laLiga + '">';
            // elContenido += '</div>';

            break;

        case 'Entregable':

            // elContenido += '<br> <br>';
            elContenido += '<div class="row">';
            elContenido += '<div class="col-11" style="margin: 0 auto;">';
            elContenido += '<div class="titulo_label">';
            // elContenido += '   <h6 class="input_label">' + that_['recursoDesc' + cualContenido] + '</h6>';
            // elContenido += '<br>';
            elContenido += '   <p class="texto">' + that_['recursoInstr' + cualContenido] + '</p>';
            elContenido += '<br> <br>';
            elContenido += '   <p class="texto">Agrega tus comentarios:</p>';
            elContenido += '<textarea id="editorRecursoEntregable" name="content" class="area_editor"></textarea>';
            elContenido += '<br> <br>';
            elContenido += '   <p class="texto">Sube tu archivo aquí:</p>';
            elContenido += '   <form id="formZipEntregable" class="input_archivo _recurso" method="post" enctype="multipart/form-data">';
            elContenido += '       <input id="inputZipEntregable" type="file" class="_recurso" accept=".doc,.docx,.ppt,.pptx,.pdf" style="width: 100%; padding: 30px;" disabled="disabled">';
            elContenido += '   </form>';
            elContenido += '</div>';
            elContenido += '<br> <br>';

            elContenido += '<div class="col-12 text-right">';
            elContenido += '    <span id="texto_error_Curso" class="texto_error"></span>';
            // elContenido += '    <button id="botonCancelarCurso" class="btn btn-naranja btn-round ml-auto">Cancelar</button>';
            elContenido += '    <button id="botonEnviarEntregable" class="btn btn-verde2 btn-round ml-auto" disabled="disabled">Enviar tarea</button>';
            elContenido += '</div>';

            elContenido += '</div>';
            elContenido += '</div>';


            $("#modalVerRecurso_body").html(elContenido);

            ClassicEditor.create(document.querySelector('#editorRecursoEntregable'), {
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
            }).then(editorRecursoEntregable => {
                // editorRecursoEntregable.data.set('hola');
            }).catch(error => {
                console.error(error);
            });

            // $(document).off('click', '#botonEnviarEntregable').on('click', '#botonEnviarEntregable', function(event) {
            //     event.preventDefault();
            //     log('EnviarEntregable', cualContenido);
            //     subirEntregable(cualContenido);
            // });

            break;

        case 'Rúbrica 4x4':

            // creamos rúbrica dinámica //
            var cuantosDescriptores = parseInt(that_['recursoCategoria' + cualContenido].split(' ')[1].split('x')[0]);
            log('cuantosDescriptores', cuantosDescriptores);
            var cuantosNiveles = parseInt(that_['recursoCategoria' + cualContenido].split(' ')[1].split('x')[1]);
            log('cuantosNiveles', cuantosNiveles);


            // var elContenido = '';
            $('#modalVerRecurso_body').empty();


            elContenido += '<br>';
            elContenido += '<div class="row">';
            elContenido += '<div class="col-11" style="margin: 0 auto;">';
            // elContenido += '<div class="titulo_label">';
            // elContenido += '<h6 class="input_label">Instrucciones</h6>';
            elContenido += '   <div class="areaRubricaInstrucciones">' + that_['recursoInstr' + cualContenido] + '</div>';
            // elContenido += '</div>';
            elContenido += '</div>';
            elContenido += '</div>';
            elContenido += '<br>';

            elContenido += '<div class="row row_ch">';
            elContenido += '<div class="col-10 div_centrado">';


            for (a = 1; a <= cuantosDescriptores; a++) {
                elContenido += '<div id="laRubricaDescriptor' + a + '" class="div_flex">';
                elContenido += '<div class="tarjeta_rubrica tarjeta_rubrica_desc">' + that_['recurso' + a + 'DescriptorTexto' + cualContenido] + '</div>';

                for (b = 1; b <= cuantosNiveles; b++) {
                    elContenido += '   <div id="laRubrica_d' + a + '_n' + b + '" class="tarjeta_rubrica tarjeta_rubrica_nivel d-flex flex-column">';
                    elContenido += '        <div class="icono_no_seleccionado"></div>';
                    elContenido += '         <div class="icono_seleccionado">';
                    elContenido += '            <i class="nc-icon-outline ui-1_check"></i>';
                    elContenido += '         </div>';
                    elContenido += '         <div class="tarjeta_rubrica_nivel_txt">' + that_['recurso' + a + 'Nivel' + b + 'Texto' + cualContenido] + '</div>';
                    elContenido += '        <div class="tarjeta_rubrica_nivel_pts">' + that_['recursoNivel' + b + 'Puntos' + cualContenido] + ' puntos</div>';
                    elContenido += '   </div>';
                }

                elContenido += '   </div>';

            }

            // elContenido += '<div class="col-4 col_ch"></div>';
            // for (c = 1; c <= cuantosNiveles; c++) {
            //     elContenido += '<div class="col-2 col_ch mt-n2">';
            //     elContenido += '  <div class="font-weight-bold">' + that_['recursoNivel' + c + 'Puntos' + cualContenido] + ' puntos</div>';
            //     elContenido += '</div>';
            // }


            elContenido += '</div>';
            elContenido += '</div>';

            $("#modalVerRecurso_body").html(elContenido);


            activaTarjetasRubrica();

            break;


        case 'Evaluación Opción Múltiple':

            // var elContenido = '';
            $('#modalVerRecurso_body').empty();

            elContenido += '<br>';
            elContenido += '<div class="row modalVerRecurso_centrado_vert">';
            elContenido += '    <div class="col-10 div_centrado2">';

            elContenido += '        <div id="evaOMParte1" class="evaOMParte1"style="display: none;"></div>';
            elContenido += '        <div id="evaOMParte2" class="evaOMParte2"style="display: none;"></div>';
            elContenido += '        <div id="evaOMParte3" class="evaOMParte3"style="display: none;"></div>';

            elContenido += '    </div>';

            elContenido += '</div>';

            $("#modalVerRecurso_body").html(elContenido);

            activaEvaluacionOM('nada', parseInt(cualContenido), 'nada');

            break;


            // case 'Foro':

            //     // elContenido += '<br> <br>';
            //     elContenido += '<div class="row">';
            //     elContenido += '<div class="col-11" style="margin: 0 auto;">';
            //     elContenido += '<div class="titulo_label">';
            //     // elContenido += '   <h6 class="input_label">' + that_['recursoDesc' + cualContenido] + '</h6>';
            //     // elContenido += '<br>';
            //     elContenido += '   <p class="texto">' + that_['recursoInstr' + cualContenido] + '</p>';
            //     elContenido += '<br> <br>';
            //     elContenido += '   <p class="texto">Agrega tus comentarios:</p>';

            //     elContenido += '<textarea id="editorRecursoForo" name="content" class="area_editor"></textarea>';

            //     elContenido += '</div>';
            //     elContenido += '<br> <br>';

            //     elContenido += '<div class="col-12 text-right">';
            //     elContenido += '    <span id="texto_error_Curso" class="texto_error"></span>';
            //     // elContenido += '    <button id="botonCancelarCurso" class="btn btn-naranja btn-round ml-auto">Cancelar</button>';
            //     elContenido += '    <button id="botonEnviarForo" class="btn btn-verde2 btn-round ml-auto" disabled="disabled">Enviar comentario</button>';
            //     elContenido += '</div>';

            //     elContenido += '</div>';
            //     elContenido += '</div>';


            //     $("#modalVerRecurso_body").html(elContenido);

            //     ClassicEditor.create(document.querySelector('#editorRecursoForo'), {
            //         toolbar: [
            //             'undo',
            //             'redo',
            //             'bold',
            //             'italic',
            //             'link',
            //             'bulletedList',
            //             'numberedList',
            //         ],
            //         link: {
            //             addTargetToExternalLinks: true
            //         }
            //     }).then(editorRecursoForo => {
            //         // editorRecursoForo.data.set('hola');
            //     }).catch(error => {
            //         console.error(error);
            //     });

            //     // $(document).off('click', '#botonEnviarEntregable').on('click', '#botonEnviarEntregable', function(event) {
            //     //     event.preventDefault();
            //     //     log('EnviarEntregable', cualContenido);
            //     //     subirEntregable(cualContenido);
            //     // });

            //     break;

        default:
            break;

    }

    $("#objetoTitulo").text(that_['recursoNombre' + cualContenido]);



    function activaTarjetasRubrica() {

        for (a = 1; a <= cuantosDescriptores; a++) {

            $(document).off('click', '#laRubricaDescriptor' + a + '>.tarjeta_rubrica_nivel').on('click', '#laRubricaDescriptor' + a + '>.tarjeta_rubrica_nivel', function(event) {
                event.preventDefault();

                $(this).parent().find('.tarjeta_rubrica_nivel').removeClass('tarjetaSeleccionada');
                $(this).parent().find('.icono_seleccionado').css({
                    'opacity': '0'
                });
                $(this).parent().find('.tarjeta_rubrica_nivel_pts').css({
                    'color': '#8594ab'
                });

                if (!$(this).hasClass('tarjetaSeleccionada')) {
                    $(this).addClass('tarjetaSeleccionada');
                    $(this).find('.icono_seleccionado').css({
                        'opacity': '1'
                    });
                    $(this).find('.tarjeta_rubrica_nivel_pts').css({
                        'color': '#fff'
                    });
                }

                // if ($(this).hasClass('active')) {
                //     tipoDeEntrega = parseInt($(this).attr('id').substr(20, 2));
                //     log('tipoDeEntrega', tipoDeEntrega);
                // }
            });

        }

    }


    ///////////////////////
    ajustaEscalaContenidoVer();
    setTimeout(function() {
        detectaUnloadVerRec();
    }, 300);

}



function cierraContenidoRecurso() {

    $('#modalVerRecurso').on('hide.bs.modal', function() {
        $("#modalVerRecurso_body").empty();
    });

}



function detectaUnloadVerRec() {

    $('#modalVerRecurso').on('hide.bs.modal', function() {
        $("#modalVerRecurso_body").empty();
    });

    // if (elContenidoLanzado == true) {
    //     $("#content").bind('DOMNodeRemoved', function(event) {
    //         log('unload!');

    //         registraRevisado();
    //         elContenidoLanzado = false;
    //         habilitaBoton($('#botonCerrar'), true);
    //         $('#barra_player').hide();
    //         $('.panel-header').show();
    //         ajustaEscalaContenido();
    //         $("#content").unbind();
    //     });
    // }
}


function ajustaEscalaContenidoVer() {

    elAncho = $(window).width();
    elAlto = $(window).height();
    // log('elAncho', elAncho, 'y elAlto', elAlto);

    // if (elContenidoLanzado == true) {
    $("#modalVerRecursoContent").css({
        'height': (elAlto - 50) + 'px',
        'width': (elAncho - 50) + 'px'
    });
    $("#modalVerRecursoDialog").css({
        'margin-left': '30px'
    });
    // }

    $("#elVideo").css({
        'height': (elAlto - 165) + 'px',
        'width': (elAncho - 80) + 'px'
    });

}

function ajustaEscalaContenido() {

    elAlto = $(window).height();
    elAncho = $(window).width();

    if (elContenidoLanzado == true) {
        $("#content").css({
            'height': (elAlto - 18) + 'px'
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

    ajustaEscalaContenidoVer();

});