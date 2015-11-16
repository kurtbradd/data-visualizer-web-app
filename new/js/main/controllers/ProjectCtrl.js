app.controller('ProjectCtrl', ['$scope', '$stateParams', 'Projects', function($scope, $stateParams, Projects) {
	
	var project_name = $stateParams.project;
	$scope.title = Projects.titles[project_name];

	Projects.getMetadata(function (err, data) {
		if (err) return window.alert(err);
		return $scope.project_topics = data[project_name];
	});

}]);