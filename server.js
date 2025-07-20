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

// Routes for different sections
const routes = {
    // Java routes
    '/java/core': '/java/core/index.html',
    '/java/oop': '/java/oop/index.html', 
    '/java/jcf': '/java/jcf/index.html',
    '/java/concurrency': '/java/concurrency/index.html',
    '/java/jvm': '/java/jvm/index.html',
    '/java/java8': '/java/java8/index.html',
    '/java/generics': '/java/generics/index.html',
    '/java/gc': '/java/gc/index.html',
    '/java/io': '/java/io/index.html',
    '/java/serialization': '/java/serialization/index.html',
    
    // Spring routes
    '/spring/spring-core': '/spring/spring-core/index.html',
    
    // Web routes
    '/web/html': '/web/html/index.html',
    '/web/css': '/web/css/index.html', 
    '/web/servlets': '/web/servlets/index.html',
    '/web/web': '/web/web/index.html',
    
    // Database routes
    '/database/sql': '/database/sql/index.html',
    '/database/db': '/database/db/index.html',
    '/database/jdbc': '/database/jdbc/index.html',
    
    // Tools routes
    '/tools/test': '/tools/test/index.html',
    '/tools/patterns': '/tools/patterns/index.html',
    '/tools/log': '/tools/log/index.html',
    '/tools/uml': '/tools/uml/index.html',
    '/tools/xml': '/tools/xml/index.html',
    
    // Kotlin routes
    '/kotlin/kotlin-core': '/kotlin/kotlin-core/index.html',
    
    // Framework routes
    '/framework/reactive': '/framework/reactive/index.html',
    '/framework/kafka': '/framework/kafka/index.html'
};

// Function to generate coming soon page
function generateComingSoonPage(route) {
    const routeParts = route.split('/');
    const section = routeParts[1];
    const topic = routeParts[2];
    
    const sectionNames = {
        'java': 'Java',
        'spring': 'Spring Framework',
        'web': 'Web Technologies',
        'database': 'Database',
        'tools': 'Tools & Patterns',
        'kotlin': 'Kotlin',
        'framework': 'Frameworks'
    };
    
    const topicNames = {
        'core': 'Core',
        'oop': 'OOP',
        'jcf': 'Java Collections Framework',
        'concurrency': 'Concurrency',
        'jvm': 'JVM',
        'java8': 'Java 8+',
        'generics': 'Generics',
        'gc': 'Garbage Collection',
        'io': 'Input/Output',
        'serialization': 'Serialization',
        'spring-core': 'Spring Core',
        'html': 'HTML',
        'css': 'CSS',
        'servlets': 'Servlets',
        'web': 'Web Development',
        'sql': 'SQL',
        'db': 'Database Theory',
        'jdbc': 'JDBC',
        'test': 'Testing',
        'patterns': 'Design Patterns',
        'log': 'Logging',
        'uml': 'UML',
        'xml': 'XML',
        'kotlin-core': 'Kotlin Core',
        'reactive': 'Reactive Programming',
        'kafka': 'Apache Kafka'
    };
    
    const sectionName = sectionNames[section] || section;
    const topicName = topicNames[topic] || topic;
    
    return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${topicName} - Java Developer Interview Questions</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #007396;
            --secondary-color: #f89820;
            --accent-color: #ed8b00;
            --text-color: #333;
            --text-light: #666;
            --bg-color: #ffffff;
            --bg-light: #f8f9fa;
            --border-color: #e9ecef;
            --shadow: 0 2px 10px rgba(0,0,0,0.1);
            --border-radius: 8px;
            --transition: all 0.3s ease;
        }
        
        * { box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--bg-color);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .site-header {
            background: white;
            border-bottom: 1px solid var(--border-color);
            box-shadow: var(--shadow);
        }
        
        .site-header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .site-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .site-title i {
            font-size: 1.8rem;
            color: var(--secondary-color);
        }
        
        .content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 0;
        }
        
        .coming-soon {
            background: white;
            padding: 3rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            text-align: center;
            max-width: 600px;
        }
        
        .coming-soon i {
            font-size: 4rem;
            color: var(--secondary-color);
            margin-bottom: 1rem;
        }
        
        .coming-soon h1 {
            color: var(--primary-color);
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .coming-soon h2 {
            color: var(--text-light);
            font-weight: normal;
            margin-bottom: 2rem;
        }
        
        .coming-soon p {
            font-size: 1.1rem;
            color: var(--text-light);
            margin-bottom: 2rem;
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            text-decoration: none;
            border-radius: var(--border-radius);
            transition: var(--transition);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        .site-footer {
            background: var(--primary-color);
            color: white;
            padding: 2rem 0;
            text-align: center;
        }
        
        .site-footer p {
            margin: 0;
            color: rgba(255, 255, 255, 0.8);
        }
        
        @media (max-width: 768px) {
            .wrapper { padding: 0 15px; }
            .coming-soon { padding: 2rem 1rem; }
            .coming-soon h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <header class="site-header">
        <div class="wrapper">
            <div class="site-header-content">
                <a class="site-title" href="/">
                    <i class="fab fa-java"></i>
                    Java Developer Interview Questions
                </a>
            </div>
        </div>
    </header>
    
    <div class="wrapper">
        <div class="content">
            <div class="coming-soon">
                <i class="fas fa-tools"></i>
                <h1>${topicName}</h1>
                <h2>${sectionName}</h2>
                <p>🚧 Контент в разработке</p>
                <p>Мы работаем над созданием подробного материала по этой теме. Скоро здесь появятся вопросы и ответы для собеседования.</p>
                <a href="/" class="btn">
                    <i class="fas fa-home"></i>
                    Вернуться на главную
                </a>
            </div>
        </div>
    </div>
    
    <footer class="site-footer">
        <div class="wrapper">
            <p>&copy; 2024 Java Developer Interview Questions. Сделано с ❤️ для Java разработчиков</p>
        </div>
    </footer>
</body>
</html>`;
}

// Handle routes
Object.keys(routes).forEach(route => {
    app.get(route, (req, res) => {
        const filePath = path.join(__dirname, 'public', routes[route]);
        res.sendFile(filePath, (err) => {
            if (err) {
                // If file doesn't exist, send a coming soon page
                res.status(200).send(generateComingSoonPage(route));
            }
        });
    });
});

// Обслуживание HTML файлов без расширения (fallback)
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