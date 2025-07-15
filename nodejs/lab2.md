# Lab 2: Student Data Persistence  
**Duration:** 25 minutes  
**Difficulty:** Beginner to Intermediate

## Objective
Implement file-based storage for student data using the Node.js `fs` module to persist in-memory data across application runs.

## Learning Goals
- Work with the Node.js `fs` module
- Read/write JSON files
- Handle file-not-found and I/O errors
- Persist data across sessions
- Implement basic backup strategy
- Handle read/write concurrency safely

---

## Step 1: Create `fileManager.js` Module

This module handles all file operations such as saving and loading student data.

**Tasks:**
- Create a new file `utils/fileManager.js`
- Add `saveDataToFile` and `loadDataFromFile` functions
- Add basic backup mechanism

<details>
<summary>💡 Hints</summary>

- Use `fs.writeFileSync()` and `fs.readFileSync()` for synchronous I/O  
- Handle `ENOENT` (file not found) gracefully  
- Use `JSON.stringify` and `JSON.parse` for file content  
- Create backup by copying the file  

</details>

<details>
<summary>✅ Solution (Click to unlock)</summary>
<div id="solution-lock-1">
  <input type="password" id="pwd-1" placeholder="Enter passcode" />
  <button onclick="checkPassword1()">Unlock</button>
  <div id="protected-content-1" style="display:none; margin-top:10px;">
<pre><code class="language-js">
// utils/fileManager.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/students.json');
const backupFilePath = path.join(__dirname, '../data/students_backup.json');

function saveDataToFile(data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, jsonData);
    fs.copyFileSync(dataFilePath, backupFilePath);
  } catch (err) {
    console.error('Error saving data:', err.message);
  }
}

function loadDataFromFile() {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (err) {
    console.error('Error loading data:', err.message);
    return [];
  }
}

module.exports = { saveDataToFile, loadDataFromFile };
</code></pre>
  </div>
</div>

<script>
  function checkPassword1() {
    const pwd = document.getElementById("pwd-1").value;
    if (pwd === "node123") {
      document.getElementById("protected-content-1").style.display = "block";
    } else {
      alert("Incorrect password. Try again!");
    }
  }
</script>
</details>

---

## Step 2: Modify `students.js` to Use File Storage

Refactor the student module to use `fileManager.js` for persistent storage.

**Tasks:**
- Load data on startup
- Save data after every change
- Integrate backup mechanism

<details>
<summary>💡 Hints</summary>

- Import `loadDataFromFile` and `saveDataToFile`  
- Replace direct access to in-memory array with file-backed updates  

</details>

<details>
<summary>✅ Solution (Click to unlock)</summary>
<div id="solution-lock-2">
  <input type="password" id="pwd-2" placeholder="Enter passcode" />
  <button onclick="checkPassword2()">Unlock</button>
  <div id="protected-content-2" style="display:none; margin-top:10px;">
<pre><code class="language-js">
// src/students.js
const { saveDataToFile, loadDataFromFile } = require('../utils/fileManager');

let students = loadDataFromFile();

function addStudent(name, grade, subjects) {
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const newStudent = { id: newId, name, grade, subjects };
  students.push(newStudent);
  saveDataToFile(students);
  return newStudent;
}

function findStudentById(id) {
  return students.find(student => student.id === id);
}

function listAllStudents() {
  return students;
}

function updateStudentGrade(id, newGrade) {
  const student = findStudentById(id);
  if (student) {
    student.grade = newGrade;
    saveDataToFile(students);
    return student;
  }
  return null;
}

function deleteStudent(id) {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    const removed = students.splice(index, 1)[0];
    saveDataToFile(students);
    return removed;
  }
  return null;
}

module.exports = {
  addStudent,
  findStudentById,
  listAllStudents,
  updateStudentGrade,
  deleteStudent
};
</code></pre>
  </div>
</div>

<script>
  function checkPassword2() {
    const pwd = document.getElementById("pwd-2").value;
    if (pwd === "node123") {
      document.getElementById("protected-content-2").style.display = "block";
    } else {
      alert("Incorrect password. Try again!");
    }
  }
</script>
</details>

---

## Step 3: Test Persistence in `main.js`

Ensure that student data is persisted across multiple runs.

**Tasks:**
- Add/Remove students
- Verify changes reflect after restarting the app
- Verify `data/students.json` is updated correctly

<details>
<summary>💡 Hints</summary>

- Add console logs to observe file persistence  
- Try running the app twice and observe data carryover  

</details>

<details>
<summary>✅ Solution</summary>

<pre><code class="language-bash">
npm start
# Add or delete a student
# Run again to confirm persistence
</code></pre>

Check `data/students.json` and `data/students_backup.json` for updated content.

</details>

---

## Step 4: Bonus – Handle Concurrency

Basic I/O functions are blocking but safe for this small scale. For large apps, prefer async methods with proper locking or queues.

<details>
<summary>💡 Hint</summary>

- `fs.writeFileSync()` is blocking  
- Use queues or libraries like `fs-extra` for concurrent environments  

</details>

---

## Final Project Structure

<details>
<summary>📁 Complete Updated Structure</summary>

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
├── package.json
</code></pre>

</details>

---

## 🎯 Challenge Extensions

<details>
<summary>🚀 Advanced Challenges</summary>

1. **Async File Handling** – Use async/await versions of `fs` methods  
2. **Data Validation** – Add checks before saving (empty names, grades)  
3. **Read-Write Locking** – Prevent simultaneous read/write issues  
4. **Multiple Files** – Split data by grade or subject  
5. **Restore From Backup** – If main file is corrupt, use backup  
6. **Retry Mechanism** – Retry writes on temporary failure  

</details>

---

## ✅ Completion Checklist

- [ ] Created `fileManager.js` module  
- [ ] Implemented save/load/backup functionality  
- [ ] Modified `students.js` to load and persist data  
- [ ] Verified data is retained across app restarts  
- [ ] Backup is saved automatically after every change  
- [ ] Code is clean and modular  

---

## 🎓 What You’ve Learned

- How to persist data in JSON files with Node.js  
- Error handling for file operations  
- Sync vs Async file I/O trade-offs  
- Basic backup strategies  
- Project modularization and structure  

<p align="right">
<a href="https://shubhamsah.github.io/TCET-Web-Dev/nodejs/lab3.html">Next Lab &rarr;</a>
</p>
