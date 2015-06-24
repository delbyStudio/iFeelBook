angular.module('ifeelbook.controllers', ['ngResource', 'ngAnimate'])

.controller('AppCtrl', function($scope) {
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

.controller('QuotesCtrl', function($scope) {
  $scope.feelings = [
    { title: '<i class="icon ion-heart"></i>Lovely', tag: "love" },
    { title: '<i class="icon ion-happy"></i>Funny', tag: "humor" },
    { title: '<i class="icon ion-flash"></i>Determinate', tag: "life" },
    { title: '<i class="icon ion-android-bulb"></i>Inspired', tag: "inspirational" }
  ];
})

.controller('QuoteCtrl', function($scope, $interval, $ionicLoading, $resource, $stateParams, $ionicScrollDelegate){

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
      if($scope.cit.length>250 && $scope.cit.length<400)
        {
          $scope.mCit = true;
          $scope.lCit = false;
        }
      else if($scope.cit.length>400)
          {
          $scope.lCit = true;
          $scope.mCit = false;
          }
        else
        {
          $scope.lCit = false;
          $scope.mCit = false;
        }

      $scope.aut = $scope.cit.substring(i, f);
      $scope.cit = $scope.cit.substring(0, i-1);
    }
  }, 1);

}

$scope.vai();

})
