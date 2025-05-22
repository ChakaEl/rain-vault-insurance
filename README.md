# SecureBank DApp – NotaryChain + Bitcoin Anchor Integration

This repository contains a fullstack DApp architecture for SecureBankBox that integrates:
- Ethereum-based notarization via NotaryChain REST API
- Bitcoin anchoring for legal-grade timestamping
- React.js + Ethers.js frontend
- Hardhat-based smart contract deployment
- Git-ready structure for Vercel/IPFS deployment

---

## ✅ Features
- Create notarized document hashes
- Retrieve notarization proofs
- Store Bitcoin TXID as audit anchor
- React frontend for interaction
- Smart contracts to store compliance hash and BTC reference

---

## 🧱 Folder Structure
```
/securebank-dapp
├── /src
│   ├── App.jsx               ← Main frontend entry
│   ├── components/           ← UI components
│   ├── contracts/            ← ABIs and addresses
│   ├── hooks/                ← Web3 hooks
│   ├── pages/                ← View routes
│   └── utils/notaryChainClient.js
├── /scripts                  ← Deployment scripts
├── /hardhat/ALESC.sol        ← Smart contract
├── package.json
```

---

## ⚙️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy Smart Contract
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. Start the Frontend
```bash
npm run dev
```

---

## 🧾 NotaryChain API Usage

In `src/utils/notaryChainClient.js`:
```js
await notarizeDocument(documentHash, caseId);
await getNotarization(txHash);
```

---

## 🔐 Bitcoin Anchor in Contract

In `ALESC.sol`:
```solidity
function recordBitcoinAnchor(bytes32 _btcTxHash) external;
```

---

## ☁️ Deploy to Vercel or IPFS

### Vercel:
- Connect GitHub repo to [https://vercel.com](https://vercel.com)
- Set root as `/` and framework as `React`

### IPFS:
```bash
npm run build
npx ipfs add -r dist
```

---

## 🛠️ Next Steps
- Add document upload form
- Display notarization result
- Link Bitcoin anchor to NotaryChain proof
