;(function(){
	class Car{
			constructor(options){
				//1.解析参数
				this.tbody = options.tbody;
				this.url = options.url;
				
				//2.请求数据，请求总数据与请求cookie同时进行。请求的数据都是异步请求
				this.load();
				
				//5.绑定事件
				this.addEvent();
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					//成功的状态
					success:function(res){
						that.res = JSON.parse(res);
						//3.获取cookie
						that.getCookie();
						
					}
				})
				
			}
			getCookie(){
				//获取cookie
				this.goods = JSON.parse(getCookie("goods"));
//				console.log(this.goods)
				this.display();//4.渲染页面
			}
			display(){
				var str ="";
				
				for(var i=0;i<this.res.length;i++){
					
					for(var j=0;j<this.goods.length;j++){
						
						if(this.res[i].goodsId == this.goods[j].id){
							str += `<tr>
										<td><input type="checkbox" name="" id="" value="" /></td>
										<td><img src="${this.res[i].src}"/></td>
										<td>${this.res[i].name}</td>
										<td>${this.res[i].price}</td>
										<td><input type="number" value="${this.goods[j].num}"/></td>
										<td><em data-index="${this.res[i].goodsId}">删除</em></td>
									</tr>`;                               
							
						}
					}
				}
				
				this.tbody.innerHTML = str;
			}
			addEvent(){
				//事件委托，使用监听事件
				this.tbody.addEventListener("click",(eve)=>{
					if(eve.target.nodeName == "EM"){
						
						this.id = eve.target.getAttribute("data-index");//获取getAttribute
						//删除                               getAttribute
						eve.target.parentNode.parentNode.remove();
						//6.删除cookie中的数据
						this.removeCookie();
					}
				});
				
				this.tbody.addEventListener("input",(eve)=>{//input 输入框事件
					if(eve.target.type == "number"){
						this.value = eve.target.value;
						this.id = eve.target.parentNode.nextElementSibling.children[0].getAttribute("data-index")
					}
					this.setCookie();
				});
			}
			removeCookie(){
//				this.goods.forEach((v,i)=>{
//					if(v.id == this.id){
//						this.goods.splice(i,1)
//					}
//				})//可能引发死循环
//				7.找到cookie中的数据进行修改
				for(var i=0;i<this.goods.length;i++){
					
					if(this.goods[i].id == this.id){					
						break;
					}
					
				}				
				this.goods.splice(i,1);
				
				setCookie("goods",JSON.stringify(this.goods));//修改后的数据设置回去
			}
			setCookie(){
				for(var i=0;i<this.goods.length;i++){					
					if(this.goods[i].id == this.id){					
						break;
					}					
				}
				this.goods[i].num = this.value;
				setCookie("goods",JSON.stringify(this.goods));//修改后的数据设置回去
			}
		}
		
		new Car({//传参
			tbody:document.getElementById("tbody"),
			url:"../data/goods.json"
		});
})()
