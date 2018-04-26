Vue.filter('contentImg', function(value){
	if(value){
		value = 'http://dmp.3tichina.com/file/contentimg'
	}
	return value;
});
Vue.filter('status', function(value){
	if(value == 0){
		value = 'Disable';
	}else if(value == 1){
		value = 'Enable';
	}else{
		value = '';
	}
	return value;
});
Vue.filter('campaignStatus', function(value){
	if(value == 1){
		value = 'ready';
	}else if(value == 2){
		value = 'running';
	}else if(value == 3){
		value = 'stoped';
	}else if(value == 4){
		value = 'finished';
	}else{
		value = '';
	}
	return value;
});
Vue.filter('date', function(value){
	if(value){
		value = moment(value).format('YYYY-MM-DD HH:mm:ss');
	}else{
		value = '';
	}
	return value;
});
Vue.filter('gender', function(value){
	if(value == 0){
		value = 'Male';
	}else if(value == 1){
		value = 'Female';
	}else{
		value = '';
	}
	return value;
});
Vue.filter('innerText', function(value){
	if(value.indexOf('<') != -1){
		value = $(value)[0].innerText;
	}
	return value;
});
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
	props: ['options','value','path'],
	template: `
	<div class="nav-path">
		<div class="np-prs">CRM</div>
		<div class="prs-left">
			<span class="prs-text fl">CRM System</span>
			<el-cascader
				class="fl select-page"
				popper-class="select-page-popper"
				expand-trigger="hover"
				:options="options"
				:props="props"
				v-model="value"
				@change="handleChange"
				:show-all-levels="false"
			>
			</el-cascader>
			<breadcrumb :path="path"></breadcrumb>
		</div>
		<div class="prs-right">
			<div class="icon icon-mail"></div>
			<div class="icon icon-star"></div>
		</div>
	</div>`,
	mounted: function(){
		$(".select-page").click(function(){
			setTimeout(function(){
				$(".select-page-popper").css('z-index', 100);
			}, 0);
		})
		
	},
	data: function(){
		return {
			props: {
				value: 'url',
				label: 'name',
			},
			productData: [],
			categoryData: [],
		}
	},
	methods: {
		handleChange: function(value){
			this.$emit('input', value)
			var host = utilObj.getHost();
			location.href = host + '/' + value[0];
		},
	},
	components: {
		'breadcrumb': {
			props: ['path',],
			template: '\
				<div class="breadcrumb fl">\
					<template v-for="(item, index) in path">\
						<span class="arrow-gt" v-if="index>0">/</span>\
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
					<a href="policy.html">Recommendation</a>\
					<a href="campaign.html">Campaign</a>\
					<a href="member_profile.html">User Behavior</a>\
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
});

$(function(){
	frameObj.init();
})
var frameObj = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){

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