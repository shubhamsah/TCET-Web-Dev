//Importing the fs library for the file system
const fs = require('fs');

// Read the file content
fs.readFile("./input.txt", 'utf8', (err, data) => {

   // Remove extra spaces
   //// Using the regex to replace multiple spaces with a single space
    const cleanedData = data.replace(/\s+/g, ' ').trim();
    if (err) {
        return console.error('Error reading the file:', err);
    }

    // Write the cleaned content back to the same file
    fs.writeFile("./input.txt", cleanedData, 'utf8', (err) => {
        if (err) {
            return console.error('Error writing to the file:', err);
        }
        console.log('File cleaned successfully');
    });
});
