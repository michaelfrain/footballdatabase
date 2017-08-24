$(document).ready(function() {
    $('#postfoulcode').click(function () {
        var data = $('#newfoulcode').serializeJSON();
        var dataString = JSON.stringify(data);
        $.ajax({
            url: "/api/foulcodes",
            type: "POST",
            contentType: "application/json",
            data: dataString
        });
    });
});