const MovieRepository = require('../repositories/MovieRepository');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
class MovieController {
  static uploadPhoto(req, res) {
    const file = req.file;

    if (!file) {
      return res.status(400).send({
        status: false,
        data: 'Tidak ada file yang dipilih.',
      });
    }

    const movieId = req.query.index; // Sesuaikan dengan cara Anda mendapatkan ID film yang sesuai
    const photoPath = 'upload/' + file.filename;

    MovieRepository.updateMoviePhoto(movieId, photoPath, (error) => {
      if (error) {
        console.error('Gagal menyimpan foto di dalam database:', error);
        return res.status(500).send({
          status: false,
          data: 'Gagal menyimpan foto di dalam database.',
        });
      } else {
        console.log('Foto berhasil diunggah dan disimpan di dalam database.');
        return res.send({
          status: true,
          data: 'Foto berhasil diunggah dan disimpan di dalam database.',
        });
      }
    });
  }

  static getAllMovies(req, res) {
    MovieRepository.getAllMovies((error, movies) => {
      if (error) {
        console.error('Gagal mendapatkan data film:', error);
        return res.status(500).send({
          status: false,
          data: 'Gagal mendapatkan data film',
        });
      } else {
        return res.send({
          status: true,
          data: movies,
        });
      }
    });
  }

  static updateMoviePhoto(req, res) {
    const movieId = req.params.id; // Mengambil ID film dari parameter URL
  const file = req.file;

  if (!file) {
    console.error('Gagal mengunggah foto: Tidak ada file yang dipilih.');
    return res.status(400).send({
      status: false,
      data: 'Tidak ada file yang dipilih',
    });
  }
  const photoPath = 'upload/' + file.filename;

  MovieRepository.updateMoviePhoto(movieId, photoPath, (error) => {
    if (error) {
      console.error('Gagal memperbarui foto film:', error);
      res.status(500).send({
        status: false,
        data: 'Gagal memperbarui foto film.',
      });
    } else {
      console.log('Foto film berhasil diperbarui.');
      res.send({
        status: true,
        data: 'Foto film berhasil diperbarui.',
      });
    }
  });
}

static deleteMovie(req, res) {
  const movieId = req.params.id; // Mengambil ID film dari parameter URL

  MovieRepository.deleteMovie(movieId, (error) => {
    if (error) {
      console.error('Gagal menghapus film:', error);
      res.status(500).send({
        status: false,
        data: 'Gagal menghapus film',
      });
    } else {
      console.log('Film berhasil dihapus.');
      res.send({
        status: true,
        data: 'Film berhasil dihapus.',
      });
    }
  });
}
}

module.exports = MovieController;
