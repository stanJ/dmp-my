define(function(require,exports,module){
	module.exports = {
		props: ['data',],
		name: 'field-values',
		template: `
		<div class="field-one">
			<div class="field-title">亚洲</div>
			<field-values :data="" :level="level+1"></field-values>
//			<div class="fields">
//				<div class="field-one">
//					<div class="field-title">中国</div>
//				</div>
//			</div>
		</div>
		`,
		data: function(){
			return {
				
			}
		},
		created: function(){

		},
		methods: {

		}
	}
})