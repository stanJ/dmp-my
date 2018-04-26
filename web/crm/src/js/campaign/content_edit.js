function validatePic(rule, value, callback){
//	app.$refs['contentForm'].validateField('contentImage');
	if(!value && app.form.contentImage == null){
		return callback(new Error('Please select the image'));
	}else{
		return callback();
	}
}
function validateContentImage(rule, value, callback){
	app.$refs['contentForm'].validateField('pic');
	if(!app.form.pic && value == null){
		return callback(new Error('Please select the image'));
	}else{
		return callback();
	}
}
var app = new Vue({
	el: "#app",
	mounted: function () {
		this.fetchData();
	},
	data: {
		operatortype:"New",
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
			curPage: ['content.html',],
			path: ['Campaign', 'Content', 'Edit']
		},
		form: {
			title: '',
			description: '',
			contentHtml:'',
			pic: '',
			contentImage: null,
		},
		rules: {
			title: [
				{required: true, message: 'Please enter the title', trigger: 'blur'},
			],
			description: [
				{required: true, message: 'Please input', trigger: 'blur'},
			],
			contentHtml: [
				{required: true, message: 'Please input', trigger: 'blur'},
			],
			pic: [
				{validator: validatePic, trigger: 'change'},
			],
			contentImage: [
				{required: true, validator: validateContentImage, trigger: 'change'},
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
		'form.contentHtml': function(){
			this.$nextTick(function(){
				this.$refs['contentForm'].validateField('contentHtml');
			})
		},
		'form.pic': function(){
			this.$nextTick(function(){
				this.$refs['contentForm'].validateField('pic');
			})
		},
		'form.contentImage': function(){
			this.$nextTick(function(){
				this.$refs['contentForm'].validateField('contentImage');
			})
		},
	},
	methods: {
		fetchData: function(){
			var editor = CKEDITOR.replace('contentcontentcn');
			var vm = this;
			editor.on('change', function(event){
				var data = this.getData();
				vm.form.contentHtml = escape(data);
			})
			this.form.id = utilObj.getUrlParam('id');
			if(this.form.id){
				this.operatortype="Edit";
				this.loadContentData();
			}
		},
		picChange:function(e){
			var objUrl = this.getObjectURL($("#contentimage")[0].files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
			$(".content-thumbnail>div:first-child").css("background-image",`url(${objUrl})`);
			$(".content-thumbnail .el-button--default").removeClass("is-disabled");
			$(".content-thumbnail .el-button--default").removeAttr("disabled")
			this.form.contentImage = $("#contentimage")[0].files[0];
			//编辑情况下，需要删除vm.form.pic的数据， 这样在更新时才会把更新的图片传至后台
			if(this.form.pic) this.form.pic=null;
		},
		deletePreImg:function(){
			$("#contentimage").remove();
			$(".content-thumbnail .wrapper").prepend(`<input type="file" name="contentimage" id="contentimage" onChange="app.picChange()">`);
			this.form.contentImage = null;
			
			$(".content-thumbnail>div:first-child").css("background-image",`initial`);
			$(".content-thumbnail .el-button--default").addClass("is-disabled");
		},
		getObjectURL:function(file) {
			var url = null ;
			if (window.createObjectURL!=undefined) { // basic
				url = window.createObjectURL(file) ;
			} else if (window.URL!=undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(file) ;
			} else if (window.webkitURL!=undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(file) ;
			}
			return url ;
		},
		loadContentData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/content/one',
				data: {
					data: {
						id: vm.form.id,
					},
				},
				success: function(data){
					vm.form.title=data.title;
					vm.form.description=data.description;
					vm.form.pic=data.image;
					vm.form.contentHtml = unescape(data.contentHtml);
					CKEDITOR.instances.contentcontentcn.setData(unescape(data.contentHtml));
					$(".content-thumbnail>div:first-child").css("background-image",`url(http://dmp.3tichina.com/file/contentimg/${data.image})`);
				}
			})
		},
		handleSave: function(){
			var vm = this;
			this.$refs['contentForm'].validate(function(valid){
				if(valid){
					vm.saveFunc();
				}else{
					return false;
				}
			})
		},
		saveFunc: function(){
			if(this.form.id){
				this.editContent();
			}else{
				this.addContent();
			}
		},
		handleCancelSave: function(){
			utilObj.navigate('back');
		},
		editContent: function(){
			var oMyForm = new FormData();
			oMyForm.append("id", this.form.id);
			oMyForm.append("title", this.form.title);
			oMyForm.append("description",  this.form.description);
			oMyForm.append("contentHtml", escape(CKEDITOR.instances.contentcontentcn.getData()));
			if(this.form.pic){
				oMyForm.append("pic",  this.form.pic);
			}else{
				oMyForm.append("contentimage", $("#contentimage")[0].files[0]);
			}
			utilObj.ajax({
				url: '/content/edit',
				type: 'POST',
				contentType:false,
				processData:false,
				data:oMyForm,
				proxypath:"/proxyImage",
				success: function(data){
					utilObj.navigate('content');
				}
			})
		},
		addContent: function(){
			var oMyForm = new FormData();
			oMyForm.append("title", this.form.title);
			oMyForm.append("description",  this.form.description);
			oMyForm.append("contentHtml", escape(CKEDITOR.instances.contentcontentcn.getData()));
			oMyForm.append("contentimage", $("#contentimage")[0].files[0]);
			utilObj.ajax({
				url: '/content/add',
				type: 'POST',
				contentType:false,
				processData:false,
				data:oMyForm,
				proxypath:"/proxyImage",
				success: function(data){
					utilObj.navigate('content');
				}
			})
		}
	}
})

