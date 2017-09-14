$(document).ready(function() {
    $.ajax({
        url: "/api/games"
    }).then(function(data) {
        for (var i=0; i<data.length; i++) {
            $('#game').append('<option value="'+data[i]._id+'">'+data[i].home.school+' vs. '+data[i].visitor.school+'</option>');
        }
    });
  
    $.ajax({
        url: "api/grades"
    }).then(function(data) {
        for (var i=0; i< data.length; i++) {
            $('#grade').append('<option value="'+data[i]._id+'">'+data[i].abbreviation+'</option>');
        }
    });
    
    $.ajax({
        url: "api/foulcodes"
    }).then(function(data) {
        for (var i=0; i< data.length; i++) {
            $('#foul').append('<option value="'+data[i]._id+'">'+data[i].code+' - '+data[i].name+'</option>');
        }
    });
    
    $('#putfoul').click(function() {
        var data = $('#newfoul').serializeJSON();
        var officials = [];
        $("input[name='officials']:checked").each(function () {
            officials.push($(this).val());
        })
        data.officials = officials;
        var foulString = JSON.stringify(data);
        var selectedGame = $('#game').val();
        $.ajax({
            url: "/api/fouls",
            type: "POST",
            contentType: "application/json",
            data: foulString
        }).then(function(foulData){
            $.ajax({
                url: "/api/games/"+selectedGame
            }).then(function(gameData) {
                if (gameData) {
                    gameData.fouls.push(foulData._id);
                    var stringData = JSON.stringify(gameData);
                }
                $.ajax({
                    url: "/api/games/"+selectedGame,
                    type: "PUT",
                    contentType: 'application/json',
                    data: stringData
                });
            });
        });
    });
});