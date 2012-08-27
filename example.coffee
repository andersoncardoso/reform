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
        {name: 'title', widget: ReForm.commonWidgets.TextWidget, label: 'Todo:'}
        {name: 'desc', widget: ReForm.commonWidgets.TextAreaWidget, label: 'Description:'}
        {name: 'annoying', widget: AnnoyingWidget, label: 'dont you dare clicking on me:' }
    ]
    initialize: () ->
        ReForm.Form.prototype.initialize.apply this, @options
        @bind 'success', @onSuccess
        @bind 'error', @onError

    onSuccess: (data) ->
        console.log 'ON SUCCESS'
        console.dir data

    onError: (data) ->
        console.log 'ON ERROR'
        console.dir data

$ () ->
    myForm = new FormView
        formId: 'some_id'

    $('#my-form-wrapper').html myForm.render().el

    # to play around
    window.form = myForm
