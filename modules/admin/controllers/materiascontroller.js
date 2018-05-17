'use strict';

angular.module('Admin.materias')

.controller('AdminMateriasController', [
        '$scope', '$rootScope', '$location', 'DataService', '$timeout', '$uibModal', 'formService', 'Upload',
        function($scope, $rootScope, $location, Data, $timeout, $uibModal, Forms, Upload) {
            $scope.animationsEnabled = true;
            //ACTIVE BACKGROUND SIDE BAR
            $rootScope.styleadmin = true;
            $scope.active = { materias: true };
            //
            $scope.data = { materia: {}, curso: {}, clase: {} };

            $scope.panel = {
                materias: Forms.panel('Error la materia no pudo ser registrada intentalo de nuevo mas tarde !'),
                cursos: Forms.panel('Error el curso no puedo ser registrado intentalo de nuevo mas tarde !'),
                clases: Forms.panel('Error la clase no puedo ser registrado intentalo de nuevo mas tarde !')
            };

            $scope.inputs = {
                materias: Forms.register.materias($scope.data.materia),
                cursos: Forms.register.cursos($scope.data.curso),
                clases: Forms.register.clases($scope.data.clase)
            };

            $scope.dataLoading = {
                materia: false,
                curso: false,
                clase: false,
            };

            $scope.btnModalOptions = {
                materias: '',
                cursos: Forms.btnModal('Seleccione la Materia', 'Ninguna materia Seleccionada', 'btn-danger'),
                clases: Forms.btnModal('Seleccione el Curso', 'Ningun Curso Seleccionado', 'btn-danger')
            };

            $scope.tableHeaders = {
                materia: ['Nombre', '', ' ', '  ', 'Actions'],
                curso: ['Nombre', '', 'Materia', ' ', 'Actions'],
                clase: ['Nombre', '', 'Curso', ' ', 'Actions'],
            };

            $scope.picture = {
                materia: Forms.picture('Imagen Materia', 'Registrar Materia', true),
                curso: Forms.picture('Imagen Materia', 'Registrar Curso', false, false),
                clase: Forms.picture('Imagen Materia', 'Registrar Clase', false, false),
            };

            $scope.mensaje = function(type) {
                if (type == 'materias')
                    return 'La Materia ' + $scope.data.materia.name + ' fue registrado con exito';
                else if (type == 'cursos')
                    return 'El Curso ' + $scope.data.curso.name + ' fue registrado con exito';
                else if (type == 'clases')
                    return 'La Clase ' + $scope.data.clase.name + ' fue registrada con exito'
            };

            /*CARGA INFORMACION*/
            $scope.getData = {
                materias: function() {
                    Data.getMaterias(function(response) {
                        $scope.materias = response.data.materia;
                    });
                },
                cursos: function() {
                    Data.getCursos(function(response) {
                        $scope.cursos = response.data.curso;
                    });
                },
                clases: function() {
                    Data.getClases(function(response) {
                        $scope.clases = response.data.clase;
                    });
                }
            };
            //


            $scope.showPanel = function(type, state) {

                if (state == 'correct') $scope.panel[type].mensaje.correct = $scope.mensaje(type);
                $scope.panel[type][state] = false;
                $timeout(function() {
                    $scope.panel[type][state] = true;
                }, 4000)
            };

            $scope.uploadPic = function(type, data, callback) {

                let file = $scope.data[type].picfile;
                file.upload = Upload.upload({
                    method: 'POST',
                    file: file,
                    url: 'php/upload/upload.php',
                    data: { 'targetPath': data.target },
                });
                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        callback(response);
                    }, 1000);
                }, function(response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            };

            $scope.setData = function(funct, data, loading, get) {
                Data[funct](data, function(response) {
                    if (response.status == 200) {
                        $scope.getData[get]();
                        $scope.showPanel(get, 'correct');
                    } else {
                        $scope.showPanel(get, 'incorrect');
                    }
                    loading = false;
                });
            };

            /*Register*/

            $scope.Register = function(drt1, drt2, funct) {
                $scope.dataLoading[drt1] = true;

                $scope.uploadPic(drt1, { target: drt2 }, function(response) {
                    if (response.data.name) {
                        $scope.data[drt1].img = response.data.name;
                        $scope.setData(funct, $scope.data[drt1], $scope.dataLoading[drt1], drt2);
                    } else {
                        $scope.dataLoading[drt1] = false;
                        $scope.showPanel(drt2, 'incorrect');
                    }
                    $scope.dataLoading[drt1] = false;
                });
            };


            $scope.register = {
                materia: function() {
                    $scope.Register('materia', 'materias', 'setMateria');
                },
                curso: function() {
                    $scope.setData('setCurso', $scope.data.curso, $scope.dataLoading.curso, 'cursos');
                },
                clase: function() {
                    $scope.setData('setClase', $scope.data.clase, $scope.dataLoading.clase, 'clases');
                }
            };

            /*
            rootScope
            */

            $rootScope.getDataCursos = function() {
                $scope.getData.cursos();
            };
            $rootScope.getDataMateria = function() {
                $scope.getData.materias();
            };
            /*  */


            /*scope get*/

            $scope.getData.materias();
            $scope.getData.cursos();
            $scope.getData.clases();

            /*MODAL*/

            $scope.openModal = function(templateUrl, ctrl) {
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title-top',
                    ariaDescribedBy: 'modal-body-top',
                    templateUrl: templateUrl,
                    size: 'lg',
                    controller: ctrl
                });
            };

            $scope.open = {
                select: {
                    materia: function() {
                        $scope.openModal('modules/admin/views/modal/modal-select.html', 'modalSelectMateria')
                    },
                    curso: function() {
                        $scope.openModal('modules/admin/views/modal/modal-select.html', 'modalSelectCurso')
                    }
                },
                edit: {
                    materia: function(data) {
                        console.log(data);
                        $rootScope.materiaData = data;
                        $scope.openModal('modules/admin/views/modal/modal-edit.html', 'modalEditMateria')
                    },
                    curso: function(data) {
                        $rootScope.cursoData = data;
                        $scope.openModal('modules/admin/views/modal/modal-edit.html', 'modalEditCurso')
                    },
                    clase: function(data) {
                        $rootScope.claseData = data;
                        $scope.openModal('modules/admin/views/modal/modal-edit.html', 'modalEditClase')
                    }
                }
            };


            /*-------------------------------------*/

            $rootScope.modifiBtnModalOptions = function(data) {
                $scope.btnModalOptions.cursos.mensaje.status = true;
                $scope.btnModalOptions.cursos.class = 'btn-success';
                console.log(data);
                $scope.btnModalOptions.cursos.mensaje.data = "La Materia seleccionada : " + data.nombre;

                $scope.data.curso.idMateria = data.id;

                console.log($scope.data.curso.idMateria)
            };

            $rootScope.modifiBtnModalOptions2 = function(data) {
                $scope.btnModalOptions.clases.mensaje.status = true;
                $scope.btnModalOptions.clases.class = 'btn-success';

                $scope.btnModalOptions.clases.mensaje.data = "El Curso seleccionado : " + data.nombre;

                $scope.data.clase.idCurso = data.id;

                console.log($scope.data.clase.idCurso)
            };

        }
    ])
    /**/
    .controller('modalSelectMateria', ['$scope', '$rootScope', '$uibModalInstance', 'DataService',
        function($scope, $rootScope, $uibModalInstance, DataService) {

            $scope.modal = {
                itemsByPage: 5,
                tableHeaders: ['Seleccionar', 'Nombre'],
                title: 'Materias',
                subtitle: 'Selecciona la Materia a asociar al curso ',
                search: true
            }

            DataService.getMaterias(function(response) {
                $scope.modal.data = response.data.materia;
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


            $scope.seleccionar = function() {

                $rootScope.modifiBtnModalOptions($scope.modal.select);
                $scope.ok();


            }

        }
    ])
    .controller('modalSelectCurso', ['$scope', '$rootScope', '$uibModalInstance', 'DataService',
        function($scope, $rootScope, $uibModalInstance, DataService) {

            $scope.modal = {
                itemsByPage: 5,
                tableHeaders: ['Seleccionar', 'Nombre'],
                title: 'Cursos',
                subtitle: 'Selecciona el Curso asociado a la Clase',
                search: true
            };

            DataService.getCursos(function(response) {
                $scope.modal.data = response.data.curso;
            });


            $scope.name = 'top';

            $scope.ok = function() {
                $uibModalInstance.close();
            }

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }


            $scope.seleccionar = function() {

                $rootScope.modifiBtnModalOptions2($scope.modal.select);
                $scope.ok();


            }

        }
    ])
    /**/
    .controller('modalEditMateria', ['$scope', '$uibModalInstance', 'DataService', '$rootScope', 'formService', '$interval', 'Upload', '$timeout', '$cacheFactory','Notes',
        function($scope, $uibModalInstance, DataService, $rootScope, Forms, $interval, Upload, $timeout, $cache,Notes) {

            var token = $rootScope.globals.data.token;

            $scope.name = 'top';

            $scope.data = angular.copy($rootScope.materiaData);

            $scope.oneAtATime = true;

            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };

            $scope.panel = {
                update: true,
                picture: true,
                delete: {
                    name:'Materia',
                    status:true,
                },
            };

            $scope.inputs = Forms.update.materias($scope.data);
            //
            $scope.title = "Editar Materta " + $scope.data.nombre;

            $scope.url = {
                img: 'image/materias'
            };

            //


            $scope.progress = 0;
            //





            $scope.updatePicture = function(data) {

                let file = $scope.data.picfile;

                console.log(file);

                console.log(data);
                /**/



                file.upload = Upload.upload({
                    method: 'POST',
                    file: file,
                    url: 'php/upload/upload.php',
                    data: { 'targetPath': 'materias', 'update': 1, 'name': data.img },

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
                /**/
                Notes.update({table:'materia',csrf:token,id:data.id},data)
                .$promise.then(function(response){
                    $rootScope.getDataMateria();
                    $uibModalInstance.close();
                })
                /**/
                /*DataService.updateAlumno(data, function(response) {
                    $rootScope.getData();
                });*/
            };

            $scope.delete = function(id) {  

                Notes.delete({table:'materia',csrf:token,id:id})
                .$promise.then(function(response){
                      $uibModalInstance.close();
                      $rootScope.getDataMateria();
                });
                /*DataService.deleteAlumno(id, function(response) {
                    if (response.status == 200) {
                        $uibModalInstance.close();
                        $rootScope.getData();
                    } else {

                    }


                });*/
            };

            $scope.ok = function() {
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ])
    .controller('modalEditCurso', ['$scope', '$uibModalInstance', 'DataService', '$rootScope', 'formService', '$interval', 'Upload', '$timeout', '$cacheFactory','Notes',
        function($scope, $uibModalInstance, DataService, $rootScope, Forms, $interval, Upload, $timeout, $cache,Notes) {

            var token = $rootScope.globals.data.token;
            $scope.name = 'top';

            $scope.data = angular.copy($rootScope.cursoData);
            console.log($scope.data);
            $scope.oneAtATime = true;

            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };

            $scope.panel = {
                update: true,
                delete:{
                    name:'Curso',
                    status:true,
                } ,
                select: {
                    status: true,
                    title: 'Materia',
                    data: {},
                    show: ['Selecciona la Materia', 'Materia Seleccionada: '],
                    get: {},
                    tableHeaders: ['Materia'],
                    search: true,
                },
            };

            $scope.inputs = Forms.update.cursos($scope.data);
            //
            $scope.title = "Editar Curso " + $scope.data.nombre;

            $scope.url = {
                img: 'image/cursos'
            };

            if ($scope.data.idMateria != 0) {

                let id = $scope.data.idMateria;
                Notes.get({table:'materia',csrf:token,id:id,transform:1})
                .$promise.then(function(response){
                    //console.log(response);
                    $scope.panel.select.data = response;
                    $scope.panel.select.show[1]= 'Materia Seleccionada : ' + response.nombre;

                })

            } else {

                Notes.get({table:'materia',csrf:token,transform:1})
                .$promise.then(function(response){
                    $scope.panel.select.get = response.materia;
                    $scope.panel.select.data = false;  
                })

            }

            $scope.progress = 0;
            //


            $scope.changeSelect = function(){
                console.log('hola mama');
                
                 Notes.get({table:'materia',csrf:token,transform:1})
                .$promise.then(function(response){
                    console.log(response);
                    $scope.panel.select.get = response.materia;
                    $scope.panel.select.data = false;
                })

            };

            $scope.updateSelect = function(){
                console.log($scope.selectData);

                let data ={
                    idMateria : $scope.selectData.id
                } 

                Notes.update({table:'curso',csrf:token,id:$scope.data.id},data)
                .$promise.then(function(response){
                    console.log(response);
                    $scope.panel.select.data = $scope.selectData;
                    $scope.panel.select.show[1] = 'Materia Seleccionada : ' + $scope.selectData.nombre;
                })
            };

            $scope.updateData = function(data) {
                console.log(data);
            
                let data_ = {
                    nombre : data.nombre
                }

                Notes.update({table:'curso',csrf:token,id:data.id},data_)
                .$promise.then(function(response){
                    console.log(response);
                    $rootScope.getDataCursos();
                    $uibModalInstance.close();
                })
            };

            $scope.delete = function(id) {

                Notes.delete({table:'curso',csrf:token,id:id})
                .$promise.then(function(response){
                      $uibModalInstance.close();
                        $rootScope.getDataCursos();
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
    .controller('modalEditClase', ['$scope', '$uibModalInstance', 'DataService', '$rootScope', 'formService', '$interval', 'Upload', '$timeout', '$cacheFactory',
        function($scope, $uibModalInstance, DataService, $rootScope, Forms, $interval, Upload, $timeout, $cache) {


            $scope.name = 'top';


            $scope.data = angular.copy($rootScope.claseData);

            $scope.oneAtATime = true;

            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };

            $scope.panel = {
                update: true,
                delete:{
                    name:'Clase',
                    status:true,
                } ,
                select: {
                    status: true,
                    title: 'Curso',
                    data: {},
                    show: ['Selecciona el Curso', 'Curso Seleccionado: '],
                    get: {},
                    tableHeaders: ['Materia'],
                    search: true,
                },

            };

            $scope.inputs = Forms.update.clases($scope.data);
            //
            $scope.title = "Editar Clase " + $scope.data.nombre;



            
            if ($scope.data.idCurso != 0) {
                let select = $scope.panel.select;
                Notes.get({table:'curso',csrf:token,transform:1})
                .$promise.then(function(){
                    
                })
                
                DataService.getCursos(function(response) {
                    console.log(response.data);
                    select.data = response.data;
                    select.show[1] = 'Curso Seleccionado: '+response.data.nombre;

                }, '/' + $scope.data.idCurso);
            } else {
                DataService.getCursos(function(response) {
                    $scope.panel.select.get = response.data.curso;
                    $scope.panel.select.data = false;
                });
            }


            $scope.options = {
                minDate: new Date(),
                showWeeks: true
            };

            $scope.progress = 0;
            //
  
            $scope.changeApoderado = function() {
                $scope.apoderado = false;
                DataService.getApoderados(function(response) {
                    $scope.apoderados = response.data.apoderado;
                });
            };

            $scope.changeCheckbox = function() {

                ($scope.data.estado == 'activo') ? $scope.data.estado = 'inactivo': $scope.data.estado = 'activo';
            };

            $scope.updateEstado = function(alumno) {
                alumno.type = 'alumnos';

                DataService.updateEstado(alumno, function(response) {
                    if (response.status == 200) {
                        $rootScope.getData();
                        alert('estado actualizado con exito');
                    } else {
                        alert('error al actualizar su estado');
                    }
                });
            };

            $scope.updateApoderado = function(data) {

                let url = 'alumnos/' + $scope.data.id

                DataService.update({ idApoderado: $scope.selectApoderado.id }, url, function(response) {
                    alert('apoderado actualizado con exito');
                    if (response.status == 200) {

                        $scope.data.idApoderado = $scope.selectApoderado.id;

                        DataService.getApoderados(function(response) {
                            $scope.apoderado = response.data;
                        }, '/' + $scope.data.idApoderado);
                    }


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

                DataService.updateAlumno(data, function(response) {
                        $uibModalInstance.close();
                    
                      $rootScope.getDataCursos();
                });
            };

            $scope.delete = function(id) {
                DataService.deleteAlumno(id, function(response) {
                    if (response.status == 200) {
                        $uibModalInstance.close();
                        $rootScope.getDataCursos();
                    } else {

                    }
                });
            };

            $scope.ok = function() {
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);