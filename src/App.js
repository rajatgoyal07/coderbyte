import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newDocument, setNewDocument] = useState({
    title: '',
    description: '',
    author: '',
    date: '',
    name: '',
  });

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`/api/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchSearchResults();
  };

  const handleInputChange = (e) => {
    setNewDocument({
      ...newDocument,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/add/documents', newDocument);
      setNewDocument({
        title: '',
        description: '',
        author: '',
        date: '',
        name: '',
      });
      fetchSearchResults();
    } catch (error) {
      console.error(error);
    }
  };

  const highlightText = (text, keyword) => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
      <div className="app-container">
        <h2>Add Document:</h2>
        <form className="document-form" onSubmit={handleAddDocument}>
          <input
              type="text"
              name="title"
              placeholder="Title"
              value={newDocument.title}
              onChange={handleInputChange}
          />
          <input
              type="text"
              name="description"
              placeholder="Description"
              value={newDocument.description}
              onChange={handleInputChange}
          />
          <input
              type="text"
              name="author"
              placeholder="Author"
              value={newDocument.author}
              onChange={handleInputChange}
          />
          <input
              type="text"
              name="date"
              placeholder="Date"
              value={newDocument.date}
              onChange={handleInputChange}
          />
          <input
              type="text"
              name="name"
              placeholder="Name"
              value={newDocument.name}
              onChange={handleInputChange}
          />
          <button type="submit">Add</button>
        </form>

        <h2>Search Document:</h2>
        <div className="search-bar">
          <div className="search-input-container">
            <input
                type="text"
                value={searchQuery}
                className="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button className="clear-button" onClick={handleClear}>
                  <i className="fas fa-times" />
                </button>
            )}
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <p className="search-result-count">
          <b>{searchResults.length} posts</b> were found.
        </p>

        {searchResults.map((result) => (
            <div key={result.id} className="search-result">
              <hr />
              <h3
                  dangerouslySetInnerHTML={{
                    __html: highlightText(result.title, searchQuery),
                  }}
              ></h3>
              <p
                  dangerouslySetInnerHTML={{
                    __html: highlightText(result.description, searchQuery),
                  }}
              ></p>
              <p>Author: {result.author}</p>
              <p>Date: {result.date}</p>
              <p>Name: {result.name}</p>
            </div>
        ))}
      </div>
  );
}

export default App;
