"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { QRCodeCanvas } from "qrcode.react";
import DashboardLayout from "@/components/DashboardLayout";

export default function GenerateBNBQRPage() {
  const [amount, setAmount] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Recupera endereço salvo no localStorage
    if (typeof window !== "undefined") {
      const wallet = localStorage.getItem("wallet");
      if (wallet) {
        setMerchantAddress(wallet);
      }
    }
  }, []);

  const handleGenerateQR = () => {
    if (!merchantAddress || !ethers.isAddress(merchantAddress)) {
      alert("Endereço do comerciante inválido.");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      alert("Valor inválido.");
      return;
    }

    try {
      const amountInWei = ethers.parseEther(amount);
      const hexValue = `0x${amountInWei.toString(16)}`; // valor em hexadecimal com prefixo 0x
      const qr = `ethereum:${merchantAddress}?value=${hexValue}`;
      setQrValue(qr);
      setShowQR(true);
    } catch (error) {
      alert("Erro ao converter valor para BNB.");
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <h2>Gerar QR para pagamento direto (BNB)</h2>
        <p>
          Escaneie com MetaMask Mobile para pagar diretamente com BNB — sem
          redirecionar para o dApp.
        </p>

        <div className="mb-3">
          <label>Valor (em BNB)</label>
          <input
            type="text"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ex: 0.001"
          />
        </div>

        <div className="mb-3">
          <label>Endereço do Comerciante</label>
          <input
            type="text"
            className="form-control"
            value={merchantAddress}
            onChange={(e) => setMerchantAddress(e.target.value)}
            placeholder="0x..."
          />
        </div>

        <button className="btn btn-primary" onClick={handleGenerateQR}>
          Gerar QR Code
        </button>

        {showQR && (
          <div className="mt-4 text-center">
            <h5>QR MetaMask Mobile</h5>
            <QRCodeCanvas value={qrValue} size={256} />
            <p className="mt-2 text-break">
              <code>{qrValue}</code>
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
