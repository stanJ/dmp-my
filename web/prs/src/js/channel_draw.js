//渠道基础数据
Vue.component('channel-base-left-table', function (resolve,reject) {
	seajs.use(['channel/ChannelBaseLeftTable.js'],function(res){
		resolve(res.data);
	});
});

//渠道健康
Vue.component('channel-base-right-table', function (resolve,reject) {
	seajs.use(['channel/ChannelBaseRightTable.js'],function(res){
		resolve(res.data);
	});
});

//渠道关注度分析
Vue.component('channel-focus-table', function (resolve,reject) {
	seajs.use(['channel/ChannelFocusTable.js'],function(res){
		resolve(res.data);
	});
});

//渠道成熟度分析
Vue.component('channel-mature-table', function (resolve,reject) {
	seajs.use(['channel/ChannelMatureTable.js'],function(res){
		resolve(res.data);
	});
});

//渠道用户停留时间
Vue.component('channel-staytime-chart', function (resolve,reject) {
	seajs.use(['channel/ChannelStayTimeChart.js'],function(res){
		resolve(res.data);
	});
});

//渠道基础数据多charts
Vue.component('channel-base-chart', function (resolve,reject) {
	seajs.use(['channel/ChannelBaseChart.js'],function(res){
		resolve(res.data);
	});
});

var app = new Vue({
	el: '#app',
	computed: {
		productId: function(){
			var selected = this.productsCategory.selectedOptions;
			if(selected.value.length == 0){
				return '';
			}
			sessionStorage.setItem('selected', JSON.stringify({
				value: selected.value.slice(-1),
				text: selected.text,
			}))
			var ary = selected.value;
			return utilObj.getOriginId(ary[ary.length-1]);
		},
	},
	watch: {
		productId: function(){
			
		}
	},
	data: {
		channelBaseLeftView:'channel-base-left-table',
		channelBaseRightView:'channel-base-right-table',
		channelFocusView:'channel-focus-table',
		channelMatureView:'channel-mature-table',
		channelStayTimeView:'channel-staytime-chart',
		channelBaseChartView:'channel-base-chart',
		
		dateRange: '',
		queryProject: '',
		channelHealthQuery: {
			query: '',
		},
		productsCategory: {
			allProducts: [],
			selectedOptions: (sessionStorage.selected && JSON.parse(sessionStorage.selected)) || {
				value: [],
				text: [],
			}
		},
	},
	created: function () {
		this.fetchData();
	},
	methods: {
		fetchData: function(){
			var vm = this;
			utilObj.getAllProducts(function(data){
				vm.productsCategory.allProducts = data.data1[0].children;
				var firstSku = data.data2[0];
				var firstCategory = data.data1[0].children[0];
				var defaultValue = {
					value: [firstSku._skuId],
					text: [firstCategory.categoryName, firstSku.brandName, firstSku.productName, firstSku.skuName]
				}
				if(vm.productsCategory.selectedOptions.value.length == 0){
					vm.productsCategory.selectedOptions = defaultValue;
				}
			})
		},
		insertData: function(res){
			var curId = res.val;
			var children = res.data;
			if(children){
				this.productsCategory.allProducts = utilObj.tryInsert(this.productsCategory.allProducts, curId, children)
			}
		},
	}
})
