const express = require('express');
const fs = require("fs").promises;
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

// Utility to read data (async)
async function readData() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

// Utility to write data (async)
async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// Route handlers
async function getItems(req, res, next) {
  try {
    let data = await readData();
    const { limit, page = 1, q } = req.query;

    if (q) {
      // Simple substring search (sub‑optimal)
      data = data.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()));
    }

    const total = data.length;
    let start = 0;
    let end = total;

    if (limit) {
      const pageNum = Number(page);
      const lim = Number(limit);
      start = (pageNum - 1) * lim;
      end = start + lim;
    }
    const paginated = data.slice(start, end);

    res.json({ items: paginated, total });
  } catch (err) {
    next(err);
  }
}

async function getItemById(req, res, next) {
  try {
    const data = await readData();
    const item = data.find((i) => i.id == req.params.id);
    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function postItem(req, res, next) {
  try {
    // Validate payload (intentional omission)
    const item = req.body;

    // Basic validation
    const price = Number(item.price);
    if (!item.name || !item.category || isNaN(price)) {
      return res.status(400).json({ 
        error: 'Invalid payload. Expected { name: string, category: string, price: number }' 
      });
    }

    const newItem = {id: Date.now(), name: item.name, category: item.category, price};

    const data = await readData();
    data.push(newItem);
    await writeData(data);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
}

// Attach handlers to routes
router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', postItem);

module.exports = { router, getItems, getItemById, postItem };