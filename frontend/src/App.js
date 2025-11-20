import React, { useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`http://localhost:3001/api/search?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
      }
    } catch (error) {
      console.error('Error fetching case laws:', error);
      alert('Error connecting to server. Make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Case Law Search</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter keyword (e.g., bail, FIR, custody)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading && <p className="loading">Searching...</p>}

        {!loading && searched && results.length === 0 && (
          <p className="no-results">No case laws found for "{keyword}"</p>
        )}

        {!loading && results.length > 0 && (
          <div className="results">
            <h2>Search Results ({results.length})</h2>
            <div className="results-list">
              {results.map((caseItem) => (
                <div key={caseItem.id} className="case-card">
                  <h3 className="case-name">{caseItem.name}</h3>
                  <p className="case-citation">{caseItem.citation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;