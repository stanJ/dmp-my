var utilObj = {
	envValue:2,
	getApiHost:function(){
		var apiObj = {};
		switch(this.envValue){
			case 0:
				apiObj.baseUrl = 'http://test.3tichina.com:8023/xa-tag-web';
				apiObj.picUrl = '';
				break;
			case 1:
				apiObj.baseUrl = 'http://61.155.169.176:8066/xa-tag-web';
				apiObj.picUrl = '';
				break;
			case 2:
				apiObj.baseUrl = 'http://dmp.3tichina.com/xa-tag-web';
				apiObj.picUrl = '';
				break;
			case 3:
				apiObj.baseUrl = 'http://192.168.2.171:8022/xa-tag-web';
				apiObj.picUrl = '';
				break;
				
		}
		return apiObj;
	},
	ajax: function(params){
		var noToken = {
			'/j_spring_security_check':"",
		};
		if(noToken[params.url]==undefined){//如果该接口需要token
			if(!sessionStorage.getItem("t")){
//				sessionStorage.setItem("message","令牌失效，请登录");

//				此处应该去获取token
//				frameObj.login();
			}
		}
		params.url = utilObj.getApiHost().baseUrl + params.url + '?' + new Date().valueOf();
		var ajaxparams= $.extend({},params);
		if(!ajaxparams.data) ajaxparams.data={};
		var skuId = '';
		try{
			skuId = utilObj.getOriginId(JSON.parse(sessionStorage.selected).value[0])
			
		}
		catch(err){
			//
		}
		ajaxparams.data.productId = skuId;
		ajaxparams.data.skuId = skuId;
		if(noToken[params.url]==undefined){//如果该接口需要token
//			ajaxparams.data.token=sessionStorage.getItem("t");
		}
		ajaxparams.success=function(data,status,xhr){
			if(!data || data.code==0){
				if(data.message){
					if(data.message.indexOf('已失效')!=-1 || data.message.indexOf('无效')!=-1 || data.message.indexOf('超时')!=-1){
//						sessionStorage.setItem("message","登录过期,请重新登录");
						sessionStorage.removeItem('t');
						location.reload();
//						frameObj.login();
					}else{
						alert('接口出错' + data.message);
					}
				}else {
					alert('接口出错');
				}	
				
			}else {
				if(params.success instanceof Function) params.success(data,status,xhr);
			}
			
		}
		ajaxparams.error=function(xhr){
			if(params.error instanceof Function) params.error(xhr);
		}
		return $.ajax(ajaxparams);
	},
	getRate:function (value) {
		if(value){
			value = parseFloat(value)*100;
			value = value.toFixed(0)+'%';
		}else{
			value = '0%'
		}
		return value;
	},
	dayStart: function(value){
		return value + ' 00:00:00';
	},
	dayEnd: function(value){
		return value + ' 23:59:59';
	},
	getAryByParam: function(ary,param,func){
		return ary.map(function(x){
			if(func instanceof Function){
				return func(x[param])
			}else{
				return x[param]
			}
		})
	},
	getWan: function(value){
		return (parseInt(value)/10000).toFixed(2);
	},
	getPieData: function(ary,obj){
		return ary.map(function(x){
			var newObj = {};
			for(var key in obj){
				newObj[key] = x[obj[key]];
			}
			return newObj;
		})
	},
	getMultipleAry: function(obj, param){
		var ary = []
		for(var  key in obj){
			var aryChild = this.getAryByParam(obj[key], param);
			ary.push(aryChild)
		}
		return ary;
	},
	getNameAry: function(obj, param){
		var ary = []
		for(var  key in obj){
			var name = this.getAryByParam(obj[key], param)[0];
			ary.push(name)
		}
		return ary;
	},
	getChartOption: function(option, params, key, extraParams){
		var names = params.names;
		var legendDataObj = option.legend.data[0];
		var legendDataAry = [];
		option.title.text = extraParams.title;
		for(var i=0;i<names.length;i++){
			var newLegendDataObj = $.extend({}, legendDataObj, { name: names[i]});
			legendDataAry.push(newLegendDataObj);
		}
		option.legend.data = legendDataAry;
		option.xAxis.data = params.xAixsData;
		var seriesObj = option.series[0];
		var seriesAry = [];
		for(var j=0;j<params[key].length;j++){
			var newSeriesObj = $.extend({}, seriesObj, { name: names[j], data: params[key][j]});
			seriesAry.push(newSeriesObj);
		}
		option.series = seriesAry;
		return option;
	},
	transferDateAry: function(ary){
		_this = this;
		return ary.map(function(x){
			return _this.transferDate(x);
		})
	},
	transferDate: function(date){
		if(date){
			date = date.toString();
			date = date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6);
		}
		return date;
	},
	isInteger: function(obj) {
	 return Math.floor(obj) === obj
	},
	transferW: function(value){
		if(value>10000){
			value = value/10000;
			if(!utilObj.isInteger(value)){
				value = value.toFixed(1)
			}
			value = value + 'W+'
		}
		return value;
	},
	getMonth: function(value){
		value = value.toString();
		return value? parseInt(value.slice(-2)) + '月': value;
	},
	getCloudData: function(ary, params){
		return ary.map(function(x){
			return {
				text: x[params['text']],
				weight: x[params['weight']],
			}
		})
	},
	setVmData: function(obj, data){
		for(var key in obj){
			obj[key] = data[key];
		}
	},
	isPositiveNumber: function(value){
		if(value){
			if(parseFloat(value)>0){
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}
	},
	isNegativeNumber: function(value){
		if(value){
			if(parseFloat(value)<0){
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}
	},
	showArrow: function(value){
		return {
			'increase-arrow': utilObj.isPositiveNumber(value),
			'decrease-arrow': utilObj.isNegativeNumber(value),
		}
	},
	transferInteger: function(value){
		return parseInt(value);
	},
	transferDoubleFloat: function(value){
		return parseFloat(value).toFixed(2);
	},
	getAryByParams: function(ary, params){
		return ary.map(function(x){
			var obj = {};
			for(var key in params){
				obj[key] = x[params[key]];
			}
			return obj;
		})
	},
	getEmotionData: function(data){
		var ary = [];
		var countObj = {};
		var goodRateObj = {};
		var goodCountObj = {};
		var generalCountObj = {};
		var poorCountObj = {};
		var noSenseCountObj = {};
		
		ary = this.getEmotionAry(countObj, data, '点评数', ary);
		ary = this.getEmotionAry(goodRateObj, data, '好评率', ary);
		ary = this.getEmotionAry(goodCountObj, data, '好评数', ary);
		ary = this.getEmotionAry(generalCountObj, data, '中评数', ary);
		ary = this.getEmotionAry(poorCountObj, data, '差评数', ary);
		ary = this.getEmotionAry(noSenseCountObj, data, '无情感', ary);
		return ary;
	},
	getEmotionAry: function(obj, data, title, ary){
		var dateAry = data.ddate;
		var length = dateAry.length;
		for(var i=0;i<length;i++){
			var curValue = '';
			if(title == '点评数'){
				curValue = data.count[i];
			}else if(title == '好评率'){
				curValue = utilObj.getRate(data.goodRate[i]);
			}else if(title == '好评数'){
				curValue = data.goodCount[i];
			}else if(title == '中评数'){
				curValue = data.generalCount[i];
			}else if(title == '差评数'){
				curValue = data.poorCount[i];
			}else if(title == '无情感'){
				curValue = data.noSenseCount[i];
			}
			obj[dateAry[i]] = curValue;
		}
		obj.title = title;
		ary.push(obj);
		return ary;
	},
	getConfigData: function(data){
		var ary = [];
		var dateAry = data.ddate;
		var labels = dateAry.map(function(x){
			x = x.toString();
			return x.slice(4,6) + '-' + x.slice(6);
		})
		ary.push({
			label: '',
			prop: 'title',
		})
		for(var i=0;i<dateAry.length;i++){
			var obj = {
				label: labels[i],
				prop: dateAry[i].toString(),
			}
			ary.push(obj);
		}
		return ary;
	},
	getHighlightData: function(data){
		var attrs = [];
		var keys = [];
		var values = [];
		var obj = {};
		var highlightData = [];
		var i = 0;
		for(var key in data){
			if(i == 0){
				obj = data[key];
			}
			attrs.push(key);
			var innerValues = this.getOneHighlight(data[key]);
			values.push(innerValues);
			i++;
		}
		for(var key1 in obj){
			keys.push(obj[key1].productName);
		}
		for(var j=0;j<attrs.length;j++) {
			var oneObj = {};
			oneObj.attr = attrs[j];
			var oneValueAry = values[j];
			for(var x=0;x<keys.length;x++){
				oneObj[keys[x]] = oneValueAry[x];
			}
			highlightData.push(oneObj);
		}
		var configData = [];
		for(var y=0;y<keys.length;y++){
			var configObj = {};
			configObj.label = keys[y];
			configObj.prop = keys[y];
			configData.push(configObj);
		}
		return {
			configData: configData,
			data: highlightData, 
		};
	},
	getOneHighlight: function(obj){
		var ary = [];
		for(var key in obj){
			if(obj[key].has != undefined){
				ary.push(obj[key].has)
			}else if(obj[key].value != undefined){
				ary.push(obj[key].value)
			}
			
		}
		return ary;
	},
	injectData: function(val, originData, newData){
		for(var i=0;i<originData.length;i++){
			if(val == originData[i].productId){
				originData[i].children = newData;
			}else{
				if(originData[i].children){
					utilObj.injectData(val, originData[i].children, newData)
				}
			}
		}
	},
	categoryData: null,
	productsData: null,
	getLabelByValue: function(valueAry){
		if(!this.categoryData){
			this.categoryData = JSON.parse(sessionStorage.productTree).data1[0].children;
		}
		if(!this.productsData){
			this.productsData = JSON.parse(sessionStorage.productTree).data2;
		}
		var ary = []
		for(var i=0;i<valueAry.length;i++){
			var x = valueAry[i];
			if(x.indexOf('c_') != -1){
				var label = '';
				label = utilObj.getLabel(x, utilObj.categoryData, label);
				ary.push(label);
			}else{
				break;
			}
		}
		var res = _.where(this.productsData, {
			_skuId: valueAry[valueAry.length-1]
		})
		ary.push(res[0].brandName)
		ary.push(res[0].productName)
		ary.push(res[0].skuName)
		return ary
	},
	getLabel: function(val, originData, label){
		for(var i=0;i<originData.length;i++){
			if(val == originData[i]._categoryId){
				label = originData[i].categoryName;
				break;
			}else{
				if(originData[i].children.length != 0){
					label = utilObj.getLabel(val, originData[i].children, label)
				}
			}
		}
		return label;
	},
	getOriginId: function(curId){
		if(curId){
			return parseInt(curId.slice(curId.indexOf('_')+1))
		}else{
			return ''
		}
		
	},
	tryInsert: function(data, curId, children){
		var len = data.length;
		for(var i = 0; i < len; i++){
			if(data[i]._categoryId == curId){
				data[i].children = children;
				break;
			}else{
				if(data[i].children && data[i].children.length != 0){
					data[i].children = this.tryInsert(data[i].children, curId, children)
				}
									
			}
		}
		return data;
	},
	getBrand: function(val, originData, label){
		for(var i=0;i<originData.length;i++){
			if(val == originData[i].productId){
				label = originData[i].product_brand1;
				break;
			}else{
				if(originData[i].children){
					label = utilObj.getBrand(val, originData[i].children, label)
				}
			}
		}
		return label;
	},
	getFirstProducts: function(callback){
		utilObj.ajax({
			url: '/m/productStats/loadProductCate',
			type: 'POST',
			data: {
				cateId: 29,
			},
			success: function(data){
				callback && callback(data.object);
			}
		})
	},
	getAllProducts: function(callback){
		var productTree = sessionStorage.getItem('productTree');
		var productTreeData = null;
		if(productTree){
			productTreeData = JSON.parse(productTree);
			callback && callback(productTreeData);
		}else{
			//初始化项目顶级分类
			if(!localStorage.getItem("currentTopCategory")){
				localStorage.setItem("currentTopCategory",JSON.stringify({id:16,value:"红酒"}));
			}
			utilObj.ajax({
				url: '/m/productStats/loadProductTree',
				type: 'POST',
				data: {
					topCategoryId:JSON.parse(localStorage.getItem("currentTopCategory")).id
				},
				success: function(data){
					sessionStorage.setItem('productTree', JSON.stringify(data.object));
					callback && callback(data.object);
				}
			})
		}
		
	},
	addChildrenAttr: function(data){
		return data.map(function(x){
			if(x.productLevel !=4){
				x.children = [];
			}
			return x;
		})
	},
	getPercent: function(value){
		return parseFloat(value*100).toFixed(2);
	},
	getBrandSalesData: function(data){
		var i = 0;
		var channels = [];
		var ary1 = [];
		var brandSalesData = [];
		for(var key in data){
			if(i == 0){
				ary1 = data[key]
			}
			var obj = {};
			obj.brandName = key;
			var channelAry = data[key];
			var len = channelAry.length;
			for(var j = 0; j < len; j++){
				obj[channelAry[j].channel_name] = channelAry[j].total
			}
			obj['2'] = true;
			brandSalesData.push(obj)
		}
		channels = ary1.map(function(x){
			return x.channel_name;
		})
		var configData = [];
		configData = channels.map(function(x){
			return {
				label: x,
				prop: x,
			}
		})
		return {
			configData: configData,
			data: brandSalesData,
		}
		
	},
	getHighlightData: function(data){
		var attrs = [];
		var keys = [];
		var values = [];
		var obj = {};
		var highlightData = [];
		var i = 0;
		for(var key in data){
			if(i == 0){
				obj = data[key];
			}
			attrs.push(key);
			var innerValues = this.getOneHighlight(data[key]);
			values.push(innerValues);
			i++;
		}
		for(var key1 in obj){
			keys.push(obj[key1].productName);
		}
		for(var j=0;j<attrs.length;j++) {
			var oneObj = {};
			oneObj.attr = attrs[j];
			var oneValueAry = values[j];
			for(var x=0;x<keys.length;x++){
				oneObj[keys[x]] = oneValueAry[x];
			}
			highlightData.push(oneObj);
		}
		var configData = [];
		for(var y=0;y<keys.length;y++){
			var configObj = {};
			configObj.label = keys[y];
			configObj.prop = keys[y];
			configData.push(configObj);
		}
		return {
			configData: configData,
			data: highlightData, 
		};
	},
	getCurUrl: function(){
		var curUrl = location.hash.slice(1) || '/';
		return curUrl;
	}
	
};
define(function(require,exports,module){
	exports.d = utilObj
});
(function($){
	function Router(routes) {
        this.routes = routes;
        this.currentUrl = '';
        this.init();
   }
    Router.prototype.refresh = function() {
        this.currentUrl = location.hash.slice(1) || '/';
        var obj = this.routes[this.currentUrl];
        var a =  $("a[href='#"+this.currentUrl+"']");
        $(".tab-title").removeClass('is-active');
        a.addClass('is-active');
        var tab = $(".tab-title.is-active");
        var title = $(".nav__title");
		if(title){
			title.find('.title-prefix-md').text(tab.text());
		}
        
        $(".tab-pane").hide();
        $(obj.el).show();
        $(window).trigger('resize');
        obj.callback && obj.callback();
    };
    Router.prototype.init = function() {
    	 this.refresh();
//      window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = treeBuilder;
	} else {
		window.Router = Router;
	}
})(jQuery)
