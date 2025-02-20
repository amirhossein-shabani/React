const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

/*

//Destructuring

const book = getBook(id);

const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
  book;

// console.log(title, author, pages, publicationDate, genres, hasMovieAdaptation);

// Destructuring race for array

// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];

// console.log(primaryGenre, secondaryGenre);

//in this type of destructuring race use for array by index number  --  in bottom we write a new name for index 1  and two of this array and get like that .

// this is way for Destructuring a chosen index of array :
//past the index of array with , ,  , -- this is mean past the index 0 , 1 and 2 :

// const [ , , , thirdGenre, fourthGenre] = genres;


const [primaryGenre, secondaryGenre, ...otherGenres] = genres;

// console.log(primaryGenre, secondaryGenre, otherGenres);

const newGenres = [...genres, "epic fantasy"];

newGenres;

const updatedBook = {
  ...book,
  // Adding a new property .
  moviePublicationsDate: "2001-12-19",
  // Overwriting an exisiting property .
  // pages: 1210,
};

updatedBook;

// function getYear(str) {
//   return str.split("-")[0];
// }

// arrow function :

// const getYear = (str) => {
//  return str.split("-")[0]
// };

const getYear = (str) => str.split("-")[0];
console.log(getYear(publicationDate));

// Template Literals ===  ` ... {} ... `  =>

const summary = ` ${title}, a ${pages}-page long book , was written by ${author} and published in ${getYear(
  publicationDate
)}. The book hase ${hasMovieAdaptation ? "" : "not"} been adapted as movie `;

summary;

const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";

pagesRange;

console.log(`The book has ${pagesRange} pages!`);

console.log(true && "some string");
console.log(false && "some string");

console.log(hasMovieAdaptation && "this boos hase a movie");

//falsy value : 0 , '' , null , undefind ...
console.log("janos" && "some string");
//this is a falsy value  .
console.log(0 && "some string");

console.log(true || "some string");
console.log(false || "some string");

console.log(book.translations.spanish);

const spanishTranslation = book.translations.spanish || "NOT TRANSLSATED";

spanishTranslation;

// with || can happend wrong thing like this ex :
// in this ex we have value of 0 but in || because know the 0 as fulsy vaule don't show us value of 0 and show no date string .

// console.log(book.reviews.librarything.reviewsCount);
// const countWrong = book.reviews.librarything.reviewsCount || "no data";
// countWrong;

// // sloution use nulish coalescing ?? =>

// const count = book.reviews.librarything.reviewsCount ?? "no data";
// count;

// optional Chaining

function getTotalReviewCount(book) {
  const goodread = book.reviews?.goodreads?.reviewsCount;
  const libraryything = book.reviews?.librarything?.reviewsCount ?? 0;
  goodread;
  libraryything;
  return goodread + libraryything;
}

console.log(getTotalReviewCount(book));


*/

/*

function getTotalReviewCount(book) {
  const goodread = book.reviews?.goodreads?.reviewsCount;
  const libraryything = book.reviews?.librarything?.reviewsCount ?? 0;
  return goodread + libraryything;
}

// The Array map Method =>

const books = getBooks();

const x = [1, 2, 3, 4, 5].map((el) => el * 2);
// console.log(x);

const titles = books.map((book) => book.title);
// console.log(titles);

// const essentialData = books.map((book) => {
//   return {
//     title: book.title,
//     author: book.author,
//   };
// });

const essentialData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewsCount: getTotalReviewCount(book),
}));

// console.log(essentialData);

// The Array filter method  =>

// const longBooks = books.filter((book) => book.pages > 500)
const longBooksWithMovie = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);
// console.log(longBooksWithMovie);

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);
// console.log(adventureBooks);

// The reduce Method :

const pagesAllBooks = books.reduce((sum, book) => sum + book.pages, 0);
console.log(pagesAllBooks);

// The Sort Method

// const n = [3, 7, 1, 9, 6];

// const Sorted = n.sort((a, b) => b - a);

// console.log(Sorted);

// const n = [3, 7, 1, 9, 6];

// n.sort((a, b) => b - a);

// console.log(n);

// const n = [3, 7, 1, 9, 6];
// const sorted = n.slice().sort((a, b) => b - a);
// console.log(sorted);
// console.log(n);

// const sortedByPages = books.slice().sort((a, b) =>  a.pages - b.pages );

// console.log(sortedByPages);

// Working with immutable Arrays =

// 1) Add book object to array =>

const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J. K .Rowling",
};
const booksAfterAdd = [...books, newBook];
// console.log(booksAfterAdd);

// 2) Delete book object from array =>

const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);

// console.log(booksAfterDelete);
// console.log(booksAfterAdd);

// 3) Update book object in the array

const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 1 } : book
);

// console.log(booksAfterUpdate);


*/

// Asynchronous JavaScript Promises  =>

// javascript not wait this data in fetch .

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     console.log("done ! ");
//   });

// Async - Await =>

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  // console.log(data);
  console.log("1");
  return data;
}

// getTodos();

const todos = await getTodos();

console.log(todos);

console.log("2");
