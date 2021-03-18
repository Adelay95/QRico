<?php
header("Access-Control-Allow-Origin:http://localhost:8100");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    //PARAMETROS DE LA BASE DE DATOS 
    $dns = "mysql:host=localhost;dbname=qrico";
    $user = "root";
    $pass = "";

    //RECUPERAR DATOS DEL FORMULARIO
	$data = file_get_contents("php://input");
	$objData = json_decode($data);
	
	
    // ASIGNAR LOS VALORES A LA VARIABLE
	//$object=(object) [
   // 'id' => 58,
 // ];
	//$products = array($object);
	//$quantities = array(1);
	//$totalprice = 9.9;
   // $mesaid = 9;
	$products = $objData->products;
    $quantities = $objData->quantities;
    $totalprice = $objData->totalprice;
    $mesaid = $objData->mesaid;
	
  	//$products = $_POST['products'];
    //$quantities = $_POST['quantities'];
	//$totalprice = $_POST['totalprice'];
	//$mesaid = $_POST['mesaid'];
    
   
    $db = new PDO($dns, $user, $pass);
   
    if($db){
		$id_update_ordered="select id from ordered where mesa_id=".$mesaid." and commandstate=0";
		$query_id_update_ordered = $db -> prepare($id_update_ordered);
		$query_id_update_ordered -> execute(); 
		while($result = $query_id_update_ordered->fetch()){
		$id_update_ordered= $result[0];
		}
		if($id_update_ordered > 0){
		$max_id_quantity="select max(u.id) from quantity u";
		$query_max_id_quantity = $db -> prepare($max_id_quantity);
		$query_max_id_quantity -> execute(); 
		while($result = $query_max_id_quantity->fetch()){
			$max_id_quantity = $result[0];
		}
		$i=0;
		$sql = "update ordered SET totalprice=totalprice+".$totalprice." where id=".$id_update_ordered;
			$query = $db->prepare($sql);
			$query ->execute();
		foreach ($quantities as $quantity) {
		if($quantity==0){}
		else{
			for ($z = 0; $z < $quantity; $z++) {
			$product=$products[$i];
			
	
			$max_id_quantity=$max_id_quantity+1;

			$sql1 = " insert into quantity values('".$max_id_quantity."','0',0,'".$product->id."')";
			$query1 = $db->prepare($sql1);
			$query1 ->execute();
			
			$sql2 = " insert into ordered_quantity values('".$id_update_ordered."','".$max_id_quantity."')";
			$query2 = $db->prepare($sql2);
			$query2 ->execute();
			}

			}
		$i=$i+1;
		}
		}
		else{

		$max_id_ordered="select max(u.id) from ordered u";
		$query_max_id_ordered = $db -> prepare($max_id_ordered);
		$query_max_id_ordered -> execute(); 
		while($result = $query_max_id_ordered->fetch()){
			$max_id_ordered = $result[0];
		}
		$max_id_quantity="select max(u.id) from quantity u";
		$query_max_id_quantity = $db -> prepare($max_id_quantity);
		$query_max_id_quantity -> execute(); 
		while($result = $query_max_id_quantity->fetch()){
			$max_id_quantity = $result[0];
		}
		$i=0;
		
		$max_id_ordered=$max_id_ordered+1;
		$sql = " insert into ordered values('".$max_id_ordered."','0','0','".$totalprice."','".$mesaid."')";
			$query = $db->prepare($sql);
			$query ->execute();
		foreach ($quantities as $quantity) {
		if($quantity==0){}
		else{
			for ($z = 0; $z < $quantity; $z++) {
			$product=$products[$i];
			
	
			$max_id_quantity=$max_id_quantity+1;

			$sql1 = " insert into quantity values('".$max_id_quantity."','0',0,'".$product->id."')";
			$query1 = $db->prepare($sql1);
			$query1 ->execute();
			
			$sql2 = " insert into ordered_quantity values('".$max_id_ordered."','".$max_id_quantity."')";
			$query2 = $db->prepare($sql2);
			$query2 ->execute();
			}
			
			
			}
		$i=$i+1;
		}
	} 
		}else{
          $datos = array('mensaje' => "Error, intente nuevamente");
          echo json_encode($datos);
    }
?>