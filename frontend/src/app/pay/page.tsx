"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "@/services/ABI.json";
import DashboardLayout from "@/components/DashboardLayout";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export default function PayPage() {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setMerchant(urlParams.get("merchant") || "");
      setAmount(urlParams.get("amount") || "");
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask não encontrada");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
  };

  const handlePay = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.pay(merchant, {
        value: ethers.parseEther(amount),
      });

      setStatus("⏳ Aguardando confirmação...");
      await tx.wait();
      setStatus(`✅ Pagamento concluído! 🔗 https://testnet.bscscan.com/tx/${tx.hash}`);
    } catch (err: any) {
      setStatus("❌ Erro: " + err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <h2>Pagamento com BNB</h2>
        <p>Você vai enviar {amount} BNB para {merchant}</p>

        {!wallet && (
          <button className="btn btn-outline-primary" onClick={connectWallet}>
            Conectar Carteira
          </button>
        )}

        {wallet && (
          <button className="btn btn-success" onClick={handlePay}>
            Confirmar Pagamento
          </button>
        )}

        {status && <div className="mt-3 alert alert-info">{status}</div>}
      </div>
    </DashboardLayout>
  );
}