function GraphCategory (name, labels, data) {
	this.name = name;
	this.data = parseData(data, labels);
}

var parseData = function (data, labels) {
	return _.map(data, function (element) {
		var x_val = element[labels.x_axis];
		var y_val = element[labels.y_axis];
		return [parseFloat(x_val), parseFloat(y_val)];
	})
}