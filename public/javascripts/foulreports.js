$(document).ready(function() {
    $.ajax({
        url: "/api/games"
    }).then(function(data) {
        for (var i=0; i<data.length; i++) {
            $('#gamesearch').append('<option value="'+data[i]._id+'">'+data[i].home.school+' vs. '+data[i].visitor.school+'</option>');
        }
    });
    
    $('#gamesearchsubmit').click(function() {
        var game = $('#gamesearch').val();
        $.ajax({
            url: "/api/fouls?game="+game
        }).then(function(data) {
            $('#foulelement').empty();
            if (data) {
                var fouls = data.fouls;
                for (var i=0; i<fouls.length; i++) {
                    var team = "";
                    if (fouls[i].homeTeam == true) {
                      team = "H";
                    } else if (fouls[i].homeTeam == false) {
                      team = "V";
                    }
                    var grade = "";
                    if (fouls[i].grade == undefined) {
                      grade = "";
                    } else {
                      grade = fouls[i].grade.abbreviation;
                    }
                    var odrk = "";
                    if (fouls[i].odrk == 0) {
                      odrk = "O";
                    } else if (fouls[i].odrk == 1) {
                      odrk = "D";
                    } else if (fouls[i].odrk == 2) {
                      odrk = "R";
                    } else if (fouls[i].odrk == 3) {
                      odrk = "K";
                    }
                    var ado = "";
                    if (fouls[i].ado == 0) {
                      ado = "A";
                    } else if (fouls[i].ado == 1) {
                      ado = "D";
                    } else if (fouls[i].ado == 2) {
                      ado = "O";
                    }
                    $('#foulelement').append('<tr><td>'+fouls[i].quarter+'</td><td>'+fouls[i].time+'</td><td>'+team+'</td><td>'+fouls[i].foul.code+'</td><td>'+odrk+'</td><td>'+fouls[i].player+'</td><td>'+ado+'</td><td>'+fouls[i].officials+'</td><td>'+fouls[i].comment+'</td><td>'+fouls[i].evaluatorComment+'</td><td>'+fouls[i].supervisorComment+'</td><td>'+grade+'</td></tr>');
              }
              $('#hometeam').append(data.home);
              $('#gameinfo').css("display", "inline");
              $('table').css("display", "inline");
            } else {
                $('#gameinfo').css("display", "none");
              $('table').css("display", "none");
            }
        });
    });
});