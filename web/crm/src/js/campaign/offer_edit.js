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
			curPage: ['offer.html',],
			path: ['Campaign', 'Offer']
		}, 
		tableData: [],
		loading: true,
		pagination: {
			currentPage: 1,
			pageSize: 10,
			total: 0,
		},
		form: {
			title: '',
			content: [],
		},
		rules: {
			title: [
				{required: true, message: 'Please enter the title', trigger: 'blur'},
			],
			content: [
				{required: true, type: 'array', message: 'Please select', trigger: 'change'},
			],
		},
		searchInput: '',
		type: '',
	},
	computed: {

	},
	watch: {
		'form.content': function(){
			this.$nextTick(function(){
				this.$refs['form'].validateField('content');
			})
		}
	},
	methods: {
		fetchData: function(){
			var id = utilObj.getUrlParam('id');
			if(id){
				this.id = id;
				this.type = 'Edit';
				this.loadOfferData();
			}else{
				this.type = 'New';
			}
			this.loadTableData();
		},
		loadOfferData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/offer/one',
				type: 'POST',
				data: {
					data: {
						id: this.id,
					},
				},
				beforeSend: function(){
					
				},
				complete: function(){
					
				},
				success: function(data){
					vm.form = data;
				}
			})
		},
		loadTableData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/content/all',
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
		handleDelete: function(id){
			var contents = this.form.content;
			var index = _.findIndex(contents, {
				id: id,
			})
			contents.splice(index, 1);
		},
		getContentImage: function(value){
			if(value){
				value = 'http://dmp.3tichina.com/file/contentimg/' + value;
			}else{
				return '';
			}
			return "url('"+value+"')";
		},
		editOffer: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			form.content = form.content.map(function(x){
				return x.id;
			})
			
			var vm = this;
			utilObj.ajax({
				url: '/offer/edit',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('offer');
				}
			})
		},
		addOffer: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			form.content = form.content.map(function(x){
				return x.id;
			})
			
			var vm = this;
			utilObj.ajax({
				url: '/offer/add',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('offer');
				}
			})
		},
		handleDbclick: function(row){
			var contents = this.form.content;
			if(contents.length>=5){
				return;
			}
			var find = _.findWhere(contents, {
				id: row.id,
			})
			if(find){
				return;
			}
			var content = {
				id: row.id,
				image: row.image,
				title: row.title,
				description: row.description,
			};
			contents.push(content);
		},
		handleSave: function(){
			var vm = this;
			this.$refs['form'].validate(function(valid){
				if(valid){
					vm.saveFunc();
				}else{
					return false;
				}
			})
			
		},
		saveFunc: function(){
			if(this.form.id){
				this.editOffer();
			}else{
				this.addOffer();
			}
		},
		handleCancelSave: function(){
			utilObj.navigate('offer');
		},
	}
})


