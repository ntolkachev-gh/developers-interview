[Вопросы для собеседования](../../README.md)

# Spring Core
+ [Что такое Spring Framework?](#Что-такое-spring-framework)
+ [Какие основные модули Spring Framework вы знаете?](#Какие-основные-модули-spring-framework-вы-знаете)
+ [Что такое IoC (Inversion of Control)?](#Что-такое-ioc-inversion-of-control)
+ [Что такое DI (Dependency Injection)?](#Что-такое-di-dependency-injection)
+ [Какие типы внедрения зависимостей поддерживает Spring?](#Какие-типы-внедрения-зависимостей-поддерживает-spring)
+ [Что такое Spring Bean?](#Что-такое-spring-bean)
+ [Какие области видимости (scope) бинов существуют в Spring?](#Какие-области-видимости-scope-бинов-существуют-в-spring)
+ [Что такое Spring ApplicationContext?](#Что-такое-spring-applicationcontext)
+ [В чем разница между BeanFactory и ApplicationContext?](#В-чем-разница-между-beanfactory-и-applicationcontext)
+ [Что такое Spring Container?](#Что-такое-spring-container)
+ [Какие аннотации используются для создания бинов?](#Какие-аннотации-используются-для-создания-бинов)
+ [Что делает аннотация @Component?](#Что-делает-аннотация-component)
+ [В чем разница между @Component, @Service, @Repository и @Controller?](#В-чем-разница-между-component-service-repository-и-controller)
+ [Что такое @Autowired и как он работает?](#Что-такое-autowired-и-как-он-работает)
+ [Что такое @Qualifier и когда его использовать?](#Что-такое-qualifier-и-когда-его-использовать)
+ [Что такое @Primary и когда его использовать?](#Что-такое-primary-и-когда-его-использовать)
+ [Что такое @Value и как его использовать?](#Что-такое-value-и-как-его-использовать)
+ [Что такое @Configuration и @Bean?](#Что-такое-configuration-и-bean)
+ [Что такое @Profile и как его использовать?](#Что-такое-profile-и-как-его-использовать)
+ [Что такое @Conditional и как его использовать?](#Что-такое-conditional-и-как-его-использовать)
+ [Что такое @Lazy и когда его использовать?](#Что-такое-lazy-и-когда-его-использовать)
+ [Что такое @Scope и как его использовать?](#Что-такое-scope-и-как-его-использовать)
+ [Что такое @PostConstruct и @PreDestroy?](#Что-такое-postconstruct-и-predestroy)
+ [Что такое @DependsOn и когда его использовать?](#Что-такое-dependson-и-когда-его-использовать)
+ [Что такое @Import и как его использовать?](#Что-такое-import-и-как-его-использовать)
+ [Что такое @ComponentScan и как его настроить?](#Что-такое-componentscan-и-как-его-настроить)
+ [Что такое @PropertySource и как его использовать?](#Что-такое-propertysource-и-как-его-использовать)
+ [Что такое @EnableConfigurationProperties?](#Что-такое-enableconfigurationproperties)
+ [Что такое @ConfigurationProperties?](#Что-такое-configurationproperties)
+ [Что такое @EnableAsync и @Async?](#Что-такое-enableasync-и-async)
+ [Что такое @EnableScheduling и @Scheduled?](#Что-такое-enablescheduling-и-scheduled)
+ [Что такое @EnableCaching и @Cacheable?](#Что-такое-enablecaching-и-cacheable)
+ [Что такое @EnableTransactionManagement и @Transactional?](#Что-такое-enabletransactionmanagement-и-transactional)
+ [Что такое @EnableAspectJAutoProxy и @Aspect?](#Что-такое-enableaspectjautoproxy-и-aspect)
+ [Что такое @EnableWebMvc и @Controller?](#Что-такое-enablewebmvc-и-controller)
+ [Что такое @EnableWebFlux и @RestController?](#Что-такое-enablewebflux-и-restcontroller)
+ [Что такое @EnableJpaRepositories и @Repository?](#Что-такое-enablejparepositories-и-repository)
+ [Что такое @EnableJpaAuditing и @EntityListeners?](#Что-такое-enablejpaauditing-и-entitylisteners)
+ [Что такое @EnableJpaRepositories и @RepositoryRestResource?](#Что-такое-enablejparepositories-и-repositoryrestresource)

---

## Что такое Spring Framework?
__Spring Framework__ — это мощный фреймворк для разработки корпоративных приложений на языке Java. Он предоставляет комплексную инфраструктуру для создания, настройки и управления объектами приложения (бинами), а также реализует принципы инверсии управления (IoC) и внедрения зависимостей (DI).

Основные преимущества Spring:
- Упрощение разработки через IoC и DI
- Модульная архитектура
- Поддержка различных технологий (JDBC, ORM, JMS и др.)
- Минимальная инвазивность
- Тестируемость

[к оглавлению](#spring-core)

## Какие основные модули Spring Framework вы знаете?
Spring состоит из нескольких ключевых модулей:
- **Spring Core** — базовые компоненты, контейнер IoC, DI.
- **Spring Context** — расширяет возможности Core, предоставляет ApplicationContext.
- **Spring AOP** — поддержка аспектно-ориентированного программирования.
- **Spring Data Access/Integration** — работа с JDBC, ORM, транзакциями, JMS, JCA.
- **Spring Web** — создание веб-приложений, поддержка MVC, WebFlux.
- **Spring Security** — аутентификация и авторизация.
- **Spring Test** — инструменты для тестирования.

```xml
<!-- Пример зависимостей в pom.xml -->
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.21</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.21</version>
    </dependency>
</dependencies>
```

[к оглавлению](#spring-core)

## Что такое IoC (Inversion of Control)?
__Inversion of Control__ (IoC, инверсия управления) — это принцип проектирования, при котором управление созданием и жизненным циклом объектов передается внешней сущности (контейнеру), а не реализуется вручную в коде приложения. В Spring роль такого контейнера выполняет ApplicationContext.

```java
// Без IoC - создание зависимостей вручную
public class OrderService {
    private PaymentService paymentService;
    
    public OrderService() {
        this.paymentService = new PaymentService(); // Жесткая связь
    }
}

// С IoC - зависимости внедряются контейнером
@Service
public class OrderService {
    private final PaymentService paymentService;
    
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService; // Внедрение через конструктор
    }
}
```

[к оглавлению](#spring-core)

## Что такое DI (Dependency Injection)?
__Dependency Injection__ (DI, внедрение зависимостей) — это способ реализации IoC, при котором зависимости (другие объекты) передаются в класс извне, обычно через конструктор, сеттер или поле, а не создаются внутри класса самостоятельно.

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    
    // Constructor injection (рекомендуется)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

@Service
public class ProductService {
    private ProductRepository productRepository;
    
    // Setter injection
    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
}

@Service
public class CategoryService {
    // Field injection (не рекомендуется)
    @Autowired
    private CategoryRepository categoryRepository;
}
```

[к оглавлению](#spring-core)

## Какие типы внедрения зависимостей поддерживает Spring?
Spring поддерживает три основных типа внедрения зависимостей:
- **Через конструктор** (constructor injection) - рекомендуется
- **Через сеттер** (setter injection)
- **Через поля** (field injection, с помощью аннотаций)

```java
@Service
public class NotificationService {
    private final EmailService emailService;
    private SmsService smsService;
    @Autowired
    private PushService pushService;
    
    // 1. Constructor injection - обязательные зависимости
    public NotificationService(EmailService emailService) {
        this.emailService = emailService;
    }
    
    // 2. Setter injection - опциональные зависимости
    @Autowired
    public void setSmsService(SmsService smsService) {
        this.smsService = smsService;
    }
    
    // 3. Field injection - не рекомендуется
    // pushService уже помечен @Autowired
}
```

[к оглавлению](#spring-core)

## Что такое Spring Bean?
__Spring Bean__ — это объект, который управляется контейнером Spring. Бины создаются, настраиваются и связываются между собой контейнером на основании конфигурации (XML, Java-код, аннотации).

```java
// Определение бина через аннотацию
@Component
public class DatabaseService {
    public void connect() {
        System.out.println("Подключение к базе данных");
    }
}

// Определение бина через Java-конфигурацию
@Configuration
public class AppConfig {
    
    @Bean
    public DatabaseService databaseService() {
        return new DatabaseService();
    }
    
    @Bean
    public UserService userService() {
        return new UserService(databaseService());
    }
}

// Использование бина
@Component
public class Application {
    @Autowired
    private DatabaseService databaseService;
    
    public void run() {
        databaseService.connect();
    }
}
```

[к оглавлению](#spring-core)

## Какие области видимости (scope) бинов существуют в Spring?
Основные области видимости (scope) бинов:
- **singleton** — один экземпляр на контейнер Spring (по умолчанию)
- **prototype** — новый экземпляр при каждом запросе
- **request** — один экземпляр на HTTP-запрос (только для web)
- **session** — один экземпляр на HTTP-сессию (только для web)
- **application** — один экземпляр на ServletContext (только для web)
- **websocket** — один экземпляр на WebSocket

```java
// Singleton scope (по умолчанию)
@Component
@Scope("singleton") // или @Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class SingletonService {
    private int counter = 0;
    
    public void increment() {
        counter++;
    }
    
    public int getCounter() {
        return counter;
    }
}

// Prototype scope
@Component
@Scope("prototype") // или @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class PrototypeService {
    private final String id = UUID.randomUUID().toString();
    
    public String getId() {
        return id;
    }
}

// Request scope (только для web-приложений)
@Component
@Scope("request")
public class RequestScopedService {
    private String requestId;
    
    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }
}

// Пример использования
@RestController
public class ScopeController {
    @Autowired
    private SingletonService singletonService;
    
    @Autowired
    private PrototypeService prototypeService;
    
    @GetMapping("/test-scopes")
    public Map<String, Object> testScopes() {
        Map<String, Object> result = new HashMap<>();
        result.put("singleton", singletonService.getCounter());
        result.put("prototype", prototypeService.getId());
        return result;
    }
}
```

[к оглавлению](#spring-core)

## Что такое Spring ApplicationContext?
__ApplicationContext__ — это основной интерфейс контейнера Spring, который отвечает за создание, конфигурирование и управление жизненным циклом бинов, а также предоставляет доступ к ресурсам, событиям и другим возможностям инфраструктуры.

```java
// Создание ApplicationContext
@Configuration
@ComponentScan("com.example")
public class AppConfig {
}

public class Application {
    public static void main(String[] args) {
        // Создание контекста
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        // Получение бина по типу
        UserService userService = context.getBean(UserService.class);
        
        // Получение бина по имени
        DatabaseService dbService = (DatabaseService) context.getBean("databaseService");
        
        // Получение бина по имени и типу
        EmailService emailService = context.getBean("emailService", EmailService.class);
        
        // Проверка существования бина
        if (context.containsBean("userService")) {
            System.out.println("UserService найден");
        }
        
        // Получение всех бинов определенного типа
        Map<String, UserService> userServices = context.getBeansOfType(UserService.class);
        
        // Закрытие контекста
        ((ConfigurableApplicationContext) context).close();
    }
}

// Программный доступ к ApplicationContext
@Component
public class MyService implements ApplicationContextAware {
    private ApplicationContext applicationContext;
    
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }
    
    public void doSomething() {
        // Можем получить любой бин из контекста
        SomeService service = applicationContext.getBean(SomeService.class);
        service.performAction();
    }
}
```

[к оглавлению](#spring-core)

## В чем разница между BeanFactory и ApplicationContext?
- **BeanFactory** — базовый контейнер, обеспечивает только базовое управление бинами.
- **ApplicationContext** — расширяет BeanFactory, добавляет поддержку интернационализации, событий, автосканирования, AOP и других возможностей.

```java
// BeanFactory - базовый контейнер
public class BeanFactoryExample {
    public static void main(String[] args) {
        // Создание BeanFactory
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        
        // Регистрация бина вручную
        factory.registerBeanDefinition("userService", 
            BeanDefinitionBuilder.rootBeanDefinition(UserService.class).getBeanDefinition());
        
        // Получение бина (создается только при первом обращении - lazy)
        UserService userService = factory.getBean("userService", UserService.class);
    }
}

// ApplicationContext - расширенный контейнер
public class ApplicationContextExample {
    public static void main(String[] args) {
        // Создание ApplicationContext
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        // Все singleton бины создаются сразу при старте контекста
        
        // Поддержка интернационализации
        String message = context.getMessage("welcome.message", null, Locale.getDefault());
        
        // Поддержка событий
        context.publishEvent(new CustomEvent("Hello World"));
        
        // Доступ к ресурсам
        Resource resource = context.getResource("classpath:config.properties");
    }
}

// Пример обработчика событий
@Component
public class CustomEventListener {
    @EventListener
    public void handleCustomEvent(CustomEvent event) {
        System.out.println("Получено событие: " + event.getMessage());
    }
}

// Пользовательское событие
public class CustomEvent extends ApplicationEvent {
    private String message;
    
    public CustomEvent(Object source, String message) {
        super(source);
        this.message = message;
    }
    
    public String getMessage() {
        return message;
    }
}
```

[к оглавлению](#spring-core)

## Что такое Spring Container?
__Spring Container__ — это инфраструктура, которая управляет жизненным циклом и конфигурацией объектов (бинов) приложения. Основные реализации: BeanFactory и ApplicationContext.

```java
// Конфигурация контейнера
@Configuration
@ComponentScan(basePackages = "com.example")
@PropertySource("classpath:application.properties")
public class ContainerConfig {
    
    @Bean
    @Primary
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:h2:mem:testdb");
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }
}

// Жизненный цикл бина
@Component
public class LifecycleBean implements InitializingBean, DisposableBean {
    
    @PostConstruct
    public void init() {
        System.out.println("@PostConstruct: Бин инициализирован");
    }
    
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean: Свойства установлены");
    }
    
    @PreDestroy
    public void cleanup() {
        System.out.println("@PreDestroy: Подготовка к уничтожению");
    }
    
    @Override
    public void destroy() throws Exception {
        System.out.println("DisposableBean: Бин уничтожен");
    }
}

// Запуск контейнера
public class ContainerExample {
    public static void main(String[] args) {
        // Создание и запуск контейнера
        ConfigurableApplicationContext context = 
            new AnnotationConfigApplicationContext(ContainerConfig.class);
        
        // Работа с бинами
        LifecycleBean bean = context.getBean(LifecycleBean.class);
        
        // Остановка контейнера (вызовет методы уничтожения)
        context.close();
    }
}
```

[к оглавлению](#spring-core)

## Какие аннотации используются для создания бинов?
Основные аннотации:
- `@Component`
- `@Service`
- `@Repository`
- `@Controller`
- `@Configuration`
- `@Bean` (для методов)

```java
// @Component - общий компонент
@Component
public class GenericComponent {
    public void doSomething() {
        System.out.println("Выполнение общей логики");
    }
}

// @Service - сервисный слой
@Service
public class UserService {
    public User findById(Long id) {
        // Бизнес-логика
        return new User(id, "John Doe");
    }
}

// @Repository - слой доступа к данным
@Repository
public class UserRepository {
    public User save(User user) {
        // Логика сохранения
        return user;
    }
}

// @Controller - веб-контроллер
@Controller
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/users/{id}")
    @ResponseBody
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}

// @Configuration - класс конфигурации
@Configuration
public class DatabaseConfig {
    
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

// Пример с кастомным именем бина
@Component("customUserService")
public class CustomUserService {
    // ...
}

// Использование
@Service
public class OrderService {
    @Autowired
    @Qualifier("customUserService")
    private UserService userService;
}
```

[к оглавлению](#spring-core)

## Что делает аннотация @Component?
`@Component` — это универсальная аннотация для определения класса как Spring Bean. Класс с этой аннотацией будет автоматически обнаружен и зарегистрирован в контейнере при сканировании компонентов.

```java
// Простой компонент
@Component
public class EmailService {
    public void sendEmail(String to, String subject, String body) {
        System.out.println("Отправка email на " + to);
    }
}

// Компонент с кастомным именем
@Component("emailSender")
public class EmailSenderService {
    // ...
}

// Конфигурация сканирования
@Configuration
@ComponentScan(basePackages = "com.example.services")
public class AppConfig {
    // Spring автоматически найдет все классы с @Component
}

// Использование компонента
@Component
public class NotificationService {
    private final EmailService emailService;
    
    // Конструктор для внедрения зависимости
    public NotificationService(EmailService emailService) {
        this.emailService = emailService;
    }
    
    public void sendNotification(String message) {
        emailService.sendEmail("user@example.com", "Уведомление", message);
    }
}

// Альтернативный способ - получение из контекста
@Component
public class Application {
    @Autowired
    private ApplicationContext context;
    
    public void run() {
        EmailService emailService = context.getBean(EmailService.class);
        emailService.sendEmail("test@example.com", "Тест", "Тестовое сообщение");
    }
}
```

[к оглавлению](#spring-core)

## В чем разница между @Component, @Service, @Repository и @Controller?
Все эти аннотации являются специализированными вариантами `@Component`:
- `@Component` — общий компонент.
- `@Service` — сервисный слой (логика приложения).
- `@Repository` — слой доступа к данным (DAO), добавляет обработку исключений Spring Data.
- `@Controller` — слой контроллеров MVC (web).

```java
// @Component - общий компонент
@Component
public class FileProcessor {
    public void processFile(String filename) {
        // Общая логика обработки файлов
    }
}

// @Service - бизнес-логика
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Transactional
    public Order createOrder(OrderRequest request) {
        // Бизнес-логика создания заказа
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setAmount(request.getAmount());
        
        return orderRepository.save(order);
    }
}

// @Repository - доступ к данным
@Repository
public class OrderRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public Order save(Order order) {
        String sql = "INSERT INTO orders (customer_id, amount) VALUES (?, ?)";
        jdbcTemplate.update(sql, order.getCustomerId(), order.getAmount());
        return order;
    }
    
    public List<Order> findByCustomerId(Long customerId) {
        String sql = "SELECT * FROM orders WHERE customer_id = ?";
        return jdbcTemplate.query(sql, new Object[]{customerId}, new OrderRowMapper());
    }
}

// @Controller - веб-контроллер
@Controller
public class OrderController {
    @Autowired
    private OrderService orderService;
    
    @GetMapping("/orders")
    public String showOrders(Model model) {
        List<Order> orders = orderService.getAllOrders();
        model.addAttribute("orders", orders);
        return "orders"; // возвращает имя представления
    }
    
    @PostMapping("/orders")
    @ResponseBody
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.ok(order);
    }
}

// @RestController - REST API контроллер (комбинация @Controller + @ResponseBody)
@RestController
@RequestMapping("/api/orders")
public class OrderRestController {
    @Autowired
    private OrderService orderService;
    
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    
    @PostMapping
    public Order createOrder(@RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }
}

// Особенность @Repository - автоматическое преобразование исключений
@Repository
public class UserRepository {
    @Autowired
    private EntityManager entityManager;
    
    public User findById(Long id) {
        try {
            return entityManager.find(User.class, id);
        } catch (PersistenceException e) {
            // Spring автоматически преобразует в DataAccessException
            throw new DataRetrievalFailureException("Не удалось найти пользователя", e);
        }
    }
}
```

[к оглавлению](#spring-core)

## Что такое @Autowired и как он работает?
`@Autowired` — аннотация для автоматического внедрения зависимостей. Spring автоматически найдет и внедрит нужный бин по типу (или по имени, если используется `@Qualifier`).

```java
// Внедрение через конструктор (рекомендуется)
@Service
public class OrderService {
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    
    // @Autowired можно опустить для единственного конструктора
    public OrderService(PaymentService paymentService, InventoryService inventoryService) {
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
    }
}

// Внедрение через поля
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
    
    public void registerUser(User user) {
        userRepository.save(user);
        emailService.sendWelcomeEmail(user.getEmail());
    }
}

// Внедрение через сеттеры
@Service
public class NotificationService {
    private SmsService smsService;
    private PushService pushService;
    
    @Autowired
    public void setSmsService(SmsService smsService) {
        this.smsService = smsService;
    }
    
    @Autowired
    public void setPushService(PushService pushService) {
        this.pushService = pushService;
    }
}

// Опциональное внедрение
@Service
public class ReportService {
    private final DatabaseService databaseService;
    private CacheService cacheService; // опциональная зависимость
    
    public ReportService(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }
    
    @Autowired(required = false)
    public void setCacheService(CacheService cacheService) {
        this.cacheService = cacheService;
    }
    
    public Report generateReport(String type) {
        Data data = databaseService.getData(type);
        
        if (cacheService != null) {
            cacheService.cache(type, data);
        }
        
        return new Report(data);
    }
}

// Внедрение коллекций
@Service
public class ProcessorService {
    private final List<DataProcessor> processors;
    
    @Autowired
    public ProcessorService(List<DataProcessor> processors) {
        this.processors = processors;
    }
    
    public void processData(String data) {
        for (DataProcessor processor : processors) {
            processor.process(data);
        }
    }
}

// Различные реализации DataProcessor
@Component
public class XmlDataProcessor implements DataProcessor {
    @Override
    public void process(String data) {
        System.out.println("Обработка XML данных");
    }
}

@Component
public class JsonDataProcessor implements DataProcessor {
    @Override
    public void process(String data) {
        System.out.println("Обработка JSON данных");
    }
}

// Внедрение Map
@Service
public class FormatterService {
    private final Map<String, DataFormatter> formatters;
    
    @Autowired
    public FormatterService(Map<String, DataFormatter> formatters) {
        this.formatters = formatters;
    }
    
    public String format(String type, Object data) {
        DataFormatter formatter = formatters.get(type);
        return formatter != null ? formatter.format(data) : data.toString();
    }
}
```

[к оглавлению](#spring-core)

## Что такое @Qualifier и когда его использовать?
`@Qualifier` используется вместе с `@Autowired` для уточнения, какой именно бин внедрять, если их несколько одного типа.

```java
// Интерфейс с несколькими реализациями
public interface PaymentService {
    void processPayment(BigDecimal amount);
}

// Реализация для кредитных карт
@Service
@Qualifier("creditCard")
public class CreditCardPaymentService implements PaymentService {
    @Override
    public void processPayment(BigDecimal amount) {
        System.out.println("Обработка платежа по кредитной карте: " + amount);
    }
}

// Реализация для PayPal
@Service
@Qualifier("paypal")
public class PayPalPaymentService implements PaymentService {
    @Override
    public void processPayment(BigDecimal amount) {
        System.out.println("Обработка платежа через PayPal: " + amount);
    }
}

// Реализация для банковского перевода
@Service
@Qualifier("bankTransfer")
public class BankTransferPaymentService implements PaymentService {
    @Override
    public void processPayment(BigDecimal amount) {
        System.out.println("Обработка банковского перевода: " + amount);
    }
}

// Использование конкретной реализации
@Service
public class OrderService {
    private final PaymentService creditCardService;
    private final PaymentService paypalService;
    
    public OrderService(
            @Qualifier("creditCard") PaymentService creditCardService,
            @Qualifier("paypal") PaymentService paypalService) {
        this.creditCardService = creditCardService;
        this.paypalService = paypalService;
    }
    
    public void processOrder(Order order, String paymentMethod) {
        switch (paymentMethod) {
            case "credit_card":
                creditCardService.processPayment(order.getAmount());
                break;
            case "paypal":
                paypalService.processPayment(order.getAmount());
                break;
            default:
                throw new IllegalArgumentException("Неподдерживаемый метод платежа");
        }
    }
}

// Использование с полями
@Service
public class PaymentController {
    @Autowired
    @Qualifier("creditCard")
    private PaymentService defaultPaymentService;
    
    @Autowired
    @Qualifier("paypal")
    private PaymentService alternativePaymentService;
}

// Создание кастомного квалификатора
@Qualifier
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.TYPE})
public @interface PaymentMethod {
    String value();
}

// Использование кастомного квалификатора
@Service
@PaymentMethod("crypto")
public class CryptoPaymentService implements PaymentService {
    @Override
    public void processPayment(BigDecimal amount) {
        System.out.println("Обработка криптоплатежа: " + amount);
    }
}

@Service
public class ModernPaymentService {
    @Autowired
    @PaymentMethod("crypto")
    private PaymentService cryptoPaymentService;
}

// Использование с коллекциями
@Service
public class PaymentProcessor {
    private final Map<String, PaymentService> paymentServices;
    
    @Autowired
    public PaymentProcessor(Map<String, PaymentService> paymentServices) {
        this.paymentServices = paymentServices;
    }
    
    public void processPayment(String method, BigDecimal amount) {
        PaymentService service = paymentServices.get(method);
        if (service != null) {
            service.processPayment(amount);
        }
    }
}
```

[к оглавлению](#spring-core)

## Что такое @Primary и когда его использовать?
`@Primary` помечает бин как основной, если есть несколько кандидатов для внедрения по типу.

```java
// Интерфейс с несколькими реализациями
public interface NotificationService {
    void sendNotification(String message);
}

// Основная реализация
@Service
@Primary
public class EmailNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Отправка email: " + message);
    }
}

// Альтернативная реализация
@Service
public class SmsNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Отправка SMS: " + message);
    }
}

// Использование - будет внедрена EmailNotificationService (помечена @Primary)
@Service
public class UserService {
    private final NotificationService notificationService;
    
    public UserService(NotificationService notificationService) {
        this.notificationService = notificationService; // EmailNotificationService
    }
    
    public void registerUser(User user) {
        // Регистрация пользователя
        notificationService.sendNotification("Добро пожаловать, " + user.getName());
    }
}

// Если нужна конкретная реализация, используем @Qualifier
@Service
public class AdminService {
    private final NotificationService emailService;
    private final NotificationService smsService;
    
    public AdminService(
            NotificationService emailService, // Будет внедрена Primary реализация
            @Qualifier("smsNotificationService") NotificationService smsService) {
        this.emailService = emailService;
        this.smsService = smsService;
    }
}

// Пример с конфигурацией через @Bean
@Configuration
public class DatabaseConfig {
    
    @Bean
    @Primary
    public DataSource primaryDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://localhost:5432/main_db");
        dataSource.setUsername("user");
        dataSource.setPassword("password");
        return dataSource;
    }
    
    @Bean
    @Qualifier("readOnly")
    public DataSource readOnlyDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://localhost:5432/readonly_db");
        dataSource.setUsername("readonly_user");
        dataSource.setPassword("readonly_password");
        return dataSource;
    }
}

// Использование разных DataSource
@Repository
public class UserRepository {
    private final JdbcTemplate mainJdbcTemplate;
    private final JdbcTemplate readOnlyJdbcTemplate;
    
    public UserRepository(
            DataSource primaryDataSource, // Будет внедрен Primary
            @Qualifier("readOnly") DataSource readOnlyDataSource) {
        this.mainJdbcTemplate = new JdbcTemplate(primaryDataSource);
        this.readOnlyJdbcTemplate = new JdbcTemplate(readOnlyDataSource);
    }
    
    public User save(User user) {
        // Используем основную БД для записи
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        mainJdbcTemplate.update(sql, user.getName(), user.getEmail());
        return user;
    }
    
    public List<User> findAll() {
        // Используем readonly БД для чтения
        String sql = "SELECT * FROM users";
        return readOnlyJdbcTemplate.query(sql, new UserRowMapper());
    }
}

// Комбинирование @Primary и @Conditional
@Service
@Primary
@ConditionalOnProperty(name = "notification.type", havingValue = "email", matchIfMissing = true)
public class EmailNotificationService implements NotificationService {
    // Будет использоваться по умолчанию, если не указано другое
}

@Service
@ConditionalOnProperty(name = "notification.type", havingValue = "sms")
public class SmsNotificationService implements NotificationService {
    // Будет использоваться только если notification.type=sms
}
```

[к оглавлению](#spring-core)

## Что такое @Value и как его использовать?
`@Value` позволяет внедрять значения из property-файлов или выражений SpEL в поля, параметры методов или конструкторов.

```java
// application.properties
/*
app.name=MyApplication
app.version=1.0.0
app.timeout=30000
app.features.enabled=true
app.email.from=noreply@example.com
app.database.url=jdbc:postgresql://localhost:5432/mydb
app.database.username=user
app.database.password=password
*/

@Service
public class ConfigService {
    // Внедрение простых значений
    @Value("${app.name}")
    private String appName;
    
    @Value("${app.version}")
    private String appVersion;
    
    // Внедрение с значением по умолчанию
    @Value("${app.timeout:5000}")
    private int timeout;
    
    // Внедрение boolean значений
    @Value("${app.features.enabled:false}")
    private boolean featuresEnabled;
    
    // Внедрение через конструктор
    public ConfigService(
            @Value("${app.email.from}") String emailFrom,
            @Value("${app.database.url}") String dbUrl) {
        this.emailFrom = emailFrom;
        this.dbUrl = dbUrl;
    }
    
    // SpEL выражения
    @Value("#{systemProperties['java.version']}")
    private String javaVersion;
    
    @Value("#{T(java.lang.Math).random() * 100}")
    private double randomNumber;
    
    // Использование других бинов в SpEL
    @Value("#{@configService.appName}")
    private String appNameFromBean;
    
    // Внедрение массивов и списков
    @Value("${app.allowed.hosts:localhost,127.0.0.1}")
    private String[] allowedHosts;
    
    @Value("#{'${app.allowed.hosts:localhost,127.0.0.1}'.split(',')}")
    private List<String> allowedHostsList;
    
    // Внедрение Map
    @Value("#{${app.database.properties:{}}}")
    private Map<String, String> dbProperties;
    
    public void printConfig() {
        System.out.println("App Name: " + appName);
        System.out.println("Version: " + appVersion);
        System.out.println("Timeout: " + timeout);
        System.out.println("Features Enabled: " + featuresEnabled);
        System.out.println("Java Version: " + javaVersion);
        System.out.println("Random Number: " + randomNumber);
        System.out.println("Allowed Hosts: " + Arrays.toString(allowedHosts));
    }
}

// Использование в методах
@Component
public class EmailService {
    
    public void sendEmail(
            @Value("${app.email.from}") String from,
            @Value("${app.email.subject:Default Subject}") String subject,
            String to, 
            String body) {
        System.out.println("Sending email from: " + from);
        System.out.println("Subject: " + subject);
        System.out.println("To: " + to);
        System.out.println("Body: " + body);
    }
}

// Сложные SpEL выражения
@Service
public class AdvancedConfigService {
    
    // Условные выражения
    @Value("#{${app.features.enabled} ? 'Features are enabled' : 'Features are disabled'}")
    private String featureStatus;
    
    // Вызов методов
    @Value("#{T(java.time.LocalDateTime).now()}")
    private LocalDateTime currentTime;
    
    // Работа с коллекциями
    @Value("#{${app.allowed.hosts}.?[#this.startsWith('localhost')]}")
    private List<String> localhostHosts;
    
    // Математические операции
    @Value("#{${app.timeout} * 2}")
    private int doubleTimeout;
    
    // Регулярные выражения
    @Value("#{${app.email.from}.matches('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')}")
    private boolean isValidEmail;
}

// Использование с @ConfigurationProperties для сложных объектов
@ConfigurationProperties(prefix = "app")
@Component
public class AppProperties {
    private String name;
    private String version;
    private int timeout;
    private Database database = new Database();
    private Email email = new Email();
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    
    public int getTimeout() { return timeout; }
    public void setTimeout(int timeout) { this.timeout = timeout; }
    
    public Database getDatabase() { return database; }
    public void setDatabase(Database database) { this.database = database; }
    
    public Email getEmail() { return email; }
    public void setEmail(Email email) { this.email = email; }
    
    public static class Database {
        private String url;
        private String username;
        private String password;
        
        // Getters and setters
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class Email {
        private String from;
        private String subject;
        
        // Getters and setters
        public String getFrom() { return from; }
        public void setFrom(String from) { this.from = from; }
        
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
    }
}

// Использование AppProperties
@Service
public class UserService {
    private final AppProperties appProperties;
    
    public UserService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }
    
    public void registerUser(User user) {
        // Использование конфигурации
        String dbUrl = appProperties.getDatabase().getUrl();
        String emailFrom = appProperties.getEmail().getFrom();
        
        System.out.println("Connecting to database: " + dbUrl);
        System.out.println("Sending welcome email from: " + emailFrom);
        
        // Регистрация пользователя
        user.setCreatedAt(LocalDateTime.now());
        // ... логика сохранения
    }
}
```

[к оглавлению](#spring-core)

## Что такое @Configuration и @Bean?
- `@Configuration` — класс конфигурации Spring (аналог XML-конфигурации).
- `@Bean` — определяет метод, возвращающий бин, который будет управляться Spring.

```java
// Простая конфигурация
@Configuration
public class AppConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:h2:mem:testdb");
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        dataSource.setMaximumPoolSize(10);
        return dataSource;
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    
    // Бин с кастомным именем
    @Bean(name = "customUserService")
    public UserService userService() {
        return new UserService();
    }
    
    // Бин с инициализацией и уничтожением
    @Bean(initMethod = "init", destroyMethod = "cleanup")
    public CacheService cacheService() {
        return new CacheService();
    }
}

// Конфигурация с внедрением зависимостей
@Configuration
public class ServiceConfig {
    
    @Bean
    public UserRepository userRepository(JdbcTemplate jdbcTemplate) {
        return new UserRepository(jdbcTemplate);
    }
    
    @Bean
    public EmailService emailService() {
        return new EmailService();
    }
    
    @Bean
    public UserService userService(UserRepository userRepository, EmailService emailService) {
        return new UserService(userRepository, emailService);
    }
}

// Условная конфигурация
@Configuration
public class ConditionalConfig {
    
    @Bean
    @ConditionalOnProperty(name = "app.cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products");
    }
    
    @Bean
    @ConditionalOnMissingBean(CacheManager.class)
    public CacheManager noCacheManager() {
        return new NoOpCacheManager();
    }
    
    @Bean
    @ConditionalOnClass(RedisTemplate.class)
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        return template;
    }
}

// Конфигурация с профилями
@Configuration
public class ProfileConfig {
    
    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:h2:mem:devdb");
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }
    
    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://localhost:5432/proddb");
        dataSource.setUsername("produser");
        dataSource.setPassword("prodpassword");
        return dataSource;
    }
    
    @Bean
    @Profile("test")
    public DataSource testDataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript("schema.sql")
                .addScript("test-data.sql")
                .build();
    }
}

// Конфигурация с импортом ресурсов
@Configuration
@PropertySource("classpath:application.properties")
@Import({DatabaseConfig.class, SecurityConfig.class})
public class MainConfig {
    
    @Value("${app.name}")
    private String appName;
    
    @Bean
    public ApplicationInfo applicationInfo() {
        return new ApplicationInfo(appName);
    }
}

// Конфигурация с @Primary и @Qualifier
@Configuration
public class PaymentConfig {
    
    @Bean
    @Primary
    public PaymentService creditCardPaymentService() {
        return new CreditCardPaymentService();
    }
    
    @Bean
    @Qualifier("paypal")
    public PaymentService paypalPaymentService() {
        return new PaypalPaymentService();
    }
    
    @Bean
    @Qualifier("bitcoin")
    public PaymentService bitcoinPaymentService() {
        return new BitcoinPaymentService();
    }
}

// Конфигурация с областями видимости
@Configuration
public class ScopeConfig {
    
    @Bean
    @Scope("singleton")
    public DatabaseService databaseService() {
        return new DatabaseService();
    }
    
    @Bean
    @Scope("prototype")
    public RequestProcessor requestProcessor() {
        return new RequestProcessor();
    }
    
    @Bean
    @Scope("request")
    @ConditionalOnWebApplication
    public RequestContext requestContext() {
        return new RequestContext();
    }
}

// Конфигурация с фабричными методами
@Configuration
public class FactoryConfig {
    
    @Bean
    public ConnectionFactory connectionFactory() {
        return new ConnectionFactory();
    }
    
    @Bean
    public Connection connection(ConnectionFactory factory) {
        return factory.createConnection();
    }
    
    // Фабричный бин
    @Bean
    public FactoryBean<ExpensiveObject> expensiveObjectFactory() {
        return new FactoryBean<ExpensiveObject>() {
            @Override
            public ExpensiveObject getObject() throws Exception {
                return new ExpensiveObject();
            }
            
            @Override
            public Class<?> getObjectType() {
                return ExpensiveObject.class;
            }
            
            @Override
            public boolean isSingleton() {
                return true;
            }
        };
    }
}

// Конфигурация с методами жизненного цикла
@Configuration
public class LifecycleConfig {
    
    @Bean(initMethod = "start", destroyMethod = "stop")
    public ScheduledService scheduledService() {
        return new ScheduledService();
    }
    
    @Bean
    public DatabaseConnectionPool connectionPool() {
        DatabaseConnectionPool pool = new DatabaseConnectionPool();
        pool.setMaxConnections(20);
        pool.setMinConnections(5);
        return pool;
    }
    
    @PreDestroy
    public void cleanup() {
        System.out.println("Cleaning up configuration resources");
    }
}

// Использование конфигурации
public class Application {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        // Получение бинов
        UserService userService = context.getBean(UserService.class);
        DataSource dataSource = context.getBean(DataSource.class);
        
        // Получение бина по имени
        UserService customUserService = context.getBean("customUserService", UserService.class);
        
        // Использование бинов
        userService.registerUser(new User("John", "john@example.com"));
        
        // Закрытие контекста
        ((ConfigurableApplicationContext) context).close();
    }
}

// Пример сложной конфигурации с множественными зависимостями
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.example.repositories")
public class ComplexConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
        dataSource.setUsername("user");
        dataSource.setPassword("password");
        dataSource.setMaximumPoolSize(20);
        dataSource.setMinimumIdle(5);
        return dataSource;
    }
    
    @Bean
    public EntityManagerFactory entityManagerFactory(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("com.example.entities");
        factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        
        Properties jpaProperties = new Properties();
        jpaProperties.put("hibernate.hbm2ddl.auto", "update");
        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        jpaProperties.put("hibernate.show_sql", "true");
        factory.setJpaProperties(jpaProperties);
        
        factory.afterPropertiesSet();
        return factory.getObject();
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        LettuceConnectionFactory factory = new LettuceConnectionFactory();
        factory.setHostName("localhost");
        factory.setPort(6379);
        return factory;
    }
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }
}
```

[к оглавлению](#spring-core)