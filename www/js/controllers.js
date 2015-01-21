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
    ['$scope', 'passwordFormatsService', 'pazzConfigService', 'passwordService', function($scope, passwordFormatsService, pazzConfigService, passwordService) {
    $scope.data = {};
    
    $scope.data.passwordFormatOptions = passwordFormatsService.getAll();
    $scope.data.currentPasswordFormatId = pazzConfigService.getCurrentPasswordFormatOptionId();
        
    $scope.onClickPasswordFormatRadio = function(selectedPasswordFormatId) {
        if (selectedPasswordFormatId == $scope.data.currentPasswordFormatId) {
            // User has selected already selected format option, 
            // don't refresh passwords list or change password format.
            return;
        }
        
        $scope.data.currentPasswordFormatId = selectedPasswordFormatId;
        
        pazzConfigService.setCurrentPasswordFormatOptionId(selectedPasswordFormatId);
        
        // Generate new passwords.
        passwordService.generateNewPasswords();
    }
}]);
