define(function(require,exports,module){
	module.exports = {
		template:`
		<ul>
			<li @click="clickHandler">aaaaa</li>
			<li>bbbbbb</li>
		</ul>
		`,
		data: function(){
			return {
				
			}
		},
		methods: {
			clickHandler: function(){
				router.push({
					path: '/user/edit',
					query: {
						id: 10,
					},
				})
			},
		}
	}
});