"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface Payment {
    txHash: string;
    payer: string;
    merchant: string;
    amount: string;
    timestamp: number;
}

export default function DashboardPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    //const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState("");

    useEffect(() => {
        const savedWallet = localStorage.getItem("wallet");
        if (savedWallet) {
            setWallet(savedWallet);
        }
    }, []);

    useEffect(() => {
        if (!wallet) return;

        const fetchPayments = async () => {
            try {
                //backend local
                /*const res = await fetch(
                    `http://localhost:5000/api/payments?merchant=${wallet}`
                );*/
                const res = await fetch("https://criptomarketqrcode.onrender.com/api/payments");
                const data = await res.json();
                setPayments(data);
            } catch (err) {
                console.error("Erro ao buscar pagamentos", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [wallet]);

    return (
        <DashboardLayout>
            <div className="container mt-5">
                <h2>Histórico de Pagamentos Recebidos</h2>

                {loading ? (
                    <p>Carregando pagamentos...</p>
                ) : payments.length === 0 ? (
                    <p>Nenhum pagamento encontrado.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Valor (BNB)</th>
                                <th>Pagador</th>
                                <th>Horário</th>
                                <th>Tx</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p) => (
                                <tr key={p.txHash}>
                                    <td>{p.amount}</td>
                                    <td>{p.payer.slice(0, 6)}...{p.payer.slice(-4)}</td>
                                    <td>
                                        {new Date(p.timestamp * 1000).toLocaleString("pt-BR")}
                                    </td>
                                    <td>
                                        <a
                                            href={`https://testnet.bscscan.com/tx/${p.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver Tx
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </DashboardLayout>
    );
}
