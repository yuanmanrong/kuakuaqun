const json = require("./sample.json")

//const json = JSON.parse(data)

function answer(ask) {
    let replyNum = [{},{},{}]
   
    for(let i=0 ; i < json.length ; i++) {
        let content  = json[i] 
        if(content.title.indexOf(ask) !== -1) {
            for(let j=0;j<replyNum.length;j++) {
                let num = randomAnswer(content.replies_num)
                console.log('-----22222----',j,num)
                replyNum[j]["value"] = content.replies[num].content
            } 
            return replyNum       
        }
    }
    return [{value:"【我是咱们群里的小机器人】虽然没明白你在说什么😘~但是你是最棒的呦❤️~"}]  
}

function randomAnswer(num) {
   return  parseInt(Math.random() * Number(num))
}

module.exports ={
    answer
}