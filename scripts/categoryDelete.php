<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=iso-8859-1');



$dns = "mysql:host=localhost;dbname=qrico";
$user = "root";
$pass = "";

$categoryId=$_GET["categoryId"];
try {
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "No se puede conectar a la base de datos";
	}		

		$sql = " DELETE FROM category WHERE id='".$categoryId;
        $query = $con->prepare($sql);
        $query ->execute();



} catch (Exception $e) {
	echo "Error: ". $e->getMessage();
};
