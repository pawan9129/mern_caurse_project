
const express = require('express');
const mongoose = require('mongoose');
const { Client } = require('@elastic/elasticsearch');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pawanmaurya:mongodb%4012345@cluster0.5w9df.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Elasticsearch Connection
const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const esClient = new Client({ node: ELASTICSEARCH_NODE });

// Redis Connection
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = redis.createClient({ url: REDIS_URL });

redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    await redisClient.connect();
    console.log('Connected to Redis');
}
connectRedis();


// Routes
const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
  res.send('Course Management Microservice');
});

app.listen(port, () => {
  console.log(`Course Management Microservice listening at http://localhost:${port}`);
});

module.exports = {
  esClient,
  redisClient,
};
