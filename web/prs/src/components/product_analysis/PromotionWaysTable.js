define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<el-tabs type="border-card">
			<el-tab-pane label="一季度">
			  	<el-table :key="promotionWaysKey1" v-loading="promotionWaysLoading1" :data="promotionWaysData1" 
					stripe class="table--promotion-ways" style="width: 100%;">
					<el-table-column 
						label="促销方式" 
						prop="promotion" 
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="销量" 
						prop="amount"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="均价" 
						prop="avgPrice"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ scope.row['avgPrice'] | doubleFloat }}</template>
					</el-table-column>
					<el-table-column label="销量增长" 
						prop="increaseRate"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['increaseRate'])"></div>
					        <span>{{scope.row['increaseRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column label="平台" 
						prop="channelName"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
					</el-table-column>
				</el-table>
	
			  </el-tab-pane>
			  <el-tab-pane label="二季度">
			  	<el-table :key="promotionWaysKey2" v-loading="promotionWaysLoading2" :data="promotionWaysData2" 
					stripe class="table--promotion-ways" style="width: 100%;">
					<el-table-column 
						label="促销方式" 
						prop="promotion" 
						align="center"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="销量" 
						prop="amount"
						align="center"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="均价" 
						prop="avgPrice"
						align="center"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ scope.row['avgPrice'] | doubleFloat }}</template>
					</el-table-column>
					<el-table-column label="销量增长" 
						prop="increaseRate"
						align="center"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['increaseRate'])"></div>
					        <span>{{scope.row['increaseRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column label="平台" 
						prop="channelName"
						align="center"
						:show-overflow-tooltip="true"> 
					</el-table-column>
				</el-table>
					
			  </el-tab-pane>
			  <el-tab-pane label="三季度">
			  	<el-table :key="promotionWaysKey3" v-loading="promotionWaysLoading3" :data="promotionWaysData3" stripe class="table--promotion-ways">
					<el-table-column 
						label="促销方式" 
						prop="promotion" 
						align="center"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="销量" 
						prop="amount"
						align="center"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="均价" 
						prop="avgPrice"
						align="center"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ scope.row['avgPrice'] | doubleFloat }}</template>
					</el-table-column>
					<el-table-column label="销量增长" 
						prop="increaseRate"
						align="center"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['increaseRate'])"></div>
					        <span>{{scope.row['increaseRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column label="平台" 
						prop="channelName"
						align="center"
						:show-overflow-tooltip="true"> 
					</el-table-column>
				</el-table>
			
			  </el-tab-pane>
			  <el-tab-pane label="四季度">
			  	<el-table :key="promotionWaysKey4" v-loading="promotionWaysLoading4" :data="promotionWaysData4" stripe class="table--promotion-ways">
					<el-table-column 
						label="促销方式" 
						prop="promotion" 
						align="center"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="销量" 
						prop="amount"
						align="center"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="均价" 
						prop="avgPrice"
						align="center"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ scope.row['avgPrice'] | doubleFloat }}</template>
					</el-table-column>
					<el-table-column label="销量增长" 
						prop="increaseRate"
						align="center"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['increaseRate'])"></div>
					        <span>{{scope.row['increaseRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column label="平台" 
						prop="channelName"
						align="center"
						:show-overflow-tooltip="true"> 
					</el-table-column>
				</el-table>
					
			  </el-tab-pane>
			</el-tabs>
							
		`,
		created:function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/saleAnalysis'){
					this.loadData()
				}
				
			}
		},
		data: function(){
			return {
				promotionWaysLoading1: true,
				promotionWaysLoading2: true,
				promotionWaysLoading3: true,
				promotionWaysLoading4: true,
				promotionWaysKey1: Date.now(),
				promotionWaysKey2: Date.now(),
				promotionWaysKey3: Date.now(),
				promotionWaysKey4: Date.now(),
				promotionWaysData1: [],
				promotionWaysData2: [],
				promotionWaysData3: [],
				promotionWaysData4: [],
			}
		},
		methods:{
			loadData: function(){
				this.promotionTab1();	
				this.promotionTab2();	
				this.promotionTab3();	
				this.promotionTab4();	
			},
			promotionTab1: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsPromotion',
					type: 'POST',
					data: {
						nextPage: 0,
						pageSize: 10,
						skuId: vm.skuId,
						year: 2017,
						season: 1,
					},
					beforeSend: function(){
						vm.promotionWaysLoading1 = true;
					},
					complete: function(){
						vm.promotionWaysLoading1 = false;
					},
					success: function(data){
						vm.promotionWaysData1 = data.object.content;
						vm.promotionWaysKey1 = Date.now();
					},
				})		
			},
			promotionTab2: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsPromotion',
					type: 'POST',
					data: {
						nextPage: 0,
						pageSize: 10,
						skuId: vm.skuId,
						year: 2017,
						season: 2,
					},
					beforeSend: function(){
						vm.promotionWaysLoading2 = true;
					},
					complete: function(){
						vm.promotionWaysLoading2 = false;
					},
					success: function(data){
						vm.promotionWaysData2 = data.object.content;
						vm.promotionWaysKey2 = Date.now();
					}
				})	
			},
			promotionTab3: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsPromotion',
					type: 'POST',
					data: {
						nextPage: 0,
						pageSize: 10,
						skuId: vm.skuId,
						year: 2017,
						season: 3,
					},
					beforeSend: function(){
						vm.promotionWaysLoading3 = true;
					},
					complete: function(){
						vm.promotionWaysLoading3 = false;
					},
					success: function(data){
						vm.promotionWaysData3 = data.object.content;
						vm.promotionWaysKey3 = Date.now();
					}
				})
			},
			promotionTab4: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsPromotion',
					type: 'POST',
					data: {
						nextPage: 0,
						pageSize: 10,
						skuId: vm.skuId,
						year: 2017,
						season: 4,
					},
					beforeSend: function(){
						vm.promotionWaysLoading4 = true;
					},
					complete: function(){
						vm.promotionWaysLoading4 = false;
					},
					success: function(data){
						vm.promotionWaysData4 = data.object.content;
						vm.promotionWaysKey4 = Date.now();
					}
				})
			},
			showArrow: utilObj.showArrow,
		}
	}
})