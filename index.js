import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/dummy.js";

// import "./connection.js";

/* Configuration */
const __filename = fileURLToPath(import.meta.url); // grab the file url
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/access"))); // is going to set the directory where we keep our assets

/* File storage configuration */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); //use this variable to upload file

/* Routes with file upload */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* Routers */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* Run server */
const { PORT, MONGO_URL } = process.env;
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Running at port ${PORT}`);

      // add dummy data
      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  })
  .catch((error) => {
    console.log(error, "did error");
    process.exit(1);
  });
