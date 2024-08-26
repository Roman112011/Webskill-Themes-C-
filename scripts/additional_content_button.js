let additional_content_elem_class = ".theme-additional-content-container"
let collapsed_class = "collapsed"

$(".theme-additional-content-expander").click(show_hide_additional_content_container);

function show_hide_additional_content_container() {
  let caller_button = $(this)

  let parent_div = caller_button.parent()
  let theme_content_div = parent_div.find(additional_content_elem_class)

  let is_collapsed = theme_content_div.hasClass(collapsed_class)

  if (is_collapsed) {
    caller_button.text("Сховати")
    theme_content_div.removeClass(collapsed_class)
  }
  else {
    caller_button.text("Показати")
    theme_content_div.addClass(collapsed_class)
  }
}