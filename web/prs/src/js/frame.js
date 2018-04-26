Vue.filter('rate', function (value) {
	if(value){
		value = Math.abs(parseFloat(value))*100;
		value = value.toFixed(0)+'%';
	}else if(value === null){
		value = '—'
	}else {
//		value = '0%';
	}
	return value;
})
Vue.filter('rateAttr', function (value) {
	if(value){
		value = Math.abs(parseFloat(value))*100;
		value = value.toFixed(2)+'%';
	}else if(value === null){
		value = ''
	}else if(value === 0){
		value = '0%';
	}
	return value;
})
Vue.filter('percent', function(value){
	if(value){
		value = value+'%';
	}else if(value === null){
		value = ''
	}else if(value === 0){
		value = '0%';
	}
	return value;
})
Vue.filter('int', function (value) {
	if(value){
		value = parseInt(value);
	}
	return value;
})
Vue.filter('rateOneFloat', function (value) {
	if(!value){
		value = 0;
	}
	value = parseFloat(value)*100;
	value = value.toFixed(1)+'%';
	return value;
})
Vue.filter('doubleFloat', function (value) {
	if(!value){
		value = 0;
	}
	value = parseFloat(value);
	value = value.toFixed(2);
	return value;
})
Vue.filter('wan', function (value) {
	if(!value){
		value = 0;
	}
	return (parseInt(value)/10000).toFixed(2);
})
Vue.component('nav-product', {
	props: ['options','value',],
	template: '\
			<div class="nav-path">\
				<div class="np-prs">DMP</div>\
				<div class="prs-left">\
					<span class="prs-text fl">PRS System</span>\
					<el-cascader\
						class="fl"\
						expand-trigger="hover"\
						:options="options"\
						:props="props"\
						v-model="value.value"\
						@change="handleChange"\
						@active-item-change="handleItemChange"\
						:show-all-levels="false"\
					>\
					</el-cascader>\
					<product-selected :products="value.text"></product-selected>\
				</div>\
				<div class="prs-right">\
					<div class="icon icon-mail"></div>\
					<div class="icon icon-star"></div>\
				</div>\
			</div>',
	data: function(){
		return {
			props: {
				value: '_categoryId',
				label: 'categoryName',
			},
			productData: [],
			categoryData: [],
		}
	},
	methods: {
		handleChange: function(value){
			var products = utilObj.getLabelByValue(value);
			this.$emit('input', {
				value: value,
				text: products,
			})
		},
		handleItemChange: function(val){
			if(this.categoryData.length == 0){
				this.categoryData = JSON.parse(sessionStorage.productTree).data1[0].children;
			}
			var curId = val[val.length-1]
			var originCategoryId = utilObj.getOriginId(curId)
			var dealt = null
			if(curId.indexOf('c_') != -1){
				var isHasChildren = this.hasChildren(this.categoryData, curId)
				if(!isHasChildren){
					dealt = this.selectFromData({
						filter: {
							sysCategoryId: originCategoryId,
						},
						groupFunc: function(x){
							return x._brandId
						},
						dealFunc: function(value, key){
							return {
								_categoryId: key,
								categoryName: value[0].brandName,
								children: [],
							}
						},
					})
					
				}
			}else if(curId.indexOf('b_') != -1){
				dealt = this.selectFromData({
					filter: {
						_brandId: curId,
						sysCategoryId: utilObj.getOriginId(val[val.length-2]),
					},
					groupFunc: function(x){
						return x._productId
					},
					dealFunc: function(value, key){
						return {
							_categoryId: key,
							categoryName: value[0].productName,
							children: [],
						}
					},
				})
			}else if(curId.indexOf('p_') != -1){
				dealt = this.selectFromData({
					filter: {
						_productId: curId,
					},
					groupFunc: function(x){
						return x._skuId
					},
					dealFunc: function(value, key){
						return {
							_categoryId: key,
							categoryName: value[0].skuName,
						}
					},
				})
			}
			this.$emit('inject', {
				val: curId,
				data: dealt
			})
		},
		selectFromData: function(options){
			if(this.productData.length == 0){
				this.productData = JSON.parse(sessionStorage.productTree).data2;
			}
			var filtered =  _.where(this.productData, options.filter)
			var grouped = _.groupBy(filtered, options.groupFunc)
			var dealt = _.map(grouped, options.dealFunc)
			var sorted = _.sortBy(dealt, function(x){
				return parseInt(x._categoryId.slice(2))
			})
			return sorted;
			
		},
		hasChildren: function(data, curId){
			var len = data.length;
			for(var i = 0; i < len; i++){
				if(data[i].children.length == 0){
					if(data[i]._categoryId == curId){
						return false;
					}
				}else{
					if(data[i]._categoryId == curId){
						return true;
					}else{
						this.hasChildren(data[i].children, curId)					
					}
				}
			}
		}
	},
	components: {
		'product-selected': {
			props: ['products',],
			template: '\
				<div class="breadcrumb fl">\
					<template v-for="(item, index) in products">\
						<span class="arrow-gt" v-if="index>0"> &gt; </span>\
						<div class="breadcrumb-item">\
							{{ item }}\
						</div>\
					</template>\
				</div>\
			',
			
		}
	}
});

Vue.component('prs-header', {
	template: '\
	<header>\
	<nav class="top-nav clearfix">\
				<div class="nav-left">\
					<a href="channel_draw.html">渠道画像</a>\
					<a href="user_analysis.html">用户画像</a>\
					<a href="product_analysis.html">产品分析</a>\
				</div>\
				<div class="btn-keys">\
					<div class="triangle-down">\
					</div>\
				</div>\
				<div class="nav-right">\
					<span class="nr-left">welcome</span>\
					<span class="nr-right">3ti</span>\
					<span class="icon-exit">&nbsp;</span>\
				</div>\
				<div class="nav-right">\
					<el-select @change="change" v-model="value" placeholder="请选择品类">\
					    <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item"></el-option>\
					  </el-select>\
				</div>\
			</nav>\
			<div class="keys-wrapper clearfix">\
				<div class="kw-left">\
					<span class="kwl-add">+ Add</span>\
					<span class="kwl-find">Find Content</span>\
				</div>\
				<div class="kw-right">编辑快捷键</div>\
			</div>\
		</header>\
	',
	created:function(){
		this.loadData();
	},
	mounted:function(){
		$("header .el-select").on("click",function(){
			setTimeout(function(){
				$(".el-select-dropdown[x-placement]").css("z-index","100000");
			},100);
		});
	},
	data: function(){
		return {
			value:"",
			options:[],
		}
	},
	methods:{
		loadData: function(){
			//设置当前项目所拥有的顶级分类,暂时为写死数据  // 初始化数据在util.js的getAllProducts方法中
			this.value=JSON.parse(localStorage.getItem("currentTopCategory")).value;
			this.options=[
				{id:"1",value:"奶粉"},{id:"6",value:"化妆品"},{id:"16",value:"红酒"}
			];
		},
		change:function(e){
			localStorage.setItem("currentTopCategory",JSON.stringify({id:e.id,value:e.value}));
			sessionStorage.removeItem("productTree");
			sessionStorage.removeItem("selected");
			location.reload();
		}
	}
});

Vue.component('prs-left-menu', {
	template: '\
		<div class="left-menu">\
			<div class="lm-icon-wrapper">\
				<div class="lm-icon icon-list"></div>\
			</div>\
			<div class="lm-icon-wrapper">\
				<div class="lm-icon icon-home"></div>\
			</div>\
			<div class="lm-icon-wrapper">\
				<div class="lm-icon icon-user"></div>\
			</div>\
			<div class="lm-icon-wrapper">\
				<div class="lm-icon icon-products"></div>\
			</div>\
			<div class="lm-icon-wrapper">\
				<div class="lm-icon icon-channel"></div>\
			</div>\
			<div class="lm-icon-wrapper">\
				<div class="lm-icon icon-label"></div>\
			</div>\
			<div class="lm-icon-wrapper">\
				<div class="lm-icon icon-analysis"></div>\
			</div>\
		</div>\
	',
});
Vue.component('legends', {
	props: ['config'],
	template: `
	<div class="lengends__inner">
		<div class="legend-item clearfix" v-for="(name, index) in config.names">
			<div class="legend__icon" :style="{background: config.colors[index]}"></div>
			<div class="legend__name">{{ name }}</div>
		</div>
	</div>
	`,
	data: function(){
		return {
			
		}
	}
});
$(function(){
	frameObj.init();
})
var frameObj = {
	init: function(){
		this.loadTabs();
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		$(".tab-item").click(function(){
			var items = $(this).parents('.tabs:first').find('.tab-item');
			items.removeClass('is-active');
			$(this).addClass('is-active')
			_this.loadTabs($(this));
		})
	},
	loadTabs: function(tabAry){
		if(!tabAry){
			tabAry = $(".tabs .tabs__header .tab-item.is-active");
			$(".tab-content").hide();
		}else{
			tabAry.parents(".tabs:first").find('.tab-content').hide();
		}
		tabAry.each(function(i){
			var index = $(this).index();
			var tabContent = $(this).parents(".tabs:first").children(".tabs__content").children(".tab-content").eq(index);
			tabContent.show();
		})
	},
	login: function(){
		if(sessionStorage.getItem('t')){
			return;
		}
		utilObj.ajax({
			url:"/j_spring_security_check",
			type: "GET",
			async: false,
			data:{
				j_username: 'superadmin',
				j_password: '123456',
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader("X-Ajax-call", "true");
			},
			success: function(data){
				var response = JSON.parse(data);
				if(response.authentication.authenticated==false){
					return;
				}
				sessionStorage.setItem('t',response.token);
				sessionStorage.setItem('userinfo',JSON.stringify(response.user));
			},
			fail:function(data){
//				alert('请求失败')
			},
			error:function (data, status, e){
//				alert('请求失败')
			}
		})
		sessionStorage.setItem('t','aaaa');
	},
	
}
//frameObj.login();