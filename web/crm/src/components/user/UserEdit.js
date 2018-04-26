define(function(require,exports,module){
	module.exports = {
		template:`
		<div>
			<input type="text"/>
		</div>
		`,
		created: function(){
			console.log(this.$route.query.id);
		},
		mounted: function(){
			console.log(this.$route.query.id);
		},
		data: function(){
			return {
				
			}
		},
		methods: {
			
		}
	}
});