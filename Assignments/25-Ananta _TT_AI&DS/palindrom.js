function isPalindrome(str) {
    // Remove all non-alphanumeric characters and convert to lower case
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    // Reverse the cleaned string
    const reversedStr = cleanedStr.split('').reverse().join('');
    // Check if the cleaned string is equal to its reverse
    return cleanedStr === reversedStr;
}

// Example usage:
console.log(isPalindrome("A man, a plan, a canal, Panama")); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
