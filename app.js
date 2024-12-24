// Import express dan routing
const express = require("express");
const router = require("./routes/api.js");

// Membuat object express
const app = express();

// Middleware untuk parsing body JSON
app.use(express.json());

// Menggunakan routing (router)
app.use(router);

// Menentukan port dan menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
