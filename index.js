import express from "express";
import cors from "cors";
import { PORT } from "./src/config/env.js";
import router from "./src/routes/index.routes.js";
import connectDB from "./src/config/connectDB.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", router);

// Trương hớp nếu sử dụng next
const errorNotFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.path}`);
  error.status = 404;
  next(error);
};

const errorCommon = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Lỗi server",
  });
};

app.use(errorNotFound, errorCommon);

// Not found
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "404 Not found",
//   });
// });

// app.use((error, req, res) => {
//   console.log(error);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//   });
// });

app.listen(PORT | 8080, () => console.log(`Server running on port ${PORT} `));

// export const viteNodeApp = app;
