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
	
var Camera = function(screenWidth,screenHeight) {
	this.pos = new Vector2(0,0);
	this.posMin = new Vector2(0,0);
	this.posMax = new Vector2(screenWidth,screenHeight);
	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.target = null;
	this.posTarget = null;
	this.bordTarget = null;
	this.lockXLeft = false;
};
Camera.prototype.update = function(g) {
	if(this.target) {
		if(this.bordTarget) {
			var posTarget = new Vector2(this.target.x - this.pos.x,this.target.y - this.pos.y);
			var x=this.pos.x,y=this.pos.y;
			if(posTarget.x < this.posTarget.x) {
				x = this.target.x - this.posTarget.x;
			}
			else if( posTarget.x > this.posTarget.x + this.bordTarget.x) {
				x = this.target.x - this.posTarget.x - this.bordTarget.x;
			}
			if(posTarget.y < this.posTarget.y) {
				y = this.target.y - this.posTarget.y;
			}
			else if(posTarget.y > this.posTarget.y + this.bordTarget.y) {
				y = this.target.y - this.posTarget.y - this.bordTarget.y;
			}
		}
		else {
			x = this.target.x - this.posTarget.x;
			y = this.target.y - this.posTarget.y;
		}
		if(this.lockXLeft) {
			if(x < this.pos.x) {
				x=this.pos.x;
			}
		}
		this.setPos(x,y);
	}
};
Camera.prototype.setPos = function(x,y) {
	if(x < this.posMin.x) {
		this.pos.x = this.posMin.x;
	}
	else if(x+this.screenWidth > this.posMax.x) {
		this.pos.x = this.posMax.x-this.screenWidth;
	}
	else {
		this.pos.x = x;
	}
	
	if(y < this.posMin.y) {
		this.pos.y = this.posMin.y;
	}
	else if(y + this.screenHeight > this.posMax.y) {
		this.pos.y = this.posMax.y-this.screenHeight;
	}
	else {
		this.pos.y = y;
	}
};
Camera.prototype.setTarget = function(target,pos,bord) {
	this.target = target;
	this.posTarget = pos;
	if(bord) {
		this.bordTarget = bord;
	}
};
