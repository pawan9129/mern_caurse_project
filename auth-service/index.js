
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pawanmaurya:mongodb%4012345@cluster0.5w9df.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('User Authentication Microservice');
});

app.listen(port, () => {
  console.log(`User Authentication Microservice listening at http://localhost:${port}`);
});
