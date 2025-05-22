// src/utils/notaryChainClient.js
import axios from 'axios';

const API_BASE = 'https://api.notarychain.io'; // Replace with real URL

export async function notarizeDocument(documentHash, caseId) {
  const response = await axios.post(`${API_BASE}/notarize`, {
    hash: documentHash,
    reference: caseId,
  });
  return response.data; // { txHash, timestamp, notarySignature }
}

export async function getNotarization(txHash) {
  const response = await axios.get(`${API_BASE}/proof/${txHash}`);
  return response.data; // { hash, timestamp, chain, validity }
}
