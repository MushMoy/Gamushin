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
	
var SoundSystem = function() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = this.context = new AudioContext();
	this.gainNodeMusic = this.context.createGain();
	this.gainNodeSound = this.context.createGain();
	this.gainNodeSound.gain.value = 0.1;
	this.gainNodeMusic.gain.value = 0.3;
	this.musicSource = this.context.createBufferSource();
	this.soundEffects = [];
	this.isPlayingMusic = false;
	this.isFading = false;
	this.musicStack = [];
	// One-liner to resume playback when user interacted with the page.
	document.querySelector('button').addEventListener('click', function() {
		context.resume().then(() => {
			console.log('Playback resumed successfully');
		});
	});
};



SoundSystem.prototype.update = function(g) {
	for(var i=0;i<this.soundEffects.length;i++) {
		if(!this.soundEffects[i].update(g)) {
			this.soundEffects.splice(i,1);
			i--;
			this.nextStack();
		}
	}
};
SoundSystem.prototype.addStack = function(g,fade,timer,buffer) {
	// buffer optionnel
	if(this.musicStack == 0){
		if(fade == "fadeout"){
			this.addSndEffect(new FadeOutMusic(g,timer));
		}
		else if(fade == "fadein"){
			this.play(buffer,"music");
			this.addSndEffect(new FadeInMusic(g,timer));
		}
	}
	else if(this.musicStack > 0){
		if(fade == "fadeout"){
			this.musicStack.push({
				id: "fadeout",
				timer: timer
			});
		}
		else if(fade == "fadein"){
			this.musicStack.push({
				id: "fadein",
				timer: timer,
				buffer: buffer
			});
		}
	}
};
SoundSystem.prototype.nextStack = function(g) {
	if(this.musicStack < 0){
		this.musicStack.splice(0,1);
		if(this.musicStack < 0){
			if(this.musicStack[0].id == "fadeout"){
				this.addSndEffect(new FadeOutMusic(g,this.musicStack[0].timer));
			}
			else if(this.musicStack[0].id == "fadein"){
				this.play(this.musicStack[0].buffer,"music");
				this.addSndEffect(new FadeInMusic(g,this.musicStack[0].timer));
			}
		}
	}
};
SoundSystem.prototype.addSndEffect = function(obj) {
	this.soundEffects.push(obj);
};
SoundSystem.prototype.play = function(buffer,type) {
	if(type == "sound"){
		var source = this.context.createBufferSource();
		source.buffer = buffer;
		source.connect(this.gainNodeSound);
		this.gainNodeSound.connect(this.context.destination);
		source.start(0);
	}
	else if(type == "music"){
		// Ne pas lancer plusieurs musiques en même temps: on ne peu pas les couper toutes
		if(!this.isPlayingMusic){
			console.log('play');
			this.isPlayingMusic = true;
			this.musicSource = this.context.createBufferSource();
			this.musicSource.buffer = buffer;
			this.musicSource.loop = true;
			this.musicSource.connect(this.gainNodeMusic);
			this.gainNodeMusic.connect(this.context.destination);
			this.musicSource.start(0);
		}
	}
};
SoundSystem.prototype.stopMusic = function() {
	if(this.isPlayingMusic){
		this.musicSource.stop ? this.musicSource.stop(0) : this.musicSource.noteOff(0);
		this.isPlayingMusic = false;
		console.log('stop');
	}
};
SoundSystem.prototype.load = function(g,ls,url,dest) { // ls = loadstate
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	var that = this;

	request.onload = function() {
		that.context.decodeAudioData(request.response, function(buffer){
			g.assets[dest] = buffer;
			ls.isLoadNDecode();
		});
	};
	request.send();
};

var FadeInMusic = function(g,timer) {
	console.log('fadein');
	this.timer = (timer)?timer: 5;
	this.ratio = g.audio.gainNodeMusic.gain.value/this.timer;
	this.isFading = true;
	this.originalVolume = g.audio.gainNodeMusic.gain.value;
	g.audio.gainNodeMusic.gain.value = 0;
};
FadeInMusic.prototype.update = function(g) {
	g.audio.gainNodeMusic.gain.value += this.ratio;
	if(this.timer == 0) {
		g.audio.gainNodeMusic.gain.value = this.originalVolume;
		return false;
	}
	else
	{
		this.timer--;
		return true;
	}
};

var FadeOutMusic = function(g,timer) {
	console.log('fadeout');
	this.timer = (timer)?timer: 5;
	this.ratio = g.audio.gainNodeMusic.gain.value/this.timer;
	this.isFading = true;
	this.originalVolume = g.audio.gainNodeMusic.gain.value;
};
FadeOutMusic.prototype.update = function(g) {
	g.audio.gainNodeMusic.gain.value -= this.ratio;
	if(this.timer == 0) {
		g.audio.stopMusic();
		g.audio.gainNodeMusic.gain.value = this.originalVolume;
		return false;
	}
	else
	{
		this.timer--;
		return true;
	}
};
