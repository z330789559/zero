var a=[35000,35000,35000,35000,35000,32183.91]
var a1=[650,1050,1167,2168.95,2168.95,1887.34]

var b=[3070.11,38000,27796.71,32380,32300,40300]
var b1 =[0,545.02,146.81,941.98,1839.71,2639.71]
let preSum=a.reduce((sum,cur)=>{
  return sum+ cur
},0)
console.log(preSum)
let _reSum=a1.reduce((sum,cur)=>{
  return sum+ cur
},0)
console.log(_reSum)

let nextSum=b.reduce((sum,cur)=>{
  return sum+ cur
},0)
console.log(nextSum)

let _nextSum=b1.reduce((sum,cur)=>{
  return sum+ cur
},0)
console.log(_nextSum)
console.log(preSum + nextSum)
console.log(_reSum + _nextSum)