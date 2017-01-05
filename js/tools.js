//拖拽
function drag(obj,title) {
  title=title||obj;
  title.onmousedown=function (ev) {
    ev=ev||window.event;
    var disX=ev.clientX-obj.offsetLeft;
    var disY=ev.clientY-obj.offsetTop;
    document.onmousemove=function (ev) {
      ev=ev||window.event;
      var l=ev.clientX-disX;
      var t=ev.clientY-disY;
      /*if(obj.offsetLeft==0){
        disX=ev.clientX;
      }
      if(obj.offsetTop==0){
        disY=ev.clientY;
      }
      if(l<0){
        l=0;
      }
      if(t<0){
        t=0;
      }*/
      if(l<0){
        disX=ev.clientX;
      }
      if(t<0){
        disY=ev.clientY;
      }
      var screenW=document.documentElement.clientWidth;
      var screenH=document.documentElement.clientHeight;
      if(l>screenW-obj.offsetWidth){
        l=screenW-obj.offsetWidth;
      }
      if(t>screenH-obj.offsetHeight){
        t=screenH-obj.offsetHeight;
      }
      if(obj.offsetLeft==screenW-obj.offsetWidth){
        disX=ev.clientX-obj.offsetLeft;
      }
      if(obj.offsetTop==screenH-obj.offsetHeight){
        disY=ev.clientY-obj.offsetTop;
      }
      obj.style.left=l+'px';
      obj.style.top=t+'px';
    }
    document.onmouseup=function () {
      document.onmousemove=null;
    }
    return false;
  }
}
//居中
function showCenter(obj) {
  obj.style.display='block';
  obj.style.left=(document.documentElement.clientWidth-obj.offsetWidth)/2+'px';
  obj.style.top=(document.documentElement.clientHeight-obj.offsetHeight)/2+'px';
  window.onresize=function () {
    showCenter(obj);
  }
}
