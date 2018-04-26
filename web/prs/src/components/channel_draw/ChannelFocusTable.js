define(function(require,exports,module){
    exports.data = {
		template: `
		<el-table v-loading="loading" :data="data" stripe  height="160">
			<el-table-column 
				label="渠道名称" 
				prop="1" 
				align="center"
				:show-overflow-tooltip="true"> 
			</el-table-column>
			<el-table-column 
				label="今日关注数" 
				prop="2"
				align="center"
				:show-overflow-tooltip="true">
			</el-table-column>
			<el-table-column label="昨日关注数" 
				prop="3"
				align="center"
				:show-overflow-tooltip="true"> 
			</el-table-column>
			<el-table-column label="页面停留时间" 
				prop="4"
				align="center"
				:show-overflow-tooltip="true"> 
			</el-table-column>
			<el-table-column label="累计关注数" 
				prop="5"
				align="center"
				:show-overflow-tooltip="true"> 
			</el-table-column>
			<el-table-column label="重复关注次数" 
				prop="6"
				align="center"
				:show-overflow-tooltip="true"> 
			</el-table-column>
			<el-table-column 
				label="操作" 
				width="150"
				align="center">
				<template scope="scope">
					<span class="op1">趋势</span>
					<span class="op2">明细</span>
				</template>
			</el-table-column>
		</el-table>
		`,
		created:function(){
			this.loadData();
		},
		data: function(){
			return {
				loading: true,
				data: [],
			}
		},
		methods:{
			loadData: function(){
				this.data = [{
					'1': '淘宝',
					'2': '18652',
					'3': '17457',
					'4': '125',
					'5': '568563',
					'6': '147862',
				},{
					'1': '天猫商城',
					'2': '21546',
					'3': '20147',
					'4': '156',
					'5': '754213',
					'6': '154789',
				},{
					'1': '京东商城',
					'2': '19856',
					'3': '18953',
					'4': '145',
					'5': '698542',
					'6': '134785',
				},]
				this.loading=false;
			},
		}
	}
})