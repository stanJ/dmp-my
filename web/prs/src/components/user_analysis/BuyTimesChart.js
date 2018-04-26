define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--line--buy-times" style="height: 408px;margin-left: 30px;"></div>
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
				
			}
		},
		data: function(){
			return {
				loading: false,
				data: [],
			}
		},
		methods:{
			loadData: function(){
				var curYear = new Date().getFullYear();
				var startDate = utilObj.dayStart(curYear + '-01-01');
				var endDate = utilObj.dayEnd(moment().format('YYYY-MM-DD'));
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsUserBuy',
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
						vm.data = data.object;
						vm.loadChart();
					}
				})
				
			},
			loadChart: function(){
				var line1 = echarts.init($(".chart--line--buy-times")[0]);
				var months = utilObj.getAryByParam(this.data, 'month', utilObj.getMonth);
				var option = {
					color: [theme.colors[9], ],
					title: {
						text: '2017年前三季度团购购买人次月度统计',
						left: 0,
					},
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
			            	name: '购买人次（万）',
			            	icon: 'circle',
			            },
			            ],
			            left: '40%',
			            top: '4',
			            itemHeight: '9'
			        },
			        xAxis: {
			            type: 'category',
			            boundaryGap: true,
			            data:months,
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
			//	        max: 4000,
			//	        interval: 500,
			        },
			        series: [
			        {
			            name: '购买人次（万）',
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
			//          data: [900,600,1100,2000,1800,2200,2800,3300,3000],
			            data: utilObj.getAryByParam(this.data,'buyCount',utilObj.getWan),
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