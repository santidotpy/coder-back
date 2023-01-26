const fs = require('fs');
const { fileURLToPath } = require('url');

const jeey = {
    "name": "Johnny",
    "lastName": "Walker"
}
const jeey2 = {
    "name": "Johnny2",
    "lastName": "Walker2"
}




const write = (file, data) => {
    if (fs.existsSync(file) || file.length == 0){
        fs.appendFile(file, JSON.stringify(data, null, 2) + ',', 'utf-8', err => {
            if (err) {
                console.error(err);
            };
            // file written successfully
            });
    }
    else{
        fs.writeFile(file, JSON.stringify(data, null, 2) + ',', 'utf-8', err => {
            if (err) {
                console.error(err);
            };
            // file written successfully
            });
    }
}

write('bd.json', jeey)
write('bd.json', jeey2)
