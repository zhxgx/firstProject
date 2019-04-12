;(function(){
	var otxt = document.getElementById("userName");
	var opas = document.getElementById("pas");
	var osub = document.getElementById("register_button");
	var ocar = document.getElementById("car");
	osub.onclick = function(){
		$.ajax({
			type:"post",
			url:"http://localhost:8081/register",
			data:{
				user:otxt.value,
				pass:opas.value
			},
			success:function(res){
//				console.log(res)
				if(JSON.parse(res).code == 1){
					location.href = "./del.html"
				}
				if(JSON.parse(res).code == 0){
					ocar.innerText = "用户名已存在！";
					ocar.style="color:red;font-size:30px;"
				}
			},
			error:function(a,b,c){
				
				console.log(a,b,c);
			
				
			}
		});
	}
})()
