define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `
		<div v-loading="loading" class="cloud--user-comment" style="height: 280px;"></div>
		`,
		mounted: function(){
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
			}
		},
		methods:{
			loadData: function(){
				var vm = this;
				utilObj.ajax({
					url: '/m/productStats/statsProductLabel',
					type: 'POST',
					data: {
						skuId: vm.skuId,
						topN: 10,
					},
					beforeSend: function(){
						vm.loading = true;
					},
					complete: function(){
						vm.loading = false;
					},
					success: function(data){
						var cloudData = utilObj.getCloudData(data.object, {
							text: 'content',
							weight: 'count',
						});
						vm.loadCloud(cloudData);
					}
				})
			},
			loadCloud: function(word_list){
				$(".cloud--user-comment").html('');
			    $(".cloud--user-comment").jQCloud(word_list);
			}
		}
	}
})