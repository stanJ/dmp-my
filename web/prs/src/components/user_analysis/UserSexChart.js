define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div class="chart-wrapper clearfix">
			<div class="cw__left fl">
				<el-table v-loading="loading" :data="data" stripe class="table--sex">
					<el-table-column 
						label="性别" 
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
				<div v-loading="loading" class="chart chart--pie--sex" style="height: 280px;margin-top: -18px;"></div>
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
				this.data = [
				{
					'1': '男',
					'2': '56%',
				},
				{
					'1': '女',
					'2': '44%',
				},
				];
				var theme = require('theme');
				var pie1 = echarts.init($(".chart--pie--sex")[0]);
				var option = {
					legend: {
			            data:[
			            {
			            	name: '男性',
			            	icon: 'circle',
			            },
			            {
			            	name: '女性',
			            	icon: 'circle',
			            },
			            {
			            	name: '未知',
			            	icon: 'circle',
			            },
			            ],
			            right: '20%',
			            bottom: '0',
			            itemHeight: '9'
			        },
					color: theme.colors,
				    tooltip: {
				        trigger: 'item',
				        formatter: function(params){
		            		return params.seriesName + '<br />' + params.marker + params.name + ': ' + params.percent + '%';
		            	}
				    },
				    series: [
				        {
				            name:'性别',
				            type:'pie',
				            radius: ['47%', '80%'],
				            center: ['60%','48%'],
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
				                {value:56, name:'男性'},
				                {value:44, name:'女性'},
				            ]
				        }
				    ]
				};
				pie1.setOption(option);
			},
		}
	}
})