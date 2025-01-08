// Import Model Student
const Student = require("../models/Student");

class StudentController {
  // Menampilkan semua data students
  async index(req, res) {
    try {
      const students = await Student.all();
      const data = {
        message: "Menampilkan semua students",
        data: students,
      };
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data students.",
        error: err.message,
      });
    }
  }

  // Menambahkan data student baru
  async store(req, res) {
    try {
      const { nama, nim, email, jurusan } = req.body;

      if (!nama || !nim || !email || !jurusan) {
        return res.status(400).json({
          message: "Semua field (nama, nim, email, jurusan) harus diisi.",
        });
      }

      const student = await Student.create({
        nama,
        nim,
        email,
        jurusan,
      });

      const data = {
        message: "Menambahkan data student",
        data: student,
      };
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Terjadi kesalahan saat menambahkan data student.",
        error: err.message,
      });
    }
  }

  // Mengupdate data student
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nama, nim, email, jurusan } = req.body;

      if (!nama || !nim || !email || !jurusan) {
        return res.status(400).json({
          message: "Semua field (nama, nim, email, jurusan) harus diisi.",
        });
      }

      const updatedStudent = await Student.update(id, { nama, nim, email, jurusan });

      if (!updatedStudent) {
        return res.status(404).json({
          message: `Student dengan id ${id} tidak ditemukan.`,
        });
      }

      const data = {
        message: `Mengedit data student dengan id ${id}`,
        data: updatedStudent,
      };
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Terjadi kesalahan saat mengupdate data student.",
        error: err.message,
      });
    }
  }

  // Menghapus data student
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Student.delete(id);

      if (!deleted) {
        return res.status(404).json({
          message: `Student dengan id ${id} tidak ditemukan.`,
        });
      }

      const data = {
        message: `Menghapus student dengan id ${id}`,
        data: null,
      };
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Terjadi kesalahan saat menghapus data student.",
        error: err.message,
      });
    }
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
