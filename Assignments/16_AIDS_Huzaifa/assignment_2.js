// Anagram Checker: 

/* Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/


function isAnagram(str1, str2) {
    // Sorting a string
    function cleanString(str) {
        return str.replace(/[^A-Za-z0-9]/g, '').toLowerCase().split('').sort().join('');
    }

    // Cleaning both strings
    var cleanedStr1 = cleanString(str1);
    var cleanedStr2 = cleanString(str2);

    // Compare the cleaned and sorted strings
    return cleanedStr1 === cleanedStr2;
}


var word1 = "spar";
var word2 = "rasp";

if (isAnagram(word1, word2)) {
    console.log("'" + word1 + "' and '" + word2 + "' are anagrams.");
} else {
    console.log("'" + word1 + "' and '" + word2 + "' are not anagrams.");
}
