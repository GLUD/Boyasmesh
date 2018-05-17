'use strict';

// declare modules
//services
angular.module('Authentication', []);
angular.module('Data', []);
//controllers
angular.module('Intro', []);
angular.module('Inbox', []);
angular.module('Dashboard', []);


angular.module('Admin', []);
angular.module('Admin.services', []);
/*angular.module('Alumnos', []);
angular.module('Apoderados', []);
angular.module('Docentes', []);
angular.module('Courses', []);

angular.module('Admin.alumnos', []);
angular.module('Admin.apoderados', []);
angular.module('Admin.tutores', []);
angular.module('Admin.materias', []);
*/
//


angular.module('MacroApp', [

    //services
    //'Data',
    'Authentication',
    //'Forms',
    //controllers
    'Dashboard',
    'Intro',
    //'Alumnos',
    //'Apoderados',
    //'Courses',
    //'Docentes',
    //
    //'Admin',
    //'Admin.alumnos',
    //'Admin.apoderados',
    //'Admin.tutores',
    //'Admin.materias',
    //'Admin.services',
    //
    
    //externos
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'ngTouch',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap'  
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'IntroController',
           templateUrl: 'modules/home/views/home.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html'
        })
        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'modules/authentication/views/register.html'
        })


        .when('/dashboard', {
            controller: 'DashboardController',
            templateUrl: 'modules/dashboard/views/dashboard.html'
        })

   
       

        

         //ADMIN

         .when('/admin/dashboard', {
            controller: 'AdminController',
            templateUrl: 'modules/admin/views/dashboard.html'
        })

       
         //redireccion

        .otherwise({ redirectTo: '/' });
}])

.config(function($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
           if (($location.path() !== '/login') && ($location.path() !== '/register') && ($location.path() !== '/')) {
                if(!$rootScope.globals.currentUser){
                     $location.path('/');
                } 
            }
        });
    }])

.run(['$rootScope','$location',
    function($root,$location){

      $root.styleadmin = false;

      //$root.produts = {};

        $root.admin = {
            iconAlumnos:'sunglasses',
            iconApoderados:'eye-open',
            iconTutores : 'education',
            iconMaterias:'file',
            iconDashboard : 'tasks',
            location : function(){
                let location;
                location = $location.url();
                location = location.split('/')[location.split('/').length-1];
                let  l = location.charAt(0).toUpperCase();
                let ocation = location.slice(1,location.legth)
                return l+ocation;
            }

        };
        

    }]);





