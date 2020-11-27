// 原理我给你看一下
var pdone = function(p) {
	return 0;
}
// 这个函数返回a到b的一个矢量
function vectorTo(a,b){
	return [b[0] - a[0],b[1] - a[1]];
}
// 这个函数得到矢量的长度
function vectorLength(a){
	var x = a[0],y = a[1];
	return Math.sqrt(x * x + y * y);
}
// 这个函数处理矢量的旋转
function vectorRotate(a,f){
	var x = a[0];
	var y = a[1];
	var cos = Math.cos;
	var sin = Math.sin;
	return [x*cos(f) - y*sin(f),x*sin(f) + y*cos(f)];
	// 能理解吗？ 把向量(x,y)旋转f弧度
	// 得到 (xcosf - ysinf,xsinf + ycosf)
}
// 这个函数就是简单的加法。
function vectorAdd(a,b){
	return [a[0] + b[0],a[1] + b[1]];
}
function processParticle(p) {
	if(pdone(p) || p.ok) {
		if(p.pos[1] <= -60 && p.pos[1] >= -90 && !p.ok){
			console.log(p.id);
			p.ok = 1;
		}
		return;
	}
	var a = [0, 0]; // 加速度。
	var sumB = 0,
		sumE = 0;
	for(m in mag) {
		sumB += mag[m].b(p);
	} // 处理磁场叠加
	for(es in elec) {
		a[0] += (elec[es].e(p))[0] * p.q;
		a[1] += (elec[es].e(p))[1] * p.q;
	}
	for(par in particles) { // 粒子间作用力
		var p2 = particles[par];
		var r = Math.sqrt((p.pos[0] - p2.pos[0]) * (p.pos[0] - p2.pos[0]) + (p.pos[1] - p2.pos[1]) * (p.pos[1] - p2.pos[1]));
		// r 就是距离呀
		// sqrt 根号
		if(r == 0) {
			continue;
		}
		var f = 0,g = 0;
		if(enableComb)f = -electronicK * p2.q * p.q / (Math.pow(r,2));
		if(enableGravity)g = graviryG * p2.m * p.m / (Math.pow(r,2));
		var ff = [(p2.pos[0] - p.pos[0]), (p2.pos[1] - p.pos[1])]; // 方向向量
		a[0] += ff[0] * (f + g) / r; // 加上去，组成合力
		a[1] += ff[1] * (f + g) / r;
	}

//	a[0] -= p.v[1] * p.q * sumB;
//	a[1] += p.v[0] * p.q * sumB;
 	// 此处存在磁场做功的问题
	// 以下为重写磁场部分代码.
	// 将磁场的作用视为旋转作用
	// 这样的磁场不存在做功问题.
	var vx = p.v;
	var dx = [-p.v[1] * p.q * sumB / p.m /tickTime,p.v[0] * p.q * sumB / p.m/tickTime];
	var dd = vectorLength(dx);
	if(sumB < 0) dd = -dd;
	var ar = Math.atan2(dd,vectorLength(vx)); // 计算夹角
	p.v = vectorRotate(vx,ar); // 旋转
	// 其他力作用
	a[0] /= p.m;
	a[1] /= p.m; // 这里还要除以质量，变成真正的加速度
	var x = p.v[0] + a[0]/tickTime;
	var y = p.v[1] + a[1]/tickTime; // 然后加速度加上去
	p.pos[0] += p.v[0]/tickTime; // 新的速度再匀速运动一段时间，得到新的坐标
	p.pos[1] += p.v[1]/tickTime; // p.pos 就是位置
	p.v[0] = x;
	p.v[1] = y;
}

function clear(){
	if(!enableTrack)cxt.clearRect(0,0,worldWidth,worldHeight);
}
function tick() {
	clear();
	var temp = JSON.parse(JSON.stringify(particles));
	for(par in temp) {
		processParticle(temp[par]);
	}
	for(par in particles){
		particles[par] = temp[par];
	}
	rend();
}


function start(){
	drawAxis();
	if(showMag)drawMag();
	if(showEle)drawElec();
	setInterval("tick()",1000/tickTime);
}
