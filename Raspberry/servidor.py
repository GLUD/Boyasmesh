#!/usr/bin/python

import base64
import json
import sys
import socket

server_db = ""

layerMess = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
layerMess.bind(('', 666))
layerMess.listen(5)


while True:
	(cliente , direccion) = layerMess.accept()
	print "\tConnected => " + direccion[0] + ":" + str(direccion[1])

	data = 	cliente.recv(5)
	garbate = cliente.recv(1)
	string_pass = data.decode('utf-8')
	print "\tclave => ",string_pass

	if(string_pass == "12345"):
		print "\tinicio de sesion : insertar datos"

		cliente.send("nodes[?]\n")

		gargabe = cliente.recv(1)
		data = cliente.recv(1)
		gargabe = cliente.recv(1)

		int_num = int(data.decode('utf-8'))
		print "\tcantidad de nodos => ",int_num

		array_list = []

		contador = 0

		for x in range(1, int_num+1):
			gargabe = cliente.recv(1)
			data = cliente.recv(59)
			gargabe = cliente.recv(1)
			string_node = data.decode('utf-8')

			print("\tnode%d = {%s}" % (x , string_node))
		
			temp_array = string_node.split(",")
			if(len(temp_array)==4):
				nombre = temp_array[0].split("=")
				sensor_lluvia = temp_array[1].split("=")
				nivel_agua = nombre = temp_array[2].split("=")
				id_alerta = temp_array[3].split("=")

				if(len(nombre)==2 and len(sensor_lluvia)==2 and len(nivel_agua)==2 and len(id_alerta)==2 ):
					if(x==1):
						## receptor vacio
						data_ok = {
                                                         "emisor" : nombre[1],
                                                         "receptor" : None,
                                                         "sensor_lluvia" : float(sensor_lluvia[1]),
                                                         "nivel_agua" : float(nivel_agua[1]),
                                                         "id_alerta" : int(id_alerta[1])
                                                 }
					else:
						## receptor el anterior 
 	 					data_ok = {
                                                         "emisor" : nombre[1],
                                                         "receptor" : array_list[contador]["emisor"],
                                                         "sensor_lluvia" : float(sensor_lluvia[1]),
                                                         "nivel_agua" : float(nivel_agua[1]),
                                                         "id_alerta" : int(id_alerta[1])
                                                 }
				else:
					## generar array_list con el error
					data_ok = {
						"emisor":	"capa0",
						"receptor":	"",
						"sensor_lluvia":0.00,
						"nivel_agua":	0.00,
						"id_alerta":	0
					}
					
			else:
				## generar array_list con el error
				data_ok = {
					"emisor":	"capa0",
					"receptor":	"",
					"sensor_lluvia":0.00,
					"nivel_agua":	0.00,
					"id_alerta":	0
				}

			array_list.append(data_ok)
			if(x!=1):
				contador = contador + 1
	
		print array_list
	else:
		print "\tmensaje de error : password erronea"

	r = requests.post("http://"+server_db, data={'password' : 'H0L4gu4p0' ,'data' : base64.b64encode(json.dumps(array_list))} )
		print r.text
	cliente.close()

