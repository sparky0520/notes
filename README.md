# Notes app but featureful

## React + Appwrite 

- Using React for frontend for the performance boost provided by virtual DOM for complex rendering. The page also doesn't reload only the changing component does.

- Appwrite is a open source backend as a service platform (like firebase). Using it to store the data for notes such as id, body, color, groups. It provides a convenient SDK for accessing the database.

## Features

- Auto-saving - The note will be autosaved after the user stops writing for 2 seconds.
  
- Draggable Notes - The user can drag and drop the note card anywhere.
  
- Color Coding - The color of a note card can be changed to classify them and to avoid a monotonous board.

- Like Home - The board stays the same as the user left it.

# Steps to run this project locally

- Make sure to have the latest version of NodeJS installed on your computer. Visit `nodejs.org` to download it.

- Clone this repository on your machine using `git clone https://github.com/sparky0520/notes.git`

- Install all the dependencies using `npm install`

- Run the development server using `npm run dev`.

