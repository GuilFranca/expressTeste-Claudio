const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [
  { id: 1, nome: 'Ana', email: 'ana@email.com' },
  { id: 2, nome: 'Bruno', email: 'bruno@email.com' },
];

let nextId = 3;

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === Number(req.params.id));
  if (!usuario) return res.status(404).json({ mensagem: 'Não encontrado' });
  res.json(usuario);
});

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  const novoUsuario = usuarios.push({ id: nextId++, nome, email });
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: 'Não encontrado' });
  usuarios[index] = { ...usuarios[index], ...req.body };
  res.json(usuarios[index]);
});

app.delete('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: 'Não encontrado' });
  usuarios.splice(index, 1);
  res.json({ mensagem: 'Deletado com sucesso' });
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});