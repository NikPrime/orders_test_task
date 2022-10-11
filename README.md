Для запуска локально или с помощью docker-compose необходимо добавить .env файл (ориентироваться на .env.example)

Запуск с помощью docker:
1. Прописать команду docker-compose up. Эта команда поднимет контейнеры базы данных postgres и само приложение api
2. Можно тестировать api с помощью postman или иных платформ

Роуты:
1. localhost:{PORT}/getOrders?tokenA={адрес токена}&tokenB={адрес токена}&user={адрес пользователя}&active={true/false}
Все параметры опциональны. Если вызвать метод без параметров, отдаст список всех ордеров в системе (даже неактивных)

2. localhost:/getMatchingOrders?tokenA={адрес токена}&tokenB=адрес токена}&amountA={сумма покупки}&amountB={сумма продажи}
Параметры tokenA и tokenB обязательные, остальные опциональны.
Возвратит массив противоположных ордеров.

Подписка на события осуществляется с помощью метода allEvents (внутри которого мы обрабатываем только события OrderCreated, OrderMatched и OrderCancelled).
Заявка будет становиться неактивной, как только количество заполненных токенов (amountLeftToFill) для нее будет равно 0.

При перезапуске приложения бэкенд очищает всю таблицу orders в базе, и заново восстанавливает ход событий, записывая/сопоставляя/отменяя все ордера с начала деплоя контракта. (Возможны другие реализации, выбирал самую простую)
