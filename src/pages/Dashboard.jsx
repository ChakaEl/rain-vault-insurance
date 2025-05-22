import DocumentHashForm from "../components/DocumentHashForm";
import NotarizationLookup from "../components/NotarizationLookup";
import BitcoinAnchorForm from "../components/BitcoinAnchorForm";

export default function Dashboard({ contract, walletAddress }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">SecureBank Notary Dashboard</h1>

      <div className="flex flex-col gap-6 items-center">
        <DocumentHashForm />
        <NotarizationLookup />
        {contract && walletAddress && (
          <BitcoinAnchorForm contract={contract} walletAddress={walletAddress} />
        )}
      </div>
    </div>
  );
}
