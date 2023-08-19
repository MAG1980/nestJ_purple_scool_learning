$ nest

Commands:

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
Нужно следить за тем, чтобы в tsconfig.json "боевого" проекта были следующие настройки
"strictNullChecks": true,               //строгая проверка на ноль
"noImplicitAny": true,                  //не допускать неявного any
"strictPropertyInitialization": false,  //позволяет использовать классы как интерфейсы 
                                        (не требует инициализировать все поля классов)
                                        (эта опция упрощает создание контрактов)
"skipLibCheck": true,                   //пропустить проверку типов всех файлов .d.ts (например, библиотек).