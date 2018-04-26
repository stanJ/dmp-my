Vue.component('customer-service-right', function (resolve,reject) {
	seajs.use(['campaign/customerServiceRight.js'],function(res){
		resolve(res);
	});
});
Vue.component('chat-session', function (resolve,reject) {
	seajs.use(['campaign/ChatSession.js'],function(res){
		resolve(res);
	});
});

var app = new Vue({
	el: "#app",
	created: function () {
		this.init();
	},
	data: {
		pages: {
			urls: [
				{
					name: 'Campaign',
					url: 'campaign.html',
				},
				{
					name: 'Offer',
					url: 'offer.html',
				},
				{
					name: 'Content',
					url: 'content.html',
				},
				{
					name: 'Audience',
					url: 'audience.html',
				},
				{
					name: 'Customer Service',
					url: 'customer_service.html',
				},
			],
			curPage: ['customer_service.html',],
			path: ['Campaign', 'Customer Service']
		}, 
		loading: true,
		config: {
			wsConn: utilObj.getApiHost().crmUrl,
			key:'PO1XFURTU1123115',
		},
		customers: [],
		activeCustomer: '',
		historyCustomers: [],
		activeHistoryCustomer: '',
		sessions: {
			'': {
				chatRecords: [],
				curInput: '',
				msg_id: '',
			}
		},
		activeSession: null,
		historyMessages: [],
		isChat: true,
		offerList:[
			{id:'204',name:"offer1",description:"offer description",image:"http://dmp.3tichina.com/file/contentimg/170713160207948.png",_image:"url('http://dmp.3tichina.com/file/contentimg/170713160207948.png')",url:""},
			{id:'203',name:"offer1",description:"offer description",image:"http://dmp.3tichina.com/file/contentimg/170713160207948.png",_image:"url('http://dmp.3tichina.com/file/contentimg/170713160207948.png')",url:""},
			{id:'202',name:"offer2",description:"offer description",image:"http://dmp.3tichina.com/file/contentimg/170713160207948.png",_image:"url('http://dmp.3tichina.com/file/contentimg/170713160207948.png')",url:""},
			{id:'201',name:"offer3",description:"offer description",image:"http://dmp.3tichina.com/file/contentimg/170713160207948.png",_image:"url('http://dmp.3tichina.com/file/contentimg/170713160207948.png')",url:""},
			{id:'200',name:"offer3",description:"offer description",image:"http://dmp.3tichina.com/file/contentimg/170713160207948.png",_image:"url('http://dmp.3tichina.com/file/contentimg/170713160207948.png')",url:""},
			{id:'199',name:"offer3",description:"offer description",image:"http://dmp.3tichina.com/file/contentimg/170713160207948.png",_image:"url('http://dmp.3tichina.com/file/contentimg/170713160207948.png')",url:""},
			{id:'198',name:"offer3",description:"offer description",image:"http://dmp.3tichina.com/file/contentimg/170713160207948.png",_image:"url('http://dmp.3tichina.com/file/contentimg/170713160207948.png')",url:""},
		],
	},
	computed: {
		unreadNums: function(){
			var unreads = _.filter(this.customers, function(x){
				return x.isUnread == true;
			})
			return unreads.length;
		},
		activeNickname: function(){
			var vm = this;
			if(!this.activeCustomer){
				return '';
			}
			var customer = _.findWhere(this.customers, {
				openid: vm.activeCustomer,
			})
			return customer.nickname;
		}
	},
	watch: {
		activeHistoryCustomer: function(){
			this.loadHistoryMessages();
		}
	},
	methods: {
		init: function(){
			this.connect();
		},
		connect: function(){
			var vm = this;
			var csid="cs1";
			//连接
			var socket = io.connect(this.config.wsConn);
			//登录
			socket.emit('cslogin', {csid:csid});
			socket.on('message', function(data){
				console.log('~~~~~~onmessage~~~~~~');
				console.log(JSON.parse(JSON.stringify(data)));
				vm.addNewCustomer(data.userInfo);
				vm.addMessageFromCustomer(data);
				vm.changeReadStatus(data);
				
			})
			socket.on('return', function(obj){
				console.log('~~~~~~onreturn~~~~~~');
				
				console.log(obj);
			});
		},
		addNewCustomer: function(user){
			var res = _.findWhere(this.customers, user);
			var userInfo = _.clone(user);
			userInfo.isUnread = false;
			if(!res){
				this.customers.unshift(userInfo);
				if(this.customers.length == 1 && this.isChat){
					this.activeCustomer = userInfo.openid;
				}
			}else{
				if(this.customers.length >1){
					var index = _.findIndex(this.customers, user);
					var deleted = this.customers.splice(index, 1);
					this.customers.unshift(deleted[0]);
				}
				
				
			}
		},
		addMessageFromCustomer: function(message){
			var session = this.sessions[message.userInfo.openid];
			if(!session){
				this.$set(this.sessions, message.userInfo.openid, {
					chatRecords: [],
					curInput: '',
					msg_id: '',
				})
			}
			this.sessions[message.userInfo.openid].chatRecords.push(message);
			this.sessions[message.userInfo.openid].msg_id = message.request_msg_id;
			if(this.activeCustomer == message.userInfo.openid){
				this.$nextTick(function(){
					this.scrollChatToBottom();
				})
				
			}
		},
		changeReadStatus: function(message){
			var openid = message.userInfo.openid;
			var index = _.findIndex(this.customers, {
				openid: openid
			})
			if(this.activeCustomer != openid){
				this.customers[index].isUnread = true;
			}else{
				this.customers[index].isUnread = false;
			}
		},
		handleActive: function(openid){
			this.activeCustomer = openid;
			var index = _.findIndex(this.customers, {
				openid: openid
			});
			this.customers[index].isUnread = false;
			this.$nextTick(function(){
				this.scrollChatToBottom();
			})
		},
		handleHistoryActive:function(openid){
			this.activeHistoryCustomer = openid;
			this.$nextTick(function(){
				this.scrollHistoryToBottom();
			})
		},
		handleSendMessage: function(){
			this.sendMessage();
		},
		loadHistoryCustomers: function(){
			var vm = this;
			utilObj.ajaxForCMS({
				url: '/msg_record',
				type:'post',
				data:{
					connect_key:this.config.key
				},
				success: function (data) {
					console.log('************history***************')
					console.log(data)
					vm.historyCustomers = data.map(function(x){
						return {
							headimgurl: x.headImg,
							nickname: x.nickname,
							openid: x.openid,
						}
					})
				},
				error: function(error){
					console.log(error);
				},
				complete:function(error){

				}
			})
		},
		loadHistoryMessages: function(){	
			if(!this.activeHistoryCustomer){
				return;
			}
			var activeCustomer = _.findWhere(this.historyCustomers, {
				openid: this.activeHistoryCustomer
			})
			var headimgurl = activeCustomer.headimgurl;
			var nickname = activeCustomer.nickname;
			var vm = this;
			utilObj.ajaxForCMS({
				url: '/chatlist',
				type:'post',
				data:{
					openid: this.activeHistoryCustomer,
					connect_key:this.config.key
				},
				success: function (data) {
					console.log('************history chat***************')
					console.log(data)
					vm.historyMessages = data.map(function(x){
						var message = {
							create_time: x.create_time,
							from_user_name: '',
							msg_type: x.msgtype,
							userInfo: {
								headimgurl: '',
								nickname: '',
							},
							wechat_content: x.content,
						}
						if(x.msgsource == 'request'){
							message.from_user_name = x.from;
							message.userInfo.headimgurl = headimgurl;
							message.userInfo.nickname = nickname;
						}else{
							message.from_user_name = 'myself';
							message.userInfo.headimgurl = 'http://wx.qlogo.cn/mmopen/14aeZKleVXTGNX4XpS8DuCdtHXdpXibIe6OuBpRoTVibvJuMtMgRsMaBicPvibiaRibynZlt3etsmGicwKZR2v0icAKmJN8R1Sj6f6Az/0';
						}
						return message;
					})
					vm.$nextTick(function(){
						vm.scrollHistoryToBottom();
					})
				},
				error: function(error){
					console.log(error);
				},
				complete:function(error){

				}
			})
		},
		addMessageFromMyself: function(date, text){
			var message = {
				create_time: date,
				from_user_name: 'myself',
				msg_type: 'text',
				userInfo: {
					headimgurl: 'http://wx.qlogo.cn/mmopen/14aeZKleVXTGNX4XpS8DuCdtHXdpXibIe6OuBpRoTVibvJuMtMgRsMaBicPvibiaRibynZlt3etsmGicwKZR2v0icAKmJN8R1Sj6f6Az/0',
				},
				wechat_content: text,
			}
		},
		send1: function(){
			$.post("http://192.168.10.66/usertocs",{
				data:JSON.stringify({
					userInfo:{
						openid:"oMduI0mL7AakiqlvPAkzizCp7neI",
						headimgurl:"http://wx.qlogo.cn/mmopen/Q3auHgzwzM7RichUMFcibJzicDlbZksBX1m6bqzn8cfria5ZoibYgJv7OnaRkNgmQg6sXTSBGqQJBace3bRwLbzb35cmR6LD4AhUqwaL4hW1fR7c/0",
						nickname:"Nelson",
					},
					create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
					wechat_content:"jc",
					request_msg_id:"2300",
					msg_type:"text",
					from_user_name:"",
				})
			},function(result){
				
			});
		},
		send2: function(){
			$.post("http://192.168.10.66/usertocs",{
				data:JSON.stringify({
					userInfo:{
						openid:"oMduI0peLdUNrinFPCfhULMaGizU",
						headimgurl:"http://wx.qlogo.cn/mmopen/14aeZKleVXTGNX4XpS8DuPJeic6wrGntdM2jR7jfTnR0uSqTxS038GW08l33PZz41M4KaWOn8O2Yj3dSYKkKV6JicwqtY1nWfp/0",
						nickname:"贤Evan",
					},
					create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
					wechat_content:"你好",
					request_msg_id:"2288",
					msg_type:"text",
					from_user_name:"",
				})
			},function(result){
				
			});
		},
		send3: function(){
			$.post("http://192.168.10.66/usertocs",{
				data:JSON.stringify({
					userInfo:{
						openid:"oMduI0rRG3DIhHnjy73FqgffDau4",
						headimgurl:"http://wx.qlogo.cn/mmopen/jJSbu4Te5ib9FD5P1b3Sd1o3QQacDxgArg26ISc8JPwEbibPhoAKbiaLqibEE49ww8jvicY5bMUmicws2X5m7uZUuEUMTdx6UFlVW5/0",
						nickname:"顾",
					},
					create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
					wechat_content:"再见",
					request_msg_id:"2289",
					msg_type:"text",
					from_user_name:"",
				})
			},function(result){
				
			});
		},
		sendByMyself: function(){
			this.activeSession = this.sessions[this.activeCustomer];
			this.activeSession.chatRecords.push({
				create_time: '11',
				from_user_name: 'myself',
				msg_type: 'image',
				userInfo: {
					headimgurl: 'http://wx.qlogo.cn/mmopen/14aeZKleVXTGNX4XpS8DuCdtHXdpXibIe6OuBpRoTVibvJuMtMgRsMaBicPvibiaRibynZlt3etsmGicwKZR2v0icAKmJN8R1Sj6f6Az/0',
				},
				wechat_content: '',
				media_url: 'img/BG_img.png'
			})
		},
		allowDrop: function(e){
			e.preventDefault();
		},
		drop: function(e){
			e.preventDefault();
			var offer = e.dataTransfer.getData('offerData');
			this.sendOffer(offer);
			
		},
		sendMessage: function(){
			var activeSession = this.sessions[this.activeCustomer];
			var message = {
				create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
				from_user_name: 'myself',
				msg_type: 'text',
				userInfo: {
					headimgurl: 'http://wx.qlogo.cn/mmopen/14aeZKleVXTGNX4XpS8DuCdtHXdpXibIe6OuBpRoTVibvJuMtMgRsMaBicPvibiaRibynZlt3etsmGicwKZR2v0icAKmJN8R1Sj6f6Az/0',
				},
				wechat_content: activeSession.curInput,
			}
			activeSession.chatRecords.push(message);
			this.$nextTick(function(){
				this.scrollChatToBottom();
			})
			var input = activeSession.curInput;
			activeSession.curInput = '';
			utilObj.ajaxForCMS({
				url: '/msgsend',
				type:'post',
				data:{
					msg_id:activeSession.msg_id,
					msg_type:'text',
					content:input,
					video_title:'',
					video_desc:'',
					kf_name:'',
					kf_id:'',
					connect_key:this.config.key
				},
				success: function(data){
					console.log('****************sended*************');
					console.log(data);
					
					
				}
			})
		},
		sendOffer: function(offer){
			offer = JSON.parse(offer);
			var activeSession = this.sessions[this.activeCustomer];
			var message = {
				create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
				from_user_name: 'myself',
				msg_type: 'news',
				userInfo: {
					headimgurl: 'http://wx.qlogo.cn/mmopen/14aeZKleVXTGNX4XpS8DuCdtHXdpXibIe6OuBpRoTVibvJuMtMgRsMaBicPvibiaRibynZlt3etsmGicwKZR2v0icAKmJN8R1Sj6f6Az/0',
				},
				wechat_content: offer.id,
			}
			activeSession.chatRecords.push(message);
			this.$nextTick(function(){
				this.scrollChatToBottom();
			})
			utilObj.ajaxForCMS({
				url: '/msgsend',
				type:'post',
				data:{
					msg_id:activeSession.msg_id,
					msg_type:'news',
					content:offer.id,
					video_title:'',
					video_desc:'',
					kf_name:'',
					kf_id:'',
					connect_key:this.config.key,
				},
				success: function(data){
					console.log('****************sendedNews*************');
					console.log(data);
				}
			})
		},
		sendImage: function(data){
			if(_.isEmpty(data)){
				this.$message({
					message: 'Upload image failed',
					type: 'error',
				});
				return;
			}
			var activeSession = this.sessions[this.activeCustomer];
			var message = {
				create_time: data.send_at,
				from_user_name: 'myself',
				msg_type: 'image',
				userInfo: {
					headimgurl: 'http://wx.qlogo.cn/mmopen/14aeZKleVXTGNX4XpS8DuCdtHXdpXibIe6OuBpRoTVibvJuMtMgRsMaBicPvibiaRibynZlt3etsmGicwKZR2v0icAKmJN8R1Sj6f6Az/0',
				},
				wechat_content: data.media_url,
			}
			activeSession.chatRecords.push(message);
			this.$nextTick(function(){
				this.scrollChatToBottom();
			})
		},
		handleUpload: function(e){
			var vm = this;
			var file = e.target.files[0];
			var activeSession = this.sessions[this.activeCustomer];
			var form = new FormData();
			form.append("msg_id", activeSession.msg_id);
			form.append("msg_type", 'image');
			form.append("connect_key",  this.config.key);
			form.append("content",  file);
			utilObj.ajaxForCMS({
				url: '/msgsend',
				type: 'POST',
				contentType:false,
				processData:false,
				data:form,
				success: function(data){
					console.log('****************uploadImage*************');
					console.log(data);
					vm.sendImage(data);
				}
			})
		},
		scrollChatToBottom: function(e){
			var chatBox = this.$refs.chatSession.$refs.session;
			chatBox.scrollTop = chatBox.scrollHeight;
		},
		scrollHistoryToBottom: function(e){
			var chatBox = this.$refs.historySession.$refs.session;
			chatBox.scrollTop = chatBox.scrollHeight;
		},
		handlePrompt: function(){
			this.isChat = true;
		},
		handleHistory: function(){
			this.isChat = false;
			this.loadHistoryCustomers();
			this.loadHistoryMessages();
		},
		
	}
})


