angular.module('starter.controllers', [])

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
  $scope.settings = {
    enableFriends: true
  };
});
