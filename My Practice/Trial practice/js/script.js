(function () {

  const data = [
    {
      id: 1,
      title: "The Lord of the Rings",
      publicationDate: "1954-07-29",
      author: "J. R. R. Tolkien",
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
      author: "Stanislaw Lem",
      reviews: {
        goodreads: {
          rating: 4.16,
          ratingsCount: 11663,
          reviewsCount: 812,
        }
      }
    }
  ]
  const getBook = id => data.find(book => book.id === id);

  const book = getBook(2);
  book;
  const getReviewsCount = book => book.reviews.goodreads.reviewsCount + (book.reviews.librarything?.reviewsCount ?? 0); //* use ?? to return 0 instead of undefined
  const totalCounts = getReviewsCount(book);
  totalCounts;

//! note: The addition operator (+) has higher precedence than the nullish coalescing operator (??), so it is evaluated first.
//* This means that when you try to add the reviewsCount property of the goodreads object (which is a number) to the result of the optional chaining expression (which is undefined),
//* you get NaN.
  
  //? note: undefined + number = NaN
})()