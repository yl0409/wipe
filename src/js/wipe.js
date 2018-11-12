	var canvas=document.getElementById("cas");
	var context=cas.getContext("2d");
	var _w = cas.width,_h = cas.height;
	var radius = 20;//画笔的半径
	function drawMask(context){
		context.fillStyle = "#666";
		context.fillRect(0,0,_w,_h);
		context.globalCompositeOperation = "destination-out";
	}
	function drawLine(context,one,two,three,four){
		context.save();
		context.beginPath();
		context.moveTo(one,two);
		context.lineTo(three,four);
		context.lineCap = "round";
		context.lineWidth = radius*2;
		context.stroke();
		context.restore();
	}
	//在canvas画布上监听自定义事件"mousedown",调用drawPoint函数
	var deliaX;
	var deliaY;
	var isMouseDown = false;
	//如果true执行鼠标移动事件，鼠标按下等于true,鼠标抬起等于false
	cas.addEventListener("mousedown",function(evt){
		var event = evt || window.event;
		//获取鼠标在视口的坐标，传递参数到drawPoint
		deliaX = event.clientX;
		deliaY = event.clientY;
		drawLine(context,deliaX,deliaY);
		isMouseDown=true;
		console.log(isMouseDown);
	},false);
		cas.addEventListener("mousemove",function(evt){
		if(isMouseDown===true){
			var event = evt || window.event;
			var moveX = event.clientX;
			var moveY = event.clientY;
			drawLine(context,deliaX,deliaY,moveX,moveY);
			deliaX=moveX;
			deliaY=moveY;
			console.log(isMouseDown);
		}
	},false);
	cas.addEventListener("mouseup",function(evt){
		isMouseDown=false;
		var num = [];
		var imgdata = context.getImageData(0,0,cas.width,cas.height);
		console.log(imgdata);
		// for(i=0;i<cas.height;i++){
		// 	for(j=0;j<cas.width;j++){
		// 		var a = ((cas.width*i)+j)*4+3;
		// 		if(imgdata.data[a]==0){
		// 			num.push(a);

		// 		}
		// 	}
		// }
		// var x = (num.length/(cas.width*cas.height))*100;
		// console.log(x);
		// 	if(x>=60){
		// 		context.clearRect(0,0,_w,_h);
		// 		alert("很抱歉，没中奖！");
		// 	};
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
		console.log(percent);
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