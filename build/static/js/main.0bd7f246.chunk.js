(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t){},105:function(e,t){},138:function(e,t){},139:function(e,t){},186:function(e,t,n){"use strict";n.r(t);var a=n(9),c=n.n(a),o=n(82),r=n.n(o),i=(n(94),n(12)),s=n.n(i),u=n(23),l=n(83),d=n(84),m=n(87),f=n(85),v=n(88),h=(n(98),n(86)),p=(n(5),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).componentDidMount=Object(u.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.loadModel();case 2:t=e.sent,n.initCanvas(),n.initWebcam(t);case 5:case"end":return e.stop()}},e,this)})),n.initWebcam=function(){var e=Object(u.a)(s.a.mark(function e(t){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=document.getElementById("webcam"),n.streamVideo(a,t);case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.loadModel=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)})),n.predictObject=function(){var e=Object(u.a)(s.a.mark(function e(t,a){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.detect(t).then(function(e){console.log(e),n.drawRectangle(e);var c=requestAnimationFrame(function(){n.predictObject(t,a)});n.setState({req:c})});case 1:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),n.stopWebcam=function(){n.state.track.stop()},n.stopModel=function(){cancelAnimationFrame(n.state.req)},n.state={model:null,track:null,req:null,canvas:null},n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"initCanvas",value:function(){var e=document.getElementById("canvas").getContext("2d");this.setState({context:e})}},{key:"streamVideo",value:function(e,t){var n=this;navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}}).then(function(a){e.srcObject=a,e.onloadedmetadata=function(){n.predictObject(e,t)};var c=a.getTracks()[0];n.setState({track:c})}).catch(function(e){console.log(e.message)})}},{key:"drawRectangle",value:function(e){var t=this.state.context;t.clearRect(0,0,400,400);try{for(var n=0;n<e.length;n++){var a=this.getCoordinates(e[n]),c=this.getObjectName(e[n]);t.beginPath(),t.fillText(c,a[0],a[1]-10),t.rect(a[0],a[1],a[2],a[3]),t.stroke()}}catch(o){console.log(o)}}},{key:"getObjectName",value:function(e){try{return e.class}catch(t){console.log(t)}}},{key:"getCoordinates",value:function(e){try{return e.bbox}catch(t){console.log(t)}}},{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"video-container"},c.a.createElement("canvas",{id:"canvas",width:"400",height:"400"}),c.a.createElement("video",{autoPlay:!0,muted:!0,width:"400",height:"400",id:"webcam"})),c.a.createElement("button",{id:"btnStop",onClick:this.stopWebcam},"Stop Camera"),c.a.createElement("button",{id:"btnStopModel",onClick:this.stopModel},"Stop Model"))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},89:function(e,t,n){e.exports=n(186)},94:function(e,t,n){},98:function(e,t,n){}},[[89,2,1]]]);
//# sourceMappingURL=main.0bd7f246.chunk.js.map