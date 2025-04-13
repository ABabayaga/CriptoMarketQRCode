"use client"

import { useState, useEffect } from "react";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { useRouter } from "next/navigation";

export default function Header() {

    const [wallet, setWallet] = useState("");
    const router = useRouter(); // Inicialize o objeto router

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedWallet = localStorage.getItem("wallet");
            if (savedWallet) setWallet(savedWallet);
        }
    }, []);

    function btnLogout() {

    }

    function btnLogoutClick() {
        //localStorage.removeItem("wallet");
        //window.location.reload();
    }

    function btnLogout() {
        // Remove a chave "wallet" do localStorage, o que efetivamente faz logout do usuário
        localStorage.removeItem("wallet");
        // Redireciona o usuário para a página inicial ("/") após o logout
        router.push("/");
    }

    return (
        <header
            className="bg-dark text-white p-3 d-flex justify-content-between align-items-center"
            style={{ height: "60px" }}
        >
            <h3 className="m-0">CriptoMarketQRCode</h3>
            <div>
                {wallet ? (
                    <>
                        <span className="me-2 text-light">Wallet:</span>
                        <button type="button" className="btn btn-outline-light me-2">
                            <img
                                src={generateAvatarURL(wallet)}
                                width={20}
                                height={20}
                                className="rounded-circle me-2"
                            />
                            {wallet.slice(0, 6) + "..." + wallet.slice(-4)}
                        </button>
                    </>
                ) : (
                    <span className="text-warning me-3">Carteira não conectada</span>
                )}

                <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={btnLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    )
}