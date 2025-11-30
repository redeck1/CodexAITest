# CodeAI тестовое задание

Фронтенд и бэкенд работают независимо, но взаимодействуют через API. Для запуска проекта локально следуйте инструкциям ниже.

[Запуск без докера](#Требования)

## Требования

- Node.js (версия 18 или выше)
- npm (обычно идёт в комплекте с Node.js)

## Установка зависимостей

Установите зависимости для обоих частей проекта:

Переходим в корень проекта и пишем
для фронтенда:
```bash
cd frontend
npm install
```
для бэкенда тоже самое
```bash
cd backend
npm install
```
## Конфигурация
в папках /frontend и /backend важно создать файлы .env

/frontend/.env:
```
VITE_API_URL=http://localhost:4444
```
/backend/.env:
```
API_KEY=ваш_секретный_ключ
AI_URL=http://llm.codex.so
```
## Запуск
для обоих сервисов применятеся команда npm run dev
```bash
cd frontend; npm run dev
cd backend; npm run dev
```
фронтенд на http://localhost:5173 ,
бэкенд на http://localhost:4444.

