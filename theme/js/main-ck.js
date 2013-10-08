// Gumby is ready to go
Gumby.ready(function() {
  console.log('Gumby is ready to go...', Gumby.debug());

  // placeholder polyfil
  if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
    $('input, textarea').placeholder();
  }
});

// Oldie document loaded
Gumby.oldie(function() {
  console.log("This is an oldie browser...");
});

// Touch devices loaded
Gumby.touch(function() {
  console.log("This is a touch enabled device...");
});

// Document ready
$(function() {
  // cycle noticias da home
  $('#newsItems').cycle({
    fx:     'scrollHorz',
    speed:  'fast',
    timeout: 5000,
    next:   '#nextNews',
    prev:   '#prevNews'
  });

  $('#weather').html();

//  $('.default').dropkick();
//  $('.defaultWhite').dropkick({
//    theme: 'white'
//  });
//  $('.defaultGray').dropkick({
//    theme: 'gray'
//  });
  var $events = $('.homeEvents');
  $events.find('.item').first().css('border', 'none');

  $('.myAccount').click(function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
    $('#loginBox').toggle();
  });

  $('#openLanguage').click(function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
    $this.find('.icon').toggleClass('icon-flip-vertical');
    $('#languageBox').toggle();
  });
  $('#languageBox').hide();

  $('.loggedin').click(function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
    $('#loggedinBox').toggle();
  });

  $('.download').click(function(e){
    e.preventDefault();
    var $this = $(this);
    var $parent = $this.parent();
    if($this.hasClass('active'))
    {
      $parent.css('z-index', 0);
    }
    else
    {
      $parent.css('z-index', 3000);
    }
    $this.toggleClass('active');

    $this.find('.icon').toggleClass('icon-flip-vertical');
    $this.next('ul').toggle().toggleClass('active');
  });
  $('#loginBox').hide();
  $('#loggedinBox').hide();
  $('.downloadBox').hide();

  $('#showLeftPush, #loginMobile').click(function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
    $('body').toggleClass('cbp-spmenu-push-toright');
    $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open');
  });

  $('.btAbre').click(function(e){
    e.preventDefault();
    var $this = $(this);

    if($this.hasClass('abridor')){
      var $abridor = $this;
    }else{
      var $abridor = $this.parent('h3').next('a');
    }

    var $content = $this.closest('.item').find('.content').eq(0);
    $abridor.toggleClass('icon-flip-vertical');
    //$('.documentContent').height('auto');
    $content.slideToggle(400, function(){
      setTimeout(function(){
        updateContainer();
      }, 1)
    });
  });
  $('.listDocument').find('.item').find('.content').hide();


  $('.blueDown, .blackDown').click(function(e){
    e.preventDefault();
    var $this = $(this);
    var $parent = $this.parent();
    if($this.hasClass('blueactive'))
    {
      $parent.css('z-index', 0);
    }
    else
    {
      $parent.css('z-index', 3000);
    }
    $this.toggleClass('blueactive').next('div').toggle();
  });

  $(document).mouseup(function (e) {
    var $elemento = $(e.target);

    if(e.target.className !== 'blueDown blueactive'){
      var $this = $('.blueDown.blueactive');
      $this.parent().css('z-index', 0);
      $this.removeClass('blueactive').next('div').hide();
    }
  });

  $('.intRad').on('change',function(){
    var showOrHide = ($(this).val() == '1') ? true : false;
    $('.another').toggle(showOrHide);
  });

  function initToggling() {
    //Hide the togglebox when page load
    var $agenda = $('#agendaContent');
    $agenda.find(".togglebox").hide();
    //slide up and down when click over heading 2
    $agenda.find('h4').click(function (e) {
      e.preventDefault();
      var $this = $(this);
      // slide toggle effect set to slow you can set it to fast too.
      $this.toggleClass("active").next(".togglebox").slideToggle(400, function(){
        setTimeout(function(){
          updateContainer();
        }, 1)
      });
      $this.find('.icon').toggleClass('icon-flip-vertical');
    });
  }
  initToggling();

  $('.btExpand a').click(function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
    var $row = $this.closest('.holder');
    $row.toggleClass('min');

    if($this.hasClass('active')){
      $this.html('<i class="icon-angle-down"></i>Maximize View');
    }
    else{
      $this.html('<i class="icon-angle-up"></i>Minimize View');
    }
  });

  $('.btLocation').click(function(e){
    e.preventDefault();
  });

  // PDO copies
  $('.addCopy').click(function(){
    var $this = $(this);
    $this.blur();
    var $input = $this.closest('td.copies').find('input');
    var value = parseInt($input.val());
    value++;
    $input.val(value);
  });
  $('.subCopy').click(function(){
    var $this = $(this);
    $this.blur();
    var $input = $this.closest('td.copies').find('input');
    var value = parseInt($input.val());
    if(value <= 1){
      $input.val(1);
    }
    else{
      value--;
      $input.val(value);
    }
  });

  $('.myModal').on('click', function(e) {
    if (e.target !== this) return;

    $(this).removeClass('active');
  });

  var isMac = navigator.platform.toUpperCase().indexOf('MAC')!==-1;
  var isWindows = navigator.platform.toUpperCase().indexOf('WIN')!==-1;
  var isLinux = navigator.platform.toUpperCase().indexOf('LINUX')!==-1;

  if(isLinux){
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid) {
      isLinux = false;
    }
  }

  if(isMac || isWindows || isLinux){
    $('#responsiveStyle').remove();
    $('#responsiveArStyle').remove();
  }

});

function updateContainer(){
  var $aside = $('aside');
  var $events = $aside.parent().find('.twenty-seven').eq(0);
//  $aside.removeAttr('style');
//  $events.removeAttr('style');
  $aside.height('auto');
  $events.height('auto');


  if ($aside.is(':visible')) {
    if($aside.outerHeight()<$events.outerHeight()){
      $aside.outerHeight($events.outerHeight());
    }
    else{
      $events.outerHeight($aside.outerHeight());
    }
  }else{
    $events.height('auto');
  }
}

function adjustImage(){
  var $adj = $('.adjust');
  var $top = $adj.parent().find('.twenty-seven');

  $adj.css('line-height', ( $top.height()+30 )+'px');
}

function listChange(){
  var lag = document.body.clientWidth;
  $('.sessionItem, .programmeList').each(function(){
    var aa = 0;
    var alto = 0;
    var alto2 = 0;
    var $lis = $(this).find('li.where').parent('ul').find('li');
    //alert($(this).find('li.where').parent('ul').width());
    $lis.each(function(){
      var $this = $(this);
      if($this.height() > alto){
        alto = $this.height();
        alto2 = $this.outerHeight();
      }
      $this.height('auto');
    });
    $lis.each(function(){
      aa++;
      var $this = $(this);
      if(lag > 1023){
        if($this.height() < alto){
          var _aut = ($this.height()+16);
          $this.css('padding-top', (7 + (alto2 - _aut) / 2 ) );
        }
        $this.height(alto);
        $this.css('height',alto2+'px');
      } else {
        $this.css('padding-top', 7).css('height','auto');
      }
    });
  });
}
window.onload=function(){
  updateContainer();

  var currFFZoom = 1;
  var currIEZoom = 1;

  $('#In').on('click',function(e){
    e.preventDefault();
    console.log(currIEZoom);
    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6){//Firefox
      var step = 0.02;
      currFFZoom += step;
      $('body').css({
        'MozTransform':'scale(' + currFFZoom + ')',
        'transform-origin': '50% 0'
      });
    } else if (navigator.userAgent.indexOf('iPad') != -1){
      var step = 0.2;
      currIEZoom += step;
      $('body').css('zoom', ' ' + currIEZoom + '');
    } else {
      var step = 0.2;
      currIEZoom += step;
      document.body.style.zoom= currIEZoom;
      this.blur();
    }
  });

  $('#Out').on('click',function(e){
    e.preventDefault();
    console.log(currIEZoom);
    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6){//Firefox
      var step = 0.02;
      if(currFFZoom > 1){
        currFFZoom -= step;
        $('body').css({
          'MozTransform':'scale(' + currFFZoom + ')',
          'transform-origin': '50% 0'
        });
      }
    } else if (navigator.userAgent.indexOf('iPad') != -1){
      if(currIEZoom > 1){
        var step = 0.2;
        currIEZoom -= step;
        $('body').css('zoom', ' ' + currIEZoom + '');
      }
    } else {
      if(currIEZoom > 1){
        var step = 0.2;
        currIEZoom -= step;
        document.body.style.zoom= currIEZoom;
        this.blur();
      }
    }
  });
};

var SITE = SITE || {};

SITE.fileInputs = function() {
  var $this = $(this),
    $val = $this.val(),
    valArray = $val.split('\\'),
    newVal = valArray[valArray.length-1],
    $button = $this.siblings('.button'),
    $fakeFile = $this.siblings('.file-holder');
  if(newVal !== '') {
    //$button.text('Photo Chosen');
    $button.hide();
    if($fakeFile.length === 0) {
      console.log($this);
      var $btn = $('<span class="file-remove icon-remove-sign"></span>');
      $button.closest('.file-wrapper').after($btn);
      $button.after('<span class="file-holder">' + newVal + '</span>');
      // RESET THE INPUT
      $btn.click(function(e){
        e.preventDefault();
        $(this).remove();
        $button.show().parent().find('.file-holder').remove();

        $this.wrap('<form>').closest('form').get(0).reset();
        $this.unwrap();
      });
    } else {
      $fakeFile.text(newVal);
    }
  }
};


$(document).ready(function () {
  listChange();
  adjustImage();

  $('.file-wrapper input[type=file]').on('change focus click', SITE.fileInputs);

  //sends users to the full version
  $('#escapeMobile').bind('click', function(e) {
    e.preventDefault();
    setCookie("escapeMobile","true",7);
    $('#responsiveStyle').remove();
    $('#responsiveArStyle').remove();
    $('#returnMobile').css('display', 'inline-block');
  });

  //the user decided they want to switch back to the mobile site
  //remove the cookie and reload the page again as mobile
  $('#returnMobile').bind('click', function(e) {
    e.preventDefault();
    setCookie("escapeMobile","false",7);
    location.reload();
  });

  //remember a users preference, and give them the full site if they want it
  if(getCookie("escapeMobile") == "true")
  {
    $('#responsiveStyle').remove();
    $('#responsiveArStyle').remove();
    $('#returnMobile').css('display', 'inline-block');
  }

  $(window).resize(function() {
    updateContainer();
    listChange();
    adjustImage();
  });
});

//functions to handle cookies
function setCookie(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++)
  {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name)
    {
      return unescape(y);
    }
  }
}