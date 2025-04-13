# Explicações dos arquivos

- `index.js`: ponto de entrada do servidor backend.
- `listener.js`: escuta eventos do smart contract.
- `routes/payments.js`: define as rotas relacionadas aos pagamentos.
- `db.js`: conexão com o banco de dados MongoDB.


backend/
├── src/
│   ├── index.js          # Servidor Express
│   ├── listener.js       # Escuta o contrato
│   ├── db.js             # Conexão MongoDB
│   └── routes/
│       └── payments.js   # API GET pagamentos
├── .env