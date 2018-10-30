const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const getDbInstanceAndSuggester = require('./utils');

let db, suggester;

(async () => {
    const obj = await getDbInstanceAndSuggester();
    db = obj.db;
    suggester = obj.suggester;
})();

const MAX_EDIT_DISTANCE = 2;

app.get('/dictionary/:word', function (req, res) {
    const searchTerm = req.params.word;
    db.findOne(
        { word: searchTerm.toLowerCase() },
        (error, doc) => {
            if (error) {
                return res.json({ error })
            }
            
            if (doc) {
                return res.json({
                    dictionaryWord: doc.dictionaryWord,
                    dictionaryDefinition: doc.dictionaryDefinition,
                    wordSuggestions: [],
                    noneFound: false,
                });
            }

            const wordSuggestions = suggester.transduce(searchTerm, MAX_EDIT_DISTANCE);
            return res.json({
                wordSuggestions,
                dictionaryWord: '',
                dictionaryDefinition: '',
                noneFound: wordSuggestions.length === 0,
            });
        }
    );
});

const port = process.env.PORT || 8080;
app.listen(port, err => {
	if (err) {
		console.error(err);
	}
	console.info('----\n==> 🌎  API is running on port %s', port);
	console.info('==> 💻  Send requests to http://localhost:%s', port);
});