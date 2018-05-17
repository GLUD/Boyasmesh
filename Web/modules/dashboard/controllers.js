'use strict';

angular.module('Dashboard')

    .controller('DashboardController', ['$scope', '$rootScope', '$timeout', '$resource','$interval',
        function($scope, $rootScope, $timeout, $resource,$interval) {
            // reset login status
            $scope.modalShown = false;
            console.log($rootScope);

            //$scope.products = $rootScope.globals.products.all;

            $scope.user = {
               username: $rootScope.globals.data.username,
            };

            $scope.inbox = {};

            $scope.CurrentDate = new Date();
            $scope.mes = $scope.CurrentDate.getMonth() + 1;
            $scope.dia  =$scope.CurrentDate.getDate();
            $scope.hora =$scope.CurrentDate.getHours();
            $scope.anio = $scope.CurrentDate.getFullYear();

            $scope.inbox = {};


          



            $timeout(5000)
                .then((result) => {
                    $scope.datos = [
                    50,50,50]
                })

            var data = $resource('php/:id.php', { id: '@id' }, {
                'update': { method: 'PUT' },
                'save' : {method:'POST'},
                'get':    {method:'GET'}
            })

             $scope.updateData = function(){
                /*data.get({id:'alertas_actuales'},function(result){
                console.log(result.data);
                $scope.boyas = result.data;
              })*/
            }
            $scope.updateData();

            $scope.etiquetas = ['CAPA1', 'CAPA2', 'CAPA3'];
            $scope.series = ['Niveles'];

            /*
            $scope.datos = [
                $scope.boyas[0].nivel_agua, 
                $scope.boyas[1].nivel_agua, 
                $scope.boyas[2].nivel_agua, 
            ]*/

            $scope.datos = [
                [65, 59, 80],
               
            ];

           
            $interval($scope.updateData,5000);
            


            console.log('home');
        }
    ]);