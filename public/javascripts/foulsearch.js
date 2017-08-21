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
                $('#foulelement').append('<tr><td>'+data[i].game+'</td><td>'+data[i].quarter+'</td><td>'+data[i].time+'</td><td>'+data[i].foul+'</td></tr>');
              }
              $('table').css("display", "inline");
            }
        });
    });
});