# reForm.coffee
# This project is licensed under the MIT license terms

formTemplate = """
<form action="" method="post" id="<%= formId %>" >
    <div>
        <input type="submit" name="submit" value="<%=submit_label%>" />
    </div>
</form>
"""

fieldTemplate = """
<div class="field-container <%=container_class%>" for="<%=name%>" >
    <label><%=label%></label>
    <div class="widget-container">
    </div>
</div>
"""

textTemplate = """
<input type="<%=type%>" name="<%=name%>" value="<%=value%>" id="id_<%=name%>" <%=attrs%> />
"""

textareaTemplate = """
<textarea name="<%=name%>" id="id_<%=name%>"><%=value%></textarea>
"""

Widget = Backbone.View.extend
    initialize: () ->
        _.bindAll this
        @_template = _.template @template
        @name = @options.name

    render: ()->
        @$el.html(@_template @options)
        @behavior?()
        this

    set: (value) ->
        @$el.find("input[name=#{@name}]").val(value)

    get: () ->
        @$el.find("input[name=#{@name}]").val()

TextWidget = Widget.extend
    template: textTemplate
    initialize: () ->
      @options.type = 'text'
      @options.attrs ?= ''
      Widget.prototype.initialize.apply this, arguments

PasswordWidget = Widget.extend
  template: textTemplate
  initialize: ->
    @options.type = 'password'
    @options.value = ''
    @options.attrs = 'autocomplete="off"'
    Widget.prototype.initialize.apply this, arguments

TextAreaWidget = Widget.extend
    template: textareaTemplate

    set: (value) ->
        @$el.find("textarea").val(value)

    get: () ->
        @$el.find("textarea").val()


FormView = Backbone.View.extend
    initialize: () ->
        _.bindAll this
        @formTemplate = _.template formTemplate
        if @options?.model
            @model = @options.model
        @on 'submit', @save

    render: () ->
        id = @options?.formId or ''
        submit_label = @options?.submit_label or 'send'
        renderedFormTemplate = @formTemplate {formId:id, submit_label:submit_label}
        @$el.html renderedFormTemplate

        for field in @fields.slice(0).reverse()
            # build args object
            args =
                name: field.name
                id: "id_#{field.name}"
                label: field.label or field.name
                value: field.value or ''
                container_class: field.container_class or ''
            args = _.extend(args, field.args or {})

            #instantiate widget and add reference to fields array
            widget = new field.widget(args)
            field.instance = widget

            # field Template
            _fieldTemplate = _.template fieldTemplate


            # add rendered widget to field template
            renderedField = $(_fieldTemplate args)
            renderedField.find('.widget-container').html widget.render().el

            # prepend renderedField on form
            @$el.find('form').prepend renderedField

            #initial values for prepolated models
            if @model
                @set @model.toJSON()

        # prevent for from being submited
        @$el.find('form').submit (evt) =>
            evt.preventDefault()
            @trigger 'submit'
        this

    save: () ->
        @model.set @get()
        @model.save {},
            success: (model, resp) =>
                @cleanErrors()
                if resp.redirect
                  if window.location.pathname is resp.redirect
                    window.location.reload()
                  else
                    window.location = resp.redirect
                @trigger 'success', resp

            error: (model, resp) =>
                resp = JSON.parse(resp.responseText)
                @cleanErrors()
                @errors(resp.errors or {})
                @trigger 'error', resp

    errors: (vals) ->
        @_errors ?= {}
        if vals
            @_errors = _.extend(@_errors, vals)
            for name, msg of vals
                field = @$el.find(".field-container[for=#{name}]")
                field.find("#id_#{name}").addClass('error')
                field.find("label").addClass 'error'
                if not field.find("small.error").length
                    field.find(".widget-container").after "<small class='error'>#{msg}</smalll>"
            return
        else
            return @_errors

    cleanErrors: () ->
        @$el.find('small.error').remove()
        @$el.find('.error').removeClass 'error'


    get: (fieldName='__all__') ->
        if fieldName is '__all__'
            vals = {}
            for field in @fields
                vals[field.name] = field.instance.get()
            return vals
        else
            field = _.find(@fields, (f)-> f.name is fieldName)
            return field.instance.get()

    set: (vals={})->
        for key, value of vals
            field = _.find(@fields, (f)-> f.name is key)
            field?.instance?.set?(value)



window.ReForm =
    Form: FormView
    Widget: Widget
    commonWidgets:
        TextWidget: TextWidget
        PasswordWidget: PasswordWidget
        TextAreaWidget: TextAreaWidget

if typeof define is "function" and define.amd
  define ->
    return window.ReForm
