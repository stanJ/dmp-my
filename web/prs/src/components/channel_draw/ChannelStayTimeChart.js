define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--bar--staytime" style="height: 300px;"></div>
		`,
		mounted: function(){
			this.loadData();
		},
//		watch: {
//			skuId: function(){
//				var curUrl = utilObj.getCurUrl()
//				if(curUrl == '/saleAnalysis'){
//					this.loadData()
//				}
//				
//			}
//		},
		data: function(){
			return {
				loading: false,
			}
		},
		methods:{
			loadData: function(){
				var barStayTime = echarts.init($(".chart--bar--staytime")[0]);
				$(window).resize(function(){
					barStayTime.resize()
				})
				var theme = require('theme');
				var option = {
			//	    color: ['#3398DB'],
				    title: {
				    	text: '用户数',
				    	textStyle: {
							fontSize: '14',
							fontWeight: 'normal'
						},
						left: '8',
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['1分钟','5分钟', '10分钟', '15分钟','20分钟','25分钟', '30分钟','35分钟', '40分钟', ],
				            axisLine: {
					            lineStyle: {
					        		color: '#d7d7d7',
					        		width: 2,
					        	}
					        },
					        axisTick: {
					        	show: true,
					        	inside: false,
					        	
					        },
					        axisLabel: {
					            textStyle: {
					            	color: '#000'
					            },
								interval: 0,
					        },
					        splitLine: {
					        	show: false,
					        }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            max: 2500,
				            axisLine: {
					            show: false,
					        },
					        splitLine: {
					        	lineStyle: {
					        		color: '#f7f9fa',
					        	}
					        },
					        axisTick: {
					        	show: false,
					        },
				        }
				    ],
				    series : [
				        {
				            name:'用户数量',
				            type:'bar',
				            barWidth: '50%',
				            itemStyle: {
				            	normal: {
				            		color: '#edae95'
				            	}
				            },
				            data:[1000, 200, 300, 500, 50,1000, 200, 300, 500,]
				        }
				    ]
				};
			    barStayTime.setOption(option);
			}

		}
	}
})