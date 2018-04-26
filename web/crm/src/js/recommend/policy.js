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
			curPage: ['policy.html',],
			path: ['Recommendation', 'Content Policy']
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
				url: '/policy/all',
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
		handleEdit: function(id){
			utilObj.navigate('policy_edit', {
				id: id,
			});
		},
		handleDelete: function(id){
			var vm = this;
			this.$confirm('Are you sure to delete？', 'Prompt', {
				confirmButtonText: 'Ok', 
				cancelButtonText: 'Cancel',
				confirmButtonClass: 'el-btn--md',
				cancelButtonClass: 'el-btn--md el-button--cancel',
			}).then(function(){
				vm.deletePolicy(id);
			}).catch(function(){
				console.log('cancel');
			})
		},
		handleAdd: function(){
			utilObj.navigate('policy_edit');
		},
		deletePolicy: function(id){
			var vm = this;
			utilObj.ajax({
				url: '/policy/delete',
				type: 'POST',
				data: {
					data: {
						id: id,
					},
				},
				beforeSend: function(){

				},
				complete: function(){

				},
				success: function(data){
					vm.loadTableData();
				}
			})
		}
	}
})


