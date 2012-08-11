(function() {
  var $, ReForm, json_extend;

  $ = jQuery;

  json_extend = function(defaults, config) {
    var extended_json;
    extended_json = {};
    $.extend(true, extended_json, defaults, config);
    return extended_json;
  };

  ReForm = (function() {

    function ReForm(config) {
      this.defaults = {
        form: {
          method: 'POST',
          action: '.',
          id: '',
          "class": '',
          submit_button: true,
          submit_button_label: 'send'
        }
      };
      this.choices = json_extend(this.defaults, config);
      console.dir(this.choices);
      this.container = $("#" + this.choices.container_id);
      this.fields = this.choices.fields;
    }

    /*
        Set of constructors for some common HTML widgets
    */

    ReForm.prototype._common_widgets = {
      'text': function(field) {
        return "<input type=\"text\" class=\"" + field.input_class + "\" id=\"id_" + field.name + "\" name=\"" + field.name + "\" value=\"" + (field.value || '') + "\">";
      },
      'textarea': function(field) {
        return "<textarea class=\"" + field.input_class + "\" id=\"id_" + field.name + "\" name=\"" + field.name + "\">" + (field.value || '') + "</textarea>";
      }
    };

    ReForm.prototype.render = function() {
      var f, fields_template, form_template, submit, widget, _i, _len, _ref;
      fields_template = "";
      _ref = this.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        widget = typeof f.widget === 'string' ? this._common_widgets[f.widget](f) : (new f.widget(f)).render();
        fields_template += "<div class=\"" + (f.wrapper_class || 'reform-field-wrapper') + "\">\n    <label for=\"id_" + f.name + "\">" + (f.label || f.name) + "</label>\n    <div class=\"reform-field-input\">\n        " + widget + "\n    </div>\n</div>";
      }
      submit = '';
      if (this.choices.form.submit_button) {
        submit = "<div class=\"reform-field-wrapper\">\n    <input type=\"submit\" value=\"" + this.choices.form.submit_button_label + "\">\n</div>";
      }
      form_template = "<form action=\"" + this.choices.form.action + "\"\n      method=\"" + this.choices.form.method + "\"\n      id=\"" + this.choices.form.id + "\"\n      class=\"" + this.choices.form["class"] + "\">\n    " + fields_template + "\n\n    " + submit + "\n</form>";
      return this.container.html(form_template);
    };

    ReForm.prototype.clean = function() {
      var fields;
      if (this.choices.form.id) {
        fields = this.container.find("#" + this.choices.form.id + " :input");
      } else {
        fields = this.container.find('form :input');
      }
      return fields.each(function() {
        var tag, type;
        type = this.type;
        tag = this.tagName.toLowerCase();
        if (type === 'text' || type === 'password' || tag === 'textarea') {
          return jQuery(this).val('');
        } else if (type === 'hidden') {
          return jQuery(this).val('');
        } else if (type === 'checkbox' || type === 'radio') {
          return jQuery(this).attr('checked', false);
        } else if (tag === 'select') {
          return jQuery(this).val('');
        }
      });
    };

    ReForm.prototype.toJson = function() {};

    ReForm.prototype.submit = function() {};

    return ReForm;

  })();

  window.ReForm = ReForm;

  if (window.ReFormNS == null) window.ReFormNS = {};

  window.ReFormNS.json_extend = json_extend;

}).call(this);
