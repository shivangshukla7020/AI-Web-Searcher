function deduplicateResults(results) {
  const seen = new Set();
  return results.filter(item => {
    const id = item.link;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

module.exports = {
  deduplicateResults,
};
