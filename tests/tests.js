(function() {
  var rf,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  rf = window.ReForm;

  module('Base Widget Tests', {
    setup: function() {
      var SimpleWidget;
      SimpleWidget = (function(_super) {

        __extends(SimpleWidget, _super);

        function SimpleWidget() {
          SimpleWidget.__super__.constructor.apply(this, arguments);
        }

        SimpleWidget.prototype.template = '<input name="<%=name%>" value="<%=value%>">';

        return SimpleWidget;

      })(rf.Widget);
      return this.widget = new SimpleWidget({
        name: 'my widget'
      });
    }
  });

  test('Simple Instance tests', function() {
    return ok(this.widget);
  });

}).call(this);
