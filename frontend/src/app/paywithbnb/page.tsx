"use client";

import { useState } from "react";
import { ethers } from "ethers";
import abi from "@/services/ABI.json"; // ABI do novo contrato
import DashboardLayout from "@/components/DashboardLayout";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export default function PayWithBNBPage() {
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [status, setStatus] = useState("");

  const handlePay = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask não detectada");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const amountInWei = ethers.parseEther(amount); // Converte BNB para wei

      const tx = await contract.payWithBNB(merchant, {
        value: amountInWei,
      });

      setStatus("Aguardando confirmação...");
      await tx.wait();
      setStatus("✅ Pagamento com BNB realizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      setStatus("❌ Erro ao pagar: " + error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <h2>Pagamento com BNB</h2>

        <div className="mb-3">
          <label>Endereço do Comerciante</label>
          <input
            type="text"
            className="form-control"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Valor em BNB</label>
          <input
            type="text"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handlePay}>
          Pagar com BNB
        </button>

        {status && <div className="mt-3 alert alert-info">{status}</div>}
      </div>
    </DashboardLayout>
  );
}
