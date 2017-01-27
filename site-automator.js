var task = {
	"triggers": {
		"onResourceRequested": function(response) {
			if (/360yield\.com\/reports360\/get/.test(response.url)) {
				//console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
				//setInterval(function() {
					//console.log('opening page' + response.url);
					//page.open(response.url, function(){
					//	console.log('page openened');
					//});
				//}, 5000);
			}
		},
		"onResourceReceived": function(response) {
			//console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
			//if (/360yield\.com\/reports360\/get/.test(response.url) && response.stage == 'end')
				//console.log('\nResponse (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
		}
	},
	"steps": [
		{
			"name": "login",
			"prerequisites": function() {
				return true;
			},
			"steps": function() {
				page.evaluate(function() {
					form = document.forms[0];
					email = form.elements['email'];
					password = form.elements['password'];
					
					email.value = 
					password.value = 
					 
					form.submit();
				});
			}
		},
		{
			"name": "click reports",
			"prerequisites": function() {
				return page.evaluate(function() {
					return document.getElementById('id-menu-logout') != null;
				});
			},
			"steps": function() {
				page.evaluate(function() {
					buttons = document.getElementsByTagName('button');
					
					for (i in buttons) {
						button = buttons[i];
						if (button.innerHTML == 'Reports')
							button.click();
					}
				});
			}
		},
		{
			"name": "click 360",
			"prerequisites": function() {
				return page.evaluate(function() {
					return document.getElementById('tabpanel-reports__report-360') != null;
				});
			},
			"steps": function() {
				page.evaluate(function() {
					tab360 = document.getElementById('tabpanel-reports__report-360');
					tab360.getElementsByTagName('a')[1].click();
				});
			}
		},
		{
			"name": "open metric A combo list",
			"prerequisites": function() {
				return page.evaluate(function() {
					labels = document.getElementsByTagName('label');

					for (i in labels) {
						label = labels[i];
						if (label.innerHTML == 'Metric A') 
							return true;
					}
					return false;
				});
			},
			"steps": function() {		
				page.evaluate(function() {
					labels = document.getElementsByTagName('label');

					for (i in labels) {
						label = labels[i];
						if (label.innerHTML == 'Metric A') {
							div1 = label.parentNode;
							div2 = div1.getElementsByTagName('div')[0];
							div3 = div2.getElementsByTagName('div')[0]; 
							img = div3.getElementsByTagName('img')[0];
							
							img.click();							
						}
					}
				});
			}
		},
		{
			"name": "select metric A combo list item",
			"prerequisites": function() {
				return page.evaluate(function() {
					inputs = document.getElementsByClassName('x-combo-list-item');
					return inputs.length > 0;
				});
			},
			"steps": function() {		
				page.evaluate(function() {
					inputs = document.getElementsByClassName('x-combo-list-item');
					
					for (i in inputs) {
						input = inputs[i];
						if (input.innerHTML == 'Weighted Impressions')
							input.click();
					}
				});
			}
		},
		{
			"name": "open date range combo list",
			"prerequisites": function() {
				return page.evaluate(function() {
					labels = document.getElementsByTagName('label');

					for (i in labels) {
						label = labels[i];
						if (label.innerHTML == 'Date Range') 
							return true;
					}
					return false;
				});
			},
			"steps": function() {		
				page.evaluate(function() {
					labels = document.getElementsByTagName('label');

					for (i in labels) {
						label = labels[i];
						if (label.innerHTML == 'Date Range') {
							div1 = label.parentNode;
							div2 = div1.getElementsByTagName('div')[0];
							div3 = div2.getElementsByTagName('div')[0]; 
							img = div3.getElementsByTagName('img')[0];
							
							img.click();							
						}
					}
				});
			}
		},
		{
			"name": "select date range combo list item",
			"prerequisites": function() {
				return page.evaluate(function() {
					inputs = document.getElementsByClassName('x-combo-list-item');
					return inputs.length > 0;
				});
			},
			"steps": function() {		
				page.evaluate(function() {
					inputs = document.getElementsByClassName('x-combo-list-item');
					
					for (i in inputs) {
						input = inputs[i];
						if (input.innerHTML == 'This year')
							input.click();
					}
				});
			}
		},

		{
			"name": "open graph combo list",
			"prerequisites": function() {
				return page.evaluate(function() {
					labels = document.getElementsByTagName('label');

					for (i in labels) {
						label = labels[i];
						if (label.innerHTML == 'Graph') 
							return true;
					}
					return false;
				});
			},
			"steps": function() {		
				page.evaluate(function() {
					labels = document.getElementsByTagName('label');

					for (i in labels) {
						label = labels[i];
						if (label.innerHTML == 'Graph') {
							div1 = label.parentNode;
							div2 = div1.getElementsByTagName('div')[0];
							div3 = div2.getElementsByTagName('div')[0]; 
							img = div3.getElementsByTagName('img')[0];
							
							img.click();							
						}
					}
				});
			}
		},
		{
			"name": "select graph combo list item",
			"prerequisites": function() {
				return page.evaluate(function() {
					inputs = document.getElementsByClassName('x-combo-list-item');
					return inputs.length > 0;
				});
			},
			"steps": function() {		
				page.evaluate(function() {
					inputs = document.getElementsByClassName('x-combo-list-item');
					
					for (i in inputs) {
						input = inputs[i];
						if (input.innerHTML == 'Trend')
							input.click();
					}
				});
			}
		},
		{
			"name": "click export report",
			"prerequisites": function() {
				return true;
			},
			"steps": function() {
				clickButton = function () {
					page.evaluate(function() {
						buttons = document.getElementsByTagName('button');
					
						for (i in buttons) {
							button = buttons[i];
							if (button.innerHTML == 'Export to Excel')
								button.click();
						}
					});
				}
				clickButton();
				window.setTimeout(clickButton, 999);
				window.setTimeout(clickButton, 2999);
			}
		},
		{
			"name": "waiting for download",
			"prerequisites": function() {
				return page.evaluate(function () {
                                        divs = document.getElementsByTagName('div');
                                        for (i in divs) {
                                                div = divs[i];
                                                if (div.innerHTML == 'Loading...')
                                                        return false;
                                        }
                                        return true;			
				});
			},
			"steps": function() {
				return false;
			}
		}
	]
};

function stopTask() {
	exitTimeout = 30000;
	clearInterval(taskInterval);
	console.log('Done, exiting in ' + exitTimeout / 1000 + ' seconds ...');
	
	window.setTimeout(function() {	
		phantom.exit();
		slimer.exit();
	}, exitTimeout);
}	

var taskIntervalFunction = function() {
	if (task.steps.length == 0) {
		stopTask();	
		return;
	}
	
	taskStep = task.steps[0];
	
	console.log('Checking prerequisites for step: ' + taskStep.name);
	
	if (taskStep.prerequisites()) {
		console.log('Running step: ' + taskStep.name);
		taskStep.steps();
		task.steps.splice(0, 1);
	}
}; 

var fs = require('fs');
var taskInterval;
var address = 'http://360yield.com';

var page = require('webpage').create();
page.viewportSize = {width: 800, height: 600};
page.captureContent = [ /.*/ ];

page.onAlert = function(msg) {
	console.log('ALERT: ' + msg);
};

page.onError = function(msg, trace) {
	console.log('ERROR: ' + msg);
};

for (name in task.triggers) {
	page[name] = task.triggers[name];
}

page.open(address, function (status) {
	
	if (status !== 'success') {
		console.log('FAIL to load the address');
	}
	else {
		console.log('Loaded page');
		taskInterval = window.setInterval(taskIntervalFunction, 1000);
	}

});
