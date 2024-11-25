import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizaUmNovoPost } from "../controllers/postController.js";
import cors from "cors";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizaUmNovoPost);
};

export default routes;