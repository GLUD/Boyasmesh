<?php 
/**
* 
*/
class Conexion
{
	
	var $usuario = "postgres";
	var $contrasena = "1234";
	var $db = "prueba";
	var $puerto = "5432";
	var $host = "localhost";

	function __Conexion()
	{

	}

	function consulta($sql){
		$cadena = "host={$this->host} port={$this->puerto} dbname={$this->db} user={$this->usuario} password={$this->contrasena}";
		$conexion = pg_connect($cadena);
		if($conexion){
			return pg_query($conexion, $sql);
		}else{
			return "";
		}
	}

}

?>