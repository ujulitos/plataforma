var SCORM_ver = '1.2';
var SCORM_passed = 'passed';
var SCORM_failed = 'failed';
var valorCompleted = 'completed';

var laEvaOMNombre;
var laEvaOMInstrucciones;
var laEvaOMReactivos;
var laEvaOMPregAleatorias;
var laEvaOMRespAleatorias;
var laEvaOMPregScroll;
var laEvaOMMinimoAprobatorio;
var cuantosReactivos;
var lasSeleccionadas = new Array();
var lasCorrectas = new Array();

function activaEvaluacionOM(cualKey, cualContenido, callBack) {
    log('activaEvaluacionOM', cualKey, cualContenido, callBack);

    laEvaOMNombre = that_['recursoNombre' + cualContenido];
    laEvaOMInstrucciones = that_['recursoInstr' + cualContenido];
    laEvaOMReactivos = that_['losReactivos' + cualContenido];
    laEvaOMPregAleatorias = that_['recursoPregAleatorias' + cualContenido];
    laEvaOMRespAleatorias = that_['recursoRespAleatorias' + cualContenido];
    laEvaOMPregScroll = that_['recursoPregScroll' + cualContenido];
    laEvaOMMinimoAprobatorio = that_['recursoMinimoAprobatorio' + cualContenido];


    if (callBack == 'aplicaEvaluacionOM') {
        buscaEvaluacionOM(cualKey);
    } else {
        aplicaEvaluacionOM(false);
    }

}


function buscaEvaluacionOM(cualKey) {
    log('buscaEvaluacionOM', cualKey);

    // var cuantasRubricas = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/' + cualKey).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                log('snapshot.val()', snapshot.val());

                laEvaOMId = snapshot.val().Id;
                log('laEvaOMId', laEvaOMId);
                laEvaOMNombre = snapshot.val().Nombre;
                log('laEvaOMNombre', laEvaOMNombre);
                laEvaOMCategoria = snapshot.val().Categoria;
                log('laEvaOMCategoria', laEvaOMCategoria);
                laEvaOMInstrucciones = snapshot.val().Instrucciones;
                log('laEvaOMInstrucciones', laEvaOMInstrucciones);
                laEvaOMIntentos = snapshot.val().Intentos;
                log('laEvaOMIntentos', laEvaOMIntentos);
                laEvaOMPregAleatorias = snapshot.val().PregAleatorias;
                log('laEvaOMPregAleatorias', laEvaOMPregAleatorias);
                laEvaOMRespAleatorias = snapshot.val().RespAleatorias;
                log('laEvaOMRespAleatorias', laEvaOMRespAleatorias);
                laEvaOMPregScroll = snapshot.val().PregScroll;
                log('laEvaOMPregScroll', laEvaOMPregScroll);
                laEvaOMRespEnPantalla = snapshot.val().RespEnPantalla;
                log('laEvaOMRespEnPantalla', laEvaOMRespEnPantalla);
                laEvaOMTiempoLimite = snapshot.val().TiempoLimite;
                log('laEvaOMTiempoLimite', laEvaOMTiempoLimite);
                laEvaOMMinimoAprobatorio = snapshot.val().MinimoAprobatorio;
                log('laEvaOMMinimoAprobatorio', laEvaOMMinimoAprobatorio);
                laEvaOMTotalReactivos = snapshot.val().TotalReactivos;
                log('laEvaOMTotalReactivos', laEvaOMTotalReactivos);

                laEvaOMReactivos = snapshot.child('Reactivos').val();
                log('laEvaOMReactivos', laEvaOMReactivos);


                log('Se han leído todos los keys');
                return aplicaEvaluacionOM(true);

            }
        });
    }
}



function aplicaEvaluacionOM(elContenidoLanzado) {
    log('aplicaEvaluacionOM', elContenidoLanzado);

    // evaOMParte1 //

    var evaContenido = '';
    $('#evaOMParte1').empty();

    evaContenido += '<h2 class="texto_centrado texto_bold" style="margin-bottom: -10px;">' + laEvaOMNombre + '</h2>';
    evaContenido += '<h5 class="texto_centrado">' + laEvaOMInstrucciones + '</h5>';
    // evaContenido += '<br>';
    evaContenido += '<div class="texto_centrado">';
    evaContenido += '   <div id="botonComenzar" class="btn btn-naranja ok btn-round">Empezar</div>';
    evaContenido += '</div>'

    $('#evaOMParte1').append(evaContenido);
    $('#evaOMParte1').fadeIn();


    $(document).off('click', '#botonComenzar').on('click', '#botonComenzar', function(event) {
        event.preventDefault();
        $('#evaOMParte1').fadeOut(100, function() {
            $('#evaOMParte2').fadeIn();
        });

        // pintaEvaluacion();
    });

    // evaOMParte1 //



    // evaOMParte2 //

    var evaOM = new Object;
    evaOM = laEvaOMReactivos;
    log('evaOM', evaOM);

    cuantosReactivos = Object.keys(evaOM).length;
    log("cuantosReactivos", cuantosReactivos);

    var preguntasRandom = new Array();
    if (laEvaOMPregAleatorias == true) {
        preguntasRandom = noRepRandom(cuantosReactivos);
    } else {
        for (a = 1; a <= cuantosReactivos; a++) {
            preguntasRandom.push(a);
        }
    }

    for (a = 1; a <= cuantosReactivos; a++) {
        this['lasRespuestas' + a] = new Array();
        this['lasRespuestas' + a] = Object.keys(evaOM['reactivo_' + preguntasRandom[(a - 1)]]);

        // log("cuantasRespuestas", $.inArray('pregunta', Object.keys(evaOM['reactivo_' + preguntasRandom[(a - 1)]])));
        this['lasRespuestas' + a] = this['lasRespuestas' + a].filter(resp => resp != 'pregunta');
        this['lasRespuestas' + a] = this['lasRespuestas' + a].filter(resp => resp != 'correcta');
        // this['lasRespuestas' + a] = this['lasRespuestas' + a].split('respuesta')[1];

        if (laEvaOMRespAleatorias == true) {
            this['lasRespuestas' + a] = noRepRandom(this['lasRespuestas' + a].length);
        } else {
            for (b = 1; b <= this['lasRespuestas' + a].length; b++) {
                this['lasRespuestas' + a][(b - 1)] = parseInt(this['lasRespuestas' + a][(b - 1)].split('respuesta')[1]);
                // log("lasRespuestas", a, this['lasRespuestas' + a]);
            }
        }
    }


    var aciertos = 0;
    var minimo = laEvaOMMinimoAprobatorio;
    // log("minimo", minimo);
    var thatE = this;


    function validaRadios(obj) {
        log('validaRadios');

        var cualPregunta = parseInt(obj.name.substr(4, 2));
        var seleccionada = parseInt(obj.value);
        lasSeleccionadas[(cualPregunta - 1)] = seleccionada;
        var laCorrecta = lasCorrectas[(cualPregunta - 1)];
        log('Pregunta', cualPregunta, 'correcta', laCorrecta);

        habilitaBoton($('#botonCalificar'), true);
        habilitaBoton($('#botonEnviar'), true);

        $("input:radio").each(function() {
            var name = $(this).attr("name");
            if ($("input:radio[name=" + name + "]:checked").length == 0) {
                habilitaBoton($('#botonCalificar'), false);
            }
        });
    }

    function evalua() {
        var contador = 0;

        for (a = 1; a <= cuantosReactivos; a++) {
            contador++;

            $("input:radio[name=resp" + a + "]").prop("disabled", true);
            for (b = 1; b <= thatE['lasRespuestas' + a].length; b++) {
                $('#label' + a + '_' + b).css({
                    'cursor': 'default'
                });
            }

            log('contador', contador, 'correcta', lasSeleccionadas[(contador - 1)]);

            if (lasSeleccionadas[(contador - 1)] == lasCorrectas[(contador - 1)]) {
                aciertos++;
                $('#label' + contador + '_' + lasSeleccionadas[(contador - 1)]).removeClass('resp_seleccionada').addClass('resp_correcta');
                $('#label' + contador + '_' + lasSeleccionadas[(contador - 1)] + '>i').addClass('nc-icon-outline ui-1_check').css({
                    'color': '#2e7d32'
                });
            } else {
                $('#label' + contador + '_' + lasSeleccionadas[(contador - 1)]).removeClass('resp_seleccionada').addClass('resp_incorrecta');
                $('#label' + contador + '_' + lasSeleccionadas[(contador - 1)] + '>i').addClass('nc-icon-outline ui-1_simple-remove').css({
                    'color': '#dd2c00'
                });
            }
        }


        var puntuacion = Math.round((aciertos / cuantosReactivos) * 100);
        log("puntuacion:", puntuacion);


        habilitaBoton($('#botonTerminar'), true);

        $('#botonTerminar').click(function() {
            $('#evaOMParte2').fadeOut(100, function() {
                // $('#evaOMParte3').fadeIn();
                pintaFinalEvaOM(puntuacion);
            });
        });


        if (elContenidoLanzado) {

            // set("cmi.core.score.raw", puntuacion);
            // var success = save();
            // if (!success) {}

            // if (puntuacion >= minimo) {
            // set("cmi.core.lesson_status", "passed");
            // var success = save(); 

            // Swal.fire({
            //     title: "Muy bien",
            //     type: "success",
            //     showCancelButton: false,
            //     // showconfirmButton: false,
            //     html: '¡Muy bien! <br> Has aprobado la Evaluación. <br><br> Tu calificación es de: <b>' + puntuacion + '%</b> <br> <div class="actions text-center"><div id="botonCerrarModalEvaOM" class="btn btn-naranja cancel btn-round" style="margin-right: 20px;">Cerrar<i class="nc-icon-outline ui-1_simple-remove" style="padding-left: 5px;"></i></div></div>'
            // });
            // $(document).off('click', '#botonCerrarModalEvaOM').on('click', '#botonCerrarModalEvaOM', function(event) {
            //     event.preventDefault();
            //     swal.close();
            // });

            // } else {
            // set("cmi.core.lesson_status", "completed");
            // var success = save();
            // set("cmi.core.lesson_status", "failed");
            // var success = save();

            // Swal.fire({
            //     title: "Mal",
            //     type: "error",
            //     showCancelButton: false,
            //     // showconfirmButton: false,
            //     html: 'No has aprobado la Evaluación. <br> Tu calificación es de: <b> ' + puntuacion + '%</b> <br> Esfuérzate más. <br><br> <div class="actions text-center"><div id="botonCerrarModalEvaOM" class="btn btn-naranja cancel btn-round" style="margin-right: 20px;">Cerrar<i class="nc-icon-outline ui-1_simple-remove" style="padding-left: 5px;"></i></div></div>'
            // });
            // $(document).off('click', '#botonCerrarModalEvaOM').on('click', '#botonCerrarModalEvaOM', function(event) {
            //     event.preventDefault();
            //     swal.close();
            // });

            // }


            /////////////////////////
            guardaResultados(puntuacion, minimo);
            /////////////////////////     

        }
    }

    function siguientePregunta() {


    }


    var contadorP = 0;
    var contadorR = 0;
    var evaContenido = '';

    $('#evaOMParte2').empty();

    // si son todas las preguntas en pantalla
    if (laEvaOMPregScroll) {

        for (a = 1; a <= cuantosReactivos; a++) {
            contadorP++;

            evaContenido += '<a class="encabezado">' + contadorP + ' - </a>';
            evaContenido += evaOM['reactivo_' + preguntasRandom[(contadorP - 1)]].pregunta;
            evaContenido += '<br><br>';
            evaContenido += '<ul>';

            for (b = 1; b <= thatE['lasRespuestas' + a].length; b++) {
                contadorR = thatE['lasRespuestas' + a][(b - 1)];

                evaContenido += '<input type="radio" name="resp' + contadorP + '" id="r' + contadorP + '_' + contadorR + '" value="' + contadorR + '" />';
                evaContenido += '<label id="label' + contadorP + '_' + contadorR + '" style="display:inline-table;" for="r' + contadorP + '_' + contadorR + '">';
                evaContenido += evaOM['reactivo_' + preguntasRandom[(contadorP - 1)]]['respuesta' + contadorR];
                evaContenido += '<i class="mdi" style="padding:10px;"></i></label>';
                evaContenido += '<br>';
            }

            evaContenido += '</ul>';

            lasCorrectas[(contadorP - 1)] = parseInt(evaOM['reactivo_' + preguntasRandom[(contadorP - 1)]].correcta);
        }


        evaContenido += '<div id="botonCalificar" class="btn btn-verde2 ok btn-round disabled">Enviar</div>';
        evaContenido += '<div id="botonTerminar" class="btn btn-naranja ok btn-round disabled">Continuar</div>';
        evaContenido += '<br><br><br><br>';

    } else {

        // TODO
        // // si es una por una las preguntas

        contadorP++;

        evaContenido += '<a class="encabezado">' + contadorP + ' - </a>';
        evaContenido += evaOM['reactivo_' + preguntasRandom[(contadorP - 1)]].pregunta;
        evaContenido += '<br><br>';
        evaContenido += '<ul>';

        for (b = 1; b <= thatE['lasRespuestas' + 1].length; b++) {
            contadorR = thatE['lasRespuestas' + 1][(b - 1)];

            evaContenido += '<input type="radio" name="resp' + contadorP + '" id="r' + contadorP + '_' + contadorR + '" value="' + contadorR + '" />';
            evaContenido += '<label id="label' + contadorP + '_' + contadorR + '" style="display:inline-table;" for="r' + contadorP + '_' + contadorR + '">';
            evaContenido += evaOM['reactivo_' + preguntasRandom[(contadorP - 1)]]['respuesta' + contadorR];
            evaContenido += '<i class="mdi" style="padding:10px;"></i></label>';
            evaContenido += '<br>';
        }

        evaContenido += '</ul>';

        lasCorrectas[(contadorP - 1)] = parseInt(evaOM['reactivo_' + preguntasRandom[(contadorP - 1)]].correcta);



        evaContenido += '<div id="botonEnviar" class="btn btn-verde2 ok btn-round disabled">Enviar</div>';
        // evaContenido += '<div id="botonTerminar" class="btn btn-naranja ok btn-round disabled">Continuar</div>';
        evaContenido += '<br><br><br><br>';

    }

    $('#evaOMParte2').append(evaContenido);


    for (a = 1; a <= cuantosReactivos; a++) {
        for (b = 1; b <= thatE['lasRespuestas' + a].length; b++) {
            $('#r' + a + '_' + b).change(function() {

                var name = $(this).attr("name");
                // console.log(name);
                $("input:radio[name=" + name + "]").next().removeClass('resp_seleccionada');
                $(this).next().addClass('resp_seleccionada');

                validaRadios(this);
            });
        }
    }

    $('#botonCalificar').click(function() {
        habilitaBoton($(this), false);
        evalua();
    });

    $('#botonEnviar').click(function() {
        habilitaBoton($(this), false);
        siguientePregunta();
    });

    // evaOMParte2 //



    // evaOMParte3 //

    var evaContenido = '';
    $('#evaOMParte3').empty();


    evaContenido += '<div id="circle" class="texto_centrado">';
    evaContenido += '   <div style="font-size: 40px; margin-top: -160px; margin-bottom: 160px; color: #f27526;">';
    evaContenido += '       <i class="elIcon" style="font-weight: bolder;"></i>';
    evaContenido += '   </div>';
    evaContenido += '   <p id="laCalifFinal" style="margin-top: -140px; margin-bottom: 40px;"></p>';
    evaContenido += '</div>';

    evaContenido += '<br>';
    evaContenido += '<div class="texto_centrado">';
    evaContenido += '<p>Puntuación mínima: <b>' + laEvaOMMinimoAprobatorio + '%</b></p>';
    evaContenido += '</div>';

    evaContenido += '<br>';
    evaContenido += '<h2 class="texto_centrado texto_bold" style="margin-bottom: -10px;">Se ha completado la Evaluación</h2>';
    // evaContenido += '<br>';
    // evaContenido += '<div class="texto_centrado">';
    // evaContenido += '   <div id="botonFinal" class="btn btn-naranja ok btn-round">Final</div>';
    // evaContenido += '</div>';

    evaContenido += '<br><br><br><br>';

    $('#evaOMParte3').append(evaContenido);



    function pintaFinalEvaOM(laPuntuacion) {

        var elValorInicial = 0;
        var elProgreso = 72;
        // var laPuntuacion = 89;

        $('#circle')
            .on('circle-animation-start', function(event) {
                // log('start');
            })
            .on('circle-animation-progress', function(event) {
                // log('progress');

                elValorInicial += (laPuntuacion / elProgreso);
                $('#laCalifFinal').html('Calificación: <h3><b>' + elValorInicial.toFixed(0) + '%</h3></p>');

            }).on('circle-animation-end', function(event) {
                // log('end');

                $('#laCalifFinal').html('Calificación: <h3><b>' + laPuntuacion + '%</b></h3>');

            }).circleProgress({
                value: (laPuntuacion / 100),
                size: 200,
                thickness: 10,
                startAngle: -51.8,
                lineCap: "round",
                fill: "#F27526",
                emptyFill: "#eee"
            });


        if (laPuntuacion >= laEvaOMMinimoAprobatorio) {
            $('.elIcon').addClass('nc-icon-glyph ui-1_check');
        } else {
            $('.elIcon').addClass('nc-icon-glyph ui-1_simple-remove');
        }


        $('#evaOMParte3').fadeIn();

    }

    // evaOMParte3 //


    ///////////////////////
    ajustaEscalaContenidoVer();
    setTimeout(function() {
        detectaUnloadVerRec();
    }, 300);

}



function guardaResultados(puntuacion, minimo) {
    log('guardaResultados', puntuacion, minimo);


    var aprobado;
    if (SCORM_ver == '1.2') {
        aprobado = SCORM_failed;
        if (puntuacion >= minimo) {
            aprobado = SCORM_passed;
        }
    } else {}


    // var onComplete = function(error) {
    //     if (error) {
    //         log('Ocurrió un error en la sincronización.');
    //     } else {
    //         log('Sincronización realizada.');
    //         guardaInteractions();
    //         // cargador('oculta');
    //     }
    // };

    ///////////////////////    
    var success = API.LMSSetValue("cmi.core.lesson_status", aprobado);
    var saveSuccess = API.LMSCommit();

    setTimeout(function() {
        API.LMSSetValue("cmi.core.score.raw", puntuacion);
        API.LMSCommit();
    }, 500);

    setTimeout(function() {
        guardaInteractions();
    }, 1000);
    ///////////////////////


    // if (revisaConexion) {

    //     var elRefEntregado = laUrlBase + 'Lecciones/' + usuarioId + '/' + laRutaRecursoActual;
    //     log('elRefEntregado: ', elRefEntregado);

    //     firebase.database().ref(elRefEntregado).update({
    //         'Entregada': true,
    //         'Calificada': true,
    //         'SCORM_12': {
    //             'cmi_core_lesson_status': 'incomplete',
    //             'cmi_core_exit': 'suspend',
    //             'cmi_core_lesson_location': '3',
    //             'cmi_core_lesson_status': aprobado,
    //             'cmi_core_score_max': "100",
    //             'cmi_core_score_min': "0",
    //             'cmi_core_score_raw': puntuacion,
    //             'cmi_core_session_time': 'f_session_time',
    //             'cmi_suspend_data': ""
    //         }
    //     }, onComplete);

    // }

}


function guardaInteractions() {
    log('guardaInteractions', cuantosReactivos, lasSeleccionadas, lasCorrectas);
    log('laEvaOMReactivos', laEvaOMReactivos);


    var a = 0;

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            while (a < cuantosReactivos) {
                log('a', a);
                guardaInteracationsBD(a);
                a++;
            }

            // updateCalificacionTotalPinta(usuarioACalifId, laCalificacionTotal);
            // pintaTemas();
            // cargaContent();
            // cargador('oculta');

            log('Sincronización realizada.');
            // cargador('oculta');
        }
    };

    if (revisaConexion) {

        var elRefInteraction = laUrlBase + 'Lecciones/' + usuarioId + '/' + laRutaRecursoActual + '/SCORM_12';
        log('elRefInteraction: ', elRefInteraction);

        function guardaInteracationsBD(a) {

            var result;

            log('cmi_interactions_' + a + '_id', laEvaOMReactivos['reactivo_' + [(a + 1)]].pregunta);
            log('cmi_interactions_' + a + '_type', 'choice');
            log('cmi_interactions_' + a + '_weighting', '1');
            log('cmi_interactions_' + a + '_student_response', laEvaOMReactivos['reactivo_' + [(a + 1)]]['respuesta' + lasSeleccionadas[a]]);
            log('cmi_interactions_' + a + '_correct_responses_0_pattern', laEvaOMReactivos['reactivo_' + [(a + 1)]]['respuesta' + lasCorrectas[a]]);
            if (lasSeleccionadas[a] == lasCorrectas[a]) {
                result = 'correct';
                log('cmi_interactions_' + a + '_result', 'correct');
            } else {
                result = 'wrong';
                log('cmi_interactions_' + a + '_result', 'wrong');
            }
            log('-----------------------------');


            firebase.database().ref(elRefInteraction).update({
                ['cmi_interactions_' + a + '_id']: laEvaOMReactivos['reactivo_' + [(a + 1)]].pregunta,
                ['cmi_interactions_' + a + '_type']: 'choice',
                ['cmi_interactions_' + a + '_weighting']: '1',
                ['cmi_interactions_' + a + '_student_response']: laEvaOMReactivos['reactivo_' + [(a + 1)]]['respuesta' + lasSeleccionadas[a]],
                ['cmi_interactions_' + a + '_correct_responses_0_pattern']: laEvaOMReactivos['reactivo_' + [(a + 1)]]['respuesta' + lasCorrectas[a]],
                ['cmi_interactions_' + a + '_result']: result
            }, onComplete);

        }

        guardaInteracationsBD(a);

    }
}