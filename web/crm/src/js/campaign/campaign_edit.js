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
		form: {
			title: '',
			allowMultiple: false,
			startDate: '',
			endDate: '',
			detail: [],
		},
		rules: {
			title: [
				{required: true, message: 'Please enter the title', trigger: 'blur'},
			],
			allowMultiple: [
			
			],
			startDate: [
				{required: true, type: 'date', message: 'Please select start date', trigger: 'change'},
			],
			endDate: [
				{required: true, type: 'date', message: 'Please select end date', trigger: 'change'},
			],
			detail: [
				{required: true, type: 'array', message: 'Please select the detail', trigger: 'change'},
			],
		},
		mapping: {
			offer: {
				id: '',
				title: '',
				content: [],
			},
			audience: [],
		},
		mappingRules: {
			'offer.content': [
				{required: true, type: 'array', message: 'Please select', trigger: 'change'},
			], 
			'audience': [
				{required: true, type: 'array', message: 'Please select', trigger: 'change'},
			], 
		},
		table: {
			audience: {
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
			offer: {
				pagination: {
					currentPage: 1,
					pageSize: 10,
					total: 0,
				},
				searchInput: '',
				tableData: [],
				loading: true,
				selection: null,
				radio: '',
			}
		},
		members: ['101/210', '56/142', '154/352', '245/526', '75/189'],
		dialogAudienceVisible: false,
		dialogOfferVisible: false,
		isCampaign: true,
		pickerOptions1: {
			disabledDate: function(time){
	            return time.getTime() < Date.now() - 8.64e7;
	        },
	       
		},
		pickerOptions2: {
			disabledDate: function(time){
	            return time.getTime() < Date.now() - 8.64e7;
	        },
		},
		operatortype: 'New',
		
	},
	watch: {
		'mapping.offer.id': function(id){
			this.loadOfferData(id);
		},
		'form.startDate': function(date){
			this.pickerOptions2.disabledDate = function(time){
				return time.getTime() < new Date(date).getTime() - 8.64e7;
			}
		},
		'form.endDate': function(date){
			this.pickerOptions1.disabledDate = function(time){
				return (time.getTime() > new Date(date).getTime()) || (time.getTime() < Date.now() - 8.64e7);
			}
		},
		'form.detail': function(){
			this.loadCampaignMembers();
			this.$nextTick(function(){
				this.$refs['campaignForm'].validateField('detail');
			})
		},
		'mapping.offer.content': function(){
			this.$nextTick(function(){
				this.$refs['offerForm'].validateField('offer.content');
			})
		},
		'mapping.audience': function(val){
			this.loadAudienceMembers();
			this.$nextTick(function(){
				this.$refs['offerForm'].validateField('audience');
			})
		},
	},
	methods: {
		fetchData: function(){
			this.loadOffersData();
			this.loadAudienceData();
			var id = utilObj.getUrlParam('id');
			if(id){
				this.operatortype="Edit";
				this.id = id;
				this.loadCampaignData();
			}
		},
		showAudienceTitles: function(ary){
			var titles = ary.map(function(x){
				return x.title;
			})
			return titles.join(',');
		},
		loadCampaignMembers: function(){
			var vm = this;
			this.form.detail.forEach(function(val, index){
				var ids = val.audience.map(function(y){
					return y.id;
				})
				vm.getCampaiginMembers(ids, index);
			})
		},
		loadAudienceMembers: function(){
			var vm = this;
			this.mapping.audience.forEach(function(val, index){
				var id = val.id;
				vm.getAudienceMembers(id, index);
			})
		},
		getCampaiginMembers: function(ids, index){
			var vm = this;
			utilObj.ajax({
				url: '/campaign/getEachItemCount',
				type: 'POST',
				data: {
					data: {
						userGroupIds: ids,
					},
				},
				beforeSend: function(){
					
				},
				complete: function(){
					
				},
				success: function(data){
					var members = data.active + '/' + data.total;
					vm.form.detail[index].member = members;
				}
			})
		},
		getAudienceMembers: function(id, index){
			var vm = this;
			utilObj.ajax({
				url: '/userGroup/getGroupUserCount',
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
					var members = data.active + '/' + data.total;
					vm.mapping.audience[index].member = members;
				}
			})
		},
		loadCampaignData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/campaign/one',
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
					data.startDate = utilObj.getNativeDate(data.startDate);
					data.endDate = utilObj.getNativeDate(data.endDate);
					if(data.allowMultiple == 1){
						data.allowMultiple = false;
					}else{
						data.allowMultiple = true;
					}
					data.detail = data.detail.map(function(x, index){
						x.member = 'loading..';
						return x;
					})
					vm.form = data;
				}
			})
		},
		handleMappingEdit: function(index){
			var vm = this;
			var mappings = this.form.detail;
			var mapping = mappings[index];
			var audience = mapping.audience.map(function(x, index){
				return {
					id: x.id,
					name: x.title, 
					member: vm.members[index],
				}
			})
			this.mapping = {
				offer: {
					id: mapping.offerId,
					title: mapping.offerTitle,
				},
				audience: audience,
				index: index,
			}
			this.isCampaign = false;
		},
		handleMappingDelete: function(index){
			var mappings = this.form.detail;
			mappings.splice(index, 1);
		},
		handleMappingAdd: function(){
			this.isCampaign = false;
		},
		getContentImage: function(value){
			if(value){
				value = 'http://dmp.3tichina.com/file/contentimg/' + value;
			}else{
				return '';
			}
			return "url('"+value+"')";
		},
		loadOfferData: function(id){
			if(!id){
				return;
			}
			var vm = this;
			utilObj.ajax({
				url: '/offer/one',
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
					vm.mapping.offer = data;
				}
			})
		},
		loadAudienceData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/userGroup/all',
				type: 'POST',
				data: {
					data: {
						page: this.table.audience.pagination.currentPage,
						eachpage: this.table.audience.pagination.pageSize,
						search: this.table.audience.searchInput,
					},
				},
				beforeSend: function(){
					vm.table.audience.loading = true;
				},
				complete: function(){
					vm.table.audience.loading = false;
				},
				success: function(data){
					var tableData = data.data;
					vm.table.audience.tableData = tableData.map(function(x, index){
						x.member = 'loading..';
						return x;
					})
					vm.table.audience.pagination.total = data.total;
				}
			})	
		},
		handleAudienceDelete: function(id){
			var audiences = this.mapping.audience;
			var index = _.findIndex(audiences, {
				id: id,
			})
			audiences.splice(index, 1);
		},
		handleAudienceSelectionChange: function(val){
			this.table.audience.multipleSelection  = val;
		},
		handleAudienceSearch: function(){
			this.table.audience.pagination.currentPage = 1;
			this.loadAudienceData();
		},
		handleAudienceSizeChange: function(val){
			this.table.audience.pagination.pageSize = val;
			this.loadAudienceData();
		},
		handleAudienceCurrentChange: function(val){
			this.table.audience.pagination.currentPage = val;
			this.loadAudienceData();
		},
		handleAudienceConfirm: function(){
			var vm = this;
			var audiences = vm.mapping.audience;
			this.table.audience.multipleSelection.forEach(function(value){
				value.id = value.id.toString();
				var res = _.findWhere(audiences, {
					id: value.id,
				});
				if(!res){
					audiences.push(value);
				}
			})
			this.dialogAudienceVisible = false;
			this.$refs.allAudienceTable.clearSelection();
		},
		handleAudienceCancel: function(){
			this.dialogAudienceVisible = false;
			this.$refs.allAudienceTable.clearSelection();
		},
		loadOffersData: function(){
			var vm = this;
			utilObj.ajax({
				url: '/offer/all',
				type: 'POST',
				data: {
					data: {
						page: this.table.offer.pagination.currentPage,
						eachpage: this.table.offer.pagination.pageSize,
						search: this.table.offer.searchInput,
					},
				},
				beforeSend: function(){
					vm.table.offer.loading = true;
				},
				complete: function(){
					vm.table.offer.loading = false;
				},
				success: function(data){
					var tableData = data.data;
					vm.table.offer.tableData = tableData;
					vm.table.offer.pagination.total = data.total;
				}
			})	
		},
		handleOfferSelectChange: function(val){
			this.table.offer.selection  = val;
		},
		handleOfferSearch: function(){
			this.table.offer.pagination.currentPage = 1;
			this.loadOffersData();
		},
		handleOfferSizeChange: function(val){
			this.table.offer.pagination.pageSize = val;
			this.loadOffersData();
		},
		handleOfferCurrentChange: function(val){
			this.table.offer.pagination.currentPage = val;
			this.loadOffersData();
		},
		handleOfferConfirm: function(){
			var selection = this.table.offer.selection;
			this.mapping.offer = {
				id: selection.id,
				title: selection.title,
			};
			this.dialogOfferVisible = false;
			this.$refs.allOfferTable.setCurrentRow();
		},
		handleOfferCancel: function(){
			this.dialogOfferVisible = false;
			this.$refs.allOfferTable.setCurrentRow();
		},
		handleMappingSave:function(){
			var vm = this;
			this.$refs['offerForm'].validate(function(valid){
				if(valid){
					vm.mappingSaveFunc();
				}else{
					return false;
				}
				
			})
		},
		mappingSaveFunc: function(){
			var audiences = this.mapping.audience.map(function(x){
				var obj = {
					id: x.id,
					title: x.name,
				}
				return obj;
			})
			var mappings = this.form.detail;
			var random = Math.round(Math.random() * 5);
			var mapping = {
				offerId: this.mapping.offer.id,
				offerTitle: this.mapping.offer.title,
				audience: audiences,
				member: this.members[random],
			}
			var index = this.mapping.index;
			if(index != undefined){
				mappings.splice(index, 1, mapping);
			}else{
				mappings.push(mapping);
			}
			this.clearMapping();
			this.isCampaign = true;
		},
		handleMappingCancelSave:function(){
			this.clearMapping();
			this.isCampaign = true;
		},
		clearMapping: function(){
			this.mapping = {
				offer: {
					id: '',
					title: '',
					content: [],
				},
				audience: [],
			};
		},
		handleCampaignSave: function(formName){
			var vm = this;
			this.$refs[formName].validate(function(valid){
				if(valid){
					vm.saveFunc();
				}else{
					console.log('提交失败');
					return false;
				}
			})
			
		},
		saveFunc: function(){
			if(this.form.id){
				this.editCampaign();
			}else{
				this.addCampaign();
			}
		},
		handleCampaignCancelSave: function(){
			utilObj.navigate('campaign');
		},
		editCampaign: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			if(form.allowMultiple){
				form.allowMultiple = 0;
			}else{
				form.allowMultiple = 1;
			}
			form.startDate = utilObj.getDate(form.startDate);
			form.endDate = utilObj.getDate(form.endDate);
			var vm = this;
			utilObj.ajax({
				url: '/campaign/edit',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('campaign');
				}
			})
		},
		addCampaign: function(){
			var form = JSON.parse(JSON.stringify(this.form));
			if(form.allowMultiple){
				form.allowMultiple = 0;
			}else{
				form.allowMultiple = 1;
			}
			form.startDate = utilObj.getDate(form.startDate);
			form.endDate = utilObj.getDate(form.endDate);
			var vm = this;
			utilObj.ajax({
				url: '/campaign/add',
				type: 'POST',
				data: {
					data: form,
				},
				beforeSend: function(){
					
				},
				complete: function(){

				},
				success: function(data){
					utilObj.navigate('campaign');
				}
			})
		},
		handleDateChange: function(val){
			console.log('**************date***************')
			console.log(val);
		},
	}
})




