// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ALESC {
    address public complianceOfficer;
    bytes32 public btcTxHash;

    constructor(address _officer) {
        complianceOfficer = _officer;
    }

    function recordBitcoinAnchor(bytes32 _btcTxHash) external {
        require(msg.sender == complianceOfficer, "Unauthorized");
        btcTxHash = _btcTxHash;
    }

    function getComplianceHash(bytes32 txHash, uint256 timestamp) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(txHash, timestamp));
    }
}
