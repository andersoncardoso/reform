# namespace
rf = window.ReForm


# =========== Widgets Tests ===========
#
module 'Base Widget Tests',
    setup: ->
        class SimpleWidget extends rf.Widget
            template: '''<input name="<%=name%>" value="<%=value%>">'''

        @widget = new SimpleWidget {name: 'my widget'}

test 'Simple Instance tests', () ->
    ok @widget


# =========== Form Tests ==============
#
# test 'Base Form Tests', () ->

