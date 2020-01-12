$(function(){
    $("#simple-treeview").dxTreeView({ 
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
});


