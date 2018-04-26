define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--line--goodcomment" style="height: 270px;margin-right: 30px;margin-left: 18px"></div>
		`,
		mounted: function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/commentAnalysis'){
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
					url: '/m/productStats/statsProductGoodComment',
					type: 'POST',
					data: {
						skuId: vm.skuId,
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
						var goodCommentData = data.object;
						vm.loadChart(goodCommentData);
					}
				})
			},
			loadChart: function(data){
				var xAxisData = utilObj.getAryByParam(data, 'yearMonth', utilObj.getMonth)
				var seriesData = utilObj.getAryByParam(data, 'goodCount')
				var line1 = echarts.init($(".chart--line--goodcomment")[0]);
				var option = {
					color: [theme.colors[9], ],
					grid: {
						left: '0',
						right: '10',
						top: '26',
						bottom: '20',
						containLabel: true,
					},
			        tooltip: {},
			        legend: {
			            data:[{
			            	name: '好评数',
			            	icon: 'circle',
			            }],
			            right: '0',
			            top: '0',
			            itemHeight: '9'
			        },
			        xAxis: {
			            type: 'category',
			            boundaryGap: true,
			            data: xAxisData,
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
			//	        max: 100,
			        },
			        series: [{
			            name: '好评数',
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
			            data: seriesData,
			        }]
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