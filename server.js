const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Безопасность и сжатие
app.use(helmet({
  contentSecurityPolicy: false, // Отключаем для Jekyll CSS/JS
}));
app.use(compression());

// Статические файлы из папки public (будет содержать собранный Jekyll сайт)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d', // Кэширование на 1 день
  etag: true
}));

// Обслуживание HTML файлов без расширения
app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1 && req.path !== '/') {
    const htmlPath = path.join(__dirname, 'public', req.path, 'index.html');
    res.sendFile(htmlPath, (err) => {
      if (err) {
        next();
      }
    });
  } else {
    next();
  }
});

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(404).send(`
        <h1>🏗️ Сайт собирается...</h1>
        <p>Jekyll сайт еще не собран. Пожалуйста, подождите.</p>
        <p>Если вы видите это сообщение долго, проверьте логи деплоя.</p>
      `);
    }
  });
});

// 404 страница
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - Страница не найдена</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          text-align: center; 
          padding: 50px; 
          background: linear-gradient(135deg, #007396, #ed8b00);
          color: white;
          margin: 0;
        }
        .container {
          background: rgba(255,255,255,0.1);
          padding: 2rem;
          border-radius: 10px;
          display: inline-block;
        }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; margin-bottom: 2rem; }
        a { 
          color: #f89820; 
          text-decoration: none; 
          font-weight: bold;
          background: white;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
        }
        a:hover { background: #f0f0f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404</h1>
        <p>Страница не найдена</p>
        <a href="/">🏠 На главную</a>
      </div>
    </body>
    </html>
  `);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📂 Serving static files from: ${path.join(__dirname, 'public')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
}); 