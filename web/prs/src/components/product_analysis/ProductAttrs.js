define(function(require,exports,module){
    exports.data = {
		props:['skuId', 'productsCategory', 'needLoad'],
		template: `
		<div v-loading="loading" class="clearfix products">
			<div class="bwl--c" style="height: 266px;overflow: auto;">
				<div class="product-brand">品牌:
					<span class="brand-name">{{ attrs.bigBrand }}</span>
					<el-button size="small">+关注</el-button>
				</div>
				<div class="product-params">
					<div class="param--product" v-for="item in attrs.left">{{ item.name }}:<span class="param__value">{{ item.value }}</span></div>
				</div>
			</div>
			<div class="bwr--c" style="height: 266px;overflow: auto;">
				<div class="params--right">
					<div class="param--product" v-for="item in attrs.right">{{ item.name }}:<span class="param__value">{{ item.value }}</span></div>
					
				</div>
			</div>
		</div>
		`,
		created:function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/attrAnalysis'){
					this.loadData()
				}else{
					this.$emit('update:needLoad', true);
				}
				
			}
		},
		data: function(){
			return {
				loading: true,
				attrs: {
					bigBrand: '',
					left: [],
					right: [],
				},
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsProductAttribute',
					type: 'POST',
					data: {
						skuId: vm.skuId,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						var d = data.object;
						vm.attrs.bigBrand = vm.productsCategory.selectedOptions.text.slice(-3, -2)[0];
						vm.attrs.left = d.slice(0,6);
						vm.attrs.right = d.slice(6);
					}
				})
			},
		}
	}
})