$(document).ready(function() {
  $(".side-nav a").click(function(event) {
    event.preventDefault();
    var id = $(this).attr("href");

    $(".side-nav li").removeClass("active");
    $(this).parent().addClass("active");

    $(".nav-content .nav-pane").removeClass("active");
    $(id).addClass("active");
  })
});