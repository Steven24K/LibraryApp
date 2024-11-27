# LibraryApp

This application uses the bare minimum setup for a React App using Webpack and Typescript. 

## Running 

`dotnet watch run`

`npm i yarn -g` if not done allready

`yarn install`

`yarn start`

## Sample case

Imagine you’re working on a college library search system that helps students find books based on specific criteria. The system has a large list of books, and you want to let students filter books based on multiple criteria, such as genre, title, year published, and author.
However, you want each criteria to be applied independently so that students can start with one criteria and add others as needed. 

### Exercise 1 
Continue to implement your own linked list structure that can be used to render
the list of books in the state. 
Make sure the list has the following methods implemented: 
- reduce 
- map 
- toArray
- count
- filter

- Also make a function using the existing `reduce` method on `Array` to transform an `Array`
    to a custom linked list. 

### Exercise 2
Applying the concept of currying, build a modular filter system where you can select 
an attribute from a dropdown and apply the content from the search box on the list of 
books. Passing 1 argument at the time. 

### Exercise 3
Using the concept of function composition, make it possible to apply more than 1 filter. 
Do not change the concept of currying from the previous question. 

