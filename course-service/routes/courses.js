
const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Course = require('../models/Course');
const { esClient, redisClient } = require('../index'); // Import clients from index.js

const upload = multer({ dest: 'uploads/' });

// Course Data Upload
router.post('/upload', upload.single('csv'), async (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await Course.insertMany(results);
        // Index data into Elasticsearch
        const body = results.flatMap(doc => [{ index: { _index: 'courses', _id: doc.course_id } }, doc]);
        await esClient.bulk({ refresh: true, body });
        fs.unlinkSync(req.file.path); // Clean up uploaded file
        res.status(201).send('Courses uploaded and indexed successfully');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    });
});

// Course Finder (Elasticsearch & Redis Cache)
router.get('/search', async (req, res) => {
  const { q, category, instructor } = req.query;
  const cacheKey = `search:${q || ''}:${category || ''}:${instructor || ''}`;

  try {
    // Check cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // If not in cache, query Elasticsearch
    const must = [];
    if (q) {
      must.push({ multi_match: { query: q, fields: ['title', 'description'] } });
    }
    if (category) {
      must.push({ match: { category } });
    }
    if (instructor) {
      must.push({ match: { instructor } });
    }

    const { body } = await esClient.search({
      index: 'courses',
      body: {
        query: {
          bool: {
            must,
          },
        },
      },
    });

    const results = body.hits.hits.map(hit => hit._source);

    // Store in cache for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(results), { EX: 3600 });

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
