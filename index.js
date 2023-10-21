const express = require('express');
const app = express();
const multer = require('multer'); // Tambahkan baris ini

const MovieController = require('./Controllers/MovieController');
const path = require('path');

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// // Route untuk mengunggah foto
app.post('/contact/upload', upload.single('photo'), MovieController.uploadPhoto);

app.get('/movies', MovieController.getAllMovies);
// Route untuk memperbarui foto film (PUT)
app.put('/movies/:id/photo', upload.single('photo'), MovieController.updateMoviePhoto);

// Route untuk menghapus film (DELETE)
app.delete('/movies/:id', MovieController.deleteMovie);

// Port server
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
