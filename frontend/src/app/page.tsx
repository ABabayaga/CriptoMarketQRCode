"use client";

import { useState } from "react";
import { ethers, Contract, BrowserProvider, JsonRpcProvider } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS, doLogin } from "@/services/Web3Services";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  const router = useRouter();

  // Verifica se está em dispositivo móvel
  const isMobile = () => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  // ✅ Login com Metamask + redirecionamento
  async function btnLoginClick() {
    if (isMobile()) {
      const dappUrl = encodeURIComponent(window.location.host); // apenas host, sem https://
      window.location.href = `https://metamask.app.link/dapp/${dappUrl}`;
      return;
    }

    try {
      const wallet = await doLogin();
      setWallet(wallet);
      await connectWallet();
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  }

  // ✅ Conectar carteira com Metamask (signer)
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask não detectada!");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    setAccount(userAddress);
    const instance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    setContract(instance);
  };

  // ✅ Conectar sem Metamask (modo leitura)
  const connectReadOnly = async () => {
    const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";
    const provider = new JsonRpcProvider(rpcUrl);
    const instance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    setContract(instance);
    router.push("/home");
  };

  return (
    <>
      <header className="p-2 text-bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <a href="/" style={{ textDecoration: "none" }}>
              <h1 className="fw-bold text-light m-0">CriptoMarketQRCode</h1>
            </a>
          </div>
        </div>
      </header>

      <div className="text-center">
        <h1 className="display- fw-bold text-body-emphasis lh-1 my-4 mb-4">
          CriptoMarket
        </h1>
        <p className="lead">Página para criar QRCode de pagamento via blockhain.</p>
        <p className="lead mb-3">
          Autentique-se com a sua carteira.
        </p>

        {!wallet ? (
          <div className="d-flex flex-column align-items-center gap-3">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4"
              onClick={btnLoginClick}
            >
              <img src="/metamask.svg" width="64" className="me-3" />
              Conectar com a Metamask
            </button>

            <p className="lead mb-3">Ou entre para visualizar como visitante.</p>

            <button
              type="button"
              className="btn btn-outline-primary btn-lg px-4 mb-4"
              onClick={connectReadOnly}
            >
              <img src="/login.svg" width="64" className="me-3" />
              Conectar sem Metamask
            </button>

            {error && (
              <div className="alert alert-danger mt-3 p-2 px-4">{error}</div>
            )}
          </div>
        ) : null}
      </div>

      <Footer />
    </>
  );
}
