angular.module('pazz.app.controllers', ['pazz.app.services'])

.controller('PasswordsCtrl', 
    ['$scope', 'passwordGeneratorService', function($scope, passwordGeneratorService) {
    var data = $scope.data = {};
    
    // Collect all of the passwords.
    data.passwords = passwordGeneratorService.getAll();
    
    $scope.doRefresh = function () {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
        
        // Generate new passwords.
        passwordGeneratorService.generateNewPasswords();
        
        // Refresh the scope passwords list.
        data.passwords = passwordGeneratorService.getAll();
    }
}])

.controller('SettingsCtrl', function($scope) {
    $scope.onClickPasswordFormatRadio = function(selectedPasswordFormat) {
        $scope.data.selectedPasswordFormat = selectedPasswordFormat;    
        
        pazzAppModule.state.selectedPasswordFormat = $scope.data.selectedPasswordFormat;
        
        pazzAppModule.refreshPasswords();
    }
});
