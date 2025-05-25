const {
  searchGoogle,
  searchBing,
} = require("../services/searchService");

const { deduplicateResults } = require("../utils/deduplicate");
const { rankResultsWithGemini } = require("../services/geminiService");
const { getFiltersFromGemini } = require('../services/geminiService');

async function handleSearch(req, res) {
  const { query, filters } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Fetch Google and Bing results via SerpAPI
    const [googleResults, bingResults] = await Promise.all([
      searchGoogle(query,filters),
      searchBing(query,filters),
    ]);

    // Combine and deduplicate results
    let combinedResults = [...googleResults, ...bingResults];
    combinedResults = deduplicateResults(combinedResults);

    // Check if combinedResults is an array before ranking
    if (!Array.isArray(combinedResults) || combinedResults.length === 0) {
      return res.status(200).json([]); // No results found
    }

    // Use Gemini to rank results (returns top 5 ranked)
    const rankedResults = await rankResultsWithGemini(query, combinedResults);

    res.json(rankedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
}

async function fetchFilters(req, res) {
  const { query } = req.body;

  if (!query || typeof query !== 'string' || query.trim() === '') {
    return res.status(400).json({ error: 'Query is required and must be a non-empty string.' });
  }

  try {
    const filters = await getFiltersFromGemini(query.trim());
    res.json(filters);
  } catch (error) {
    console.error('Error fetching filters from Gemini:', error);
    res.status(500).json({ error: 'Failed to fetch filters from Gemini.' });
  }
}

module.exports = {
  handleSearch, fetchFilters,
};
