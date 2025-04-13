
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

