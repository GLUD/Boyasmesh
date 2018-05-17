<?php
	require_once("./conexion.php");
	
	if ((isset($_POST["username"])&&(!empty($_POST["username"])))){
		try{
			$con= new Conexion();
			$conexcion=$con->conectar();
			$sql="INSERT INTO user_auth (username,email,pass) VALUES ('".$_POST["username"]."','".$_POST["email"]."','".$_POST["pass"]."')";
			$sql2="SELECT * FROM user_auth WHERE username='".$_POST["username"]."' OR email='".$_POST["email"]."'";
			$ver=pg_query($conexcion,$sql2);
			$count=pg_num_rows($ver);
			if($count==0){
				//SE INSERTA EL USUARIO SI NO EXISTE EN LA BD
				$res=pg_query($conexcion,$sql);
				$data['success'] = true;
				$data['message']="Usuario Creado Correctamente";
				$data=json_encode($data);
				echo $data;
				pg_close();
				exit();
			}else{
				$data['message'] = "Usuario O email repetido";
				$data['success'] = false;
				$data=json_encode($data);
				echo $data;
				pg_close();
			}
			
		}catch(Exception $e){
			//throw $e;
			//Pasarlo 
			$data['message'] = $e;
			$data['success'] = false;
			$data=json_encode($data);
			pg_close();
			echo $data;
			exit();

		}

	}


?>