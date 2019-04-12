;(function(){
	var otxt = document.getElementById("un");
	var opas = document.getElementById("pw");
	var osub = document.getElementById("login");
	var ocar = document.getElementById("car");
	osub.onclick = function(){
		console.log(1);
		$.ajax({
			type:"get",
			url:"http://localhost:8081/login",
			data:{
				user:otxt.value,
				pass:opas.value
			},
			success:function(res){
				//console.log(res)
				if(JSON.parse(res).code == 0){
					location.href = "./index.html"
				}
				if(JSON.parse(res).code == 1){
					ocar.innerText = "登录失败，请重新登录或注册";
					ocar.style="color:red;font-size:30px;"
				}
			},
			error:function(a,b,c){
				
				console.log(a,b,c);
			
			}
		});
	}
})()