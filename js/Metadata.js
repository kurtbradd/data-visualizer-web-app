var graphs = {
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
		file_name: "data/hdi_all_countries_over_weekday.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "Week" },
			subtitle: { text: "All Countries Over Week" },
			xAxis: { type: "category" }
		}
	},
	hdi_2: {
		tag: "hdi_2",
		file_name: "data/hdi_regions_and_downloads.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "Regions & Downloads" },
			xAxis: { type: "category" }
		}
	},
	hdi_3: {
		tag: "hdi_3",
		file_name: "data/hdi_top10_stackbars.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Top 10 Genres" },
			xAxis: { type: "category" },
			yAxis: { min: 0, max: 100.5, endOnTick: false},
			plotOptions: { column: { stacking: 'normal'}}
		}
	},
	hdi_4: {
		tag: "hdi_4",
		file_name: "data/hdi_scatter_all.csv",
		attributes: {
			chart: { type: "scatter" },
			title: { text: "Genre & HDI" },
			series: [{
        type: 'line',
        id: "Income Index",
        color: "#2ECC71",
        dashStyle: "LongDash",
        name: 'Income Index<br>R<sup>2</sup> = 0.096<br>p = 0.079',
        data: [[0.07527, 0.8964], [0.15133844, 0.74625]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      },{
        type: 'line',
        id: "Education Index",
        color: "#E87E04",
        dashStyle: "ShortDot",
        name: 'Education Index<br>R<sup>2</sup> = 0.138<br>p = 0.033*',
        data: [[0.07527, 0.8256], [0.15133844, 0.63423]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      },{
        type: 'line',
        id: "HDI 2010",
        color: "#F22613",
        name: 'HDI 2010<br>R<sup>2</sup> = 0.169<br>p = 0.017*',
        data: [[0.07527, 0.88255], [0.15133844, .70828]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      }],
			xAxis: {
				type: "scatter", 
				tickInterval: 0.01,
				startOnTick: true, 
				endOnTick: true, 
				showLastLabel: true 
			},
			yAxis: { min: 0.4, max: 1, endOnTick: false},
			tooltip: { enabled: true },
			plotOptions: {
				series: {
					color: "white",
					marker:{ enabled: true},
					states: { hover: { enabled: true}}
				},
			}
		}
	},
	hdi_5: {
		tag: "hdi_5",
		file_name: "data/hdi_weekday_SEAsia.csv",
		attributes: {
			chart: { type: "line" },
			title: { text: "SE Asia" },
			xAxis: { type: "category" }
		}
	},
	hdi_6: {
		tag: "hdi_6",
		file_name: "data/hdi_median.csv",
		attributes: {
			chart: { type: "scatter" },
			title: { text: "Median & HDI" },
			series: [{
        type: 'line',
        id: "Income Index",
        color: "#2ECC71",
        dashStyle: "LongDash",
        name: 'Income Index<br>R<sup>2</sup> = 0.2304<br>p < 0.01*',
        data: [[0.112, 0.922], [0.242, 0.688]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      },{
        type: 'line',
        id: "Education Index",
        color: "#E87E04",
        dashStyle: "ShortDot",
        name: 'Education Index<br>R<sup>2</sup> = 0.1521<br>p < 0.05*',
        data: [[0.112, 0.834], [0.242, 0.626]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      },{
        type: 'line',
        id: "HDI 2010",
        color: "#F22613",
        name: 'HDI 2010<br>R<sup>2</sup> = 0.1521<br>p < 0.04*',
        data: [[0.112, 0.8893], [0.242, 0.71]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      }],
			xAxis: {
				type: "scatter", 
				tickInterval: 0.01,
				startOnTick: true, 
				endOnTick: true, 
				showLastLabel: true 
			},
			yAxis: { min: 0.4, max: 1, endOnTick: false},
			tooltip: { enabled: true },
			plotOptions: {
				series: {
					color: "white",
					marker:{ enabled: true},
					states: { hover: { enabled: true}}
				},
			}
		}
	},
	hdi_7: {
		tag: "hdi_7",
		file_name: "data/hdi_enrolment.csv",
		attributes: {
			chart: { type: "scatter" },
			title: { text: "Enrolment & HDI" },
			series: [{
        type: 'line',
        id: "Gross Primary Enrolment Ratio",
        color: "#2ECC71",
        dashStyle: "LongDash",
        name: 'Gross Primary Enrolment Ratio<br>R<sup>2</sup> = 0.2304<br>p < 0.01*',
        data: [[0.112, 80], [0.242, 110]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      },{
        type: 'line',
        id: "Gross Tertiary Enrolment Ratio",
        color: "#E87E04",
        dashStyle: "ShortDot",
        name: 'Gross Tertiary Enrolment Ratio<br>R<sup>2</sup> = 0.1521<br>p < 0.05*',
        data: [[0.112, 90], [0.242, 70]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      },{
        type: 'line',
        id: "Combined Gross Enrolment in Education Both Sexes",
        color: "#F22613",
        name: 'Combined Gross Enrolment in Education Both Sexes<br>R<sup>2</sup> = 0.1521<br>p < 0.04*',
        data: [[0.112, 90], [0.242, 60]],
        marker: { enabled: false },
        states: { hover: { lineWidth: 0 } },
        enableMouseTracking: false
      }],
			xAxis: {
				type: "scatter", 
				tickInterval: 0.01,
				startOnTick: true, 
				endOnTick: true, 
				showLastLabel: true 
				},
			yAxis: { min: 40, max: 130, endOnTick: true},
			tooltip: { enabled: true },
			plotOptions: {
				series: {
					color: "white",
					marker:{ enabled: true},
					states: { hover: { enabled: true}}
				},
			}
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
	},
	bw_1: {
		tag: "bw_1",
		file_name: "data/bw_1.csv",
		attributes: {
			chart: { type: "column" },
			title: { text: "Country" },
			subtitle: {text: "Big Wreck Top Fans by Country"},
			xAxis: { type: "category" },
			yAxis: { tickInterval: 0.05},
			legend: { enabled:false }
		}
	},
	bw_2: {
		tag: "bw_2",
		file_name: "data/bw_2.csv",
		attributes: {
			chart: { type: "area" },
			title: { text: "Age" },
			subtitle: {text: "Big Wreck Top Fans by Age"},
			xAxis: { type: "category", min: 0.5, max:5.5},
			yAxis: { tickInterval: 0.05 },
			legend: { enabled: false }
		}
	},
	bw_3: {
		tag: "bw_3",
		file_name: "data/bw_3.csv",
		attributes: {
			chart: { type: "bar" },
			title: { text: "Sex" },
			subtitle: {text: "Big Wreck Top Fans by Sex"},
			xAxis: { title:{text:""}, type: "category"},
			yAxis: { max: 1, tickInterval: 0.1},
			plotOptions: { bar: { stacking: 'normal'}}
		}
	},
	bw_4: {
		tag: "bw_4",
		file_name: "data/bw_4.csv",
		attributes: {
			chart: { type: 'pie' },
			title: { text: "Genre Preferences" },
			subtitle: {text: "Big Wreck Top Fans by Genre Preferences"},
			xAxis: { type: "category" },
			plotOptions: { pie:{allowPointSelect: true, cursor: 'pointer',dataLabels: {enabled: true}, showInLegend: true } },
			tooltip: { enabled: true },
		}	
	},
	xhead_1: {
		tag: "xhead_1",
		file_name: "data/xhead_1.csv",
		attributes: {
			chart: { type: 'line' },
			title: { text: 'X-Head Proportions' },
			xAxis: { type: "category" },
			yAxis: { min: 0 },
			subtitle: {text: 'Proportion within each X-head subgroup of preferred genre'}
		}
	}		
}

var topics = {
	reminiscence: {
		title: "Reminiscence Bump",
		graphs: [graphs.rem_1, graphs.rem_2, graphs.rem_3, graphs.rem_4]
	},
	epidemic: {
		title: "Song Epidemic",
		graphs: [graphs.epidemic_1, graphs.epidemic_2]
	},
	hdi: {
		title: "HDI",
		graphs: [graphs.hdi_1, graphs.hdi_2, graphs.hdi_5, graphs.hdi_3, graphs.hdi_4, graphs.hdi_6, graphs.hdi_7]
	},
	rush: {
		title: "Rush",
		graphs: [graphs.rush_1, graphs.rush_2, graphs.rush_3]
	},
	bw: {
		title: "Big Wreck",
		graphs: [graphs.bw_1, graphs.bw_2, graphs.bw_3, graphs.bw_4]
	},
	leaky: {
		title: "X-Head Data",
		graphs: [graphs.xhead_1]
	}
}

function Metadata () {
	return { graphs: graphs, topics: topics }
}

