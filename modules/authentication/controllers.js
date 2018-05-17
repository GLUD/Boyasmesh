'use strict';

angular.module('Authentication')

    .controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthenticationService','$timeout',
        function($scope, $rootScope, $location, AuthenticationService,$timeout) {
            $rootScope.styleadmin = false;
            // reset login status
            AuthenticationService.ClearCredentials();
            console.log('login');
            $scope.login = function() {
                console.log('hola');
                $scope.dataLoading = true;

                AuthenticationService.Login($scope.username, $scope.password, function(response) {

                    
                    console.log(response);

                    // delete response.password;
                    if (response.success) {
                        response.type = 'boyasmesh';
                        //response = { type: 'alumno', data: {} }
                        //response.data.token = response.token;
                        AuthenticationService.SetCredentials($scope.username, $scope.password, response.data.type, response.data);

                        /*redireccionamiento de inicio*/

                        /*
                            @response 
                            {
                                type 
                                success
                                message
                                token 
                                data
                            }

                        */


                        $location.path('/dashboard');
                       /*
                        switch(response.data.type){

                            case 'comercializadora':
                               
                               
                               $location.path('/dashboard');

                            break;

                            case 'fabricante':
                               
                                $location.path('/profile');

                            break;


                            default:
                        }*/

                        /**/

                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;


                        $timeout(2000)
                        .then(function(){
                            $scope.error = false;
                        })


                    }

                });
            };
        }
    ])

    .controller('RegisterController', ['$scope', '$rootScope', '$location', 'AuthenticationService', 'Register', '$timeout',
        function($scope, $rootScope, $location, AuthenticationService, Register, $timeout) {

            AuthenticationService.ClearCredentials();

            $scope._register = function() {
                //console.log($scope.register);

                if($scope.register.pass != $scope.register.pass2) {
                    $scope.error = 'contraseñas no coinciden';
                    $timeout(function() {
                        $scope.error = undefined;
                    }, 3000);
                    return;
                }
                
                Register.save($scope.register, function(response) {

                    console.log(response);

                    if (!response.result) {
                        $scope.error = response.message;
                    }

                    if (response.result) {
                        $scope.info = response.message;
                    }

                    //result register

                    //clean 
                    $timeout(function() {
                        $scope.error = undefined;
                        $scope.info = undefined;
                    }, 3000);

                    $timeout(function() {
                        $scope.register = {
                            name: '',
                            user: '',
                            email: '',
                            phone: '',
                            type: ''
                        }
                    }, 500);
                });

            }

            


        }
    ]);