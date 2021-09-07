function activaSecInicio() {
    console.log('activaSecInicio');
    // cargador('muestra');

    $('.panel-header div h3').html('Plataforma');
    $('#subtituloSeccion').html('');
    $('#subseccion').html('');

    return pintaInicio().then(function() {
        cargador('oculta');
    });
};

function pintaInicio() {

    // Título de bienvenida por perfil
    if (elRol === "Administrador") {
        $('#inicio_instructor, #inicio_participante, #divLoginSesion').hide();
    } else if (elRol === "Instructor") {
        $('#inicio_admin, #inicio_participante, #boton_sesion_participante').hide();
    } else if (elRol === "Participante") {
        $('#inicio_admin, #inicio_instructor, #boton_sesion_instructor').hide();
    }
    $('.titulo_jumbotron').html('Bienvenido (a) ' + elPerfilNombre);
    $('.titulo_jumbotron').append('<p class="subtitulo_seccion">' + elRol + '</p>');


    if (localStorage.ssn != null & localStorage.scc_int != null) {
        laSesionActual = localStorage.ssn;
        buscaSesion(localStorage.ssn, localStorage.scc_int);
    }

    return $.ajax();

}
