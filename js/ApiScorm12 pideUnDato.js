function inicializaAPI() {
    console.log("Inicializando API");

    // lee datos completos
    leeDatosSCORM();

    var scorm_logs = 0;

    function APIobject() {
        this.LMSInitialize = LMSInitialize;
        this.LMSGetValue = LMSGetValue;
        this.GetValue = LMSGetValue;
        this.LMSSetValue = LMSSetValue;
        this.SetValue = LMSSetValue;
        this.LMSCommit = LMSCommit;
        this.Commit = LMSCommit;
        this.LMSFinish = LMSFinish;
        this.Finish = LMSFinish;
        this.LMSGetLastError = LMSGetLastError;
        this.GetLastError = LMSGetLastError;
        this.LMSGetErrorString = LMSGetErrorString;
        this.GetErrorString = LMSGetErrorString;
        this.LMSGetDiagnostic = LMSGetDiagnostic;
        this.GetDiagnostic = LMSGetDiagnostic;
        this.save_asset = dokeos_save_asset;
        this.void_save_asset = dokeos_void_save_asset;
    }



    API = new APIobject();
    api = API;


    var G_NoError = 0;
    var G_GeneralException = 101;
    var G_ServerBusy = 102;
    var G_InvalidArgumentError = 201;
    var G_ElementCannotHaveChildren = 202;
    var G_ElementIsNotAnArray = 203;
    var G_NotInitialized = 301;
    var G_NotImplementedError = 401;
    var G_InvalidSetValue = 402;
    var G_ElementIsReadOnly = 403;
    var G_ElementIsWriteOnly = 404;
    var G_IncorrectDataType = 405;

    var G_LastError = G_NoError;
    var G_LastErrorMessage = 'No error';



    var G_LastErrorString = 'No error';

    var commit = false;

    //Strictly scorm variables

    /*while($arregloTabla=mysql_fetch_array($reQueryTablaMensajes))
    {
    	//var score=<?=$QueryCursoUsuario["calificacion"]?>;
    	var scoreInicial=<?=$QueryCursoUsuario["calificacion"]?>;
    	var scorePorRecurso = scoreInicial.split("*");
    }*/

    var max = '';
    var min = '';
    var contador = 0;
    var f_lesson_status = '';
    var f_session_time = '';
    var f_suspend_data = '';
    var suspend_data = '';
    var f_lesson_location = '';
    var total_time = '';
    var mastery_score = '';
    var launch_data = '';
    var max_time_allowed = '';
    var interactions = new Array();
    item_objectives = new Array();


    //Dokeos internal variables
    var saved_lesson_status = 'not attempted';
    //var lms_lp_id =<?=$_GET["idCurso"]?>;
    //var lms_item_id=<?=$_GET["idCurso"]?> ;

    var lms_been_synchronized = 0;
    var lms_initialized = 0;
    var lms_total_lessons;
    var lms_complete_lessons;
    var lms_progress_bar_mode = '';
    if (lms_progress_bar_mode == '') {
        lms_progress_bar_mode = '%';
    }
    var lms_view_id = '';
    if (lms_view_id == '') {
        lms_view_id = 1;
    }
    var lms_user_id = '';
    var lms_next_item = '';
    var lms_previous_item = '';
    var lms_lp_type = '';
    var lms_item_type = '';
    var lms_item_credit = '';
    var lms_item_lesson_mode = '';
    var lms_item_launch_data = '';
    var lms_item_core_exit = '';
    var asset_timer = 0;

    //Backup for old values
    var old_score = 0;
    var old_max = 0;
    var old_min = 0;
    var old_lesson_status = '';
    var old_session_time = '';
    var old_suspend_data = '';
    var lms_old_item_id = 0;


    function LMSInitialize() {
        logit_scorm('LMSInitialise()', 0);
        G_LastError = G_NoError;
        G_LastErrorMessage = 'No error';
        lms_initialized = 1;
        return ('true');
    }

    function Initialize() {
        return LMSInitialize();
    }



    /////////////////////////////////////////////////////////////////////////////////////////////
    //////////*************************  MI API  **************************************/////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    function leeDatosSCORM() {
        console.log('leeDatosSCORM');

        // var return_dato = '';

        var onComplete = function(error) {
            if (error) {
                console.log('Ocurrió un error al leer los datos SCORM.');
            } else {
                console.log('Se leyeron los datos SCORM con éxito.');
            }
        };

        nuevoData = {};

        if (revisaConexion) {

            var elRefDatos = laUrlBase + 'Lecciones/' + usuarioId + '/' + that['cursoId' + elNumCurso] + '/Temas/tema_' + elNumTema + '/Recursos/recurso_' + elNumRecurso + '/' + elIdRecurso + '/SCORM_12/';
            console.log('elRefDatos: ', elRefDatos);

            firebase.database().ref(elRefDatos).once('value').then(function(snapshot) {
                console.log('el snapshot.val() es', snapshot.val());

                // if (snapshot.val() != null) {

                laSesionFechaInicial = snapshot.child('Fecha_inicio').val();
                console.log('laSesionFechaInicial: ', laSesionFechaInicial);
                if (laFechaInicial == null || laFechaInicial == '' || laFechaInicial == undefined) {
                    laFechaInicial = '';
                }

                f_lesson_status = snapshot.child('cmi_core_lesson_status').val();
                console.log('cmi_core_lesson_status: ', f_lesson_status);
                if (f_lesson_status == null || f_lesson_status == '' || f_lesson_status == undefined) {
                    f_lesson_status = 'not attempted';
                }

                f_session_time = snapshot.child('cmi_core_session_time').val();
                console.log('f_session_time: ', f_session_time);
                if (f_session_time == null || f_session_time == '' || f_session_time == undefined) {
                    f_session_time = '00:00:00';
                }

                f_suspend_data = snapshot.child('cmi_suspend_data').val();
                console.log('f_suspend_data: ', f_suspend_data);
                if (f_suspend_data == null || f_suspend_data == '' || f_suspend_data == undefined) {
                    f_suspend_data = '';
                }

                f_lesson_location = snapshot.child('cmi_core_lesson_location').val();
                console.log('f_lesson_location: ', f_lesson_location);
                if (f_lesson_location == null || f_lesson_location == '' || f_lesson_location == undefined) {
                    f_lesson_location = '';
                }

                f_score_min = snapshot.child('cmi_core_score_min').val();
                console.log('cmi_core_score_min: ', f_score_min);
                if (f_score_min == null || f_score_min == '' || f_score_min == undefined) {
                    f_score_min = '0';
                }

                f_score_raw = snapshot.child('cmi_core_score_raw').val();
                console.log('cmi_core_score_raw: ', f_score_raw);
                if (f_score_raw == null || f_score_raw == '' || f_score_raw == undefined) {
                    f_score_raw = '0';
                }

                f_exit = snapshot.child('cmi_core_exit').val();
                console.log('f_exit: ', f_exit);
                if (f_exit == null || f_exit == '' || f_exit == undefined) {
                    f_exit = 'suspend';
                }

                // var nuevoData = {
                //     'cmi_core_lesson_status': f_lesson_status,
                //     'cmi_core_session_time': f_session_time,
                //     'cmi_suspend_data': f_suspend_data,
                //     'cmi_core_lesson_location': f_lesson_location,
                //     'cmi_core_score_min': f_score_min,
                //     'cmi_core_score_raw': f_score_raw,
                //     'cmi_core_exit': f_exit
                // }
                // var updates = {};
                // updates[elRefDatos] = nuevoData;
                // firebase.database().ref().update(updates, onComplete);

                // }

                return true;

            });
        }
    }



    function escribeDatosSCORM(param, val) {
        console.log('escribeDatosSCORM', param, 'val', val);

        var nuevoParam = param.split('.').join('_');
        console.log('nuevoParam', nuevoParam);

        var onComplete = function(error) {
            if (error) {
                console.log('Ocurrió un error al ecribir los datos SCORM.');
            } else {
                // leeDatosSCORM();
                if (nuevoParam == 'cmi_core_score_raw') {
                    registraCalificacion(val);
                }
                console.log('Se escribieron los datos SCORM con éxito.');
            }
        };

        nuevoData = {};

        if (revisaConexion) {

            var elRefDatos = laUrlBase + 'Lecciones/' + usuarioId + '/' + that['cursoId' + elNumCurso] + '/Temas/tema_' + elNumTema + '/Recursos/recurso_' + elNumRecurso + '/' + elIdRecurso + '/SCORM_12/' + nuevoParam;
            console.log('elRefDatos a escribir: ', elRefDatos);

            firebase.database().ref(elRefDatos).once('value').then(function(snapshot) {
                // console.log('el snapshot.val() es', snapshot.val());

                // if (snapshot.val() != null) {

                var paramActual = snapshot.val();
                console.log('paramActual', paramActual, val);

                elVal = val;
                // }

                var updates = {};
                updates[elRefDatos] = elVal;
                firebase.database().ref().update(updates, onComplete);
                console.log('escrito:', nuevoParam, 'y', elVal)

            });
        }

    }






    function LMSGetValueNO(param) {
        console.log('LMSGetValue', param);

        leeDatosSCORM();

        //logit_scorm("LMSGetValue('"+param+"')",1);
        G_LastError = G_NoError;
        G_LastErrorMessage = 'No error';
        var result = '';
        // ---- cmi.core._children
        if (param == 'cmi.core._children' || param == 'cmi.core_children') {
            result = 'entry, exit, cmi_core_lesson_status, student_id, student_name, cmi_core_lesson_location, total_time, credit, lesson_mode, score, suspend_data, cmi_core_session_time';
        } else if (param == 'cmi.core.entry') {
            if (lms_item_core_exit == 'none') {
                result = 'ab-initio';
            } else if (lms_item_core_exit == 'suspend') {
                result = 'resume';
            } else {
                result = '';
            }
        } else if (param == 'cmi.core.exit') {
            result = '';
            G_LastError = G_ElementIsWriteOnly;
        } else if (param == 'cmi.core.lesson_status') {
            console.log('Get f_lesson_status', f_lesson_status);
            if (f_lesson_status != '') {
                result = f_lesson_status;
            } else {
                result = 'not attempted';
            }
        } else if (param == 'cmi.core.student_id') {


        } else if (param == 'cmi.core.student_name') {

        } else if (param == 'cmi.core.lesson_location') {
            result = f_lesson_location;
        } else if (param == 'cmi.core.total_time') {
            result = total_time;
        } else if (param == 'cmi.core.score._children') {
            result = 'raw,min,max';
        } else if (param == 'cmi.core.score.raw') {
            console.log('Get score', f_score_raw);
            if (f_score_raw != '') {
                result = f_score_raw;
            }
        } else if (param == 'cmi.core.score.max') {
            result = max;
        } else if (param == 'cmi.core.score.min') {
            result = min;
        } else if (param == 'cmi.core.score') {
            result = score;
        } else if (param == 'cmi.core.credit') {
            result = lms_item_credit;
        } else if (param == 'cmi.core.lesson_mode') {
            result = lms_item_lesson_mode;
        } else if (param == 'cmi.suspend_data') {
            result = f_suspend_data;
        } else if (param == 'cmi.launch_data') {
            result = lms_item_launch_data;
        } else if (param == 'cmi.objectives._children') {
            result = 'id,score,status';
        } else if (param == 'cmi.objectives._count') {

            result = item_objectives.length;
        } else if (param.substring(0, 15) == 'cmi.objectives.') {
            var myres = '';
            if (myres = param.match(/cmi.objectives.(\d+).(id|score|status|_children)(.*)/)) {
                var obj_id = myres[1];
                var req_type = myres[2];
                if (item_objectives[obj_id] == null) {
                    if (req_type == 'id') {
                        result = '';
                    } else if (req_type == '_children') {
                        result = 'id,score,status';
                    } else if (req_type == 'score') {
                        if (myres[3] == null) {
                            result = '';
                            G_lastError = G_NotImplementedError;
                            G_lastErrorString = 'Not implemented yet';
                        } else if (myres[3] == '._children') {
                            result = 'raw,min,max'; //non-standard, added for NetG
                        } else if (myres[3] == '.raw') {
                            result = '';
                        } else if (myres[3] == '.max') {
                            result = '';
                        } else if (myres[3] == '.min') {
                            result = '';
                        } else {
                            result = '';
                            G_lastError = G_NotImplementedError;
                            G_lastErrorString = 'Not implemented yet';
                        }
                    } else if (req_type == 'status') {
                        result = 'not attempted';
                    }
                } else {
                    //the object is not null
                    if (req_type == 'id') {
                        result = item_objectives[obj_id][0];
                    } else if (req_type == '_children') {
                        result = 'id,score,status';
                    } else if (req_type == 'score') {
                        if (myres[3] == null) {
                            result = '';
                            G_lastError = G_NotImplementedError;
                            G_lastErrorString = 'Not implemented yet';
                        } else if (myres[3] == '._children') {
                            result = 'raw,min,max'; //non-standard, added for NetG
                        } else if (myres[3] == '.raw') {
                            if (item_objectives[obj_id][2] != null) {
                                result = item_objectives[obj_id][2];
                            } else {
                                result = '';
                            }
                        } else if (myres[3] == '.max') {
                            if (item_objectives[obj_id][3] != null) {
                                result = item_objectives[obj_id][3];
                            } else {
                                result = '';
                            }
                        } else if (myres[3] == '.min') {
                            if (item_objectives[obj_id][4] != null) {
                                result = item_objectives[obj_id][4];
                            } else {
                                result = '';
                            }
                        } else {
                            result = '';
                            G_lastError = G_NotImplementedError;
                            G_lastErrorString = 'Not implemented yet';
                        }
                    } else if (req_type == 'status') {
                        if (item_objectives[obj_id][1] != null) {
                            result = item_objectives[obj_id][1];
                        } else {
                            result = 'not attempted';
                        }
                    }
                }
            }
        } else if (param == 'cmi.student_data._children') {
            result = 'mastery_score,max_time_allowed';
        } else if (param == 'cmi.student_data.mastery_score') {
            result = mastery_score;
        } else if (param == 'cmi.student_data.max_time_allowed') {
            result = max_time_allowed;
        } else if (param == 'cmi.interactions._count') {
            result = interactions.length;
        } else if (param == 'cmi.interactions._children') {
            result = 'id,time,type,correct_responses,weighting,student_response,result,latency';
        } else {
            result = '';
            G_lastError = G_NotImplementedError;
            G_lastErrorString = 'Not implemented yet';
        }
        logit_scorm("LMSGetValue\n\t('" + param + "') returned '" + result + "'", 1);
        return result;
    }


    function LMSGetValue(param) {
        console.log('LMSGetValue', param);

        // leeDatosSCORM(param);
        var return_dato = 'aaa';
        var esteParam = param.split('.').join('_');

        if (revisaConexion) {

            var elRefDatos = laUrlBase + 'Lecciones/' + usuarioId + '/' + that['cursoId' + elNumCurso] + '/Temas/tema_' + elNumTema + '/Recursos/recurso_' + elNumRecurso + '/' + elIdRecurso + '/SCORM_12/' + esteParam;
            console.log('elRefDatos: ', elRefDatos);


            firebase.database().ref(elRefDatos).once('value').then((snapshot) => {
                if (snapshot.val() != null) {

                    return_dato = snapshot.val();
                    console.log('return_dato: ', return_dato);

                    return return_dato;
                }

            });

            // return return_dato;
        }
    }


    function GetValue(param) {
        var elReturn = LMSGetValue(param);
        return elReturn;
    }


    function LMSSetValueNO(param, val) {

        // leeDatosSCORM();

        // var elResult_lesson_status = LMSGetValue('cmi.core.lesson_status');
        // console.log('elResult_lesson_status', elResult_lesson_status);

        // var elResult_suspend_data = LMSGetValue('cmi.suspend_data');
        // console.log('elResult_suspend_data', elResult_suspend_data);

        // var lesson_status_registrado = LMSGetValue('cmi.core.lesson_status');
        // console.log('lesson_status_registrado', lesson_status_registrado);

        // if (lesson_status_registrado != 'passed') {


        logit_scorm("LMSSetValue\n\t('" + param + "','" + val + "')", 0);
        commit = true; //value has changed, need to re-commit
        G_LastError = G_NoError;
        G_LastErrorMessage = 'No error';
        return_value = 'false';
        if (param == "cmi.core.score.raw") {

            // TODO calificación más alta
            // var elResult_score_raw = LMSGetValue(param);
            // console.log('elResult_score_raw', elResult_score_raw);

            // if (val == '' || val == null || val == undefined) {
            //     val = "0";
            // } else {
            //     if (val > elResult_score_raw) {
            //         elResult_score_raw = val;
            //     }
            // }

            return_value = 'true';
        } else if (param == "cmi.core.score.max") {
            max = val;
            return_value = 'true';
        } else if (param == "cmi.core.score.min") {
            min = val;
            return_value = 'true';
        } else if (param == "cmi.core.lesson_location") {

            // var elResult_lesson_location = LMSGetValue(param);
            // console.log('elResult_lesson_location', elResult_lesson_location);

            f_lesson_location = val;
            return_value = 'true';
        } else if (param == "cmi.core.lesson_status") {

            // var elResult_lesson_status = LMSGetValue(param);
            // console.log('elResult_lesson_status', elResult_lesson_status);

            // var elResult_suspend_data = LMSGetValue('cmi.suspend_data');
            // console.log('elResult_suspend_data', elResult_suspend_data);

            // if (f_lesson_status === "not attempted") {
            //     f_lesson_status = "incomplete"
            // }
            // saved_lesson_status = f_lesson_status;
            result = f_lesson_status;


            // if (f_lesson_status != '') {
            //     result = f_lesson_status;
            // } else {
            //     result = 'not attempted';
            // }


            return_value = 'true';
        } else if (param == "cmi.completion_status") {
            f_lesson_status = val;
            return_value = 'true'; //1.3
        } else if (param == "cmi.core.session_time") {
            session_time = val;
            return_value = 'true';
        } else if (param == "cmi.score.scaled") { //1.3
            if (val <= 1 && val >= -1) {
                score = val;
                return_value = 'true';
            } else {
                return_value = 'false';
            }
        } else if (param == "cmi.success_status") {
            success_status = val;
            return_value = 'true'; //1.3
        } else if (param == "cmi.suspend_data") {



            // var elResult_lesson_status = LMSGetValue('cmi.core.lesson_status');
            // console.log('elResult_lesson_status', elResult_lesson_status);

            // var elResult_suspend_data = LMSGetValue(param);
            // console.log('elResult_suspend_data', elResult_suspend_data);
            // console.log('f_suspend_data', f_suspend_data);
            // console.log('suspend_data', suspend_data);
            // console.log('val', val);

            // if (val == '' || val == null || val == undefined) {
            //     // val = '';
            // } else {
            // if (f_suspend_data == val) {
            //     alert('es igual');
            // } else {
            //     alert('NOOOO es igual');
            //     val = f_suspend_data;
            // }
            // console.log('contador', contador);

            // if (f_lesson_status == 'passed') {
            // QUITAR si hay suspend_data
            // val = '';
            // suspend_data = val;
            // f_suspend_data = val;
            // } else {
            //     if (contador >= 1) {
            // val = '';
            // elResult_suspend_data = val;
            f_suspend_data = val;
            // } else {


            // }
            // }
            // val = elResult_suspend_data;

            // leeDatosSCORM();

            // contador++;

            return_value = 'true';
        } else if (param == "cmi.core.exit") {
            lms_item_core_exit = val;
            return_value = 'true';
        } else if (param == "cmi.core.entry") {
            G_LastError = G_ElementIsReadOnly
        } else if (param == "cmi.student_data.mastery_score") {
            G_LastError = G_ElementIsReadOnly;
        } else if (param == "cmi.student_data.max_time_allowed") {
            G_LastError = G_ElementIsReadOnly;
        } else if (param == "cmi.launch_data") {
            G_LastError = G_ElementIsReadOnly;
        } else {
            var myres = new Array();
            if (myres = param.match(/cmi.interactions.(\d+).(id|time|type|correct_responses|weighting|student_response|result|latency)(.*)/)) {
                elem_id = myres[1];
                if (elem_id > interactions.length) //interactions setting should start at 0
                {
                    G_LastError = G_InvalidArgumentError;
                    G_LastErrorString = 'Invalid argument (interactions)';
                    return_value = false;
                } else {
                    if (interactions[elem_id] == null) {
                        interactions[elem_id] = ['', '', '', '', '', '', '', '', '||'];
                        //id(0), type(1), time(2), weighting(3),correct_responses(4),student_response(5),result(6),latency(7)
                        interactions[elem_id][4] = new Array();
                    }
                    elem_attrib = myres[2];
                    switch (elem_attrib) {
                        case "id":
                            interactions[elem_id][0] = val;
                            logit_scorm("Interaction " + elem_id + "'s id updated", 2);
                            return_value = 'true';
                            break;
                        case "time":
                            interactions[elem_id][2] = val;
                            logit_scorm("Interaction " + elem_id + "'s time updated", 2);
                            return_value = 'true';
                            break;
                        case "type":
                            interactions[elem_id][1] = val;
                            logit_scorm("Interaction " + elem_id + "'s type updated", 2);
                            return_value = 'true';
                            break;
                        case "correct_responses":
                            //do nothing yet
                            interactions[elem_id][4].push(val);
                            logit_scorm("Interaction " + elem_id + "'s correct_responses not updated", 2);
                            return_value = 'true';
                            break;
                        case "weighting":
                            interactions[elem_id][3] = val;
                            logit_scorm("Interaction " + elem_id + "'s weighting updated", 2);
                            return_value = 'true';
                            break;
                        case "student_response":
                            interactions[elem_id][5] = val;
                            logit_scorm("Interaction " + elem_id + "'s student_response updated", 2);
                            return_value = 'true';
                            break;
                        case "result":
                            interactions[elem_id][6] = val;
                            logit_scorm("Interaction " + elem_id + "'s result updated", 2);
                            return_value = 'true';
                            break;
                        case "latency":
                            interactions[elem_id][7] = val;
                            logit_scorm("Interaction " + elem_id + "'s latency updated", 2);
                            return_value = 'true';
                            break;
                        default:
                            G_lastError = G_NotImplementedError;
                            G_lastErrorString = 'Not implemented yet';
                    }
                }
            } else if (param.substring(0, 15) == 'cmi.objectives.') {
                var myres = '';
                if (myres = param.match(/cmi.objectives.(\d+).(id|score|status)(.*)/)) {
                    obj_id = myres[1];
                    if (obj_id > item_objectives.length) //objectives setting should start at 0
                    {
                        G_LastError = G_InvalidArgumentError;
                        G_LastErrorString = 'Invalid argument (objectives)';
                        return_value = false;
                    } else {
                        req_type = myres[2];
                        if (obj_id == null || obj_id == '') {
                            ; //do nothing
                        } else {
                            if (item_objectives[obj_id] == null) {
                                item_objectives[obj_id] = ['', '', '', '', ''];
                            }
                            if (req_type == "id") {
                                //item_objectives[obj_id][0] = val.substring(51,57);
                                item_objectives[obj_id][0] = val;
                                logit_scorm("Objective " + obj_id + "'s id updated", 2);
                                return_value = 'true';
                            } else if (req_type == "score") {
                                if (myres[3] == '._children') {
                                    return_value = '';
                                    G_lastError = G_InvalidSetValue;
                                    G_lastErrorString = 'Invalid set value, element is a keyword';
                                } else if (myres[3] == '.raw') {
                                    item_objectives[obj_id][2] = val;
                                    logit_scorm("Objective " + obj_id + "'s score raw updated", 2);
                                    return_value = 'true';
                                } else if (myres[3] == '.max') {
                                    item_objectives[obj_id][3] = val;
                                    logit_scorm("Objective " + obj_id + "'s score max updated", 2);
                                    return_value = 'true';
                                } else if (myres[3] == '.min') {
                                    item_objectives[obj_id][4] = val;
                                    logit_scorm("Objective " + obj_id + "'s score min updated", 2);
                                    return_value = 'true';
                                } else {
                                    return_value = '';
                                    G_lastError = G_NotImplementedError;
                                    G_lastErrorString = 'Not implemented yet';
                                }
                            } else if (req_type == "status") {
                                item_objectives[obj_id][1] = val;
                                logit_scorm("Objective " + obj_id + "'s status updated", 2);
                                return_value = 'true';
                            } else {
                                G_lastError = G_NotImplementedError;
                                G_lastErrorString = 'Not implemented yet';
                            }
                        }
                    }
                }
            } else {
                G_lastError = G_NotImplementedError;
                G_lastErrorString = 'Not implemented yet';
            }
        }



        if (elPerfil != 'Observador') {

            // if (param == 'cmi.core.lesson_status') {

            //     var elResult_lesson_status = LMSGetValue(param);
            //     console.log('elResult_lesson_status', elResult_lesson_status);

            //     if (elResult_lesson_status != 'completed') {
            //         escribeDatosSCORM(param, val);
            //     }
            // } else {
            escribeDatosSCORM(param, val);
            // }

        }

        return return_value;
        // }
    }

    function LMSSetValue(param, val) {

        if (elPerfil != 'Observador') {
            escribeDatosSCORM(param, val);

        }

    }

    function SetValue(param, val) {
        // var lesson_status_registrado = LMSGetValue('cmi.core.lesson_status');
        // console.log('lesson_status_registrado', lesson_status_registrado);

        // if (lesson_status_registrado != 'passed') {
        return LMSSetValue(param, val);
        // }
    }

    function savedata(origin) {
        //alert("PARAMETROS:\n\nID curso "+lms_item_id+"\nScore "+score+"\nStatus "+lesson_status+"\nSession Time "+session_time+"\nSuspend data "+suspend_data+"\nLocation "+lesson_location+"\nTotal time "+calcT3());
        //	alert("interactions: "+ interactions.length);
        for (x = 0; x < interactions.length; x++) {
            // alert("interaccion sola de " + x + " " + interactions[x]);
            for (y = 0; y < interactions[x].length; y++) {
                // alert("interaccion " + x + " con subindice " + y + " ****** " + interactions[x][y])
            }
        }

        // MostrarConsulta();
    }

    function LMSCommit(val) {
        logit_scorm('LMSCommit()', 0);
        G_LastError = G_NoError;
        G_LastErrorMessage = 'No error';
        savedata('commit');
        commit = false;
        return ('true');
    }

    function Commit(val) {
        return LMSCommit(val);
    }

    function LMSFinish(val) {
        G_LastError = G_NoError;
        G_LastErrorMessage = 'No error';
        if ((commit == false)) {
            logit_scorm('LMSFinish() (no LMSCommit())', 1);
        }
        if (commit == true) {
            logit_scorm('LMSFinish() called', 1);
            savedata('finish');
            commit = false;
        }
        return ('true');
    }

    function Finish(val) {
        return LMSFinish(val);
    }

    function LMSGetLastError() {
        logit_scorm('LMSGetLastError()', 1);
        return (G_LastError.toString());
    }

    function GetLastError() {
        return LMSGetLastError();
    }

    function LMSGetErrorString(errCode) {
        logit_scorm('LMSGetErrorString()', 1);
        return (G_LastErrorString);
    }

    function GetErrorString(errCode) {
        return LMSGetErrorString(errCode);
    }

    function LMSGetDiagnostic(errCode) {
        logit_scorm('LMSGetDiagnostic()', 1);
        return (API.LMSGetLastError());
    }

    function GetDiagnostic(errCode) {
        return LMSGetDiagnostic(errCode);
    }

    function Terminate() {
        logit_scorm('Terminate()', 0);
        G_LastError = G_NoError;
        G_LastErrorMessage = 'No error';
        commit = true;
        savedata('terminate');
        return (true);
    }

    function XAJAXobject() {

    }

    function addEvent(elm, evType, fn, useCapture) {

    }

    function addListeners() {
        //exit if the browser doesn't support ID or tag retrieval
        logit_lms('Entering addListeners()', 2);

    }



    function load_item(item_id, url) {

        return false;
    }

    function dokeos_save_asset() {
        logit_lms('dokeos_save_asset', 2);

    }

    function dokeos_void_save_asset(myscore, mymax) {

    }

    function logit_scorm(message, priority) {
        //	alert("logit scorm "+message+""+priority)
    }

    function logit_lms(message, priority) {
        // alert("logit lms " + message + " " + priority)

    }

    function update_toc(update_action, update_id) {

        return true;
    }

    function update_progress_bar(nbr_complete, nbr_total, mode) {

        return true;
    }

    function update_stats_page() {

        return true;
    }

    function update_message_frame(msg_msg) {

    }

    function switch_item(current_item, next_item) {

        return true;

    }

    ////////////////TIEMPO////////////////


    function padNmb(nStr, nLen) {
        var sRes = String(nStr);
        var sCeros = "0000000000";
        return sCeros.substr(0, nLen - sRes.length) + sRes;
    }

    function stringToSeconds(tiempo) {
        var sep1 = tiempo.indexOf(":");
        var sep2 = tiempo.lastIndexOf(":");
        var hor = tiempo.substr(0, sep1);
        var min = tiempo.substr(sep1 + 1, sep2 - sep1 - 1);
        var sec = tiempo.substr(sep2 + 1);
        return (Number(sec) + (Number(min) * 60) + (Number(hor) * 3600));
    }

    function secondsToTime(secs) {
        var hor = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hor * 3600)) / 60);
        var sec = secs - (hor * 3600) - (min * 60);
        return padNmb(hor, 2) + ":" + padNmb(min, 2) + ":" + padNmb(sec, 2);
    }

    function substractTimes(t1, t2) {
        var secs1 = stringToSeconds(t1);
        var secs2 = stringToSeconds(t2);
        var secsDif = secs1 + secs2;
        return secondsToTime(secsDif);
    }

    function calcT3() {
        //return substractTimes(total_time, session_time);


        total_timeFinal = "";
        for (a = 0; a < total_timePorRecurso.length; a++) {
            substractTimes(total_timePorRecurso[a], session_time);
            total_timeFinal += total_timePorRecurso[a] + "*";
            // alert(total_timeFinal);
        }
        total_timeFinal = total_timeFinal.substring(0, (total_timeFinal.length - 1));
        return "'" + total_timeFinal + "'";
    }

    ////////////////funciones por recurso////////////////


    function lesson_statusListo() {
        lesson_status = "";
        for (a = 0; a < lesson_statusPorRecurso.length; a++) {
            lesson_status += lesson_statusPorRecurso[a] + "*";
        }
        lesson_status = lesson_status.substring(0, (lesson_status.length - 1));
        return "'" + lesson_status + "'";
    }

    function scoreListo() {
        score = "";
        for (a = 0; a < scorePorRecurso.length; a++) {
            score += scorePorRecurso[a] + "*";
        }
        score = score.substring(0, (score.length - 1));
        return "'" + score + "'";
    }


    /////////////////////////AJAX//////////////
    function objetoAjax() {
        var xmlhttp = false;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }

        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    function MostrarConsulta() {
        //alert("mandando datos");
        //divResultado = document.getElementById('resultado');
        ajax = objetoAjax();
        ajax.open("POST", "../submitAPI.php", true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                //divResultado.innerHTML = ajax.responseText
            }
        }
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        //ajax.send("itemSeguimiento=<?=$QueryCursoUsuario["seguimiento_id"]?>&scoreSeguimiento="+scoreListo()+"&lesson_statusSeguimiento="+lesson_statusListo()+"&session_timeSeguimiento="+calcT3()+"&suspend_dataSeguimiento="+suspend_data+"&lesson_locationSeguimiento="+lesson_location+"&interaccionesSeguimiento="+interactions);


    }


}