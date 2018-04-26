define(function(require,exports,module){
	var User = require('myviews/user.js');
	var Visit = require('myviews/visit.js');
	var UserList = require('user/UserList.js');
	var UserEdit = require('user/UserEdit.js');
	module.exports = [
		{
			path: '/user',
			component: User,
			children: [
				{
					path: '',
					component: UserList,
				},
				{
					path: 'edit',
					component: UserEdit,
				},
			]
		},
		{
			path: '/visit',
			component: Visit,
		}
	]
});


//import Vue from 'vue'
//import Router from 'vue-router'
//import Resource from '@/views/Resource'
//import ResourceManage from '@/views/ResourceManage'
//import ResourceModify from '@/views/ResourceModify'
//
//
//Vue.use(Router)
//export default new Router({
//routes: [
//  {
//    path: '/',
//    redirect: '/index'
//  },
//  {
//    path: '/login',
//    name: 'login',
//    component: Login
//  },
//  {
//    path: '/home',
//    name: 'home',
//    component: Home,
//    children: [
//    	{
//		  path: 'index',
//	      name: 'index',
//	      component: Index,
//	      alias: '/index'
//    	},
//    	{
//	      path: 'resource',
//	      component: Resource,
//	      children: [
//	      	{
//	      		path: '',
//	      		name: 'resource_manage',
//	      		component: ResourceManage,
//	      		alias: '/resource_manage'
//	      	},
//	      	{
//	      		path: 'modify/:tid',
//	      		name: 'resource_modify',
//	      		component: ResourceModify,
//	      		alias: '/resource_modify'
//	      	},
//	      	{
//	      		path: 'detail',
//	      		name: 'resource_detail',
//	      		component: ResourceDetail,
//	      		alias: '/resource_detail'
//	      	},
//	      ]
//	    },
//    	{
//	      path: 'customer',
//	      component: Customer,
//	      children: [
//	      	{
//	      		path: '',
//	      		name: 'customer_manage',
//	      		component: CustomerManage,
//	      		alias: '/customer_manage'
//	      	},
//	      	{
//	      		path: 'modify',
//	      		name: 'customer_modify',
//	      		component: CustomerModify,
//	      		alias: '/customer_modify'
//	      	},
//	      	{
//	      		path: 'detail',
//	      		name: 'customer_detail',
//	      		component: CustomerDetail,
//	      		alias: '/customer_detail'
//	      	},
//	      ]
//	    },
//	    {
//	      path: 'notice_manage',
//	      name: 'notice_manage',
//	      component: NoticeManage,
//	      alias: '/notice_manage'
//	    },
//	    {
//	      path: 'account_manage',
//	      name: 'account_manage',
//	      component: AccountManage,
//	      alias: '/account_manage'
//	    },
//	    {
//	      path: 'personal_work',
//	      name: 'personal_work',
//	      component: PersonalWork,
//	      alias: '/personal_work'
//	    },
//    ]
//  },
//]
//})
