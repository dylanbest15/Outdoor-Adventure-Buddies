// Navigation //
$(document).ready(function () {
    $(".menu-icon").on("click", function () {
        $('nav ul').toggleClass('showing');
    });
});

$('.menu ul li a').on("click", function() {
    $('.menu-icon').click();
});


// Button Hover //

$("button").hover(function () {
    $(this).css("background-color", "lightgray");
}, function () {
    $(this).css("background-color", "gray");
});