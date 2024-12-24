// Import Student Controller
const StudentController = require("../controllers/StudentController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Express");
});

router.get("/students", StudentController.index);
router.post('/students', StudentController.create); // Create new student
router.get('/students/:id', StudentController.show); // Read single student
router.put('/students/:id', StudentController.update); // Update student
router.delete('/students/:id', StudentController.delete);

// Export router
module.exports = router;