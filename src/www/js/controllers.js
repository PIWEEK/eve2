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
    $location.path('/eventDetail');
  }

  this.init();



}])


.controller("EventDetailCtrl",['$scope', '$location', 'dataService', 'eventsService', function($scope, $location, dataService, eventsService){
  this.init = function() {
    var controller = this;
    dataService.getEventDetail(eventsService.currentEvent).then(function(data) {
      controller.eventDetail = data;
    });
  }

  this.init();
}])
