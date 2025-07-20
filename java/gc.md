[Вопросы для собеседования](README.md)

# Garbage Collection (Сборка мусора)
+ [Что такое сборщик мусора (Garbage Collector)?](#Что-такое-сборщик-мусора-garbage-collector)
+ [Зачем нужен сборщик мусора?](#Зачем-нужен-сборщик-мусора)
+ [Как работает сборщик мусора?](#Как-работает-сборщик-мусора)
+ [Что такое GC Root?](#Что-такое-gc-root)
+ [Какие алгоритмы сборки мусора существуют?](#Какие-алгоритмы-сборки-мусора-существуют)
+ [Что такое поколенческая сборка мусора (Generational GC)?](#Что-такое-поколенческая-сборка-мусора-generational-gc)
+ [Какие области памяти существуют в куче?](#Какие-области-памяти-существуют-в-куче)
+ [Что такое Minor GC, Major GC и Full GC?](#Что-такое-minor-gc-major-gc-и-full-gc)
+ [Какие сборщики мусора есть в HotSpot JVM?](#Какие-сборщики-мусора-есть-в-hotspot-jvm)
+ [Как работает Serial GC?](#Как-работает-serial-gc)
+ [Как работает Parallel GC?](#Как-работает-parallel-gc)
+ [Как работает CMS (Concurrent Mark Sweep)?](#Как-работает-cms-concurrent-mark-sweep)
+ [Как работает G1 (Garbage First)?](#Как-работает-g1-garbage-first)
+ [Как работает ZGC?](#Как-работает-zgc)
+ [Как работает Shenandoah?](#Как-работает-shenandoah)
+ [Что такое Stop-the-World?](#Что-такое-stop-the-world)
+ [Как настроить сборщик мусора?](#Как-настроить-сборщик-мусора)
+ [Как мониторить работу сборщика мусора?](#Как-мониторить-работу-сборщика-мусора)
+ [Что такое memory leak в Java?](#Что-такое-memory-leak-в-java)
+ [Как избежать проблем с памятью?](#Как-избежать-проблем-с-памятью)
+ [Что такое OutOfMemoryError?](#Что-такое-outofmemoryerror)
+ [Как анализировать heap dump?](#Как-анализировать-heap-dump)
+ [Что такое метапространство (Metaspace)?](#Что-такое-метапространство-metaspace)
+ [Как работает финализация объектов?](#Как-работает-финализация-объектов)
+ [Что такое weak, soft и phantom references?](#Что-такое-weak-soft-и-phantom-references)
+ [Как принудительно запустить сборщик мусора?](#Как-принудительно-запустить-сборщик-мусора)
+ [Что такое GC tuning?](#Что-такое-gc-tuning)
+ [Какие инструменты для анализа GC существуют?](#Какие-инструменты-для-анализа-gc-существуют)
+ [Как влияет GC на производительность приложения?](#Как-влияет-gc-на-производительность-приложения)
+ [Что такое concurrent и parallel GC?](#Что-такое-concurrent-и-parallel-gc)

## Что такое сборщик мусора (Garbage Collector)?
__Сборщик мусора (Garbage Collector, GC)__ — это компонент виртуальной машины Java, который автоматически управляет памятью, освобождая память от объектов, которые больше не используются программой.

GC выполняет три основные задачи:
1. **Выделение памяти** для новых объектов
2. **Определение недостижимых объектов** (мусора)
3. **Освобождение памяти** от мусора

```java
public class GCExample {
    public static void main(String[] args) {
        // Создаем объекты
        String str1 = new String("Hello");
        String str2 = new String("World");
        
        // Создаем ссылку на str1
        String reference = str1;
        
        // Убираем ссылку на str1
        str1 = null;
        // str1 все еще достижим через reference
        
        // Убираем все ссылки на объект "Hello"
        reference = null;
        // Теперь объект "Hello" недостижим и может быть собран GC
        
        // str2 все еще достижим
        System.out.println(str2);
        
        // Можем предложить JVM запустить GC
        System.gc(); // Не гарантирует немедленный запуск!
    }
}
```

**Преимущества автоматической сборки мусора:**
- Предотвращает утечки памяти
- Упрощает программирование
- Уменьшает количество ошибок
- Автоматически управляет жизненным циклом объектов

[к оглавлению](#garbage-collection-сборка-мусора)

## Зачем нужен сборщик мусора?
Сборщик мусора решает несколько критически важных задач:

### 1. Автоматическое управление памятью
```java
public class MemoryManagementExample {
    public void withoutGC() {
        // В языках без GC (например, C++) нужно вручную управлять памятью
        // Object* obj = new Object(); // Выделяем память
        // delete obj;                 // Освобождаем память вручную
        
        // В Java этого не нужно делать
        Object obj = new Object(); // Выделяем память
        // Память освободится автоматически, когда obj станет недостижимым
    }
    
    public void createManyObjects() {
        for (int i = 0; i < 1000000; i++) {
            String temp = "Object " + i;
            // Каждый temp становится недостижимым на следующей итерации
            // GC автоматически освободит память
        }
    }
}
```

### 2. Предотвращение утечек памяти
```java
public class MemoryLeakExample {
    private static List<Object> cache = new ArrayList<>();
    
    public void potentialMemoryLeak() {
        for (int i = 0; i < 10000; i++) {
            Object obj = new Object();
            cache.add(obj); // Объекты остаются достижимыми через cache
        }
        // Без очистки cache это может привести к утечке памяти
    }
    
    public void goodPractice() {
        List<Object> localCache = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            Object obj = new Object();
            localCache.add(obj);
        }
        // localCache выйдет из области видимости
        // Все объекты станут недостижимыми и будут собраны GC
    }
}
```

### 3. Оптимизация производительности
```java
public class PerformanceExample {
    // Плохо - создание множества временных объектов
    public String concatenateStrings(String[] strings) {
        String result = "";
        for (String str : strings) {
            result += str; // Каждая операция создает новый String объект
        }
        return result;
    }
    
    // Лучше - использование StringBuilder
    public String concatenateStringsOptimized(String[] strings) {
        StringBuilder sb = new StringBuilder();
        for (String str : strings) {
            sb.append(str); // Переиспользование внутреннего буфера
        }
        return sb.toString();
    }
}
```

### 4. Безопасность
```java
public class SecurityExample {
    private char[] password;
    
    public void handlePassword(String pwd) {
        password = pwd.toCharArray();
        
        // Используем пароль
        authenticate(password);
        
        // Явно очищаем чувствительные данные
        Arrays.fill(password, ' ');
        password = null;
        
        // GC в конечном итоге освободит память
        // Но мы уже затерли чувствительные данные
    }
    
    private void authenticate(char[] pwd) {
        // Логика аутентификации
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как работает сборщик мусора?
Сборщик мусора работает в несколько этапов:

### 1. Marking (Пометка)
Определяет, какие объекты все еще используются, а какие нет.

```java
public class MarkingExample {
    private Object field1;
    private Object field2;
    
    public void demonstrateMarking() {
        Object local1 = new Object();     // Достижим через local1
        Object local2 = new Object();     // Достижим через local2
        
        field1 = local1;                  // Достижим через field1
        field2 = new Object();            // Достижим через field2
        
        Object temp = new Object();       // Достижим через temp
        temp = null;                      // Теперь недостижим (мусор)
        
        local2 = null;                    // local2 теперь недостижим
        
        // В этой точке GC пометит:
        // - local1, field1, field2 как живые
        // - temp и старый local2 как мусор
    }
}
```

### 2. Sweep (Очистка)
Освобождает память от объектов, помеченных как мусор.

```java
public class SweepExample {
    public void demonstrateSweep() {
        // Создаем много объектов
        List<String> list = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            list.add("String " + i);
        }
        
        // Очищаем список
        list.clear();
        list = null;
        
        // Все 1000 строк теперь недостижимы
        // GC освободит память от них во время sweep фазы
        
        // Принудительно запускаем GC для демонстрации
        System.gc();
    }
}
```

### 3. Compact (Уплотнение)
Перемещает оставшиеся объекты для устранения фрагментации.

```java
public class CompactExample {
    public void demonstrateCompaction() {
        // Создаем объекты разного размера
        List<Object> objects = new ArrayList<>();
        
        // Большие объекты
        for (int i = 0; i < 100; i++) {
            objects.add(new int[1000]);
        }
        
        // Маленькие объекты
        for (int i = 0; i < 1000; i++) {
            objects.add(new Object());
        }
        
        // Удаляем каждый второй объект
        for (int i = objects.size() - 1; i >= 0; i -= 2) {
            objects.remove(i);
        }
        
        // Память фрагментирована
        // GC может выполнить компактификацию, чтобы:
        // - Переместить живые объекты в начало кучи
        // - Создать непрерывный блок свободной памяти
        
        System.gc();
    }
}
```

### Алгоритм трассировки (Tracing)
```java
public class TracingExample {
    static class Node {
        Object data;
        Node next;
        
        Node(Object data) {
            this.data = data;
        }
    }
    
    private static Node head;
    
    public static void demonstrateTracing() {
        // Создаем связанный список
        head = new Node("First");
        head.next = new Node("Second");
        head.next.next = new Node("Third");
        
        // GC Root: статическая переменная head
        // Трассировка:
        // head -> Node("First") -> Node("Second") -> Node("Third")
        // Все узлы достижимы
        
        // Разрываем связь
        head.next = null;
        
        // Теперь Node("Second") и Node("Third") недостижимы
        // GC соберет их как мусор
        
        System.gc();
    }
}
```

### Concurrent и Parallel сборка
```java
public class ConcurrentGCExample {
    private volatile boolean running = true;
    
    public void demonstrateConcurrentGC() {
        // Основной поток продолжает работу
        Thread mainWork = new Thread(() -> {
            while (running) {
                // Создаем объекты во время работы GC
                Object temp = new Object();
                try {
                    Thread.sleep(1);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        
        mainWork.start();
        
        // Concurrent GC может работать параллельно с основным потоком
        // Это уменьшает паузы приложения
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        running = false;
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Что такое GC Root?
__GC Root__ — это объекты, которые всегда считаются "живыми" и служат отправной точкой для определения достижимости других объектов.

### Типы GC Root:

#### 1. Локальные переменные и параметры методов
```java
public class LocalVariablesRoot {
    public void method(String parameter) { // parameter - GC Root
        String localVar = "Hello";         // localVar - GC Root
        Object obj = new Object();         // obj - GC Root
        
        // Все эти переменные являются GC Root
        // Объекты, на которые они ссылаются, достижимы
    }
}
```

#### 2. Статические переменные
```java
public class StaticVariablesRoot {
    private static List<String> staticList = new ArrayList<>(); // GC Root
    private static final String CONSTANT = "Constant";          // GC Root
    
    public static void addToList(String item) {
        staticList.add(item); // item достижим через staticList
    }
}
```

#### 3. Активные потоки (Threads)
```java
public class ThreadsRoot {
    public void demonstrateThreadRoot() {
        Thread thread = new Thread(() -> {
            Object threadLocal = new Object(); // Достижим пока поток активен
            
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        thread.start(); // Поток и его локальные переменные - GC Root
        
        // threadLocal будет достижим пока поток выполняется
    }
}
```

#### 4. JNI ссылки
```java
public class JNIRoot {
    // Нативный метод
    public native void nativeMethod();
    
    static {
        // Загружаем нативную библиотеку
        System.loadLibrary("example");
    }
    
    public void demonstrateJNI() {
        Object obj = new Object();
        
        // Если obj передается в нативный код и там сохраняется ссылка,
        // то obj становится достижимым через JNI ссылку
        nativeMethod();
    }
}
```

#### 5. Синхронизированные объекты
```java
public class SynchronizedRoot {
    private final Object lock = new Object();
    
    public void demonstrateSynchronizedRoot() {
        synchronized (lock) {
            // Пока поток держит монитор объекта lock,
            // объект lock является GC Root
            
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
```

### Пример трассировки от GC Root:
```java
public class GCRootTracing {
    private static Node staticRoot;  // GC Root
    
    static class Node {
        String data;
        Node child;
        
        Node(String data) {
            this.data = data;
        }
    }
    
    public static void demonstrateTracing() {
        // Создаем граф объектов
        staticRoot = new Node("Root");
        staticRoot.child = new Node("Child1");
        staticRoot.child.child = new Node("Child2");
        
        Node localRef = new Node("Local");  // GC Root
        localRef.child = new Node("LocalChild");
        
        // Трассировка от GC Root:
        // staticRoot -> Node("Root") -> Node("Child1") -> Node("Child2")
        // localRef -> Node("Local") -> Node("LocalChild")
        
        // Все объекты достижимы
        
        localRef = null; // Убираем GC Root
        
        // Теперь Node("Local") и Node("LocalChild") недостижимы
        // Они будут собраны GC
    }
}
```

### Визуализация GC Root:
```java
public class GCRootVisualization {
    private static List<Object> staticList = new ArrayList<>();
    private Object instanceField;
    
    public void visualizeGCRoots() {
        Object local1 = new Object();           // GC Root (локальная переменная)
        Object local2 = new Object();           // GC Root (локальная переменная)
        
        staticList.add(local1);                 // local1 также достижим через static
        instanceField = local2;                 // local2 также достижим через instance
        
        Object temp = new Object();             // GC Root (локальная переменная)
        temp = null;                            // Больше не GC Root
        
        // В этой точке GC Root:
        // - staticList (статическая переменная)
        // - local1 (локальная переменная)
        // - local2 (локальная переменная)
        // - this (параметр метода)
        
        // Достижимые объекты:
        // - Object через staticList
        // - Object через instanceField
        // - this объект
        
        // Недостижимые объекты:
        // - Object, который был в temp
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Какие алгоритмы сборки мусора существуют?
Существует несколько основных алгоритмов сборки мусора, каждый с своими преимуществами и недостатками:

### 1. Reference Counting (Подсчет ссылок)
```java
// Концептуальный пример (не используется в стандартной JVM)
public class ReferenceCountingExample {
    static class RefCountObject {
        private int refCount = 1; // Счетчик ссылок
        private String data;
        
        public RefCountObject(String data) {
            this.data = data;
        }
        
        public void addReference() {
            refCount++;
        }
        
        public void removeReference() {
            refCount--;
            if (refCount == 0) {
                // Объект можно удалить
                System.out.println("Объект " + data + " удален");
            }
        }
    }
    
    public void demonstrateReferenceCounting() {
        RefCountObject obj = new RefCountObject("Test");
        
        RefCountObject ref1 = obj;
        obj.addReference(); // refCount = 2
        
        RefCountObject ref2 = obj;
        obj.addReference(); // refCount = 3
        
        ref1 = null;
        obj.removeReference(); // refCount = 2
        
        ref2 = null;
        obj.removeReference(); // refCount = 1
        
        obj = null;
        // Нужно вызвать removeReference(), но obj уже null
        // Проблема: как уменьшить счетчик?
    }
    
    // Проблема циклических ссылок
    static class CyclicNode {
        CyclicNode next;
        String data;
        
        CyclicNode(String data) {
            this.data = data;
        }
    }
    
    public void demonstrateCyclicProblem() {
        CyclicNode node1 = new CyclicNode("Node1");
        CyclicNode node2 = new CyclicNode("Node2");
        
        node1.next = node2; // node2.refCount++
        node2.next = node1; // node1.refCount++
        
        node1 = null; // node1.refCount-- (но все еще > 0)
        node2 = null; // node2.refCount-- (но все еще > 0)
        
        // Объекты недостижимы, но refCount > 0
        // Утечка памяти!
    }
}
```

### 2. Mark and Sweep (Пометка и очистка)
```java
public class MarkAndSweepExample {
    static class Node {
        boolean marked = false; // Флаг для пометки
        String data;
        Node next;
        
        Node(String data) {
            this.data = data;
        }
    }
    
    private static List<Node> allNodes = new ArrayList<>();
    private static Node root;
    
    // Фаза Mark
    public static void mark(Node node) {
        if (node == null || node.marked) {
            return;
        }
        
        node.marked = true;
        System.out.println("Помечен объект: " + node.data);
        
        // Рекурсивно помечаем достижимые объекты
        mark(node.next);
    }
    
    // Фаза Sweep
    public static void sweep() {
        Iterator<Node> iterator = allNodes.iterator();
        while (iterator.hasNext()) {
            Node node = iterator.next();
            if (!node.marked) {
                System.out.println("Удален объект: " + node.data);
                iterator.remove();
            } else {
                // Сбрасываем флаг для следующего цикла
                node.marked = false;
            }
        }
    }
    
    public static void demonstrateMarkAndSweep() {
        // Создаем объекты
        Node node1 = new Node("Node1");
        Node node2 = new Node("Node2");
        Node node3 = new Node("Node3");
        Node node4 = new Node("Node4");
        
        allNodes.addAll(Arrays.asList(node1, node2, node3, node4));
        
        // Создаем связи
        root = node1;
        node1.next = node2;
        node2.next = node3;
        // node4 недостижим
        
        // Запускаем Mark & Sweep
        mark(root);  // Помечаем достижимые объекты
        sweep();     // Удаляем непомеченные объекты
        
        System.out.println("Оставшиеся объекты: " + allNodes.size());
    }
}
```

### 3. Copying (Копирующий)
```java
public class CopyingGCExample {
    static class Space {
        private List<Object> objects = new ArrayList<>();
        private String name;
        
        public Space(String name) {
            this.name = name;
        }
        
        public void addObject(Object obj) {
            objects.add(obj);
        }
        
        public List<Object> getObjects() {
            return new ArrayList<>(objects);
        }
        
        public void clear() {
            objects.clear();
        }
        
        public int size() {
            return objects.size();
        }
        
        @Override
        public String toString() {
            return name + " (" + size() + " objects)";
        }
    }
    
    private Space fromSpace = new Space("From Space");
    private Space toSpace = new Space("To Space");
    
    public void demonstrateCopyingGC() {
        // Создаем объекты в From Space
        Object obj1 = new Object();
        Object obj2 = new Object();
        Object obj3 = new Object();
        
        fromSpace.addObject(obj1);
        fromSpace.addObject(obj2);
        fromSpace.addObject(obj3);
        
        System.out.println("До сборки мусора:");
        System.out.println("From Space: " + fromSpace);
        System.out.println("To Space: " + toSpace);
        
        // Симулируем, что obj2 недостижим
        List<Object> reachableObjects = Arrays.asList(obj1, obj3);
        
        // Копируем живые объекты в To Space
        for (Object obj : reachableObjects) {
            toSpace.addObject(obj);
        }
        
        // Очищаем From Space
        fromSpace.clear();
        
        // Меняем местами пространства
        Space temp = fromSpace;
        fromSpace = toSpace;
        toSpace = temp;
        
        System.out.println("\nПосле сборки мусора:");
        System.out.println("From Space: " + fromSpace);
        System.out.println("To Space: " + toSpace);
    }
}
```

### 4. Mark-Sweep-Compact (Пометка-очистка-уплотнение)
```java
public class MarkSweepCompactExample {
    static class HeapObject {
        String data;
        boolean marked = false;
        int address;
        
        HeapObject(String data, int address) {
            this.data = data;
            this.address = address;
        }
        
        @Override
        public String toString() {
            return data + "@" + address;
        }
    }
    
    private List<HeapObject> heap = new ArrayList<>();
    private List<HeapObject> roots = new ArrayList<>();
    
    public void demonstrateMarkSweepCompact() {
        // Создаем объекты в куче
        HeapObject obj1 = new HeapObject("Obj1", 100);
        HeapObject obj2 = new HeapObject("Obj2", 200);
        HeapObject obj3 = new HeapObject("Obj3", 300);
        HeapObject obj4 = new HeapObject("Obj4", 400);
        HeapObject obj5 = new HeapObject("Obj5", 500);
        
        heap.addAll(Arrays.asList(obj1, obj2, obj3, obj4, obj5));
        
        // Только obj1, obj3, obj5 достижимы
        roots.addAll(Arrays.asList(obj1, obj3, obj5));
        
        System.out.println("Исходная куча:");
        heap.forEach(System.out::println);
        
        // Фаза Mark
        for (HeapObject root : roots) {
            root.marked = true;
        }
        
        // Фаза Sweep
        heap.removeIf(obj -> !obj.marked);
        
        System.out.println("\nПосле Sweep:");
        heap.forEach(System.out::println);
        
        // Фаза Compact - перемещаем объекты в начало
        int newAddress = 100;
        for (HeapObject obj : heap) {
            obj.address = newAddress;
            newAddress += 100;
            obj.marked = false; // Сбрасываем флаг
        }
        
        System.out.println("\nПосле Compact:");
        heap.forEach(System.out::println);
    }
}
```

### 5. Incremental GC (Инкрементальная сборка)
```java
public class IncrementalGCExample {
    private static final int WORK_QUANTUM = 3; // Обрабатываем по 3 объекта за раз
    
    static class IncrementalCollector {
        private List<Object> objects = new ArrayList<>();
        private int currentIndex = 0;
        private boolean markingPhase = true;
        
        public void addObject(Object obj) {
            objects.add(obj);
        }
        
        public void doIncrementalWork() {
            if (markingPhase) {
                doMarkingWork();
            } else {
                doSweepingWork();
            }
        }
        
        private void doMarkingWork() {
            int processed = 0;
            while (processed < WORK_QUANTUM && currentIndex < objects.size()) {
                Object obj = objects.get(currentIndex);
                // Симулируем пометку объекта
                System.out.println("Помечаем объект " + currentIndex);
                currentIndex++;
                processed++;
            }
            
            if (currentIndex >= objects.size()) {
                markingPhase = false;
                currentIndex = 0;
                System.out.println("Фаза пометки завершена");
            }
        }
        
        private void doSweepingWork() {
            int processed = 0;
            while (processed < WORK_QUANTUM && currentIndex < objects.size()) {
                // Симулируем очистку объекта
                System.out.println("Очищаем объект " + currentIndex);
                currentIndex++;
                processed++;
            }
            
            if (currentIndex >= objects.size()) {
                markingPhase = true;
                currentIndex = 0;
                System.out.println("Фаза очистки завершена");
            }
        }
    }
    
    public void demonstrateIncrementalGC() {
        IncrementalCollector collector = new IncrementalCollector();
        
        // Добавляем объекты
        for (int i = 0; i < 10; i++) {
            collector.addObject(new Object());
        }
        
        // Выполняем инкрементальную работу
        for (int i = 0; i < 8; i++) {
            System.out.println("\n--- Шаг " + (i + 1) + " ---");
            collector.doIncrementalWork();
            
            // Симулируем работу приложения
            System.out.println("Приложение работает...");
        }
    }
}
```

### Сравнение алгоритмов:
```java
public class GCAlgorithmComparison {
    public void compareAlgorithms() {
        System.out.println("Сравнение алгоритмов сборки мусора:");
        System.out.println();
        
        System.out.println("1. Reference Counting:");
        System.out.println("   + Простота реализации");
        System.out.println("   + Немедленное освобождение памяти");
        System.out.println("   - Не обрабатывает циклические ссылки");
        System.out.println("   - Накладные расходы на каждое присваивание");
        System.out.println();
        
        System.out.println("2. Mark and Sweep:");
        System.out.println("   + Обрабатывает циклические ссылки");
        System.out.println("   + Точно определяет мусор");
        System.out.println("   - Требует остановки приложения");
        System.out.println("   - Может привести к фрагментации");
        System.out.println();
        
        System.out.println("3. Copying:");
        System.out.println("   + Нет фрагментации");
        System.out.println("   + Быстрое выделение памяти");
        System.out.println("   - Требует в 2 раза больше памяти");
        System.out.println("   - Время копирования пропорционально живым объектам");
        System.out.println();
        
        System.out.println("4. Mark-Sweep-Compact:");
        System.out.println("   + Нет фрагментации");
        System.out.println("   + Эффективное использование памяти");
        System.out.println("   - Длительные паузы");
        System.out.println("   - Сложность реализации");
    }
    
    public void showGCMetrics() {
        System.out.println("\n=== Метрики GC ===");
        
        // Получаем информацию о GC через MXBeans
        java.lang.management.MemoryMXBean memoryMX = 
            java.lang.management.ManagementFactory.getMemoryMXBean();
        
        java.lang.management.MemoryUsage heapUsage = memoryMX.getHeapMemoryUsage();
        java.lang.management.MemoryUsage nonHeapUsage = memoryMX.getNonHeapMemoryUsage();
        
        System.out.println("Heap Memory:");
        System.out.println("  Used: " + heapUsage.getUsed() / 1024 / 1024 + " MB");
        System.out.println("  Committed: " + heapUsage.getCommitted() / 1024 / 1024 + " MB");
        System.out.println("  Max: " + heapUsage.getMax() / 1024 / 1024 + " MB");
        
        System.out.println("Non-Heap Memory (Metaspace):");
        System.out.println("  Used: " + nonHeapUsage.getUsed() / 1024 / 1024 + " MB");
        System.out.println("  Committed: " + nonHeapUsage.getCommitted() / 1024 / 1024 + " MB");
        
        // Информация о сборщиках мусора
        java.util.List<java.lang.management.GarbageCollectorMXBean> gcMXBeans = 
            java.lang.management.ManagementFactory.getGarbageCollectorMXBeans();
        
        System.out.println("\nGarbage Collectors:");
        for (java.lang.management.GarbageCollectorMXBean gcMXBean : gcMXBeans) {
            System.out.println("  " + gcMXBean.getName() + ":");
            System.out.println("    Collections: " + gcMXBean.getCollectionCount());
            System.out.println("    Time: " + gcMXBean.getCollectionTime() + " ms");
        }
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора) 

## Что такое поколенческая сборка мусора (Generational GC)?
__Поколенческая сборка мусора__ основана на наблюдении, что большинство объектов живут недолго, а те, что выживают, обычно живут долго. Память разделяется на поколения по возрасту объектов.

### Гипотеза поколений:
1. **Большинство объектов умирают молодыми**
2. **Мало ссылок от старых объектов к молодым**

```java
public class GenerationalGCExample {
    // Пример объектов разного времени жизни
    
    // Долгоживущие объекты (Old Generation)
    private static final List<String> CACHE = new ArrayList<>();
    private static final Map<String, Object> REGISTRY = new HashMap<>();
    
    // Короткоживущие объекты (Young Generation)
    public void processRequest(String data) {
        // Временные объекты - быстро станут мусором
        String[] parts = data.split(",");
        StringBuilder result = new StringBuilder();
        
        for (String part : parts) {
            String trimmed = part.trim();           // Временный объект
            String processed = trimmed.toUpperCase(); // Временный объект
            result.append(processed);               // Временный объект при расширении
        }
        
        // Большинство этих объектов будут собраны Minor GC
        String finalResult = result.toString();
        
        // Только если результат сохраняется, он может попасть в Old Generation
        if (finalResult.length() > 100) {
            CACHE.add(finalResult);
        }
    }
    
    public void demonstrateGenerations() {
        // Создаем много короткоживущих объектов
        for (int i = 0; i < 10000; i++) {
            processRequest("data,item," + i + ",value,test");
        }
        
        // Большинство временных объектов будут собраны в Young Generation
        // Только некоторые попадут в Old Generation
        
        System.out.println("Cached items: " + CACHE.size());
    }
}
```

### Структура поколений:
```java
public class GenerationStructure {
    public void explainGenerations() {
        /*
         * HEAP MEMORY LAYOUT:
         * 
         * +------------------+
         * |  Young Generation |  <- Новые объекты
         * |                  |
         * |  +------------+  |
         * |  |    Eden    |  |  <- Место создания объектов
         * |  +------------+  |
         * |  | Survivor 0 |  |  <- Объекты, пережившие 1+ GC
         * |  +------------+  |
         * |  | Survivor 1 |  |  <- Альтернативное место для выживших
         * |  +------------+  |
         * +------------------+
         * |   Old Generation |  <- Долгоживущие объекты
         * |    (Tenured)     |
         * +------------------+
         * |    Metaspace     |  <- Метаданные классов (Java 8+)
         * +------------------+
         */
    }
    
    // Симуляция движения объектов между поколениями
    public void simulateObjectAging() {
        System.out.println("=== Симуляция старения объектов ===");
        
        // Шаг 1: Создание объектов в Eden
        Object obj1 = new Object();  // В Eden
        Object obj2 = new Object();  // В Eden
        Object obj3 = new Object();  // В Eden
        
        System.out.println("Объекты созданы в Eden");
        
        // Шаг 2: Minor GC - выжившие переходят в Survivor 0
        // obj1 и obj3 выживают, obj2 - мусор
        System.out.println("Minor GC #1: obj1, obj3 -> Survivor 0");
        
        // Шаг 3: Создаем новые объекты в Eden
        Object obj4 = new Object();  // В Eden
        Object obj5 = new Object();  // В Eden
        
        // Шаг 4: Второй Minor GC
        // obj1, obj3 -> Survivor 1 (age = 2)
        // obj4 выживает -> Survivor 1 (age = 1)
        // obj5 - мусор
        System.out.println("Minor GC #2: obj1,obj3 (age=2), obj4 (age=1) -> Survivor 1");
        
        // Шаг 5: После нескольких Minor GC объекты попадают в Old Generation
        // Обычно после 6-15 циклов (настраивается -XX:MaxTenuringThreshold)
        System.out.println("После 6+ Minor GC: obj1, obj3 -> Old Generation");
    }
}
```

### Преимущества поколенческой сборки:
```java
public class GenerationalBenefits {
    public void demonstrateBenefits() {
        System.out.println("=== Преимущества поколенческой сборки ===");
        
        // 1. Быстрая сборка в Young Generation
        long startTime = System.nanoTime();
        
        // Создаем много временных объектов
        for (int i = 0; i < 100000; i++) {
            String temp = "temporary_" + i;
            temp.toUpperCase(); // Создает еще один временный объект
        }
        
        long endTime = System.nanoTime();
        System.out.println("Время создания объектов: " + (endTime - startTime) / 1_000_000 + " мс");
        
        // Minor GC будет быстрым, так как:
        // - Обрабатывается только Young Generation (меньший объем)
        // - Большинство объектов - мусор (мало копирования)
        // - Используется copying algorithm (быстрый)
        
        System.gc(); // Предлагаем запустить GC
        
        System.out.println("2. Редкая сборка в Old Generation");
        System.out.println("   - Major GC запускается реже");
        System.out.println("   - Обрабатывает только долгоживущие объекты");
        
        System.out.println("3. Оптимизация для разных типов объектов");
        System.out.println("   - Young: быстрый copying algorithm");
        System.out.println("   - Old: mark-sweep-compact для эффективности памяти");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Какие области памяти существуют в куче?
Куча Java разделена на несколько областей для оптимизации сборки мусора:

### 1. Young Generation (Молодое поколение)
```java
public class YoungGenerationExample {
    public void explainYoungGeneration() {
        /*
         * Young Generation состоит из:
         * 
         * Eden Space:
         * - Место создания новых объектов
         * - Самая активная область
         * - Быстро заполняется
         * 
         * Survivor Space S0 и S1:
         * - Для объектов, переживших хотя бы один GC
         * - Всегда одно пространство пустое
         * - Используются поочередно
         */
    }
    
    public void demonstrateYoungGeneration() {
        // Все эти объекты создаются в Eden Space
        List<String> temporaryList = new ArrayList<>();
        
        for (int i = 0; i < 1000; i++) {
            String temp = "Item " + i;      // Создается в Eden
            temporaryList.add(temp);        // temp может выжить Minor GC
            
            // Локальные переменные в цикле
            StringBuilder sb = new StringBuilder(); // Eden
            sb.append("Processing ").append(i);     // Временные объекты в Eden
            String processed = sb.toString();       // Eden
            
            // processed выходит из области видимости - становится мусором
        }
        
        // temporaryList и его содержимое могут перейти в Survivor Space
        // если переживут Minor GC
        
        System.out.println("Created " + temporaryList.size() + " items");
    }
}
```

### 2. Old Generation (Старое поколение)
```java
public class OldGenerationExample {
    // Статические поля обычно попадают в Old Generation
    private static final Map<String, Object> APPLICATION_CACHE = new HashMap<>();
    private static final List<String> CONFIGURATION = new ArrayList<>();
    
    // Поля экземпляра долгоживущих объектов
    private final String instanceId;
    private final Date creationTime;
    
    public OldGenerationExample(String id) {
        this.instanceId = id;
        this.creationTime = new Date(); // Может попасть в Old Generation
    }
    
    public void explainOldGeneration() {
        /*
         * Old Generation (Tenured Space):
         * - Объекты, пережившие несколько Minor GC
         * - Долгоживущие объекты приложения
         * - Кэши, конфигурации, синглтоны
         * - Большие объекты (могут попасть сразу)
         * - Сборка происходит реже (Major GC)
         */
    }
    
    public void demonstrateOldGeneration() {
        // Объекты, которые попадут в Old Generation:
        
        // 1. Долгоживущие кэши
        for (int i = 0; i < 100; i++) {
            APPLICATION_CACHE.put("key" + i, new Object());
        }
        
        // 2. Конфигурационные данные
        CONFIGURATION.add("server.port=8080");
        CONFIGURATION.add("database.url=jdbc:mysql://localhost:3306/db");
        
        // 3. Большие объекты (могут попасть сразу в Old Generation)
        int[] largeArray = new int[1000000]; // Большой массив
        
        // 4. Объекты, которые "выжили" в Young Generation
        List<String> survivorList = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            survivorList.add("Survivor " + i);
        }
        
        // Если survivorList переживет несколько Minor GC,
        // он переместится в Old Generation
        
        System.out.println("Objects likely to be in Old Generation created");
    }
}
```

### 3. Metaspace (Java 8+) / Permanent Generation (Java 7-)
```java
public class MetaspaceExample {
    public void explainMetaspace() {
        /*
         * Metaspace (Java 8+):
         * - Заменил Permanent Generation
         * - Хранится в нативной памяти (не в куче)
         * - Автоматически расширяется
         * - Содержит метаданные классов
         * 
         * Permanent Generation (Java 7 и ранее):
         * - Часть кучи
         * - Фиксированный размер
         * - Мог вызывать OutOfMemoryError: PermGen space
         */
    }
    
    // Метаданные этого класса хранятся в Metaspace
    public static class ExampleClass {
        private String field1;
        private int field2;
        
        public void method1() {
            // Информация о методе в Metaspace
        }
        
        public String method2(int param) {
            return "Result: " + param;
        }
    }
    
    public void demonstrateMetaspace() {
        // При загрузке класса его метаданные попадают в Metaspace:
        // - Информация о полях
        // - Информация о методах
        // - Константы класса
        // - Bytecode методов
        
        ExampleClass example = new ExampleClass();
        
        // Объект example создается в куче (Eden Space)
        // Но метаданные класса ExampleClass уже в Metaspace
        
        // Использование рефлексии обращается к Metaspace
        Class<?> clazz = example.getClass();
        System.out.println("Class name: " + clazz.getName());
        System.out.println("Methods count: " + clazz.getDeclaredMethods().length);
        System.out.println("Fields count: " + clazz.getDeclaredFields().length);
    }
    
    // Динамическая загрузка классов может увеличить Metaspace
    public void demonstrateDynamicClassLoading() {
        try {
            // Загружаем класс динамически
            Class<?> dynamicClass = Class.forName("java.util.HashMap");
            
            // Метаданные HashMap загружаются в Metaspace
            Object instance = dynamicClass.getDeclaredConstructor().newInstance();
            
            System.out.println("Dynamically loaded: " + dynamicClass.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Визуализация областей памяти:
```java
public class HeapVisualization {
    public void visualizeHeapStructure() {
        System.out.println("=== Структура кучи Java ===");
        System.out.println();
        System.out.println("┌─────────────────────────────────────┐");
        System.out.println("│           JAVA HEAP                 │");
        System.out.println("├─────────────────────────────────────┤");
        System.out.println("│         Young Generation            │");
        System.out.println("│  ┌─────────┬─────────┬─────────┐   │");
        System.out.println("│  │  Eden   │ Surv S0 │ Surv S1 │   │");
        System.out.println("│  │ Space   │  Space  │  Space  │   │");
        System.out.println("│  └─────────┴─────────┴─────────┘   │");
        System.out.println("├─────────────────────────────────────┤");
        System.out.println("│         Old Generation              │");
        System.out.println("│          (Tenured)                  │");
        System.out.println("└─────────────────────────────────────┘");
        System.out.println();
        System.out.println("┌─────────────────────────────────────┐");
        System.out.println("│           METASPACE                 │");
        System.out.println("│      (Native Memory)                │");
        System.out.println("│   - Class metadata                  │");
        System.out.println("│   - Method bytecode                 │");
        System.out.println("│   - Constant pool                   │");
        System.out.println("└─────────────────────────────────────┘");
    }
    
    public void explainMemoryFlow() {
        System.out.println("\n=== Поток объектов между областями ===");
        System.out.println();
        System.out.println("1. new Object() → Eden Space");
        System.out.println("2. Minor GC → Eden → Survivor S0");
        System.out.println("3. Minor GC → S0 ↔ S1 (age++)");
        System.out.println("4. age >= threshold → Old Generation");
        System.out.println("5. Large objects → Old Generation (сразу)");
        System.out.println("6. Major GC → Old Generation cleanup");
        System.out.println("7. Full GC → Young + Old + Metaspace");
    }
}
```

### Размеры областей памяти:
```java
public class HeapSizing {
    public void explainDefaultSizes() {
        System.out.println("=== Размеры областей памяти (по умолчанию) ===");
        System.out.println();
        System.out.println("Young Generation: ~1/3 от общего размера кучи");
        System.out.println("├─ Eden Space: ~80% от Young Generation");
        System.out.println("├─ Survivor S0: ~10% от Young Generation");
        System.out.println("└─ Survivor S1: ~10% от Young Generation");
        System.out.println();
        System.out.println("Old Generation: ~2/3 от общего размера кучи");
        System.out.println();
        System.out.println("Metaspace: Ограничен только доступной нативной памятью");
    }
    
    public void showTuningParameters() {
        System.out.println("=== JVM параметры для настройки размеров ===");
        System.out.println();
        System.out.println("-Xms<size>          : Начальный размер кучи");
        System.out.println("-Xmx<size>          : Максимальный размер кучи");
        System.out.println("-Xmn<size>          : Размер Young Generation");
        System.out.println("-XX:NewRatio=<n>    : Отношение Old/Young (default: 2)");
        System.out.println("-XX:SurvivorRatio=<n> : Отношение Eden/Survivor (default: 8)");
        System.out.println("-XX:MaxMetaspaceSize=<size> : Максимальный размер Metaspace");
        System.out.println();
        System.out.println("Примеры:");
        System.out.println("java -Xms1g -Xmx4g -Xmn1g MyApp");
        System.out.println("java -XX:NewRatio=3 -XX:SurvivorRatio=6 MyApp");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Что такое Minor GC, Major GC и Full GC?
Различные типы сборки мусора работают с разными областями памяти:

### Minor GC (Young Generation GC)
```java
public class MinorGCExample {
    public void explainMinorGC() {
        /*
         * Minor GC:
         * - Работает только с Young Generation
         * - Запускается когда Eden Space заполняется
         * - Быстрый (обычно < 100ms)
         * - Происходит часто
         * - Использует copying algorithm
         * - Stop-the-world пауза короткая
         */
    }
    
    public void demonstrateMinorGC() {
        System.out.println("=== Демонстрация Minor GC ===");
        
        // Создаем много объектов в Eden Space
        List<Object> survivors = new ArrayList<>();
        
        for (int i = 0; i < 100000; i++) {
            // Большинство этих объектов станут мусором
            String temp1 = "temporary_" + i;
            String temp2 = temp1.toUpperCase();
            String temp3 = temp2.toLowerCase();
            
            // Только каждый 1000-й объект "выживет"
            if (i % 1000 == 0) {
                survivors.add(temp3); // Этот объект может перейти в Survivor Space
            }
            
            // temp1, temp2, temp3 (кроме сохраненных) станут мусором
        }
        
        // Принудительно запускаем GC для демонстрации
        long beforeGC = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        System.gc(); // Может запустить Minor GC
        long afterGC = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        
        System.out.println("Memory before GC: " + beforeGC / 1024 / 1024 + " MB");
        System.out.println("Memory after GC: " + afterGC / 1024 / 1024 + " MB");
        System.out.println("Survivors count: " + survivors.size());
    }
    
    public void showMinorGCProcess() {
        System.out.println("\n=== Процесс Minor GC ===");
        System.out.println("1. Eden Space заполняется");
        System.out.println("2. Приложение останавливается (STW)");
        System.out.println("3. Живые объекты копируются из Eden в Survivor S0");
        System.out.println("4. Живые объекты из S1 копируются в S0 (age++)");
        System.out.println("5. Eden и S1 очищаются");
        System.out.println("6. S0 и S1 меняются ролями");
        System.out.println("7. Объекты с age >= threshold → Old Generation");
        System.out.println("8. Приложение возобновляется");
    }
}
```

### Major GC (Old Generation GC)
```java
public class MajorGCExample {
    private static final List<Object> longLivedCache = new ArrayList<>();
    
    public void explainMajorGC() {
        /*
         * Major GC:
         * - Работает с Old Generation
         * - Запускается когда Old Generation заполняется
         * - Медленный (может быть > 1 секунды)
         * - Происходит редко
         * - Использует mark-sweep-compact
         * - Длинные Stop-the-world паузы
         */
    }
    
    public void demonstrateMajorGC() {
        System.out.println("=== Демонстрация Major GC ===");
        
        // Создаем объекты, которые попадут в Old Generation
        for (int i = 0; i < 10000; i++) {
            // Создаем долгоживущие объекты
            Map<String, Object> longLivedObject = new HashMap<>();
            longLivedObject.put("id", i);
            longLivedObject.put("data", new byte[1024]); // 1KB данных
            longLivedObject.put("timestamp", System.currentTimeMillis());
            
            longLivedCache.add(longLivedObject);
            
            // Периодически удаляем старые объекты
            if (i % 1000 == 0 && longLivedCache.size() > 5000) {
                // Удаляем первую половину
                longLivedCache.subList(0, longLivedCache.size() / 2).clear();
                System.out.println("Cleared old objects, remaining: " + longLivedCache.size());
            }
        }
        
        // Эти удаления могут вызвать фрагментацию в Old Generation
        // что в конечном итоге приведет к Major GC
        
        System.out.println("Final cache size: " + longLivedCache.size());
    }
    
    public void showMajorGCProcess() {
        System.out.println("\n=== Процесс Major GC ===");
        System.out.println("1. Old Generation заполняется");
        System.out.println("2. Приложение останавливается (длинная STW пауза)");
        System.out.println("3. Mark: пометка всех живых объектов в Old Gen");
        System.out.println("4. Sweep: удаление непомеченных объектов");
        System.out.println("5. Compact: уплотнение памяти (устранение фрагментации)");
        System.out.println("6. Обновление ссылок на перемещенные объекты");
        System.out.println("7. Приложение возобновляется");
    }
}
```

### Full GC (Complete Heap Collection)
```java
public class FullGCExample {
    public void explainFullGC() {
        /*
         * Full GC:
         * - Работает со всей кучей (Young + Old + Metaspace)
         * - Самый медленный тип GC
         * - Может занимать несколько секунд
         * - Происходит редко
         * - Может быть вызван принудительно (System.gc())
         * - Очень длинные Stop-the-world паузы
         */
    }
    
    public void demonstrateFullGC() {
        System.out.println("=== Демонстрация Full GC ===");
        
        long beforeMemory = getUsedMemory();
        System.out.println("Memory before Full GC: " + beforeMemory / 1024 / 1024 + " MB");
        
        // Принудительно запускаем Full GC
        long startTime = System.currentTimeMillis();
        System.gc();
        System.runFinalization(); // Запускаем финализацию
        long endTime = System.currentTimeMillis();
        
        long afterMemory = getUsedMemory();
        System.out.println("Memory after Full GC: " + afterMemory / 1024 / 1024 + " MB");
        System.out.println("Memory freed: " + (beforeMemory - afterMemory) / 1024 / 1024 + " MB");
        System.out.println("GC time: " + (endTime - startTime) + " ms");
    }
    
    private long getUsedMemory() {
        Runtime runtime = Runtime.getRuntime();
        return runtime.totalMemory() - runtime.freeMemory();
    }
    
    public void showFullGCTriggers() {
        System.out.println("\n=== Причины запуска Full GC ===");
        System.out.println("1. System.gc() вызван явно");
        System.out.println("2. Old Generation заполнилось");
        System.out.println("3. Metaspace заполнилось (Java 8+)");
        System.out.println("4. Permanent Generation заполнилось (Java 7-)");
        System.out.println("5. Heap dump запрошен");
        System.out.println("6. JVM определила необходимость полной очистки");
    }
    
    public void showFullGCProcess() {
        System.out.println("\n=== Процесс Full GC ===");
        System.out.println("1. Приложение полностью останавливается");
        System.out.println("2. Очистка Young Generation (Minor GC)");
        System.out.println("3. Очистка Old Generation (Major GC)");
        System.out.println("4. Очистка Metaspace (при необходимости)");
        System.out.println("5. Уплотнение всех областей памяти");
        System.out.println("6. Обновление всех ссылок");
        System.out.println("7. Приложение возобновляется");
    }
}
```

### Сравнение типов GC:
```java
public class GCTypesComparison {
    public void compareGCTypes() {
        System.out.println("=== Сравнение типов сборки мусора ===");
        System.out.println();
        
        System.out.printf("%-15s %-15s %-15s %-20s %-15s%n", 
            "Тип GC", "Область", "Частота", "Время паузы", "Алгоритм");
        System.out.println("─".repeat(80));
        
        System.out.printf("%-15s %-15s %-15s %-20s %-15s%n",
            "Minor GC", "Young Gen", "Часто", "< 100ms", "Copying");
            
        System.out.printf("%-15s %-15s %-15s %-20s %-15s%n",
            "Major GC", "Old Gen", "Редко", "100ms - 1s+", "Mark-Sweep-Compact");
            
        System.out.printf("%-15s %-15s %-15s %-20s %-15s%n",
            "Full GC", "Вся куча", "Очень редко", "1s+", "Все алгоритмы");
    }
    
    public void showGCMetrics() {
        System.out.println("\n=== Метрики GC ===");
        
        // Получаем информацию о GC через MXBeans
        java.lang.management.MemoryMXBean memoryMX = 
            java.lang.management.ManagementFactory.getMemoryMXBean();
        
        java.lang.management.MemoryUsage heapUsage = memoryMX.getHeapMemoryUsage();
        java.lang.management.MemoryUsage nonHeapUsage = memoryMX.getNonHeapMemoryUsage();
        
        System.out.println("Heap Memory:");
        System.out.println("  Used: " + heapUsage.getUsed() / 1024 / 1024 + " MB");
        System.out.println("  Committed: " + heapUsage.getCommitted() / 1024 / 1024 + " MB");
        System.out.println("  Max: " + heapUsage.getMax() / 1024 / 1024 + " MB");
        
        System.out.println("Non-Heap Memory (Metaspace):");
        System.out.println("  Used: " + nonHeapUsage.getUsed() / 1024 / 1024 + " MB");
        System.out.println("  Committed: " + nonHeapUsage.getCommitted() / 1024 / 1024 + " MB");
        
        // Информация о сборщиках мусора
        java.util.List<java.lang.management.GarbageCollectorMXBean> gcMXBeans = 
            java.lang.management.ManagementFactory.getGarbageCollectorMXBeans();
        
        System.out.println("\nGarbage Collectors:");
        for (java.lang.management.GarbageCollectorMXBean gcMXBean : gcMXBeans) {
            System.out.println("  " + gcMXBean.getName() + ":");
            System.out.println("    Collections: " + gcMXBean.getCollectionCount());
            System.out.println("    Time: " + gcMXBean.getCollectionTime() + " ms");
        }
    }
}
```

### Практические рекомендации:
```java
public class GCBestPractices {
    public void showBestPractices() {
        System.out.println("=== Лучшие практики работы с GC ===");
        System.out.println();
        
        System.out.println("1. Избегайте System.gc():");
        System.out.println("   - JVM лучше знает, когда запускать GC");
        System.out.println("   - Может вызвать ненужные Full GC");
        System.out.println("   - Используйте -XX:+DisableExplicitGC");
        
        System.out.println("\n2. Оптимизируйте создание объектов:");
        System.out.println("   - Переиспользуйте объекты где возможно");
        System.out.println("   - Используйте StringBuilder вместо String concatenation");
        System.out.println("   - Применяйте object pooling для дорогих объектов");
        
        System.out.println("\n3. Мониторьте GC метрики:");
        System.out.println("   - Частота и время GC пауз");
        System.out.println("   - Использование памяти");
        System.out.println("   - Throughput приложения");
        
        System.out.println("\n4. Настраивайте размеры кучи:");
        System.out.println("   - -Xms и -Xmx должны быть равны");
        System.out.println("   - Young Generation ~25-40% от общей кучи");
        System.out.println("   - Оставляйте запас памяти в системе");
    }
    
    // Пример оптимизации создания объектов
    public void demonstrateOptimization() {
        System.out.println("\n=== Пример оптимизации ===");
        
        // Плохо - много временных объектов
        String result1 = concatenateStrings(new String[]{"a", "b", "c", "d", "e"});
        
        // Хорошо - минимум временных объектов
        String result2 = concatenateStringsOptimized(new String[]{"a", "b", "c", "d", "e"});
        
        System.out.println("Result1: " + result1);
        System.out.println("Result2: " + result2);
    }
    
    // Неоптимальный способ - создает много временных String объектов
    public String concatenateStrings(String[] strings) {
        String result = "";
        for (String s : strings) {
            result += s; // Каждая операция создает новый String!
        }
        return result;
    }
    
    // Оптимальный способ - минимум временных объектов
    public String concatenateStringsOptimized(String[] strings) {
        StringBuilder sb = new StringBuilder();
        for (String s : strings) {
            sb.append(s); // Переиспользуем внутренний буфер
        }
        return sb.toString(); // Только один новый String
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора) 

## Какие сборщики мусора есть в HotSpot JVM?
HotSpot JVM предоставляет несколько различных сборщиков мусора для разных сценариев использования:

### Обзор сборщиков:
```java
public class GCCollectorsOverview {
    public void showGCCollectors() {
        System.out.println("=== Сборщики мусора HotSpot JVM ===");
        System.out.println();
        
        System.out.println("1. Serial GC (-XX:+UseSerialGC)");
        System.out.println("   - Однопоточный");
        System.out.println("   - Для небольших приложений");
        System.out.println("   - Client-режим по умолчанию");
        
        System.out.println("\n2. Parallel GC (-XX:+UseParallelGC)");
        System.out.println("   - Многопоточный");
        System.out.println("   - Высокая пропускная способность");
        System.out.println("   - Server-режим по умолчанию");
        
        System.out.println("\n3. CMS GC (-XX:+UseConcMarkSweepGC)");
        System.out.println("   - Конкурентный");
        System.out.println("   - Низкие паузы");
        System.out.println("   - Deprecated в Java 9+");
        
        System.out.println("\n4. G1 GC (-XX:+UseG1GC)");
        System.out.println("   - Низкие паузы");
        System.out.println("   - Предсказуемое время");
        System.out.println("   - Для больших куч");
        
        System.out.println("\n5. ZGC (-XX:+UseZGC)");
        System.out.println("   - Сверхнизкие паузы (<10ms)");
        System.out.println("   - Масштабируется до TB");
        System.out.println("   - Java 11+ (экспериментальный)");
        
        System.out.println("\n6. Shenandoah (-XX:+UseShenandoahGC)");
        System.out.println("   - Низкие паузы");
        System.out.println("   - Конкурентный");
        System.out.println("   - OpenJDK");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как работает Serial GC?
__Serial GC__ — это самый простой сборщик мусора, который использует один поток для всех операций GC.

```java
public class SerialGCExample {
    public void explainSerialGC() {
        /*
         * Serial GC характеристики:
         * - Однопоточный
         * - Stop-the-world для всех операций
         * - Copying для Young Generation
         * - Mark-Sweep-Compact для Old Generation
         * - Подходит для небольших приложений (<100MB heap)
         * - Минимальные накладные расходы
         */
    }
    
    public void demonstrateSerialGC() {
        System.out.println("=== Serial GC Demonstration ===");
        System.out.println("JVM параметры: -XX:+UseSerialGC -Xms64m -Xmx128m");
        System.out.println();
        
        // Создаем объекты для демонстрации
        List<String> data = new ArrayList<>();
        
        for (int i = 0; i < 10000; i++) {
            data.add("SerialGC_Item_" + i);
            
            if (i % 1000 == 0) {
                System.out.println("Created " + i + " objects");
                // Serial GC будет останавливать приложение для очистки
            }
        }
        
        System.out.println("Total objects: " + data.size());
    }
    
    public void showSerialGCProcess() {
        System.out.println("\n=== Процесс Serial GC ===");
        System.out.println();
        
        System.out.println("Young Generation (Minor GC):");
        System.out.println("1. Приложение останавливается");
        System.out.println("2. Один поток копирует живые объекты Eden → Survivor");
        System.out.println("3. Очистка Eden space");
        System.out.println("4. Приложение возобновляется");
        
        System.out.println("\nOld Generation (Major GC):");
        System.out.println("1. Приложение останавливается");
        System.out.println("2. Один поток помечает живые объекты (Mark)");
        System.out.println("3. Удаление мертвых объектов (Sweep)");
        System.out.println("4. Уплотнение памяти (Compact)");
        System.out.println("5. Приложение возобновляется");
    }
    
    public void showSerialGCUseCases() {
        System.out.println("\n=== Когда использовать Serial GC ===");
        System.out.println("✓ Небольшие приложения (heap < 100MB)");
        System.out.println("✓ Однопроцессорные системы");
        System.out.println("✓ Клиентские приложения");
        System.out.println("✓ Batch обработка");
        System.out.println("✓ Микросервисы с небольшой памятью");
        System.out.println();
        System.out.println("✗ Многопроцессорные серверы");
        System.out.println("✗ Большие кучи (>100MB)");
        System.out.println("✗ Приложения, чувствительные к паузам");
        System.out.println("✗ Высоконагруженные системы");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как работает Parallel GC?
__Parallel GC__ — это многопоточная версия Serial GC, которая использует несколько потоков для сборки мусора.

```java
public class ParallelGCExample {
    public void explainParallelGC() {
        /*
         * Parallel GC характеристики:
         * - Многопоточный (по умолчанию = количество CPU)
         * - Stop-the-world для всех операций
         * - Copying для Young Generation
         * - Mark-Sweep-Compact для Old Generation
         * - Высокая пропускная способность
         * - Подходит для серверных приложений
         */
    }
    
    public void demonstrateParallelGC() {
        System.out.println("=== Parallel GC Demonstration ===");
        System.out.println("JVM параметры: -XX:+UseParallelGC -XX:ParallelGCThreads=4");
        System.out.println();
        
        // Создаем нагрузку для демонстрации параллельной сборки
        List<byte[]> memoryConsumer = new ArrayList<>();
        
        long startTime = System.currentTimeMillis();
        
        for (int i = 0; i < 1000; i++) {
            // Создаем массивы разного размера
            byte[] data = new byte[1024 * (i % 100 + 1)]; // 1KB - 100KB
            memoryConsumer.add(data);
            
            if (i % 100 == 0) {
                long currentTime = System.currentTimeMillis();
                System.out.println("Batch " + i + " completed in " + 
                    (currentTime - startTime) + "ms");
                startTime = currentTime;
                
                // Parallel GC будет использовать несколько потоков
                // для более быстрой очистки
            }
        }
        
        System.out.println("Total arrays created: " + memoryConsumer.size());
    }
    
    public void showParallelGCConfiguration() {
        System.out.println("\n=== Конфигурация Parallel GC ===");
        System.out.println();
        
        System.out.println("Основные параметры:");
        System.out.println("-XX:+UseParallelGC              : Включить Parallel GC");
        System.out.println("-XX:ParallelGCThreads=N         : Количество потоков GC");
        System.out.println("-XX:MaxGCPauseMillis=N          : Максимальная пауза GC (мс)");
        System.out.println("-XX:GCTimeRatio=N               : Отношение времени GC к работе");
        System.out.println("-XX:+UseAdaptiveSizePolicy      : Автоматическая настройка");
        
        System.out.println("\nПримеры:");
        System.out.println("java -XX:+UseParallelGC -XX:ParallelGCThreads=8 MyApp");
        System.out.println("java -XX:+UseParallelGC -XX:MaxGCPauseMillis=200 MyApp");
        System.out.println("java -XX:+UseParallelGC -XX:GCTimeRatio=19 MyApp");
    }
    
    public void showParallelGCBenefits() {
        System.out.println("\n=== Преимущества Parallel GC ===");
        System.out.println("✓ Высокая пропускная способность");
        System.out.println("✓ Эффективное использование многоядерных CPU");
        System.out.println("✓ Автоматическая настройка размеров поколений");
        System.out.println("✓ Простота конфигурации");
        System.out.println("✓ Стабильность и надежность");
        
        System.out.println("\n=== Недостатки Parallel GC ===");
        System.out.println("✗ Длинные Stop-the-world паузы");
        System.out.println("✗ Паузы увеличиваются с размером кучи");
        System.out.println("✗ Не подходит для latency-sensitive приложений");
        System.out.println("✗ Может вызывать 'GC hiccups'");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как работает G1 (Garbage First)?
__G1 GC__ — это сборщик мусора с низкими паузами, разработанный для работы с большими кучами.

```java
public class G1GCExample {
    public void explainG1GC() {
        /*
         * G1 GC характеристики:
         * - Низкие и предсказуемые паузы
         * - Куча разделена на регионы (~2048 штук)
         * - Конкурентная пометка
         * - Инкрементальная сборка
         * - Подходит для больших куч (>6GB)
         * - Цель: пауза <10ms при throughput >90%
         */
    }
    
    public void demonstrateG1GC() {
        System.out.println("=== G1 GC Demonstration ===");
        System.out.println("JVM параметры: -XX:+UseG1GC -XX:MaxGCPauseMillis=50");
        System.out.println();
        
        // G1 работает с регионами, демонстрируем разные типы объектов
        Map<String, Object> regionData = new HashMap<>();
        List<String> youngObjects = new ArrayList<>();
        List<byte[]> oldObjects = new ArrayList<>();
        
        for (int i = 0; i < 5000; i++) {
            // Молодые объекты (будут в Young regions)
            youngObjects.add("Young_" + i);
            
            // Периодически создаем долгоживущие объекты
            if (i % 100 == 0) {
                oldObjects.add(new byte[1024]); // Old regions
                regionData.put("key_" + i, new Object());
            }
            
            // Очищаем молодые объекты периодически
            if (i % 500 == 0) {
                youngObjects.clear();
                System.out.println("Region " + (i/500) + " processed");
                
                // G1 может собирать только некоторые регионы
                // вместо всей кучи
            }
        }
        
        System.out.println("Old objects: " + oldObjects.size());
        System.out.println("Region data: " + regionData.size());
    }
    
    public void showG1GCRegions() {
        System.out.println("\n=== G1 Регионы ===");
        System.out.println();
        
        System.out.println("Типы регионов:");
        System.out.println("• Eden regions     - новые объекты");
        System.out.println("• Survivor regions - объекты, пережившие GC");
        System.out.println("• Old regions      - долгоживущие объекты");
        System.out.println("• Humongous regions- большие объекты (>50% региона)");
        System.out.println("• Free regions     - свободные регионы");
        
        System.out.println("\nПроцесс G1 GC:");
        System.out.println("1. Concurrent marking - пометка живых объектов");
        System.out.println("2. Выбор регионов с наибольшим количеством мусора");
        System.out.println("3. Evacuation - копирование живых объектов");
        System.out.println("4. Освобождение регионов");
        System.out.println("5. Обновление remembered sets");
    }
    
    public void showG1GCConfiguration() {
        System.out.println("\n=== Конфигурация G1 GC ===");
        System.out.println();
        
        System.out.println("Основные параметры:");
        System.out.println("-XX:+UseG1GC                    : Включить G1 GC");
        System.out.println("-XX:MaxGCPauseMillis=N          : Цель паузы (default: 200ms)");
        System.out.println("-XX:G1HeapRegionSize=N          : Размер региона");
        System.out.println("-XX:G1NewSizePercent=N          : Мин % Young Generation");
        System.out.println("-XX:G1MaxNewSizePercent=N       : Макс % Young Generation");
        System.out.println("-XX:G1MixedGCCountTarget=N      : Количество Mixed GC");
        
        System.out.println("\nПримеры:");
        System.out.println("java -XX:+UseG1GC -XX:MaxGCPauseMillis=100 MyApp");
        System.out.println("java -XX:+UseG1GC -XX:G1HeapRegionSize=32m MyApp");
    }
    
    public void showG1GCUseCases() {
        System.out.println("\n=== Когда использовать G1 GC ===");
        System.out.println("✓ Большие кучи (>6GB)");
        System.out.println("✓ Приложения, чувствительные к паузам");
        System.out.println("✓ Веб-серверы");
        System.out.println("✓ Интерактивные приложения");
        System.out.println("✓ Требования к SLA по latency");
        
        System.out.println("\n✗ Небольшие кучи (<6GB)");
        System.out.println("✗ Batch обработка");
        System.out.println("✗ Приложения с очень высоким allocation rate");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как принудительно запустить сборщик мусора?
Существует несколько способов запустить сборщик мусора, но это обычно не рекомендуется.

```java
public class ForceGCExample {
    public void demonstrateForceGC() {
        System.out.println("=== Принудительный запуск GC ===");
        
        // Создаем объекты для демонстрации
        List<String> data = new ArrayList<>();
        for (int i = 0; i < 100000; i++) {
            data.add("Item_" + i);
        }
        
        // Измеряем память до GC
        long beforeGC = getUsedMemory();
        System.out.println("Memory before GC: " + beforeGC / 1024 / 1024 + " MB");
        
        // Убираем ссылки на объекты
        data.clear();
        data = null;
        
        // Способ 1: System.gc()
        System.out.println("\nВызов System.gc()...");
        long startTime = System.currentTimeMillis();
        System.gc();
        long endTime = System.currentTimeMillis();
        
        long afterGC = getUsedMemory();
        System.out.println("Memory after GC: " + afterGC / 1024 / 1024 + " MB");
        System.out.println("Time taken: " + (endTime - startTime) + " ms");
        System.out.println("Memory freed: " + (beforeGC - afterGC) / 1024 / 1024 + " MB");
        
        // Способ 2: Runtime.getRuntime().gc()
        System.out.println("\nВызов Runtime.getRuntime().gc()...");
        Runtime.getRuntime().gc();
        
        // Способ 3: Финализация
        System.out.println("\nВызов System.runFinalization()...");
        System.runFinalization();
    }
    
    private long getUsedMemory() {
        Runtime runtime = Runtime.getRuntime();
        return runtime.totalMemory() - runtime.freeMemory();
    }
    
    public void showGCMXBeanApproach() {
        System.out.println("\n=== Использование GC MXBean ===");
        
        // Получаем информацию о сборщиках мусора
        List<java.lang.management.GarbageCollectorMXBean> gcBeans = 
            java.lang.management.ManagementFactory.getGarbageCollectorMXBeans();
        
        System.out.println("Доступные сборщики мусора:");
        for (java.lang.management.GarbageCollectorMXBean gcBean : gcBeans) {
            System.out.println("- " + gcBean.getName());
            System.out.println("  Collections: " + gcBean.getCollectionCount());
            System.out.println("  Time: " + gcBean.getCollectionTime() + " ms");
            
            // Можно запустить GC через MXBean (если поддерживается)
            if (gcBean instanceof com.sun.management.GarbageCollectorMXBean) {
                // Некоторые реализации позволяют запускать GC
                System.out.println("  Supports GC invocation: " + 
                    gcBean.getObjectName().toString());
            }
        }
    }
    
    public void showMemoryMXBeanApproach() {
        System.out.println("\n=== Использование Memory MXBean ===");
        
        java.lang.management.MemoryMXBean memoryMXBean = 
            java.lang.management.ManagementFactory.getMemoryMXBean();
        
        // Получаем информацию о памяти
        java.lang.management.MemoryUsage heapBefore = memoryMXBean.getHeapMemoryUsage();
        System.out.println("Heap before GC: " + heapBefore.getUsed() / 1024 / 1024 + " MB");
        
        // Запускаем GC через MemoryMXBean
        memoryMXBean.gc();
        
        java.lang.management.MemoryUsage heapAfter = memoryMXBean.getHeapMemoryUsage();
        System.out.println("Heap after GC: " + heapAfter.getUsed() / 1024 / 1024 + " MB");
    }
    
    public void showWhyNotToUseSystemGC() {
        System.out.println("\n=== Почему не стоит использовать System.gc() ===");
        System.out.println();
        
        System.out.println("Проблемы:");
        System.out.println("✗ Не гарантирует немедленный запуск GC");
        System.out.println("✗ Может вызвать Full GC (очень медленно)");
        System.out.println("✗ Прерывает работу приложения");
        System.out.println("✗ JVM лучше знает, когда нужен GC");
        System.out.println("✗ Может ухудшить производительность");
        
        System.out.println("\nАльтернативы:");
        System.out.println("✓ Доверьтесь автоматическому GC");
        System.out.println("✓ Настройте параметры GC");
        System.out.println("✓ Оптимизируйте создание объектов");
        System.out.println("✓ Используйте профилировщики");
        System.out.println("✓ Мониторьте GC метрики");
        
        System.out.println("\nПараметры JVM:");
        System.out.println("-XX:+DisableExplicitGC          : Отключить System.gc()");
        System.out.println("-XX:+ExplicitGCInvokesConcurrent : Использовать concurrent GC");
    }
    
    public void showLegitimateUseCases() {
        System.out.println("\n=== Допустимые случаи использования ===");
        System.out.println();
        
        System.out.println("1. Тестирование и отладка:");
        System.out.println("   - Проверка утечек памяти");
        System.out.println("   - Измерение потребления памяти");
        System.out.println("   - Unit тесты");
        
        System.out.println("\n2. Критические моменты:");
        System.out.println("   - Перед созданием heap dump");
        System.out.println("   - После загрузки больших данных");
        System.out.println("   - В batch приложениях между задачами");
        
        System.out.println("\n3. Мониторинг:");
        System.out.println("   - Получение актуальных метрик памяти");
        System.out.println("   - Baseline для измерений");
    }
    
    // Пример правильного использования в тестах
    public void testMemoryUsage() {
        System.out.println("\n=== Пример использования в тестах ===");
        
        // Создаем базовую линию
        System.gc();
        System.runFinalization();
        long baseline = getUsedMemory();
        
        // Выполняем тестируемый код
        List<String> testData = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            testData.add("Test_" + i);
        }
        
        long afterCreation = getUsedMemory();
        System.out.println("Memory used by test data: " + 
            (afterCreation - baseline) / 1024 + " KB");
        
        // Очищаем данные
        testData.clear();
        testData = null;
        
        // Проверяем освобождение памяти
        System.gc();
        System.runFinalization();
        long afterCleanup = getUsedMemory();
        
        System.out.println("Memory after cleanup: " + 
            (afterCleanup - baseline) / 1024 + " KB");
        
        if (afterCleanup - baseline < 1024) { // Менее 1KB разницы
            System.out.println("✓ Memory leak test PASSED");
        } else {
            System.out.println("✗ Possible memory leak detected");
        }
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Что такое OutOfMemoryError?
__OutOfMemoryError__ возникает, когда JVM не может выделить память для новых объектов, и сборщик мусора не может освободить достаточно места.

```java
public class OutOfMemoryErrorExample {
    public void explainOOME() {
        System.out.println("=== OutOfMemoryError ===");
        System.out.println();
        
        System.out.println("Типы OutOfMemoryError:");
        System.out.println("1. Java heap space");
        System.out.println("2. GC overhead limit exceeded");
        System.out.println("3. Metaspace");
        System.out.println("4. Direct buffer memory");
        System.out.println("5. Unable to create new native thread");
    }
    
    // ВНИМАНИЕ: Эти методы могут вызвать OutOfMemoryError!
    // Запускайте с осторожностью и достаточным количеством памяти
    
    public void demonstrateHeapSpaceOOME() {
        System.out.println("\n=== Java heap space OOME ===");
        System.out.println("Создание объектов до исчерпания памяти...");
        
        try {
            List<byte[]> memoryEater = new ArrayList<>();
            int count = 0;
            
            while (true) {
                // Создаем массивы по 1MB
                byte[] chunk = new byte[1024 * 1024];
                memoryEater.add(chunk);
                count++;
                
                if (count % 100 == 0) {
                    System.out.println("Allocated " + count + " MB");
                }
            }
        } catch (OutOfMemoryError e) {
            System.out.println("OutOfMemoryError caught: " + e.getMessage());
            System.out.println("Heap space exhausted!");
        }
    }
    
    public void demonstrateGCOverheadOOME() {
        System.out.println("\n=== GC overhead limit exceeded ===");
        System.out.println("Создание объектов, которые сложно собрать...");
        
        try {
            Map<String, String> map = new HashMap<>();
            int count = 0;
            
            while (true) {
                // Создаем много маленьких объектов
                // GC будет тратить много времени на их сборку
                String key = "key_" + count;
                String value = "value_" + count + "_" + System.nanoTime();
                map.put(key, value);
                
                count++;
                if (count % 100000 == 0) {
                    System.out.println("Created " + count + " entries");
                }
            }
        } catch (OutOfMemoryError e) {
            System.out.println("OutOfMemoryError caught: " + e.getMessage());
            System.out.println("GC overhead limit exceeded!");
        }
    }
    
    public void demonstrateMetaspaceOOME() {
        System.out.println("\n=== Metaspace OOME ===");
        System.out.println("Динамическое создание классов...");
        
        try {
            // Этот пример требует библиотеки для генерации классов
            // например, ASM или Javassist
            System.out.println("Для демонстрации нужна библиотека генерации классов");
            System.out.println("Metaspace OOME происходит при:");
            System.out.println("- Динамическом создании множества классов");
            System.out.println("- Утечках ClassLoader'ов");
            System.out.println("- Большом количестве lambda выражений");
            
        } catch (OutOfMemoryError e) {
            System.out.println("OutOfMemoryError caught: " + e.getMessage());
            System.out.println("Metaspace exhausted!");
        }
    }
    
    public void showOOMEPrevention() {
        System.out.println("\n=== Предотвращение OutOfMemoryError ===");
        System.out.println();
        
        System.out.println("1. Heap Space:");
        System.out.println("   - Увеличить размер кучи (-Xmx)");
        System.out.println("   - Оптимизировать использование памяти");
        System.out.println("   - Найти и исправить утечки памяти");
        System.out.println("   - Использовать профилировщики");
        
        System.out.println("\n2. GC Overhead:");
        System.out.println("   - Увеличить размер кучи");
        System.out.println("   - Оптимизировать создание объектов");
        System.out.println("   - Использовать более эффективные структуры данных");
        System.out.println("   - Настроить параметры GC");
        
        System.out.println("\n3. Metaspace:");
        System.out.println("   - Увеличить размер Metaspace (-XX:MaxMetaspaceSize)");
        System.out.println("   - Избегать утечек ClassLoader'ов");
        System.out.println("   - Ограничить динамическое создание классов");
        
        System.out.println("\n4. Direct Buffer:");
        System.out.println("   - Увеличить размер direct memory (-XX:MaxDirectMemorySize)");
        System.out.println("   - Освобождать ByteBuffer'ы явно");
        System.out.println("   - Использовать пулы буферов");
    }
    
    public void showOOMEDebugging() {
        System.out.println("\n=== Отладка OutOfMemoryError ===");
        System.out.println();
        
        System.out.println("JVM параметры для отладки:");
        System.out.println("-XX:+HeapDumpOnOutOfMemoryError  : Создать heap dump");
        System.out.println("-XX:HeapDumpPath=/path/to/dump   : Путь для heap dump");
        System.out.println("-XX:+PrintGCDetails              : Подробная информация о GC");
        System.out.println("-XX:+PrintGCTimeStamps           : Временные метки GC");
        System.out.println("-XX:+UseGCLogFileRotation        : Ротация GC логов");
        
        System.out.println("\nИнструменты анализа:");
        System.out.println("• Eclipse MAT (Memory Analyzer Tool)");
        System.out.println("• VisualVM");
        System.out.println("• JProfiler");
        System.out.println("• YourKit");
        System.out.println("• jmap, jhat (JDK tools)");
        
        System.out.println("\nПример команды анализа:");
        System.out.println("jmap -dump:format=b,file=heap.hprof <pid>");
        System.out.println("jhat heap.hprof");
    }
    
    // Пример безопасного мониторинга памяти
    public void monitorMemoryUsage() {
        System.out.println("\n=== Мониторинг использования памяти ===");
        
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        
        // Heap memory
        MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
        long heapUsed = heapUsage.getUsed();
        long heapMax = heapUsage.getMax();
        double heapUsagePercent = (double) heapUsed / heapMax * 100;
        
        System.out.println("Heap Memory:");
        System.out.println("  Used: " + heapUsed / 1024 / 1024 + " MB");
        System.out.println("  Max: " + heapMax / 1024 / 1024 + " MB");
        System.out.println("  Usage: " + String.format("%.2f%%", heapUsagePercent));
        
        // Non-heap memory (Metaspace)
        MemoryUsage nonHeapUsage = memoryBean.getNonHeapMemoryUsage();
        long nonHeapUsed = nonHeapUsage.getUsed();
        long nonHeapMax = nonHeapUsage.getMax();
        
        System.out.println("Non-Heap Memory:");
        System.out.println("  Used: " + nonHeapUsed / 1024 / 1024 + " MB");
        System.out.println("  Max: " + (nonHeapMax > 0 ? nonHeapMax / 1024 / 1024 + " MB" : "Unlimited"));
        
        // Предупреждение о высоком использовании памяти
        if (heapUsagePercent > 80) {
            System.out.println("⚠️  WARNING: High heap usage detected!");
        }
        
        if (heapUsagePercent > 95) {
            System.out.println("🚨 CRITICAL: Very high heap usage! OOME risk!");
        }
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как анализировать heap dump?
Heap dump — это моментальный снимок состояния кучи в момент, когда OutOfMemoryError возник. Он содержит информацию о всех объектах, которые находятся в памяти в этот момент.

```java
public class HeapDumpAnalysis {
    public void explainHeapDump() {
        System.out.println("=== Анализ heap dump ===");
        System.out.println();
        
        System.out.println("Heap dump содержит:");
        System.out.println("• Информацию о всех объектах в памяти");
        System.out.println("• Ссылки между объектами");
        System.out.println("• Информацию о памяти, используемой объектами");
        System.out.println("• Информацию о сборщиках мусора");
        System.out.println("• Информацию о метаданных классов");
    }
    
    public void showHeapDumpTools() {
        System.out.println("\n=== Инструменты для анализа heap dump ===");
        System.out.println();
        
        System.out.println("1. Eclipse MAT (Memory Analyzer Tool)");
        System.out.println("   - Самый популярный инструмент");
        System.out.println("   - Бесплатный");
        System.out.println("   - Поддерживает множество форматов");
        System.out.println("   - Интерактивный интерфейс");
        
        System.out.println("\n2. VisualVM");
        System.out.println("   - Встроен в JDK");
        System.out.println("   - Легко использовать");
        System.out.println("   - Показывает динамику памяти");
        
        System.out.println("\n3. JProfiler");
        System.out.println("   - Коммерческий");
        System.out.println("   - Более мощные возможности");
        System.out.println("   - Поддерживает множество платформ");
        
        System.out.println("\n4. YourKit");
        System.out.println("   - Коммерческий");
        System.out.println("   - Очень мощный");
        System.out.println("   - Поддерживает множество платформ");
        
        System.out.println("\n5. jmap, jhat (JDK tools)");
        System.out.println("   - jmap: создает heap dump");
        System.out.println("   - jhat: запускает HTTP сервер для просмотра heap dump");
    }
    
    public void showHeapDumpCommands() {
        System.out.println("\n=== Команды для работы с heap dump ===");
        System.out.println();
        
        System.out.println("1. Создание heap dump:");
        System.out.println("   - jmap -dump:format=b,file=heap.hprof <pid>");
        System.out.println("   - jmap -dump:live,format=b,file=heap.hprof <pid>");
        
        System.out.println("\n2. Просмотр heap dump:");
        System.out.println("   - jhat heap.hprof");
        System.out.println("   - jhat -J-Xmx512m heap.hprof");
        
        System.out.println("\n3. Информация о сборщиках мусора:");
        System.out.println("   - jstat -gcutil <pid>");
        System.out.println("   - jstat -gc <pid> 1000");
        
        System.out.println("\n4. Информация о памяти:");
        System.out.println("   - jstat -gc <pid> 1000");
        System.out.println("   - jstat -gcutil <pid>");
    }
    
    public void showHeapDumpAnalysisSteps() {
        System.out.println("\n=== Шаги анализа heap dump ===");
        System.out.println();
        
        System.out.println("1. Создайте heap dump перед OutOfMemoryError.");
        System.out.println("   - jmap -dump:format=b,file=heap.hprof <pid>");
        
        System.out.println("\n2. Запустите jhat для просмотра:");
        System.out.println("   - jhat -J-Xmx512m heap.hprof");
        
        System.out.println("\n3. Используйте инструменты для:");
        System.out.println("   - Поиска утечек памяти");
        System.out.println("   - Определения размера объектов");
        System.out.println("   - Отслеживания ссылок");
        System.out.println("   - Анализа GC пауз");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Что такое метапространство (Metaspace)?
__Metaspace__ — это область памяти, которая используется для хранения метаданных классов, методов, констант и других структур, связанных с классами.

```java
public class MetaspaceExample {
    public void explainMetaspace() {
        /*
         * Metaspace (Java 8+):
         * - Заменил Permanent Generation
         * - Хранится в нативной памяти (не в куче)
         * - Автоматически расширяется
         * - Содержит метаданные классов
         * 
         * Permanent Generation (Java 7 и ранее):
         * - Часть кучи
         * - Фиксированный размер
         * - Мог вызывать OutOfMemoryError: PermGen space
         */
    }
    
    // Метаданные этого класса хранятся в Metaspace
    public static class ExampleClass {
        private String field1;
        private int field2;
        
        public void method1() {
            // Информация о методе в Metaspace
        }
        
        public String method2(int param) {
            return "Result: " + param;
        }
    }
    
    public void demonstrateMetaspace() {
        // При загрузке класса его метаданные попадают в Metaspace:
        // - Информация о полях
        // - Информация о методах
        // - Константы класса
        // - Bytecode методов
        
        ExampleClass example = new ExampleClass();
        
        // Объект example создается в куче (Eden Space)
        // Но метаданные класса ExampleClass уже в Metaspace
        
        // Использование рефлексии обращается к Metaspace
        Class<?> clazz = example.getClass();
        System.out.println("Class name: " + clazz.getName());
        System.out.println("Methods count: " + clazz.getDeclaredMethods().length);
        System.out.println("Fields count: " + clazz.getDeclaredFields().length);
    }
    
    // Динамическая загрузка классов может увеличить Metaspace
    public void demonstrateDynamicClassLoading() {
        try {
            // Загружаем класс динамически
            Class<?> dynamicClass = Class.forName("java.util.HashMap");
            
            // Метаданные HashMap загружаются в Metaspace
            Object instance = dynamicClass.getDeclaredConstructor().newInstance();
            
            System.out.println("Dynamically loaded: " + dynamicClass.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как работает финализация объектов?
__Финализация__ (finalization) — это процесс, который JVM выполняет перед освобождением памяти от объекта. Это происходит, когда объект становится недостижимым, но сборщик мусора еще не удалил его.

```java
public class FinalizationExample {
    public void explainFinalization() {
        System.out.println("=== Финализация объектов ===");
        System.out.println();
        
        System.out.println("Финализация происходит в несколько этапов:");
        System.out.println("1. JVM определяет, что объект стал недостижим.");
        System.out.println("2. Объект помечается для финализации.");
        System.out.println("3. JVM вызывает метод finalize() объекта.");
        System.out.println("4. Объект освобождает свои примитивные ресурсы.");
        System.out.println("5. JVM освобождает память, если объект не был перемещен.");
    }
    
    public void demonstrateFinalization() {
        System.out.println("=== Демонстрация финализации ===");
        
        // Создаем объект, который будет финализирован
        Resource resource = new Resource();
        System.out.println("Resource created: " + resource);
        
        // Убираем ссылку на объект
        resource = null;
        System.out.println("Resource reference cleared.");
        
        // Вызываем System.gc() для запуска финализации
        System.gc();
        System.out.println("System.gc() called. Waiting for finalization...");
        
        // Ждем некоторое время, чтобы finalize() выполнился
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Проверяем, освободилась ли память
        long memoryAfter = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        System.out.println("Memory after finalization: " + memoryAfter / 1024 / 1024 + " MB");
    }
    
    // Класс с методом finalize()
    static class Resource {
        private String name;
        
        public Resource() {
            this.name = "Resource_" + System.currentTimeMillis();
            System.out.println("Resource " + name + " created.");
        }
        
        @Override
        protected void finalize() throws Throwable {
            super.finalize();
            System.out.println("Resource " + name + " finalized.");
        }
        
        @Override
        public String toString() {
            return name;
        }
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Что такое weak, soft и phantom references?
__Weak references__ — это ссылки, которые не препятствуют сборке мусора, но позволяют объекту оставаться доступным до тех пор, пока есть хоть одна сильная ссылка на него.

```java
public class ReferenceTypesExample {
    public void explainReferenceTypes() {
        System.out.println("=== Типы ссылок в Java ===");
        System.out.println();
        
        System.out.println("1. Strong Reference:");
        Object strongRef = new Object();
        System.out.println("   - Обычная ссылка (strong)");
        System.out.println("   - Объект не будет собран, пока есть хоть одна сильная ссылка.");
        
        System.out.println("\n2. Soft Reference:");
        Object softRef = new Object();
        System.out.println("   - Ссылка, которая не препятствует сборке мусора.");
        System.out.println("   - Объект будет собран, когда память станет низкой.");
        
        System.out.println("\n3. Weak Reference:");
        Object weakRef = new Object();
        System.out.println("   - Ссылка, которая не препятствует сборке мусора.");
        System.out.println("   - Объект будет собран, когда сборщик мусора определит, что он недостижим.");
        
        System.out.println("\n4. Phantom Reference:");
        Object phantomRef = new Object();
        System.out.println("   - Ссылка, которая не препятствует сборке мусора.");
        System.out.println("   - Объект будет собран, когда сборщик мусора определит, что он недостижим.");
        System.out.println("   - Phantom references используются для очистки ресурсов после финализации.");
    }
    
    public void demonstrateWeakReference() {
        System.out.println("\n=== Демонстрация Weak Reference ===");
        
        // Создаем объект
        Object strongRef = new Object();
        System.out.println("Strong reference created: " + strongRef);
        
        // Создаем Weak Reference
        WeakReference<Object> weakRef = new WeakReference<>(strongRef);
        System.out.println("Weak reference created: " + weakRef.get());
        
        // Убираем сильную ссылку
        strongRef = null;
        System.out.println("Strong reference cleared.");
        
        // Ждем, пока сборщик мусора определит, что объект недостижим
        System.gc();
        System.out.println("System.gc() called. Waiting for garbage collection...");
        
        try {
            Thread.sleep(100); // Даем время на сборку мусора
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Weak Reference теперь будет null, так как объект собран
        System.out.println("Weak reference after garbage collection: " + weakRef.get());
    }
    
    public void demonstrateSoftReference() {
        System.out.println("\n=== Демонстрация Soft Reference ===");
        
        // Создаем объект
        Object strongRef = new Object();
        System.out.println("Strong reference created: " + strongRef);
        
        // Создаем Soft Reference
        SoftReference<Object> softRef = new SoftReference<>(strongRef);
        System.out.println("Soft reference created: " + softRef.get());
        
        // Убираем сильную ссылку
        strongRef = null;
        System.out.println("Strong reference cleared.");
        
        // Ждем, пока сборщик мусора определит, что объект недостижим
        System.gc();
        System.out.println("System.gc() called. Waiting for garbage collection...");
        
        try {
            Thread.sleep(100); // Даем время на сборку мусора
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Soft Reference будет null, если сборщик мусора определит, что объект недостижим
        System.out.println("Soft reference after garbage collection: " + softRef.get());
    }
    
    public void demonstratePhantomReference() {
        System.out.println("\n=== Демонстрация Phantom Reference ===");
        
        // Создаем объект
        Object strongRef = new Object();
        System.out.println("Strong reference created: " + strongRef);
        
        // Создаем Phantom Reference
        PhantomReference<Object> phantomRef = new PhantomReference<>(strongRef, null);
        System.out.println("Phantom reference created: " + phantomRef.get());
        
        // Убираем сильную ссылку
        strongRef = null;
        System.out.println("Strong reference cleared.");
        
        // Ждем, пока сборщик мусора определит, что объект недостижим
        System.gc();
        System.out.println("System.gc() called. Waiting for garbage collection...");
        
        try {
            Thread.sleep(100); // Даем время на сборку мусора
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Phantom Reference будет null, если сборщик мусора определит, что объект недостижим
        System.out.println("Phantom reference after garbage collection: " + phantomRef.get());
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как принудительно запустить сборщик мусора?
Существует несколько способов запустить сборщик мусора, но это обычно не рекомендуется.

```java
public class ForceGCExample {
    public void demonstrateForceGC() {
        System.out.println("=== Принудительный запуск GC ===");
        
        // Создаем объекты для демонстрации
        List<String> data = new ArrayList<>();
        for (int i = 0; i < 100000; i++) {
            data.add("Item_" + i);
        }
        
        // Измеряем память до GC
        long beforeGC = getUsedMemory();
        System.out.println("Memory before GC: " + beforeGC / 1024 / 1024 + " MB");
        
        // Убираем ссылки на объекты
        data.clear();
        data = null;
        
        // Способ 1: System.gc()
        System.out.println("\nВызов System.gc()...");
        long startTime = System.currentTimeMillis();
        System.gc();
        long endTime = System.currentTimeMillis();
        
        long afterGC = getUsedMemory();
        System.out.println("Memory after GC: " + afterGC / 1024 / 1024 + " MB");
        System.out.println("Time taken: " + (endTime - startTime) + " ms");
        System.out.println("Memory freed: " + (beforeGC - afterGC) / 1024 / 1024 + " MB");
        
        // Способ 2: Runtime.getRuntime().gc()
        System.out.println("\nВызов Runtime.getRuntime().gc()...");
        Runtime.getRuntime().gc();
        
        // Способ 3: Финализация
        System.out.println("\nВызов System.runFinalization()...");
        System.runFinalization();
    }
    
    private long getUsedMemory() {
        Runtime runtime = Runtime.getRuntime();
        return runtime.totalMemory() - runtime.freeMemory();
    }
    
    public void showGCMXBeanApproach() {
        System.out.println("\n=== Использование GC MXBean ===");
        
        // Получаем информацию о сборщиках мусора
        List<java.lang.management.GarbageCollectorMXBean> gcBeans = 
            java.lang.management.ManagementFactory.getGarbageCollectorMXBeans();
        
        System.out.println("Доступные сборщики мусора:");
        for (java.lang.management.GarbageCollectorMXBean gcBean : gcBeans) {
            System.out.println("- " + gcBean.getName());
            System.out.println("  Collections: " + gcBean.getCollectionCount());
            System.out.println("  Time: " + gcBean.getCollectionTime() + " ms");
            
            // Можно запустить GC через MXBean (если поддерживается)
            if (gcBean instanceof com.sun.management.GarbageCollectorMXBean) {
                // Некоторые реализации позволяют запускать GC
                System.out.println("  Supports GC invocation: " + 
                    gcBean.getObjectName().toString());
            }
        }
    }
    
    public void showMemoryMXBeanApproach() {
        System.out.println("\n=== Использование Memory MXBean ===");
        
        java.lang.management.MemoryMXBean memoryMXBean = 
            java.lang.management.ManagementFactory.getMemoryMXBean();
        
        // Получаем информацию о памяти
        java.lang.management.MemoryUsage heapBefore = memoryMXBean.getHeapMemoryUsage();
        System.out.println("Heap before GC: " + heapBefore.getUsed() / 1024 / 1024 + " MB");
        
        // Запускаем GC через MemoryMXBean
        memoryMXBean.gc();
        
        java.lang.management.MemoryUsage heapAfter = memoryMXBean.getHeapMemoryUsage();
        System.out.println("Heap after GC: " + heapAfter.getUsed() / 1024 / 1024 + " MB");
    }
    
    public void showWhyNotToUseSystemGC() {
        System.out.println("\n=== Почему не стоит использовать System.gc() ===");
        System.out.println();
        
        System.out.println("Проблемы:");
        System.out.println("✗ Не гарантирует немедленный запуск GC");
        System.out.println("✗ Может вызвать Full GC (очень медленно)");
        System.out.println("✗ Прерывает работу приложения");
        System.out.println("✗ JVM лучше знает, когда нужен GC");
        System.out.println("✗ Может ухудшить производительность");
        
        System.out.println("\nАльтернативы:");
        System.out.println("✓ Доверьтесь автоматическому GC");
        System.out.println("✓ Настройте параметры GC");
        System.out.println("✓ Оптимизируйте создание объектов");
        System.out.println("✓ Используйте профилировщики");
        System.out.println("✓ Мониторьте GC метрики");
        
        System.out.println("\nПараметры JVM:");
        System.out.println("-XX:+DisableExplicitGC          : Отключить System.gc()");
        System.out.println("-XX:+ExplicitGCInvokesConcurrent : Использовать concurrent GC");
    }
    
    public void showLegitimateUseCases() {
        System.out.println("\n=== Допустимые случаи использования ===");
        System.out.println();
        
        System.out.println("1. Тестирование и отладка:");
        System.out.println("   - Проверка утечек памяти");
        System.out.println("   - Измерение потребления памяти");
        System.out.println("   - Unit тесты");
        
        System.out.println("\n2. Критические моменты:");
        System.out.println("   - Перед созданием heap dump");
        System.out.println("   - После загрузки больших данных");
        System.out.println("   - В batch приложениях между задачами");
        
        System.out.println("\n3. Мониторинг:");
        System.out.println("   - Получение актуальных метрик памяти");
        System.out.println("   - Baseline для измерений");
    }
    
    // Пример правильного использования в тестах
    public void testMemoryUsage() {
        System.out.println("\n=== Пример использования в тестах ===");
        
        // Создаем базовую линию
        System.gc();
        System.runFinalization();
        long baseline = getUsedMemory();
        
        // Выполняем тестируемый код
        List<String> testData = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            testData.add("Test_" + i);
        }
        
        long afterCreation = getUsedMemory();
        System.out.println("Memory used by test data: " + 
            (afterCreation - baseline) / 1024 + " KB");
        
        // Очищаем данные
        testData.clear();
        testData = null;
        
        // Проверяем освобождение памяти
        System.gc();
        System.runFinalization();
        long afterCleanup = getUsedMemory();
        
        System.out.println("Memory after cleanup: " + 
            (afterCleanup - baseline) / 1024 + " KB");
        
        if (afterCleanup - baseline < 1024) { // Менее 1KB разницы
            System.out.println("✓ Memory leak test PASSED");
        } else {
            System.out.println("✗ Possible memory leak detected");
        }
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Что такое GC tuning?
__GC tuning__ — это процесс настройки параметров сборщика мусора для оптимизации производительности приложения.

```java
public class GCTuningExample {
    public void explainGCTuning() {
        System.out.println("=== Настройка сборщика мусора ===");
        System.out.println();
        
        System.out.println("Основные параметры настройки:");
        System.out.println("-XX:+UseG1GC                    : Включить G1 GC");
        System.out.println("-XX:MaxGCPauseMillis=N          : Цель паузы (default: 200ms)");
        System.out.println("-XX:G1HeapRegionSize=N          : Размер региона");
        System.out.println("-XX:G1NewSizePercent=N          : Мин % Young Generation");
        System.out.println("-XX:G1MaxNewSizePercent=N       : Макс % Young Generation");
        System.out.println("-XX:G1MixedGCCountTarget=N      : Количество Mixed GC");
        System.out.println("-XX:MaxTenuringThreshold=<n>    : Возраст, при котором объект переходит в Old Generation");
        System.out.println("-XX:+DisableExplicitGC          : Отключить System.gc()");
        System.out.println("-XX:+ExplicitGCInvokesConcurrent : Использовать concurrent GC");
        System.out.println("-XX:+UseAdaptiveSizePolicy      : Автоматическая настройка размеров");
        System.out.println("-XX:SurvivorRatio=<n>           : Отношение Eden/Survivor");
        System.out.println("-XX:NewRatio=<n>                : Отношение Old/Young");
        System.out.println("-XX:G1MixedGCLiveThresholdPercent=<n> : Процент живых объектов для Mixed GC");
        System.out.println("-XX:G1RSetUpdatingPauseTimePercent=<n> : Пауза для обновления remembered sets");
    }
    
    public void showTuningCommands() {
        System.out.println("\n=== Команды для настройки GC ===");
        System.out.println();
        
        System.out.println("1. Включение/отключение сборщика:");
        System.out.println("   -XX:+UseG1GC");
        System.out.println("   -XX:+UseParallelGC");
        System.out.println("   -XX:+UseConcMarkSweepGC");
        System.out.println("   -XX:+UseSerialGC");
        System.out.println("   -XX:-UseG1GC");
        
        System.out.println("\n2. Настройка пауз:");
        System.out.println("   -XX:MaxGCPauseMillis=<ms>");
        System.out.println("   -XX:G1MixedGCCountTarget=<n>");
        System.out.println("   -XX:G1RSetUpdatingPauseTimePercent=<n>");
        
        System.out.println("\n3. Настройка размеров:");
        System.out.println("   -XX:NewSize=<size>");
        System.out.println("   -XX:MaxNewSize=<size>");
        System.out.println("   -XX:MaxHeapSize=<size>");
        System.out.println("   -XX:G1HeapRegionSize=<size>");
        
        System.out.println("\n4. Настройка алгоритмов:");
        System.out.println("   -XX:NewRatio=<n>");
        System.out.println("   -XX:SurvivorRatio=<n>");
        System.out.println("   -XX:MaxTenuringThreshold=<n>");
        System.out.println("   -XX:G1MixedGCLiveThresholdPercent=<n>");
        System.out.println("   -XX:G1RSetUpdatingPauseTimePercent=<n>");
    }
    
    public void showTuningExamples() {
        System.out.println("\n=== Примеры настроек GC ===");
        System.out.println();
        
        System.out.println("1. Оптимизация пауз:");
        System.out.println("   -XX:MaxGCPauseMillis=200");
        System.out.println("   -XX:G1MixedGCCountTarget=10");
        
        System.out.println("\n2. Оптимизация размеров кучи:");
        System.out.println("   -Xms1g -Xmx4g -Xmn1g");
        System.out.println("   -XX:NewRatio=3 -XX:SurvivorRatio=6");
        
        System.out.println("\n3. Оптимизация алгоритмов:");
        System.out.println("   -XX:NewRatio=2 -XX:SurvivorRatio=8");
        System.out.println("   -XX:MaxTenuringThreshold=15");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Какие инструменты для анализа GC существуют?
Существует множество инструментов для анализа сборки мусора в Java.

```java
public class GCAnalysisTools {
    public void showManagementTools() {
        System.out.println("=== Инструменты управления GC ===");
        System.out.println();
        
        System.out.println("1. jstat (Статистика сборщика мусора):");
        System.out.println("   - jstat -gc <pid> 1000");
        System.out.println("   - jstat -gcutil <pid> 1000");
        System.out.println("   - jstat -gccapacity <pid>");
        
        System.out.println("\n2. jmap (Создание heap dump):");
        System.out.println("   - jmap -dump:format=b,file=heap.hprof <pid>");
        System.out.println("   - jmap -heap <pid>");
        
        System.out.println("\n3. jhat (Просмотр heap dump):");
        System.out.println("   - jhat heap.hprof");
        
        System.out.println("\n4. VisualVM:");
        System.out.println("   - Встроен в JDK");
        System.out.println("   - Визуальный интерфейс для мониторинга");
        
        System.out.println("\n5. Eclipse MAT (Memory Analyzer Tool):");
        System.out.println("   - Бесплатный");
        System.out.println("   - Интерактивный интерфейс");
        System.out.println("   - Обработка heap dumps");
        
        System.out.println("\n6. JProfiler:");
        System.out.println("   - Коммерческий");
        System.out.println("   - Мощные возможности профилирования");
        
        System.out.println("\n7. YourKit:");
        System.out.println("   - Коммерческий");
        System.out.println("   - Очень мощный");
        System.out.println("   - Поддерживает множество платформ");
    }
    
    public void showDebuggingTools() {
        System.out.println("\n=== Инструменты отладки GC ===");
        System.out.println();
        
        System.out.println("1. JVM параметры:");
        System.out.println("-XX:+HeapDumpOnOutOfMemoryError  : Создать heap dump");
        System.out.println("-XX:HeapDumpPath=/path/to/dump   : Путь для heap dump");
        System.out.println("-XX:+PrintGCDetails              : Подробная информация о GC");
        System.out.println("-XX:+PrintGCTimeStamps           : Временные метки GC");
        System.out.println("-XX:+UseGCLogFileRotation        : Ротация GC логов");
        
        System.out.println("\n2. jmap, jhat (JDK tools):");
        System.out.println("   - jmap -dump:format=b,file=heap.hprof <pid>");
        System.out.println("   - jhat heap.hprof");
        
        System.out.println("\n3. jstack (Stack trace):");
        System.out.println("   - jstack <pid>");
        
        System.out.println("\n4. jconsole (Консоль управления):");
        System.out.println("   - jconsole <pid>");
    }
    
    public void showMonitoringTools() {
        System.out.println("\n=== Инструменты мониторинга GC ===");
        System.out.println();
        
        System.out.println("1. jstat:");
        System.out.println("   - jstat -gc <pid> 1000");
        System.out.println("   - jstat -gcutil <pid> 1000");
        System.out.println("   - jstat -gccapacity <pid>");
        
        System.out.println("\n2. jconsole:");
        System.out.println("   - jconsole <pid>");
        
        System.out.println("\n3. VisualVM:");
        System.out.println("   - Встроен в JDK");
        System.out.println("   - Визуальный интерфейс");
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора)

## Как влияет GC на производительность приложения?
GC может влиять на производительность приложения в разных аспектах:

### 1. Время отклика (Latency)
- **Stop-the-World паузы** (STW) — это период, когда приложение останавливается для выполнения сборки мусора.
- **Low Latency GC** (ZGC, Shenandoah) стремятся к минимальным паузам.
- **High Latency GC** (CMS, G1) могут приводить к значительным паузам.

### 2. Throughput (Пропускная способность)
- **Высокая пропускная способность** (Parallel, G1) означает, что приложение может обрабатывать больше запросов за единицу времени.
- **Низкая пропускная способность** (Serial, CMS) может привести к замедлению работы приложения.

### 3. Использование памяти
- **Высокое использование памяти** может привести к частому запуску GC.
- **Низкое использование памяти** может привести к редким сборкам.

### 4. Параллелизм
- **Многопоточные сборщики** (Parallel, G1) могут использовать несколько ядер для очистки.
- **Однопоточные сборщики** (Serial, CMS) работают на одном ядре.

### 5. Оптимизация создания объектов
- **Многовременных объектов** (временные строки, большие массивы) могут привести к частому запуску Minor GC.
- **Переиспользуемых объектов** (StringBuilder, StringBuffer) могут уменьшить нагрузку на GC.

### 6. Настройка размеров кучи
- **Оптимальные размеры кучи** позволяют сборщику мусора работать эффективно без чрезмерных пауз.
- **Недостаточные размеры кучи** могут привести к частым Full GC.

### 7. Оптимизация создания классов
- **Динамическая загрузка классов** может увеличить Metaspace и привести к OutOfMemoryError.
- **Утечки памяти** могут вызывать OutOfMemoryError.

### 8. Оптимизация алгоритмов
- **Copying GC** может быть быстрее, чем Mark-Sweep, но требует больше памяти.
- **Mark-Sweep** может быть медленнее, но не требует дополнительной памяти.

### 9. Оптимизация создания объектов
- **Оптимизация создания объектов** (StringBuilder, StringBuffer, object pooling) может уменьшить нагрузку на GC.
- **Неоптимизированные объекты** могут привести к утечкам памяти и частому запуску GC.

### 10. Оптимизация состояния кучи
- **Стабильное состояние кучи** (небольшие колебания) позволяет сборщику мусора работать эффективно.
- **Частые изменения размеров кучи** могут привести к фрагментации и увеличению пауз.

[к оглавлению](#garbage-collection-сборка-мусора)

## Что такое concurrent и parallel GC?
**Concurrent GC** — это сборщик мусора, который пытается работать параллельно с основным потоком приложения, уменьшая паузы.

```java
public class ConcurrentGCExample {
    private volatile boolean running = true;
    
    public void demonstrateConcurrentGC() {
        // Основной поток продолжает работу
        Thread mainWork = new Thread(() -> {
            while (running) {
                // Создаем объекты во время работы GC
                Object temp = new Object();
                try {
                    Thread.sleep(1);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        
        mainWork.start();
        
        // Concurrent GC может работать параллельно с основным потоком
        // Это уменьшает паузы приложения
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        running = false;
    }
}
```

[к оглавлению](#garbage-collection-сборка-мусора) 