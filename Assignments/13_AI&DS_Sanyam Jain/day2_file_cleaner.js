// Node JS File Cleaner
const fs = require('fs');

// Creating and writing to file
function write_to_file(data) {
    fs.writeFile('a.txt', data, (err) => {
        if (err) {
            console.error(err);
        }
    })
}

write_to_file('hello     world    my    name   is      Raman')

// Reading and changing file
fs.readFile('a.txt', 'utf8', (err, data) => {
    const newData = data.replace(/\s+/g, ' ');
    console.log(newData)
    write_new_file(newData)
})