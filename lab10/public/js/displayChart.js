var retweetChart, createdChart, ffChart;

$(function() {
	
	Chart.defaults.global.legend.labels.fontColor = '#FFF';
	
	// on load, create the charts
	retweetChart = new Chart( $("#retweetChart"), {
		type: 'doughnut',
		data: {
			labels: ["Retweets", "Original Tweets"],
			datasets: [{
				data: [0,0],
				backgroundColor: [
					"#FF6384",
					"#36A2EB"
				],
				hoverBackgroundColor: [
					"#FF6384",
					"#36A2EB"
				]
			}]
		}
	});
	
	createdChart = new Chart( $("#createdChart"), {
		type: 'bar',
		data: {
			labels: [],
			datasets: [
				{
					label: "Users",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: [],
				}
			]
		}
	});
	
	ffChart = new Chart( $("#ffChart"), {
		type: 'pie',
		data: {
			labels: ["Friends", "Followers"],
			datasets: [{
				data: [0,0],
				backgroundColor: [
					"#FF6384",
					"#36A2EB"
				],
				hoverBackgroundColor: [
					"#FF6384",
					"#36A2EB"
				]
			}]
		}
	});
});

// function to update the data of the chart
function updateRetweetChart(rt, t) {
	retweetChart.data.datasets[0].data[0] = rt;
	retweetChart.data.datasets[0].data[1] = t;
	retweetChart.update();
}

function updateCreatedChart(d) {
	createdChart.data.labels = Object.keys(d);
	
	var vals = [];
	
	for (var key in d)
		vals.push(d[key]);
		
	createdChart.data.datasets[0].data = vals;
	createdChart.update();
}

function updateFfChart(fr, fo) {
	ffChart.data.datasets[0].data[0] = fr;
	ffChart.data.datasets[0].data[1] = fo;
	ffChart.update();
}