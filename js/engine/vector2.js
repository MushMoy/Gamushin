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
	
var Vector2 = function(pX, pY) {
	this.x = +pX;
	this.y = +pY;
};

Vector2.prototype.getNormSquare = function() {
	return ((this.x*this.x) + (this.y*this.y));
};

Vector2.prototype.getNorm = function() {
	return Math.sqrt((this.x*this.x) + (this.y*this.y));
};

Vector2.prototype.getNormalize = function() {
	var norm = this.getNorm();
	var newVect = new Vector2(this.x/norm , this.y/norm );
	return newVect;
};
Vector2.prototype.normalize = function() {
	var norm = this.getNorm();
	if(norm > 0) {
		this.x = this.x/norm;
		this.y = this.y/norm;
	}
};
Vector2.prototype.rotate = function(alpha) {
			var sinA = Math.sin(alpha);
			var cosA = Math.cos(alpha);
			var x = this.x * cosA - this.y * sinA; //calcul d1
			var y = this.x * sinA + this.y * cosA; // ^
			this.x = x;
			this.y = y;
};
Vector2.prototype.getSum = function(p) {
	return new Vector2(this.x + p.x,this.y + p.y);
};
Vector2.prototype.sum = function(p) {
	this.x += + p.x;
	this.y += + p.y;
};
Vector2.prototype.getSub = function(p) {
	return new Vector2(this.x - p.x,this.y - p.y);
};
Vector2.prototype.sub = function(p) {
	this.x -= + p.x;
	this.y -= + p.y;
};
Vector2.prototype.scale = function(s) {
	this.x *= s;
	this.y *= s;
};
Vector2.prototype.getScale = function(s) {
	return new Vector2(this.x*s,this.y*s);
};
Vector2.prototype.copy = function() {
	return new Vector2(this.x,this.y);
};
Vector2.prototype.getAlpha = function() {
	// var norm = this.getNorm();
	// var alpha = Math.acos(this.x / norm);
	// alpha = (this.y <0)? 2*Math.PI-alpha:alpha;
	return Math.atan2(this.y,this.x);
};
Vector2.prototype.setAlpha = function(a) {
	if(a) {
		var norm = this.getNorm();
		this.x = Math.cos(a) * norm;
		this.y = Math.sin(a) * norm;
	}
};
Vector2.prototype.set = function(v,y) {
	if(isNaN(v) && isNaN(y)) {
		this.x = v.x;
		this.y = v.y;
	}
	else {
		this.x = v;
		this.y = y;
	}
};
Vector2.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y;
};
Vector2.prototype.getProjectOn = function(pV) {
	var v = pV.getNormalize();
	var dot = this.dot(v);
	v.scale(dot);
	return v;
};
Vector2.prototype.getLHNormal = function() {
	return new Vector2(this.y,-this.x);
};
Vector2.prototype.getRHNormal = function() {
	return new Vector2(-this.y , this.x);
};
Vector2.prototype.equals = function(vec) {
	return (this.x == vec.x && this.y == vec.y);
};
