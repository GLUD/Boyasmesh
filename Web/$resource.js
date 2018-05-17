 return $resource('http://localhost:8080/inventarioApp2/php/:id.php', { id: '@id' }, {
                'update': { method: 'PUT' },
                'save' : {method:'POST'},
                'get':    {method:'GET'}
            })


  Register.get({id:'register',params:$scope.register},function(data){
                    console.log(data);
                })


  /*.$promise.then(function(data){

                    console.log(data);
                })*/