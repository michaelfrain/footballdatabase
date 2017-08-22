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
              var team = "";
              if (data[i].homeTeam == true) {
                team = "H";
              } else {
                team = "V";
              }
              var grade = "";
              if (data[i].grade == null) {
                grade = "";
              } else {
                grade = data[i].grade;
              }
              for (var i=0; i<data.length; i++) {
                $('#foulelement').append('<tr><td>'+data[i].game.home+' vs. '+data[i].game.visitor+'</td><td>'+data[i].quarter+'</td><td>'+data[i].time+'</td><td>'+team+'</td><td>'+data[i].foul+'</td><td>'+data[i].odrk+'</td><td>'+data[i].player+'</td><td>'+data[i].ado+'</td><td>'+data[i].officials+'</td><td>'+data[i].comment+'</td><td>'+data[i].evaluatorComment+'</td><td>'+data[i].supervisorComment+'</td><td>'+grade+'</td></tr>');
              }
              $('table').css("display", "inline");
            }
        });
    });
});