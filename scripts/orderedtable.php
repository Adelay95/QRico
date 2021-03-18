<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=iso-8859-1');



$dns = "mysql:host=localhost;dbname=qrico";
$user = "root";
$pass = "";

$tableid=$_GET["tableid"];

try {
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "No se puede conectar a la base de datos";
	}		

		$query = $con->prepare('SELECT ordered.id AS id, ordered.totalprice AS total, count(ordered_quantity.quantities_id) AS quantitiescount FROM ordered,ordered_quantity where ordered.mesa_id='.$tableid.' and ordered.commandstate=0 and ordered.id=ordered_quantity.ordered_id group by ordered.id');

		$query->execute();
		$result = $query->fetch();
		$registros = '{"id": "'.$result["id"].'","total": "'.$result["total"].'","quantitiescount": "'.$result["quantitiescount"].'"}';
		echo $registros;



} catch (Exception $e) {
	echo "Error: ". $e->getMessage();
};
