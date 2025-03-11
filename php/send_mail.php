<?php

$elDestino = $_GET["destino"];
$elRemitente = "ujulitos@mailinator.com";
$elAsunto = "Alta en Plataforma Virtual";
$laLiga = "https://crec.mx";

$elMensaje = "<head>";
$elMensaje .= "<style>html, body { font-family:Arial,sans-serif; font-size:16px; }</style>";
$elMensaje .= "</head>";
$elMensaje .= "<html><body>";
$elMensaje .= "Estimado colaborador,<br><br><br>";
$elMensaje .= "Has sido dado de alta en la Plataforma Virtual CREC<br><br>";
$elMensaje .= "Puedes acceder aquí: <a href=" . $laLiga . " target='_blank'>" . $laLiga . "</a><br><br>";
$elMensaje .= "En caso de que tengas una duda, puedes contactar al siguienbte correo: <a href=mailto:" . $elRemitente . " target='_blank'>" . $elRemitente . "</a><br><br><br>";
$elMensaje .= "<div style='font-size:28px;'>¡Bienvenido!</div><br>";
// $elMensaje .= "Plataforma Virtual CREC";
$elMensaje .= "<img style='' src='http://www.crec.mx/wp-content/uploads/2020/03/Logo_GRN_CREC_563X218_VD_Mesa-de-trabajo-1.png' />";
$elMensaje .= "</body></html>";



if (isset($_GET["destino"])) {

    $header = "From:"."Plataforma Virtual <ujulitos@mailinator.com>"."\nReply-To:".$elRemitente."\n";
	$header .= "X-Mailer:PHP/".phpversion()."\n";
	$header .= "MIME-Version: 1.0\r\n";
	$header .= "Content-Type: text/html; charset=UTF-8\r\n";
	mail($elDestino, $elAsunto, $elMensaje, $header);
    echo "el mensaje se envió a: " . $elDestino."\n";
    echo "y el mensaje es: " . $elMensaje;
}
// enrique.juarez@muchofocus.com
?>
