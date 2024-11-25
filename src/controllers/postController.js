import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postModel.js";
import fs from "node:fs";
import gerarDescricaoComGemini from "../services/geminiServises.js";

export async function listarPosts (req, res ) {
    const posts = await getTodosOsPosts();
    res.json(posts).status(200);

}

export async function postarNovoPost(req, res) {
    //pega o corpo da requisicao
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Ocorreu um erro ao criar o post" });
    };
};

export async function uploadImagem(req, res) {
    //pega o corpo da requisicao
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    }

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Ocorreu um erro ao criar o post" });
    };
};

export async function atualizaUmNovoPost(req, res) {
    //pega o corpo da requisicao
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imageBuffer = fs.readFileSync(`./uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt,
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Ocorreu um erro ao criar o post" });
    };
};