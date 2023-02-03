# Azalia

Тестовое задание "Азалия".

Используемый стэк: JS, React, Next.JS, Node.JS, Express, RegExp.

Для запуска сервера выполнить команды:
- cd server
- npm i
- npm run start

Для запуска клиента выполнить команды:
- cd client
- npm i
- npm run dev

# Основные особенности

Разработанный интерфейс реализует следующие особенности:
- переходит между разделами по кнопкам навигации;
- отображение кастомной страницы 404 с навигацией;
- подгрузка раздела "Сообщения" по методу SSR;
- подгрузка раздела "Средние числа" по методу CSR;
- отправка данных на сервер и получение от него ответов с помощью API на Node.JS + Express

# FrontEnd: описание
Данное приложение разработано для на Next.JS. Cоединяет пользовательский интерфейс с базой данных в виде генерируемого с помощью FS в папке "DATASTORE" файла "datastore.json".  База данных хранить в себе данные c сообщениями и высислениями.

# BackEnd: описание
Данный API разработан на Node.JS + Express. Рендер раздело реализован частично по методу SSR, частично по методу CSR.
Для валидации некоторых форм использованы RegExp.

# BackEnd: API:
API_URL = https://localhost:5000/api
    - POST API_URL/messages - получает данные сообщения {author, text} размещает в БД новое сообщение
    - POST API_URL/numbers - получает число {number}, размещает в БД новое вычисление {firstNumber, lastNumber, avr} и возвращает его на клиент
    - GET API_URL/data - возвращает его на клиент историю сообщений и вычислений из БД
    - DELETE API_URL/data - очищает БД



