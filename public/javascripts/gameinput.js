$(document).ready(function() {
    $.ajax({
        url: "/api/users"
    }).then(function(data) {
        for (var i=0; i<data.length; i++) {
            $('#referee').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
            $('#umpire').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
            $('#headlines').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
            $('#linejudge').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
            $('#fieldjudge').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
            $('#sidejudge').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
            $('#backjudge').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
            $('#observer').append('<option value="'+data[i]._id+'">'+data[i].firstName+' '+data[i].lastName+'</option>');
        }
    });
    
    $.ajax({
        url: "/api/games"
    }).then(function(data) {
        console.log(data);
    });
    
    $('#postgame').click(function () {
        var data = $('#newgame').serializeJSON();
        var officials = [$('#referee').val(), $('#umpire').val(), $('#headlines').val(), $('#linejudge').val(), $('#fieldjudge').val(), $('#sidejudge').val(), $('#backjudge').val(), $('#observer').val()];
        data.officials = officials;
        var dataString = JSON.stringify(data);
        $.ajax({
            url: "/api/games",
            type: "POST",
            contentType: "application/json",
            data: dataString
        });
    });
});