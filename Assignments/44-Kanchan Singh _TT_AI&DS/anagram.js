function isAnagram(str1, str2) {
    const sortString = (str) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('').sort().join('');
    return sortString(str1) === sortString(str2);
}

console.log(isAnagram("listen", "silent")); 
console.log(isAnagram("hello", "billion"));
console.log(isAnagram("Dormitory", "Dirty room")); 
