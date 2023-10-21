// repositories/MovieRepository.js
const pool = require('../queries'); // Sesuaikan dengan file yang mengelola koneksi ke database
const Movie = require('../models/Movie');

class MovieRepository {
  static getAllMovies(callback) {
    const query = 'SELECT * FROM movies';
    pool.query(query, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        const movies = results.rows.map(row => new Movie(row.id, row.title, row.genres, row.year, row.photo));
        callback(null, movies);
      }
    });
  }

  static updateMoviePhoto(movieId, photoPath, callback) {
    const query = 'UPDATE movies SET photo = $1 WHERE id = $2';
    pool.query(query, [photoPath, movieId], (error, result) => {
      callback(error);
    });
  }
}

module.exports = MovieRepository;
