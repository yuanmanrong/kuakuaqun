let ipt = document.querySelector(".ipt")
let box = document.querySelector(".box")
let ws = new WebSocket("ws://localhost:3001")       

ws.onopen = function(){
    console.log("Connection open连接 ..."); 
}
ws.onmessage = function(evt){
    const { data } = JSON.parse(evt.data)
    showMessage(data)
    heartCheck.reset().start()
}
ws.onclose = function(evt){
    console.log("Connection closed关闭....");
    heartCheck.reset().start()
}

function sendMessage(userId,value,type) {
    const data = {
        userId,
        value,
        type,
    }
   ws.send(JSON.stringify(data))
}

function initAnswer(data) {
   let outer = document.createElement('div')
   outer.style.overflow = "hidden"
   let div = document.createElement('div')
   div.innerText = data.value
   div.className = data.userId === userId ? "self-item" : "other-item"
   outer.appendChild(div)
   box.appendChild(outer)
}

function showMessage(data) {
   console.log('data1----',data)
   if (!data) return
   data.forEach(element => {
       initAnswer(element)
   });
   box.lastElementChild.scrollIntoView()
}

function handleSend() {
   sendMessage(userId,ipt.value,"send")
}

// 心跳检测
let heartCheck = {
    timeOut: 15000,
    timeOutObj: null,
    serverTimeOut: null,
    reset: function(){
        clearTimeout(this.timeOutObj)
        clearTimeout(this.serverTimeOut)
        return this
    },
    start: function() {
        let that = this
        this.timeOutObj && clearTimeout(this.timeOutObj)
        this.serverTimeOut &&  clearTimeout(this.serverTimeOut)
        this.timeOutObj = setTimeout(() => {
            sendMessage(0,"已经有5s没有表扬我了！！","ping")
            console.log('ping')
        },this.timeOut)
    }

}