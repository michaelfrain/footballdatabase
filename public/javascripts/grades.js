$(document).ready(function() {
    $('#postgrade').click(function () {
        var data = $('#newgrade').serializeJSON();
        var dataString = JSON.stringify(data);
        $.ajax({
            url: "/api/grades",
            type: "POST",
            contentType: "application/json",
            data: dataString
        });
    });
});