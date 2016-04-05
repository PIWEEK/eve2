angular.module('controllers', [])

.controller("EventsCtrl",['$scope', '$location', 'dataService', 'eventsService', function($scope, $location, dataService, eventsService){
  this.init = function() {
    var controller = this;
    dataService.getEventList().then(function(data) {
      controller.eventList = data;
      controller.filteredEvents = controller.eventList;
    });

    this.filter = '';
  }

  this.hideEvent = function(event){
    return (this.filter !== '') && (event.name.toLowerCase().indexOf(this.filter.toLowerCase()) < 0);
  }

  this.selectEvent = function(event) {
    eventsService.currentEvent = event;
    $location.path('/event');
  }

  this.init();



}])


.controller("EventDetailCtrl",['$scope', '$location', 'dataService', 'eventsService', 'speakersService', function($scope, $location, dataService, eventsService, speakersService){
  this.init = function() {
    this.locationURL = "";
    this.current = 'info';
    this.currentTrack = {};
    this.favourites = {};
    this.currentTrackNumber = 0;
    this.speakers = [];
    this.menuStyle = {
        "right" : "-70%",
        "display" : "none"
    }
    this.overlayStyle = {
        "display" : "none"
    }
    this.openedTalk = -1;
    var controller = this;
    dataService.getEventDetail(eventsService.currentEvent).then(function(data) {
      controller.eventDetail = data;
      controller.selectTrack(0);
      controller.loadSpeakers();
      controller.favourites = dataService.loadFavourites(data.id);
    });
  }

  this.navigateTo = function(url){
    $location.path(url);
  }

  this.toggleMenu = function(){
    if (this.menuStyle["display"] === "none"){
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }

  this.showMenu = function(){
    this.menuStyle["right"] = "0%";
    this.menuStyle["display"] = "block";
    this.overlayStyle["display"] = "block";
    console.log(this.overlayStyle);
  }

  this.hideMenu = function(){
    this.menuStyle["right"] = "-70%";
    this.menuStyle["display"] = "none";
    this.overlayStyle["display"] = "none";
    console.log(this.overlayStyle);
  }

  this.setCurrent = function(location){
    this.current = location;
    this.hideMenu();
  }

  this.toggleTalk= function(num){
    if (this.openedTalk === num) {
      this.openedTalk = -1;
    } else {
      this.openedTalk = num;
    }
  }

  this.loadSpeakers = function(){
    this.speakers = [];
    var speaker;
    for (var i=0; i<this.eventDetail.speakers.length; i++) {
      speaker = this.eventDetail.speakers[i];
      this.speakers[speaker.id] = speaker;
    }
  }

  this.selectNextTrack = function() {
    this.currentTrackNumber += 1;
    if (this.currentTrackNumber >= this.eventDetail.agenda.length) {
      this.currentTrackNumber = 0;
    }
    this.selectTrack(this.currentTrackNumber);
  }

  this.selectPreviousTrack = function() {
    this.currentTrackNumber -= 1;
    if (this.currentTrackNumber < 0) {
      this.currentTrackNumber = this.eventDetail.agenda.length -1;
    }
    this.selectTrack(this.currentTrackNumber);
  }

  this.selectTrack = function(num) {
    this.currentTrack = this.eventDetail.agenda[num];
    this.currentTrackNumber = num;
  }

  this.selectSpeaker = function(speakerId) {
    speakersService.currentSpeaker = this.speakers[speakerId];
    $location.path('/speaker');
  }

  this.toggleFavourite = function(talk, day, day_num){
    pos = this.favourites.ids.indexOf(talk.id);

    if (pos > -1){
      this.favourites.talks.splice(pos, 1);
      this.favourites.ids.splice(pos, 1);

    } else {
      clonedTalk = JSON.parse(JSON.stringify(talk));
      clonedTalk.track = this.currentTrack.name;
      clonedTalk.day = day;
      clonedTalk.day_num = day_num;

      this.favourites.ids.push(talk.id);
      this.favourites.talks.push(clonedTalk);
    }
    dataService.saveFavourites(this.eventDetail.id, this.favourites);
  }


  this.init();
}])


.controller("SpeakerDetailCtrl",['$scope', '$location', 'speakersService', function($scope, $location, speakersService){
  this.speaker = {}
  this.init = function() {
    this.speaker = speakersService.currentSpeaker;
  }

  this.navigateTo = function(url){
    $location.path(url);
  }

  this.init();
}])
