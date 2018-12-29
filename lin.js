/*
根据id属性的值，返回对应的标签元素
@param id id属性的值 string类型
@return {Element}元素对象
*/
function my$(id){
  return document.getElementById(id);
}

//根据标签name属性值获取元素
function $name(name){
  return document.getElementsByName(name);
}

//根据标签名获取页面元素 拿到的是伪数组
function $Tn(name){
  return document.getElementsByTagName(name);
}

//根据class获取页面元素 拿到的是数组对象
function $Cls(cname){
  return document.getElementsByClassName(cname);
}

//下面两个是H5新增的，有的浏览器不支持
//根据选择器获取元素返回来的是一个元素对象
function $Em(elem){
  return document.querySelector(elem);
}

//根据选择获取元素，返回的是伪数组，保存多个DOM对象
function $All(elem){
  return document.querySelectorAll(elem);
}

//获取任意个父级元素的第一个子级元素
function $Fe(element){
  if(element.firstElementChild){//true-->支持
    return element.firstElementChild;
  }else{//针对IE8浏览器
    return element.firstChild;
    var node = element.firstChild;  //第一个节点
    while(node&&node.nodeType!=1){
      node = node.nextSibling;
    }
    return node;
  }
}

//获取任意一个父级元素的最后一个子级元素
function $Le(element){
 if(element.lastElementChild){//true-->支持
   return element.lastElementChild;
 }else{//针对IE8浏览器
   var node = element.lastChild;
   while(node&&node.nodeType!=1){
     node = node.previousSibling;
   }
   return node;
 }
}

//创建页面中的元素
function $Elem(elem){
  return document.createElement(elem);
 }

//为任意元素.绑定任意的事件, 任意的元素,事件的类型,事件处理函数
function $add(element,type,fn) {
  //判断浏览器是否支持这个方法
  if(element.addEventListener){
      element.addEventListener(type,fn,false);
  }else if(element.attachEvent){
      element.attachEvent("on"+type,fn);
  }else{
      element["on"+type] = fn;
  }
}

/*
* element---任意的元素
* attr---属性
* */
function getAttrValue(element,attr) {
  return element.currentStyle?element.currentStyle[attr]: window.getComputedStyle(element,null)[attr]||0;
}
/* 终极版本的动画函数---有bug
*
* */
function animate(element,json,fn) {
  clearInterval(element.timeId);
  element.timeId=setInterval(function () {
      var flag = true;  //假设都达到了目标
      for(var attr in json){
          if(attr=="opacity"){//判断属性是不是opacity
              var current = getAttrValue(element,attr)*100;
              //每次移动多少步
              var target = json[attr]*100;                           //直接赋值给一个变量,后面的代码都不用改
              var step   = (target-current)/10;                      //(目标-当前)/10
                  step   = step>0?Math.ceil(step):Math.floor(step);
                            current = current+step;
              element.style[attr]   = current/100;
          }else if(attr=="zIndex"){//判断属性是不是zIndex
              element.style[attr] = json[attr];
          }else{//普通的属性
              //获取当前的位置----getAttrValue(element,attr)获取的是字符串类型
              var current = parseInt(getAttrValue(element,attr))||0;
              //每次移动多少步
              var target = json[attr];                               //直接赋值给一个变量,后面的代码都不用改
              var step   = (target-current)/10;                      //(目标-当前)/10
                  step   = step>0?Math.ceil(step):Math.floor(step);
                            current = current+step;
              element.style[attr]   = current+"px";
          }
          if(current!=target){
              flag = false;  //如果没到目标结果就为false
          }
      }
      if(flag){//结果为true
          clearInterval(element.timeId);
          if(fn){//如果用户传入了回调的函数
              fn(); //就直接的调用,
          }
      }
    //  console.log("target:"+target+"current:"+current+"step:"+step);
  },10);
}

//设置滚动条监听
function getScroll(){
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft||document.body.scrollLeft,
    top : window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
  };
}
window.onscroll = function () {
 //console.log(getScroll().top)
}

  //解绑事件的内容
  //为任意的一个元素，解绑对应的事件
  function $remove(elem,type,fnName){
   if(elem,addEventListener){
     elem.removeEventListener(type,fnName,false);
   }else if(elem.attachEvent){
     elem.attachEvent("on"+type,fn)
   }else{
     elem["on"+type] = fn;
   }
 }

//判断浏览器是否支持这个方法
function getStyle(elemnt,attr){
  return window.getComputedStyle?window.getComputedStyle(elemnt,null)[attr]: elemnt.getComputedStyle[attr];
} 

//设置兼容代码
//设置任意的标签中间的任意文本内容
function setText(element,text){
  //判断浏览器是否支持这个属性
  if(typeof element.textContent == "undefined"){//不支持
      element.innerText = text;
  }else{//支持这个属性
      element.textContent = text;
  }
}

//获取任意标签中间的文本内容
function getText(element){
  if(typeof element.textContent=="undefined"){
    return element.innerText;
  }else{
    return element.textContent;
  }
}

//创建异步对象
//定义一个创建异步对象的函数，函数体内判断浏览器是否支持标准创建，如果支持返回标准创建，否则返回IE8以下的异步对象
function createXhr(){
  var xhr = null;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest()
  }else{
	xhr = new ActiveXObject("Microsoft.XMLHttp");
}
	return xhr;
}


//点击按钮，改变div多个样式属性值
 function ChangeStyle(btnObj,dvObj,json) {
  this.btnObj = btnObj;
  this.dvObj  = dvObj;
  this.json   = json;
}
ChangeStyle.prototype.init = function () {

  var that                = this;
      this.btnObj.onclick = function () {
    for(var key in that.json){
      that.dvObj.style[key] = that.json[key]
    }
  }
}
//实例化对象
var json = {"width":"500px","height":"500px","background":"yellow","opacity":"0.2"};
var cs   = new ChangeStyle(my$("btn"),my$("dv"),json);

//翻转字符串
String.prototype.myReverse = function () {
  for(var i=this.length-1;i>=0;i--){
    console.log(this[i]);
  }
}

//产生随机数
// (function(window){
//   function Random(){}
//   Random.prototype.getRandom = function () {
//     return Math.floor(Math.random()*5)
//   }
//   window.Random = Random;
// })(window)
// var rm = new Random();

//设置文本和画笔
function $ctx(id,getContext){
  var c3 = my$(id);
  return c3.getContext(getContext);
}
//canvas
//画矩形
function $Rect(x,y,start,end){
  return ctx.strokeRect(x,y,start,end)
}
//描边宽度
function $line(width){
  return ctx.lineWidth = (width)
}
//填充样式或者颜色
function $fill(style){
  return ctx.fillStyle = (style)
}
// 填充颜色空心
function $stroke(style){
  return ctx.strokeStyle = (style);
}
// 从x画到y
function $moveTo(x,y){
  return  ctx.moveTo(x,y);
}
// 从x画到y 直线
function $lineTo(x,y){
  return  ctx.lineTo(x,y);
}

//设置文本
function $Text(str,width,height){
  return ctx.fillText(str,width,height)
}
//清除一个范围内的矩形
function $clear(x,y,w,h){
  return ctx.clearRect(x,y,w,h)
}
//字体大小样式
function $font(fs){
  return ctx.font = fs + "px SimHei"
}
 //随机大小
 function $rn(min,max){
  var n = Math.random()*(max-min)+min;
  return Math.floor(n)
}
//随机颜色，输入最小颜色值和最大颜色值
function $rc(min,max){
  var r = $rn(min,max);
  var g = $rn(min,max);
  var b = $rn(min,max);
  return `rgb(${r},${g},${b})`
}
//随机大小
function $rxy(min,max){
  var x = Math.random()*min;
  var x = Math.random()*min;
}
//开始一条新路径
function $Path(){
  return ctx.beginPath();
}
//闭合路径
function $closePath(){
  return ctx.closePath();
}
function $arc(x,y,r,w,h,){
  return ctx.arc(x,y,r,w,h);
}
//绘制图片
function $Img(p3,x,y){//图片对象，X轴，Y轴
  return ctx.drawImage(p3,x,y);
}
//图片可以拉升的
function $ImgX(p3,x,y,lx,ly){//图片对象，X轴，Y轴，拉伸后大小
  return ctx.drawImage(p3,x,y,lx,ly);
}
//旋转/弧度
function $rotate(rotate){//旋转的弧度
  return ctx.rotate(rotate);
}
//平移
function $late(x,num){
  return ctx.translate(x,num);
}
//渐变
function $Line(x1,y1,x2,y2){//起点坐标，终点坐标
  return ctx.createLinearGradient(x1,y1,x2,y2)
}
//渐变添加颜色
function $Color(g,x,style){
  return g.addColorStop(x,style)
}

// 四位数字字母（大小写）随机生成的验证码
//   var ctx = $ctx('c3','2d');
function $yzm(){
    //1.创建矩形120*30 背景颜色随机
    $fill($rc(180,230));
    ctx.fillRect(0,0,120,30)
    //2.创建随机字符串4绘制矩形中
    var pool = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890zxcvbnmasdfghjklqwertyuiop";
    for(var i=0;i<4;i++){
      var c                = pool[$rn(30,pool.length)]
          ctx.textBaseline = "top";
      var fs               = $rn(10,30)
      $font(fs)
      $fill($rc(30,180));
      $Text(c,30*i,0);
    }
    //3.创建5条干扰线
    for(var i=0;i<5;i++){
      ctx.beginPath();
      
      $stroke($rc(0,230));
      $moveTo($rn(0,120),$rn(0,30));
      $lineTo($rn(0,120),$rn(0,30));
      ctx.stroke();
    }
    //4.创建50个干扰点
    for(var i=0;i<50;i++){
      $fill($rc(0,255));
      ctx.beginPath();
      ctx.arc($rn(0,120),$rn(0,30),1,0,2*Math.PI);
      ctx.stroke();
    }
}

// 圆形进度条
// var ctx = $ctx('c3','2d');
function $ArcTime(time){
  //1:绘制灰色底框
  ctx.beginPath();
  // ctx.strokeStyle = "#aaa";
  $stroke('#aaa')
  ctx.lineWidth = 10;
  $arc(250,200,100,0,2*Math.PI);
  ctx.stroke();
  //2:创建二个变量 开始角度 结束角度 -90
  var start = -90;
  var end   = -90;
  var num   = 1;
  //3:创建定时器
  var t = setInterval(function(){
    $clear(0,0,500,400);
    //4:修改结束角度
    end += 3.6;
    //5:绘制圆拱形
    ctx.beginPath();    //开始新路径
    $stroke("#0a0");//设置样式
    $arc(250,200,100,start*Math.PI/180,end*Math.PI/180);  //绘制圆拱形
    ctx.stroke();      //描边
    //6:绘制文本  10%
    num += 1;  //动态数值每次加1
    if(num>100){       
        num = 100;
        clearInterval(t);
    }
    $font("39px SimHei");//设置字体
    $Text(num+"%",225,200);//绘制
  },time);
}

//svg
//设置元素属性
function s_style(el,type,style){
  return el.setAttribute(type,style);
}
//获取元素属性
function s_setStyle(el,type,style){
  return el.setAttribute(type,style);
}
//创建元素
function s_El(el){
  return document.createElementNS("http://www.w3.org/2000/svg",el)
}

//echarts
//gauge 计量器 传入要绑定id，计量器当前值，计量器名称
function $gauge(id,val,name){
  var id      = my$(id);
  var mychart = echarts.init(id);
  var option  = {
  series:[{
    type  : "gauge",
    datail: {formatter:'{value}%'},
    data  : [{value:val,name:name}]
  }]
  };
  return  mychart.setOption(option);  
}
//line  树状图 带曲线走势图的
// data是数组，data1是列名 data2代表红色曲线满是 data3代表树状图数据高度
function $line(id,text,data1,data2,data3){
  var mychart = echarts.init(my$(id));
  var option  = {
    title : {text},
    xAxis : {data:data1},
    yAxis : {},
    series: [{
      type: "line",
      data: data2
    },{
      type: "bar",
      data: data3
    }]
  }
  mychart.setOption(option); 
}

// 树状图 不带走势图的
// data传的是数组 data是列名 data2是值，代表高度
function $bar(id,text,data,data2){
  //3:创建echarts对象
  var mychart = echarts.init(my$(id));
  //4:创建option配置项
  var option = {
    title : {text},
    xAxis : {data},
    yAxis : {},
    series: [{type:"bar",data:data2}]
  }
  //5:将配置添加echarts对象
  mychart.setOption(option); 
}

// 饼图
// data 是写一个数组对象{[value,name]}
function $pie(id,data){
  var mychart = echarts.init(my$(id));
  var option  = {
    series:[
       {
         type  : "pie",
         radius: "50%",
         center: ["50%","50%"],
         data
       }
    ]
  }
  return  mychart.setOption(option);  
}

// 普通轮播图
// 指定外层div的id为slider 里面img不限，第一张class名shows
function $slider(time) {
  function task() {
    //查找限制class为show的img
    var img           = slider.getElementsByClassName("shows")[0];
        img.className = "";                                         //清空img的class
    //如果img有下一个兄弟
    if(img.nextElementSibling){
      //设置img的下一个兄弟的class为show
      img.nextElementSibling.className = "shows"
    }else{//否则
      //设置img的父元素的第一个孩子的className为show
      img.parentNode.children[0].className = "shows";
    }    
  }
  return setInterval(task,time);
}

// 3D轮播图
// 图片定位
//依赖于lin.css
var config = [
  // 第一张图
  {
    width  : 400,
    top    : 50,
    left   : 350,
    opacity: 0.2,
    zIndex : 2
  },
  // 第二张图
  {
    width  : 600,
    top    : 120,
    left   : -100,
    opacity: 0.8,
    zIndex : 3
  },
  // 第三张图
  {
    width  : 800,
    top    : 100,
    left   : 200,
    opacity: 1,
    zIndex : 4
  },
  // 第四张图
  {
    width  : 600,
    top    : 120,
    left   : 700,
    opacity: 0.8,
    zIndex : 3
  }
];
//页面加载的事件
function $slide() {
  window.onload = function () {
    var flag = true;  //假设所有的动画执行完毕了——锁
    //1.图片散开
    var list = $Cls("slide")[0].getElementsByTagName("li");
    function assign () {
      for(var i=0;i<list.length;i++){
      //设置每个li，都要把宽，层级，透明度，left，top到达指定的目标位置
        animate(list[i],config[i],function(){
          flag = true;
        })        
      }
    }
    assign();
    //右边按钮
    $Cls("next")[0].onclick = function () {
      if(flag){
        flag = false;
      //添加进数组的尾巴  把数组中第一个删除
      config.push(config.shift());
      assign();//重新分配
      }
    }
    //左边按钮
    $Cls("prev")[0].onclick = function () {
      //把最后一个删除，返回成新值加入开头
      if(flag){
        flag = false;
        config.unshift(config.pop());
      assign();
      }       
    }

    //鼠标进入，左右焦点的div显示
    $Cls("slide")[0].onmouseover = function () {
      animate($Cls("arrow")[0],{"opacity":1});
    };
    //鼠标离开，左右焦点的div隐藏
    $Cls("slide")[0].onmouseout = function () {
      animate($Cls("arrow")[0],{"opacity":0});
    };
  } 
}

// 广告 重复弹出
//依赖于lin.css
function $Ad(time){
  window.onload = function () {
    msg.style.bottom = "0px";
  }
  msg.children[0].onclick = function () {
    msg.style.bottom = "-200px";
    setTimeout(()=>{
      msg.style.bottom = "0px";
    },time)
  }
}

// 倒计时
// time格式 'YYYY/MM/DD H:M:S' ends结束语
function $calc(id,time,ends) {
  function calc(){
    var end = new Date(time);
    var now = new Date();
    var s   = parseInt((end-now)/1000);
    if(s>0){
    var d       = parseInt(s/3600/24);
    if (d<10) d = "0"+d;
    //s/3600/24,再下取整
    var h       = parseInt(s%(3600*24)/3600);
    if (h<10) h = "0"+h;
    //s/(3600*24)的余数,再/3600,再下去整
    var m       = parseInt(s%3600/60);
    if (m<10) m = "0"+m;
    //s/3600的余数,再/60，再下取整
       s%      = 60;     //s/60的余数
    if(s<10) s = "0"+s;
    //距离下一个假期还有: ?天?小时?分?秒
    var span           = my$(id);
        span.innerHTML = d+"天"+h+"小时"+m+"分"+s+"秒";
    }else{
    var span           = my$(id);
        span.innerHTML = ends;
    }
  }
  calc();
  setInterval(calc,1000)
}

// 树形列表 显示与隐藏
// hide 和show 可以写HTML
// 依赖于lin.css
function $tree(hide,show) {
  var d2         = $Cls("sign")[0];
      d2.onclick = function () {
    var d2 = this;
    var d1 = $Cls("treeList")[0]
    var d3 = $Cls("treeContent")[0]
    if(d2.innerHTML == "&lt;&lt;"){
      d1.style.width = "0"
      d2.innerHTML   = "&gt;&gt";
      d3.innerHTML   = hide;
    }else{
      d1.style.width = "64px";
      d2.innerHTML   = "&lt;&lt";
      d3.innerHTML   = show;
    }
  }
}

// 根据页面滚动位置显示浮动框
// 该元素需要设置固定定位在底部 scrol为要显示的地方 数值
function $toTop(id,scrol){
  my$(id).onclick = function (e) {
    e.preventDefault();
    window.scrollTo(0,0);
  }
  window.onscroll = function () {
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    if(scrollTop>=scrol)
    my$(id).style.display = "block";
    else
    my$(id).style.display = "none";
  }
}

// 鼠标拖动元素
// 要拖动的元素需要设置成固定定位来脱离文档流
function $pop(cls) {
  var pop             = $Cls(cls)[0];
  var canMove         = false.offsetX, offsetY;
      pop.onmousedown = function (e) {
    canMove = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  }
  window.onmousemove = function (e) {
    if(canMove) {
      var left           = e.clientX-offsetX;
      var top            = e.clientY-offsetY;
          pop.style.left = left+"px";
          pop.style.top  = top+"px";
    }
  }
  pop.onmouseup = function () {
    canMove = false;
  }
}

// 放大镜效果
// 依赖于lin.css
// 最外层div的class为loupe,小图small-box(包含两个div mark,float-box)，大图div big-box包含一张img
// 由于图片大小不同，所以css样式肯定要调整
function $loupe() {
  window.onload = function () {
    var loupe       = $Cls("loupe")[0];
    var SmallBox    = $Cls("small-box")[0];
    var Mark        = $Cls("mark")[0];
    var FloatBox    = $Cls("float-box")[0];
    var BigBox      = $Cls("big-box")[0];
    var BigBoxImage = BigBox.getElementsByTagName("img")[0];

    Mark.onmouseover = function () {
        FloatBox.style.display = "block"
        BigBox.style.display   = "block"
    }

    Mark.onmouseout = function () {
        FloatBox.style.display = "none"
        BigBox.style.display   = "none"
    }

    Mark.onmousemove = function (ev) {
      var _event = ev || window.event;  //兼容多个浏览器的event参数模式

      var left = _event.clientX - loupe.offsetLeft - SmallBox.offsetLeft - FloatBox.offsetWidth / 2;
      var top  = _event.clientY - loupe.offsetTop - SmallBox.offsetTop - FloatBox.offsetHeight / 2;

      //设置边界处理，防止移出小图片
      if (left < 0) {
          left = 0;
      } else if (left > (Mark.offsetWidth - FloatBox.offsetWidth)) {
          left = Mark.offsetWidth - FloatBox.offsetWidth;
      }

      if (top < 0) {
          top = 0;
      } else if (top > (Mark.offsetHeight - FloatBox.offsetHeight)) {
          top = Mark.offsetHeight - FloatBox.offsetHeight;

      }

      FloatBox.style.left = left + "px";  //oSmall.offsetLeft的值是相对什么而言
      FloatBox.style.top  = top + "px";
      
      //求其比值
      var percentX = left / (Mark.offsetWidth - FloatBox.offsetWidth);
      var percentY = top / (Mark.offsetHeight - FloatBox.offsetHeight);
      
      //方向相反，小图片鼠标移动方向与大图片相反，故而是负值
      BigBoxImage.style.left = -percentX * (BigBoxImage.offsetWidth - BigBox.offsetWidth) + "px";
      BigBoxImage.style.top  = -percentY * (BigBoxImage.offsetHeight - BigBox.offsetHeight) + "px";
    }
  }
}