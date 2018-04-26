define(function(require,exports,module){
    exports.data = {
		props:['skuId'],
		template: `	
		<div>
			<div class="tabs--card clearfix">
				<div class="tab--card is-active">
					<div class="tc__main">
						<div>访客数</div>
						<div class="blue-text">8</div>
					</div>
					<div class="tc__percent clearfix">
						<div class="fl">
							<div class="percent__text"><span class="percent__span p-increase-arrow">较前一日</span></div>
							<div class="percent__text"><span class="percent__span p-increase-arrow">较上周周期</span></div>
							<div class="percent__text"><span class="percent__span">无线占比</span></div>
						</div>
						<div class="fr">
							<div class="percent__value"><span class="percent__span">30%</span></div>
							<div class="percent__value"><span class="percent__span">14.28%</span></div>
							<div class="percent__value"><span class="percent__span">75%</span></div>
						</div>
					</div>
				</div>
				<div class="tab--card"><div class="tc__main">
						<div>浏览量</div>
						<div class="blue-text">14</div>
					</div>
					<div class="tc__percent clearfix">
						<div class="fl">
							<div class="percent__text"><span class="percent__span">较前一日</span></div>
							<div class="percent__text"><span class="percent__span">较上周周期</span></div>
							<div class="percent__text"><span class="percent__span">无线占比</span></div>
						</div>
						<div class="fr">
							<div class="percent__value"><span class="percent__span">55.55%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">50%</span></div>
						</div>
					</div>
				</div>
				<div class="tab--card">
					<div class="tc__main">
						<div>支付金额(元)</div>
						<div class="blue-text">0</div>
					</div>
					<div class="tc__percent clearfix">
						<div class="fl">
							<div class="percent__text"><span class="percent__span">较前一日</span></div>
							<div class="percent__text"><span class="percent__span">较上周周期</span></div>
							<div class="percent__text"><span class="percent__span">无线占比</span></div>
						</div>
						<div class="fr">
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
						</div>
					</div>
				</div>
				<div class="tab--card">
					<div class="tc__main">
						<div>支付转化率</div>
						<div class="blue-text">0%</div>
					</div>
					<div class="tc__percent clearfix">
						<div class="fl">
							<div class="percent__text"><span class="percent__span">较前一日</span></div>
							<div class="percent__text"><span class="percent__span">较上周周期</span></div>
							<div class="percent__text"><span class="percent__span">无线占比</span></div>
						</div>
						<div class="fr">
							<div class="percent__value"><span class="percent__span">30%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
						</div>
					</div>
				</div>
				<div class="tab--card">
					<div class="tc__main">
						<div>客单价(元)</div>
						<div class="blue-text">8</div>
					</div>
					<div class="tc__percent clearfix">
						<div class="fl">
							<div class="percent__text"><span class="percent__span">较前一日</span></div>
							<div class="percent__text"><span class="percent__span">较上周周期</span></div>
							<div class="percent__text"><span class="percent__span">无线占比</span></div>
						</div>
						<div class="fr">
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
						</div>
					</div>
				</div>
				<div class="tab--card">
					<div class="tc__main">
						<div>退款金额</div>
						<div class="blue-text">0</div>
					</div>
					<div class="tc__percent clearfix">
						<div class="fl">
							<div class="percent__text"><span class="percent__span">较前一日</span></div>
							<div class="percent__text"><span class="percent__span">较上周周期</span></div>
							<div class="percent__text"><span class="percent__span">无线占比</span></div>
						</div>
						<div class="fr">
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
						</div>
					</div>
				</div>
				<div class="tab--card">
					<div class="tc__main">
						<div>服务态度评分</div>
						<div class="blue-text">4.8</div>
					</div>
					<div class="tc__percent clearfix">
						<div class="fl">
							<div class="percent__text"><span class="percent__span">较前一日</span></div>
							<div class="percent__text"><span class="percent__span">较上周周期</span></div>
							<div class="percent__text"><span class="percent__span">无线占比</span></div>
						</div>
						<div class="fr">
							<div class="percent__value"><span class="percent__span">0.01%</span></div>
							<div class="percent__value"><span class="percent__span">0.19%</span></div>
							<div class="percent__value"><span class="percent__span">0%</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="visitor-wrapper">
				<div class="visitor__top clearfix">
					<div class="vt__left fl">
						<span class="blue-text">最近30天日均访客数:</span>
						<span class="vtl__value blue-text">8</span>
					</div>
					<div class="vt__right fr">
						<div class="vtr__box">
							<div class="vtrb__top clearfix">
								<span class="bt__text fl">同行同层平均</span>
								<span class="bt__value blue-text fl">4</span>
								<span class="fr">
									<span class="bt__sm p-increase-arrow">较前一日</span>
									<span class="btsm__value">0%</span>
								</span>
								
								
							</div>
							<hr class="line--sm"/>
							<div class="vtrb__bottom">
								<span>本店增幅</span>
								<span class="bb__value">大于</span>
								<span>同行同层平均增幅</span>
							</div>
						</div>
						<div class="vtr__box">
							<div class="vtrb__top clearfix">
								<span class="bt__text fl">同行同层平均</span>
								<span class="bt__value blue-text fl">16</span>
								<span class="fr">
									<span class="bt__sm p-decrease-arrow">较前一日</span>
									<span class="btsm__value">5.66%</span>
								</span>
							</div>
							<hr class="line--sm"/>
							<div class="vtrb__bottom">
								<span>本店增幅</span>
								<span class="bb__value">大于</span>
								<span>同行同层平均增幅</span>
							</div>
						</div>
					
					</div>
				</div>
				<visitor-chart :sku-id="skuId"></visitor-chart>
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