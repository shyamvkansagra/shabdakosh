# Shabdakosh

### Introduction
Shabdakosh is a dictionary built using ReactJS. You heard some cool word and want to know the meaning?
Just type your word and hit search. Even if you don't know the spelling, Shabdakosh will take care of it.

If a word is found in the dictionary, the definition is returned and shown on the screen. If a word is not found,
3 closest matching words (which might be the actual spellings) are returned and you can click any of them to know the meaning.


### Specifications
This application processes txt dictionary (stored and called as raw file in this repository) and stores it in NeDB (mock up DB, a local memory storage) such that unique index is the word itself, dictionaryWord is the actual word and dictionaryDefinition is the actual definition. When searched word is not found
in the dictionary, close matching words are found from the dictionary as suggestions, using 'lavenshtein' algorithm.

### Starting the application
Open your command line and follow the steps, (make sure you have latest version of node, i.e. 8 and above)

1. git clone `https://github.com/shyamvkansagra/shabdakosh.git`
2. cd shabdakosh
3. npm install
4. npm start

### Development journey
When I took up this assignment, I was given 2-4 hours to fulfill the requirements given below:
a. Dictionary should return meaning of the words
b. If word couldn't be found, show 3 suggestions as there might be spelling mistake on the user end.

Now, as I had limited time to achieve the above functionalities, I started thinking about the architecture of the application. For the frontend, I chose React. Also, I used `create-react-app` library to initiate my project with webpack, hot-module-reload, eslint etc. Also, various parsers are in-built. Hence, my application setup time was optimized.

Next step was to determine where to and how to store my dictionary. As per my initial plan, I had thought of storing it in a postgres database. But then I realized, it might take a while to setup and host such database. So I decided to serve that txt file from somewhere else. I can put it in local file system, but again, I would need server side code to access the local files as client side doesn't provide such options to browse those files. So I decided to store my dictionary into this git repository itself and serve it as a raw file. Now, I can use fetch API to get the entire dictionary. Once dictionary was received, I tried storing it in localStorage of browsers or indexedDB. When I tried localStorage, I came to know that `dictionary.txt` is a huge file and won't get stored in local storage. So I tried to store it in indexedDB. But, initializing of the DB and putting entire dictionary data into it was taking very long time and was also failing while bulk insertion operation. So had to abandond the above ideas. Finally, I used NeDB, which is based on MongoDB, to store my dictionary in the memory. This database mocks the behaviour of actual database. It is temporary, so when application is reloaded, DB is again set. Otherwise it stays set until reload of application occurs. We can use an actual DB to mitigate this issue.

As storing of dictionary was done, now I could focus on fetching word definitions and showing suggestions. For that, I used `findOne` method of NeDB to get the desired row from table and show it to the user.

To find 3 close matching words, I had to find out what letters can be incorrect and what are the closest words in dictionary which can replace user's incorrect word. After some googling, I found an algorithm called `lavenshtein`. This algorithm, calculates the 'lavenshtein distance' between two strings and returns a number. Higher the number, the more letter changes we will need to transform a word. Let's say we typed 'kitten' instead of 'sitting'. Now, the algorithm loops through the original string and finds how many letter changes are required for incorrect word to transform it into correct word. If there are 3 changes required, 'lavenshtein distance' is 3. The lesser the distance, the closer the strings are. As this was the exact use case for our application as well, I started looking for a library which can give me the required result. Hence, I found `liblevenshtein` and used it to find out the suggestion words when dictionary returns no results.

Now, as the flow of the application was figured out, I had to stitch all the parts together. I wrote the frontend components and also loaded dictionary into NeDB using fetch API. Handled user's search and also showed suggestions when word couldn't be found. To improve the looks of the application, I wrote css. Ran the application in the dev mode and made necessary changes. Finally, after some sweaty work, I could put all the pieces together and made them functional. 

I have also started working on express server for the application to setup an actual server to read the database. This is work in progress currently and can be referred in `development` branch of this project.


### Future improvements
While development phase, few thoughts came to me about the further development of this application. Below are the few ideas which can actually enhance and make this dictionary a full stack web application.

- Storing dictionary in database tables and creating look up indexes
- Maintain a quick lookup table to get the full list of all possible words in dictionary, for using with `lavenshtein` algorithm
- Setup server APIs to fetch the data from database
- Support for looking up of a word based on description entered by user based on matching content
- Word-predictions/auto-completion
- Search history to quickly browse recent words
- Live word finder (use techniques such as debounce) instead of search button
