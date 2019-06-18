var scrolltotop={
	setting:{
		startline:100,
		scrollto:0,
		scrollduration:400,
		fadeduration:[500,100]
	},
	controlHTML:'<a href="#" class="ui-page-theme-b ui-btn ui-bar-b" style="border-radius:0.2em;padding:0;margin:0;width:42px;height:38px;line-height:38px;border:0"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjJBNjc2NUI4RjhDMTFFN0E3MjBENEFEMDY4RUNGNUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjJBNjc2NUE4RjhDMTFFN0E3MjBENEFEMDY4RUNGNUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVBMDNDM0I3OEY4MDExRTdBQzQ2QkQ0M0Q5NkU2QURDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVBMDNDM0I4OEY4MDExRTdBQzQ2QkQ0M0Q5NkU2QURDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+uwxTdgAAALhJREFUeNp0k4EOxCAIQwffrPuHueyX9a6XdKkNR0I0yPBRXFzXdahFxG9da72x3vtCfIwRnqt5sDwKq4ohxr3naSyrG5lwnudyitbaVtQB0g+URgnoLHr8sVRkFuMHjEM7eEXv2qciY/XE+76j2rMLbzv1BpBpmyjgUwSptg8AlSUrsflEtEWlxtmccyPFCk/Vg+6tuU6w53m2Ub+k35u2AbDN6tG6UaZtsFrQ/4SKzKlJx9hHgAEAIXei6kXSpNAAAAAASUVORK5CYII=" width="20" height="11" /></a>', 
	controlattrs:{offsetx:30,offsety:60},
	anchorkeyword:"#top",
	state:{
		isvisible:false,
		shouldvisible:false
	},scrollup:function(){
		if(!this.cssfixedsupport){
			this.$control.css({opacity:0});
		}
		var dest=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);
		if(typeof dest=="string"&&jQuery("#"+dest).length==1){
			dest=jQuery("#"+dest).offset().top;
		}else{
			dest=0;
		}
		this.$body.animate({scrollTop:dest},this.setting.scrollduration);
	},keepfixed:function(){
		var $window=jQuery(window);
		var controlx=$window.scrollLeft()+$window.width()-this.$control.width()-this.controlattrs.offsetx;
		var controly=$window.scrollTop()+$window.height()-this.$control.height()-this.controlattrs.offsety;
		this.$control.css({left:controlx+"px",top:controly+"px"});
	},togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop();
		if(!this.cssfixedsupport){
			this.keepfixed();
		}
		this.state.shouldvisible=(scrolltop>=this.setting.startline)?true:false;
		if(this.state.shouldvisible&&!this.state.isvisible){
			this.$control.stop().animate({opacity:1},this.setting.fadeduration[0]);
			this.state.isvisible=true;
		}else{
			if(this.state.shouldvisible==false&&this.state.isvisible){
				this.$control.stop().animate({opacity:0},this.setting.fadeduration[1]);
				this.state.isvisible=false;
			}
		}
	},init:function(){
	
		jQuery(document).ready(function($){
			var mainobj=scrolltotop;
			var iebrws=document.all;
			mainobj.cssfixedsupport=!iebrws||iebrws&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;
			mainobj.$body=(window.opera)?(document.compatMode=="CSS1Compat"?$("html"):$("body")):$("html,body");
			mainobj.$control=$('<div id="topcontrol" style="z-index:9999">'+mainobj.controlHTML+"</div>").css({position:mainobj.cssfixedsupport?"fixed":"absolute",bottom:mainobj.controlattrs.offsety,right:mainobj.controlattrs.offsetx,opacity:0,cursor:"pointer"}).attr({title:"TOP"}).click(function(){mainobj.scrollup();return false;}).appendTo("body");if(document.all&&!window.XMLHttpRequest&&mainobj.$control.text()!=""){mainobj.$control.css({width:mainobj.$control.width()});}mainobj.togglecontrol();
			$('a[href="'+mainobj.anchorkeyword+'"]').click(function(){mainobj.scrollup();return false;});
			$(window).bind("scroll resize",function(e){mainobj.togglecontrol();});
		
		});
	}
};
scrolltotop.init();
//定位滚动条
$(document).on("scrollstop",function(){
var str = window.location.href;
           str =str.substring(str.lastIndexOf("/")+1);
           if($(document).scrollTop()!=0){
           sessionStorage.setItem(str, $(window).scrollTop());
         }
});
window.onload = function(){ 
 setTimeout(function() {
	 var str = window.location.href;
     str = str.substring(str.lastIndexOf("/") + 1);
     var offset = sessionStorage.getItem(str);
     $(document).scrollTop(offset);
  },500);
};