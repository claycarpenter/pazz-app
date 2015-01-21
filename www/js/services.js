(function() {
    var servicesModule = angular.module('pazz.app.services', []);
    
    // Define value providers for the three sets of random character 
    // candidates.
    servicesModule.value('consonantCharSet', 
        ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']);
    
    servicesModule.value('vowelCharSet', 
        ['a', 'e', 'i', 'o', 'u']);
    
    servicesModule.value('digitCharSet', 
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    
    var RandomCharacterService = function (charSet) {
        var getRandomValue = function() {
            return charSet[Math.floor(Math.random() * charSet.length)];
        };
        
        // Define external interface.
        this.getRandomValue = getRandomValue;
    }
    
    servicesModule.service('randomConsonantService', 
        ['consonantCharSet', RandomCharacterService]);
    
    servicesModule.service('randomVowelService', 
        ['vowelCharSet', RandomCharacterService]);
    
    servicesModule.service('randomDigitService', 
        ['digitCharSet', RandomCharacterService]);
    
    var PasswordFormatsService = function (randomConsonantService, randomVowelService, randomDigitService) {
        var PasswordGenerator = function (randomValueServices) {
            this.generateRandomPassword = function() {
                var newPassword = [];
                
                for (var i = 0; i < randomValueServices.length; i++) {
                    var randomValueService = randomValueServices[i];
                    
                    newPassword.push(randomValueService.getRandomValue());
                }
                
                return newPassword.join('');
            };
        };
        
        var passwordFormats = {
            'Cvcvc99': {
                id: 'Cvcvc99',
                name: 'CVCVC99',
                generator: new PasswordGenerator([
                    randomConsonantService, randomVowelService, randomConsonantService, randomVowelService, randomConsonantService, randomDigitService, randomDigitService
                ])
            },
            'Cvccvc99': {
                id: 'Cvccvc99',
                name: 'CVCCVC99',
                generator: new PasswordGenerator([
                    randomConsonantService, randomVowelService, randomConsonantService, randomConsonantService, randomVowelService, randomConsonantService, randomDigitService, randomDigitService
                ])
            },
            'Cvcvcv99': {
                id: 'Cvcvcv99',
                name: 'CVCVCV99',
                generator: new PasswordGenerator([
                    randomConsonantService, randomVowelService, 
                    randomConsonantService, randomVowelService, 
                    randomConsonantService, randomVowelService, 
                    randomDigitService, randomDigitService
                ])
            },
            'Vcvc99': {
                id: 'Vcvc99',
                name: 'VCVC99',
                generator: new PasswordGenerator([
                    randomVowelService, randomConsonantService, 
                    randomVowelService, randomConsonantService, 
                    randomDigitService, randomDigitService
                ])
            },
            'Vcvcvc99': {
                id: 'Vcvcvc99',
                name: 'VCVCVC99',
                generator: new PasswordGenerator([
                    randomVowelService, randomConsonantService, 
                    randomVowelService, randomConsonantService, 
                    randomVowelService, randomConsonantService,
                    randomDigitService, randomDigitService
                ])
            },
            '9999': {
                id: '9999',
                name: '9999',
                generator: new PasswordGenerator([
                    randomDigitService, randomDigitService,
                    randomDigitService, randomDigitService
                ])
            },
            '999999': {
                id: '999999',
                name: '999999',
                generator: new PasswordGenerator([
                    randomDigitService, randomDigitService,
                    randomDigitService, randomDigitService,
                    randomDigitService, randomDigitService
                ])
            }
        };
        
        this.getById = function(formatId) {
            return passwordFormats[formatId];  
        };
        
        this.getAll = function() {
            return passwordFormats;
        };
    };
    
    servicesModule.service('passwordFormatsService', 
        ['randomConsonantService', 'randomVowelService', 'randomDigitService', PasswordFormatsService]);
    
    servicesModule.value('defaultPasswordFormatOptionId', 'Cvccvc99');
    
    var AppStateStoreService = function() {
        var passwordFormatOptionId;
        var store = window.localStorage;

        this.persist = function() {
            var passwordFormatOptionIdJson = JSON.stringify(passwordFormatOptionId);
            store.setItem('pazz.passwordFormatOptionId', passwordFormatOptionIdJson);
        };
        
        this.read = function() {
            var passwordFormatOptionIdJson = store.getItem('pazz.passwordFormatOptionId');
            passwordFormatOptionId = JSON.parse(passwordFormatOptionIdJson);
        };
        
        this.setPasswordFormatOptionId = function(newPasswordFormatOptionId) {
            passwordFormatOptionId = newPasswordFormatOptionId;
        };
        
        this.getPasswordFormatOptionId = function() {
            return passwordFormatOptionId;
        };
    };
    
    servicesModule.service('appStateStoreService', [AppStateStoreService]);
    
    var PazzConfigService = function(passwordFormatsService, appStateStoreService) {
        var passwordsCount = 6;
        var currentPasswordFormatOptionId;
        
        var getCurrentPasswordFormatOptionId = function() {
            return currentPasswordFormatOptionId;
        };
        
        var getCurrentPasswordFormatOption = function() {
            return passwordFormatsService.getById(currentPasswordFormatOptionId);    
        };
        
        var setCurrentPasswordFormatOptionId = function(newPasswordFormatOptionId) {
            currentPasswordFormatOptionId = newPasswordFormatOptionId;    
            
            appStateStoreService.setPasswordFormatOptionId(
                currentPasswordFormatOptionId);
            appStateStoreService.persist();
        };
        
        var getPasswordsCount = function() {
            return passwordsCount;
        }
        
        this.getCurrentPasswordFormatOptionId = getCurrentPasswordFormatOptionId;
        this.getCurrentPasswordFormatOption = getCurrentPasswordFormatOption;
        this.setCurrentPasswordFormatOptionId = setCurrentPasswordFormatOptionId;
        this.getPasswordsCount = getPasswordsCount;
    }
    
    servicesModule.service('pazzConfigService', 
        ['passwordFormatsService', 'appStateStoreService', PazzConfigService]);
    
    var PasswordService = function(pazzConfigService, appStateStoreService) {
        var passwords = [];
        var passwordsCount = pazzConfigService.getPasswordsCount();
        
        var getAll = function () {
            return passwords;
        };
        
        var generateNewPasswords = function() {
            // Clear existing passwords
            while (passwords.length > 0) {
                passwords.pop();   
            }
            
            var PasswordFormat = 
                pazzConfigService.getCurrentPasswordFormatOption().generator;
            
            while (passwords.length < passwordsCount) {
                var newPassword = PasswordFormat.generateRandomPassword();
                
                // Ensure password is unique.
                var isUnique = true;
                for (var i = 0; i < passwords.length; i++) {
                    if (passwords[i] == newPassword) {
                        isUnique = false;
                        break;
                    }
                }
                
                if (isUnique) {
                    passwords.push(newPassword);
                }
            }
        };
        
        // Define external interface.
        this.getAll = getAll;
        this.generateNewPasswords = generateNewPasswords;
    }
    
    servicesModule.service('passwordService', 
        ['pazzConfigService', 'appStateStoreService', PasswordService]);
    
    servicesModule.run(
        ['appStateStoreService', 'defaultPasswordFormatOptionId', 'pazzConfigService', 'passwordFormatsService', function(appStateStoreService, defaultPasswordFormatOptionId, pazzConfigService, passwordFormatsService) {
        console.log('pazz.app.services: run()'); 
        
        // Read from state storage.
        appStateStoreService.read();
        
        // Retrieve the current password format option (id).
        var passwordFormatOptionId = appStateStoreService.getPasswordFormatOptionId();
        
        if (!passwordFormatOptionId) {
            passwordFormatOptionId = defaultPasswordFormatOptionId;    
        }
        console.log('passwordFormatOptionId: ' + passwordFormatOptionId);
            
        var passwordFormatOption = passwordFormatsService.getById(passwordFormatOptionId);
        pazzConfigService.setCurrentPasswordFormatOptionId(passwordFormatOption.id);
    }]);
})();