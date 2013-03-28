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
<textarea name="<%=name%>" id="id_<%=name%>" <%=attrs%>><%=value%></textarea>
"""

checkboxTemplate = """
<label>
  <input type="checkbox" name="<%=name%>" value="<%=choice_value%>" id="id_<%=name%>_<%=choice_num%>" class="checkbox" />
  <%=choice_title%>
</label>
"""

dropdownTemplate = """
<select name="<%=name%>" id="id_<%=name%>" <%=attrs%>>
  <%_.each(choices, function (choice) {%>
    <option value="<%=choice.value%>" <%=choice.attrs%>><%=choice.title%></option>
  <% }); %>
</select>
"""

class Widget extends Backbone.View
  initialize: ->
    _.bindAll this
    @_template = _.template @template
    @options.attrs ?= ''
    @name = @options.name

  render: ->
    @$el.html(@_template @options)
    @behavior?()
    this

  getInputElement: ->
    @$("input[name=#{@name}]")

  set: (value) ->
    @getInputElement().val(value)

  get: ->
    @getInputElement().val()

  validate: ->
    true

class TextWidget extends Widget
  template: textTemplate
  initialize: () ->
    @options.type = 'text'
    super

class HiddenWidget extends Widget
  template: textTemplate
  initialize: ->
    @options.type = 'hidden'
    super

class PasswordWidget extends Widget
  template: textTemplate
  initialize: ->
    @options.type = 'password'
    @options.value = ''
    @options.attrs = 'autocomplete="off"'
    super

class TextAreaWidget extends Widget
  template: textareaTemplate

  getInputElement: () ->
    @$('textarea')

class CheckboxWidget extends Widget
  template: checkboxTemplate
  render: ->
    @$el.html ''
    for idx, option of @options.choices
      args = _.extend @options, {
        choice_value: option.value
        choice_title: option.title
        choice_num: idx + 1
      }
      renderedChoice = @_template args
      @$el.append renderedChoice
    this

  set: (value) ->
    if value
      @$("input[value=#{value}]").attr('checked', true)
    else
      @$(":checked").attr('checked', false)

  get: ->
    checked = @$(":checked")
    if checked.length
      return checked.val()
    else
      return ''

class DropdownWidget extends Widget
  template: dropdownTemplate

  initialize: () ->
    @options.choices ?= []
    super
    # Widget.prototype.initialize.apply this, arguments

  getInputElement: ->
    @$("select[name=#{@options.name}]")


class FormView extends Backbone.View
  template: formTemplate

  initialize: () ->
    _.bindAll this
    @_template = _.template @template
    @model = @options.model if@options?.model
    @patch = @options?.patch ? false
    @renderedFields = []
    @instances = {}

    @on 'submit', @save
    @on(event, this[cb_name]) for event, cb_name of @events if @events?

    @initializeFields()

  render: () ->

    for renderedField in @renderedFields
      renderedField.detach()

    id = @options?.formId or ''
    submit_label = @options?.submit_label or (if _.isFunction(window.i18n) then i18n('send') else 'send')
    renderedFormTemplate = @_template {formId:id, submit_label:submit_label}
    @$el.html renderedFormTemplate

    for renderedField in @renderedFields
      # prepend renderedField on form
      @$('form').prepend renderedField

    # prevent for from being submited
    @$('form').submit (evt) =>
      evt.preventDefault()
      @trigger 'submit'

    if @model and not _.isEmpty(@model.toJSON())
      @set @model.toJSON()
    this

  remove: ->
    super
    # Backbone.View.prototype.initialize.apply this, arguments
    @clearInstances()
    @clearRenderedFields()

  clearInstances: ->
    for name, instance of @instances
      instance.remove()
      @instances[name] = null

  clearRenderedFields: ->
    # clear the fields elements
    renderedField.remove() for renderedField in @renderedFields
    @renderedFields.length = 0


  initializeFields: ->
    # create fields
    for field in @fields.slice(0).reverse()
      # build args object
      args =
        name: field.name
        input_id: "id_#{field.name}"
        label: field.label or ''
        value: field.value or ''
        container_class: field.container_class or ''
      args = _.extend(args, field.args or {})

      #instantiate widget and add reference to fields array
      widget = new field.widget(args)
      @instances[field.name] = widget

      # field Template
      _fieldTemplate = _.template fieldTemplate

      # add rendered widget to field template
      # create a div to avoid detached elements
      container = $('<div>').html _fieldTemplate args
      renderedField = container.children().detach()
      renderedField.find('.widget-container').append widget.render().el

      # prepend renderedField on form
      @$('form').prepend renderedField

      # save the field element reference
      @renderedFields.push renderedField

      # #initial values for prepolated models
      # if @model
      #   @set @model.toJSON()

  disableSubmit: ->
    @$('input[type=submit]').attr 'disabled', 'disabled'

  enableSubmit: ->
    @$('input[type=submit]').removeAttr 'disabled'

  save: () ->
    @cleanErrors()
    is_valid = if @events.hasOwnProperty('validation') then \
                    this[@events.validation]() else yes

    _errs = {}
    for name, widget of @instances
      validate = widget.validate()
      if not validate
        is_valid = no
        nm = widget.errorTargetName or name
        _errs[nm] = widget.error

    if not _.isEmpty(_errs)
      @errors _errs

    if is_valid
      @disableSubmit()
      @model.save @get(),
        wait: true
        patch: @patch
        success: (model, resp) =>
          @cleanErrors()
          @enableSubmit()
          if resp.redirect
            if window.location.pathname is resp.redirect
              window.location.reload()
            else
              window.location = resp.redirect
          @trigger 'success', resp

        error: (model, resp) =>
          @enableSubmit()
          resp = JSON.parse(resp.responseText)
          @cleanErrors()
          @errors(resp.errors or {})
          @trigger 'error', resp

  errors: (vals) ->
    @_errors = {}
    if vals
      @_errors = _.extend(@_errors, vals)
      for name, msg of vals
        if name is '__all__'
          submit_btn = @$("input[type=submit]")
          if submit_btn.length and not submit_btn.parent().find('small.error').length
            submit_btn.before "<small class='error'>#{msg}</small>"
        field = @$(".field-container[for=#{name}]")
        field.find("#id_#{name}").addClass('error')
        field.find("label").addClass 'error'
        if not field.find("small.error").length
          field.find(".widget-container").after "<small class='error'>#{msg}</smalll>"
      return
    else
      return @_errors

  cleanErrors: () ->
    @errors {}
    for name, widget of @instances
      delete widget.error
      delete widget.errorTargetName

    @$('small.error').remove()
    @$('.error').removeClass 'error'


  get: (fieldName='__all__') ->
    if fieldName is '__all__'
      vals = {}
      for field in @fields
        vals[field.name] = @instances[field.name].get()
      return vals
    else
      field = _.find(@fields, (f)-> f.name is fieldName)
      return @instances[field.name].get()

  set: (vals={})->
    for key, value of vals
      # field = _.find(@fields, (f)-> f.name is key)
      @instances[key]?.set?(value)



window.ReForm =
  Form: FormView
  Widget: Widget
  commonWidgets:
    TextWidget:     TextWidget
    PasswordWidget: PasswordWidget
    HiddenWidget:   HiddenWidget
    TextAreaWidget: TextAreaWidget
    CheckboxWidget: CheckboxWidget
    DropdownWidget: DropdownWidget

if typeof define is "function" and define.amd
  define ->
    return window.ReForm
