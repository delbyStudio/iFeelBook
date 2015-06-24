angular.module('ifeelbook', ['ionic', 'ifeelbook.controllers'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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

  $urlRouterProvider.otherwise('/app/quotes');
  $ionicConfigProvider.views.transition('none');
});