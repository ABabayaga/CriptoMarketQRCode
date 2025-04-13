# 🧾 CriptoMarketQRCode

Plataforma Web3 para geração de QR Codes de pagamento em BNB — seja via **contrato inteligente** ou **pagamento direto via MetaMask**. Ideal para comerciantes e prestadores de serviço que desejam aceitar criptoativos com praticidade.

---

## 🚀 Funcionalidades

- 🔗 Geração de QR Codes com link para o dApp (via contrato)
- 💸 Geração de QR Codes diretos (`ethereum:`) para MetaMask
- 📦 Backend em Node.js para registro e consulta de pagamentos
- 📡 Monitoramento de eventos na BNB Testnet
- 📊 Dashboard com histórico de transações recebidas

---

## 📁 Estrutura do Projeto

CriptoMarketQRCode/ 
├── frontend/ # Interface Next.js + React + Bootstrap 
├── backend/ # Servidor Express + MongoDB + Web3 
├── blockchain/ # Smart contract (versão original) 
├── blockchainV2/ # Smart contract atualizado com eventos

---

## 💡 Tecnologias Utilizadas

- **Frontend**: React + Next.js + Bootstrap
- **Backend**: Node.js + Express + MongoDB + ethers.js
- **Blockchain**: Solidity (BNB Smart Chain - Testnet)
- **Deploy**:
  - Frontend: Vercel
  - Backend: Render
  - Banco de dados: MongoDB Atlas

---


