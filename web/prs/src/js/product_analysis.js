/*******************************标注总览************************************/
//标注总览
Vue.component('product-overview', function (resolve,reject) {
	seajs.use(['product/ProductOverview.js'],function(res){
		resolve(res.data);
	});
});
//标注总览-柱状图1
Vue.component('attr-label-chart', function (resolve,reject) {
	seajs.use(['product/AttrLabelChart.js'],function(res){
		resolve(res.data);
	});
});
//标注总览-柱状图2
Vue.component('emotion-label-chart', function (resolve,reject) {
	seajs.use(['product/EmotionLabelChart.js'],function(res){
		resolve(res.data);
	});
});
//商品评论热点
Vue.component('goods-comment-cloud', function (resolve,reject) {
	seajs.use(['product/GoodsCommentCloud.js'],function(res){
		resolve(res.data);
	});
});
//好评率
Vue.component('good-reputation-chart', function (resolve,reject) {
	seajs.use(['product/GoodReputationChart.js'],function(res){
		resolve(res.data);
	});
});
//销售热点
Vue.component('hot-sales-spot-chart', function (resolve,reject) {
	seajs.use(['product/HotSalesSpotChart.js'],function(res){
		resolve(res.data);
	});
});
/*******************************属性分析************************************/
//产品基本属性
Vue.component('product-attrs', function (resolve,reject) {
	seajs.use(['product/ProductAttrs.js'],function(res){
		resolve(res.data);
	});
});
//热点关键字
Vue.component('hot-key-cloud', function (resolve,reject) {
	seajs.use(['product/HotKeyCloud.js'],function(res){
		resolve(res.data);
	});
});
//基础标签分析-柱状图1
Vue.component('attr-basic-label-chart', function (resolve,reject) {
	seajs.use(['product/AttrBasicLabelChart.js'],function(res){
		resolve(res.data);
	});
});
//基础标签分析-柱状图2
Vue.component('emotion-basic-label-chart', function (resolve,reject) {
	seajs.use(['product/EmotionBasicLabelChart.js'],function(res){
		resolve(res.data);
	});
});
/*******************************销售分析************************************/
//产品销售数量
Vue.component('product-sales-table', function (resolve,reject) {
	seajs.use(['product/ProductSalesTable.js'],function(res){
		resolve(res.data);
	});
});
//月销量
Vue.component('product-month-count-table', function (resolve,reject) {
	seajs.use(['product/ProductMonthCountTable.js'],function(res){
		resolve(res.data);
	});
});
//月销售额
Vue.component('product-month-amount-table', function (resolve,reject) {
	seajs.use(['product/ProductMonthAmountTable.js'],function(res){
		resolve(res.data);
	});
});
//产品价格走势
Vue.component('product-price-trend-chart', function (resolve,reject) {
	seajs.use(['product/ProductPriceTrendChart.js'],function(res){
		resolve(res.data);
	});
});
//销售价格市场分布
Vue.component('price-spread-chart', function (resolve,reject) {
	seajs.use(['product/PriceSpreadChart.js'],function(res){
		resolve(res.data);
	});
});
//地图
Vue.component('map-price-chart', function (resolve,reject) {
	seajs.use(['product/MapPriceChart.js'],function(res){
		resolve(res.data);
	});
});
//促销方式
Vue.component('promotion-ways-table', function (resolve,reject) {
	seajs.use(['product/PromotionWaysTable.js'],function(res){
		resolve(res.data);
	});
});
/*******************************点评分析************************************/
//产品评论活跃度
Vue.component('comment-active-table', function (resolve,reject) {
	seajs.use(['product/CommentActiveTable.js'],function(res){
		resolve(res.data);
	});
});
//产品情感分析
Vue.component('emotion-analysis-table', function (resolve,reject) {
	seajs.use(['product/EmotionAnalysisTable.js'],function(res){
		resolve(res.data);
	});
});
//用户评论热点
Vue.component('user-comment-cloud', function (resolve,reject) {
	seajs.use(['product/UserCommentCloud.js'],function(res){
		resolve(res.data);
	});
});
//产品好评数
Vue.component('good-comment-chart', function (resolve,reject) {
	seajs.use(['product/GoodCommentChart.js'],function(res){
		resolve(res.data);
	});
});
//情感指数趋势
Vue.component('emotion-trend-table', function (resolve,reject) {
	seajs.use(['product/EmotionTrendTable.js'],function(res){
		resolve(res.data);
	});
});
/*******************************竞品分析************************************/
//产品亮点分析
Vue.component('highlight-table', function (resolve,reject) {
	seajs.use(['product/HighlightTable.js'],function(res){
		resolve(res.data);
	});
});
//品牌销量分析
Vue.component('brand-sales-table', function (resolve,reject) {
	seajs.use(['product/BrandSalesTable.js'],function(res){
		resolve(res.data);
	});
});
var productObj = null;
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
	data: {
		//原来第6个tab页数据，目前注释掉
//		categoryData: [],

		//标注总览
		productOverviewView: '',
		attrLabelChartView: '',
		emotionLabelChartView: '',
		goodsCommentCloudView: '',
		goodReputationChartView : '',
		hotSalesSpotChartView : '',
		//属性分析
		productAttrsView : '',
		hotKeyCloudView : '',
		attrBasicLabelChartView : '',
		emotionBasicLabelChartView : '',
		//销售分析
		productSalesTableView: '',
		productMonthCountTableView: '',
		productMonthAmountTableView: '',
		productPriceTrendChartView: '',
		priceSpreadChartView: '',
		mapPriceChartView: '',
		promotionWaysTableView: '',
		//点评分析
		commentActiveTableView: '',
		emotionAnalysisTableView: '',
		userCommentCloudView: '',
		goodCommentChartView: '',
		emotionTrendTableView: '',
		//竞品分析
		highlightTableView: '',
		brandSalesTableView: '',
		
		//所有查询条件
		highLightQuery: {
			people: '',
			product: '',
		},
		saleQuery: {
			month: '',
			people: '',
		},
		commentQuery: {
			website: '',
			time: '',
		},
		emotionQuery: {
			website: '',
			week: '',
		},
		productSaleQuery: {
			season: '',
			options: [
			{
				label: '季度1',
				value: '1',
			},
			{
				label: '季度2',
				value: '2',
			},
			]
		},
		productPriceTrendQuery: {
			year: '',
		},
		promotionWaysQuery: {
			season: '',
		},
		
		//产品分类
		productsCategory: {
			allProducts: [],
			selectedOptions: (sessionStorage.selected && JSON.parse(sessionStorage.selected)) || {
				value: [],
				text: [],
			}
		},
		tab1NeedLoad: false,
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
				initRouter(vm);
			})
		},
		insertData: function(res){
			var curId = res.val;
			var children = res.data;
			if(children){
				this.productsCategory.allProducts = utilObj.tryInsert(this.productsCategory.allProducts, curId, children)
			}

		},
//		loadCategoryList: function(){
//			this.categoryData = [{
//				'1': 'Apple iPhone 6s Plus',
//				'2': '32G 玫瑰金色 移动联通电信4G手机',
//				'3': '￥4099.00',
//			},{
//				'1': 'Apple iPhone 7',
//				'2': '128G 红色特别版 移动联通电信4G手机',
//				'3': '￥5699.00',
//			},{
//				'1': 'Apple iPhone 6s',
//				'2': '32G 金色 移动联通电信4G手机',
//				'3': '￥3999.00',
//			},]
//		},
	}
})

function initRouter(app){
	productObj = {
		tab1: function(){
			if(app.tab1NeedLoad){
				app.productOverviewView = '';
				app.attrLabelChartView = '';
				app.emotionLabelChartView = '';
				app.goodsCommentCloudView = '';
				app.goodReputationChartView  = '';
				app.hotSalesSpotChartView  = '';
			}
			app.tab1NeedLoad = false;
			
			app.$nextTick(function(){
				app.productOverviewView = 'product-overview';
				app.attrLabelChartView = 'attr-label-chart';
				app.emotionLabelChartView = 'emotion-label-chart';
				app.goodsCommentCloudView = 'goods-comment-cloud';
				app.goodReputationChartView  = 'good-reputation-chart';
				app.hotSalesSpotChartView  = 'hot-sales-spot-chart';
			})
			
			
		},
		tab2: function(){
			if(app.tab2NeedLoad){
				app.productAttrsView  = '';
				app.hotKeyCloudView  = '';
				app.attrBasicLabelChartView  = '';
				app.emotionBasicLabelChartView  = '';
			}
			app.tab2NeedLoad = false;
			
			app.$nextTick(function(){
				app.productAttrsView  = 'product-attrs';
				app.hotKeyCloudView  = 'hot-key-cloud';
				app.attrBasicLabelChartView  = 'attr-basic-label-chart';
				app.emotionBasicLabelChartView  = 'emotion-basic-label-chart';
			})
		},
		tab3: function(){
			if(app.tab3NeedLoad){
				app.productSalesTableView = '';
				app.productMonthCountTableView = '';
				app.productMonthAmountTableView = '';
				app.productPriceTrendChartView = '';
				app.priceSpreadChartView = '';
				app.mapPriceChartView = '';
				app.promotionWaysTableView  = '';
			}
			app.tab3NeedLoad = false;
			
			
			app.$nextTick(function(){
				app.productSalesTableView = 'product-sales-table';
				app.productMonthCountTableView = 'product-month-count-table';
				app.productMonthAmountTableView = 'product-month-amount-table';
				app.productPriceTrendChartView = 'product-price-trend-chart';
				app.priceSpreadChartView = 'price-spread-chart';
				app.mapPriceChartView = 'map-price-chart';
				app.promotionWaysTableView  = 'promotion-ways-table';
			})
		},
		tab4: function(){
			if(app.tab4NeedLoad){
				app.commentActiveTableView = '';
				app.emotionAnalysisTableView = '';
				app.userCommentCloudView = '';
				app.goodCommentChartView = '';
				app.emotionTrendTableView = '';
			}
			app.tab4NeedLoad = false;
			
			
			app.$nextTick(function(){
				app.commentActiveTableView = 'comment-active-table';
				app.emotionAnalysisTableView = 'emotion-analysis-table';
				app.userCommentCloudView = 'user-comment-cloud';
				app.goodCommentChartView = 'good-comment-chart';
				app.emotionTrendTableView = 'emotion-trend-table';
			})
			
		},
		tab5: function(){
			if(app.tab5NeedLoad){
				app.highlightTableView = '';
				app.brandSalesTableView = '';
			}
			app.tab5NeedLoad = false;
			
			
			app.$nextTick(function(){
				app.highlightTableView = 'highlight-table';
				app.brandSalesTableView = 'brand-sales-table';
			})
		},
	//	tab6: function(){
	//		app.loadCategoryList();
	//	},
	}
	router = new Router({
		"/": {
			el: '#labelOverview',
			callback: function(){
				productObj.tab1();
			}
		},
		"/attrAnalysis": {
			el: '#attrAnalysis',
			callback: function(){
				productObj.tab2();
			}
		},
		"/saleAnalysis": {
			el: '#saleAnalysis',
			callback: function(){
				productObj.tab3();
			}
		},
		"/commentAnalysis": {
			el: '#commentAnalysis',
			callback: function(){
				productObj.tab4();
			}
		},
		"/competeAnalysis": {
			el: '#competeAnalysis',
			callback: function(){
				productObj.tab5();
			}
		},
		"/productAnalysis": {
			el: '#productAnalysis',
			callback: function(){
				productObj.tab6();
			}
		},
	});
}
