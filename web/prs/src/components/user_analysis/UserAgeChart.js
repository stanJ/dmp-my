define(function(require,exports,module){
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `	
		<div class="chart-wrapper clearfix">
			<div class="cw__left fl">
				<el-table v-loading="agesLoading" :data="agesData" stripe class="table--ages">
					<el-table-column 
						label="年龄" 
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
				<div v-loading="agesLoading" class="chart chart--pie--age" style="height: 280px;margin-top: -18px;"></div>
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
				}else{
					this.$emit('update:needLoad', true);
				}
				
			}
		},
		data: function(){
			return {
				agesData: [],
				agesLoading: false,
			}
		},
		methods:{
			loadData: function(){
				this.agesData = [
				{
					'1': '12-20',
					'2': '6%',
				},
				{
					'1': '21-30',
					'2': '18%',
				},
				{
					'1': '31-40',
					'2': '36%',
				},
				{
					'1': '41-50',
					'2': '30%',
				},
				{
					'1': '50以上',
					'2': '10%',
				},
				];
				var theme = require('theme');
				var pie1 = echarts.init($(".chart--pie--age")[0]);
				var option = {
					legend: {
			            data:[
			            {
			            	name: '12-20',
			            	icon: 'circle',
			            },
			            {
			            	name: '21-30',
			            	icon: 'circle',
			            },
			            {
			            	name: '31-40',
			            	icon: 'circle',
			            },
			            {
			            	name: '41-50',
			            	icon: 'circle',
			            },
			            {
			            	name: '50以上',
			            	icon: 'circle',
			            },
			            ],
			            right: '10%',
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
				            name:'年龄',
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
				                {value:6, name:'12-20'},
				                {value:18, name:'21-30'},
				                {value:36, name:'31-40'},
				                {value:30, name:'41-50'},
				                {value:10, name:'50以上'},
				            ]
				        }
				    ]
				};
				pie1.setOption(option)
				
			},
		}
	}
})