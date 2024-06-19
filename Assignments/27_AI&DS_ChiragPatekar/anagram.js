function isAnagram(str1, str2) {
  if (str1.length != str2.length) return false;
  let a = str1.toLowerCase().split("").sort().join("");
  let b = str2.toLowerCase().split("").sort().join("");
  return a == b;
}


console.log(isAnagram('listen', 'silent'))
console.log(isAnagram('rail safety', 'fairy tales'))
console.log(isAnagram('hello', 'world')
