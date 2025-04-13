"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "@/services/ABI.json";
import DashboardLayout from "@/components/DashboardLayout";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const BNB_TESTNET_CHAIN_ID = "0x61"; // BNB Testnet

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

  const ensureCorrectNetwork = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== BNB_TESTNET_CHAIN_ID) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BNB_TESTNET_CHAIN_ID }],
      });
    }
  };

  const handlePay = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Valor inválido");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await ensureCorrectNetwork();
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.pay(merchant, {
        value: ethers.parseEther(amount),
      });

      setStatus("⏳ Aguardando confirmação...");
      await tx.wait();

      setStatus(
        `✅ Pagamento concluído! ` +
        `<a href="https://testnet.bscscan.com/tx/${tx.hash}" target="_blank" rel="noopener noreferrer">Ver no BscScan</a>`
      );
    } catch (err: any) {
      setStatus("❌ Erro: " + err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <h2>Pagamento com BNB</h2>
        <p>Você vai enviar <strong>{amount}</strong> BNB para <code>{merchant}</code></p>

        {!wallet && (
          <button className="btn btn-outline-primary" onClick={connectWallet}>
            Conectar Carteira
          </button>
        )}

        {wallet && (
          <>
            <p className="text-muted">Carteira conectada: {wallet}</p>
            <button className="btn btn-success" onClick={handlePay}>
              Confirmar Pagamento
            </button>
          </>
        )}

        {status && (
          <div
            className="mt-3 alert alert-info"
            dangerouslySetInnerHTML={{ __html: status }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
