import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import Spinner from "./components/Spinner";
import InitialPlaceholder from "./components/InitialPlaceholder";
import { useDebounce } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Debounce search term to avoid excessive calls
  useDebounce(() => setDebounceSearchTerm(searchTerm), 800, [searchTerm]);

  // Fetch results only, when filters change
  const fetchResults = async (query = '', filters = []) => {
    setLoading(true);
    setError('');
    // setResults([]);

    try {
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, filters }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      setResults(data.results || data);
      // Do NOT update filters here to avoid reset
    } catch (err) {
      setError("Failed to fetch results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filters independently if needed (optional)
  const fetchFilters = async (query) => {
    try {
      const response = await fetch("http://localhost:5000/search/gemini-filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Failed to fetch filters");

      const data = await response.json();
      setFilters(data);
    } catch (err) {
      console.error("Error fetching filters:", err);
      setFilters([]);
    }
  };

  // When debounced search term changes:
  useEffect(() => {
    if (debounceSearchTerm.trim() === '') {
      setResults([]);
      setError('');
      setFilters([]);           // reset filters only here
      setSelectedFilters([]);
      return;
    }

    fetchResults(debounceSearchTerm);
    fetchFilters(debounceSearchTerm);
    
  }, [debounceSearchTerm]);

  // When selected filters change, fetch filtered results only
  useEffect(() => {
    console.log(selectedFilters);
    if (debounceSearchTerm.trim() !== '') {
      fetchResults(debounceSearchTerm, selectedFilters);
    }
  }, [selectedFilters]);

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col min-h-screen">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI <span className="text-gradient">Web</span> Searcher
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </motion.div>

      <div className="flex flex-1 mt-6 gap-6">
        {/* Results Area */}
        <div className="flex-1 min-h-[400px] flex items-center justify-center rounded-md p-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Spinner />
              </motion.div>
            ) : error ? (
              <motion.p
                key="error"
                className="text-white text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            ) : searchTerm.trim() === '' ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <InitialPlaceholder />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Results results={results}/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FilterPanel
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          isVisible={searchTerm.trim() !== '' && filters.length > 0}
        />
      </div>
    </div>
  );
}

export default App;
