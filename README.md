# Shabdakosh

### Introduction
Shabdakosh is a dictionary built using ReactJS. You heard some cool word and want to know the meaning?
Just type your word and hit search, even if you don't know the spelling, Shabdakosh will take care of the rest.

If a word is found in the dictionary (a txt file containing words and their meanings),
the definition is returned and shown on the screen. If a word is not found,
3 closest matching words (in spelling) are returned and you can click any of them to know the meaning.


### Specifications
This application processes txt dictionary (stored and called as raw file in this repository) and stores it as an object with
the actual word being the key and definition being the value. This makes lookup faster. When searched word is not found
in the dictionary, close matching words are found from the dictionary as suggestions, using 'lavenshtein' algorithm.

### Starting the application
Open your command line and follow the steps,

1. git clone `https://github.com/shyamvkansagra/shabdakosh.git`
2. cd shabdakosh
3. yarn install
4. yarn start

### Development journey
When I took up this assignment, I was given 2-4 hours to fulfill the requirements given below:
a. Dictionary should return meaning of the words
b. If word couldn't be found, show 3 suggestions as there might be spelling mistake on the user end.

Now, as I had limited time to achieve the above functionalities, I started thinking about the architecture of the application. For the frontend, I chose React. Also, I used `create-react-app` library to initiate my project with command line scripts, webpack, hot-module-reload, eslint etc. Also, various parsers are in-built. Hence, my setup time was minimized.

Next step was to determine where to and how to store my dictionary. As per my initial plan, I thought of storing it in a postgres database. But then I realized, it might take a while for me to setup and host such database. So I decided to serve that txt file from somewhere. Again, one more realization hit me that I would need server side code to access the local files as client side doesn't provide such options to browse local files. So I decided to store my dictionary into this repository itself and serve it as a raw file. Now, I can use fetch API to get the entire dictionary. Once dictionary was received, I started thinking of ways to store it in such a way that retrieval of data can be a piece of cake. For that, I thought of using localStorage of browsers or indexedDB. When I tried localStorage, I realized that `dictionary.txt` is a huge file and won't get stored in local storage. So I tried to store it in indexedDB. But, initializing of the DB and putting entire dictionary data into it was taking longer time and was failing in between. So had to abandond the above ideas. Finally, I decided to get the file while the application loads and store it in the state of a React component (which is memory of the user's machine).

As storing of dictionary was done, now I could focus on fetching word definitions and showing suggestions. As I had stored dictionary as an object with words being the keys of that object, retrieval was faster as I only had to get the object key-value pair by using user's searched word. This was implemented in no time and I moved on to showing suggestions for possible spelling mistakes.

To find 3 close matching words, I had to find out what letters can be incorrect and what are the closest words in dictionary which can replace the incorrect word. I googled for a while to see if there are techniques to do the same. After some time, I found an algorithm called `lavenshtein`. This algorithm, calculates the 'lavenshtein distance' between two strings and returns a number. Higher the number, the more letter changes we will need to transform a word. Let's say we types 'kitten' instead of 'sitting'. Now, the algorithm loops through the strings and finds how many letter changes are required to incorrect word to make it as correct word. If there are 3 changes required, 'lavenshtein distance' is 3. The lesser the distance, the closer the strings are. As this was the exact use case for my application as well, I started looking for a library which can give me the required result. Hence, I found `liblevenshtein` and used it to find out the suggestion words.

Now, as the flow of the application was figured out, I had to stitch all the parts together. I wrote the frontend components and also loaded dictionary using fetch API. Handled user's search and also showed suggestions when word couldn't be found. To improve the looks of the application, I wrote some css as well. Ran the application in the dev mode and made necessary changes. Finally, after some sweaty work, I could put all the pieces together and made them functional.


### Future improvements
While development phase, few thoughts came to me about the further development of this application. Below are the few ideas which can actually enhance and make this dictionary a full stack web application.

- Storing dictionary in database tables and creating look up indexes
- Separate dictionary data alphabet wise and handle them as individual units to make look-ups faster and avoid traversing whole database
- Maintain a quick lookup table to get list of possible words for `lavenshtein` algorithm
- Setup APIs to fetch the data from database
- Support for looking up of a word based on description entered by user based on matching content
- Word-predictions/auto-completion
- Search history to quickly browse recent words
- Live word finder (use techniques such as debounce) instead of search button
