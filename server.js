const ws = require("ws")
const { answer } = require("./utils")

let wsArr = []


let wss = new ws.Server({port:3001})
wss.on("connection", function(ws){
    console.log("connection---")
    wsArr.push(ws)
    ws.on("message",function(message){
       let data = JSON.parse(message)
       switch (data.type) {
           case "ping":
            wsArr.forEach(item => {
                item.send(JSON.stringify({
                 data: [{type:"pong",value:"【我是咱们群里的小机器人】咱就是说，鼓励不能停~你是最棒的❤️~"}]
                }))
            })
            break;
            case "send":
                let result = answer(data.value)
                result.unshift(data)
                console.log('result---',result)
                wsArr.forEach(item => {
                    item.send(JSON.stringify({
                     data: result
                    }))
                })
            break;

      }     
    })
})