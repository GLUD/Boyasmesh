'use strict';
angular.module('Admin')
    .controller('AdminController', ['$scope', '$rootScope', '$location', 'DataServiceContacto', 'Notes',
        function($scope, $rootScope, $location, Data, Notes) {
            if ($rootScope.globals.type != 'admin') $location.path('/login');
            //Activa estylo administrador
            $rootScope.styleadmin = true;
            //ACTIVE BACKGROUND SIDE BAR
            $scope.active = { dashboard: 'active' };
            /*Data.getContactos(function(response) {
                //console.log(response)
                $scope.contactos = response.data;
            });*/
            
        }
    ]);