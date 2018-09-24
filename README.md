# MyReads Project

This is my completed project for Udacity's React Fundamentals course. The goal of this project was to implement functionality to a simple React application. Starter code was provided that did not include any of the interactivity or functionality.

MyReads is a simple single page web application built with React. It consists of 2 main parts. The main page holds 3 book shelves that display books I am currently reading, books I'd like to read, and books I've already read. You can move books between shelves at will.

The second part of the application is the search page. This is where you add more books to your shelves. Typing in a query will display some results, and you can add them to your shelves. These results are displayed from a limited cache, and search queries are limited.

## To Run this App:

* Clone or download the project, and `cd` into the root folder
* install all project dependencies by running `npm install` (only need to do this once)
* start the development server with `npm start` (this start a local server and open a web browser tab to the project)

## Limited Searching
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list contains the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Built with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Contributing

This repository was a project completed as a part of the Udacity Front End Nanodegree curriculum. Many students completed this same project, and it was forked from Udacity's starter code. Because this was course work, I will not accept pull requests.

