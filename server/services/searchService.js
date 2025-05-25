const axios = require("axios");

function buildQueryWithFilters(query, filters = []) {
  if (!filters.length) return query;
  return `${query} ${filters.join(" ")}`;
}

async function searchWithSerpApi(query, engine = "google", filters = []) {
  const apiKey = process.env.SERPAPI_KEY;
  const fullQuery = buildQueryWithFilters(query, filters);
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(fullQuery)}&engine=${engine}&api_key=${apiKey}`;

  try {
    const res = await axios.get(url);
    const results = res.data.organic_results || [];

    return results.map(item => ({
      title: item.title,
      link: item.link,
      summary: item.snippet || "",
    }));
  } catch (err) {
    console.error(`Error in ${engine} search:`, err.message);
    return [];
  }
}

async function searchGoogle(query, filters = []) {
  return searchWithSerpApi(query, "google", filters);
}

async function searchBing(query, filters = []) {
  return searchWithSerpApi(query, "bing", filters);
}

module.exports = {
  searchGoogle,
  searchBing,
};
