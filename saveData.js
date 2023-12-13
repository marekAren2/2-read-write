const { log } = require('console');
const fs = require('fs');
const path = require('path');


// readFile();
// pomarancz //saveData(__dirname,'katalog',false);  : rozwiazane: readFile() dziala, a nie działało
// saveData(__dirname,'katalog',false);
console.log("🚀 ~ file: index.js:9 ~ __dirname:", __dirname)
//13:12 23:13 __dirname na sciezka
console.log("🚀 ~ file: index.js:9 ~ sciezka:", sciezka)

//12:12 23:19 path na __dirname
//13:12 23:13 __dirname na sciezka
function saveData(sciezka,folder,overwrite) {
    //9:00 path na __dirname, ale dirname nie musze przekazywac? a w zadaniu bylo o przekazaniu popraw
    // 10: dirname tez nie da sie podstawic bo obiekt?
    //13:12 23:13 __dirname na sciezka
    const fullPath = `${sciezka}/${folder}`;
    // zolte //let users;
    console.log("🚀 ~ file: index.js:13 ~ fullPath:", fullPath)

    // let users;
    
    // ASK: czemu blad?
    // fs.mkdir(path.join(path, folder), (err)=> {
    // tez dziala
    // if (!overwrite && fs.existsSync(fullPath)) {
        // console.log('Katalog istnieje nie nadpisujemy');
    // } else {
        fs.mkdir(fullPath, (err)=> {
            // if (err.code ==='EEXIST') {
            if (err && err.code === 'EEXIST') {
                // console.warn(err);
                // pomarancz : readFile()
                console.log('Folder już istnieje');
                
                // readFile();
            } else {
                // pomarancz : readFile()
                console.log('mkdir zrobiony');
                
                // readFile()
            }
        })
        // pomarancz: //readFile()
        readFile();
        // pomarancz: // error 
        // console.log("🚀 ~ file: index.js:39 ~ //fs.mkdir ~ users:", users)
        // zolte
        // saveDataToFiles(users,folder,overwrite);    
    // }
}

function readFile() {
    // zolte //let users;
    let users;
    // pomarancz: test
    let folder = 'katalog';
    let overwrite = true;
    //13:12 23:13 __dirname na sciezka
    fs.readFile(path.join(sciezka,'','2-read-write-users.json'),'utf-8' , function(err,files) {
        
        if (err) {
            // zolte
            // users=[];
            console.log(err);
        } else {
            // console.log(JSON.parse(files));
            // console.log(files.toString());
            users = JSON.parse(files)
            // console.log("🚀 ~ file: index.js:17 ~ fs.readFile ~ users:", users)
            // pomarancz: 22:34 tu przenosze bo jest users widoczne w consol log
            saveDataToFiles(users,folder,overwrite);
            
            
        }
    })
    // zolte
    // pomarancz : a tu juz niedostepne petla nie wypuszcza zmiennej?
    // console.log('users',  users);
    // console.log( 'folder',folder);
    // saveDataToFiles(users,folder,overwrite);
    // pomarancz: 
    // return users;
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
        console.log('wiersz wpisany: ', row2);
        //13:12 23:13 __dirname na sciezka
        fs.writeFile(path.join(sciezka,folder,row2), name+'\n'+surname+'\n'+street+'\n'+zipcode+'\n'+city+'\n'+phone+'\n', function (err,files) {
            // ASK: zmienne juz nie obowiazuja w if ?!
            if (err) {
                console.warn(err);
            } else {
                console.log('plik stworzone');
                // ASK czemu to nie dziala zmienna tylko ostatnia, wiec po zakonczeniu fs.write-ale ono sie uruchamia w petli i zawiera kolejne rekordy
                // zawiera ostatnia wartosc
                console.log('plik stworzony', row2);

            }
        })
        // saveData();
    })
    
}
//pomarancz:  readFile();   : rozwiazane
// readFile();   

module.exports = {
        saveData,

    };



 
