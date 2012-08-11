(Disclaimer: this is a initial draft to probably will change a lot on the
near future. If you dont like hard emotions, dont use it yet)

#ReForm.js

This is small library to build and handle ajax forms.

The idea behind this project is to leave bloated backend form rendering engines,
like django.forms and other similar. These engines generally cross boundaries
and control the rendering of you forms on the backend. We should leave what
belongs to the front-end to the front-end.

##Dependecies:

For now this project depends on jQuery, but making it more generic it's on the whish list.

##Usage:

```
my_form = new ReForm({
    container_id: 'some_id',
    form: {
        action: 'my_backend_action',
        method: 'POST',
        id: 'my_form_id',
        class: 'some css classes'
    },
    fields: [
        {field: 'name', widget: SomeConstructorForThisField()},
        {field: 'description': widget: SomeOtherWidget()}
    ],
    onSuccess: function() {},
    onError: function() {},
});
my_form.render();
```

###Field args:
    - name: [String] name of the field
    - widget: [String] name of a common widget  or
              [function] constructor for a widget
    - wrapper_class: [string] class for the div that wraps the field (default=reform-field-wrapper)
    - input_class: [string] class for the input field (default=reform-input)
    - label: [String] the label for the form field
    - value: [String] initial value

###Building a Widget:

 There are only two 'rules' it must accept a field object with the above mentioned args,
 and have a render method that returns a string with the widget rendered




###Copyright (copyleft):

This project is licensed under the MIT license.


