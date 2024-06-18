function isPalindrome(input) {
    
    for (let i = 0; i < cleanedInput.length / 2; i++) {
        if (cleanedInput[i] !== cleanedInput[cleanedInput.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome("a man, a plan, a canal, panama"));
console.log(isPalindrome("hello, world!")); 



