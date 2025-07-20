document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Кнопка "Наверх"
    const backToTopBtn = document.querySelector('.btn-back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Поиск
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');

    if (searchInput && searchBtn) {
        // Данные для поиска (можно расширить)
        const searchData = [
            {
                title: "ООП",
                url: "/java/oop/",
                description: "Объектно-ориентированное программирование, принципы ООП",
                category: "Java Core"
            },
            {
                title: "JVM",
                url: "/java/jvm/",
                description: "Java Virtual Machine, устройство JVM",
                category: "Java Core"
            },
            {
                title: "Java Core",
                url: "/java/core/",
                description: "Основы языка Java, синтаксис, типы данных",
                category: "Java Core"
            },
            {
                title: "Collections",
                url: "/java/jcf/",
                description: "Java Collections Framework, List, Set, Map",
                category: "Java Core"
            },
            {
                title: "Многопоточность",
                url: "/java/concurrency/",
                description: "Concurrency, Thread, synchronized, volatile",
                category: "Java Core"
            },
            {
                title: "Spring Core",
                url: "/spring/spring-core/",
                description: "IoC, DI, Spring Framework основы",
                category: "Spring"
            },
            {
                title: "SQL",
                url: "/database/sql/",
                description: "Structured Query Language, запросы к базе данных",
                category: "Database"
            },
            {
                title: "HTML",
                url: "/web/html/",
                description: "HyperText Markup Language, веб-разметка",
                category: "Web"
            },
            {
                title: "Kotlin Core",
                url: "/kotlin/kotlin-core/",
                description: "Основы языка Kotlin, null safety, data classes",
                category: "Kotlin"
            }
        ];

        function performSearch(query) {
            if (!query || query.length < 2) {
                hideSearchResults();
                return;
            }

            const results = searchData.filter(item => {
                const searchText = (item.title + ' ' + item.description + ' ' + item.category).toLowerCase();
                return searchText.includes(query.toLowerCase());
            });

            displaySearchResults(results, query);
        }

        function displaySearchResults(results, query) {
            if (results.length === 0) {
                searchResultsList.innerHTML = '<li class="no-results">Ничего не найдено</li>';
            } else {
                searchResultsList.innerHTML = results.map(item => `
                    <li class="search-result-item">
                        <a href="${item.url}" class="search-result-link">
                            <div class="search-result-title">${highlightQuery(item.title, query)}</div>
                            <div class="search-result-description">${highlightQuery(item.description, query)}</div>
                            <div class="search-result-category">${item.category}</div>
                        </a>
                    </li>
                `).join('');
            }
            showSearchResults();
        }

        function highlightQuery(text, query) {
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }

        function showSearchResults() {
            searchResults.style.display = 'block';
        }

        function hideSearchResults() {
            searchResults.style.display = 'none';
        }

        // События поиска
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            performSearch(query);
        });

        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            performSearch(query);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                performSearch(query);
            }
        });

        // Скрыть результаты поиска при клике вне области поиска
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-box') && !e.target.closest('#search-results')) {
                hideSearchResults();
            }
        });
    }

    // Подсветка активного пункта в содержании
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (tocLinks.length > 0 && headings.length > 0) {
        function updateActiveHeading() {
            let current = '';
            
            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 100) {
                    current = '#' + heading.id;
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveHeading);
        updateActiveHeading();
    }

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.topic-card, .feature, .section-header').forEach(el => {
        observer.observe(el);
    });

    // Мобильное меню
    const navTrigger = document.getElementById('nav-trigger');
    const navMenu = document.querySelector('.site-nav .trigger');

    if (navTrigger && navMenu) {
        navTrigger.addEventListener('change', function() {
            if (this.checked) {
                navMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрыть меню при клике на ссылку
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navTrigger.checked = false;
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Копирование ссылок на заголовки
    headings.forEach(heading => {
        if (heading.id) {
            heading.addEventListener('click', function() {
                const url = window.location.origin + window.location.pathname + '#' + this.id;
                navigator.clipboard.writeText(url).then(() => {
                    // Показать уведомление о копировании
                    showNotification('Ссылка скопирована в буфер обмена');
                });
            });
            
            // Добавить иконку ссылки
            heading.style.cursor = 'pointer';
            heading.title = 'Нажмите, чтобы скопировать ссылку';
        }
    });

    // Функция показа уведомлений
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Прогресс чтения страницы
    function updateReadingProgress() {
        const article = document.querySelector('.content-wrapper');
        if (!article) return;

        const articleHeight = article.offsetHeight;
        const articleTop = article.offsetTop;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const progress = Math.min(100, Math.max(0, 
            ((scrollTop + windowHeight - articleTop) / articleHeight) * 100
        ));

        let progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--secondary-color);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }

        progressBar.style.width = progress + '%';
    }

    if (document.querySelector('.content-wrapper')) {
        window.addEventListener('scroll', updateReadingProgress);
        updateReadingProgress();
    }
});

// Дополнительные стили для анимаций
const animationStyles = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .search-result-item {
        border-bottom: 1px solid var(--border-color);
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    .search-result-link {
        display: block;
        padding: 15px;
        text-decoration: none;
        color: inherit;
        transition: background-color 0.2s ease;
    }

    .search-result-link:hover {
        background: var(--bg-light);
    }

    .search-result-title {
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 5px;
    }

    .search-result-description {
        color: var(--text-light);
        font-size: 0.9rem;
        margin-bottom: 5px;
    }

    .search-result-category {
        font-size: 0.8rem;
        color: var(--secondary-color);
        font-weight: 500;
    }

    .no-results {
        padding: 20px;
        text-align: center;
        color: var(--text-light);
    }

    .table-of-contents a.active {
        color: var(--primary-color);
        border-left-color: var(--primary-color);
        font-weight: bold;
    }

    mark {
        background: var(--secondary-color);
        color: white;
        padding: 1px 3px;
        border-radius: 2px;
    }
`;

// Добавляем стили в head
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet); 