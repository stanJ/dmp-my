define(function(require,exports,module){
    exports.data = {
//		props:['skuId'],
		template: `
		<el-tabs type="border-card">
			<el-tab-pane label="数量分析">
				<el-table v-loading="numAnalysisLoading" :data="numAnalysisData" stripe  height="160">
					<el-table-column 
						label="渠道名称" 
						prop="1" 
						align="center"
						min-width="67"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="今日新增" 
						prop="2"
						align="center"
						min-width="67"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="昨日新增" 
						prop="3"
						align="center"
						min-width="67"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column label="日期段内新增(%)" 
						prop="4"
						align="center"
						min-width="113"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column label="日期段内活跃(%)" 
						prop="5"
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column label="累计用户" 
						prop="6"
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="操作"
						min-width="85"
						align="center">
						<template scope="scope">
							<span class="op1">趋势</span>
							<span class="op2">明细</span>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="质量分析">
				<el-table v-loading="qualityLoading" :data="qualityData" stripe  height="160">
					<el-table-column 
						label="渠道名称" 
						prop="1" 
						align="center"
						min-width="67"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="今日启动次数" 
						prop="2"
						align="center"
						min-width="94"
						:show-overflow-tooltip="true">
					</el-table-column>
					<el-table-column label="今日活跃次数" 
						prop="3"
						align="center"
						min-width="94"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column label="昨日活跃用户(%)" 
						prop="4"
						align="center"
						min-width="113"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column label="回访用户(%)" 
						prop="5"
						align="center"
						min-width="90"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column label="一次性用户(%)" 
						prop="6"
						align="center"
						min-width="113"
						:show-overflow-tooltip="true"> 
					</el-table-column>
					<el-table-column 
						label="操作"
						min-width="85"
						align="center">
						<template scope="scope">
							<span class="op1">趋势</span>
							<span class="op2">明细</span>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		`,
		created:function(){
			this.loadData();
		},
		data: function(){
			return {
				numAnalysisLoading: true,
				numAnalysisData: [],
				qualityLoading: true,
				qualityData: [],
			}
		},
		methods:{
			loadData: function(){
				this.qualityData = [{
					'1': '淘宝',
					'2': '14253',
					'3': '8565',
					'4': '26%',
					'5': '65%',
					'6': '5%',
				},{
					'1': '天猫商城',
					'2': '16542',
					'3': '9652',
					'4': '32%',
					'5': '78%',
					'6': '6%',
				},{
					'1': '京东商城',
					'2': '15743',
					'3': '9321',
					'4': '28%',
					'5': '72%',
					'6': '5%',
				},];
				this.numAnalysisData = [{
					'1': '淘宝',
					'2': '800',
					'3': '650',
					'4': '5%',
					'5': '40%',
					'6': '254200',
				},{
					'1': '天猫商城',
					'2': '600',
					'3': '580',
					'4': '6%',
					'5': '75%',
					'6': '356520',
				},{
					'1': '京东商城',
					'2': '450',
					'3': '460',
					'4': '3%',
					'5': '55%',
					'6': '348745',
				},];
				this.numAnalysisLoading=false;
				this.qualityLoading=false;
			},
		}
	}
})