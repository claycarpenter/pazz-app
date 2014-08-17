// Code goes here

(function () {
    
  var CHARSETS = {
    consonants: ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'],
    vowels: ['a','e','i','o','u'],
    digits: ['0','1','2','3','4','5','6','7','8','9']
  }
    
  var Utils = {
    getRandomArrayValue: function (valuesArray)  {
      return valuesArray[Math.floor(Math.random() * valuesArray.length)];
    },
    generateRandomPassword: function (charGenerators) {
      var randomPassword = '';  
      
      for (var i = 0; i < charGenerators.length; i++) {
        randomPassword += charGenerators[i].generate();
      }
      
      return randomPassword;
    }
  };
  
  var CharacterGenerators = {
    RandomDigitGenerator: function () {
      this.generate = function () {
        return Utils.getRandomArrayValue(CHARSETS.digits);
      };
    },
    RandomVowelGenerator: function () {
      this.generate = function () {
        return Utils.getRandomArrayValue(CHARSETS.vowels);
      };
    },
    RandomConsonantGenerator: function () {
      this.generate = function () {
        return Utils.getRandomArrayValue(CHARSETS.consonants);
      };
    }
  };

  var Cvccvc99Generator = function () {
    var characterGenerators = [
      new CharacterGenerators.RandomConsonantGenerator(),
      new CharacterGenerators.RandomVowelGenerator(),
      new CharacterGenerators.RandomConsonantGenerator(),
      new CharacterGenerators.RandomConsonantGenerator(),
      new CharacterGenerators.RandomVowelGenerator(),
      new CharacterGenerators.RandomConsonantGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator()
    ];
    
    this.generateRandomPassword = function () {
      return Utils.generateRandomPassword(characterGenerators); 
    };
  };

  var Cvcvcv99Generator = function () {
    var characterGenerators = [
      new CharacterGenerators.RandomConsonantGenerator(),
      new CharacterGenerators.RandomVowelGenerator(),
      new CharacterGenerators.RandomConsonantGenerator(),
      new CharacterGenerators.RandomVowelGenerator(),
      new CharacterGenerators.RandomConsonantGenerator(),
      new CharacterGenerators.RandomVowelGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator()
    ];
    
    this.generateRandomPassword = function () {
      return Utils.generateRandomPassword(characterGenerators); 
    };
  };

  var Digits9999Generator = function () {
    var characterGenerators = [
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator()
    ];
    
    this.generateRandomPassword = function () {
      return Utils.generateRandomPassword(characterGenerators); 
    };
  };

  var Digits999999Generator = function () {
    var characterGenerators = [
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator(),
      new CharacterGenerators.RandomDigitGenerator()
    ];
    
    this.generateRandomPassword = function () {
      return Utils.generateRandomPassword(characterGenerators); 
    };
  };
  
  var pazzApp = angular.module('pazzApp', ['ionic']);
  
  pazzApp.state = {
    passwords: [],
    config: {
      selectPasswordFormat: null,
      batchSize: 5,
      selectedLetterCase: null,
      useLeetSpeakSubs: false
    },
    options: {
      passwordFormatOptions: {
        Cvccvc99: {
          name: "CVCCVC99",
          generator: new Cvccvc99Generator()
        },
        Cvcvcv99: {
          name: "CVCVCV99",
          generator: new Cvcvcv99Generator()
        },
        Digits9999: {
          name: "9999",
          generator: new Digits9999Generator()
        },
        Digits999999: {
          name: "999999",
          generator: new Digits999999Generator()
        }
      },
      letterCaseOptions: {}
    }
  };
  
  pazzApp.init = function () {
    // Regenerate a new set of passwords using the default settings.
    // TODO: In a future release, this should probably read from stored user config.
    console.log('Initializating PazzApp');
    
    pazzApp.state.config.selectedPasswordFormat = pazzApp.state.options.passwordFormatOptions.Cvcvcv99;
    
    //this.generatePasswords();
  };
  
  pazzApp.generatePasswords = function () {
    // Init passwords array, clearing any existing passwords.
    pazzApp.state.passwords = [];
    
    var generator = pazzApp.state.config.selectedPasswordFormat.generator;
    
    for (var i = 0; i < pazzApp.state.config.batchSize; i++) {
      var newPassword = generator.generateRandomPassword();
      
      pazzApp.state.passwords.push(newPassword);
    }
  };
  
  pazzApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "tabs.html"
      })
      .state('tabs.passwords', {
        url: "/passwords",
        views: {
          'passwords-tab': {
            templateUrl: "passwords.html",
            controller: 'PasswordsTabCtrl'
          }
        }
      })
      .state('tabs.settings', {
        url: "/settings",
        views: {
          'settings-tab': {
            templateUrl: "settings.html",
            controller: 'SettingsTabCtrl'
          }
        }
      });
  
     $urlRouterProvider.otherwise("/tab/passwords");
     //$urlRouterProvider.otherwise("/tab/settings");
  });
  
  pazzApp.controller('PasswordsTabCtrl', function($scope) {
    $scope.doRefresh = function () {
      pazzApp.generatePasswords();
      
      $scope.passwords = pazzApp.state.passwords;

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    };
    
    if (!pazzApp.state.passwords.length) {
      $scope.doRefresh();
    }
    
    $scope.passwords = pazzApp.state.passwords;
  });
  
  pazzApp.controller('SettingsTabCtrl', function($scope) {
    // Copy the app state variables into the local scope.
    $scope.data = {
      passwordFormatOptions: pazzApp.state.options.passwordFormatOptions,
      passwordBatchSize: pazzApp.state.config.batchSize,
      passwordFormatSelected: pazzApp.state.config.selectedPasswordFormat
    };
    
    // Responds to changes in the settings screen.
    $scope.settingsChange = function () {
      console.log('settingsChange fired.');
      
      // Clear existing passwords
      pazzApp.state.passwords = [];
      
      // Update config settings.
      pazzApp.state.config.batchSize = $scope.data.passwordBatchSize;
      
      console.log('passwordFormatSelected: ' + $scope.data.passwordFormatSelected);
      pazzApp.state.config.selectedPasswordFormat = $scope.data.passwordFormatSelected
    };
  });

  pazzApp.init();
})();
