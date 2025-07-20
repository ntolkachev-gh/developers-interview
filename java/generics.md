[Вопросы для собеседования](README.md)

# Java Generics
+ [Что такое дженерики (Generics)?](#Что-такое-дженерики-generics)
+ [Зачем нужны дженерики?](#Зачем-нужны-дженерики)
+ [Что такое стирание типов (Type Erasure)?](#Что-такое-стирание-типов-type-erasure)
+ [Что такое параметр типа (Type Parameter)?](#Что-такое-параметр-типа-type-parameter)
+ [Что такое аргумент типа (Type Argument)?](#Что-такое-аргумент-типа-type-argument)
+ [В чем разница между параметром типа и аргументом типа?](#В-чем-разница-между-параметром-типа-и-аргументом-типа)
+ [Что такое raw type (сырой тип)?](#Что-такое-raw-type-сырой-тип)
+ [Что такое bounded type parameters (ограниченные параметры типа)?](#Что-такое-bounded-type-parameters-ограниченные-параметры-типа)
+ [В чем разница между `extends` и `super` в дженериках?](#В-чем-разница-между-extends-и-super-в-дженериках)
+ [Что такое wildcards (символы подстановки)?](#Что-такое-wildcards-символы-подстановки)
+ [Что такое PECS (Producer Extends Consumer Super)?](#Что-такое-pecs-producer-extends-consumer-super)
+ [Можно ли создать массив дженерик типа?](#Можно-ли-создать-массив-дженерик-типа)
+ [Можно ли создать экземпляр параметра типа?](#Можно-ли-создать-экземпляр-параметра-типа)
+ [Что такое дженерик методы?](#Что-такое-дженерик-методы)
+ [Что такое дженерик классы?](#Что-такое-дженерик-классы)
+ [Что такое дженерик интерфейсы?](#Что-такое-дженерик-интерфейсы)
+ [Можно ли использовать примитивные типы как аргументы типа?](#Можно-ли-использовать-примитивные-типы-как-аргументы-типа)
+ [Что такое type inference (вывод типа)?](#Что-такое-type-inference-вывод-типа)
+ [Что такое diamond operator?](#Что-такое-diamond-operator)
+ [Можно ли наследоваться от дженерик класса?](#Можно-ли-наследоваться-от-дженерик-класса)
+ [Что такое bridge methods?](#Что-такое-bridge-methods)
+ [Можно ли перегрузить метод, изменив только дженерик параметр?](#Можно-ли-перегрузить-метод-изменив-только-дженерик-параметр)
+ [Что такое heap pollution?](#Что-такое-heap-pollution)
+ [Что такое @SafeVarargs?](#Что-такое-safevarargs)
+ [Можно ли использовать дженерики с исключениями?](#Можно-ли-использовать-дженерики-с-исключениями)
+ [Что такое recursive type bounds?](#Что-такое-recursive-type-bounds)
+ [Как работают дженерики с наследованием?](#Как-работают-дженерики-с-наследованием)
+ [Что такое covariance и contravariance в дженериках?](#Что-такое-covariance-и-contravariance-в-дженериках)
+ [Можно ли создать статическое поле дженерик типа?](#Можно-ли-создать-статическое-поле-дженерик-типа)
+ [Что такое multiple bounds?](#Что-такое-multiple-bounds)
+ [Как получить информацию о дженерик типе во время выполнения?](#Как-получить-информацию-о-дженерик-типе-во-время-выполнения)

## Что такое дженерики (Generics)?
__Дженерики (Generics)__ — это механизм языка Java, который позволяет создавать классы, интерфейсы и методы, которые работают с различными типами данных, сохраняя при этом типобезопасность на этапе компиляции.

Дженерики позволяют параметризовать типы, то есть создавать обобщенные алгоритмы, которые могут работать с различными типами данных.

```java
// Без дженериков
List list = new ArrayList();
list.add("Hello");
list.add(42); // Можно добавить любой тип
String s = (String) list.get(0); // Нужно явное приведение типа

// С дженериками
List<String> list = new ArrayList<String>();
list.add("Hello");
// list.add(42); // Ошибка компиляции!
String s = list.get(0); // Нет необходимости в приведении типа
```

[к оглавлению](#java-generics)

## Зачем нужны дженерики?
Дженерики решают несколько важных проблем:

1. **Типобезопасность на этапе компиляции**
2. **Устранение явных приведений типов**
3. **Возможность создания обобщенных алгоритмов**
4. **Лучшая читаемость кода**

```java
// Проблемы без дженериков
List list = new ArrayList();
list.add("Hello");
list.add(42);

// Ошибка времени выполнения
for (Object obj : list) {
    String s = (String) obj; // ClassCastException для числа 42
}

// Решение с дженериками
List<String> stringList = new ArrayList<>();
stringList.add("Hello");
// stringList.add(42); // Ошибка компиляции

// Безопасный код
for (String s : stringList) {
    System.out.println(s.toUpperCase());
}
```

[к оглавлению](#java-generics)

## Что такое стирание типов (Type Erasure)?
__Стирание типов (Type Erasure)__ — это процесс, при котором компилятор Java удаляет всю информацию о дженериках после компиляции. Это обеспечивает совместимость с кодом, написанным до появления дженериков.

```java
// Исходный код
List<String> stringList = new ArrayList<String>();
List<Integer> intList = new ArrayList<Integer>();

// После стирания типов (байт-код)
List stringList = new ArrayList();
List intList = new ArrayList();

// Проверка типов
System.out.println(stringList.getClass() == intList.getClass()); // true

// Информация о дженериках недоступна во время выполнения
// System.out.println(stringList instanceof List<String>); // Ошибка компиляции
System.out.println(stringList instanceof List); // true
```

**Последствия стирания типов:**
- Нельзя создать массив дженерик типа
- Нельзя использовать `instanceof` с дженерик типами
- Нельзя создать экземпляр параметра типа
- Нельзя использовать дженерики в `catch` блоках

[к оглавлению](#java-generics)

## Что такое параметр типа (Type Parameter)?
__Параметр типа__ — это переменная, которая используется для обозначения типа в определении дженерик класса, интерфейса или метода.

```java
// T, E, K, V - параметры типа
public class Box<T> {
    private T value;
    
    public void set(T value) {
        this.value = value;
    }
    
    public T get() {
        return value;
    }
}

// Несколько параметров типа
public class Pair<T, U> {
    private T first;
    private U second;
    
    public Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }
    
    public T getFirst() { return first; }
    public U getSecond() { return second; }
}

// Общепринятые соглашения по именованию:
// T - Type (тип)
// E - Element (элемент)
// K - Key (ключ)
// V - Value (значение)
// N - Number (число)
// S, U, V - 2-й, 3-й, 4-й типы
```

[к оглавлению](#java-generics)

## Что такое аргумент типа (Type Argument)?
__Аргумент типа__ — это конкретный тип, который передается параметру типа при создании экземпляра дженерик класса.

```java
// String, Integer - аргументы типа
Box<String> stringBox = new Box<String>();
Box<Integer> intBox = new Box<Integer>();
Pair<String, Integer> pair = new Pair<String, Integer>("Hello", 42);

// Использование
stringBox.set("Hello World");
String value = stringBox.get(); // Нет необходимости в приведении типа

intBox.set(42);
Integer number = intBox.get();

// Можно использовать и сложные типы
List<List<String>> listOfLists = new ArrayList<>();
Map<String, List<Integer>> complexMap = new HashMap<>();
```

[к оглавлению](#java-generics)

## В чем разница между параметром типа и аргументом типа?
- **Параметр типа** — это переменная в определении дженерик класса/метода
- **Аргумент типа** — это конкретный тип, который подставляется вместо параметра

```java
// Определение класса - T является параметром типа
public class Container<T> {
    private T item;
    
    public void setItem(T item) {
        this.item = item;
    }
    
    public T getItem() {
        return item;
    }
}

// Использование класса - String является аргументом типа
Container<String> stringContainer = new Container<String>();
//        ^^^^^^^
//    аргумент типа

// Другой пример
public class KeyValuePair<K, V> {
//                       ^  ^
//                 параметры типа
    private K key;
    private V value;
    
    public KeyValuePair(K key, V value) {
        this.key = key;
        this.value = value;
    }
}

// Использование
KeyValuePair<String, Integer> pair = new KeyValuePair<>("age", 25);
//           ^^^^^^^  ^^^^^^^
//           аргументы типа
```

[к оглавлению](#java-generics)

## Что такое raw type (сырой тип)?
__Raw type__ — это дженерик класс или интерфейс, используемый без указания аргументов типа. Это сделано для обеспечения обратной совместимости с кодом, написанным до появления дженериков.

```java
// Raw type - использование без указания типа
List rawList = new ArrayList();
rawList.add("Hello");
rawList.add(42);
rawList.add(new Date());

// Parameterized type - с указанием типа
List<String> stringList = new ArrayList<String>();

// Проблемы с raw types
List<String> strings = new ArrayList<>();
List rawList2 = strings; // Можно присвоить
rawList2.add(42); // Компилятор не проверяет тип!

// Во время выполнения может возникнуть ClassCastException
for (String s : strings) {
    System.out.println(s); // ClassCastException на числе 42
}

// Предупреждения компилятора
List rawList3 = new ArrayList(); // Unchecked assignment
rawList3.add("test"); // Unchecked call to add()
```

**Проблемы raw types:**
- Отсутствие проверки типов на этапе компиляции
- Необходимость явного приведения типов
- Возможность получения `ClassCastException` во время выполнения

[к оглавлению](#java-generics)

## Что такое bounded type parameters (ограниченные параметры типа)?
__Bounded type parameters__ позволяют ограничить типы, которые могут быть использованы в качестве аргументов типа.

```java
// Верхняя граница (upper bound) - extends
public class NumberBox<T extends Number> {
    private T value;
    
    public void setValue(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
    
    // Можем вызывать методы класса Number
    public double getDoubleValue() {
        return value.doubleValue();
    }
}

// Использование
NumberBox<Integer> intBox = new NumberBox<>();
NumberBox<Double> doubleBox = new NumberBox<>();
// NumberBox<String> stringBox = new NumberBox<>(); // Ошибка компиляции!

// Множественные границы
public class MultipleBounder<T extends Number & Comparable<T>> {
    public T min(T a, T b) {
        return a.compareTo(b) < 0 ? a : b; // Можем использовать compareTo
    }
    
    public double getDouble(T value) {
        return value.doubleValue(); // Можем использовать методы Number
    }
}

// Пример с интерфейсами
public interface Drawable {
    void draw();
}

public interface Resizable {
    void resize(int width, int height);
}

public class GraphicsComponent<T extends Drawable & Resizable> {
    private T component;
    
    public void processComponent(T comp) {
        comp.draw();    // Можем вызывать методы Drawable
        comp.resize(100, 100); // Можем вызывать методы Resizable
    }
}
```

[к оглавлению](#java-generics)

## В чем разница между `extends` и `super` в дженериках?
- **`extends`** — устанавливает верхнюю границу (upper bound)
- **`super`** — устанавливает нижнюю границу (lower bound)

```java
// extends - "T является подтипом Number"
public class UpperBounded<T extends Number> {
    private T value;
    
    public void setValue(T value) {
        this.value = value;
        // Можем вызывать методы Number
        double d = value.doubleValue();
    }
}

// Использование с wildcards
List<? extends Number> numbers = new ArrayList<Integer>();
numbers = new ArrayList<Double>();
numbers = new ArrayList<Float>();

// Можем читать как Number
Number num = numbers.get(0);
// Но не можем добавлять (кроме null)
// numbers.add(42); // Ошибка компиляции!
numbers.add(null); // Только null разрешен

// super - "T является супертипом Integer"
List<? super Integer> integers = new ArrayList<Number>();
integers = new ArrayList<Object>();

// Можем добавлять Integer и его подтипы
integers.add(42);
integers.add(new Integer(100));
// Но можем читать только как Object
Object obj = integers.get(0);
// Integer i = integers.get(0); // Ошибка компиляции!

// Практический пример
public static void copy(List<? super Integer> dest, List<? extends Integer> src) {
    for (Integer item : src) {
        dest.add(item);
    }
}
```

[к оглавлению](#java-generics)

## Что такое wildcards (символы подстановки)?
__Wildcards__ — это символы `?`, которые используются для обозначения неизвестного типа в дженериках.

```java
// Unbounded wildcard - любой тип
List<?> unknownList = new ArrayList<String>();
unknownList = new ArrayList<Integer>();
unknownList = new ArrayList<Date>();

// Можем читать только как Object
Object obj = unknownList.get(0);
// Не можем добавлять (кроме null)
// unknownList.add("test"); // Ошибка компиляции!

// Upper bounded wildcard - ? extends Type
List<? extends Number> numbers = new ArrayList<Integer>();
numbers = new ArrayList<Double>();

// Можем читать как Number
Number num = numbers.get(0);
// Не можем добавлять
// numbers.add(42); // Ошибка компиляции!

// Lower bounded wildcard - ? super Type
List<? super Integer> integers = new ArrayList<Number>();
integers = new ArrayList<Object>();

// Можем добавлять Integer и его подтипы
integers.add(42);
// Можем читать только как Object
Object obj2 = integers.get(0);

// Практические примеры
public static void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

public static double sumNumbers(List<? extends Number> numbers) {
    double sum = 0.0;
    for (Number num : numbers) {
        sum += num.doubleValue();
    }
    return sum;
}

public static void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}
```

[к оглавлению](#java-generics)

## Что такое PECS (Producer Extends Consumer Super)?
__PECS__ — это мнемоническое правило для запоминания, когда использовать `extends` и `super`:
- **Producer Extends** — если коллекция производит (отдает) элементы, используйте `extends`
- **Consumer Super** — если коллекция потребляет (принимает) элементы, используйте `super`

```java
// Producer Extends - коллекция отдает элементы
public static double sum(List<? extends Number> numbers) {
    double sum = 0.0;
    for (Number num : numbers) { // Читаем из коллекции (producer)
        sum += num.doubleValue();
    }
    return sum;
}

// Consumer Super - коллекция принимает элементы
public static void addIntegers(List<? super Integer> list) {
    list.add(1);  // Записываем в коллекцию (consumer)
    list.add(2);
    list.add(3);
}

// Пример из Collections.copy()
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    //                           ^^^^^^^^^           ^^^^^^^^^^^^
    //                          Consumer            Producer
    for (T item : src) {    // Читаем из src (producer)
        dest.add(item);     // Записываем в dest (consumer)
    }
}

// Использование
List<Number> numbers = Arrays.asList(1, 2.5, 3);
double total = sum(numbers); // numbers - producer

List<Object> objects = new ArrayList<>();
addIntegers(objects); // objects - consumer

List<Integer> source = Arrays.asList(1, 2, 3);
List<Number> destination = new ArrayList<>();
copy(destination, source); // destination - consumer, source - producer

// Неправильное использование
// public static void wrongMethod(List<? extends Number> list) {
//     list.add(42); // Ошибка! Нельзя добавлять в producer
// }

// public static Number wrongMethod2(List<? super Integer> list) {
//     return list.get(0); // Ошибка! Можем читать только как Object
// }
```

[к оглавлению](#java-generics)

## Можно ли создать массив дженерик типа?
Нет, нельзя создать массив дженерик типа из-за стирания типов и того, как массивы работают в Java.

```java
// Ошибки компиляции
// List<String>[] stringLists = new List<String>[10]; // Ошибка!
// List<Integer>[] intLists = new List<Integer>[10];   // Ошибка!

// Можно создать массив raw типа
List[] rawLists = new List[10];
rawLists[0] = new ArrayList<String>();
rawLists[1] = new ArrayList<Integer>();

// Можно использовать wildcards
List<?>[] wildcardLists = new List<?>[10];
wildcardLists[0] = new ArrayList<String>();
wildcardLists[1] = new ArrayList<Integer>();

// Альтернативы
// 1. Использовать коллекции вместо массивов
List<List<String>> listOfLists = new ArrayList<>();

// 2. Использовать @SuppressWarnings (не рекомендуется)
@SuppressWarnings("unchecked")
List<String>[] stringLists = (List<String>[]) new List[10];

// 3. Создать обертку
public class GenericArray<T> {
    private Object[] array;
    
    public GenericArray(int size) {
        array = new Object[size];
    }
    
    @SuppressWarnings("unchecked")
    public T get(int index) {
        return (T) array[index];
    }
    
    public void set(int index, T value) {
        array[index] = value;
    }
}

// Почему нельзя создать массив дженерик типа?
// Массивы знают свой тип во время выполнения (reified)
// Дженерики стираются во время компиляции (erased)
// Это может привести к нарушению типобезопасности

// Пример проблемы (если бы это было возможно)
// List<String>[] stringLists = new List<String>[2];
// Object[] objects = stringLists; // Массивы ковариантны
// objects[0] = new ArrayList<Integer>(); // Можно добавить List<Integer>
// List<String> list = stringLists[0]; // Получаем List<Integer> как List<String>
// String s = list.get(0); // ClassCastException!
```

[к оглавлению](#java-generics)

## Можно ли создать экземпляр параметра типа?
Нет, нельзя создать экземпляр параметра типа из-за стирания типов.

```java
public class GenericClass<T> {
    // Ошибка компиляции!
    // public T createInstance() {
    //     return new T(); // Нельзя!
    // }
    
    // Ошибка компиляции!
    // public T[] createArray(int size) {
    //     return new T[size]; // Нельзя!
    // }
    
    // Альтернативы:
    
    // 1. Передать Class<T>
    private Class<T> clazz;
    
    public GenericClass(Class<T> clazz) {
        this.clazz = clazz;
    }
    
    public T createInstance() throws InstantiationException, IllegalAccessException {
        return clazz.newInstance();
    }
    
    @SuppressWarnings("unchecked")
    public T[] createArray(int size) {
        return (T[]) Array.newInstance(clazz, size);
    }
}

// Использование
GenericClass<String> stringClass = new GenericClass<>(String.class);
String instance = stringClass.createInstance();
String[] array = stringClass.createArray(10);

// 2. Использовать Supplier<T>
public class GenericFactory<T> {
    private Supplier<T> supplier;
    
    public GenericFactory(Supplier<T> supplier) {
        this.supplier = supplier;
    }
    
    public T createInstance() {
        return supplier.get();
    }
}

// Использование
GenericFactory<StringBuilder> factory = new GenericFactory<>(StringBuilder::new);
StringBuilder sb = factory.createInstance();

// 3. Использовать фабричный метод
public class GenericContainer<T> {
    private T item;
    
    public static <T> GenericContainer<T> create(T item) {
        GenericContainer<T> container = new GenericContainer<>();
        container.item = item;
        return container;
    }
    
    public T getItem() {
        return item;
    }
}

// Использование
GenericContainer<String> container = GenericContainer.create("Hello");
```

[к оглавлению](#java-generics)

## Что такое дженерик методы?
__Дженерик методы__ — это методы, которые имеют свои собственные параметры типа, независимые от параметров типа класса.

```java
public class Utility {
    // Дженерик метод в обычном классе
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // Дженерик метод с bounded parameter
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }
    
    // Дженерик метод с несколькими параметрами типа
    public static <T, U> Pair<T, U> makePair(T first, U second) {
        return new Pair<>(first, second);
    }
    
    // Дженерик метод с wildcard
    public static void printList(List<?> list) {
        for (Object item : list) {
            System.out.println(item);
        }
    }
}

// Использование
String[] strings = {"hello", "world", "java"};
Utility.swap(strings, 0, 2); // Тип выводится автоматически

Integer maxInt = Utility.max(10, 20);
String maxString = Utility.max("apple", "banana");

Pair<String, Integer> pair = Utility.makePair("age", 25);

// Дженерик метод в дженерик классе
public class GenericClass<T> {
    private T value;
    
    // Обычный метод, использующий параметр типа класса
    public void setValue(T value) {
        this.value = value;
    }
    
    // Дженерик метод с собственным параметром типа
    public <U> U convert(Function<T, U> converter) {
        return converter.apply(value);
    }
    
    // Дженерик метод может скрывать параметр типа класса
    public <T> T process(T input) {
        // Здесь T относится к методу, а не к классу!
        return input;
    }
}

// Использование
GenericClass<String> stringClass = new GenericClass<>();
stringClass.setValue("123");

// Вызов дженерик метода
Integer length = stringClass.convert(String::length);
Boolean isEmpty = stringClass.convert(String::isEmpty);

// Явное указание типа (редко нужно)
Integer result = stringClass.<Integer>convert(Integer::parseInt);
```

[к оглавлению](#java-generics)

## Что такое дженерик классы?
__Дженерик классы__ — это классы, которые параметризованы одним или несколькими типами.

```java
// Простой дженерик класс
public class Box<T> {
    private T content;
    
    public void setContent(T content) {
        this.content = content;
    }
    
    public T getContent() {
        return content;
    }
    
    public boolean isEmpty() {
        return content == null;
    }
}

// Дженерик класс с несколькими параметрами типа
public class Pair<T, U> {
    private T first;
    private U second;
    
    public Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }
    
    public T getFirst() { return first; }
    public U getSecond() { return second; }
    
    public void setFirst(T first) { this.first = first; }
    public void setSecond(U second) { this.second = second; }
    
    @Override
    public String toString() {
        return "(" + first + ", " + second + ")";
    }
}

// Дженерик класс с bounded parameters
public class NumberContainer<T extends Number> {
    private T value;
    
    public NumberContainer(T value) {
        this.value = value;
    }
    
    public T getValue() {
        return value;
    }
    
    // Можем использовать методы Number
    public double getDoubleValue() {
        return value.doubleValue();
    }
    
    public boolean isPositive() {
        return value.doubleValue() > 0;
    }
}

// Дженерик класс с множественными ограничениями
public class SortedContainer<T extends Comparable<T> & Serializable> {
    private List<T> items = new ArrayList<>();
    
    public void add(T item) {
        items.add(item);
        Collections.sort(items); // Можем сортировать благодаря Comparable
    }
    
    public List<T> getItems() {
        return new ArrayList<>(items);
    }
    
    // Можем сериализовать благодаря Serializable
    public void saveToFile(String filename) throws IOException {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filename))) {
            oos.writeObject(items);
        }
    }
}

// Использование
Box<String> stringBox = new Box<>();
stringBox.setContent("Hello");
String content = stringBox.getContent();

Box<Integer> intBox = new Box<>();
intBox.setContent(42);
Integer number = intBox.getContent();

Pair<String, Integer> nameAge = new Pair<>("John", 25);
String name = nameAge.getFirst();
Integer age = nameAge.getSecond();

NumberContainer<Double> doubleContainer = new NumberContainer<>(3.14);
double value = doubleContainer.getDoubleValue();

SortedContainer<String> sortedStrings = new SortedContainer<>();
sortedStrings.add("banana");
sortedStrings.add("apple");
sortedStrings.add("cherry");
// Элементы автоматически отсортированы: [apple, banana, cherry]
```

[к оглавлению](#java-generics)

## Что такое дженерик интерфейсы?
__Дженерик интерфейсы__ — это интерфейсы, которые параметризованы одним или несколькими типами.

```java
// Простой дженерик интерфейс
public interface Container<T> {
    void put(T item);
    T get();
    boolean isEmpty();
    int size();
}

// Реализация дженерик интерфейса
public class ListContainer<T> implements Container<T> {
    private List<T> items = new ArrayList<>();
    
    @Override
    public void put(T item) {
        items.add(item);
    }
    
    @Override
    public T get() {
        return items.isEmpty() ? null : items.get(0);
    }
    
    @Override
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    @Override
    public int size() {
        return items.size();
    }
}

// Дженерик интерфейс с несколькими параметрами типа
public interface Converter<T, U> {
    U convert(T input);
}

// Реализации
public class StringToIntegerConverter implements Converter<String, Integer> {
    @Override
    public Integer convert(String input) {
        return Integer.parseInt(input);
    }
}

public class IntegerToStringConverter implements Converter<Integer, String> {
    @Override
    public String convert(Integer input) {
        return input.toString();
    }
}

// Дженерик интерфейс с bounded parameters
public interface Processor<T extends Number> {
    T process(T input);
    double getDoubleValue(T input);
}

public class NumberProcessor implements Processor<Double> {
    @Override
    public Double process(Double input) {
        return input * 2;
    }
    
    @Override
    public double getDoubleValue(Double input) {
        return input;
    }
}

// Функциональный дженерик интерфейс
@FunctionalInterface
public interface Transformer<T, R> {
    R transform(T input);
    
    // Дефолтный метод
    default <U> Transformer<T, U> andThen(Transformer<R, U> after) {
        return input -> after.transform(this.transform(input));
    }
}

// Использование
Container<String> stringContainer = new ListContainer<>();
stringContainer.put("Hello");
stringContainer.put("World");
String first = stringContainer.get();

Converter<String, Integer> stringToInt = new StringToIntegerConverter();
Integer result = stringToInt.convert("123");

Processor<Double> processor = new NumberProcessor();
Double processed = processor.process(3.14);

// Использование с лямбдами
Transformer<String, Integer> lengthTransformer = String::length;
Transformer<Integer, String> toString = Object::toString;

Transformer<String, String> combined = lengthTransformer.andThen(toString);
String result2 = combined.transform("Hello"); // "5"

// Наследование дженерик интерфейсов
public interface SpecialContainer<T> extends Container<T> {
    void clear();
    T peek();
}

public class StackContainer<T> implements SpecialContainer<T> {
    private Stack<T> stack = new Stack<>();
    
    @Override
    public void put(T item) {
        stack.push(item);
    }
    
    @Override
    public T get() {
        return stack.isEmpty() ? null : stack.pop();
    }
    
    @Override
    public boolean isEmpty() {
        return stack.isEmpty();
    }
    
    @Override
    public int size() {
        return stack.size();
    }
    
    @Override
    public void clear() {
        stack.clear();
    }
    
    @Override
    public T peek() {
        return stack.isEmpty() ? null : stack.peek();
    }
}
```

[к оглавлению](#java-generics) 

## Можно ли использовать примитивные типы как аргументы типа?
Нет, нельзя использовать примитивные типы как аргументы типа. Можно использовать только ссылочные типы.

```java
// Ошибки компиляции
// List<int> intList = new ArrayList<int>();     // Ошибка!
// Map<double, float> map = new HashMap<>();     // Ошибка!
// Box<boolean> boolBox = new Box<>();           // Ошибка!

// Правильно - использовать wrapper классы
List<Integer> intList = new ArrayList<Integer>();
Map<Double, Float> map = new HashMap<>();
Box<Boolean> boolBox = new Box<>();

// Автоупаковка и распаковка работают автоматически
intList.add(42);        // autoboxing: int -> Integer
int value = intList.get(0); // unboxing: Integer -> int

// Пример с различными wrapper типами
List<Byte> byteList = new ArrayList<>();
List<Short> shortList = new ArrayList<>();
List<Long> longList = new ArrayList<>();
List<Character> charList = new ArrayList<>();

// Добавление примитивов (автоупаковка)
byteList.add((byte) 10);
shortList.add((short) 100);
longList.add(1000L);
charList.add('A');

// Извлечение как примитивов (распаковка)
byte b = byteList.get(0);
short s = shortList.get(0);
long l = longList.get(0);
char c = charList.get(0);

// Осторожно с null!
List<Integer> nullableInts = new ArrayList<>();
nullableInts.add(null);
// Integer nullInt = nullableInts.get(0); // null
// int primitive = nullableInts.get(0);   // NullPointerException!
```

[к оглавлению](#java-generics)

## Что такое type inference (вывод типа)?
__Type inference__ — это способность компилятора автоматически определять типы на основе контекста.

```java
// До Java 7 - нужно было указывать тип дважды
List<String> strings = new ArrayList<String>();
Map<String, Integer> map = new HashMap<String, Integer>();

// Java 7+ - diamond operator
List<String> strings = new ArrayList<>();
Map<String, Integer> map = new HashMap<>();

// Вывод типа в методах
public static <T> List<T> createList(T... items) {
    return Arrays.asList(items);
}

// Компилятор выводит тип автоматически
List<String> stringList = createList("a", "b", "c");    // T = String
List<Integer> intList = createList(1, 2, 3);            // T = Integer
List<Number> numberList = createList(1, 2.5, 3L);       // T = Number

// Вывод типа с var (Java 10+)
var list = new ArrayList<String>();        // ArrayList<String>
var map = new HashMap<String, Integer>();  // HashMap<String, Integer>
var set = Set.of("a", "b", "c");          // Set<String>

// Сложный пример вывода типа
public static <T> T process(T input, Function<T, T> processor) {
    return processor.apply(input);
}

// Компилятор выводит все типы
String result = process("hello", s -> s.toUpperCase()); // T = String
Integer doubled = process(5, x -> x * 2);               // T = Integer

// Вывод типа в лямбдах
List<String> strings = Arrays.asList("apple", "banana", "cherry");
strings.stream()
       .filter(s -> s.length() > 5)    // s выводится как String
       .map(String::toUpperCase)       // результат String
       .forEach(System.out::println);  // параметр String

// Когда вывод типа не работает
List<String> list1 = new ArrayList<>(); // OK
// var list2 = new ArrayList<>();       // Ошибка! Нужно указать тип
var list3 = new ArrayList<String>();   // OK

// Явное указание типа при необходимости
List<String> result2 = Collections.<String>emptyList();
```

[к оглавлению](#java-generics)

## Что такое diamond operator?
__Diamond operator__ (`<>`) — это синтаксический сахар, введенный в Java 7, который позволяет не повторять аргументы типа при создании экземпляров дженерик классов.

```java
// До Java 7 - нужно было повторять типы
List<String> strings = new ArrayList<String>();
Map<String, List<Integer>> complexMap = new HashMap<String, List<Integer>>();

// Java 7+ - diamond operator
List<String> strings = new ArrayList<>();
Map<String, List<Integer>> complexMap = new HashMap<>();

// Работает с любыми дженерик классами
Set<Integer> numbers = new HashSet<>();
Queue<String> queue = new LinkedList<>();
Deque<Double> deque = new ArrayDeque<>();

// Вложенные дженерики
List<List<String>> listOfLists = new ArrayList<>();
Map<String, Set<Integer>> mapOfSets = new HashMap<>();

// С bounded wildcards
List<? extends Number> numbers = new ArrayList<>();
Map<String, ? super Integer> map = new HashMap<>();

// В методах
public void processData() {
    List<String> data = new ArrayList<>();
    data.add("item1");
    data.add("item2");
    
    Map<String, Integer> counts = new HashMap<>();
    counts.put("item1", 1);
    counts.put("item2", 2);
}

// Diamond operator с анонимными классами (Java 9+)
List<String> list = new ArrayList<>() {
    {
        add("initial");
    }
};

// Не работает с анонимными классами в Java 7-8
// List<String> list = new ArrayList<>() { // Ошибка в Java 7-8
//     @Override
//     public boolean add(String s) {
//         return super.add(s.toUpperCase());
//     }
// };

// Правильно для Java 7-8
List<String> list2 = new ArrayList<String>() {
    @Override
    public boolean add(String s) {
        return super.add(s.toUpperCase());
    }
};

// Ограничения diamond operator
// Нельзя использовать с примитивными типами
// List<int> list = new ArrayList<>(); // Ошибка!

// Нельзя использовать в правой части без левой
// var list = new ArrayList<>(); // Ошибка! Нужно указать тип
```

[к оглавлению](#java-generics)

## Можно ли наследоваться от дженерик класса?
Да, можно наследоваться от дженерик класса несколькими способами.

```java
// Базовый дженерик класс
public class Container<T> {
    protected T item;
    
    public void setItem(T item) {
        this.item = item;
    }
    
    public T getItem() {
        return item;
    }
}

// 1. Наследование с указанием конкретного типа
public class StringContainer extends Container<String> {
    public void setUpperCase(String value) {
        setItem(value.toUpperCase());
    }
    
    public int getLength() {
        return getItem() != null ? getItem().length() : 0;
    }
}

// 2. Наследование с сохранением дженерика
public class ExtendedContainer<T> extends Container<T> {
    private String description;
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void printInfo() {
        System.out.println("Description: " + description + ", Item: " + getItem());
    }
}

// 3. Наследование с добавлением новых параметров типа
public class PairContainer<T, U> extends Container<T> {
    private U secondItem;
    
    public void setSecondItem(U secondItem) {
        this.secondItem = secondItem;
    }
    
    public U getSecondItem() {
        return secondItem;
    }
}

// 4. Наследование с bounded parameters
public class NumberContainer<T extends Number> extends Container<T> {
    public double getDoubleValue() {
        return getItem() != null ? getItem().doubleValue() : 0.0;
    }
    
    public boolean isPositive() {
        return getDoubleValue() > 0;
    }
}

// 5. Наследование от дженерик класса с wildcards
public class WildcardContainer extends Container<? extends Number> {
    // Ограничения: можем читать, но не можем записывать
    public double getAsDouble() {
        Number number = getItem();
        return number != null ? number.doubleValue() : 0.0;
    }
    
    // Нельзя переопределить setItem с более узким типом
    // public void setItem(Integer item) { } // Ошибка!
}

// Использование
StringContainer stringContainer = new StringContainer();
stringContainer.setItem("hello");
stringContainer.setUpperCase("world");
System.out.println(stringContainer.getLength()); // 5

ExtendedContainer<Integer> intContainer = new ExtendedContainer<>();
intContainer.setItem(42);
intContainer.setDescription("Number container");
intContainer.printInfo();

PairContainer<String, Integer> pairContainer = new PairContainer<>();
pairContainer.setItem("age");
pairContainer.setSecondItem(25);

NumberContainer<Double> doubleContainer = new NumberContainer<>();
doubleContainer.setItem(3.14);
System.out.println(doubleContainer.isPositive()); // true

// Наследование от дженерик интерфейса
public interface Processor<T> {
    T process(T input);
}

// Конкретная реализация
public class StringProcessor implements Processor<String> {
    @Override
    public String process(String input) {
        return input.toUpperCase();
    }
}

// Дженерик реализация
public class GenericProcessor<T> implements Processor<T> {
    private Function<T, T> function;
    
    public GenericProcessor(Function<T, T> function) {
        this.function = function;
    }
    
    @Override
    public T process(T input) {
        return function.apply(input);
    }
}
```

[к оглавлению](#java-generics)

## Что такое bridge methods?
__Bridge methods__ — это синтетические методы, которые создает компилятор для обеспечения совместимости с стиранием типов при наследовании дженерик классов.

```java
// Базовый дженерик класс
public class Node<T> {
    public T data;
    
    public Node(T data) {
        this.data = data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public T getData() {
        return data;
    }
}

// Наследник с конкретным типом
public class StringNode extends Node<String> {
    public StringNode(String data) {
        super(data);
    }
    
    // Переопределяем метод с конкретным типом
    @Override
    public void setData(String data) {
        super.setData(data.toUpperCase());
    }
    
    @Override
    public String getData() {
        return super.getData();
    }
}

// После компиляции и стирания типов Node<T> становится:
// public class Node {
//     public Object data;
//     public void setData(Object data) { ... }
//     public Object getData() { ... }
// }

// StringNode должен переопределить методы с Object, но у нас методы со String
// Компилятор создает bridge methods:
// public class StringNode extends Node {
//     // Наш метод
//     public void setData(String data) { ... }
//     
//     // Bridge method (синтетический)
//     public void setData(Object data) {
//         setData((String) data);
//     }
//     
//     // Наш метод
//     public String getData() { ... }
//     
//     // Bridge method (синтетический)
//     public Object getData() {
//         return getData();
//     }
// }

// Пример с более сложной иерархией
public interface Comparable<T> {
    int compareTo(T other);
}

public class Person implements Comparable<Person> {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
}

// После стирания типов Comparable становится:
// public interface Comparable {
//     int compareTo(Object other);
// }

// Компилятор создает bridge method в Person:
// public class Person implements Comparable {
//     // Наш метод
//     public int compareTo(Person other) { ... }
//     
//     // Bridge method
//     public int compareTo(Object other) {
//         return compareTo((Person) other);
//     }
// }

// Как увидеть bridge methods через рефлексию
public class BridgeMethodExample {
    public static void main(String[] args) {
        Method[] methods = StringNode.class.getDeclaredMethods();
        
        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
            System.out.println("Parameters: " + Arrays.toString(method.getParameterTypes()));
            System.out.println("Is bridge: " + method.isBridge());
            System.out.println("Is synthetic: " + method.isSynthetic());
            System.out.println("---");
        }
    }
}

// Вывод будет примерно такой:
// Method: setData
// Parameters: [class java.lang.String]
// Is bridge: false
// Is synthetic: false
// ---
// Method: setData
// Parameters: [class java.lang.Object]
// Is bridge: true
// Is synthetic: true
// ---
// Method: getData
// Parameters: []
// Is bridge: false
// Is synthetic: false
// ---
// Method: getData
// Parameters: []
// Is bridge: true
// Is synthetic: true

// Bridge methods также создаются при ковариантных возвращаемых типах
public class Animal {
    public Animal reproduce() {
        return new Animal();
    }
}

public class Cat extends Animal {
    @Override
    public Cat reproduce() {  // Ковариантный возвращаемый тип
        return new Cat();
    }
    
    // Компилятор создает bridge method:
    // public Animal reproduce() {
    //     return reproduce();
    // }
}
```

[к оглавлению](#java-generics)

## Можно ли перегрузить метод, изменив только дженерик параметр?
Нет, нельзя перегрузить метод, изменив только дженерик параметр, из-за стирания типов.

```java
public class OverloadExample {
    // Ошибка компиляции! После стирания типов оба метода имеют одинаковую сигнатуру
    // public void process(List<String> list) { ... }
    // public void process(List<Integer> list) { ... }
    
    // После стирания типов оба метода становятся:
    // public void process(List list) { ... }
    
    // Правильные способы перегрузки:
    
    // 1. Разные имена методов
    public void processStrings(List<String> strings) {
        for (String s : strings) {
            System.out.println(s.toUpperCase());
        }
    }
    
    public void processIntegers(List<Integer> integers) {
        for (Integer i : integers) {
            System.out.println(i * 2);
        }
    }
    
    // 2. Разные типы параметров (не только дженерики)
    public void process(List<String> list) {
        System.out.println("Processing list of strings");
    }
    
    public void process(Set<String> set) {
        System.out.println("Processing set of strings");
    }
    
    public void process(String[] array) {
        System.out.println("Processing array of strings");
    }
    
    // 3. Разное количество параметров
    public void process(List<String> list, boolean flag) {
        System.out.println("Processing with flag: " + flag);
    }
    
    // 4. Использование bounded wildcards (но осторожно!)
    public void process(List<? extends Number> numbers) {
        System.out.println("Processing numbers");
    }
    
    public void process(List<? extends String> strings) {
        System.out.println("Processing strings");
    }
    
    // Но это тоже может вызвать проблемы:
    // List<Integer> ints = Arrays.asList(1, 2, 3);
    // List<String> strings = Arrays.asList("a", "b", "c");
    // process(ints);    // Вызовет первый метод
    // process(strings); // Вызовет второй метод
    // 
    // List rawList = new ArrayList();
    // process(rawList); // Неоднозначность! Ошибка компиляции
}

// Проблемы с массивами дженерик типов
public class ArrayExample {
    // Эти методы МОГУТ сосуществовать, но это плохая практика
    public void process(List<String>[] arrays) {
        System.out.println("Processing string arrays");
    }
    
    public void process(List<Integer>[] arrays) {
        System.out.println("Processing integer arrays");
    }
    
    // Но создать такие массивы нельзя!
    public void test() {
        // List<String>[] stringArrays = new List<String>[10]; // Ошибка!
        // List<Integer>[] intArrays = new List<Integer>[10];   // Ошибка!
    }
}

// Альтернативные подходы
public class AlternativeApproaches {
    // 1. Использование Class<T> для различения типов
    public <T> void process(List<T> list, Class<T> clazz) {
        if (clazz == String.class) {
            System.out.println("Processing strings");
        } else if (clazz == Integer.class) {
            System.out.println("Processing integers");
        }
    }
    
    // 2. Использование enum для различения типов
    public enum ProcessType {
        STRING, INTEGER, DOUBLE
    }
    
    public <T> void process(List<T> list, ProcessType type) {
        switch (type) {
            case STRING:
                System.out.println("Processing strings");
                break;
            case INTEGER:
                System.out.println("Processing integers");
                break;
            case DOUBLE:
                System.out.println("Processing doubles");
                break;
        }
    }
    
    // 3. Использование функциональных интерфейсов
    public <T> void process(List<T> list, Consumer<T> processor) {
        list.forEach(processor);
    }
    
    // Использование
    public void example() {
        List<String> strings = Arrays.asList("a", "b", "c");
        List<Integer> integers = Arrays.asList(1, 2, 3);
        
        // Подход 1
        process(strings, String.class);
        process(integers, Integer.class);
        
        // Подход 2
        process(strings, ProcessType.STRING);
        process(integers, ProcessType.INTEGER);
        
        // Подход 3
        process(strings, System.out::println);
        process(integers, x -> System.out.println(x * 2));
    }
}
```

[к оглавлению](#java-generics)

## Что такое heap pollution?
__Heap pollution__ — это ситуация, когда переменная параметризованного типа ссылается на объект, который не является экземпляром этого параметризованного типа.

```java
public class HeapPollutionExample {
    
    // Пример heap pollution с varargs
    @SafeVarargs
    public static <T> void addToList(List<T> list, T... elements) {
        for (T element : elements) {
            list.add(element);
        }
    }
    
    // Небезопасный метод, который может вызвать heap pollution
    public static void unsafeMethod(List<String>... lists) {
        // Компилятор выдает предупреждение: "Potential heap pollution"
        Object[] objects = lists;  // Массивы ковариантны
        objects[0] = Arrays.asList(42); // Добавляем List<Integer> в массив List<String>[]
        
        // Теперь lists[0] указывает на List<Integer>, но тип переменной List<String>
        String s = lists[0].get(0); // ClassCastException во время выполнения!
    }
    
    // Пример с raw types
    public static void rawTypeExample() {
        List<String> stringList = new ArrayList<>();
        stringList.add("Hello");
        
        // Используем raw type - это может вызвать heap pollution
        List rawList = stringList;
        rawList.add(42); // Добавляем Integer в List<String>
        
        // Теперь stringList содержит String и Integer
        // String s = stringList.get(1); // ClassCastException!
    }
    
    // Пример с неправильным приведением типов
    public static void unsafeCastExample() {
        List<Integer> intList = Arrays.asList(1, 2, 3);
        
        // Небезопасное приведение типов
        @SuppressWarnings("unchecked")
        List<String> stringList = (List<String>) (List<?>) intList;
        
        // Heap pollution: stringList указывает на List<Integer>
        // String s = stringList.get(0); // ClassCastException!
    }
    
    // Безопасный способ работы с varargs
    @SafeVarargs
    public static <T> List<T> safeVarargs(T... elements) {
        List<T> result = new ArrayList<>();
        for (T element : elements) {
            result.add(element);
        }
        return result;
    }
    
    // Небезопасный способ - может вызвать heap pollution
    public static <T> T[] unsafeVarargs(T... elements) {
        return elements; // Возвращаем массив, который может быть изменен
    }
    
    public static void main(String[] args) {
        // Безопасное использование
        List<String> strings = safeVarargs("a", "b", "c");
        System.out.println(strings);
        
        // Небезопасное использование
        try {
            String[] stringArray = unsafeVarargs("a", "b", "c");
            Object[] objects = stringArray;
            objects[0] = 42; // Heap pollution!
            String s = stringArray[0]; // ClassCastException!
        } catch (ClassCastException e) {
            System.out.println("ClassCastException: " + e.getMessage());
        }
        
        // Пример с коллекциями
        List<List<String>> listOfLists = new ArrayList<>();
        listOfLists.add(Arrays.asList("hello", "world"));
        
        // Небезопасное приведение
        @SuppressWarnings("unchecked")
        List<Object> rawList = (List<Object>) (List<?>) listOfLists;
        rawList.add("not a list"); // Heap pollution!
        
        try {
            List<String> firstList = listOfLists.get(1); // ClassCastException!
        } catch (ClassCastException e) {
            System.out.println("ClassCastException: " + e.getMessage());
        }
    }
}

// Как избежать heap pollution:
public class SafePractices {
    
    // 1. Используйте @SafeVarargs для безопасных методов
    @SafeVarargs
    public static <T> void safePrint(T... elements) {
        for (T element : elements) {
            System.out.println(element);
        }
    }
    
    // 2. Избегайте raw types
    public static void processLists(List<String> strings, List<Integer> integers) {
        // Типобезопасная обработка
        strings.forEach(System.out::println);
        integers.forEach(System.out::println);
    }
    
    // 3. Используйте wildcards для чтения
    public static void printAnyList(List<?> list) {
        for (Object item : list) {
            System.out.println(item);
        }
    }
    
    // 4. Используйте bounded wildcards
    public static double sumNumbers(List<? extends Number> numbers) {
        double sum = 0;
        for (Number number : numbers) {
            sum += number.doubleValue();
        }
        return sum;
    }
    
    // 5. Проверяйте типы во время выполнения
    public static <T> boolean isInstanceOf(Object obj, Class<T> clazz) {
        return clazz.isInstance(obj);
    }
}
```

[к оглавлению](#java-generics)

## Что такое @SafeVarargs?
__@SafeVarargs__ — это аннотация, которая подавляет предупреждения компилятора о потенциальном heap pollution при использовании varargs с дженериками.

```java
public class SafeVarargsExample {
    
    // Без @SafeVarargs - компилятор выдает предупреждение
    public static <T> void unsafeMethod(T... elements) {
        // Potential heap pollution from parameterized vararg type
        for (T element : elements) {
            System.out.println(element);
        }
    }
    
    // С @SafeVarargs - предупреждение подавляется
    @SafeVarargs
    public static <T> void safeMethod(T... elements) {
        for (T element : elements) {
            System.out.println(element);
        }
    }
    
    // @SafeVarargs можно использовать только с:
    // 1. static методами
    // 2. final методами
    // 3. конструкторами
    // 4. private методами (Java 9+)
    
    @SafeVarargs
    public static <T> List<T> safeList(T... elements) {
        List<T> result = new ArrayList<>();
        for (T element : elements) {
            result.add(element);
        }
        return result;
    }
    
    // Пример с конструктором
    public static class SafeContainer<T> {
        private List<T> items;
        
        @SafeVarargs
        public SafeContainer(T... items) {
            this.items = Arrays.asList(items);
        }
        
        public List<T> getItems() {
            return new ArrayList<>(items);
        }
    }
    
    // Final метод в классе
    public static class BaseClass {
        @SafeVarargs
        public final <T> void processFinal(T... elements) {
            for (T element : elements) {
                System.out.println("Processing: " + element);
            }
        }
    }
    
    // Private метод (Java 9+)
    @SafeVarargs
    private static <T> void privateMethod(T... elements) {
        for (T element : elements) {
            System.out.println("Private processing: " + element);
        }
    }
    
    // НЕБЕЗОПАСНЫЙ пример - НЕ используйте @SafeVarargs!
    // @SafeVarargs // НЕ ДОБАВЛЯЙТЕ ЭТУ АННОТАЦИЮ!
    public static <T> T[] actuallyUnsafe(T... elements) {
        return elements; // Возвращаем массив - это небезопасно!
    }
    
    // Безопасный альтернативный подход
    @SafeVarargs
    public static <T> List<T> safeAlternative(T... elements) {
        return Arrays.asList(elements); // Возвращаем список - безопасно
    }
    
    // Пример небезопасного использования
    public static void demonstrateUnsafe() {
        // Этот код может вызвать ClassCastException
        String[] strings = actuallyUnsafe("Hello", "World");
        Object[] objects = strings; // Массивы ковариантны
        objects[0] = 42; // Heap pollution!
        // String s = strings[0]; // ClassCastException!
    }
    
    // Безопасные паттерны использования
    @SafeVarargs
    public static <T> void safeProcessing(T... elements) {
        // 1. Только чтение элементов
        for (T element : elements) {
            System.out.println(element);
        }
        
        // 2. Копирование в коллекцию
        List<T> list = new ArrayList<>();
        for (T element : elements) {
            list.add(element);
        }
        
        // 3. Передача в другие методы
        processCollection(Arrays.asList(elements));
    }
    
    private static <T> void processCollection(Collection<T> collection) {
        collection.forEach(System.out::println);
    }
    
    // Пример использования
    public static void main(String[] args) {
        // Безопасное использование
        safeMethod("Hello", "World", "Java");
        
        List<String> strings = safeList("a", "b", "c");
        System.out.println(strings);
        
        SafeContainer<Integer> container = new SafeContainer<>(1, 2, 3, 4, 5);
        System.out.println(container.getItems());
        
        // Использование с различными типами
        safeMethod(1, 2, 3);
        safeMethod(1.5, 2.7, 3.14);
        safeMethod(true, false, true);
        
        // Смешанные типы - компилятор выведет общий супертип
        safeMethod("text", 42, 3.14); // T = Serializable & Comparable<?>
    }
}

// Правила использования @SafeVarargs:
// 1. Метод не должен изменять массив varargs
// 2. Метод не должен возвращать массив varargs или его элементы
// 3. Метод не должен передавать массив varargs в небезопасные методы
// 4. Используйте только когда уверены в безопасности метода

// Альтернативы @SafeVarargs:
public class Alternatives {
    
    // 1. Использование Collection вместо varargs
    public static <T> void processCollection(Collection<T> collection) {
        collection.forEach(System.out::println);
    }
    
    // 2. Использование builder pattern
    public static class ListBuilder<T> {
        private List<T> list = new ArrayList<>();
        
        public ListBuilder<T> add(T element) {
            list.add(element);
            return this;
        }
        
        public List<T> build() {
            return new ArrayList<>(list);
        }
    }
    
    // 3. Использование фабричных методов
    public static <T> List<T> listOf(T first, T... rest) {
        List<T> result = new ArrayList<>();
        result.add(first);
        result.addAll(Arrays.asList(rest));
        return result;
    }
    
    // Использование альтернатив
    public static void main(String[] args) {
        // Альтернатива 1
        processCollection(Arrays.asList("a", "b", "c"));
        
        // Альтернатива 2
        List<String> list = new ListBuilder<String>()
            .add("hello")
            .add("world")
            .add("java")
            .build();
        
        // Альтернатива 3
        List<Integer> numbers = listOf(1, 2, 3, 4, 5);
    }
}
```

[к оглавлению](#java-generics) 

## Можно ли использовать дженерики с исключениями?
Использование дженериков с исключениями ограничено из-за стирания типов.

```java
// Нельзя создать дженерик класс исключения
// public class GenericException<T> extends Exception { // Ошибка компиляции!
//     private T data;
// }

// Нельзя использовать дженерики в catch блоке
// public void method() {
//     try {
//         // some code
//     } catch (T e) { // Ошибка компиляции!
//         // handle exception
//     }
// }

// Можно использовать bounded wildcards с исключениями
public class ExceptionHandler {
    public static void handleException(Exception e) {
        if (e instanceof RuntimeException) {
            System.out.println("Runtime exception: " + e.getMessage());
        } else {
            System.out.println("Checked exception: " + e.getMessage());
        }
    }
    
    // Можно использовать дженерики в throws clause
    public static <T extends Exception> void throwException(T exception) throws T {
        throw exception;
    }
    
    // Пример использования
    public static void example() {
        try {
            throwException(new IllegalArgumentException("Invalid argument"));
        } catch (IllegalArgumentException e) {
            System.out.println("Caught: " + e.getMessage());
        }
        
        try {
            throwException(new IOException("IO error"));
        } catch (IOException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}

// Можно создать дженерик wrapper для исключений
public class ExceptionWrapper<T> {
    private T data;
    private Exception exception;
    
    public ExceptionWrapper(T data) {
        this.data = data;
    }
    
    public ExceptionWrapper(Exception exception) {
        this.exception = exception;
    }
    
    public boolean hasException() {
        return exception != null;
    }
    
    public T getData() throws Exception {
        if (exception != null) {
            throw exception;
        }
        return data;
    }
    
    public Exception getException() {
        return exception;
    }
}

// Использование wrapper
public class ExceptionWrapperExample {
    public static ExceptionWrapper<String> parseString(String input) {
        try {
            if (input == null || input.isEmpty()) {
                throw new IllegalArgumentException("Input cannot be null or empty");
            }
            return new ExceptionWrapper<>(input.toUpperCase());
        } catch (Exception e) {
            return new ExceptionWrapper<>(e);
        }
    }
    
    public static void main(String[] args) {
        ExceptionWrapper<String> result1 = parseString("hello");
        ExceptionWrapper<String> result2 = parseString("");
        
        try {
            System.out.println(result1.getData()); // "HELLO"
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        try {
            System.out.println(result2.getData()); // Throws exception
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

[к оглавлению](#java-generics)

## Что такое recursive type bounds?
__Recursive type bounds__ — это ограничения типов, которые ссылаются на сам параметр типа.

```java
// Классический пример - Comparable
public interface Comparable<T> {
    int compareTo(T other);
}

// Recursive bound - T должен быть сравним с самим собой
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

// Пример реализации
public class Person implements Comparable<Person> {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }
    
    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

// Использование
Person person1 = new Person("Alice", 25);
Person person2 = new Person("Bob", 30);
Person older = max(person1, person2); // Bob (30)

// Более сложный пример с Builder pattern
public abstract class Builder<T extends Builder<T>> {
    protected abstract T self();
    
    public T setValue(String value) {
        // some logic
        return self();
    }
    
    public T setNumber(int number) {
        // some logic
        return self();
    }
}

public class ConcreteBuilder extends Builder<ConcreteBuilder> {
    @Override
    protected ConcreteBuilder self() {
        return this;
    }
    
    public ConcreteBuilder setSpecialValue(String value) {
        // specific logic
        return this;
    }
    
    public Product build() {
        return new Product();
    }
}

// Использование fluent interface
ConcreteBuilder builder = new ConcreteBuilder()
    .setValue("test")
    .setNumber(42)
    .setSpecialValue("special");

// Enum с recursive bound
public enum Operation implements BinaryOperator<Operation> {
    PLUS, MINUS, MULTIPLY, DIVIDE;
    
    @Override
    public Operation apply(Operation op1, Operation op2) {
        // Some logic to combine operations
        return PLUS; // simplified
    }
}

// Пример с деревом
public class TreeNode<T extends Comparable<T>> {
    private T value;
    private TreeNode<T> left;
    private TreeNode<T> right;
    
    public TreeNode(T value) {
        this.value = value;
    }
    
    public void insert(T newValue) {
        if (newValue.compareTo(value) < 0) {
            if (left == null) {
                left = new TreeNode<>(newValue);
            } else {
                left.insert(newValue);
            }
        } else {
            if (right == null) {
                right = new TreeNode<>(newValue);
            } else {
                right.insert(newValue);
            }
        }
    }
    
    public boolean contains(T searchValue) {
        int comparison = searchValue.compareTo(value);
        if (comparison == 0) {
            return true;
        } else if (comparison < 0) {
            return left != null && left.contains(searchValue);
        } else {
            return right != null && right.contains(searchValue);
        }
    }
}

// Использование
TreeNode<Integer> intTree = new TreeNode<>(10);
intTree.insert(5);
intTree.insert(15);
intTree.insert(3);
intTree.insert(7);

boolean found = intTree.contains(7); // true

// Сложный пример с множественными bounds
public interface Copyable<T> {
    T copy();
}

public class Document implements Comparable<Document>, Copyable<Document> {
    private String title;
    private int pages;
    
    public Document(String title, int pages) {
        this.title = title;
        this.pages = pages;
    }
    
    @Override
    public int compareTo(Document other) {
        return Integer.compare(this.pages, other.pages);
    }
    
    @Override
    public Document copy() {
        return new Document(this.title, this.pages);
    }
    
    @Override
    public String toString() {
        return title + " (" + pages + " pages)";
    }
}

// Метод с множественными recursive bounds
public static <T extends Comparable<T> & Copyable<T>> T processAndCopy(T item) {
    T copy = item.copy();
    System.out.println("Processing: " + item);
    return copy;
}

// Использование
Document doc = new Document("Java Guide", 500);
Document copy = processAndCopy(doc);
```

[к оглавлению](#java-generics)

## Как работают дженерики с наследованием?
Дженерики в Java являются инвариантными, что означает, что `List<String>` не является подтипом `List<Object>`, даже если `String` является подтипом `Object`.

```java
// Инвариантность дженериков
public class InvarianceExample {
    public static void main(String[] args) {
        // Обычное наследование
        String str = "Hello";
        Object obj = str; // OK - String является подтипом Object
        
        // С дженериками это не работает
        List<String> stringList = new ArrayList<>();
        // List<Object> objectList = stringList; // Ошибка компиляции!
        
        // Почему это запрещено?
        // Если бы это было разрешено, то:
        // objectList.add(42); // Добавили Integer в List<String>!
        // String s = stringList.get(0); // ClassCastException!
    }
}

// Ковариантность с wildcards
public class CovarianceExample {
    public static void printNumbers(List<? extends Number> numbers) {
        for (Number num : numbers) {
            System.out.println(num);
        }
    }
    
    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.1, 2.2, 3.3);
        
        // Можем передать любой подтип Number
        printNumbers(integers); // OK
        printNumbers(doubles);  // OK
    }
}

// Контравариантность с wildcards
public class ContravarianceExample {
    public static void addIntegers(List<? super Integer> list) {
        list.add(42);
        list.add(100);
    }
    
    public static void main(String[] args) {
        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();
        
        // Можем передать любой супертип Integer
        addIntegers(numbers); // OK
        addIntegers(objects); // OK
        
        System.out.println(numbers); // [42, 100]
        System.out.println(objects); // [42, 100]
    }
}

// Наследование дженерик классов
public class GenericInheritance {
    // Базовый дженерик класс
    public static class Container<T> {
        protected T item;
        
        public void set(T item) {
            this.item = item;
        }
        
        public T get() {
            return item;
        }
    }
    
    // Конкретная реализация
    public static class StringContainer extends Container<String> {
        public void setUpperCase(String value) {
            set(value.toUpperCase());
        }
    }
    
    // Дженерик наследование
    public static class ExtendedContainer<T> extends Container<T> {
        private String description;
        
        public void setDescription(String description) {
            this.description = description;
        }
        
        public String getDescription() {
            return description;
        }
    }
    
    // Добавление параметров типа
    public static class PairContainer<T, U> extends Container<T> {
        private U second;
        
        public void setSecond(U second) {
            this.second = second;
        }
        
        public U getSecond() {
            return second;
        }
    }
}

// Массивы и дженерики
public class ArraysAndGenerics {
    public static void main(String[] args) {
        // Массивы ковариантны
        String[] strings = {"hello", "world"};
        Object[] objects = strings; // OK
        
        // Но это может привести к проблемам
        try {
            objects[0] = 42; // ArrayStoreException во время выполнения!
        } catch (ArrayStoreException e) {
            System.out.println("ArrayStoreException: " + e.getMessage());
        }
        
        // Дженерики инвариантны - безопаснее
        List<String> stringList = Arrays.asList("hello", "world");
        // List<Object> objectList = stringList; // Ошибка компиляции!
    }
}

// Wildcards и наследование
public class WildcardsInheritance {
    public static void processProducer(List<? extends Number> producer) {
        // Можем читать как Number
        for (Number num : producer) {
            System.out.println(num.doubleValue());
        }
        
        // Но не можем добавлять
        // producer.add(42); // Ошибка компиляции!
    }
    
    public static void processConsumer(List<? super Integer> consumer) {
        // Можем добавлять Integer и его подтипы
        consumer.add(42);
        consumer.add(100);
        
        // Но можем читать только как Object
        Object obj = consumer.get(0);
        // Integer i = consumer.get(0); // Ошибка компиляции!
    }
    
    public static void main(String[] args) {
        List<Integer> integers = new ArrayList<>(Arrays.asList(1, 2, 3));
        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();
        
        // Producer - extends
        processProducer(integers); // OK
        processProducer(numbers);  // OK
        
        // Consumer - super
        processConsumer(integers); // OK
        processConsumer(numbers);  // OK
        processConsumer(objects);  // OK
    }
}

// Пример с методами и наследованием
public class MethodInheritance {
    public interface Processor<T> {
        void process(T item);
    }
    
    public static class StringProcessor implements Processor<String> {
        @Override
        public void process(String item) {
            System.out.println("Processing string: " + item.toUpperCase());
        }
    }
    
    public static class NumberProcessor implements Processor<Number> {
        @Override
        public void process(Number item) {
            System.out.println("Processing number: " + item.doubleValue());
        }
    }
    
    // Метод, принимающий любой процессор
    public static <T> void processItems(List<T> items, Processor<? super T> processor) {
        for (T item : items) {
            processor.process(item);
        }
    }
    
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("hello", "world");
        List<Integer> integers = Arrays.asList(1, 2, 3);
        
        processItems(strings, new StringProcessor());
        processItems(integers, new NumberProcessor());
        
        // Можем использовать более общий процессор
        Processor<Object> objectProcessor = item -> System.out.println("Object: " + item);
        processItems(strings, objectProcessor); // OK благодаря ? super T
        processItems(integers, objectProcessor); // OK благодаря ? super T
    }
}
```

[к оглавлению](#java-generics)

## Что такое covariance и contravariance в дженериках?
__Covariance__ и __contravariance__ описывают, как типы связаны друг с другом в контексте наследования.

```java
// Covariance (ковариантность) - ? extends T
public class CovarianceExample {
    // Ковариантный метод - может принимать подтипы
    public static double sumNumbers(List<? extends Number> numbers) {
        double sum = 0;
        for (Number num : numbers) {
            sum += num.doubleValue();
        }
        return sum;
    }
    
    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.1, 2.2, 3.3);
        List<Float> floats = Arrays.asList(1.1f, 2.2f, 3.3f);
        
        // Все эти типы являются подтипами Number
        System.out.println(sumNumbers(integers)); // 6.0
        System.out.println(sumNumbers(doubles));  // 6.6
        System.out.println(sumNumbers(floats));   // 6.6
        
        // Ковариантность позволяет читать, но не писать
        List<? extends Number> covariantList = integers;
        Number num = covariantList.get(0); // OK - можем читать
        // covariantList.add(42); // Ошибка! Нельзя добавлять
    }
}

// Contravariance (контравариантность) - ? super T
public class ContravarianceExample {
    // Контравариантный метод - может принимать супертипы
    public static void addIntegers(List<? super Integer> list) {
        list.add(42);
        list.add(100);
        list.add(200);
    }
    
    public static void main(String[] args) {
        List<Integer> integers = new ArrayList<>();
        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();
        
        // Все эти типы являются супертипами Integer
        addIntegers(integers); // OK
        addIntegers(numbers);  // OK
        addIntegers(objects);  // OK
        
        System.out.println(integers); // [42, 100, 200]
        System.out.println(numbers);  // [42, 100, 200]
        System.out.println(objects);  // [42, 100, 200]
        
        // Контравариантность позволяет писать, но не читать (только Object)
        List<? super Integer> contravariantList = numbers;
        contravariantList.add(300); // OK - можем добавлять Integer
        Object obj = contravariantList.get(0); // OK - можем читать как Object
        // Integer i = contravariantList.get(0); // Ошибка! Нельзя читать как Integer
    }
}

// Практический пример - Collections.copy()
public class CollectionsCopyExample {
    // Сигнатура метода Collections.copy()
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (T item : src) {
            dest.add(item);
        }
    }
    
    public static void main(String[] args) {
        List<Integer> source = Arrays.asList(1, 2, 3, 4, 5);
        
        // Destination может быть супертипом источника
        List<Number> numberDest = new ArrayList<>();
        List<Object> objectDest = new ArrayList<>();
        
        copy(numberDest, source); // OK - Number super Integer
        copy(objectDest, source); // OK - Object super Integer
        
        System.out.println(numberDest); // [1, 2, 3, 4, 5]
        System.out.println(objectDest); // [1, 2, 3, 4, 5]
        
        // Source может быть подтипом
        List<Number> numberSource = Arrays.asList(1, 2.5, 3L);
        List<Object> objectDestination = new ArrayList<>();
        
        copy(objectDestination, numberSource); // OK - Number extends Object
        System.out.println(objectDestination); // [1, 2.5, 3]
    }
}

// Функциональные интерфейсы и variance
public class FunctionalVarianceExample {
    public static void main(String[] args) {
        // Function<T, R> - контравариантен по T, ковариантен по R
        Function<Object, String> objToString = Object::toString;
        Function<String, Object> stringToObj = s -> s;
        
        // Можем присвоить более общую функцию более специфической
        Function<String, String> stringToString = objToString::apply;
        
        // Consumer<T> - контравариантен по T
        Consumer<Object> objectConsumer = System.out::println;
        Consumer<String> stringConsumer = objectConsumer; // OK
        
        // Supplier<T> - ковариантен по T
        Supplier<String> stringSupplier = () -> "Hello";
        Supplier<Object> objectSupplier = stringSupplier::get; // OK
        
        // Predicate<T> - контравариантен по T
        Predicate<Object> objectPredicate = obj -> obj != null;
        Predicate<String> stringPredicate = objectPredicate; // OK
    }
}

// Variance в массивах vs дженериках
public class ArraysVsGenericsVariance {
    public static void main(String[] args) {
        // Массивы ковариантны (небезопасно)
        String[] strings = {"hello", "world"};
        Object[] objects = strings; // OK во время компиляции
        
        try {
            objects[0] = 42; // ArrayStoreException во время выполнения!
        } catch (ArrayStoreException e) {
            System.out.println("Runtime error: " + e.getMessage());
        }
        
        // Дженерики инвариантны (безопасно)
        List<String> stringList = Arrays.asList("hello", "world");
        // List<Object> objectList = stringList; // Ошибка компиляции!
        
        // Но можно использовать wildcards для безопасной вариантности
        List<? extends Object> readOnlyList = stringList; // OK
        Object first = readOnlyList.get(0); // OK
        // readOnlyList.add("test"); // Ошибка компиляции!
    }
}

// Пример с пользовательскими типами
public class CustomVarianceExample {
    static class Animal {
        public void makeSound() {
            System.out.println("Some sound");
        }
    }
    
    static class Dog extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Woof!");
        }
        
        public void wagTail() {
            System.out.println("Wagging tail");
        }
    }
    
    static class Cat extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Meow!");
        }
        
        public void purr() {
            System.out.println("Purring");
        }
    }
    
    // Ковариантный метод
    public static void makeAllSounds(List<? extends Animal> animals) {
        for (Animal animal : animals) {
            animal.makeSound();
        }
    }
    
    // Контравариантный метод
    public static void addDogs(List<? super Dog> list) {
        list.add(new Dog());
        list.add(new Dog());
    }
    
    public static void main(String[] args) {
        List<Dog> dogs = new ArrayList<>();
        List<Cat> cats = new ArrayList<>();
        List<Animal> animals = new ArrayList<>();
        
        dogs.add(new Dog());
        cats.add(new Cat());
        
        // Covariance - можем читать подтипы как супертип
        makeAllSounds(dogs); // OK
        makeAllSounds(cats); // OK
        makeAllSounds(animals); // OK
        
        // Contravariance - можем добавлять в супертипы
        addDogs(dogs);    // OK
        addDogs(animals); // OK
        // addDogs(cats);    // Ошибка! Cat не супертип Dog
        
        System.out.println("Dogs: " + dogs.size()); // 3
        System.out.println("Animals: " + animals.size()); // 2
    }
}
```

[к оглавлению](#java-generics)

## Можно ли создать статическое поле дженерик типа?
Нет, нельзя создать статическое поле параметризованного типа, потому что статические поля принадлежат классу, а не экземпляру.

```java
public class StaticFieldExample<T> {
    // Ошибка компиляции!
    // private static T staticField; // Cannot make a static reference to the non-static type T
    
    // Ошибка компиляции!
    // private static List<T> staticList; // Cannot make a static reference to the non-static type T
    
    // Можно создать статическое поле с raw type (не рекомендуется)
    private static List staticRawList = new ArrayList();
    
    // Можно создать статическое поле с конкретным типом
    private static List<String> staticStringList = new ArrayList<>();
    
    // Можно создать статическое поле с wildcards
    private static List<?> staticWildcardList = new ArrayList<>();
    
    // Нестатические поля с параметром типа - OK
    private T instanceField;
    private List<T> instanceList;
    
    // Статические методы могут быть дженериками
    public static <U> void staticGenericMethod(U parameter) {
        System.out.println("Static method with parameter: " + parameter);
    }
    
    // Статические методы могут использовать свои параметры типа
    public static <U> List<U> createList(U... elements) {
        return Arrays.asList(elements);
    }
    
    // Но не могут использовать параметры типа класса
    // public static void invalidMethod(T parameter) { // Ошибка!
    //     System.out.println(parameter);
    // }
}

// Пример с Singleton pattern
public class GenericSingleton<T> {
    // Нельзя создать статический экземпляр дженерик типа
    // private static GenericSingleton<T> instance; // Ошибка!
    
    // Можно использовать raw type (не рекомендуется)
    @SuppressWarnings("rawtypes")
    private static GenericSingleton instance;
    
    private T value;
    
    private GenericSingleton() {}
    
    @SuppressWarnings("unchecked")
    public static <T> GenericSingleton<T> getInstance() {
        if (instance == null) {
            instance = new GenericSingleton();
        }
        return instance;
    }
    
    public T getValue() {
        return value;
    }
    
    public void setValue(T value) {
        this.value = value;
    }
}

// Лучший подход для Singleton с дженериками
public class BetterGenericSingleton {
    private static final Map<Class<?>, Object> instances = new ConcurrentHashMap<>();
    
    @SuppressWarnings("unchecked")
    public static <T> T getInstance(Class<T> clazz) {
        return (T) instances.computeIfAbsent(clazz, key -> {
            try {
                return key.getDeclaredConstructor().newInstance();
            } catch (Exception e) {
                throw new RuntimeException("Cannot create instance of " + key, e);
            }
        });
    }
}

// Пример с фабрикой
public class GenericFactory<T> {
    // Нельзя создать статическое поле типа T
    // private static T defaultValue; // Ошибка!
    
    // Можно создать статическую фабрику
    private static final Map<Class<?>, Object> defaultValues = new HashMap<>();
    
    static {
        defaultValues.put(String.class, "");
        defaultValues.put(Integer.class, 0);
        defaultValues.put(Boolean.class, false);
    }
    
    @SuppressWarnings("unchecked")
    public static <T> T getDefaultValue(Class<T> clazz) {
        return (T) defaultValues.get(clazz);
    }
    
    // Статический дженерик метод
    public static <T> List<T> createEmptyList() {
        return new ArrayList<>();
    }
    
    // Статический метод с bounded parameter
    public static <T extends Number> T getZero(Class<T> clazz) {
        if (clazz == Integer.class) {
            return clazz.cast(0);
        } else if (clazz == Double.class) {
            return clazz.cast(0.0);
        } else if (clazz == Float.class) {
            return clazz.cast(0.0f);
        }
        throw new IllegalArgumentException("Unsupported type: " + clazz);
    }
}

// Использование
public class UsageExample {
    public static void main(String[] args) {
        // Статические дженерик методы
        StaticFieldExample.staticGenericMethod("Hello");
        StaticFieldExample.staticGenericMethod(42);
        
        List<String> strings = StaticFieldExample.createList("a", "b", "c");
        List<Integer> integers = StaticFieldExample.createList(1, 2, 3);
        
        // Singleton с дженериками
        GenericSingleton<String> stringSingleton = GenericSingleton.getInstance();
        stringSingleton.setValue("Hello");
        
        GenericSingleton<Integer> intSingleton = GenericSingleton.getInstance();
        intSingleton.setValue(42);
        
        // Внимание! Это один и тот же экземпляр из-за type erasure
        System.out.println(stringSingleton == intSingleton); // true
        System.out.println(stringSingleton.getValue()); // 42 (не "Hello"!)
        
        // Фабрика
        String defaultString = GenericFactory.getDefaultValue(String.class);
        Integer defaultInt = GenericFactory.getDefaultValue(Integer.class);
        
        List<String> emptyStringList = GenericFactory.createEmptyList();
        List<Integer> emptyIntList = GenericFactory.createEmptyList();
        
        Integer zero = GenericFactory.getZero(Integer.class);
        Double doubleZero = GenericFactory.getZero(Double.class);
        
        System.out.println("Default string: '" + defaultString + "'");
        System.out.println("Default int: " + defaultInt);
        System.out.println("Zero integer: " + zero);
        System.out.println("Zero double: " + doubleZero);
    }
}

// Обходные пути для статических полей
public class StaticFieldWorkarounds {
    // 1. Использование Class<T> как ключа
    private static final Map<Class<?>, Object> staticValues = new HashMap<>();
    
    @SuppressWarnings("unchecked")
    public static <T> T getStaticValue(Class<T> clazz) {
        return (T) staticValues.get(clazz);
    }
    
    public static <T> void setStaticValue(Class<T> clazz, T value) {
        staticValues.put(clazz, value);
    }
    
    // 2. Использование ThreadLocal для "статических" значений
    private static final ThreadLocal<Map<Class<?>, Object>> threadLocalValues = 
        ThreadLocal.withInitial(HashMap::new);
    
    @SuppressWarnings("unchecked")
    public static <T> T getThreadLocalValue(Class<T> clazz) {
        return (T) threadLocalValues.get().get(clazz);
    }
    
    public static <T> void setThreadLocalValue(Class<T> clazz, T value) {
        threadLocalValues.get().put(clazz, value);
    }
    
    // 3. Использование enum для типобезопасных констант
    public enum DefaultValues {
        STRING_DEFAULT(""),
        INTEGER_DEFAULT(0),
        BOOLEAN_DEFAULT(false);
        
        private final Object value;
        
        DefaultValues(Object value) {
            this.value = value;
        }
        
        @SuppressWarnings("unchecked")
        public <T> T getValue() {
            return (T) value;
        }
    }
}
```

[к оглавлению](#java-generics)

## Что такое multiple bounds?
__Multiple bounds__ позволяют указать несколько ограничений для параметра типа, используя символ `&`.

```java
// Интерфейсы для примера
interface Drawable {
    void draw();
}

interface Resizable {
    void resize(int width, int height);
}

interface Serializable {
    // Marker interface
}

// Классы для примера
abstract class Shape implements Drawable, Serializable {
    protected int x, y;
    
    public Shape(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public abstract double getArea();
}

class Rectangle extends Shape implements Resizable {
    private int width, height;
    
    public Rectangle(int x, int y, int width, int height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing rectangle at (" + x + ", " + y + ") with size " + width + "x" + height);
    }
    
    @Override
    public void resize(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double getArea() {
        return width * height;
    }
}

class Circle extends Shape implements Resizable {
    private int radius;
    
    public Circle(int x, int y, int radius) {
        super(x, y);
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle at (" + x + ", " + y + ") with radius " + radius);
    }
    
    @Override
    public void resize(int width, int height) {
        this.radius = Math.min(width, height) / 2;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

// Примеры использования multiple bounds
public class MultipleBoundsExample {
    
    // Один bound - только интерфейс
    public static <T extends Drawable> void drawShape(T shape) {
        shape.draw();
    }
    
    // Multiple bounds - интерфейсы
    public static <T extends Drawable & Resizable> void processShape(T shape) {
        shape.draw();
        shape.resize(100, 100);
        shape.draw();
    }
    
    // Multiple bounds - класс и интерфейсы (класс должен быть первым)
    public static <T extends Shape & Resizable> void processAdvancedShape(T shape) {
        shape.draw();
        System.out.println("Area: " + shape.getArea());
        shape.resize(200, 200);
        System.out.println("New area: " + shape.getArea());
    }
    
    // Три bounds
    public static <T extends Shape & Drawable & Serializable> void saveShape(T shape) {
        shape.draw();
        System.out.println("Saving shape with area: " + shape.getArea());
        // Здесь можно сериализовать объект
    }
    
    // Bounds с wildcards
    public static void processShapes(List<? extends Shape & Resizable> shapes) {
        for (Shape shape : shapes) {
            if (shape instanceof Resizable) {
                ((Resizable) shape).resize(50, 50);
            }
            shape.draw();
        }
    }
    
    public static void main(String[] args) {
        Rectangle rect = new Rectangle(10, 20, 100, 50);
        Circle circle = new Circle(30, 40, 25);
        
        // Один bound
        drawShape(rect);
        drawShape(circle);
        
        // Multiple bounds
        processShape(rect);
        processShape(circle);
        
        // Класс и интерфейсы
        processAdvancedShape(rect);
        processAdvancedShape(circle);
        
        // Три bounds
        saveShape(rect);
        saveShape(circle);
        
        // С коллекциями
        List<Rectangle> rectangles = Arrays.asList(
            new Rectangle(0, 0, 10, 20),
            new Rectangle(5, 5, 15, 25)
        );
        processShapes(rectangles);
    }
}

// Пример с Comparable
public class ComparableBoundsExample {
    // Класс, реализующий Comparable
    public static class Person implements Comparable<Person>, Serializable {
        private String name;
        private int age;
        
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        @Override
        public int compareTo(Person other) {
            return Integer.compare(this.age, other.age);
        }
        
        @Override
        public String toString() {
            return name + " (" + age + ")";
        }
        
        public String getName() { return name; }
        public int getAge() { return age; }
    }
    
    // Multiple bounds с Comparable
    public static <T extends Comparable<T> & Serializable> T findMax(List<T> list) {
        if (list.isEmpty()) {
            return null;
        }
        
        T max = list.get(0);
        for (T item : list) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }
    
    // Сложный пример с множественными bounds
    public static <T extends Comparable<T> & Serializable & Cloneable> 
    List<T> sortAndClone(List<T> original) {
        List<T> result = new ArrayList<>();
        for (T item : original) {
            try {
                // Клонируем элемент
                @SuppressWarnings("unchecked")
                T cloned = (T) ((Cloneable) item).clone();
                result.add(cloned);
            } catch (Exception e) {
                // Fallback - добавляем оригинал
                result.add(item);
            }
        }
        
        // Сортируем
        Collections.sort(result);
        return result;
    }
    
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 20)
        );
        
        Person oldest = findMax(people);
        System.out.println("Oldest person: " + oldest);
        
        // Работает со строками (они реализуют Comparable и Serializable)
        List<String> strings = Arrays.asList("banana", "apple", "cherry");
        String maxString = findMax(strings);
        System.out.println("Max string: " + maxString);
    }
}

// Ограничения multiple bounds
public class MultipleBoundsLimitations {
    
    // Можно указать только один класс, и он должен быть первым
    // public static <T extends Drawable & Shape> void method1(T t) { } // OK
    // public static <T extends Shape & Drawable> void method2(T t) { } // OK
    // public static <T extends Shape & Rectangle> void method3(T t) { } // Ошибка! Два класса
    
    // Интерфейсы могут быть в любом порядке
    public static <T extends Drawable & Resizable & Serializable> void method4(T t) {
        t.draw();
        t.resize(10, 10);
        // Можем использовать все методы
    }
    
    // Recursive bounds с multiple bounds
    public static <T extends Comparable<T> & Serializable> void sortAndSave(List<T> list) {
        Collections.sort(list);
        System.out.println("Sorted and ready to save: " + list);
    }
    
    // Bounds в наследовании
    public static class BoundedContainer<T extends Comparable<T> & Serializable> {
        private List<T> items = new ArrayList<>();
        
        public void add(T item) {
            items.add(item);
        }
        
        public T getMax() {
            return items.stream().max(Comparable::compareTo).orElse(null);
        }
        
        public List<T> getSorted() {
            return items.stream().sorted().collect(Collectors.toList());
        }
    }
    
    public static void main(String[] args) {
        BoundedContainer<String> stringContainer = new BoundedContainer<>();
        stringContainer.add("zebra");
        stringContainer.add("apple");
        stringContainer.add("banana");
        
        System.out.println("Max: " + stringContainer.getMax());
        System.out.println("Sorted: " + stringContainer.getSorted());
        
        BoundedContainer<Integer> intContainer = new BoundedContainer<>();
        intContainer.add(30);
        intContainer.add(10);
        intContainer.add(20);
        
        System.out.println("Max: " + intContainer.getMax());
        System.out.println("Sorted: " + intContainer.getSorted());
    }
}
```

[к оглавлению](#java-generics)

## Как получить информацию о дженерик типе во время выполнения?
Из-за стирания типов информация о дженериках обычно недоступна во время выполнения, но есть несколько способов ее получить.

```java
import java.lang.reflect.*;
import java.util.*;

// 1. Через наследование (Type Token pattern)
public abstract class TypeReference<T> {
    private final Type type;
    
    protected TypeReference() {
        Type superclass = getClass().getGenericSuperclass();
        if (superclass instanceof ParameterizedType) {
            this.type = ((ParameterizedType) superclass).getActualTypeArguments()[0];
        } else {
            throw new RuntimeException("Missing type parameter");
        }
    }
    
    public Type getType() {
        return type;
    }
    
    @SuppressWarnings("unchecked")
    public Class<T> getRawType() {
        if (type instanceof Class) {
            return (Class<T>) type;
        } else if (type instanceof ParameterizedType) {
            return (Class<T>) ((ParameterizedType) type).getRawType();
        } else {
            throw new RuntimeException("Cannot determine raw type");
        }
    }
}

// Пример использования Type Token
public class TypeTokenExample {
    public static void main(String[] args) {
        // Создаем анонимный класс для захвата типа
        TypeReference<List<String>> listType = new TypeReference<List<String>>() {};
        TypeReference<Map<String, Integer>> mapType = new TypeReference<Map<String, Integer>>() {};
        
        System.out.println("List type: " + listType.getType());
        System.out.println("Map type: " + mapType.getType());
        System.out.println("List raw type: " + listType.getRawType());
        System.out.println("Map raw type: " + mapType.getRawType());
    }
}

// 2. Через поля класса
public class FieldTypeExample {
    private List<String> stringList;
    private Map<String, Integer> stringIntMap;
    private Set<? extends Number> numberSet;
    
    public static void main(String[] args) throws Exception {
        Field stringListField = FieldTypeExample.class.getDeclaredField("stringList");
        Field mapField = FieldTypeExample.class.getDeclaredField("stringIntMap");
        Field setField = FieldTypeExample.class.getDeclaredField("numberSet");
        
        // Получаем generic type информацию
        Type stringListType = stringListField.getGenericType();
        Type mapType = mapField.getGenericType();
        Type setType = setField.getGenericType();
        
        System.out.println("String list type: " + stringListType);
        System.out.println("Map type: " + mapType);
        System.out.println("Set type: " + setType);
        
        // Детальный анализ
        if (stringListType instanceof ParameterizedType) {
            ParameterizedType pt = (ParameterizedType) stringListType;
            System.out.println("Raw type: " + pt.getRawType());
            System.out.println("Type arguments: " + Arrays.toString(pt.getActualTypeArguments()));
        }
        
        if (mapType instanceof ParameterizedType) {
            ParameterizedType pt = (ParameterizedType) mapType;
            System.out.println("Map raw type: " + pt.getRawType());
            System.out.println("Map type arguments: " + Arrays.toString(pt.getActualTypeArguments()));
        }
    }
}

// 3. Через методы
public class MethodTypeExample {
    public List<String> getStringList() {
        return new ArrayList<>();
    }
    
    public void processMap(Map<String, Integer> map) {
        // method body
    }
    
    public <T extends Number> T processNumber(T number) {
        return number;
    }
    
    public static void main(String[] args) throws Exception {
        Method getStringListMethod = MethodTypeExample.class.getMethod("getStringList");
        Method processMapMethod = MethodTypeExample.class.getMethod("processMap", Map.class);
        Method processNumberMethod = MethodTypeExample.class.getMethod("processNumber", Number.class);
        
        // Возвращаемый тип
        Type returnType = getStringListMethod.getGenericReturnType();
        System.out.println("Return type: " + returnType);
        
        // Параметры метода
        Type[] paramTypes = processMapMethod.getGenericParameterTypes();
        System.out.println("Parameter types: " + Arrays.toString(paramTypes));
        
        // Type parameters метода
        TypeVariable<?>[] typeParams = processNumberMethod.getTypeParameters();
        System.out.println("Method type parameters: " + Arrays.toString(typeParams));
        
        if (typeParams.length > 0) {
            TypeVariable<?> typeParam = typeParams[0];
            System.out.println("Type parameter name: " + typeParam.getName());
            System.out.println("Type parameter bounds: " + Arrays.toString(typeParam.getBounds()));
        }
    }
}

// 4. Через суперклассы
public class SuperclassTypeExample {
    public static class GenericBase<T> {
        protected T value;
        
        public T getValue() {
            return value;
        }
        
        public void setValue(T value) {
            this.value = value;
        }
    }
    
    public static class StringContainer extends GenericBase<String> {
        // Конкретная реализация
    }
    
    public static class IntegerContainer extends GenericBase<Integer> {
        // Конкретная реализация
    }
    
    public static void main(String[] args) {
        StringContainer stringContainer = new StringContainer();
        IntegerContainer intContainer = new IntegerContainer();
        
        // Получаем тип через суперкласс
        Type stringType = getGenericType(stringContainer);
        Type intType = getGenericType(intContainer);
        
        System.out.println("String container type: " + stringType);
        System.out.println("Integer container type: " + intType);
    }
    
    private static Type getGenericType(Object obj) {
        Type superclass = obj.getClass().getGenericSuperclass();
        if (superclass instanceof ParameterizedType) {
            ParameterizedType pt = (ParameterizedType) superclass;
            return pt.getActualTypeArguments()[0];
        }
        return null;
    }
}

// 5. Утилитарный класс для работы с типами
public class TypeUtils {
    
    // Получить Class из Type
    @SuppressWarnings("unchecked")
    public static <T> Class<T> getClass(Type type) {
        if (type instanceof Class) {
            return (Class<T>) type;
        } else if (type instanceof ParameterizedType) {
            return (Class<T>) ((ParameterizedType) type).getRawType();
        } else if (type instanceof GenericArrayType) {
            Type componentType = ((GenericArrayType) type).getGenericComponentType();
            Class<?> componentClass = getClass(componentType);
            return (Class<T>) Array.newInstance(componentClass, 0).getClass();
        } else if (type instanceof TypeVariable) {
            return (Class<T>) Object.class;
        } else if (type instanceof WildcardType) {
            return (Class<T>) Object.class;
        } else {
            throw new IllegalArgumentException("Unknown type: " + type);
        }
    }
    
    // Проверить, является ли тип дженериком
    public static boolean isGeneric(Type type) {
        return type instanceof ParameterizedType;
    }
    
    // Получить аргументы типа
    public static Type[] getTypeArguments(Type type) {
        if (type instanceof ParameterizedType) {
            return ((ParameterizedType) type).getActualTypeArguments();
        }
        return new Type[0];
    }
    
    // Получить raw type
    public static Class<?> getRawType(Type type) {
        if (type instanceof Class) {
            return (Class<?>) type;
        } else if (type instanceof ParameterizedType) {
            return (Class<?>) ((ParameterizedType) type).getRawType();
        } else {
            throw new IllegalArgumentException("Cannot get raw type of " + type);
        }
    }
    
    // Создать экземпляр по Type
    @SuppressWarnings("unchecked")
    public static <T> T createInstance(Type type) {
        try {
            Class<T> clazz = (Class<T>) getRawType(type);
            return clazz.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException("Cannot create instance of " + type, e);
        }
    }
    
    public static void main(String[] args) throws Exception {
        // Пример с полем
        Field field = TypeUtils.class.getDeclaredField("exampleField");
        Type fieldType = field.getGenericType();
        
        System.out.println("Field type: " + fieldType);
        System.out.println("Is generic: " + isGeneric(fieldType));
        System.out.println("Raw type: " + getRawType(fieldType));
        System.out.println("Type arguments: " + Arrays.toString(getTypeArguments(fieldType)));
        
        // Создание экземпляра
        Object instance = createInstance(fieldType);
        System.out.println("Created instance: " + instance.getClass());
    }
    
    // Поле для примера
    private List<String> exampleField;
}

// 6. Пример с JSON десериализацией
public class JsonDeserializationExample {
    public static class JsonDeserializer {
        @SuppressWarnings("unchecked")
        public static <T> T deserialize(String json, TypeReference<T> typeRef) {
            // Упрощенная реализация
            Type type = typeRef.getType();
            Class<T> rawType = (Class<T>) TypeUtils.getRawType(type);
            
            if (rawType == String.class) {
                return (T) json.replaceAll("\"", "");
            } else if (rawType == Integer.class) {
                return (T) Integer.valueOf(json);
            } else if (rawType == List.class) {
                // Упрощенная обработка списка
                List<Object> list = new ArrayList<>();
                // Парсинг JSON массива...
                return (T) list;
            }
            
            throw new UnsupportedOperationException("Type not supported: " + type);
        }
    }
    
    public static void main(String[] args) {
        // Использование
        String stringResult = JsonDeserializer.deserialize("\"hello\"", new TypeReference<String>() {});
        Integer intResult = JsonDeserializer.deserialize("42", new TypeReference<Integer>() {});
        List<String> listResult = JsonDeserializer.deserialize("[\"a\", \"b\"]", new TypeReference<List<String>>() {});
        
        System.out.println("String: " + stringResult);
        System.out.println("Integer: " + intResult);
        System.out.println("List: " + listResult);
    }
}
```

[к оглавлению](#java-generics)

# Источники
+ [Oracle Java Tutorials - Generics](https://docs.oracle.com/javase/tutorial/java/generics/)
+ [Effective Java by Joshua Bloch](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/)
+ [Java Generics and Collections by Maurice Naftalin](https://www.oreilly.com/library/view/java-generics-and/0596527756/)
+ [OpenJDK Documentation](https://openjdk.java.net/)
+ [Baeldung Java Generics](https://www.baeldung.com/java-generics)

[Вопросы для собеседования](README.md) 