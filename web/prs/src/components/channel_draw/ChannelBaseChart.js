define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div class="tabs tabs--channel-basic">
			<span class="title--normal mr20">渠道基础数据</span>
			<div class="tabs__header" style="display: inline-block;width: initial;">
				<div class="tab-item is-active">新增用户</div>
				<div class="tab-item">活跃用户</div>
				<div class="tab-item">启动次数</div>
				<div class="tab-item">销量</div>
				<div class="tab-item">成交金额</div>
				<div class="tab-item">成交店铺</div>
			</div>
			<div class="tabs__content">
				<div class="tab-content">
					<div class="line--basic-wrapper">
						<div v-loading="chart.newCustomersLoading" class="chart chart--line--new-customers" style="height: 300px;"></div>
					</div>
				</div>
				<div class="tab-content">
					<div class="line--basic-wrapper">
						<div v-loading="chart.activeCustomersLoading" class="chart chart--line--active-customers" style="height: 300px;"></div>
					</div>
				</div>
				<div class="tab-content">
					<div class="line--basic-wrapper">
						<div v-loading="chart.startTimesLoading" class="chart chart--line--start-times" style="height: 300px;"></div>
					</div>
				</div>
				<div class="tab-content">
					<div class="line--basic-wrapper">
						<div v-loading="chart.channelSalesLoading" class="chart chart--line--channel-sales" style="height: 300px;"></div>
					</div>
				</div>
				<div class="tab-content">
					<div class="line--basic-wrapper">
						<div v-loading="chart.channelMoneyLoading" class="chart chart--line--channel-money" style="height: 300px;"></div>
					</div>
				</div>
				<div class="tab-content">
					<div class="line--basic-wrapper">
						<div v-loading="chart.channelStoreLoading" class="chart chart--line--channel-store" style="height: 300px;"></div>
					</div>
				</div>
			</div>
		</div>
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
				chart: {
					newCustomersLoading: true,
					activeCustomersLoading: true,
					startTimesLoading: true,
					channelSalesLoading: true,
					channelMoneyLoading: true,
					channelStoreLoading: true,
				}
			}
		},
		methods:{
			loadData: function(){
				var vm=this;
				var startDate = utilObj.dayStart(moment().subtract(13, 'days').format('YYYY-MM-DD'));
				var endDate = utilObj.dayEnd(moment().format('YYYY-MM-DD'));
				utilObj.ajax({
					url: '/m/productStats/statsChannelSale',
					type: 'POST',
					data: {
						startDate: startDate,
						endDate: endDate,
						mode: 3,
					},
					beforeSend: function(){
						vm.chart.newCustomersLoading = true;
						vm.chart.activeCustomersLoading = true;
						vm.chart.startTimesLoading = true;
						vm.chart.channelSalesLoading = true;
						vm.chart.channelMoneyLoading = true;
						vm.chart.channelStoreLoading = true;
					},
					complete: function(){
						vm.chart.newCustomersLoading = false;
						vm.chart.activeCustomersLoading = false;
						vm.chart.startTimesLoading = false;
						vm.chart.channelSalesLoading = false;
						vm.chart.channelMoneyLoading = false;
						vm.chart.channelStoreLoading = false;
					},
					success: function(data){
						var names = utilObj.getNameAry(data.object, 'channelName');
						var originXAixsData = utilObj.getMultipleAry(data.object, 'ddate')[0];
						var xAixsData = utilObj.transferDateAry(originXAixsData);
						var amountData = utilObj.getMultipleAry(data.object, 'amount');
						var amountMoneyData = utilObj.getMultipleAry(data.object, 'amountMoney');
						var shopCountData = utilObj.getMultipleAry(data.object, 'shopCount');
						
						var newUserCountData = utilObj.getMultipleAry(data.object, 'newUserCount');
						var activeUserCountData = utilObj.getMultipleAry(data.object, 'activeUserCount');
						var startupTimesData = utilObj.getMultipleAry(data.object, 'startupTimes');
						vm.lineChannelBasic({
							names: names,
							xAixsData: xAixsData,
							amountData: amountData,
							amountMoneyData: amountMoneyData,
							shopCountData: shopCountData,
							newUserCountData: newUserCountData,
							activeUserCountData: activeUserCountData,
							startupTimesData: startupTimesData,
						})
						
					}
				})
			},
			lineChannelBasic:function(params){
				$(".tab-content").show();
				var line1 = echarts.init($(".chart--line--new-customers")[0]);
				var line2 = echarts.init($(".chart--line--active-customers")[0]);
				var line3 = echarts.init($(".chart--line--start-times")[0]);
				var line4 = echarts.init($(".chart--line--channel-sales")[0]);
				var line5 = echarts.init($(".chart--line--channel-money")[0]);
				var line6 = echarts.init($(".chart--line--channel-store")[0]);
				$(window).resize(function(){
					line1.resize();
					line2.resize();
					line3.resize();
					line4.resize();
					line5.resize();
					line6.resize();
				})
				frameObj.bindEvent();
				$(".tabs--channel-basic .tab-item").click(function(){
					line1.resize();
					line2.resize();
					line3.resize();
					line4.resize();
					line5.resize();
					line6.resize();
				})
				frameObj.loadTabs();
				var theme = require('theme');
				var option = {
//					color: ['#2c82be', '#76ddfb','#53a8e2',],
					color: theme.colors,
					grid: {
						left: '10',
						right: '20',
						top: '60',
						bottom: '10',
						containLabel: true,
					},
					title: {
						text: 'LINE CHART 2',
						textStyle: {
							fontSize: '13'
						}
					},
			        tooltip: {
			//      	trigger: 'axis',
			//      	axisPointer: {
			//	            lineStyle: {
			//	                color: '#c8f1fd'
			//	            },
			//	        },
				        formatter: function (params) {
			//	            var params = params[0];
			//	            var date = new Date(params.name);
				            return params.name + '<br />' + params.value;
				        },
				    },
			        legend: {
			            data:[{
			            	name: 'PARTNER 1',
			            	icon: 'circle',
			            }],
			            right: '50',
			            top: '10',
			            itemHeight: '9',
			            show: true,
			        },
			        xAxis: {
			            type: 'category',
			            boundaryGap: true,
			            axisLine: {
				            lineStyle: {
				        		color: '#d7d7d7',
				        		width: 2,
				        	}
				        },
				        data: ['2017-04-26','2017-04-27','2017-04-28','2017-04-29','2017-04-30','2017-05-01','2017-05-02','2017-05-03','2017-05-04','2017-05-05','2017-05-06','2017-05-07','2017-05-08','2017-05-09'],
				        axisTick: {
				        	show: false,
				        	alignWithLabel: true,
				        	
				        },
				        axisLabel: {
				            textStyle: {
				            	color: '#000'
				            },
				            formatter: function (value, index) {
							    // 格式化成月/日，只在第一个刻度显示年份
							    var date = new Date(value);
							   return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-')
							},
							interval: 0,
				        },
				        splitLine: {
				        	show: false,
				        }
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
			//	        max: 500,
			        },
			        series: [{
			            name: 'PARTNER 1',
			            type: 'line',
			//          lineStyle: {
			//          	normal: {
			//          		color: '#51a5de'
			//          	}
			//          	
			//          },
			//          itemStyle: {
			//          	normal: {
			//          		color: '#51a5de'
			//          	}
			//          	
			//          },
			            'symbol': 'emptyCircle',
			            symbolSize: 8,
			            hoverAnimation: false,
			            data: [
			            	['2017-04-26', 100],
			            	['2017-04-27', 10],
			            	['2017-04-28', 200],
			            	['2017-04-29', 180],
			            	['2017-04-30', 160],
			            	['2017-05-01', 280],
			            	['2017-05-02', 400],
			            	['2017-05-03', 250],
			            	['2017-05-04', 300],
			            	['2017-05-05', 200],
			            	['2017-05-06', 270],
			            	['2017-05-07', 170],
			            	['2017-05-08', 200],
			            	['2017-05-09', 50]
			            ]
			        }]
			    };
			    
			    line1.setOption(utilObj.getChartOption(option, params, 'newUserCountData', {
			    	title: '新增用户'
			    }));
			    line2.setOption(utilObj.getChartOption(option, params, 'activeUserCountData', {
			    	title: '活跃用户'
			    }));
			    line3.setOption(utilObj.getChartOption(option, params, 'startupTimesData', {
			    	title: '启动次数'
			    }));
			    
			    line4.setOption(utilObj.getChartOption(option, params, 'amountData', {
			    	title: '销量'
			    }));
			    line5.setOption(utilObj.getChartOption(option, params, 'amountMoneyData', {
			    	title: '成交金额'
			    }));
			    line6.setOption(utilObj.getChartOption(option, params, 'shopCountData', {
			    	title: '成交店铺'
			    }));
			}

		}
	}
})