define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div v-loading="loading" class="chart chart--bar-brand-prefer" style="height: 280px;width: 90%;"></div>
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
				loading: true,
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				var startDate = utilObj.dayStart('2017-05-01');
				var endDate = utilObj.dayEnd(moment().format('YYYY-MM-DD'));
				utilObj.ajax({
					url: '/m/productStats/statsProductBrand',
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
						vm.loadChart(data.object);
					}
				})
				
			},
			loadChart: function(data){
				var yAxisData = utilObj.getAryByParam(data, 'productName');
				var seriesData = utilObj.getAryByParam(data, 'ratio');
				var b1 = echarts.init($(".chart--bar-brand-prefer")[0]);
				var option1 = {
					color: [theme.colors[9], ],
				    grid: {
				        left: '20',
				        right: '60',
				        bottom: '0',
				        top: '0',
				        containLabel: true
				    },
				    xAxis: {
				    	show: false,
				        type: 'value',
			//	        max: 8,
				    },
				    yAxis: {
						inverse: true,
				        type: 'category',
				        data: yAxisData,
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
				            data: seriesData,
				            barCategoryGap: '50%',
				            label: {
				            	normal: {
				            		show: true,
				            		position: 'right',
				            		offset: [5,-1],
				            		textStyle: {
				            			fontSize: 13,
				            			color: '#000'
				            		},
				            		formatter: '{c}%'
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
			},
		}
	}
})