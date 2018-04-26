define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--radar-age-diff" style="height: 300px;margin-top: 36px;"></div>
		`,
		mounted: function(){
			this.loadData();
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/userBuyAttrAnalysis'){
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
			loadChart: function(data){
				var radar1 = echarts.init($(".chart--radar-age-diff")[0]);
				var option = {
					color: theme.colors,
				    tooltip: {},
				    radar: {
				        indicator: [
				           { name: '生活需要', max: 100},
				           { name: '打折促销', max: 100},
				           { name: '送礼需要', max: 100},
				           { name: '工作需要', max: 100},
				           { name: '情感需要', max: 100},
				           { name: '收入增加', max: 100}
				        ],
				        center: ['50%','50%'],
				        name: {
			                textStyle: {
			                    color: '#000'
			                }
			           },
			            splitLine: {
			                lineStyle: {
			                    color: ['#f1e4da', '#ece0d6']
			                },
			            },
			            splitArea: {
			                areaStyle: {
			                    color: '#f3f2ec'
			                }
			            },
			            axisLine: {
			            	lineStyle: {
			            		color: '#ece0d6'
			            	}
			            }
				    },
				    series: [{
			//	        name: '预算 vs 开销（Budget vs spending）',
				        type: 'radar',
				        symbol: 'none',
				        data : [
				            {
				                value : [90, 55, 60, 60, 88, 90],
				                name : '电商',
				                areaStyle: {
			                        normal: {
			                            opacity: 0.6,
			                            color: '#ecbdaa'
			                        }
			                   },
			                   lineStyle: {
			                   		normal: {
//			                   			color: '#a5bae3'
			                   		}
			                   }
				            },
				            {
				                value : [40, 45, 45, 60, 40, 90],
				                name : '实体店',
				                areaStyle: {
			                        normal: {
			                            opacity: 0.6,
			                            color: '#eaaf88'
			                        }
			                   },
			                   lineStyle: {
			                   		normal: {
//			                   			color: '#6fd2f1'
			                   		}
			                   }
				            },
				            {
				                value : [40, 25, 80, 50, 30, 70],
				                name : '国外',
				                areaStyle: {
			                        normal: {
			                            opacity: 0.6,
			                            color: '#efd9bd'
			                        }
			                   },
			                   lineStyle: {
			                   		normal: {
//			                   			color: '#88bdb1'
			                   		}
			                   }
				            },
				        ]
				    }]
				};
				radar1.setOption(option);
			},
		}
	}
})