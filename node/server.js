let http = require("http");//链接服务模块
let fs = require("fs");//链接文件模块
let querystring = require("querystring");//post接受数据，解析数据模块
let arr = [];//存储数据，每次更新从头开始。
let url = require("url");//引入url模块


////开启服务
//let server = http.createServer((req,res)=>{
//	if(req.url != ){
//		fs.readFile("www"+req.url,(error,data)=>{
//			if(error == null){
//				res.write(data);
//			}else{
//				res.write{"404"}
//			}
//			res.end();
//		})
//	}else{
//		
//	}
//});
//
//
//server.listen("8081","localhost",()=>{//监听端口和地址
//	console.log("服务开启成功")
//});


/*
 * 还可以支持连缀写法
 */
http.createServer((req,res)=>{//开启服务

	if(req.url != "/favicon.ico"){
//			console.log(req.url)
		var urlObj = url.parse(req.url,true);//true把数据的字符串形式转换成对象
		switch(urlObj.pathname){
			case "/login":
				login(req,res,urlObj);
				break;
			case "/register":
				register(req,res);
				break;
//			case "/goods":
//				goods(req,res);
//				break;
			default:
				fs.readFile("www"+req.url,(error,data)=>{
					if(error == null){
						res.write(data);
					}else{
						res.write("404");
					}
					res.end();
				})
		}
		
	}else{
		
	}
}).listen("8081","localhost",()=>{//监听端口和地址
	console.log("服务开启成功")
});


function login(req,res,url){
//	res.write("这是登录页面");
	//ajax数据的请求与发送，get数据的接收发送。由于ger接收的数据在url中，需要处理url
//	url.qurey就是前端get发送过来的前端数据
	var onoff = true;//开关
	for(var i=0;i<arr.length;i++){//遍历查看数组库中有重复创建的
		if(arr[i].user == url.query.user && arr[i].pass == url.query.pass){
			res.write('{"msg":"登录成功","code":"0"}');
			onoff = false;
		}
	}
	if(onoff){
		res.write('{"msg":"登录失败","code":"1"}');
	}
	res.end();
}

function register(req,res){
//	res.write("这是注册页面");
//	post数据请求接口，post的数据不再url中，在req中
	var str ="";
	req.on("data",(msg)=>{//绑定事件on 
//		res.write(msg);//返回输入的数据
		str += msg;
//		res.end();
	});
	req.on("end",()=>{//数据传输完以后触发事件
		var obj = querystring.parse(str);
		var onoff = true;//开关
		for(var i=0;i<arr.length;i++){//遍历查看数组库中有重复创建的
			if(arr[i].user == obj.user){
				res.write('{"msg":"重名","code":"0"}');
				onoff = false;
			}
		}
		if(onoff){
			res.write('{"msg":"成功","code":"1"}');
			arr.push(obj);
		}
		
		res.end();
	});
	
//  res.end();	
}

//function goods(req,res){
////	var str ;
////	for(var i=0;i<gods.length;i++){//遍历查看数组库中有重复创建的
////			str += gods[i];
////	}
//
//	res.write(gods);
//	res.end();
//}
