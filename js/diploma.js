// $(document).ready(function() {

function decargaDiploma(cualDiploma, cualUsuarioNombre, cualNombreObj, cualFecha) {
    log('decargaDiploma', cualDiploma, cualUsuarioNombre, cualNombreObj, cualFecha);

    // var laFechaFormateadaDia = moment().locale('es').format('DD');
    // var laFechaFormateadaMes = moment().locale('es').format('MMMM');
    // var laFechaFormateadaAnio = moment().locale('es').format('YYYY');
    // var laFechaFormateada = laFechaFormateadaDia + ' de ' + laFechaFormateadaMes + ' de ' + laFechaFormateadaAnio;
    // log(laFechaFormateada);

    var doc = new jsPDF('l', 'px', [1280, 720]);

    var img = new Image()
    img.src = 'recursos/diploma.png'
    doc.addImage(img, 'png', 0, 0, 950, 540)

    doc.setFont("Helvetica");
    doc.setFontStyle("bold");
    doc.setFontSize(40);
    doc.setTextColor(40, 153, 63);
    doc.text(542, 245, cualUsuarioNombre, 'center');

    doc.setFont("Helvetica");
    doc.setFontStyle("bold");
    doc.setFontSize(30);
    doc.setTextColor(40, 153, 63);
    doc.text(cualNombreObj, 530, 340, {
        maxWidth: 650,
        align: 'center'
    });

    doc.setFont("Helvetica");
    // doc.setFontStyle("regular");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(536, 435, 'Ciudad de México a ' + cualFecha, 'center');

    doc.fromHTML($('#elDiplomaDIV').html(), 0, 0, {

    });

    doc.save('Constancia' + '.pdf');

}


// });