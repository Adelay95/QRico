<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=iso-8859-1');



$dns = "mysql:host=localhost;dbname=qrico";
$user = "root";
$pass = "";

$orderedid=$_GET["orderedid"];
try {
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "No se puede conectar a la base de datos";
	}		

	$query = $con->prepare('SELECT product.id AS id,product.name AS name,product.image AS image,product.price AS price,product.productquantity AS productquantity,quantity.productstate AS state,count(quantity.id) AS quantity FROM ordered_quantity,quantity,product where ordered_quantity.ordered_id='.$orderedid.' and ordered_quantity.quantities_id=quantity.id and quantity.product_id=product.id group by quantity.product_id,quantity.productstate');


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
			$registros .= '"productquantity": "'.$result["productquantity"].'",';
			$registros .= '"state": "'.$result["state"].'",';
			$registros .= '"quantity": "'.$result["quantity"].'"}';
		}
		$registros .= "]";
		echo $registros;



} catch (Exception $e) {
	echo "Error: ". $e->getMessage();
};
