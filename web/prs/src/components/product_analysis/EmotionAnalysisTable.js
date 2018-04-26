define(function(require,exports,module){
	var theme = require('theme');
    exports.data = {
		props:['skuId'],
		template: `
		<div class="table-wrapper">
			<el-table v-loading="loading" :data="data" stripe>
				<el-table-column 
					label="项目" 
					prop="1" 
					align="center"
					min-width="134"
					:show-overflow-tooltip="true"> 
					
				</el-table-column>
				<el-table-column 
					label="用户情感" 
					prop="2"
					align="center"
					min-width="205"
					:render-header="renderHeader"
					:show-overflow-tooltip="true">
					<template scope="scope">
				        <div class="emotion-wrapper">
				        	<div class="emotion--positive" 
				        		:style="{ width: JSON.parse(scope.row['2'])[0] + '%' }"></div>
				        	<div class="emotion--negative"
				        		:style="{ width: JSON.parse(scope.row['2'])[1] + '%' }"></div>
				        </div>
				    </template>
				</el-table-column>
				<el-table-column label="有效评价数网站" 
					prop="3"
					align="center"
					min-width="158"
					:show-overflow-tooltip="true"> 
				</el-table-column>
			</el-table>
			<hr class="line--normal"/>
			<div class="score-wrapper" style="margin-top: 20px;">
				<span class="score__text">情感综合评分</span>
				<span class="score__text"><span class="score__value">85</span>分</span>
				 <el-rate v-model="score" disabled :colors="['#ea9d7d', '#ea9d7d', '#ea9d7d']"
				 	disabled-void-color="#bcbcbc"
				 	style="vertical-align: middle;"></el-rate>
			</div>
		</div>
		`,
		created:function(){
			this.loadData()
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/commentAnalysis'){
					this.loadData()
				}
				
			}
		},
		data: function(){
			return {
				loading: false,
				data: [],
				score:4,
			}
		},
		methods:{
			loadData: function(){
				this.data = [
				{
					'1': '包装',
					'2': '[70,30]',
					'3': '1200',
	
				},
				{
					'1': '价格',
					'2': '[90,10]',
					'3': '1000',
	
				},
				{
					'1': '质量',
					'2': '[80,20]',
					'3': '1500',
	
				},
				{
					'1': '效果',
					'2': '[85,15]',
					'3': '2000',
	
				},
				]
			},
			renderHeader: function(createElement, obj) {
				var column = obj.column;
		        return createElement(
		          'div',
		          [
		            createElement('span', '用户情感('),
		            createElement('div', {
		            	class: {
		            		'blue-sm': true
		            	},
		            	style: {
		            		background: theme.colors[3]
		            	}
		            }),
		            createElement('span', '正面'),
		            createElement('div', {
		            	class: {
		            		'red-sm': true
		            	},
		            	style: {
		            		background: theme.colors[2]
		            	}
		            }),
		            createElement('span', '负面)'),
		          ]
		        );
		    },
		}
	}
})