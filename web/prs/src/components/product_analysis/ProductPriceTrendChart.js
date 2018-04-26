define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `
		<div v-loading="loading" class="chart chart--line--product-price-trend" style="height: 280px;"></div>
		`,
		mounted: function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/saleAnalysis'){
					this.loadData()
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
				var endDate = utilObj.dayEnd(moment().format("YYYY-MM-DD"));
				utilObj.ajax({
					url: '/m/productStats/statsProductSalePrice',
					type: 'POST',
					data: {
						skuId: vm.skuId,
						startDate: startDate,
						endDate: endDate,
						mode: 2,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						var xAxisData = utilObj.getAryByParam(data.object, 'ddate', utilObj.getMonth)
						var seriesData = utilObj.getAryByParam(data.object, 'avgPrice')
						vm.loadChart({
							xAxisData: xAxisData,
							seriesData: seriesData,
						})
					}
				})
			},
			loadChart: function(params){
				var line1 = echarts.init($(".chart--line--product-price-trend")[0]);
				var option = {
					color: [theme.colors[9], ],
					grid: {
						left: '10',
						right: '40',
						top: '40',
						bottom: '10',
						containLabel: true,
					},
			        tooltip: {},
			        legend: {
			            data:[{
			            	name: '价格',
			            	icon: 'circle',
			            }],
			            right: '40',
			            top: '0',
			            itemHeight: '9'
			        },
			        xAxis: {
			            type: 'category',
			            boundaryGap: true,
			            data:params.xAxisData,
			//          data:['1月','2月','3月','4月','5月',],
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
			//	        max: 3500,
			//	        interval: 500,
			        },
			        series: [{
			            name: '价格',
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
			            symbolSize: 8,
			            hoverAnimation: false,
			            data: params.seriesData,
			//          data: [
			//          	500, 1500, 2000, 1000, 2200
			//          ],
			        }]
			    };
			    line1.setOption(option)
			    $(window).resize(function(){
			    	line1.resize()
			    })
			    line1.resize()
			}
		}
	}
})