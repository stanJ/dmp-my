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
			curPage: ['visit.html',],
			path: ['Recommendation', 'Visit Log']
		}, 
		tableData: [],
		loading: true,
		pagination: {
			currentPage: 1,
			pageSize: 10,
			total: 0,
		},
		
	},
	methods: {
		fetchData: function(){
			this.loadTableData();
		},
		loadTableData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/pointVisit/all',
				type: 'POST',
				data: {
					data: {
						page: this.pagination.currentPage,
						eachpage: this.pagination.pageSize,
					},
				},
				beforeSend: function(){
					vm.loading = true;
				},
				complete: function(){
					vm.loading = false;
				},
				success: function(data){
					vm.tableData = data.data;
					vm.pagination.total = data.total;
				}
			})	
		},
		handleSizeChange: function(val){
			this.pagination.pageSize = val;
			this.loadTableData();
		},
		handleCurrentChange: function(val){
			this.pagination.currentPage = val;
			this.loadTableData();
		},
	}
})


