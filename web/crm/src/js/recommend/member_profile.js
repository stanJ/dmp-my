var app = new Vue({
	el: "#app",
	created: function () {
	},
	data: {
		pages: {
			urls: [
				{
					name: 'Member Profile',
					url: 'member_profile.html',
				},
				{
					name: 'Member Segment',
					url: 'member_segment.html',
				},
				{
					name: 'Offer Segment',
					url: 'offer_segment.html',
				},
			],
			curPage: ['member_profile.html'],
			path: ['User Behavior', 'Member Profile']
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
		handleSizeChange: function(val){
			this.pagination.pageSize = val;
		},
		handleCurrentChange: function(val){
			this.pagination.currentPage = val;
		},
	}
})


