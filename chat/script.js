const chatws = new WebSocket("wss://" + window.location.hostname);

chatws.addEventListener("message", function chatwsOnMessage(data)
{
    let messageObject = JSON.parse(data.data);
    let messageType = messageObject.mtype;
    let messageContent = messageObject.message;

    if(messageType == "messageRecieved")
    {
        let messages = document.getElementById("messages");

        let newMessage = document.createElement("p");
        newMessage.innerText = messageContent;

        messages.insertBefore(newMessage, messages.children[messages.children.length -1]);
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
    }
});

document.getElementById("messages").style.height = `${document.documentElement.clientHeight -250}px`;

            const chatbox = document.getElementById("chatbox");
            chatbox.addEventListener("submit", function ChatboxOnSubmit(event) 
            {
                event.preventDefault();
                
                let newMessage = new FormData(chatbox).get("chatmessage");
                
                chatws.send(JSON.stringify({
                    mtype: "createMessage",
                    message: newMessage
                }));
                
                chatbox.getElementsByTagName("input").namedItem("chatmessage").value = "";
            });