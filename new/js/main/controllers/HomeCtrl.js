app.controller('HomeCtrl', ['$scope', 'Projects', function($scope, Projects) {

  $scope.projects = Object.keys(Projects.titles);

}]);