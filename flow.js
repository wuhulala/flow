// -----------------------------------------------
// @param id  canvas的id
// @param textBoxes  所有文本框
// @param callback  文本框默认点击函数处理
//------------------------------------------------
function FlowContext(id, textBoxes, callback) {
    //是否开启开发者模式。开启之后点击点可以看出canvas坐标
    this.devMode = false;
    var canvas = document.getElementById(id);
    this.width = canvas.width;
    this.height = canvas.height;
    var ctx = canvas.getContext("2d");
    var flow = this;

    //==== 点击判断是否需要重新绘制 =====
    canvas.onclick = function (e) {
        //console.log(windowToCanvas(e));
        flow.showCurrentTextBox(callback);

        if (flow.devMode) {
            console.log(flow.windowToCanvas(e));
        }
    };


    //--------------------
    // 绘制线
    //--------------------
    this.addLine = function (startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(255,128,0,0.5)';
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    };


    //--------------------
    // 绘制文本框
    //--------------------
    this.addWordFrame = function (textBox, drawPoint, nowStyle) {
        var word = textBox.word;
        var fontSize = textBox.fontSize;

        var wordLength = word.length + 1;

        var w = wordLength * fontSize;
        var h = fontSize + 10;
        ctx.fillStyle = nowStyle.borderColor;
        ctx.fillRect(drawPoint.x - 4, drawPoint.y - 4, w + 8, h + 8);

        ctx.clearRect(drawPoint.x - 2, drawPoint.y - 2, w + 4, h + 4);

        //长方形
        ctx.fillStyle = nowStyle.backgroundColor;
        ctx.fillRect(drawPoint.x, drawPoint.y, w, h);

        //文字
        ctx.fillStyle = nowStyle.fontColor;
        ctx.font = fontSize + "px Arial";
        ctx.fillText(word, drawPoint.x + fontSize / 2 + 5, drawPoint.y + fontSize / 2 + 10);
        var startPoint = new Point(drawPoint.x - 4, drawPoint.y - 4);
        var endPoint = new Point(drawPoint.x + w + 4, drawPoint.y + 4 + h);
        textBox.setAllPoint(startPoint, endPoint, drawPoint);

    };


    //==== 计算canvas上面的坐标 =====
    this.windowToCanvas = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        var point = canvas.getBoundingClientRect();

        x = Math.round(x - point.left);
        y = Math.round(y - point.top);
        return new Point(x, y);
    };


    this.showCurrentTextBox = function (callback) {
        for (var i = 0; i < textBoxes.length; i++) {
            var textBox = textBoxes[i];
            if (textBox.isInside(this.windowToCanvas(event))) {
                /*if (!textBox.isActive) {
                 this.clearAllActiveTextBox();
                 textBox.setActiveState(true);
                 }*/
                callback(textBox);

            }
        }
        /*for (i = 0; i < textBoxes.length; i++) {
         this.addWordFrame(textBoxes[i], textBoxes[i].drawPoint);
         }*/
    };

    //-------------------------
    // 重置文本框
    //-------------------------
    this.resetTextBox = function (textBox) {
        this.addWordFrame(textBox, textBox.drawPoint);
    };

    //-------------------------
    // 清空所有active样式
    //-------------------------
    this.clearAllActiveTextBox = function () {
        for (var i = 0; i < textBoxes.length; i++) {
            textBoxes[i].setActiveState(false);
        }
    };
    //----------------------
    //--- 绘制网格
    //----------------------
    this.drawGrid = function(cellLength) {
        for (var i = 0; i < this.width ; i += cellLength) {
            this.addThickLine(i, 0, i, this.height);
        }
        for (var i = 0; i < this.height ; i += cellLength) {
            this.addThickLine(0, i , this.width ,i);
        }
    };

    //--------------------
    // 绘制线
    //--------------------
    this.addThickLine = function (startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,0,0,0.5)';
        ctx.lineTo(endX, endY);
        ctx.stroke();
    };


    //------------------------
    // 开启开发者模式
    // @param cellLength 网格单元格大小
    //------------------------
    this.enableDevMode = function (cellLength) {

        console.log("开发者模式开启");
        this.devMode = true;
        this.drawGrid(cellLength);

    }
}


//-------------------------
// 坐标
//-------------------------
function Point(x, y) {
    this.x = x;
    this.y = y;
}

//-------------------------
// 样式对象
// @param fontColor 字体颜色
// @param backgroundColor 背景颜色
// @param borderColor 边框颜色
//-------------------------

function Style(borderColor, backgroundColor, fontColor) {
    this.fontColor = fontColor;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
}

//-------------------------
// 文本框对象
//
// @param word 文字
// @param fontSize 字体大小
// @param level 级别 暂时还没用
//-------------------------
function TextBox(word, fontSize, level) {
    this.word = word;
    this.fontSize = fontSize;
    this.level = level;
    this.startPoint = new Point(0, 0);
    this.endPoint = new Point(0, 0);
    this.drawPoint = new Point(0, 0);
    this.isActive = false;
    this.info = {};

    this.setStartPoint = function (startPoint) {
        this.startPoint = startPoint;
    };
    this.setEndPoint = function (endPoint) {
        this.endPoint = endPoint;
    };

    this.setStartEndPoint = function (startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    };

    this.setAllPoint = function (startPoint, endPoint, drawPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.drawPoint = drawPoint;
    };

    this.setActiveState = function (activeState) {
        this.isActive = activeState;
    };

    this.setInfo = function (info) {
        this.info = info;
    };

    this.isInside = function (point) {
        return !(point.x < this.startPoint.x || point.x > this.endPoint.x || point.y < this.startPoint.y || point.y > this.endPoint.y);
    };
}