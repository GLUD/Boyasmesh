<?php
//UTILIZADO POR EL RASPBERRY 
require_once('./conexion.php');

if (isset($_POST['password'])){
	if (!empty($_POST['password'])){
		if (!empty($_POST['alerta'])){
			try{
				$alrt=$_POST['alerta'];
				$c_con= new Conexion();
				$con=$c_con->conectar();
				$res=pg_query($con,"SELECT consumir_alertas()");
				$res=pg_fetch_all($res);
				pg_close();
				$res=json_encode($res);
				echo $res;
			}catch(Exception $e){
				echo ("Ocurrio un error Inesperado"+$e);
			}
		}
	}
}



?>