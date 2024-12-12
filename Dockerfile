# Использование образа Node.js
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование файлов
COPY . .

# Установка зависимостей
RUN npm ci

# Открытие порта 3000
EXPOSE 3000

# Запуск приложения
CMD ["npx", "http-server", "-p", "3000"]