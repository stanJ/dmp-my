define(function(require,exports,module){
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `
		<div class="table-wrapper">								
			<el-table v-loading="loading" :data="data" stripe class="table--product-sales">
				<el-table-column 
					label="季度" 
					prop="season" 
					align="center"
					min-width="40"
					:formatter="tansferSeason"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="总销量" 
					prop="totalAmount"
					align="center"
					min-width="73"
					:show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="移动营销" 
					prop="mobileAmt"
					align="center"
					min-width="83"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column label="门店销售" 
					prop="shopAmt"
					align="center"
					min-width="80"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column label="均价" 
					prop="avgPrice"
					align="center"
					min-width="60"
					:show-overflow-tooltip="true"> 
					<template scope="scope">{{ scope.row['avgPrice'] | doubleFloat }}</template>
				</el-table-column>
				<el-table-column label="销量增长" 
					prop="amtIncreaseRate"
					align="left"
					min-width="74"
					:show-overflow-tooltip="true"> 
					<template scope="scope">
				        <div :class="showArrow(scope.row['amtIncreaseRate'])"></div>
				        <span>{{scope.row['amtIncreaseRate'] | rate}}</span>
				    </template>
				</el-table-column>
				<el-table-column label="同比增率" 
					prop="sameSeasonIncreaseRate"
					align="left"
					min-width="74"
					:show-overflow-tooltip="true"> 
					<template scope="scope">
				        <div :class="showArrow(scope.row['sameSeasonIncreaseRate'])"></div>
				        <span>{{scope.row['sameSeasonIncreaseRate'] | rate}}</span>
				    </template>
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
				if(curUrl == '/saleAnalysis'){
					this.loadData()
				}else{
					this.$emit('update:needLoad', true);
				}
				
			}
		},
		data: function(){
			return {
				loading: true,
				data: [],
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				var year = '2017'
				utilObj.ajax({
					url: '/m/productStats/statsProductSale',
					type: 'POST',
					data: {
						skuId: vm.skuId,
						year: year,
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
			tansferSeason: function(row){
				var value = row.season.toString();
				if(value){
					var num = value.slice(-1);
					value = '季度'+num;
				}
				return value;
			},
			showArrow: utilObj.showArrow,
		}
	}
})