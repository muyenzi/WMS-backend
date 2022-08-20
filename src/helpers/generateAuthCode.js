const generateAuthCode=()=>{
    const code=Math.floor(1000 + Math.random()* 9000)
    return `WMS-${code}`
}
export default generateAuthCode