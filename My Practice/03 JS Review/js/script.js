//* data is array of books objects

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

const books = getBooks();
books;

//& Destructing:

//? Object Destruction:
//* Object Destruction relies on the property names
const book = getBook(2);
const title1 = book.title;
title1;

const { title } = book;
title;

const { author, pages, genres, publicationDate, hasMovieAdaptation } = book;

author;
genres;
pages;
console.log(author, pages);

//? Array Destruction:
//* Array Destruction relies on the elements order
const [primaryGenre, secondary, ...otherGenres] = genres;
primaryGenre;
otherGenres;

const allGenres = [primaryGenre, ...otherGenres];
console.log(allGenres);
const getYear = (str) => str.split("-")[0];

const summary = `${title}, a ${pages} long was written by ${author} and published in ${getYear(
  publicationDate
)} and has ${hasMovieAdaptation ? "" : "not"} been adapted as movie`;
summary;

const pagesRange = pages > 1000 ? "over 1000 pages" : "less than 1000 pages";
pagesRange;

const langTranslation = book.translations.spanish || "No Translation";
langTranslation;

const reviewCounts = book.reviews.librarything.reviewsCount || "No data";
reviewCounts;

//* Map Method:
const titles = books.map(({ title }) => title);
console.log(titles);

const essentialData = books.map(({ title, author }) => {
  return { title, author };
});
essentialData;
console.log(essentialData);

//! Or  without using return (implicit return) by using wrapping the object in two parenthesis ()
//* because without the two (), the Javascript will think the two curly braces are declaration block not they are object literal as we want

const essentialDataShort = books.map(({ title, author }) => ({
  title,
  author,
}));
console.log(essentialDataShort);

const longBooks = books.filter((book) => book.pages > 500);
longBooks;

const adventuresBook = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);
adventuresBook;

const totalPages = books.reduce((cur, book) => cur + book.pages, 0);
totalPages;

const sortedPages = books.slice().sort((a, b) => b.pages - a.pages);
sortedPages;

//* Add new book object to the array
const newBook = {
  id: 6,
  title: "Learn German",
  pages: 1212,
};
const booksAfterAdd = [...books, newBook];

//* Delete new book object from an array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);

//* Update book object in the array
const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, page: 12 } : book
);

// fetch('https://jsonplaceholder.typicode.com/todos').then(res=>res.json()).then(data=>console.log(data));

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data;
}

const returnData = getData();
console.log(returnData);

console.log("Jonas");
