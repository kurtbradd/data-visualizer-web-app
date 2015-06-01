$(document).ready(initApp);

//////////////////////////////////////////////////////////
///// VARIABLES
//////////////////////////////////////////////////////////

// Local Scope
var current_graph, high_chart_container, topic_title;
var metadata = Metadata();
var graph_types = metadata.graphs;
var topic_data = metadata.topics;

//////////////////////////////////////////////////////////
///// PRIMARY METHODS
//////////////////////////////////////////////////////////
function initApp () {
	var window_height 		= $(window).height();
	topic_title 					= $("#topic-title").first();
  high_chart_container 	= $("#highchart");

  high_chart_container.css('height', window_height*0.7); 
  buildNavButtons();
  selectTopic('hdi');
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

