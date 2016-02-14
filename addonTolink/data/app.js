var app = angular.module('app',[]);
app.controller('msgController',['$scope','msgService', function($scope,msgService){
$scope.msgBody="";
        $scope.pullData = function(){
            msgService.sendMsg($scope.msgBody);
            $scope.msgBody ="";
        };
}]);
app.factory('msgService',['$http','$q',function($http, $q){
        var msgService = {};
        msgService.sendMsg = function(msg){
            var deffered = $q.defer();
            $http.get('http://localhost:3000/'+msg+'').success(function(data){
                deffered.resolve(data);
            });
            return deffered.promise;
        }
        return msgService;
}]);

