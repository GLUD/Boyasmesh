<?php
	require_once("./conexion.php");
	//Funcion escencial que se encargara de recibir los parametros Del Raspberry por medio de curl
	define('KEY', "5ba0b95a641eb72f8ddd17966320fcd0");
		if (isset($_POST['password'])){
			if (!empty($_POST['password'])){
				$da=md5($_POST['password']);
				echo $da;
				//VALIDAMOS QUE LA CONTRASENA RECIBIDA SEA VALIDA
				if (md5($_POST['password'])==KEY){
					//indicamos que es correcta
					echo "password valida";
					if (!empty($_POST['data'])){
						$datos=$_POST['data'];
						$datos=base64_decode($datos);
						//DECODIFICAMOS LA INFORMACION RECIBIDA Y LA ALMACENAMOS A LA BD
						guardar($datos);
					}
				}else{
					//SE INDICA QUE ALGO FALLO
					echo "password invalida";
				}
			}
			
		}

function guardar($data){
	$c_con= new Conexion();
	$con=$c_con->conectar();
	try{
		//SE LLAMA A LA FUNCIONIQ QUE SE ENCARGA DE RECIBIR LOS DATOS COMO UN STRING QUE SERA PROCESADA POR UNA FUNCION DE LA bd
		pg_query($con,"SELECT agregar_dato('".$data."')");
		pg_close();
		echo("o.k");
	}catch(Exception $e){
		//hubi un error
		echo ("error");
	}

}

	
?>

