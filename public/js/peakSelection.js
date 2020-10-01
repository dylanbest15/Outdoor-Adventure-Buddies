$(document).ready(() => {
    const trailItem = $($("#trails-template").html());
    const trailSection = $("section.trailsList");
    $(document).on('click', "button.peakButton", async (event) => {
        try{
            const peakId = $(event.target).attr("data-peak");
            console.log(peakId);
            const trailList = await $.get(`/api/hikingTrails/${peakId}`);
            console.log(trailList);
            trailSection.empty();
            trailList.forEach(({ id, trail_name, mileage, elevation_gain, description, trail_photo}) => {
                const newTrail = trailItem.clone();
                newTrail.find("img.trail-photo").attr("src", trail_photo);
                newTrail.find("h3.trail-title").text(trail_name);
                newTrail.find("span.trail-description").text(description);
                newTrail.find("span.mileage").text(mileage);
                newTrail.find("span.elevation-gain").text(elevation_gain);
                newTrail.find("button.trailButton").attr("data-trailId", id);
                trailSection.append(newTrail);
            })
            // location.reload();

        } catch(err) {
            console.log(err);
        }
    })
    $(document).on('click', "button.trailButton", (event) => {
        event.preventDefault();
        const trailId = $(event.target).attr("data-trailId");
        $.post(`api/favorites`, {trailId: trailId});
    })

});
