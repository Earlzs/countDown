var WINDOW_WIDTH = 1024;               //屏幕宽度
var WINDOW_HEIGHT = 700;               //屏幕高度
var curShowTimeSeconds = 0;            //当前的时间

var RADIUS = 8;                        //小球的半径
var MARGIN_LEFT = 30;                  //左外边距
var MARGIN_TOP = 40;                   //上边距

var balls = [];                        //生成　散落小球的数组
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]　    //生成小球的随机色；

// 原因是得到的num值是大于9的，超出了数组的范围，为什么会大于9呢？因为我们要做的倒计时时分秒都是两位数的，所以要控制在四天之内(100/24=4)，不然num值会大于9。
var endTime = new Date(2017, 4, 5, 18, 47, 52);         //截止时间
console.log(endTime);

//获取现在时间 距离截止时间的时差
function getCurShowTimeSeconds() {
    var curTime = new Date(2017, 4, 3, 18, 66, 18);
    var ret = endTime.getTime() - curTime.getTime();    //时差毫秒
    ret = Math.round(ret / 1000);   //转化成秒
    return ret > 0 ? ret : 0;
}

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var cxt = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    curShowTimeSeconds = getCurShowTimeSeconds();
    setInterval(function () {
        render(cxt);
        update()
    }, 50)

}


/**
 * 
 * @param {*} cxt  传入的上下文环境
 */
function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)               //canvas是不断重绘的过程，每次render的时候清楚画布
    var hrs = parseInt(curShowTimeSeconds / 3600);                 //小时
    var min = parseInt((curShowTimeSeconds - hrs * 3600) / 60)     //分钟
    var sed = curShowTimeSeconds % 60                              //秒

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hrs / 10), cxt)  //绘制第一个数字
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hrs % 10), cxt)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(min / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(min % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(sed / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(sed % 10), cxt);

    //彩色球的绘制
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath()
        cxt.fill()
    }
}



// 更新时间
function update() {
    //重新获得一下时间            因为update是在setInterval里面所以现在的时间变了
    var nextShowTimeSeconds = getCurShowTimeSeconds();    
    //重新获得时间的小时分钟秒     
    var nextHrs = parseInt(nextShowTimeSeconds / 3600);
    var nextMin = parseInt((nextShowTimeSeconds - nextHrs * 3600) / 60);
    var nextSed = nextShowTimeSeconds % 60;
    //获得之前的设定的时间
    var curHrs = parseInt(curShowTimeSeconds / 3600);
    var curMin = parseInt((curShowTimeSeconds - curHrs * 3600) / 60);
    var curSed = curShowTimeSeconds % 60;
    //如果时间发生了改变    判断其秒针是否改变就可以了
    if (nextSed != curSed) {   

        //一下是针对各个位置时间显示判断是否要在其对应的位置绘制七彩小球
        if (parseInt(curHrs / 10) != parseInt(nextHrs / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHrs / 10));
        }
        if (parseInt(curHrs % 10) != parseInt(nextHrs % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHrs / 10));
        }
        if (parseInt(curMin / 10) != parseInt(nextMin / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMin / 10));
        }
        if (parseInt(curMin % 10) != parseInt(nextMin % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMin / 10));
        }
        if (parseInt(curSed / 10) != parseInt(nextSed / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSed / 10));
        }
        if (parseInt(curSed % 10) != parseInt(nextSed % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSed / 10));
        }
        //将next的时间赋给cur
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}


//下落小球的状态改变
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75
        }
    }
}

//绘制在原来位置基础上下落的七彩小球
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),//球的x位置
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),//球的y位置
                    g: 1.5 + Math.random(),//加速度
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, //   -1 的多少次方
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}


function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                cxt.closePath()
                cxt.fill()
            }
}



