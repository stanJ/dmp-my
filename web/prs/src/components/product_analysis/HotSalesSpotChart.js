define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--radar--hot-sales-spot" style="height: 280px;"></div>
		`,
		mounted: function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/'){
					this.loadData()
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
				var radar1 = echarts.init($(".chart--radar--hot-sales-spot")[0]);
				var option = {
					color: theme.colors,
				    title: {
				        text: '销售渠道',
				        left: 10,
				        top: 10,
				        textStyle: {
				        	fontSize: 17,
				        }
				    },
				    tooltip: {},
				    legend: {
			            data:[{
			            	name: '电商',
			            	icon: 'circle',
			            },{
			            	name: '实体店',
			            	icon: 'circle',
			            },],
			            left: '10',
			            top: '45',
			            itemHeight: '9'
			        },
				    radar: {
				        indicator: [
				           { name: '春节', max: 100},
				           { name: '节假日', max: 100},
				           { name: '情人节', max: 100},
				           { name: '五一', max: 100},
				           { name: '国庆', max: 100},
				           { name: '双十一', max: 100}
				        ],
				        center: ['65%','50%'],
				        name: {
			                textStyle: {
			                    color: '#000'
			                }
			           },
			            splitLine: {
			                lineStyle: {
			                    color: ['#f1e4da', '#ece0d6']
			                }
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
			                            color: '#f0d2d0'
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
			                            color: '#edbfa6'
			                        }
			                   },
			                   lineStyle: {
			                   		normal: {
//			                   			color: '#6fd2f1'
			                   		}
			                   }
				            }
				        ]
				    }]
				};
				radar1.setOption(option);
				$(window).resize(function(){
			    	radar1.resize()
			    })
				radar1.resize()
			},
		}
	}
})