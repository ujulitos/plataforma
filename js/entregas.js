var cuantasEntregas;
var that;

function activaSecEntregas() {
    log('activaSecEntregas');
    $('#subtituloSeccion').html('');

    return cuentaEntregas();
}


function cuentaEntregas() {
    log('cuentaEntregas');

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Lecciones/').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorEntregas = 0;

                snapshot.forEach(function(childSnapshot) {
                    log('childSnapshot.key ', childSnapshot.key);
                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined') {
                        contadorEntregas++;
                        this['usuarioPerfil' + contadorEntregas] = snapshot.child(childSnapshot.key).child('Perfil').val();
                        log('usuarioPerfil', contadorEntregas, this['usuarioPerfil' + contadorEntregas]);


                        childSnapshot.forEach(function(childSnapshot2) {
                            childSnapshot2.forEach(function(childSnapshot3) {

                                //   contadorRecAsig++;

                                // this['elRecursoKey' + contadorRecAsig] = childSnapshot3.key;
                                // log('elRecursoKey', contadorRecAsig, this['elRecursoKey' + contadorRecAsig]);


                            });

                        });

                        // }
                    }
                });


                that = this;
                cuantasEntregas = contadorEntregas;


                return pintaEntregas().then(function() {
                    activaBotonesEntregas().then(function() {
                        cargador('oculta');
                    });
                });

            }
        });
    }
}


function pintaEntregas() {

    var contenidoSecEntregas = '';
    $('.entregas_int').empty();


    contenidoSecEntregas += '<div class="pt-4 pl-5 pr-5 py-3 bg-white rounded tabla_recursos">';

    contenidoSecEntregas += '<table class="table recursos_lista">';
    contenidoSecEntregas += '    <thead>';
    contenidoSecEntregas += '        <tr>';
    contenidoSecEntregas += '            <th class="col-5">';
    contenidoSecEntregas += '                <h6 class="input_label">Usuario</h6>';
    contenidoSecEntregas += '            </th>';
    contenidoSecEntregas += '            <th class="col-5">';
    contenidoSecEntregas += '                <h6 class="input_label">Tarea</h6>';
    contenidoSecEntregas += '            </th>';
    contenidoSecEntregas += '            <th class="col-2">';
    contenidoSecEntregas += '                <h6 class="input_label">Calificación</h6>';
    contenidoSecEntregas += '            </th>';
    contenidoSecEntregas += '        </tr>';
    contenidoSecEntregas += '    </thead>';
    contenidoSecEntregas += '    <tbody>';


    for (a = 1; a <= cuantasEntregas; a++) {

        contenidoSecEntregas += '            <tr>';
        contenidoSecEntregas += '                <td>';
        contenidoSecEntregas += '        <div class="recurso_nombre">';
        // TODO leer datos
        // contenidoSecEntregas += '           <div id="recurso_imagen' + a + '" class="recurso_imagen">' + that['recursoNombre' + a] + '</div>';
        contenidoSecEntregas += '           <div id="recurso_imagen' + a + '" class="recurso_imagen">' + elPerfilNombre + '</div>';
        contenidoSecEntregas += '            <div class="recurso_nombre_int">';
        contenidoSecEntregas += '                <br>';
        contenidoSecEntregas += '            </div>';
        contenidoSecEntregas += '         </div>';
        contenidoSecEntregas += '     </td>';
        contenidoSecEntregas += '    <td id="recurso_descripcion' + a + '">';
        // TODO leer datos
        // contenidoSecEntregas += '        <p class="texto_limitado">' + that['recursoDesc' + a] + '</p>';
        contenidoSecEntregas += '        <p class="texto_limitado">' + 'Tarea 1' + '</p>';
        contenidoSecEntregas += '    </td>';
        contenidoSecEntregas += '    <td>';
        contenidoSecEntregas += '        <div id="botonCalificarEntrega' + a + '" class="btn btn-round btn-icon btn-verde2 botonCalificarEntrega" data-toggle="modal" data-target="#modalCalificarEntrega">';
        contenidoSecEntregas += '            <i class="nc-icon-outline ui-1_pencil"></i>';
        contenidoSecEntregas += '      </div>';
        contenidoSecEntregas += '      </td>';
        contenidoSecEntregas += '   </tr>';

    }

    contenidoSecEntregas += '           </tbody>';
    contenidoSecEntregas += '    </table>';

    contenidoSecEntregas += ' </div>';


    $('.entregas_int').append(contenidoSecEntregas);
    // $('#subtituloSeccion').html('<a  >' + cuantasEntregas + '</a> recursos en total');


    //////////////// por asignación ////////////////      
    for (c = 1; c <= cuantasEntregas; c++) {

    }
    log('cuantasEntregas', cuantasEntregas);

    return $.ajax();

}



function activaBotonesEntregas() {
    log('activaBotonesEntregas');

    // for (a = 1; a <= cuantasEntregas; a++) {
    //     $("#botonDiploma" + a).click(function(event) {
    //         event.preventDefault();
    //         var cualDiploma = $(this).attr('id').split('botonDiploma')[1];
    //         // log('cualDiploma', cualDiploma);

    //         laFechaFormat = moment(nuevoArray[(cualDiploma - 1)].fechaCierre, ["DD/MM/YYYY"]).format();
    //         laFechaFormat2 = moment(laFechaFormat).format("LL");

    //         decargaDiploma(cualDiploma, nuevoArray[(cualDiploma - 1)].usuarioNombre, nuevoArray[(cualDiploma - 1)].objetoNombre, laFechaFormat2);
    //     });
    // }

    $(".botonCalificarEntrega").click(function(event) {
        event.preventDefault();
        var _Pos = $(this).attr('id').indexOf('_');
        var cualRecurso = $(this).attr('id').substr(21, $(this).attr('id').length - (_Pos + 1));

        log('botonCalificarEntrega', cualRecurso);
        ////////////////
        lanzamodalCalificarEntrega(cualRecurso);
        ////////////////
    });

    return $.ajax();
};


function lanzamodalCalificarEntrega(cualContenido) {
    log('lanzamodalCalificarEntrega', cualContenido);

    $("#modalCalificarEntrega_body").empty();
    var elContenido = '';


    elContenido += '<br> <br>';
    elContenido += '<div class="row">';
    elContenido += '<div class="col-11" style="margin: 0 auto;">';
    elContenido += '<div class="titulo_label">';
    // TODO leer datos
    // elContenido += '   <h6 class="input_label">' + that['recursoDesc' + cualContenido] + '</h6>';
    elContenido += '   <h6 class="input_label">' + 'Tarea 1' + '</h6>';
    // elContenido += '<br>';
    // TODO leer datos
    // elContenido += '   <p class="texto">' + that['recursoInstr' + cualContenido] + '</p>';
    elContenido += '   <p class="texto">' + 'Tarea entregable' + '</p>';
    elContenido += '<br> <br>';

    elContenido += '<button id="botonVerEntegable" class="btn btn-verde2 btn-round ml-auto">Ver tarea</button>';

    elContenido += '<div class="titulo_label">';
    elContenido += '<br> <br>';
    elContenido += '<h6 class="input_label">Calificación</h6>';
    elContenido += '<p class="texto_subtitulo">(0 a 100)</p>';
    elContenido += '</div>';
    elContenido += '<div class="recurso_duracion">';
    elContenido += '<input id="duracionRecurso" type="text" class="form-control input_duracion" placeholder="Agrega minutos" value="0" minimo="0" required="true" onkeypress="isInputNumber(event)">';
    elContenido += '<div id="botonInputMas" class="btn btn-sm btn-round botonInputMas mas"> <i class="nc-icon-glyph ui-1_bold-add"></i></div>';
    elContenido += '<div id="botonInputMenos" class="btn btn-sm btn-round botonInputMenos menos"> <i class="nc-icon-glyph ui-1_bold-delete"></i></div>';
    elContenido += '</div>';

    elContenido += '<br> <br>';
    elContenido += '<h6 class="input_label">Retroalimentación al Participante:</h6>';
    elContenido += '<textarea id="editorCalificaEntregable" name="content" class="area_editor"></textarea>';
    elContenido += '</div>';
    elContenido += '<br> <br>';

    elContenido += '<div class="col-12 text-right">';
    // elContenido += '    <span id="texto_error_Curso" class="texto_error"></span>';
    elContenido += '    <button id="botonCancelarCalificarEntegable" class="btn btn-naranja btn-round ml-auto">Cancelar</button>';
    elContenido += '    <button id="botonCalificarEntegable" class="btn btn-verde2 btn-round ml-auto">Enviar Calificación</button>';
    elContenido += '</div>';

    elContenido += '</div>';
    elContenido += '</div>';


    $("#modalCalificarEntrega_body").html(elContenido);

    ClassicEditor.create(document.querySelector('#editorCalificaEntregable')).then(editorCalificaEntregable => {
        // editorCalificaEntregable.data.set('hola');
    }).catch(error => {
        console.error(error);
    });

    $(document).off('click', '#botonCalificarEntegable').on('click', '#botonCalificarEntegable', function(event) {
        event.preventDefault();
        calificarEntregable();
    });
    $(document).off('click', '#botonCancelarCalificarEntegable').on('click', '#botonCancelarCalificarEntegable', function(event) {
        event.preventDefault();
        // $('#modalCalificarEntrega').hide();
        $("#modalCalificarEntrega .close").click();
    });


    ///////////////////////
    ajustaEscalaModalEntrega();
    setTimeout(function() {
        detectaModalEntrega();
    }, 300);

}



function calificarEntregable() {
    log("calificarEntregable");

    $('#modalCalificarEntregable').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarCalificarEntregable').on('click', '#botonCancelarCalificarEntregable', function(e) {});
    $(document).off('click', '#botonAceptarCalificarEntregable').on('click', '#botonAceptarCalificarEntregable', function(e) {
        califiarEntregableOK();
    });

};

function califiarEntregableOK() {
    $("#modalCalificarEntrega .close").click();
}

function ajustaEscalaModalEntrega() {

    elAncho = $(window).width();
    elAlto = $(window).height();
    // log('elAncho', elAncho, 'y elAlto', elAlto);

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


$(window).resize(function() {

    ajustaEscalaModalEntrega();

});

$(document).ready(function() {

});