app.controller('ProjectCtrl', ['$scope', '$stateParams', '$rootScope', 'Projects', 
	function($scope, $stateParams, $rootScope, Projects) {
	
	var project_name = $stateParams.project;

	$scope.title = Projects.titles[project_name];

	Projects.getMetadata(function (err, data) {
		if (err) return window.alert(err);
		console.log(data);
		return $scope.project_topics = data[project_name];
	});

}]);