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
      var $newRow = $("#template").clone();
      $newRow.find(".image").attr("src", response.avatar_url);
      $newRow.find(".name").text(response.name);
      $newRow.removeClass("hidden");
      $('#cards-container').append($newRow);
    });
  });
}
