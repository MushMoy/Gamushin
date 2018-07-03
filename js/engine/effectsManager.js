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
	
//effectsManager
var EffectsManager = function() {
	this.effects = [];
};
EffectsManager.prototype.render = function(g,cam) {
	for(var i=0;i<this.effects.length;i++) {
		if(!this.effects[i].draw(g,cam)) {
			this.effects.splice(i,1);
			i--;
		}
	}
};
EffectsManager.prototype.add = function(obj) {
	this.effects.push(obj);
};

var WhiteScreen = function(timer) {
	this.timer = (timer)?timer: 5;
};
WhiteScreen.prototype.draw = function(g) {
	g.context.fillStyle = "rgba(200,200,200,"+this.timer/8+")";
	g.context.fillRect(0,0,g.canvasWidth,g.canvasHeight);
	if(this.timer == 0 ) { return false; } else { this.timer--; return true;}
};

var RedScreen = function(timer) {
	this.timer = (timer)?timer: 5;
};
RedScreen.prototype.draw = function(g) {
	g.context.fillStyle = "rgba(200,0,0,"+this.timer/8+")";
	g.context.fillRect(0,0,g.canvasWidth,g.canvasHeight);
	if(this.timer == 0 ) { return false; } else { this.timer--; return true;}
};
