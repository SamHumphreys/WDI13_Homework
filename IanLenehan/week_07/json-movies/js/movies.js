var request = new XMLHttpRequest();
var omdb_url = ''
var title = ''

$(document).ready(function() {

  $('#button').on('click', function() {
    title = $('#search').val();
    omdb_url = 'http://omdbapi.com?s=' + title;

    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return;
      }
      var content = $('#content');

      var info = JSON.parse(request.responseText);
      for (var i = 0; i < 10; i++) {
        // content.append("<a class='poster' href=" + info.Search[i].imdbID + "><p>" + info.Search[i].Title + "</p></a>");
        content.append("<p class='poster' id=" + info.Search[i].imdbID + ">" + info.Search[i].Title + "</p>");
      };
    };
    request.open('GET', omdb_url);
    request.send();
  });

  $('body').on('click', '.poster', function() {

    new_url = 'http://omdbapi.com?i=' + $(this).attr('id')

    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }
      var image = $('#image');

      var info = JSON.parse(request.responseText);
      image.html("<img src=" + info.Poster + ">" + "<p>" + info.Plot + "</p>")
    }

    request.open('GET', new_url);
    request.send();
  });

});
