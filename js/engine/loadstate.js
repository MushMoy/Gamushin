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
	
var LoadState = function() {
};

LoadState.prototype.init = function(g) {
	this.timer = 0;
	this.count = 0;
	this.countMax = 0;

	
	g.data = getData(g);
	g.config = getConfig(g);
	g.assets = getAssets(g,this);
	
};
LoadState.prototype.update = function(g) {
	this.timer += g.dt;
	console.log('loadstate');
	if(this.count == this.countMax){
		g.loadState(0);
	}
};
LoadState.prototype.render = function(g) {
	
};
LoadState.prototype.addImg = function(src) {
	this.countMax++;
	var img=new Image();
	img.src=src;
	var that = this;
	img.onload = function(){
		that.count++;
	};
	return img;
};
LoadState.prototype.addAudio = function(g,url,nom) {
	this.countMax++;
	g.audio.load(g,this,url,nom);
};
LoadState.prototype.isLoadNDecode = function() {
	this.count++;
};