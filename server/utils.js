const fetch = require('node-fetch');
const DataStore = require('nedb');
const levenshtein = require('liblevenshtein');

const fetchDictionary = () => fetch('https://raw.githubusercontent.com/shyamvkansagra/shabdakosh/development/dictionary.txt')
    .then(res => res.text())
    .then(data => data)
    .catch(err => console.log('Fetch Error:', err));

const dictionaryTxtToObj = data => {
    const dataArr = data.split('\n\n');
    const dictionaryObj = {};
    dataArr.forEach(d => {
        const dataDefinition = d.split(' ');
        const [dictionaryWord] = dataDefinition;
        dataDefinition.shift();
        const dictionaryDefinition = dataDefinition.join(' ');
        dictionaryObj[dictionaryWord.toLowerCase()] = { dictionaryWord, dictionaryDefinition };
    });
   return dictionaryObj;
};

const buildSuggester = async (dictionaryObj) => {
    const completionList = Object.keys(dictionaryObj);
    const builder = new levenshtein.Builder()
        .dictionary(completionList, false)  // generate spelling candidates from unsorted completion_list
        .algorithm("transposition")          // use Levenshtein distance extended with transposition
        .sort_candidates(true)               // sort the spelling candidates before returning them
        .case_insensitive_sort(true)         // ignore character-casing while sorting terms
        .include_distance(false)             // just return the ordered terms (drop the distances)
        .maximum_candidates(3);

    return builder.build();
};

const setDB = async (dictionaryObj) => {
    const db = new DataStore({ filename: './dictionary.db', autoload: true });
    db.ensureIndex({ fieldName: 'word' });

    // Informal check to see if the DB is already setup
    await db.findOne(
        { word: 'awesome' },
        async (err, doc) => {
            if (doc) { // DB has been setup before
                return;
            }
            const dictionaryTxt = await fetchDictionary();
            const dictionaryObj = dictionaryTxtToObj(dictionaryTxt);

            const docsToBeInserted = [];
            Object
                .keys(dictionaryObj)
                .forEach(w => docsToBeInserted.push({
                    word: w,
                    dictionaryWord: dictionaryObj[w].dictionaryWord,
                    dictionaryDefinition: dictionaryObj[w].dictionaryDefinition,
                }));

            return db.insert(docsToBeInserted);
        }
    );

    return db;
}

const getDbInstanceAndSuggestor = async () => {
    const dictionaryTxt = await fetchDictionary();
    const dictionaryObj = dictionaryTxtToObj(dictionaryTxt);

    const suggester = buildSuggester(dictionaryObj);
    const db = await setDB(dictionaryObj);

    return { db, suggester };
}

module.exports = getDbInstanceAndSuggestor;