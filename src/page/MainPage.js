
import React from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";

function MainPage({ books, onShelfChange }) {
  const shelves = [
    { id: "currentlyReading", title: "Currently Reading" },
    { id: "wantToRead", title: "Want to Read" },
    { id: "read", title: "Read" },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map((shelf) => (
          <div key={shelf.id} className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter((book) => book.shelf === shelf.id)
                  .map((book) => (
                    <li key={book.id}>
                      <Book book={book} onShelfChange={onShelfChange} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default MainPage;
