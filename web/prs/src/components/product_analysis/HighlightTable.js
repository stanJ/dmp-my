define(function(require,exports,module){
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `
		<div class="table-wrapper" style="margin-bottom: 30px;">
			<el-table v-loading="loading" :data="data" stripe class="table--border">
				<el-table-column 
					label="" 
					width="64"
					prop="attr" 
					align="left"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					:label="item.label" 
					:prop="item.prop" 
					align="center"
					:show-overflow-tooltip="true"
					v-for="item in configData" :key="item.prop"> 
					<template scope="scope">
				        <div class="icon--tick" v-if="typeof scope.row[item.prop] == 'boolean' && scope.row[item.prop]"></div>
				        <template v-else-if="typeof scope.row[item.prop] == 'boolean' && !scope.row[item.prop]"></template>
				        <template v-else>{{ scope.row[item.prop] }}</template>
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
				if(curUrl == '/competeAnalysis'){
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
				configData: [],
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsCompeteProduct',
					type: 'POST',
					data: {
						skuId: vm.skuId,
						mode: 2,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						var d = data.object;
						var res = utilObj.getHighlightData(d);
						vm.data = res.data;
						vm.configData = res.configData;
					}
				})
			},
		}
	}
})