function Graph (title, subtitle, data) {
	this.title 			= title;
	this.subtitle 	= subtitle;
	this.labels 		= labelsFromHeader(data.header);
	this.categories = groupByCategory(data.rows, this.labels.category);
	this.categories = _.map(this.categories, extendWithLabelInfo(this.labels))
	this.categories = _.map(this.categories, buildGraphCategory);
}

Graph.prototype.setGraphDOM = function(chart_dom) {
	this.chart = chart_dom;
}

Graph.prototype.drawGraph = function() {
	this.chart.highcharts({
		chart: {
			type: 'area'
		},
		title: { 
			text: this.title
		},
		subtitle: { 
			text:  this.subtitle
		},
		legend: { 
			title: { 
				text: this.labels.category
			}
		},
		xAxis: {
			title: {
				text: this.labels.x_axis
			},
			allowDecimals: false,
		},
		yAxis: { 
			title: { 
				text: this.labels.y_axis 
			}
		},
		plotOptions: { 
			area: { 
				pointStart: 0 
			}
		},
		series: this.categories
	});
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