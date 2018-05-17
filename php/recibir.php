<?php
	require_once("./conexion.php");

	define('KEY', "5ba0b95a641eb72f8ddd17966320fcd0");
		if (isset($_POST['password'])){
			if (!empty($_POST['password'])){
				$da=md5($_POST['password']);
				echo $da;
				if (md5($_POST['password'])==KEY){
					echo "password valida";
					if (!empty($_POST['data'])){
						$datos=$_POST['data'];
						$datos=base64_decode($datos);
						guardar($datos);
					}
				}else{
					echo "password invalida";
				}
			}
			
		}

function guardar($data){
	$c_con= new Conexion();
	$con=$c_con->conectar();
	try{
		pg_query($con,"SELECT agregar_dato('".$data."')");
		pg_close();
		echo("o.k");
	}catch(Exception $e){
		echo ("error");
	}

}

	
?>

