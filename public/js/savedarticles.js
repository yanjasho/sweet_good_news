$(document).ready(function() {

    function deleteArticle(id){
        $.ajax({
            method: "PUT",
            url: "/articles/" + id,
            data: {
                saved: false
            }
        }).then(function() {
            location.reload()
        })
    }

    $(".delete").on("click", function(event) {
        var id = $(this).attr("data-id")
        event.preventDefault()
        deleteArticle(id)
    })
    
});