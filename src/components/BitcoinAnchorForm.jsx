import { useState } from "react";
import { ethers } from "ethers";

export default function BitcoinAnchorForm({ contract, walletAddress }) {
  const [txHash, setTxHash] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Anchoring Bitcoin TX hash...");

    try {
      const txHashBytes32 = ethers.encodeBytes32String(txHash);
      const tx = await contract.recordBitcoinAnchor(txHashBytes32);
      await tx.wait();

      setStatus("BTC TX hash anchored on-chain.");
      setTxHash("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to anchor hash.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mt-6">
      <h2 className="text-xl font-bold mb-2">Anchor BTC TX Hash</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Bitcoin TX Hash (String)</label>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Anchor TX Hash
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
