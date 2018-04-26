var app = new Vue({
	el: "#app",
	created: function () {
		this.fetchData();
	},
	data: {
		pages: {
			urls: [
				{
					name: 'Content Policy',
					url: 'policy.html',
				},
				{
					name: 'Action Rate',
					url: 'action.html',
				},
				{
					name: 'Visit Log',
					url: 'visit.html',
				},
				{
					name: 'User List',
					url: 'user.html',
				},
				{
					name: 'User Points',
					url: 'user_points.html',
				},
			],
			curPage: ['user_points.html',],
			path: ['Recommendation', 'User Points']
		}, 
		tableData: [],
		loading: false,
		timer: null,
	},
	methods: {
		fetchData: function(){
			var timer = setInterval(this.loadTableData, 1000);
			this.timer = timer;
			this.loadTableData();
		},
		loadTableData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/user/userTagPoint',
				type: 'POST',
				data: {
					data: {

					},
				},
				success: function(data){
					vm.tableData = data;
				}
			})	
		},
		clear: function(){
			clearInterval(this.timer);
		},
	}
})


