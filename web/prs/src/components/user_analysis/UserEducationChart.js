define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `	
		<div class="chart-wrapper clearfix">
			<div class="cw__left fl">
				<el-table v-loading="loading" :data="data" stripe class="table--education">
					<el-table-column 
						label="学历" 
						prop="1" 
						align="center"
						min-width="77"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="占百分比" 
						prop="2"
						align="center"
						min-width="77"
						:show-overflow-tooltip="true">
					</el-table-column>

				</el-table>
			</div>
			<div class="cw__right fr">
				<div class="legends-wrapper" style="margin-right: 0px;margin-bottom: 20px;margin-left: 46px;">
					<div class="clearfix legends legends--education legends--inline">
						<legends :config="config"></legends>
					</div>
				</div>
	
				<div v-loading="loading" class="chart chart--bar--education" style="height: 240px;"></div>
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
				config: {
					names: ['小学','初中','高中','大学','硕士','博士',],
					colors: theme.colors,
				}
				
			}
		},
		methods:{
			loadData: function(){
				this.data = [
				{
					'1': '小学',
					'2': '6%',
				},
				{
					'1': '初中',
					'2': '18%',
				},
				{
					'1': '高中',
					'2': '36%',
				},
				{
					'1': '大学',
					'2': '30',
				},
				{
					'1': '硕士',
					'2': '7%',
				},
				{
					'1': '博士',
					'2': '3%',
				},
				];
				
				var bar1 = echarts.init($(".chart--bar--education")[0]);
				var data = [[0, 6, 10, '小学'], [6, 16, 9, '初中'], [16, 40, 8, '高中'], [40, 54, 7, '大学'], [54, 74, 6, '硕士'], [74, 90, 5, '博士']];
				var colorList = theme.colors;
				
				data = echarts.util.map(data, function (item, index) {
				    return {
				        value: item,
				        itemStyle: {
				            normal: {
				                color: colorList[index]
				            }
				        },
				    };
				});
				
				function renderItem(params, api) {
				    var yValue = api.value(2);
				    var start = api.coord([api.value(0), yValue]);
				    var size = api.size([api.value(1) - api.value(0), yValue]);
				    var style = api.style();
				
				    return {
				        type: 'rect',
				        shape: {
				            x: start[0],
				            y: start[1],
				            width: size[0],
				            height: size[1]
				        },
				        style: style
				    };
				}
				
				var option = {
				    tooltip: {

				    },
				    xAxis: {
				        scale: true,
				        show: false,
				    },
				    yAxis: {
				    	show: false,
				    },
				    
				    series: [{
				        type: 'custom',
				        renderItem: renderItem,
				        label: {
				            normal: {
				                show: false,
				            }
				        },
				        dimensions: ['from', 'to', 'profit'],
				        encode: {
				            x: [0, 1],
				            y: 2,
				            tooltip: [0, 1, 2],
				            itemName: 3
				        },
				        data: data
				    }]
				};
				bar1.setOption(option);
				
			},
		}
	}
})