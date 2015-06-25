angular.module('ifeelbook.controllers', ['ngResource', 'ngAnimate', 'ngCordova'])

.controller('AppCtrl', function($scope, $cordovaNetwork, $ionicPlatform, $ionicPopup, $rootScope, $cordovaLocalNotification) {

 $ionicPlatform.ready(function() {

      //This plugin not support PhoneGap Build docs: https://github.com/katzer/cordova-plugin-local-notifications
     /* var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 15 * 1000);

      $cordovaLocalNotification.schedule({
        id: 1,
        title: "Today I'm feeling...",
        text: 'A quotes is ready for you!',
        at: _10SecondsFromNow
      }).then(function (result) {
        // ...
      });*/

       $scope.showAlert = function() {
         var alertPopup = $ionicPopup.alert({
           title: '<span class="assertive">Connection error!</span>',
           template: 'Check your connection and try again.'
         });
         alertPopup.then(function(res) {
          $scope.reloadNetwork();
         });
       }

       var lastStatus = "";
       $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          if(lastStatus != 'disconnected') {
              lastStatus = 'disconnected';
              $scope.showAlert();
            }
        })

       $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          if(lastStatus != 'connected' && lastStatus != '') {
              lastStatus = 'connected';
            }
        })

      $scope.reloadNetwork = function() {
        var isOffline = $cordovaNetwork.isOffline();
        if(isOffline)
          $scope.showAlert();
        }

 })


  $scope.back = function(){
    $scope.colour=[0,1,2,3,4];
    function rfx(){ return Math.floor((Math.random() * 5));}
    do{
      window.oldnum=rfx();
      }while(window.oldnum==window.rs)
      window.rs = window.oldnum;
    $scope.colourx=$scope.colour[window.rs];
};

$scope.back();
  
})

.controller('SettingsCtrl', function($scope) {

})

.controller('QuotesCtrl', function($scope) {
  $scope.feelings = [
    { title: '<i class="icon ion-heart"></i>Lovely', tag: "love" },
    { title: '<i class="icon ion-happy"></i>Funny', tag: "humor" },
    { title: '<i class="icon ion-flash"></i>Determinate', tag: "life" },
    { title: '<i class="icon ion-lightbulb"></i>Inspired', tag: "inspirational" }
  ];

})

.controller('QuoteCtrl', function($scope, $interval, $ionicLoading, $resource, $stateParams, $ionicScrollDelegate, $cordovaSocialSharing){

$scope.vai = function(){
  if($stateParams.tag==null)
  {
    $scope.cit = false;
    $scope.aut = false;
  }

  $scope.back();
  $ionicScrollDelegate.scrollTop();
  $ionicLoading.show({template: '<ion-spinner icon="android"></ion-spinner>'});
    
  var r1 = Math.floor((Math.random() * 100) + 1);
  var url = 'https://api.import.io/store/data/c675bf18-4fe8-46ab-990e-f0fa7cdbfe9b/_query?input/webpage/url=http%3A%2F%2Fwww.goodreads.com%2Fquotes%2Ftag%2F'+$stateParams.tag+'?page='+r1+'&_user=9ee10a2c-39aa-4d1d-943e-f8f6eb44df40&_apikey=9ee10a2c-39aa-4d1d-943e-f8f6eb44df40%3AGYN1SbRC7LWWyypaRoIx1YhMBgqfFTsLK%2BREjvdcpvzMGHPMuabOP3ye12T1pKwMcgaPloIqIpXvjv9fnYtaQA%3D%3D';
  var api = $resource(url);
  $scope.giorni = api.get();
  if($scope.giorni.results==null)
  {
    var r2 = Math.floor((Math.random() * 50) + 1);
    var url = 'https://api.import.io/store/data/c675bf18-4fe8-46ab-990e-f0fa7cdbfe9b/_query?input/webpage/url=http%3A%2F%2Fwww.goodreads.com%2Fquotes%2Ftag%2F'+$stateParams.tag+'?page='+r2+'&_user=9ee10a2c-39aa-4d1d-943e-f8f6eb44df40&_apikey=9ee10a2c-39aa-4d1d-943e-f8f6eb44df40%3AGYN1SbRC7LWWyypaRoIx1YhMBgqfFTsLK%2BREjvdcpvzMGHPMuabOP3ye12T1pKwMcgaPloIqIpXvjv9fnYtaQA%3D%3D';
    var api = $resource(url);
    $scope.giorni = api.get();
      if($scope.giorni.results==null)
      {
        var r3 = Math.floor((Math.random() * 30) + 1);
        var url = 'https://api.import.io/store/data/c675bf18-4fe8-46ab-990e-f0fa7cdbfe9b/_query?input/webpage/url=http%3A%2F%2Fwww.goodreads.com%2Fquotes%2Ftag%2F'+$stateParams.tag+'?page='+r3+'&_user=9ee10a2c-39aa-4d1d-943e-f8f6eb44df40&_apikey=9ee10a2c-39aa-4d1d-943e-f8f6eb44df40%3AGYN1SbRC7LWWyypaRoIx1YhMBgqfFTsLK%2BREjvdcpvzMGHPMuabOP3ye12T1pKwMcgaPloIqIpXvjv9fnYtaQA%3D%3D';
        var api = $resource(url);
        $scope.giorni = api.get();
      }
  }

  var cerca = $interval(function() {
    if($scope.giorni.$resolved==true)
    {
      $scope.start = true;
      $interval.cancel(cerca);
      var rx = Math.floor((Math.random() * 30));
      $ionicLoading.hide();
      $scope.cit = $scope.giorni.results[rx].quotetext_content;
      var i = $scope.cit.indexOf('―');
      var f = $scope.cit.length;
      $scope.aut = $scope.cit.substring(i, f);
      $scope.cit = $scope.cit.substring(0, i-1);
    }
  }, 1);

}

$scope.vai();

$scope.share = function() 
	{
     	$cordovaSocialSharing.share($scope.cit+"\n"+$scope.aut, null, null, null);
	}
})
