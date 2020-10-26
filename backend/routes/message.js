const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const messageCtrl = require("../controllers/message");

// CRUD Routes
router.post("/create", auth, multer, messageCtrl.create);
router.get("/", auth, messageCtrl.getAllMessages);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.put("/update/:id", auth, multer, messageCtrl.update);
router.delete("/delete/:id", auth, messageCtrl.delete);

//Likes
router.post("/:id/like", auth, messageCtrl.addLike);
router.get("/:id/like", auth, messageCtrl.getAllLikes);
router.delete("/:id/like", auth, messageCtrl.removeLike);

module.exports = router;
