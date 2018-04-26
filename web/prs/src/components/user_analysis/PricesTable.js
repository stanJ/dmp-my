define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div>
			<div class="table-wrapper" style="margin-top: 10px;margin-right: 10px;">
				<el-table v-loading="loading" :data="data" stripe class="table--prices">
					<el-table-column 
						label="序号" 
						prop="1" 
						align="center"
						min-width="103"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="客单价区间" 
						prop="2"
						align="center"
						min-width="226"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column 
						label="人数" 
						prop="3" 
						align="center"
						min-width="180"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="人数占比" 
						prop="4"
						align="center"
						min-width="206"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column 
						label="男" 
						prop="5" 
						align="center"
						min-width="164"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="女" 
						prop="6"
						align="center"
						min-width="164"
						:show-overflow-tooltip="true">
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination">
				<span>每页显示</span>
				<el-select size="mini" class="select--mini" style="margin-right: 2px;" 
					placeholder="" 
					v-model="pageNum">
					<el-option :label="10" :value="10"></el-option>
					<el-option :label="9" :value="9"></el-option>
				</el-select>
				<span>条,</span>
				<span>1-9/9条</span>
			</div>
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
				}
				
			}
		},
		data: function(){
			return {
				loading: false,
				data: [],
				pageNum: 9,
			}
		},
		methods:{
			loadData: function(){
				this.data = [
				{
					'1': '1',
					'2': '0-50',
					'3': '1225254',
					'4': '41.13%',
					'5': '326784',
					'6': '985556',
				},
				{
					'1': '2',
					'2': '50-100',
					'3': '997448',
					'4': '33.23%',
					'5': '228972',
					'6': '667456',
				},
				{
					'1': '3',
					'2': '100-200',
					'3': '517062',
					'4': '17.04%',
					'5': '144568',
					'6': '335475',
				},
				{
					'1': '4',
					'2': '200-500',
					'3': '213588',
					'4': '7.18%',
					'5': '44405',
					'6': '108775',
				},
				{
					'1': '5',
					'2': '500-1000',
					'3': '20987',
					'4': '0.78%',
					'5': '4899',
					'6': '23586',
				},
				{
					'1': '6',
					'2': '1000-2000',
					'3': '6885',
					'4': '0.24%',
					'5': '2222',
					'6': '9224',
				},
				{
					'1': '7',
					'2': '2000-3000',
					'3': '5587',
					'4': '0.06%',
					'5': '658',
					'6': '874',
				},
				{
					'1': '8',
					'2': '3000-5000',
					'3': '1558',
					'4': '0.04%',
					'5': '335',
					'6': '654',
				},
				{
					'1': '9',
					'2': '5000-10000',
					'3': '892',
					'4': '0.03%',
					'5': '108',
					'6': '228',
				},
				]
			},
		}
	}
})