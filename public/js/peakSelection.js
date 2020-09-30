$(document).ready(() => {
    let trailList;
    $(document).on('click', "button", async (event) => {
        const peakId = $(event.target).attr("data-peak");
        console.log(peakId);
        trailList = await $.get(`/api/hikingTrails/${peakId}`);
       
        console.log(trailList);
        // Now we add the function that generates the trail list
    })
   

});
