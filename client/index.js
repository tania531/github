'use strict';

$(document).ready(init);

function init() {
  generateTiles();
}

var gitIds = ['samerbuna', 'IAmEddieDean', 'dhh'];

function generateTiles() {
  gitIds.forEach(function(users){
    var url = 'https://api.github.com/users/'+users;
    $.getJSON(url, function(response){
      var $div = $('<div>');
      $div.attr('class', 'col-md-4');
      $div.attr('id', users)
      $div.text(response.name);
      $('.row').append($div);
      var $img = $('<div>');
      $img.addClass('image');
      $img.css('background-image', 'url("'+response.avatar_url+'")');
      $($div).append($img);
    });
  });
}
