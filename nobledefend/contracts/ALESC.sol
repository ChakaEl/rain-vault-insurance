// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ALESC {
    address public complianceOfficer;
    bytes32 public btcTxHash;
    mapping(bytes32 => bool) public notarizedDocuments;

    constructor() {
        complianceOfficer = msg.sender;
    }

    function recordNotary(bytes32 docHash) external {
        require(msg.sender == complianceOfficer, "Unauthorized");
        notarizedDocuments[docHash] = true;
    }

    function recordBitcoinAnchor(bytes32 _btcTxHash) external {
        require(msg.sender == complianceOfficer, "Unauthorized");
        btcTxHash = _btcTxHash;
    }

    function validateCompliance(bytes32 docHash) public view returns (bool) {
        return notarizedDocuments[docHash];
    }
}
