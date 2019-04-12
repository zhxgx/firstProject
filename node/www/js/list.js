;(function(){
		class List{//使用class做面向对象
			constructor(options){
				//1.解析数据
				this.cont = options.cont;
				this.url = options.url;
				//2.请求数据
				this.load();
				//5.绑定事件
				this.addEvent();
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					success:function(res){
//						console.log(res)
						//3.请求成功之后并解析数据，并渲染页面
						that.res = JSON.parse(res);
						that.display();
					}
				});
			}
			display(){
				//遍历数据，拼接结构，渲染页面
				var str = "";
				for(var i=0;i<this.res.length;i++){
					//index="${this.res[i].goodsId}",这句代码是拼接的自定义属性，用于找到商品的货号
					str += `<div class="box" index="${this.res[i].goodsId}">
								<img src="${this.res[i].src}"/>
								<p>${this.res[i].name}</p>
								<span>${this.res[i].price}</span>
								<em>加入购物车</em>
							</div>`
				}
				this.cont.innerHTML = str;	

			}
			addEvent(){
				var that = this;
				//利用事件委托来绑定点击事件
				this.cont.addEventListener("click",function(eve){//监听式绑定
					
					if(eve.target.nodeName == "EM"){
						//6.点击商品，获取货号，存cookie
						that.id = eve.target.parentNode.getAttribute("index");//获取货号,通过事件对象拿到当前元素，再拿到父级元素在拿到属性index的值
						
						that.setCookie();
					}
					
				});
			}
			setCookie(){
				//因为要使用一条cookie存储多个商品，数据要以json形式存储[{},{}]
				this.goods = getCookie("goods");//获取cookie的内容
//				console.log(1)
				//情况一，第一次添加
				if(this.goods==""){					
					this.goods = [{
						id:this.id,
						num:1
					}];
				}else{
					//情况二，不是第一次添加
					this.goods = JSON.parse(this.goods);
					
					//点击老数据的情况
					//设置一个开关
					var onoff = true;
					this.goods.forEach((v)=>{//遍历数组
						if(v.id == this.id){
							v.num++;
							onoff = false;
						}
					})
					
					//点击老数据的情况
					if(onoff){
						this.goods.push({
							id:this.id,
							num:1
						})
					}
					
				}
				//所有关于数组的操作结束后，将数组转换成字符串在设置到cookie中
				setCookie("goods",JSON.stringify(this.goods));
				
			}
		}
		
		new List({
			cont:document.getElementById("cont"),
			url:"../data/goods.json"        
		});
})()
