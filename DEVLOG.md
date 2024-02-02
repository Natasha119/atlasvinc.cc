# DEVLOG 16:05 2024-02-01

## /server.js

Acquired understanding of the ws library... dead simple. Now to implement a very basic send/recieve system. No databases, no message ID's, nothing fancy. Just send message to server, push to all clients, append message to HTML. We'll put in the fancy stuff later.

Moved `modserver.js` to `server.js`.

# DEVLOG 23:28 2024-01-31

## /chat.html

so we're gonna use the ws library here, because not even I have the time or determination or santiy to basically re-implement the websocket protocol. Jeezus.
