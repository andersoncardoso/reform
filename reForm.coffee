# reForm.coffee
# This project is licensed under the MIT license terms

_json_extend = (defaults, config) ->
    ###
    This is ugly and fairly simple. But since underscore doesnt provide a
    deepth object extend method we are impleting our own (again, very simple)
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

        ###
        Field args:
            name: [String] name of the field
            widget: [String] name of a common widget  or
                    [function] constructor for a widget
            wrapper_class: [string] class for the div that wraps the field
            input_class: [string] class for the input field

        ###
        @fields = @choices.fields

    _common_widgets:
        'text': (name) ->
            """
                <input type="text" class="" id="id_#{name}" iname="#{name}">
            """

    render: () ->
        form_id =  if @choices.form.id? then "id='#{@choices.form.id}'" else ""
        form_class = if @choices.form.class? then "class='#{@choices.form.class}'" else ""


        fields_template = ""
        for f in @fields
            widget = if not typeof f.widget is 'string' then f.widget() else @_common_widgets[f.widget](f.name)
            fields_template += """
                <div class="reform-field">
                    <label for="id_#{f.name}">#{f.label or f.name}</label>
                    <div class="reform-field-input">
                        #{widget}
                    </div>
                </div>
            """

        form_template = """
            <form action="#{@choices.form.action}" method="#{@choices.form.method}" #{form_id} #{form_class}>
                #{fields_template}
            </form>
        """
        @wrapper.innerHTML = form_template
        console.log 'render function'

window.ReForm = ReForm

window.ReFormNS ?= {}
window.ReFormNS._json_extend = _json_extend

