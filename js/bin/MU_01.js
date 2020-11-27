
var D = 120;
var V = 25;
var R1 = 30;
var R2 = 3000;
var size = 4;
var particles = [];


for(var i = 0;i <= size;i++){
	var angle = Math.PI / 2;
	var range = Math.PI / 6;
	var offset = i - size / 2;
	var ax = angle + range / size * offset;
	console.log(ax);
	particles.push({
		v: [Math.cos(ax) * V,Math.sin(ax) * V],
		pos: [D,0],
		q:1,
		m:2,
	})
}





var mag = [];
var elec = [
	{
		e: function(p){

			var r = vectorLength(vectorTo(p.pos,[0,0]));
			if(r > R2 || r < R1) return [0,0];
			var E = p.m * V * V / p.q / r * 2.3;
			return [-p.pos[0] / r * E,-p.pos[1] / r * E];
		}
	}
];
