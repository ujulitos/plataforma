/* Copyright Ideas4Learning 2016. http.//ideas4learning.com */
$(document).ready(function() {

    var callSucceeded = init();

    // var lastPage = get("cmi.core.lesson_location");
    // console.log("lastPage...", lastPage);

    try {
        var elCursoStatus = get("cmi.core.lesson_status");
        console.log("elCursoStatus...", elCursoStatus);
        var tiempo = getTimeCurrent();
        console.log("tiempo...", tiempo);
    } catch (error) {
        console.error(error);
    } finally {
        try {
            if (elCursoStatus != "completed" && elCursoStatus != "passed" && elCursoStatus != "failed") {
                set("cmi.core.lesson_status", "incomplete");
                scorm.save();
            }
        } catch (error) {
            console.error(error);
        } finally {
            set("cmi.core.session_time", "" + tiempo + "");
            scorm.save();
        }
    }

    $('#elVideo').bind('contextmenu', function() {
        return false;
    });
    // $("#elVideo")[0].currentTime = lastPage;
    document.getElementById("elVideo").play();


    $("#elVideo").on("ended", function() {
        // animacion_salida($("#elVideo"), "default", 0, terminarPantalla());
        // animacion_salida($("#imagen4"), "default", 0);

        set("cmi.core.lesson_status", "completed");
        scorm.save();
    });

    /////////////////// botón /////////////////////

    // $("#elBoton").click(function() {
    //     window.open('https://algo.com/');
    // });


    // detectaUnload();

});


function detectaUnload() {
    $(window).on("unload", function() {
        lastPage = Math.round($("#elVideo")[0].currentTime);
        console.log('unload', lastPage);

        set("cmi.core.lesson_location", lastPage);
        scorm.save();
    });
}
