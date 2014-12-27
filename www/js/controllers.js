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
    
  $scope.settings = pazzAppModule.settings;
    
    $scope.onClickPasswordFormatRadio = function(selectedPasswordFormat) {
        for (passwordFormatOptionName in $scope.settings.passwordFormatOptions) {
            var passwordFormatOption = $scope.settings.passwordFormatOptions[passwordFormatOptionName];
            
            passwordFormatOption.isSelected = false;    
        }
        
        selectedPasswordFormat.isSelected = true;
    }
});
