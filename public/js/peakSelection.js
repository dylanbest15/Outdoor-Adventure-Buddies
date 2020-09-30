$(document).ready(() => {
    $(document).on('click', "button", async (event) => {
        const peakId = $(event.target).attr("data-peak");
        console.log(peakId);

        const trailList = await $.get(`/api/hikingTrails/${peakId}`);
        console.log(trailList);
        window.location.href = "/trails";

        // Now we add the function that generates the trail list
    })


});
