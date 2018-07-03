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
	
var SpriteSheet = function(config,rep) {
	this.anims = config.anim;
	this.spriteSheet = config.spriteSheet;
	this.spriteSheet.width = (config.spriteSheet.img.width / config.spriteSheet.widthSprite)|0;
	this.imgDec = this.spriteSheet.imgDec ;
	this.repere = rep;
	this.animID = 0;
	this.t = 0;
	this.currentAnim = config.anim.idle;
	this.currentAnimKey = "idle";
};
SpriteSheet.prototype.render = function(g,cam,dir) {
	var widthSprite = this.spriteSheet.widthSprite;
	var heightSprite = this.spriteSheet.heightSprite;
	var id = this.animID;
	var widthSheet = (this.spriteSheet.img.width / this.spriteSheet.widthSprite)|0;
	if(dir === 1) {
	g.context.drawImage(this.spriteSheet.img, (id%widthSheet)*widthSprite, ((id/widthSheet)|0)*heightSprite,
							widthSprite , heightSprite ,
							this.repere.x- cam.pos.x-this.imgDec.x ,this.repere.y - cam.pos.y -this.imgDec.y,
							widthSprite,heightSprite);
	}
	else {
		g.context.save();
		g.context.scale(-1,1);
		g.context.drawImage(this.spriteSheet.img,(id%widthSheet)*widthSprite, ((id/widthSheet)|0)*heightSprite,
							widthSprite , heightSprite ,-(this.repere.x- cam.pos.x-this.imgDec.x) ,this.repere.y - cam.pos.y -this.imgDec.y,
							-widthSprite,heightSprite);
		g.context.restore();
	}
	this.t++;
	if(this.t%((60/this.currentAnim.FPS)|0)==0) { this.animID++;};
	if(this.animID >= this.currentAnim.idEnd) {
		this.animID = (this.currentAnim.loop)?this.currentAnim.idStart:this.currentAnim.idEnd;
	}	
};
SpriteSheet.prototype.loadAnim = function(key)  {
	if(this.anims[key] && key != this.currentAnimKey) {
	
		this.currentAnimKey = key;
		this.currentAnim = this.anims[key];
		this.animID = this.currentAnim.idStart;
	}
};
