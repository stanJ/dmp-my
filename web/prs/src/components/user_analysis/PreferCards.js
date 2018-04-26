define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div class="cards clearfix">
			<div class="card card--purple">
				<div class="card__title">
					<div>70后</div>
					<div>稳定的中坚力量</div>
				</div>
				<div class="card__avator"></div>
				<div class="card__personality personality-70g"></div>
			</div>
			<div class="card card--blue">
				<div class="card__title">
					<div>80后</div>
					<div>摇摆的承上启下</div>
				</div>
				<div class="card__avator"></div>
				<div class="card__personality personality-80g"></div>
			</div>
			<div class="card card--green">
				<div class="card__title">
					<div>90后</div>
					<div>多元的价值选择</div>
				</div>
				<div class="card__avator"></div>
				<div class="card__personality personality-90g"></div>
			</div>
		</div>
		`,
		mounted: function(){
			this.loadData();
		},
		watch: {
			skuId: function(){
				var curUrl = utilObj.getCurUrl()
				if(curUrl == '/userBuyAttrAnalysis'){
					this.loadData();
				}
				
			}
		},
		data: function(){
			return {
				loading: false,
			}
		},
		methods:{
			loadData: function(){
				this.loadCards();
				
			},
			loadCards: function(){
				var word_list1 = [
				    {text: "理财", weight: 9},
				    {text: "房产", weight: 8},
				    {text: "健身", weight: 8},
				    {text: "旅行", weight: 6},
				    {text: "奢侈品", weight: 5},
				    {text: "教育", weight: 3},
				    {text: "亲子", weight: 3},
				];
				var word_list2 = [
				    {text: "时尚", weight: 9},
				    {text: "健身", weight: 8},
				    {text: "游戏", weight: 8},
				    {text: "婚恋", weight: 6},
				    {text: "购物", weight: 5},
				    {text: "创业", weight: 3},
				    {text: "母婴", weight: 3},
				    {text: "网购", weight: 2},
				];
				var word_list3 = [
				    {text: "多元", weight: 9},
				    {text: "个性", weight: 8},
				    {text: "健身", weight: 8},
				    {text: "网购", weight: 6},
				    {text: "创新", weight: 5},
				    {text: "追星", weight: 3},
				    {text: "网游", weight: 3},
				];
				word_list1 = word_list1.map(function(x){
					x.html = {
						class: 'card1'
					}
					return x;
				})
				word_list2 = word_list2.map(function(x){
					x.html = {
						class: 'card2'
					}
					return x;
				})
				word_list3 = word_list3.map(function(x){
					x.html = {
						class: 'card3'
					}
					return x;
				})
				$(".personality-70g").html('');
				$(".personality-80g").html('');
				$(".personality-90g").html('');
			    $(".personality-70g").jQCloud(word_list1);
			    $(".personality-80g").jQCloud(word_list2);
			    $(".personality-90g").jQCloud(word_list3);
			},
		}
	}
})