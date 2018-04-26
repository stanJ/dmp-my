//onload
$(document).ready(function(){
	
	//重设高度
	$('body div').eq(0).height('100%');

	//init
	_CSCHATCLASS.init();


})


var _CSCHATCLASS = {
	config:{
		csName:'Customer Center sa 01',
		//wsConn:'http://61.155.169.176:8066/',
		wsConn:'http://192.168.10.66/',
		//wsConn:'http://ec2-35-161-211-221.us-west-2.compute.amazonaws.com:3500',
		//crmHttp:'http://61.155.169.176:8066/',
		crmHttp:'http://192.168.10.66/',
		//cmsHttp:'http://cms1.tapad.cn/admin/wechat',
		cmsHttp:'http://cmswx1.tapad.cn/admin/wechat',
		mousehold : {},				//鼠标长按计时
		holdcount : 0, 				//鼠标长按计数
		dragable : false,			//拖拽标识
		startX : 0,					//移动起始位置X
		startY : 0,					//移动起始位置Y
		swiper : {},                //swiper对象
		page : {},
		offertag : "",
		offerImgUrl : '',
		key:'PO1XFURTU1123115'
	},
	init:function(){
		var _me  = this;
		_me.bindSwiper();
		$.when(
			_me.getChatConversation(),
			_me.getOfferList()
		)
		.done(
			_me.eventControl()
		)
		.fail(
			
			_me.connectWs(),
			_me.initBDMap(),
			_me.setScroll(), 

			setTimeout(function(){$('.talking-wechartUser-list li').eq(0).trigger("click")},1000)
		);
		

	},
	//绑定swiper
	bindSwiper: function(){
		var _me = this;
		_me.swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			onlyExternal: true,
			slidesPerView: 1,
			slidesPerColumn: 1,
			paginationClickable: true,
			spaceBetween: 0
		});
	},
	//获得消息会话列表
	getChatConversation:function(){
		var _me = this;
		
		_me.showOrHideShadow('show');
		$.ajax({
			url: _me.config.cmsHttp + '/msg_record',
			type:'post',
			data:{
				connect_key:_me.config.key
			},
			async:false,
			success: function (data) {
				data = (typeof(data) == 'string' ? JSON.parse(data) : data)
				if(data.status == 'success'){
					_me.setChatConversation(data.data);
				}
			},
			error: function(error){
				console.log(error);
			},
			complete:function(error){
				_me.showOrHideShadow('hide');
			}
		})
	},
	//获得历史会话
	getHistory:function(_openId){
		var _me = this;

		_me.showOrHideShadow('show');
		//获得历史聊天记录
		$.ajax({
			url: _me.config.cmsHttp + '/chatlist',
			type:'post',

			async:false,
			data:{
				openid:_openId,
				connect_key:_me.config.key
			},
			success: function (data) {
				//console.log(data);
				data = (typeof(data) == 'string' ? JSON.parse(data) : data)
				if(data.status == 'success'){
										
					var _reslut = data.data;
					var _chatHistory = '';
					for(var i= 0 ;i< _reslut.length;i++){
					
						if(_reslut[i].msgsource == 'request'){
							_chatHistory += _me.getChartText(_reslut[i]);
						}else if(_reslut[i].msgsource == 'response'){							
							_chatHistory += _me.sendChartText(_reslut[i]);
						}						
					}
					
					_me.setChartScrollBar(_openId,_chatHistory);
				}
			},
			error: function(error){
				console.log(error);
			},
			complete:function(error){
				_me.showOrHideShadow('hide');
			}
		})
	},
	//发送消息
	sendMsg:function(domId){
		var _me = this;

		var _parent = $('#' + domId);
		_me.showOrHideShadow('show');
		if($.trim(_parent.find('.chatValueBox').val()) == ''){
			alert('请输入内容再发送');
			return false;
		}else{	
			var _msgId = _parent.attr('data-lastmsgid');
			var _content = _parent.find('.chatValueBox').val();			
			$.ajax({
				url: _me.config.cmsHttp + '/msgsend',
				type:'post',
				async:false,
				data:{
					msg_id:_msgId,
					msg_type:'text',
					content:_content,
					video_title:'',
					video_desc:'',
					kf_name:'',
					kf_id:'',
					connect_key:_me.config.key
				},
				success: function (data) {
					data = (typeof(data) == 'string' ? JSON.parse(data) : data)
					if(data.status == 'success'){
						var _data = data.data;
						var _chartObj = {}
						_chartObj['content'] = _content;
						_chartObj['msgtype'] = _data.msg_type;
						_chartObj['create_time'] = _data.send_at;
						
						_me.setChartScrollBar(domId.replace('chatBox_',''),_me.sendChartText(_chartObj));
					}			
				},
				error: function(error){
					console.log(error);
				},
				complete:function(error){
					_me.showOrHideShadow('hide');
				}
			})
		
		}
	},		
	//发送消息
	sendImageMsg:function(domId){
		var _me = this;
		_me.showOrHideShadow('show');
		var options = {
			url: _me.config.cmsHttp + '/msgsend', 
			type: "POST",
			data:{
				connect_key:_me.config.key
			},
			//dataType: 'json', 
			success: function(data) {
				console.log(data);
				//文件归空
				$('#input-file-now').val('');
				data = (typeof(data) == 'string' ? JSON.parse(data) : data)
				if(data.status == 'success'){
					
					var _data = data.data;
					var _chartObj = {}
					_chartObj['content'] = _data.media_url;
					_chartObj['msgtype'] = _data.msg_type;
					_chartObj['create_time'] = _data.send_at;
					
					_me.setChartScrollBar(domId.replace('chatBox_',''),_me.sendChartText(_chartObj));

				}else{
					alert('图片消息发送失败')
				}
			},
			complete:function(error){
				_me.showOrHideShadow('hide');
			}
		}; 

		$('#cdForm').ajaxSubmit(options);

	},		
	//发送OFFER消息
	sendTWmsg:function(txtvalue,imgUrl){
		var _me = this;
	
		var _parent = $('.user-talking-box.active');
		var _msgId = _parent.attr('data-lastmsgid');
		var _openId = _parent.attr('id').replace('chatBox_','');
		
		_me.showOrHideShadow('show');

		$.ajax({
			url: _me.config.cmsHttp + '/msgsend',
			type:'post',
			async:false,
			data:{
				msg_id:_msgId,
				msg_type:'news',
				content:txtvalue,
				video_title:'',
				video_desc:'',
				kf_name:'',
				kf_id:'',
				connect_key:_me.config.key
			},
			success: function (data) {
				data = (typeof(data) == 'string' ? JSON.parse(data) : data)
				if(data.status == 'success'){
							
					var _data = data.data;
					var _chartObj = {}
					_chartObj['content'] = txtvalue;
					_chartObj['msgtype'] = _data.msg_type;
					_chartObj['create_time'] = _data.send_at;
					
					_me.setChartScrollBar(_openId,_me.sendChartText(_chartObj));
				}			
			},
			error: function(error){
				console.log(error);
			},
			complete:function(error){
				_me.showOrHideShadow('hide');
			}
		})

		
		
	},	
	connectWs:function(){
		var _me = this;

		var csid="cs1";
		var socket =null;

		
		//connect 
		if(!socket) socket=io.connect(_me.config.wsConn);//连接
		socket.emit('cslogin', {csid:csid});//登录
		
		

		socket.on('message', function(data){
			console.log('~~~~~~onmessage~~~~~~')
			console.log(data)
			data = (typeof(data) == 'string' ? JSON.parse(data) : data);

			//如果已经有
			var _liUser = $('li[data-openid=' + data.userInfo.openid + ']');
			if(_liUser.length > 0 && _liUser.hasClass('active') == false){
				_liUser.find('.hasMsg').show();
				var _tempLi = _liUser.clone();
				//排序到第一位
				$('.talking-wechartUser-list ul li').eq(0).before(_tempLi); 
				_liUser.remove();
			}else if(_liUser.length == 0){
				var _userLiHtml = "<li class='' data-lastTime='" + data.create_time + "' data-lastContent='" +  data.wechat_content +"' data-openid='" + data.userInfo.openid +"' data-lastMsgId='" + data.msg_Id + "' data-lastMsgType='" + data.msg_type + "'><div class='userHead'><img src='" + data.userInfo.headimgurl + "'></div><div class='nickName'>" + data.userInfo.nickname  + "</div><div class='hasMsg' style='display:block'></div></li>";
				$('.talking-wechartUser-list ul li').eq(0).before(_userLiHtml)
			}

		
			//openid lastmsgid
			_me.setChatBox(data.userInfo.openid,data.msg_Id,'none');

			//插入消息
		
			var _chartObj = {}
			_chartObj['from'] = data.from_user_name;
			_chartObj['content'] = data.wechat_content;
			_chartObj['msgtype'] = data.msg_type;
			_chartObj['create_time'] = data.create_time;
			
			var _liObjHeadImg = $('.talking-wechartUser-list li[data-openid=' + data.userInfo.openid + ']').find('.userHead img');
			var _dataheadimgurl = data.userInfo.headimgurl;
			if(_dataheadimgurl != _liObjHeadImg.attr('src') && _dataheadimgurl != null){
				_liObjHeadImg.attr('src',_dataheadimgurl);
			}
			


			var _openId = data.userInfo.openid
			//更改lastId
			if(data.request_msg_id != null){
				$('#chatBox_' + _openId).attr('data-lastmsgid',data.request_msg_id)
			}

			_me.setChartScrollBar(_openId,_me.getChartText(_chartObj));

		});
		
		//接口返回
		socket.on('return', function(obj){
			console.log(obj);
		});

	

	},
	//获得用户详情
	getUserProfile:function(openId){
		var _me = this;
		//_me.showOrHideShadow('show');
		$.ajax({
			type: "GET",
			url: _me.config.crmHttp + "memberwechat/findbyopenid?id=" + openId + "&token=" + localStorage.getItem("token"),
			data: localStorage.getItem("token"),
			success: function(data){
				$(".info .info-nick-name").text(data.message.details[0].nickname);
				$(".info .sex").text(data.message.details[0].sex);
				//$(".avator").append("<img src='"+data.message.details[0].headimgurl+"'>");
				$(".avator").html("<img src='"+data.message.details[0].headimgurl+"'>");
			},
			complete:function(error){
			//_me.showOrHideShadow('hide');
			}
		});
	},
	shuffleOfferList: function(arr){
		if (!Array.prototype.shuffle) {
		    Array.prototype.shuffle = function() {
		        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
		        return this;
		    };
		}
		return arr.shuffle();
	},
	//获得offerlist
	getOfferList:function(swiper){
		var _me = this;
		var dfd = $.Deferred();
		
		var _randomArr = [
			'<li data-tag="offer1"><img src="../img/charts/1.png" alt=""></li>',
			'<li data-tag="offer2"><img src="../img/charts/2.png" alt=""></li>',
			'<li data-tag="offer3"><img src="../img/charts/3.png" alt=""></li>',
			'<li data-tag="offer4"><img src="../img/charts/4.png" alt=""></li>',
			'<li data-tag="offer5"><img src="../img/charts/5.png" alt=""></li>',
			'<li data-tag="offer6"><img src="../img/charts/6.png" alt=""></li>',
			'<li data-tag="offer1"><img src="../img/charts/7.png" alt=""></li>',
			'<li data-tag="offer2"><img src="../img/charts/8.png" alt=""></li>',
			'<li data-tag="offer3"><img src="../img/charts/9.png" alt=""></li>',
			'<li data-tag="offer4"><img src="../img/charts/10.png" alt=""></li>',
			'<li data-tag="offer5"><img src="../img/charts/11.png" alt=""></li>',
			'<li data-tag="offer6"><img src="../img/charts/12.png" alt=""></li>',
		]
		
		
		var _reslut = [];
		var number = _randomArr.length;
		for(var i=0;i<number;i++){
			//console.log(i)
			var _index = Math.floor(Math.random() * _randomArr.length);
			_reslut.push(_randomArr[_index]);

			_randomArr.splice(_index,1);
		}
		
		var str = "";
			str += "<div class='swiper-slide'>";
			str += "	<ul>";
		for(var i = 0;i<_reslut.length;i++){
			str += _reslut[i]
			if(i == _reslut.length - 1){
				str += "</ul></div>";
			} else if((i+1)%6 == 0){
				str += "</ul></div>";
				str += "<div class='swiper-slide'>";
				str += "	<ul>";
			}
		}
			
		//$(".swiper-wrapper").html(str).show();

		//return false;

		//_me.showOrHideShadow('show');
		$.ajax({
			type: "POST",
			//url: _me.config.cmsHttp + "/offerlist",
			url: "http://cms1.tapad.cn/admin/wechat/offerlist",
			//async:false,
			data:{
				connect_key:_me.config.key
			},
			success: function(data){
				data = (typeof(data) == 'string' ? JSON.parse(data) : data);
			
				if(data.status == 'success'){
					var str = "";
						str += "<div class='swiper-slide'>";
						str += "	<ul>";
					var _data = data.data;

					_data = _me.shuffleOfferList(_data);
					for(var i=0;i<_data.length;i++){
						if(_data[i].news_list.length > 0){
							//http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=http://mmbiz.qpic.cn/mmbiz_png/w7rBHsy1r44FZDj09LiaZnD6jVYWY6RyNODmI86PpW9micdVIXiaicuSdAmSr49tibPGVI4JNhzRWAensM9icx94PXFA/0
							str += "<li data-offer-id='"+_data[i].id+"' data-tag='"+_data[i].name +"' data-url='"+ _data[i].news_list[0].url+"'>";
							//str += "	<img src='"+_data[i].news_list[0].picurl.replace(/.*(?=\/pages\/)/,'')+"' alt='"+_data[i].news_list[0].title+"' title='"+_data[i].news_list[0].title+"'>";
							str += "	<img src='" + _me.config.crmHttp + "getwximg?url="+_data[i].news_list[0].picurl +"' alt='"+_data[i].news_list[0].title+"' title='"+_data[i].news_list[0].title+"'>";
							str += "</li>";
						}						
						if(i == _data.length - 1){
							str += "</ul></div>";
						} else if((i+1)%6 == 0){
							str += "</ul></div>";
							str += "<div class='swiper-slide'>";
							str += "	<ul>";
						}
					}

					$(".swiper-wrapper").html(str).show();
					_me.swiper.update();
				}
			},
			complete:function(error){
				//_me.showOrHideShadow('hide');
			}
		});

		return dfd;
	},
	//生成会话列表
	setChatConversation:function(data){
		var _html = '';
		for(var i=0;i<data.length;i++){
			//data[i].content.split('<\/b>')[1]
			_html += "<li class='' data-lastTime='" + data[i].msgTime + "' data-lastContent='" +  data[i].content +"' data-openid='" + data[i].openid +"' data-lastMsgId='" + data[i].lastMsgId + "' data-lastMsgType='" + data[i].msgtype + "'><div class='userHead'><img src='" + data[i].headImg + "'></div><div class='nickName'>" + data[i].nickname  + "</div><div class='hasMsg'></div></li>"
		}
		$('.talking-wechartUser-list ul').html(_html);		
	},
	//生成聊天框
	setChatBox:function(_openId,_lastMsgId,display){
		var _me = this;
		
		var _boxId = "chatBox_" + _openId;

		if($('#' + _boxId).length >= 1){				
			$('#' + _boxId).addClass('active').show();
			$('#' + _boxId).find('.ChatLog').scrollTop($('#' + _boxId).find('.ChatLogInner').height());
		}else{
			var _chatBox = "<div class='user-talking-box active' id='" + _boxId + "' data-lastMsgId='" + _lastMsgId +  "' style='display:" + display + "'>";
				_chatBox += "	<div class='ChatLog'><div class='ChatLogInner' style='float: left;'></div></div>";
				_chatBox += "	<div class='ChatBox'>";
				_chatBox += "		<div class='toolbar'>";
				_chatBox += "			<img src='../img/folder.png' class='sendImg' />";
				_chatBox += "		</div>";
				_chatBox += "		<div class='sendTextarea'>";
				_chatBox += "			<textarea class='chatValueBox'></textarea>";
				_chatBox += "			<button class='sendMsg'>发送消息</button>";
				_chatBox += "		</div>";
				_chatBox += "	</div>";
				_chatBox += "</div>";
			$('.talking-box').append(_chatBox);
			
			_me.getHistory(_openId);
		};	

	},	
	//发送消息
	sendChartText:function(chatObj){
		var _me = this;
		
		var _chatHTML = '';

		_chatHTML += "<div class='customerServiceMsg'>";
		_chatHTML += "	<div class='userHead'><img src='../img/th.png'></div>";
		_chatHTML += "	<div class='content'>";
		_chatHTML += "		<div class='userName'>" + _me.config.csName + "</div>";
		
		_msgtype = chatObj.msgtype;
		if(_msgtype == 'text'){
			_chatHTML += "		<div class='userChat'>" + chatObj.content + "</div>";
		}else if(_msgtype == 'image'){
			_chatHTML += "		<div class='userChat'><img src='" + chatObj.content + "' /></div>";
		}else if(_msgtype == 'video'){
			_chatHTML += "		<div class='userChat'><video controls src='" + chatObj.content + "' /></div>";
		}else if(_msgtype == 'news'){
			_chatHTML += "		<div class='userChat userChatImg'><img src='" + $('.swiper-wrapper li[data-offer-id=' + chatObj.content + ']').find('img').attr('src') + "' /></div>";
		}
		_chatHTML += "	</div>";
		_chatHTML += "		<div class='chatTime'>" + chatObj.create_time + "</div>";
		
		_chatHTML += "</div>";
		
		
		return _chatHTML;
	},
	//接收消息
	getChartText:function(chatObj){		

		var liobj = $('li[data-openid=' + chatObj.from + ']');
		
		var _chatHTML = '';
		_chatHTML += "<div class='userMsg'>";
		_chatHTML += "	<div class='userHead'><img src='" + liobj.find('.userHead img').attr('src') + "'></div>";
		_chatHTML += "	<div class='content'>";
		_chatHTML += "		<div class='userName'>" + liobj.find('.nickName').text() +"</div>";

		_msgtype = chatObj.msgtype;
		
		if(_msgtype == 'text'){
			_chatHTML += "		<div class='userChat'>" + chatObj.content + "</div>";
		}else if(_msgtype == 'image'){
			_chatHTML += "		<div class='userChat'><img src='" + chatObj.content + "' /></div>";
		}else if(_msgtype == 'video'){
			_chatHTML += "		<div class='userChat'><video controls src='" + chatObj.content + "' /></div>";
		}else if(_msgtype == 'news'){
			_chatHTML += "		<div class='userChat'>" + chatObj.content + "</div>";
		}
		_chatHTML += "	</div>";
		_chatHTML += "		<div class='chatTime'>" + chatObj.create_time + "</div>";
		
		_chatHTML += "</div>";

		return _chatHTML;
	},
	//操作事件绑定
	eventControl:function(){
		var _me = this;
		
		//onChoose 点击用户
		$(document).on('click','.talking-wechartUser-list li',function(){
				
			$('.talking-wechartUser-list li').removeClass('active');
			$(this).addClass('active');
			$(this).find('.hasMsg').hide();
			
			var _openId = $(this).attr('data-openid');
			var _lastMsgId = $(this).attr('data-lastMsgId');
			//var _boxId = "chatBox_" + _openId;
			
			$('.talking-box .user-talking-box').removeClass('active').hide();

			_me.setChatBox(_openId,_lastMsgId,'');

			//详细信息
			_me.getUserProfile(_openId);
			//生成随机offer
			_me.getOfferList();
		})

		//发送文字消息
		$(document).on('click','.sendMsg',function(){	
			var _id = $(this).parents('.user-talking-box').attr('id');
			_me.sendMsg(_id);
		})
						
		//发送图片消息
		$(document).on('click','.sendImg',function(){
			$('#msg_id').val( $('.user-talking-box.active').attr('data-lastmsgid'));
			$("#input-file-now").trigger("click");
		})	
		
		//发送图片
		$(document).on('change','#input-file-now',function(){	
			var _nowBox = $('.user-talking-box.active');
			_msgId = _nowBox.attr('data-lastmsgid');
			var domId = _nowBox.attr('id');
			_me.sendImageMsg(domId);
		})
		
		

		$(document).on('keypress','.chatValueBox',function(e){

			if(e.ctrlKey && e.which == 13 || e.which == 10) {

				var _id = $('.user-talking-box.active').attr('id');
				_me.sendMsg(_id);
			}
			
			//else if (e.shiftKey && e.which==13 || e.which == 10) {
			//	alert('组合键2')
			//}
		})


	
		/////darg

		var _config =_me.config;
		//鼠标按下
		$(document).on("mousedown",".swiper-slide > ul > li", function(e){
			e.stopPropagation();
			e.preventDefault();
			var _self = $(this);

			//hold
		
			_config.mousehold = setInterval(function(){
				_config.holdcount ++;
				if(_config.holdcount > 5){
					clearInterval(_config.mousehold);
					_config.holdcount = 0;

					//锁定swiper
					_me.swiper.lockSwipes();

					//计算坐标
					var _height = _self.height(),
					_width = _self.width(),
					_top = e.pageY-_height/2,
					_left = e.pageX-_width/2;
					$("body").append("<div id='drag-box'>");
					$("#drag-box").css({"width":_width+"px","height":_height+"px","top":_top+"px","left":_left+"px"}).append(_self.children("img").clone());

					//记录移动开始坐标
					_config.startX = e.originalEvent.pageX - _self.offset().left;
					_config.startY = e.originalEvent.pageY - _self.offset().top;

					//记录offertag
					//_config.offertag = _self.attr("data-tag");
					_config.offertag = _self.attr("data-offer-id");
					_config.offerImgUrl = _self.find('img').attr('src');
					//开启drag
					_config.dragable = true;
				}
			},10);  	
		});

		//解锁swiper
		$(".swiper-container").on("mouseenter", function(){
			if(!_config.dragable){
				_me.swiper.unlockSwipes();
			}    	
		});

		//鼠标抬起
		$(document).on("mouseup", function(e){
			//清除hold
			if(_config.holdcount > 0){
				_config.holdcount = 0;
				clearInterval(_config.mousehold);
			}

			//销毁drag
			if($("#drag-box").length > 0){
				$("#drag-box").remove();
			}    	

			//判断是否在发送区域
			var $_chart_box = $(".chart-box"),
				target_startX = $_chart_box.offset().left,
				target_endX = target_startX + $_chart_box.width(),
				target_startY = $_chart_box.offset().top,
				target_endY = target_startY + $_chart_box.height();

			//发送图文消息
			if(e.originalEvent.pageX > target_startX &&
				e.originalEvent.pageX < target_endX &&
				e.originalEvent.pageY > target_startY && 
				e.originalEvent.pageY < target_endY && _config.dragable){

				//发送图文消息
				//tag:offertag

				
				_me.sendTWmsg(_config.offertag,_config.offerImgUrl);
				
			}

			//关闭drag
			if(_config.dragable){
				_config.dragable = false;
			}

		}).on("mousemove", function(e){
			if(_config.dragable){
				$("#drag-box").offset({ 
					left: e.originalEvent.pageX - _config.startX,
					top: e.originalEvent.pageY - _config.startY 
				});
			}
		});





	},
	setChartScrollBar:function(_openId,_chatTxt){
		var _parent = $('#chatBox_' + _openId);

		//插入消息
		_parent.find('.ChatLogInner').append(_chatTxt);
		_parent.find('.chatValueBox').val('');
		//重置聊天框滚动条
		_parent.find('.ChatLog').scrollTop(_parent.find('.ChatLogInner').height());
	},
	//加载百度地图自动定位
	initBDMap:function(){
		 
		var map = new BMap.Map("map-wrap");
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
	//生成左右滑动
	setScroll:function(){
		var _me = this;
		//右侧服务列表滚动
		
		if (!_me.config.page.myScroll){
			setTimeout(function() {
				
				_me.config.page.myScroll = new IScroll(".iscroll-wrap", {
					momentum: true,
					bounce:true,
					disableMouse:false,
		//			mouseWheel:true,
					deceleration:0.001,
					tap:true
				});
				/*page.myScroll.on("scrollEnd", function() {
					if (this.y < (this.maxScrollY + 5) && this.directionY == 1) {
						if ($(".div-more-data").css("display")!="none") {
							page.getData();
						}
					}
				});*/
			}, 0);
		} else {
			setTimeout(function() {
				_me.config.page.myScroll.refresh();
			}, 20);
		}
	},
	//
	showOrHideShadow: function(type) {
		var _html = "<div id='view_Shadow'></div>";
		if(type == 'show') {
			if($('body #view_Shadow').length == 0) {
				$('body').append(_html);
			}
			$('#view_Shadow').height(document.body.scrollHeight).show();
		} else if(type == 'hide') {
			$('#view_Shadow').hide();
		}
	},

	
}