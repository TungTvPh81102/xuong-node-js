import Gallery from "../models/Gallery.js";
import Product from "../models/Product.js";
import { generateSlug } from "../utils/renderSlug.js";
import { productValidation } from "../validation/productValidation.js";

// [GET] /api/products
export const getAll = async (req, res, next) => {
  try {
    const data = await Product.find({})
      .populate({
        path: "category_id",
        select: "_id name",
      })
      .populate({
        path: "brand_id",
        select: "_id name",
      });

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

// [GET] /api/products/:slug
export const getById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate([
      "category_id",
      "brand_id",
    ]);

    if (!product) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    const galleries = await Gallery.find({ product_id: product._id }).select(
      "_id image"
    );

    const data = {
      ...product.toObject(),
      galleries: galleries,
    };

    return res.status(200).json({
      success: true,
      message: "Product detail: " + data.name,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// [POST] /api/products
export const createProduct = async (req, res, next) => {
  try {
    const { error } = productValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        errors: errorMessages,
      });
    }

    const data = await Product.create(req.body);

    if (!data) {
      return res.status(404).json({
        message: "Create failed",
      });
    }

    if (req.body.images && req.body.images.length > 0) {
      const galleries = new Gallery({
        product_id: data._id,
        image: req.body.images,
      });

      await galleries.save();
    }

    return res.status(201).json({
      success: true,
      message: "Create product successfully",
      data,
    });
  } catch (error) {
    next(error);
    // return res.status(500).json({
    //   name: error.name,
    //   message: error.message,
    // });
  }
};

// [PUT] /api/products/:slug
export const updateProduct = async (req, res, next) => {
  try {
    const { error } = productValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        errors: errorMessages,
      });
    }

    if (req.body.name) {
      req.body.slug = generateSlug(req.body.name);
    }

    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate(["category_id", "brand_id"]);

    if (!data) {
      return res.status(404).json({
        message: "Update failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Update product successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// [DELETE] /api/products/:id
export const remove = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Delete failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete product successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
