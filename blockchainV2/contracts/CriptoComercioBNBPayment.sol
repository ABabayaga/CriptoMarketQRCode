// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CriptoComercioBNBPayment {
    event PaymentReceived(
        address indexed payer,
        address indexed merchant,
        uint256 amount,
        uint256 timestamp
    );

    function pay(address merchant) external payable {
        require(merchant != address(0), "Merchant required");
        require(msg.value > 0, "Must send BNB");

        (bool success, ) = payable(merchant).call{value: msg.value}("");
        require(success, "Transfer failed");

        emit PaymentReceived(msg.sender, merchant, msg.value, block.timestamp);
    }
}
