function checkAnagrams(text1, text2) {
    if (text1.length !== text2.length) return false;
    let sortedText1 = text1.toLowerCase().split("").sort().join("");
    let sortedText2 = text2.toLowerCase().split("").sort().join("");
    return sortedText1 === sortedText2;
  }
  
  console.log(checkAnagrams('listen', 'silent')); 
  console.log(checkAnagrams('hello', 'world')); 
  