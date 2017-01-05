window.onload=function(){
    //菜单-------------------------------------
    var cate_menu=document.getElementById('cate_menu');
    var aLi1=cate_menu.getElementsByTagName('li');
    var menuCont=document.getElementById('menuCont');
    var cate_part=menuCont.getElementsByClassName('cate_part');
    var timer;
    function clearAc(obj) {
        for(var p=0;p<obj.length;p++){
            obj[p].className='';
        }
    }
    for(var i=0;i<aLi1.length;i++){
        aLi1[i].onmouseover=function () {
            clearTimeout(timer);
            clearAc(aLi1);
            this.className='c_ac';
            for(var k=0;k<cate_part.length;k++){
                cate_part[k].style.display='none';
            }
            menuCont.style.display='block';
            var show_id=this.getAttribute('data-index');
            document.getElementById('cate_item'+show_id).style.display='block';
        }
        aLi1[i].onmouseout=function () {
            clearTimeout(timer);
            timer=setTimeout(function () {
                menuCont.style.display='none';
                clearAc(aLi1);
            },100)
        }
    }
    menuCont.onmouseenter=function () {
        this.style.display='block';
        clearTimeout(timer);
    }
    menuCont.onmouseleave=function () {
        this.style.display='none';
        clearAc(aLi1);
    }
//----------------------------------------------------------
//切换猜你喜欢

    var change_btn=document.getElementById('change_btn');
    var guess_box=document.getElementsByClassName('guess_b')[0];
    var guess_info=guess_box.getElementsByTagName('div');
    var n=0;
    change_btn.onclick=function(){

        n++;
        if(n>guess_info.length-1){
            n=0;
        }
        for(var i=0;i<guess_info.length;i++){
            guess_info[i].className='';
        }
        guess_info[n].className='guess_ac';
    }
//--------------------------------------------------------------------
//滚动条
    var LocationFloorList=getByClass(document,'LocationFloorList')[0];
    var aLi=LocationFloorList.getElementsByTagName('li');
    var aFloor=getByClass(document,'floor');
    var arr=[];


    //-------------------------------------------------
    for(var i=0; i<aFloor.length; i++){
        var json={};
        json.name=i;
        json.offsetTop=aFloor[i].offsetTop;
        arr.push(json);
    };


    //console.log(arr);

    window.onscroll=function(){

        //显示楼层编号-------------------------------------------------
        var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
        //console.log(scrolltop);
        if(scrolltop>aFloor[0].offsetTop-300){
            LocationFloorList.style.display='block';
        }else{
            LocationFloorList.style.display='none';
        };

        // 根据楼层滚动位置，定位编号------------------------------------------------
        //console.log(aFloor[0].offsetTop);
        //console.log(aFloor[1].offsetTop);
        //console.log(aFloor[2].offsetTop);
        //console.log(aFloor[3].offsetTop);
        var last_arr=[];
        for(var j=0; j<arr.length; j++){
              if(aFloor[j].offsetTop<scrolltop+400){//400为接近屏幕的敏感区
                  last_arr.push(arr[j].name);
              };
        };

        //console.log(last_arr);

        var li_index=last_arr[last_arr.length-1];

        for(var l=0; l<aFloor.length; l++){
            aLi[l].className='';
        };
        //页面上部如果有内容，没有楼层会放入新数组，产生错误
        last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';
    };

    //点击编号，跳转到相对楼层-----------------------------------------------
    for(var i=0; i<aFloor.length; i++){
        aLi[i].index=i;
        aLi[i].onclick=function(){

            var start=document.documentElement.scrollTop || document.body.scrollTop;
            var end=aFloor[this.index].offsetTop;
            move(start,end)
        }
    };
    //move-------------------------------------------------------
    var timer;
    function move(start,end){
        var dis=end-start;
        var count=parseInt(1500/30);
        var n=0;
        clearInterval(timer);
        timer=setInterval(function(){
            n++;
            var a=1-n/count;
            var step_dis=start+dis*(1-a*a*a*a);
            window.scrollTo(0,step_dis);//第一个参数:横向滚动条  第二个参数:纵向滚动条
            if(n==count){
                clearInterval(timer);
            };
        },30)
    };

    function getByClass(oParent,cls){
        var arr=[]; //容器
        if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
        else{
            var aEl=oParent.getElementsByTagName('*');//所有标签
            for(var i=0;i<aEl.length;i++){
                if(aEl[i].className.indexOf(cls)!=-1) arr.push(aEl[i]);//向数组中添加
            }
            return arr;
        }
    };

//----------------------------------------------------------------------
//轮播
    var slide_box=document.getElementsByClassName('banner')[0];
    var img_box=slide_box.getElementsByTagName('ul')[0];

    var pBtn=slide_box.getElementsByClassName('pre')[0];
    var nBtn=slide_box.getElementsByClassName('next')[0];
    var slide_img=img_box.getElementsByTagName('li');
    var oOl=document.createElement('ol');
    slide_box.appendChild(oOl);
    var slide_num=0;
    slide_img[0].style.opacity=1;
    for(var i=0;i<slide_img.length;i++){
        var oSlide_btn=document.createElement('li');
        oOl.appendChild(oSlide_btn);
    }
    oOl.style.left=slide_box.offsetWidth/2-oOl.offsetWidth/2+'px';
    var slide_Btn=oOl.getElementsByTagName('li');
    slide_Btn[0].className='ac';
    for(var i=0; i<slide_Btn.length; i++){
  		slide_Btn[i].index=i;//发拍照
  		slide_Btn[i].onmouseover=function(){

  			if(slide_num!=this.index){
  				slideItem(slide_num,this.index);
  				slide_num=this.index;
  				changeAc();
  			}
  		};
  	};

  	pBtn.onclick=function(){
  		if(slide_num<1){
  			slide_num=slide_img.length;
  			slideItem(0,slide_img.length-1);
  		}else{
  			slideItem(slide_num,slide_num-1);
  		};
  		slide_num--;
  		changeAc();

  	}

  	nBtn.onclick=function(){
  		slide_num++;
  		if(slide_num>slide_img.length-1){
  			slide_num=0;
  			slideItem(slide_img.length-1,0);
  		}else{
  			slideItem(slide_num-1,slide_num);
  		};
  		changeAc();
  	};
    var slide_timer;
    function slide_time() {
      slide_timer=setInterval(function () {
        slide_num++;
        if(slide_num>slide_img.length-1){
          slide_num=0;
          slideItem(slide_img.length-1,0);
        }else{
          slideItem(slide_num-1,slide_num);
        };
        changeAc();
      },2000);
    }
    slide_time();
    slide_box.onmouseover=function () {
      clearInterval(slide_timer);
      pBtn.style.display='block';
      nBtn.style.display='block';
    };
    slide_box.onmouseout=function () {
      slide_time();
      pBtn.style.display='none';
      nBtn.style.display='none';
    };
  	function slideItem(a,b){
  		slide_img[a].style.display='block';
  		slide_img[a].style.opacity=1;;

  		slide_img[b].style.display='block';
  		slide_img[b].style.opacity=0;

  		move2(slide_img[a],'opacity',0,1000);
  		move2(slide_img[b],'opacity',100,1000,function(){
  			slide_img[a].style.display='none';
  		});
  	};


  	function changeAc(){
  		for(var j=0; j<slide_Btn.length; j++){
  			slide_Btn[j].className='';
  		};
  		slide_Btn[slide_num].className='ac';
  	}

//----------------------------------------------------------------
var floor3=document.getElementsByClassName('page3')[0];
var floor3_nav=floor3.getElementsByClassName('nav')[0];
var floor3_navLi=floor3_nav.getElementsByTagName('li');
var floor3_inner=floor3.getElementsByClassName('cloth_inner');
var floor4=document.getElementsByClassName('page4')[0];
var floor4_nav=floor4.getElementsByClassName('nav')[0];
var floor4_navLi=floor4_nav.getElementsByTagName('li');
var floor4_inner=floor4.getElementsByClassName('page4_inner');

function floorTab(obj1,obj2) {
  obj1[0].className='ac';
  obj2[0].style.display='block';
  for(var i=0;i<obj1.length;i++){
      obj1[i].index=i;
      obj1[i].onmouseover=function(){
          for(var j=0;j<obj1.length;j++){
              obj1[j].className='';
              obj2[j].style.display='none'
          }
          this.className='ac';
          obj2[this.index].style.display='block';
      }
  }
}
floorTab(floor3_navLi,floor3_inner);
floorTab(floor4_navLi,floor4_inner);
var floor5=document.getElementsByClassName('page5');
for(var k=0;k<floor5.length;k++){
  var floor5_nav=floor5[k].getElementsByClassName('nav')[0];
  var floor5_navLi=floor5_nav.getElementsByTagName('li');
  var floor5_inner=floor5[k].getElementsByClassName('page5_inner');
  floorTab(floor5_navLi,floor5_inner);
}



























//----------------------------------------------------
    var pre_speed={
        verySlow:2000,
        slow:1200,
        normal:800,
        fast:600,
        veryFast:300
    }
    var oDiv=document.getElementById('box');
    function getStyle(obj,styleName){
        var value=obj.currentStyle?obj.currentStyle[styleName]: getComputedStyle(obj,false)[styleName];
        if(styleName=='opacity'){
            value=Math.round(parseInt(value*100));
        }else {
            value=parseInt(value);
        }
        return value;
    }
//alert(getStyle(oDiv,'width'));
    function move1(obj,modeJson,time,fn) {
        clearInterval(obj.timer);
        if(typeof time=='string'){
            time=pre_speed[time];
        }else {
            time=pre_speed.normal;
        }
        var start={}; //obj运动对象，speed变化速度，end最终大小
        var dis={};//运动距离
        for(var key in modeJson){
            start[key]=getStyle(obj,key);
            dis[key]=modeJson[key]-start[key];
        }
        var count=parseInt(time/30);  //计数器
        var n=0;
        obj.timer=setInterval(function (){
            n++;
            for(var key in modeJson){
                var a=1-n/count;
                var step=start[key]+dis[key]*(1-a*a*a);
                if(key=='opacity'){
                    obj.style.opacity=step/100;
                    obj.style.filter='alpha(opacity='+step+')';
                }else {
                    obj.style[key]=step+'px';
                }
            }
            if(n==count){
                clearInterval(obj.timer);
                fn && fn();
            }
        },30)
    }
    //-------------------------------------
    // JavaScript Document

    //读取样式
    function getStyle(obj, styleName){
    	var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
    	return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
    }

    //-----------------------------------------------------------------------------
    function move2(obj,moveMode,end,stopTime,fn){//对象 终点 运动终点  运动方式

    	//距离=终点-起点;
    	var start=getStyle(obj, moveMode);//起点数值

    	var dis=end-start;//距离 distance

    	//定时器---------------------------------------------
    	var count=parseInt(stopTime/30);////次数
    	var n=0;//步进

    	clearInterval(obj.timer);//使用对象属性，定义计时器变量

    	obj.timer=setInterval(function(){
    		n++;

    		var a=1-n/count;  //a的值会越来越小
    		var step_dis=start+dis*(1-a*a*a);

    		if(moveMode=='opacity'){//透明
    			obj.style.filter='alpha(opacity:'+step_dis+')';
    			obj.style.opacity=step_dis/100;
    		}
    		else{//其他
    			obj.style[moveMode]=step_dis+'px';
    		}

    		//取消定时器
    		if(n==count){
    			clearInterval(obj.timer);
    			fn && fn();
    		};

    	},30)
    };




}
