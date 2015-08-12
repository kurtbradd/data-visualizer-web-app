'use strict';

app.factory('Projects', ['$http', function ($http) {

	var manifest_url = "js/main/data/manifest.json";
	
	var getMetadata = function (cb) {
		return $http.get(manifest_url).then(function (data) {
			return cb(null, data.data)
		}, cb);
	}

	var project_titles = {
		reminiscence: "Reminiscence Bump",
		epidemic: "Song Epidemic",
		hdi: "HDI",
		rush: "Rush",
	}

	return {
		titles: project_titles,
		getMetadata: getMetadata
	}


}]);
