﻿## var 0.0.1 ##
PC端实现涂抹擦著效果，超过50%的涂抹面积可以查看全部。涂抹颜色和背景图片手动指定。2018-11-12
## var 1.0.0 ##
1.实现了移动端的支持
2.函数优化
## ver 2.0.0 ##
实现了面向对象方式，
增加了参数配置
## ver 3.0.0 ##
1、浏览器在滚动距离下bug修复
2、canvas画布在有偏移和绝对定位下bug修复
3、增加了回调函数。让用户可以自己完成后继功能
## ver 4.0.0 ##
1、新增参数配置，支持写入文字

使用步骤说明：
1、在HTML中添加指定id的canvas标签。
例如：
` <canvas id="cas" width="375" height="667"></canvas> `

2、编辑配置文件：   

| 属性名 | 取值类型 | 备注 |
| id | 字符串 | 取值“color” 或 “image” |
|color | 字符串  | 十六进制颜色码，或rgba() . 如果不指定默认值为#666|
|imgUrl | 字符串 | 前面的覆盖图片 |
| backImgUrl | 字符串 | canvas背景图片 |
|width | 字符串 | canvas宽度 ，必须和canvas标签中宽度一致 |
|width | 字符串 | canvas高度 ，必须和canvas标签中高度一致 |
|radius | 字符串 | 涂抹笔的半径 |
|area | 数值 | 透明面积占整个画布的百分比，超出此数字显示全部画布|
|callback | 函数|用户自定义的回调函数名称|

例如：
``` 
var init = {
		id:"cas",
		coverType:"color",
		color:"yellow",
		imgUrl:"image/wipe2.jpg",
		bg:"image/bg.jpg",
		imW:200,
		imH:200,
		radius:"5",
		callback:wipeCallback,//用户自定义回调函数名称
		area:60
	}
 ```
> 
3、初始化wipe插件，并将上一步的配置配置变量作为参数传入
例如：
``` 
new wipe(init); ```
 
 4、编写回调函数，用户在涂抹完成的后继操作必须写在此回调函数中，
 例如：
``` 
 function wipeCallback(percent){
		if(percent > 60){
			console.log("透明面积超过60%,查看底图");
		}
	}
 ```
 5、新增参数配置，支持涂层写入文字效果


> 
> 
> 
> 
> 
> 
> 
