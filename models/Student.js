// import database
const db = require("../config/database");

// membuat class Model Student
class Student {
  // Method untuk mengambil semua data
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM students";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Method untuk menambahkan data
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO students (nama, nim, email, jurusan, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [
        data.nama,
        data.nim,
        data.email,
        data.jurusan,
        new Date(),
        new Date(),
      ];

      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve({
          id: result.insertId,
          ...data,
          created_at: values[4],
          updated_at: values[5],
        });
      });
    });
  }

  // Method untuk mengupdate data berdasarkan ID
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE students
        SET nama = ?, nim = ?, email = ?, jurusan = ?, updated_at = ?
        WHERE id = ?
      `;
      const values = [
        data.nama,
        data.nim,
        data.email,
        data.jurusan,
        new Date(),
        id,
      ];

      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        if (result.affectedRows === 0) {
          resolve(null); // Jika tidak ada row yang diperbarui
        } else {
          resolve({ id, ...data, updated_at: values[4] });
        }
      });
    });
  }

  // Method untuk menghapus data berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM students WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }
}

// export class Student
module.exports = Student;
