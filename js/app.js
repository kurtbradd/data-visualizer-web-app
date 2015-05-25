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
var current_graph, high_chart_container, topic_title;
var graph_types = {
	rem_1: {
		tag: "rem_1",
		file_name: "data/binned_age_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Age" },
			subtitle: { text: "5 Year Bins" },
			xAxis: { type: "category", allowDecimals: false }
		}
	},
	rem_2: {
		tag: "rem_2",
		file_name: "data/binned_country_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Country" },
			xAxis: { type: "category", allowDecimals: false }
		}
	},
	rem_3: {
		tag: "rem_3",
		file_name: "data/binned_genre_rem.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Genre" },
			xAxis: { type: "category" }
		}
	},
	rem_4: {
		tag: "rem_4",
		file_name: "data/binned_genre_by_age_rem.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "Genre By Age" },
			xAxis: { type: "category" }
		}
	},
	hdi_1: {
		tag: "hdi_1",
		file_name: "data/hdi_weekday.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "Weekday" },
			xAxis: { type: "category" }
		}
	},
	hdi_2: {
		tag: "hdi_2",
		file_name: "data/hdi_all_countries_over_weekday.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "Week" },
			subtitle: { text: "All Countries Over Week" },
			xAxis: { type: "category" }
		}
	},
	hdi_3: {
		tag: "hdi_3",
		file_name: "data/hdi_regions_and_downloads.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "Regions & Downloads" },
			xAxis: { type: "category" }
		}
	},
	hdi_4: {
		tag: "hdi_4",
		file_name: "data/hdi_genre_country_download_2011.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Genre by Country" },
			xAxis: { type: "category" },
			yAxis: { min: 0 },
			plotOptions: { column: { stacking: 'normal'}}
		}
	},	
	rush_1: {
		tag: "rush_1",
		file_name: "data/rush_genre_preference.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Genre Preferences" },
			xAxis: { type: "category" }
		}
	},
	rush_2: {
		tag: "rush_2",
		file_name: "data/rush_liveness.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Liveness" },
			subtitle: {text: "Live performance popularity" },
			xAxis: { type: "category" }
		}
	},
	rush_3: {
		tag: "rush_3",
		file_name: "data/rush_nostalgia.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Nostalgia" },
			xAxis: { type: "category" },
			yAxis: { min: 0}
		}
	},
	epidemic_1: {
		tag: "epidemic_1",
		file_name: "data/epidemic_1.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "DuckSauce" },
			xAxis: { type: "datetime" }
		}
	},
	epidemic_2: {
		tag: "epidemic_2",
		file_name: "data/epidemic_2.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Alesha Dixon" },
			xAxis: { type: "datetime" }
		}
	}	
}

var topic_data = {
	reminiscence: {
		title: "Reminiscence Bump",
		graphs: [graph_types.rem_1, graph_types.rem_2, graph_types.rem_3, graph_types.rem_4]
	},
	epidemic: {
		title: "Song Epidemic",
		graphs: [graph_types.epidemic_1, graph_types.epidemic_2]
	},
	hdi: {
		title: "HDI",
		graphs: [graph_types.hdi_1, graph_types.hdi_2, graph_types.hdi_3]
	},
	hdi: {
		title: "HDI-NEW",
		graphs: [graph_types.hdi_4]
	},
	rush: {
		title: "Rush",
		graphs: [graph_types.rush_1, graph_types.rush_2, graph_types.rush_3]
	}
}

//////////////////////////////////////////////////////////
///// PRIMARY METHODS
//////////////////////////////////////////////////////////
function initApp () {
	var window_height 		= $(window).height();
	topic_title 					= $("#topic-title").first();
  high_chart_container 	= $("#highchart");

  high_chart_container.css('height', window_height*0.7); 
  buildNavButtons();
  selectTopic('reminiscence');
}

//////////////////////////////////////////////////////////
///// HELPER METHODS
//////////////////////////////////////////////////////////

function selectTopic (topic_name) {
	$(".highcharts-container").remove();
	current_graph = null;
	var topic = topic_data[topic_name];
	topic_title.text(topic.title)
	buildButtonsForTopic(topic);
}

function buildNavButtons () {
	var items = [];
	_.forOwn(topic_data, function (topic, key) {
		var a = '<a id="navbar-button" name="'+key+'">'+topic.title+'</a>';
	  items.push('<li>' + a + '</li>');
	})
	$('#navbar-button-group').append(items.join(''));
	$('#navbar-button-group').on('click', 'a', navButtonEventHandler);
}

function navButtonEventHandler (event) {
	var button = $(event.target);
	selectTopic(button.attr('name'));
}

function buildButtonsForTopic (topic) {
	var group_div = $('#button-group');
	group_div.empty();
	_.forEach(topic.graphs, function (graph) {
		var btn_title = graph.attributes.title.text;
		var label = $("<label>").text(btn_title).addClass('btn btn-default large-button');
		var input = 
		$('<input type="radio" class="type_group">').attr({name: graph.tag}).change(dataSetSelcted);
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
	console.log(type);
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

