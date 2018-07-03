/** Copyright Sylvain Terlutte
	
	terlutte.sylvain@gmail.com
	
	This software is a computer program whose purpose is to help creating a
	web video game.
	
	This software is governed by the CeCILL-B license under French law and
	abiding by the rules of distribution of free software.  You can  use, 
	modify and/ or redistribute the software under the terms of the CeCILL-B
	license as circulated by CEA, CNRS and INRIA at the following URL
	"http://www.cecill.info". 
	
	As a counterpart to the access to the source code and  rights to copy,
	modify and redistribute granted by the license, users are provided only
	with a limited warranty  and the software's author,  the holder of the
	economic rights,  and the successive licensors  have only  limited
	liability. 
	
	In this respect, the user's attention is drawn to the risks associated
	with loading,  using,  modifying and/or developing or reproducing the
	software by the user in light of its specific status of free software,
	that may mean  that it is complicated to manipulate,  and  that  also
	therefore means  that it is reserved for developers  and  experienced
	professionals having in-depth computer knowledge. Users are therefore
	encouraged to load and test the software's suitability as regards their
	requirements in conditions enabling the security of their systems and/or 
	data to be ensured and,  more generally, to use and operate it in the 
	same conditions as regards security. 
	
	The fact that you are presently reading this means that you have had
	knowledge of the CeCILL-B license and that you accept its terms. **/
	
//CONTROLLER
var Controller = function(id,config ) {
	this.id = id;
	this.map = []; // JUMP, DOWN etc ...
	this.axes = [];
	this.buttonsEvents = [];
	for(var key in config.buttonsMap) {
		this.map[key] = 0;
	}
	for(var i=0;i<config.axes.length;i++) {
		this.axes.push(0);
	}
};

Controller.prototype.onButton = function(f) {
	this.buttonsEvents.push(f);
};

/*************


listConfigsKeyboard {
	buttonsMap: ['jump':47,'mourir':32]
	axes:[ [12 , 13] , [44,45 ]
}


*************/

//ControllerManager


var GamepadsManager = function() {
	this.nGp = 0;
	this.listControllers = [];
	this.listConfigs = [];
	this.navigatorGp = navigator.getGamepads();
};
GamepadsManager.prototype.update = function() {
	this.navigatorGp = navigator.getGamepads();
	if(this.navigatorGp[this.nGp]) {
		this.nGp++;
	}
	for(var i=0;i<this.listConfigs.length;i++) {
		var config = this.listConfigs[i];
		var gp = this.navigatorGp[config.idGp];
		var controller = this.listControllers[i];
		//buttons
		for(var key in config.buttonsMap) {
			controller.map[key] = gp.buttons[config.buttonsMap[key]].value;
		}
		
		//axes
		for(var j=config.axes.length;j--;) {
			controller.axes[j] = gp.axes[ config.axes[j] ];
		}
	}

};
GamepadsManager.prototype.addController = function(idGp,name,fConfig) {
	var c;
	if(this.navigatorGp[idGp]) {
		console.log(idGp);
		var config = {idGp:idGp};
		for(var key in fConfig) {
			config[key] = fConfig[key];
			
		}
		
		
		
		c = new Controller(name,config);
		this.listControllers.push(c);
		config.idGp = idGp;
		this.listConfigs.push(config);
	}
		return c;
};
GamepadsManager.prototype.deleteController = function(id) {
	for(var i = this.listControllers.length;i--;) {
		if(id == this.listControllers[i].id) {
			this.listControllers.splice(i,1);
			this.listConfigs.splice(i,1);
			break;
		}
	}
}
GamepadsManager.prototype.getController = function(id) {
	for(var i = this.listControllers.length;i--;) {
		if(id == this.listControllers[i].id) {
			return this.listControllers[i];
		}
	}
}
GamepadsManager.prototype.getControllers = function() {
	return this.listControllers;
}
GamepadsManager.prototype.deleteAllControllers = function() {
	this.listControllers = [];
	this.listConfigs = [];
};


//TODO DEBUG

var KeyboardManager = function(    ){
	this.listControllers = [];
	this.listConfigs = [];
	var that = this;
	document.addEventListener('keydown',function(e) {
		var config;
		var controller;
		for(var i=0;i<that.listConfigs.length;i++) {
			config = that.listConfigs[i];
			controller = that.listControllers[i];
			for(var key in config.buttonsMap) {
				if(e.keyCode == config.buttonsMap[key]) {
					controller.map[key] = 1;
					for(var k = controller.buttonsEvents.length;k--;) {
						controller.buttonsEvent[k]( key , 1);
					}
				}
			}
			for(var j=0;j<config.axes.length;j++) {
				if(e.keyCode == config.axes[j][0]) {
					config.listValueAxes[j][0] = 1;
				}
				else if(e.keyCode == config.axes[j][1]) {
					config.listValueAxes[j][1] = 1;
				}
			}
			
		}
	});
		document.addEventListener('keyup',function(e) {
		var config;
		var controller;
		for(var i=0;i<that.listConfigs.length;i++) {
			config = that.listConfigs[i];
			controller = that.listControllers[i];
			for(var key in config.buttonsMap) {
				if(e.keyCode == config.buttonsMap[key]) {
					controller.map[key] = 0;
					for(var k = controller.buttonsEvents.length;k--;) {
						controller.buttonsEvent[k]( key , 0);
					}
				}
			}
			for(var j=0;j<config.axes.length;j++) {
				if(e.keyCode == config.axes[j][0]) {
					config.listValueAxes[j][0] = 0;
				}
				else if(e.keyCode == config.axes[j][1]) {
					config.listValueAxes[j][1] = 0;
				}
			}
			
		}
	});
};

KeyboardManager.prototype.addController = function(id, config ){
	var c = new Controller(id,config);
	this.listControllers.push(c);
	if(!config.listValueAxes) {
		config.listValueAxes = [];
		for(var i=config.axes.length;i--;) {
			config.listValueAxes.push([0,0]);
		}
	}
	this.listConfigs.push(config);
	return c;
};
KeyboardManager.prototype.deleteController = function(id) {
	for(var i = this.listControllers.length;i--;) {
		if(id == this.listControllers[i].id) {
			this.listControllers.splice(i,1);
			this.listConfigs.splice(i,1);
			break;
		}
	}
};
KeyboardManager.prototype.update = function(g){
	var config,controller;
	for(var i = 0;i<this.listControllers.length; i++){
		controller = this.listControllers[i];
		config = this.listConfigs[i];
		for(var j=0;j<config.listValueAxes.length;j++) {
			controller.axes[j] = config.listValueAxes[j][0] - config.listValueAxes[j][1];
		}
	}
};
KeyboardManager.prototype.getController = function(id) {
	for(var i = this.listControllers.length;i--;) {
		if(id == this.listControllers[i].id) {
			return this.listControllers[i];
		}
	}
};
KeyboardManager.prototype.getControllers = function() {
	return this.listControllers;
};
KeyboardManager.prototype.deleteAllControllers = function() {
	this.listControllers = [];
	this.listConfigs = [];
};






