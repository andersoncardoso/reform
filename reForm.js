(function() {
  var ReForm, _json_extend;

  _json_extend = function(defaults, config) {
    /*
        This is ugly and fairly simple. But since underscore doesnt provide a
        deepth object extend method we are impleting our own (again, fairly simple)
    */
    var choices, k, v;
    choices = {};
    for (k in defaults) {
      v = defaults[k];
      choices[k] = v;
    }
    for (k in config) {
      v = config[k];
      if (typeof v === 'object' && defaults[k] && typeof defaults[k] === 'object') {
        choices[k] = _json_extend(defaults[k], v);
      } else {
        choices[k] = v;
      }
    }
    return choices;
  };

  ReForm = (function() {

    function ReForm(config) {
      this.defaults = {
        form: {
          method: 'POST',
          action: '.'
        }
      };
      this.choices = _json_extend(this.defaults, config);
      console.dir(this.choices);
      this.wrapper = document.getElementById(this.choices.wrapper);
    }

    ReForm.prototype.render = function() {
      var form_template;
      form_template = "<form action=\"" + this.choices.form.action + "\" method=\"" + this.choices.form.method + "\">\n    <!-- just place holding for now -->\n</form>";
      this.wrapper.innerHTML = form_template;
      return console.log('render function');
    };

    return ReForm;

  })();

  window.ReForm = ReForm;

  if (window.ReForm_TestNamespace == null) window.ReForm_TestNamespace = {};

  window.ReForm_TestNamespace._json_extend = _json_extend;

}).call(this);
