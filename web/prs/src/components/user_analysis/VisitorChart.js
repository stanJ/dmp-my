define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart visitor__bottom chart--area--visitors" style="height: 180px;"></div>
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
			}
		},
		methods:{
			loadData: function(){
				this.loadChart();
				
			},
			loadChart: function(){
				var area1 = echarts.init($(".chart--area--visitors")[0]);
				var option = {
					color: [theme.colors[3], ],
				    grid: {
				        left: 10,
				        right: 10,
				        bottom: 10,
				        top: 10,
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : false,
				            min: 1,
				            max: 20,
				            axisLine: {
					            lineStyle: {
					        		color: '#e2edf4',
					        		width: 1,
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
					        splitLine: {
					        	show: false,
					        }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
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
					        max: 12,
					        interval: 3,
				        }
				    ],
				    series : [
				        {
				            type:'line',
				            symbol: 'none',
			//	            label: {
			//	                normal: {
			//	                    show: true,
			//	                    position: 'top'
			//	                }
			//	            },
				            smooth: true,
				            areaStyle: {normal: {
				            	color: '#fbeee9'
				            }},
				            lineStyle: {
				            	normal: {
//				            		color: '#53a8e2'
				            	}
				            },
				            data:[
				            	[1,3.2],[2,3],[3,4.5],[4,4],[5,5],[6,8],[7,8],[8,6],[9,6.5],[10,2],
				            	[11,1],[12,9],[13,11],[14,6],[15,1],[16,5],[17,9],[18,3],[19,2],[20,5],
				            ]
				        }
				    ]
				};
				area1.setOption(option);
				$(window).resize(function(){
					area1.resize()
				})
				area1.resize()
			},
		}
	}
})