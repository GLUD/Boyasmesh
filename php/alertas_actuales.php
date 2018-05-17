<?php
//UTILIZADO POR EL NODE.JS
	require_once('./conexion.php');
	$c_con= new Conexion();
	$con=$c_con->conectar();
	//SE LLAMA A LA FUNCION EN LA BD QUE SE ENCARGA DE TRAERNOS LOS DATOS DE LA ULTIMA COMUNICACION PARA EL RASPBERRY Y ASI ENVIARLO 
	try{
		$res=pg_query($con,"SELECT ultima_comunicacion()");
		$data["data"]=pg_fetch_assoc($res);
		$axu=$data["data"];
		$axu=json_decode($axu["ultima_comunicacion"]);
		$data["succes"]=true;
		$data["data"]=$axu;
		$data=json_encode($data);
		echo $data;
	}catch(Exception $e){
		//SE ENVIA LA EXCEPCION EN CASO DE QUE ALGO FALLE
		$data["message"]=$e;
		$data=json_encode($data);
		echo $data;
	}

?>