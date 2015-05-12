$(document).ready(initApp);

//////////////////////////////////////////////////////////
///// VARIABLES
//////////////////////////////////////////////////////////

// Local Scope
var current_graph;
var graph_types = {
	age: {
		title: "Age",
		file_name: "/data/age_rem.csv",
		attributes: {
			title: "Age",
			subtitle: ""
		}
	},
	country: {
		title: "Country",
		file_name: "/data/country_rem.csv"
	},
	epidemic: {
		title: "Song Epidemic",
		file_name: "/data/epidemic.csv"
	},
	genre1: {
		title: "Genre By Age",
		subtitle: "5 Year Bins",
		file_name: "/data/genrebyage5years.csv"
	}
}

//////////////////////////////////////////////////////////
///// PRIMARY METHODS
//////////////////////////////////////////////////////////
function initApp () {
	var window_height = $(window).height();
  var high_chart_container = $("#highchart");
  high_chart_container.css('height', window_height*0.7);
  buildButtonGroup();
}

//////////////////////////////////////////////////////////
///// HELPER METHODS
//////////////////////////////////////////////////////////

function buildButtonGroup () {
	var group_div = $('#button-group');
	Object.keys(graph_types).forEach(function (type) {
		var label = $("<label>").text(graph_types[type].title).addClass('btn btn-default');
		var input = 
		$('<input type="radio" class="type_group">')
		.attr({name: type}).change(dataSetSelcted);
		input.appendTo(label);
		label.appendTo(group_div);
	})
}

function loadGraphType (type) {
	var handler = function (err, data) {
		if (err) return window.alert(err);
		if (!data.rows.length) return window.alert("No Data Was Parsed");
		current_graph = new Graph(
			graph_types[type].title,
			graph_types[type].subtitle,
			data
		);
		current_graph.setGraphDOM($("#highchart"));
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

