'use strict';

$(document).ready(init);

function init(){
  generateTiles();
  // $('body').on('click', '#draw', generateTiles);
  
}
// $('#fetch').on('click', function(){
//   var value = $('#input').val()
//   var url = 'https://api.github.com/users/'+value+;
//
//   $.getJSON(url, function(){
//
//   })
// })

var gitIds = ['samerbuna', 'IAmEddieDean', 'dhh'];

function generateTiles(){
  // var url = 'https://api.github.com/users/'+users;
  gitIds.forEach(function(users){
    var url = 'https://api.github.com/users/'+users;
    $.getJSON(url, function(response){
      console.log(response.avatar_url);
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
  
