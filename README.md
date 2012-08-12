(Disclaimer: This library is under development, which means it will change a lot.
If you decide to use it be cautious, and be patient)

#ReForm.js

This is small javascript library to build and handle forms.

My motivation for building this is due my distaste for using backend form-building engines (like django.forms and many other).
I prefer leaving what belongs to the front-end to the fron-end. I'm also like
to have easily instantiable forms.

This library aims to do only two things:
- render your form
- manage them via ajax (do backend validation and so)

##Dependecies:

For now this project depends on jQuery, but making it more generic it's on the whish list.

##Usage:

```
my_form = new reForm.Form({
    container_id: 'some_id',
    form: {
        action: 'my_backend_action', // (default: '.')
        method: 'POST',  // (default: 'POST')
        id: 'my_form_id',
        class: 'some css classes',
        submit_button: true  //checks if the form should have a submit button (default: true)
    },
    fields: [
        {field: 'name', widget: SomeWidgetClass, widget_args:{ ...} },
        {field: 'desc', label: 'Description', widget: SomeOtherWidget}
    ],
    onSuccess: function() {},
    onError: function() {},
    clean_after_save: true,  // says if the forms should be cleaned after the save (default: true)
});
my_form.render();
```
With this, your form will be rendered inside the 'some_id' html element (probably a div).
And your form submission will be handled via ajax.

Your form has a onSuccess and onError callbacks for when he receives the ajax return from the backend.

###Field args:

- name: [String]
    name of the field
    (required)
- widget: [class]
    A widget Class object
    (required)
- widget_args: [object]
    options for the widget constructor
    (optional, all widget already receive a obj with default values)
- wrapper_class: [string]
    class for the div that wraps the field
    (optional, all fields has a default class 'reform-field-wrapper')
- label: [String]
    the label for the form field
    (optional, if you dont pass it will use the name as label)

###Widgets:

A widget must be a Class (instantiable via 'new') that contains a render method.

There are several common widgets in the reForm.CommonWidgets object.

see bellow an example of creating a custom widget:

```

var MyWidget = (function() {

    function MyWidget(options) {
      this.options = options;
      console.log('MyWidget constructor');
    }

    MyWidget.prototype.render = function() {
      var html;
      html = "<input type='text' class='hit-me' value='click-me'>";
      var _ref = this;

      $(function() {
        return $('.hit-me').click(function() {
          return alert(_ref.options.msg);
        });
      });

      return html;
    };

    return MyWidget;
})();

var my_form = new reForm.Form({
    container_id: 'my-form-wrapper',
    form: {
        action: '/my/url/'
    },
    fields: [
        {
            name: 'title',
            widget: reForm.CommonWidgets.TextWidget,
            widget_args: {input_class: 'some-class', value: 'initial value'},
        },
        {
            name: 'custom field',
            widget: MyWidget,
            widget_args: {msg: 'Hooray!'}
        }
    ]
});


```

if you are using coffeescript you can do:
```
MyAwesomeWidget extends reForm.CommonWidgets.ReFormWidget
    render: () ->
        # build my awesome widget using the @opt object to access the options
        return my_rendered_html
```

###Ajax and Backend:

All form submission is made via ajax.
you backend must return a json object with:

- success: [boolean]
    True or False, if the form saved successfuly
- errors: [array]
    if success is false, you must return an errors array containing objects with field name and a message.
    example: [{'title': 'This field is required!'}]
    the messages will be displayed in the form bellow the corresponding fields.
    if you provide a message with de field name as 'all' with will show a message bellow the form, not attached to any field.
- redirect: [string]
    if success is true. If you provide this with a url, after saving the object, the page will be redirected to this url.

examples:

    {'success': true, redirect: '/some/url/'}
    you form will execute the onSuccess function and then redirect to /some/url/

    {'success': true}
    your form will execute hte onSuccess callback and stay on your page and clean itself (except if you provided the clean_after_save: false flag to the form constructor object)

    {'success': false, errors:[{'all': 'some validation message'},{'title': 'You must prove a Title'}]}
    your form will call the onError callback, show the error messages and add the .error classes to each field with a error message.

###Utilities:

given: myform = new MyForm({...});

- myform.clean()
  clean all the form fields

- myform.toJSON()
  returns a JSON object with field name and corresponding value

- myform.submit()
  triggers the form ajax submission

###Copyright (copyleft):
created by Anderson Pierre Cardoso(2012) and licensed under the terms of the MIT license.


