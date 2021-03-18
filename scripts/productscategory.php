<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=iso-8859-1');



$dns = "mysql:host=localhost;dbname=qrico";
$user = "root";
$pass = "";

$categoryid=$_GET["categoryid"];
try {
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "No se puede conectar a la base de datos";
	}		

	$query = $con->prepare('SELECT id,name,image,price,productquantity FROM product,category_product where category_product.products_id=product.id and category_product.category_id='.$categoryid);


		$query->execute();

		$registros = "[";

		while($result = $query->fetch()){
			if ($registros != "[") {
				$registros .= ",";
			}
			$registros .= '{"id": "'.$result["id"].'",';
			$registros .= '"name": "'.$result["name"].'",';
			$registros .= '"image": "'.$result["image"].'",';
			$registros .= '"price": "'.$result["price"].'",';
			$registros .= '"productquantity": "'.$result["productquantity"].'"}';
		}
		$registros .= "]";
		echo $registros;



} catch (Exception $e) {
	echo "Error: ". $e->getMessage();
};
