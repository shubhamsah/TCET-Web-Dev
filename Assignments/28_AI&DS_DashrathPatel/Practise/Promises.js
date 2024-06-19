function findsum(n){
    let ans=0
    for(let i=0;i<n;i++){
        ans+=i
    }

    return ans
}

function findsumTill(){
    return findsum(100);
}
setTimeout(findsumTill, 1000);
console.log(findsumTill())
console.log("hello world")

