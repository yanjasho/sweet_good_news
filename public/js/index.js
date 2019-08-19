$(document).ready(function() {

    function saveArticle(id){
        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
            data: {
                saved: true
            }
        }).then(function() {
            alert("Article saved!")
        })
    }

    $(".save").on("click", function(event) {
        var id = $(this).attr("data-id")
        event.preventDefault()
        saveArticle(id)
    })
    
});