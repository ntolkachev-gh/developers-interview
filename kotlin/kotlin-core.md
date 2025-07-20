[Вопросы для собеседования](../README.md)

# Kotlin Core
+ [Что такое Kotlin?](#Что-такое-kotlin)
+ [Какие основные особенности Kotlin?](#Какие-основные-особенности-kotlin)
+ [Что такое null safety в Kotlin?](#Что-такое-null-safety-в-kotlin)
+ [Что такое data class?](#Что-такое-data-class)
+ [Что такое sealed class?](#Что-такое-sealed-class)
+ [Что такое object в Kotlin?](#Что-такое-object-в-kotlin)
+ [Что такое companion object?](#Что-такое-companion-object)
+ [Что такое extension functions?](#Что-такое-extension-functions)
+ [Что такое lambda expressions?](#Что-такое-lambda-expressions)
+ [Что такое higher-order functions?](#Что-такое-higher-order-functions)
+ [Что такое inline functions?](#Что-такое-inline-functions)
+ [Что такое coroutines?](#Что-такое-coroutines)
+ [Что такое suspend functions?](#Что-такое-suspend-functions)
+ [Что такое scope functions?](#Что-такое-scope-functions)
+ [Что такое when expression?](#Что-такое-when-expression)
+ [Что такое destructuring declarations?](#Что-такое-destructuring-declarations)
+ [Что такое type aliases?](#Что-такое-type-aliases)
+ [Что такое delegated properties?](#Что-такое-delegated-properties)
+ [Что такое operator overloading?](#Что-такое-operator-overloading)
+ [Что такое generics в Kotlin?](#Что-такое-generics-в-kotlin)
+ [Что такое variance в Kotlin?](#Что-такое-variance-в-kotlin)
+ [Что такое reified type parameters?](#Что-такое-reified-type-parameters)
+ [Что такое collections в Kotlin?](#Что-такое-collections-в-kotlin)
+ [Что такое ranges в Kotlin?](#Что-такое-ranges-в-kotlin)
+ [Что такое type checking и casting?](#Что-такое-type-checking-и-casting)
+ [Что такое annotation classes?](#Что-такое-annotation-classes)
+ [Что такое enum classes?](#Что-такое-enum-classes)
+ [Что такое nested и inner classes?](#Что-такое-nested-и-inner-classes)
+ [Что такое interface в Kotlin?](#Что-такое-interface-в-kotlin)
+ [Что такое abstract classes?](#Что-такое-abstract-classes)

## Что такое Kotlin?
**Kotlin** — это современный статически типизированный язык программирования, разработанный компанией JetBrains. Он полностью совместим с Java и может компилироваться в байт-код JVM, JavaScript или нативный код.

```kotlin
// Простой пример Kotlin программы
fun main() {
    println("Hello, Kotlin!")
    
    // Переменные
    val name = "Kotlin" // неизменяемая переменная (val)
    var version = 1.8   // изменяемая переменная (var)
    
    // Функция
    fun greet(name: String): String {
        return "Hello, $name!"
    }
    
    println(greet(name))
    
    // Класс
    class Person(val name: String, var age: Int) {
        fun introduce() = "I'm $name, $age years old"
    }
    
    val person = Person("Alice", 25)
    println(person.introduce())
}
```

**Ключевые особенности:**
- **100% совместимость с Java**
- **Null Safety** — защита от NullPointerException
- **Краткий синтаксис** — меньше boilerplate кода
- **Функциональное программирование** — поддержка lambda, higher-order functions
- **Корутины** — встроенная поддержка асинхронного программирования
- **Мультиплатформенность** — JVM, Android, JavaScript, Native

[к оглавлению](#kotlin-core)

## Какие основные особенности Kotlin?

### 1. Краткость и выразительность
```kotlin
// Java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}

// Kotlin - то же самое в одной строке!
data class Person(val name: String, var age: Int)
```

### 2. Null Safety
```kotlin
// Nullable и non-nullable типы
var nonNull: String = "Hello"     // Не может быть null
var nullable: String? = null      // Может быть null

// Безопасный вызов
val length = nullable?.length     // Вернет null если nullable == null

// Elvis operator
val result = nullable ?: "default"  // Если nullable == null, вернет "default"

// Принудительное разыменование (осторожно!)
val forceLength = nullable!!.length // Бросит исключение если nullable == null
```

### 3. Функции как первоклассные граждане
```kotlin
// Функция высшего порядка
fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
    return operation(x, y)
}

// Использование
val sum = calculate(5, 3) { a, b -> a + b }        // 8
val product = calculate(5, 3) { a, b -> a * b }    // 15

// Функциональный стиль
val numbers = listOf(1, 2, 3, 4, 5)
val evenSquares = numbers
    .filter { it % 2 == 0 }
    .map { it * it }
    .toList()
println(evenSquares) // [4, 16]
```

### 4. Extension Functions
```kotlin
// Расширяем существующий класс String
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}

// Использование
println("racecar".isPalindrome()) // true
println("hello".isPalindrome())   // false

// Расширение для коллекций
fun <T> List<T>.secondOrNull(): T? {
    return if (this.size >= 2) this[1] else null
}

val list = listOf("a", "b", "c")
println(list.secondOrNull()) // "b"
```

### 5. Smart Casts
```kotlin
fun processValue(value: Any) {
    if (value is String) {
        // Автоматическое приведение к String
        println(value.length) // Не нужно явное приведение типа
        println(value.uppercase())
    }
    
    when (value) {
        is Int -> println("Integer: ${value + 1}")
        is String -> println("String: ${value.length} characters")
        is List<*> -> println("List with ${value.size} elements")
    }
}
```

[к оглавлению](#kotlin-core)

## Что такое null safety в Kotlin?
**Null Safety** — это система типов в Kotlin, которая помогает избежать NullPointerException на этапе компиляции.

### Nullable и Non-nullable типы
```kotlin
// Non-nullable типы (по умолчанию)
var name: String = "John"
// name = null // Ошибка компиляции!

// Nullable типы (с символом ?)
var nickname: String? = "Johnny"
nickname = null // OK

// Проверка на null
fun printLength(text: String?) {
    if (text != null) {
        println(text.length) // Smart cast к String
    }
}
```

### Операторы для работы с null
```kotlin
class User(val name: String, val email: String?)

fun processUser(user: User?) {
    // 1. Безопасный вызов (?.)
    val emailLength = user?.email?.length
    println("Email length: $emailLength") // null если user или email == null
    
    // 2. Elvis operator (?:)
    val displayName = user?.name ?: "Unknown"
    println("Display name: $displayName")
    
    // 3. Безопасное приведение типа (as?)
    val userAsString = user as? String
    println("User as string: $userAsString") // null, так как user не String
    
    // 4. Not-null assertion (!!)
    // ОСТОРОЖНО: может бросить KotlinNullPointerException
    if (user != null) {
        val name = user.name!! // Здесь безопасно, так как проверили на null
        println("Name: $name")
    }
}
```

### Платформенные типы
```kotlin
// При работе с Java кодом
// Java: public String getName() { return name; }

// В Kotlin это будет платформенный тип String!
// Можно использовать как String или String?
fun workWithJavaClass(javaObject: JavaClass) {
    val name: String = javaObject.name    // Предполагаем, что не null
    val safeName: String? = javaObject.name // Безопасный подход
}
```

### Коллекции и null safety
```kotlin
// Список строк (не может содержать null)
val strings: List<String> = listOf("a", "b", "c")

// Список nullable строк
val nullableStrings: List<String?> = listOf("a", null, "c")

// Nullable список строк
val nullableList: List<String>? = null

// Nullable список nullable строк
val nullableListOfNullables: List<String?>? = null

// Фильтрация null значений
val filtered = nullableStrings.filterNotNull() // List<String>
println(filtered) // [a, c]
```

[к оглавлению](#kotlin-core)

## Что такое data class?
**Data class** — это специальный тип класса в Kotlin, предназначенный для хранения данных. Компилятор автоматически генерирует полезные методы.

```kotlin
// Простой data class
data class Person(val name: String, val age: Int)

// Компилятор автоматически генерирует:
// - equals() и hashCode()
// - toString()
// - copy()
// - componentN() функции для destructuring

fun main() {
    val person1 = Person("Alice", 25)
    val person2 = Person("Alice", 25)
    val person3 = Person("Bob", 30)
    
    // toString()
    println(person1) // Person(name=Alice, age=25)
    
    // equals()
    println(person1 == person2) // true
    println(person1 == person3) // false
    
    // hashCode()
    println(person1.hashCode() == person2.hashCode()) // true
    
    // copy() - создание копии с изменением некоторых свойств
    val olderPerson = person1.copy(age = 26)
    println(olderPerson) // Person(name=Alice, age=26)
    
    // Destructuring declarations
    val (name, age) = person1
    println("Name: $name, Age: $age") // Name: Alice, Age: 25
}
```

### Продвинутые возможности data class
```kotlin
data class User(
    val id: Long,
    val name: String,
    val email: String,
    val isActive: Boolean = true,
    val roles: List<String> = emptyList()
) {
    // Можно добавлять собственные методы
    fun hasRole(role: String): Boolean = roles.contains(role)
    
    // Можно переопределять сгенерированные методы
    override fun toString(): String {
        return "User(id=$id, name='$name', active=$isActive)"
    }
}

fun demonstrateDataClass() {
    val user = User(1L, "John", "john@example.com", roles = listOf("admin", "user"))
    
    // Использование copy() для создания модификаций
    val inactiveUser = user.copy(isActive = false)
    val userWithNewEmail = user.copy(email = "john.doe@example.com")
    
    // Destructuring (только для первых N свойств)
    val (id, name, email) = user
    println("User $id: $name ($email)")
    
    // Работа с коллекциями data classes
    val users = listOf(
        User(1L, "Alice", "alice@example.com"),
        User(2L, "Bob", "bob@example.com"),
        User(3L, "Charlie", "charlie@example.com")
    )
    
    // Группировка по активности
    val groupedUsers = users.groupBy { it.isActive }
    
    // Поиск пользователя
    val alice = users.find { it.name == "Alice" }
    
    // Создание Map из data class
    val userMap = users.associateBy { it.id }
}
```

### Ограничения data class
```kotlin
// Data class не может быть:
// - abstract
// - open
// - sealed
// - inner

// Но может:
// - наследоваться от других классов
// - реализовывать интерфейсы

interface Identifiable {
    val id: Long
}

data class Product(
    override val id: Long,
    val name: String,
    val price: Double
) : Identifiable

// Вложенные data classes
data class Order(
    val id: Long,
    val customer: Customer,
    val items: List<OrderItem>
) {
    data class Customer(val name: String, val email: String)
    data class OrderItem(val productId: Long, val quantity: Int, val price: Double)
}
```

[к оглавлению](#kotlin-core) 

## Что такое sealed class?
**Sealed class** — это ограниченная иерархия классов, где все подклассы должны быть определены в том же файле. Это полезно для представления ограниченного набора состояний.

```kotlin
// Определение sealed class
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// Использование с when expression
fun handleResult(result: Result<String>) {
    when (result) {
        is Result.Success -> {
            println("Success: ${result.data}")
        }
        is Result.Error -> {
            println("Error: ${result.exception.message}")
        }
        Result.Loading -> {
            println("Loading...")
        }
        // Нет необходимости в else - все случаи покрыты
    }
}

// Пример использования
fun fetchData(): Result<String> {
    return try {
        // Симуляция загрузки данных
        val data = "Some data"
        Result.Success(data)
    } catch (e: Exception) {
        Result.Error(e)
    }
}

fun main() {
    val result = fetchData()
    handleResult(result)
}
```

### Практические примеры sealed class
```kotlin
// Состояния UI
sealed class UiState {
    object Loading : UiState()
    data class Success(val data: List<String>) : UiState()
    data class Error(val message: String) : UiState()
    object Empty : UiState()
}

// Навигация
sealed class Screen {
    object Home : Screen()
    object Profile : Screen()
    data class UserDetail(val userId: String) : Screen()
    data class Settings(val section: String? = null) : Screen()
}

// Математические операции
sealed class Operation {
    data class Add(val a: Int, val b: Int) : Operation()
    data class Subtract(val a: Int, val b: Int) : Operation()
    data class Multiply(val a: Int, val b: Int) : Operation()
    data class Divide(val a: Int, val b: Int) : Operation()
}

fun calculate(operation: Operation): Double {
    return when (operation) {
        is Operation.Add -> (operation.a + operation.b).toDouble()
        is Operation.Subtract -> (operation.a - operation.b).toDouble()
        is Operation.Multiply -> (operation.a * operation.b).toDouble()
        is Operation.Divide -> {
            if (operation.b != 0) {
                operation.a.toDouble() / operation.b
            } else {
                throw IllegalArgumentException("Division by zero")
            }
        }
    }
}
```

[к оглавлению](#kotlin-core)

## Что такое object в Kotlin?
**Object** — это способ создания singleton'ов в Kotlin. Существует три типа: object declaration, object expression и companion object.

### 1. Object Declaration (Singleton)
```kotlin
// Singleton объект
object DatabaseManager {
    private val connections = mutableListOf<String>()
    
    fun connect(url: String) {
        connections.add(url)
        println("Connected to $url")
    }
    
    fun disconnect(url: String) {
        connections.remove(url)
        println("Disconnected from $url")
    }
    
    fun getConnectionCount(): Int = connections.size
}

// Использование
fun main() {
    DatabaseManager.connect("localhost:5432")
    DatabaseManager.connect("remote:3306")
    println("Connections: ${DatabaseManager.getConnectionCount()}") // 2
}
```

### 2. Object Expression (Анонимный объект)
```kotlin
interface ClickListener {
    fun onClick()
    fun onLongClick()
}

fun createButton() {
    // Анонимный объект
    val clickListener = object : ClickListener {
        override fun onClick() {
            println("Button clicked!")
        }
        
        override fun onLongClick() {
            println("Button long clicked!")
        }
    }
    
    // Использование
    clickListener.onClick()
    
    // Анонимный объект с дополнительными свойствами
    val counter = object {
        var count = 0
        
        fun increment() {
            count++
            println("Count: $count")
        }
    }
    
    counter.increment()
    counter.increment()
}
```

### 3. Object как выражение
```kotlin
// Создание объекта "на лету"
fun processData(data: List<String>) {
    val processor = object {
        fun process(): List<String> {
            return data.map { it.uppercase() }
        }
        
        fun validate(): Boolean {
            return data.all { it.isNotEmpty() }
        }
    }
    
    if (processor.validate()) {
        val result = processor.process()
        println("Processed: $result")
    }
}

// Object с наследованием
abstract class Animal {
    abstract fun makeSound()
}

fun createAnimal(): Animal {
    return object : Animal() {
        override fun makeSound() {
            println("Some generic animal sound")
        }
    }
}
```

[к оглавлению](#kotlin-core)

## Что такое companion object?
**Companion object** — это объект, который привязан к классу и может обращаться к его приватным членам. Аналог статических методов в Java.

```kotlin
class User private constructor(val name: String, val email: String) {
    
    companion object {
        private const val MIN_NAME_LENGTH = 2
        private const val EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
        
        // Factory методы
        fun create(name: String, email: String): User? {
            return if (isValidName(name) && isValidEmail(email)) {
                User(name, email)
            } else {
                null
            }
        }
        
        fun createAdmin(name: String, email: String): User? {
            val user = create(name, email)
            return user?.copy(roles = listOf("admin"))
        }
        
        // Приватные методы валидации
        private fun isValidName(name: String): Boolean {
            return name.length >= MIN_NAME_LENGTH
        }
        
        private fun isValidEmail(email: String): Boolean {
            return email.matches(EMAIL_PATTERN.toRegex())
        }
        
        // Константы
        const val DEFAULT_ROLE = "user"
    }
    
    // Расширение для демонстрации
    private fun copy(roles: List<String>): User {
        return User(name, email) // Упрощенная версия
    }
}

// Использование
fun main() {
    val user = User.create("John", "john@example.com")
    println(user?.name) // John
    
    val admin = User.createAdmin("Admin", "admin@example.com")
    println("Default role: ${User.DEFAULT_ROLE}")
}
```

### Companion object с интерфейсами
```kotlin
interface Factory<T> {
    fun create(data: String): T
}

class Person(val name: String, val age: Int) {
    companion object : Factory<Person> {
        override fun create(data: String): Person {
            val parts = data.split(",")
            return Person(parts[0], parts[1].toInt())
        }
        
        // Дополнительные factory методы
        fun createChild(name: String): Person {
            return Person(name, 0)
        }
        
        fun createAdult(name: String): Person {
            return Person(name, 18)
        }
    }
    
    override fun toString(): String = "Person(name='$name', age=$age)"
}

// Использование
fun main() {
    val person1 = Person.create("Alice,25")
    val person2 = Person.createChild("Bob")
    val person3 = Person.createAdult("Charlie")
    
    println(person1) // Person(name='Alice', age=25)
    println(person2) // Person(name='Bob', age=0)
    println(person3) // Person(name='Charlie', age=18)
}
```

### Именованные companion objects
```kotlin
class Calculator {
    companion object MathUtils {
        fun add(a: Int, b: Int): Int = a + b
        fun multiply(a: Int, b: Int): Int = a * b
        
        const val PI = 3.14159
    }
}

// Можно обращаться как через имя класса, так и через имя companion object
fun main() {
    println(Calculator.add(5, 3))           // 8
    println(Calculator.MathUtils.add(5, 3)) // 8
    println(Calculator.PI)                  // 3.14159
}
```

[к оглавлению](#kotlin-core)

## Что такое extension functions?
**Extension functions** позволяют добавлять новые функции к существующим классам без их модификации или наследования.

```kotlin
// Расширение для String
fun String.isValidEmail(): Boolean {
    val emailPattern = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    return this.matches(emailPattern.toRegex())
}

fun String.capitalizeWords(): String {
    return this.split(" ")
        .joinToString(" ") { word ->
            word.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
        }
}

// Расширение для чисел
fun Int.isEven(): Boolean = this % 2 == 0
fun Int.isOdd(): Boolean = this % 2 != 0

fun Double.round(decimals: Int): Double {
    var multiplier = 1.0
    repeat(decimals) { multiplier *= 10 }
    return kotlin.math.round(this * multiplier) / multiplier
}

// Использование
fun main() {
    val email = "test@example.com"
    println(email.isValidEmail()) // true
    
    val text = "hello world kotlin"
    println(text.capitalizeWords()) // Hello World Kotlin
    
    println(42.isEven()) // true
    println(13.isOdd())  // true
    
    val pi = 3.14159265359
    println(pi.round(2)) // 3.14
}
```

### Extension functions для коллекций
```kotlin
// Расширения для List
fun <T> List<T>.second(): T {
    if (this.size < 2) throw IndexOutOfBoundsException("List has less than 2 elements")
    return this[1]
}

fun <T> List<T>.secondOrNull(): T? {
    return if (this.size >= 2) this[1] else null
}

fun <T> List<T>.penultimate(): T {
    if (this.size < 2) throw IndexOutOfBoundsException("List has less than 2 elements")
    return this[this.size - 2]
}

// Расширения для Map
fun <K, V> Map<K, V>.getOrThrow(key: K): V {
    return this[key] ?: throw NoSuchElementException("Key $key not found")
}

fun <K, V> Map<K, V>.getOrDefault(key: K, defaultValue: V): V {
    return this[key] ?: defaultValue
}

// Использование
fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    println(numbers.second())      // 2
    println(numbers.secondOrNull()) // 2
    println(numbers.penultimate()) // 4
    
    val map = mapOf("a" to 1, "b" to 2)
    try {
        println(map.getOrThrow("c"))
    } catch (e: NoSuchElementException) {
        println("Key not found: ${e.message}")
    }
    
    println(map.getOrDefault("c", 0)) // 0
}
```

### Extension properties
```kotlin
// Extension property для String
val String.lastChar: Char
    get() = this[this.length - 1]

var StringBuilder.lastChar: Char
    get() = this[this.length - 1]
    set(value) {
        this.setCharAt(this.length - 1, value)
    }

// Extension property для коллекций
val <T> List<T>.lastIndex: Int
    get() = this.size - 1

// Использование
fun main() {
    val text = "Hello"
    println(text.lastChar) // o
    
    val sb = StringBuilder("Hello")
    sb.lastChar = '!'
    println(sb.toString()) // Hell!
    
    val list = listOf("a", "b", "c")
    println(list.lastIndex) // 2
}
```

### Scope и приоритет extension functions
```kotlin
class MyClass {
    fun memberFunction() = "Member"
    
    fun test() {
        // Extension function внутри класса
        fun String.memberExtension() = "Extension in member"
        
        println("test".memberExtension()) // Extension in member
    }
}

// Extension function с тем же именем что и member function
fun MyClass.memberFunction() = "Extension"

// Member function имеет приоритет над extension
fun main() {
    val obj = MyClass()
    println(obj.memberFunction()) // Member (не Extension)
    
    obj.test()
}
```

[к оглавлению](#kotlin-core) 

## Что такое lambda expressions?
**Lambda expressions** — это анонимные функции, которые можно передавать как значения и использовать для функционального программирования.

```kotlin
// Синтаксис lambda
val sum = { a: Int, b: Int -> a + b }
val multiply: (Int, Int) -> Int = { a, b -> a * b }

// Использование
println(sum(5, 3))      // 8
println(multiply(4, 7)) // 28

// Lambda с одним параметром (можно использовать 'it')
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }
println(doubled) // [2, 4, 6, 8, 10]

// Lambda без параметров
val greeting = { println("Hello, World!") }
greeting() // Hello, World!

// Lambda с несколькими выражениями
val processNumber = { num: Int ->
    val squared = num * num
    val message = "Square of $num is $squared"
    println(message)
    squared // последнее выражение возвращается
}

val result = processNumber(5) // Square of 5 is 25
println(result) // 25
```

### Функциональные интерфейсы и SAM конверсия
```kotlin
// Функциональный интерфейс
fun interface StringProcessor {
    fun process(input: String): String
}

// SAM (Single Abstract Method) конверсия
fun processString(input: String, processor: StringProcessor): String {
    return processor.process(input)
}

fun main() {
    // Использование lambda вместо анонимного класса
    val result1 = processString("hello") { it.uppercase() }
    println(result1) // HELLO
    
    val result2 = processString("world") { input ->
        input.reversed().capitalize()
    }
    println(result2) // Dlrow
    
    // Сравнение с анонимным классом
    val processor = object : StringProcessor {
        override fun process(input: String): String {
            return input.uppercase()
        }
    }
    val result3 = processString("kotlin", processor)
    println(result3) // KOTLIN
}
```

### Замыкания (Closures)
```kotlin
fun createCounter(): () -> Int {
    var count = 0
    return {
        count++
        count
    }
}

fun createMultiplier(factor: Int): (Int) -> Int {
    return { number -> number * factor }
}

fun main() {
    val counter = createCounter()
    println(counter()) // 1
    println(counter()) // 2
    println(counter()) // 3
    
    val doubler = createMultiplier(2)
    val tripler = createMultiplier(3)
    
    println(doubler(5))  // 10
    println(tripler(5))  // 15
}
```

[к оглавлению](#kotlin-core)

## Что такое higher-order functions?
**Higher-order functions** — это функции, которые принимают другие функции в качестве параметров или возвращают функции.

```kotlin
// Функция, принимающая другую функцию как параметр
fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
    return operation(x, y)
}

// Функция, возвращающая другую функцию
fun getOperation(operationType: String): (Int, Int) -> Int {
    return when (operationType) {
        "add" -> { a, b -> a + b }
        "subtract" -> { a, b -> a - b }
        "multiply" -> { a, b -> a * b }
        "divide" -> { a, b -> if (b != 0) a / b else 0 }
        else -> { _, _ -> 0 }
    }
}

fun main() {
    // Использование higher-order функций
    val sum = calculate(10, 5) { a, b -> a + b }
    val product = calculate(10, 5) { a, b -> a * b }
    
    println("Sum: $sum")         // Sum: 15
    println("Product: $product") // Product: 50
    
    // Получение операции
    val addOperation = getOperation("add")
    val result = addOperation(8, 3)
    println("Addition result: $result") // Addition result: 11
}
```

### Встроенные higher-order функции
```kotlin
fun demonstrateBuiltInFunctions() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    
    // map - трансформация элементов
    val squared = numbers.map { it * it }
    println("Squared: $squared")
    
    // filter - фильтрация элементов
    val evenNumbers = numbers.filter { it % 2 == 0 }
    println("Even numbers: $evenNumbers")
    
    // reduce - свертка коллекции
    val sum = numbers.reduce { acc, element -> acc + element }
    println("Sum: $sum")
    
    // fold - свертка с начальным значением
    val product = numbers.fold(1) { acc, element -> acc * element }
    println("Product: $product")
    
    // forEach - выполнение действия для каждого элемента
    numbers.forEach { println("Processing: $it") }
    
    // any/all - проверка условий
    val hasEven = numbers.any { it % 2 == 0 }
    val allPositive = numbers.all { it > 0 }
    println("Has even: $hasEven, All positive: $allPositive")
    
    // groupBy - группировка по условию
    val grouped = numbers.groupBy { it % 2 == 0 }
    println("Grouped by even: $grouped")
}
```

### Создание собственных higher-order функций
```kotlin
// Функция для повторения действия
fun repeat(times: Int, action: (Int) -> Unit) {
    for (i in 1..times) {
        action(i)
    }
}

// Функция для измерения времени выполнения
fun <T> measureTime(block: () -> T): Pair<T, Long> {
    val startTime = System.currentTimeMillis()
    val result = block()
    val endTime = System.currentTimeMillis()
    return Pair(result, endTime - startTime)
}

// Функция для безопасного выполнения
fun <T> safeExecute(block: () -> T): T? {
    return try {
        block()
    } catch (e: Exception) {
        println("Error: ${e.message}")
        null
    }
}

fun main() {
    // Использование repeat
    repeat(3) { iteration ->
        println("Iteration $iteration")
    }
    
    // Использование measureTime
    val (result, time) = measureTime {
        Thread.sleep(100)
        "Task completed"
    }
    println("Result: $result, Time: ${time}ms")
    
    // Использование safeExecute
    val safeResult = safeExecute {
        val number = "not a number".toInt() // Вызовет исключение
        number * 2
    }
    println("Safe result: $safeResult") // Safe result: null
}
```

[к оглавлению](#kotlin-core)

## Что такое inline functions?
**Inline functions** — это функции, код которых вставляется в место вызова во время компиляции, что позволяет избежать накладных расходов на вызов функции.

```kotlin
// Обычная функция
fun regularFunction(action: () -> Unit) {
    println("Before action")
    action()
    println("After action")
}

// Inline функция
inline fun inlineFunction(action: () -> Unit) {
    println("Before action")
    action()
    println("After action")
}

// Inline функция с reified типом
inline fun <reified T> isInstance(value: Any): Boolean {
    return value is T
}

fun main() {
    // Использование обычной функции
    regularFunction {
        println("Regular function action")
    }
    
    // Использование inline функции
    inlineFunction {
        println("Inline function action")
    }
    
    // Использование reified типа
    println(isInstance<String>("Hello"))    // true
    println(isInstance<Int>("Hello"))       // false
    println(isInstance<List<*>>(listOf(1, 2, 3))) // true
}
```

### noinline и crossinline
```kotlin
// noinline - исключает параметр из инлайнинга
inline fun mixedFunction(
    action1: () -> Unit,
    noinline action2: () -> Unit,
    action3: () -> Unit
) {
    action1() // будет инлайнен
    action2() // не будет инлайнен
    action3() // будет инлайнен
    
    // noinline параметр можно сохранить в переменную
    val storedAction = action2
    storedAction()
}

// crossinline - запрещает non-local returns
inline fun crossinlineFunction(crossinline action: () -> Unit) {
    val runnable = Runnable {
        action() // crossinline позволяет вызывать lambda в другом контексте
    }
    runnable.run()
}

fun demonstrateInlineModifiers() {
    mixedFunction(
        action1 = { println("Action 1") },
        action2 = { println("Action 2") },
        action3 = { println("Action 3") }
    )
    
    crossinlineFunction {
        println("Crossinline action")
        // return // Ошибка компиляции - crossinline запрещает non-local return
    }
}
```

### Практические примеры inline функций
```kotlin
// Измерение времени выполнения
inline fun <T> measureExecutionTime(block: () -> T): T {
    val startTime = System.nanoTime()
    val result = block()
    val endTime = System.nanoTime()
    println("Execution time: ${(endTime - startTime) / 1_000_000}ms")
    return result
}

// Безопасное выполнение с ресурсами
inline fun <T : AutoCloseable, R> T.use(block: (T) -> R): R {
    var exception: Throwable? = null
    try {
        return block(this)
    } catch (e: Throwable) {
        exception = e
        throw e
    } finally {
        try {
            this.close()
        } catch (closeException: Throwable) {
            if (exception == null) {
                throw closeException
            } else {
                exception.addSuppressed(closeException)
            }
        }
    }
}

// Условное выполнение
inline fun <T> T.applyIf(condition: Boolean, block: T.() -> T): T {
    return if (condition) block() else this
}

fun main() {
    // Измерение времени
    val result = measureExecutionTime {
        Thread.sleep(100)
        "Task completed"
    }
    println("Result: $result")
    
    // Условное применение
    val text = "hello"
        .applyIf(true) { uppercase() }
        .applyIf(false) { reversed() }
    println(text) // HELLO
}
```

[к оглавлению](#kotlin-core)

## Что такое scope functions?
**Scope functions** — это функции, которые выполняют блок кода в контексте объекта. В Kotlin есть пять основных scope функций: `let`, `run`, `with`, `apply`, `also`.

```kotlin
data class Person(var name: String, var age: Int, var city: String)

fun demonstrateScopeFunctions() {
    val person = Person("John", 25, "New York")
    
    // let - выполняет блок и возвращает результат
    val nameLength = person.let {
        println("Processing person: ${it.name}")
        it.name.length
    }
    println("Name length: $nameLength")
    
    // run - выполняет блок в контексте объекта и возвращает результат
    val description = person.run {
        "Person: $name, age $age, from $city"
    }
    println(description)
    
    // with - не extension функция, принимает объект как параметр
    val info = with(person) {
        "Name: $name, Age: $age"
    }
    println(info)
    
    // apply - выполняет блок и возвращает сам объект
    val modifiedPerson = person.apply {
        name = "Jane"
        age = 30
    }
    println("Modified person: $modifiedPerson")
    
    // also - выполняет блок и возвращает сам объект
    val loggedPerson = person.also {
        println("Logging person: ${it.name}")
    }
    println("Logged person: $loggedPerson")
}
```

### Сравнение scope functions
```kotlin
fun compareScopeFunctions() {
    val numbers = mutableListOf(1, 2, 3)
    
    // let - it, возвращает результат блока
    val doubled = numbers.let { list ->
        list.map { it * 2 }
    }
    println("Doubled: $doubled")
    
    // run - this, возвращает результат блока
    val sum = numbers.run {
        this.sum()
    }
    println("Sum: $sum")
    
    // with - this, возвращает результат блока
    val average = with(numbers) {
        sum().toDouble() / size
    }
    println("Average: $average")
    
    // apply - this, возвращает объект
    numbers.apply {
        add(4)
        add(5)
    }
    println("After apply: $numbers")
    
    // also - it, возвращает объект
    numbers.also { list ->
        println("List size: ${list.size}")
    }
}
```

### Практические примеры использования
```kotlin
// Инициализация объекта
fun createPerson(): Person {
    return Person("", 0, "").apply {
        name = "Alice"
        age = 28
        city = "London"
    }
}

// Работа с nullable объектами
fun processNullablePerson(person: Person?) {
    person?.let {
        println("Processing ${it.name}")
        // Дополнительная обработка
    }
}

// Конфигурация объекта
fun configurePerson(person: Person) {
    with(person) {
        if (age < 18) {
            city = "Parent's city"
        }
        if (name.isEmpty()) {
            name = "Unknown"
        }
    }
}

// Цепочка вызовов
fun chainedOperations() {
    val result = "  Hello World  "
        .trim()
        .let { it.lowercase() }
        .also { println("Processed: $it") }
        .run { split(" ") }
        .apply { 
            println("Words count: $size")
        }
    
    println("Final result: $result")
}

// Условное выполнение
fun conditionalExecution(person: Person?) {
    person?.takeIf { it.age >= 18 }
        ?.let { adult ->
            println("Adult person: ${adult.name}")
        }
        ?: println("Person is either null or underage")
}
```

### Выбор подходящей scope function
```kotlin
/*
Когда использовать какую scope function:

let:
- Выполнение операций над nullable объектами
- Преобразование объекта в другой тип
- Группировка операций

run:
- Инициализация объекта и вычисление результата
- Выполнение операций где нужен контекст объекта

with:
- Группировка операций над объектом
- Когда нужно вызвать несколько методов объекта

apply:
- Конфигурация объекта
- Builder pattern
- Инициализация объекта

also:
- Дополнительные действия (логирование, валидация)
- Побочные эффекты
*/

class PersonBuilder {
    private var name: String = ""
    private var age: Int = 0
    private var city: String = ""
    
    fun name(name: String) = apply { this.name = name }
    fun age(age: Int) = apply { this.age = age }
    fun city(city: String) = apply { this.city = city }
    
    fun build() = Person(name, age, city)
}

fun builderPattern() {
    val person = PersonBuilder()
        .name("Bob")
        .age(35)
        .city("Paris")
        .also { println("Building person...") }
        .build()
        .also { println("Person created: $it") }
}
```

[к оглавлению](#kotlin-core) 

## Что такое coroutines?
**Coroutines** — это легковесные потоки в Kotlin, которые позволяют писать асинхронный код в синхронном стиле без блокировки потоков.

```kotlin
import kotlinx.coroutines.*

// Простая корутина
fun main() {
    runBlocking {
        println("Hello")
        delay(1000) // Неблокирующая задержка
        println("World")
    }
}

// Запуск корутин
fun demonstrateCoroutines() {
    runBlocking {
        // launch - запускает корутину и возвращает Job
        val job1 = launch {
            delay(1000)
            println("Job 1 completed")
        }
        
        // async - запускает корутину и возвращает Deferred<T>
        val deferred = async {
            delay(500)
            "Result from async"
        }
        
        // Ожидание результата
        val result = deferred.await()
        println("Async result: $result")
        
        // Ожидание завершения job
        job1.join()
        
        println("All coroutines completed")
    }
}
```

### Контексты корутин (Coroutine Contexts)
```kotlin
import kotlinx.coroutines.*
import kotlin.coroutines.CoroutineContext

fun demonstrateCoroutineContexts() {
    runBlocking {
        // Dispatchers.Main - основной поток (Android UI)
        // Dispatchers.IO - для I/O операций
        // Dispatchers.Default - для CPU-интенсивных задач
        // Dispatchers.Unconfined - не привязан к конкретному потоку
        
        // Переключение контекста
        launch(Dispatchers.IO) {
            println("IO work on thread: ${Thread.currentThread().name}")
            val data = fetchDataFromNetwork()
            
            withContext(Dispatchers.Main) {
                println("UI update on thread: ${Thread.currentThread().name}")
                // Обновление UI
            }
        }
        
        // Пользовательский контекст
        val customContext = Dispatchers.Default + CoroutineName("MyCoroutine")
        launch(customContext) {
            println("Custom context: ${coroutineContext[CoroutineName]}")
        }
        
        delay(2000)
    }
}

suspend fun fetchDataFromNetwork(): String {
    delay(1000) // Симуляция сетевого запроса
    return "Network data"
}
```

### Scope корутин
```kotlin
import kotlinx.coroutines.*

class MyService : CoroutineScope {
    private val job = SupervisorJob()
    override val coroutineContext: CoroutineContext = Dispatchers.Main + job
    
    fun startWork() {
        launch {
            try {
                doWork()
            } catch (e: Exception) {
                handleError(e)
            }
        }
    }
    
    fun cleanup() {
        job.cancel() // Отменяет все дочерние корутины
    }
    
    private suspend fun doWork() {
        repeat(10) { i ->
            delay(1000)
            println("Work iteration $i")
        }
    }
    
    private fun handleError(e: Exception) {
        println("Error occurred: ${e.message}")
    }
}

// Использование coroutineScope
suspend fun processItems(items: List<String>) = coroutineScope {
    val jobs = items.map { item ->
        async {
            processItem(item)
        }
    }
    jobs.awaitAll() // Ждем завершения всех задач
}

suspend fun processItem(item: String): String {
    delay(100)
    return "Processed: $item"
}
```

### Каналы (Channels)
```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun demonstrateChannels() {
    runBlocking {
        // Простой канал
        val channel = Channel<Int>()
        
        // Producer
        launch {
            for (x in 1..5) {
                channel.send(x * x)
                delay(100)
            }
            channel.close()
        }
        
        // Consumer
        for (y in channel) {
            println("Received: $y")
        }
        
        // Channel с буфером
        val bufferedChannel = Channel<String>(capacity = 10)
        
        launch {
            repeat(20) { i ->
                bufferedChannel.send("Message $i")
                println("Sent: Message $i")
            }
            bufferedChannel.close()
        }
        
        delay(1000)
        
        for (message in bufferedChannel) {
            println("Received: $message")
            delay(50)
        }
    }
}

// Produce builder
fun CoroutineScope.produceNumbers() = produce<Int> {
    var x = 1
    while (true) {
        send(x++)
        delay(100)
    }
}

fun demonstrateProduce() {
    runBlocking {
        val numbers = produceNumbers()
        
        repeat(10) {
            println("Number: ${numbers.receive()}")
        }
        
        numbers.cancel()
    }
}
```

[к оглавлению](#kotlin-core)

## Что такое suspend functions?
**Suspend functions** — это функции, которые могут быть приостановлены и возобновлены без блокировки потока. Они являются основой корутин в Kotlin.

```kotlin
import kotlinx.coroutines.*

// Простая suspend функция
suspend fun simpleDelay(timeMillis: Long) {
    delay(timeMillis)
    println("Delay completed")
}

// Suspend функция с возвращаемым значением
suspend fun fetchUserData(userId: Int): String {
    delay(1000) // Симуляция сетевого запроса
    return "User data for ID: $userId"
}

// Suspend функция может вызывать другие suspend функции
suspend fun processUser(userId: Int): String {
    val userData = fetchUserData(userId)
    delay(500) // Дополнительная обработка
    return "Processed: $userData"
}

fun main() {
    runBlocking {
        println("Starting...")
        
        simpleDelay(1000)
        
        val result = processUser(123)
        println(result)
        
        println("Finished")
    }
}
```

### Последовательное и параллельное выполнение
```kotlin
import kotlinx.coroutines.*
import kotlin.system.measureTimeMillis

suspend fun doSomethingUsefulOne(): Int {
    delay(1000)
    return 13
}

suspend fun doSomethingUsefulTwo(): Int {
    delay(1000)
    return 29
}

fun demonstrateSequentialVsParallel() {
    runBlocking {
        // Последовательное выполнение
        val time1 = measureTimeMillis {
            val one = doSomethingUsefulOne()
            val two = doSomethingUsefulTwo()
            println("Sequential result: ${one + two}")
        }
        println("Sequential time: $time1 ms")
        
        // Параллельное выполнение с async
        val time2 = measureTimeMillis {
            val one = async { doSomethingUsefulOne() }
            val two = async { doSomethingUsefulTwo() }
            println("Parallel result: ${one.await() + two.await()}")
        }
        println("Parallel time: $time2 ms")
    }
}
```

### Обработка исключений в suspend функциях
```kotlin
import kotlinx.coroutines.*

suspend fun riskyOperation(): String {
    delay(1000)
    if (Math.random() < 0.5) {
        throw RuntimeException("Something went wrong")
    }
    return "Success"
}

suspend fun safeOperation(): String? {
    return try {
        riskyOperation()
    } catch (e: Exception) {
        println("Caught exception: ${e.message}")
        null
    }
}

// Использование supervisorScope для изоляции ошибок
suspend fun processMultipleOperations() {
    supervisorScope {
        val job1 = launch {
            try {
                val result = riskyOperation()
                println("Job 1 result: $result")
            } catch (e: Exception) {
                println("Job 1 failed: ${e.message}")
            }
        }
        
        val job2 = launch {
            try {
                val result = riskyOperation()
                println("Job 2 result: $result")
            } catch (e: Exception) {
                println("Job 2 failed: ${e.message}")
            }
        }
        
        // Ждем завершения обеих задач
        joinAll(job1, job2)
    }
}
```

### Отмена suspend функций
```kotlin
import kotlinx.coroutines.*

suspend fun longRunningTask() {
    repeat(1000) { i ->
        // Проверка на отмену
        ensureActive() // или yield()
        
        println("Task iteration $i")
        delay(100)
    }
}

suspend fun cancellableTask() {
    try {
        longRunningTask()
    } catch (e: CancellationException) {
        println("Task was cancelled")
        // Cleanup resources
        throw e // Важно перебросить CancellationException
    } finally {
        println("Cleanup completed")
    }
}

fun demonstrateCancellation() {
    runBlocking {
        val job = launch {
            cancellableTask()
        }
        
        delay(500)
        println("Cancelling job...")
        job.cancel()
        job.join()
        
        println("Job cancelled")
    }
}
```

### Suspend функции с timeout
```kotlin
import kotlinx.coroutines.*

suspend fun slowOperation(): String {
    delay(2000)
    return "Slow result"
}

fun demonstrateTimeout() {
    runBlocking {
        try {
            val result = withTimeout(1000) {
                slowOperation()
            }
            println("Result: $result")
        } catch (e: TimeoutCancellationException) {
            println("Operation timed out")
        }
        
        // Альтернатива с возвратом null при timeout
        val resultOrNull = withTimeoutOrNull(1000) {
            slowOperation()
        }
        println("Result or null: $resultOrNull")
    }
}
```

### Создание собственных suspend функций
```kotlin
import kotlinx.coroutines.*
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

// Обертка для callback-based API
suspend fun fetchDataWithCallback(): String = suspendCoroutine { continuation ->
    // Симуляция callback API
    fetchDataAsync { result, error ->
        if (error != null) {
            continuation.resumeWithException(error)
        } else {
            continuation.resume(result)
        }
    }
}

// Симуляция callback API
fun fetchDataAsync(callback: (String?, Exception?) -> Unit) {
    // Симуляция асинхронной операции
    Thread {
        Thread.sleep(1000)
        if (Math.random() < 0.8) {
            callback("Data from callback", null)
        } else {
            callback(null, RuntimeException("Callback error"))
        }
    }.start()
}

// Использование
fun main() {
    runBlocking {
        try {
            val data = fetchDataWithCallback()
            println("Received: $data")
        } catch (e: Exception) {
            println("Error: ${e.message}")
        }
    }
}
```

[к оглавлению](#kotlin-core) 

## Что такое when expression?
**When expression** — это мощная конструкция в Kotlin, которая заменяет `switch` из Java и предоставляет более гибкие возможности для сопоставления с образцом.

```kotlin
// Простое when expression
fun describeNumber(x: Int): String {
    return when (x) {
        0 -> "Zero"
        1 -> "One"
        2, 3 -> "Two or Three"
        in 4..10 -> "Between 4 and 10"
        else -> "Something else"
    }
}

// When как выражение (возвращает значение)
fun getGrade(score: Int): String = when (score) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    in 70..79 -> "C"
    in 60..69 -> "D"
    else -> "F"
}

// When без аргумента (замена if-else цепочки)
fun checkConditions(x: Int, y: Int): String {
    return when {
        x > y -> "x is greater"
        x < y -> "y is greater"
        else -> "equal"
    }
}

fun main() {
    println(describeNumber(5))    // Between 4 and 10
    println(getGrade(85))         // B
    println(checkConditions(5, 3)) // x is greater
}
```

### When с типами и smart casts
```kotlin
// When с проверкой типов
fun processValue(value: Any): String {
    return when (value) {
        is String -> "String of length ${value.length}"
        is Int -> "Integer: ${value + 1}"
        is List<*> -> "List with ${value.size} elements"
        is Boolean -> if (value) "True" else "False"
        null -> "Null value"
        else -> "Unknown type: ${value::class.simpleName}"
    }
}

// When с sealed class
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

fun handleResult(result: Result<String>): String {
    return when (result) {
        is Result.Success -> "Got data: ${result.data}"
        is Result.Error -> "Error occurred: ${result.message}"
        Result.Loading -> "Loading..."
        // Нет необходимости в else - все случаи покрыты
    }
}

// When с enum
enum class Color { RED, GREEN, BLUE }

fun mixColors(color1: Color, color2: Color): String {
    return when (setOf(color1, color2)) {
        setOf(Color.RED, Color.GREEN) -> "Yellow"
        setOf(Color.RED, Color.BLUE) -> "Purple"
        setOf(Color.GREEN, Color.BLUE) -> "Cyan"
        else -> "Unknown combination"
    }
}
```

### Продвинутые возможности when
```kotlin
// When с условиями и функциями
fun processString(input: String): String {
    return when {
        input.isEmpty() -> "Empty string"
        input.isBlank() -> "Blank string"
        input.length < 5 -> "Short string: $input"
        input.startsWith("Hello") -> "Greeting: $input"
        input.contains("@") -> "Looks like email: $input"
        input.all { it.isDigit() } -> "Numeric string: $input"
        else -> "Regular string: $input"
    }
}

// When с деструктуризацией
data class Point(val x: Int, val y: Int)

fun classifyPoint(point: Point): String {
    return when (point) {
        Point(0, 0) -> "Origin"
        Point(0, _) -> "On Y-axis"
        Point(_, 0) -> "On X-axis"
        Point(x, y) if x == y -> "On diagonal (x=$x, y=$y)"
        Point(x, y) if x > 0 && y > 0 -> "First quadrant"
        else -> "Somewhere else"
    }
}

// When с множественными условиями
fun categorizeAge(age: Int): String {
    return when (age) {
        in 0..12 -> "Child"
        in 13..17 -> "Teenager" 
        in 18..64 -> when {
            age < 25 -> "Young adult"
            age < 40 -> "Adult"
            else -> "Middle-aged"
        }
        in 65..Int.MAX_VALUE -> "Senior"
        else -> "Invalid age"
    }
}

fun demonstrateAdvancedWhen() {
    println(processString("Hello, World!"))  // Greeting: Hello, World!
    println(processString("12345"))          // Numeric string: 12345
    
    println(classifyPoint(Point(0, 0)))      // Origin
    println(classifyPoint(Point(3, 3)))      // On diagonal (x=3, y=3)
    
    println(categorizeAge(22))               // Young adult
    println(categorizeAge(45))               // Middle-aged
}
```

[к оглавлению](#kotlin-core)

## Что такое destructuring declarations?
**Destructuring declarations** позволяют разбить объект на несколько переменных одним выражением.

```kotlin
// Destructuring с data class
data class Person(val name: String, val age: Int, val city: String)

fun demonstrateBasicDestructuring() {
    val person = Person("Alice", 25, "London")
    
    // Destructuring declaration
    val (name, age, city) = person
    println("Name: $name, Age: $age, City: $city")
    
    // Можно пропускать ненужные компоненты с помощью _
    val (personName, _, personCity) = person
    println("$personName lives in $personCity")
    
    // Destructuring в циклах
    val people = listOf(
        Person("Bob", 30, "Paris"),
        Person("Charlie", 35, "Tokyo")
    )
    
    for ((name, age) in people) {
        println("$name is $age years old")
    }
}
```

### Destructuring с коллекциями
```kotlin
fun demonstrateCollectionDestructuring() {
    // Destructuring с Pair и Triple
    val pair = Pair("Key", "Value")
    val (key, value) = pair
    println("$key -> $value")
    
    val triple = Triple("A", "B", "C")
    val (first, second, third) = triple
    println("$first, $second, $third")
    
    // Destructuring с Map entries
    val map = mapOf("apple" to 5, "banana" to 3, "orange" to 8)
    
    for ((fruit, quantity) in map) {
        println("$fruit: $quantity")
    }
    
    // Destructuring с List (только первые элементы)
    val numbers = listOf(1, 2, 3, 4, 5)
    val (first, second) = numbers
    println("First: $first, Second: $second")
    
    // Destructuring в lambda
    val keyValuePairs = listOf("a" to 1, "b" to 2, "c" to 3)
    keyValuePairs.forEach { (k, v) ->
        println("Key: $k, Value: $v")
    }
}
```

### Создание собственных destructuring классов
```kotlin
// Класс с componentN функциями
class Rectangle(val width: Int, val height: Int) {
    operator fun component1() = width
    operator fun component2() = height
    operator fun component3() = width * height // площадь
    operator fun component4() = 2 * (width + height) // периметр
}

// Extension функции для destructuring
operator fun <T> List<T>.component6(): T? = if (size >= 6) this[5] else null
operator fun <T> List<T>.component7(): T? = if (size >= 7) this[6] else null

fun demonstrateCustomDestructuring() {
    val rect = Rectangle(10, 20)
    val (width, height, area, perimeter) = rect
    println("Rectangle: ${width}x${height}, Area: $area, Perimeter: $perimeter")
    
    // Destructuring с extension функциями
    val longList = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    val (a, b, c, d, e, f, g) = longList
    println("Elements: $a, $b, $c, $d, $e, $f, $g")
}
```

### Destructuring в функциях
```kotlin
// Destructuring параметров функции
fun processPersonData(person: Person) {
    val (name, age, city) = person
    
    when {
        age < 18 -> println("$name is a minor from $city")
        age >= 65 -> println("$name is a senior from $city")
        else -> println("$name is an adult from $city")
    }
}

// Destructuring в lambda параметрах
fun processCoordinates() {
    val points = listOf(
        Point(1, 2),
        Point(3, 4),
        Point(5, 6)
    )
    
    // Destructuring в map
    val distances = points.map { (x, y) ->
        kotlin.math.sqrt((x * x + y * y).toDouble())
    }
    println("Distances from origin: $distances")
    
    // Destructuring в filter
    val positivePoints = points.filter { (x, y) ->
        x > 0 && y > 0
    }
    println("Positive points: $positivePoints")
}

// Возвращение нескольких значений
fun calculateStats(numbers: List<Int>): Triple<Int, Int, Double> {
    val min = numbers.minOrNull() ?: 0
    val max = numbers.maxOrNull() ?: 0
    val avg = numbers.average()
    return Triple(min, max, avg)
}

fun demonstrateFunctionDestructuring() {
    val numbers = listOf(1, 5, 3, 9, 2, 7)
    val (min, max, average) = calculateStats(numbers)
    println("Min: $min, Max: $max, Average: $average")
    
    processPersonData(Person("John", 30, "NYC"))
    processCoordinates()
}
```

### Destructuring с nullable объектами
```kotlin
fun safeDestructuring() {
    val nullablePerson: Person? = Person("Alice", 25, "London")
    
    // Безопасное destructuring с let
    nullablePerson?.let { (name, age, city) ->
        println("Safe destructuring: $name, $age, $city")
    }
    
    // Destructuring с elvis operator
    val (safeName, safeAge) = nullablePerson ?: Person("Unknown", 0, "Unknown")
    println("Safe values: $safeName, $safeAge")
    
    // Destructuring в when
    when (val person = nullablePerson) {
        null -> println("No person data")
        else -> {
            val (name, age, city) = person
            println("Person data: $name, $age, $city")
        }
    }
}
```

[к оглавлению](#kotlin-core) 