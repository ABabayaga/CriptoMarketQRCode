"use client";

import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header"
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

    const [wallet, setWallet] = useState("");
    const router = useRouter(); // Inicialize o objeto router

    function btnLogout() {
        // Remove a chave "wallet" do localStorage, o que efetivamente faz logout do usuário
        localStorage.removeItem("wallet");
        // Redireciona o usuário para a página inicial ("/") após o logout
        router.push("/"); 
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
          const savedWallet = localStorage.getItem("wallet");
          if (savedWallet) setWallet(savedWallet);
        }
      }, []);

    return (
        <div>
          <Header/>
      
          {/* CONTEÚDO: Sidebar + main */}
          <div className="d-flex" style={{ height: "calc(100vh - 60px)" }}>
            <Sidebar />
            <main className="flex-grow-1 p-4 bg-light overflow-auto">{children}</main>
          </div>
        </div>
      );
      
}
