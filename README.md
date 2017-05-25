#wuhulala-flow

>一款手动绘制的cavans流程图 支持横竖线以及文本框

[demo](https://wuhulala.github.io/flow/)
```javascript 1.5
var defaultStyle = new Style("#66CC66", "#339933", "#ffffff");
    var activeStyle = new Style("#999966", "#CC9966", "#ffffff");

    var textBoxes = [];

    //====== 创建文本框 =======
    var textBox1 = new TextBox("流程节点6", 18, 5);
    var textBox2 = new TextBox("流程节点5", 18, 4);
    var textBox3 = new TextBox("流程节点4", 18, 3);
    var textBox4 = new TextBox("流程节点3", 18, 2);
    var textBox5 = new TextBox("流程节点1", 18, 1);
    var textBox6 = new TextBox("流程节点2", 18, 1);
    var textBox7 = new TextBox("流程节点3", 18, 1);

    //======== 自由设置文本框内容 ======
    textBox1.setInfo({"id":"asdasdasd"});

    //======= 注册文本框 =======
    textBoxes.push(textBox1);
    textBoxes.push(textBox2);
    textBoxes.push(textBox3);
    textBoxes.push(textBox4);
    textBoxes.push(textBox5);
    textBoxes.push(textBox6);
    textBoxes.push(textBox7);


    var flow = new FlowContext("myCanvas",textBoxes,function (textBox) {
        console.log(textBox);
    });

    //开启开发者模式，F12可以看到点击的位置，方便修改文本框位置
    flow.enableDevMode(20);

    //======= 添加文本框 =======
    flow.addWordFrame(textBox1, new Point(100, 410),defaultStyle);
    flow.addWordFrame(textBox2, new Point(100, 310),defaultStyle);
    flow.addWordFrame(textBox3, new Point(100, 210),defaultStyle);
    flow.addWordFrame(textBox4, new Point(100, 110),defaultStyle);
    flow.addWordFrame(textBox5, new Point(10, 10),defaultStyle);
    flow.addWordFrame(textBox6, new Point(210, 10),activeStyle);
    flow.addWordFrame(textBox7, new Point(410, 10),defaultStyle);

    //===== 添加竖线 ======
    flow.addLine(60, 44, 60, 70);
    flow.addLine(260, 44, 260, 70);
    flow.addLine(160, 70, 160, 106);
    flow.addLine(160, 144, 160, 206);
    flow.addLine(160, 244, 160, 306);
    flow.addLine(160, 344, 160, 406);



    //===== 添加横线 ======
    flow.addLine(60, 70, 260, 70);
```