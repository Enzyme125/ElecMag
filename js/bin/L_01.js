// 洛伦兹力 ， 分步演示
var particles = [{
		v: [30, 0],
		pos: [0, -30],
		q: 1,
		m: 0.1,

},
];
var mag = [{
	b: function(p) {
		if(p.pos[0] > 0 && p.pos[1] < 0) {
			return 0.13;
		}
		return 0;
	}
},
{
	b: function(p){
		if(p.pos[0] < 0)return 0.07;
		return 0;
	}
}
		
];
var elec = [{
	e: function(p) {
		if(p.pos[1] > 0 && p.pos[0] >= 0) return [-2.2,0];
		else return [0,0];
	}
}, ];