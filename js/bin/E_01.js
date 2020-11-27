// 电场和磁场的叠加。
var particles = [{
		v: [90, 0],
		pos: [0, -30],
		q: 1,
		m: 0.1,

},
];
var mag = [{
	b: function(p) {
		return 0.313;
	}
}
];
var elec = [{
	e: function(p) {
		return [-3.3,0];
	}
}, ];