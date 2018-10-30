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
2. cd 
