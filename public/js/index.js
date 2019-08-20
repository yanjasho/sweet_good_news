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

    function postNote(id, body){
        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
              body: body
            }
        }).then(function() {
            location.reload()
        })
    }

    $(".save").on("click", function(event) {
        var id = $(this).attr("data-id")
        event.preventDefault()
        saveArticle(id)
    })

    $(".comment").on("submit", function(event) {
        var id = $(this).attr("data-id")
        var body = $(this).find("textarea").val()
        event.preventDefault()
        postNote(id, body)
    })

});