# reForm.coffee
# This project is licensed under the MIT license terms

_json_extend = (defaults, config) ->
    ###
    This is ugly and fairly simple. But since underscore doesnt provide a
    deepth object extend method we are impleting our own (again, fairly simple)
    ###
    choices = {}
    for k, v of defaults
        choices[k] = v
    for k, v of config
        if typeof v is 'object' and defaults[k] and typeof defaults[k] is 'object'
            choices[k] = _json_extend defaults[k], v
        else
            choices[k] = v
    choices

class ReForm
    constructor: (config) ->
        @defaults =
            form:
                method: 'POST'
                action: '.'
        @choices = _json_extend(@defaults, config)
        console.dir @choices

        @wrapper = document.getElementById @choices.wrapper

    render: () ->
        form_template = """
            <form action="#{@choices.form.action}" method="#{@choices.form.method}">
                <!-- just place holding for now -->
            </form>
        """
        @wrapper.innerHTML = form_template
        console.log 'render function'

window.ReForm = ReForm

window.ReForm_TestNamespace ?= {}
window.ReForm_TestNamespace._json_extend = _json_extend

