const fs = require("fs")



// 1. читаем ========================================================>
function readFiles(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(`/home/anton/Documents/Elbrus/work/GIT/core-async-promisify-fs/notes/${fileName}`, 'utf8', (err, content) => {
            if (err) reject(err);
            resolve(content);
        });
    });
}

//Читаем директорию
function readDir() {
    return new Promise((resolve, reject) => {
            fs.readdir(`/home/anton/Documents/Elbrus/work/GIT/core-async-promisify-fs/notes`, (err, dirContent) => {
        if (err) reject(err);
        resolve(dirContent);
    });
});
}
//Получаем статы
function getStats(fileName) {
    return new Promise((resolve, reject) => {
        fs.stat(`notes/${fileName}`, 'utf-8', (err, fileStats) => {
            if (err) reject(err);
            resolve(fileStats);
        });
    });
}
//Переименовываем
function renamePlease(fileName, newName) {
    return new Promise((resolve, reject) => {
            fs.rename(`/home/anton/Documents/Elbrus/work/GIT/core-async-promisify-fs/notes/${fileName}`, `${newName}`, (err) => {
                if (err) reject(err);
                resolve(newName);
            });
        });
    }


//Трансформируем файлы
    function transformFiles() {
    readDir()
        .then((dirContent) => {
            dirContent.forEach((fileName) => {
                getStats(`./${fileName}`)
                    .then((fileStats) => {
                        renamePlease(`./${fileName}`, `/home/anton/Documents/Elbrus/work/GIT/core-async-promisify-fs/notes-${Math.floor((Math.random() * (100000 - 10000)) + 10000)}-${fileStats.size}-${fileStats.birthtime}.txt`);
                    });
            });
        })
        .catch((err) => console.log('ERROR!!!'));
}
transformFiles();
