var app = new Vue({
	el: "#app",
	created: function () {
		this.fetchData();
	},
	data: {
		operatortype:"New",
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
			path: ['Recommendation', 'Content Policy', 'Edit']
		},
		form: {
			name: '',
			contentCategory: [],
			tag: [],
		},
		rules: {
			name: [
				{required: true, message: 'Please enter the title', trigger: 'blur'},
			],
			contentCategory: [
				{required: true, type: 'array', message: 'Please select', trigger: 'change'},
			],
			tag: [
				{required: true, type: 'array', message: 'Please select', trigger: 'change'},
			],
		},
		contentCategoriesData: [],
		categoriesLoading: false,
		dialogVisible: false,
		allContentCategoriesData: [],
		allContentCategoriesLoading: true,
		multipleSelection: [],
		tagsData: [],
		tagLoading: true,
	},
	watch: {
		'form.contentCategory': function(){
			this.$nextTick(function(){
				this.$refs['form'].validateField('contentCategory');
			})
		}
	},
	methods: {
		fetchData: function(){
			this.loadAllContentCategories();
			var id = utilObj.getUrlParam('id');
			if(id){
				this.operatortype="Edit";
				this.id = id;
				this.loadPolicyData();
			}
			
			this.loadTagsData();
		},
		loadPolicyData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/policy/one',
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
					data.tag = data.tag.map(function(x){
						return x.toString();
					})
					vm.form = data;
				}
			})
		},
		loadAllContentCategories: function(){
			var vm = this;
			utilObj.ajax({
				url: '/contentCategory/all',
				type: 'POST',
				data: {
					data: {

					},
				},
				beforeSend: function(){
					vm.allContentCategoriesLoading = true;
				},
				complete: function(){
					vm.allContentCategoriesLoading = false;
				},
				success: function(data){
					vm.allContentCategoriesData = data;
				}
			})
		},
		loadTagsData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/tag/all',
				type: 'POST',
				data: {
					data: {

					},
				},
				beforeSend: function(){
					vm.tagLoading = true;
				},
				complete: function(){
					vm.tagLoading = false;
				},
				success: function(data){
					vm.tagsData = data;
				}
			})
		},
		handleSelectionChange: function(val){
			this.multipleSelection  = val;
		},
		handleConfirm: function(){
			var vm = this;
			this.multipleSelection.forEach(function(value){
				var res = _.findWhere(vm.form.contentCategory, value);
				if(!res){
					vm.form.contentCategory.push(value);
				}
			})
			this.dialogVisible = false;
			this.$refs.multipleTable.clearSelection();
		},
		handleCancel: function(){
			this.dialogVisible = false;
			this.$refs.multipleTable.clearSelection();
		},
		handleDelete: function(index){
			this.form.contentCategory.splice(index, 1);
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
				this.editPolicy();
			}else{
				this.addPolicy();
			}
		},
		handleCancelSave: function(){
			utilObj.navigate('policy');
		},
		editPolicy: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			form.contentCategory = form.contentCategory.map(function(x){
				return x.id;
			})
			
			var vm = this;
			utilObj.ajax({
				url: '/policy/edit',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('policy');
				}
			})
		},
		addPolicy: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			form.contentCategory = form.contentCategory.map(function(x){
				return x.id;
			})
			
			var vm = this;
			utilObj.ajax({
				url: '/policy/add',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('policy');
				}
			})
		}
	}
})


