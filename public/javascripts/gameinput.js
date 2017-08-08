$(document).ready(function() {
    $.ajax({
        url: "/api/games"
    }).then(function(data) {
        for (var i=0; i<data.length; i++) {
            $('#game').append('<option value="'+data[i]._id+'">'+data[i].home+' vs. '+data[i].visitor+'</option>');
        }
    });
});