var app = new Vue({
	el: "#app",
	created: function () {
		this.fetchData();
	},
	data: {
		pages: {
			urls: [
				{
					name: 'Campaign',
					url: 'campaign.html',
				},
				{
					name: 'Offer',
					url: 'offer.html',
				},
				{
					name: 'Content',
					url: 'content.html',
				},
				{
					name: 'Audience',
					url: 'audience.html',
				},
				{
					name: 'Customer Service',
					url: 'customer_service.html',
				},
			],
			curPage: ['campaign.html',],
			path: ['Campaign',],
		}, 
		tableData: [],
		loading: true,
		pagination: {
			currentPage: 1,
			pageSize: 10,
			total: 0,
		},
		searchInput: '',
	},
	methods: {
		fetchData: function(){
			this.loadTableData();
		},
		loadTableData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/campaign/all',
				type: 'POST',
				data: {
					data: {
						page: this.pagination.currentPage,
						eachpage: this.pagination.pageSize,
						search: this.searchInput,
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
		handleSearch: function(){
			this.pagination.currentPage = 1;
			this.loadTableData();
		},
		handleSizeChange: function(val){
			this.pagination.pageSize = val;
			this.loadTableData();
		},
		handleCurrentChange: function(val){
			this.pagination.currentPage = val;
			this.loadTableData();
		},
		handleChangeStatus: function(id,status){
			var vm = this;
			utilObj.ajax({
				url: '/campaign/changeStatus',
				type: 'POST',
				data: {
					data: {
						id: id,
						status:status,
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
		},
		handleEdit: function(id){
			utilObj.navigate('campaign_edit', {
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
				vm.deleteCampaign(id);
			}).catch(function(){
				console.log('cancel');
			})
		},
		handleAdd: function(){
			utilObj.navigate('campaign_edit');
		},
		deleteCampaign: function(id){
			var vm = this;
			utilObj.ajax({
				url: '/campaign/delete',
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
		},
		
	}
})


