# reForm.coffee
# This project is licensed under the MIT license terms

_json_extend = (defaults, config) ->
    choices = {}
    for k, v of defaults
        choices[k] = v
    for k, v of config
        if typeof v is 'object' and defaults[k] and typeof defaults[k] is 'object'
            choices[k] = _json_extend defaults[k], v
        else
            choices[k] = v
    choices

class ReForm
    constructor: (@config) ->
        console.log 'reForm constructor'
        console.dir @config

    render: () ->
        console.log 'render function'

window.ReForm = ReForm

window.ReForm_TestNamespace ?= {}
window.ReForm_TestNamespace._json_extend = _json_extend

