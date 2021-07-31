const arrStr = process.argv

const newArr = arrStr.slice(2)
console.log(newArr);
let result, reg = null
newArr.forEach(el => {
    const a = el.split('');
    a.forEach(elem =>{
        result +=  elem
        if (result) {
            reg = new RegExp (result)
       }
       newArr.forEach(e => {
           if(!e.match(reg)){
               return
           }
       })
    console.log('c', result);
    console.log('d', reg);
    }
    
    )
        
        
    })
    


    // console.log('a', result);
    // console.log('b', reg);
    // a.forEach(elem => {
    //     elem
    // })

// });
// for(let i = 0; i<newArr.length; i++) {
//     const [i] = newArr[i].split('')
    
// }