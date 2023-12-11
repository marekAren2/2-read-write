const { log } = require('console');
const fs = require('fs');
const path = require('path');


/* fs.readdir(path.join(__dirname), function(err,files) {
    if (err) {
        console.log(err);
    } else {
        files.forEach(function(file){
            // console.log(file);

            
        })
    }
});  */
// readFile();
saveData(__dirname,'katalog',false);

function saveData(path,folder,overwrite) {
    const fullPath = `${path}/${folder}`;
    let users;
    // ASK: czemu blad?
    // fs.mkdir(path.join(path, folder), (err)=> {
    // tez dziala
    // if (!overwrite && fs.existsSync(fullPath)) {
        // console.log('Katalog istnieje nie nadpisujemy');
    // } else {
        fs.mkdir(fullPath, (err)=> {
            if (err.code==='EEXIST') {
                // console.warn(err);
                console.log('Folder już istnieje');
            } else {
                
                console.log('mkdir zrobiony');
            }
        })
        readFile();
        console.log("🚀 ~ file: index.js:39 ~ //fs.mkdir ~ users:", users)

        saveDataToFiles(users,folder,overwrite);    
    // }
}

function readFile() {
    let users;
    fs.readFileSync(path.join(__dirname,'','2-read-write-users.json'),'utf-8' , function(err,files) {
        /* console.log('path.join(__dirname',path.join(__dirname,'',''));
        console.log('path.join(__dirname+file', path.join(__dirname,'','2-read-write-users.json'));
        console.log('path.basename(__dirname)', path.basename(__dirname)); */
        if (err) {
            users=[];
            console.log(err);
        } else {
            // console.log(JSON.parse(files));
            // console.log(files.toString());
            users = JSON.parse(files)
            console.log("🚀 ~ file: index.js:17 ~ fs.readFile ~ users:", users)
            
            
            
        }
    })
    return users;
}


const wordsFromName = (name) => {
    const dopasowanie = name.match(/^(Mrs\.|Mr\.|Ms\.|Miss)?\s*([^ ]+)\s*(.*)$/);

    if (dopasowanie) {
        const title = dopasowanie[1] || ''; // tytuł (może być pusty)
        const name = dopasowanie[2]; // imię
        const surname = dopasowanie[3]; // reszta ciągu to surname

      return [name, surname, title];
    } else {
        // Jeżeli nie udało się dopasować, zwróć pusty wynik lub obsłuż błąd
        return [];
    }   
}

function wordsAllFromName(name) {

}    

function saveDataToFiles(users,folder,overwrite) {
    users.forEach((user)=>{
        // let nameSurname = user.name.split(" ");
        nameSurname = wordsFromName(user.name)
        row1=('-----', user.name);
        row2=`${user.id}-${nameSurname[0]}-${nameSurname[1]}`;
        name=`Name: ${nameSurname[0]}`
        surname=(`Surname: ${nameSurname[1]}`);
        // console.log(surname," ~ file: index.js:34 ~ users.forEach ~ name:", name)
        // console.log("🚀 ~ file: index.js:35 ~ users.forEach ~ surname:", surname)
        street=(`Street: ${user.address.street}`);
        zipcode=(`Zip Code: ${user.address.zipcode}`);
        city=(`City: ${user.address.city}`);
        phone=(`phone: ${user.phone}`);
        fs.writeFile(path.join(__dirname,folder,row2), name+'\n'+surname+'\n'+street+'\n'+zipcode+'\n'+city+'\n'+phone+'\n', function (err,files) {
            // ASK: zmienne juz nie obowiazuja w if ?!
            if (err) {
                console.warn(err);
            } else {
                console.log('plik stworzone');
                // ASK czemu to nie dziala zmienna tylko ostatnia, wiec po zakonczeniu fs.write-ale ono sie uruchamia w petli i zawiera kolejne rekordy
                console.log('plik stworzony', row2);

            }
        })
        // saveData();
    })
    
}
    
    module.exports = {
        saveData

    };



 
