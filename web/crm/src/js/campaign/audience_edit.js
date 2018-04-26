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
			curPage: ['audience.html',],
			path: ['Campaign', 'Audience'],
		}, 
		form: {
			title: '',
			type: 2,
			detail: [],
		},
		fieldForm: {
			fieldId: '',
			fieldText: '',
			valuesIds: [],
			valuesText: '',
		},
		rules: {
			title: [
				{required: true, message: 'Please enter the title', trigger: 'blur'},
			],
			type: [
				{required: true,},
			],
			detail: [
				{required: true, type: 'array', message: 'Please add', trigger: 'change'},
			],
		},
		fieldRules: {
			fieldId: [
				{required: true, message: 'Please select the type', trigger: 'blur'},
			],
			valuesIds: [
				{required: true, type: 'array', message: 'Please select', trigger: 'blur'},
			],
		},
		dialogFieldVisible: false,
		operatortype: 'New',
		checkAll: true,
		fieldsData: [],
		maxLevel: 0,
		isDisable: false,
		table: {
			wechat: {
				pagination: {
					currentPage: 1,
					pageSize: 10,
					total: 0,
				},
				searchInput: '',
				tableData: [],
				loading: true,
				multipleSelection: [],
			},
			mywechat: {
//				pagination: {
//					currentPage: 1,
//					pageSize: 10,
//					total: 0,
//				},
//				tableData: [],
				loading: false,
			},
		},
		dialogWechatVisible: false,
		isEdit: false,
		detailKey: Date.now(),
	},
	computed: {
		curFieldData: function(){
			var field = _.findWhere(this.fieldsData, {
				id: this.fieldForm.fieldId,
			})
			return (field && field.children) || [];
		},
		fieldTypes: function(){
			return this.fieldsData.map(function(x){
				return {
					id: x.id,
					name: x.name,
				}
			})
		},
		availableFieldTypes: function(){
			var vm = this;
			return this.fieldTypes.filter(function(x){
				var index = _.findIndex(vm.form.detail, {
					fieldId: x.id
				});
				if(index < 0){
					return true;
				}else{
					return false;
				}
			});
		},
	},
	watch: {
		curFieldData: function(){
			if(this.curFieldData.length && this.curFieldData.length != 0){
				if(!this.isDisable){
					this.fieldForm.valuesIds = [];
				}
				this.getMaxLevel();
				this.loadFieldValues();
				this.toCheck();
				this.maxLevel = 0;
			}
			
		},
		'form.detail': function(value){
			if(!this.oldDetail){
				this.oldDetail = [];
			}
			if(value.length == this.oldDetail.length && this.oldDetail.length == 0){
				return;
			}
			this.oldDetail = JSON.parse(JSON.stringify(this.form.detail));
			this.$nextTick(function(){
				this.$refs['audienceForm'].validateField('detail');
			})
		},
		'fieldForm.valuesIds': function(value, oldValue){
			if(value.length == oldValue.length && oldValue.length == 0){
				return;
			}
			this.$nextTick(function(){
				if(this.dialogFieldVisible){
					this.$refs['fieldForm'].validateField('valuesIds');
				}
			})
		},
		'form.type': function(){
			if(!this.isEdit){
				this.form.detail = [];
				this.detailKey = Date.now();
			}
		},
		'table.wechat.tableData': function(){
			var vm = this;
			this.$nextTick(function(){
				vm.setRowsSelected();
			})
		}
	},
	methods: {
		fetchData: function(){
			var id = utilObj.getUrlParam('id');
			if(id){
				this.operatortype="Edit";
				this.isEdit = true;
				this.id = id;
				this.loadAudienceData();
			}
			this.loadFieldsData();
			this.loadWechatData();
		},
		getImage: function(value){
			return "url('"+value+"')";
		},
		toCheck: function(){
			var vm = this;
			if(this.fieldForm.valuesIds.length !=0){
				this.fieldForm.valuesIds.forEach(function(id){
					var input = $(".my-check-box[data-id="+id+"]").find('.el-checkbox__original');
					checkInput(input);
					if(vm.maxLevel <= 1){
						checkAllInput(input);
					}
					
				})
			}
		},
		getMaxLevel: function(){
			this.getLevel(this.curFieldData, 0);
		},
		getLevel: function(data, level){
			level += 1;
			for(var i=0;i< data.length;i++){
				if(data[i].children.length == 0){
					if(level > this.maxLevel){
						this.maxLevel = level;
					}
				}else{
					this.getLevel(data[i].children, level);
				}
			}
			
		},
		loadFieldValues: function(){
			var html = '';
			if(this.maxLevel == 1){
				html = this.loadFieldValuesLevelOne(this.curFieldData, html);
			}else{
				html += '<div class="fields-tree">';
				html = this.loadFieldValuesOne(this.curFieldData, 0, html);
				html += '</div>';
			}
			
			$(".fields-wrapper").html(html);
		},
		loadFieldValuesLevelOne: function(data, html){
			html += '<div class="fields-level-one">';
			html += `
			<label class="el-checkbox my-check-box check-all">
		    	<span class="el-checkbox__input">
		    		<span class="el-checkbox__inner"></span>
		    		<input type="checkbox" class="el-checkbox__original" value="">
		    	</span>
		    	<span class="el-checkbox__label">全选</span>
		    </label>
			`;
			html += '<div class="checkbox-group">';
			for(var i=0;i< data.length;i++){
				html += `
				<label class="el-checkbox my-check-box" data-id="${data[i].id}" 
				data-name="${data[i].name}">
			    	<span class="el-checkbox__input">
			    		<span class="el-checkbox__inner"></span>
			    		<input type="checkbox" class="el-checkbox__original" value="">
			    	</span>
			    	<span class="el-checkbox__label">${data[i].name}</span>
			    </label>
				`;
			}
			html += '</div></div>';
			return html;
		},
		loadFieldValuesOne: function(data, level, html){
			html += '<div class="fields">';
			level += 1;
			for(var i=0;i< data.length;i++){
				if(level != this.maxLevel){
					html += '<div class="field-one">';
				}else{
					html += '<div class="field-one field-inner">';
				}
				
				html += `
				<label class="el-checkbox my-check-box" data-id="${data[i].id}" 
				data-name="${data[i].name}">
			    	<span class="el-checkbox__input">
			    		<span class="el-checkbox__inner"></span>
			    		<input type="checkbox" class="el-checkbox__original" value="">
			    	</span>
			    	<span class="el-checkbox__label">${data[i].name}</span>
			    </label>
				`;
				
				if(data[i].children.length != 0){
					html = this.loadFieldValuesOne(data[i].children, level, html);
				}
				
				html += '</div>';
			}
			html += '</div>';
			return html;
		},
		loadFieldsData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/field/all',
				type: 'POST',
				data: {
					data: {

					},
				},
				beforeSend: function(){
					
				},
				complete: function(){
					
				},
				success: function(data){
					vm.fieldsData = data;
				}
			})
		},
		loadAudienceData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/userGroup/one',
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
					data.title = data.name;
					vm.form = data;
					if(vm.form.type == 1){
						vm.loadMyWechatData();
					}
					
				}
			})
		},
		handleAudienceSave: function(formName){
			var vm = this;
			this.$refs[formName].validate(function(valid){
				if(valid){
					vm.saveFunc();
				}else{
					return false;
				}
			})
			
		},
		saveFunc: function(){
			if(this.form.id){
				this.editAudience();
			}else{
				this.addAudience();
			}
		},
		handleAudienceCancelSave: function(){
			utilObj.navigate('audience');
		},
		editAudience: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			if(form.type == 1){
				form.detail = form.detail.map(function(x){
					return x.id;
				})
			}
			var vm = this;
			utilObj.ajax({
				url: '/userGroup/edit',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('audience');
				}
			})
		},
		addAudience: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			if(form.type == 1){
				form.detail = form.detail.map(function(x){
					return x.id;
				})
			}
			var vm = this;
			utilObj.ajax({
				url: '/userGroup/add',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('audience');
				}
			})
		},
		handleFieldAdd: function(){
			
			this.isDisable = false;
			if(this.availableFieldTypes.length == 0 && this.fieldTypes != 0){
				this.$alert('All fields added', 'Prompt', {
		          	confirmButtonText: 'Ok',
		        });
		        return;
			}
			this.dialogFieldVisible = true;
			
			this.$nextTick(function(){
				this.fieldForm.fieldId = this.availableFieldTypes[0].id;
			})
		},
		handleFieldEdit: function(data){
			
			this.isDisable = true;
			this.dialogFieldVisible = true;
			this.$nextTick(function(){
				this.fieldForm = JSON.parse(JSON.stringify(data));
			})
			
		},
		handleFieldDelete: function(index){
			this.form.detail.splice(index, 1);
		},
		handleFieldConfirm: function(formName){
			var vm = this;
			this.$refs[formName].validate(function(valid){
				if(valid){
					vm.saveField();
				}else{
					return false;
				}
			})
		},
		saveField: function(){
			this.changeOneField();
			this.dialogFieldVisible = false;
		},
		changeOneField: function(){
			var fieldId = this.fieldForm.fieldId;
			var index = _.findIndex(this.form.detail, {
				fieldId: fieldId,
			})
			var fieldType = _.findWhere(this.fieldTypes, {
				id: this.fieldForm.fieldId.toString(),
			});
			var fieldText = fieldType.name;
			this.fieldForm.fieldText = fieldText;
			var fieldForm = JSON.parse(JSON.stringify(this.fieldForm));
			if(index < 0){
				this.form.detail.push(fieldForm);
			}else{
				this.form.detail.splice(index, 1, fieldForm);
			}
		},
		clearField: function(){
			this.$refs['fieldForm'].resetFields();
		},
		handleFieldCancel: function(){
			this.dialogFieldVisible = false;
		},
		handleDialogFieldClose: function(){
			this.clearField();
			this.cancelAllChecked();
		},
		getCheckedValues: function(){
			var names = [];
			var ids = [];
			$(".fields-wrapper").find('.my-check-box:not(.check-all) .el-checkbox__original:checked').each(function(i){
				var checkbox = $(this).parents('.my-check-box:first');
				var name = checkbox.data('name');
				var id = checkbox.data('id');
				names.push(name);
				ids.push(id);
			})
			this.fieldForm.valuesIds = ids;
			this.fieldForm.valuesText = names.join('/');
		},
		cancelAllChecked: function(){
			$(".fields-wrapper").find('.my-check-box .el-checkbox__original:checked').each(function(i){
				var input = $(this);
				uncheckInput(input);
			})
		},
		//与wechat有关的方法
		//		//主体wechat分页事件
//		handleMyWechatSizeChange: function(val){
//			this.table.wechat.pagination.pageSize = val;
//			this.loadWechatData();
//		},
//		//主体wechat分页事件
//		handleMyWechatCurrentChange: function(val){
//			this.table.wechat.pagination.currentPage = val;
//			this.loadWechatData();
//		},
		//主体wechat加载数据
		loadMyWechatData: function(){
			var vm = this;
//			if(this.isEdit && this.form.type == 1){
//				
//			}
			utilObj.ajax({
				url: '/userGroup/getStaticGroupUser',
				type: 'POST',
				data: {
					data: {
						page: 1,
						eachpage: 100000,
						id: this.form.id,
					},
//					data: {
//						page: this.table.wechat.pagination.currentPage,
//						eachpage: this.table.wechat.pagination.pageSize,
//						search: this.table.wechat.searchInput,
//					},
				},
				beforeSend: function(){
					vm.table.mywechat.loading = true;
				},
				complete: function(){
					vm.table.mywechat.loading = false;
				},
				success: function(data){
					var tableData = data.data;
					vm.form.detail = tableData;
					vm.detailKey = Date.now();
//					vm.table.wechat.tableData = tableData;
//					vm.table.wechat.pagination.total = data.total;
				}
			})	
		},
		loadWechatData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/wechat/all',
				type: 'POST',
				data: {
					data: {
						page: this.table.wechat.pagination.currentPage,
						eachpage: this.table.wechat.pagination.pageSize,
						search: this.table.wechat.searchInput,
					},
				},
				beforeSend: function(){
					vm.table.wechat.loading = true;
				},
				complete: function(){
					vm.table.wechat.loading = false;
				},
				success: function(data){
					var tableData = data.data;
					vm.table.wechat.tableData = tableData;
					vm.table.wechat.pagination.total = data.total;
				}
			})	
		},
		setRowsSelected: function(){
			var vm = this;
			this.table.wechat.tableData.forEach(function(row){
				var res = _.findWhere(vm.form.detail, {
					id: row.id,
				});
				if(res){
					vm.$refs.allWechatTable.toggleRowSelection(row, true);
				}
				
			})
		},
		handleWechatAdd: function(){
			this.dialogWechatVisible = true;
			this.table.wechat.multipleSelection = JSON.parse(JSON.stringify(this.form.detail));
			this.$nextTick(function(){
				this.setRowsSelected();
			})
			
//			this.resetWechat();
//			this.loadWechatData();
		},
		handleWechatDelete: function(index){
			var wechats = this.form.detail;
			wechats.splice(index, 1);
		},
		//wechat弹框里选择checkbox事件
		handleWechatSelectionChange: function(val){
			var vm = this;
			if(!this.oldSelection){
				this.oldSelection = [];
			}
			var newSelection = val;
			var newAry = val.map(function(x){
				return x.id;
			})
			var oldAry = this.oldSelection.map(function(x){
				return x.id;
			})
			var addedAry = _.difference(newAry, oldAry);
			var deletedAry = _.difference(oldAry, newAry);
			addedAry.forEach(function(val){
				var res = _.findWhere(vm.table.wechat.multipleSelection, {
					id: val,
				});
				var res1 = _.findWhere(newSelection, {
					id: val,
				});
				if(!res){
					vm.table.wechat.multipleSelection.push(res1);
				}
			})
			deletedAry.forEach(function(val){
				var index = _.findIndex(vm.table.wechat.multipleSelection, {
					id: val,
				});
				if(index >= 0){
					vm.table.wechat.multipleSelection.splice(index, 1);
				}
			})
			this.oldSelection = JSON.parse(JSON.stringify(newSelection));
		},
		//wechat弹框里搜索
		handleWechatSearch: function(){
			this.table.wechat.pagination.currentPage = 1;
			this.loadWechatData();
		},
		//wechat弹框里每页数据数改变
		handleWechatSizeChange: function(val){
			this.table.wechat.pagination.pageSize = val;
			this.loadWechatData();
		},
		//wechat弹框里当前页改变
		handleWechatCurrentChange: function(val){
			this.table.wechat.pagination.currentPage = val;
			this.loadWechatData();
		},
		//点击wechat弹框的select按钮
		handleWechatConfirm: function(){
			var vm = this;
			vm.form.detail = JSON.parse(JSON.stringify(this.table.wechat.multipleSelection));
			this.$refs.allWechatTable.clearSelection();
			this.dialogWechatVisible = false;
		},
		//点击wechat弹框的cancel按钮
		handleWechatCancel: function(){
			this.$refs.allWechatTable.clearSelection();
			this.dialogWechatVisible = false;
		},
		resetWechat: function(){
			this.table = {
				wechat: {
					pagination: {
						currentPage: 1,
						pageSize: 10,
						total: 0,
					},
					searchInput: '',
					tableData: [],
					loading: true,
					multipleSelection: [],
				},
			};
		}
	}
})
$(function(){
	//点击一个组内部的某个checkbox的事件
	$(document).on('change', '.fields-level-one .my-check-box .el-checkbox__original', function(){
		var checkbox = $(this).parent('.el-checkbox__input');
		var input = $(this);
		var checked = input.prop('checked');
		if(checked){
			checkbox.addClass('is-checked');
		}else{
			checkbox.removeClass('is-checked');
		}
		checkAllInput($(this));
		app.getCheckedValues();
	})
	//点击全选按钮的事件
	$(document).on('change', '.check-all .el-checkbox__original', function(){
		var checkbox = $(this).parent('.el-checkbox__input');
		var input = $(this);
		var checked = input.prop('checked');
		var checkboxs = $(this).parents('.check-all').siblings('.checkbox-group').find('.my-check-box').find('.el-checkbox__original');
		if(checked){
			checkboxs.each(function(i){
				checkInput($(this));
			})
		}else{
			checkboxs.each(function(i){
				uncheckInput($(this));
			})
		}
		app.getCheckedValues();
	})
	//点击树的某个checkbox的事件
	$(document).on('change', '.fields-tree .my-check-box .el-checkbox__original', function(){
		var checkbox = $(this).parent('.el-checkbox__input');
		var input = $(this);
		var checked = input.prop('checked');
		if(checked){
			checkbox.addClass('is-checked');
		}else{
			checkbox.removeClass('is-checked');
		}
		checkTree($(this));
		app.getCheckedValues();
	})
	
})
//选中某个checkbox(包括设置input的checked属性为true以及添加is-checked类名)
function checkInput($input){
	$input.prop('checked', true);
	var checkbox = $input.parent('.el-checkbox__input');
	checkbox.addClass('is-checked');
}
//取消选择某个checkbox(包括设置input的checked属性为false以及移除is-checked类名)
function uncheckInput($input){
	$input.prop('checked', false);
	var checkbox = $input.parent('.el-checkbox__input');
	checkbox.removeClass('is-checked');
}
//单个checkbox的选中状态会影响全选框的状态，如果该组内部所有checkbox都被选中，则全选框也要被选中，反之亦然
function checkAllInput($input){
	var checkAllCheckbox = $input.parents('.checkbox-group').siblings('.check-all').find('.el-checkbox__original');
	var checkboxs = $input.parents('.checkbox-group').find('.el-checkbox__original');
	var checkboxsChecked = $input.parents('.checkbox-group').find('.el-checkbox__original:checked');
	if(checkboxsChecked.length < checkboxs.length){
		uncheckInput(checkAllCheckbox);
	}else{
		checkInput(checkAllCheckbox);
	}
}
//点击树里面的某一个checkbox,需要去改变它的子checkbox和父checkbox的状态
function checkTree($input){
	checkAllChildren($input);
	checkParents($input);
}
//改变它的子checkbox的状态
function checkAllChildren($input){
	var checkboxLabel = $input.parents('.my-check-box:first');
	var siblingFields = checkboxLabel.siblings('.fields');
	var isChecked = $input.prop('checked');
	if(siblingFields.length != 0){
		siblingFields.find('.el-checkbox__original').each(function(i){
			if(isChecked){
				checkInput($(this));
			}else{
				uncheckInput($(this));
			}
			checkAllChildren($(this));
		})
	}
	
}
//改变它的父checkbox的状态
function checkParents($input){
	var curFields = $input.parents('.fields:first');
	var allInputs = curFields.find('.el-checkbox__original');
	var checkedInputs = curFields.find('.el-checkbox__original:checked');
	var parentInput = curFields.siblings('.my-check-box').find('.el-checkbox__original');
	if(parentInput.length != 0){
		if(allInputs.length == checkedInputs.length){
			checkInput(parentInput);
		}else{
			uncheckInput(parentInput);
		}
		checkParents(parentInput);
	}
	
}
