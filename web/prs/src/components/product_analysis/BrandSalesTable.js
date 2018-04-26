define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper" style="margin-bottom: 36px;">
			<el-table v-loading="loading" :data="data" stripe>
				<el-table-column 
					label="品牌名称" 
					prop="brandName" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="销量趋势" 
					prop="2"
					align="center"
					:show-overflow-tooltip="true">
					<template scope="scope">
				        <div class="icon--trend" v-if="scope.row[2]==true"></div>
				    </template>
				</el-table-column>
				<el-table-column 
					:label="item.label" 
					:prop="item.prop"
					align="center"
					v-for="item in configData"
					:key ="item.prop"
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
				if(curUrl == '/competeAnalysis'){
					this.loadData()
				}
				
			}
		},
		data: function(){
			return {
				loading: true,
				data: [],
				configData: [],
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				var startDate = utilObj.dayStart('2017-05-01');
				var endDate = utilObj.dayEnd(moment().format("YYYY-MM-DD"));
				utilObj.ajax({
					url: '/m/productStats/statsCompeteProductSaleAmount',
					type: 'POST',
					data: {
						skuId: vm.skuId,
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
						var res = utilObj.getBrandSalesData(data.object);
						vm.data = res.data;
						vm.configData = res.configData;
					}
				})		
			},
		}
	}
})