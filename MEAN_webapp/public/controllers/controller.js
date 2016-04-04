  var myapp=angular.module("myApp",[]);
  myapp.controller("appCtrl", function($scope,$http){

      var refresh=function(){
          $http.get('/contactlist').success(function(response){
                    $scope.contactlist=response;

                });}
      refresh();

$scope.addContact=function(){
   
    $http.post('/contactlist',$scope.contact).success(function(response){
      refresh();
        $scope.contact=null;
        //refresh();
    });
    
}
$scope.remove=function(id){
    
    $http.delete('/contactlist'+id).success(function(response){
       refresh(); 
    });
    
}

$scope.edit=function(id){
    $http.get("/contactlist"+id).success(function(response){
        $scope.contact=response;
    });
    
};
$scope.update=function(){
    $http.put('/contactlist'+$scope.contact._id,$scope.contact).success(function(response){
        refresh();
    });
};
       });