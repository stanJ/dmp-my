define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper" style="margin-top: 12px;margin-right: 5px;">
			<el-table v-loading="loading" :data="data" stripe width="100%">
				<el-table-column 
					label="浏览次数" 
					prop="sumViewCount" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="百分比" 
					prop="ratio"
					align="center"
					:show-overflow-tooltip="true">
					<template scope="scope">{{ scope.row['ratio'] | rateOneFloat }}</template>
				</el-table-column>
				<el-table-column label="独立访客" 
					prop="uvCount"
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column label="IP" 
					prop="ipCount"
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column label="人均浏览次数" 
					prop="avgUVBrowseTimes"
					align="center"
					:show-overflow-tooltip="true"> 
					<template scope="scope">{{ scope.row['avgUVBrowseTimes'] | doubleFloat }}</template>
					
				</el-table-column>
				<el-table-column label="平均停留时间(秒)" 
					prop="avgWaitTime"
					align="center"
					:show-overflow-tooltip="true"> 
					<template scope="scope">{{ scope.row['avgWaitTime'] | doubleFloat }}</template>
					
				</el-table-column>
			</el-table>
			<div class="pagination">
				<span>每页显示</span>
				<el-select size="mini" class="select--mini" style="margin-right: 2px;line-height: 20px;" 
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