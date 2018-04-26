define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper" style="margin-top: 0px;margin-right: 20px;">
			<el-table v-loading="loading" :data="data" stripe class="table--buy-times">
				<el-table-column 
					label="月份" 
					prop="month" 
					align="center"
					:formatter="buyTimesMonth"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="购买人次(万)" 
					prop="buyCount"
					align="center"
					:show-overflow-tooltip="true">
					<template scope="scope">{{ scope.row['buyCount'] | wan }}</template>
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
				var curYear = new Date().getFullYear();
				var startDate = utilObj.dayStart(curYear + '-01-01');
				var endDate = utilObj.dayEnd(moment().format('YYYY-MM-DD'));
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsUserBuy',
					type: 'POST',
					data: {
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
						vm.data = data.object;
					}
				})
			},
			buyTimesMonth: function(row){
				return row.month + '月份'
			},
		}
	}
})