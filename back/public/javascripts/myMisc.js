function alertMsg (msg, type, funcSuc) {
  //error,question,info,warning
  
  var icon = -1;
  switch(type){
    case 'error':
      icon = 8;
      break;
    case 'question':
      icon = 4;
      break;
    case 'info':
      icon = 0;
      break;
    case 'warning':
      icon = 5;
      break;
    case 'success':
      icon = 10;
      break;
    default:
      break;
  }

  if (layer) {
    $.layer({
      title: false,
      shadeClose: true,
      closeBtn: [0, true],
      shade: [0],
      area:['auto','auto'],
      time: 2,
      move: false,
      btns: 0,
      showBtn:false,
      end: function () {
        if (funcSuc) funcSuc();
      },
      dialog: {
         type: icon,
         msg: msg
      }
    });
  } else {
    alert(msg);
    if (funcSuc) funcSuc();
  }
}