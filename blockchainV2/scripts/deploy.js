require("dotenv").config();
const hre = require("hardhat");

async function main() {
    const PaymentContract = await hre.ethers.getContractFactory("CriptoComercioBNBPayment");
    const contract = await PaymentContract.deploy(); // ⬅️ Sem parâmetros

    await contract.waitForDeployment();

    console.log("Contrato CriptoComercioBNBPayment implantado em:", contract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
