window.onload=function(){

    var oDiv=document.getElementById('main');
    var normal_pic=document.getElementById('normal_pic');
    var big_pic=document.getElementById('big_pic')
    var oUl=oDiv.getElementsByClassName('sml_pic')[0];
    var aA=oUl.getElementsByTagName('a');
    var pBtn=document.getElementById('pre');
    var nBtn=document.getElementById('next');
    var img_w=aA[0].offsetWidth+14;

    oUl.style.width=img_w*aA.length+'px';
    //-----------------------------------
    //切换图片
    for(var i=0;i<aA.length;i++){
        aA[i].index=i;
        aA[i].onmouseover=function(){
            for(var j=0;j<aA.length;j++){
                aA[j].parentNode.style.border='2px solid transparent';
            }
            this.parentNode.style.border='2px solid red';
            normal_pic.src="images/choosebg"+(this.index+1)+".jpg";
            big_pic.src="images/bigpic"+(this.index+1)+".jpg";
        }
    }
    //---------------------------------------
//点击切换
    var n=0;
    pBtn.onclick=function(){
        n--;
        if(n<0){
            n=0;
        }

        move(oUl, {'left':-img_w*n});
    }
    nBtn.onclick=function(){
        n++;
        if(n>=aA.length-5){
            n=aA.length-5;
        }

        move(oUl, {'left':-img_w*n});
    }

//---------------------------
//放大镜
    function offsetTop( elm ){
        var top = elm.offsetTop;
        var parent = elm.offsetParent;
        while( parent != null ){
            top += parent.offsetTop;
            parent = parent.offsetParent;
        };
        return top;
    };



    function offsetLeft( elm ){
        var left = elm.offsetLeft;
        var parent = elm.offsetParent;
        while( parent != null ){
            left += parent.offsetLeft;
            parent = parent.offsetParent;
        };
        return left;
    };
    var info_pic=document.getElementsByClassName('info_pic')[0];
    var zoom_big=document.getElementsByClassName('zoom_big')[0];
    var big_pic=document.getElementById('big_pic');
    var oSpan=info_pic.getElementsByTagName('span')[0];
    info_pic.onmousemove=function(ev){
        oSpan.style.display=zoom_big.style.display='block';

        var oEv=ev||event;

        //获取滚动条  chrome不识别 documentElement.scrollTop
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        //鼠标在span的中心位置
        var l=oEv.clientX-info_pic.offsetLeft-oSpan.offsetWidth/2;
        var t=oEv.clientY+scrollTop-offsetTop( info_pic )-oSpan.offsetHeight/2;

        //限制范围
        if(l<0)l=0;
        if(l>=info_pic.offsetWidth-oSpan.offsetWidth){
            l=info_pic.offsetWidth-oSpan.offsetWidth;
        }

        if(t<0)t=0;
        if(t>=info_pic.offsetHeight-oSpan.offsetHeight){
            t=info_pic.offsetHeight-oSpan.offsetHeight;
        }
        oSpan.style.left=l+'px';
        oSpan.style.top=t+'px';


        var l_rate=l / (info_pic.offsetWidth-oSpan.offsetWidth);
        var t_rate=t / (info_pic.offsetHeight-oSpan.offsetHeight);


        big_pic.style.left= (zoom_big.offsetWidth-big_pic.offsetWidth)*l_rate +'px'; //外box 减 内部大图片，为负值
        big_pic.style.top= (zoom_big.offsetHeight-big_pic.offsetHeight)*t_rate +'px';

    };

    info_pic.onmouseout=function(){
        oSpan.style.display=zoom_big.style.display='none';
    };




    //-----------------------------------
    //选择框
    var color_item=document.getElementsByClassName('color_item')[0];
    var color_aBtn=color_item.getElementsByTagName('a');
    var color_bBg=color_item.getElementsByTagName('b');
    var white_bar_item=document.getElementsByClassName('white_bar_item')[0];
    var white_ac=document.getElementsByClassName('white_ac');
    var white_bar_bBg=white_bar_item.getElementsByTagName('b');
    for(var i=0;i<color_aBtn.length;i++) {
        color_aBtn[i].index = i;
        color_aBtn[i].onclick = function () {
            for (var j = 0; j < color_aBtn.length; j++) {
                color_aBtn[j].className = '';
                color_bBg[j].style.background = '';
            }
            this.className = 'choose_ac';
            color_bBg[this.index].style.background = 'url(images/icon.png) no-repeat -202px -224px';
        }
    }
    for(var i=0;i<white_ac.length;i++) {
        white_ac[i].index = i;
        white_ac[i].onclick = function () {
            for (var j = 0; j < white_ac.length; j++) {
                white_ac[j].className = 'white_ac';
                white_bar_bBg[j].style.background = '';
            }
            this.className = 'white_ac choose_ac';
            white_bar_bBg[this.index].style.background = 'url(images/icon.png) no-repeat -202px -224px';
        }
    }
    //----------------------------------------------------------
    //数量加减
    var count=document.getElementsByClassName('count_input')[0];
    var count_input=count.getElementsByTagName('input')[0];
    var addBtn=count.getElementsByClassName('add')[0];
    var lessBtn=count.getElementsByClassName('less')[0];
    if(parseInt(count_input.value)<=1){
        lessBtn.style.cursor='not-allowed';
        lessBtn.style.color='#ccc';
    }

    addBtn.onclick=function(){
        count_input.value=parseInt(count_input.value)+1;
        if(parseInt(count_input.value)>1) {
            lessBtn.style.cursor= 'pointer';
            lessBtn.style.color= '#000';
        }
    }

    lessBtn.onclick=function(){
        if(parseInt(count_input.value)>1){
            count_input.value=parseInt(count_input.value)-1;
        }
        if(parseInt(count_input.value)<=1){
            lessBtn.style.cursor='not-allowed';
            lessBtn.style.color='#ccc';
        }
    }
//--------------------------------------------------------
    //选项卡
    var recommend=document.getElementsByClassName('recommend_item')[0];
    var rec_item=recommend.getElementsByTagName('li');
    var rec_info=document.getElementsByClassName('recommend_info')[0];
    var rec_inner=rec_info.getElementsByTagName('div');
    for(var i=0;i<rec_item.length;i++){
        rec_item[i].index=i;
        rec_item[i].onmouseover=function(){
            for(var j=0;j<rec_item.length;j++){
                rec_item[j].className='';
                rec_inner[j].className='';
            }
            this.className='rec_ac';
            rec_inner[this.index].className='rec_info';
        }
    }
//----------------------------------------------------------
    //地址选择

    var add_box=document.getElementById('add_box');
    var add_sel=document.getElementById('add_txt');
    var add_choose=document.getElementById('add_choose');
    add_sel.onmouseover=function(){
        add_choose.style.display='block';
        add_choose.style.bottom=-(add_choose.offsetHeight-1)+'px';
        add_sel.style.borderBottom='1px solid #fff';

    }
    add_choose.onmouseover=function(){
        this.style.display='block';
        add_sel.style.borderBottom='1px solid #fff';
    }
    add_choose.onmouseleave=function(){
        this.style.display='none';
        add_sel.style.borderBottom='1px solid #ccc';

    }
    add_sel.onmouseleave=function(){
        add_choose.style.display='none';
        add_sel.style.borderBottom='1px solid #ccc';

    }
    var choose_inner=document.getElementsByClassName('choose_inner')[0];
    var add_A=choose_inner.getElementsByTagName('a');
    var add_span=add_sel.getElementsByTagName('span')[0];
    for(var i=0;i<add_A.length;i++){
        add_A[i].onclick=function(){
            add_span.innerHTML=this.innerHTML;
            add_choose.style.display='none';

        }
    }


    function myTab(id) {
        var oDiv=document.getElementById(id);
        var aLi=oDiv.getElementsByTagName('li');
        var oDiv2=document.getElementsByClassName('choose_inner')[0];
        var aDiv=oDiv2.getElementsByTagName('div');
        var num;
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function () {
                num=this.index;
                change(num);
                add_choose.style.bottom=-(add_choose.offsetHeight-1)+'px';

            }
        }
        function change(n){
            for(var j=0;j<aLi.length;j++){
                aDiv[j].style.display='none';
                aLi[j].className='';
            }
            aLi[n].className='tabac';
            aDiv[n].style.display='block';
        }

    }
    myTab('add_li');
//-----------------------------------------------------











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
    function move(obj,modeJson,time,fn) {
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
                fn&&fn();
            }
        },30)
    }
    //-------------------------------------
}