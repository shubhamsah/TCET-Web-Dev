# Lab 4: Complete Student Management API  
**Duration:** 25 minutes  
**Difficulty:** Intermediate to Advanced

## Objective  
Build a full-featured RESTful API with robust error handling, search and stats support, and an optional front-end tester.

## Learning Goals
- Validate and sanitize API inputs
- Return meaningful error messages with proper status codes
- Implement search and analytics endpoints
- Use basic in-memory caching
- Log API actions
- Build a minimal HTML interface for testing
- Calculate grades and rankings (bonus)

---

## Step 1: Add Input Validation

Improve `students.js` by adding input validation to `addStudent`.

**Tasks:**
- Check for valid name (non-empty string)
- Grade should be a valid letter (A/B/C...)
- Subjects should be a non-empty array of strings

<details>
<summary>💡 Hints</summary>

- Use `typeof` checks  
- Return 400 Bad Request with error message  

</details>

<details>
<summary>✅ Solution</summary>

Update in `students.js`:

<pre><code class="language-js">
function validateStudent({ name, grade, subjects }) {
  if (!name || typeof name !== 'string') return 'Invalid name';
  if (!grade || typeof grade !== 'string') return 'Invalid grade';
  if (!Array.isArray(subjects) || subjects.length === 0) return 'Subjects must be a non-empty array';
  return null;
}
</code></pre>

In `server.js`, update POST `/students`:

<pre><code class="language-js">
const error = validateStudent(parsed);
if (error) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ error }));
}
</code></pre>

</details>

---

## Step 2: Implement Search and Stats Endpoints

**Tasks:**
- GET `/students/search?name=Alice` – case-insensitive name match
- GET `/students/stats` – return count, grade distribution

<details>
<summary>✅ Solution</summary>

Add in `server.js`:

<pre><code class="language-js">
if (method === 'GET' && path === '/students/search') {
  const query = parsedUrl.searchParams.get('name')?.toLowerCase();
  const results = listAllStudents().filter(s => s.name.toLowerCase().includes(query));
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(results));
}

if (method === 'GET' && path === '/students/stats') {
  const stats = {};
  const students = listAllStudents();
  for (const s of students) {
    stats[s.grade] = (stats[s.grade] || 0) + 1;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ total: students.length, gradeDistribution: stats }));
}
</code></pre>

</details>

---

## Step 3: Add In-Memory Caching (Simple)

Cache `/students/stats` response for 5 seconds.

<details>
<summary>✅ Solution</summary>

<pre><code class="language-js">
let cachedStats = null;
let statsCacheTime = 0;

if (method === 'GET' && path === '/students/stats') {
  const now = Date.now();
  if (!cachedStats || now - statsCacheTime > 5000) {
    const stats = {};
    const students = listAllStudents();
    for (const s of students) {
      stats[s.grade] = (stats[s.grade] || 0) + 1;
    }
    cachedStats = { total: students.length, gradeDistribution: stats };
    statsCacheTime = now;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(cachedStats));
}
</code></pre>

</details>

---

## Step 4: Add Logging

Log all requests with method, path, and timestamp.

<details>
<summary>✅ Solution</summary>

<pre><code class="language-js">
console.log(`[${new Date().toISOString()}] ${method} ${path}`);
</code></pre>

Add at the top of the `server.createServer()` handler.

</details>

---

## Step 5: Create Simple HTML Frontend

**Tasks:**
- Add `public/index.html` to test API
- Serve this page at `/`

<details>
<summary>💡 Hint</summary>

- Use `fs.readFile()` to serve HTML  
- Place file in `public/index.html`  

</details>

<details>
<summary>✅ Solution</summary>

Create `public/index.html`:

<pre><code class="language-html">
<!DOCTYPE html>
<html>
<head><title>Student API Tester</title></head>
<body>
  <h2>Student API Test</h2>
  <button onclick="fetchStudents()">Get Students</button>
  <pre id="output"></pre>

  <script>
    async function fetchStudents() {
      const res = await fetch('/students');
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>
</code></pre>

Serve it in `server.js`:

<pre><code class="language-js">
if (method === 'GET' && path === '/') {
  const fs = require('fs');
  const filePath = './public/index.html';
  fs.readFile(filePath, (err, html) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading HTML');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
}
</code></pre>

</details>

---

## Step 6: Bonus – Grade Calculation and Ranking

Assume each student has numeric subject scores. Calculate average and rank.

<details>
<summary>💡 Example</summary>

<pre><code class="language-js">
function calculateRankings() {
  const students = listAllStudents();
  const ranked = students.map(s => ({
    ...s,
    avg: s.subjects.reduce((a, b) => a + b.score, 0) / s.subjects.length
  })).sort((a, b) => b.avg - a.avg);

  return ranked.map((s, i) => ({ rank: i + 1, name: s.name, avg: s.avg }));
}
</code></pre>

Expose on `/students/rankings`.

</details>

---

## Final Project Structure

<details>
<summary>📁 Final Project Structure</summary>

<pre><code>
student-manager/
├── data/
│   ├── students.json
│   └── students_backup.json
├── public/
│   └── index.html
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
<summary>🚀 Try these:</summary>

1. **PUT /students/:id** – update name/subjects  
2. **Validation Middleware** – refactor validation as reusable  
3. **Serve JSON from cache (Etag)**  
4. **Serve frontend with CSS**  
5. **Form submission to POST new student**  
6. **Pagination support for GET /students**  
7. **Unit Tests** with `node:test` module or Jest  

</details>

---

## ✅ Completion Checklist

- [ ] Added validation in POST request
- [ ] Implemented `/students/search?name=` route
- [ ] Implemented `/students/stats` with caching
- [ ] Logging added for all requests
- [ ] Served static HTML for API test
- [ ] Optional ranking endpoint implemented

---

## 🎓 What You’ve Learned

- End-to-end REST API creation in Node.js  
- Custom validation and error handling  
- Basic caching, logging, and analytics  
- Search and ranking with JS array methods  
- Static file serving and API testing with HTML
