import express from "express";
import cors from "cors"
const app = express();
const port = 9080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
let users = [
  {
    "id": 1, 
    "email": "ricavalier@hotmail.com", 
    "docType": "1", 
    "name": "Delfino José Gonçalvez Floriano", 
    "document": "866.736.430-48", 
    "date": "1923-11-11", 
    "phone": "(11) 2345-6789", 
    "password": "Mudar@123", 
    "typePerson": "Pessoa Física" 
  }
];
const status = [
  { code: 200, description: "Solicitação com Sucesso" },
  { code: 400, description: "Solicitação inválida" },
  { code: 401, description: "Não autorizado" },
  { code: 403, description: "Proibido" },
  { code: 404, description: "Não encontrado" },
  { code: 405, description: "Método não permitido" },
  { code: 406, description: "Não aceitável" },
  { code: 408, description: "Tempo limite da solicitação" },
  { code: 409, description: "Conflito" },
  { code: 412, description: "Falha na pré-condição" },
  { code: 429, description: "Solicitações em excesso" },
  { code: 500, description: "Erro interno do servidor" },
  { code: 501, description: "Não implementado" },
  { code: 502, description: "Gateway ruim" },
  { code: 503, description: "Serviço não disponível" },
  { code: 504, description: "Tempo limite do gateway" }
];
const setHeader = (res) => (
  res.set("Access-Control-Allow-Origin", "*"),
  res.set("Access-Control-Allow-Headers", "content-type"),
  res.set("Content-Type", "application/json"),
  res.set("Access-Control-Allow-Methods", 'GET, POST, OPTIONS'),
  res.header("Access-Control-Request-Method", "GET, POST, OPTIONS, PUT, DELETE")
);
const ResponseData = (res, status, obj) => {
  return res.status(status.code).json({
    code: status.code,
    description: status.description,
    data: obj,
    source: status,
  });
};
app.get("/registration", (req, res) => {
  const data = users
  setHeader(res);
  if (data.length > 0) {
    ResponseData(res, status[0], data);
  } else {
    ResponseData(res, status[1], {});
  }
});
app.get("/registration/:id", (req, res) => {
  const id = req.params.id;
  const data = users.find((obj) => {
    return obj.id == id;
  });
  setHeader(res);
  if (data) {
    ResponseData(res, status[0], data);
  } else {
    ResponseData(res, status[1], {});
  }
});
app.post("/registration", (req, res) => {
  setHeader(res)
  const data = req.body;
  const valid = (
    data.email 
    && data.name 
    && data.document
    && data.date
    && data.phone
    && data.password
    && data.typePerson
    && data.docType
  );
  if(valid) {
    const idx = users.length - 1;
    const id = idx > -1 ? users[idx].id + 1 : 1;
    data.id = id;
    users.push(data);
    const obj = { 
      message: "Dados recebido com sucesso!", 
      id: data.id, 
      data: data 
    };
    ResponseData(res, status[0], obj);
  } else {
    ResponseData(res, status[1], { message: "Dados incompletos", data: data });
  }
});
app.listen(port, () => {
  console.log(`Executando o serviço na porta ${port}`);
  console.log('users list', users);
});
