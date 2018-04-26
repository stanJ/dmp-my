define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div class="chart-wrapper clearfix">
			<div class="cw__left fl">
				<el-table v-loading="loading" :data="data" stripe class="table--income">
					<el-table-column 
						label="收入" 
						prop="1" 
						align="center"
						min-width="97"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="占百分比" 
						prop="2"
						align="center"
						min-width="57"
						:show-overflow-tooltip="true">
					</el-table-column>

				</el-table>
			</div>
			<div class="cw__right fr">
				<div v-loading="loading" class="chart chart--line--income" style="height: 250px;margin-left: 40px;"></div>
			</div>
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
				data: [],
				loading: false,
			}
		},
		methods:{
			loadData: function(){
				this.data = [
				{
					'1': '3000以下',
					'2': '6%',
				},
				{
					'1': '3000-6000',
					'2': '18%',
				},
				{
					'1': '6000-10000',
					'2': '36%',
				},
				{
					'1': '10000-20000',
					'2': '30%',
				},
				{
					'1': '20000以上',
					'2': '10%',
				},
				];
				var theme = require('theme');
				var line1 = echarts.init($(".chart--line--income")[0]);
				var option = {
					color: ['#dc5b27', '#ea9d7d', '#c30016', ],
					grid: {
						left: '0',
						right: '12',
						top: '40',
						bottom: '13',
						containLabel: true,
					},
			        tooltip: {
			        	trigger: 'axis',
			        	axisPointer: {
				            lineStyle: {
				                color: theme.colors[9]
				            },
				        },
			        },
			        legend: {
			            data:[
			            {
			            	name: '0-3K',
			            	icon: 'circle',
			            },
			            {
			            	name: '3-6K',
			            	icon: 'circle',
			            },
			            {
			            	name: '6-10K',
			            	icon: 'circle',
			            },
			            ],
			            left: '30%',
			            bottom: '0',
			            itemHeight: '9'
			        },
			        xAxis: {
			        	show: false,
			            type: 'category',
			            boundaryGap: true,
			            data:['2017-04-26','2017-04-27','2017-04-28','2017-04-29','2017-04-30','2017-05-01','2017-05-02','2017-05-03',],
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
				        max: 25,
				        interval: 5,
			        },
			        series: [
			        {
			            name: '0-3K',
			            type: 'line',
			            lineStyle: {
			            	normal: {
//			            		color: '#51a5de'
			            	}
			            	
			            },
			            itemStyle: {
			            	normal: {
//			            		color: '#51a5de'
			            	},
			            	
			            },
			            areaStyle: {
			            	normal: {
			            		color: '#fae6de'
			            	}
			            },
			            'symbol': 'emptyCircle',
			            symbolSize: 10,
			            showSymbol: false,
			            hoverAnimation: false,
			            data: [10,4,2,4,5,3,10,6,]
			        },
			        {
			            name: '3-6K',
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
			            areaStyle: {
			            	normal: {
			            		color: '#f6d6c9'
			            	}
			            },
			            'symbol': 'emptyCircle',
			            symbolSize: 10,
			            showSymbol: false,
			            hoverAnimation: false,
			            data: [17,8,7,13,11,15,20,16,]
			        },
			        {
			            name: '6-10K',
			            type:'line',
			            lineStyle: {
			            	normal: {
//			            		color: '#70b6e6'
			            	}
			            	
			            },
			            itemStyle: {
			            	normal: {
//			            		color: '#70b6e6'
			            	}
			            	
			            },
			            areaStyle: {
			            	normal: {
			            		color: '#fae6de'
			            	}
			            },
			            'symbol': 'emptyCircle',
			            symbolSize: 10,
			            showSymbol: false,
			            hoverAnimation: false,
			            data: [25,15,18,20,16,17,24,22,]
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