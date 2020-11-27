// 缩放圆
var particles = [{
		v: [20, 0],
		pos: [0, 30],
		q: 1,
		m: 0.1,

},
];
var mag = [{
	b: function(p) {
		if(vectorLength(vectorTo(p.pos,[300,30])) <= 70)return 0.35;
		return 0;
	}
}
		
];
var elec = [];

for(var i = 0;i < 300;i++){
	particles.push({
		v: [20 + i * 3, 0],
		pos: [0, 30],
		q: 1,
		m: 0.1,
	});
}
