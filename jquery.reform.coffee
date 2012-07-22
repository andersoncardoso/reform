do ($ = jQuery) ->
    $.fn.reform = (config) ->
        # get config entries for form
        choices =
            method: 'POST'
            action: '.'
            # multipart??

        $.extend choices, config

        console.dir choices

        # get config entries for inputs


        # build form


        # save

