$(function(){
    // Store the treeview instance for later use
    const treeView = $("#simple-treeview").dxTreeView({ 
        items: bands,
        width: 300,
        searchEnabled: true,
        onItemClick: function(data) {
            var item = data.node;
            if(data.itemData.url) {
                $("#band-details").removeClass("hidden");
                $("#band-details > .name").text(item.parent.text + " - " + item.text);
                $("#band-details > object").attr("data", data.itemData.url);
            } else {
                $("#band-details").addClass("hidden");
            }
        }
    }).dxTreeView("instance");

    // Add random song functionality
    $('#random').on('click', function() {
        // Get all items from the treeview
        const allItems = treeView.getItems();
        
        // Filter to get only songs (items with URLs)
        const songs = allItems.filter(item => item.url);
        
        if (songs.length === 0) return;
        
        // Select a random song
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        
        // Update the display
        $("#band-details").removeClass("hidden");
        $("#band-details > .name").text(
            (randomSong.parent ? randomSong.parent.text + " - " : "") + randomSong.text
        );
        $("#band-details > object").attr("data", randomSong.url);
    });
    
    // Style the random button
    $('#random').css({
        'cursor': 'pointer',
        'padding': '10px 20px',
        'background-color': '#4CAF50',
        'color': 'white',
        'border-radius': '4px',
        'margin': '10px 0',
        'display': 'inline-block',
        'user-select': 'none'
    }).hover(
        function() { $(this).css('background-color', '#45a049'); },
        function() { $(this).css('background-color', '#4CAF50'); }
    );
});