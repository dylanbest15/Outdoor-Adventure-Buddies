
$(function () {
    //grab the element variables
    const cardInput = $(".card-deck");

    //set trailData for button 
    let trailData;

    /*MORE WORK COMING*/
    //get hikingTrailId ajax request
    $.ajax("/api/hikingTrails", {
        method: "GET"
    }).then(function(hikingTrails) {
        console.log(hikingTrails);
        $('.card-title').text(hikingTrails.trail_name);   
        $('.card-text').text(hikingTrails.description)
        $('.card-img-top').attr( 'src', hikingTrails.trail_photo);
    })

    //event buttons
    
    $("find.button").on("click", function(event) {
        console.log("click");
    });

})