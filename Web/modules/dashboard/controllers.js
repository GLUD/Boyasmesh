'use strict';

angular.module('Dashboard')

    .controller('DashboardController', ['$scope', '$rootScope', '$timeout','$resource','$interval',
        function($scope, $rootScope, $timeout,$resource,$interval) {
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

            console.log($scope);


            $timeout(500)
                .then((result) => {
               
                })

            var data = $resource('php/:id.php', { id: '@id' }, {
                'update': { method: 'PUT' },
                'save' : {method:'POST'},
                'get':    {method:'GET'}
            })

             $scope.updateData = function(){
                data.get({id:'alertas_actuales'},function(result){
                console.log(result.data);
                $scope.boyas = result.data;
              })
            }
            $scope.updateData();
            $interval($scope.updateData,5000);
            

            $scope.myChart = function(){
                  console.log('aqui');
var ctx = document.getElementById('myChart').getContext('2d');
console.log($scope.boyas);
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["Capa1", "Capa2", "Capa3"],
        datasets: [{
            label: "NIVELES",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [$scope.boyas[0].nivel_agua,$scope.boyas[1].nivel_agua,$scope.boyas[2].nivel_agua],
        }]
    },

    // Configuration options go here
    options: {}
});
            }

            $timeout(3000).then(function(){
                  $scope.myChart()
            })
          
           


            console.log('home');
        }
    ]);