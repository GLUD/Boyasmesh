<?php
	require_once("./conexion.php");
	//SI NOS LLEGA ALGO ENTONCES VERIFICAMOS LA INFORMACION CON RESPECTO DE LA BD
	if (isset($_POST)){
		try{
			$data1=key($_POST);
			$data1=json_decode($data1);
		    $data1=((array)$data1);
			$c_con= new Conexion();
			$con=$c_con->conectar();
			$res=pg_query($con,"SELECT * FROM user_auth WHERE username='".$data1["username"]."' AND pass='".$data1["pass"]."'");
			$count=pg_num_rows($res);
			pg_close();
			//SI NOS TRAE ALGO SIGNIFICA QUE EL USUARIO EXITE Y POR LO TANTO POSEE ACCESO AL SISTEMA
			if ($count>0){
				//CARGAMOS EL DASHBOARD E INICIAMOS LAS VARIABLES DE SESION
				$data["data"]["username"]=$data1["username"];
				$data["data"]["contrasena"]=$data1["pass"];
				$data["success"]=true;
				$data=json_encode($data);
				echo $data;
			}else{
				$data["message"] = "usuario no existe o es invalido";
				$data=json_encode($data);
				echo $data;
			}
		} catch(Exception $e){
				$data["success"]=false;
				$data["message"]=$e;
				$data=json_encode($data);
				pg_close();
				echo $data;
				exit();
		}
	}else{
		//echo "ENTRO AL ESLE";
	}

?>