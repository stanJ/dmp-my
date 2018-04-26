define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `
		<div v-loading="loading" class="chart chart--bar-h2" style="height: 260px;margin-top: 20px;"></div>
		
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
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsProductLabel2',
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
				var b2 = echarts.init($(".chart--bar-h2")[0]);
				var option2 = {
					color: ['#ea9d7d'],
				    grid: {
				        left: '20',
				        right: '20',
				        bottom: '0',
				        top: '0',
				        containLabel: true
				    },
				    xAxis: {
				    	show: false,
				        type: 'value',
				        max: 100
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
				            		offset: [5,0],
				            		textStyle: {
				            			fontSize: 13,
//				            			color: '#58b9a5'
				            		},
				            		formatter: '{c}%',
				            		
				            	},
				            },
				            itemStyle: {
				            	normal: {
//				            		color: new echarts.graphic.LinearGradient(
//				                        0, 0, 1, 0,
//				                        [
//				                            {offset: 0, color: '#3dbfd7'},
//				                            {offset: 1, color: '#56ebd2'}
//				                        ]
//				                    )
				            	}
				            }
				        },
				    ]
				};
				b2.setOption(option2);
				$(window).resize(function(){
			    	b2.resize()
			    })
				b2.resize()
			}
		}
	}
})