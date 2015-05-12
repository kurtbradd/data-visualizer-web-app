$(document).ready(initApp);

//////////////////////////////////////////////////////////
///// VARIABLES
//////////////////////////////////////////////////////////


/*
rem 			- age, country, genre, genre by age
epidemic 	- duck sauce, breathe slow
hdi 			-
*/

// Local Scope
var current_graph, high_chart_container;

var graph_types = {
	rem_1: {
		file_name: "data/binned_age_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Age" },
			subtitle: { text: "5 Year Bins" },
			xAxis: { type: "category", allowDecimals: false }
		}
	},
	rem_2: {
		file_name: "data/binned_country_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Country" },
			xAxis: { type: "category", allowDecimals: false }
		}
	},
	rem_3: {
		file_name: "data/binned_genre_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Genre" },
			xAxis: { type: "category" }
		}
	},
	rem_4: {
		file_name: "data/binned_genre_by_age_rem.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "Genre By Age" },
			xAxis: { type: "category" }
		}
	},
	hdi_1: {
		file_name: "data/hdi_weekday.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "HDI Weekday" },
			xAxis: { type: "category" }
		}
	},
	hdi_2: {
		file_name: "data/hdi_all_countries_over_weekday.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "HDI Week" },
			subtitle: { text: "All Countries Over Week" },
			xAxis: { type: "category" }
		}
	},
	hdi_3: {
		file_name: "data/hdi_regions_and_downloads.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "HDI Regions & Downloads" },
			xAxis: { type: "category" }
		}
	},
	rush_1: {
		file_name: "data/rush_genre_preference.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Genre Preferences" },
			xAxis: { type: "category" }
		}
	},
	rush_2: {
		file_name: "data/rush_liveness.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Liveness" },
			subtitle: {text: "Live performance popularity" },
			xAxis: { type: "category" }
		}
	},
	rush_3: {
		file_name: "data/rush_nostalgia.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Nostalgia" },
			xAxis: { type: "category" },
			yAxis: { min: 0}
		}
	},
	epidemic: {
		file_name: "data/epidemic.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Epidemic" },
			xAxis: { type: "datetime" }
		}
	}
}

var topic_data = {
	reminiscence: {
		title: "Reminiscence Bump",
		graphs: []
	},
	epidemic: {
		title: "Song Epidemic",
		graphs: []
	},
	HDI: {
		title: "HDI",
		graphs: []
	}
}

//////////////////////////////////////////////////////////
///// PRIMARY METHODS
//////////////////////////////////////////////////////////
function initApp () {
	var window_height = $(window).height();
  high_chart_container = $("#highchart");
  high_chart_container.css('height', window_height*0.7);
  buildNavButtons();
  buildTopicButtons();
}

//////////////////////////////////////////////////////////
///// HELPER METHODS
//////////////////////////////////////////////////////////

function buildNavButtons () {
	var nav_button_group = $('#navbar-button-group');
	_.forOwn(topic_data, function (topic, key) {
		var li = $("<li>").text(topic.title);
		var a = $("a").attr("href", "#");
		// a.appendTo(li);
		// li.appendTo(nav_button_group);
	})
}

function buildTopicButtons () {
	var group_div = $('#button-group');
	_.forOwn(graph_types, function (type, key) {
		var btn_title = type.attributes.title.text;
		var label = $("<label>").text(btn_title).addClass('btn btn-default large-button');
		var input = 
		$('<input type="radio" class="type_group">').attr({name: key}).change(dataSetSelcted);
		input.appendTo(label);
		label.appendTo(group_div);
	})
}

function loadGraphType (type) {
	async.waterfall([
		function fetchData (cb) { fetchDataSet(type, cb) },
		function parseCSV (dataset, cb) { csvToArray(dataset, cb) }
	], function (err, data) {
		if (err) return window.alert(err);
		if (!data.rows.length) return window.alert("No Data Was Parsed");
		current_graph = new Graph(graph_types[type].attributes, data);
		current_graph.drawGraph();
	})
}

function dataSetSelcted () {
	var type = $(this).attr('name');
	loadGraphType(type);
}

function fetchDataSet (type, cb) {
	var baseTag = document.getElementsByTagName("base").item(0);
	$.ajax({
		url: baseTag.baseURI + graph_types[type].file_name, 
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

