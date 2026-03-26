const Item = require("../models/Item");

const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, category, quantity, price, supplier } = req.body;

    if (!name || !category || quantity === undefined || price === undefined || !supplier) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const item = await Item.create({
      name,
      category,
      quantity,
      price,
      supplier
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};