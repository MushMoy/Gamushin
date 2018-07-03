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
	
var Map = function(g,manager,cam,tileMap) {
	this.map = tileMap.data;
	this.objectManager = manager;
	this.width = tileMap.width;
	this.height = tileMap.height;
	this.spriteSheet = g.assets.map[tileMap.refSpriteSheet];
	this.spriteSheetWidth =( this.spriteSheet.img.width / this.spriteSheet.tilesWidth)|0;
	this.nHeight = (cam.screenHeight / this.spriteSheet.tilesHeight)|0 +1;
	this.nWidth = (cam.screenWidth  / this.spriteSheet.tilesWidth)|0 +1;
	for(var i=tileMap.objects.length;i--;){
		this.objectManager.createObject( tileMap.objects[i] );
	}
	this.idMaxWall = 16;
};
Map.prototype.render = function(g,cam) {
	var idStart = this.getIdAtPos(cam.pos);
	var nWidth = this.nWidth;
	var nHeight = this.nHeight;
	var id=0;
	for(var y=0;y<nHeight+2;y++){
		for(var x=0;x<nWidth+1;x++){
			id = idStart+x;
			this.draw(g,cam,id);
		}
		idStart += this.width;
	}
};
Map.prototype.getIdAtPos = function(pos) {
	var id = ((pos.y/this.spriteSheet.tilesHeight)|0)*this.width + (pos.x/this.spriteSheet.tilesWidth)|0;
	return id;
};
Map.prototype.getPosAtId = function(id) {
	var pos = new Vector2( 0,0);
	pos.x = (id%this.width) * this.spriteSheet.tilesWidth; 
	pos.y = ((id/this.width)|0) * this.spriteSheet.tilesHeight;
	//magie le retour
	return pos;
};
Map.prototype.draw = function(g,cam,id) {
	var idTiles = this.map[id];
	var pos = this.getPosAtId(id);
	pos.sub(cam.pos);
	
	var sx = (idTiles% this.spriteSheetWidth)*this.spriteSheet.tilesWidth;
	var sy = ((idTiles/ this.spriteSheetWidth) |0)*this.spriteSheet.tilesWidth;
	g.context.drawImage( this.spriteSheet.img , 
							sx,sy ,this.spriteSheet.tilesWidth ,this.spriteSheet.tilesHeight ,
							pos.x|0 ,pos.y|0 ,this.spriteSheet.tilesWidth ,this.spriteSheet.tilesHeight );
};
Map.prototype.isWall = function(id) {
	return (this.map[id] <= this.idMaxWall);
};
Map.prototype.raycast = function(origin,direction,dMax) {
	var pos = origin.copy();
	var currentID = this.getIdAtPos(origin);
	var nextPos = new Vector2(0,0);
	nextPos.x = (direction.x < 0)? (currentID%this.width) * this.spriteSheet.tilesWidth :((currentID%this.width)+1) * this.spriteSheet.tilesWidth ;
	nextPos.y = (direction.y < 0)? ((currentID/this.width)|0) * this.spriteSheet.tilesHeight:(((currentID/this.width)|0)+1) * this.spriteSheet.tilesHeight;
	var flag = true;
	var dX =0;
	var dY =0;
	var dMaxSquare = dMax*dMax;
	var stepX = (direction.x < 0)?-1:1;
	var stepY = (direction.y<0)?-this.width:this.width;
	while(flag) {
		dX = nextPos.x - pos.x;
		dY = nextPos.y - pos.y;
		dX = dX/direction.x;
		dY = dY/direction.y;
		if(dX < dY) {
			//next case en X
			pos.x = nextPos.x;
			pos.y += dX*direction.y;
			// (currentID%this.width) +1 < this.width )
			currentID += stepX;
			if(this.isWall(currentID)) {
				flag = false;
			}
		}
		else {
			pos.y = nextPos.y;
			pos.x += dY*direction.x;
			//next case en Y
			// if( currentID+this.width < this.map.length ) {
			currentID += stepY;
			if(this.isWall(currentID)) {
				flag = false;
			}
		}
		nextPos.x = (direction.x < 0)? (currentID%this.width) * this.spriteSheet.tilesWidth :((currentID%this.width)+1) * this.spriteSheet.tilesWidth ;
		nextPos.y = (direction.y < 0)? ((currentID/this.width)|0) * this.spriteSheet.tilesHeight:(((currentID/this.width)|0)+1) * this.spriteSheet.tilesHeight;
		if( pos.getSub(origin).getNormSquare() > dMaxSquare) {
			flag = false;
			pos.x = origin.x + dMax * direction.x;
			pos.y = origin.y + dMax * direction.y;
		}
	}
	return pos;
};
Map.prototype.simpleRaycast = function(origin,direction,dMax) {
	var pos = origin.copy();
	var flag = true;
	var id = 0;
	while(flag) {
		pos.sum(direction);
		id = this.getIdAtPos(pos);
		if(this.isWall(id)) {
			flag = false;
		}
	}
	return pos;
};
Map.prototype.setPosMinMaxCam = function(cam) {
	cam.posMin.set(0,0);
	cam.posMax.set((this.width)*this.spriteSheet.tilesWidth,(this.height)*this.spriteSheet.tilesWidth);
};
