define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper">
			<el-table v-loading="loading" 
				:data="data" 
				stripe class="table--product-month-count" 
				height="270">
				<el-table-column 
					label="序号" 
					prop="num" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="品牌" 
					prop="brandName" 
					align="center"
					:show-overflow-tooltip="true"> 
				</el-table-column>
				<el-table-column 
					label="月销量" 
					prop="salesCount"
					align="right"
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
				if(curUrl == '/saleAnalysis'){
					this.loadData()
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
					url: '/m/productStats/salesAmountByMonth',
					type: 'POST',
					data: {
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						vm.data = data.object.salesCount;
					}
				})
			},
		}
	}
})