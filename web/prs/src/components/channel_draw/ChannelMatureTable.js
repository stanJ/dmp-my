define(function(require,exports,module){
    exports.data = {
		template: `
		<el-tabs type="border-card">
			<el-tab-pane label="成交额">
				<el-table :key="maturityKey" v-loading="dealAmountLoading" :data="dealAmountData" stripe  height="160">
					<el-table-column 
						label="渠道名称" 
						prop="channelName" 
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="今日成交金额" 
						prop="todayAmount"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true">
						<template scope="scope">{{ transferDoubleFloat(scope.row['todayAmount']) }}</template>
					</el-table-column>
					<el-table-column label="昨日成交金额" 
						prop="yesterdayAmount"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ transferDoubleFloat(scope.row['yesterdayAmount']) }}</template>
					</el-table-column>
					<el-table-column label="成交额增长率" 
						prop="amountRate"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['amountRate'])"></div>
					        <span>{{scope.row['amountRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column 
						label="操作" 
						align="center">
						<template scope="scope">
							<span class="op1">趋势</span>
							<span class="op2">明细</span>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="成交商品数">
				<el-table :key="maturityKey" v-loading="dealGoodsLoading" :data="dealGoodsData" stripe  height="160">
					<el-table-column 
						label="渠道名称" 
						prop="channelName" 
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="今日商品销量" 
						prop="todayNum"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="昨日成交销量" 
						prop="yesterdayNum"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ transferInteger(scope.row['yesterdayNum']) }}</template>
						
					</el-table-column>
					<el-table-column label="销量额增长率" 
						prop="numRate"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['numRate'])"></div>
					        <span>{{scope.row['numRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column 
						label="操作" 
						align="center">
						<template scope="scope">
							<span class="op1">趋势</span>
							<span class="op2">明细</span>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="成交人数">
				<el-table :key="maturityKey" v-loading="dealPeopleLoading" :data="dealPeopleData" stripe  height="160">
					<el-table-column 
						label="渠道名称" 
						prop="channelName" 
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="今日客户" 
						prop="todayPerson"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="昨日客户" 
						prop="yesterdayPerson"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column label="客户额增长率" 
						prop="personRate"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['personRate'])" v-if="scope.row['personRate'] != null"></div>
					        <span>{{scope.row['personRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column 
						label="操作" 
						align="center">
						<template scope="scope">
							<span class="op1">趋势</span>
							<span class="op2">明细</span>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="活跃店铺">
				<el-table :key="maturityKey" v-loading="activeStoreLoading" :data="activeStoreData" stripe  height="160">
					<el-table-column 
						label="渠道名称" 
						prop="channelName" 
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="今日活跃店铺" 
						prop="todayActiveShopCount"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="昨日活跃店铺" 
						prop="yesterdayActiveShopCount"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ transferInteger(scope.row['yesterdayActiveShopCount']) }}</template>
						
					</el-table-column>
					<el-table-column label="店铺增长率" 
						prop="activeShopCountRate"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['activeShopCountRate'])"></div>
					        <span>{{scope.row['activeShopCountRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column 
						label="操作" 
						align="center">
						<template scope="scope">
							<span class="op1">趋势</span>
							<span class="op2">明细</span>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="成交店铺">
				<el-table :key="maturityKey" v-loading="dealStoreLoading" :data="dealStoreData" stripe  height="160">
					<el-table-column 
						label="渠道名称" 
						prop="channelName" 
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="今日成交店铺" 
						prop="todayShopCount"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="昨日成交店铺" 
						prop="yesterdayShopCount"
						align="center"
						min-width="110"
						:show-overflow-tooltip="true"> 
						<template scope="scope">{{ transferInteger(scope.row['yesterdayShopCount']) }}</template>
						
					</el-table-column>
					<el-table-column label="店铺增长率" 
						prop="shopCountRate"
						align="center"
						min-width="100"
						:show-overflow-tooltip="true"> 
						<template scope="scope">
					        <div :class="showArrow(scope.row['shopCountRate'])"></div>
					        <span>{{scope.row['shopCountRate'] | rate}}</span>
					    </template>
					</el-table-column>
					<el-table-column 
						label="操作" 
						align="center">
						<template scope="scope">
							<span class="op1">趋势</span>
							<span class="op2">明细</span>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		`,
		created:function(){
			this.loadData();
		},
		data: function(){
			return {
				maturityKey: Date.now(),
				dealStoreData: [],
				dealStoreLoading: true,
				dealPeopleData: [],
				dealPeopleLoading: true,
				activeStoreData: [],
				activeStoreLoading: true,
				dealAmountData: [],
				dealAmountLoading: true,
				dealGoodsData: [],
				dealGoodsLoading: true,
			}
		},
		methods:{
			showArrow: utilObj.showArrow,
			transferInteger: utilObj.transferInteger,
			transferDoubleFloat: utilObj.transferDoubleFloat,
			loadData: function(){
				var vm = this;
				var today = utilObj.dayStart(moment().format("YYYY-MM-DD"));
				var yesterday = utilObj.dayStart(moment().subtract(1, 'days').format("YYYY-MM-DD"));
				utilObj.ajax({
					url: '/m/productStats/statsChannelSaleToday',
					type: 'POST',
					data: {
						topCategoryId:JSON.parse(localStorage.getItem("currentTopCategory")).id,
						today: today,
						yesterday: yesterday,
					},
					beforeSend: function(){
						vm.dealStoreLoading = true;
						vm.activeStoreLoading = true;
						vm.dealGoodsLoading = true;
						vm.dealAmountLoading = true;
						vm.dealPeopleLoading = true;
					},
					complete: function(){
						vm.dealStoreLoading = false;
						vm.activeStoreLoading = false;
						vm.dealGoodsLoading = false;
						vm.dealAmountLoading = false;
						vm.dealPeopleLoading = false;
					},
					success: function(data){
						vm.maturityKey = Date.now();
						vm.dealStoreData = data.object;
						vm.activeStoreData = data.object;
						vm.dealGoodsData = data.object;
						vm.dealAmountData = data.object;
						vm.dealPeopleData = data.object;	
					}
				});
			},
		}
	}
})