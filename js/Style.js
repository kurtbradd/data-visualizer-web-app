Highcharts.createElement('link', {
	href: '//fonts.googleapis.com/css?family=Lato:300,100,900',
	rel: 'stylesheet',
	type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
	colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
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
		line: {
			lineWidth: 3.5
		},
		area: {
			lineWidth: 3.5,
			fillOpacity: 0.20,
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