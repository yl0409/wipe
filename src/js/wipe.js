	/*
	author:1104413312@qq.com
	data:2018-11-16
	 */
	function Wipe(obj){
		this.conID = obj.id;
		this.cas=document.getElementById(this.conID);
		this.context=this.cas.getContext("2d");
		this._w = obj.imW;
		this._h = obj.imH;
		this.cas.width = obj.imW;
		this.cas.height = obj.imH;
		this.coverType = obj.coverType;//覆盖的是颜色还是图片
		// this.color = obj.color? "#123" : obj.color;//覆盖的颜色
		this.color = obj.color || "#777";
		this.imgUrl = obj.imgUrl;//覆盖图
		this.bg = obj.bg;//背景图
		this.radius = obj.radius;//画笔的半径
		this.deliaX = 0;
		this.deliaY = 0;
		this.isMouseDown = false;
		this.callback = obj.callback;
		this.area = obj.area;
		this.drawT();
		this.move();
		this.drawMask();

	}
	//drawT画点和画线函数
	//参数：如果只有两个参数，函数功能画圆，a,b即原点的中心坐标
	//如果传递四个参数，函数功能画线，a,b为起始坐标,c,d为结束坐标
	Wipe.prototype.drawT = function(a,b,c,d){
		if(arguments.length===2){
			this.context.save();
			this.context.beginPath();
			this.context.fillStyle="red";
			this.context.arc(a,b,this.radius,0,2*Math.PI);
			this.context.fill();
			this.context.restore();
		}else{
			this.context.save();
			this.context.beginPath();
			this.context.moveTo(a,b);
			this.context.lineTo(c,d);
			this.context.lineCap = "round";
			this.context.lineWidth = this.radius*2;
			this.context.stroke();
			this.context.restore();
		}
	};
	Wipe.prototype.getTransparencyPercent = function(){
		var t = 0;
		var imgData = this.context.getImageData(0,0,this._w,this._h);
		for(var i =0;i<imgData.data.length;i+=4){
			var a = imgData.data[i+3];
			if(a === 0){
				t++;
			}
		}
		this.percent = (t / (this._w*this._h))*100;
		return Math.round(this.percent);
	};
	Wipe.prototype.clearRect = function(){
		this.context.clearRect(0,0,this._w,this._h);
	};
	Wipe.prototype.drawMask = function(){
		var that = this;
		if(this.coverType === "color"){
			this.context.fillStyle = this.color;
			this.context.fillRect(0,0,this._w,this._h);
			this.context.globalCompositeOperation = "destination-out";
		}else if(this.coverType === "image"){
			//将imgUrl指定的图片填充画布
			this.img1 = new Image();
			this.img1.src = this.imgUrl;
			console.log(this.img1);
			this.img1.onload = function(){
				that.context.drawImage(that.img1,0,0,that.img1.width,that.img1.height,0,0,that._w,that._h);
				that.context.globalCompositeOperation = "destination-out";
			};
		}
	};
	Wipe.prototype.move = function(){
		var that = this;
		this.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
		this.startEvt = this.device ? "touchstart" : "mousedown";
		this.moveEvt = this.device ? "touchmove" : "mousemove";
		this.endEvt = this.device ? "touchend" : "mouseup";
		var scrollLeft;
		var scrollTop;
		var allLeft = this.cas.offsetLeft;
		var allTop = this.cas.offsetTop;
		var currentObj = this.cas;
		while(currentObj = currentObj.offsetParent){
				allTop += currentObj.offsetTop;
				allLeft += currentObj.offsetLeft;
			}
		this.cas.addEventListener(that.startEvt,function(evt){
			that.isMouseDown = true;
			var event = evt || window.event;
			scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			that.deliaX = that.device ? event.touches[0].clientX - allLeft + scrollLeft : event.clientX - allLeft + scrollLeft;
			that.deliaY = that.device ? event.touches[0].clientY - allTop + scrollTop : event.clientY - allTop + scrollTop;
			that.drawT(that.deliaX,that.deliaY);
		});
		this.cas.addEventListener(that.moveEvt,function(evt){
			if(that.isMouseDown === true){
				var event = evt || window.event;
				scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
				scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				event.preventDefault();
				var moveX = that.device ? event.touches[0].clientX - allLeft + scrollLeft : event.clientX - allLeft + scrollLeft;
				var moveY = that.device ? event.touches[0].clientY - allTop + scrollTop : event.clientY - allTop + scrollTop;
				that.drawT(that.deliaX,that.deliaY,moveX,moveY);
				that.deliaX=moveX;
				that.deliaY=moveY;
			}else{
				return false;
			}
		});
		this.cas.addEventListener(that.endEvt,function(evt){
			that.isMouseDown=false;
			//借用外部的处理函数
			var percent = that.getTransparencyPercent();
			// 调用同名的全局函数
			that.callback.call(window,percent);
			var imgdata = that.context.getImageData(0,0,that.cas.width,that.cas.height);
			if(percent >= that.area){
				that.clearRect();
			}
		});
	};


