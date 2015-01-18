angular.module('pazz.app.controllers', ['pazz.app.services'])

.controller('PasswordsCtrl', 
    ['$scope', 'passwordService', function($scope, passwordService) {
    var data = $scope.data = {};
    
    // Collect all of the passwords.
    data.passwords = passwordService.getAll();
    
    $scope.doRefresh = function () {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
        
        // Generate new passwords.
        passwordService.generateNewPasswords();
        
        // Refresh the scope passwords list.
        data.passwords = passwordService.getAll();
    }
}])

.controller('SettingsCtrl', 
    ['$scope', 'passwordGeneratorsService', 'pazzConfigService', 'passwordService', function($scope, passwordGeneratorsService, pazzConfigService, passwordService) {
    $scope.data = {};
    
    $scope.data.passwordFormatOptions = passwordGeneratorsService.getAll();
    $scope.data.currentPasswordGenerator = pazzConfigService.getCurrentPasswordGeneratorOption();
        
    $scope.onClickPasswordFormatRadio = function(selectedPasswordFormat) {
        if (selectedPasswordFormat == $scope.data.currentPasswordGenerator) {
            // User has selected already selected format option, 
            // don't refresh passwords list or change password format.
            return;
        }
        
        $scope.data.currentPasswordGenerator = selectedPasswordFormat;
        
        pazzConfigService.setCurrentPasswordGeneratorOption(selectedPasswordFormat);
        
        // Generate new passwords.
        passwordService.generateNewPasswords();
    }
}]);
