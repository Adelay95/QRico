<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=iso-8859-1');



$dns = "mysql:host=localhost;dbname=qrico";
$user = "root";
$pass = "";

$restaurantid=$_GET["restaurantid"];
$tablenumber=$_GET["tablenumber"];
try {
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "No se puede conectar a la base de datos";
	}		

		$query = $con->prepare('SELECT client.id AS restaurantid,nameRestaurant,image,mesa.id AS tableid,mesa.number AS tablenumber FROM client,client_mesa,mesa where client.id=client_mesa.client_id and client_mesa.mesas_id=mesa.id and client.id='.$restaurantid.' and mesa.number='.$tablenumber);

		$query->execute();
		$result = $query->fetch();
		$registros = '{"restaurantid": "'.$result["restaurantid"].'","name": "'.$result["nameRestaurant"].'","image": "'.$result["image"].'","tableid": "'.$result["tableid"].'","tablenumber": "'.$result["tablenumber"].'"}';
		echo $registros;



} catch (Exception $e) {
	echo "Error: ". $e->getMessage();
};
