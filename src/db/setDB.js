// const insertIntoDB = wordDescriptions => {
//     const openRequest = window.indexedDB.open('dictionary', 1);
//     openRequest.onerror = function(event) {
//         console.error(event);
//     };
//     // openRequest.onupgradeneeded = function (event) {
//     //     const db = event.target.result;
//     //     db.createObjectStore("dictionary", { keyPath: "dictionaryWord" });
//     // };
//     openRequest.onupgradeneeded = function (event) {                   
//         const objectStore = event.currentTarget.result.createObjectStore("dictionary", 
//                                      { keyPath: "id", autoIncrement: true });
 
//         objectStore.createIndex("dictionaryWord", "dictionaryWord", { unique: true });
//         console.log(wordDescriptions);
//         for (let i in wordDescriptions) {
//             objectStore.add(wordDescriptions[i]);
//         }
//     };
//     openRequest.onsuccess = function (event) {
//         var db = event.target.result;
//         console.log(db);
//         // const objectStore = db.transaction(["dictionary"], "readwrite").objectStore("dictionary");
//         db.onerror = function(event) {
//             // Generic error handler for all errors targeted at this database's requests
//             console.error(event.target);
//             window.alert("Database error: " + event.target.wePutrrorMessage || event.target.error.name || event.target.error || event.target.errorCode);
//         };
//         // const transaction = db.transaction('dictionary', 'readwrite');
//         // const objectStore = db.createObjectStore("dictionary", { keyPath: "dictionaryWord" });
//         // const transaction = db.transaction(["dictionary"], 'readwrite');
//         // const dictionaryStore = db.transaction(["dictionary"], "readwrite").objectStore("dictionary");
//         // putNext();
//         // let i = 0;
//         // function putNext() {
//         //     if (i < wordDescriptions.length) {
//         //         dictionaryStore.put(wordDescriptions[i]).onsuccess = putNext;
//         //         ++i;
//         //     } else {   // complete
//         //         console.log('populate complete');
//         //         // callback();
//         //     }
//         // }           
//     };      
// };

export default function() {
    let dictionary = null;
    fetch(
        'https://raw.githubusercontent.com/shyamvkansagra/shabdakosh/development/dictionary.txt'
    )
        .then(res => res.text())
        .then(function(data) {
            const dataArr = data.split('\n\n');
            const wordDescriptions = {};
            dataArr.forEach(d => {
                const dataDefinition = d.split(' ');
                const dictionaryWord = dataDefinition[0];
                dataDefinition.shift();
                const dictionaryDefinition = dataDefinition.join(' ');
                wordDescriptions[dictionaryWord] = { dictionaryWord, dictionaryDefinition };
            });
            if (wordDescriptions) {
                dictionary = Object.assign({}, wordDescriptions);
            }
            
            console.log(dictionary);
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    console.log(dictionary);
    if (dictionary) return dictionary;
    // return dictionary;
}