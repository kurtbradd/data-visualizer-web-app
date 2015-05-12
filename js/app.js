$(document).ready(initApp);

//////////////////////////////////////////////////////////
///// VARIABLES
//////////////////////////////////////////////////////////

// Local Scope
var current_graph, high_chart_container;
var graph_types = {
	age: {
		file_name: "/data/age_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Age" },
			xAxis: { type: "linear", allowDecimals: false }
		}
	},
	country: {
		file_name: "/data/country_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Country" },
			xAxis: { type: "linear", allowDecimals: false }
		}
	},
	genre1: {
		file_name: "/data/genrebyage5years.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Genre By Age" },
			subtitle: { text: "5 Year Bins" },
			xAxis: { type: "linear", allowDecimals: false }	
		}
	},
	genre2: {
		file_name: "/data/genrebyage.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Genre By Age" },
			xAxis: { type: "linear", allowDecimals: false }	
		}
	},
	epidemic: {
		file_name: "/data/epidemic.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Epidemic" },
			xAxis: { type: "datetime" }
		}
	},
}

//////////////////////////////////////////////////////////
///// PRIMARY METHODS
//////////////////////////////////////////////////////////
function initApp () {
	var window_height = $(window).height();
  high_chart_container = $("#highchart");
  high_chart_container.css('height', window_height*0.7);
  buildButtonGroup();
}

//////////////////////////////////////////////////////////
///// HELPER METHODS
//////////////////////////////////////////////////////////

function buildButtonGroup () {
	var group_div = $('#button-group');
	_.forOwn(graph_types, function (type, key) {
		var btn_title = type.attributes.title.text;
		var label = $("<label>").text(btn_title).addClass('btn btn-default');
		var input = 
		$('<input type="radio" class="type_group">').attr({name: key}).change(dataSetSelcted);
		input.appendTo(label);
		label.appendTo(group_div);
	})
}

function loadGraphType (type) {
	var handler = function (err, data) {
		if (err) return window.alert(err);
		if (!data.rows.length) return window.alert("No Data Was Parsed");
		current_graph = new Graph(graph_types[type].attributes, data);
		current_graph.drawGraph();
	}

	async.waterfall([
		function fetchData (cb) { fetchDataSet(type, cb) },
		function parseCSV (dataset, cb) { csvToArray(dataset, cb) }
	], handler)
}

function dataSetSelcted () {
	var type = $(this).attr('name');
	loadGraphType(type);
}

function fetchDataSet (type, cb) {
	$.ajax({
		url: graph_types[type].file_name, 
		success: function(data) {return cb(null, data) }
	});
}

function csvToArray (csv, cb) {
	Papa.parse(csv, {
		delimiter: ',',
		header: true,
		complete: function (data) {
			return cb(null, {
				rows: data.data,
				header: data.meta.fields
			});
		},
		error: function (err) {
			return cb(err);
		},
	});
}

