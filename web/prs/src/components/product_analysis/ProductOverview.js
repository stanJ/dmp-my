define(function(require,exports,module){
    exports.data = {
		props:['skuId', 'needLoad'],
		template: `
		<table v-loading="loading" class="overview">
			<tr>
				<td class="left-top">
					<div class="overview__text">最近30天销量</div>
					<div class="overview__value">{{ product.sumCount }}</div>
				</td>
				<td>
					<div class="overview__text">同类销售比例</div>
					<div class="overview__value">{{ product.ratio | rateAttr }}</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="overview__text">商品点评数</div>
					<div class="overview__value">{{ product.sumCommentCount }}</div>
				</td>
				<td class="right-bottom">
					<div class="overview__text">好评率</div>
					<div class="overview__value">{{ product.sumPopulation | percent}}</div>
				</td>
			</tr>
		</table>
		`,
		created:function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/'){
					this.loadData()
				}else{
					this.$emit('update:needLoad', true);
				}
				
			}
		},
		data: function(){
			return {
				loading: true,
				product: {
					"ratio": '',
				    "sumCommentCount": '',
				    "sumCount": '',
				    "sumPopulation": '',
				},
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsProduct',
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
						utilObj.setVmData(vm.product, data.object);
					}
				})
			},
		}
	}
})