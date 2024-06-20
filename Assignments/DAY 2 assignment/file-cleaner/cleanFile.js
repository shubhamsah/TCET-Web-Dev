const fs = require('fs');

function cleanFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const cleanedData = data.replace(/\s+/g, ' ').trim();

    
        fs.writeFile(filePath, cleanedData, (err) => {
            if (err) {
                console.error('Error writing the file:', err);
                return;
            }
            console.log('File cleaned successfully!');
        });
    });
}


const filePath = 'input.txt';

cleanFile(filePath);
