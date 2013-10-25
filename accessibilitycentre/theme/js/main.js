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
    fx:     'scrollLeft',
    speed:  'fast',
    timeout: 5000,
    next:   '#nextNews',
    prev:   '#prevNews'
  });

  $('.default').dropkick();
  $('.defaultWhite').dropkick({
    theme: 'white'
  });
  $('.defaultGray').dropkick({
    theme: 'gray'
  });
  var $events = $('.homeEvents');
  $events.find('.item').first().css('border', 'none');

  $('.myAccount').click(function(e){
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('active');
    $('#loginBox').toggle();
  });

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

    $this.find('i').toggleClass('icon-flip-vertical');
    $this.next('ul').toggle().toggleClass('active');
  });
  $('#loginBox').hide();
  $('#loggedinBox').hide();
  $('.downloadBox').hide();

  $('#showLeftPush').click(function(){
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
    if($this.hasClass('active'))
    {
      $parent.css('z-index', 0);
    }
    else
    {
      $parent.css('z-index', 3000);
    }
    $this.toggleClass('active').next('div').toggle();
  });
  $('.blueBox, .blackBox').hide();


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

function listChange(){
  var lag = document.body.clientWidth;
  $('.sessionItem').each(function(){
    var aa = 0;
    var alto = 0;
    var alto2 = 0;
    var $lis = $(this).find('li');
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
          //$this.css('padding-top', 7+(alto2-$this.outerHeight())/2);

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
};
$(document).ready(function () {
  listChange();

  $(window).resize(function() {
    updateContainer();
    listChange();
  });
});