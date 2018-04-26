define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--point--jobs" style="height: 270px; margin: 0 30px 10px; box-sizing: border-box;">
			<canvas id="pointJobs" ></canvas>
		</div>
		`,
		mounted: function(){
			this.loadData();
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/'){
					this.loadData();
				}
				
			}
		},
		data: function(){
			return {
				loading: false,
			}
		},
		methods:{
			loadData: function(){
				var configData = [
				{
					bgColor: '#6c8fde',
					fontSize: '20px',
					radius: 66,
				},
				{
					bgColor: '#53a8e2',
					fontSize: '16px',
					radius: 53,
				},
				{
					bgColor: '#4a90e2',
					fontSize: '16px',
					radius: 50,
				},
				{
					bgColor: '#62c7b3',
					fontSize: '14px',
					radius: 47,
				},
				{
					bgColor: '#38d2dc',
					fontSize: '14px',
					radius: 44,
				},
				{
					bgColor: '#8194ab',
					fontSize: '13px',
					radius: 41,
				},
				{
					bgColor: '#36a9ce',
					fontSize: '13px',
					radius: 38,
				},
				{
					bgColor: '#0c4d90',
					fontSize: '12px',
					radius: 35,
				},
				{
					bgColor: '#53a8e2',
					fontSize: '12px',
					radius: 32,
				},
				{
					bgColor: '#76ddfe',
					fontSize: '12px',
					radius: 29,
				},
				]
				var theme = require('theme');
				configData = configData.map(function(x, index){
					x.bgColor = theme.colors[index];
					return x;
				})
				var data = [
				{
					name: '电子网络',
					value: '10.95',
				},
				{
					name: '销售客服',
					value: '5.46',
				},
				{
					name: '媒体艺术',
					value: '3.65',
				},
				{
					name: '教育科研',
					value: '2.04',
				},
				{
					name: '行政高管',
					value: '1.53',
				},
				{
					name: '物流采购',
					value: '0.8',
				},
				{
					name: '服务业',
					value: '0.75',
				},
				{
					name: '医疗生化',
					value: '0.45',
				},
				{
					name: '金融保险',
					value: '0.23',
				},
				{
					name: '机械制造',
					value: '0.14',
				},
				]
				// 生成随机点
				function randomPoint (obj) {
				  var r = obj.r;
				  var w = obj.w;
				  var h = obj.h;
				  var x = parseInt(Math.random() * (w - 2*r) + r);
				  var y = parseInt(Math.random() * (h - 2*r) + r);
				  
				  return {
				  	x: x,
				  	y: y,
				  	r: r,
				  }
				}
				//判断两个区域是否重叠
				function testOverlay (pointA, pointB) {
				  var x = Math.abs(pointA.x - pointB.x)
				  var y = Math.abs(pointA.y - pointB.y)
				  var distance = Math.sqrt((x * x) + (y * y))
				  if (distance >= (pointA.r + pointB.r)) {
				    return false
				  } else {
				    return true
				  }
				}
				
				// 判断新生成的点是否有效
				function testAvailable (pointArr, newPoint) {
					var aval = true;
					for(var i=0;i<pointArr.length;i++){
				  		if(testOverlay(pointArr[i], newPoint)){
				  			aval = false;
				  			break;
				  		}
					}
					return aval;
				}
				function draw(){
					var container = $(".chart--point--jobs");
					var width = container.width();
					var height = container.height();
					
					var canvas = document.getElementById('pointJobs');
					$(canvas).attr('width', width);
					$(canvas).attr('height', height);
					var ctx = canvas.getContext('2d');
					var count = data.length;
					var size = {
						w: canvas.clientWidth, 
						h: canvas.clientHeight,
					}
					 ctx.clearRect(0, 0, size.w, size.h)
					var pointArr = [];
					for(var i=0;i<count;i++){
						size.r = configData[i].radius;
						var newPoint = randomPoint(size);
						if(testAvailable(pointArr, newPoint)){
							pointArr.push(newPoint);
						}else{
							i--;
						}
					}
					drawCircle(ctx, pointArr);
				}
				function drawCircle(ctx, pointArr){
					for(var i=0;i<pointArr.length;i++){
						var x = pointArr[i].x;
						var y = pointArr[i].y;
						var r = pointArr[i].r;
						ctx.beginPath();
						ctx.arc(x, y, r, 0, Math.PI*2);
						ctx.fillStyle = configData[i].bgColor;
						ctx.fill();
						ctx.font = configData[i].fontSize + " sans-serif";
						ctx.fillStyle = "#fff";
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						var font = parseInt(configData[i].fontSize)
						var rate = 8/5;
						var num = font * rate /2;
						ctx.fillText(data[i].name, x, parseInt(y-num));
						ctx.fillText(data[i].value+'%', x, parseInt(y+num));
					}
				}
				draw();
		//		$(window).resize(function(){
		//			draw()
		//		})
				
			},
		}
	}
})