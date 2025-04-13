"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Container } from "react-bootstrap";

export default function AboutPage() {
  return (
    <DashboardLayout>
    <Container className="mt-4">
      <h2>📌 Sobre o CriptoMarketQRCode</h2>
      <p>
        O <strong>CriptoMarketQRCode</strong> é uma plataforma que permite que comerciantes recebam pagamentos em BNB
        (Binance Smart Chain) de forma simples e rápida usando QR Codes.
      </p>

      <h4>🚀 Como funciona?</h4>
      <ul>
        <li>O comerciante gera um QR Code com o valor desejado</li>
        <li>O cliente escaneia com a MetaMask (ou outra wallet)</li>
        <li>O pagamento é enviado diretamente para a carteira do comerciante</li>
        <li>O backend escuta a blockchain e registra o pagamento automaticamente</li>
      </ul>

      <h4>✅ Benefícios</h4>
      <ul>
        <li>Pagamentos diretos na blockchain</li>
        <li>Sem intermediários ou taxas abusivas</li>
        <li>Interface simples e intuitiva</li>
        <li>Registro e histórico completo de transações</li>
      </ul>

      <h4>⚙️ Tecnologias Utilizadas</h4>
      <ul>
        <li>Frontend: Next.js + React + Bootstrap</li>
        <li>Backend: Node.js + Express + MongoDB</li>
        <li>Blockchain: BNB Testnet via Ethers.js</li>
        <li>Integração com MetaMask e monitoramento em tempo real</li>
      </ul>

      <h4>📖 Como usar?</h4>
      <ol>
        <li>Conecte sua wallet clicando no botão no topo da tela</li>
        <li>Vá até <strong>"Generate BNB QRCode"</strong> para gerar o link de pagamento</li>
        <li>Escaneie ou compartilhe com o cliente</li>
        <li>Acompanhe tudo em <strong>"Histórico"</strong> ou na <strong>Home</strong></li>
      </ol>

      <h4>🔍 Diferença entre os Tipos de Pagamento</h4>

<p>O <strong>CriptoMarketQRCode</strong> oferece dois modos de recebimento via QR Code:</p>

<h5>1️⃣ Pagamento Direto (sem contrato)</h5>
<ul>
  <li>O QR Code gerado contém o endereço do comerciante e o valor em BNB</li>
  <li>É escaneado pelo aplicativo da MetaMask</li>
  <li>O pagamento vai direto para a carteira do comerciante</li>
  <li><strong>Não utiliza smart contract</strong></li>
  <li>Ideal para transações rápidas, como vendas presenciais ou delivery</li>
</ul>

<h5>2️⃣ Pagamento via DApp (com contrato)</h5>
<ul>
  <li>O QR Code leva para uma página dentro do DApp</li>
  <li>O cliente conecta a carteira e realiza o pagamento clicando em "Pagar"</li>
  <li>O valor é enviado para um <strong>smart contract</strong>, que registra a transação on-chain</li>
  <li>Permite lógica personalizada como: autenticação, regras, NFTs, recibos, etc.</li>
  <li>Recomendado para integrações com marketplaces, plataformas digitais ou pagamentos com lógica extra</li>
</ul>

<p><strong>Resumo:</strong> use o pagamento direto para agilidade e simplicidade. Use o DApp com smart contract para controle e automação.</p>

      <h4>📬 Contato / Suporte</h4>
      <p>
        Em caso de dúvidas ou sugestões, envie um email para:{" "}
        <a href="mailto:suporte@criptomarketqrcode.com">suporte@criptomarketqrcode.com</a>
      </p>
    </Container>
  </DashboardLayout>
  );
}
