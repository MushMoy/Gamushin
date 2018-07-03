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
	
var Backgrd = function(g,key) {
	this.buffer = document.createElement('canvas');
	this.width = this.buffer.width = g.canvasWidth;
	this.height = this.buffer.height = g.canvasHeight;
	this.ctx = this.buffer.getContext('2d');
	this.draw(key);
};
Backgrd.prototype.render = function(g){
	g.context.drawImage(this.buffer,0,0);
};
Backgrd.prototype.draw = function(key) {
	if(BgLists[key]) {
		BgLists[key](this.ctx,this.width,this.height);
	}
	else {
		BgLists.black(this.ctx,this.width,this.height);
	}
};

var BgLists = { black:function(ctx,w,h) {
						ctx.fillStyle="#000010";
						ctx.fillRect(0,0,w,h);
					},
				green:function(ctx,w,h) {
					ctx.fillStyle="#00ff00";
					ctx.fillRect(0,0,w,h);
				}
				,iceRect:function(ctx,w,h) {
						ctx.fillStyle="#000010";
						ctx.fillRect(0,0,w,h);
						ctx.globalAlpha = 0.5;
						for(var i=3000;i--;) {
							ctx.fillStyle='rgb(0,'+((Math.random()*230+10)|0)+',255)';
							ctx.fillRect(Math.random()*w,Math.random()*h,Math.random()*200,Math.random()*600);
						}
					},
				western: function(ctx,w,h) {
					ctx.fillStyle="#F4AE70";
					ctx.fillRect(0,0,w,h);
					ctx.fillStyle='#EF8C44';
					ctx.fillRect(0,h*2/3,w,h/3);
					ctx.fillStyle ='#d81e05';
					ctx.globalAlpha=0.1;
					var hTmp = (h*3/6)|0;
					for(var i =hTmp;i--;) {
						ctx.globalAlpha = (hTmp-i)/(hTmp*2.75);
						ctx.fillRect( w/2-Math.sqrt(hTmp*hTmp-i*i) + Math.sin(i/15)*7*Math.cos(i*Math.PI/(2*hTmp)), 2*h/3-i*2/3 ,Math.sqrt(hTmp*hTmp-i*i)*2-Math.sin(i/15)*7*2*Math.cos(i*Math.PI/(2*hTmp)) , 1);
					}
					
					
					
					
					ctx.fillStyle='#ffffff';
					ctx.globalAlpha = 0.01;
					for(var i = 40;i--;) {
						ctx.fillRect( 0 ,h*2/3-i*i/20 , w , i*i * 2/20);
					}
				},
				westernMoche: function(ctx,w,h) {
					ctx.fillStyle="#F4AE70";
					ctx.fillRect(0,0,w,h);
					ctx.fillStyle='#EF8C44';
					ctx.fillRect(0,h*2/3,w,h/3);
					
					// Sand
					ctx.globalAlpha = 0.5;
					ctx.fillStyle='#F47407';
					for(var i=3000;i--;) {
						ctx.fillRect((Math.random()*w)|0,(h*(2/3+Math.random()/3))|0,2,2);
					}
					ctx.fillStyle='#8D4402';
					for(var i=3000;i--;) {
						ctx.fillRect((Math.random()*w)|0,(h*(2/3+Math.random()/3))|0,1,1);
					}

					ctx.fillStyle ='#d81e05';
					ctx.globalAlpha=0.2;
					var hTmp = (h*2/3)|0;
					for(var i =hTmp;i--;) {
						ctx.globalAlpha = (i)/(hTmp*2);
						ctx.fillRect( Math.cos(i/4)*100+Math.cos(i/20)*100+i*2/3, i ,w-Math.cos(i/20)*200 - i*4/3 , 1);
					}
					ctx.fillStyle ='#F4AE70';
					ctx.globalAlpha=0.1;
					var hTmp = (h*2/3)|0;
					for(var i =hTmp;i--;) {
						ctx.globalAlpha = (hTmp-i)/(hTmp*2);
						ctx.fillRect( Math.cos(i*2)*50+Math.cos(i/40)*50+i*4/3, i ,w-Math.cos(i/40)*100 - i*8/3 , 1);
					}
					ctx.fillStyle='#ffffff';
					ctx.globalAlpha = 0.01;
					for(var i = 40;i--;) {
						ctx.fillRect( 0 ,h*2/3-i*2 , w , i * 4);
					}
				}
				};
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				