import User from "../models/User.js";
import { hassPassword } from "../utils/hashPassword.js";

// [GET] /api/users
export const getAll = async (req, res, next) => {
  try {
    const data = await User.find({});

    if (!data || data.length === 0) {
      data.password = undefined;
      return res.status(404).json({
        message: "Data not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User list",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// [GET] /api/users/:id
export const getDetail = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);

    if (!data || data.length === 0) {
      data.password = undefined;
      return res.status(404).json({
        message: "Data not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User detail: " + data.name,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// [POST] /api/users
export const create = async (req, res, next) => {
  try {
    const useExits = await User.findOne({ email: req.body.email });

    if (useExits) {
      return res.status(404).json({
        status: false,
        errors: "User already exists",
      });
    }

    const hashPassword = hassPassword(req.body.password);

    const data = await User.create({
      ...req.body,
      password: hashPassword,
    });

    if (!data) {
      data.password = undefined;
      return res.status(404).json({
        message: "Create failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Create product successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// [PUT] /api/users/:id
export const update = async (req, res, next) => {};

// [DELETE] /api/users/:id
export const remove = async (req, res, next) => {};
