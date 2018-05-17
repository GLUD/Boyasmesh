<?php
//SE DEFINEN LAS CONSTANTES PARA LA CONECCION CON LA BASE DE DATOS 
define('HOST',"localhost");
define('DBNAME', "prueba");
define('PORT', 5432);
define('USER',"postgres");
define('PASSWORD',1234);
class Conexion
{
	//FUNCION QUE NOS DEVUELVE LA CONECCION PARA SER PROCESADA DESDE OTROS ARCHIVOS
	function conectar(){

		$conec= pg_connect("host='".HOST."' dbname=".DBNAME." port=".PORT." user=".USER." password=".PASSWORD) or die("ERROR EN LA CONEXION".pg_last_error());
		return $conec;
	}
}


?>