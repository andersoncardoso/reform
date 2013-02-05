(function() {
  var AnnoyingWidget, DummyModel, FormView;

  AnnoyingWidget = ReForm.Widget.extend({
    template: "<input class=\"annoying\" type=\"text\" name=\"<%=name%>\" id=id_\"<%=name%>\" value=\"<%=value%>\">",
    behavior: function() {
      var _this = this;
      return this.$el.find('.annoying').click(function(evt) {
        alert('heey, stop it!!!');
        return $(evt.target).blur();
      });
    }
  });

  FormView = ReForm.Form.extend({
    fields: [
      {
        name: 'title',
        widget: ReForm.commonWidgets.TextWidget,
        label: 'Title:'
      }, {
        name: 'passwd',
        widget: ReForm.commonWidgets.PasswordWidget,
        label: 'Password:'
      }, {
        name: 'desc',
        widget: ReForm.commonWidgets.TextAreaWidget,
        label: 'Description:'
      }, {
        name: 'dropdown',
        widget: ReForm.commonWidgets.DropdownWidget,
        label: 'Dropdown:',
        args: {
          choices: [
            {
              value: 'foo',
              title: 'Foo'
            }, {
              value: 'bar',
              title: 'Bar'
            }
          ]
        }
      }, {
        name: 'yes-no',
        widget: ReForm.commonWidgets.CheckboxWidget,
        args: {
          choices: [
            {
              value: 'true',
              title: 'Yes or No?'
            }
          ]
        }
      }, {
        name: 'annoying',
        widget: AnnoyingWidget,
        label: 'dont you dare clicking on me:'
      }
    ],
    events: {
      'success': 'onSuccess',
      'error': 'onError'
    },
    onSuccess: function(data) {
      console.log('ON SUCCESS CALLED!');
      return console.dir(data);
    },
    onError: function(data) {
      console.log('ON ERROR CALLED!');
      return console.dir(data);
    }
  });

  DummyModel = Backbone.Model.extend({
    save: function(data, opts) {
      console.log('DummyModel save!');
      return {};
    }
  });

  $(function() {
    var myForm;
    myForm = new FormView({
      formId: 'some_id',
      model: new DummyModel({
        title: 'Initial Data',
        'yes-no': true,
        dropdown: 'bar'
      })
    });
    $('#my-form-wrapper').html(myForm.render().el);
    return window.form = myForm;
  });

}).call(this);
