const express = require("express");
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/itemController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getAllItems);
router.get("/:id", protect, getItemById);

router.post("/", protect, authorize("admin"), createItem);
router.put("/:id", protect, authorize("admin"), updateItem);
router.delete("/:id", protect, authorize("admin"), deleteItem);

module.exports = router;