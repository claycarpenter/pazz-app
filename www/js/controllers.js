angular.module('pazz.app.controllers', [])

.controller('PasswordsCtrl', function($scope) {
    var data = $scope.data = {};
    
    data.passwords = [
        "Curano56",
        "Togere34",
        "Wozuke14",
        "Saderi86",
        "Nadoro01",
        "Bareti01"
    ];
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
    }
});
