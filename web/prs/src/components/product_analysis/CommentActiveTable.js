define(function(require,exports,module){
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `
		<div class="table-wrapper">
			<el-table v-loading="loading" :data="data" stripe>
				<el-table-column 
					label="网站" 
					prop="channelName" 
					align="center"
					min-width="54"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="好评" 
					prop="goodCount"
					align="center"
					min-width="54"
					:show-overflow-tooltip="true">
					<template scope="scope">
						{{ transferW(scope.row['goodCount']) }}
					</template>										
				</el-table-column>
				<el-table-column label="中评" 
					prop="generalCount"
					align="center"
					min-width="54"
					:show-overflow-tooltip="true"> 
					<template scope="scope">
						{{ transferW(scope.row['generalCount']) }}
					</template>	
				</el-table-column>
				<el-table-column label="差评" 
					prop="poorCount"
					align="center"
					min-width="54"
					:show-overflow-tooltip="true"> 
					<template scope="scope">
						{{ transferW(scope.row['poorCount']) }}
					</template>	
				</el-table-column>
				<el-table-column label="追评" 
					prop="addedCount"
					align="center"
					min-width="54"
					:show-overflow-tooltip="true"> 
					<template scope="scope">
						{{ transferW(scope.row['addedCount']) }}
					</template>	
				</el-table-column>
				<el-table-column label="晒图" 
					prop="shineImgCount"
					align="center"
					min-width="54"
					:show-overflow-tooltip="true"> 
					<template scope="scope">
						{{ transferW(scope.row['shineImgCount']) }}
					</template>	
				</el-table-column>
				<el-table-column label="无情感" 
					prop="noSenseCount"
					align="center"
					:show-overflow-tooltip="true"> 
					<template scope="scope">
						{{ transferW(scope.row['noSenseCount']) }}
					</template>	
				</el-table-column>
				<el-table-column label="活跃指数" 
					prop="activeIndex"
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
				if(curUrl == '/commentAnalysis'){
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
				var startDate = utilObj.dayStart('2017-05-01');
				var endDate = utilObj.dayEnd(moment().format("YYYY-MM-DD"));
				utilObj.ajax({
					url: '/m/productStats/statsProductRemarkActive',
					type: 'POST',
					data: {
						nextPage: 0,
						pageSize: 10,
						skuId: vm.skuId,
						startDate: startDate,
						endDate: endDate,
						channelIds: '',
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
			transferW: utilObj.transferW,
		}
	}
})