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
			curPage: ['action.html',],
			path: ['Recommendation', 'Action Rate']
		}, 
		tableData: [],
		loading: true,
	},
	methods: {
		fetchData: function(){
			this.loadTableData();
		},
		loadTableData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/actionCode/all',
				type: 'POST',
				data: {
					data: {

					},
				},
				beforeSend: function(){
					vm.loading = true;
				},
				complete: function(){
					vm.loading = false;
				},
				success: function(data){
					vm.tableData = data;
				}
			})	
		},
		handleSave: function(){
			this.editActionCode();
		},
		handleCancelSave: function(){
			location.reload();
		},
		editActionCode: function(){
			var vm = this;
			utilObj.ajax({
				url: '/actionCode/edit',
				type: 'POST',
				data: {
					data: this.tableData,
				},
				beforeSend: function(){

				},
				complete: function(){

				},
				success: function(data){
					vm.$message({
			          message: 'Save succeeded',
			          type: 'success',
			          duration: 1000,
			        });
				}
			})
		},
	}
})


