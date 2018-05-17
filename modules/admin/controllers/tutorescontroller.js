'use strict';

angular.module('Admin.tutores')

.controller('AdminTutoresController', ['$scope', '$rootScope', '$location', 'DataService', '$timeout', '$uibModal', 'formService', 'Upload', 'Notes', 'AdminService',
    function($scope, $rootScope, $location, Data, $timeout, $uibModal, Forms, Upload, Notes, AdminService) {

        console.log('tutores');
        //
        $rootScope.styleadmin = true;
        //ACTIVE BACKGROUND SIDE BAR
        $scope.active = { tutores: true };
        //
        $scope.panel = Forms.panel('Error el Tutor no pudo ser registrado intentalo de nuevo mas tarde !');
        //
        $scope.dataLoading = false;

        //animation
        $scope.animationsEnabled = true;

        $scope.data = {};

        $scope.clearDataRegister = function(type) {
            //data de registro
            if (type)
                $scope.data = { checkbox: true };
            else {
                angular.forEach($scope.data, function(i, e) {
                    if (e == 'checkbox') e = false;

                    e = '';
                });
            }
            //$scope.data = { checkbox: false };
        };

        //inicia variable de registro
        $scope.clearDataRegister(true);

        $scope.clearReset = function() {
            $scope.clearDataRegister(false);
            //if (!type)
            //    document.querySelector('button[type="reset"]').click();
        };

        $scope.picture = Forms.picture('Foto Tutor', 'Registrar Tutor', true);
        $scope.inputs = Forms.register.tutores($scope.data);

        $scope.getData = function() {
            Notes.get({ table: 'tutor', csrf: $rootScope.globals.data.token, transform: 1 })
                .$promise.then(function(response) {
                    $scope.tutores = response.tutor;
                })
        };

        $scope.getData();

        /*****************************
         *******    REGISTRO    ******
         *****************************/

        //funcion de registro
        $scope.registerTutor = function() {

            $scope.dataLoading = true;
            let token = $rootScope.globals.data.token;
            let data = {
                nombre: $scope.data.name,
                apellido: $scope.data.lastname,
                direccion: $scope.data.address,
                estado: ($scope.data.checkbox == true) ? 'activo' : 'inactivo',
                email: $scope.data.email,
                password: $scope.data.password,
                telefono: $scope.data.telephone,
                documento: $scope.data.documento,
                img: $scope.data.img,
            };
            let scope = {
                panel: $scope.panel,
                getData: $scope.getData,
                clear: $scope.clearReset,
                loading: $scope.dataLoading,
                message: 'El Tutor ' + $scope.data.name + ' ' + $scope.data.lastname + ' fue registrado con exito',
            };

            AdminService.data.register('tutor', token, data, scope);
            $scope.dataLoading = false;
        };


        $scope.uploadPic = function() {
            let file = $scope.data.picfile;
            AdminService.upload.picture(file, 'tutores', $scope, 'registerTutor');
        };



        /****************************
         *********   LISTA   ********
         *****************************/
        //table headers listas
        $scope.tableHeaders = ['Nombre', 'Direccion', 'Email', 'Telefono', 'Estado', 'Actions'];
        $scope.openModalEdit = function(data) {
            $rootScope.dataTutor = data;
            $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'modules/admin/views/modal/modal-edit.html',
                size: 'lg',
                controller: 'modalEditTutorCtrl',
            });

        };

        //open modal
        $scope.openEdit = function(alumno) {
            $scope.openModalEdit(alumno);
        };
        //


        $rootScope.getData = function() {
            $scope.getData();
        };


    }
])

.controller('modalEditTutorCtrl', ['$scope', '$uibModalInstance', 'DataService', '$rootScope', 'formService', '$interval', 'Upload', '$timeout', '$cacheFactory', 'Notes',
    function($scope, $uibModalInstance, DataService, $rootScope, Forms, $interval, Upload, $timeout, $cache, Notes) {

        let token = $rootScope.globals.data.token;

        $scope.name = 'top';


        $scope.data = angular.copy($rootScope.dataTutor);

        $scope.oneAtATime = true;

        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.panel = {
            update: true,
            picture: true,
            state: { title: 'Cambiar el estado del Tutor' },
            reset: true,
            delete: true,
            puntuacion: true
        };

        $scope.inputs = Forms.update.tutores($scope.data);
        //
        $scope.title = "Editar Tutor " + $scope.data.nombre + ' ' + $scope.data.apellido;

        $scope.url = {
            img: 'image/tutores'
        };

        //

        $scope.options = {
            minDate: new Date(),
            showWeeks: true
        };

        $scope.progress = 0;
        //

        $scope.changeCheckbox = function() {

            ($scope.data.estado == 'activo') ? $scope.data.estado = 'inactivo': $scope.data.estado = 'activo';
        };

        $scope.updateEstado = function(tutor) {
            console.log(tutor);
            var data = {
                estado: tutor.estado
            };

            Notes.update({ table: 'tutor', csrf: token, id: tutor.id }, data)
                .$promise.then(function(response) {
                    if (response.$resolved) {

                        alert('estado actualizado con exito');

                        $uibModalInstance.close();
                        $rootScope.getData();

                    } else {
                        alert('error al actualizar su estado');
                    }
                })
        };

        $scope.updatePicture = function(data) {

            let file = $scope.data.picfile;

            /**/

            file.upload = Upload.upload({
                method: 'POST',
                file: file,
                url: 'php/upload/upload.php',
                data: { 'targetPath': 'tutores', 'update': 1, 'name': data.img },

            });

            file.upload.then(function(response) {

                $timeout(function() {

                    file.result = response.data;

                    if (response.data.success) {
                        console.log(response);
                        console.log('se guardo la imagen con exito');
                        $cache.get('$http').removeAll();
                        $scope.data.img = '';
                        //$scope.data.img = response.data.name;
                    } else {
                        console.log('no se pudo guardar la imagen ');
                    }

                }, 1000);


            }, function(response) {

                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;



            }, function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            }); /**/

        };



        $scope.updateData = function(data) {
            console.log(data);
            /*let url = 'tutor/'+data.id;
            DataService.update(data, url,function(response) {
                $rootScope.getData();
            });*/

            Notes.update({ table: 'tutor', csrf: token, id: data.id }, data)
                .$promise.then(function(response) {
                    console.log(response);
                })
        };

        $scope.delete = function(id) {
            Notes.delete({ table: 'tutor', csrf: token, id: id })
                .$promise.then(function(response) {
                    if (response.$resolved) {
                        $uibModalInstance.close();
                        $rootScope.getData();
                    } else {
                        alert('no se pudo eliminar el alumno ' + $scope.data.nombre);
                    }
                })
        };

        $scope.changePassword = function(data) {
            console.log(data);
            let content = {
                password: data.newpassword,
            }
            console.log(content);
            Notes.update({ table: 'tutor', csrf: token, id: data.id }, content)
                .$promise.then(function(response) {
                    console.log(response);

                    //aca se envia la nueva contraseña al correo del usuario
                })
        };

        /********************
        ******* RATINK ******
        *********************/
        function calificacion(data){
            //console.log(data);

            var sumcali = function(cal){
                    cali[cal] +=  1;
            }
            /*
                creamos un objeto para guardar las cantidades 
            */
            var cali = $scope.cali ={
                '7':0,
                '6':0,
                '5':0,
                '4':0,
                '3':0,
                '2':0,
                '1':0
            };
            // guardamos el resultado de la operacion de multiplicar (n*cantidad) y su suma
            var data1 = 0;
            //guardarmos la cantidad total de calificaciones
            var data2 = $scope.totalCalificaciones =data.length;

            /*
                recorremos un array que contiene las calificaciones 
                buscamos las calificaciones y guardarmos 7 valores verificamos cuantas equivales a cada valor 
            */
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i]);
                sumcali(data[i]);
            };


            console.log(cali);

            
           
             /*
             
           multiplico la cantidad por el valor y sumo su resultado con la respuesta anterior 
 
            */
            angular.forEach(cali,function(elem,idx){
                //console.log(elem);
                //console.log(idx);

                data1 = data1 + (elem*idx);
                //console.log(data1);
            })

            //console.log(data1);

            //divido el resultado por la cantidad total esto es el porcentaje de 1 a 7 
            if(data.length == 0 ){
                var total = $scope.porcentajeCalificacion = 0;
            }else{
                var total = $scope.porcentajeCalificacion = (data1 / data2);
            }
           

            console.log(total);

        }

        $scope.getRatink = function(){
            var data =[];
            var calificaciones = [];
            Notes.get({table:'calificacionTutor',csrf:token,filter:'idTutor,eq,'+$scope.data.id,transform:1})
            .$promise.then(function(response){
                console.log(response);

                angular.forEach(response.calificacionTutor,function(elem,idx){
                    calificaciones.push(elem.calificacion);

                    console.log(elem);
                    Notes.get({table:'apoderado',csrf:token,id:elem.idApoderado})
                    .$promise.then(function(response){
                        response.calificacion = elem.calificacion; 
                        response.comentario = elem.comentario;
                        console.log(response)
                        data.push(response);    
                    })
                })

                 

            })

            $timeout(function() {
                console.log(data);
                console.log(calificaciones);
                calificacion(calificaciones);
                $scope.rankinData = data;
            }, 1000);
           
        };
        $scope.getRatink();

        $scope.ratink = function(){

        };

        $scope.ok = function() {
            $uibModalInstance.close();
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
])
