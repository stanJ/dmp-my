define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper" style="margin-top: 10px;">
			<el-table v-loading="loading" :data="data" stripe class="table--expense-place">
				<el-table-column 
					label="Top10省份" 
					prop="1" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="付款金额(元)" 
					prop="2"
					align="center"
					:show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="购买人数" 
					prop="3"
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column label="访客数" 
					prop="4"
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column label="付款转化率" 
					prop="5"
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
					'1': '浙江',
					'2': '15204200',
					'3': '118620',
					'4': '1135800',
					'5': '10.44%',
				},
				{
					'1': '广东',
					'2': '14226200',
					'3': '108560',
					'4': '1145700',
					'5': '9.47%',
				},
				{
					'1': '北京',
					'2': '13652800',
					'3': '98600',
					'4': '845260',
					'5': '11.67%',
				},
				{
					'1': '上海',
					'2': '13451250',
					'3': '94760',
					'4': '885600',
					'5': '10.70%',
				},
				{
					'1': '江苏',
					'2': '11864450',
					'3': '89652',
					'4': '987450',
					'5': '9.08%',
				},
				{
					'1': '福建',
					'2': '10562130',
					'3': '86587',
					'4': '945612',
					'5': '9.16%',
				},
				{
					'1': '河北',
					'2': '9856210',
					'3': '81456',
					'4': '785414',
					'5': '10.40%',
				},
				{
					'1': '天津',
					'2': '8654102',
					'3': '79652',
					'4': '687452',
					'5': '11.59%',
				},
				{
					'1': '安徽',
					'2': '8256578',
					'3': '76840',
					'4': '954126',
					'5': '8.05%',
				},
				{
					'1': '山东',
					'2': '7412586',
					'3': '76541',
					'4': '578412',
					'5': '13.23%',
				},
				]
			},
		}
	}
})