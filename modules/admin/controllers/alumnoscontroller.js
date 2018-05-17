'use strict';
angular.module('Admin.alumnos')
    .controller('AdminAlumnosController', ['$scope', '$rootScope', '$location', 'DataService', '$timeout', '$uibModal', 'formService', 'Upload', 'Notes', 'AdminService',
        function($scope, $rootScope, $location, Data, $timeout, $uibModal, Forms, Upload, Notes, AdminService) {
            console.log('alumnos');
            //
            $rootScope.styleadmin = true;
            //ACTIVE BACKGROUND SIDE BAR
            $scope.active = { alumnos: true };
            //
            $scope.panel = Forms.panel('Error el Alumno no pudo ser registrado intentalo de nuevo mas tarde !');
            //
            $scope.dataLoading = false;
            //

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

            $scope.clearDataRegister(true);

            $scope.clearReset = function() {
                $scope.clearDataRegister(false);
                $scope.btnModalOptions.mensaje.status = false;
                $scope.btnModalOptions.class = 'btn-danger';
                //if (!type)
                //    document.querySelector('button[type="reset"]').click();
            };


            $scope.picture = Forms.picture('Foto Alumno', 'Registrar Alumno', true);
            $scope.inputs = Forms.register.alumnos($scope.data);
            $scope.btnModalOptions = Forms.btnModal('Seleccione el Apoderado', 'Ningun Apoderado Seleccionado', 'btn-danger');


            $scope.getData = function() {
                Notes.get({ table: 'alumnos', csrf: $rootScope.globals.data.token, transform: 1 }, function(response) {
                    $scope.alumnos = response.alumnos;
                    console.log($scope.alumnos);
                })
            };

            $scope.getData();

            $scope.constructData = function(data) {
                return AdminService.data.construct(data);
            };


            /****************************
             *******    REGISTRO    ******
             *****************************/

            //funcion de registro
            $scope.registerAlumno = function() {
                $scope.dataLoading = true;
                //console.log($scope.data);
                let data = $scope.constructData($scope.data);
                //console.log(data);
                let token = $rootScope.globals.data.token;
                let scope = {
                    panel: $scope.panel,
                    getData: $scope.getData,
                    clear: $scope.clearReset,
                    loading: $scope.dataLoading,
                    message: 'El Alumno ' + $scope.data.name + ' ' + $scope.data.lastname + ' fue registrado con exito',
                }

                AdminService.data.register('alumnos', token, data, scope);
                $scope.dataLoading = false;
            };
            $scope.uploadPic = function() {
                let file = $scope.data.picfile;
                AdminService.upload.picture(file, 'alumnos', $scope, 'registerAlumno');
            };
            //
            $scope.openModalApoderado = function() {
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'modules/admin/views/modal/modal-apoderados.html',
                    size: 'lg',
                    controller: 'modalSelectApoderado',
                });
            };
            //open modal

            $scope.openApoderado = function() {
                $scope.openModalApoderado();
            };
            $rootScope.modifiBtnModalOptions = function(data) {
                $scope.btnModalOptions.mensaje.status = true;
                $scope.btnModalOptions.class = 'btn-success';
                $scope.btnModalOptions.mensaje.data = "El Apoderado seleccionado : " + data.nombre + ' ' + data.apellido + ' ';
                $scope.data.idApoderado = data.id;
            };



            /****************************
             *********   LISTA   ********
             *****************************/
            //table headers listas
            $scope.tableHeaders = ['Nombre', 'Direccion', 'Email', 'Estado', 'Actions'];
            $scope.openModalEdit = function(data) {
                $rootScope.dataAlumno = data;
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: 'modules/admin/views/modal/modal-edit.html',
                    size: 'lg',
                    controller: 'modalEditAlumCtrl',
                });
            };
            $scope.openEdit = function(alumno) {
                $scope.openModalEdit(alumno);
            };
            $rootScope.getData = function() {
                $scope.getData();
            };


        }
    ])
    .controller('modalEditAlumCtrl', ['$scope', '$uibModalInstance', 'DataService', '$rootScope', 'formService', '$interval', 'Upload', '$timeout', '$cacheFactory', 'Notes',
        function($scope, $uibModalInstance, DataService, $rootScope, Forms, $interval, Upload, $timeout, $cache, Notes) {

            let token = $rootScope.globals.data.token;
            $scope.name = 'top';
            $rootScope.dataAlumno.nacimiento = new Date($rootScope.dataAlumno.nacimiento);
            $scope.data = angular.copy($rootScope.dataAlumno);

            $scope.oneAtATime = true;
            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };

            $scope.panel = {
                update: true,
                picture: true,
                state: { title: 'Cambiar el estado de matricula del Alumno' },
                reset: true,
                apoderado: true,
                materia: true,
                horario: false,
                delete: {
                    name: 'alumno',
                },
            };
            $scope.inputs = Forms.update.alumnos($scope.data);
            //
            $scope.title = "Editar Alumno " + $scope.data.nombre + ' ' + $scope.data.apellido;
            $scope.url = {
                img: 'image/alumnos'
            };
            //
            if ($scope.data.idApoderado != 0) {
                Notes.get({ table: 'apoderado', id: $scope.data.idApoderado, csrf: token })
                    .$promise.then(function(apoderado) {
                        console.log(apoderado);
                        $scope.apoderado = apoderado;
                    });
            } else {
                Notes.get({ table: 'apoderado', csrf: token, transform: 1 })
                    .$promise.then(function(apoderados) {
                        console.log(apoderados);
                        $scope.apoderados = apoderados.apoderado;
                    });
            }
            //
            $scope.options = {
                minDate: new Date(),
                showWeeks: true
            };

            $scope.progress = 0;
            //
            $scope.modalPicture = function() {
                console.log('hola jony');
                var el = document.getElementById("fileUploadModal");
                if (el) {
                    el.click();
                }
            };
            $scope.getDataMateria = function() {
                Notes.get({ table: 'materia', csrf: token, transform: 1 })
                    .$promise.then(function(materias) {
                        console.log(materias);
                        $scope.materias = materias.materia;
                    });
            };

            $scope.getDataMateria();

            $scope.changeApoderado = function() {
                $scope.apoderado = false;
                Notes.get({ table: 'apoderado', csrf: token, transform: 1 })
                    .$promise.then(function(apoderados) {
                        console.log(apoderados.apoderado);
                        $scope.apoderados = apoderados.apoderado;
                    });
            };

            $scope.changeCheckbox = function() {
                ($scope.data.estado == 'activo') ? $scope.data.estado = 'inactivo': $scope.data.estado = 'activo';
            };

            $scope.updateEstado = function(alumno) {
                var data = {
                    estado: alumno.estado
                };
                /**/

                Notes.update({ table: 'alumnos', csrf: token, id: alumno.id }, data).
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

            $scope.updateApoderado = function() {

                let data = { idApoderado: $scope.selectApoderado.id }
                Notes.update({ table: 'alumnos', csrf: token, id: $scope.data.id }, data)
                    .$promise.then(function(response) {
                        console.log(response);
                        $scope.data.idApoderado = $scope.selectApoderado.id;
                        /**/
                        Notes.get({ table: 'apoderado', csrf: token, id: $scope.data.idApoderado })
                            .$promise.then(function(apoderado) {
                                console.log(apoderado);
                                $scope.apoderado = apoderado;

                            })

                    })
            };

            $scope.updatePicture = function(data) {
                let file = $scope.data.picfile;
                console.log(file);
                console.log(data);
                /**/
                file.upload = Upload.upload({
                    method: 'POST',
                    file: file,
                    url: 'php/upload/upload.php',
                    data: { 'targetPath': 'alumnos', 'update': 1, 'name': data.img },
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        if (response.data.success) {
                            console.log(response);
                            console.log('se guardo la imagen con exito');
                            $cache.get('$http').removeAll();
                            //$scope.data.img = '';
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
                /*DataService.updateAlumno(data, function(response) {
                    $rootScope.getData();
                });*/
                /**/
                Notes.update({ table: 'alumnos', csrf: token, id: data.id }, data)
                    .$promise.then(function(response) {
                        console.log(response);
                    })
            };

            $scope.delete = function(id) {
                Notes.delete({ table: 'alumnos', csrf: token, id: id })
                    .$promise.then(function(response) {
                        if (response.$resolved) {
                            $uibModalInstance.close();
                            $rootScope.getData();
                        } else {
                            alert('no se pudo eliminar el alumno ' + $scope.data.nombre);
                        }
                    })
            };

            $scope.getMateriasActive = function() {
                Notes.get({ table: 'activo', csrf: token, filter: 'idAlumno,eq,' + $scope.data.id, transform: 1 })
                    .$promise.then(function(response) {

                        if (response.activo.length > 1) {
                            var data = [];
                            angular.forEach(response.activo, function(elem, idx) {
                                // id.push(elem.idMateria);
                                //console.log(id);
                                let content = { idActivo: elem.id };
                                Notes.get({ table: 'materia', csrf: token, id: elem.idMateria, transform: 1 })
                                    .$promise.then(function(response) {
                                        console.log(response);
                                        content.nombre = response.nombre;
                                        content.id = response.id;
                                        data.push(content);

                                    });
                            })

                            //id = id.join();
                            console.log(data);
                            $scope.MateriaActive = data;

                        } else {
                            if (response.activo.length == 0) {
                                $scope.MateriaActive = [];
                                return;
                            };

                            var id = response.activo[0].idMateria;
                            let idActivo = response.activo[0].id;
                            console.log(id);
                            Notes.get({ table: 'materia', csrf: token, id: id })
                                .$promise.then(function(response) {
                                    console.log(response);
                                    let data = {
                                        nombre: response.nombre,
                                        id: response.id,
                                        idActivo: idActivo
                                    };


                                    console.log(data);
                                    $scope.MateriaActive = [data];
                                });
                        }
                        /**/

                    });
            };
            $scope.getMateriasActive();
            $scope.agregarMaterias = function() {
                //console.log($scope.selectMateria);
                let materias = [];
                angular.forEach($scope.selectMateria, function(status, idx) {
                        console.log(status);
                        console.log(idx);
                        if (status) materias.push(idx);
                    })
                    //console.log(materias);
                let data;
                //console.log(materias.length);
                if (materias.length > 1) {
                    data = [];
                    angular.forEach(materias, function(elem) {
                        data.push({ idAlumno: $scope.data.id, idMateria: elem })
                    });
                } else {
                    data = {
                        idAlumno: $scope.data.id,
                        idMateria: materias[0]
                    }

                }

                console.log(data);

                Notes.save({ table: 'activo', csrf: token }, data)
                    .$promise.then(function(response) {
                        console.log(response);
                        $scope.getMateriasActive();

                    })
            };

            $scope.deleteMateria = function(data) {
                console.log('delete materia');
                console.log(data);

                Notes.delete({ table: 'activo', csrf: token, id: data.idActivo })
                    .$promise.then(function(response) {
                        console.log(response);
                        $scope.getMateriasActive();
                    })
            };


            $scope.changePassword = function(data) {
                console.log(data);
                let content = {
                    password: data.newpassword,
                }
                console.log(content);
                Notes.update({ table: 'alumnos', csrf: token, id: data.id }, content)
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
    .controller('modalSelectApoderado', ['$scope', '$rootScope', '$uibModalInstance', 'DataService', 'Notes',
        function($scope, $rootScope, $uibModalInstance, DataService, Notes) {

            Notes.get({ table: 'apoderado', csrf: $rootScope.globals.data.token, transform: 1 })
                .$promise.then(function(response) {
                    console.log(response);
                    $scope.apoderados = response.apoderado;
                });

            console.log($scope.apoderados);
            $scope.select;
            $scope.name = 'top';
            $scope.ok = function() {
                $uibModalInstance.close();
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
            $scope.itemsByPage = 5;
            $scope.seleccionar = function() {
                if ($scope.select.estado == 'inactivo') {
                    alert('estado inactivo imposible agregarlo');
                } else {
                    $rootScope.modifiBtnModalOptions($scope.select);
                    $scope.ok();
                }
            }
        }
    ])