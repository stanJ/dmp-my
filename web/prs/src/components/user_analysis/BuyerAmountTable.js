define(function(require,exports,module){
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `
		<div class="table-wrapper" style="margin-top: 12px;margin-right: 5px;">
			<el-table v-loading="loading" :data="data" stripe>
				<el-table-column 
					label="日期" 
					prop="1" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="订单金额" 
					prop="2"
					align="center"
					:show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="购买人数" 
					prop="3"
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column label="浏览人数" 
					prop="4"
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
			</el-table>
		</div>
		`,
		created:function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/userBuyTransferAnalysis'){
					this.loadData()
				}else{
					this.$emit('update:needLoad', true);
				}
				
			}
		},
		data: function(){
			return {
				loading: false,
				data: [],
			}
		},
		methods:{
			loadData: function(){
				this.data = [
				{
					'1': 'Day1',
					'2': '43243',
					'3': '141',
					'4': '1521',
				},
				{
					'1': 'Day2',
					'2': '42451',
					'3': '136',
					'4': '1424',
				},
				{
					'1': 'Day3',
					'2': '32478',
					'3': '112',
					'4': '1226',
				},
				{
					'1': 'Day4',
					'2': '25687',
					'3': '89',
					'4': '967',
				},
				{
					'1': 'Day5',
					'2': '0',
					'3': '0',
					'4': '0',
				},
				{
					'1': 'Day6',
					'2': '0',
					'3': '0',
					'4': '0',
				},
				{
					'1': 'Day7',
					'2': '0',
					'3': '0',
					'4': '0',
				},
				]
			},
		}
	}
})