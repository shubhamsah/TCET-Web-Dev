# Lab 3: Student API Server  
**Duration:** 25 minutes  
**Difficulty:** Intermediate

## Objective  
Create a basic Node.js HTTP server to serve student data using core `http` module with custom routing.

## Learning Goals
- Use `http` module to create a server
- Parse URL paths and parameters manually
- Handle JSON requests and responses
- Send proper HTTP status codes
- Connect to existing student data module

---

## Step 1: Create `server.js`

This will be the entry point for your HTTP-based student API.

**Tasks:**
- Create `server.js` in the root directory
- Import required modules
- Start server on port 3000

<details>
<summary>💡 Hints</summary>

- Use `http.createServer()`  
- Use `req.method` and `req.url` for routing  
- Use `res.writeHead()` to set status and headers  

</details>

<details>
<summary>✅ Solution</summary>

<pre><code class="language-js">
// server.js
const http = require('http');
const { URL } = require('url');
const { 
  listAllStudents,
  findStudentById,
  addStudent,
  deleteStudent 
} = require('./src/students');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Route: GET /students
  if (method === 'GET' && path === '/students') {
    const students = listAllStudents();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(students));
  }

  // Route: GET /students/:id
  else if (method === 'GET' && path.startsWith('/students/')) {
    const id = parseInt(path.split('/')[2]);
    const student = findStudentById(id);
    if (student) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(student));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Student not found' }));
    }
  }

  // Route: POST /students
  else if (method === 'POST' && path === '/students') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, grade, subjects } = JSON.parse(body);
        const newStudent = addStudent(name, grade, subjects);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newStudent));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  // Route: DELETE /students/:id
  else if (method === 'DELETE' && path.startsWith('/students/')) {
    const id = parseInt(path.split('/')[2]);
    const removed = deleteStudent(id);
    if (removed) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(removed));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Student not found' }));
    }
  }

  // Fallback
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
</code></pre>

</details>

---

## Step 2: Add `start-server` Script to `package.json`

**Tasks:**
- Add a custom `start-server` script to run `server.js`

<details>
<summary>💡 Hints</summary>

- Add another script entry in `package.json` under `scripts`  
- Use `node server.js`  

</details>

<details>
<summary>✅ Solution</summary>

<pre><code class="language-json">
{
  "scripts": {
    "start": "node src/main.js",
    "start-server": "node server.js"
  }
}
</code></pre>

Run:

<pre><code class="language-bash">
npm run start-server
</code></pre>

</details>

---

## Step 3: Test the API Routes

Use any of the following tools:
- Browser (for GET)
- Postman
- curl

<details>
<summary>💡 Sample Test Commands</summary>

<pre><code class="language-bash">
# List students
curl http://localhost:3000/students

# Get student by ID
curl http://localhost:3000/students/1

# Add student (JSON body)
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Elena", "grade": "A", "subjects": ["Biology", "Chemistry"]}'

# Delete student
curl -X DELETE http://localhost:3000/students/1
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
├── src/
│   ├── main.js
│   └── students.js
├── utils/
│   └── fileManager.js
├── server.js
├── package.json
</code></pre>

</details>

---

## 🎯 Challenge Extensions

<details>
<summary>🚀 Advanced Challenges</summary>

1. **Manual URL Parsing** – Replace `URL` class with your own `req.url` + `split()` logic  
2. **Request Validation** – Check for empty name/grade before adding  
3. **Content Negotiation** – Add support for plain text or HTML if requested via `Accept` header  
4. **Async Server** – Convert all logic to use async `fs`  
5. **Router Abstraction** – Extract routes to separate modules for cleaner code  

</details>

---

## ✅ Completion Checklist

- [ ] Created `server.js` using `http` module
- [ ] Implemented GET, POST, DELETE routes
- [ ] Routes return proper status codes and JSON response
- [ ] API is connected to student data from previous lab
- [ ] Manual parsing of URL params and body
- [ ] Tested all routes via curl/Postman

---

## 🎓 What You’ve Learned

- How to create a basic HTTP server in Node.js
- Routing manually without Express
- How to parse request URL and body
- Using status codes and headers
- Building a functional JSON API

<p align="right">
<a href="https://shubhamsah.github.io/TCET-Web-Dev/nodejs/lab4.html">Next Lab &rarr;</a>
</p>
