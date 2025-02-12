$(function() {
    const treeView = $("#simple-treeview").dxTreeView({
        items: bands,
        width: 300,
        searchEnabled: true,
        onItemClick: function(data) {
            var item = data.node;
            if (data.itemData.url) {
                $("#band-details").removeClass("hidden");
                $("#band-details > .name").text(item.parent.text + " - " + item.text);
                $("#band-details > object").attr("data", data.itemData.url);
            } else {
                $("#band-details").addClass("hidden");
            }
        }
    }).dxTreeView("instance");

    // Add random song functionality
    $(document).on('click', '#random', function() {
        console.log("Random button clicked!");

        // Collect all songs from all bands
        let allSongs = [];

        bands.forEach(band => {
            band.items.forEach(song => {
                allSongs.push({
                    song: song,
                    bandName: band.text
                });
            });
        });

        // Select a random song
        const randomEntry = allSongs[Math.floor(Math.random() * allSongs.length)];

        // Reset the object data before updating
        $("#band-details > object").attr("data", "");

        // Update the display with the random song
        console.log("Random song:", randomEntry.song.text);
        $("#band-details").removeClass("hidden");
        $("#band-details > .name").text(randomEntry.bandName + " - " + randomEntry.song.text);
        $("#band-details > object").attr("data", randomEntry.song.url);
    });

    // Style the random button
    $('#random').css({
        'cursor': 'pointer',
        'padding': '4px 20px',
        'background-color': '#4CAF50',
        'color': 'white',
        'border-radius': '4px',
        'margin': '2px 0',
        'display': 'inline-block',
        'user-select': 'none'
    }).hover(
        function() {
            $(this).css('background-color', '#45a049');
        },
        function() {
            $(this).css('background-color', '#4CAF50');
        }
    );
});
