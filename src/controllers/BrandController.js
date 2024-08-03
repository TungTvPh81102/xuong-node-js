import Brand from "../models/Brand.js";
import { brandValidation } from "../validation/brandValidation.js";

// [GET] /api/brands
export const getAll = async (req, res, next) => {
  try {
    const data = await Brand.find({});

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

// [GET] /api/brands/:id
export const getById = async (req, res, next) => {
  try {
    const data = await Brand.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Brand detail: " + data.name,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      error: error.message,
    });
  }
};

// [POST] /api/brands
export const createBrand = async (req, res, next) => {
  try {
    const { error } = brandValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        errors: errorMessages,
      });
    }

    const data = await Brand.create(req.body);

    if (!data) {
      return res.status(404).json({
        success: false,
        errors: "Create failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Create brand successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// [PUT] /api/brands/:id
export const updateBrand = async (req, res, next) => {
  try {
    const { error } = brandValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        errors: errorMessages,
      });
    }

    const data = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        errors: "Update failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Update brand successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// [DELETE] /api/brands/:id
export const remove = async (req, res, next) => {
  try {
    const data = await Brand.findOneAndDelete(req.params.id);

    if (!data) {
      return res.status.status(404).json({
        status: false,
        message: "Delete failed",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Delete brand successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
