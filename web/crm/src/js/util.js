var utilObj = {
	envValue: 1,
	getApiHost:function(){
		var apiObj = {};
		switch(this.envValue){
			case 0:
				apiObj.baseUrl = 'http://192.168.2.171:8022';
				apiObj.picUrl = '';
				apiObj.crmUrl='http://dmp.3tichina.com';
				apiObj.cmsUrl='http://cmswx.3tichina.com/admin/wechat';
				break;
			case 1:
				apiObj.baseUrl = 'http://dmp.3tichina.com';
				apiObj.picUrl = '';
				apiObj.crmUrl='http://dmp.3tichina.com';
				apiObj.cmsUrl='http://cmswx.3tichina.com/admin/wechat';
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
		params.type = params.type || "POST";
		var proxypath="/proxy";
		if(params.proxypath) proxypath=params.proxypath;
		params.url = utilObj.getApiHost().baseUrl + proxypath + params.url + '?' + new Date().valueOf();
		var ajaxparams= $.extend({},params);
		if(!ajaxparams.data) ajaxparams.data={};
		if(noToken[params.url]==undefined){//如果该接口需要token
//			ajaxparams.data.token=sessionStorage.getItem("t");
		}
		
		ajaxparams.success=function(data,status,xhr){
			if(!data || !data.success){
				if(data.message){
					alert('failed (' + data.message + ')');
				}else {
					alert('failed');
				}	
			}else {
				if(params.success instanceof Function) params.success(data.data,status,xhr);
			}
			
		}
		
		ajaxparams.error=function(xhr){
			if(params.error instanceof Function) params.error(xhr);
		}
		return $.ajax(ajaxparams);
	},
	ajaxForCRM: function(params){
		params.url = utilObj.getApiHost().crmUrl + params.url + '?' + new Date().valueOf();
		var ajaxparams= $.extend({},params);
		if(!ajaxparams.data) ajaxparams.data={};
		ajaxparams.success=function(data,status,xhr){
			if(!data || !data.success){
				if(data.message){
					alert('接口出错' + data.message);
				}else {
					alert('接口出错');
				}	
			}else {
				if(params.success instanceof Function) params.success(data.details,status,xhr);
			}
			
		}
		ajaxparams.error=function(xhr){
			if(params.error instanceof Function) params.error(xhr);
		}
		return $.ajax(ajaxparams);
	},
	ajaxForCMS: function(params){
		params.url = utilObj.getApiHost().cmsUrl + params.url + '?' + new Date().valueOf();
		var ajaxparams= $.extend({},params);
		if(!ajaxparams.data) ajaxparams.data={};
		ajaxparams.success=function(data,status,xhr){
			if(!data || !data.status=="fail"){
				if(data.message){
					alert('接口出错' + data.message);
				}else {
					alert('接口出错');
				}	
			}else {
				if(params.success instanceof Function){
					data = (typeof(data) == 'string' ? JSON.parse(data) : data)
					params.success(data.data,status,xhr)
				};
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
	getPercent: function(value){
		return parseFloat(value*100).toFixed(2);
	},
	getCurUrl: function(){
		var curUrl = location.hash.slice(1) || '/';
		return curUrl;
	},
	getHost: function(){
		var reg = /.*(?=\/\w+\.html)/;
		var host= location.href.match(reg);
		return host;
	},
	getUrlParam:function(key){
	    var url = location.search;
	    var theRequest = {};
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        var strs = str.split("&");
	        for(var i = 0; i < strs.length; i ++) {
	            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	        }
	    }
	    return theRequest[key];
	},
	navigate:function(href,obj){
		if(href=="back"){
			history.back();
		}
		if(href.indexOf('.html')<0){
			href += '.html';
		}
		var newHref = this.getHost()+'/'+href;
		if(obj){
			newHref += '?';
			var urlEnd = $.param(obj);
			newHref += urlEnd;
		}
		location.href = newHref;	
	},
	getDate: function(date){
		if(date){
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}else{
			return '';
		}
		
	},
	getNativeDate: function(date){
		if(date){
			return new Date(date);
		}else{
			return '';
		}
	}
	
};
define(function(require,exports,module){
	exports.d = utilObj
});
