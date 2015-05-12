function Graph (attributes, data) {
	this.attributes = attributes;
	this.labels 		= labelsFromHeader(data.header);
	this.categories = groupByCategory(data.rows, this.labels.category);
	this.categories = _.map(this.categories, extendWithLabelInfo(this.labels))
	this.categories = _.map(this.categories, buildGraphCategory);
}

Graph.prototype.drawGraph = function() {
	var base_config = {
		series: 	this.categories,
		legend: 	{ title: { text: this.labels.category }},
		xAxis: 		{ title: { text: this.labels.x_axis 	}},
		yAxis: 		{ title: { text: this.labels.y_axis 	}},
	}
	var graph_config = _.merge(base_config, this.attributes);
	var chart = new Highcharts.Chart(graph_config);
};

var labelsFromHeader = function (header) {
	return {
		category: header[0],
		x_axis: 	header[1],
		y_axis: 	header[2]
	}
}

var extendWithLabelInfo = function (labels) {
	return function (value, key) {
		return {category: key, label: labels, data: value}
	}
}

var groupByCategory = function (data, category) {
	return _.groupBy(data, function(element) {
		return element[category];
	});
}

var buildGraphCategory = function (element) {
	return new GraphCategory(element.category, element.label, element.data)
}