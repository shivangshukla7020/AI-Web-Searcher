const express = require("express");
const router = express.Router();
const { handleSearch, fetchFilters } = require("../controllers/searchController");

router.post("/", handleSearch);
router.post('/gemini-filters', fetchFilters);

module.exports = router;
