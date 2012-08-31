ReFormNS = window.ReFormNS
test "json_extend test", () ->
    json_extend = ReFormNS.json_extend

    choices = json_extend({}, {})
    deepEqual choices, {}

    defaults = {a: 'aaa', b: 'bbb'}
    choices = json_extend defaults, {}
    deepEqual choices, defaults

    defaults = {a: 'aaa', b: 'bbb'}
    config = {a: 1, c:'C'}
    choices = json_extend defaults, config
    deepEqual choices, {a: 1, b: 'bbb', c: 'C'}

    defaults = {
        form: {
            action: '.',
            method: 'POST'
        }
    }
    config = {
        id: 'my_id',
        form:{
            action: 'my_action'
        },
        fields: [
            {
                name: 'blaaa',
                widget: 'BLEE'
            }
        ]
    }
    expected = {
        id: 'my_id',
        form: {
            action: 'my_action',
            method: 'POST'
        },
        fields: [
            {
                name: 'blaaa',
                widget: 'BLEE'
            }
        ]
    }
    choices = json_extend defaults, config
    deepEqual choices, expected


