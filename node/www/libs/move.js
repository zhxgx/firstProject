function move(ele,json,callback){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var onOff = true;
		for(var attr in json){
//					1.判断是否是透明属性,因为透明的属性值需要单独获取
			var iNow = attr=="opacity" ? getStyle(ele,attr) * 100 : parseInt(getStyle(ele,attr))
			
			var speed = (json[attr] - iNow)/7;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			
//					2.判断是否是透明属性,单独设置
			if(attr == "opacity"){
				ele.style[attr] = (iNow + speed)/100;
//						ele.style.filter = "alpha("+ (iNow + speed) +")"
				ele.style.filter = `alpha(${iNow + speed})`;
			}else{
				ele.style[attr] = iNow + speed + "px";
			}
			
			if(iNow != json[attr]) onOff = false;
		}
		if(onOff){
			clearInterval(ele.timer);
			if(callback) callback();
		}
	},30)
}

function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr];
	}
}