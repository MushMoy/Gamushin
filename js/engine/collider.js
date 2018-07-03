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
	
var Collider = function(x,y,xw,yw) {
	this.pos = new Vector2(x,y);
	this.width = new Vector2(xw,yw);
};
Collider.prototype.isColliding = function(c) {
	return false;
};
Collider.prototype.drawDebug = function(g,cam) {
	g.context.lineWidth = 1;
	g.context.fillStyle = 'white';
	g.context.strokeStyle = '#00ff00';
	g.context.fillRect(this.pos.x-cam.pos.x-this.width.x,this.pos.y-cam.pos.y-this.width.y,this.width.x*2,this.width.y*2);
	g.context.strokeRect(this.pos.x-cam.pos.x-this.width.x,this.pos.y-cam.pos.y-this.width.y,this.width.x*2,this.width.y*2);
};
Collider.prototype.isOnScreen = function(cam) {
	return ( this.pos.x < cam.pos.x + cam.screenWidth &&
				this.pos.x + 2*this.width.x > cam.pos.x &&
				this.pos.y < cam.pos.y + cam.screenHeight &&
				this.pos.y + 2*this.width.y > cam.pos.y);
};

//V2
//EN COURS PAR MUSH : collision circle/polygon
var CircleCollider = function(centre,r) {
	this.centre = centre;
	this.r = r;
	this.vit = new Vector2(0,0);
}
CircleCollider.prototype.drawDebug = function(g) {
	g.context.fillStyle = rgbToString(hslToRgb(0.2,0.8,0.6));
	g.context.beginPath();
	g.context.arc(this.centre.x,this.centre.y,this.r,0,2*Math.PI);
	g.context.fill();
	g.context.closePath();
}


var PolygonCollider = function(centre,points) { // Vec2 centre , Array[Vec2] points (ref centre)
	this.centre = centre;
	this.points = points;
	this.vit = new Vector2(0,0);
}
PolygonCollider.prototype.drawDebug = function(g,cam) {
	g.context.fillStyle = rgbToString(hslToRgb(0.7,0.8,0.6));
	var point = this.centre.copy();
	point.sum( this.points[ this.points.length-1]);
	g.context.beginPath();
	g.context.moveTo(point.x,point.y);
	
	for(var i=0;i<this.points.length;i++) {
		point = this.centre.copy();
		point.sum( this.points[i]);
		g.context.lineTo(point.x,point.y);
	}
	g.context.fill();
	g.context.closePath();
}
