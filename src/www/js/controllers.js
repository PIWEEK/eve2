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


.controller("EventDetailCtrl",['$scope', '$location', 'dataService', 'eventsService', function($scope, $location, dataService, eventsService){
  this.init = function() {
    this.locationURL = "";
    this.current = 'info';
    this.currentTrack = {};
    this.speakers = [];
    this.menuStyle = {
        "right" : "-70%",
        "display" : "none"
    }
    this.openedTalk = -1;
    var controller = this;
    dataService.getEventDetail(eventsService.currentEvent).then(function(data) {
      controller.eventDetail = data;
      controller.currentTrack = data.agenda[0];
      controller.loadSpeakers();
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
  }

  this.hideMenu = function(){
    this.menuStyle["right"] = "-70%";
    this.menuStyle["display"] = "none";
  }

  this.setCurrent = function(location){
    this.current = location;
    this.hideMenu();
  }

  this.openTalk = function(num){
    this.openedTalk = num;
  }

  this.loadSpeakers = function(){
    this.speakers = [];
    var speaker;
    for (var i=0; i<this.eventDetail.speakers.length; i++) {
      speaker = this.eventDetail.speakers[i];
      this.speakers[speaker.id] = speaker;
    }
  }




  this.init();
}])
