(Disclaimer: this is a initial draft to probably will change a lot on the
near future. If you dont like hard emotions, dont use it yet)

#ReForm.js

This is small library to build and handle ajax forms.

The idea behind this project is to leave bloated backend form rendering engines,
like django.forms and other similar. These engines generally cross boundaries
and control the rendering of you forms on the backend. We should leave what
belongs to the front-end to the front-end.

##Dependecies:

This project initially was a jQuery plugin, but I've decided to make more
generic. It only depends  of underscore.js (for now).

##Usage:

```
my_form = new ReForm({
    wrapper: 'some_id',
    form: {
        action: 'my_backend_action',
        method: 'POST',
        id: 'my_form_id',
        class: 'some css classes'
    },
    fields: [
        {field: 'name', widget: SomeConstructorForThisField()},
        {field: 'description': widget: SomeOtherWidget()}
    ]
});
my_form.render();
```

###Copyright (copyleft):

This project is licensed under the MIT license.


