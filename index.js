
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;

var RADIUS = 8;
var MARGIN_LEFT = 30;
var MARGIN_TOP = 40;

// 原因是得到的num值是大于9的，超出了数组的范围，为什么会大于9呢？因为我们要做的倒计时时分秒都是两位数的，所以要控制在四天之内(100/24=4)，不然num值会大于9。
var endTime = new Date(2017, 4, 5, 18, 47, 52);         //截止时间
console.log(endTime);
var curShowTimeSeconds = 0;

window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    var cxt = canvas.getContext("2d");
    curShowTimeSeconds = getCurShowTimeSeconds();



    setInterval(function () {
    render(cxt);
    update()
 }, 500)

}


//获取现在时间距离截止时间的的  时差
function getCurShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();    //时差毫秒
    ret = Math.round(ret / 1000);   //转化成秒

    return ret > 0 ? ret : 0;

}


function update(){
    var nextShowTimeSeconds=getCurShowTimeSeconds();
        var nextHrs = parseInt(nextShowTimeSeconds / 3600);
    var nextMin = parseInt((nextShowTimeSeconds - nextHrs * 3600) / 60);
    var nextSed = nextShowTimeSeconds % 60;


   var curHrs = parseInt(curShowTimeSeconds / 3600);
    var curMin = parseInt((curShowTimeSeconds - curHrs * 3600) / 60)
    var curSed = curShowTimeSeconds % 60

    if(nextSed!=curSed){
        curShowTimeSeconds=nextShowTimeSeconds;
    }
}

function render(cxt) {

        cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
    var hrs = parseInt(curShowTimeSeconds / 3600);
    var min = parseInt((curShowTimeSeconds - hrs * 3600) / 60)
    var sed = curShowTimeSeconds % 60
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hrs / 10), cxt)   //绘制第一个数字
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hrs % 10), cxt)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(min / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(min % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(sed / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(sed % 10), cxt);


}
//每个小圆点的中心位置


function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = 'rgb(0,102,153)';
    console.log(3);
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath()

                cxt.fill()
            }
        }
    }
}





