define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `	
		<div v-loading="loading" class="chart chart--line--visit-time" style="height: 320px;"></div>
		`,
		mounted: function(){
			this.loadData();
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/userNetBehaviorAnalysis'){
					this.loadData();
				}else{
					this.$emit('update:needLoad', true);
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
				var startDate = utilObj.dayStart('2017-05-01');
				var endDate = utilObj.dayEnd(moment().format('YYYY-MM-DD'));
				utilObj.ajax({
					url: '/m/userStats/statsBrowseTime',
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
				var seriesData1 = utilObj.getAryByParam(data, 'count');
				var seriesData2 = utilObj.getAryByParam(data, 'ratio');
				var line1 = echarts.init($(".chart--line--visit-time")[0]);
				var option = {
					color: [theme.colors[9], theme.colors[3]],
					grid: {
						left: '35',
						right: '10',
						top: '26',
						bottom: '40'
					},
			        tooltip: {},
			        legend: {
			            data:[
			            {
			            	name: '用户规模浏览时间(分钟)',
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
			            data:['10分钟或以内','10-30分钟\n(含30分钟)','30分钟-1个小时\n(含1个小时)','1-2个小时\n(含2个小时)','2小时及以上'],
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
					        max: 350,
					        interval: 50,
				        },
			        	{	
			        		show: false,
			//		        max: 100,
					        min: 0,
				            name: '增长率',
				        },
			        ],
			        series: [
			         {
			            name:'用户规模浏览时间(分钟)',
			            type:'bar',
			            barWidth: '40%',
			            itemStyle: {
			            	normal: {
//			            		color: '#83b5ea'
			            	}
			            	
			            },
			            data:seriesData1,
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