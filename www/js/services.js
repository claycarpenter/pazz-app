(function() {
    var servicesModule = angular.module('pazz.app.services', []);
    
    // Define value providers for the three sets of random character 
    // candidates.
    servicesModule.value('ConsonantCharSet', 
        ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']);
    
    servicesModule.value('VowelCharSet', 
        ['a','e','i','o','u']);
    
    servicesModule.value('DigitCharSet', 
        ['0','1','2','3','4','5','6','7','8','9']);
    
    var RandomCharacterService = function(charSet) {
        var getRandomValue = function() {
            return charSet[Math.floor(Math.random() * charSet.length)];
        }
        
        // Define external interface.
        this.getRandomValue = getRandomValue;
    }
    
    servicesModule.service('RandomConsonantService', 
        ['ConsonantCharSet', RandomCharacterService]);
    
    servicesModule.service('RandomVowelService', 
        ['VowelCharSet', RandomCharacterService]);
    
    servicesModule.service('RandomDigitService', 
        ['DigitCharSet', RandomCharacterService]);
    
//    servicesModule.Cvccvc99Generator
})();