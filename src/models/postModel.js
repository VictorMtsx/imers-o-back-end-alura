import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../db/dbConfig.js";

//Conecta ao banco de dados utilizando a string de conexao fornecida através do arquivo .env
const conexao =  await conectarAoBanco(process.env.STRING_CONEXAO);


export async function getTodosOsPosts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    //aqui retorna todos os posts 
    return await colecao.find().toArray();
}

export async function criarPost(novoPost) {

    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts"); 

    //aqui retorna todos os posts 
    return await colecao.insertOne(novoPost);
} 

export async function atualizarPost(id, novoPost) {

    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts"); 
    const objID = ObjectId.createFromHexString(id);

    //aqui retorna todos os posts 
    return await colecao.updateOne({ _id: new ObjectId(objID) }, { $set:novoPost });
} 