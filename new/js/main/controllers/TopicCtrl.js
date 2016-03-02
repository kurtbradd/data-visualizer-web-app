app.controller('TopicCtrl', ['$scope', '$stateParams', 'Projects', '$state', 
	function($scope, $stateParams, Projects, $state) {

	$scope.topic_title = $stateParams.topic;

	var getTopicData = function () {
		var file_name = $scope.topic.file_name;
		Projects.getTopicData(file_name, function (err, data) {
			if (err) return window.alert(err);
			return buildGraph(data);
		});
	}

	var filterForTopic = function (topic) {
		var topic_title = topic.attributes.title.text;
		return topic_title === $scope.topic_title;
	}

	$scope.$parent.$watch('project_topics', function (topics) {
		if (!topics) return;
		$scope.topic = topics.filter(filterForTopic).shift();
		if ($scope.topic) getTopicData();
	})



	// GRAPH BUILDER METHODS
	var labelsFromHeader = function (header) {
		var idx_incr = (header.length == 4) ? 1 : 0;
		return {
			category: header[0],
			label: 		header[0 + idx_incr],
			x_axis: 	header[1 + idx_incr],
			y_axis: 	header[2 + idx_incr]
		}
	}

	var pointFromData = function (p) {
		return {
			label: p[this.label], 
			x_val: p[this.x_axis],
			y_val: p[this.y_axis],
		};
	}

	var categoryDataPoints = function (data, category) {
		return {
			category: category,
			data: _.map(data, pointFromData.bind(this))
		}
	}

	var pointParser = function () {
		this.linear = function (e) {
			return [parseFloat(e.x_val), parseFloat(e.y_val)];
		};

		this.category = function (e) {
			return [e.x_val, parseFloat(e.y_val)];
		};

		this.datetime = function (e) {
			var date = moment.utc(e.x_val, "YY-MM-DD").valueOf();
			return [date.valueOf(), parseFloat(e.y_val)];
		};

		this.scatter = function (e, i) {
			return {
				name: e.label,
				marker: {
					fillColor: colors[i],
					states: {hover: {fillColor: colors[i]}}
				},
				x: parseFloat(e.x_val),
				y: parseFloat(e.y_val)
			}
		};
	}

	var drawGraph = function (series_data, attributes, labels) {
		var base_config = {
			legend: 	{ title: { text: labels.category }},
			xAxis: 		{ title: { text: labels.x_axis 	}},
			yAxis: 		{ title: { text: labels.y_axis 	}},
		}

		$scope.graph_config = _.merge(base_config, attributes);
		
		if (attributes.series) {
			series_data.forEach(function (series) {
				$scope.graph_config.series.push(series);
			})
		} else {
			$scope.graph_config.series = series_data;
		}
	}

	var buildGraphCategory = function (category) {
		var data_type 		= this.xAxis.type;
		var category_name 	= category.category;
		var linkedTo 		= (data_type === "scatter") ? category_name : null;
		var parser 			= new pointParser();
		var points 			= _.map(category.data, parser[data_type]);
		return {name: category_name, data: points, linkedTo: linkedTo};
	}

	var buildGraph = function (data) {
		var attributes 		= $scope.topic.attributes;
		var labels 			= labelsFromHeader(data.header);
		var category_data 	= _.groupBy(data.rows, labels.category);
		var category_points = _.map(category_data, categoryDataPoints.bind(labels));
		var graph_series 	= _.map(category_points, buildGraphCategory.bind(attributes));
		drawGraph(graph_series, attributes, labels);
	}

}]);

