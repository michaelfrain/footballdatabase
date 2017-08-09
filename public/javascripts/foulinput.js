$(document).ready(function() {
    $.ajax({
        url: "/api/games"
    }).then(function(data) {
        for (var i=0; i<data.length; i++) {
            $('#game').append('<option value="'+data[i]._id+'">'+data[i].home+' vs. '+data[i].visitor+'</option>');
        }
    });
    
    $('#putfoul').click(function() {
        var data = $('#newfoul').serializeArray();
        var selectedGame = $('#game').val();
        $.ajax({
            url: "/api/games/"+selectedGame
        }).then(function(gameData) {
            if (gameData) {
                gameData.fouls.push(data[0].value);
            }
            $.ajax({
                url: "/api/games/"+selectedGame,
                type: "PUT"
            });
        });
    });
});