	var canvas=document.getElementById("cas");
	var context=cas.getContext("2d");
	var _w = cas.width,_h = cas.height;
	var radius = 20;//画笔的半径
	function drawMask(context){
		context.fillStyle = "#666";
		context.fillRect(0,0,_w,_h);
		context.globalCompositeOperation = "destination-out";
	}
// 	function drawarc(context,moveX,moveY){
// 	console.log("传递的实参个数"+arguments.length);
// 	context.beginPath();
// 	context.fillStyle="red";
// 	context.arc(moveX,moveY,radius,0,2*Math.PI);
// 	context.fill();
// 	context.restore();
// }
	function draw(context,a,b,c,d){
		if(arguments.length===3){
			context.save();
			context.beginPath();
			context.fillStyle="red";
			context.arc(a,b,radius,0,2*Math.PI);
			context.fill();
			context.restore();
		}else{
			context.save();
			context.beginPath();
			context.moveTo(a,b);
			context.lineTo(c,d);
			context.lineCap = "round";
			context.lineWidth = radius*2;
			context.stroke();
			context.restore();
		}
	}
	// function drawLine(context,one,two,three,four){
	// 	console.log(arguments.length);
	// 	context.save();
	// 	context.beginPath();
	// 	context.moveTo(one,two);
	// 	context.lineTo(three,four);
	// 	context.lineCap = "round";
	// 	context.lineWidth = radius*2;
	// 	context.stroke();
	// 	context.restore();
	// }
	//在canvas画布上监听自定义事件"mousedown",调用drawPoint函数
	var deliaX;
	var deliaY;
	var isMouseDown = false;
	//如果true执行鼠标移动事件，鼠标按下等于true,鼠标抬起等于false

	var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	console.log(navigator.userAgent);
	console.log(device);
	// var startEvt,moveEvt,endEvt;
	// if(device == true){
	// 	startEvt = "touchstart";
	// 	moveEvt = "touchmove";
	// 	endEvt = "touchend";
	// }else{
	// 	startEvt = "mousedown";
	// 	moveEvt = "mousemove";
	// 	endEvt = "mouseup";
	// }
	var startEvt = device ? "touchstart" : "mousedown";
	var moveEvt = device ? "touchmove" : "mousemove";
	var endEvt = device ? "touchend" : "mouseup";

	cas.addEventListener(startEvt,function(evt){
		isMouseDown = true;
		var event = evt || window.enent;
		deliaX = device ? event.touches[0].clientX : event.clientX;
		deliaY = device ? event.touches[0].clientY : event.clientY;
		draw(context,deliaX,deliaY);
	});
	cas.addEventListener(moveEvt,function(evt){
		if(isMouseDown === true){
			var event = evt || window.event;
			event.preventDefault();
			var moveX = device ? event.touches[0].clientX : event.clientX;
			var moveY = device ? event.touches[0].clientY : event.clientY;
			draw(context,deliaX,deliaY,moveX,moveY);
			deliaX=moveX;
			deliaY=moveY;
		}else{
			return false;
		}
	});
	cas.addEventListener(endEvt,function(evt){
		isMouseDown=false;
		var num = [];
		var imgdata = context.getImageData(0,0,cas.width,cas.height);
		// console.log(imgdata);
		if(getTransparencyPercent(context) >= 60){
			clear(context);
			alert("哈哈哈哈");
		}
	});
	function getTransparencyPercent(context){
		var t = 0;
		var imgData = context.getImageData(0,0,_w,_h);
		for(var i =0;i<imgData.data.length;i+=4){
			var a = imgData.data[i+3];
			if(a === 0){
				t++;
			}
		}
		var percent = (t / (_w*_h)*100);
		return Math.round(percent);
	}
	function clear(context){
		context.clearRect(0,0,_w,_h);
	}
	window.onload = function(){
		drawMask(context);
		// drawLine(context)
		isMouseDown=false;
		// drawArc(context);
	};