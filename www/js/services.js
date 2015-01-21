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
            'Vcvcv99': {
                id: 'Vcvcv99',
                name: 'VCVCV99',
                generator: new PasswordGenerator([
                    randomVowelService, randomConsonantService, 
                    randomVowelService, randomConsonantService, 
                    randomVowelService,
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
        var store = window.localStorage;
        
        // Create a default app state model.
        var appState = {
            passwordFormatOptionId: 'Cvcvc99',
            passwords: []
        };

        this.persist = function() {
            var appStateJson = JSON.stringify(appState);
            store.setItem('pazz.appState.v1', appStateJson);
        };
        
        this.read = function() {
            var appStateJson = store.getItem('pazz.appState.v1');
            var storageAppState = JSON.parse(appStateJson);
            
            if (storageAppState) {
                appState.passwordFormatOptionId = storageAppState.passwordFormatOptionId;
                appState.passwords = storageAppState.passwords;
            }
        };
        
        this.setPasswordFormatOptionId = function(newPasswordFormatOptionId) {
            appState.passwordFormatOptionId = newPasswordFormatOptionId;
        };
        
        this.getPasswordFormatOptionId = function() {
            return appState.passwordFormatOptionId;
        };
        
        this.setPasswords = function(newPasswords) {
            // Clear out existing passwords
            while (appState.passwords.length) {
                appState.passwords.pop();   
            };
            
            for (var i = 0; i < newPasswords.length; i++) {
                var newPassword = newPasswords[i];
                appState.passwords.push(newPassword);    
            };
        };
        
        this.getPasswords = function() {
            return appState.passwords;    
        }
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
        var test = {};
        var passwordsCount = pazzConfigService.getPasswordsCount();
        
        var getAll = function () {
            return passwords;
        };
        
        var setAll = function (newPasswords) {
            // Clear out existing passwords
            while (passwords.length) {
                passwords.pop();   
            };
            
            for (var i = 0; i < newPasswords.length; i++) {
                var newPassword = newPasswords[i];
                passwords.push(newPassword);    
            };
            
            // Update passwords store
            appStateStoreService.setPasswords(passwords);
            appStateStoreService.persist();
        };
        
        var generateNewPasswords = function() {
            var PasswordFormat = 
                pazzConfigService.getCurrentPasswordFormatOption().generator;
            
            var newPasswords = [];
            while (newPasswords.length < passwordsCount) {
                var newPassword = PasswordFormat.generateRandomPassword();
                
                // Ensure password is unique.
                var isUnique = true;
                for (var i = 0; i < newPasswords.length; i++) {
                    if (newPasswords[i] == newPassword) {
                        isUnique = false;
                        break;
                    }
                }
                
                if (isUnique) {
                    newPasswords.push(newPassword);
                }
            }
            
            // Store the new passwords.
            setAll(newPasswords);
        };
        
        // Define external interface.
        this.getAll = getAll;
        this.setAll = setAll;
        this.generateNewPasswords = generateNewPasswords;
    }
    
    servicesModule.service('passwordService', 
        ['pazzConfigService', 'appStateStoreService', PasswordService]);
    
    servicesModule.run(
        ['appStateStoreService', 'defaultPasswordFormatOptionId', 'pazzConfigService', 'passwordFormatsService', 'passwordService', function(appStateStoreService, defaultPasswordFormatOptionId, pazzConfigService, passwordFormatsService, passwordService) {
        // Read from state storage.
        appStateStoreService.read();
        
        // Retrieve the current password format option (id).
        var passwordFormatOptionId = appStateStoreService.getPasswordFormatOptionId();
        
        if (!passwordFormatOptionId) {
            passwordFormatOptionId = defaultPasswordFormatOptionId;    
        }
            
        var passwordFormatOption = passwordFormatsService.getById(passwordFormatOptionId);
        pazzConfigService.setCurrentPasswordFormatOptionId(passwordFormatOption.id);
            
        // Retrieve any stored passwords, if available.
        var storedPasswords = appStateStoreService.getPasswords();
        if (storedPasswords && storedPasswords.length) {
            passwordService.setAll(storedPasswords);    
        } else {
            // No passwords retrieved, generate new passwords.
            passwordService.generateNewPasswords();
        }
    }]);
})();