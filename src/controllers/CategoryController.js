import Category from "../models/Category.js";
import { categoryValidation } from "../validation/categoryValidation.js";

// [GET] /api/categories
export const getAll = async (req, res, next) => {
  try {
    const data = await Category.find({});

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// [GET] /api/categories/:id
export const getById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category detail: " + data.name,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// [POST] /api/categories
export const createCategory = async (req, res, next) => {
  try {
    const data = await Category.create(req.body);

    if (!data) {
      return res.status(404).json({
        message: "Create failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Create category successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// [PUT] /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { error } = categoryValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        errors: errorMessages,
      });
    }

    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        message: "Update failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Update category successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { slug } = req.params;
    const { status } = req.body;

    if (typeof status === "undefined") {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const category = await Category.findOneAndUpdate(
      { slug },
      { status },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated category status successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
// [DELETE] /api/categories/:id
export const remove = async (req, res) => {
  try {
    const data = await Category.findOneAndDelete({ _id: req.params.id });

    if (!data) {
      return res.status(404).json({
        message: "Delete failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete category successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
