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

.controller('SettingsCtrl', function($scope) {
    $scope.onClickPasswordFormatRadio = function(selectedPasswordFormat) {
        $scope.data.selectedPasswordFormat = selectedPasswordFormat;    
        
        pazzAppModule.state.selectedPasswordFormat = $scope.data.selectedPasswordFormat;
        
        pazzAppModule.refreshPasswords();
    }
});
