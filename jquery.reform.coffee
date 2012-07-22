do ($ = jQuery) ->
    $.fn.reform = (config) ->
        # get config entries for form
        $this = $(this)
        choices =
            form:
                method: 'POST'
                action: '.'

        $.extend true, choices, config

        # get config entries for inputs


        # build form
        renderForm = () =>
            if $this.is 'form'
                console.log 'do nothing'
            else:
                $this.append """
                    <form class="" id="" action="#{choices.form.action}" method="#{choices.form.method}">

                    </form>
                """

        # save

        # init
        renderForm()
