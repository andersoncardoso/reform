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
        label: 'Todo:'
      }, {
        name: 'desc',
        widget: ReForm.commonWidgets.TextAreaWidget,
        label: 'Description:'
      }, {
        name: 'annoying',
        widget: AnnoyingWidget,
        label: 'dont you dare clicking on me:'
      }
    ],
    initialize: function() {
      ReForm.Form.prototype.initialize.apply(this, this.options);
      this.bind('success', this.onSuccess);
      return this.bind('error', this.onError);
    },
    onSuccess: function(data) {
      console.log('ON SUCCESS');
      return console.dir(data);
    },
    onError: function(data) {
      console.log('ON ERROR');
      return console.dir(data);
    }
  });

  DummyModel = Backbone.Model.extend({
    save: function(data, opts) {
      return console.log('DummyModel save!');
    }
  });

  $(function() {
    var myForm;
    myForm = new FormView({
      formId: 'some_id',
      model: new DummyModel({
        a: 'bb'
      })
    });
    $('#my-form-wrapper').html(myForm.render().el);
    return window.form = myForm;
  });

}).call(this);
