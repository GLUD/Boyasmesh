'use strict';


angular.module('Admin.services', [])

.factory('AdminService', function(Notes,Upload,$timeout) {

	return {

		data:{
			construct :function(data) {
				let datos = {
                        nombre: data.name,
                        apellido: data.lastname,
                        direccion: data.address,
                        estado: (data.checkbox == true) ? 'activo' : 'inactivo',
                        email: data.email,
                        password: data.password,
                        nacimiento: data.birthday,
                        idApoderado: data.idApoderado,
                        documento: data.documento,
                        img: data.img,
                    };
                    return datos;
			},

			register:function(table,token,data,scope){
				 Notes.save({ table: table , csrf:token }, data, function(response) {
                    //console.log(response.$resolved)
                    if (response.$resolved) {
                        scope.panel.mensaje.correct = scope.message;
                        scope.panel.correct = false;
                        scope.getData();
                        $timeout(function() {
                            scope.clear();
                            scope.panel.correct = true;
                            scope.loading = false;
                        }, 4000)
                    } else {
                        scope.panel.incorrect = false;
                        $timeout(function() {
                            scope.panel.incorrect = true;
                            scope.loading = false;
                        }, 4000)
                    }
                    
                });
			}
		},
		upload:{
			picture:function(file,target,$scope,funct){

                file.upload = Upload.upload({
                    method: 'POST',
                    file: file,
                    url: 'php/upload/upload.php',
                    data: { 'targetPath': target },
                });
                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        if (response.data.name) {
                            $scope.data.img = response.data.name;
                            $scope[funct]();
                        } else {
                            $scope.panel.incorrect = false;
                            $timeout(function() {
                                $scope.panel.incorrect = true;
                            }, 4000)
                        }
                    }, 1000);
                }, function(response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
			}
		}
	}
});