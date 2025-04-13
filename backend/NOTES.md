
---

### 📌 Descrições dos arquivos principais:

- **index.js**: Ponto de entrada do servidor Node.js com Express.
- **services/monitorBNB.js**: Monitora novos blocos na BNB Testnet, registra pagamentos e atualiza o último bloco processado.
- **routes/dashboard.js**: Fornece estatísticas (ex: total recebido, número de transações).
- **routes/payments.js**: Define rotas GET para acessar pagamentos armazenados.
- **models/Payment.js**: Define o schema dos pagamentos registrados (payer, merchant, amount, timestamp...).
- **models/Metadata.js**: Salva o número do último bloco processado para evitar reprocessamento.
- **db.js**: Conecta ao banco MongoDB usando a variável `MONGO_URI`.

---

backend/
├── node_modules/
├── src/
│   ├── models/
│   │   ├── Metadata.js          # Modelo do último bloco monitorado
│   │   └── Payment.js           # Modelo dos pagamentos recebidos via contrato
│   ├── routes/
│   │   ├── dashboard.js         # Rotas de estatísticas (ex: total recebido)
│   │   └── payments.js          # Rotas para consultar os pagamentos
│   ├── services/
│   │   └── monitorBNB.js        # Escuta blocos e eventos na BNB Testnet
│   ├── db.js                    # Conexão com o MongoDB usando URI do .env
│   └── index.js                 # Inicializa o servidor Express e as rotas
├── .env                         # Variáveis de ambiente (ex: RPC, MONGO_URI)
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Dependências e comandos npm
├── package-lock.json            # Versões travadas das dependências
└── README.md / NOTES.md         # Documentação do projeto
