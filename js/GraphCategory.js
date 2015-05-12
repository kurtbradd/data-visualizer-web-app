function GraphCategory (name, data, data_type) {
	this.name = name;
	this.data = parseData.bind(this)(data, data_type);
}

var parseData = function (data, data_type) {
	if (data_type === "linear") 	return _.map(data, linearData);
	if (data_type === "datetime") return _.map(data, datetimeData);
	if (data_type === "binned") 	return _.map(data, binData);
}

var binData = function (e) {
	return [e.x_val, parseFloat(e.y_val)];
}

var linearData = function (e) {
	return [parseFloat(e.x_val), parseFloat(e.y_val)];
}

var datetimeData = function (e) {
	var date = moment.utc(e.x_val, "YY-MM-DD").valueOf();
	return [date.valueOf(), parseFloat(e.y_val)];
}