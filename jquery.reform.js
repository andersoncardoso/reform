(function() {

  (function($) {
    if ($ == null) $ = jQuery;
    return $.fn.reform = function(config) {
      var choices;
      choices = {
        method: 'POST',
        action: '.'
      };
      $.extend(choices, config);
      console.dir(choices);
      return console.dir(config);
    };
  })($);

}).call(this);
