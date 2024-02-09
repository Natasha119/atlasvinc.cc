document.getElementById("messages").style.height = `${document.documentElement.clientHeight - document.getElementById("important").offsetHeight - 100}px`;

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


const chatbox = document.getElementById("chatbox");
chatbox.addEventListener("submit", function ChatboxOnSubmit(event) 
{
    event.preventDefault();
    
    let message = new FormData(chatbox).get("chatmessage");
    let messageAuthor = document.getElementById("nameinput").value; 

    chatws.send(JSON.stringify({
        mtype: "createMessage",
        messageAuthor: messageAuthor || "No Name",
        message: message
    }));
    
    chatbox.getElementsByTagName("input").namedItem("chatmessage").value = "";
});