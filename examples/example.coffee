AnnoyingWidget = ReForm.Widget.extend
  template: """
  <input class="annoying" type="text" name="<%=name%>" id=id_"<%=name%>" value="<%=value%>">
  """
  behavior: ()->
    @$el.find('.annoying').click (evt) =>
      alert 'heey, stop it!!!'
      $(evt.target).blur()

FormView = ReForm.Form.extend
  fields: [
    {name: 'title', widget: ReForm.commonWidgets.TextWidget, label: 'Title:'}
    {name: 'passwd', widget: ReForm.commonWidgets.PasswordWidget, label: 'Password:'}
    {name: 'desc', widget: ReForm.commonWidgets.TextAreaWidget, label: 'Description:'}
    {name: 'dropdown', widget: ReForm.commonWidgets.DropdownWidget, label: 'Dropdown:', args:{
      choices: [{value: 'foo', title: 'Foo'}, {value: 'bar', title: 'Bar'}]}}
    {name: 'yes-no', widget: ReForm.commonWidgets.CheckboxWidget, args:{
      choices: [{value: 'true', title: 'Yes or No?'}]}}
    {name: 'annoying', widget: AnnoyingWidget, label: 'dont you dare clicking on me:' }
  ]

  events:
    'success': 'onSuccess'
    'error': 'onError'

  onSuccess: (data) ->
    console.log 'ON SUCCESS CALLED!'
    console.dir data

  onError: (data) ->
    console.log 'ON ERROR CALLED!'
    console.dir data

DummyModel = Backbone.Model.extend
  save: (data, opts) ->
    console.log 'DummyModel save!'
    {}

$ () ->
  myForm = new FormView
    formId: 'some_id'
    model: new DummyModel
      title: 'Initial Data'
      'yes-no': yes
      dropdown: 'bar'})


  $('#my-form-wrapper').html myForm.render().el

  # to play around
  window.form = myForm
