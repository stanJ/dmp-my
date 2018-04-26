define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div>
			<div v-loading="loading" class="chart chart--pie--place fl" style="height: 280px;width: 280px;margin-top: -18px;margin-left: 34px;"></div>
			<div class="legends-wrapper fr" style="height: 280px;width: 198px;margin-top: -18px;">
				<div class="fl clearfix legends legends--place">
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #b72525;"></div>
						<div class="legend__name">广东</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">22.19%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #e17500;"></div>
						<div class="legend__name">北京</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">13.94%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #f5a623;"></div>
						<div class="legend__name">浙江</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">11.81%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #dc5b27;"></div>
						<div class="legend__name">上海</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">10.53%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #faf176;"></div>
						<div class="legend__name">江苏</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">6.26%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #fab12a;"></div>
						<div class="legend__name">福建</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">4.41%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #c30016;"></div>
						<div class="legend__name">四川</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">3.98%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #dc5b27;"></div>
						<div class="legend__name">河南</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">2.7%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #dd0016;"></div>
						<div class="legend__name">湖南</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">2.56%</div>
					</div>
					<div class="legend-item clearfix">
						<div class="legend__icon" style="background: #ea9d7d;"></div>
						<div class="legend__name">其余地区</div>
						<div class="legend__origin-value">156</div>
						<div class="legend__value">21.62%</div>
					</div>
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
				
				var pie1 = echarts.init($(".chart--pie--place")[0]);
				var option = {
					color: theme.colors,
				    tooltip: {
				        trigger: 'item',
				        formatter: function(params){
		            		return params.seriesName + '<br />' + params.marker + params.name + ': ' + params.percent + '%';
		            	}
				    },
				    series: [
				        {
				            name:'地域',
				            type:'pie',
				            radius: ['47%', '80%'],
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
				            data:[
				                {value:156, name:'广东'},
				                {value:98, name:'北京'},
				                {value:83, name:'浙江'},
				                {value:74, name:'上海'},
				                {value:44, name:'江苏'},
				                {value:31, name:'福建'},
				                {value:28, name:'四川'},
				                {value:19, name:'河南'},
				                {value:18, name:'湖南'},
				                {value:152, name:'其余地区'},
				            ]
				        }
				    ]
				};
				pie1.setOption(option);
			},
		}
	}
})