---
layout: default
title: "Главная"
---

<div class="home-page">
    <section class="hero">
        <div class="hero-content">
            <h1 class="hero-title">
                <i class="fab fa-java"></i>
                Вопросы для собеседования на Java Developer
            </h1>
            <p class="hero-description">
                Полная коллекция вопросов и ответов для успешной подготовки к техническому собеседованию
            </p>
            <div class="hero-stats">
                <div class="stat">
                    <span class="stat-number">500+</span>
                    <span class="stat-label">Вопросов</span>
                </div>
                <div class="stat">
                    <span class="stat-number">15+</span>
                    <span class="stat-label">Тем</span>
                </div>
                <div class="stat">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Бесплатно</span>
                </div>
            </div>
            <div class="hero-actions">
                <a href="#topics" class="btn btn-primary">
                    <i class="fas fa-rocket"></i>
                    Начать подготовку
                </a>
                <a href="{{ site.social.github }}" class="btn btn-secondary" target="_blank">
                    <i class="fab fa-github"></i>
                    GitHub
                </a>
            </div>
        </div>
    </section>

    <section id="topics" class="topics-section">
        <div class="section-header">
            <h2>📚 Темы для изучения</h2>
            <p>Выберите интересующую вас тему для подготовки к собеседованию</p>
        </div>

        <div class="topics-grid">
            <div class="topic-card featured">
                <div class="topic-icon">
                    <i class="fab fa-java"></i>
                </div>
                <h3>Java Core & Fundamentals</h3>
                <p>Основы языка Java, ООП, JVM, коллекции, многопоточность</p>
                <div class="topic-links">
                    <a href="{{ '/java/core/' | relative_url }}">Java Core</a>
                    <a href="{{ '/java/oop/' | relative_url }}">ООП</a>
                    <a href="{{ '/java/jcf/' | relative_url }}">Collections</a>
                    <a href="{{ '/java/concurrency/' | relative_url }}">Многопоточность</a>
                </div>
                <div class="topic-progress">
                    <span class="progress-label">10 тем</span>
                </div>
            </div>

            <div class="topic-card">
                <div class="topic-icon">
                    <i class="fas fa-leaf"></i>
                </div>
                <h3>Spring Framework</h3>
                <p>IoC, DI, Spring Boot, аннотации, конфигурация</p>
                <div class="topic-links">
                    <a href="{{ '/spring/spring-core/' | relative_url }}">Spring Core</a>
                </div>
                <div class="topic-progress">
                    <span class="progress-label">1 тема</span>
                </div>
            </div>

            <div class="topic-card">
                <div class="topic-icon">
                    <i class="fas fa-globe"></i>
                </div>
                <h3>Web Development</h3>
                <p>HTML, CSS, HTTP, Servlets, JSP</p>
                <div class="topic-links">
                    <a href="{{ '/web/html/' | relative_url }}">HTML</a>
                    <a href="{{ '/web/css/' | relative_url }}">CSS</a>
                    <a href="{{ '/web/servlets/' | relative_url }}">Servlets</a>
                </div>
                <div class="topic-progress">
                    <span class="progress-label">4 темы</span>
                </div>
            </div>

            <div class="topic-card">
                <div class="topic-icon">
                    <i class="fas fa-database"></i>
                </div>
                <h3>Database & Persistence</h3>
                <p>SQL, JDBC, реляционные БД, транзакции</p>
                <div class="topic-links">
                    <a href="{{ '/database/sql/' | relative_url }}">SQL</a>
                    <a href="{{ '/database/db/' | relative_url }}">Базы данных</a>
                    <a href="{{ '/database/jdbc/' | relative_url }}">JDBC</a>
                </div>
                <div class="topic-progress">
                    <span class="progress-label">3 темы</span>
                </div>
            </div>

            <div class="topic-card">
                <div class="topic-icon">
                    <i class="fas fa-cogs"></i>
                </div>
                <h3>Tools & Best Practices</h3>
                <p>Тестирование, паттерны, логирование, UML</p>
                <div class="topic-links">
                    <a href="{{ '/tools/test/' | relative_url }}">Тестирование</a>
                    <a href="{{ '/tools/patterns/' | relative_url }}">Паттерны</a>
                    <a href="{{ '/tools/log/' | relative_url }}">Логирование</a>
                </div>
                <div class="topic-progress">
                    <span class="progress-label">5 тем</span>
                </div>
            </div>

            <div class="topic-card">
                <div class="topic-icon">
                    <i class="fas fa-code"></i>
                </div>
                <h3>Modern Languages</h3>
                <p>Kotlin, современные возможности JVM языков</p>
                <div class="topic-links">
                    <a href="{{ '/kotlin/kotlin-core/' | relative_url }}">Kotlin Core</a>
                </div>
                <div class="topic-progress">
                    <span class="progress-label">1 тема</span>
                </div>
            </div>
        </div>
    </section>

    <section class="features-section">
        <div class="section-header">
            <h2>🚀 Почему выбирают нас?</h2>
        </div>

        <div class="features-grid">
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <h3>Полные ответы</h3>
                <p>Детальные объяснения с примерами кода для лучшего понимания</p>
            </div>

            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>Быстрый поиск</h3>
                <p>Найдите нужную информацию за секунды с помощью умного поиска</p>
            </div>

            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h3>Адаптивный дизайн</h3>
                <p>Удобно изучать материалы на любом устройстве - ПК, планшете или телефоне</p>
            </div>

            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-sync-alt"></i>
                </div>
                <h3>Регулярные обновления</h3>
                <p>Материалы постоянно дополняются новыми вопросами и темами</p>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="cta-content">
            <h2>Готовы начать подготовку?</h2>
            <p>Выберите тему и начните изучение прямо сейчас!</p>
            <a href="#topics" class="btn btn-primary btn-lg">
                <i class="fas fa-graduation-cap"></i>
                Начать обучение
            </a>
        </div>
    </section>
</div> 