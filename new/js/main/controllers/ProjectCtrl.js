app.controller('ProjectCtrl', ['$scope', '$stateParams', 'Projects', function($scope, $stateParams, Projects) {
	
	var project_name = $stateParams.project;
	$scope.title = Projects.titles[project_name];

	Projects.getProjectDescription(project_name, function (err, data) {
		if (err) return window.alert(err);
		if (data.mixradio) {
			$scope.hasMixedRadio = data.mixradio;
		}
		if (data.description) {
			return $scope.project_description = data.description;
		}
	})

	Projects.getMetadata(function (err, data) {
		if (err) return window.alert(err);
		return $scope.project_topics = data[project_name];
	});

}]);