// 磁聚焦
var particles = [];
var mag = [{
	b: function(p) {
		if(vectorLength(vectorTo(p.pos,[300,30])) <= 70)return p.m * vectorLength(p.v) / (p.q * 70);
		return 0;
	}
}
		
];
var elec = [];

for(var i = -35;i < 65;i+=2){
	particles.push({
		v: [60,0],
		pos: [0, i],
		q: 1,
		m: 0.1,
	});
}
