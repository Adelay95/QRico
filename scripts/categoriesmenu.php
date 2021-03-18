<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=iso-8859-1');



$dns = "mysql:host=localhost;dbname=qrico";
$user = "root";
$pass = "";

$restaurantid=$_GET["restaurantid"];
try {
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "No se puede conectar a la base de datos";
	}		

	$query = $con->prepare('SELECT id,name FROM category,client_category  where client_category.categories_id=category.id and client_category.client_id='.$restaurantid);


		$query->execute();

		$registros = "[";

		while($result = $query->fetch()){
			if ($registros != "[") {
				$registros .= ",";
			}
			$registros .= '{"id": "'.$result["id"].'",';
			$registros .= '"name": "'.$result["name"].'"}';
		}
		$registros .= "]";
		echo $registros;



} catch (Exception $e) {
	echo "Error: ". $e->getMessage();
};
