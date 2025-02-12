$(function() {
    const treeView = $("#simple-treeview").dxTreeView({
        items: bands,
        width: 300,
        searchEnabled: true,
        searchMode: "contains",  // Enable partial matching
        searchExpr: "text",      // Search within 'text' (band names and song titles)
        onItemClick: function(data) {
            var item = data.node;
            if (data.itemData.url) {
                $("#band-details").removeClass("hidden");
                $("#band-details > .name").text(item.parent.text + " - " + item.text);
                $("#band-details > object").attr("data", data.itemData.url);
            } else {
                $("#band-details").addClass("hidden");
            }
        },
        onSearchChanged: function(e) {
            var searchValue = e.searchValue.toLowerCase();
            var nodes = treeView.getNodes();
            
            // Iterate through the nodes and show/hide based on search term
            nodes.forEach(function(node) {
                // Expand matching bands or songs
                if (node.text.toLowerCase().includes(searchValue)) {
                    treeView.expandItem(node); // Expand the matched node
                    treeView.expandItem(node.parent); // Expand the parent band if a song matches
                } else {
                    treeView.collapseItem(node); // Collapse the node if it doesn't match
                }
            });
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

        if (allSongs.length === 0) {
            console.warn("No songs available.");
            return;
        }

        // Select a random song
        const randomEntry = allSongs[Math.floor(Math.random() * allSongs.length)];

        // Force reload by appending a timestamp to the URL (Solution 2)
        let newUrl = randomEntry.song.url + "?t=" + new Date().getTime();
        console.log("Selected song:", randomEntry.song.text, "URL:", newUrl);

        // Update the display with the random song
        $("#band-details").removeClass("hidden");
        $("#band-details > .name").text(randomEntry.bandName + " - " + randomEntry.song.text);
        $("#band-details > object").attr("data", newUrl);
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
