const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// CRUD Routes
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/profile/:id", auth, userCtrl.getUserProfile);
router.put("/profile/:id", auth, multer, userCtrl.updateProfile);
router.delete("/profile/:id", auth, userCtrl.deleteProfile);

module.exports = router;
