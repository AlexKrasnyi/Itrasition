if(process.argv.length<3)console.log('')
else console.log(search(process.argv.slice(2)))
function search(data){
if(data.length===1)return data[0]
let shortest=ShortStr(data)
for(let substrLength=shortest.length; substrLength>=0; substrLength--){
for(let start=0; start<=shortest.length-substrLength; start++){
let counter=0
for(const elem of data){
if(elem.includes(shortest.slice(start, start+substrLength))) counter++ 
if(counter===data.length) return shortest.slice(start, start+substrLength)
}}}}
function ShortStr(data){
for (let i=1; i<data.length; i++){if(data[i].length<data[0].length) data[0]=data[i]}
return data[0]
}