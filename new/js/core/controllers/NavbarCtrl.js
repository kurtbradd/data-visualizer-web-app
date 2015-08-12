app.controller('NavbarCtrl', ['$scope', 'Projects', function($scope, Projects) {
  $scope.items = Object.keys(Projects.titles);
}]);
