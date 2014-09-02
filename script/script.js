var dataForWeixin={
    appId:'',
    MsgImg:'http://wow0218.github.io/qvideo/images/shareto.jpg',
    TLImg:'http://wow0218.github.io/qvideo/images/shareto.jpg',
    link:'http://wow0218.github.io/qvideo/',
    title:'来《hi歌》，对新的自己Say Hi',
    desc:'',
    callback:function(){
    	
    }
};
function WeiXinShareInit(){
	var onBridgeReady=function(){
		WeixinJSBridge.call('showOptionMenu');
        WeixinJSBridge.call('hideToolbar');
        // 发送给好友;
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid":dataForWeixin.appId,
                "img_url":dataForWeixin.TLImg,
                "img_width":"120",
                "img_height":"120",
                "link":dataForWeixin.link,
                "desc":dataForWeixin.desc,
                "title":dataForWeixin.title
            }, function(res){(dataForWeixin.callback)();});
        });
        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            (dataForWeixin.callback)();
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url":dataForWeixin.TLImg,
                "img_width":"120",
                "img_height":"120",
                "link":dataForWeixin.link,
                "desc":dataForWeixin.desc,
                "title":dataForWeixin.title
            },  function(res){});
        });
        // 分享到微博;
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            WeixinJSBridge.invoke('shareWeibo',{
                "content":dataForWeixin.desc+" "+dataForWeixin.link,
                "url":dataForWeixin.link,
                "img_url":dataForWeixin.MsgImg,
                "pic":dataForWeixin.MsgImg,
                "img":dataForWeixin.MsgImg,
                "desc":dataForWeixin.desc,
                "title":dataForWeixin.title
            }, function(res){(dataForWeixin.callback)();});
        });
        // 分享facebook;
        WeixinJSBridge.on('menu:share:facebook', function(argv){
            (dataForWeixin.callback)();
            WeixinJSBridge.invoke('shareFB',{
                "img_url":dataForWeixin.TLImg,
                "img_width":"120",
                "img_height":"120",
                "link":dataForWeixin.link,
                "desc":dataForWeixin.desc,
                "title":dataForWeixin.title
            }, function(res){});
        });
    };
    if(document.addEventListener){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if(document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    }
}
function shareModel(){
	var ua=navigator.userAgent;
	//微信
	if(ua.indexOf("MicroMessenger")>=0){
		WeiXinShareInit();
	}else{
		var _link = dataForWeixin.link,
			title = dataForWeixin.title,
			img=dataForWeixin.MsgImg,
			content = dataForWeixin.desc;
		//分享到腾讯微博
		window.open('http://share.v.t.qq.com/index.php?c=share&a=index&url='+encodeURIComponent(_link)+'&title='+encodeURIComponent(content)+'&pic='+encodeURIComponent(img)+'','_blank');
	}
}
$Tencent=window.$Tencent || {
	$bath:".",//
	getVendorPrefix:function() {
		var property = {
			transformProperty : '',
			MozTransform : '-moz-',
			WebkitTransform : '-webkit-',
			OTransform : '-o-',
			msTransform : '-ms-'
		};
		var m_style=document.documentElement.style;
		for (var p in property) {
			if (typeof m_style[p] != 'undefined') {
				return property[p];
			}
		}
		return "";
	},
	getJSONLength:function(json){
		var temp=0;
		for(var val in json){
			temp++;
		}
		return temp;
	},
	
	config:{
		"timeId":{
			"homepage":[],
			"page_1":[],
			"page_2":[],
			"page_3":[],
			"page_4":[],
			"page_5":[],
			"page_6":[]
		},
		"homepage":{},
		"pages":{}
	},
	resizeHandler:function(){
		var ww=window.innerWidth,
			wh=window.innerHeight;
		$("#main").css({"height":wh});
	},
	//页面切换 左右滑动
	mainPageSlider:function(c,t,beback){
		c= c || $(".page").index($(".page.cur")) || 0;
		if(c==t){return;}
		if(t<0 || t>=$(".page").size()){return;}
		if(beback==undefined || beback==null){beback=(c>t);}
		//console.log(c+"-->"+t);
		var $page=$(".page");
		$page.eq(c).removeClass("cur").trigger("pageOut",beback);
		$page.eq(t).addClass("cur").attr("relindex",c).trigger("pageIn",beback);
		//适应页面高度
		window.scrollTo(0,0);	
	},
	drawLine:function(cvs){
		var _=this;
		var ctx=cvs.getContext("2d");
		ctx.clearRect(0,0,cvs.width,cvs.height);
		var img=document.getElementById("xian");
		var pat=ctx.createPattern(img,"repeat-x");
		ctx.strokeStyle=pat;
		ctx.lineWidth=2;
		_.drawlineIndex(ctx,2);
		_.drawlineIndex(ctx,0);
		_.drawlineIndex(ctx,1);
		_.drawlineIndex(ctx,3);
		_.drawlineIndex(ctx,4);
		return cvs;
	},
	drawlineIndex:function(ctx,index,beArt,dpos){
		dpos =dpos || 0;
		var begin=[[40,0],[63,0],[87,0],[111,0],[134,0]];
		var end=[[20,903],[54,903],[87,903],[120,903],[154,903]];
		ctx.beginPath();
		ctx.moveTo(begin[index][0],begin[index][1]);
		if(!!beArt){
			ctx.quadraticCurveTo((begin[index][0]+end[index][0])/2 +dpos,451,end[index][0],end[index][1]);
		}else{
			ctx.lineTo(end[index][0],end[index][1]);
		}
		ctx.stroke();
	},
	/* // jQuery.easing.1.3.js    */
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	lineAnimate:function(cvs,index,begin,end,during,easing,cstep){
		var _=this;
		var pertime=10;	//执行间隔 毫秒
		cstep=cstep || 1;//当前执行的第几步
		var steps=parseInt(during/pertime);//共需要执行步数
		var t=cstep/steps //当前执行分量
		begin = begin || 0;
		end = end || 0;
		//开始画线
		var ctx=cvs.getContext("2d");
		ctx.clearRect(0,0,cvs.width,cvs.height);
		var img=document.getElementById("xian");
		var pat=ctx.createPattern(img,"repeat-x");
		ctx.strokeStyle=pat;
		ctx.lineWidth=2;
		var array=[0,1,2,3,4];
		var dt=begin+t*(end-begin);
		if(easing=="Out"){
			dt=_.easeOutBounce(t,t,0,1,1) * (end-begin)+begin;
		}
		_.drawlineIndex(ctx,index,true,dt);
		array.splice(index,1);
		for(var i=0;i<array.length;i++){
			_.drawlineIndex(ctx,array[i]);
		}
		if(cstep<steps){
			setTimeout(function(){
				_.lineAnimate(cvs,index,begin,end,during,easing,cstep+1);
			},pertime);
		}
	},
	reloadMusic:function(index){//不加载 index
		var mId=["M1","M2","M3","M4","BGM"];
		for(var i=0;i<mId.length && i!=index;i++){
			var m=document.getElementById(mId[i]);
			if(m.readyState !==4){
				typeof(m.load)=='function' && m.load();
			}
		}
	},
	playMusic:function (index){
		var mId=["M1","M2","M3","M4","BGM"];
		var music=document.getElementById(mId[index]);
		music.paused && typeof(music.play)=='function' && music.play();
		if(index==4){
			if(!!music.paused){
				$("#btn_sound").removeClass("beplay");
			}else{
				$("#btn_sound").addClass("beplay");
			}
		}
	},
	pauseMusic:function(index){
		var mId=["M1","M2","M3","M4","BGM"];
		var music=document.getElementById(mId[index]);
		!music.paused && typeof(music.pause)=='function' && music.pause();
		if(index==4){
			if(!!music.paused){
				$("#btn_sound").removeClass("beplay");
			}else{
				$("#btn_sound").addClass("beplay");
			}
		}
	},
	resetMusic:function(index){
		var mId=["M1","M2","M3","M4","BGM"];
		var music=document.getElementById(mId[index]);
		if(typeof(music.currentTime) !='undefined'){
			music.currentTime=0;
		}
	},
	autoWave:function($obj,during,cstep,dx,beback){
		var _=this;
		clearTimeout($obj.attr("timeid"));
		var pertime=10;
		var steps=parseInt(during/pertime);
		dx =dx||20;
		cstep= cstep || (!!beback? steps :1);		
		var posx=dx*cstep/steps;
		var posy=Math.sin(cstep/steps*Math.PI*2)*dx/2;
		//if(!!$obj.attr("notwave")){return;}
		$obj.transition({"x":posx,"y":posy},pertime);
		if(!!beback){
			if(cstep>1){
				//console.log(posx+"true===========");
				$obj.attr("timeid",setTimeout(function(){
					_.autoWave($obj,during,cstep-1,dx,true);
				},pertime));
			}else{
				//console.log(dx+"true===========");
				_.autoWave($obj,during,null,dx,false);
			}
		}else{
			if(cstep<steps){
				$obj.attr("timeid",setTimeout(function(){
					_.autoWave($obj,during,cstep+1,dx,false);
				},pertime));
			}else{
				//console.log(dx+" false===========");
				_.autoWave($obj,during,null,dx,true);
			}
		}
		return _;
	},
	clearAutoWave:function($obj){
		//$obj.attr("notwave",1024);
		$obj.each(function(i,e){
			clearTimeout($(this).attr("timeid"));
		});
		
	},
	autoScale:function($obj,begin,end){
		var _=this;
		begin = begin || 0;
		end = end || 1;
		clearTimeout($obj.attr("timeid"));
		$obj.css({"display":"block","scale":begin}).transition({"scale":end},600,function(){
			$obj.transition({"scale":begin},500);
		});
		$obj.attr("timeid",setTimeout(function(){
			_.autoScale($obj,begin,end);
		},1120));
		return _;
	},
	clearTimer:function($obj){
		$obj.each(function(i,e){
			clearTimeout($(this).attr("timeid"));
			clearTimeout($(this).attr("timeid1"));
			clearTimeout($(this).attr("timeid2"));
		});
	},
	huxiAnimate:function($obj,begin,end){
		var _=this;
		begin = begin || 0;
		end = end || 1;
		clearTimeout($obj.attr("timeid"));
		$obj.stop().css({"display":"block","opacity":begin}).animate({"opacity":end},2000,function(){
			$obj.animate({"opacity":begin},2500);
		});
		$obj.attr("timeid",setTimeout(function(){
			_.huxiAnimate($obj,begin,end);
		},4520));
		return _;
	},
	autoFlip:function($obj){
		var _=this;
		clearTimeout($obj.attr("timeid"));
		$obj.css({"rotate3d":"0,1,0,-30deg"}).transition({"rotate3d":"0,1,0,30deg"},3000,function(){
			$obj.transition({"rotate3d":"0,1,0,-30deg"},3000);
		});
		$obj.attr("timeid",setTimeout(function(){
			_.autoFlip($obj);
		},6020));
		return _;
	},
	renderHomePage:function(){
		var $page=$("#homepage");
		var _=this;
		_.config.beJita=true;
		$page.find(".qin").stop().css({"display":"block","opacity":0})
			.animate({"opacity":1},200);
		$page.find(".txt1").stop().css({"display":"block","opacity":0,"margin-top":-200})
			.animate({"opacity":1,"margin-top":-230},1000);
		_.config.timeId.homepage[0]=setTimeout(function(){
			$page.find(".txt2").stop().css({"display":"block","opacity":0,"margin-top":-157})
				.animate({"opacity":1,"margin-top":-177},1000);
		},800);
		_.config.timeId.homepage[1]=setTimeout(function(){
			$page.find(".txt3").stop().css({"display":"block","opacity":0,"margin-top":-116})
				.animate({"opacity":1,"margin-top":-126},1000,function(){
					_.autoScale($(this),1,1.1);
				});
		},1600);

		$("#guang").fadeOut(200);
	    $("#btn_sound").fadeOut(200);
	    $("#logo").fadeOut(200);
		_.clearTimer($("#pagesign"));
		$("#pagesign").fadeOut(200);
		return _;
	},
	homepageTimer:function(){
		var _=this;
		//开始计时以及计数
		clearTimeout(_.config.timeId.homepage[2]);
	    _.config.homepage.playtimes = (_.config.homepage.playtimes || 0) +1;
	    var during=_.config.homepage.playtimes>=4 ? 500 :3000;
    	_.config.timeId.homepage[2]=setTimeout(function(){
	    	//进入下一页
	    	_.config.beJita=false;
	    	$("#homepage").addClass("belight");
	    	_.clearTimer($("#homepage").find(".txt3"));
	    	$("#homepage").find(".txt1").stop().animate({"opacity":0,"margin-top":-220},500);
	    	$("#homepage").find(".txt2").stop().animate({"opacity":0,"margin-top":-177},500);
	    	$("#homepage").find(".txt3").stop().animate({"opacity":0,"margin-top":-136},500);
	    	_.playMusic(4);
	    	$("#guang").fadeIn(1000);
	    	$("#btn_sound").fadeIn(200);
	    	_.config.timeId.homepage[3]=setTimeout(function(){
	    		_.mainPageSlider(null,1);
	    	},1000);
	    },during);
	    return _;
	},
	clearHomepage:function(callback){
		var $page=$("#homepage");
		var _=this;
		$page.find(".qin").stop().animate({"opacity":0},200,function(){
			$(this).css({"display":"none"});
		});
		$page.find(".txt1").stop().animate({"opacity":0,"margin-top":-200},200,function(){
			$(this).css({"display":"none"});
		});
		$page.find(".txt2").stop().animate({"opacity":0,"margin-top":-157},200,function(){
			$(this).css({"display":"none"});
		});
		$page.find(".txt3").stop().animate({"opacity":0,"margin-top":-116},200,function(){
			$(this).css({"display":"none"});
			typeof callback =='function' && callback();
		});
		for(var i=0;i<_.config.timeId.homepage.length;i++){
			clearTimeout(_.config.timeId.homepage[i]);
		}
		_.config.homepage.playtimes=0;
	},
	//弹层
	renderPopWin:function(id,during){
		var $win=$("#"+id);
		clearTimeout($win.attr("timeid"));
		$win.css({"y":"100%","display":"block"}).transition({"y":"0%"},500,"out");
		if(!!during){
			$win.attr("timeid",setTimeout(function(){
				$win.transition({"y":"100%"},350,"in",function(){
					$win.css({"display":"none"});
				});
			},during));
		}
	},
	//提示信息
	renderTips:function(msg,during){
		var $win=$("#p_tips");
		clearTimeout($win.attr("timeid"));
		$win.html(msg);
		$win.css({"x":"100%"}).transition({"x":"0%"},350);
		if(!!during){
			$win.attr("timeid",setTimeout(function(){
				$win.transition({"x":"100%"},350);
			},during));
		}
	},
	eventInit:function(){
		var _=this;
		document.addEventListener('touchmove', function (e) { 
			//if(_.stopmove){
				e.preventDefault(); 
			// 	_.stopmove=false;
			// }
		},false);
		document.getElementById("homepage").addEventListener("ontouchmove" in document ? "touchmove" : "mousemove",function(e){
			//_.stopmove=true;
		},false);
	    document.getElementById("homepage").addEventListener("ontouchstart" in document ? "touchstart" : "mousedown",function(e){
	        e = e || window.event;
	        _.config.homepage.startX= !!e.changedTouches ? e.changedTouches[0].pageX:e.pageX;
	        _.config.homepage.startY= !!e.changedTouches ? e.changedTouches[0].pageY:e.pageY;
	    },false);
	    document.getElementById("homepage").addEventListener("ontouchend" in document ? "touchend" : "mouseup",function(e){
	        e = e || window.event;
	        if(!!_.config.homepage.bemove){return;}
	        _.config.homepage.bemove=true;
	        var cvs=document.getElementById("jitaxian");
	        var index=Math.floor(Math.random()*5);
	        var mIndex=Math.floor(Math.random()*4);
	        _.reloadMusic(mIndex);
	        var endX=!!e.changedTouches ? e.changedTouches[0].pageX:e.pageX,
	            endY=!!e.changedTouches ? e.changedTouches[0].pageY:e.pageY;
	        if(endX-_.config.homepage.startX>=150){ //向右滑动
	            _.lineAnimate(cvs,index,0,30,100,"",1);
	            if(_.config.beJita){
	            	_.playMusic(mIndex);
	            }
	            _.homepageTimer();
	        	setTimeout(function(){
	        		_.lineAnimate(cvs,index,30,0,300,"Out",1);
	        	},100);
	        	setTimeout(function(){
	        		_.config.homepage.bemove=false;
	        	},400);
	        }else if(endX-_.config.homepage.startX<=-150){//向左滑动
	        	_.lineAnimate(cvs,index,0,-30,100,"",1); 
	        	if(_.config.beJita){
	        		_.playMusic(mIndex);
	        	}
	        	_.homepageTimer();
	        	setTimeout(function(){
	        		_.lineAnimate(cvs,index,-30,0,300,"Out",1);
	        	},100);
	        	setTimeout(function(){
	        		_.config.homepage.bemove=false;
	        	},400);
	        }else{
	        	_.config.homepage.bemove=false;
	        }
	    },false);

		$(window).on("resize",_.resizeHandler).trigger("resize");		
		
		$("#btn_sound").bind("click",function(e){
			var music=document.getElementById("BGM");
			if(!!music.paused){
				_.playMusic(4);
			}else{
				_.pauseMusic(4);
			}
		});
		$("#homepage").bind("click",function(e){
			if($("#homepage").hasClass("belight")){
				_.mainPageSlider(null,1);
			}
		});

		$("#pagesign").bind("click",function(){
			var cur=$(".page").index($(".page.cur"));
			var s=$(".page").size();
			var t= cur+1 >=s? s-1:cur+1;
			_.mainPageSlider(cur,t);
		});
		var _pages=document.getElementsByClassName("page");
		for(var i=0;i<_pages.length;i++){
			_pages[i].addEventListener("ontouchstart" in document ? "touchstart" : "mousedown",function(e){
				 e = e || window.event;
		        _.config.pages.startX= !!e.changedTouches ? e.changedTouches[0].pageX:e.pageX;
		        _.config.pages.startY= !!e.changedTouches ? e.changedTouches[0].pageY:e.pageY;
			},false);
			_pages[i].addEventListener("ontouchmove" in document ? "touchmove" : "mousemove",function(e){
				e = e || window.event;
		        _.config.pages.curX= !!e.changedTouches ? e.changedTouches[0].pageX:e.pageX;
		        _.config.pages.curY= !!e.changedTouches ? e.changedTouches[0].pageY:e.pageY;
			},false);
			_pages[i].addEventListener("ontouchend" in document ? "touchend" : "mouseup",function(e){
				e = e || window.event;
				var endX=!!e.changedTouches ? e.changedTouches[0].pageX:e.pageX,
	            	endY=!!e.changedTouches ? e.changedTouches[0].pageY:e.pageY;
	            var thisId=this.getAttribute("id");
	            if(thisId=="homepage" || thisId=="page_6" || !!_.config.pages.bemove){return;}
	            _.config.pages.bemove=true;
	            var during=10;
	            var cur=$(".page").index($(".page.cur"));
				var s=$(".page").size();
	            if(endY-_.config.pages.startY>=150){ //向下滑动
	            	var t= cur-1<=0? 0:cur-1;
	            	if(t==0){return;}//禁止滑动返回首页
					_.mainPageSlider(cur,t);
	            	during=500;
	            }else if(endY-_.config.pages.startY<=-150){//向上滑动
					var t= cur+1 >=s? s-1:cur+1;
					_.mainPageSlider(cur,t);
					during=500;
	            }
	            setTimeout(function(){
	            	_.config.pages.bemove=false;
	            },during);
			},false);
		}
		return _;
	},
	pageEventInit:function(){
		var _=this;
		$("#homepage").bind("pageIn",function(e,beback){
			var $page=$(this);
			$page.css({"display":"block","x":"0%","y":"0%"});
			_.renderHomePage();
		});
		$("#homepage").bind("pageOut",function(e,beback){
			var $page=$(this);
			_.clearHomepage(function(){
				$page.css({"display":"none"});
			});
		});
		$("#page_1").bind("pageIn",function(e,beback){
			var $page=$(this);
			$page.css({"display":"block","x":"0%","y":"0%"});
			$("#guang").stop().animate({"margin-top":-396},800);
			$page.find(".colorbg").stop().css({'display':'block','margin-top':45,'opacity':0})
				.animate({'margin-top':-255,'opacity':1},600);
			_.config.timeId.page_1[0]=setTimeout(function(){

				$page.find(".color").stop().css({'display':'block','margin-top':-40,'opacity':0})
					.animate({'opacity':1},300);
				$page.find(".txt1").stop().css({'display':'block','margin-top':-140,'opacity':0})
					.animate({'margin-top':-240,'opacity':1},800);
				$page.find(".music5").stop().css({'display':'block','margin-top':147,'opacity':0})
					.animate({'margin-top':-83,'opacity':1},900,function(){
						_.autoScale($(this),1,1.1);
					});
				$page.find(".music4").stop().css({'display':'block','margin-top':157,'opacity':0})
					.animate({'margin-top':-83,'opacity':1},700,function(){
						_.autoScale($(this),1,1.1);
					});
				$page.find(".pic1").stop().css({'display':'block','margin-top':220,'opacity':0})
					.animate({'margin-top': -80,'opacity':1},1000,function(){
						//_.autoFlip($(this));
					});
				$page.find(".music3").stop().css({'display':'block','margin-top':141,'opacity':0})
					.animate({'margin-top':-159,'opacity':1},500,function(){
						_.autoWave($(this),7000,1,50);
					});
				$page.find(".music2").stop().css({'display':'block','margin-top':149,'opacity':0})
					.animate({'margin-top':-151,'opacity':1},650,function(){
						_.autoWave($(this),8000,1,60);
					});
				$page.find(".music1").stop().css({'display':'block','margin-top':341,'opacity':0})
					.animate({'margin-top':41,'opacity':1},1500,function(){
						_.autoWave($(this),6000,1,40);
					});
			},600);
			//显示 LOGO 翻页
			$("#logo").fadeIn(300);
			_.huxiAnimate($("#pagesign"),0.2,1);
		});
		$("#page_1").bind("pageOut",function(e,beback){
			var $page=$(this);
			//清除定时器
			_.clearAutoWave($page.find(".music1,.music2,.music3"));
			_.clearTimer($page.find(".music4,.music5"));
			for(var i=0;i<_.config.timeId.page_1.length;i++){
				clearTimeout(_.config.timeId.page_1[i]);
			}
			$page.find(".pic1,.music5,.music4,.music3,.music2,.music1,.txt1,.color,.colorbg")
				.animate({"margin-top":-420,"opacity":0},1000,function(){
					$(this).css({"display":"none"});
					$page.css({"display":"none"});
				});
		});
		$("#page_2").bind("pageIn",function(e,beback){
			var $page=$(this);
			$page.css({"display":"block","x":"0%","y":"0%"});
			$("#guang").stop().animate({"margin-top":80},800);
			$page.find(".colorbg").stop().css({'display':'block','margin-top':-70,'opacity':0})
				.animate({'margin-top':-270,'opacity':1},600);
			_.config.timeId.page_2[0]=setTimeout(function(){
				$page.find(".music5").stop().css({'display':'block','margin-top':247,'opacity':0})
					.animate({'margin-top':8,'opacity':1},600);
				$page.find(".music4").stop().css({'display':'block','margin-top':297,'opacity':0})
					.animate({'margin-top':147,'opacity':1},800,function(){
						_.autoWave($(this),7000,1,40);
					});
				$page.find(".music3").stop().css({'display':'block','margin-top':380,'opacity':0})
					.animate({'margin-top':301,'opacity':1},800,function(){
						_.autoWave($(this),8000,1,40);
					});
				$page.find(".music2").stop().css({'display':'block','margin-top':447,'opacity':0})
					.animate({'margin-top':301,'opacity':1},700,function(){
						_.autoWave($(this),6000,1,30);
					});
				$page.find(".music1").stop().css({'display':'block','margin-top':247,'opacity':0})
					.animate({'margin-top':145,'opacity':1},750,function(){
						_.autoWave($(this),4000,1,20);
					});
				$page.find(".pic1").stop().css({'display':'block','margin-top':332,'opacity':0})
					.animate({'margin-top':132,'opacity':1}, 500,function(){
						_.autoWave($(this),5000,1,30);
					});
				$page.find(".pic2").stop().css({'display':'block','margin-top':416,'opacity':0})
					.animate({'margin-top':44,'opacity':1}, 800,function(){
						_.autoWave($(this),4500,1,20);
					});
				$page.find(".txtbg").stop().css({'display':'block','margin-top':-353,'opacity':0})
					.animate({"opacity":1},500,function(){
						$page.find(".txt1").css({'display':'block','margin-top':-369,'rotate3d':'0,1,0.1,30deg','opacity':0})
							.transition({"rotate3d":"0,1,0,0deg",'opacity':1},800,"easeOutBack");
					});
			},600);
		});
		$("#page_2").bind("pageOut",function(e,beback){
			var $page=$(this);
			_.clearAutoWave($page.find(".music1,.music2,.music3,.music4,.music5,.pic1,.pic2"));
			for(var i=0;i<_.config.timeId.page_2.length;i++){
				clearTimeout(_.config.timeId.page_2[i]);
			}
			$page.find(".txtbg,.txt1").stop().animate({"opacity":0},350,function(){
				$(this).css({"display":"none"});
			});
			$page.find(".music1,.music2,.music3,.music4,.music5,.pic1,.pic2,.colorbg").stop()
				.animate({"margin-top":-420,"opacity":0},500,function(){
					$(this).css({"display":"none"});
					$page.css({"display":"none"});
				});
		});
		$("#page_3").bind("pageIn",function(e,beback){
			var $page=$(this);
			$page.css({"display":"block","x":"0%","y":"0%"});
			$("#guang").stop().animate({"margin-top":-212},800);
			$page.find(".colorbg").stop().css({'display':'block','margin-top':45,'opacity':0})
				.animate({'margin-top':-162,'opacity':1},600);
			_.config.timeId.page_3[0]=setTimeout(function(){
				$page.find(".pic1").stop().css({'display':'block','margin-top':80,'opacity':0})
					.animate({'margin-top':-80,'opacity':1},600);
				$page.find(".music4").stop().css({'display':'block','margin-top':80,'opacity':0})
					.animate({'margin-top':-68,'opacity':1},700);
				$page.find(".music3").stop().css({'display':'block','margin-top':297,'opacity':0})
					.animate({'margin-top':206,'opacity':1},800,function(){
						_.autoWave($(this),7000,1,40);
					});
				$page.find(".music2").stop().css({'display':'block','margin-top':410,'opacity':0})
					.animate({'margin-top':316,'opacity':1},800,function(){
						_.autoWave($(this),8000,1,40);
					});
				$page.find(".music1").stop().css({'display':'block','margin-top':247,'opacity':0})
					.animate({'margin-top':70,'opacity':1},700,function(){
						_.autoWave($(this),6000,1,30);
					});
				$page.find(".txtbg").stop().css({'display':'block','margin-top':-321,'opacity':0})
					.animate({"opacity":1},500,function(){
						$page.find(".txt1").css({'display':'block','margin-top':-351,'rotate3d':'0,1,0.1,30deg','opacity':0})
							.transition({"rotate3d":"0,1,0,0deg",'opacity':1},800,"easeOutBack");
					});
			},300);

		});
		$("#page_3").bind("pageOut",function(e,beback){
			var $page=$(this);
			_.clearAutoWave($page.find(".music1,.music2,.music3,.music4,.pic1"));
			for(var i=0;i<_.config.timeId.page_3.length;i++){
				clearTimeout(_.config.timeId.page_3[i]);
			}
			$page.find(".txtbg,.txt1").stop().animate({"opacity":0},350,function(){
				$(this).css({"display":"none"});
			});
			$page.find(".music1,.music2,.music3,.music4,.pic1,.colorbg").stop()
				.animate({"margin-top":-420,"opacity":0},500,function(){
					$(this).css({"display":"none"});
					$page.css({"display":"none"});
				});
		});

		$("#page_4").bind("pageIn",function(e,beback){
			var $page=$(this);
			$page.css({"display":"block","x":"0%","y":"0%"});
			$("#guang").stop().animate({"margin-top":-160},800);
			$page.find(".colorbg").stop().css({'display':'block','margin-top':80,'opacity':0})
				.animate({'margin-top':-152,'opacity':1},600);
			_.config.timeId.page_4[0]=setTimeout(function(){
				$page.find(".color").stop().css({'display':'block','margin-top':-116,'opacity':0})
					.animate({"opacity":1},500);
				$page.find(".music4").stop().css({'display':'block','margin-top':280,'opacity':0})
					.animate({'margin-top':160,'opacity':1},700);
				$page.find(".music3").stop().css({'display':'block','margin-top':197,'opacity':0})
					.animate({'margin-top':-20,'opacity':1},800,function(){
						_.autoWave($(this),7000,1,40);
					});
				$page.find(".music2").stop().css({'display':'block','margin-top':510,'opacity':0})
					.animate({'margin-top':366,'opacity':1},800,function(){
						_.autoWave($(this),8000,1,40);
					});
				$page.find(".music1").stop().css({'display':'block','margin-top':247,'opacity':0})
					.animate({'margin-top':121,'opacity':1},700,function(){
						_.autoWave($(this),6000,1,30);
					});
				$page.find(".txtbg").stop().css({'display':'block','margin-top':-339,'opacity':0})
					.animate({"opacity":1},500,function(){
						$page.find(".txt1").css({'display':'block','margin-top':-355,'rotate3d':'0,1,0.1,30deg','opacity':0})
							.transition({"rotate3d":"0,1,0,0deg",'opacity':1},800,"easeOutBack");
					});
				$page.find(".pic1").css({'display':'block','opacity':1,'scale':0,'margin-top':10})
					.transition({'scale':1},350,"easeOutQuart");
			},600);
			_.config.timeId.page_4[1]=setTimeout(function(){
				$page.find(".pic2").css({'display':'block','opacity':1,'scale':0,'margin-top':33})
					.transition({'scale':1},350,"easeOutQuart");
			},800);
			_.config.timeId.page_4[2]=setTimeout(function(){
				$page.find(".pic3").css({'display':'block','opacity':1,'scale':0,'margin-top':280})
					.transition({'scale':1},350,"easeOutQuart");
			},1000);
			_.config.timeId.page_4[3]=setTimeout(function(){
				$page.find(".pic4").css({'display':'block','opacity':1,'scale':0,'margin-top':81})
					.transition({'scale':1},350,"easeOutBack");
			},1200);			
		});
		$("#page_4").bind("pageOut",function(e,beback){
			var $page=$(this);
			_.clearAutoWave($page.find(".music1,.music2,.music3,.music4"));
			for(var i=0;i<_.config.timeId.page_4.length;i++){
				clearTimeout(_.config.timeId.page_4[i]);
			}
			$page.find(".txtbg,.txt1").stop().animate({"opacity":0},350,function(){
				$(this).css({"display":"none"});
			});
			$page.find(".music1,.music2,.music3,.music4,.color,.colorbg,.pic1,.pic2,.pic3,.pic4").stop()
				.animate({"margin-top":-420,"opacity":0},500,function(){
					$(this).css({"display":"none"});
					$page.css({"display":"none"});
				});

		});
		$("#page_5").bind("pageIn",function(e,beback){
			var $page=$(this);
			$page.css({"display":"block","x":"0%","y":"0%"});
			$("#guang").stop().animate({"margin-top":-224},800);
			$page.find(".colorbg").stop().css({'display':'block','margin-top':80,'opacity':0})
				.animate({'margin-top':-320,'opacity':1},600);
			_.config.timeId.page_5[0]=setTimeout(function(){
				$page.find(".music6").stop().css({'display':'block','margin-top':80,'opacity':0})
					.animate({'margin-top':-102,'opacity':1},700);
				$page.find(".music5").stop().css({'display':'block','margin-top':130,'opacity':0})
					.animate({'margin-top':-38,'opacity':1},800,function(){
						_.autoWave($(this),7000,1,40);
					});
				$page.find(".music4").stop().css({'display':'block','margin-top':310,'opacity':0})
					.animate({'margin-top':133,'opacity':1},800,function(){
						_.autoWave($(this),8000,1,40);
					});
				$page.find(".music3").stop().css({'display':'block','margin-top':247,'opacity':0})
					.animate({'margin-top':63,'opacity':1},700,function(){
						_.autoWave($(this),6000,1,40);
					});
				$page.find(".music2").stop().css({'display':'block','margin-top':280,'opacity':0})
					.animate({'margin-top':162,'opacity':1},900,function(){
						_.autoWave($(this),8000,1,50);
					});
				$page.find(".music1").stop().css({'display':'block','margin-top':247,'opacity':0})
					.animate({'margin-top':56,'opacity':1},1000,function(){
						_.autoWave($(this),6000,1,60);
					});
				$page.find(".pic1").stop().css({'display':'block','margin-top':247,'opacity':0})
					.animate({'margin-top':40,'opacity':1},1000,function(){
						_.autoWave($(this),5000,1,20);
					});
				$page.find(".txtbg").stop().css({'display':'block','margin-top':-307,'opacity':0})
					.animate({"opacity":1},580,function(){
						$page.find(".txt1").css({'display':'block','rotate3d':'0,1,0.1,30deg','opacity':0,'margin-top':-330})
							.transition({"rotate3d":"0,1,0,0deg",'opacity':1},800,"easeOutBack");
					});
			},600);
		});
		$("#page_5").bind("pageOut",function(e,beback){
			var $page=$(this);
			_.clearAutoWave($page.find(".music1,.music2,.music3,.music4,.music5,.pic1"));
			for(var i=0;i<_.config.timeId.page_5.length;i++){
				clearTimeout(_.config.timeId.page_5[i]);
			}
			$page.find(".txtbg,.txt1").stop().animate({"opacity":0},350,function(){
				$(this).css({"display":"none"});
			});
			$page.find(".music1,.music2,.music3,.music4,.music5,.music6,.colorbg,.pic1").stop()
				.animate({"margin-top":-420,"opacity":0},500,function(){
					$(this).css({"display":"none"});
					$page.css({"display":"none"});
				});

		});
		$("#page_6").bind("pageIn",function(e,beback){
			var $page=$(this);
			$page.stop().css({"display":"block","x":"0%","y":"0%","opacity":0})
				.animate({"opacity":1},500);
			//Logo
			//显示 LOGO 翻页
			$("#logo").fadeOut(200);
			_.clearTimer($("#pagesign"));
			$("#pagesign").fadeOut(200);
			$("#btn_sound").fadeOut(200);
		});
		$("#page_6").bind("pageOut",function(e,beback){
			var $page=$(this);

			$page.stop().animate({"opacity":0},300,function(){
				_.pauseMusic(4);
				_.resetMusic(4);
				$(this).css({"display":"none"});
			});
		});
		return _;
	},
	cssInit:function(){
		var _=this;
		//横竖屏幕
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
			if(window.orientation!=0){
				//_.renderShuping();
			}else{
				//_.closeShuping();
			}
		}, false);
		_.drawLine(document.getElementById("jitaxian"));		
		return _;
	},
	
	init:function(){
		window.scrollTo(0,0);
		WeiXinShareInit();
		return this.cssInit().eventInit().pageEventInit().renderHomePage();
	}
};