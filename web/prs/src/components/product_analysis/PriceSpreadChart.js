define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div>
			<div v-loading="loading" class="chart chart--pie--price-spread fl" style="height: 270px;width: 270px;margin-left: 34px;"></div>
			<div class="legends-wrapper fr" style="height: 270px;width: 198px;">
				<div class="fl clearfix legends legends--price-spread">
				</div>
			</div>
		</div>
		`,
		mounted: function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/saleAnalysis'){
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
					url: '/m/productStats/statsProductSaleAmountByChannel',
					type: 'POST',
					data: {
						skuId: vm.skuId,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						var seriesData = utilObj.getPieData(data.object, {
							value: 'amount',
							name: 'channelName'
						})
						vm.loadChart({
							seriesData: seriesData,
							originData: data.object,
						})
					}
				})
			},
			loadChart: function(params){
				var color = theme.colors;
				this.loadLegends(params.originData, {
					color: color,
				})
				var pie1 = echarts.init($(".chart--pie--price-spread")[0]);
				var option = {
					color: color,
				    tooltip: {
				        trigger: 'item',
				        formatter: "{b}<br/>{d}%"
				    },
				    series: [
				        {
				            name:'',
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
				            data:params.seriesData,
				        }
				    ]
				};
				pie1.setOption(option)
				$(window).resize(function(){
					pie1.resize();
				})
				pie1.resize()
			},
			loadLegends: function(data, params){
				var h = '';
				for(var i=0;i<data.length;i++){
					h += '<div class="legend-item clearfix">';
					h += 	'<div class="legend__icon" style="background: '+params.color[i]+';"></div>';
					h += 	'<div class="legend__name">'+data[i].channelName+'</div>';
					h +=	'<div class="legend__value">'+utilObj.getRate(data[i].ratio)+'</div>';
					h += '</div>';
				}
				$(".legends--price-spread").html(h);
			}
		}
	}
})