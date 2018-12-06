$(document).ready(function() {
    $('#postnewteam').click(function() {
        var data = $('#newteam').serializeJSON();
        var teamString = JSON.stringify(data);
        $.ajax({
            url: "/api/teams",
            type: "POST",
            contentType: "application/json",
            data: teamString,
            success: function(result) {
                $( "#result-message" ).html( "Team created!" );
            }
        });
    });
});