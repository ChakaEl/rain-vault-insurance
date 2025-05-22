import { useState } from "react";
import { notarizeDocument } from "../utils/notaryChainClient";

export default function DocumentHashForm() {
  const [docHash, setDocHash] = useState("");
  const [caseId, setCaseId] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting to NotaryChain...");

    try {
      const response = await notarizeDocument(docHash, caseId);
      setResult(response);
      setStatus("Document notarized successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Error submitting document.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-2">Notarize a Document</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Document Hash (SHA-256)</label>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          value={docHash}
          onChange={(e) => setDocHash(e.target.value)}
          required
        />

        <label className="block mb-1">Case ID / Reference</label>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
          Submit
        </button>
      </form>

      {status && <p className="mt-2 text-sm">{status}</p>}
      {result && (
        <div className="mt-4 text-sm">
          <p><strong>TX Hash:</strong> {result.txHash}</p>
          <p><strong>Timestamp:</strong> {result.timestamp}</p>
          <p><strong>Signature:</strong> {result.notarySignature}</p>
        </div>
      )}
    </div>
  );
}
