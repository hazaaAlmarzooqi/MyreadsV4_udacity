
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";

function SearchPage({ books, onShelfChange }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setQuery(query);
    if (query) {
      const results = await BooksAPI.search(query, 20);
      if (results && !results.error) {
        setSearchResults(
          results.map((result) => {
            const bookInShelf = books.find((b) => b.id === result.id);
            return bookInShelf ? bookInShelf : { ...result, shelf: "none" };
          })
        );
      } else {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleClose = () => {
    navigate("/");
    window.location.reload(); // Reload the main page after going back.
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" onClick={handleClose} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
