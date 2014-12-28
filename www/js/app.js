// Pazz, an Ionic-based Mobile App

angular.module('pazz.app', ['ionic', 'pazz.app.controllers', 'pazz.app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function() {
  console.log('pazz.app run - custom');  
    
    var pazzAppModule = angular.module('pazz.app');
    
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
    
    pazzAppModule.settings = {
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
      }
    };
    
    pazzAppModule.state = {
        selectedPasswordFormat: pazzAppModule.settings.passwordFormatOptions.Cvcvcv99,
        batchSize: 6,
        passwords: [
            "Curano56",
            "Togere34",
            "Wozuke14",
            "Saderi86",
            "Nadoro01",
            "Bareti01"
        ]
    };
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.passwords', {
    url: '/passwords',
    views: {
      'tab-passwords': {
        templateUrl: 'templates/tab-passwords.html',
        controller: 'PasswordsCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/passwords');

});
