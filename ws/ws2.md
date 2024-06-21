# Node.js Chat Server Explanation

## Importing Dependencies

```javascript
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
```

These lines import the necessary modules:
- `express`: A web application framework for Node.js
- `createServer` from `node:http`: Used to create an HTTP server
- `join` from `node:path`: Helps in handling file paths
- `Server` from `socket.io`: Enables real-time, bidirectional communication

## Setting up the Server

```javascript
const app = express();
const server = createServer(app);
const io = new Server(server);
```

- Creates an Express application
- Creates an HTTP server using the Express app
- Initializes a new instance of Socket.IO and attaches it to the HTTP server

## Defining Routes

```javascript
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
```

- Defines a route for the root URL ('/')
- When accessed, it sends the 'index.html' file from the current directory

## Handling Socket Connections

```javascript
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
```

- Listens for new socket connections
- When a 'chat message' event is received from a client:
  - Broadcasts the message to all connected clients using `io.emit()`

## Starting the Server

```javascript
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
```

### Complete Server.js

```js
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

```

### index.html - Client side Code 

# HTML Chat Client Code

```html
<!DOCTYPE html>
<html>
<head>
  <title>Socket.IO chat</title>
  <style>
    body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

    #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
    #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
    #input:focus { outline: none; }
    #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

    #messages { list-style-type: none; margin: 0; padding: 0; }
    #messages > li { padding: 0.5rem 1rem; }
    #messages > li:nth-child(odd) { background: #efefef; }
  </style>
</head>
<body>
  <ul id="messages"></ul>
  <form id="form" action="">
    <input id="input" autocomplete="off" /><button>Send</button>
  </form>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();

    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });

    socket.on('chat message', (msg) => {
      const item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  </script>
</body>
</html>
```

