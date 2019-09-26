const express = require("express");
const server = express();
server.use(express.json());
const projects = [];
let numberOfRequests = 0;
//checar se existe projetos no array//
function checkProjectExist(req, res, next) {
  if (projects.length === 0) {
    return res.status(400).json({ error: "Nao existe projeto" });
  }
  return next();
}
// numero de requisicoes//
function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

console.log("O servidor está rodando");
// Adicionar usuario no array//
server.post("/projects", (req, res) => {
  const projeto = req.body;
  projects.push(projeto);
  return res.json(projects);
});
//mostrar lista de usuario//
server.get("/projects", checkProjectExist, (req, res) => {
  return res.json(projects);
});
// Mostrar usuario especifico atraves do index//
server.get("/projects/:index", checkProjectExist, (req, res) => {
  const { index } = req.params;
  return res.json(projects[index]);
});
//deletar projeto//
server.delete("/projects/:index", checkProjectExist, (req, res) => {
  const { index } = req.params;
  projects.splice(index, 1);
  return res.json(projects);
});
// editar titulo//
server.put("/projects/:index", checkProjectExist, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.index === index);
  project.title = title;
  return res.json(projects);
});

server.listen(4000);
