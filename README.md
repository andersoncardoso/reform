(Disclaimer: This library is under development, which means it will change a lot.
If you decide to use it be cautious, and be patient)

#ReForm.js

This is a small library to work with forms on javascript.
It uses (and aims to be used with) backbone.js.

##Usage:

see the usage bellow:
```

FormView = ReForm.Form.extend
    fields: [
        {name: 'title', widget: ReForm.commonWidgets.TextWidget, label: 'Todo:'}
        {name: 'desc', widget: ReForm.commonWidgets.TextAreaWidget, label: 'Description:'}
    ]
    events:
        'success': 'onSuccess'
        'validation': 'onValidation'

    onSuccess: (data) ->
        console.dir data

    onValidation: ->
        # do some client-side validation ()
        if has_error
          @errors {key: 'error description'}
          return false
        else
          return true

$ () ->
    form = new FormView
        formId: 'some_id'
        model: new MyModel()

    $('#my-form-wrapper').html myForm.render().el


```

on the constructor it accepts a model (Backbone.Model), if the model is prepoluated, the form renders with the model data already loaded.

##Methods:

*events:

submit, success, error

*form.save()

saves the data (uses model.save), This method is automatically called when you raise a 'submit' event. It raises a 'success' or 'error' event.
To trigger the sucess the model.save should return a Http 200. To trigger a 'error' should return another Http status code (usually 400 Bad Request, for validation)


*form.set({title: 'some title', desc:'nonononoono'})

*form.get()

*form.get('title')

*form.errors()

*form.errors({title: 'Validations Msg'})

*form.cleanErrors()

*form.fields

the form fields, after render, have a 'instance' attribute so you play with the widget directly

##Widgets

```
AnnoyingWidget = ReForm.Widget.extend
    template: """
    <input class="annoying" type="text" name="<%=name%>" id=id_"<%=name%>" value="<%=value%>">
    """
    behavior: ()->
        @$el.find('.annoying').click (evt) =>
            alert 'heey, stop it!!!'
            $(evt.target).blur()

```
You could have provided a template from the DOM
example:
```
On my HTMl:
<script type="text/template" id="my-widget">
    ... my widget html here!
</script>
AnnoyingWidget = ReForm.Widget.extend
    template: $('#my-widget').html()
    behavior: ()->
       .... my widget custom js here (optional)
```
you can (and several times, must) also provide a .set(value) and .get() function, that know how to set and get values for this widget.
The default is getting from the 'input' field the .val() attribute.
If your widget is more elaborate please provide these methods


###Copyright (copyleft):
created by Anderson Pierre Cardoso(2012) and licensed under the terms of the MIT license.


