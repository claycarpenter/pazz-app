(function() {
    var servicesModule = angular.module('pazz.app.services', []);
    
    // Define value providers for the three sets of random character 
    // candidates.
    servicesModule.value('consonantCharSet', 
        ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']);
    
    servicesModule.value('vowelCharSet', 
        ['a','e','i','o','u']);
    
    servicesModule.value('digitCharSet', 
        ['0','1','2','3','4','5','6','7','8','9']);
    
    var RandomCharacterService = function(charSet) {
        var getRandomValue = function() {
            return charSet[Math.floor(Math.random() * charSet.length)];
        }
        
        // Define external interface.
        this.getRandomValue = getRandomValue;
    }
    
    servicesModule.service('randomConsonantService', 
        ['consonantCharSet', RandomCharacterService]);
    
    servicesModule.service('randomVowelService', 
        ['vowelCharSet', RandomCharacterService]);
    
    servicesModule.service('randomDigitService', 
        ['digitCharSet', RandomCharacterService]);
    
    var PasswordGeneratorsService = function(randomConsonantService, randomVowelService, randomDigitService) {
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
        
        var passwordGenerators = {
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
        
        this.getById = function(generatorId) {
            return passwordGenerators[generatorId];  
        };
        
        this.getAll = function() {
            return passwordGenerators;
        };
    };
    
    servicesModule.service('passwordGeneratorsService', 
        ['randomConsonantService', 'randomVowelService', 'randomDigitService', PasswordGeneratorsService]);
    
    var PazzConfigService = function(passwordGeneratorsService) {
        var passwordsCount = 7;
        var currentPasswordGeneratorName = 'Cvccvc99';
        var currentPasswordGeneratorOption =
            passwordGeneratorsService.getById(currentPasswordGeneratorName);
        
        var getCurrentPasswordGeneratorOption = function() {
            return currentPasswordGeneratorOption;
        }
        
        var getPasswordsCount = function() {
            return passwordsCount;
        }
        
        this.getCurrentPasswordGeneratorOption = getCurrentPasswordGeneratorOption;
        this.getPasswordsCount = getPasswordsCount;
    }
    
    servicesModule.service('pazzConfigService', 
        ['passwordGeneratorsService', PazzConfigService]);
    
    var PasswordService = function(pazzConfigService) {
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
            
            var passwordGenerator = 
                pazzConfigService.getCurrentPasswordGeneratorOption().generator;
            
            for (var i = 1; i <= passwordsCount; i++) {
                var password = passwordGenerator.generateRandomPassword();
                
                passwords.push(password);
            }
        };
        
        // Define external interface.
        this.getAll = getAll;
        this.generateNewPasswords = generateNewPasswords;
    }
    
    servicesModule.service('passwordService', ['pazzConfigService', PasswordService]);
})();