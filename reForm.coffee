# reForm.coffee
# This project is licensed under the MIT license terms

# Namespacing
$ = jQuery

json_extend = (defaults, config) ->
    extended_json = {}
    $.extend(true, extended_json, defaults, config)
    extended_json


class ReForm
    constructor: (config) ->
        @defaults =
            form:
                method: 'POST'
                action: '.'
                id: ''
                class: ''
        @choices = json_extend @defaults, config
        console.dir @choices

        @container = $ "##{@choices.container_id}"

        @fields = @choices.fields

    ###
    Set of constructors for some common HTML widgets
    ###
    _common_widgets:
        'text': (field) ->
            """
            <input type="text" class="#{field.input_class}" id="id_#{field.name}" name="#{field.name}" value="#{field.value or ''}">
            """
        'textarea': (field) ->
            """
            <textarea class="#{field.input_class}" id="id_#{field.name}" name="#{field.name}">#{field.value or ''}</textarea>
            """

    # render template to the DOM
    render: () ->

        fields_template = ""

        for f in @fields
            widget = if typeof f.widget is 'string' then \
                        @_common_widgets[f.widget](f) else (new f.widget(f)).render()

            fields_template += """
                <div class="#{f.wrapper_class or 'reform-field-wrapper'}">
                    <label for="id_#{f.name}">#{f.label or f.name}</label>
                    <div class="reform-field-input">
                        #{widget}
                    </div>
                </div>
            """

        form_template = """
            <form action="#{@choices.form.action}"
                  method="#{@choices.form.method}"
                  id="#{@choices.form.id}"
                  class="#{@choices.form.class}">
                #{fields_template}
            </form>
        """
        @container.html form_template
        console.log 'render function'

window.ReForm = ReForm

window.ReFormNS ?= {}
window.ReFormNS.json_extend = json_extend

