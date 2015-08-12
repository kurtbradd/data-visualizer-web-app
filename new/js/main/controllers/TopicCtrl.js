app.controller('TopicCtrl', ['$scope', '$stateParams', '$rootScope', 'Projects', '$http', 
	function($scope, $stateParams, $rootScope, Projects, $http) {
	
	$scope.title = $stateParams.topic;

	var parseCSV = function (csv, cb) {

		var completion_handler = function (data) {
			return cb(null, {
				rows: data.data, 
				header: data.meta.fields
			});
		};

		Papa.parse(csv, {
			delimiter: ',',
			header: true,
			complete: completion_handler,
			error: cb,
		});
	}
	
	var fetchTopicData = function () {
		var url = '/js/main/' + $scope.topic.file_name
		$http.get(url).then(function (data) {
			var csv_data = data.data;
			parseCSV(csv_data, function (err, data) {
				console.log(data);
			})
		})
	}

	Projects.getMetadata(function (err, data) {
		if (err) return window.alert(err);
		$scope.topic = data[$stateParams.project].filter(function (t) {
			return t.attributes.title.text === $scope.title;
		})[0];
		if ($scope.topic) fetchTopicData();
	});



}]);