(function() {
  var ReForm, _json_extend;

  _json_extend = function(defaults, config) {
    /*
        This is ugly and fairly simple. But since underscore doesnt provide a
        deepth object extend method we are impleting our own (again, very simple)
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
      /*
              Field args:
                  name: [String] name of the field
                  widget: [String] name of a common widget  or
                          [function] constructor for a widget
                  wrapper_class: [string] class for the div that wraps the field
                  input_class: [string] class for the input field
      */
      this.fields = this.choices.fields;
    }

    ReForm.prototype._common_widgets = {
      'text': function(name) {
        return "<input type=\"text\" class=\"\" id=\"id_" + name + "\" iname=\"" + name + "\">";
      }
    };

    ReForm.prototype.render = function() {
      var f, fields_template, form_class, form_id, form_template, widget, _i, _len, _ref;
      form_id = this.choices.form.id != null ? "id='" + this.choices.form.id + "'" : "";
      form_class = this.choices.form["class"] != null ? "class='" + this.choices.form["class"] + "'" : "";
      fields_template = "";
      _ref = this.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        widget = !typeof f.widget === 'string' ? f.widget() : this._common_widgets[f.widget](f.name);
        fields_template += "<div class=\"reform-field\">\n    <label for=\"id_" + f.name + "\">" + (f.label || f.name) + "</label>\n    <div class=\"reform-field-input\">\n        " + widget + "\n    </div>\n</div>";
      }
      form_template = "<form action=\"" + this.choices.form.action + "\" method=\"" + this.choices.form.method + "\" " + form_id + " " + form_class + ">\n    " + fields_template + "\n</form>";
      this.wrapper.innerHTML = form_template;
      return console.log('render function');
    };

    return ReForm;

  })();

  window.ReForm = ReForm;

  if (window.ReFormNS == null) window.ReFormNS = {};

  window.ReFormNS._json_extend = _json_extend;

}).call(this);
