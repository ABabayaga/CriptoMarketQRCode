// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CriptoComercioBNBPayment {
    event PaymentReceivedBNB(
        address indexed payer,
        address indexed merchant,
        uint256 amount,
        uint256 timestamp
    );

    function payWithBNB(address merchant) external payable {
        require(merchant != address(0), "Merchant address is required");
        require(msg.value > 0, "Payment amount must be greater than zero");

        // Transferência de BNB para o comerciante
        (bool success, ) = payable(merchant).call{value: msg.value}("");
        require(success, "Transfer failed");

        emit PaymentReceivedBNB(msg.sender, merchant, msg.value, block.timestamp);
    }

    // Protege contra envio direto acidental para o contrato
    receive() external payable {
        revert("Use payWithBNB()");
    }
}
