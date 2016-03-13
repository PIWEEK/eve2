
angular.module('services', [])

.service('dataService', ['$http', '$q',function($http, $q) {
  this.eventsURL = 'http://eveapp.top/api/v1/events.js';
  this.eventDetailURL = 'http://eveapp.top/api/v1/event/_id_/.js';

  this.eventList = {};
  this.getEventList = function() {
    var service = this;
    var deferred = $q.defer();

    // Try to load from API
    $http.get(this.eventsURL)
      .success(function (json) {
        console.log(json);
        service.saveEventList(json);
        deferred.resolve(json);
      })
      .error(function (error) {
        console.log('error');
        var data = service.loadEventList();
        deferred.resolve(data);
      });

    return deferred.promise;
  }

  this.saveEventList = function(eventList) {
    window.localStorage['eventList'] = JSON.stringify(eventList);
  }

  this.loadEventList = function() {
    return JSON.parse(window.localStorage['eventList'] || '{}');
  }

  this.saveEvent = function(event) {
    window.localStorage[event.name] = JSON.stringify(event);
  }


  this.loadEvent = function(event) {
    return JSON.parse(window.localStorage[event.name] || '{}');
  }


}]);
