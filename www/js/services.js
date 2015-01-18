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
    
    var PasswordService = function() {
        var passwords = [];
        var passwordsCount = 6;
        
        var passwordGenerator = new function () {
        
            this.generateRandomPassword = function() {
                return "BaCeDi" + 
                    Math.floor(Math.random() * 10).toString() +
                    Math.floor(Math.random() * 10).toString();
            };
        };
        
        var getAll = function () {
            return passwords;
        };
        
        var generateNewPasswords = function() {
            // Clear existing passwords
            while (passwords.length > 0) {
                passwords.pop();   
            }
            
            for (var i = 1; i <= passwordsCount; i++) {
                var password = passwordGenerator.generateRandomPassword();
                
                passwords.push(password);
            }
        };
        
        // Define external interface.
        this.getAll = getAll;
        this.generateNewPasswords = generateNewPasswords;
    }
    
    servicesModule.service('passwordService', PasswordService);
})();