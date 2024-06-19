function checkPalindrome(input) {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedInput = sanitizedInput.split('').reverse().join('');
    return sanitizedInput === reversedInput;
}

console.log(checkPalindrome("hello")); 
console.log(checkPalindrome("racecar")); 