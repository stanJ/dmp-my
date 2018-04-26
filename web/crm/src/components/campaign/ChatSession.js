define(function(require,exports,module){
	module.exports = {
		props: ['chatRecords', 'offerList'],
		template: `
		<div class="chat-body__session" ref="session">
			<template v-for="(record, index) in chatRecords">
				<div class="chat-message message-customer clearfix" v-if="record['from_user_name'] != 'myself'">
					<div class="chat-message__time-wrapper">
						<div class="chat-message__time" v-text="showTime(record['create_time'])"></div>
					</div>
					<div class="chat-message__container clearfix">
						<div class="chat-message__head message-customer__head">
							<img class="chat-message__head-img" :src="record['userInfo']['headimgurl']"/>
						</div>
						<div class="chat-message__main message-customer__main">
							<div class="message-customer__name" v-text="record['userInfo']['nickname']"></div>
							<div class="chat-news news--customer"
								v-if="record['msg_type']=='news'">
								<div class="chat-news__title" v-text="getNewsTitle(record['wechat_content'])"></div>
								<div class="chat-news__img" :style="{backgroundImage:getNewsImage(record['wechat_content'])}"></div>
								<div class="chat-news__description" v-text="getNewsDescription(record['wechat_content'])"></div>
							</div>
							<div class="chat-message__content-wrapper message-customer__content-wrapper" 
								v-else-if="record['msg_type']=='text'">
								<div class="chat-message__content" 
									v-text="record['wechat_content']"></div>
								
							</div>
							<div class="chat-image-wrapper image-wrapper--customer"
								v-else-if="record['msg_type']=='image'">
								<div class="chat-image bg-img-cover"	
									:style="{backgroundImage: getUrl(record['wechat_content'])}"></div>
							</div>
						</div>
					</div>
					
				</div>
				<div class="chat-message message-myself clearfix" v-else>
					<div class="chat-message__time-wrapper">
						<div class="chat-message__time" v-text="showTime(record['create_time'])"></div>
					</div>
					<div class="chat-message__container clearfix">
						<div class="chat-message__head message-myself__head">
							<img class="chat-message__head-img" :src="record['userInfo']['headimgurl']"/>
						</div>
						<div class="chat-message__main message-myself__main">
							<div class="chat-news news--myself"
								v-if="record['msg_type']=='news'">
								<div class="chat-news__title" v-text="getNewsTitle(record['wechat_content'])"></div>
								<div class="chat-news__img" :style="{backgroundImage:getNewsImage(record['wechat_content'])}"></div>
								<div class="chat-news__description" v-text="getNewsDescription(record['wechat_content'])"></div>
							</div>
							<div class="chat-message__content-wrapper message-myself__content-wrapper"
								v-else-if="record['msg_type']=='text'">
								<div class="chat-message__content" 
									v-text="record['wechat_content']"></div>
							</div>
							<div class="chat-image-wrapper image-wrapper--myself"
								v-else-if="record['msg_type']=='image'">
								<div class="chat-image bg-img-cover"	
									:style="{backgroundImage: getUrl(record['wechat_content'])}"></div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
		`,
		data: function(){
			return {
				
			}
		},
		created: function(){
//			console.log(this.sessions);
//			console.log(this.activeCustomer);
//			console.log(this.sessions[this.activeCustomer]);
		},
		methods: {
			showTime: function(time){
				return moment(time).format('HH:mm');
			},
			getNewsTitle: function(id){
				var offer = _.findWhere(this.offerList, {
					id: id,
				})
				if(offer){
					return offer.name;
				}else{
					return '';
				}
				
			},
			getNewsImage: function(id){
				var offer = _.findWhere(this.offerList, {
					id: id,
				})
				if(offer){
					return "url('"+offer.image+"')";
				}else{
					return '';
				}
			},
			getUrl: function(url){
				return "url('"+url+"')";
			},
			getNewsDescription: function(id){
				var offer = _.findWhere(this.offerList, {
					id: id,
				})
				if(offer){
					return offer.description;
				}else{
					return '';
				}
				
			},
		}
	}
})