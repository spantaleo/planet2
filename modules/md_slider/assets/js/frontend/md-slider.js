!function(t){var i=["slit-horizontal-left-top","slit-horizontal-top-right","slit-horizontal-bottom-up","slit-vertical-down","slit-vertical-up","strip-up-right","strip-up-left","strip-down-right","strip-down-left","strip-left-up","strip-left-down","strip-right-up","strip-right-down","strip-right-left-up","strip-right-left-down","strip-up-down-right","strip-up-down-left","left-curtain","right-curtain","top-curtain","bottom-curtain","slide-in-right","slide-in-left","slide-in-up","slide-in-down","fade"],s=["bounceIn","bounceInDown","bounceInUp","bounceInLeft","bounceInRight","fadeIn","fadeInUp","fadeInDown","fadeInLeft","fadeInRight","fadeInUpBig","fadeInDownBig","fadeInLeftBig","fadeInRightBig","flipInX","flipInY","foolishIn","lightSpeedIn","puffIn","rollIn","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","twisterInDown","twisterInUp","swap","swashIn","tinRightIn","tinLeftIn","tinUpIn","tinDownIn","vanishIn"],e=["bombRightOut","bombLeftOut","bounceOut","bounceOutDown","bounceOutUp","bounceOutLeft","bounceOutRight","fadeOut","fadeOutUp","fadeOutDown","fadeOutLeft","fadeOutRight","fadeOutUpBig","fadeOutDownBig","fadeOutLeftBig","fadeOutRightBig","flipOutX","flipOutY","foolishOut","hinge","holeOut","lightSpeedOut","puffOut","rollOut","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRight","rotateDown","rotateUp","rotateLeft","rotateRight","swashOut","tinRightOut","tinLeftOut","tinUpOut","tinDownOut","vanishOut"],o=function(i,s){var e={autoPlay:!0,loop:!0,width:960,height:420,responsive:!0,fullWidth:!0,pauseOnHover:!0,enableLoadingBar:!0,loadingBarPosition:1,enableNextPrevButton:!0,hoverNextPrevButton:!0,enableKeyNavigation:!0,enableBullet:!1,bulletPosition:2,hoverBullet:0,enableThumbnail:!0,thumbnailPosition:3,thumbnailWidth:80,thumbnailHeight:50,enableBorderStyle:!1,borderStyle:1,enableDropShadow:!1,dropShadowStyle:1,enableDrag:!0,defaultTransitions:"fade",defaultTransitionSpeed:1e3,defaultSlideTime:6e3,stripCols:20,stripRows:10,touchSensitive:50,onInit:function(){},onEndTransition:function(){},onStartTransition:function(){},lightBoxVideoWidth:640,lightBoxVideoHeight:350,lightBoxOverlay:.8,onVideoClick:function(){}};this.slider=i,this.options=t.extend(e,s),this.slideTime=this.options.defaultSlideTime,this.slides=[],this.playTime=0,this.timeUnit=40,this.itemsTimer=[],this.active=-1,this.prev=-1,this.numberSlides=0,this.hasTouch="ontouchstart"in window||"createTouch"in document,this.width=0,this.height=0,this.lock=!1,this.pause=!1,this.supportCss3=window.Modernizr.csstransitions&&window.Modernizr.csstransforms3d,this.tooltipDistance=50,this.init()};o.prototype={constructor:o,init:function(){var i=this,s=!1;this.slider.addClass("loading-image"),this.slider.wrap('<div class="md-slider-wrap"><div class="md-slide-wrap"></div></div>'),this.wrap=this.slider.parent().parent(),this.wrap.addClass(this.slider.attr("id")+"-wrap"),this.options.responsive&&this.wrap.addClass("md-slider-responsive"),this.options.fullWidth&&this.wrap.addClass("md-slider-full-width"),this.options.responsive&&!this.options.fullWidth&&this.wrap.css("max-width",this.options.width+"px"),this.options.enableBullet&&this.options.bulletPosition&&this.wrap.addClass("md-slider-bullet-"+this.options.bulletPosition),!this.options.enableBullet&&this.options.enableThumbnail&&this.options.thumbnailPosition,this.wrap.addClass("md-slider-thumb-"+this.options.thumbnailPosition),this.width=this.options.responsive?this.slider.width():this.options.width,this.height=this.options.height,this.numberSlides=t(".md-slide-item",this.slider).length,t(".md-slide-item",this.slider).each(function(s){i.slides[s]=t(this),t(".md-object",t(this)).each(function(){var s=t(this).data("y")?t(this).data("y"):0,e=t(this).data("x")?t(this).data("x"):0,o=t(this).data("width")?t(this).data("width"):0,a=t(this).data("height")?t(this).data("height"):0;o=100*o/i.options.width,a=100*a/i.options.height,s=100*s/i.options.height,e=100*e/i.options.width,o>0&&t(this).width(o+"%"),a>0&&t(this).height(a+"%"),t(this).css({top:s+"%",left:e+"%"}),t(this).hide()}),s>0&&t(this).hide()}),this.initControl(),this.initDrag(),this.initVideo(),this.initHotSpot(),this.loadImages(),this.options.onInit.call(i.slider),t(window).blur(function(){s=(new Date).getTime()}),t(window).focus(function(){if(s){var t=(new Date).getTime()-s;t>i.slideTime-i.playTime?i.playTime=i.slideTime-200:i.playTime+=t,s=!1}}),t(window).resize(function(){i.resize()}).trigger("resize")},initControl:function(){var i=this;if(this.options.enableLoadingBar){var s=t('<div class="loading-bar-hoz loading-bar-'+this.options.loadingBarPosition+'"><div class="br-timer-glow" style="left: -100px;"></div><div class="br-timer-bar" style="width:0px"></div></div>');this.wrap.append(s)}if(this.options.pauseOnHover&&(t(".md-slide-wrap",this.wrap).mouseenter(function(){i.pauseSlide()}),t(".md-slide-wrap",this.wrap).mouseleave(function(){i.unPauseSlide()})),this.options.enableBorderStyle&&this.options.borderStyle){var e='<div class="border-top border-style-'+this.options.borderStyle+'"></div><div class="border-bottom border-style-'+this.options.borderStyle+'"></div>';this.options.fullWidth||(e+='<div class="border-left border-style-'+this.options.borderStyle+'"><div class="edge-top"></div><div class="edge-bottom"></div></div>',e+='<div class="border-right border-style-'+this.options.borderStyle+'"><div class="edge-top"></div><div class="edge-bottom"></div></div>'),this.wrap.append(e)}if(this.options.enableDropShadow&&this.options.dropShadowStyle){var o='<div class="md-shadow md-shadow-style-'+this.options.dropShadowStyle+'"></div>';this.wrap.append(o)}if(this.options.enableBullet&&this.options.bulletPosition){var a=t('<div class="md-bullets"></div>');t(".md-slide-wrap",this.wrap).append(a);for(var n=0;n<this.numberSlides;n++)a.append('<div class="md-bullet"  rel="'+n+'"><a></a></div>');if(this.options.hoverBullet&&(a.css("opacity",0),t(".md-slide-wrap",this.wrap).hover(function(){a.stop().animate({opacity:1},"fast")},function(){a.stop().animate({opacity:0},"fast")})),this.options.enableThumbnail){for(var d=parseInt(this.slider.data("thumb-width")),h=parseInt(this.slider.data("thumb-height")),n=0;n<this.numberSlides;n++){var r=this.slides[n].data("thumb"),l=this.slides[n].data("thumb-type");this.slides[n].data("thumb-alt");if(r){var p;p="image"==l?t("<img />").attr("src",r).attr("alt",this.slides[n].data("thumb-alt")).css({top:-(9+h)+"px",left:-(d/2-2)+"px",opacity:0}):t("<span></span>").attr("style",r).css({top:-(9+h)+"px",left:-(d/2-2)+"px",opacity:0}),t("div.md-bullet:eq("+n+")",a).append(p).append('<div class="md-thumb-arrow" style="opacity: 0"></div>')}}t("div.md-bullet",a).hover(function(){t(this).addClass("md-hover"),t("img, span",this).show().animate({opacity:1},200),t(".md-thumb-arrow",this).show().animate({opacity:1},200)},function(){t(this).removeClass("md_hover"),t("img, span",this).animate({opacity:0},200,function(){t(this).hide()}),t(".md-thumb-arrow",this).animate({opacity:0},200,function(){t(this).hide()})})}t("div.md-bullet",this.wrap).click(function(){return t(this).hasClass("md-current")?!1:void i.slide(t(this).attr("rel"))})}else if(this.options.enableThumbnail&&this.options.thumbnailPosition){for(var c=t('<div class="md-thumb"><div class="md-thumb-container"><div class="md-thumb-items"></div></div></div>'),m=t(".md-thumb-items",c),n=0;n<this.numberSlides;n++){var r=this.slides[n].data("thumb");if(r){var u=t('<a class="md-thumb-item" />').attr("rel",n).append(t("<img />").attr("src",r));m.append(u)}}this.wrap.append(c),t("a",m).click(function(){return t(this).hasClass("md-current")?!1:void i.slide(t(this).attr("rel"))})}this.options.enableNextPrevButton&&(t(".md-slide-wrap",i.wrap).append('<div class="md-arrow"><div class="md-arrow-left"><span></span></div><div class="md-arrow-right"><span></span></div></div>'),t(".md-arrow-right",i.wrap).bind("click",function(){i.nextSlide()}),t(".md-arrow-left",i.wrap).bind("click",function(){i.prevSlide()}),this.options.hoverNextPrevButton&&(t(".md-arrow",i.wrap).css("opacity",0),t(".md-slide-wrap",i.wrap).hover(function(){t(".md-arrow",i.wrap).stop().animate({opacity:1},"fast")},function(){t(".md-arrow",i.wrap).stop().animate({opacity:0},"fast")}))),this.options.enableKeyNavigation&&t(window).keydown(function(t){var s=t.keyCode||t.which;37==s||38==s?i.nextSlide():(39==s||40==s)&&i.prevSlide()})},initDrag:function(){var i=this,s=!1,e=!1,o=0;this.hasTouch?(this.slider.bind("touchstart",function(t){return s?!1:(t=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],s=!0,e=void 0,i.slider.mouseY=t.pageY,void(i.slider.mouseX=t.pageX))}),this.slider.bind("touchmove",function(t){if(t=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],s){var a=t.pageX||t.clientX,n=t.pageY||t.clientY;"undefined"==typeof e&&(e=!!(e||Math.abs(n-i.slider.mouseY)>Math.abs(a-i.slider.mouseX))),e?s=!1:o=a-i.slider.mouseX}}),this.slider.bind("touchend",function(t){if(s)if(s=!1,o>i.options.touchSensitive)i.nextSlide(),o=0;else if(o<-i.options.touchSensitive)return i.nextSlide(),o=0,!1})):t(".md-slide-wrap",this.wrap).hover(function(){t(".md-arrow",i.wrap)&&t(".md-arrow",i.wrap).stop(!0,!0).animate({opacity:1},200)},function(){t(".md-arrow",i.wrap)&&t(".md-arrow",i.wrap).stop(!0,!0).animate({opacity:0},200)}).trigger("hover"),this.options.enableDrag&&(this.slider.mousedown(function(t){return s||(s=!0,e=void 0,i.slider.mouseY=t.pageY,i.slider.mouseX=t.pageX),!1}),this.slider.mousemove(function(t){if(s){var a=t.pageX||t.clientX,n=t.pageY||t.clientY;"undefined"==typeof e&&(e=!!(e||Math.abs(n-i.slider.mouseY)>Math.abs(a-i.slider.mouseX))),e?s=!1:o=a-i.slider.mouseX}}),this.slider.mouseup(function(t){return s?(s=!1,o>i.options.touchSensitive?i.prevSlide():o<-i.options.touchSensitive&&i.nextSlide(),o=0,!1):void 0}),this.slider.mouseleave(function(t){i.slider.mouseup()}))},initVideo:function(){var i=this;t(".md-video",this.slider).each(function(){var s=t(this),e=t(this).parent().data("display"),o=s.attr("href")+"?autoplay=1";switch(e){case"lightbox":var a={videoWidth:i.options.lightBoxVideoWidth,videoHeight:i.options.lightBoxVideoHeight,overlay:i.options.lightBoxOverlay,onClick:i.options.onVideoClick};t(this).mdVideoBox(i,a);break;case"full":var n=t('<div class="md-video-control md-loading" style="display: none"></div>');i.wrap.append(n),n.hover(function(){i.pauseSlide()},function(){}),s.click(function(){var s=t('<a href="#" class="md-close-video" title="close"></a>'),e=t('<iframe frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');return s.click(function(){return n.html("").hide(),i.unPauseSlide(),!1}),e.attr("src",o).css({width:"100%",height:"100%"}),n.append(e).append(s).show(),!1});break;default:s.click(function(){var i=s.parent(),e=t('<iframe frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');return i.addClass("md-loading"),s.hide(),e.attr("src",o),e.css({width:i.width(),height:i.height()}),i.append(e),!1})}})},initHotSpot:function(){var i=this;t(".md-object .md-hotspot",this.slider).hover(function(){var s,e=t(".md-hotspot-tooltip",t(this).parent()).clone();i.wrap.append(e),s=i.getTooltipPosition(t(this),e),0!=s&&(i.wrap.append(e),e.addClass("active"),e.addClass(s["class"]),e.offset({left:s.left,top:s.top}).animate({opacity:1},"fast"))},function(){t(".md-hotspot-tooltip.active",i.wrap).remove()}).click(function(){return!1}),t(".md-object .transBg-diamond",this.slider).hover(function(){t(this).addClass("animation"),t(".darkBg-diamond",t(this)).addClass("animation"),t(".hoverBg-diamond",t(this)).addClass("animation"),t(".content-diamond",t(this)).addClass("animation"),t(".transBg-diamond .diamon-title",t(this)).addClass("animation"),t(".border",t(this).parent()).addClass("animation")},function(){t(this).removeClass("animation"),t(".darkBg-diamond",t(this)).removeClass("animation"),t(".hoverBg-diamond",t(this)).removeClass("animation"),t(".transBg-diamond .diamon-title",t(this)).removeClass("animation"),t(".content-diamond",t(this)).removeClass("animation"),t(".border",t(this).parent()).removeClass("animation")})},getTooltipPosition:function(i,s){var e=i.parent(),o=e.data("tooltip-direction")?e.data("tooltip-direction"):"left",a=e.data("tooltip-responsive")?e.data("tooltip-responsive"):0,n=i.offset(),d=i.width(),h=i.height(),r=s.width(),l=s.height(),p=0,c=0,m="md-hotspot-tooltip-"+o;if(r>t(window).width())return!1;if("auto"==o)return this.autoTooltipPosition(i,s);switch(o){case"left":p=n.top-(l-h)/2,c=n.left-r-10,s.offset({left:c-this.tooltipDistance,top:p});break;case"top":p=n.top-l-10,c=n.left-(r-d)/2,s.offset({left:c,top:p-this.tooltipDistance});break;case"right":p=n.top-(l-h)/2,c=n.left+d+10,s.offset({left:c+this.tooltipDistance,top:p});break;case"bottom":p=n.top+h+10,c=n.left-(r-d)/2,s.offset({left:c,top:p+this.tooltipDistance})}return(0>c||0>p||c+r>t(window).width()||p+l>t(window).height())&&a?this.autoTooltipPosition(i,s):{left:c,top:p,"class":m}},autoTooltipPosition:function(i,s){var e=i.parent(),o=(e.data("tooltip-direction")?e.data("tooltip-direction"):"left",e.data("tooltip-responsive")?e.data("tooltip-responsive"):0,i.offset()),a=i.width(),n=i.height(),d=s.width(),h=s.height(),r=o.top-(h-n)/2,l=o.left-d-10,p="md-hotspot-tooltip-left";if(0>r){if(r=o.top+n+10,r+h>t(window).height())return!1;l=o.left-(d-a)/2,0>l?(l=0,t(".md-hotspot-tooltip-arrow",s).css({top:"-10px",bottom:"auto",left:o.left+a/2,right:"auto"})):l+d>t(window).width()&&(l+=t(window).width()-(l+d),t(".md-hotspot-tooltip-arrow",s).css({top:"-10px",bottom:"auto",left:o.left+a/2-l,right:"auto"})),p="md-hotspot-tooltip-bottom",s.offset({top:r+this.tooltipDistance,left:l})}else if(0>l)if(p="md-hotspot-tooltip-top",l=o.left-(d-a)/2,r=o.top-h-10,0>r)if(p="md-hotspot-tooltip-right",r=o.top-(h-n)/2,l=o.left+a+10,l+d>t(window).width()){if(p="md-hotspot-tooltip-bottom",r=o.top+n+10,l=o.left+(d-a)/2,r+h>t(window).height())return!1;0>l?(l=0,t(".md-hotspot-tooltip-arrow",s).css({top:"-10px",bottom:"auto",left:o.left+a/2})):l+d>t(window).width()&&(l+=t(window).width()-(l+d),t(".md-hotspot-tooltip-arrow",s).css({top:"-10px",bottom:"auto",left:o.left+a/2-l,right:"auto"})),s.offset({top:r+this.tooltipDistance,left:l})}else s.offset({top:r,left:l+this.tooltipDistance});else 0>l?(l=0,t(".md-hotspot-tooltip-arrow",s).css({top:"auto",bottom:"-10px",left:o.left+a/2})):l+d>t(window).width()&&(l+=t(window).width()-(l+d),t(".md-hotspot-tooltip-arrow",s).css({top:"auto",bottom:"-10px",left:o.left+a/2-l})),s.offset({top:r-this.tooltipDistance,left:l});else s.offset({top:r,left:l-this.tooltipDistance});return{left:l,top:r,"class":p}},timer:function(){if(!this.lock&&!this.pause)if(this.playTime+=this.timeUnit,this.playTime>this.slideTime)this.options.autoPlay&&this.nextSlide();else if(this.options.enableLoadingBar){var i=this.playTime*this.width/this.slideTime;t(".br-timer-bar",this.wrap).width(i),t(".br-timer-glow",this.wrap).css({left:i-100+"px"})}},play:function(){var t=this;this.slider.removeClass("loading-image"),this.slide(0),setInterval(function(){t.timer()},this.timeUnit)},slide:function(o){if(o=parseInt(o),!this.lock)if(this.lock=!0,this.playTime=0,this.slideTime=this.slides[o].data("timeout")?this.slides[o].data("timeout"):this.options.defaultSlideTime,this.options.enableLoadingBar&&(t(".br-timer-bar",this.wrap).width(0),t(".br-timer-glow",this.wrap).css({left:"-100px"})),this.prev=this.active,this.active=o,t(".md-object",this.slides[this.active]).each(function(){t(this).removeClass(s.join(" ")),t(this).removeClass(e.join(" ")),t(this).hide()}),this.options.onStartTransition.call(this.slider),this.slides[this.prev]){t("div.md-bullet:eq("+this.prev+")",this.wrap).removeClass("md-current"),t("a:eq("+this.prev+")",this.wrap).removeClass("md-current"),this.clearItemsTimer(),t(".md-video",this.slides[this.prev]).each(function(){var i=t(this).parent();i.data("display")&&"inline"!=i.data("display")||t("iframe",i).remove(),t(this).show()});var a=this.slides[this.active].data("transition")?this.slides[this.active].data("transition"):this.options.defaultTransitions;if(a=a.trim(),"random"==a.toLowerCase())a=i[Math.floor(Math.random()*i.length)],void 0==a&&(a="fade"),a=t.trim(a.toLowerCase());else if(-1!=a.indexOf(",")){var n=a.split(",");a=n[Math.floor(Math.random()*n.length)],void 0==a&&(a="fade"),a=t.trim(a.toLowerCase())}this.supportCss3||-1==a.indexOf("slit-")||(a="fade"),this.playTransition(a),this.setCurrent()}else this.slides[this.active].css({top:0,left:0}).show(),this.playSlideItems(),this.setCurrent()},nextSlide:function(){if(!this.lock){var t=this.active+1;t<this.numberSlides?this.slide(t):this.options.loop&&this.slide(0)}},prevSlide:function(){this.lock||(this.active-1>=0?this.slide(this.active-1):this.options.loop&&this.slide(this.numberSlides-1))},pauseSlide:function(){this.pause=!0,this.lock||this.clearItemsTimer()},unPauseSlide:function(){this.pause=!1,this.lock||this.playSlideItems()},clearItemsTimer:function(){t.each(this.itemsTimer,function(t,i){clearTimeout(i)}),this.itemsTimer=[]},playSlideItems:function(){var i=this,o=this.slides[this.active];t(".md-object",o).each(function(){var o=t(this),a=o.data("easein")?o.data("easein"):"",n=o.data("easeout")?o.data("easeout"):"",d=o.data("start")?o.data("start"):0,h=o.data("stop")?o.data("stop"):0;if("random"==a.toLowerCase()&&(a=s[Math.floor(Math.random()*s.length)]),"random"==n.toLowerCase()&&(n=e[Math.floor(Math.random()*e.length)]),h-i.playTime>0){if(d-i.playTime>0){o.removeClass(e.join(" ")),o.removeClass(s.join(" ")),o.hide();var r=setTimeout(function(){if(""==a||!i.supportCss3||"shuffleLetter"==a&&!jQuery().shuffleLetters)o.show();else if("shuffleLetter"!==a){var t=o.data("duration-in");void 0!=t&&t>0&&o.css({"animation-duration":t+"ms","-webkit-animation-duration":t+"ms","-moz-animation-duration":t+"ms","-ms-animation-duration":t+"ms"}),o.show().addClass(a)}else{var s={fps:25};t&&t>0&&(s.fps=25/(t/1e3)),o.show().shuffleLetters(s)}},d-i.playTime);i.itemsTimer.push(r)}else o.show();if(h-i.playTime>0){var r=setTimeout(function(){if(""!=n&&i.supportCss3){var t=o.data("duration-out");void 0!=t&&t>0&&o.css({"animation-duration":t+"ms","-webkit-animation-duration":t+"ms","-moz-animation-duration":t+"ms","-ms-animation-duration":t+"ms"}),o.addClass(n)}else o.fadeOut();o.removeClass(a)},h-i.playTime);i.itemsTimer.push(r)}}else o.hide()}),this.lock=!1,this.options.pauseOnHover&&this.pause&&t(".md-slide-wrap",this.wrap).trigger("mouseenter")},loadImages:function(){var i=this,s=t(".md-slide-item .md-main-img img",this.slider).length;t(".md-slide-item .md-main-img img",this.slider).each(function(){t(this).load(function(){var e=t(this);if(!e.data("defW")){var o=i.getImageSize(e.attr("src"));i.changeBackgroundPosition(e,o.width,o.height),e.data({defW:o.width,defH:o.height})}s--,0==s&&i.play()}),this.complete&&t(this).load()})},changeBackgroundPosition:function(i,s,e){var o=t(".md-slide-item:visible",this.slider).width(),a=t(".md-slide-item:visible",this.slider).height();if(e>0&&a>0)if(s/e>o/a){var n=o-a/e*s;i.css({width:"auto",height:a+"px"}),0>n?i.css({left:n/2+"px",top:0}):i.css({left:0,top:0})}else{var d=a-o/s*e;i.css({width:o+"px",height:"auto"}),0>d?i.css({top:d/2+"px",left:0}):i.css({left:0,top:0})}},getImageSize:function(t){var i=new Image;return i.src=t,{width:i.width,height:i.height}},resize:function(){if(this.width=this.options.responsive?this.wrap.width():this.options.width,this.options.responsive&&this.width<this.options.width?this.height=Math.round(this.options.height*this.width/this.options.width):this.height=this.options.height,this.wrap.height(this.height),t(".md-slide-item",this.slider).height(this.height),this.options.fullWidth){var i=20;(this.wrap.width()-this.options.width)/2>20&&(i=(this.wrap.width()-this.options.width)/2),t(".md-bullets",this.wrap).css({left:i,right:i}),t(".md-thumb",this.wrap).css({left:i,right:i}),t(".md-objects",this.slider).width(this.options.width)}this.options.responsive&&this.wrap.width()<this.options.width&&t(".md-objects",this.slider).width(this.width),this.resizeBackgroundImages(),this.resizeThumbnail(),this.resizeFont(),this.resizePadding(),this.setThumbnailPosition()},resizeBackgroundImages:function(){var i=this;t(".md-main-img img",this.slider).each(function(){t(this).data("defW")&&t(this).data("defH")&&i.changeBackgroundPosition(t(this),t(this).data("defW"),t(this).data("defH"))})},resizeThumbnail:function(){var i=this;if(this.options.enableThumbnail&&!this.options.enableBullet){var s=t(".md-thumb-items",this.wrap),e=t("a",s).width()*this.numberSlides,o=t(".md-thumb",this.wrap);if(s.unbind("touchstart").unbind("touchmove").unbind("touchend").css("left",0),t(".md-thumb-next",o).remove(),t(".md-thumb-prev",o).remove(),e>t(".md-thumb-container",o).width()){var a=t(".md-thumb-container",this.wrap).width()-e;if(s.width(e),o.append('<div class="md-thumb-prev"></div><div class="md-thumb-next"></div>'),t(".md-thumb-prev",o).click(function(){i.scrollThumbnail("right")}),t(".md-thumb-next",o).click(function(){i.scrollThumbnail("left")}),this.enableThumbnailArrow(a),this.hasTouch){var n=!1,d=0;t(".md-thumb-items",this.wrap).bind("touchstart",function(t){return t=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],n=!0,this.mouseX=t.pageX,d=s.position().left,!1}),s.bind("touchmove",function(t){return t.preventDefault(),t=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],n&&s.css("left",d+t.pageX-this.mouseX),!1}),s.bind("touchend",function(e){if(e.preventDefault(),e=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],n=!1,Math.abs(e.pageX-this.mouseX)<i.options.touchSensitive){var o=t(e.target).closest("a.md-thumb-item");return o.length&&i.slide(o.attr("rel")),s.stop(!0,!0).animate({left:d},400),!1}return s.position().left<a?s.stop(!0,!0).animate({left:a},400,function(){i.enableThumbnailArrow(a)}):s.position().left>0&&s.stop(!0,!0).animate({left:0},400,function(){i.enableThumbnailArrow(a)}),d=0,!1})}}}},scrollThumbnail:function(i){var s=this,e=t(".md-thumb-items",this.wrap),o=t("a",e).width()*this.numberSlides;if(this.options.enableThumbnail&&!this.options.enableBullet){var a=t(".md-thumb-container",this.wrap).width()-o;switch(i){case"left":var n=e.position().left;if(n>a){var d=t(".md-thumb-container",s.wrap).width();n-d>a?e.stop(!0,!0).animate({left:n-d},400,function(){s.enableThumbnailArrow(a)}):e.stop(!0,!0).animate({left:a},400,function(){s.enableThumbnailArrow(a)})}break;case"right":var n=e.position().left;if(0>n){var d=t(".md-thumb-container",s.wrap).width();0>n+d?e.stop(!0,!0).animate({left:n+d},400,function(){s.enableThumbnailArrow(a)}):e.stop(!0,!0).animate({left:0},400,function(){s.enableThumbnailArrow(a)})}break;default:var h=t("a",e).index(t("a.md-current",e));if(h>=0){var n=e.position().left,r=h*t("a",e).width();if(0>r+n)e.stop(!0,!0).animate({left:-r},400,function(){s.enableThumbnailArrow(a)});else{var l=r+t("a",e).width(),d=t(".md-thumb-container",s.wrap).width();l+n>d&&e.stop(!0,!0).animate({left:d-l},400,function(){s.enableThumbnailArrow(a)})}}}}},enableThumbnailArrow:function(i){var s=t(".md-thumb-items",this.wrap).position().left;s>i?t(".md-thumb-next",this.wrap).show():t(".md-thumb-next",this.wrap).hide(),0>s?t(".md-thumb-prev",this.wrap).show():t(".md-thumb-prev",this.wrap).hide()},setThumbnailPosition:function(){if(this.options.enableThumbnail&&!this.options.enableBullet){var i=this.slider.data("thumb-height");if(1==this.options.thumbnailPosition){var s=i/2;t(".md-thumb",this.wrap).css({height:i+20,bottom:-s-10}),this.wrap.css({"margin-bottom":s+10})}else t(".md-thumb",this.wrap).css({height:i+20,bottom:-(i+40)}),this.wrap.css({"margin-bottom":i+50})}},resizeFont:function(){var i=1;parseInt(t.browser.version,10)<9&&(i=6),this.wrap.width()<this.options.width?t(".md-objects",this.slider).css({"font-size":100*this.wrap.width()/this.options.width-i+"%"}):t(".md-objects",this.slider).css({"font-size":100-i+"%"})},resizePadding:function(){var i=this;this.wrap.width()<this.options.width&&this.options.responsive?t(".md-objects > div",this.slider).each(function(){var s=i.wrap.width()/i.options.width,e=t(this),o=[];e.data("paddingtop")&&(o.paddingtop=e.data("paddingtop")*s),e.data("paddingright")&&(o["padding-right"]=e.data("paddingright")*s),e.data("paddingbottom")&&(o.paddingbottom=e.data("paddingbottom")*s),e.data("paddingleft")&&(o.paddingleft=e.data("paddingleft")*s),e.find("a").length?e.find("a").css(o):e.css(o)}):t(".md-objects > div",this.slider).each(function(){var i=t(this),s=[];i.data("paddingtop")&&(s.paddingtop=i.data("paddingtop")),i.data("paddingright")&&(s.paddingright=i.data("paddingright")),i.data("paddingbottom")&&(s.paddingbottom=i.data("paddingbottom")),i.data("paddingleft")&&(s.paddingleft=i.data("paddingleft")),i.find("a").length?i.find("a").css(s):i.css(s)})},playTransition:function(i){var s=this,e=this.slides[this.active].data("transition-speed")?this.slides[this.active].data("transition-speed"):this.options.defaultTransitionSpeed;switch(i){case"slit-horizontal-left-top":case"slit-horizontal-top-right":case"slit-horizontal-bottom-up":case"slit-vertical-down":case"slit-vertical-up":this.addSlit(i),t(".md-object",this.slides[this.active]).hide(),this.slides[this.prev].hide(),this.slides[this.active].show();var o=t(".md-slider-slit",this.slider).first(),a=t(".md-slider-slit",this.slider).last(),n={transition:"all "+e+"ms ease-in-out","-webkit-transition":"all "+e+"ms ease-in-out","-moz-transition":"all "+e+"ms ease-in-out","-ms-transition":"all "+e+"ms ease-in-out"};t(".md-slider-slit",this.slider).css(n),setTimeout(function(){o.addClass("md-transition-elements-1"),a.addClass("md-transition-elements-2")},50),setTimeout(function(){s.transitionEnd()},e);break;case"strip-up-right":case"strip-up-left":this.addTiles(this.options.stripCols,1,this.active);var d=t(".md-slider-title",this.slider),h=e/this.options.stripCols/2,r=e/2;"strip-up-right"==i&&(d=t(".md-slider-title",this.slider).reverse()),d.css({height:"1px",bottom:0,top:"auto"}),d.each(function(i){var e=t(this);setTimeout(function(){e.animate({height:"100%",opacity:"1.0"},r,"easeInOutQuart",function(){i==s.options.stripCols-1&&s.transitionEnd()})},i*h)});break;case"strip-down-right":case"strip-down-left":this.addTiles(this.options.stripCols,1,this.active);var l=t(".md-slider-title",this.slider),h=e/this.options.stripCols/2,r=e/2;"strip-down-right"==i&&(l=t(".md-slider-title",this.slider).reverse()),l.css({height:"1px",top:0,bottom:"auto"}),l.each(function(i){var e=t(this);setTimeout(function(){e.animate({height:"100%",opacity:"1.0"},r,"easeInOutQuart",function(){i==s.options.stripCols-1&&s.transitionEnd()})},i*h)});break;case"strip-left-up":case"strip-left-down":this.addTiles(1,this.options.stripRows,this.active);var l=t(".md-slider-title",this.slider),h=e/this.options.stripRows/2,r=e/2;"strip-left-up"==i&&(l=t(".md-slider-title",this.slider).reverse()),l.css({width:"1px",left:0,right:"auto"}),l.each(function(i){var e=t(this);setTimeout(function(){e.animate({width:"100%",opacity:"1.0"},r,"easeInOutQuart",function(){i==s.options.stripRows-1&&s.transitionEnd()})},i*h)});break;case"strip-right-up":case"strip-right-down":this.addTiles(1,this.options.stripRows,this.active);var l=t(".md-slider-title",this.slider),h=e/this.options.stripRows/2,r=e/2;"strip-left-right-up"==i&&(l=t(".md-slider-title",s).reverse()),l.css({width:"1px",left:"auto",right:"1px"}),l.each(function(i){var e=t(this);setTimeout(function(){e.animate({width:"100%",opacity:"1.0"},r,"easeInOutQuart",function(){i==s.options.stripRows-1&&s.transitionEnd()})},i*h)});break;case"strip-right-left-up":case"strip-right-left-down":this.addTiles(1,this.options.stripRows,this.prev),this.slides[this.prev].hide(),this.slides[this.active].show();var l=t(".md-slider-title",this.slider),h=e/this.options.stripRows,r=e/2;"strip-right-left-up"==i&&(l=t(".md-slider-title",this.slider).reverse()),l.filter(":odd").css({width:"100%",right:0,left:"auto",opacity:1}).end().filter(":even").css({width:"100%",right:"auto",left:"0px",opacity:1}),l.each(function(i){var e=t(this),o=i%2==0?{left:"-50%",opacity:0}:{right:"-50%",opacity:0};setTimeout(function(){e.animate(o,r,"easeOutQuint",function(){i==s.options.stripRows-1&&s.transitionEnd()})},i*h)});break;case"strip-up-down-right":case"strip-up-down-left":this.addTiles(this.options.stripCols,1,this.prev),this.slides[this.prev].hide(),this.slides[this.active].show();var l=t(".md-slider-title",this.slider),h=e/this.options.stripCols/2,r=e/2;"strip-up-down-right"==i&&(l=t(".md-slider-title",this.slider).reverse()),l.filter(":odd").css({height:"100%",bottom:0,top:"auto",opacity:1}).end().filter(":even").css({height:"100%",bottom:"auto",top:0,opacity:1}),l.each(function(i){var e=t(this),o=i%2==0?{top:"-50%",opacity:0}:{bottom:"-50%",opacity:0};setTimeout(function(){e.animate(o,r,"easeOutQuint",function(){i==s.options.stripCols-1&&s.transitionEnd()})},i*h)});break;case"left-curtain":this.addTiles(this.options.stripCols,1,this.active);var l=t(".md-slider-title",this.slider),p=this.width/this.options.stripCols,h=e/this.options.stripCols/2;l.each(function(i){var o=t(this);o.css({left:p*i,width:0,opacity:0}),setTimeout(function(){o.animate({width:p,opacity:1},e/2,function(){i==s.options.stripCols-1&&s.transitionEnd()})},h*i)});break;case"right-curtain":this.addTiles(this.options.stripCols,1,this.active);var l=t(".md-slider-title",this.slider).reverse(),p=this.width/this.options.stripCols,h=e/this.options.stripCols/2;l.each(function(i){var o=t(this);o.css({right:p*i,left:"auto",width:0,opacity:0}),setTimeout(function(){o.animate({width:p,opacity:1},e/2,function(){i==s.options.stripCols-1&&s.transitionEnd()})},h*i)});break;case"top-curtain":this.addTiles(1,this.options.stripRows,this.active);var l=t(".md-slider-title",this.slider),c=this.height/this.options.stripRows,h=e/this.options.stripRows/2;l.each(function(i){var o=t(this);o.css({top:c*i,height:0,opacity:0}),setTimeout(function(){o.animate({height:c,opacity:1},e/2,function(){i==s.options.stripRows-1&&s.transitionEnd()})},h*i)});break;case"bottom-curtain":this.addTiles(1,this.options.stripRows,this.active);var l=t(".md-slider-title",this.slider).reverse(),c=this.height/this.options.stripRows,h=e/this.options.stripRows/2;l.each(function(i){var o=t(this);o.css({bottom:c*i,height:0,opacity:0}),setTimeout(function(){o.animate({height:c,opacity:1},e/2,function(){i==s.options.stripRows-1&&s.transitionEnd()})},h*i)});break;case"slide-in-right":this.addStrips2();var l=t(".md-slider-strip",this.slider);l.each(function(i){var o=i*s.width,a=t(this);a.css({left:o}).animate({left:o-s.width},e,function(){s.transitionEnd()})});break;case"slide-in-left":this.addStrips2();var l=t(".md-slider-strip",this.slider);l.each(function(i){var o=-i*s.width,a=t(this);a.css({left:o}).animate({left:s.width+o},2*e,function(){s.transitionEnd()})});break;case"slide-in-up":this.addStrips2();var l=t(".md-slider-strip",this.slider);l.each(function(i){var o=i*s.height,a=t(this);a.css({top:o}).animate({top:o-s.height},e,function(){s.transitionEnd()})});break;case"slide-in-down":this.addStrips2();var l=t(".md-slider-strip",this.slider);l.each(function(i){var o=-i*s.height,a=t(this);a.css({top:o}).animate({top:s.height+o},e,function(){s.transitionEnd()})});break;case"fade":default:this.addStrips(!1,{strips:1});var m=t(".md-slider-strip:first",this.slider);m.css({height:"100%",width:s.width}),"slide-in-right"==i?m.css({height:"100%",width:s.width+"px",left:s.width+"px",right:"auto"}):"slide-in-left"==i&&m.css({left:"-"+s.width+"px"}),m.animate({left:0,opacity:1},e,function(){s.transitionEnd()})}},addSlit:function(i){var s=t('<div class="md-strips-container '+i+'"></div>'),e=t(".md-main-img img",this.slides[this.prev]),o=t('<div class="md-slider-slit"/>').append(e.clone()),a=e.position(),n=t('<div class="md-slider-slit"/>').append(e.clone().css("top",a.top-this.height/2+"px"));("slit-vertical-down"==i||"slit-vertical-up"==i)&&(n=t('<div class="md-slider-slit"/>').append(e.clone().css("left",a.left-this.width/2+"px"))),
s.append(o).append(n),this.slider.append(s)},addStrips:function(i,s){for(var e,s=s?s:this.options,o=t('<div class="md-strips-container"></div>'),a=Math.round(this.width/s.strips),n=Math.round(this.height/s.strips),d=t(".md-main-img img",this.slides[this.active]),h=0;h<s.strips;h++){var r,l,p=i?n*h+"px":0,c=i?0:a*h+"px";h==s.strips-1?(r=i?0:this.width-a*h+"px",l=i?this.height-n*h+"px":0):(r=i?0:a+"px",l=i?n+"px":0),e=t('<div class="md-slider-strip"></div>').css({width:r,height:l,top:p,left:c,opacity:0}),e.append(d.clone().css({marginLeft:i?0:-(h*a)+"px",marginTop:i?-(h*n)+"px":0})),o.append(e)}this.slider.append(o)},addStrips2:function(){for(var i,s=[t(".md-main-img img",this.slides[this.prev]),t(".md-main-img img",this.slides[this.active])],e=t('<div class="md-strips-container"></div>'),o=0;2>o;o++)i=t('<div class="md-slider-strip"></div>').css({width:this.width,height:this.height}).append(s[o].clone()),e.append(i);this.slider.append(e)},addTiles:function(i,s,e){for(var o,a=t('<div class="md-strips-container"></div>'),n=this.width/i,d=this.height/s,h=t(".md-main-img img",this.slides[e]),r=0;s>r;r++)for(var l=0;i>l;l++){var p=d*r+"px",c=n*l+"px";o=t('<div class="md-slider-title"/>').css({width:n,height:d,top:p,left:c}),o.append(h.clone().css({marginLeft:"-"+c,marginTop:"-"+p})),a.append(o)}this.slider.append(a)},transitionEnd:function(){this.options.onEndTransition.call(this.slider),t(".md-strips-container",this.slider).remove(),1!=this.numberSlides&&this.slides[this.prev].hide(),this.slides[this.active].show(),this.playSlideItems()},setCurrent:function(){this.options.enableBullet&&t("div.md-bullet:eq("+this.active+")",this.wrap).addClass("md-current"),this.enableThumbnail&&!this.options.enableBullet&&t("a:eq("+this.active+")",this.wrap).addClass("md-current"),this.scrollThumbnail("")}},t.fn.mdSlider=function(i){return new o(t(this),i)},t.fn.reverse=[].reverse}(jQuery),function(t){var i=function(i,s,e){var o={videoWidth:640,videoHeight:350,overlay:.8,onClick:function(){}};this.video=i,this.slider=s,this.options=t.extend(o,e),this.height=this.options.videoHeight,this.width=this.options.videoWidth,this.init()};i.prototype={constructor:i,init:function(){var i=this;0==t("#md-overlay").length&&(t("body").append('<div id="md-overlay" class="md-overlay" style="display: none"></div>'),t("body").append('<div id="md-video-container" class="md-video-container" style="display: none"><div id="md-video-embed"></div><div class="md-description clearfix"><div class="md-caption"></div><a id="md-close-btn" class="md-close-btn" href="#"></a></div></div>')),this.video.click(function(){return i.open(),!1}),t("#md-overlay").click(function(){i.close()}),t("#md-video-container #md-close-btn").click(function(){i.close()}),t(window).resize(function(){i.resize()}),t(window).keydown(function(t){var s=t.keyCode||t.which;27==s&&i.close()})},open:function(){var i=this,s=t("#md-video-container");s.hover(function(){i.slider.pauseSlide()},function(){}),t("#md-video-embed",s).hover(function(){i.slider.pauseSlide()},function(){}),this.options.onClick.call(this.video);var e=t(window).width(),o=t(window).height();e<this.options.videoWidth&&(this.width=e,this.height=this.options.videoHeight*e/this.options.videoWidth,o<this.height&&(this.width=o*this.options.videoWidth/this.options.videoHeight,this.height=o)),t("#md-video-embed",s).css({width:this.width+"px",height:this.height+"px"}).addClass("md-loading"),t(window).trigger("resize"),s.show(),t(".md-caption",s).html(this.video.attr("title")),t("#md-overlay").show().fadeTo("fast",this.options.opacity),t("#md-video-embed",s).fadeIn("slow",function(){var e=t('<iframe frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'),o=i.video.attr("href")+"?autoplay=1";e.attr("src",o),e.css({width:i.width,height:i.height}),t("#md-video-embed",s).append(e)})},close:function(){return t("#md-overlay").fadeOut("fast"),t("#md-video-embed").html(""),t("#md-video-container").hide(),!1},resize:function(){var i=t(window).width(),s=t(window).height();t("#md-video-container").css({left:(i-this.width)/2+"px",top:(s-this.height)/2+"px"}),t("#md-overlay").css({width:i,height:s})}},t.fn.mdVideoBox=function(s,e){return new i(t(this),s,e)}}(jQuery);