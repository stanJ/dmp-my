/*******************************消费人群属性分析************************************/
//年龄分布
Vue.component('user-age-chart', function (resolve,reject) {
	seajs.use(['user/UserAgeChart.js'],function(res){
		resolve(res.data);
	});
});

//学历分布
Vue.component('user-education-chart', function (resolve,reject) {
	seajs.use(['user/UserEducationChart.js'],function(res){
		resolve(res.data);
	});
});

//收入分布
Vue.component('user-income-chart', function (resolve,reject) {
	seajs.use(['user/UserIncomeChart.js'],function(res){
		resolve(res.data);
	});
});

//职业分布
Vue.component('user-jobs-chart', function (resolve,reject) {
	seajs.use(['user/UserJobsChart.js'],function(res){
		resolve(res.data);
	});
});

//性别分布
Vue.component('user-sex-chart', function (resolve,reject) {
	seajs.use(['user/UserSexChart.js'],function(res){
		resolve(res.data);
	});
});

//地域分布
Vue.component('user-place-chart', function (resolve,reject) {
	seajs.use(['user/UserPlaceChart.js'],function(res){
		resolve(res.data);
	});
});
/*******************************用户购买转换分析************************************/
//购买浏览人数分析-table
Vue.component('buyer-amount-table', function (resolve,reject) {
	seajs.use(['user/BuyerAmountTable.js'],function(res){
		resolve(res.data);
	});
});
//购买浏览人数分析-chart
Vue.component('buyer-amount-chart', function (resolve,reject) {
	seajs.use(['user/BuyerAmountChart.js'],function(res){
		resolve(res.data);
	});
});
//购买金额分布-table
Vue.component('expense-place-table', function (resolve,reject) {
	seajs.use(['user/ExpensePlaceTable.js'],function(res){
		resolve(res.data);
	});
});
//购买金额分布-chart
Vue.component('expense-place-chart', function (resolve,reject) {
	seajs.use(['user/ExpensePlaceChart.js'],function(res){
		resolve(res.data);
	});
});
//购买次数分布-table
Vue.component('buy-times-table', function (resolve,reject) {
	seajs.use(['user/BuyTimesTable.js'],function(res){
		resolve(res.data);
	});
});
//购买次数分布-chart
Vue.component('buy-times-chart', function (resolve,reject) {
	seajs.use(['user/BuyTimesChart.js'],function(res){
		resolve(res.data);
	});
});
//客单价分析
Vue.component('prices-table', function (resolve,reject) {
	seajs.use(['user/PricesTable.js'],function(res){
		resolve(res.data);
	});
});
//最近30天访客
Vue.component('visitor-chart', function (resolve,reject) {
	seajs.use(['user/VisitorChart.js'],function(res){
		resolve(res.data);
	});
});
//经营概况
Vue.component('business-overview-tabs', function (resolve,reject) {
	seajs.use(['user/BusinessOverviewTabs.js'],function(res){
		resolve(res.data);
	});
});

/*******************************用户购买特征分析************************************/
//o2o导入分析
Vue.component('o2o-chart', function (resolve,reject) {
	seajs.use(['user/O2oChart.js'],function(res){
		resolve(res.data);
	});
});
//性格偏好分析
Vue.component('prefer-cards', function (resolve,reject) {
	seajs.use(['user/PreferCards.js'],function(res){
		resolve(res.data);
	});
});
//价格区间分析
Vue.component('price-analysis-chart', function (resolve,reject) {
	seajs.use(['user/PriceAnalysisChart.js'],function(res){
		resolve(res.data);
	});
});
//品牌偏好分析
Vue.component('brand-prefer-chart', function (resolve,reject) {
	seajs.use(['user/BrandPreferChart.js'],function(res){
		resolve(res.data);
	});
});
//年龄差异分析
Vue.component('age-diff-chart', function (resolve,reject) {
	seajs.use(['user/AgeDiffChart.js'],function(res){
		resolve(res.data);
	});
});
//不同人群购买奶粉驱动因素
Vue.component('reason-cards', function (resolve,reject) {
	seajs.use(['user/ReasonCards.js'],function(res){
		resolve(res.data);
	});
});

/*******************************用户网络行为分析************************************/
//浏览时长
Vue.component('visit-time-chart', function (resolve,reject) {
	seajs.use(['user/VisitTimeChart.js'],function(res){
		resolve(res.data);
	});
});
//页面浏览量
Vue.component('visit-amount-chart', function (resolve,reject) {
	seajs.use(['user/VisitAmountChart.js'],function(res){
		resolve(res.data);
	});
});
//页面停留时间
Vue.component('page-stay-table', function (resolve,reject) {
	seajs.use(['user/PageStayTable.js'],function(res){
		resolve(res.data);
	});
});
//页面停留时间
Vue.component('page-analysis-table', function (resolve,reject) {
	seajs.use(['user/PageAnalysisTable.js'],function(res){
		resolve(res.data);
	});
});
var userObj = null;
var router = null;
var app = new Vue({
	el: "#app",
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
		
	},
	data: {
		//消费人群属性分析
		userAgeChartView:'',
		userEducationChartView:'',
		userIncomeChartView:'',
		userJobsChartView:'',
		userSexChartView:'',
		userPlaceChartView:'',
		
		//用户购买转换分析
		buyerAmountTableView:'',
		buyerAmountChartView:'',
		expensePlaceTableView:'',
		expensePlaceChartView:'',
		buyTimesTableView:'',
		buyTimesChartView:'',
		pricesTableView:'',
		businessOverviewTabsView:'',
		
		
		//用户购买特征分析
		o2oChartView:'',
		preferCardsView:'',
		priceAnalysisChartView:'',
		brandPreferChartView:'',
		ageDiffChartView:'',
		reasonCardsView:'',
		
		//用户网络行为分析
		visitTimeChartView:'',
		visitAmountChartView:'',
		pageStayTableView:'',
		pageAnalysisTableView:'',
		
		people: '',
		timeQuery: {
			month: '',
			date: '',
		},
		productsCategory: {
			allProducts: [],
			selectedOptions: (sessionStorage.selected && JSON.parse(sessionStorage.selected)) || {
				value: [],
				text: [],
			}
		},
		tab2NeedLoad: false,
		tab3NeedLoad: false,
		tab4NeedLoad: false,
		tab5NeedLoad: false,
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
			initRouter(vm);
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
function initRouter(app){
	userObj = {
		tab1: function(){
		},
		tab2: function(){
			if(app.tab2NeedLoad){
				app.userAgeChartView='';
				app.userEducationChartView='';
				app.userIncomeChartView='';
				app.userJobsChartView='';
				app.userSexChartView='';
				app.userPlaceChartView='';
			}
			app.tab2NeedLoad = false;
			app.$nextTick(function(){
				app.userAgeChartView='user-age-chart';
				app.userEducationChartView='user-education-chart';
				app.userIncomeChartView='user-income-chart';
				app.userJobsChartView='user-jobs-chart';
				app.userSexChartView='user-sex-chart';
				app.userPlaceChartView='user-place-chart';
			})
		},
		tab3: function(){
			if(app.tab3NeedLoad){
				app.buyerAmountTableView='';
				app.buyerAmountChartView='';
				app.expensePlaceTableView='';
				app.expensePlaceChartView='';
				app.buyTimesTableView='';
				app.buyTimesChartView='';
				app.pricesTableView='';
				app.businessOverviewTabsView='';
			}
			app.tab3NeedLoad = false;
			
			app.$nextTick(function(){
				app.buyerAmountTableView='buyer-amount-table';
				app.buyerAmountChartView='buyer-amount-chart';
				app.expensePlaceTableView='expense-place-table';
				app.expensePlaceChartView='expense-place-chart';
				app.buyTimesTableView='buy-times-table';
				app.buyTimesChartView='buy-times-chart';
				app.pricesTableView='prices-table';
				app.businessOverviewTabsView='business-overview-tabs';
			})
		},
		tab4: function(){
			if(app.tab4NeedLoad){
				app.o2oChartView = '';
				app.preferCardsView = '';
				app.priceAnalysisChartView = '';
				app.brandPreferChartView = '';
				app.ageDiffChartView = '';
				app.reasonCardsView = '';
			}
			app.tab4NeedLoad = false;
			
			app.$nextTick(function(){
				app.o2oChartView = 'o2o-chart';
				app.preferCardsView = 'prefer-cards';
				app.priceAnalysisChartView = 'price-analysis-chart';
				app.brandPreferChartView = 'brand-prefer-chart';
				app.ageDiffChartView = 'age-diff-chart';
				app.reasonCardsView = 'reason-cards';
			})
		},
		tab5: function(){
			if(app.tab5NeedLoad){
				app.visitTimeChartView = '';
				app.visitAmountChartView = '';
				app.pageStayTableView = '';
				app.pageAnalysisTableView = '';
			}
			app.tab5NeedLoad = false;
			
			app.$nextTick(function(){
				app.visitTimeChartView = 'visit-time-chart';
				app.visitAmountChartView = 'visit-amount-chart';
				app.pageStayTableView = 'page-stay-table';
				app.pageAnalysisTableView = 'page-analysis-table';
			})
		},
	}
	
	router = new Router({
		"/": {
			el: '#consumerAttrAnalysis',
			callback: function(){
				userObj.tab2();
			}
		},
		"/userLabelMaintain": {
			el: '#userLabelMaintain',
			callback: function(){
				userObj.tab1();
			}
		},
	//	"/": {
	//		el: '#userLabelMaintain',
	//		callback: function(){
	//			userObj.tab1();
	//		}
	//	},
	//	"/consumerAttrAnalysis": {
	//		el: '#consumerAttrAnalysis',
	//		callback: function(){
	//			userObj.tab2();
	//		}
	//	},
		"/userBuyTransferAnalysis": {
			el: '#userBuyTransferAnalysis',
			callback: function(){
				userObj.tab3();
			}
		},
		"/userBuyAttrAnalysis": {
			el: '#userBuyAttrAnalysis',
			callback: function(){
				userObj.tab4();
			}
		},
		"/userNetBehaviorAnalysis": {
			el: '#userNetBehaviorAnalysis',
			callback: function(){
				userObj.tab5();
			}
		},
		
	})
}




