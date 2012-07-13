(
    ($) ->
      $.fn.reform = () ->
         console.log 'reform: ' + $(this).attr 'id'
)(jQuery)
