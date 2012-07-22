(function() {
  var ReForm, _json_extend;

  _json_extend = function(defaults, config) {
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
      this.config = config;
      console.log('reForm constructor');
      console.dir(this.config);
    }

    ReForm.prototype.render = function() {
      return console.log('render function');
    };

    return ReForm;

  })();

  window.ReForm = ReForm;

  if (window.ReForm_TestNamespace == null) window.ReForm_TestNamespace = {};

  window.ReForm_TestNamespace._json_extend = _json_extend;

}).call(this);
