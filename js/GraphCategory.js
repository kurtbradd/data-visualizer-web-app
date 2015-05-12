function GraphCategory (name, data, data_type) {
	this.name = name;
	this.data = parseData(data, data_type);
}

var parseData = function (data, data_type) {
	if (data_type === "linear") 	return _.map(data, linearData);
	if (data_type === "datetime") return _.map(data, datetimeData);
}

var linearData = function (e) {
	return [parseFloat(e.x_val), parseFloat(e.y_val)];
}

var datetimeData = function (e) {
	var date_parts = e.x_val.split('-');
	var year = "20"+date_parts[0];
	var month = date_parts[1];
	var day = date_parts[2];
	var date = [year, month, day].join('-');
	return [date, parseFloat(e.y_val)];
}