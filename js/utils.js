function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
};

function throttle (func, wait, options) {
  var timeout, context, args
  var previous = 0
  if (!options) options = {}

  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function () {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  return throttled
}

function sidebarPaddingR() {
  let innerWidth = window.innerWidth
  let clientWidth = document.body.clientWidth
  let paddingRight = innerWidth - clientWidth
  if (innerWidth !== clientWidth) {
    $('body').css('padding-right', paddingRight)
  }
}

// iPadOS
function isIpad () {
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 
}

function isTMobile () {
  var ua = navigator.userAgent
  var pa = /iPad|iPhone|iPod|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g
  return window.screen.width < 992 && pa.test(ua)
}

function isMobile () {
  return this.isIpad() || this.isTMobile()
}

function isDesktop () {
  return !this.isMobile()
}

function scrollTo (name) {
  var scrollOffset = $(name).offset()
  $('body,html').animate({
    scrollTop: scrollOffset.top
  })
};

function loadScript (url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' ||
        script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else { // Others
    script.onload = function () {
      callback()
    }
  }
  script.src = url
  document.body.appendChild(script)
};

function snackbarShow (text, showAction, duration) {
  var a = (typeof showAction !== 'undefined') ? showAction : false
  var d = (typeof duration !== 'undefined') ? duration : 2000
  var position = GLOBAL_CONFIG.Snackbar.position
  var bg = document.documentElement.getAttribute('data-theme') === 'light' ? GLOBAL_CONFIG.Snackbar.bgLight : GLOBAL_CONFIG.Snackbar.bgDark
  Snackbar.show({
    text: text,
    backgroundColor: bg,
    showAction: a,
    duration: d,
    pos: position
  })
}

window.debounce = debounce

window.throttle = throttle

window.isMobile = isMobile

window.loadScript = loadScript







/* 微信推送 */
var title1="text=超逸の博客又有新评论啦~！--by lionkk"
var SCKEY_Server="SCU95250T94b4dfcb89254a0f1fa9e239c88e76bc5ea1a06689e98"
var ValineButton=document.getElementsByClassName("vsubmit vbtn")[0];
function send_valine_Server(){
    var text="desp=";
    var pagename=document.title;
    var wz=pagename.indexOf('|');
    var res=pagename.substring(0,wz);
    var pageurl=document.URL;
    var ptime=new Date();
    var vnick=document.getElementsByClassName("vnick vinput")[0].value;
    var vmail=document.getElementsByClassName("vmail vinput")[0].value;
    var vlink=document.getElementsByClassName("vlink vinput")[0].value;
    var veditor=document.getElementsByClassName("veditor vinput")[0].value;
    var data=text+"|昵称："+"|邮箱："+"|网站地址："+"|当前页面："+"|评论内容："+"|跳转链接："+"|评论时间"+"\n"+"|----|----|----|----|"+"\n"+"|   "+vnick+"   |   "+vmail+"  |  "+vlink+"|   "+res+"| "+veditor+"| "+pageurl+"|" +ptime.toLocaleString()+"|";
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'https://sc.ftqq.com/'+SCKEY_Server+'.send', true); //第二步：打开连接
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    httpRequest.send(title1+"&"+data);//发送请求 将情头体写在send中
};
ValineButton.onclick=send_valine_Server;


/* QQ推送 */
var title2="msg=超逸の博客又有新评论啦~！--by lionkk\n"
var SCKEY_Qmsg="https://qmsg.zendee.cn:443/send/a83c45c4f6955fee3e3cbc04b32abeea.html"
var ValineButton=document.getElementsByClassName("vsubmit vbtn")[0];
function send_valine_Qmsg(){
    var pagename=document.title;
    var wz=pagename.indexOf('|');
    var res=pagename.substring(0,wz);
    var pageurl=document.URL;
    var ptime=new Date();
    var vnick=document.getElementsByClassName("vnick vinput")[0].value;
    var vmail=document.getElementsByClassName("vmail vinput")[0].value;
    var vlink=document.getElementsByClassName("vlink vinput")[0].value;
    var veditor=document.getElementsByClassName("veditor vinput")[0].value;
    var data="昵称："+vnick+"\n邮箱："+vmail+"\n网站地址："+vlink+"\n当前页面："+pagename+"\n评论内容："+veditor+"\n跳转链接："+pageurl+"\n评论时间"+ptime.toLocaleString();
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST',SCKEY_Qmsg, true); //第二步：打开连接
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    httpRequest.send(title2+data);//发送请求 将情头体写在send中
};
ValineButton.onclick=send_valine_Qmsg;