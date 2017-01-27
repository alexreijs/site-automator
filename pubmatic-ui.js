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
				page.evaluate(function(un, pw) {
					form = document.forms[0];
					email = form.elements['email'];
					password = form.elements['password'];
					
					email.value = un;
					password.value = pw;
					 
					form.elements['submit'].click();
				}, credentials['username'], credentials['password']);
			}
		},
		{
			"name": "Go to analytics",
			"prerequisites": function() {
				return page.evaluate(function() {
					anchors = document.getElementsByTagName('a');

					for (i in anchors) {
						anchor = anchors[i];
						if (anchor.innerHTML == 'Sign Out')
							return true;
					}
					return false;
				});				
			},
			"steps": function() {
				page.evaluate(function() {
					anchors = document.getElementsByTagName('a');

					for (i in anchors) {
						anchor = anchors[i];
						if (anchor.innerHTML == 'Analytics')
							anchor.click();
					}
				});
			}
		},
		{
			"name": "Go to custom reports",
			"prerequisites": function() {
				return page.evaluate(function() {
					anchors = document.getElementsByTagName('a');

					for (i in anchors) {
						anchor = anchors[i];
						if (anchor.innerHTML == 'Custom Reports')
							return true;
					}
					return false;
				});				
			},
			"steps": function() {
				page.evaluate(function() {
					anchors = document.getElementsByTagName('a');

					for (i in anchors) {
						anchor = anchors[i];
						if (anchor.innerHTML == 'Custom Reports')
							anchor.click();
					}
				});
			}
		},
		{
			"name": "Go to NMD - report",
			"prerequisites": function() {
				return page.evaluate(function() {
					divs = document.getElementsByTagName('div');

					for (i in divs) {
						div = divs[i];
						if (div.innerHTML == 'NMD - Export')
							return true;
					}
					return false;
				});				
			},
			"steps": function() {
				page.evaluate(function() {
					divs = document.getElementsByTagName('div');

					for (i in divs) {
						div = divs[i];
						if (div.innerHTML == 'NMD - Export')
							div.parentNode.parentNode.click();
					}
				});
			}
		},
		{
			"name": "Open download dropbown",
			"prerequisites": function() {
				return page.evaluate(function() {
					objects = document.getElementsByClassName('pmcc-menu-control');

					for (i in objects) {
						object = objects[i];
						if (object.innerHTML == '')
							return true;
					}
					return false;
				});				
			},
			"steps": function() {
				page.evaluate(function() {
					objects = document.getElementsByClassName('pmcc-menu-control');

					for (i in objects) {
						object = objects[i];
						if (object.innerHTML == '')
							object.click();
					}
					return false;
				});
			}
		},
		{
			"name": "Download report",
			"prerequisites": function() {
				return page.evaluate(function() {
					spans = document.getElementsByTagName('span');

					for (i in spans) {
						span = spans[i];
						regex = new RegExp('^download csv.*full report.*', 'i');
						if (regex.test(span.innerHTML))
							return true;
					}
					return false;
				});				
			},
			"steps": function() {
				download = function () {
					page.evaluate(function() {
						spans = document.getElementsByTagName('span');

						for (i in spans) {
							span = spans[i];
							regex = new RegExp('^download csv.*full report.*', 'i');
							
							if (regex.test(span.innerHTML)) {
								span.click();
								
								//span.innerHTML = '';
								//alert(span.parentNode.parentNode.parentNode);
								
								//var event = document.createEvent('MouseEvent');
								//event.initMouseEvent(eventType, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 2, null);
								//span.dispatchEvent(event);

							}
						}
					});
				}
				setTimeout(download, 2500);
			}
		}
	]
};

function stopTask() {
	exitTimeout = 60000;
	clearInterval(taskInterval);
	console.log('Done, waiting ' + exitTimeout / 1000 + ' seconds for temp file to be copied...');
	
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

// Get system arguments
var system = require('system');
var systemArguments = {};
var x, argument = null;

for (x in system.args) {
	argument = system.args[x];
	if (/[a-z_/]*=[a-z_/]*/.test(argument))
		systemArguments[argument.split('=')[0]] = argument.split('=')[1];
}


var fs = require('fs');
var taskInterval;
var address = 'https://apps.pubmatic.com/publisher/';
var credentials = require('credentials.js').getCredentials('pubmatic');

var page = require('webpage').create();
page.viewportSize = {width: 1600, height: 1200};
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
