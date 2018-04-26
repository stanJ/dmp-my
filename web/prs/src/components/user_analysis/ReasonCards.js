define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div class="cards clearfix cards--reason">
			<div class="card card--purple">
				<div class="card__title">
					<div>中老年</div>
					<div>增强体质</div>
				</div>
				<div class="card__avator"></div>
				<div class="card__reason">
					<p class="reason__main">预防疾病，增强体质</p>
					<ul class="reason__ul">
						<li>助眠安神，提高睡眠质量</li>
						<li>预防骨质疏松</li>
					</ul>
				</div>
			</div>
			<div class="card card--blue">
				<div class="card__title">
					<div>青少年</div>
					<div>营养需要</div>
				</div>
				<div class="card__avator"></div>
				<div class="card__reason">
					<p class="reason__main">补钙补脑</p>
					<ul class="reason__ul">
						<li>增加营养</li>
						<li>促进长高</li>
						<li>增强智力</li>
					</ul>
				</div>
			</div>
			<div class="card card--green">
				<div class="card__title">
					<div>婴幼儿</div>
					<div>替代母乳</div>
				</div>
				<div class="card__avator"></div>
				<div class="card__reason">
					<p class="reason__main">提供营养</p>
					<ul class="reason__ul">
						<li>促进生长发育</li>
						<li>方便妈妈照顾</li>
					</ul>
				</div>
			</div>
		</div>
		`,
		mounted: function(){

		},
		watch: {
			skuId: function(){
				
			}
		},
		data: function(){
			return {
				
			}
		},
		methods:{
			
		}
	}
})