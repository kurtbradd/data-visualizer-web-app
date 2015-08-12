'use strict';

app.factory('Projects', ['$http', function ($http) {

	var manifest_url = "js/main/data/manifest.json";

	var parseCSV = function (csv, cb) {
		Papa.parse(csv, {
			delimiter: ',',
			header: true,
			error: cb,
			complete: function (data) {
				var rows = data.data;
				var header = data.meta.fields;
				return cb(null, { rows: rows, header: header});
			}
		});
	}

	var getMetadata = function (cb) {
		return $http.get(manifest_url).then(function (data) {
			return cb(null, data.data)
		}, cb);
	}

	var getTopicData = function (topic_filename, cb) {
		var url = '/js/main/' + topic_filename
		$http.get(url).then(function (data) {
			parseCSV(data.data, cb);
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
		getMetadata: getMetadata,
		getTopicData: getTopicData
	}


}]);
