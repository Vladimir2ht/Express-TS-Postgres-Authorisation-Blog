## Description

<h1>Express-TS-Postgres-Authorisation-Blog</h1>

Для установки проекта необходимо в каждой папке (front, back) запустить скрипт npm i.

```
$ git clone https://github.com/Vladimir2ht/Express-TS-Postgres-Authorisation-Blog.git ./Blog
$ cd Express-TS-Postgres-Authorisation-Blog
$ cd front
$ npm i
$ cd ..
$ cd back
$ npm i
```

Для просмотра проекта в режиме разработки нужно в каждой папке (front, back) запустить скрипт

```
$ npm run dev
```

Документация к эндпоинтам находится в в файле в папке Документация, в файле README, полный путь - .back/Документация/README.md

В ветке main ведётся разработка, сервер и фронт тут запускаются каждый отдельно с помощью команды npm run dev.
Ветка Second_Show предназначена для развёртывания приложения, Фронт там заранее скомпилирован и нужно запустить только сервер.

Настройки подключения к базе данных находятся в файле db.ts, полный путь - .back/src/db.ts
Настройки сервера (host, port) находятся в файле index.ts, полный путь - .back/src/index.ts
