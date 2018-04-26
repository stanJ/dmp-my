define(function(require,exports,module){
    exports.data = {
		template: `
		<div>
		<div class="sml--half">
			<el-table v-loading="loading1" :data="data1" stripe  height="160" 
				:show-header="false">
				<el-table-column 
					prop="1" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					prop="2"
					align="center"
					:show-overflow-tooltip="true">
				</el-table-column>
			</el-table>
		</div>
		<div class="smr--half">
			<el-table v-loading="loading2" :data="data2" stripe  height="160" 
				:show-header="false">
				<el-table-column 
					prop="1" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					prop="2"
					align="center"
					:show-overflow-tooltip="true">
				</el-table-column>
			</el-table>
		</div>
		</div>
		`,
		created:function(){
			this.loadData();
		},
		data: function(){
			return {
				loading1: true,
				data1: [],
				loading2: true,
				data2: [],
			}
		},
		methods:{
			loadData: function(){
				this.data1 = [
				{
					'1': '渠道份额',
					'2': '17.0%',
				},
				{
					'1': '周/月活跃率',
					'2': '3.5% | 8.7%',
				},
				{
					'1': '每日人均启动次数',
					'2': '5.0',
				},
				{
					'1': '每日人均启动次数',
					'2': '5.0',
				},
				];
				this.data2 = [
				{
					'1': '渠道份额',
					'2': '17.0%',
				},
				{
					'1': '周/月活跃率',
					'2': '3.5% | 8.7%',
				},
				{
					'1': '每日人均启动次数',
					'2': '5.0',
				},
				{
					'1': '每日人均启动次数',
					'2': '5.0',
				},
				];
				this.loading1=false;
				this.loading2=false;
			},
		}
	}
})