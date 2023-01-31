import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import { posts, users } from "./data/index.js";

/*CONFIGURATIONS*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); //helps us secure HTTP headers returned by our Express apps
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("comman")); //logs HTTP requests and errors, and simplifies the process
app.use(bodyParser.json({ limit: "30mb", extended: true })); //process data sent in an HTTP request body.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //allows a client application to request restricted resources hosted on server from a different origin
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*FILE STORAGE*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/*OTHER ROUTES*/
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //Adding data once
    // Post.insertMany(posts);
    // User.insertMany(users);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
