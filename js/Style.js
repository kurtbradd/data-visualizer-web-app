Highcharts.createElement('link', {
	href: '//fonts.googleapis.com/css?family=Lato:300,100,900',
	rel: 'stylesheet',
	type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", 
// 	"#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", 
//	"#DF5353", "#7798BF", "#aaeeee"],

var colors = [
	"#F89406", "#F4D03F", "#2b908f", "#90ee7e", "#86E2D5",
	"#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", 
	"#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#F22613",
	"#D2527F", "#F62459", "#9A12B3", "#446CB3", "#52B3D9", 
	"#19B5FE", "#26A65B", "#C8F7C5", "#2ECC71", "#95A5A6",
	"#FDE3A7", "#1E824C", "#90C695", "#9B59B6", "#96281B",
	"#E26A6A", "#65C6BB", "#E87E04", "#3FC380"]

Highcharts.theme = {
	colors: _.shuffle(colors),
	chart: {
		backgroundColor:'rgba(255, 255, 255, 0)',
		style: {
			fontFamily: "'Lato', sans-serif",
			fontSize: '18px'
		},
		renderTo: 'highchart',
		zoomType: 'x',
		plotBorderColor: '#606063',
	},
	title: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase',
			fontSize: '30px',
			fontWeight: 'bold'
		}
	},
	subtitle: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase'
		}
	},
	xAxis: {
		gridLineColor: '#707073',
		labels: {
			y: 30,
			style: { 
				color: '#E0E0E3',
				fontSize: '15px',
				fontWeight: 'light'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#A0A0A3',
				fontSize: '20px',
				fontWeight: 'light'
			}
		}
	},
	yAxis: {
		gridLineColor: '#707073',
		labels: {
			x: -17,
			style: { 
				color: '#E0E0E3',
				fontSize: '15px',
				fontWeight: 'light'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#A0A0A3',
				fontSize: '20px',
				fontWeight: 'light'
			}
		}
	},
	tooltip: {
		enabled: false
	},
	plotOptions: {
		column: {
			pointPadding: 0.2,
			borderWidth: 1
    },
		line: {
			lineWidth: 3.5
		},
		area: {
			lineWidth: 3.5,
			fillOpacity: 0.1,
		},
		areaspline: {
			fillOpacity: 0.55,
			lineWidth: 2.5
		},
		series: {
			states: { 
				hover: { 
					enabled: false 
				} 
			},
			dataLabels: { 
				color: '#B0B0B3'
			},
			marker: {
				enabled: false, 
				lineColor: '#333'
			},
			animation: {
				easing: 'swing', 
				duration: 900
			}
		}
	},
	legend: {
		title: {
			style: {
				color: '#A0A0A3',
				fontSize: '20px',
				fontWeight: 'light'
			}
		},
		itemStyle: {
			color: '#E0E0E3',
			fontWeight: 'light',
			fontSize: '15px'
		},
		itemHoverStyle: {
			color: '#FFF',
			fontWeight: 'regular'
		},
		itemHiddenStyle: { 
			color: '#606063'
		}
	},
	credits: { 
		enabled: false
	},
	navigation: { 
		buttonOptions: { 
			enabled: false
		}
	},
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);