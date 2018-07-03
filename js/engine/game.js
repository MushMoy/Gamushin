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
	
var Game = function() {
	this.idState = {
			gameplay:0
	};
	this.data = {};
	this.listState = [];
	this.listState.push(new GameplayState(this));
	this.currentState = new LoadState(this);  // !!
	var canvas = this.canvas = document.getElementById("canvas");
	canvas.height = this.canvasHeight = 720;
	canvas.width = this.canvasWidth = 1280;
	this.context = canvas.getContext("2d");
	this.dt = 0;
	this.lastTime = Date.now();
	this.audio = new SoundSystem();
	this.keyboardManager = new KeyboardManager();
	this.gamepadsManager = new GamepadsManager();
	
	//FULLSCREEN TMP;
	var fullscreen = false;
	document.addEventListener('keydown',function(e) { 
		
		if(e.keyCode == 70) {
			if(!fullscreen) {
				if(canvas.requestFullscreen) {
					canvas.requestFullscreen();
				} else if(canvas.mozRequestFullScreen) {
					canvas.mozRequestFullScreen();
				} else if(canvas.webkitRequestFullscreen) {
					canvas.webkitRequestFullscreen();
					canvas.style.width = '100%';
					canvas.style.height = '100%';
					canvas.style.top = '0';
					canvas.style.left = '0';
				} else if(canvas.msRequestFullscreen) {
					canvas.msRequestFullscreen();
				}
			fullscreen = true;
			}
			else {
				if(document.exitFullscreen) {
					document.exitFullscreen();
				} else if(document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if(document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
				fullscreen=false;
			}
		}
	});
};

Game.prototype.loadState = function(pId) {
	this.currentState = this.listState[pId];
	this.currentState.init(this);
};

Game.prototype.start = function() {
this.currentState.init(this);
this.loop();
};

Game.prototype.loop = function() {
	var that = this;
	// requestAnimFrame(function(){ that.loop() });
	var now = Date.now();
	this.dt = now - this.lastTime;
	this.lastTime = now;
	this.dt = (this.dt > 100)? 0:this.dt;
	this.keyboardManager.update(this);
	this.gamepadsManager.update(this);
	this.currentState.update(this);
	this.audio.update(this);
	this.currentState.render(this);
	
	
	
		requestAnimFrame(function(){ that.loop(); });
};

Game.prototype.load = function() {
	if(typeof localStorage != 'undefined' &&
		'lastLevelUnlock0' in localStorage && 
		'lastLevelUnlock1' in localStorage && 
		'lastLevelUnlock2' in localStorage){
		this.dataSave.progressions[0].lastLevelUnlock = localStorage.lastLevelUnlock0;
		this.dataSave.progressions[1].lastLevelUnlock = localStorage.lastLevelUnlock1;
		this.dataSave.progressions[2].lastLevelUnlock = localStorage.lastLevelUnlock2;
	}
	else{
		this.dataSave = {
			progressions:[
			{
				lastLevelUnlock:0
			},
			{
				lastLevelUnlock:0
			},
			{
				lastLevelUnlock:0
			}]
		};
		this.save();
	}
};

Game.prototype.save = function() {
	if(typeof localStorage!='undefined'){
		localStorage.lastLevelUnlock0 = this.dataSave.progressions[0].lastLevelUnlock;
		localStorage.lastLevelUnlock1 = this.dataSave.progressions[1].lastLevelUnlock;
		localStorage.lastLevelUnlock2 = this.dataSave.progressions[2].lastLevelUnlock;
	}
};
Game.prototype.activateMouse = function() {
	if(!this.mouse) {
		this.mouse = new MouseController(this.canvas);
	}
};

var MouseController = function(canvas) {
	
	this.pos = new Vector2(0,0);
	//var that = this;
	this.mouseOnClic = [];
	
	var that = this;
	document.addEventListener('mousemove' , function(event) {
		var clientRect = canvas.getBoundingClientRect();
		var mouseX = event.clientX-clientRect.left;
		var mouseY = event.clientY-clientRect.top;
		if(mouseX < canvas.width && mouseX >= 0 &&
			mouseY < canvas.height && mouseY >= 0) {
			that.pos.x = mouseX;
			that.pos.y = mouseY;
		}
	});
	
	document.addEventListener('mousedown',function(event) {
		for(var i =that.mouseOnClic.length;i--;) {
			that.mouseOnClic[i](1,event.which);
		}
	});
	document.addEventListener('mouseup',function(event) {
		for(var i =that.mouseOnClic.length;i--;) {
			that.mouseOnClic[i](0,event.which);
		}
	});
	
	
};
MouseController.prototype.onClic = function(f) {  // f(value,button)
 this.mouseOnClic.push(f);
};
MouseController.prototype.deleteAllEvent = function() {
		this.mouseOnClic = [];
};
MouseController.prototype.toggleRightClic = function() {
	if(!document.oncontextmenu) {
		document.oncontextmenu = function() {
			return false;
		};
	}
	else {
		document.oncontextmenu = null;
	}
};




























