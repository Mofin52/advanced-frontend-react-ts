const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// задержка между ответом и запросом, имитация лага сети
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

// проверка заголовков запроса, если заголовок есть, пользователь авторизован
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }
  next();
});

// Подключение миддлваров
server.use(jsonServer.defaults());
server.use(router);

// Роут для логина пользователя
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json', 'UTF-8')));
  const { users } = db;

  const userFromBd = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (userFromBd) {
    return res.json(userFromBd);
  }

  return res.status(403).json({ message: 'AUTH ERROR' });
});

server.listen(8000, () => {
  console.log('server is running on port 8000');
});
