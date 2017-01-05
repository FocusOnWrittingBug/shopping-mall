/*警告弹框*/
function showErrBox(txt,delayTime) {
  var timer;
  document.body.appendChild(oDiv);
  oDiv.className='errBox';
  oDiv.innerHTML=txt;
  function run() {
    timer=setTimeout(function () {
      document.body.removeChild(oDiv);
    },delayTime||1000);
  }
  run();
  oDiv.onmouseover=function () {
    clearTimeout(timer);
  }
  oDiv.onmouseout=function () {
    run();
  }
}
/*模态层*/
function modal_layer(opacity){
  var modal=document.createElement('div');
  if(opacity){
    modal.style.opacity='0';
  }
  modal.className='modal';
  document.body.appendChild(modal);
  return modal;
}
/*登录弹框*/
function loginBox() {
  var mod=modal_layer();
  var oBox=document.createElement('div');
  oBox.className='login_box';
  oBox.innerHTML='<h4>请登录</h4>'+
  '<a class="close_btn" href="javascript:;">x</a>'+
  '<p><label>用户名:<input type="text" name="name" value=""></label></p>'+
  '<p><label>密　码:<input type="text" name="name" value=""></label></p>'+
  '<p><button type="submit" name="button">提交</button></p>';
  document.body.appendChild(oBox);
  var oH4=oBox.getElementsByTagName('h4')[0];
  showCenter(oBox);
  drag(oBox,oH4);
  var close_btn=oBox.getElementsByClassName('close_btn')[0];
  close_btn.onclick=function functionName() {
    document.body.removeChild(oBox);
    document.body.removeChild(mod);
  }
}
/*confirm提示框*/
function addConfirm(txt,fn) {
  var confirmBox=document.createElement('div');
  var modal=modal_layer()
  confirmBox.innerHTML='<p>'+txt+'</p><button type="button" name="button">确定</button><button type="button" name="button">取消</button>';
  confirmBox.id='confirm';
  document.body.appendChild(confirmBox);
  var btnA=confirmBox.children[1];
  var btnB=confirmBox.children[2];
  btnA.onclick=function () {
    document.body.removeChild(confirmBox);
    document.body.removeChild(modal);
    fn&&fn();
  }
  btnB.onclick=function () {
    document.body.removeChild(confirmBox);
    document.body.removeChild(modal);
  }
}
