$ nest
**********************************************************************************************
            Commands:
**********************************************************************************************
new|n [options] [name]                          Generate Nest application.
Создаёт новое Nest-приложение.
Полезные [options]:
--dry-run   - выполнить команду без внесения изменений в проект (просмотр листинга выполняемых действий)
--skip-git  - не инициализировать git-репозиторий
--skip-install - не устанавливать зависимости
--package-manager-npm/yarn  - выбор пакетного менеджера
--language-TS/JS    - выбор языка разработки

build [options] [app]                           Build Nest application.
Сборка проекта для Production
Полезные [options]:
--path      - путь к tsconfig.json
--config    - путь к nest-cli.json
--watch     - пересобирать проект при изменениях
--webpack   - использовать Webpack для сборки
--webpackPath   - путь до Webpack
--tsc       - сборка с TSC (в NestJS используется по умолчанию вместо WebPack)

start [options] [app]                           Run Nest application.
Сборка и запуск проекта
Полезные [options]:
те же, что и у bild +
--preserveWatchOutput   - не очищать консоль при сборке
--watchAssets   - следить не только за ts-файлами
--debug         - режим отладки
--exec          - путь до bin-файла node

info|i                                          Display Nest project details.

add [options] <library>                         Adds support for an external library to your project.

generate|g [options] <schematic> [name] [path]  Generate a Nest element.
Создаёт компонент по схеме <schematic> с именем <name>
Полезные [options]:
--dry-run   - выполнить команду без внесения изменений в проект
--project   - выбор проекта для monorepo
--flat      - без создания вложенной папки
--spec      - создание файла тестов
--no-spec   - не создавать файл тестов

Schematics available on @nestjs/schematics collection:
┌───────────────┬─────────────┬──────────────────────────────────────────────┐
│ name          │ alias       │ description                                  │
│ application   │ application │ Generate a new application workspace         │
│ class         │ cl          │ Generate a new class                         │
│ configuration │ config      │ Generate a CLI configuration file            │
│ controller    │ co          │ Generate a controller declaration            │
│ decorator     │ d           │ Generate a custom decorator                  │
│ filter        │ f           │ Generate a filter declaration                │
│ gateway       │ ga          │ Generate a gateway declaration               │
│ guard         │ gu          │ Generate a guard declaration                 │
│ interceptor   │ itc         │ Generate an interceptor declaration          │
│ interface     │ itf         │ Generate an interface                        │
│ library       │ lib         │ Generate a new library within a monorepo     │
│ middleware    │ mi          │ Generate a middleware declaration            │
│ module        │ mo          │ Generate a module declaration                │
│ pipe          │ pi          │ Generate a pipe declaration                  │
│ provider      │ pr          │ Generate a provider declaration              │
│ resolver      │ r           │ Generate a GraphQL resolver declaration      │
│ resource      │ res         │ Generate a new CRUD resource                 │
│ service       │ s           │ Generate a service declaration               │
│ sub-app       │ app         │ Generate a new application within a monorepo │
└───────────────┴─────────────┴──────────────────────────────────────────────┘

**********************************************************************************************
            Настройки Typescript
**********************************************************************************************

Нужно следить за тем, чтобы в tsconfig.json "боевого" проекта были следующие настройки
"strictNullChecks": true,               //строгая проверка на ноль
"noImplicitAny": true,                  //не допускать неявного any
"strictPropertyInitialization": false,  //позволяет использовать классы как интерфейсы 
                                        (не требует инициализировать все поля классов)
                                        (эта опция упрощает создание контрактов)
"skipLibCheck": true,                   //пропустить проверку типов всех файлов .d.ts (например, библиотек).

**********************************************************************************************
            Структура приложния NestJS
**********************************************************************************************
 Приложение NestJS состоит из модулей (должно иметь хотя бы один модуль).
 Этот модуль называется корневым - AppModule.
 Допускается добавлять в приложение неограниченное количество вложенных модулей.
 Модули приложения NestJS можно представить в виде древовидной структуры.
 Рекомендуется разделять модули приложения по доменным областям. 
 Микросервисы обычно состоят из одного модуля (AppModule).
 Крупные монолитные API - из трёх и более уровней вложенности.
 Модульность позволяет поддерживать чистоту приложения,
 облегчает возможность рефакторинга,
 предоставляет возможность выносить функционал модулей в отдельные микросервисы.
 Модуль объединяет в себе зависимости одной доменной области.
 @Module({
    imports:[],                     //зависимости
    oontrollers:[AppController],    //контроллеры
    providers:[AppService],         //сервисы, репозитории и прочие провайдеры
    exports:[]                      //экспортируемые провайдеры или re-export модулей
})

Когда приложение NestJS запускается, происходит построение дерева зависимостей:
собираются все импорты, контроллеры, провайдеры, начиная с корневого (AppModule).
Если разработанный модуль не импортируется, то он не будет участвовать в работе приложения.

Виды модулей:
(common) общие модули - импортируются в несколько других модулей (например, для шифрования)
-------
повторно экспортирующие - позволяют переэкспортировать модули, который были импортированы в него
    @Module({
        imports:[CommonModule],
        exports:[CommonModule],
    })
    export class AppModule{}
------
(global) глобальные модули - если провайдер (модуль) нужен во всех модулях приложения,
то его можно сделать глобальным. Это позволит использовать его во всех модулях приложения без импорта.
Глобальный модуль должен быть импортирован в корневой (узловой) модуль приложения.
    @Global()
    @Module({...})
    export class MyModule{}
-------
динамические - принимают параметры (например, для подключения к БД - порты и т.п.)
Динамический модуль представляет собой статический метод модуля, который возвращает объект следующего вида:
    {
        //global: true, - делает динамический модуль глобальным
        module:...,
        providers:...,
        exports:...,
    }
По умолчанию такие  методы принято называть:
forRoot - если планируется глобальное использование,
forFeature - если он будет использован в ограниченном scope

Пример подключения глобального динамического модуля (вызовом статического метода класса с параметрами):
    @Module({
        imports: [MyModule.forRoot('connection')],
        ...
    })

Дмнамические модули часто используются во внешних библиотеках, например, для работы с БД.

**********************************************************************************************
            Создание модулей
**********************************************************************************************
При генерации модуля из командной строки он не только создаётся, но и подключается автоматически.
$ nest generate module auth
CREATE src/auth/auth.module.ts (81 bytes)
UPDATE src/app.module.ts (308 bytes)            //подключение модуля происходит автоматически

$ nest g module top-page
CREATE src/top-page/top-page.module.ts (84 bytes)
UPDATE src/app.module.ts (383 bytes)
Создаёт и автоматически подключает модуль TopPageModule

nest g module test --flat
Создание модуля в папке src (без создания вложенной папки)

**********************************************************************************************
            Создание моделей
**********************************************************************************************
Созданием модели в виде класса с помощью CLI без создания файла тестов
(src/product/product.model/product.model.ts)
nest g class product/product.model --no-spec    

Описание модели в виде класса позволяет использовать декораторы.
Использование декораторов позволяет упростить валидацию, работу с БД, добавление методов моделям.