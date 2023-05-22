import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                {searchTerm && (
                    <button className="clear-button" onClick={handleClear}>
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
