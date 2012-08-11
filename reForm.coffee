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
                submit_button: yes
                submit_button_label: 'send'
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

        submit = ''
        if @choices.form.submit_button
            submit = """
            <div class="reform-field-wrapper">
                <input type="submit" value="#{@choices.form.submit_button_label}">
            </div>
            """
        form_template = """
            <form action="#{@choices.form.action}"
                  method="#{@choices.form.method}"
                  id="#{@choices.form.id}"
                  class="#{@choices.form.class}">
                #{fields_template}

                #{submit}
            </form>
        """
        @container.html form_template

    clean: () ->
        if @choices.form.id
            fields = @container.find "##{@choices.form.id} :input"
        else
            fields = @container.find 'form :input'

        fields.each () ->
            type = this.type
            tag = this.tagName.toLowerCase()

            if type is 'text' or type is 'password' or tag is 'textarea'
                jQuery(this).val ''
            else if type is 'hidden'
                jQuery(this).val ''
            else if type is 'checkbox' or type is 'radio'
                jQuery(this).attr 'checked', false
            else if tag is 'select'
                jQuery(this).val ''

    toJson: () ->
        #TODO returns a {field: value} for each form field

    submit: () ->
        #TODO ajax form submission

window.ReForm = ReForm

window.ReFormNS ?= {}
window.ReFormNS.json_extend = json_extend

