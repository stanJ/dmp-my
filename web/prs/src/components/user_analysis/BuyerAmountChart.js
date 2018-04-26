define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId', 'akey'],
		template: `	
		<div v-loading="loading" class="chart chart--line--money-people" style="height: 380px;margin-top: 20px;"></div>
		`,
		mounted: function(){
			this.loadData();
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/userBuyTransferAnalysis'){
					this.loadData();
				}
			},
			akey: function(){
				this.chart.resize();
			},
			
		},
		data: function(){
			return {
				loading: false,
			}
		},
		methods:{
			loadData: function(){
				this.loadChart();
			},
			loadChart: function(){
				var line1 = echarts.init($(".chart--line--money-people")[0]);
				var option = {
					title: {
						text: '每日预定金额/浏览人数（不重复IP）'
					},
					color: [theme.colors[3], theme.colors[9], ],
					grid: {
						left: '0',
						right: '12',
						top: '40',
						bottom: '13',
						containLabel: true,
					},
			        tooltip: {},
			        legend: {
			            data:[
			            {
			            	name: '预定金额',
			            	icon: 'circle',
			            },
			            {
			            	name: '购买人数',
			            	icon: 'circle',
			            },
			            ],
			            left: '50%',
			            top: '2',
			            itemHeight: '9'
			        },
			        xAxis: {
			            type: 'category',
			            boundaryGap: true,
			            data:['2017-09-06','2017-09-07','2017-09-08','2017-09-09','2017-09-10','2017-09-11','2017-09-12'],
			            axisLine: {
				            lineStyle: {
				        		color: '#d7d7d7',
				        		width: 2,
				        	}
				        },
				        axisTick: {
				        	show: false,
				        },
				        axisLabel: {
				            textStyle: {
				            	color: '#000'
				            },
				            interval: 0,
				        },
			        },
			        yAxis: [
			        	{
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
				        },
			        	{	
			        		show: false,
				            name: '购买人数',
				        },
			        ],
			        series: [
			        {
			            name: '预定金额',
			            type: 'line',
			            lineStyle: {
			            	normal: {
//			            		color: '#51a5de'
			            	}
			            	
			            },
			            itemStyle: {
			            	normal: {
//			            		color: '#51a5de'
			            	}
			            	
			            },
			            'symbol': 'emptyCircle',
			            symbolSize: 10,
			            hoverAnimation: false,
			            data: [0,0,0,25687,32478,42451,43243,]
			        },
			        {
			            name:'购买人数',
			            type:'line',
			            yAxisIndex: 1,
			            lineStyle: {
			            	normal: {
//			            		color: '#76ddfb'
			            	}
			            	
			            },
			            itemStyle: {
			            	normal: {
//			            		color: '#76ddfb'
			            	}
			            	
			            },
			            'symbol': 'emptyCircle',
			            symbolSize: 10,
			            hoverAnimation: false,
			           data: [0,0,0,89,112,136,141,]
			        },
			        ]
			    };
			    line1.setOption(option)
			    $(window).resize(function(){
					line1.resize()
				})
			    line1.resize()
			},
		}
	}
})