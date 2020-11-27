var strength = 1;

function drawLine(a,b){
	cxt.beginPath();
	cxt.lineWidth = 1;
	var style = "rgb(" + 255 * strength + ","  + 255 * strength + "," + 255 * strength+ ")";
	cxt.strokeStyle = style;
	cxt.moveTo(a[0],a[1]);
	cxt.lineTo(b[0],b[1]);
	cxt.stroke();
	cxt.closePath();
}
function drawMagX(x,y){
	drawLine([x - magXsize,y - magXsize],[x + magXsize,y + magXsize]);
	drawLine([x - magXsize,y + magXsize],[x + magXsize,y - magXsize]);
}


function drawMagPoint(x,y){
	cxt.beginPath();
	var style = "rgb(" + 255 * strength + ","  + 255 * strength + "," + 255 * strength + ")";
	cxt.strokeStyle = style;
	cxt.arc(x, y, 1, 0, 2 * Math.PI);
	cxt.fillStyle = style;
	cxt.fill();
	cxt.stroke();
	cxt.closePath();
}

function drawArrow(a,b){
	drawLine(a,b);
	var d = vectorTo(a,b),l = vectorLength(d);
	d[0] /= l,d[1] /= l;
	d = vectorRotate(d,-Math.PI / 4);
	drawLine(b,[b[0] - d[0] * arrowAdj,b[1] - d[1] * arrowAdj]);
	d = vectorRotate(d,Math.PI / 2);
	drawLine(b,[b[0] - d[0] *arrowAdj,b[1] - d[1] *arrowAdj]);
}
function drawMag(){
	for(mg in mag){
		var x = mag[mg];
		for(var i = 0;i < worldWidth;i += magCstep){
			for(var j = 0;j < worldHeight;j += magCstep){
				var xx = (i - worldWidth / 2) * scale;
				var yy = -(j - worldHeight / 2) * scale;
				var bx = x.b({
					v: [20, 0],
					pos: [xx, yy],
					q: 1,
					m: 0.1,
				});
				if(bx > 0){
					drawMagX(i,j);
				} else if(bx < 0)drawMagPoint(i,j);
			}
		}
	}
}
function drawElec(){
	var maxd = -1;
	for(el in elec){
		var x = elec[el];
		for(var i = 0;i < worldWidth;i += eleCstep){
			for(var j = 0;j < worldHeight;j += eleCstep){
				var xx = (i - worldWidth / 2) * scale;
				var yy = -(j - worldHeight / 2) * scale;
				var ex = x.e({
					v: [20, 0],
					pos: [xx, yy],
					q: 1,
					m: 0.1,
				});

				var d = vectorLength(ex);
				if(maxd < d) maxd = d;
			}
		}
	}
	for(el in elec){
		var x = elec[el];
		for(var i = 0;i < worldWidth;i += eleCstep){
			for(var j = 0;j < worldHeight;j += eleCstep){
				var xx = (i - worldWidth / 2) * scale;
				var yy = -(j - worldHeight / 2) * scale;
				var ex = x.e({
					v: [20, 0],
					pos: [xx, yy],
					q: 1,
					m: 0.1,
				});

				var d = vectorLength(ex);
				strength = d / maxd;
				if(d != 0){
					drawArrow([i,j],[i + ex[0] / d * arrowLength,j - ex[1] / d *arrowLength]);
				}
			}
		}
	}
}
function drawAxis(){
	drawLine([0,worldHeight/2],[worldWidth * 3,worldHeight / 2]);
	drawLine([worldWidth / 2,0],[worldWidth / 2,worldHeight * 3]);
}

function drawParticle(p) {
	cxt.beginPath();
	cxt.strokeStyle = "#FFFFFF";
	cxt.arc(p.pos[0]/scale  + worldWidth / 2, -p.pos[1]/scale + worldHeight / 2, 0.1, 0, 2 * Math.PI);
	cxt.fillStyle = "#FFFFFF";
	cxt.fill();
	cxt.stroke();
}

function rend(){

	if(showMag && !lazyMode)drawMag();
	if(showEle && !lazyMode)drawElec();
	for(p in particles){
		drawParticle(particles[p]);
	}
}
