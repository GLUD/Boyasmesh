
<?php 

	require_once('conexion/conexion.php');

	$conexion = new Conexion();

	while(true){

		$resultado = $conexion->consulta("select * from public.consumir_alertas();");
		$resultado= pg_fetch_assoc($resultado);
		if($resultado["consumir_alertas"] == null){
			echo "no hay nada";
		}
		else{
			$resultado=$resultado["consumir_alertas"];
			formatearResultado($resultado);
		}

		sleep(5);
	}
	
	function formatearResultado($r){
		$resultado = "";

		$r = ( json_decode($r) );
		for ($i=0; $i < sizeof($r); $i++) { 
			$aux;
			$aux=(array)$r[$i];

			$resultado .= "Emisor: ". $aux["emisor"] . "\r\n";
			$resultado .= "Tipo: ". $aux["tipo"] . "\r\n";
			$resultado .= "Descripcion: ". $aux["descripcion"] . "\r\n";
			$resultado .= "Fecha: ". $aux["fecha"] . "\r\n\n";
		}
		//echo $resultado;
		enviarAlertas($resultado);
	}

	function enviarAlertas($mensaje){
		$token = "453720960:AAHQYS1rlPErLWJFL8MA_GitIlHmQ8xsCgc";

		$data = [
		    'text' => $mensaje,
		    'chat_id' => '566566029'
		];

		file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );
	}

?>