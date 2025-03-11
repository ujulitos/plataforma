var arrayCategorias = new Array();
var cuantasCategorias = 0;
var cuantosCursos;
var cuantosCursosVisibles;
var cuantosCursosDisponibles;
var cursoEditandoId;
var cursoEditandoNum;
var cuantosTemas = 0;
var cuantosRecursosTema = 0;
var cuantosTemasCur;
var cuantosTemasPorCurso = 0;
var cursoConTemas;
var cuantosRecursosCur;
var cuantosUsuarios;
var cuantosProfesores;
var cuantosGrupos = 0;
var cuantosUsuAsigPorCurso = 0;
// var cuantosRecursosPorTema = 0;

// Tipos de calificación:
// Tipo 1: Automático
// Tipo 2: Manual
// Tipo 3: Rúbrica
var cuantosTiposCalificacion = 3;

var califMaxima = 100;
var valRestante = 100;
var arrayUsuarios = [];
var arrayProfesores = [];
var arrayProfesorGrupos = [];
var arrayUsuariosGrupos = [];
var arrayGrupos = [];
var dataSetUsuAsig = [];
var dataSetProfAsig = [];
var arrayGruposAsignados = [];
var modoAgregar;
var that;
var those;
var thosi;
var thosii;
var thas;
var thes;
var thisi;
var thiso;


function cuentaCursos() {
    log('cuentaCursos');
    cuantosCursosDisponibles = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                var contadorCursos = 0;
                var contadorCursosVisbles = 0;
                cuantosTemasPorCurso = 0;
                var contadorUsuAsigPorCurso = 0;
                cuantosUsuAsigPorCurso = 0;
                // cuantosRecursosPorTema = 0;

                cuantosCursos = snapshot.numChildren();
                log('cuantosCursos', cuantosCursos);

                snapshot.forEach(function(childSnapshot) {
                    contadorCursos++;

                    this['cursoId' + contadorCursos] = snapshot.child(childSnapshot.key).child('Id').val();
                    log('cursoId' + contadorCursos + ': ', this['cursoId' + contadorCursos]);
                    this['cursoClave' + contadorCursos] = snapshot.child(childSnapshot.key).child('Clave').val();
                    log('cursoClave ' + contadorCursos + ': ', this['cursoClave' + contadorCursos]);
                    this['cursoNombre' + contadorCursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    log('cursoNombre ' + contadorCursos + ': ', this['cursoNombre' + contadorCursos]);
                    this['cursoDescripcion' + contadorCursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                    log('cursoDescripcion ' + contadorCursos + ': ', this['cursoDescripcion' + contadorCursos]);
                    this['cursoObjetivos' + contadorCursos] = snapshot.child(childSnapshot.key).child('Objetivos').val();
                    log('cursoObjetivos ' + contadorCursos + ': ', this['cursoObjetivos' + contadorCursos]);
                    this['cursoTemario' + contadorCursos] = snapshot.child(childSnapshot.key).child('Temario').val();
                    log('cursoTemario ' + contadorCursos + ': ', this['cursoTemario' + contadorCursos]);
                    this['cursoConFechas' + contadorCursos] = snapshot.child(childSnapshot.key).child('conFechas').val();
                    log('cursoConFechas ' + contadorCursos + ': ', this['cursoConFechas' + contadorCursos]);
                    if (this['cursoConFechas' + contadorCursos] != false) {
                        childSnapshot.forEach(function(childSnapshot2) {
                            if (childSnapshot2.key == "conFechas") {
                                this['cursoFecha_abre' + contadorCursos] = childSnapshot.child(childSnapshot2.key).child('Fecha_abre').val();
                                log('cursoFecha_abre ' + contadorCursos + ': ', this['cursoFecha_abre' + contadorCursos]);
                                this['cursoFecha_cierra' + contadorCursos] = childSnapshot.child(childSnapshot2.key).child('Fecha_cierra').val();
                                log('cursoFecha_cierra ' + contadorCursos + ': ', this['cursoFecha_cierra' + contadorCursos]);
                            }
                        });
                    }

                    this['cursoVisible' + contadorCursos] = snapshot.child(childSnapshot.key).child('Visible').val();
                    log('cursoVisible ' + contadorCursos + ': ', this['cursoVisible' + contadorCursos]);
                    this['cursoPortada' + contadorCursos] = snapshot.child(childSnapshot.key).child('Portada').val();
                    log('Portada del Curso: ', this['cursoPortada' + contadorCursos]);

                    if (this['cursoVisible' + contadorCursos] == true) {
                        // if (this['cursoNivel' + contadorCursos] <= elUsuarioNivel) {
                        contadorCursosVisbles++;
                        // }
                    }

                    childSnapshot.forEach(function(childSnapshot2) {
                        // log('childSnapshot2', childSnapshot2.key);

                        if (childSnapshot2.key == "Asignacion") {

                            this['cuantosAsignados' + contadorCursos] = (childSnapshot2.numChildren() - 1);
                            log('cuantosAsignados del Curso', contadorCursos, this['cuantosAsignados' + contadorCursos]);
                            contadorUsuAsigPorCurso = 0;

                            childSnapshot2.forEach(function(childSnapshot3) {
                                if (childSnapshot3.key != undefined && childSnapshot3.key != null && childSnapshot3.key != '' && childSnapshot3.key != 'undefined' && childSnapshot3.key != 'val') {
                                    contadorUsuAsigPorCurso++;

                                    this['cursoUsuAsigId' + contadorUsuAsigPorCurso + '_' + contadorCursos] = childSnapshot2.child(childSnapshot3.key).child('Id').val();
                                    // log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Id', this['cursoUsuAsigId' + contadorUsuAsigPorCurso + '_' + contadorCursos]);

                                    this['cursoUsuGrupos' + contadorUsuAsigPorCurso + '_' + contadorCursos] = childSnapshot2.child(childSnapshot3.key).child('Grupos').val();
                                    // log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Grupos', this['cursoUsuGrupos' + contadorUsuAsigPorCurso + '_' + contadorCursos]);

                                    this['cursoUsuClase' + contadorUsuAsigPorCurso + '_' + contadorCursos] = childSnapshot2.child(childSnapshot3.key).child('Clase').val();
                                    // log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Clase', this['cursoUsuClase' + contadorUsuAsigPorCurso + '_' + contadorCursos]);

                                    this['cursoUsuFecha_abre' + contadorUsuAsigPorCurso + '_' + contadorCursos] = childSnapshot2.child(childSnapshot3.key).child('Fecha_abre').val();
                                    // log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Fecha_abre', this['cursoUsuFecha_abre' + contadorUsuAsigPorCurso + '_' + contadorCursos]);

                                    this['cursoUsuFecha_cierra' + contadorUsuAsigPorCurso + '_' + contadorCursos] = childSnapshot2.child(childSnapshot3.key).child('Fecha_cierra').val();
                                    // log('Curso', contadorCursos, 'UsuAsig', contadorUsuAsigPorCurso, 'Fecha_cierra', this['cursoUsuFecha_cierra' + contadorUsuAsigPorCurso + '_' + contadorCursos]);

                                    cuantosUsuAsigPorCurso = contadorUsuAsigPorCurso;
                                }

                            });
                        }

                        if (childSnapshot2.key == "Temas") {
                            this['cuantosTemas' + contadorCursos] = childSnapshot2.numChildren();
                            log('cuantosTemas del Curso', contadorCursos, this['cuantosTemas' + contadorCursos]);

                            var contadorTemasPorCurso = 0;
                            childSnapshot2.forEach(function(childSnapshot3) {
                                if (childSnapshot3.key != undefined && childSnapshot3.key != null && childSnapshot3.key != '' && childSnapshot3.key != 'undefined' && childSnapshot3.key != 'val') {

                                    contadorTemasPorCurso++;

                                    this['curso' + contadorCursos + 'TemaId' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Id').val();
                                    // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Id', this['curso' + contadorCursos + 'TemaId' + contadorTemasPorCurso]);

                                    this['curso' + contadorCursos + 'TemaNombre' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Nombre').val();
                                    // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Nombre', this['curso' + contadorCursos + 'TemaNombre' + contadorTemasPorCurso]);

                                    // this['curso' + contadorCursos + 'TemaDescripcion' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Descripcion').val();
                                    // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Descripcion', this['curso' + contadorCursos + 'TemaDescripcion' + contadorTemasPorCurso]);

                                    // this['curso' + contadorCursos + 'TemaObjetivo' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Objetivo').val();
                                    // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Objetivo', this['curso' + contadorCursos + 'TemaObjetivo' + contadorTemasPorCurso]);

                                    this['curso' + contadorCursos + 'TemaOrden' + contadorTemasPorCurso] = childSnapshot2.child(childSnapshot3.key).child('Orden').val();
                                    // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Orden', this['curso' + contadorCursos + 'TemaOrden' + contadorTemasPorCurso]);

                                    var contadorRecursosPorTema = 0;
                                    childSnapshot3.forEach(function(childSnapshot4) {
                                        log('childSnapshot4', childSnapshot4.key);

                                        if (childSnapshot4.key == "Recursos") {
                                            this['cuantosRecursosTemaCurso' + contadorTemasPorCurso] = childSnapshot4.numChildren();
                                            // log('cuantosRecursos del Curso', contadorCursos, 'Tema', contadorTemasPorCurso, this['cuantosRecursosTemaCurso' + contadorTemasPorCurso]);

                                            childSnapshot4.forEach(function(childSnapshot5) {
                                                contadorRecursosPorTema++;

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'elRecursoId' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Id').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Id', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'elRecursoId' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'elRecursoClave' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Clave').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Clave', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'elRecursoClave' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'elRecursoNombre' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Nombre').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Nombre', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'elRecursoNombre' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoLiga' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Liga').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Liga', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoLiga' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoCategoria' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Categoria').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Categoria', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoCategoria' + contadorRecursosPorTema]);

                                                // this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoCalifAuto' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('CalifAutomatica').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'CalifAuto', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoCalifAuto' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'Tipo'] = childSnapshot4.child(childSnapshot5.key).child('TipoDeCalificacion').child('Tipo').val();
                                                log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Tipo de Calificacion Tipo', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'Tipo']);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'IdRubrica'] = childSnapshot4.child(childSnapshot5.key).child('TipoDeCalificacion').child('IdRubrica').val();

                                                log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Tipo de Calificacion IdRubrica', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoTipoCalificacion' + contadorRecursosPorTema + 'IdRubrica']);

                                                // descripción no necesaria
                                                // this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoDescripcion' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Descripcion').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Descripcion', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoDescripcion' + contadorRecursosPorTema]);
                                                // descripción no necesaria

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoTipoEntrega' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('TipoDeEntrega').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'TipoDeEntrega', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoTipoEntrega' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoInstrucciones' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Instrucciones').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Instrucciones', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoInstrucciones' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoOrden' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Orden').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Orden', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoOrden' + contadorRecursosPorTema]);

                                                // Intentos no necesarios
                                                // this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoIntentos' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Intentos').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Intentos', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoIntentos' + contadorRecursosPorTema]);
                                                // Intentos no necesarios

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoVisible' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('RecursoVisible').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'RecursoVisible', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoVisible' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoObligatorio' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Obligatorio').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Obligatorio', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoObligatorio' + contadorRecursosPorTema]);

                                                // CalifMasAlta no necesaria
                                                // this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoCalifMasAlta' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('CalifMasAlta').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'CalifMasAlta', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoCalifMasAlta' + contadorRecursosPorTema]);
                                                // CalifMasAlta no necesaria

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoPromediable' + contadorRecursosPorTema] = childSnapshot4.child(childSnapshot5.key).child('Promediable').val();
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'Promediable', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoPromediable' + contadorRecursosPorTema]);

                                                this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoPuntosObtener' + contadorRecursosPorTema] = parseInt(childSnapshot4.child(childSnapshot5.key).child('PuntosObtener').val());
                                                // log('Curso', contadorCursos, 'Tema', contadorTemasPorCurso, 'Recurso', contadorRecursosPorTema, 'PuntosObtener', this['curso' + contadorCursos + 'Tema' + contadorTemasPorCurso + 'RecursoPuntosObtener' + contadorRecursosPorTema]);

                                                // cuantosRecursosPorTema = contadorRecursosPorTema;
                                            });

                                        }
                                    });
                                }
                            });
                            cuantosTemasPorCurso = contadorTemasPorCurso;
                        }
                    });

                    cuantosCursos = contadorCursos;
                    cuantosCursosVisibles = contadorCursosVisbles;
                    that = this;

                });


                return pintaCursos().then(function() {
                    pintaCursosDisponibles().then(function() {
                        activaBotonesCursos().then(function() {
                            cargador('oculta');
                        });
                    });
                });

            }
        });
    }
}



function pintaCursos() {

    var noCache = generarId();
    var contador = 0;
    var anchoColumnas = 6;
    // if (cuantosCursosVisibles >= 3) {
    // if (cuantosCursos == 1) {
    //     anchoColumnas = 4;
    // }
    var contenidoSecCursos = '';
    $('.cursos_int').empty();


    contenidoSecCursos += '<label id="botonAgregarCurso" class="btn btn-primary btn-round item boton_gris2_alt" style="float: right; margin-top: -60px; display: none;"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Curso';
    contenidoSecCursos += '</label>';


    for (a = 1; a <= cuantosCursosVisibles; a++) {
        that['cuantosElemPorCategoria' + a] = 0;

        // contenidoSecCursos += '<div id="grupoCategoria' + a + '" class="grupo_categoria">';
        // contenidoSecCursos += '<p class="titulo_categoria">' + arrayCategorias[(a - 1)] + ' </p>';
        // contenidoSecCursos += '<p class="titulo_categoria">' + 'Cursos' + ' </p>';

        // contenidoSecCursos += '<div class="row">';
        contenidoSecCursos += '<div class="col-12 ml-auto mr-auto" style="margin-top: 60px; margin-bottom: 40px;">';
        contenidoSecCursos += '<div class="row">';

        for (b = 1; b <= cuantosCursosVisibles; b++) {

            // if (that['cursoCategoria' + b] == arrayCategorias[(a - 1)]) {
            that['cuantosElemPorCategoria' + a]++;

            // if (that['cursoNivel' + b] <= elUsuarioNivel) {

            // if (that['cursoNivel' + b] <= elUsuarioNivel) {

            // contenidoSecCursos += '<div class="col-md-' + anchoColumnas + ' ml-auto mr-auto">';
            contenidoSecCursos += '<div class="col-md-' + anchoColumnas + '" style="display:none;">';
            contenidoSecCursos += '<div id="tarjeta' + b + '" class="card card_con_sombra">';
            contenidoSecCursos += '<img class="card-img-top" src="' + that['cursoPortada' + b] + '?' + noCache + '"></img>';

            contenidoSecCursos += '<div class="card-body">';
            // contenidoSecCursos += '<h6 class="category text-danger">' + this['cursoCategoria' + b] + '</h6>';

            contenidoSecCursos += '<h5 id="curso_titulo' + b + '" class="curso_titulo card-title">' + that['cursoNombre' + b] + '</h5>';

            contenidoSecCursos += '<div id="estatus_curso_scorm' + b + '" class="icono_status"><i class="nc-icon-outline weather_moon-full icon_estatus_scorm"></i></div>';

            contenidoSecCursos += '<div class="card-desc">';
            contenidoSecCursos += '<br>';
            contenidoSecCursos += '<span class="curso_subtitulo">Clave:</span><br>';
            contenidoSecCursos += '<span class="curso_texto">' + that['cursoClave' + b] + '</span>';
            contenidoSecCursos += '<br><br>';
            contenidoSecCursos += '<br>';
            contenidoSecCursos += '<span class="curso_subtitulo">Descripción:</span><br>';
            contenidoSecCursos += '<span class="curso_texto">' + that['cursoDescripcion' + b] + '</span>';
            contenidoSecCursos += '<br><br>';
            if (that['cursoObjetivos' + b] != null) {
                contenidoSecCursos += '<span class="curso_subtitulo">Objetivos:</span><br>';
                contenidoSecCursos += '<span class="curso_texto">' + that['cursoObjetivos' + b] + '</span>';
                contenidoSecCursos += '<br>';
            }
            if (that['cursoTemario' + b] != null) {
                contenidoSecCursos += '<span class="curso_subtitulo">Temario:</span><br>';
                contenidoSecCursos += '<span class="curso_texto">' + that['cursoTemario' + b] + '</span>';
                contenidoSecCursos += '<br>';
            }
            contenidoSecCursos += '</div>';

            // if (elPerfil != "Administrador") {
            // contenidoSecCursos += '<div class="mdl-card__actions mdl-card--border">';
            // contenidoSecCursos += '<div id="estatus_curso' + b + '" class="icono_status" style="float:left; margin: 10px 20px;"><i class="now-ui-icons check-circle-07 icon_estatus"></i></div>';
            // contenidoSecCursos += '<div id="estatus_curso_scorm' + b + '" class="icono_status" style="float:left; margin: 10px 0px;"><i class="nc-icon-outline weather_moon-full icon_estatus_scorm"></i>';
            // contenidoSecCursos += '<div id="calif_curso_scorm' + b + '" class="estatus_texto"></div>';
            // contenidoSecCursos += '</div>';
            // }

            contenidoSecCursos += '<hr>';

            contenidoSecCursos += '<div class="card-botones">';
            contenidoSecCursos += '<div id="botonMasInfo' + b + '" class="btn-transparente-azul btn-round botonMasInfo curso_subtitulo"><i class="nc-icon-outline arrows-1_minimal-down"></i>Más info</div>';

            if (elPerfil === "SuperAdmin" || elPerfil === "Administrador" || elPerfil === "Creador de contenidos") {
                contenidoSecCursos += '<div id="botonEliminarCurso' + b + '" class="btn btn-sm btn-round botonEliminarCurso">';
                contenidoSecCursos += '<i class="nc-icon-outline ui-1_trash-simple" style="padding-right: 10px;"></i>';
                contenidoSecCursos += 'Eliminar</div>';

                contenidoSecCursos += '<div id="botonEditarCurso' + b + '" class="btn btn-sm btn-round botonEditarCurso">';
                contenidoSecCursos += '<i class="nc-icon-outline ui-1_pencil" style="padding-right: 10px;"></i>';
                contenidoSecCursos += 'Editar</div>';
            }

            if (that['cursoVisible' + b]) {
                contenidoSecCursos += '<div id="botonVerCurso' + b + '" class="btn btn-verde2 btn-round botonVerCurso">';
                contenidoSecCursos += '<i class="nc-icon-outline education_glasses" style="padding-right: 10px;"></i>';
                contenidoSecCursos += 'Ver</div>';
            } else {
                contenidoSecCursos += '<div id="botonVerCurso' + b + '" class="btn btn-verde2 btn-round botonVerCurso" disabled>';
                contenidoSecCursos += '<i class="nc-icon-outline education_glasses"></i>';
                contenidoSecCursos += 'Ver</div>';
            }
            contenidoSecCursos += '</div>';
            /* borde */

            contenidoSecCursos += '</div>';
            contenidoSecCursos += '</div>';
            contenidoSecCursos += '</div>';

            // }
            // }

        }

        contenidoSecCursos += '</div>';
        contenidoSecCursos += '</div>';
        // contenidoSecCursos += '</div>';
        // contenidoSecCursos += '</div>';

        log(that['cuantosElemPorCategoria' + a]);

    }

    $('.cursos_int').append(contenidoSecCursos);

    // $('#subtituloSeccion').html('<a  >' + cuantosCursosVisibles + '</a> Cursos en total');


    //////////////// por inscripción ////////////////      

    var contadorCursos = 0;
    var contadorUsuAsig;
    var contadorCursosVisibles = 0;
    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos').once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                // log('snapshot.val()', snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    contadorCursos++;
                    contadorUsuAsig = 0;
                    log('contadorCursos', contadorCursos);

                    this['cursoId' + contadorCursos] = snapshot.child(childSnapshot.key).child('Id').val();

                    childSnapshot.forEach(function(childSnapshot2) {
                        if (childSnapshot2.key == "Asignacion") {
                            // log('childSnapshot2.key', childSnapshot2.key);
                            childSnapshot2.forEach(function(childSnapshot3) {
                                // if (childSnapshot3.key != undefined && childSnapshot3.key != null && childSnapshot3.key != '' && childSnapshot3.key != 'undefined' && childSnapshot3.key != 'val') {
                                contadorUsuAsig++;
                                // log('childSnapshot3.key', contadorUsuAsig, childSnapshot3.key);

                                this['cursoUsuAsigId' + contadorUsuAsig] = childSnapshot2.child(childSnapshot3.key).child('Id').val();

                                if (elPerfil === 'Participante' || elPerfil === 'Observador' || elPerfil === 'Asesor Académico') {

                                    if (usuarioId == this['cursoUsuAsigId' + contadorUsuAsig]) {
                                        contadorCursosVisibles++;
                                        // log('ok', contadorCursos, contadorCursosVisibles, this['cursoUsuAsigId' + contadorUsuAsig], 'con el curso', this['cursoId' + contadorCursos]);


                                        for (a = 1; a <= cuantosCursosVisibles; a++) {
                                            // $('#tarjeta' + a).parent().empty();
                                            // $('#tarjeta' + a).parent().removeClass('col-md-6');
                                        }

                                        $('#tarjeta' + contadorCursos).parent().addClass('col-md-' + anchoColumnas);

                                        $('#tarjeta' + contadorCursos).parent().css({
                                            'opacity': '0',
                                            'display': 'block'
                                        });
                                        $('#tarjeta' + contadorCursos).parent().animate({
                                            opacity: 1
                                        });


                                        $('.cursos_int').css({
                                            'display': 'block'
                                        });

                                        // leeEstatusCurso(contadorCursos);
                                    }
                                } else {

                                    for (c = 1; c <= cuantosCursosVisibles; c++) {
                                        $('#tarjeta' + c).parent().css({
                                            'opacity': '0',
                                            'display': 'block'
                                        });
                                        $('#tarjeta' + c).parent().animate({
                                            opacity: 1
                                        });

                                        $('.cursos_int').css({
                                            'display': 'block'
                                        });

                                        // leeEstatusCurso(c);
                                    }
                                }

                                // }
                            });
                        }
                    });
                });
            }
        });
    }


    return $.ajax();

}

function pintaCursosDisponibles() {

    // si no hay nada, presenta todos
    log('cuantosCursosVisibles', cuantosCursosVisibles);
    if (cuantosCursosVisibles == -1) {
        for (dd = 1; dd <= cuantosCursosVisibles; dd++) {
            // log('d', d, $('#tarjeta' + dd));}
            $('#tarjeta' + dd).css({
                'opacity': '0',
                'display': 'flex'
            });
            $('#tarjeta' + dd).animate({
                opacity: 1
            });

            // cambiaPortada(dd);
        }
    }

    return $.ajax();
}

// function cambiaPortada(cualPortada) {
//     // log('cambiaPortada', cualPortada);

//     var noCache = generarId();
//     var image = new Image();
//     image.onload = function() {
//         $('#tarjeta' + cualPortada + ' img').attr("src", image.src + '?' + noCache);
//     }
//     image.src = that['cursoPortada' + cualPortada];
// }


function activaBotonesCursos() {

    if (elPerfil === "Asesor Académico" || elPerfil === "Participante" || elPerfil === 'Observador') {
        $("#botonAgregarCurso").hide();
        $(".cursos_int").css({
            'margin-top': '-40px'
        });
    } else {
        $("#botonAgregarCurso").show()
    };

    $(document).off('click', '#botonAgregarCurso').on('click', '#botonAgregarCurso', function(event) {
        event.preventDefault();
        cuentaRecursosCur();
        secAgregaCurso();
    });

    for (a = 1; a <= cuantosCursos; a++) {
        this['carta_abierta' + a] = false;

        $("#botonMasInfo" + a).click(function(event) {
            event.preventDefault();
            var cualCard = $(this).attr('id').substr(12, 3);
            $('#tarjeta' + cualCard).find('.card-desc').slideToggle();
            if (that['carta_abierta' + cualCard] == false) {
                $(this).html('<i class="nc-icon-outline arrows-1_minimal-up"></i>Menos info');
                that['carta_abierta' + cualCard] = true;
            } else {
                $(this).html('<i class="nc-icon-outline arrows-1_minimal-down"></i>Más info');
                that['carta_abierta' + cualCard] = false;
            }
        });

        $(document).off('click', '#botonEliminarCurso' + a).on('click', '#botonEliminarCurso' + a, function(event) {
            event.preventDefault();
            var elCurso = parseInt($(this).attr('id').substr(18, 3));
            log('elCurso', elCurso);

            eliminaCurso(elCurso);
        });

        $(document).off('click', '#botonEditarCurso' + a).on('click', '#botonEditarCurso' + a, function(event) {
            event.preventDefault();
            var elCurso = parseInt($(this).attr('id').substr(16, 3));
            log('elCurso', elCurso);

            cuentaTemasCur(elCurso);

            // recalculaUsufAsig();
            // recalculaProfAsig();

        });

        $('#tarjeta' + a + '>.card-img-top').css({
            'cursor': 'pointer'
        });
        $(document).off('click', '#tarjeta' + a + '>.card-img-top').on('click', '#tarjeta' + a + '>.card-img-top',
            function(event) {
                event.preventDefault();
                var elCursoVer = parseInt($(this).parent().attr('id').substr(7, 3));
                log('elCursoVer', elCursoVer);
                // window.open(that['cursoLiga' + elCursoVer]);
                lanzaContenido(elCursoVer);
            });
        $(document).off('click', '#botonVerCurso' + a).on('click', '#botonVerCurso' + a, function(event) {
            event.preventDefault();
            var elCursoVer = parseInt($(this).attr('id').substr(13, 3));
            log('elCursoVer', elCursoVer);
            // window.open(that['cursoLiga' + elCursoVer]);
            lanzaContenido(elCursoVer);
        });

    }

    $(document).off('click', '#botonConFechas').on('click', '#botonConFechas', function(event) {
        event.preventDefault();

        if ($(this).hasClass('active')) {
            muestraOculta($('#divConFechas'), 'muestra', 300);
        } else {
            muestraOculta($('#divConFechas'), 'oculta', 300);
        }

    });


    $(document).off('click', '.btn_califAuto').on('click', '.btn_califAuto', function(event) {
        event.preventDefault();

        if ($(this).hasClass('active')) {
            $(this).parent().find('.btn_califAuto_texto').slideUp("normal", function() {
                $(this).parent().find('.btn_califAuto_texto').html('La tarea se califica con Aceptada/No Aceptada');
                $(this).parent().find('.btn_califAuto_texto').slideDown();
            });
        } else {
            $(this).parent().find('.btn_califAuto_texto').slideUp("normal", function() {
                $(this).parent().find('.btn_califAuto_texto').html('Requiere un valor numérico');
                $(this).parent().find('.btn_califAuto_texto').slideDown();
            });
        }

    });

    // $(document).off('click', '.btn_visibleRec').on('click', '.btn_visibleRec', function(event) {
    //     event.preventDefault();
    // });

    $(document).off('click', '#botonAgregarTema').on('click', '#botonAgregarTema', function(event) {
        event.preventDefault();
        agregaTema();
    });

    $(document).off('click', '.botonEliminarTema').on('click', '.botonEliminarTema', function(event) {
        event.preventDefault();
        var elTema = $(this).parent();
        // log('elTema', elTema);
        eliminaTema(elTema);
    });

    $(document).off('click', '.agregarContenidoRecurso').on('click', '.agregarContenidoRecurso', function(event) {
        event.preventDefault();
        var elRowContenido = $(this).parent().find('.rowContenido');
        agregaContenidoRecurso(elRowContenido, true, 'nada');
    });

    $(document).off('click', '.botonEliminarContenidoRecurso').on('click', '.botonEliminarContenidoRecurso', function(event) {
        event.preventDefault();
        var elContenidoRecurso = $(this).parent().parent();
        // log('elContenidoRecurso', elContenidoRecurso);
        eliminaContenidoRecurso(elContenidoRecurso);
    });

    $(document).off('click', '#botonInscripcionesAlumnos').on('click', '#botonInscripcionesAlumnos', function(event) {
        event.preventDefault();
        // cuentaUsuariosAsig();
        // cuentaProfesorAsig();
        // recalculaUsuAsig();
        // recalculaProfAsig();
    });

    $(document).off('click', '#botonInscripcionesProfesor').on('click', '#botonInscripcionesProfesor', function(event) {
        event.preventDefault();
        // cuentaProfesorAsig();
        // cuentaUsuariosAsig();
        // cuentaGrupos();
        // pintaGrupos();
    });

    $(document).off('click', '#botonInscribirAlumnosTodos').on('click', '#botonInscribirAlumnosTodos', function(event) {
        event.preventDefault();
        var aInscribirTodos = $('#botonInscribirAlumnosTodos').hasClass('active');
        log('inscribirAlumnosTodos', aInscribirTodos);

        if (aInscribirTodos) {
            $('.btn-inscribirAlumno').addClass('active');
        } else {
            $('.btn-inscribirAlumno').removeClass('active');
        }
    });
    $(document).off('click', '#botonInscribirProfesoresTodos').on('click', '#botonInscribirProfesoresTodos', function(event) {
        event.preventDefault();
        var aInscribirTodos = $('#botonInscribirProfesoresTodos').hasClass('active');
        log('inscribirProfesoresTodos', aInscribirTodos);

        if (aInscribirTodos) {
            $('.btn-inscribirProfesor').addClass('active');
        } else {
            $('.btn-inscribirProfesor').removeClass('active');
        }
    });


    $(document).off('click', '#botonCancelarCurso').on('click', '#botonCancelarCurso', function(event) {
        event.preventDefault();
        regresaCursos();
    });

    $(document).off('click', '#botonGuardaCurso').on('click', '#botonGuardaCurso', function(event) {
        event.preventDefault();

        log('claveCurso', $('#claveCurso').val(), $('#claveCurso').val().length);
        log('nombreCurso', $('#nombreCurso').val(), $('#nombreCurso').val().length);
        log('descripcionCurso', $('#descripcionCurso').val(), $('#descripcionCurso').val().length);
        log('objetivosCurso', $('#editorObjetivos').next().find('.ck-editor__editable').html());
        log('temarioCurso', $('#editorTemario').next().find('.ck-editor__editable').html());
        log('uploaded-image', $('.uploaded-image>img').attr('src'));

        validaErroresCurso();

    });


    return $.ajax();
}


function validaErroresCurso() {

    var conErrores = false;
    var listaErrores = [];

    // Curso //
    $('#texto_error_claveCurso').html('');
    $('#texto_error_nombreCurso').html('');
    $('#texto_error_descripcionCurso').html('');
    $('#texto_error_objetivosCurso').html('');
    $('#texto_error_temarioCurso').html('');
    $('#texto_error_fechasCurso').html('');
    $('#texto_error_imagenCurso').html('');
    $('#texto_error_calif_Curso').html('');
    $('#texto_error_Curso').html('');

    listaErrores[0] = '';
    if ($('#claveCurso').val().length <= 0) {
        $('#texto_error_claveCurso').html('* Este campo es requerido');
        listaErrores[0] = 'nombreCurso';
    }
    listaErrores[1] = '';
    if ($('#nombreCurso').val().length <= 0) {
        $('#texto_error_nombreCurso').html('* Este campo es requerido');
        listaErrores[1] = 'nombreCurso';
    }
    listaErrores[2] = '';
    if ($('#descripcionCurso').val().length <= 0) {
        $('#texto_error_descripcionCurso').html('* Este campo es requerido');
        listaErrores[2] = 'descripcionCurso';
    }
    listaErrores[3] = '';
    if ($('#editorObjetivos').next().find('.ck-editor__editable').html() === '<p><br data-cke-filler="true"></p>') {
        $('#texto_error_objetivosCurso').html('* Este campo es requerido');
        listaErrores[3] = 'objetivosCurso';
    }
    listaErrores[4] = '';
    if ($('#editorTemario').next().find('.ck-editor__editable').html() === '<p><br data-cke-filler="true"></p>') {
        $('#texto_error_temarioCurso').html('* Este campo es requerido');
        listaErrores[4] = 'temarioCurso';
    }

    listaErrores[5] = '';
    if ($('#botonConFechas').hasClass('active') && ($('.input_fechas_1').val().length < 10 || $('.input_fechas_2').val().length < 10)) {
        $('#texto_error_fechasCurso').html('* Datos requeridos');
        listaErrores[5] = 'fechasCurso';
    }

    listaErrores[6] = '';
    if ($('.uploaded-image>img').attr('src') == undefined) {
        $('#texto_error_imagenCurso').html('* Imagen requerida');
        listaErrores[6] = 'imagenCurso';
    }
    // Curso //

    // Temas //   
    $('.texto_error_nombreTema').html('');
    // $('.texto_error_descripcionTema').html('');
    // $('.texto_error_objetivoTema').html('');
    $('.texto_error_contenidoTema').html('');

    cuantosTemas = $('.temas_int > .wrap_tema').length;

    listaErrores[7] = '';
    for (a = 1; a <= cuantosTemas; a++) {
        if ($('.temas_int').find('.nombreTema').eq((a - 1)).val().length <= 0) {
            $('.temas_int').find('.texto_error_nombreTema').eq((a - 1)).html('* Este campo es requerido');
            listaErrores[7] = 'nombreTema';
        }
    }

    // listaErrores[7] = '';
    // for (a = 1; a <= cuantosTemas; a++) {
    //     if ($('.temas_int').find('.descripcionTema').eq((a - 1)).val().length <= 0) {
    //         $('.temas_int').find('.texto_error_descripcionTema').eq((a - 1)).html('* Este campo es requerido');
    //         listaErrores[7] = 'descripcionTema';
    //     }
    // }

    // listaErrores[8] = '';
    // for (a = 1; a <= cuantosTemas; a++) {
    //     if ($('.temas_int').find('.objetivoTema').eq((a - 1)).val().length <= 0) {
    //         $('.temas_int').find('.texto_error_objetivoTema').eq((a - 1)).html('* Este campo es requerido');
    //         listaErrores[8] = 'objetivoTema';
    //     }
    // }

    console.warn('cuantosTemas', cuantosTemas);

    listaErrores[8] = '';
    for (a = 1; a <= cuantosTemas; a++) {
        var cuantosRecursosPorTema = $('.temas_int > .wrap_tema').eq((a - 1)).find('.rowContenido > .rowContenidoRecurso').length;
        log('cuantosRecursosPorTema', cuantosRecursosPorTema);

        console.warn('cuantosRecursosPorTema', cuantosRecursosPorTema);
        for (b = 1; b <= cuantosRecursosPorTema; b++) {
            // log($('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('elvalue'));
            if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('elvalue') == undefined) {
                $('.temas_int > .wrap_tema').eq((a - 1)).find('.texto_error_contenidoTema').eq((b - 1)).html('* Este campo es requerido');
                listaErrores[8] = 'temaContenido';
            }
        }
    }

    // rúbricas
    console.warn('cuantosTemas (Rubricas)', cuantosTemas);

    $('.texto_error_contenidoRubrica').html('');

    listaErrores[9] = '';
    for (a = 1; a <= cuantosTemas; a++) {
        var cuantosRecursosPorTema = $('.temas_int > .wrap_tema').eq((a - 1)).find('.rowContenido > .rowContenidoRecurso').length;
        log('cuantosRecursosPorTema', cuantosRecursosPorTema);

        console.warn('cuantosRecursosPorTema', cuantosRecursosPorTema);
        for (b = 1; b <= cuantosRecursosPorTema; b++) {
            // log('qqqqqq', a, b, $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('eltipoentrega'));
            // log('qqqqqq', a, b, $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaRubrica').eq((b - 1)).hasClass('recurso_deshabilitado'));
            // log('qqqqqq', a, b, $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaRubricaBoton').eq((b - 1)).attr('elid'));

            if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('eltipoentrega') != 'no') {
                if (!$('.temas_int > .wrap_tema').eq((a - 1)).find('.temaRubrica').eq((b - 1)).hasClass('recurso_deshabilitado')) {
                    // log('recurso_habilitado');
                    if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.temaRubricaBoton').eq((b - 1)).attr('elid') == undefined) {
                        $('.temas_int > .wrap_tema').eq((a - 1)).find('.texto_error_contenidoRubrica').eq((b - 1)).html('* Este campo es requerido');
                        listaErrores[9] = 'RubricaContenido';
                    }
                }
            }
        }
    }
    // rúbricas

    listaErrores[10] = '';
    log('valRestante', valRestante);
    if (valRestante > 0) {
        $('#texto_error_calif_Curso').html('* Todavía hay ' + valRestante + ' puntos sin usar en la calificación total');
        listaErrores[10] = 'califsCurso';
    }

    // Temas //     
    log('listaErrores:', listaErrores);
    for (a = 0; a < listaErrores.length; a++) {
        if (listaErrores[a] != '') {
            conErrores = true;
            log('con errores');
            $('#texto_error_Curso').html('* Hay campos incompletos todavía').append('<br>');
        }
    }
    if (!conErrores) {
        log('sin errores');
        subirCurso();
    }
}


function secAgregaCurso() {
    log('agregaCurso');

    // cuentaUsuariosAsig();
    ajustaCalifTotal();

    $(window).scrollTop(0);
    modoAgregar = true;
    elCursoIndex = 0;

    $('.cursos_int').css({
        'display': 'none'
    });
    $("#secEditarCurso").css({
        'display': 'block'
    });

    $("#titulo_modal_curso").html('Agregar Curso');
    $("#tabCursos>li>a").removeClass("active");
    $("#tabCursosContent>.active").removeClass("active");
    $("#botonInfoGral").addClass('show active');
    $("#infoGral").addClass('show active');

    $("#claveCurso").val('');
    $("#nombreCurso").val('');
    $("#descripcionCurso").val('');


    // Editor //
    ClassicEditor.create(document.querySelector('#editorObjetivos'), {
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
    }).then(editorObjetivos => {
        $(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
        // $('#editorRecurso').next().find(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    }).catch(error => {
        console.error(error);
    });

    ClassicEditor.create(document.querySelector('#editorTemario'), {
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
    }).then(editorTemario => {
        $(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
        // $('#editorRecurso').next().find(".ck-editor__editable_inline>p").html('<br data-cke-filler="true">');
    }).catch(error => {
        console.error(error);
    });
    // Editor //

    $('#botonConFechas').removeClass('active');
    muestraOculta($('#divConFechas'), 'oculta', 0);
    $(".input_fechas_1").val('');
    $(".input_fechas_2").val('');

    // upload image //
    $('.image-uploader').remove();

    $('.input-images').imageUploader({
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
        mimes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
        // preloaded: preloaded,
        imagesInputName: 'imagenCurso',
        preloadedInputName: 'imagenCurso',
        label: 'Arrastre la imagen aquí o haga clic para buscarla',
        maxSize: 1 * 1024 * 1024,
        maxFiles: 1
    });
    // upload image //

}


function secEditaCurso(cualCurso, cualCursoId) {
    cursoEditandoId = cualCursoId;
    cursoEditandoNum = cualCurso;
    log('secEditaCurso', cursoEditandoNum, cursoEditandoId);

    cuentaRecursosCur();
    cuentaUsuariosAsig();
    cuentaProfesorAsig();

    $(window).scrollTop(0);
    modoAgregar = false;
    elCursoIndex = cualCurso;

    $('.cursos_int').css({
        'display': 'none'
    });
    $("#secEditarCurso").css({
        'display': 'block'
    });

    $("#titulo_modal_curso").html('Editar Curso');
    $("#tabCursos>li>a").removeClass("active");
    $("#tabCursosContent>.active").removeClass("active");
    $("#botonInfoGral").addClass('show active');
    $("#infoGral").addClass('show active');

    $("#claveCurso").val(that['cursoClave' + cualCurso]);
    $("#nombreCurso").val(that['cursoNombre' + cualCurso]);
    $("#descripcionCurso").val(that['cursoDescripcion' + cualCurso]);

    // Editor //
    ClassicEditor.create(document.querySelector('#editorObjetivos'), {
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
    }).then(editorObjetivos => {
        editorObjetivos.data.set(that['cursoObjetivos' + cualCurso]);
    }).catch(error => {
        console.error(error);
    });

    ClassicEditor.create(document.querySelector('#editorTemario'), {
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
    }).then(editorTemario => {
        editorTemario.data.set(that['cursoTemario' + cualCurso]);
    }).catch(error => {
        console.error(error);
    });
    // Editor //

    if (that['cursoConFechas' + cualCurso] == false) {
        $('#botonConFechas').removeClass('active');
        muestraOculta($('#divConFechas'), 'oculta', 0);
    } else {
        $('#botonConFechas').addClass('active');
        muestraOculta($('#divConFechas'), 'muestra', 0);
        $(".input_fechas_1").val(that['cursoFecha_abre' + cualCurso]);
        $(".input_fechas_2").val(that['cursoFecha_cierra' + cualCurso]);
    }

    // upload image //
    let preloaded_img = [{
        id: 1,
        src: that['cursoPortada' + cualCurso]
    }, ];

    // $('.image-uploader').remove();

    $('.input-images').imageUploader({
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
        mimes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
        preloaded: preloaded_img,
        imagesInputName: 'imagenCurso',
        preloadedInputName: 'imagenCurso',
        label: 'Arrastre la imagen aquí o haga clic para buscarla',
        maxSize: 1 * 1024 * 1024,
        maxFiles: 1
    });
    // upload image //

    log('cursoConTemas', cursoConTemas, cuantosTemasCur);
    if (cursoConTemas) {
        var cont = 0;
        var timer = setInterval(function() {
                cont++;
                agregaTema();

                $('.temas_int').find('.nombreTema').eq((cont - 1)).val(that['temaNombre' + cont]);
                // $('.temas_int').find('.descripcionTema').eq((cont - 1)).val(that['temaDescripcion' + cont])
                // $('.temas_int').find('.objetivoTema').eq((cont - 1)).val(that['temaObjetivo' + cont]);

                eliminaContenidoRecurso($('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.rowContenidoRecurso'));

                for (b = 1; b <= that['cuantosRecursosTemaCurso' + cont]; b++) {
                    // log(b, cont, 'cualCurso', cualCurso, 'temaOrden', that['temaOrden' + cont], 'elRecursoNombre', that['curso' + cualCurso + 'Tema' + cont + 'elRecursoNombre' + b]);

                    agregaContenidoRecurso($('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.rowContenido'), false, that['curso' + cualCurso + 'Tema' + cont + 'RecursoCategoria' + b]);

                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).html(that['curso' + cualCurso + 'Tema' + cont + 'elRecursoNombre' + b]);

                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('elid', that['curso' + cualCurso + 'Tema' + cont + 'elRecursoId' + b]);

                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('laclave', that['curso' + cualCurso + 'Tema' + cont + 'elRecursoClave' + b]);
                    // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('elid', thas['recursoTemaCursoId' + b]);

                    log('NombreTemaRecurso', cualCurso, cont, b, that['curso' + cualCurso + 'Tema' + cont + 'elRecursoNombre' + b]);
                    log('IdTemaRecurso', cualCurso, cont, b, that['curso' + cualCurso + 'Tema' + cont + 'elRecursoId' + b]);
                    log('ClaveTemaRecurso', cualCurso, cont, b, that['curso' + cualCurso + 'Tema' + cont + 'elRecursoClave' + b]);
                    // log('califAuto1', cualCurso, cont, b, that['curso' + cualCurso + 'Tema' + cont + 'RecursoCalifAuto' + b]);
                    log('TipoCalificacion', cualCurso, cont, b, that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'Tipo']);
                    log('TipoCalificacion', cualCurso, cont, b, that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'IdRubrica']);

                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('elvalue', that['curso' + cualCurso + 'Tema' + cont + 'elRecursoNombre' + b]);
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('lacat', that['curso' + cualCurso + 'Tema' + cont + 'RecursoCategoria' + b]);
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('eltipoentrega', that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoEntrega' + b]);
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('laliga', that['curso' + cualCurso + 'Tema' + cont + 'RecursoLiga' + b]);

                    // descripción no necesaria
                    // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).data('recDesc', that['curso' + cualCurso + 'Tema' + cont + 'RecursoDescripcion' + b]);
                    // descripción no necesaria

                    // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).data('recTipoEntrega', that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoEntrega' + b]);
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaContenidoBoton').eq((b - 1)).data('recInst', that['curso' + cualCurso + 'Tema' + cont + 'RecursoInstrucciones' + b]);

                    if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoObligatorio' + b] == true) {
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_obligatorio').eq((b - 1)).addClass('active');
                    }

                    // no necesario
                    // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.input_intentos').eq((b - 1)).val(that['curso' + cualCurso + 'Tema' + cont + 'RecursoIntentos' + b]);                 
                    // if (!that['curso' + cualCurso + 'Tema' + cont + 'RecursoCalifMasAlta' + b] == true) {
                    //     $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn-calificacion').eq((b - 1)).addClass('active');
                    // }
                    // no necesario
                    // target.value = _valRestante;

                    valRestante = 0;
                    $('.calif_total_texto').html('Tienes <b>' + valRestante + '</b> puntos para repartir entre los recursos');
                    $('.calif_total_valor').html('<b>' + valRestante + '</b>');
                    $('.calif_total_barra').css({
                        'width': valRestante + '%'
                    });

                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calif_range').eq((b - 1)).find('input[type="range"]')[0].value = that['curso' + cualCurso + 'Tema' + cont + 'RecursoPuntosObtener' + b];
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calif_range').eq((b - 1)).find('input[type="range"]').css({
                        'background-size': that['curso' + cualCurso + 'Tema' + cont + 'RecursoPuntosObtener' + b] + '% 100%'
                    });
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.califEsteRecurso').eq((b - 1)).html(that['curso' + cualCurso + 'Tema' + cont + 'RecursoPuntosObtener' + b]);

                    // TODO eliminar
                    // if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoCalifAuto' + b] == 'si') {
                    //     $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_califAuto').eq((b - 1)).addClass('active');
                    //     // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_califAuto_texto').slideUp("normal", function() {
                    //     // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_califAuto_texto').eq((b - 1)).html('La tarea se califica con Aceptada/No Aceptada');
                    //     // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_califAuto_texto').slideDown();
                    //     // });
                    // } else if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoCalifAuto' + b] == 'no') {
                    //     $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_califAuto').eq((b - 1)).removeClass('active');
                    //     // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_califAuto_texto').eq((b - 1)).html('Requiere un valor numérico');
                    // } 
                    // TODO eliminar


                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(0).removeClass('active');
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(1).removeClass('active');
                    $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(2).removeClass('active');

                    if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'Tipo'] == 'auto') {
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(0).addClass('active');
                    } else if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'Tipo'] == 'manual') {
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(1).addClass('active');
                    } else if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'Tipo'] == 'rubrica') {
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(2).addClass('active');
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.temaRubrica').removeClass('recurso_deshabilitado');

                        // leer y aplicar cuál rubrica
                        log('IdRubrica', that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'IdRubrica']);
                        cuentaRubricas(cont, b, that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'IdRubrica']);
                    }

                    if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoTipoCalificacion' + b + 'Tipo'] != 'no') {
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).slideDown();
                    }


                    if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoVisible' + b] == 'si') {
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_visibleRec').eq((b - 1)).addClass('active');
                    } else if (that['curso' + cualCurso + 'Tema' + cont + 'RecursoVisible' + b] == 'no') {
                        $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.btn_visibleRec').eq((b - 1)).removeClass('active');
                    }

                }

                if (cont >= cuantosTemasCur) {
                    clearTimeout(timer);
                }
            },
            300);
    }

}


function cuentaRubricas(elNumtema, elNumRubrica, cualKey) {
    log('cuentaRubricas');

    // var cuantasRubricas = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos/').orderByKey().equalTo(cualKey).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                log('snapshot.val()', snapshot.val());

                var contadorRubricas = 0;

                snapshot.forEach(function(childSnapshot) {
                    log('childSnapshot', childSnapshot.key);

                    contadorRubricas++;

                    // this['rubricaNombre' + contadorRubricas] = snapshot.child(childSnapshot.key).child('Nombre').val();
                    // log(contadorRubricas, 'rubricaNombre', this['rubricaNombre' + contadorRubricas]);

                    laRubricaId = snapshot.child(childSnapshot.key).child('Id').val();
                    log(contadorRubricas, 'rubricaId', laRubricaId);
                    larubricaNombre = snapshot.child(childSnapshot.key).child('Nombre').val();
                    log(contadorRubricas, 'rubricaNombre', larubricaNombre);

                    // cuantasRubricas = contadorRubricas;
                });

                log('Se han leído todos los keys');
                aplicaRubricas(elNumtema, elNumRubrica, laRubricaId, larubricaNombre);

            }
        });
    }
}

function aplicaRubricas(cualNumtema, cualNumRubrica, cualRubricaId, cualRubricaNombre) {
    log('aplicaRubricas', cualNumtema, cualNumRubrica, cualRubricaId, cualRubricaNombre);
    // $('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.temaRubricaBoton').eq((b - 1)).html(thuse['rubricaNombre' + 1]);
    $('.temas_int').find('.wrap_tema').eq((cualNumtema - 1)).find('.temaRubricaBoton').eq((cualNumRubrica - 1)).html(cualRubricaNombre);
    $('.temas_int').find('.wrap_tema').eq((cualNumtema - 1)).find('.temaRubricaBoton').eq((cualNumRubrica - 1)).attr('elid', cualRubricaId);
}


function regresaCursos() {

    $('#texto_error_claveCurso').html('');
    $('#texto_error_nombreCurso').html('');
    $('#texto_error_descripcionCurso').html('');
    $('#texto_error_objetivosCurso').html('');
    $('#texto_error_temarioCurso').html('');
    $('#texto_error_fechasCurso').html('');
    $('#texto_error_imagenCurso').html('');
    $('#texto_error_calif_Curso').html('');
    $('#texto_error_Curso').html('');

    $('.temas_int').empty();

    // $('.cursos_int').css({
    //     'display': 'block'
    // });
    $("#secEditarCurso").css({
        'display': 'none'
    });

    // Editor //
    $('.ck-editor').remove();

    // upload image //
    $('.image-uploader').remove();


    cuentaCursos();
}

var contator;

function agregaTema() {
    log('agregaTema');
    contator = 0;

    var contenidoTema = '';
    // $('.temas_int').empty();

    contenidoTema += '<div class="wrap_tema">';

    contenidoTema += '     <div class="btn btn-sm btn-round float-right botonEliminarTema"> <i class="nc-icon-outline ui-1_trash-simple"></i>&nbsp; Eliminar</div>';

    contenidoTema += '     <div class="titulo_label">';
    contenidoTema += '         <h6 class="input_label">Nombre del Tema</h6>';
    contenidoTema += '         <span class="texto_error texto_error_nombreTema"></span>';
    contenidoTema += '     </div>';
    contenidoTema += '     <div class="row">';
    contenidoTema += '         <div class="col-8 curso_tema">';
    contenidoTema += '            <input type="text" class="form-control input_editar nombreTema" data-maxlength="65" placeholder="Nombre del Tema">';
    contenidoTema += '         </div>';
    contenidoTema += '    </div>';

    // contenidoTema += '     <br>';
    // contenidoTema += '    <div class="titulo_label">';
    // contenidoTema += '         <h6 class="input_label">Descripción</h6>';
    // contenidoTema += '         <span class="texto_error texto_error_descripcionTema"></span>';
    // contenidoTema += '    </div>';
    // contenidoTema += '     <input type="text" class="form-control input_editar descripcionTema" data-maxlength="65" placeholder="Descripción del Tema">';

    // contenidoTema += '     <br>';
    // contenidoTema += '     <div class="titulo_label">';
    // contenidoTema += '         <h6 class="input_label">Objetivo</h6>';
    // contenidoTema += '         <span class="texto_error texto_error_objetivoTema"></span>';
    // contenidoTema += '    </div>';
    // contenidoTema += '     <input type="text" class="form-control input_editar objetivoTema" data-maxlength="65" placeholder="Objetivo del Tema">';

    contenidoTema += '     <br>';
    contenidoTema += '     <div class="row rowContenido">';

    contenidoTema += '<div class="row rowContenidoRecurso mt-4 mb-2">';
    contenidoTema += '<span class="contenidoHandle"><i class="nc-icon-glyph arrows-2_select-83"></i></span>';
    contenidoTema += '<div class="col-sm-12 col-md-4">';
    contenidoTema += '     <div class="titulo_label">';
    contenidoTema += '     <h6 class="input_label">Contenido del Tema</h6>';
    contenidoTema += '     <span class="texto_error texto_error_contenidoTema"></span>';
    contenidoTema += '  </div>';

    contenidoTema += '  <div class="form-group dropdown bootstrap-select temaContenido">';
    contenidoTema += '      <button type="button" class="dropdown-toggle form-control select input_select temaContenidoBoton" required="true" data-toggle="dropdown">Selecciona un contenido</button>';
    contenidoTema += '      <div class="dropdown-menu">';
    contenidoTema += '       <div class="buscadorItemsDiv">';
    contenidoTema += '           <input type="text" class="buscadorItems" placeholder="Buscar...">';
    contenidoTema += '       </div>';
    for (a = 1; a <= cuantosRecursosCur; a++) {
        if (those['recursoCategoria' + a] != 'Rúbrica 4x4') {
            contenidoTema += '      <li id="temaContenidoItem' + a + '" role="option" class="dropdown-item temaContenidoItem"><span class="text" value="' + those['recursoNombre' + a] + '" id="' + those['recursoId' + a] + '" clave="' + those['recursoClave' + a] + '" liga="' + those['recursoLiga' + a] + '" categoria="' + those['recursoCategoria' + a] + '" tipoentrega="' + those['recursoTipoEntrega' + a] + '">' + those['recursoClave' + a] + ' - ' + those['recursoNombre' + a] + '</span></li>';

            // this['recDesc' + a] = those['recursoDescripcion' + a];
            this['recTipoEntrega' + a] = those['RecursoTipoEntrega' + a];
            this['recInst' + a] = those['recursoInstrucciones' + a];
            thes = this;

            // log('recDesc', thes['recDesc' + a]);
            // log('recInst', thes['recInst' + a]);
        }
    }
    contenidoTema += '      </div>';
    contenidoTema += '  </div>';


    // contenidoTema += '   <div class="form-group">';
    // contenidoTema += '       <select class="form-control dropdown bootstrap-select input_select temaContenido" required="true"> <option value="0" selected disabled>Selecciona un contenido</option>';
    // for (a = 1; a <= cuantosRecursosCur; a++) {
    //     contenidoTema += '       <option value="' + those['recursoNombre' + a] + '" id="' + those['recursoId' + a] + '" liga="' + those['recursoLiga' + a] + '" categoria="' + those['recursoCategoria' + a] + '">' + those['recursoNombre' + a] + '</option>';
    // }
    // contenidoTema += '       </select>';
    // contenidoTema += '      </div>';

    contenidoTema += '  </div>';


    // slider puntos
    contenidoTema += '<div class="col-sm-12 col-md-2">';
    contenidoTema += '<div class="titulo_label label_intentos">';
    contenidoTema += '   <h6 class="input_label">Ponderación</h6>';
    contenidoTema += '</div>';
    contenidoTema += '<div class="calif_range">';
    contenidoTema += '    <input type="range" min="0" max="100" value="0" step="any" />';
    contenidoTema += '    <h6 class="califEsteRecurso">0</h6>';
    contenidoTema += '</div>';
    contenidoTema += '</div>';
    // slider puntos


    // if (contator <= 1) {
    contenidoTema += '<div class="col-sm-12 col-md-1">';
    // } else {
    // contenidoTema += '<div class="col-sm-12 col-md-3">';
    // }
    contenidoTema += '<div class="titulo_label">';
    contenidoTema += '    <h6 class="input_label">Visible</h6>';
    contenidoTema += '</div>';
    contenidoTema += '<div class="btn btn-sm btn-toggle btn_visibleRec active" data-toggle="button">';
    contenidoTema += '    <div class="handle"></div>';
    contenidoTema += '</div>';
    contenidoTema += '</div>';



    // Obligatorio no necesario
    contenidoTema += '<div class="col-sm-12 col-md-2">';
    contenidoTema += '<div class="titulo_label">';
    contenidoTema += '    <h6 class="input_label">Obligatorio</h6>';
    contenidoTema += '</div>';
    contenidoTema += '<div id="botonObligatorio" class="btn btn-sm btn-toggle btn_obligatorio" data-toggle="button">';
    contenidoTema += '    <div class="handle"></div>';
    contenidoTema += '</div>';
    contenidoTema += '</div>';
    // Obligatorio no necesario


    // contenidoTema += '<br> <br>';
    // Intentos no necesarios
    // contenidoTema += '<div class="col-sm-12 col-md-2">';
    // contenidoTema += '<div class="titulo_label label_intentos">';
    // contenidoTema += '   <h6 class="input_label">Intentos</h6>';
    // contenidoTema += '</div>';
    // contenidoTema += '<div class="recurso_intentos">';
    // contenidoTema += '    <input type="text" class="form-control input_intentos" placeholder="Intentos" value="0" minimo="0" required="true" onkeypress="isInputNumber(event)">';
    // contenidoTema += '    <div class="btn btn-sm btn-round botonInputMas mas"> <i class="nc-icon-glyph ui-1_bold-add"></i></div>';
    // contenidoTema += '    <div class="btn btn-sm btn-round botonInputMenos menos"> <i class="nc-icon-glyph ui-1_bold-delete"></i></div>';
    // contenidoTema += '</div>';
    // contenidoTema += '</div>';
    // Intentos no necesarios


    // contenidoTema += '<br> <br>';
    // CalifMasAlta no necesaria
    // contenidoTema += '<div class="col-sm-12 col-md-4">';
    // contenidoTema += '<div class="titulo_label">';
    // contenidoTema += '    <h6 class="input_label">Calificación</h6>';
    // contenidoTema += '</div>';
    // contenidoTema += '<span class="toggle-label">Más Alta</span>';
    // contenidoTema += '<div id="botonCalifMasAlta" class="btn btn-sm btn-toggle btn-calificacion" data-toggle="button">';
    // contenidoTema += '    <div class="handle"></div>';
    // contenidoTema += '</div>';
    // contenidoTema += '<span class="toggle-label">Más Reciente</span>';
    // contenidoTema += '</div>';
    // CalifMasAlta no necesaria


    contenidoTema += '<br>';

    // rúbricas
    contenidoTema += '<div class="col-12 mt-2 mb-3- pl-5 calificaPor">';
    contenidoTema += '<div class="titulo_label">';
    contenidoTema += '    <h6 class="input_label">Se califica con</h6>';


    contenidoTema += '<br><br>';

    contenidoTema += '   <div class="row ml-3">';

    contenidoTema += '   <div class="mr-5">';
    contenidoTema += '       <div class="row">';
    contenidoTema += '           <div class="texto_subtitulo">Automática</div>';
    contenidoTema += '           <div id="botonRadioCalifica1" class="btn btn-sm btn-toggle mb-2 btn_radio_califica active" data-toggle="button">';
    contenidoTema += '               <div class="handle"></div>';
    contenidoTema += '           </div>';
    contenidoTema += '       </div>';
    contenidoTema += '   </div>';

    contenidoTema += '   <div class="mr-5">';
    contenidoTema += '       <div class="row">';
    contenidoTema += '           <div class="texto_subtitulo">Manual</div>';
    contenidoTema += '           <div id="botonRadioCalifica2" class="btn btn-sm btn-toggle mb-2 btn_radio_califica" data-toggle="button">';
    contenidoTema += '               <div class="handle"></div>';
    contenidoTema += '           </div>';
    contenidoTema += '       </div>';
    contenidoTema += '   </div>';

    contenidoTema += '   <div class="mr-5">';
    contenidoTema += '       <div class="row">';
    contenidoTema += '           <div class="texto_subtitulo">Rúbrica</div>';
    contenidoTema += '           <div id="botonRadioCalifica3" class="btn btn-sm btn-toggle mb-2 btn_radio_califica" data-toggle="button">';
    contenidoTema += '               <div class="handle"></div>';
    contenidoTema += '           </div>';
    contenidoTema += '       </div>';
    contenidoTema += '   </div>';

    contenidoTema += '   <div class="mt-n2 mr-5">';
    contenidoTema += '       <div class="row">';

    contenidoTema += '  <div class="form-group dropdown bootstrap-select temaRubrica recurso_deshabilitado">';
    contenidoTema += '      <button type="button" class="dropdown-toggle form-control select input_select temaRubricaBoton" required="true" data-toggle="dropdown">Selecciona una rúbrica</button>';
    contenidoTema += '      <div class="dropdown-menu">';
    contenidoTema += '       <div class="buscadorRubricasDiv">';
    contenidoTema += '           <input type="text" class="buscadorRubricas" placeholder="Buscar...">';
    contenidoTema += '       </div>';
    for (a = 1; a <= cuantosRecursosCur; a++) {
        if (those['recursoCategoria' + a] == 'Rúbrica 4x4') {
            contenidoTema += '      <li id="temaRubricaItem' + a + '" role="option" class="dropdown-item temaRubricaItem"><span class="text" value="' + those['recursoNombre' + a] + '" id="' + those['recursoId' + a] + '" clave="' + those['recursoClave' + a] + '" liga="' + those['recursoLiga' + a] + '" categoria="' + those['recursoCategoria' + a] + '" tipoentrega="' + those['recursoTipoEntrega' + a] + '">' + those['recursoClave' + a] + ' - ' + those['recursoNombre' + a] + '</span></li>';
        }
    }
    contenidoTema += '           </div>';

    contenidoTema += '<div class="ml-2">';
    contenidoTema += '<span class="texto_error texto_error_contenidoRubrica ml-0" style="line-height: 3;"></span>';
    contenidoTema += '</div>';

    // select de rúbricas

    contenidoTema += '       </div>';
    contenidoTema += '   </div>';

    contenidoTema += '</div>';


    contenidoTema += '</div>';


    contenidoTema += ' </div>';
    contenidoTema += '</div>';
    // rúbricas


    contenidoTema += '</div>';
    contenidoTema += '</div>';



    // contenidoTema += '     <div class="">';
    contenidoTema += '<div class="divisor"></div>';
    contenidoTema += '          <button class="btn btn-sm btn-round botonAgregarCh agregarContenidoRecurso" type="button"><i class="nc-icon-glyph ui-1_bold-add"></i>&nbsp; Agregar Recurso</button>';
    // contenidoTema += '     </div>';

    contenidoTema += '</div>';


    $('.temas_int').append(contenidoTema);
    $('.wrap_tema').slideDown();


    activaRadiosCalifica();

    $(document).off('click', '.temaContenidoItem').on('click', '.temaContenidoItem', function(event) {
        event.preventDefault();
        var elValue = $(this).find('span').attr('value');
        var elId = $(this).find('span').attr('id');
        var laClave = $(this).find('span').attr('clave');
        var laCat = $(this).find('span').attr('categoria');
        var laLiga = $(this).find('span').attr('liga');
        var elTipoEntrega = $(this).find('span').attr('tipoentrega');
        var itemNum = $(this).attr('id').split('temaContenidoItem')[1];
        $(this).parent().parent().find('.temaContenidoBoton').html(elValue);
        $(this).parent().parent().find('.temaContenidoBoton').attr('elid', elId);
        $(this).parent().parent().find('.temaContenidoBoton').attr('laclave', laClave);
        $(this).parent().parent().find('.temaContenidoBoton').attr('elvalue', elValue);
        $(this).parent().parent().find('.temaContenidoBoton').attr('lacat', laCat);
        $(this).parent().parent().find('.temaContenidoBoton').attr('eltipoentrega', elTipoEntrega);
        $(this).parent().parent().find('.temaContenidoBoton').attr('laliga', laLiga);

        // $(this).parent().parent().find('.temaContenidoBoton').data('recDesc', thes['recDesc' + itemNum]);
        $(this).parent().parent().find('.temaContenidoBoton').data('recInst', thes['recInst' + itemNum]);

        // log('laDesc', itemNum, thes['recDesc' + itemNum]);
        log('laInst', itemNum, thes['recInst' + itemNum]);

        log('laCat', laCat);
        if (laCat == "Entregable") {
            // $(this).parent().parent().parent().parent().find('.btn_califAuto').removeClass('active');
            // $(this).parent().parent().parent().parent().find('.btn_califAuto').show();
            // $(this).parent().parent().parent().parent().find('.btn_califAuto').attr('disabled', false);
            // $(this).parent().parent().parent().parent().find('.btn_califAuto_texto').html('Requiere un valor numérico');
            $(this).parent().parent().parent().parent().find('.calificaPor').slideDown();
        } else {
            // $(this).parent().parent().parent().parent().find('.btn_califAuto').hide();
            // $(this).parent().parent().parent().parent().find('.btn_califAuto').attr('disabled', 'disabled');
            // $(this).parent().parent().parent().parent().find('.btn_califAuto_texto').html('');
            $(this).parent().parent().parent().parent().find('.calificaPor').slideUp();
        }
    });

    $(document).off('click', '.temaRubricaItem').on('click', '.temaRubricaItem', function(event) {
        event.preventDefault();
        var elValue = $(this).find('span').attr('value');
        var elId = $(this).find('span').attr('id');
        // var laCat = $(this).find('span').attr('categoria');
        $(this).parent().parent().find('.temaRubricaBoton').html(elValue);
        $(this).parent().parent().find('.temaRubricaBoton').attr('elid', elId);
        // $(this).parent().parent().find('.temaRubricaBoton').attr('lacat', laCat);
    });


    // buscadorItems //
    $(".buscadorItems").keyup(function(event) {
        event.preventDefault();
        // if ($(this).val().length > 2) {
        log("buscando ok", $(this).val());

        for (b = 1; b <= cuantosRecursosCur; b++) {
            $(this).parent().parent().find('#temaContenidoItem' + b).hide();
            if ($(this).parent().parent().find('#temaContenidoItem' + b).find('span').html().toLowerCase().includes($(this).val().toLowerCase()) || $(this).parent().parent().find('#temaContenidoItem' + b).find('span').attr('clave').toLowerCase().includes($(this).val().toLowerCase())) {
                log('Encontré la palabra_', $(this).val(), 'con el recurso', $(this).parent().find('#temaContenidoItem' + b).find('span').html(), b);
                var cont = b;
                $(this).parent().parent().find('#temaContenidoItem' + cont).show();
            } else {
                log('No encontré nada');
            }
        }
    });

    $('.temaContenidoBoton').click(function(e) {
        e.preventDefault();
        // if (!$('.dropdown-menu').hasClass('show')) {
        $(".buscadorItems").val('');
        for (b = 1; b <= cuantosRecursosCur; b++) {
            $(this).parent().parent().find('#temaContenidoItem' + b).show();
        }
        // }
    });
    // buscadorItems //

    // buscadorRubricas //
    $(".buscadorRubricas").keyup(function(event) {
        event.preventDefault();
        // if ($(this).val().length > 2) {
        log("buscando ok", $(this).val());

        for (b = 1; b <= cuantosRecursosCur; b++) {
            if (those['recursoCategoria' + b] == 'Rúbrica 4x4') {
                $(this).parent().parent().find('#temaRubricaItem' + b).hide();
                if ($(this).parent().parent().find('#temaRubricaItem' + b).find('span').html().toLowerCase().includes($(this).val().toLowerCase()) || $(this).parent().parent().find('#temaRubricaItem' + b).find('span').attr('clave').toLowerCase().includes($(this).val().toLowerCase())) {
                    log('Encontré la palabra', $(this).val(), 'con el recurso', $(this).parent().find('#temaRubricaItem' + b).find('span').html(), b);
                    var cont = b;
                    $(this).parent().parent().find('#temaRubricaItem' + cont).show();
                } else {
                    log('No encontré nada');
                }
            }
        }
    });
    $('.temaRubricaBoton').click(function(e) {
        e.preventDefault();
        // if (!$('.dropdown-menu').hasClass('show')) {
        $(".buscadorRubricas").val('');
        for (b = 1; b <= cuantosRecursosCur; b++) {
            $(this).parent().parent().find('#temaRubricaItem' + b).show();
        }
        // }
    });
    // buscadorRubricas //


    $('.rowContenido').sortable({
        handle: '.contenidoHandle',
        animation: 350,
        ghostClass: 'sort_background',
    })


    ajustaCalifTotal();

}


function eliminaTema(cualTema) {
    log('eliminaTema', cualTema);

    $(cualTema).slideUp("normal", function() {
        $(cualTema).remove();
        ajustaCalifTotal();
    });
}



function agregaContenidoRecurso(cualRowContenido, agregando, categorec) {
    log('agregaContenidoRecurso', agregando, categorec);

    contator++;
    var contenidoRecurso = '';
    // $('.temas_int').empty();


    contenidoRecurso += '<div class="row rowContenidoRecurso mt-4- pb-2">';

    contenidoRecurso += '<div class="divisor mt-1 mb-4 ml-2 mr-2"></div>';

    contenidoRecurso += '<span class="contenidoHandle"><i class="nc-icon-glyph arrows-2_select-83"></i></span>';
    contenidoRecurso += '<div class="col-sm-12 col-md-4">';
    contenidoRecurso += '     <div class="titulo_label">';
    contenidoRecurso += '     <h6 class="input_label">Contenido del Tema</h6>';
    contenidoRecurso += '     <span class="texto_error texto_error_contenidoTema"></span>';
    contenidoRecurso += '    </div>';

    contenidoRecurso += '  <div class="form-group dropdown bootstrap-select temaContenido">';
    contenidoRecurso += '      <button type="button" class="dropdown-toggle form-control select input_select temaContenidoBoton" required="true" data-toggle="dropdown">Selecciona un contenido</button>';
    contenidoRecurso += '      <div class="dropdown-menu">';
    contenidoRecurso += '       <div class="buscadorItemsDiv">';
    contenidoRecurso += '           <input type="text" class="buscadorItems" placeholder="Buscar...">';
    contenidoRecurso += '       </div>';

    for (a = 1; a <= cuantosRecursosCur; a++) {
        if (those['recursoCategoria' + a] != 'Rúbrica 4x4') {
            contenidoRecurso += '      <li id="temaContenidoItem' + a + '" role="option" class="dropdown-item temaContenidoItem"><span class="text" value="' + those['recursoNombre' + a] + '" id="' + those['recursoId' + a] + '" clave="' + those['recursoClave' + a] + '" liga="' + those['recursoLiga' + a] + '" categoria="' + those['recursoCategoria' + a] + '" tipoentrega="' + those['recursoTipoEntrega' + a] + '">' + those['recursoClave' + a] + ' - ' + those['recursoNombre' + a] + '</span></li>';

            // this['recDesc' + a] = those['recursoDescripcion' + a];
            this['recTipoEntrega' + a] = those['RecursoTipoEntrega' + a];
            this['recInst' + a] = those['recursoInstrucciones' + a];
            thes = this;

            // log('recDesc c', thes['recDesc' + a]);
            // log('recInst c', thes['recInst' + a]);
        }
    }

    contenidoRecurso += '      </div>';
    contenidoRecurso += '  </div>';

    contenidoRecurso += '</div>';

    // slider puntos
    contenidoRecurso += '<div class="col-sm-12 col-md-2">';
    contenidoRecurso += '<div class="titulo_label label_intentos">';
    contenidoRecurso += '   <h6 class="input_label">Ponderación</h6>';
    contenidoRecurso += '</div>';
    contenidoRecurso += '<div class="calif_range">';
    contenidoRecurso += '    <input type="range" min="0" max="100" value="0" step="any" />';
    contenidoRecurso += '    <h6 class="califEsteRecurso">0</h6>';
    contenidoRecurso += '</div>';
    contenidoRecurso += '</div>';
    // slider puntos


    if (agregando) {
        contenidoRecurso += '<div class="col-sm-12 col-md-3">';
    } else {
        if (contator <= 1) {
            contenidoRecurso += '<div class="col-sm-12 col-md-1">';
        } else {
            contenidoRecurso += '<div class="col-sm-12 col-md-3">';
        }
    }
    contenidoRecurso += '<div class="titulo_label">';
    contenidoRecurso += '    <h6 class="input_label">Visible</h6>';
    contenidoRecurso += '</div>';
    contenidoRecurso += '<div class="btn btn-sm btn-toggle btn_visibleRec active" data-toggle="button">';
    contenidoRecurso += '    <div class="handle"></div>';
    contenidoRecurso += '</div>';
    contenidoRecurso += '</div>';


    if (!agregando) {
        if (contator <= 1) {
            contenidoRecurso += '<div class="col-sm-12 col-md-4">';
            contenidoRecurso += '<div class="titulo_label">';
            contenidoRecurso += '    <h6 class="input_label">Obligatorio</h6>';
            contenidoRecurso += '</div>';
            contenidoRecurso += '<div id="botonObligatorio" class="btn btn-sm btn-toggle btn_obligatorio" data-toggle="button">';
            contenidoRecurso += '    <div class="handle"></div>';
            contenidoRecurso += '</div>';
            contenidoRecurso += '</div>';
        }
    }



    // contenidoRecurso += '<br> <br>';
    // Intentos no necesarios
    // contenidoRecurso += '<div class="col-sm-12 col-md-2">';
    // contenidoRecurso += '<div class="titulo_label label_intentos">';
    // contenidoRecurso += '   <h6 class="input_label">Intentos</h6>';
    // contenidoRecurso += '</div>';
    // contenidoRecurso += '<div class="recurso_intentos">';
    // contenidoRecurso += '    <input type="text" class="form-control input_intentos" placeholder="Intentos" value="0" minimo="0" required="true" onkeypress="isInputNumber(event)">';
    // contenidoRecurso += '    <div class="btn btn-sm btn-round botonInputMas mas"> <i class="nc-icon-glyph ui-1_bold-add"></i></div>';
    // contenidoRecurso += '    <div class="btn btn-sm btn-round botonInputMenos menos"> <i class="nc-icon-glyph ui-1_bold-delete"></i></div>';
    // contenidoRecurso += '</div>';
    // contenidoRecurso += '</div>';
    // Intentos no necesarios

    // contenidoRecurso += '<br> <br>';


    // contenidoRecurso += '<br> <br>';
    // CalifMasAlta no necesaria
    //  contenidoRecurso += '<div class="col-sm-12 col-md-4">';
    // contenidoRecurso += '<div class="titulo_label">';
    // contenidoRecurso += '    <h6 class="input_label">Calificación</h6>';
    // contenidoRecurso += '</div>';
    // contenidoRecurso += '<span class="toggle-label">Más Alta</span>';
    // contenidoRecurso += '<div id="botonCalifMasAlta" class="btn btn-sm btn-toggle btn-calificacion" data-toggle="button">';
    // contenidoRecurso += '    <div class="handle"></div>';
    // contenidoRecurso += '</div>';
    // contenidoRecurso += '<span class="toggle-label">Más Reciente</span>';
    // contenidoRecurso += '</div>';
    // CalifMasAlta no necesaria

    if (!agregando) {
        if (contator >= 2) {
            contenidoRecurso += '<br> <br>';
            contenidoRecurso += '   <div class="rowContenidoBotonEliminar">';
            contenidoRecurso += '       <button class="btn btn-sm btn-round botonEliminarContenidoRecurso" type="button"><i class="nc-icon-outline ui-1_trash-simple"></i>&nbsp; Eliminar</button>';
            contenidoRecurso += '   </div>';
        }
    } else {
        contenidoRecurso += '<br> <br>';
        contenidoRecurso += '   <div class="rowContenidoBotonEliminar">';
        contenidoRecurso += '       <button class="btn btn-sm btn-round botonEliminarContenidoRecurso" type="button"><i class="nc-icon-outline ui-1_trash-simple"></i>&nbsp; Eliminar</button>';
        contenidoRecurso += '   </div>';
    }

    contenidoRecurso += '<br>';

    // rúbricas
    contenidoRecurso += '<div class="col-12 mt-2 mb-3- pl-5 calificaPor">';
    contenidoRecurso += '<div class="titulo_label">';
    contenidoRecurso += '    <h6 class="input_label">Se califica con</h6>';


    contenidoRecurso += '<br><br>';

    contenidoRecurso += '   <div class="row ml-3">';

    contenidoRecurso += '   <div class="mr-5">';
    contenidoRecurso += '       <div class="row">';
    contenidoRecurso += '           <div class="texto_subtitulo">Automática</div>';
    contenidoRecurso += '           <div id="botonRadioCalifica1" class="btn btn-sm btn-toggle mb-2 btn_radio_califica active" data-toggle="button">';
    contenidoRecurso += '               <div class="handle"></div>';
    contenidoRecurso += '           </div>';
    contenidoRecurso += '       </div>';
    contenidoRecurso += '   </div>';

    contenidoRecurso += '   <div class="mr-5">';
    contenidoRecurso += '       <div class="row">';
    contenidoRecurso += '           <div class="texto_subtitulo">Manual</div>';
    contenidoRecurso += '           <div id="botonRadioCalifica2" class="btn btn-sm btn-toggle mb-2 btn_radio_califica" data-toggle="button">';
    contenidoRecurso += '               <div class="handle"></div>';
    contenidoRecurso += '           </div>';
    contenidoRecurso += '       </div>';
    contenidoRecurso += '   </div>';

    contenidoRecurso += '   <div class="mr-5">';
    contenidoRecurso += '       <div class="row">';
    contenidoRecurso += '           <div class="texto_subtitulo">Rúbrica</div>';
    contenidoRecurso += '           <div id="botonRadioCalifica3" class="btn btn-sm btn-toggle mb-2 btn_radio_califica" data-toggle="button">';
    contenidoRecurso += '               <div class="handle"></div>';
    contenidoRecurso += '           </div>';
    contenidoRecurso += '       </div>';
    contenidoRecurso += '   </div>';

    contenidoRecurso += '   <div class="mt-n2 mr-5">';
    contenidoRecurso += '       <div class="row">';

    contenidoRecurso += '  <div class="form-group dropdown bootstrap-select temaRubrica recurso_deshabilitado">';
    contenidoRecurso += '      <button type="button" class="dropdown-toggle form-control select input_select temaRubricaBoton" required="true" data-toggle="dropdown">Selecciona una rúbrica</button>';
    contenidoRecurso += '      <div class="dropdown-menu">';
    contenidoRecurso += '       <div class="buscadorRubricasDiv">';
    contenidoRecurso += '           <input type="text" class="buscadorRubricas" placeholder="Buscar...">';
    contenidoRecurso += '       </div>';
    for (a = 1; a <= cuantosRecursosCur; a++) {
        if (those['recursoCategoria' + a] == 'Rúbrica 4x4') {
            contenidoRecurso += '      <li id="temaRubricaItem' + a + '" role="option" class="dropdown-item temaRubricaItem"><span class="text" value="' + those['recursoNombre' + a] + '" id="' + those['recursoId' + a] + '" clave="' + those['recursoClave' + a] + '" liga="' + those['recursoLiga' + a] + '" categoria="' + those['recursoCategoria' + a] + '" tipoentrega="' + those['recursoTipoEntrega' + a] + '">' + those['recursoClave' + a] + ' - ' + those['recursoNombre' + a] + '</span></li>';
        }
    }
    contenidoRecurso += '           </div>';

    contenidoRecurso += '<div class="ml-2">';
    contenidoRecurso += '<span class="texto_error texto_error_contenidoRubrica ml-0" style="line-height: 3;"></span>';
    contenidoRecurso += '</div>';

    // select de rúbricas

    contenidoRecurso += '       </div>';
    contenidoRecurso += '   </div>';

    contenidoRecurso += '</div>';


    contenidoRecurso += '</div>';


    contenidoRecurso += ' </div>';
    contenidoRecurso += '</div>';
    // rúbricas



    contenidoRecurso += '</div>';



    $(cualRowContenido).append(contenidoRecurso);
    // $(cualRowContenido).css({
    // 'display': 'none'
    // });
    // $('.rowContenidoRecurso').slideDown("normal", function() {
    //     $('.rowContenidoRecurso').css({
    //         // 'display': 'flex'
    //     });
    // });


    activaRadiosCalifica();



    // buscadorItems //
    $(".buscadorItems").keyup(function(event) {
        event.preventDefault();
        // if ($(this).val().length > 2) {
        log("buscando ok", $(this).val());

        for (b = 1; b <= cuantosRecursosCur; b++) {
            $(this).parent().parent().find('#temaContenidoItem' + b).hide();
            if ($(this).parent().parent().find('#temaContenidoItem' + b).find('span').html().toLowerCase().includes($(this).val().toLowerCase()) || $(this).parent().parent().find('#temaContenidoItem' + b).find('span').attr('clave').toLowerCase().includes($(this).val().toLowerCase())) {
                log('Encontré la palabra', $(this).val(), 'con el recurso', $(this).parent().find('#temaContenidoItem' + b).find('span').html(), b);
                var cont = b;
                $(this).parent().parent().find('#temaContenidoItem' + cont).show();
            } else {
                log('No encontré nada');
            }
        }
    });
    $('.temaContenidoBoton').click(function(e) {
        e.preventDefault();
        // if (!$('.dropdown-menu').hasClass('show')) {
        $(".buscadorItems").val('');
        for (b = 1; b <= cuantosRecursosCur; b++) {
            $(this).parent().parent().find('#temaContenidoItem' + b).show();
        }
        // }
    });
    // buscadorItems // 

    // buscadorRubricas //
    $(".buscadorRubricas").keyup(function(event) {
        event.preventDefault();
        // if ($(this).val().length > 2) {
        log("buscando ok", $(this).val());

        for (b = 1; b <= cuantosRecursosCur; b++) {
            if (those['recursoCategoria' + b] == 'Rúbrica 4x4') {
                $(this).parent().parent().find('#temaRubricaItem' + b).hide();
                if ($(this).parent().parent().find('#temaRubricaItem' + b).find('span').html().toLowerCase().includes($(this).val().toLowerCase()) || $(this).parent().parent().find('#temaRubricaItem' + b).find('span').attr('clave').toLowerCase().includes($(this).val().toLowerCase())) {
                    log('Encontré la palabra', $(this).val(), 'con el recurso', $(this).parent().find('#temaRubricaItem' + b).find('span').html(), b);
                    var cont = b;
                    $(this).parent().parent().find('#temaRubricaItem' + cont).show();
                } else {
                    log('No encontré nada');
                }
            }
        }
    });
    $('.temaRubricaBoton').click(function(e) {
        e.preventDefault();
        // if (!$('.dropdown-menu').hasClass('show')) {
        $(".buscadorRubricas").val('');
        for (b = 1; b <= cuantosRecursosCur; b++) {
            $(this).parent().parent().find('#temaRubricaItem' + b).show();
        }
        // }
    });
    // buscadorRubricas //


    ajustaCalifTotal();

}


function activaRadiosCalifica() {
    // tipoDeEntrega = parseInt($('.btn_radio_califica.active').attr('id').substr(20, 2));
    // log('tipoDeEntrega', tipoDeEntrega);

    for (a = 1; a <= cuantosTiposCalificacion; a++) {

        $(document).off('click', '#botonRadioCalifica' + a).on('click', '#botonRadioCalifica' + a, function(event) {
            event.preventDefault();

            $(this).parent().parent().parent().find('.btn_radio_califica').removeClass('active');
            $(this).addClass('active');

            var cualTipoCalificacion = parseInt($(this).attr('id').substr(18, 2));
            if (cualTipoCalificacion != 3) {
                $(this).parent().parent().parent().parent().find('.temaRubrica').addClass('recurso_deshabilitado');
            } else {
                $(this).parent().parent().parent().parent().find('.temaRubrica').removeClass('recurso_deshabilitado');
            }

        });
    }
}


function eliminaContenidoRecurso(cualContenidoRecurso) {
    // log('eliminaContenidoRecurso', cualContenidoRecurso);

    // $(cualContenidoRecurso).slideUp("normal", function() {
    $(cualContenidoRecurso).remove();
    // });
    ajustaCalifTotal();
}


function cuentaUsuariosAsig() {
    log('cuentaUsuariosAsig');

    var contadorUsuarios = 0;
    var contadorUsuariosAsignados = 0;

    if (revisaConexion) {

        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            // log('snapshot.val()', snapshot.val());
            arrayUsuarios = [];

            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot', childSnapshot.key);

                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        // log('childSnapshot.key', childSnapshot.key);
                        if (snapshot.child(childSnapshot.key).child('Perfil').val() == 'Participante' || snapshot.child(childSnapshot.key).child('Perfil').val() == 'Observador') {
                            contadorUsuarios++;

                            this['usuarioId' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Id').val();
                            // log(contadorUsuarios, 'usuarioId', this['usuarioId' + contadorUsuarios]);
                            this['usuarioNombre' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nombre').val();
                            // log(contadorUsuarios, 'usuarioNombre', this['usuarioNombre' + contadorUsuarios]);
                            this['usuarioApellidoPaterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                            // log(contadorUsuarios, 'ApellidoPaterno', this['usuarioApellidoPaterno' + contadorUsuarios]);
                            this['usuarioApellidoMaterno' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                            // log(contadorUsuarios, 'usuarioApellidoMaterno', this['usuarioApellidoMaterno' + contadorUsuarios]);
                            this['usuarioCorreo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Correo').val();
                            // log(contadorUsuarios, 'usuarioCorreo', this['usuarioCorreo' + contadorUsuarios]);
                            this['usuarioNivel' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Nivel').val();
                            // log(contadorUsuarios, 'usuarioNivel', this['usuarioNivel' + contadorUsuarios]);
                            this['usuarioPerfil' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Perfil').val();
                            // log(contadorUsuarios, 'usuarioPerfil', this['usuarioPerfil' + contadorUsuarios]);
                            this['usuarioPuesto' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Puesto').val();
                            // log(contadorUsuarios, 'usuarioPuesto', this['usuarioPuesto' + contadorUsuarios]);
                            this['usuarioGrupo' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Grupo').val();
                            // log(contadorUsuarios, 'usuarioGrupo', this['usuarioGrupo' + contadorUsuarios]);
                            this['usuarioVisible' + contadorUsuarios] = snapshot.child(childSnapshot.key).child('Visible').val();
                            // log(contadorUsuarios, 'usuarioVisible', this['usuarioVisible' + contadorUsuarios]);

                            arrayUsuarios.push({
                                'usuarioId': this['usuarioId' + contadorUsuarios],
                                'usuarioNombre': this['usuarioNombre' + contadorUsuarios],
                                'usuarioApellidoPaterno': this['usuarioApellidoPaterno' + contadorUsuarios],
                                'usuarioApellidoMaterno': this['usuarioApellidoMaterno' + contadorUsuarios],
                                'usuarioCorreo': this['usuarioCorreo' + contadorUsuarios],
                                'usuarioPerfil': this['usuarioPerfil' + contadorUsuarios],
                                'usuarioPuesto': this['usuarioPuesto' + contadorUsuarios],
                                'usuarioGrupo': this['usuarioGrupo' + contadorUsuarios],
                                'usuarioVisible': this['usuarioVisible' + contadorUsuarios]
                            });
                        }
                    }

                });

                log('arrayUsuarios', arrayUsuarios);
                cuantosUsuarios = contadorUsuarios;
                thosi = this;
                return pintaUsuariosAsig();
            }
        });


        // firebase.database().ref(laUrlBase + 'Cursos/' + cursoEditandoId + '/Asignacion').once('value').then(function(snapshot) {
        //     if (snapshot.val() != null) {
        //         snapshot.forEach(function(childSnapshot) {
        //             // log('childSnapshot', childSnapshot.key);

        //             if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
        //                 // log('childSnapshot.key', childSnapshot.key);
        //                 contadorUsuariosAsignados++;

        //                 this['usuarioAsignadoId' + contadorUsuariosAsignados] = snapshot.child(childSnapshot.key).child('Id').val();
        //                 log(contadorUsuariosAsignados, 'usuarioAsignadoId', this['usuarioAsignadoId' + contadorUsuariosAsignados]);
        //                 this['usuarioAsignadoFechaAbre' + contadorUsuariosAsignados] = snapshot.child(childSnapshot.key).child('Fecha_abre').val();
        //                 // log(contadorUsuariosAsignados, 'usuarioAsignadoFechaAbre', this['usuarioAsignadoFechaAbre' + contadorUsuariosAsignados]);
        //                 this['usuarioAsignadoFechaCierra' + contadorUsuariosAsignados] = snapshot.child(childSnapshot.key).child('Fecha_cierra').val();
        //                 // log(contadorUsuariosAsignados, 'usuarioAsignadoFechaCierra', this['usuarioAsignadoFechaCierra' + contadorUsuariosAsignados]);

        //                 cuantosUsuariosAsignados = contadorUsuariosAsignados;
        //             }

        //         });

        //         log('cuantosUsuariosAsignados', cuantosUsuariosAsignados);

        //     }

        // });

    }
}


function cuentaProfesorAsig() {
    log('cuentaProfesorAsig');

    var contadorProfesores = 0;
    var contadorProfesoresAsignados = 0;

    if (revisaConexion) {

        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            // log('snapshot.val()', snapshot.val());
            arrayProfesores = [];

            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot', childSnapshot.key);

                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        // log('childSnapshot.key', childSnapshot.key);

                        // sin Administrador
                        // if (snapshot.child(childSnapshot.key).child('Perfil').val() == 'Administrador' || snapshot.child(childSnapshot.key).child('Perfil').val() == 'Asesor Académico') {
                        if (snapshot.child(childSnapshot.key).child('Perfil').val() == 'Asesor Académico') {
                            contadorProfesores++;

                            this['usuarioId' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Id').val();
                            log(contadorProfesores, 'usuarioId', this['usuarioId' + contadorProfesores]);
                            this['usuarioNombre' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Nombre').val();
                            log(contadorProfesores, 'usuarioNombre', this['usuarioNombre' + contadorProfesores]);
                            this['usuarioApellidoPaterno' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Apellido_Paterno').val();
                            log(contadorProfesores, 'ApellidoPaterno', this['usuarioApellidoPaterno' + contadorProfesores]);
                            this['usuarioApellidoMaterno' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Apellido_Materno').val();
                            log(contadorProfesores, 'usuarioApellidoMaterno', this['usuarioApellidoMaterno' + contadorProfesores]);
                            this['usuarioCorreo' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Correo').val();
                            log(contadorProfesores, 'usuarioCorreo', this['usuarioCorreo' + contadorProfesores]);
                            this['usuarioNivel' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Nivel').val();
                            log(contadorProfesores, 'usuarioNivel', this['usuarioNivel' + contadorProfesores]);
                            this['usuarioPerfil' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Perfil').val();
                            log(contadorProfesores, 'usuarioPerfil', this['usuarioPerfil' + contadorProfesores]);
                            this['usuarioPuesto' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Puesto').val();
                            log(contadorProfesores, 'usuarioPuesto', this['usuarioPuesto' + contadorProfesores]);
                            this['usuarioGrupo' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Grupo').val();
                            log(contadorProfesores, 'usuarioGrupo', this['usuarioGrupo' + contadorProfesores]);
                            this['usuarioVisible' + contadorProfesores] = snapshot.child(childSnapshot.key).child('Visible').val();
                            log(contadorProfesores, 'usuarioVisible', this['usuarioVisible' + contadorProfesores]);

                            arrayProfesores.push({
                                'usuarioId': this['usuarioId' + contadorProfesores],
                                'usuarioNombre': this['usuarioNombre' + contadorProfesores],
                                'usuarioApellidoPaterno': this['usuarioApellidoPaterno' + contadorProfesores],
                                'usuarioApellidoMaterno': this['usuarioApellidoMaterno' + contadorProfesores],
                                'usuarioCorreo': this['usuarioCorreo' + contadorProfesores],
                                'usuarioPerfil': this['usuarioPerfil' + contadorProfesores],
                                'usuarioPuesto': this['usuarioPuesto' + contadorProfesores],
                                'usuarioGrupo': this['usuarioGrupo' + contadorProfesores],
                                'usuarioVisible': this['usuarioVisible' + contadorProfesores]
                            });
                        }
                    }

                });

                log('arrayProfesores', arrayProfesores);
                cuantosProfesores = contadorProfesores;
                thosii = this;
                return pintaProfesorAsig();
            }
        });

    }
}


function cuentaGrupos() {
    log('cuentaGrupos');

    var contadorGrupos = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Usuarios').once('value').then(function(snapshot) {
            // log('snapshot.val()', snapshot.val());
            arrayGrupos = [];
            cuantosGrupos = 0;

            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot', childSnapshot.key);

                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        // log('childSnapshot.key', childSnapshot.key);

                        // if (snapshot.child(childSnapshot.key).child('Perfil').val() == 'Asesor Académico') {
                        contadorGrupos++;

                        this['grupo' + contadorGrupos] = snapshot.child(childSnapshot.key).child('Grupo').val();
                        // log(contadorGrupos, 'grupo', this['grupo' + contadorGrupos]);

                        if (arrayGrupos.indexOf(this['grupo' + contadorGrupos]) === -1) {
                            arrayGrupos.push(this['grupo' + contadorGrupos]);
                            cuantosGrupos++;

                            arrayGruposAsignados[cuantosGrupos] = [];
                        }
                        // }
                    }

                });

                // log('arrayGrupos', arrayGrupos);
                // log('cuantosGrupos', cuantosGrupos);
                thisi = this;
                return cuentaProfAsignados();
            }
        });
    }
}

function cuentaProfAsignados() {
    log('cuentaProfAsignados');

    arrayUsuariosGrupos = [];
    var contadorGrupos = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos/' + that['cursoId' + elCursoIndex]).once('value').then(function(snapshot) {
            // log('snapshot.val()', snapshot.val());

            // cuantosGrupos = 0;

            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot', childSnapshot.key);

                    if (childSnapshot.key == "Asignacion") {

                        childSnapshot.forEach(function(childSnapshot2) {
                            // log('childSnapshot2', childSnapshot2.key);

                            if (childSnapshot2.key != undefined && childSnapshot2.key != null && childSnapshot2.key != '' && childSnapshot2.key != 'undefined' && childSnapshot2.key != 'val') {
                                // log('childSnapshot2.key', childSnapshot2.key);

                                contadorGrupos++;

                                this['profesorId' + contadorGrupos] = childSnapshot2.key;
                                // log(contadorGrupos, 'profesorId', this['profesorId' + contadorGrupos]);
                                this['profesorGrupos' + contadorGrupos] = childSnapshot.child(childSnapshot2.key).child('Grupos').val();
                                // log(contadorGrupos, 'profesorGrupos', this['profesorGrupos' + contadorGrupos]);

                                // if (arrayGrupos.indexOf(this['grupo' + contadorGrupos]) === -1) {
                                arrayUsuariosGrupos.push({
                                    'profesorId': this['profesorId' + contadorGrupos],
                                    'profesorGrupos': this['profesorGrupos' + contadorGrupos],
                                });
                                // this['arrayProfesorGrupos' + contadorGrupos] = this['profesorGrupos' + contadorGrupos].split(',');
                                // log('arrayProfesorGrupos', this['arrayProfesorGrupos' + contadorGrupos]);
                                // log('arrayUsuariosGrupos', arrayUsuariosGrupos);

                                //     cuantosGrupos++;
                                // }

                            }

                        });
                    }
                });

                // log('arrayGrupos', arrayGrupos);
                // log('cuantosGrupos', cuantosGrupos);
                thiso = this;
                // return pintaGrupos();
                return;
            }
        });
    }
}

function pintaGrupos() {
    log('pintaGrupos arrayGrupos', arrayGrupos);
    log('pintaGrupos arrayUsuariosGrupos', arrayUsuariosGrupos);

    $('.btn-inscribirProfesor').parent().parent().next().addClass('row_mostrar_grupo');
    $('.row_mostrar_grupo').after('<td class="lista_grupos" colspan="5"></td>');
    for (b = 0; b < cuantosGrupos; b++) {
        $('.lista_grupos').append('<div id="lista_grupos_indiv' + b + '" class="lista_grupos_indiv"><div id="botonGrupo' + b + '" grupoid="' + arrayGrupos[b] + '" class="btn btn-sm btn-toggle btn-inscribirGrupo" data-toggle="button"><div class="handle"></div></div>' + arrayGrupos[b] + '</div>');
    }

    for (c = 1; c <= arrayUsuariosGrupos.length; c++) {
        for (e = 1; e <= cuantosProfesores; e++) {

            if (arrayUsuariosGrupos[(c - 1)].profesorId == arrayProfesores[(e - 1)].usuarioId) {
                for (f = 1; f <= cuantosGrupos; f++) {
                    // log('iiiiii', $('#botoninscribirProfesor' + (e - 1)).parent().parent().next().next().find('#botonGrupo' + (f - 1)).attr('grupoid'), arrayUsuariosGrupos[(c - 1)].profesorGrupos.split(',')[0]);

                    for (g = 0; g < arrayUsuariosGrupos[(c - 1)].profesorGrupos.length; g++) {

                        if ($('#botoninscribirProfesor' + (e - 1)).parent().parent().next().next().find('#botonGrupo' + (f - 1)).attr('grupoid') == arrayUsuariosGrupos[(c - 1)].profesorGrupos.split(',')[g]) {
                            // log('uuuuu', $('#botoninscribirProfesor' + (e - 1)).parent().parent().next().next().find('#botonGrupo' + (f - 1)).attr('grupoid'), arrayUsuariosGrupos[(c - 1)].profesorGrupos.toString());

                            $('#botoninscribirProfesor' + (e - 1)).parent().parent().next().next().find('#botonGrupo' + (f - 1)).addClass('active');

                            // arrayGruposAsignados[(e - 1)].splice($.inArray(arrayUsuariosGrupos[(c - 1)].profesorGrupos, arrayGruposAsignados[(e - 1)]), 1);

                            if (arrayUsuariosGrupos[(c - 1)].profesorGrupos[0] == ',') {
                                arrayUsuariosGrupos[(c - 1)].profesorGrupos = arrayUsuariosGrupos[(c - 1)].profesorGrupos.substr(1, arrayUsuariosGrupos[(c - 1)].profesorGrupos.length);
                            }

                            arrayGruposAsignados[(e - 1)] = arrayUsuariosGrupos[(c - 1)].profesorGrupos.split(',');

                            // TODO validar si hay grupos vacíos
                            // if (arrayGruposAsignados[(e - 1)] [(c - 1)]== '') {
                            //     log('arrayGruposAsignados vacio', e, c, arrayUsuariosGrupos[(c - 1)].profesorGrupos);
                            // }

                            dataSetProfAsig[(e - 1)][5] = arrayUsuariosGrupos[(c - 1)].profesorGrupos.toString();

                        }
                    }
                }
            }
        }
    }

    log('arrayGruposAsignados', arrayGruposAsignados);
    log('dataSetProfAsig', dataSetProfAsig);


    return cargador('oculta');
}


function cuentaTemasCur(cualCurso) {
    log('cuentaTemasCur', that['cursoId' + cualCurso]);

    cargador('muestra');
    var contadorTemas = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Cursos/' + that['cursoId' + cualCurso] + '/Temas').once('value').then(function(snapshot) {
            // log('snapshot.val()', snapshot.val());
            cursoConTemas = false;

            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot', childSnapshot.key);


                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        log('childSnapshot.key', childSnapshot.key);
                        cursoConTemas = true;
                        contadorTemas++;

                        this['temaId' + contadorTemas] = snapshot.child(childSnapshot.key).child('Id').val();
                        log(contadorTemas, 'temaId', this['temaId' + contadorTemas]);
                        this['temaNombre' + contadorTemas] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        log(contadorTemas, 'temaNombre', this['temaNombre' + contadorTemas]);
                        this['temaDescripcion' + contadorTemas] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                        log(contadorTemas, 'temaDescripcion', this['temaDescripcion' + contadorTemas]);
                        this['temaObjetivo' + contadorTemas] = snapshot.child(childSnapshot.key).child('Objetivo').val();
                        log(contadorTemas, 'temaObjetivo', this['temaObjetivo' + contadorTemas]);
                        this['temaOrden' + contadorTemas] = snapshot.child(childSnapshot.key).child('Orden').val();
                        log(contadorTemas, 'temaOrden', this['temaOrden' + contadorTemas]);

                        cuantosTemasCur = contadorTemas;

                        childSnapshot.forEach(function(childSnapshot2) {
                            // log('childSnapshot2', childSnapshot2.key);

                            if (childSnapshot2.key == "Recursos") {
                                this['cuantosRecursosTemaCurso' + contadorTemas] = childSnapshot2.numChildren();
                                // log('cuantosRecursos del Curso', cualCurso, 'Tema', this['temaOrden' + contadorTemas], this['cuantosRecursosTemaCurso' + contadorTemas]);

                                var contadorRecursosPorTema = 0;

                                childSnapshot2.forEach(function(childSnapshot3) {
                                    contadorRecursosPorTema++;

                                    this['recursoTemaCursoId' + contadorRecursosPorTema] = childSnapshot2.child(childSnapshot3.key).child('Id').val();
                                    log('recursoTemaCursoId', this['recursoTemaCursoId' + contadorRecursosPorTema]);
                                    this['recursoTemaCursoClave' + contadorRecursosPorTema] = childSnapshot2.child(childSnapshot3.key).child('Clave').val();
                                    log('recursoTemaCursoClave', this['recursoTemaCursoClave' + contadorRecursosPorTema]);
                                    this['recursoTemaCursoNombre' + contadorRecursosPorTema] = childSnapshot2.child(childSnapshot3.key).child('Nombre').val();
                                    log('recursoTemaCursoNombre', this['recursoTemaCursoNombre' + contadorRecursosPorTema]);
                                    this['recursoTemaCursoOrden' + contadorRecursosPorTema] = childSnapshot2.child(childSnapshot3.key).child('Orden').val();
                                    log('recursoTemaCursoOrden', this['recursoTemaCursoOrden' + contadorRecursosPorTema]);
                                    this['RecursoTemaCursoVisible' + contadorRecursosPorTema] = childSnapshot2.child(childSnapshot3.key).child('Visible').val();
                                    log('RecursoTemaCursoVisible', this['RecursoTemaCursoVisible' + contadorRecursosPorTema]);
                                    this['recursoTemaCursoPromediable' + contadorRecursosPorTema] = childSnapshot2.child(childSnapshot3.key).child('Promediable').val();
                                    log('recursoTemaCursoPromediable', this['recursoTemaCursoPromediable' + contadorRecursosPorTema]);
                                    this['recursoTemaCursoPuntosObtener' + contadorRecursosPorTema] = parseInt(childSnapshot2.child(childSnapshot3.key).child('PuntosObtener').val());
                                    this['recursoTemaCursoTipoEntrega' + contadorRecursosPorTema] = parseInt(childSnapshot2.child(childSnapshot3.key).child('TipoDeEntrega').val());
                                    log('recursoTemaCursoTipoEntrega', this['recursoTemaCursoTipoEntrega' + contadorRecursosPorTema]);
                                    this['recursoTemaCursoCalifAuto' + contadorRecursosPorTema] = childSnapshot2.child(childSnapshot3.key).child('CalifAutomatica').val();
                                    log('recursoTemaCursoCalifAuto', this['recursoTemaCursoCalifAuto' + contadorRecursosPorTema]);

                                });


                            }
                        });

                    }

                });

                log('cuantosTemasCur', cuantosTemasCur);
                thas = this;
                return secEditaCurso(cualCurso, that['cursoId' + cualCurso]);
            }
        });
    }
}


function cuentaRecursosCur() {
    log('cuentaRecursosCur');

    var contadorRecursos = 0;

    if (revisaConexion) {
        firebase.database().ref(laUrlBase + 'Recursos').once('value').then(function(snapshot) {
            // log('snapshot.val()', snapshot.val());
            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    // log('childSnapshot', childSnapshot.key);

                    if (childSnapshot.key != undefined && childSnapshot.key != null && childSnapshot.key != '' && childSnapshot.key != 'undefined' && childSnapshot.key != 'val') {
                        // log('childSnapshot.key', childSnapshot.key);
                        contadorRecursos++;

                        this['recursoId' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Id').val();
                        log(contadorRecursos, 'recursoId', this['recursoId' + contadorRecursos]);
                        this['recursoClave' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Clave').val();
                        log(contadorRecursos, 'recursoClave', this['recursoClave' + contadorRecursos]);
                        this['recursoNombre' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Nombre').val();
                        // log(contadorRecursos, 'recursoNombre', this['recursoNombre' + contadorRecursos]);
                        this['recursoLiga' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Liga').val();
                        // log(contadorRecursos, 'recursoLiga', this['recursoLiga' + contadorRecursos]);
                        this['recursoCategoria' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Categoria').val();
                        // log(contadorRecursos, 'recursoCategoria', this['recursoCategoria' + contadorRecursos]);

                        // descripción no necesaria
                        // this['recursoDescripcion' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Descripcion').val();
                        // log(contadorRecursos, 'recursoDescripcion', this['recursoDescripcion' + contadorRecursos]);
                        // descripción no necesaria

                        this['recursoTipoEntrega' + contadorRecursos] = snapshot.child(childSnapshot.key).child('TipoDeEntrega').val();
                        if (this['recursoTipoEntrega' + contadorRecursos] == null) {
                            this['recursoTipoEntrega' + contadorRecursos] = 'no'
                        }
                        log(contadorRecursos, 'recursoTipoEntrega', this['recursoTipoEntrega' + contadorRecursos]);
                        this['recursoInstrucciones' + contadorRecursos] = snapshot.child(childSnapshot.key).child('Instrucciones').val();
                        log(contadorRecursos, 'recursoInstrucciones', this['recursoInstrucciones' + contadorRecursos]);

                        cuantosRecursosCur = contadorRecursos;
                    }

                });

                log('cuantosRecursosCur', cuantosRecursosCur);
                those = this;
                // return pintaUsuariosAsig();
            }
        });
    }
}


function leeEstatusCurso(estatusNumeroCurso) {
    if (revisaConexion) {

        var elRefRevisado = laUrlBase + 'Lecciones/' + usuarioId + '/' + that['cursoId' + estatusNumeroCurso];
        // log('elRefRevisado', elRefRevisado);
        // var contador = 0;

        firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {

                var cursoEstatus = snapshot.child('Estatus').val();
                log('Curso Revisado: ', cursoEstatus);

                if (cursoEstatus == 'incompleto') {
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').addClass('nc-icon-glyph ui-2_time icon_amarillo');
                }
                if (cursoEstatus == 'completo') {
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').addClass('nc-icon-glyph ui-1_check-circle-08 icon_verde');
                }
                if (cursoEstatus == 'aprobado') {
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').addClass('nc-icon-glyph ui-1_check-circle-08 icon_verde');
                }
                if (cursoEstatus == 'no_aprobado') {
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').removeClass('nc-icon-outline');
                    $('#estatus_curso_scorm' + estatusNumeroCurso + ' > i').addClass('nc-icon-glyph ui-1_circle-remove icon_rojo');
                }
            }
        });

    }
}


function pintaUsuariosAsig() {
    log('pintaUsuariosAsig');

    // $(window).scrollTop(0);
    dataSetUsuAsig = [];
    var footerUsuAsig = '';
    $('#tfootUsuAsig').empty();

    footerUsuAsig = '<tr>';
    footerUsuAsig += '  <th> </th>';
    footerUsuAsig += '  <th>Clave</th>';
    footerUsuAsig += '  <th>Grupo</th>';
    footerUsuAsig += '  <th>Nombre</th>';
    footerUsuAsig += '  <th>Perfil</th>';
    footerUsuAsig += '  <th> </th>';
    footerUsuAsig += '</tr>';

    $('#tfootUsuAsig').append(footerUsuAsig);


    var arrayUsuariosAsignados = [];
    for (a = 1; a <= cuantosUsuAsigPorCurso; a++) {
        arrayUsuariosAsignados.push(that['cursoUsuAsigId' + a + '_' + cursoEditandoNum]);
    }
    log('arrayUsuariosAsignados', arrayUsuariosAsignados);

    var divAsignado;
    var asignado;

    for (a = 0; a < arrayUsuarios.length; a++) {

        if ($.inArray(arrayUsuarios[a].usuarioId, arrayUsuariosAsignados) !== -1) {
            divAsignado = '<div id="botoninscribirAlumno' + a + '" usuarioasigid="' + arrayUsuarios[a].usuarioId + '" class="btn btn-sm btn-toggle btn-inscribirAlumno active" data-toggle="button">' +
                '    <div class="handle"></div>' +
                '</div>';
            asignado = true;
        } else {
            divAsignado = '<div id="botoninscribirAlumno' + a + '" usuarioasigid="' + arrayUsuarios[a].usuarioId + '" class="btn btn-sm btn-toggle btn-inscribirAlumno" data-toggle="button">' +
                '    <div class="handle"></div>' +
                '</div>';
            asignado = false;
        }

        dataSetUsuAsig[a] = [
            divAsignado,
            arrayUsuarios[a].usuarioId,
            arrayUsuarios[a].usuarioGrupo,
            arrayUsuarios[a].usuarioNombre + ' ' + arrayUsuarios[a].usuarioApellidoPaterno + ' ' + arrayUsuarios[a].usuarioApellidoMaterno,
            // arrayUsuarios[a].usuarioCorreo,
            arrayUsuarios[a].usuarioPerfil,
            '<div id="botonResetearAlumno' + a + '" usuid="' + arrayUsuarios[a].usuarioId + '" class="btn btn-round btn-icon btn-sm btn-primary botonResetearAlumno botonEliminarUsuario"><i class="nc-icon-outline ui-1_trash-simple" style="margin-top: 6px;"></i></div>',
            asignado
        ];
    }
    log('dataSetUsuAsig ', dataSetUsuAsig);

    $('#tablaUsuariosAsig thead tr:first-child').remove();

    setTimeout(function() {

        tablaUsuariosAsig = $('#tablaUsuariosAsig').DataTable({
            data: dataSetUsuAsig,
            "destroy": true,
            // paging: false,
            "columnDefs": [{
                "targets": "_all",
                "editable": true
            }],
            order: [
                [1, 'asc']
            ],
            "language": {
                "url": "js/dataTable_spanish.json"
            },
            columns: [{
                title: 'Inscribir'
            }, {
                title: 'Clave'
            }, {
                title: 'Grupo'
            }, {
                title: 'Nombre'
            }, {
                title: 'Perfil'
            }, {
                title: 'Avance'
            }],
            "initComplete": function(settings) {

                this.api().columns().every(function() {
                    let column = this;
                    let title = column.footer().textContent;

                    // Create input element
                    let input = document.createElement('input');
                    input.placeholder = title;
                    column.footer().replaceChildren(input);

                    // Event listener for user input
                    input.addEventListener('keyup', () => {
                        if (column.search() !== this.value) {
                            column.search(input.value).draw();
                        }
                    });
                });

                $('input[type=search]').val('-');
                setTimeout(function() {
                    $('input[type=search]').val('');
                    $('#tablaUsuariosAsig tfoot tr').appendTo('#tablaUsuariosAsig thead');
                }, 50);

                $('#tfootUsuAsig').find('input').addClass('form-control form-control-sm');
                $('#tfootUsuAsig').find('th:first-child').empty();
                // $('#tfootUsuAsig').find('th:first-child').append('<div id="botonInscribirAlumnosTodos" class="btn btn-sm btn-toggle btn-inscribirAlumnosTodos" data-toggle="button">' + '<div class="handle"></div>' + '</div>');
                $('#tfootUsuAsig').find('th:last-child').empty();


                // $('#tablaUsuariosAsig').on('page.dt', function() {
                //     var table = $('#tablaUsuariosAsig').DataTable();
                //     var datos = table.data();
                //     // Envía datos al servidor o realiza la acción deseada
                //     log(datos);
                // });



                function recalculaUsuAsig() {
                    log('recalculaUsuAsig');

                    $(document).off('click', '.btn-inscribirAlumno').on('click', '.btn-inscribirAlumno', function(event) {
                        event.preventDefault();
                        var elNuevoAlumno = $(this).attr('id').split('botoninscribirAlumno')[1];
                        var nuevoAlumnoInscrito = $(this).hasClass('active');
                        // log('nuevoAlumnoInscrito', nuevoAlumnoInscrito);
                        log('elNuevoAlumno', elNuevoAlumno, nuevoAlumnoInscrito);

                        dataSetUsuAsig[elNuevoAlumno][6] = nuevoAlumnoInscrito;
                        log(dataSetUsuAsig);
                    });

                }

                if (!modoAgregar) {

                    recalculaUsuAsig();
                    $('#tablaUsuariosAsig').on('page.dt', function() {
                        recalculaUsuAsig();
                    });
                    // $(document).off('click', '#tablaUsuariosAsig_length > label > select').on('click', '#tablaUsuariosAsig_length > label > select', function(e) {
                    //     recalculaUsuAsig();
                    // });

                }

                // for (d = 0; d <= cuantosUsuarios; d++) {
                $(document).off('click', '.botonResetearAlumno').on('click', '.botonResetearAlumno', function(event) {
                    event.preventDefault();
                    var elUsuario = $(this).attr('usuid');
                    // log('elUsuario', elUsuario);
                    resetearAvance(elUsuario);
                });
                // }

            }
        });

    }, 100);


    return $.ajax();
};


function pintaProfesorAsig() {
    log('pintaProfesorAsig');

    // $(window).scrollTop(0);
    dataSetProfAsig = [];
    var footerProfAsig = '';
    $('#tfootProfAsig').empty();

    footerProfAsig = '<tr>';
    footerProfAsig += '  <th> </th>';
    footerProfAsig += '  <th>Clave</th>';
    footerProfAsig += '  <th>Nombre</th>';
    footerProfAsig += '  <th>Perfil</th>';
    footerProfAsig += '  <th> </th>';
    footerProfAsig += '</tr>';

    $('#tfootProfAsig').append(footerProfAsig);


    var arrayProfesoresAsignados = [];
    for (a = 0; a < arrayProfesores.length; a++) {

        // log('arrayProfesores[a].usuarioId', a, arrayProfesores[a].usuarioId);

        // if ($.inArray(arrayProfesores[a].usuarioId, arrayProfesoresAsignados) == -1) {

        arrayProfesoresAsignados.push(that['cursoUsuAsigId' + a + '_' + cursoEditandoNum]);

    }

    // }
    // log('arrayProfesoresAsignados', arrayProfesoresAsignados);

    var divProfAsignado;
    var profAsignado;
    var elGrupo;

    for (a = 0; a < arrayProfesores.length; a++) {

        if ($.inArray(arrayProfesores[a].usuarioId, arrayProfesoresAsignados) !== -1) {
            divProfAsignado = '<div id="botoninscribirProfesor' + a + '" profesorasigid="' + arrayProfesores[a].usuarioId + '" class="btn btn-sm btn-toggle btn-inscribirProfesor active" data-toggle="button">' +
                '    <div class="handle"></div>' +
                '</div>';
            profAsignado = true;
        } else {
            divProfAsignado = '<div id="botoninscribirProfesor' + a + '" profesorasigid="' + arrayProfesores[a].usuarioId + '" class="btn btn-sm btn-toggle btn-inscribirProfesor" data-toggle="button">' +
                '    <div class="handle"></div>' +
                '</div>';
            profAsignado = false;
        }

        dataSetProfAsig[a] = [
            divProfAsignado,
            arrayProfesores[a].usuarioId,
            arrayProfesores[a].usuarioNombre + ' ' + arrayProfesores[a].usuarioApellidoPaterno + ' ' + arrayProfesores[a].usuarioApellidoMaterno,
            // arrayProfesores[a].usuarioCorreo,
            arrayProfesores[a].usuarioPerfil,
            // arrayProfesores[a].usuarioPuesto,
            '<div id="botonResetearProfesor' + a + '" profesorasigid="' + arrayProfesores[a].usuarioId + '" class="btn btn-round btn-icon btn-sm btn-primary botonResetearProfesor botonEliminarUsuario"><i class="nc-icon-outline ui-1_trash-simple" style="margin-top: 6px;"></i></div>',
            '',
            profAsignado
        ];
    }
    log('dataSetProfAsig ', dataSetProfAsig);

    $('#tablaProfesorAsig thead tr:first-child').remove();

    setTimeout(function() {

        tablaProfesorAsig = $('#tablaProfesorAsig').DataTable({
            data: dataSetProfAsig,
            "destroy": true,
            // paging: false,
            "columnDefs": [{
                "targets": "_all",
                "editable": true
            }],
            // searching: false,
            order: [
                [1, 'asc']
            ],
            "language": {
                "url": "js/dataTable_spanish.json"
            },
            columns: [{
                title: 'Inscribir'
            }, {
                title: 'Clave'
            }, {
                title: 'Nombre'
            }, {
                title: 'Perfil'
            }, {
                title: 'Avance'
            }],
            "initComplete": function(settings) {

                // this.api().columns().every(function() {
                //     let column = this;
                //     let title = column.footer().textContent;

                //     // Create input element
                //     let input = document.createElement('input');
                //     input.placeholder = title;
                //     column.footer().replaceChildren(input);

                //     // Event listener for user input
                //     input.addEventListener('keyup', () => {
                //         if (column.search() !== this.value) {
                //             column.search(input.value).draw();
                //         }
                //     });
                // });

                $('input[type=search]').val('-');
                setTimeout(function() {
                    $('input[type=search]').val('');
                    $('#tablaProfesorAsig tfoot tr').appendTo('#tablaProfesorAsig thead');
                }, 50);

                $('#tfootProfAsig').find('input').addClass('form-control form-control-sm');
                $('#tfootProfAsig').find('th:first-child').empty();
                // $('#tfootProfAsig').find('th:first-child').append('<div id="botonInscribirProfesoresTodos" class="btn btn-sm btn-toggle btn-inscribirProfesoresTodos" data-toggle="button">' + '<div class="handle"></div>' + '</div>');

                tablaProfesorAsig.rows().every(function(index) {
                    this.child(
                        $('<div class="row_mostrar_grupo_div row_mostrar_grupo_div_inactivo"><i class="nc-icon-glyph arrows-1_minimal-down mr-2"></i>Mostrar Grupos</div>')
                    ).show();
                });

                function recalculaProfAsig() {
                    log('recalculaProfAsig');

                    // $('.btn-inscribirProfesor').on('click', function(event) {
                    $(document).off('click', '.btn-inscribirProfesor').on('click', '.btn-inscribirProfesor', function(event) {
                        event.preventDefault();

                        var elNuevoProfesor = $(this).attr('id').split('inscribirProfesor')[1];
                        var nuevoProfesorInscrito = $(this).hasClass('active');
                        // log('nuevoProfesorInscrito', nuevoProfesorInscrito);
                        log('elNuevoProfesor', elNuevoProfesor, nuevoProfesorInscrito);

                        if ($(this).hasClass('active')) {
                            $(this).parent().parent().next().addClass('row_mostrar_grupo_activo');
                            $(this).parent().parent().next().find('.row_mostrar_grupo_div').removeClass('row_mostrar_grupo_div_inactivo');


                            // TODO leer si existe en el arrayUsuariosGrupos, entonces
                            // agregarlo con su profesorGrupos
                            // o eliminarlo
                            log('arrayUsuariosGrupos 00', arrayUsuariosGrupos.length);

                            // se agrega
                            arrayUsuariosGrupos[arrayUsuariosGrupos.length] = {
                                'profesorId': $(this).attr('profesorasigid'),
                                'profesorGrupos': ''
                            };
                            // arrayUsuariosGrupos[arrayUsuariosGrupos.length].profesorGrupos.push('');
                            log('arrayUsuariosGrupos 0', arrayUsuariosGrupos);


                        } else {
                            $(this).parent().parent().next().removeClass('row_mostrar_grupo_activo');
                            $(this).parent().parent().next().find('.row_mostrar_grupo_div').addClass('row_mostrar_grupo_div_inactivo');
                            $(this).parent().parent().next().find('.row_mostrar_grupo_div').html('<i class="nc-icon-glyph arrows-1_minimal-down mr-2"></i>Mostrar Grupos');
                            $(this).parent().parent().next().next().find('.lista_grupos_indiv').slideUp();
                            // $(this).parent().parent().next().next().find('.btn-inscribirGrupo').removeClass('active');

                            var cualProfId = $(this).attr('profesorasigid');
                            log('cualProfId', cualProfId);

                            for (a = 0; a < arrayUsuariosGrupos.length; a++) {
                                log('arrayUsuariosGrupos 000', arrayUsuariosGrupos[a].profesorId, cualProfId);

                                if (arrayUsuariosGrupos[a].profesorId.indexOf(cualProfId) !== -1) {
                                    // splice
                                    arrayUsuariosGrupos.splice(a, 1);
                                    log('arrayUsuariosGrupos 0000', arrayUsuariosGrupos);
                                }
                            }

                        }



                        dataSetProfAsig[elNuevoProfesor][6] = nuevoProfesorInscrito;
                        log(dataSetProfAsig);

                    });

                    $(document).off('click', '.row_mostrar_grupo_activo').on('click', '.row_mostrar_grupo_activo', function(event) {
                        event.preventDefault();
                        // var cualProfRow = parseInt($(this).attr('id').substr(22, 3));
                        log('mostrarGrupo', $(this));

                        if ($(this).next().find('.lista_grupos_indiv').css('display') == 'none') {
                            $(this).find('.row_mostrar_grupo_div').html('<i class="nc-icon-glyph arrows-1_minimal-up mr-2"></i>Mostrar Grupos');
                            $(this).next().find('.lista_grupos_indiv').slideDown();
                        } else {
                            $(this).find('.row_mostrar_grupo_div').html('<i class="nc-icon-glyph arrows-1_minimal-down mr-2"></i>Mostrar Grupos');
                            $(this).next().find('.lista_grupos_indiv').slideUp();
                        }
                    });

                    $(document).off('click', '.btn-inscribirGrupo').on('click', '.btn-inscribirGrupo', function(event) {
                        event.preventDefault();
                        // var cualProfRow = parseInt($(this).attr('id').substr(22, 3));
                        var cualProfId = $(this).parent().parent().prev().prev().find('.btn-inscribirProfesor').attr('profesorasigid');
                        log('cualProfId', cualProfId);
                        var cualProf = $(this).parent().parent().prev().prev().find('.btn-inscribirProfesor').attr('id').split('botoninscribirProfesor')[1];
                        log('cualProf', cualProf);
                        var cualGrupoRow = $(this).attr('id').split('botonGrupo')[1];
                        log('cualGrupoRow', cualGrupoRow);
                        var cualGrupo = $(this).attr('grupoid');
                        log('cualGrupo', cualGrupo);



                        var arrayProfG = [];
                        if ($(this).hasClass('active')) {
                            // arrayGruposAsignados[cualProf].push(cualGrupo);

                            for (a = 0; a < arrayUsuariosGrupos.length; a++) {
                                log('arrayUsuariosGrupos 1', arrayUsuariosGrupos[a].profesorId, cualProfId);

                                if (arrayUsuariosGrupos[a].profesorId.indexOf(cualProfId) !== -1) {

                                    // split
                                    arrayProfG = arrayUsuariosGrupos[a].profesorGrupos.split(',');
                                    log('arrayProfG', arrayProfG);
                                    // push
                                    arrayProfG.push(cualGrupo);
                                    log('arrayProfG', arrayProfG);
                                    // string
                                    arrayProfG = arrayProfG.toString();
                                    if (arrayProfG[0] == ',') {
                                        arrayProfG = arrayProfG.substr(1, arrayProfG.length);
                                    }
                                    arrayUsuariosGrupos[a].profesorGrupos = arrayProfG;
                                    log('arrayProfG', arrayProfG);

                                }
                            }
                        } else {
                            for (a = 0; a < arrayUsuariosGrupos.length; a++) {
                                log('arrayUsuariosGrupos 1', arrayUsuariosGrupos[a].profesorId, cualProfId);

                                if (arrayUsuariosGrupos[a].profesorId.indexOf(cualProfId) !== -1) {
                                    // split
                                    arrayProfG = arrayUsuariosGrupos[a].profesorGrupos.split(',');
                                    log('arrayProfG', arrayProfG);
                                    // splice
                                    for (b = 0; b < arrayProfG.length; b++) {
                                        if (arrayProfG[b].indexOf(cualGrupo) !== -1) {
                                            log('arrayProfG[b].indexOf(cualGrupo)', arrayProfG[b].indexOf(cualGrupo), b);
                                            arrayProfG.splice(b, 1);
                                        }
                                    }
                                    log('arrayProfG', arrayProfG);
                                    // string
                                    arrayUsuariosGrupos[a].profesorGrupos = arrayProfG.toString();
                                    log('arrayProfG', arrayProfG);
                                }
                            }
                        }

                        log('arrayUsuariosGrupos 2', arrayUsuariosGrupos);

                        arrayGruposAsignados[cualProf] = arrayProfG;
                        log('arrayGruposAsignados', arrayGruposAsignados);

                        dataSetProfAsig[cualProf][5] = arrayGruposAsignados[cualProf].toString();
                        log('dataSetProfAsig', dataSetProfAsig);
                    });

                    setTimeout(function() {
                        for (a = 0; a <= cuantosProfesores; a++) {
                            if ($('#botoninscribirProfesor' + a).hasClass('active')) {
                                $('#botoninscribirProfesor' + a).parent().parent().next().addClass('row_mostrar_grupo_activo');
                                $('#botoninscribirProfesor' + a).parent().parent().next().find('.row_mostrar_grupo_div').removeClass('row_mostrar_grupo_div_inactivo');
                            }
                        }

                        pintaGrupos();
                    }, 1000);

                }

                if (!modoAgregar) {

                    setTimeout(function() {
                        recalculaProfAsig();
                    }, 500);

                    $(document).off('page.dt', '#tablaProfesorAsig').on('page.dt', '#tablaProfesorAsig', function(event) {
                        event.preventDefault();
                        recalculaProfAsig();
                    });

                }

                // for (d = 0; d <= cuantosProfesores; d++) {
                $(document).off('click', '.botonResetearProfesor').on('click', '.botonResetearProfesor', function(event) {
                    event.preventDefault();
                    var elUsuario = $(this).attr('profesorasigid');
                    // log('elUsuario', elUsuario);
                    resetearAvance(elUsuario);
                });
                // }

                setTimeout(function() {
                    cuentaGrupos();
                }, 100);

            }
        });

    }, 100);


    return $.ajax();
};



function subirPortadaCurso(divInput) {
    log("[SUBIENDO PORTADA]", divInput);

    var elInput = $('#imagenCurso')[0];
    log("elInput", elInput);

    // if (IdCurso.length === 0) {
    //     var cursoId = generarId();
    //     IdCurso = "curso_" + cursoId;
    // }
    log("IdCurso", IdCurso);

    if (elInput) {
        // actualiza portada del recurso en el servidor
        var formIm = $('#formImg')[0];
        var formData = new FormData(formIm);
        formData.append("zip_file", divInput.files[0]);
        // formData.append("CODE_RESOURCE", "UPLOAD_RESOURCE");
        // formData.append("CODE_PHOTO", "UPLOAD_PHOTO");
        formData.append("IdCurso", IdCurso);
        // formData.append("FileName", FileName);
        log("formData", divInput.files[0]);

        $.ajax({
            url: "php/curso_upload.php",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                Portada = laUrlBase + "cursos/" + IdCurso + "/curso_portada.jpg";
                log("Portada agregada exitosamente");

                regresaCursos();
                return data;
            },
            error: function() {
                log('Error occured');
                cargador('oculta');
            }
        });
    }
}

function subirCurso() {
    log("[SUBIENDO CURSO]", elCursoIndex, modoAgregar);
    cargador('muestra');

    if (modoAgregar == true) {
        // if (IdCurso.length === 0) {
        var cursoId = generarId();
        IdCurso = "curso_" + cursoId;
        // }
    } else {
        IdCurso = that['cursoId' + elCursoIndex];
    }
    log("IdCurso", IdCurso);

    // Curso //
    var curso = {};
    curso.Id = IdCurso;
    curso.Clave = $('#claveCurso').val();
    curso.Nombre = $('#nombreCurso').val();
    curso.Descripcion = $('#descripcionCurso').val();
    curso.Objetivos = $('#editorObjetivos').next().find('.ck-editor__editable').html();
    curso.Temario = $('#editorTemario').next().find('.ck-editor__editable').html();

    if (!$('#botonConFechas').hasClass('active')) {
        curso.conFechas = false;
    } else {
        curso.conFechas = {}
        curso.conFechas.Fecha_abre = $('.input_fechas_1').val();
        curso.conFechas.Fecha_cierra = $('.input_fechas_2').val();
    }

    curso.Visible = true;
    curso.Portada = 'cursos/' + IdCurso + '/curso_portada.jpg';

    log('CURSO', curso);
    // Curso //

    // Temas //
    var temas = {};
    temas.val = true;
    cuantosTemas = $('.temas_int > .wrap_tema').length;
    log('cuantosTemas', cuantosTemas);


    for (a = 1; a <= cuantosTemas; a++) {
        // log('IdTema', IdTema);

        temas['tema_' + a] = {};
        temas['tema_' + a].Id = 'tema_' + a;
        temas['tema_' + a].Orden = a;
        temas['tema_' + a].Nombre = $('.temas_int').find('.nombreTema').eq((a - 1)).val();
        // temas['tema_' + a].Descripcion = $('.temas_int').find('.descripcionTema').eq((a - 1)).val();
        // temas['tema_' + a].Objetivo = $('.temas_int').find('.objetivoTema').eq((a - 1)).val();

        temas['tema_' + a].Recursos = {};
        var cuantosRecursosPorTema = $('.temas_int > .wrap_tema').eq((a - 1)).find('.rowContenido > .rowContenidoRecurso').length;
        log('cuantosRecursosPorTema', cuantosRecursosPorTema);

        for (b = 1; b <= cuantosRecursosPorTema; b++) {
            var IdTemaRecurso = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('elid');
            log('IdTemaRecurso', IdTemaRecurso);
            var ClaveTemaRecurso = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('laclave');
            log('ClaveTemaRecurso', ClaveTemaRecurso);
            var LigaTemaRecurso = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('laliga');
            log('LigaTemaRecurso', LigaTemaRecurso);
            var CategoriaTemaRecurso = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('lacat');
            log('CategoriaTemaRecurso', CategoriaTemaRecurso);

            // descripción no necesaria
            // var DescripcionTemaRecurso = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).data('recDesc');
            // log('DescripcionTemaRecurso', DescripcionTemaRecurso);
            // descripción no necesaria

            var TipoEntregaTemaRecurso = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('eltipoentrega');
            log('TipoEntregaTemaRecurso', TipoEntregaTemaRecurso);
            var InstruccionesTemaRecurso = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).data('recInst');
            log('InstruccionesTemaRecurso', InstruccionesTemaRecurso);
            var PuntosObtenerTemaRecurso = parseInt($('.temas_int > .wrap_tema').eq((a - 1)).find('.califEsteRecurso').eq((b - 1)).html());
            log('PuntosObtenerTemaRecurso', PuntosObtenerTemaRecurso);

            temas['tema_' + a].Recursos['recurso_' + b] = {};
            temas['tema_' + a].Recursos['recurso_' + b].Id = IdTemaRecurso;
            temas['tema_' + a].Recursos['recurso_' + b].Nombre = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('elvalue');
            temas['tema_' + a].Recursos['recurso_' + b].Clave = ClaveTemaRecurso;
            temas['tema_' + a].Recursos['recurso_' + b].Liga = LigaTemaRecurso;
            temas['tema_' + a].Recursos['recurso_' + b].Categoria = CategoriaTemaRecurso;
            // temas['tema_' + a].Recursos['recurso_' + b].Descripcion = DescripcionTemaRecurso;
            temas['tema_' + a].Recursos['recurso_' + b].TipoDeEntrega = TipoEntregaTemaRecurso;
            temas['tema_' + a].Recursos['recurso_' + b].Instrucciones = InstruccionesTemaRecurso;
            temas['tema_' + a].Recursos['recurso_' + b].Orden = b;
            // temas['tema_' + a].Recursos['recurso_' + b].Intentos = parseInt($('.temas_int > .wrap_tema').eq((a - 1)).find('.input_intentos').eq((b - 1)).val());
            temas['tema_' + a].Recursos['recurso_' + b].Obligatorio = $('.temas_int > .wrap_tema').eq((a - 1)).find('.btn_obligatorio').eq((b - 1)).hasClass('active');
            // temas['tema_' + a].Recursos['recurso_' + b].CalifMasAlta = !$('.temas_int > .wrap_tema').eq((a - 1)).find('.btn-calificacion').eq((b - 1)).hasClass('active');
            temas['tema_' + a].Recursos['recurso_' + b].Promediable = false;
            temas['tema_' + a].Recursos['recurso_' + b].PuntosObtener = PuntosObtenerTemaRecurso;


            temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion = {};

            // if ($('.temas_int').find('.wrap_tema').eq((cont - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(0).addClass('active')) {




            if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.temaContenidoBoton').eq((b - 1)).attr('eltipoentrega') != 'no') {

                if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(0).hasClass('active')) {
                    temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.Tipo = 'auto';
                    temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.IdRubrica = 'no';
                } else if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(1).hasClass('active')) {
                    temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.Tipo = 'manual';
                    temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.IdRubrica = 'no';
                } else if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.calificaPor').eq((b - 1)).find('.btn_radio_califica').eq(2).hasClass('active')) {
                    temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.Tipo = 'rubrica';
                    temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.IdRubrica = $('.temas_int > .wrap_tema').eq((a - 1)).find('.temaRubricaBoton').eq((b - 1)).attr('elid');
                }

            } else {
                temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.Tipo = 'no';
                temas['tema_' + a].Recursos['recurso_' + b].TipoDeCalificacion.IdRubrica = 'no';
            }




            if ($('.temas_int > .wrap_tema').eq((a - 1)).find('.btn_visibleRec').eq((b - 1)).hasClass('active')) {
                temas['tema_' + a].Recursos['recurso_' + b].RecursoVisible = 'si';
            } else {
                temas['tema_' + a].Recursos['recurso_' + b].RecursoVisible = 'no';
            }
        }

    }

    log('TEMAS', temas);
    // Temas //

    // Inscripciones //
    var asignacion = {};
    asignacion.val = true;
    var cuantasInscripciones = 0;
    log('arrayUsuarios', arrayUsuarios);


    // elimina filtros
    if (arrayUsuarios.length > 0) {
        tablaUsuariosAsig.search('');
        tablaUsuariosAsig.columns().search('').draw();

        for (c = 0; c < arrayUsuarios.length; c++) {
            // cuantasInscripciones += $('#botoninscribirAlumno' + c).hasClass('active');
            if (dataSetUsuAsig[c][6] == true) {
                cuantasInscripciones++;
                this['usuInscId' + c] = dataSetUsuAsig[c][1];
                log('cuantasInscripciones', cuantasInscripciones, this['usuInscId' + c]);

                asignacion[this['usuInscId' + c]] = {};
                asignacion[this['usuInscId' + c]].val = true;
                asignacion[this['usuInscId' + c]].Id = dataSetUsuAsig[c][1];
                asignacion[this['usuInscId' + c]].Clase = 1;
                // if ($('#botonConFechas').hasClass('active')) {
                //     asignacion[this['usuInscId' + c]].Fecha_abre = $('.input_fechas_1').val();
                //     asignacion[this['usuInscId' + c]].Fecha_cierra = $('.input_fechas_2').val();
                // } else {
                asignacion[this['usuInscId' + c]].Fecha_abre = false;
                asignacion[this['usuInscId' + c]].Fecha_cierra = false;
                // }
                asignacion[this['usuInscId' + c]].Grupos = dataSetUsuAsig[c][2];

            }
        }
    }
    log('ASIGNACIÓN USUARIOS', asignacion);


    // elimina filtros
    // tablaProfesorAsig.search('');
    // tablaProfesorAsig.columns().search('').draw();

    for (c = 0; c < arrayProfesores.length; c++) {
        // cuantasInscripciones += $('#botoninscribirAlumno' + c).hasClass('active');
        if (dataSetProfAsig[c][6] == true) {
            cuantasInscripciones++;
            this['ProfInscId' + c] = dataSetProfAsig[c][1];
            log('cuantasInscripciones', cuantasInscripciones, this['ProfInscId' + c]);

            asignacion[this['ProfInscId' + c]] = {};
            asignacion[this['ProfInscId' + c]].Id = dataSetProfAsig[c][1];
            asignacion[this['ProfInscId' + c]].Clase = 1;
            if ($('#botonConFechas').hasClass('active')) {
                asignacion[this['ProfInscId' + c]].Fecha_abre = $('.input_fechas_1').val();
                asignacion[this['ProfInscId' + c]].Fecha_cierra = $('.input_fechas_2').val();
            } else {
                asignacion[this['ProfInscId' + c]].Fecha_abre = false;
                asignacion[this['ProfInscId' + c]].Fecha_cierra = false;
            }

            // var arrayGruposAsignados = new Array();
            // asignacion[this['ProfInscId' + c]].Grupos = '';
            // asignacion[this['ProfInscId' + c]].Grupos = dataSetProfAsig[c][5];

            // for (d = 0; d <= cuantosGrupos; d++) {
            //     // if ($('#botoninscribirProfesor' + c).parent().parent().next().next().find('#botonGrupo' + d).hasClass('active')) {
            //     if (dataSetProfAsig[c][6] == true) {
            //         // log('Grupos', arrayGrupos[d]);
            //         arrayGruposAsignados.push(arrayGrupos[d]);
            //     }
            // }
            // asignacion[this['ProfInscId' + c]].Grupos = arrayGruposAsignados.toString();
            asignacion[this['ProfInscId' + c]].Grupos = dataSetProfAsig[c][5];

        }
    }
    log('ASIGNACIÓN PROFESORES', asignacion);
    // Inscripciones //



    curso.Temas = temas;
    curso.Asignacion = asignacion;
    log('CURSO COMPLETO', curso);

    guardaCursoBD(curso);
}



function guardaCursoBD(elCurso) {
    log("guardaCursoBD", elCurso);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');

            // portada //
            subirPortadaCurso($('#imagenCurso')[0]);
            // portada //  
        }
    };

    if (revisaConexion) {

        var elRefNuevoCurso = laUrlBase + 'Cursos/' + elCurso.Id;
        log('elRefNuevoCurso: ', elRefNuevoCurso);

        firebase.database().ref(elRefNuevoCurso).once('value').then(function(snapshot) {
            firebase.database().ref(elRefNuevoCurso).update(elCurso, onComplete);
        });

    }

}


function eliminaCursoBD(cursoEliminar) {
    log('eliminaCursoBD: ', cursoEliminar);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
            regresaCursos();
        }
    };

    if (revisaConexion) {

        var elRefEliminaCurso = laUrlBase + 'Cursos/' + cursoEliminar;
        log('elRefEliminaCurso: ', elRefEliminaCurso);

        firebase.database().ref(elRefEliminaCurso).once('value').then(function(snapshot) {
            firebase.database().ref(elRefEliminaCurso).remove(onComplete);
        });

    }
}

function eliminaDirectorioCurso(cualCurso) {
    log("eliminaDirectorio", cualCurso, that['cursoId' + cualCurso]);

    $.ajax({
        url: "php/curso_delete.php",
        type: "post",
        data: {
            directorio: that['cursoId' + cualCurso]
        },
        cache: false,
        success: function() {
            log("Directorio eliminado exitosamente");

            eliminaCursoBD(that['cursoId' + cualCurso]);

            return;
        },
        error: function() {
            log('Error occured');
        }
    });

}


function eliminaCurso(cualCurso) {
    log("eliminaCurso", cualCurso);

    $('#modalBorrarCurso').modal({
        transition: 'scale'
    }).modal('show');
    $(document).off('click', '#botonCancelarBorrarCurso').on('click', '#botonCancelarBorrarCurso', function(e) {});
    $(document).off('click', '#botonAceptarBorrarCurso').on('click', '#botonAceptarBorrarCurso', function(e) {

        eliminaDirectorioCurso(cualCurso);
    });

};


function inscribirAlumno(cualUsuario, cualUsuarioId) {
    // log("inscribirAlumno", cualUsuario);

    // var aInscribir = !$('#botoninscribirAlumno' + cualUsuario).hasClass('active');
    // log('inscribirAlumno', cualUsuario, cualUsuarioId, aInscribir);

    // $('#modalBorrarCurso').modal({
    //     transition: 'scale'
    // }).modal('show');
    // $(document).off('click', '#botonCancelarBorrarCurso').on('click', '#botonCancelarBorrarCurso', function(e) {});
    // $(document).off('click', '#botonAceptarBorrarCurso').on('click', '#botonAceptarBorrarCurso', function(e) {

    //     eliminaDirectorioCurso(cualCurso);
    // });

};

function inscribirAlumnosTodos() {
    // log("inscribirAlumno", cualUsuario);

    // var aInscribirTodos = !$('#botonInscribirAlumnosTodos').hasClass('active');
    // log('inscribirAlumnosTodos', aInscribirTodos);

    // if (aInscribirTodos) {
    //     $('.btn-inscribirAlumno').addClass('active');
    // } else {
    //     $('.btn-inscribirAlumno').removeClass('active');
    // }

    // $('#modalBorrarCurso').modal({
    //     transition: 'scale'
    // }).modal('show');
    // $(document).off('click', '#botonCancelarBorrarCurso').on('click', '#botonCancelarBorrarCurso', function(e) {});
    // $(document).off('click', '#botonAceptarBorrarCurso').on('click', '#botonAceptarBorrarCurso', function(e) {

    //     eliminaDirectorioCurso(cualCurso);
    // });

};


function resetearAvance(cualUsuario) {
    log('resetearAvance', cualUsuario, cursoEditandoId);

    var onComplete = function(error) {
        if (error) {
            log('Ocurrió un error en la sincronización.');
        } else {
            log('Sincronización realizada.');
            swal.close();
        }
    };

    Swal.fire({
        title: "Eliminar avance",
        type: "question",
        showCancelButton: false,
        // showconfirmButton: false,
        html: 'Esto eliminará el avance del usuario<br>en este curso.<br><br>Estás seguro? <br><br> <div class="actions text-center"><div id="botonCancelarResetearAvance" class="btn btn-naranja cancel btn-round" style="margin-right: 20px;">Cancelar<i class="nc-icon-outline ui-1_simple-remove" style="padding-left: 5px;"></i></div><div id="botonAceptarResetearAvance" class="btn btn-verde2 ok btn-round">Aceptar<i class="nc-icon-outline ui-1_check" style="padding-left: 5px;"></i></div></div>'
    });

    $(document).off('click', '#botonCancelarResetearAvance').on('click', '#botonCancelarResetearAvance', function(event) {
        event.preventDefault();
        swal.close();
    });
    $(document).off('click', '#botonAceptarResetearAvance').on('click', '#botonAceptarResetearAvance', function(event) {
        event.preventDefault();
        // resetearAvanceOK(cualAvance);
        if (revisaConexion) {
            var elRefEliminaAvance = laUrlBase + 'Lecciones/' + cualUsuario + '/' + cursoEditandoId;
            log('elRefEliminaAvance: ', elRefEliminaAvance);

            firebase.database().ref(elRefEliminaAvance).once('value').then(function(snapshot) {
                firebase.database().ref(elRefEliminaAvance).remove(onComplete);
            });
        }
    });

}


function ajustaCalifTotal() {

    const rangeInputs = document.querySelectorAll('input[type="range"]');
    var cuantosCalifRecurso = $('.califEsteRecurso').length;
    // log('cuantosCalifRecurso', cuantosCalifRecurso);
    var _valRestante = 0;

    $('.calif_total_texto').html('Tienes <b>' + califMaxima + '</b> puntos para repartir entre los recursos');
    $('.calif_total_valor').html('<b>' + califMaxima + '</b>');
    $('.calif_total_barra').css({
        'width': califMaxima + '%'
    });

    function handleInputChange(e) {
        var target = e.target;
        var val = Math.round(target.value);
        var totalCalifRecursos = 0;

        $('input[type="range"]').each(function(index, value) {
            // log('value', index, Math.round(this.value));
            totalCalifRecursos += Math.round(this.value);

            if (totalCalifRecursos >= califMaxima) {
                totalCalifRecursos = califMaxima;
                // log('value', index, Math.round(this.value));
            }
            // log(totalCalifRecursos);
        });
        valRestante = (califMaxima - totalCalifRecursos);
        // log('totalCalifRecursos', totalCalifRecursos);

        $('.calif_total_texto').html('Tienes <b>' + valRestante + '</b> puntos para repartir entre los recursos');
        $('.calif_total_valor').html('<b>' + valRestante + '</b>');
        $('.calif_total_barra').css({
            'width': valRestante + '%'
        });

        if (totalCalifRecursos >= califMaxima) {
            // log(val);
            target.value = _valRestante;
        }

        $(this).next().html(Math.round(target.value));
        $(this).css({
            'background-size': target.value + '% 100%'
        });

    }

    rangeInputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
    });

    function calculaRest(e) {
        // var _target = e.target;
        var _totalCalifRecursos = 0;
        var _totalCalifRecursosMin = 0;

        $('input[type="range"]').each(function(index, value) {
            // log('value', index, Math.round(this.value));
            _totalCalifRecursos += Math.round(this.value);
            // log('valueMinEach', index, _totalCalifRecursos);
        });

        _totalCalifRecursosMin = (_totalCalifRecursos - Math.round(this.value));
        // log('valueMin', _totalCalifRecursos, _totalCalifRecursosMin);}
        _valRestante = (califMaxima - _totalCalifRecursosMin);
        log('_valRestante', _valRestante);
    }

    rangeInputs.forEach(input => {
        input.addEventListener('mousedown', calculaRest);
    });

}