define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--line--visit-amount" style="height: 320px;"></div>
		`,
		mounted: function(){
			this.loadData();
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/userNetBehaviorAnalysis'){
					this.loadData();
				}
				
			}
		},
		data: function(){
			return {
				loading: true,
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				var startDate = utilObj.dayStart('2017-01-01');
				var endDate = utilObj.dayEnd(moment().format('YYYY-MM-DD'));
				utilObj.ajax({
					url: '/m/userStats/statsPageBrowse',
					type: 'POST',
					data: {
						startDate: startDate,
						endDate: endDate,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						vm.loadChart(data.object);
					}
				})
				
			},
			loadChart: function(data){
				var xAxisData = utilObj.getAryByParam(data, 'yearMonth', utilObj.getMonth);
				var seriesData1 = utilObj.getAryByParam(data, 'clickCount');
				var seriesData2 = utilObj.getAryByParam(data, 'pageViewCount');
				var line1 = echarts.init($(".chart--line--visit-amount")[0]);
				var option = {
					color: [theme.colors[3], theme.colors[9], ],
					grid: {
						left: '50',
						right: '10',
						top: '26',
						bottom: '20'
					},
			        tooltip: {},
			        legend: {
			            data:[
			            {
			            	name: '点击数',
			            	icon: 'circle',
			            },
			            {
			            	name: '页面浏览量',
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
			            data:xAxisData,
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
			        yAxis: {
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
			//	        max: 15000,
			        },
			        series: [
			        {
			            name: '点击数',
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
			            data: seriesData1,
			        },
			        {
			            name:'页面浏览量',
			            type:'line',
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
			           data: seriesData2,
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