const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');
const { mean } = require('../utils/stats');

let cachedStats = null;

// Function to recalc stats
function calculateStats(items) {
  return {
    total: items.length,
    averagePrice: items.length > 0 ? mean(items.map(i => i.price)) : 0,
  };
}

// Initial load
function loadStats() {
  fs.readFile(DATA_PATH, "utf-8", (err, raw) => {
    if (err) {
      console.error("Failed to read data:", err);
      cachedStats = { total: 0, averagePrice: 0 };
      return;
    }
    try {
      const items = JSON.parse(raw);
      cachedStats = calculateStats(items);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      cachedStats = { total: 0, averagePrice: 0 };
    }
  });
}

// Watch file changes to update cache
fs.watch(DATA_PATH, () => {
  loadStats();
});

// Initial cache fill
loadStats();

// GET /api/stats
router.get("/", (req, res) => {
  if (!cachedStats) {
    return res.status(503).json({ error: "Stats not ready" });
  }
  res.json(cachedStats);
});

module.exports = router;