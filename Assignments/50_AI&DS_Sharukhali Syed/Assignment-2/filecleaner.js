const fs = require('fs');
const path = require('path');

function clean(content) {
    return content.replace(/\s+/g, ' ').trim();
}

async function cleanfile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const cleanedContent = clean(data);
        await fs.promises.writeFile(filePath, cleanedContent, 'utf8');
        console.log('File cleaned successfully.');
    } catch (err) {
        console.error(`Error processing the file: ${err.message}`);
    }
}

const filePath = path.resolve(__dirname, 'input.txt');
cleanfile(filePath);
