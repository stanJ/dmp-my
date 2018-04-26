define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `	
		<div v-loading="loading" class="chart chart--line--o2o" style="height: 290px;"></div>
		`,
		mounted: function(){
			this.loadData();
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/userBuyAttrAnalysis'){
					this.loadData();
				}else{
					this.$emit('update:needLoad', true);
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
				this.loadChart();
				
			},
			loadChart: function(){
				var lineO2O = echarts.init($(".chart--line--o2o")[0]);
				var option = {
					color: [theme.colors[9], theme.colors[3]],
					grid: {
						left: '10',
						right: '10',
						top: '30',
						bottom: '10',
						containLabel: true,
					},
			        tooltip: {},
			        legend: {
			            data:[
			            {
			            	name: '移动网络用户规模(百万人)',
			            	icon: 'circle',
			            },
			            {
			            	name: '增长率',
			            	icon: 'circle',
			            },
			            ],
			            right: '0',
			            top: '0',
			            itemHeight: '9'
			        },
			        xAxis: {
			            type: 'category',
			            boundaryGap: true,
			            data:['2016年7月','2016年8月','2016年9月','2016年10月','2016年11月','2016年12月','2017年1月','2017年2月','2017年3月',
            '2017年4月','201年5月','2017年6月','2017年7月','2017年8月','2017年9月',],
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
				            interval: 2,
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
					        max: 350,
					        interval: 50,
				        },
			        	{	
			        		show: false,
					        max: 100,
					        min: 0,
				            name: '增长率',
				        },
			        ],
			        series: [
			         {
			            name:'移动网络用户规模(百万人)',
			            type:'bar',
			            barWidth: '40%',
			            itemStyle: {
			            	normal: {
//			            		color: '#83b5ea'
			            	}
			            	
			            },
			            data:[
			            360,320,280,240,200,
			            160,140,120,100,80,
			            70,60,50,40,30,]
			        },
			        {
			            name: '增长率',
			            type: 'line',
			            yAxisIndex: 1,
			            lineStyle: {
			            	normal: {
//			            		color: '#1ce7ba'
			            	}
			            	
			            },
			            itemStyle: {
			            	normal: {
//			            		color: '#1ce7ba'
			            	}
			            	
			            },
			            'symbol': 'circle',
			            symbolSize: 8,
			            hoverAnimation: false,
			            data: [
			            24.7,33.1,18.8,10.4,12.9,
			            24.7,33.1,18.8,10.4,12.9,
			            24.7,33.1,18.8,10.4,12.9,
			            ]
			        },
			       
			        ]
			    };
			    lineO2O.setOption(option)
			    $(window).resize(function(){
					lineO2O.resize()
				})
			    lineO2O.resize()
			},
		}
	}
})