define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper">
			<el-table v-loading="loading" :data="data" stripe class="table--page-analysis">
				<el-table-column 
					label="页面URL" 
					prop="url" 
					align="left"
					min-width="240"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="测试量(PV)" 
					prop="sumViewCount"
					align="center"
					min-width="117"
					:show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="访客量(UV)" 
					prop="uvCount"
					align="center"
					min-width="117"
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
				if(curUrl == '/userNetBehaviorAnalysis'){
					this.loadData()
				}
				
			}
		},
		data: function(){
			return {
				loading: true,
				data: [],
				pageNum: 9,
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				var startDate = utilObj.dayStart('2017-05-01');
				var endDate = utilObj.dayEnd(moment().format("YYYY-MM-DD"));
				utilObj.ajax({
					url: '/m/userStats/statsPageWaitTime',
					type: 'POST',
					data: {
						nextPage: 0,
						pageSize: 10,
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
						vm.data = data.object.content;
					}
				})
			},
		}
	}
})