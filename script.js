$(function(){
    $("#simple-treeview").dxTreeView({ 
        items: bands,
        width: 300,
        searchEnabled: true,
        onItemClick: function(e) {
            var item = e.itemData;
            if(item.url) {
                $("#band-details").removeClass("hidden");
                $("#band-details > .name").text(item.url + " - " + item.text);
                $("#band-details > object").attr("data", item.url);
            } else {
                $("#band-details").addClass("hidden");
            }
        }
    }).dxTreeView("instance");
});