define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div>
			<div v-loading="loading" class="chart chart--pie--price-analysis fl" style="height: 270px;width: 270px;margin-left: 34px;"></div>
			<div class="legends-wrapper fr" style="height: 270px;width: 198px;margin-right: 10%;">
				<div class="fl clearfix legends legends--price-analysis">
				</div>
			</div>
		</div>
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
				var vm = this;
				var startDate = utilObj.dayStart('2017-05-01');
				var endDate = utilObj.dayEnd(moment().format('YYYY-MM-DD'));
				utilObj.ajax({
					url: '/m/productStats/statsPrice',
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
				var seriesData = utilObj.getAryByParams(data, {
					value: 'ratio',
					name: 'key',
				})
				var color = theme.colors;
				this.loadLegends(data, {
					color: color,
				})
				var pie1 = echarts.init($(".chart--pie--price-analysis")[0]);
				var option = {
					color: color,
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [
				        {
				            name:'用户关注价格区间',
				            type:'pie',
				            radius: ['50%', '86%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                },
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:seriesData,
				        }
				    ]
				};
				pie1.setOption(option)
			},
			loadLegends: function(data, params){
				var h = '';
				for(var i=0;i<data.length;i++){
					h += '<div class="legend-item clearfix">';
					h += 	'<div class="legend__icon" style="background: '+params.color[i]+';"></div>';
					h += 	'<div class="legend__name">'+data[i].key+'</div>';
					h +=	'<div class="legend__value">'+data[i].ratio+'%</div>';
					h += '</div>';
				}
				$(".legends--price-analysis").html(h);
			},
		}
	}
})