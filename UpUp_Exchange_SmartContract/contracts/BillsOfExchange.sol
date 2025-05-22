// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract BillsOfExchange {
    enum Status { Created, Accepted, Endorsed, Settled, Rejected }

    struct Bill {
        uint256 id;
        address drawer;
        address drawee;
        address currentHolder;
        uint256 amount;
        uint256 dueDate;
        Status status;
        string memo;
    }

    uint256 public billCounter;
    mapping(uint256 => Bill) public bills;
    IERC20 public settlementToken;

    event BillCreated(uint256 indexed id, address indexed drawer, address indexed drawee);
    event BillAccepted(uint256 indexed id);
    event BillEndorsed(uint256 indexed id, address from, address to);
    event BillSettled(uint256 indexed id);
    event BillRejected(uint256 indexed id);

    constructor(address tokenAddress) {
        settlementToken = IERC20(tokenAddress);
    }

    function createBill(address drawee, uint256 amount, uint256 dueDate, string calldata memo) external returns (uint256) {
        require(drawee != address(0), "Invalid drawee");
        require(amount > 0, "Amount must be greater than zero");
        require(dueDate > block.timestamp, "Due date must be in the future");

        billCounter++;
        bills[billCounter] = Bill({
            id: billCounter,
            drawer: msg.sender,
            drawee: drawee,
            currentHolder: msg.sender,
            amount: amount,
            dueDate: dueDate,
            status: Status.Created,
            memo: memo
        });

        emit BillCreated(billCounter, msg.sender, drawee);
        return billCounter;
    }

    function acceptBill(uint256 billId) external {
        Bill storage bill = bills[billId];
        require(bill.id != 0, "Bill does not exist");
        require(msg.sender == bill.drawee, "Only drawee can accept");
        require(bill.status == Status.Created, "Bill must be in Created state");
        bill.status = Status.Accepted;
        emit BillAccepted(billId);
    }

    function endorseBill(uint256 billId, address newHolder) external {
        Bill storage bill = bills[billId];
        require(bill.id != 0, "Bill does not exist");
        require(bill.status == Status.Accepted, "Bill must be accepted to endorse");
        require(msg.sender == bill.currentHolder, "Only current holder can endorse");
        require(newHolder != address(0), "New holder cannot be zero address");
        require(newHolder != msg.sender, "Cannot endorse to self");
        bill.currentHolder = newHolder;
        bill.status = Status.Endorsed;
        emit BillEndorsed(billId, msg.sender, newHolder);
    }

    function settleBill(uint256 billId) external {
        Bill storage bill = bills[billId];
        require(bill.id != 0, "Bill does not exist");
        require(msg.sender == bill.currentHolder, "Only current holder can settle");
        require(bill.status == Status.Accepted || bill.status == Status.Endorsed, "Bill must be accepted or endorsed");
        require(block.timestamp >= bill.dueDate, "Bill is not yet due");
        require(settlementToken.transferFrom(bill.drawee, bill.currentHolder, bill.amount), "Payment failed");
        bill.status = Status.Settled;
        emit BillSettled(billId);
    }

    function rejectBill(uint256 billId) external {
        Bill storage bill = bills[billId];
        require(bill.id != 0, "Bill does not exist");
        require(msg.sender == bill.drawee, "Only drawee can reject");
        require(bill.status == Status.Created, "Only unaccepted bills can be rejected");
        bill.status = Status.Rejected;
        emit BillRejected(billId);
    }

    function getDrawnBills(address user) external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](billCounter);
        uint256 count = 0;
        for (uint256 i = 1; i <= billCounter; i++) {
            if (bills[i].drawer == user) {
                result[count] = i;
                count++;
            }
        }
        assembly { mstore(add(result, 0x40), count) }
        return result;
    }

    function getReceivedBills(address user) external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](billCounter);
        uint256 count = 0;
        for (uint256 i = 1; i <= billCounter; i++) {
            if (bills[i].drawee == user) {
                result[count] = i;
                count++;
            }
        }
        assembly { mstore(add(result, 0x40), count) }
        return result;
    }

    function getHeldBills(address user) external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](billCounter);
        uint256 count = 0;
        for (uint256 i = 1; i <= billCounter; i++) {
            if (bills[i].currentHolder == user) {
                result[count] = i;
                count++;
            }
        }
        assembly { mstore(add(result, 0x40), count) }
        return result;
    }
}
