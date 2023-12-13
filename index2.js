function saveData(pathToJSON, folder, overwrite) {

    // console.log(path.join(__dirname, folder));

    const fullPathToFolder = path.join(__dirname, folder);


    if (!overwrite && fs.existsSync(fullPathToFolder)) {
        console.log('Katalog istnieje nie nadpisujemy');


    } else {
        fs.mkdir(fullPathToFolder, (err) => {

            if (err) {
                if (err.code === 'EEXIST') {

                    console.log('Folder już istnieje');
                }
            } else {

                console.log('mkdir zrobiony');
            }
        })


        readFile(pathToJSON);



        // console.log("🚀 ~ file: index.js:39 ~ //fs.mkdir ~ users:", users)

        // saveDataToFiles(users, folder, overwrite);

    }

}

function readFile(pathToJSON) {
    // console.log('jes');
    let users;
    fs.readFile(pathToJSON, 'utf-8', function (err, files) {
        // console.log(files);
        if (err) {
            users = [];
            console.log(err);
        } else {

            users = JSON.parse(files)
            console.log("🚀 ~ file: index.js:17 ~ fs.readFile ~ users:", users)

        }
    })
    return users;
}



saveData(path.join(__dirname, "2-read-write-users.json"), 'katalog', false);