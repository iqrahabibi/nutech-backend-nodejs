import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import FileUpload from "express-fileupload";
import cors from "cors";
import router from "./routes/index.js";
dotenv.config();
const app = express();
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);
 
app.listen(5000, ()=> console.log('Server running at port 5000'));