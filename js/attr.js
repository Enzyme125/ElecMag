/* ----- global ----- */
var worldHeight = 0;
var worldWidth = 0;

/* ----- engine ------ */
var enableGravity = 1; // 允许万有引力 0 代表不允许，否则为倍数.
var graviryG = 1000; // 万有引力G

var enableComb = 0; // 允许库仑力
var electronicK = 1; // 静电力常量

var tickTime = 200;
// 模拟时间，秒数分之一 ，1000代表千分之一秒。

/* ----- render ------ */
var scale = 1; // 放大倍数
var enableTrack = 1; // 留下轨迹
// 此项设置为0将在绘制轨迹之前清屏.
var lazyMode = 1;
// 仅仅在起始刻画出电磁场，不再刷新以节约性能
// 如果不开启此项，会在每刻重新绘制电磁场，某些对时间要求严格的场绘制请将此项设置为0
// 开启此项将有大量的CPU负担。 且不保证时间精度。

var showMag = 1; // 画出磁场
var magXsize = 3; // x 符号的大小
var magPsize = 1; // . 符号的大小
var magCstep = 14; // 磁场检验子的步长

var showEle = 1; // 画出电场
var arrowAdj = 3; // 箭头的修饰长
var arrowLength = 10; // 箭头长度 , 太长可能进入非电场区域.
var eleCstep = 15; // 检验电荷的步长
