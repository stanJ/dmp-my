define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `
		<div v-loading="loading" class="chart chart--bar--basic-label1" style="height: 260px;"></div>
		`,
		mounted: function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/attrAnalysis'){
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
				utilObj.ajax({
					url: '/m/productStats/statsProductLabel',
					type: 'POST',
					data: {
						skuId: vm.skuId,
						topN: 10,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						var barHData = {
							yAxisData: utilObj.getAryByParam(data.object, 'content'),
							seriesData: utilObj.getAryByParam(data.object, 'count'),
						};
						vm.loadChart(barHData);
					}
				})
			},
			loadChart: function(params){
				var b1 = echarts.init($(".chart--bar--basic-label1")[0]);
				var option1 = {
					color: ['#e66574'],
				    grid: {
				        left: '20',
				        right: '50',
				        bottom: '0',
				        top: '0',
				        containLabel: true
				    },
				    xAxis: {
				    	show: false,
				        type: 'value',
				    },
				    yAxis: {
						inverse: true,
				        type: 'category',
				        data: params.yAxisData,
				        axisLine: {
				            show: false,
				        },
				        axisTick: {
				            show: false,
				        },
				        splitLine: {
				            show: false
				        },
				        axisLabel: {
				            textStyle: {
				                fontSize: '14',
				            },
				            margin: 18
				        }
				    },
				    series: [
				        {
				            name: '',
				            type: 'bar',
				            data: params.seriesData,
				            barCategoryGap: '50%',
				            label: {
				            	normal: {
				            		show: true,
				            		position: 'right',
				            		offset: [5,-1],
				            		textStyle: {
				            			fontSize: 13,
//				            			color: '#4a90e2',
				            		}
				            	},
				            },
				            itemStyle: {
				            	normal: {
//				            		color: new echarts.graphic.LinearGradient(
//				                        0, 0, 1, 0,
//				                        [
//				                            {offset: 0, color: '#65b3e6'},
//				                            {offset: 1, color: '#84e1fc'}
//				                        ]
//				                    )
				            	}
				            }
				        },
				    ]
				};
				b1.setOption(option1);
				$(window).resize(function(){
			    	b1.resize()
			    })
				b1.resize()
			}
		}
	}
})