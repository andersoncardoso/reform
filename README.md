#ReForm.js

This is small library to build and handle ajax forms directly for you,
given a simple json configuration and small callbacks.

The idea behind this project is to leave bloated backend form rendering engines
like django.forms and other similar engines that cross boundaries
(control the rendering of you forms on the backend). We should leave what
belongs to the front-end to the front-end.

##Dependecies:

This project initially was a jQuery plugin, but I've decided to make more
generic. It's only dependency now is underscore.js.

##Usage:

(Disclaimer: this is a inital draft to probably will change a lot on the
near future. If you dont like hard emotions, dont use yet)

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


