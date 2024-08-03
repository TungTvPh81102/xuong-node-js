export const checkIsAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Unthorized",
      });
    }
    next();
  } catch (error) {
    return req.status(403).json({
      message: "Unthorized",
    });
  }
};
