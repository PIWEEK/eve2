angular.module('controllers', [])

.controller("EventsCtrl",['$scope', 'dataService', function($scope, dataService){
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

  this.init();



}])
