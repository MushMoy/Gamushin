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
	
var PhysicsEngine = function(staticPolygons) {  //Static Polygon ne bouge pas, et cest des polygons
	this.staticPolygons = staticPolygons;
};
PhysicsEngine.prototype.eraseStaticPolygons = function() {
	this.staticPolygons = [];
};
PhysicsEngine.prototype.addStaticPolygon = function(p) {
	this.staticPolygons.push(p);
};
PhysicsEngine.prototype.circleWithStatic = function(circle) {
	for(var i=0;i<this.staticPolygons.length;i++) {
		var polygon = this.staticPolygons[i];
		this.circleWithStaticPolygon(circle,polygon);	
	}
};
PhysicsEngine.prototype.getNormalBetweenTwoPoints = function(pointA,pointB) {
	var normal = pointB.getSub(pointA).getLHNormal();
	normal.normalize();
	return normal;
}
PhysicsEngine.prototype.circleWithStaticPolygon = function(circle,polygon) {
		var pointA,pointB,normal;
		var min = +0;
		var max = +0;
		var minCircle = +0;
		var maxCircle = +0;
		var diffMin = 999999;
		var normalMin;
		var nearestVertex = polygon.points[0];
		var nearestVertexDistanceSquared = 999999;
		for(var i=0;i<polygon.points.length;i++) {  //test avec les cot�s du polygon
			normal = this.getNormalBetweenTwoPoints(polygon.points[i],polygon.points[ (i+1)%polygon.points.length]);
			
			//calcul nearestVertex
			var distance = circle.centre.getSub(polygon.points[i].getSub(polygon.centre)).getNormSquare();
			if(distance < nearestVertexDistanceSquared) {
				nearestVertextDistanceSquared = distance;
				nearestVertex = polygon.points[i];
			}
			
			//projection circle:
			minCircle = circle.centre.dot(normal);
			maxCircle = minCircle+circle.r;
			minCircle -= circle.r;
			
			var projection = polygon.centre.getSum(polygon.points[0]).dot(normal);
			min = projection
			max = projection
			for(var j=1;j<polygon.points.length;j++) { //projection polygon sur normal
				projection = polygon.centre.getSum(polygon.points[j]).dot(normal);
				if( projection < min) {
					min = projection;
				}
				else if(projection > max) {
					max = projection;
				}
			}
			
			//verification si �a touche
			if( minCircle < max && maxCircle > min) {
				// console.log('ca touche');
				var difference1 = max - minCircle;
				var difference2 = min - maxCircle;
				var diff = ( Math.abs(difference1) < Math.abs(difference2) ) ? difference1:difference2;
				if( Math.abs(diff) < Math.abs(diffMin)) {
					diffMin = diff;
					normalMin = normal.copy();
				}
				//�a touche
			}
			else {
				//�a touche pas donc pas collision
				return false;
			}
			
		}
		
		////test avec sommet le plus proche
		//calcul normal
		normal = circle.centre.getSub(polygon.centre.getSum(nearestVertex));
		normal.normalize();
		//projection circle
		
		minCircle = circle.centre.dot(normal);
		maxCircle = minCircle + circle.r;
		minCircle -= circle.r;
		
		
		//projection polygon
		var projection = polygon.centre.getSum(polygon.points[0]).dot(normal);
		min = projection
		max = projection
		for(var j=1;j<polygon.points.length;j++) { //projection polygon sur normal
			projection = polygon.centre.getSum(polygon.points[j]).dot(normal);
			if( projection < min) {
				min = projection;
			}
			else if(projection > max) {
				max = projection;
			}
		}
		
		
		//overlap
		//verification si �a touche
		if( minCircle < max && maxCircle > min) {
			var difference1 = max - minCircle;
			var difference2 = min - maxCircle;
			var diff = ( Math.abs(difference1) < Math.abs(difference2) ) ? difference1:difference2;
			if( Math.abs(diff) < Math.abs(diffMin)) {
				diffMin = diff;
				normalMin = normal.copy();
			}
			//�a touche
		}
		else {
			//�a touche pas donc pas collision
			return false;
		}
		
		
		circle.centre.x += diffMin * normalMin.x;
		circle.centre.y += diffMin * normalMin.y;
		var vitToRemove = circle.vit.dot(normalMin);
		circle.vit.sub(normalMin.getScale(1*vitToRemove));

		return true;
}
