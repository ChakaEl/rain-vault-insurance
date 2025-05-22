import { useState } from "react";
import { getNotarization } from "../utils/notaryChainClient";

export default function NotarizationLookup() {
  const [txHash, setTxHash] = useState("");
  const [proof, setProof] = useState(null);
  const [status, setStatus] = useState("");

  const handleLookup = async (e) => {
    e.preventDefault();
    setStatus("Fetching proof...");

    try {
      const response = await getNotarization(txHash);
      setProof(response);
      setStatus("Proof retrieved.");
    } catch (error) {
      console.error(error);
      setStatus("Error fetching proof.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mt-6">
      <h2 className="text-xl font-bold mb-2">Look Up Notarization</h2>
      <form onSubmit={handleLookup}>
        <label className="block mb-1">Transaction Hash</label>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" type="submit">
          Look Up
        </button>
      </form>

      {status && <p className="mt-2 text-sm">{status}</p>}
      {proof && (
        <div className="mt-4 text-sm">
          <p><strong>Hash:</strong> {proof.hash}</p>
          <p><strong>Timestamp:</strong> {proof.timestamp}</p>
          <p><strong>Chain:</strong> {proof.chain}</p>
          <p><strong>Validity:</strong> {proof.validity ? "Valid" : "Invalid"}</p>
        </div>
      )}
    </div>
  );
}
