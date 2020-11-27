// ¶þ´Î´ò°å.
var particles = [];
var mag = [{
	b: function(p) {
		if(vectorLength(vectorTo(p.pos,[0,37.5])) <= 37.5)return -p.m * vectorLength(p.v) / (p.q * 37.5);
		return 0;
	}
},
{
	b: function(p) {
		if(p.pos[1] <= 0) return p.m * vectorLength(p.v) / 75 / p.q;
		else return 0;
	}
}
		
];
var elec = [];

for(var i = 0;i < 75;i++){
	particles.push({
		id: i,
		ok: 0,
		v: [60,0],
		pos: [-130, i],
		q: 1,
		m: 0.1,
	});
}
