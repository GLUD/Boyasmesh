'use strict';

angular.module('Intro')

.controller('IntroController',
    ['$scope','$rootScope','AuthenticationService','$timeout',
    function ($scope,$rootScope,AuthenticationService,$timeout) {
    	 // reset login status
        AuthenticationService.ClearCredentials();

        //aca deberia construirse la session de products 
        $timeout(500)
        .then((result)=>{
        	
        })

        $timeout(800)
        .then((result)=>{
        
        })

       

        $timeout(600)
        .then((result)=>{
        
        	
        })

        $timeout(5000)
        .then((result)=>{
        
        })

        $timeout(6000)
        .then((result)=>{
      
        })

        /*

        

        */

        

        console.log('home')
    }]);