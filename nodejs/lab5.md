# Lab 5: HTTP Fundamentals & Request Handling  
**Duration:** 30 minutes  
**Difficulty:** Beginner to Intermediate

## Objective  
Master HTTP fundamentals by building a server that handles different methods, parses URLs, manages headers, and serves static files.

## Learning Goals
- Understand HTTP methods (GET, POST, PUT, DELETE)
- Parse URL paths and query parameters manually
- Work with request and response headers
- Use appropriate HTTP status codes
- Handle form data and file uploads
- Serve static files (HTML, CSS, images)

---

## Step 1: Create Basic HTTP Method Handler

Create a server that responds differently based on HTTP method.

**Tasks:**
- Create `http-demo.js` in root directory
- Handle GET, POST, PUT, DELETE methods
- Return method-specific responses

<details>
<summary>💡 Hints</summary>

- Use `req.method` to check HTTP method
- Use `res.writeHead()` for status codes
- Return JSON responses for each method

</details>

<details>
<summary>✅ Solution (Click to Unlock)</summary>
<div id="solution-lock-25">
  <input type="password" id="pwd-25" placeholder="Enter passcode" />
  <button onclick="startUnlockSequence25()">Unlock</button>

  <div id="guilt-layer-25" style="display:none; margin-top: 1rem;">
    <p>🤔 Did you try implementing the HTTP methods yourself first?</p>
    <button onclick="nextGuiltStep25(1)">Yes, show me the solution.</button>
  </div>

  <div id="guilt-step-25-1" style="display:none; margin-top: 1rem;">
    <p>📚 Remember: Learning comes from struggling through problems!</p>
    <button onclick="nextGuiltStep25(2)">I understand. Show me now.</button>
  </div>

  <div id="protected-content-25" style="display:none; margin-top:10px;">
    <pre><code class="language-js">
// http-demo.js
const http = require('http');
const { URL } = require('url');

const PORT = 3001;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Log every request
  console.log(`[${new Date().toISOString()}] ${method} ${path}`);

  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  if (path === '/api/demo') {
    switch (method) {
      case 'GET':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          message: 'GET request successful', 
          method: 'GET',
          timestamp: new Date().toISOString()
        }));
        break;

      case 'POST':
        let postBody = '';
        req.on('data', chunk => postBody += chunk);
        req.on('end', () => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            message: 'POST request successful', 
            method: 'POST',
            receivedData: postBody,
            timestamp: new Date().toISOString()
          }));
        });
        break;

      case 'PUT':
        let putBody = '';
        req.on('data', chunk => putBody += chunk);
        req.on('end', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            message: 'PUT request successful', 
            method: 'PUT',
            updatedData: putBody,
            timestamp: new Date().toISOString()
          }));
        });
        break;

      case 'DELETE':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          message: 'DELETE request successful', 
          method: 'DELETE',
          timestamp: new Date().toISOString()
        }));
        break;

      default:
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 HTTP Demo Server running at http://localhost:${PORT}`);
});
    </code></pre>
  </div>
</div>

<script>
  function startUnlockSequence25() {
    const pwd = document.getElementById("pwd-25").value;
    if (pwd === "http101") {
      document.getElementById("guilt-layer-25").style.display = "block";
    } else {
      alert("❌ Incorrect passcode. Hint: It's 'http101'");
    }
  }

  function nextGuiltStep25(step) {
    const ids = [
      "guilt-layer-25",
      "guilt-step-25-1",
      "protected-content-25"
    ];
    if (step < ids.length) {
      document.getElementById(ids[step - 1]).style.display = "none";
      document.getElementById(ids[step]).style.display = "block";
    }
  }
</script>
</details>

---

## Step 2: Add URL Parameter Parsing

Handle query parameters and route parameters manually.

**Tasks:**
- Add route `/api/users/:id` to extract user ID from URL
- Parse query parameters from `/api/search?q=term&limit=10`
- Return parsed data in response

<details>
<summary>💡 Hints</summary>

- Use `parsedUrl.searchParams.get()` for query params
- Use `path.split('/')` to extract route parameters
- Check if parameters exist before using them

</details>

<details>
<summary>✅ Solution</summary>

Add to `http-demo.js` after the main `/api/demo` handler:

<pre><code class="language-js">
// Handle /api/users/:id route
if (path.startsWith('/api/users/') && method === 'GET') {
  const userId = path.split('/')[3]; // Extract ID from path
  if (userId) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: `User details for ID: ${userId}`,
      userId: userId,
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User ID is required' }));
  }
  return;
}

// Handle /api/search with query parameters
if (path === '/api/search' && method === 'GET') {
  const query = parsedUrl.searchParams.get('q') || '';
  const limit = parsedUrl.searchParams.get('limit') || '10';
  const category = parsedUrl.searchParams.get('category') || 'all';
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Search results',
    parameters: {
      query: query,
      limit: parseInt(limit),
      category: category
    },
    results: `Found ${Math.floor(Math.random() * 100)} results for "${query}"`,
    timestamp: new Date().toISOString()
  }));
  return;
}
</code></pre>

</details>

---

## Step 3: Work with Request and Response Headers

Handle custom headers and demonstrate their usage.

**Tasks:**
- Add route `/api/headers` that returns all request headers
- Add custom response headers
- Handle `Content-Type` and `Authorization` headers

<details>
<summary>✅ Solution</summary>

<pre><code class="language-js">
// Handle /api/headers route
if (path === '/api/headers' && method === 'GET') {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const contentType = req.headers['content-type'] || 'Not specified';
  const authorization = req.headers['authorization'] || 'Not provided';
  
  // Add custom response headers
  res.setHeader('X-Custom-Header', 'NodeJS-Demo');
  res.setHeader('X-Response-Time', Date.now());
  res.setHeader('X-API-Version', '1.0.0');
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Request headers analysis',
    clientInfo: {
      userAgent: userAgent,
      contentType: contentType,
      authorization: authorization
    },
    allHeaders: req.headers,
    responseHeaders: {
      'X-Custom-Header': 'NodeJS-Demo',
      'X-Response-Time': Date.now(),
      'X-API-Version': '1.0.0'
    },
    timestamp: new Date().toISOString()
  }));
  return;
}
</code></pre>

</details>

---

## Step 4: Implement Status Code Examples

Create routes that demonstrate different HTTP status codes.

**Tasks:**
- `/api/success` - 200 OK
- `/api/created` - 201 Created  
- `/api/error` - 400 Bad Request
- `/api/unauthorized` - 401 Unauthorized
- `/api/notfound` - 404 Not Found
- `/api/server-error` - 500 Internal Server Error

<details>
<summary>✅ Solution</summary>

<pre><code class="language-js">
// Status code demonstration routes
const statusRoutes = {
  '/api/success': { code: 200, message: 'Request successful' },
  '/api/created': { code: 201, message: 'Resource created successfully' },
  '/api/error': { code: 400, message: 'Bad request - invalid parameters' },
  '/api/unauthorized': { code: 401, message: 'Unauthorized access' },
  '/api/notfound': { code: 404, message: 'Resource not found' },
  '/api/server-error': { code: 500, message: 'Internal server error occurred' }
};

if (statusRoutes[path] && method === 'GET') {
  const route = statusRoutes[path];
  res.writeHead(route.code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: route.code,
    message: route.message,
    path: path,
    timestamp: new Date().toISOString()
  }));
  return;
}
</code></pre>

</details>

---

## Step 5: Add Static File Serving

Serve HTML, CSS, and other static files.

**Tasks:**
- Create `public/test.html` with a simple form
- Create `public/style.css` with basic styling
- Serve static files from `/public` directory

<details>
<summary>💡 Hints</summary>

- Use `fs.readFile()` to read static files
- Set appropriate `Content-Type` headers
- Handle file not found errors

</details>

<details>
<summary>✅ Solution</summary>

First, create the static files:

**public/test.html:**
<pre><code class="language-html">
<!DOCTYPE html>
<html>
<head>
    <title>HTTP Demo Test</title>
    <link rel="stylesheet" href="/public/style.css">
</head>
<body>
    <div class="container">
        <h1>HTTP Methods Demo</h1>
        
        <div class="section">
            <h2>Test GET Request</h2>
            <button onclick="testGet()">Test GET</button>
        </div>
        
        <div class="section">
            <h2>Test POST Request</h2>
            <input type="text" id="postData" placeholder="Enter data">
            <button onclick="testPost()">Test POST</button>
        </div>
        
        <div class="section">
            <h2>Test Query Parameters</h2>
            <input type="text" id="searchQuery" placeholder="Search term">
            <button onclick="testSearch()">Test Search</button>
        </div>
        
        <div class="section">
            <h2>Response:</h2>
            <pre id="response"></pre>
        </div>
    </div>

    <script>
        async function testGet() {
            const response = await fetch('/api/demo');
            const data = await response.json();
            document.getElementById('response').textContent = JSON.stringify(data, null, 2);
        }

        async function testPost() {
            const data = document.getElementById('postData').value;
            const response = await fetch('/api/demo', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            document.getElementById('response').textContent = JSON.stringify(result, null, 2);
        }

        async function testSearch() {
            const query = document.getElementById('searchQuery').value;
            const response = await fetch(`/api/search?q=${query}&limit=5&category=demo`);
            const data = await response.json();
            document.getElementById('response').textContent = JSON.stringify(data, null, 2);
        }
    </script>
</body>
</html>
</code></pre>

**public/style.css:**
<pre><code class="language-css">
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

h1 { color: #333; }
h2 { color: #666; }

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
}

input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
}

#response {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    white-space: pre-wrap;
    max-height: 300px;
    overflow-y: auto;
}
</code></pre>

Add to `http-demo.js`:

<pre><code class="language-js">
const fs = require('fs');
const path = require('path');

// Static file serving
if (path.startsWith('/public/')) {
  const filePath = `.${path}`;
  const extname = path.extname(filePath).toLowerCase();
  
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found' }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
  return;
}

// Serve test page at root
if (path === '/' && method === 'GET') {
  fs.readFile('./public/test.html', (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Error loading test page</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
  return;
}
</code></pre>

</details>

---

## Step 6: Add Script to package.json

**Tasks:**
- Add a `demo` script to run the HTTP demo server

<details>
<summary>✅ Solution</summary>

<pre><code class="language-json">
{
  "scripts": {
    "start": "node src/main.js",
    "start-server": "node server.js",
    "demo": "node http-demo.js"
  }
}
</code></pre>

Run with:
<pre><code class="language-bash">
npm run demo
</code></pre>

</details>

---

## Testing Your Implementation

<details>
<summary>🧪 Test Commands</summary>

<pre><code class="language-bash">
# Test different HTTP methods
curl -X GET http://localhost:3001/api/demo
curl -X POST http://localhost:3001/api/demo -d "test data"
curl -X PUT http://localhost:3001/api/demo -d "updated data"
curl -X DELETE http://localhost:3001/api/demo

# Test URL parameters
curl http://localhost:3001/api/users/123
curl "http://localhost:3001/api/search?q=nodejs&limit=5&category=tutorial"

# Test headers
curl -H "Authorization: Bearer token123" http://localhost:3001/api/headers

# Test status codes
curl http://localhost:3001/api/success
curl http://localhost:3001/api/error
curl http://localhost:3001/api/unauthorized

# Test static files
curl http://localhost:3001/public/style.css
</code></pre>

</details>

---

## Final Project Structure

<details>
<summary>📁 Updated Structure</summary>

<pre><code>
student-manager/
├── data/
│   ├── students.json
│   └── students_backup.json
├── public/
│   ├── index.html
│   ├── test.html
│   └── style.css
├── src/
│   ├── main.js
│   └── students.js
├── utils/
│   └── fileManager.js
├── http-demo.js
├── server.js
├── package.json
</code></pre>

</details>

---

## 🎯 Challenge Extensions

<details>
<summary>🚀 Advanced Challenges</summary>

1. **Form Handling** – Handle `application/x-www-form-urlencoded` data
2. **File Upload** – Handle `multipart/form-data` requests
3. **Rate Limiting** – Implement basic rate limiting per IP
4. **Request Logging** – Log all requests to a file
5. **API Documentation** – Create a `/docs` endpoint listing all routes
6. **Health Check** – Add `/health` endpoint with server stats

</details>

---

## ✅ Completion Checklist

- [ ] Created HTTP server handling GET, POST, PUT, DELETE
- [ ] Implemented URL parameter parsing (route params & query params)
- [ ] Added request/response header handling
- [ ] Demonstrated various HTTP status codes
- [ ] Served static HTML and CSS files
- [ ] Created interactive test page
- [ ] Tested all endpoints with curl or browser

---

## 🎓 What You've Learned

- Core HTTP methods and their purposes
- URL parsing and parameter extraction
- Request/response header manipulation
- Proper HTTP status code usage
- Static file serving with correct MIME types
- Basic client-server interaction with JavaScript

<p align="right">
<a href="#lab-3-student-api-server">Next Lab &rarr;</a>
</p>
