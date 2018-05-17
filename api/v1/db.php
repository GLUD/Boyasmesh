<?php
class dbMySQL{
	//parametro de la conexion
	private $host = "localhost" ;//your host
	private $user = "root" ;//your user
	private $pass = "";//your password
	private $db   = "macroferia";//your db name
	private $conn;
	//function constructora
	public function __construct(){
		$this->conn=mysqli_connect(
			$this->host,
			$this->user,
			$this->pass,
			$this->db
		);
		if(mysqli_connect_error()){
			printf(
				"error en la conexion:%d\n",
				mysqli_connect_error()
			);
			exit;
		}else{
			//print "conexion exitosa";
		}
	}
	//
	public function abc($q){
		return mysqli_query($this->conn,$q);
	}
	//
	public function query($q,$p){
		if($q!=""){
			//$r = mysqli_query($this->conn,$q);
		 	$r=$this->abc($q);
		 	switch($p){
				case "fetch_row":
					$data = mysqli_fetch_row($r);
				break;
				case "fetch_object":
					//$data = "hola aqui dentro de php";
					$data = [];
					while($d = mysqli_fetch_object($r)){
						array_push($data, $d);
					}
				break;
				case "num_rows":
					$data = mysqli_num_rows($r);
				break;
				default:
			}
		}
		return $data;
	}
	//
	public function charset_escape($utf,$n){
		mysqli_set_charset($this->conn,$n);
		$data = mysqli_real_escape_string($this->conn,$n);
		return $data;
	}
	//
	public function close(){
		mysqli_close($this->conn);
	}
}
