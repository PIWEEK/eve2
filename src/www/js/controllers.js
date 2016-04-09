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


.controller("EventDetailCtrl",['$scope', '$location', '$ionicScrollDelegate', '$timeout', 'dataService', 'eventsService', 'speakersService', function($scope, $location, $ionicScrollDelegate, $timeout, dataService, eventsService, speakersService){
  this.init = function() {
    this.locationURL = "";
    this.current = 'info';
    this.currentTrackName = "";
    this.favourites = {};
    this.currentTrackNumber = 0;
    this.lastTrackChangeTime = 0;
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
    var top = $ionicScrollDelegate.getScrollPosition().top - 10;
    if (this.current === 'agenda') {
      top += 50;
    }
    this.menuStyle["top"] = top + "px";
    this.menuStyle["right"] = "0%";
    this.menuStyle["display"] = "block";
    this.overlayStyle["display"] = "block";
  }

  this.hideMenu = function(){
    $ionicScrollDelegate.getScrollView().options.scrollingY = true;
    this.menuStyle["right"] = "-70%";
    this.menuStyle["display"] = "none";
    this.overlayStyle["display"] = "none";
  }

  this.setCurrent = function(location){
    this.current = location;
    this.hideMenu();
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
    var n = new Date().getTime();
    if (n - this.lastTrackChangeTime > 1000) {
      this.lastTrackChangeTime = n;
      var position = $ionicScrollDelegate.getScrollPosition();
      this.currentTrackNumber = num;
      var controller = this;
      $timeout(function(){
        $ionicScrollDelegate.scrollTo(position.left, position.top);
      },50)

    }
  }

  this.openTalk = function(talk) {
    if (!talk.break) {
      speakersService.currentTalk = talk;
      speakersService.speakers = [];

      for (i=0;i<talk.speakers.length;i++){
        speakersService.speakers.push(this.speakers[talk.speakers[i]]);
      }

      $location.path('/speaker');
    }
  }

  this.toggleFavourite = function(talk, day, day_num){
    pos = this.favourites.ids.indexOf(talk.id);
    if (pos > -1){
      this.favourites.talks.splice(pos, 1);
      this.favourites.ids.splice(pos, 1);

    } else {
      clonedTalk = JSON.parse(JSON.stringify(talk));
      clonedTalk.track = this.currentTrackName;
      clonedTalk.day = day;
      clonedTalk.day_num = day_num;

      this.favourites.ids.push(talk.id);
      this.favourites.talks.push(clonedTalk);
    }
    dataService.saveFavourites(this.eventDetail.id, this.favourites);

  }


  this.init();
}])


.controller("SpeakerDetailCtrl",['$scope', '$location', 'speakersService', 'dataService', function($scope, $location, speakersService, dataService){
  this.speaker = {}
  this.init = function() {
    this.speakers = speakersService.speakers;
    this.currentTalk = speakersService.currentTalk;
    this.eventDetail = dataService.currentEventDetail;
  }

  this.navigateTo = function(url){
    $location.path(url);
  }

  this.slugify = function(text){
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  this.tweet = function(){
    var text = "At \""+this.currentTalk.name+"\" by ";
    for (i=0; i< this.speakers.length; i++) {
      var speaker = this.speakers[i];
      if (speaker.twitter !== ""){
        text += speaker.twitter;
      } else {
        text += speaker.name;
      }
      if (i < this.speakers.length-1){
        text += " and "
      }
    }

    if ((this.eventDetail.hashtag !== undefined) && (this.eventDetail.hashtag !== "")) {
      text += " "+this.eventDetail.hashtag;
    } else {
      text += " %23"+this.slugify(this.eventDetail.shortname);
    }

    if ((this.currentTalk.hashtag !== undefined) && (this.currentTalk.hashtag !== "")) {
      text += " "+this.currentTalk.hashtag;
    }

    var url = "https://twitter.com/intent/tweet?text="+text;

    window.open(url, '_system', 'location=no');
  }

  this.init();
}])
