// Palindrome Checker : 

/*  Build a program that checks whether a given word or phrase is a palindrome. 
The user inputs a word or phrase, and the program determines if it reads the same forward and backwards, 
ignoring spaces and punctuation.
*/


function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lower case
    var cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    
    // Reverse the cleaned string
    var reversedStr = cleanedStr.split('').reverse().join('');
    
    // Check if the cleaned string is equal to the reversed string
    return cleanedStr === reversedStr;
}

// var inputString = "Huzaifa saw a fiazuh"; // False
var inputString = "huzaifa on, no afiazuh"; // True
// var inputString = "huzaifa" // False

if (isPalindrome(inputString)) {
    console.log("'" + inputString + "' is a palindrome.");
} else {
    console.log("'" + inputString + "' is not a palindrome.");
}
