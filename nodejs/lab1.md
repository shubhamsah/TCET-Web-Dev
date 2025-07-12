# Lab 1: Student Management System Setup
**Duration:** 25 minutes  
**Difficulty:** Beginner

## Objective
Create a basic Node.js project structure for a student management system with proper organization and in-memory data storage.

## Learning Goals
- Set up a Node.js project from scratch
- Organize code with proper directory structure
- Create and export modules
- Work with JavaScript objects and arrays
- Implement basic CRUD operations

---

## Step 1: Initialize Node.js Project

Create a new directory and initialize your Node.js project.

**Tasks:**
- Create a new directory called `student-manager`
- Initialize npm project
- Verify package.json creation

<details>
<summary>💡 Hints</summary>

- Use `mkdir` to create directories  
- Use `npm init` to initialize a Node.js project  
- You can use `npm init -y` for default settings  

</details>

<details>
<summary>✅ Solution</summary>

<pre><code class="language-bash">
# Create project directory
mkdir student-manager
cd student-manager

# Initialize npm project
npm init -y

# Verify package.json was created
ls -la
</code></pre>

**Expected package.json:**

<pre><code class="language-json">
{
  "name": "student-manager",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
</code></pre>

</details>

---

## Step 2: Create Directory Structure

Set up a proper project structure with organized folders.

**Tasks:**
- Create `src/` directory for source code
- Create `data/` directory for data files
- Create `utils/` directory for utility functions

<details>
<summary>💡 Hints</summary>

- Use `mkdir` command to create directories  
- You can create multiple directories at once  
- Consider what each directory will contain  

</details>

<details>
<summary>✅ Solution</summary>

<pre><code class="language-bash">
# Create directory structure
mkdir src data utils

# Verify structure
tree . || ls -la
</code></pre>

**Expected structure:**

<pre><code>
student-manager/
├── data/
├── src/
├── utils/
├── package.json
└── README.md (optional)
</code></pre>

</details>

---

## Step 3: Create Students Module

Create a `students.js` module with in-memory data and basic functions.

**Tasks:**
- Create `src/students.js`
- Define students array with sample data
- Implement functions: `addStudent`, `findStudentById`, `listAllStudents`

<details>
<summary>💡 Hints</summary>

- Each student should have: id, name, grade, subjects  
- Use `module.exports` to export functions  
- Consider using array methods like `find()`, `push()`  
- Make sure IDs are unique when adding students  

</details>

<details>
<summary>✅ Solution</summary>

<pre><code class="language-js">
// src/students.js
const students = [
  { id: 1, name: "Alice", grade: "A", subjects: ["Math", "Science"] },
  { id: 2, name: "Bob", grade: "B", subjects: ["English", "History"] },
  { id: 3, name: "Charlie", grade: "A", subjects: ["Math", "Physics", "Chemistry"] }
];

function addStudent(name, grade, subjects) {
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const newStudent = { id: newId, name, grade, subjects };
  students.push(newStudent);
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
    return student;
  }
  return null;
}

function deleteStudent(id) {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    return students.splice(index, 1)[0];
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

</details>

---

## Step 4: Create Main Application File

Create the main entry point that demonstrates the student management functionality.

**Tasks:**
- Create `src/main.js`
- Import the students module
- Display initial student data
- Demonstrate adding a new student
- Show finding a student by ID

<details>
<summary>💡 Hints</summary>

- Use `require()` to import your students module  
- Use `console.log()` to display data nicely  
- Consider using `JSON.stringify()` for better formatting  
- Test all the functions you created  

</details>

<details>
<summary>✅ Solution</summary>

<pre><code class="language-js">
// src/main.js
const {
  addStudent,
  findStudentById,
  listAllStudents,
  updateStudentGrade,
  deleteStudent
} = require('./students');

console.log('🎓 Student Management System');
console.log('============================\n');

console.log('📋 Initial Student List:');
console.log(JSON.stringify(listAllStudents(), null, 2));
console.log('\n' + '='.repeat(40) + '\n');

console.log('➕ Adding new student...');
const newStudent = addStudent('Diana', 'A', ['Art', 'Music']);
console.log('Added:', JSON.stringify(newStudent, null, 2));
console.log('\n' + '='.repeat(40) + '\n');

console.log('🔍 Finding student by ID (2):');
const foundStudent = findStudentById(2);
console.log(foundStudent ? JSON.stringify(foundStudent, null, 2) : 'Student not found');
</code></pre>

</details>

---

## Step 5: Update Package.json and Test

**Tasks:**
- Update main entry point in package.json
- Add a start script
- Test the application

<details>
<summary>💡 Hints</summary>

- Change `main` field to point to your main.js file  
- Add scripts for easy running  
- Use `npm start` to run your application  

</details>

<details>
<summary>✅ Solution</summary>

**Updated `package.json`:**

<pre><code class="language-json">
{
  "name": "student-manager",
  "version": "1.0.0",
  "description": "A simple student management system",
  "main": "src/main.js",
  "scripts": {
    "start": "node src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["student", "management", "nodejs"],
  "author": "Your Name",
  "license": "ISC"
}
</code></pre>

Run it:

<pre><code class="language-bash">
npm start
</code></pre>

</details>

---

## ✅ Completion Checklist

- [ ] Project initialised with `npm init`
- [ ] Directory structure created (`src/`, `data/`, `utils/`)
- [ ] `students.js` module created with sample data
- [ ] CRUD functions implemented (add, find, list, update, delete)
- [ ] `main.js` created and demonstrates functionality
- [ ] `package.json` updated with correct main entry and scripts
- [ ] Application runs successfully with `npm start`
- [ ] Error handling and validation added
- [ ] Code is well-commented and organised

---

## 🎓 What You've Learned

- How to set up a Node.js project structure
- Module creation and exports in Node.js
- Working with JavaScript arrays and objects
- Basic CRUD operations
- Code organisation and best practices


<p align="right">
<a href="https://shubhamsah.github.io/TCET-Web-Dev/nodejs/lab2.html">Next Lab &rarr;</a>
</p>
