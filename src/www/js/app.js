// TODO: Only for develop
window.localStorage['eventList'] = '[{"name":"Greach", "date":"01/01/2016", "place":"Madrid", "logo":"http://blog.engineering.ticketbis.com/content/images/2015/06/greach.jpg"},{"name":"Codemotion", "date":"13/07/2016", "place":"Barcelona", "logo":"images/codemotion.jpg"},{"name":"Pycon", "date":"09/11/2016", "place":"Zaragoza", "logo":"images/pycon.jpg"},{"name":"Greach", "date":"01/01/2016", "place":"Madrid", "logo":"http://blog.engineering.ticketbis.com/content/images/2015/06/greach.jpg"},{"name":"Codemotion", "date":"13/07/2016", "place":"Barcelona", "logo":"images/codemotion.jpg"},{"name":"Pycon", "date":"09/11/2016", "place":"Zaragoza", "logo":"images/pycon.jpg"},{"name":"Greach", "date":"01/01/2016", "place":"Madrid", "logo":"http://blog.engineering.ticketbis.com/content/images/2015/06/greach.jpg"},{"name":"Codemotion", "date":"13/07/2016", "place":"Barcelona", "logo":"images/codemotion.jpg"},{"name":"Pycon", "date":"09/11/2016", "place":"Zaragoza", "logo":"images/pycon.jpg"},{"name":"Greach", "date":"01/01/2016", "place":"Madrid", "logo":"http://blog.engineering.ticketbis.com/content/images/2015/06/greach.jpg"},{"name":"Codemotion", "date":"13/07/2016", "place":"Barcelona", "logo":"images/codemotion.jpg"},{"name":"Pycon", "date":"09/11/2016", "place":"Zaragoza", "logo":"images/pycon.jpg"}]';




// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('eveApp', ['ionic', 'services', 'controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})




.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('events', {
    url: "/events",
    templateUrl: "templates/events.html"
  })

  .state('eventDetail', {
    url: "/eventDetail",
    templateUrl: "templates/eventDetail.html",
  })

  .state('eventLocation', {
    url: "/eventLocation",
    templateUrl: "templates/eventLocation.html",
  })

  $urlRouterProvider.otherwise('/events');

});
