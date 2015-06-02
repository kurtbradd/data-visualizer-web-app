function GraphCategory (name, data, data_type) {
	this.name = name;
	this.data = parseData.bind(this)(data, data_type);
	if (data_type === "scatter") this.linkedTo = name;
}

var parseData = function (data, data_type) {
	if (data_type === "linear") 	return _.map(data, linearData);
	if (data_type === "datetime") return _.map(data, datetimeData);
	if (data_type === "category") return _.map(data, categoryData);
	if (data_type === "scatter") 	return _.map(data, scatterData);
}

var scatterData = function (e, i) {
	return {
		name: e.label,
		marker: {
			fillColor: colors[i],
			states: {hover: {fillColor: colors[i]}}
		},
		x: parseFloat(e.x_val),
		y: parseFloat(e.y_val)
	}
}

var categoryData = function (e) {
	return [e.x_val, parseFloat(e.y_val)];
}

var linearData = function (e) {
	return [parseFloat(e.x_val), parseFloat(e.y_val)];
}

var datetimeData = function (e) {
	var date = moment.utc(e.x_val, "YY-MM-DD").valueOf();
	return [date.valueOf(), parseFloat(e.y_val)];
}