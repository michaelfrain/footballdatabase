var bCrypt = require('bcrypt-nodejs');

$(document).ready(function() {
    $('#postuser').click(function() {
        var data = $('#newuser').serializeJSON();
        var userString = JSON.stringify(data);
        $.ajax({
            url: "/api/users",
            type: "POST",
            contentType: "application/json",
            data: userString
        });
    });
});