(function() {

  (function($) {
    if ($ == null) $ = jQuery;
    return $.fn.reform = function(config) {
      var $this, choices, renderForm,
        _this = this;
      $this = $(this);
      choices = {
        form: {
          method: 'POST',
          action: '.'
        }
      };
      $.extend(true, choices, config);
      renderForm = function() {
        if ($this.is('form')) console.log('do nothing');
        return {
          "else": $this.append("<form class=\"\" id=\"\" action=\"" + choices.form.action + "\" method=\"" + choices.form.method + "\">\n\n</form>")
        };
      };
      return renderForm();
    };
  })($);

}).call(this);
