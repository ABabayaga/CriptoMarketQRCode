import { ethers, Contract, Signer, Provider, InterfaceAbi, JsonRpcProvider } from "ethers";
//import type {  } from "ethers";
import ABI from "@/services/ABI.json";

export const CONTRACT_ADDRESS = `${process.env.CONTRACT_ADDRESS}`;
export const CONTRACT_ABI = ABI as InterfaceAbi;

// Login usando ethers (versão 6)
export async function doLogin(): Promise<string> {
  if (!window.ethereum) throw new Error("MetaMask não encontrada");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  
  if (!accounts || accounts.length === 0) {
    throw new Error("Carteira não conectada ou recusada.");
  }

  localStorage.setItem("wallet", accounts[0]);

  return accounts[0];
}

// Conecta ao contrato
export const getContract = (providerOrSigner: Signer | Provider): Contract => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};


