define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper">
			<el-table v-loading="loading" :data="data" stripe class="table--emotion-trend">
				<el-table-column 
					min-width="50"
					:prop="item.prop"
					:label="item.label"
					align="center"
					:show-overflow-tooltip="true" v-for="item in configData" :key="item.prop"> 
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
				var today = utilObj.dayEnd(moment().format("YYYY-MM-DD"));
				var daysBefore = 7;
				utilObj.ajax({
					url: '/m/productStats/statsProductComment',
					type: 'POST',
					data: {
						skuId: vm.skuId,
						today: today,
						daysBefore: daysBefore,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						vm.data = utilObj.getEmotionData(data.object);
						vm.configData = utilObj.getConfigData(data.object);
					}
				})	
			},
			transferW: utilObj.transferW,
		}
	}
})