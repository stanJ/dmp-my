define(function(require,exports,module){
	module.exports = {
		template:`
		<div class="right-wrapper">
			<div class="right-userinfo">
				<div :style="{backgroundImage:userInfo.headimgurl}"></div>
				<div>
					<div>{{userInfo.nickname}}</div>
					<div>{{userInfo.sex}} | Language ：Chinese</div>
					<div>Phone <span>Empty</span></div>
					<div>SA <span>Empty</span></div>
				</div>
				<div>VIP</div>
			</div>
			<div class="right-usertag">
				<div>TAGs</div>
				<div>
					<div v-for="tag of userTag">{{tag}}</div>
				</div>
			</div>
			<div id="map" class="right-map"></div>
			<div class="right-predictedoffers">Predicted Offers</div>
			<div class="right-offer" ref="offers">
				<div @dragstart='drag($event)' v-for="offer of offerList" :offid="offer.id" :offername="offer.name" :offerdescription="offer.description" :offerimage="offer.image">
					<div :style="{backgroundImage:offer._image}"></div>
					<div>{{offer.name}}</div>
					<div>{{offer.description}}</div>
				</div>
			</div>
		</div>
		`,
		props: ['offerList', 'customerid'],
		watch: {
			customerid: function(){
				this.getUserProfile();
			}
		},
		created: function(){
			this.init();
		},
		mounted: function(){
			this.initBDMap();
		},
		data: function(){
			return {
				userInfo:{},
				userTag:["Customer","Traditional type"],
			}
		},
		methods: {
			init:function(){
				this.getUserProfile();
			},
			//获得用户详情
			getUserProfile:function(){
				var _this=this;
				if(!this.customerid){
					return;
				}
				utilObj.ajaxForCRM({
					url: '/memberwechat/findbyopenid',
					type: 'GET',
					data: {
						id:_this.customerid,
					},
					success: function(data){
						if(data instanceof Array && data.length>0){
							_this.userInfo=data[0];
							_this.userInfo.headimgurl="url('"+data[0].headimgurl+"')";
						}
					}
				});
			},
			//加载百度地图自动定位
			initBDMap:function(){
				var map = new BMap.Map("map");
				var point = new BMap.Point(116.331398,39.897445);
				map.centerAndZoom(point,12);
		
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var mk = new BMap.Marker(r.point);
						map.addOverlay(mk);
						map.panTo(r.point);
						map.centerAndZoom(r.point, 12);
						map.enableScrollWheelZoom(true);
					}
					else {
						alert('failed'+this.getStatus());
					}        
				},{enableHighAccuracy: true});
			},
			drag:function(e){
				var target=e.target;
				var offer={
					name:$(target).attr("offername"),
					description:$(target).attr("offerdescription"),
					image:$(target).attr("offerimage"),
					id: $(target).attr('offid'),
				};
				e.dataTransfer.setData("offerData",JSON.stringify(offer));
			},
			
		}
	}
});