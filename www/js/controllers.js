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
  $scope.settings = {
      passwordFormatOptions: {
        Cvccvc99: {
          name: "CVCCVC99",
          generator: null
        },
        Cvcvcv99: {
          name: "CVCVCV99",
          generator: null
        },
        Digits9999: {
          name: "9999",
          generator: null
        },
        Digits999999: {
          name: "999999",
          generator: null
        }
      }
  };
});
