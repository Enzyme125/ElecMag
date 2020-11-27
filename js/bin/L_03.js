// 旋转圆
var particles = [];
var mag = [{
	b: function(p) {
		if(vectorLength(vectorTo(p.pos,[300,30])) <= 70)return 0.035;
		return 0;
	}
}
		
];
var elec = [];
var vx = [20,0];

for(var i = 0;i < 90;i++){
	particles.push({
		v: vectorRotate(vx,i * Math.PI / 90),
		pos: [300, -39],
		q: 1,
		m: 0.1,
	});
}
