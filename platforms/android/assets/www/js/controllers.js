angular.module('pazz.app.controllers', [])

.controller('PasswordsCtrl', function($scope) {
    var data = $scope.data = {};
    
    var pazzAppModule = angular.module('pazz.app');
    
    data.passwords = pazzAppModule.state.passwords;
    
    $scope.doRefresh = function () {
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
        
        pazzAppModule.refreshPasswords();    
        
        data.passwords = pazzAppModule.state.passwords;
    }
})

.controller('SettingsCtrl', function($scope) {
  var pazzAppModule = angular.module('pazz.app');
    
  $scope.data = {
      passwordFormatOptions: pazzAppModule.settings.passwordFormatOptions,
      selectedPasswordFormat: pazzAppModule.state.selectedPasswordFormat
  };
    
    $scope.onClickPasswordFormatRadio = function(selectedPasswordFormat) {
        $scope.data.selectedPasswordFormat = selectedPasswordFormat;    
        
        pazzAppModule.state.selectedPasswordFormat = $scope.data.selectedPasswordFormat;
        
        pazzAppModule.refreshPasswords();
    }
});
