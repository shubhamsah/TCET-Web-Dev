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

```bash
# Create project directory
mkdir student-manager
cd student-manager

# Initialize npm project
npm init -y

# Verify package.json was created
ls -la
```

**Expected package.json:**
```json
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
```
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

```bash
# Create directory structure
mkdir src data utils

# Verify structure
tree . || ls -la
```

**Expected structure:**
```
student-manager/
├── data/
├── src/
├── utils/
├── package.json
└── README.md (optional)
```
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

```javascript
// src/students.js
const students = [
  { 
    id: 1, 
    name: "Alice", 
    grade: "A", 
    subjects: ["Math", "Science"] 
  },
  { 
    id: 2, 
    name: "Bob", 
    grade: "B", 
    subjects: ["English", "History"] 
  },
  { 
    id: 3, 
    name: "Charlie", 
    grade: "A", 
    subjects: ["Math", "Physics", "Chemistry"] 
  }
];

// Function to add a new student
function addStudent(name, grade, subjects) {
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const newStudent = {
    id: newId,
    name,
    grade,
    subjects
  };
  students.push(newStudent);
  return newStudent;
}

// Function to find student by ID
function findStudentById(id) {
  return students.find(student => student.id === id);
}

// Function to list all students
function listAllStudents() {
  return students;
}

// Function to update student grade
function updateStudentGrade(id, newGrade) {
  const student = findStudentById(id);
  if (student) {
    student.grade = newGrade;
    return student;
  }
  return null;
}

// Function to delete student
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
```
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

```javascript
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

// Display initial students
console.log('📋 Initial Student List:');
console.log(JSON.stringify(listAllStudents(), null, 2));

console.log('\n' + '='.repeat(40) + '\n');

// Add a new student
console.log('➕ Adding new student...');
const newStudent = addStudent('Diana', 'A', ['Art', 'Music']);
console.log('Added:', JSON.stringify(newStudent, null, 2));

console.log('\n' + '='.repeat(40) + '\n');

// Find student by ID
console.log('🔍 Finding student by ID (2):');
const foundStudent = findStudentById(2);
console.log(foundStudent ? JSON.stringify(foundStudent, null, 2) : 'Student not found');

console.log('\n' + '='.repeat(40) + '\n');

// Update student grade
console.log('📝 Updating student grade (ID: 1):');
const updatedStudent = updateStudentGrade(1, 'A+');
console.log(updatedStudent ? JSON.stringify(updatedStudent, null, 2) : 'Student not found');

console.log('\n' + '='.repeat(40) + '\n');

// Display final student list
console.log('📋 Final Student List:');
console.log(JSON.stringify(listAllStudents(), null, 2));

console.log('\n' + '='.repeat(40) + '\n');

// Demonstrate error handling
console.log('❌ Testing error handling - Finding non-existent student (ID: 999):');
const nonExistentStudent = findStudentById(999);
console.log(nonExistentStudent ? JSON.stringify(nonExistentStudent, null, 2) : 'Student not found');
```
</details>

---

## Step 5: Update Package.json and Test

Update your package.json and test the application.

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

**Updated package.json:**
```json
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
```

**Test commands:**
```bash
# Run the application
npm start

# Or run directly
node src/main.js
```

**Expected output:**
```
🎓 Student Management System
============================

📋 Initial Student List:
[
  {
    "id": 1,
    "name": "Alice",
    "grade": "A",
    "subjects": ["Math", "Science"]
  },
  {
    "id": 2,
    "name": "Bob",
    "grade": "B",
    "subjects": ["English", "History"]
  },
  {
    "id": 3,
    "name": "Charlie",
    "grade": "A",
    "subjects": ["Math", "Physics", "Chemistry"]
  }
]

========================================

➕ Adding new student...
Added: {
  "id": 4,
  "name": "Diana",
  "grade": "A",
  "subjects": ["Art", "Music"]
}

... (and so on)
```
</details>

---

## Step 6: Add Error Handling and Validation

Enhance your code with proper error handling and input validation.

**Tasks:**
- Add validation for student data
- Handle edge cases
- Add helpful error messages

<details>
<summary>💡 Hints</summary>

- Check if required fields are provided
- Validate data types
- Handle empty arrays
- Use try-catch for error handling
</details>

<details>
<summary>✅ Solution</summary>

**Enhanced students.js:**
```javascript
// src/students.js (Enhanced version)
const students = [
  { id: 1, name: "Alice", grade: "A", subjects: ["Math", "Science"] },
  { id: 2, name: "Bob", grade: "B", subjects: ["English", "History"] },
  { id: 3, name: "Charlie", grade: "A", subjects: ["Math", "Physics", "Chemistry"] }
];

// Validation helper functions
function validateStudentData(name, grade, subjects) {
  const errors = [];
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a non-empty string');
  }
  
  if (!grade || typeof grade !== 'string') {
    errors.push('Grade is required and must be a string');
  }
  
  if (!Array.isArray(subjects) || subjects.length === 0) {
    errors.push('Subjects must be a non-empty array');
  }
  
  return errors;
}

function addStudent(name, grade, subjects) {
  try {
    // Validate input
    const errors = validateStudentData(name, grade, subjects);
    if (errors.length > 0) {
      throw new Error('Validation failed: ' + errors.join(', '));
    }
    
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = {
      id: newId,
      name: name.trim(),
      grade: grade.toUpperCase(),
      subjects: [...subjects] // Create a copy
    };
    
    students.push(newStudent);
    return { success: true, student: newStudent };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function findStudentById(id) {
  try {
    if (typeof id !== 'number' || id <= 0) {
      throw new Error('ID must be a positive number');
    }
    
    const student = students.find(student => student.id === id);
    return student || null;
  } catch (error) {
    console.error('Error finding student:', error.message);
    return null;
  }
}

function listAllStudents() {
  return [...students]; // Return a copy to prevent external modification
}

function updateStudentGrade(id, newGrade) {
  try {
    if (typeof id !== 'number' || id <= 0) {
      throw new Error('ID must be a positive number');
    }
    
    if (!newGrade || typeof newGrade !== 'string') {
      throw new Error('Grade must be a non-empty string');
    }
    
    const student = findStudentById(id);
    if (student) {
      student.grade = newGrade.toUpperCase();
      return { success: true, student };
    }
    return { success: false, error: 'Student not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function deleteStudent(id) {
  try {
    if (typeof id !== 'number' || id <= 0) {
      throw new Error('ID must be a positive number');
    }
    
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
      const deletedStudent = students.splice(index, 1)[0];
      return { success: true, student: deletedStudent };
    }
    return { success: false, error: 'Student not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  addStudent,
  findStudentById,
  listAllStudents,
  updateStudentGrade,
  deleteStudent
};
```
</details>

---

## Final Project Structure

<details>
<summary>📁 Complete Project Structure</summary>

```
student-manager/
├── src/
│   ├── main.js
│   └── students.js
├── data/
├── utils/
├── package.json
└── README.md (optional)
```

**File contents summary:**
- `package.json`: Project configuration with scripts
- `src/students.js`: Student data and management functions
- `src/main.js`: Main application demonstrating functionality
- `data/`: For future data files
- `utils/`: For future utility functions
</details>

---

## 🎯 Challenge Extensions

Try these additional challenges to enhance your learning:

<details>
<summary>🚀 Advanced Challenges</summary>

1. **File Persistence**: Save student data to a JSON file in the `data/` directory
2. **Search Functionality**: Add functions to search students by name or subject
3. **Grade Statistics**: Calculate average grades, grade distribution
4. **Input Validation**: Add more sophisticated validation (email, phone, etc.)
5. **CLI Interface**: Create a command-line interface for interactive usage
6. **Unit Tests**: Write tests for your functions
7. **Logger**: Add logging functionality in the `utils/` directory

**Example CLI Interface:**
```javascript
// Add to main.js for interactive mode
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n--- Student Management System ---');
  console.log('1. List all students');
  console.log('2. Add new student');
  console.log('3. Find student by ID');
  console.log('4. Update student grade');
  console.log('5. Delete student');
  console.log('6. Exit');
  rl.question('Choose an option: ', handleMenuChoice);
}
```
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

**Time Check:** You should complete this lab in approximately 25 minutes. If you're taking longer, focus on the core functionality first, then add enhancements.

## 🎓 What You've Learned

- How to set up a Node.js project structure
- Module creation and exports in Node.js
- Working with JavaScript arrays and objects
- Basic CRUD operations
- Error handling and input validation
- Code organisation and best practices

<p align="right">
<a href="./lab2.md">Next Lab &rarr;</a>
</p>
