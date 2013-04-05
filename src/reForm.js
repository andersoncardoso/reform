(function() {
  var CheckboxWidget, DropdownWidget, FormView, HiddenWidget, PasswordWidget, TextAreaWidget, TextWidget, Widget, checkboxTemplate, dropdownTemplate, fieldTemplate, formTemplate, textTemplate, textareaTemplate,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  formTemplate = "<form action=\"\" method=\"post\" id=\"<%= formId %>\" >\n    <div>\n        <input type=\"submit\" name=\"submit\" value=\"<%=submit_label%>\" />\n    </div>\n</form>";

  fieldTemplate = "<div class=\"field-container <%=container_class%>\" for=\"<%=name%>\" >\n    <label><%=label%></label>\n    <div class=\"widget-container\">\n    </div>\n</div>";

  textTemplate = "<input type=\"<%=type%>\" name=\"<%=name%>\" value=\"<%=value%>\" id=\"id_<%=name%>\" <%=attrs%> />";

  textareaTemplate = "<textarea name=\"<%=name%>\" id=\"id_<%=name%>\" <%=attrs%>><%=value%></textarea>";

  checkboxTemplate = "<label>\n  <input type=\"checkbox\" name=\"<%=name%>\" value=\"<%=choice_value%>\" id=\"id_<%=name%>_<%=choice_num%>\" class=\"checkbox\" />\n  <%=choice_title%>\n</label>";

  dropdownTemplate = "<select name=\"<%=name%>\" id=\"id_<%=name%>\" <%=attrs%>>\n  <%_.each(choices, function (choice) {%>\n    <option value=\"<%=choice.value%>\" <%=choice.attrs%>><%=choice.title%></option>\n  <% }); %>\n</select>";

  Widget = (function(_super) {

    __extends(Widget, _super);

    function Widget() {
      Widget.__super__.constructor.apply(this, arguments);
    }

    Widget.prototype.initialize = function() {
      var _base;
      _.bindAll(this);
      this._template = _.template(this.template);
      if ((_base = this.options).attrs == null) _base.attrs = '';
      return this.name = this.options.name;
    };

    Widget.prototype.render = function() {
      this.$el.html(this._template(this.options));
      if (typeof this.behavior === "function") this.behavior();
      return this;
    };

    Widget.prototype.getInputElement = function() {
      return this.$("input[name=" + this.name + "]");
    };

    Widget.prototype.set = function(value) {
      return this.getInputElement().val(value);
    };

    Widget.prototype.get = function() {
      return this.getInputElement().val();
    };

    Widget.prototype.validate = function() {
      return true;
    };

    return Widget;

  })(Backbone.View);

  TextWidget = (function(_super) {

    __extends(TextWidget, _super);

    function TextWidget() {
      TextWidget.__super__.constructor.apply(this, arguments);
    }

    TextWidget.prototype.template = textTemplate;

    TextWidget.prototype.initialize = function() {
      this.options.type = 'text';
      return TextWidget.__super__.initialize.apply(this, arguments);
    };

    return TextWidget;

  })(Widget);

  HiddenWidget = (function(_super) {

    __extends(HiddenWidget, _super);

    function HiddenWidget() {
      HiddenWidget.__super__.constructor.apply(this, arguments);
    }

    HiddenWidget.prototype.template = textTemplate;

    HiddenWidget.prototype.initialize = function() {
      this.options.type = 'hidden';
      return HiddenWidget.__super__.initialize.apply(this, arguments);
    };

    return HiddenWidget;

  })(Widget);

  PasswordWidget = (function(_super) {

    __extends(PasswordWidget, _super);

    function PasswordWidget() {
      PasswordWidget.__super__.constructor.apply(this, arguments);
    }

    PasswordWidget.prototype.template = textTemplate;

    PasswordWidget.prototype.initialize = function() {
      this.options.type = 'password';
      this.options.value = '';
      this.options.attrs = 'autocomplete="off"';
      return PasswordWidget.__super__.initialize.apply(this, arguments);
    };

    return PasswordWidget;

  })(Widget);

  TextAreaWidget = (function(_super) {

    __extends(TextAreaWidget, _super);

    function TextAreaWidget() {
      TextAreaWidget.__super__.constructor.apply(this, arguments);
    }

    TextAreaWidget.prototype.template = textareaTemplate;

    TextAreaWidget.prototype.getInputElement = function() {
      return this.$('textarea');
    };

    return TextAreaWidget;

  })(Widget);

  CheckboxWidget = (function(_super) {

    __extends(CheckboxWidget, _super);

    function CheckboxWidget() {
      CheckboxWidget.__super__.constructor.apply(this, arguments);
    }

    CheckboxWidget.prototype.template = checkboxTemplate;

    CheckboxWidget.prototype.render = function() {
      var args, idx, option, renderedChoice, _ref;
      this.$el.html('');
      _ref = this.options.choices;
      for (idx in _ref) {
        option = _ref[idx];
        args = _.extend(this.options, {
          choice_value: option.value,
          choice_title: option.title,
          choice_num: idx + 1
        });
        renderedChoice = this._template(args);
        this.$el.append(renderedChoice);
      }
      return this;
    };

    CheckboxWidget.prototype.set = function(value) {
      if (value) {
        return this.$("input[value=" + value + "]").attr('checked', true);
      } else {
        return this.$(":checked").attr('checked', false);
      }
    };

    CheckboxWidget.prototype.get = function() {
      var checked;
      checked = this.$(":checked");
      if (checked.length) {
        return checked.val();
      } else {
        return '';
      }
    };

    return CheckboxWidget;

  })(Widget);

  DropdownWidget = (function(_super) {

    __extends(DropdownWidget, _super);

    function DropdownWidget() {
      DropdownWidget.__super__.constructor.apply(this, arguments);
    }

    DropdownWidget.prototype.template = dropdownTemplate;

    DropdownWidget.prototype.initialize = function() {
      var _base;
      if ((_base = this.options).choices == null) _base.choices = [];
      return DropdownWidget.__super__.initialize.apply(this, arguments);
    };

    DropdownWidget.prototype.getInputElement = function() {
      return this.$("select[name=" + this.options.name + "]");
    };

    return DropdownWidget;

  })(Widget);

  FormView = (function(_super) {

    __extends(FormView, _super);

    function FormView() {
      FormView.__super__.constructor.apply(this, arguments);
    }

    FormView.prototype.template = formTemplate;

    FormView.prototype.initialize = function() {
      var cb_name, event, _ref, _ref2, _ref3, _ref4;
      _.bindAll(this);
      this._template = _.template(this.template);
      if ((_ref = this.options) != null ? _ref.model : void 0) {
        this.model = this.options.model;
      }
      this.patch = (_ref2 = (_ref3 = this.options) != null ? _ref3.patch : void 0) != null ? _ref2 : false;
      this.renderedFields = [];
      this.instances = {};
      this.on('submit', this.save);
      if (!(this.events != null)) this.events = {};
      _ref4 = this.events;
      for (event in _ref4) {
        cb_name = _ref4[event];
        this.on(event, this[cb_name]);
      }
      return this.initializeFields();
    };

    FormView.prototype.render = function() {
      var id, renderedField, renderedFormTemplate, submit_label, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4,
        _this = this;
      _ref = this.renderedFields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        renderedField = _ref[_i];
        renderedField.detach();
      }
      id = ((_ref2 = this.options) != null ? _ref2.formId : void 0) || '';
      submit_label = ((_ref3 = this.options) != null ? _ref3.submit_label : void 0) || (_.isFunction(window.i18n) ? i18n('send') : 'send');
      renderedFormTemplate = this._template({
        formId: id,
        submit_label: submit_label
      });
      this.$el.html(renderedFormTemplate);
      _ref4 = this.renderedFields;
      for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
        renderedField = _ref4[_j];
        this.$el.find('form').prepend(renderedField);
      }
      this.$el.find('form').submit(function(evt) {
        evt.preventDefault();
        _this.trigger('submit');
        return false;
      });
      if (this.model && !_.isEmpty(this.model.toJSON())) {
        this.set(this.model.toJSON());
      }
      return this;
    };

    FormView.prototype.remove = function() {
      FormView.__super__.remove.apply(this, arguments);
      this.clearInstances();
      return this.clearRenderedFields();
    };

    FormView.prototype.clearInstances = function() {
      var instance, name, _ref, _results;
      _ref = this.instances;
      _results = [];
      for (name in _ref) {
        instance = _ref[name];
        instance.remove();
        _results.push(this.instances[name] = null);
      }
      return _results;
    };

    FormView.prototype.clearRenderedFields = function() {
      var renderedField, _i, _len, _ref;
      _ref = this.renderedFields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        renderedField = _ref[_i];
        renderedField.remove();
      }
      return this.renderedFields.length = 0;
    };

    FormView.prototype.initializeFields = function() {
      var args, container, field, renderedField, widget, _fieldTemplate, _i, _len, _ref, _results;
      _ref = this.fields.slice(0).reverse();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        args = {
          name: field.name,
          input_id: "id_" + field.name,
          label: field.label || '',
          value: field.value || '',
          container_class: field.container_class || ''
        };
        args = _.extend(args, field.args || {});
        widget = new field.widget(args);
        this.instances[field.name] = widget;
        _fieldTemplate = _.template(fieldTemplate);
        container = $('<div>').html(_fieldTemplate(args));
        renderedField = container.children().detach();
        renderedField.find('.widget-container').append(widget.render().el);
        this.$('form').prepend(renderedField);
        _results.push(this.renderedFields.push(renderedField));
      }
      return _results;
    };

    FormView.prototype.disableSubmit = function() {
      return this.$('input[type=submit]').attr('disabled', 'disabled');
    };

    FormView.prototype.enableSubmit = function() {
      return this.$('input[type=submit]').removeAttr('disabled');
    };

    FormView.prototype.save = function() {
      var is_valid, name, nm, validate, widget, _errs, _ref,
        _this = this;
      this.cleanErrors();
      is_valid = this.events.hasOwnProperty('validation') ? this[this.events.validation]() : true;
      _errs = {};
      _ref = this.instances;
      for (name in _ref) {
        widget = _ref[name];
        validate = widget.validate();
        if (!validate) {
          is_valid = false;
          nm = widget.errorTargetName || name;
          _errs[nm] = widget.error;
        }
      }
      if (!_.isEmpty(_errs)) this.errors(_errs);
      if (is_valid) {
        this.disableSubmit();
        return this.model.save(this.get(), {
          wait: true,
          patch: this.patch,
          success: function(model, resp) {
            _this.cleanErrors();
            _this.enableSubmit();
            if (resp.redirect) {
              if (window.location.pathname === resp.redirect) {
                window.location.reload();
              } else {
                window.location = resp.redirect;
              }
            }
            return _this.trigger('success', resp);
          },
          error: function(model, resp) {
            _this.enableSubmit();
            resp = JSON.parse(resp.responseText);
            _this.cleanErrors();
            _this.errors(resp.errors || {});
            return _this.trigger('error', resp);
          }
        });
      }
    };

    FormView.prototype.errors = function(vals) {
      var field, msg, name, submit_btn;
      this._errors = {};
      if (vals) {
        this._errors = _.extend(this._errors, vals);
        for (name in vals) {
          msg = vals[name];
          if (name === '__all__') {
            submit_btn = this.$("input[type=submit]");
            if (submit_btn.length && !submit_btn.parent().find('small.error').length) {
              submit_btn.before("<small class='error'>" + msg + "</small>");
            }
          }
          field = this.$(".field-container[for=" + name + "]");
          field.find("#id_" + name).addClass('error');
          field.find("label").addClass('error');
          if (!field.find("small.error").length) {
            field.find(".widget-container").after("<small class='error'>" + msg + "</smalll>");
          }
        }
      } else {
        return this._errors;
      }
    };

    FormView.prototype.cleanErrors = function() {
      var name, widget, _ref;
      this.errors({});
      _ref = this.instances;
      for (name in _ref) {
        widget = _ref[name];
        delete widget.error;
        delete widget.errorTargetName;
      }
      this.$('small.error').remove();
      return this.$('.error').removeClass('error');
    };

    FormView.prototype.get = function(fieldName) {
      var field, vals, _i, _len, _ref;
      if (fieldName == null) fieldName = '__all__';
      if (fieldName === '__all__') {
        vals = {};
        _ref = this.fields;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          vals[field.name] = this.instances[field.name].get();
        }
        return vals;
      } else {
        field = _.find(this.fields, function(f) {
          return f.name === fieldName;
        });
        return this.instances[field.name].get();
      }
    };

    FormView.prototype.set = function(vals) {
      var key, value, _ref, _results;
      if (vals == null) vals = {};
      _results = [];
      for (key in vals) {
        value = vals[key];
        _results.push((_ref = this.instances[key]) != null ? typeof _ref.set === "function" ? _ref.set(value) : void 0 : void 0);
      }
      return _results;
    };

    return FormView;

  })(Backbone.View);

  window.ReForm = {
    Form: FormView,
    Widget: Widget,
    commonWidgets: {
      TextWidget: TextWidget,
      PasswordWidget: PasswordWidget,
      HiddenWidget: HiddenWidget,
      TextAreaWidget: TextAreaWidget,
      CheckboxWidget: CheckboxWidget,
      DropdownWidget: DropdownWidget
    }
  };

  if (typeof define === "function" && define.amd) {
    define(function() {
      return window.ReForm;
    });
  }

}).call(this);
