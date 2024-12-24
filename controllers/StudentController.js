const students = require('../data/students');

class StudentController {
    // Method untuk menampilkan semua data students
    index(req, res) {
        const response = {
            message: 'Menampilkan data students',
            data: students,
        };
        res.json(response);
    }

    // Method untuk menambahkan data student baru
    create(req, res) {
        const { id, name, age, major } = req.body;
        students.push({ id, name, age, major });

        const response = {
            message: 'Data student berhasil ditambahkan',
            data: { id, name, age, major },
        };
        res.status(201).json(response);
    }

    // Method untuk menampilkan data student berdasarkan ID
    show(req, res) {
        const { id } = req.params;
        const student = students.find((s) => s.id === parseInt(id));

        if (!student) {
            return res.status(404).json({ message: 'Student tidak ditemukan' });
        }

        const response = {
            message: 'Menampilkan data student',
            data: student,
        };
        res.json(response);
    }

    // Method untuk mengupdate data student berdasarkan ID
    update(req, res) {
        const { id } = req.params;
        const { name, age, major } = req.body;

        const student = students.find((s) => s.id === parseInt(id));

        if (!student) {
            return res.status(404).json({ message: 'Student tidak ditemukan' });
        }

        student.name = name || student.name;
        student.age = age || student.age;
        student.major = major || student.major;

        const response = {
            message: 'Data student berhasil diupdate',
            data: student,
        };
        res.json(response);
    }

    // Method untuk menghapus data student berdasarkan ID
    delete(req, res) {
        const { id } = req.params;
        const index = students.findIndex((s) => s.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({ message: 'Student tidak ditemukan' });
        }

        students.splice(index, 1);

        const response = {
            message: 'Data student berhasil dihapus',
        };
        res.json(response);
    }
}

module.exports = new StudentController();
