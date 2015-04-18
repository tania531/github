'use strict';

$(document).ready(init);

function init() {
  generateTiles();
}
var currTime = moment.utc();
var profiles = [
  {un:'samerbuna', dailyCommits:0},
  {un:'dhh', dailyCommits:0},
  {un:'IAmEddieDean', dailyCommits:0},
  {un:'EdsDover', dailyCommits:0},
  {un:'chyld', dailyCommits:0},
  {un:'sherylpeebee', dailyCommits:0},
  {un:'tania531', dailyCommits:0}
];
function generateTiles() {
  profiles.forEach(function(profile){
    var profileUrl = 'https://api.github.com/users/' + profile.un;
    var eventsUrl = profileUrl + '/events';
    $.getJSON(profileUrl, function(profileresponse){
      $.getJSON(eventsUrl, function(eventsresponse){
       var counts = countCommits(eventsresponse);
       var $newRow = $("#template").clone();
       $newRow.find(".image").attr("src", profileresponse.avatar_url);
       $newRow.find(".name").text(profileresponse.name);
       $newRow.find(".commits").text('commits in the last 24 hours: ' + counts.commitCount);
       $newRow.find(".pulls").text('pull requests: ' + counts.pullCount);
       $newRow.find(".score").text('score: ' + counts.score);
       $newRow.find(".card.row").addClass('status-'+colorTiles(counts.commitCount));
       console.log(colorTiles(counts.commitCount));
       $newRow.removeClass('hidden');
       $('#cards-container').append($newRow);
      });
    });
  });
}

function colorTiles(dc){
  return dc > 4 ? 'pass' : 'fail';
}

function countCommits(eventsresponse){
  var counts = {commitCount: 0, pullCount: 0, score:0};

  eventsresponse.forEach(function(event){
    if(event.payload.comment !== '' && moment.utc(event.created_at).diff(currTime, 'hours') > -24){
     counts.commitCount++;
    }
    if(event.type === 'PullRequestEvent'){
      counts.pullCount++;
    }
    counts.score = counts.commitCount + counts.pullCount + 10;
  });
  return counts;
}
