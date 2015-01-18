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
        var passwords = [
            'BaCeDi11',
            'BaCeDi22',
            'BaCeDi33',
            'BaCeDi44',
            'BaCeDi55',
            'BaCeDi66'
        ];
        
        var getAll = function () {
            return passwords;
        };
        
        var generateNewPasswords = function() {
            for (var i = passwords.length - 2; i >= 0; i--) {
                var password = passwords.shift();
                passwords.push(password);
            }
        };
        
        // Define external interface.
        this.getAll = getAll;
        this.generateNewPasswords = generateNewPasswords;
    }
    
    servicesModule.service('passwordService', PasswordService);
})();