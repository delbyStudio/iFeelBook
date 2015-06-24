// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

    .state('app.quotes', {
      url: "/quotes",
      views: {
        'menuContent': {
          templateUrl: "templates/quotes.html",
          controller: 'QuotesCtrl'
        }
      }
    })

  .state('app.quote', {
    url: "/quotes/:tag",
    views: {
      'menuContent': {
        templateUrl: "templates/quote.html",
        controller: 'QuoteCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/quotes');
});
