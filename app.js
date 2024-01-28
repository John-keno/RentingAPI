const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory database
let movies = [
  { id: 1, title: 'The boogie man', genre: 'Sci-Fi', available: true },
  { id: 2, title: 'The Shawshank Redemption', genre: 'Drama', available: true },
  { id: 3, title: 'John wick', genre: 'Action', available: false },
];

app.use(bodyParser.json());

// Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get a specific movie by ID
app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Rent a movie
app.post('/rent/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === movieId);

  if (movie) {
    if (movie.available) {
      movie.available = false;
      res.json({ message: 'Movie rented successfully' });
    } else {
      res.status(400).json({ error: 'Movie not available for rent' });
    }
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Return a rented movie
app.post('/return/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === movieId);

  if (movie) {
    if (!movie.available) {
      movie.available = true;
      res.json({ message: 'Movie returned successfully' });
    } else {
      res.status(400).json({ error: 'Movie is not currently rented' });
    }
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Movie Renting API is listening at http://localhost:${port}`);
});
