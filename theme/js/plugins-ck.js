window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));

// place any jQuery/helper plugins in here, instead of separate, slower script files.
/**
 * DropKick
 *
 * Highly customizable <select> lists
 * https://github.com/robdel12/DropKick
 *
 * &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
 *                        <http://twitter.com/JamieLottering>
 *
 * History:
 * 2013-02: live > on (joeblynch)
 * 2013-06: + trigger "change" at update (so one can detect the change) (joeri210)
 *          + method: "reload" to rebuild the pulldown (when dynamic populated) (joeri210)
 */
(function ($, window, document) {

  var msVersion = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/),
      msie = !!msVersion,
      ie6 = msie && parseFloat(msVersion[1]) < 7;

  // Help prevent flashes of unstyled content
  if (!ie6) {
    document.documentElement.className = document.documentElement.className + ' dk_fouc';
  }

  var
  // Public methods exposed to $.fn.dropkick()
      methods = {},

  // Cache every <select> element that gets dropkicked
      lists   = [],

  // Convenience keys for keyboard navigation
      keyMap = {
        'left'  : 37,
        'up'    : 38,
        'right' : 39,
        'down'  : 40,
        'enter' : 13,
        'tab'	  : 9
      },

  // HTML template for the dropdowns
      dropdownTemplate = [
        '<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">',
        '<a class="dk_toggle">',
        '<span class="dk_label">{{ label }}</span>',
        '</a>',
        '<div class="dk_options">',
        '<ul class="dk_options_inner">',
        '</ul>',
        '</div>',
        '</div>'
      ].join(''),

  // HTML template for dropdown options
      optionTemplate = '<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}">{{ text }}</a></li>',

  // Some nice default values
      defaults = {
        startSpeed : 1000,  // I recommend a high value here, I feel it makes the changes less noticeable to the user
        theme  : false,
        change : false
      },

  // Make sure we only bind keydown on the document once
      keysBound = false
      ;

  // Called by using $('foo').dropkick();
  methods.init = function (settings) {
    settings = $.extend({}, defaults, settings);

    return this.each(function () {
      var
      // The current <select> element
          $select = $(this),

      // Store a reference to the originally selected <option> element
          $original = $select.find(':selected').first(),

      // Save all of the <option> elements
          $options = $select.find('option'),

      // We store lots of great stuff using jQuery data
          data = $select.data('dropkick') || {},

      // This gets applied to the 'dk_container' element
          id = $select.attr('id') || $select.attr('name'),

      // This gets updated to be equal to the longest <option> element
          width  = settings.width || $select.outerWidth(),

      // Check if we have a tabindex set or not
          tabindex  = $select.attr('tabindex') ? $select.attr('tabindex') : '',

      // The completed dk_container element
          $dk = false,

          theme
          ;

      // Dont do anything if we've already setup dropkick on this element
      if (data.id) {
        return $select;
      } else {
        data.settings  = settings;
        data.tabindex  = tabindex;
        data.id        = id;
        data.$original = $original;
        data.$select   = $select;
        data.value     = _notBlank($select.val()) || _notBlank($original.attr('value'));
        data.label     = $original.text();
        data.options   = $options;
      }

      // Build the dropdown HTML
      $dk = _build(dropdownTemplate, data);

      // Make the dropdown fixed width if desired
      $dk.find('.dk_toggle').css({
        'width' : width + 'px'
      });

      // Hide the <select> list and place our new one in front of it
      $select.before($dk);

      // Update the reference to $dk
      $dk = $('#dk_container_' + id).fadeIn(settings.startSpeed);

      // Save the current theme
      theme = settings.theme ? settings.theme : 'default';
      $dk.addClass('dk_theme_' + theme);
      data.theme = theme;

      // Save the updated $dk reference into our data object
      data.$dk = $dk;

      // Save the dropkick data onto the <select> element
      $select.data('dropkick', data);

      // Do the same for the dropdown, but add a few helpers
      $dk.data('dropkick', data);

      lists[lists.length] = $select;

      // Focus events
      $dk.bind('focus.dropkick', function (e) {
        $dk.addClass('dk_focus');
      }).bind('blur.dropkick', function (e) {
            $dk.removeClass('dk_open dk_focus');
          });

      setTimeout(function () {
        $select.hide();
      }, 0);
    });
  };

  // Allows dynamic theme changes
  methods.theme = function (newTheme) {
    var
        $select   = $(this),
        list      = $select.data('dropkick'),
        $dk       = list.$dk,
        oldtheme  = 'dk_theme_' + list.theme
        ;

    $dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

    list.theme = newTheme;
  };

  // Reset all <selects and dropdowns in our lists array
  methods.reset = function () {
    for (var i = 0, l = lists.length; i < l; i++) {
      var
          listData  = lists[i].data('dropkick'),
          $dk       = listData.$dk,
          $current  = $dk.find('li').first()
          ;

      $dk.find('.dk_label').text(listData.label);
      $dk.find('.dk_options_inner').animate({ scrollTop: 0 }, 0);

      _setCurrent($current, $dk);
      _updateFields($current, $dk, true);
    }
  };

  // Reload / rebuild, in case of dynamic updates etc.
  // Credits to Jeremy (http://stackoverflow.com/users/1380047/jeremy-p)
  methods.reload = function () {
    var $select = $(this);
    var data = $select.data('dropkick');
    $select.removeData("dropkick");
    $("#dk_container_"+ data.id).remove();
    $select.dropkick(data.settings);
  };

  // Expose the plugin
  $.fn.dropkick = function (method) {
    if (!ie6) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
      }
    }
  };

  // private
  function _handleKeyBoardNav(e, $dk) {
    var
        code     = e.keyCode,
        data     = $dk.data('dropkick'),
        options  = $dk.find('.dk_options'),
        open     = $dk.hasClass('dk_open'),
        current  = $dk.find('.dk_option_current'),
        first    = options.find('li').first(),
        last     = options.find('li').last(),
        next,
        prev
        ;

    switch (code) {
      case keyMap.enter:
        if (open) {
          _updateFields(current.find('a'), $dk);
          _closeDropdown($dk);
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
        break;

      case keyMap.tab:
        if(open){
          _updateFields(current.find('a'), $dk);
          _closeDropdown($dk);
        }
        break;

      case keyMap.up:
        prev = current.prev('li');
        if (open) {
          if (prev.length) {
            _setCurrent(prev, $dk);
          } else {
            _setCurrent(last, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
        break;

      case keyMap.down:
        if (open) {
          next = current.next('li').first();
          if (next.length) {
            _setCurrent(next, $dk);
          } else {
            _setCurrent(first, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
        break;

      default:
        break;
    }
  }

  // Update the <select> value, and the dropdown label
  function _updateFields(option, $dk, reset) {
    var value, label, data;

    value = option.attr('data-dk-dropdown-value');
    label = option.text();
    data  = $dk.data('dropkick');

    $select = data.$select;
    $select.val(value).trigger('change'); // Added to let it act like a normal select

    $dk.find('.dk_label').text(label);

    reset = reset || false;

    if (data.settings.change && !reset) {
      data.settings.change.call($select, value, label);
    }
  }

  // Set the currently selected option
  function _setCurrent($current, $dk) {
    $dk.find('.dk_option_current').removeClass('dk_option_current');
    $current.addClass('dk_option_current');

    _setScrollPos($dk, $current);
  }

  function _setScrollPos($dk, anchor) {
    var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
    $dk.find('.dk_options_inner').animate({ scrollTop: height + 'px' }, 0);
  }

  // Close a dropdown
  function _closeDropdown($dk) {
    $dk.removeClass('dk_open');
  }

  // Open a dropdown
  function _openDropdown($dk) {
    var data = $dk.data('dropkick');
    $dk.find('.dk_options').css({ top : $dk.find('.dk_toggle').outerHeight() - 1 });
    $dk.toggleClass('dk_open');

  }

  /**
   * Turn the dropdownTemplate into a jQuery object and fill in the variables.
   */
  function _build (tpl, view) {
    var
    // Template for the dropdown
        template  = tpl,
    // Holder of the dropdowns options
        options   = [],
        $dk
        ;

    template = template.replace('{{ id }}', view.id);
    template = template.replace('{{ label }}', view.label);
    template = template.replace('{{ tabindex }}', view.tabindex);

    if (view.options && view.options.length) {
      for (var i = 0, l = view.options.length; i < l; i++) {
        var
            $option   = $(view.options[i]),
            current   = 'dk_option_current',
            oTemplate = optionTemplate
            ;

        oTemplate = oTemplate.replace('{{ value }}', $option.val());
        oTemplate = oTemplate.replace('{{ current }}', (_notBlank($option.val()) === view.value) ? current : '');
        oTemplate = oTemplate.replace('{{ text }}', $option.text());

        options[options.length] = oTemplate;
      }
    }

    $dk = $(template);
    $dk.find('.dk_options_inner').html(options.join(''));

    return $dk;
  }

  function _notBlank(text) {
    return ($.trim(text).length > 0) ? text : false;
  }

  $(function () {

    // Handle click events on the dropdown toggler
    $(document).on('click', '.dk_toggle', function (e) {
      var $dk  = $(this).parents('.dk_container').first();

      _openDropdown($dk);

      if ("ontouchstart" in window) {
        $dk.addClass('dk_touch');
        $dk.find('.dk_options_inner').addClass('scrollable vertical');
      }

      e.preventDefault();
      return false;
    });

    // Handle click events on individual dropdown options
    $(document).on((msie ? 'mousedown' : 'click'), '.dk_options a', function (e) {
      var
          $option = $(this),
          $dk     = $option.parents('.dk_container').first(),
          data    = $dk.data('dropkick')
          ;

      _closeDropdown($dk);
      _updateFields($option, $dk);
      _setCurrent($option.parent(), $dk);

      e.preventDefault();
      return false;
    });

    // Setup keyboard nav
    $(document).bind('keydown.dk_nav', function (e) {
      var
      // Look for an open dropdown...
          $open    = $('.dk_container.dk_open'),

      // Look for a focused dropdown
          $focused = $('.dk_container.dk_focus'),

      // Will be either $open, $focused, or null
          $dk = null
          ;

      // If we have an open dropdown, key events should get sent to that one
      if ($open.length) {
        $dk = $open;
      } else if ($focused.length && !$open.length) {
        // But if we have no open dropdowns, use the focused dropdown instead
        $dk = $focused;
      }

      if ($dk) {
        _handleKeyBoardNav(e, $dk);
      }
    });

    // Globally handle a click outside of the dropdown list by closing it.
    $(document).on('click', null, function(e) {
      if($(e.target).closest(".dk_container").length == 0) {
        _closeDropdown($('.dk_toggle').parents(".dk_container").first());
      }
    });
  });
})(jQuery, window, document);


// le weather
//$(function(){
var vez = 0;
function locationSuccess(position) {

  try{
    // Retrive the cache
    var cache = localStorage.weatherCache && JSON.parse(localStorage.weatherCache);
    var d = new Date();

    // If the cache is newer than 30 minutes, use the cache
    if(cache && cache.timestamp && cache.timestamp > d.getTime() - 30*60*1000){

      if(cache.data.sys.country == 'US'){
        DEG = 'F';
      }
      else{
        DEG = 'C';
      }

      // Get the offset from UTC (turn the offset minutes into ms)
      var offset = d.getTimezoneOffset()*60*1000;

      $('#weather').html(cache.data.name +
          '&nbsp;&nbsp;&nbsp;&nbsp;<img src="/theme/img/icons/'+
          cache.data.weather[0].icon
          +'.png" alt="" width="22" height="22" />&nbsp;&nbsp;&nbsp;'+
          convertTemperature(cache.data.main.temp) + '°' + DEG);

    }else{
      // If the cache is old or nonexistent, issue a new AJAX request
      var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+
          '&lon='+position.coords.longitude+'&callback=?';


      $.getJSON(weatherAPI, function(response){
        // Store the cache
        localStorage.weatherCache = JSON.stringify({
          timestamp:(new Date()).getTime(),	// getTime() returns milliseconds
          data: response
        });


        if(vez == 0)
        {
          $("#locationList").prepend("<option value='lat=" + response.coord.lat + '&lon='+ response.coord.lat + "' selected='selected'>"+ response.name +"</option>");
          vez++;
        }

        // Call the function again
        locationSuccess(position);
      });

    }

  }
  catch(e){
    showError("We can't find information about your city!");
    window.console && console.error(e);
  }
}

// Error handling functions
function locationError(error){
  switch(error.code) {
    case error.TIMEOUT:
      showError("A timeout occured! Please try again!");
      break;
    case error.POSITION_UNAVAILABLE:
      showError('We can\'t detect your location. Sorry!');
      break;
    case error.PERMISSION_DENIED:
      showError('Please allow geolocation access for this to work.');
      break;
    case error.UNKNOWN_ERROR:
      showError('An unknown error occured!');
      break;
  }

}

function convertTemperature(kelvin){
  // Convert the temperature to either Celsius or Fahrenheit:
  return Math.round(DEG == 'C' ? (kelvin - 273.15) : (kelvin*9/5 - 459.67));
}

function showError(msg){
  $('#weather').addClass('error').html(msg);
}

  //* Configuration *//
  //var $weatherDiv = $('#weather');
  //var $scroller = $('#scroller');
//  var $location = $('p.location');

$(document).ready(function(){
// Does this browser support geolocation?
  /*/
  if (navigator.geolocation) {
    var cache = localStorage.weatherCache && JSON.parse(localStorage.weatherCache);
    var d = new Date();
    if(cache && cache.timestamp && cache.timestamp > d.getTime() - 30*60*1000){
      locationSuccess();
    }
    else
    {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }
  }
  else{
    showError("Your browser does not support Geolocation!");
  }
  /**/

  // Get user's location, and use OpenWeatherMap
  // to get the location name and weather forecast
})


function scrollMobile(){
  // Set a timeout...
  setTimeout(function(){
    if(screen.width > 980 || screen.height > 980) return;
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);
}
// When ready...
if (window.addEventListener){
  window.addEventListener('load', scrollMobile, false);
} else if (window.attachEvent){
  window.attachEvent('load', scrollMobile);
}

function getWeather(coords){
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?'+ coords +'&callback=?';

  $.getJSON(weatherAPI, function(response){
    // Store the cache
    localStorage.weatherCache = JSON.stringify({
      timestamp:(new Date()).getTime(),	// getTime() returns milliseconds
      data: response
    });

    // Call the function again
    locationSuccess(coords);
  });
}


(function(jQuery) {
  jQuery.fn.clickoutside = function(callback) {
    var outside = 1, self = $(this);
    self.cb = callback;
    this.click(function() {
      outside = 0;
    });
    $(document).click(function() {
      outside && self.cb();
      outside = 1;
    });
    return $(this);
  }
})(jQuery);