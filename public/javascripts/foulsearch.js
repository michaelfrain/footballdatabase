$(document).ready(function() {
    $.ajax({
        url: "/api/users"
    }).then(function(data) {
        for (var i=0; i<data.length; i++) {
            $('#usersearch').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
        }
    });
    
    $('#foulsearch').click(function() {
        var user = $('#usersearch').val();
        $.ajax({
            url: "/api/fouls?user="+user
        }).then(function(data) {
            if (data) {
                for (var i=0; i<data.length; i++) {
                  var team = "";
                if (data[i].homeTeam == true) {
                  team = "H";
                } else if (data[i].homeTeam == false) {
                  team = "V";
                }
                var grade = "";
                if (data[i].grade == undefined) {
                  grade = "";
                } else {
                  grade = data[i].grade;
                }
                var odrk = "";
                if (data[i].odrk == 0) {
                  odrk = "O";
                } else if (data[i].odrk == 1) {
                  odrk = "D";
                } else if (data[i].odrk == 2) {
                  odrk = "R";
                } else if (data[i].odrk == 3) {
                  odrk = "K";
                }
                var ado = "";
                if (data[i].ado == 0) {
                  adk = "A";
                } else if (data[i].ado == 1) {
                  ado = "D";
                } else if (data[i].ado == 2) {
                  ado = "O";
                }
                $('#foulelement').append('<tr><td>'+data[i].game.home+' vs. '+data[i].game.visitor+'</td><td>'+data[i].quarter+'</td><td>'+data[i].time+'</td><td>'+team+'</td><td>'+data[i].foul+'</td><td>'+odrk+'</td><td>'+data[i].player+'</td><td>'+ado+'</td><td>'+data[i].officials+'</td><td>'+data[i].comment+'</td><td>'+data[i].evaluatorComment+'</td><td>'+data[i].supervisorComment+'</td><td>'+grade+'</td></tr>');
              }
              $('table').css("display", "inline");
            }
        });
    });
});