# DEVLOG 23:53 2024-02-01

## /server.js
Created a basic object structure for the websocket to communicate sent messages with

## /chat.html
Created a... half-decent (MAYBE) frontend that just sends websocket messages to the server. Still completely ephemeral and untracked. I really, REALLY don't know how to use CSS.

# DEVLOG 16:05 2024-02-01

## /server.js
Acquired understanding of the ws library... dead simple. Now to implement a very basic send/recieve system. No databases, no message ID's, nothing fancy. Just send message to server, push to all clients, append message to HTML. We'll put in the fancy stuff later.

Moved `modserver.js` to `server.js`.

# DEVLOG 23:28 2024-01-31

## /chat.html
so we're gonna use the ws library here, because not even I have the time or determination or santiy to basically re-implement the websocket protocol. Jeezus.
