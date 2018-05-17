'use strict';

angular.module('Admin.apoderados')

.controller('AdminApoderadosController', ['$scope', '$rootScope', '$location', 'DataService', '$timeout', '$uibModal', 'formService', 'Upload', 'AdminService', 'Notes',
        function($scope, $rootScope, $location, Data, $timeout, $uibModal, Forms, Upload, AdminService, Notes) {
            console.log('apoderado');

            //
            $rootScope.styleadmin = true;
            //ACTIVE BACKGROUND SIDE BAR
            $scope.active = { apoderados: true };
            //
            $scope.panel = Forms.panel('Error el Apoderado no pudo ser registrado intentalo de nuevo mas tarde !');
            //
            $scope.dataLoading = false;

            //animation
            $scope.animationsEnabled = true;

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
                }
                //inicia variable de registro
            $scope.clearDataRegister(true);



            $scope.clearReset = function() {
                $scope.clearDataRegister(false);

            }

            //table headers listas

            $scope.picture = Forms.picture('Foto Apoderado', 'Registrar Apoderado', true);
            $scope.inputs = Forms.register.apoderados($scope.data);

            $scope.getData = function() {
                Notes.get({ table: 'apoderado', csrf: $rootScope.globals.data.token, transform: 1 }, function(response) {
                    $scope.apoderados = response.apoderado;
                    console.log($scope.apoderados);
                })
            };

            $scope.getData();

            /****************************
             *******    REGISTRO    ******
             *****************************/

            //funcion de registro
            $scope.registerApoderado = function() {

                $scope.dataLoading = true;

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

                let token = $rootScope.globals.data.token;
                let scope = {
                    panel: $scope.panel,
                    getData: $scope.getData,
                    clear: $scope.clearReset,
                    loading: $scope.dataLoading,
                    message: 'El Apoderado ' + $scope.data.name + ' ' + $scope.data.lastname + ' fue registrado con exito'
                }

                AdminService.data.register('apoderado', token, data, scope);
                $scope.dataLoading = false;
            };

            $scope.uploadPic = function() {

                let file = $scope.data.picfile;

                AdminService.upload.picture(file, 'apoderados', $scope, 'registerApoderado');

            }

            /****************************
             *********   LISTA   ********
             *****************************/

            $scope.tableHeaders = ['Nombre', 'Direccion', 'Email', 'Telefono', 'Estado', 'Actions'];
            $scope.openModalEdit = function(data) {
                $rootScope.dataApoderado = data;
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'modules/admin/views/modal/modal-edit.html',
                    size: 'lg',
                    controller: 'modalEditApodCtrl',
                });

            };

            //open modal
            $scope.openEdit = function(alumno) {
                $scope.openModalEdit(alumno);
            };

            $rootScope.getData = function() {
                $scope.getData();
            };

        }
    ])
    .controller('modalEditApodCtrl', ['$scope', '$uibModalInstance', 'DataService', '$rootScope', 'formService', '$interval', 'Upload', '$timeout', '$cacheFactory', 'Notes',
        function($scope, $uibModalInstance, DataService, $rootScope, Forms, $interval, Upload, $timeout, $cache, Notes) {

            let token = $rootScope.globals.data.token;
            $scope.name = 'top';


            $scope.data = angular.copy($rootScope.dataApoderado);

            $scope.oneAtATime = true;

            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };

            $scope.panel = {
                update: true,
                picture: true,
                state: { title: 'Cambiar el estado del Apoderado' },
                reset: true,
                delete: {
                    name: 'apoderado'
                },
            };

            $scope.inputs = Forms.update.apoderados($scope.data);
            //
            $scope.title = "Editar Apoderado " + $scope.data.nombre + ' ' + $scope.data.apellido;

            $scope.url = {
                img: 'image/apoderados'
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

            $scope.updateEstado = function(apoderado) {
                var data = {
                    estado: apoderado.estado,
                };

                Notes.update({ table: 'apoderado', csrf: token, id: apoderado.id }, data).
                $promise.then(function(response) {
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
                    data: { 'targetPath': 'apoderados', 'update': 1, 'name': data.img },

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
                /*let url = 'apoderado/' + data.id;
                DataService.update(data, url, function(response) {
                    $rootScope.getData();
                });*/

                Notes.update({ table: 'apoderado', csrf: token, id: data.id }, data)
                    .$promise.then(function(response) {
                        console.log(response);
                    });
            };

            $scope.delete = function(id) {


                Notes.delete({ table: 'apoderado', csrf: token, id: id })
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
                Notes.update({ table: 'apoderado', csrf: token, id: data.id }, content)
                    .$promise.then(function(response) {
                        console.log(response);

                        //aca se envia la nueva contraseña al correo del usuario
                    })
            };

            $scope.ok = function() {
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ])