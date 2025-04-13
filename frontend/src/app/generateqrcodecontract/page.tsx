"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ethers } from "ethers";
import DashboardLayout from "@/components/DashboardLayout";

export default function GenerateQRCodeContractPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  // Conecta à carteira e define o endereço
  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask não encontrada");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar carteira");
    }
  };

  const handleGenerate = () => {
    if (!walletAddress || !amount || isNaN(Number(amount))) {
      alert("Preencha um valor válido e conecte a carteira.");
      return;
    }

    //const baseUrl = window.location.origin;
    //Chama Dapp no navegador do celular
    /*const baseUrl = "https://cripto-comercio-frontend.vercel.app";
    const url = `${baseUrl}/pay?merchant=${walletAddress}&amount=${amount}`;*/

    //Link URL publica
    const dappDomain = "cripto-comercio-frontend.vercel.app"; // sem https
    const url = `metamask://dapp/${dappDomain}/pay?merchant=${walletAddress}&amount=${amount}`;


    setQrUrl(url);
    setShowQR(true);
  };

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <h2>Gerar QR Code para Pagamento com Contrato</h2>
        <p>
          Compartilhe este QR com o cliente. Ele será direcionado para o dApp
          e poderá efetuar o pagamento via contrato.
        </p>

        {!walletAddress && (
          <button className="btn btn-outline-primary mb-3" onClick={connectWallet}>
            Conectar Carteira
          </button>
        )}

        {walletAddress && (
          <div className="mb-3">
            <label>Endereço do Comerciante</label>
            <input
              type="text"
              className="form-control"
              value={walletAddress}
              readOnly
            />
          </div>
        )}

        <div className="mb-3">
          <label>Valor (em BNB)</label>
          <input
            type="text"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleGenerate}>
          Gerar QR Code
        </button>

        {showQR && (
          <div className="mt-4 text-center">
            <h5>QR Code do Pagamento</h5>
            <QRCodeCanvas value={qrUrl} size={256} />
            <p className="mt-3 text-break"><code>{qrUrl}</code></p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
