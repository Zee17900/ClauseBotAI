import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchContracts = async () => {
      console.log("🔍 Fetching contracts for user:", user.uid);
      try {
        const q = query(collection(db, "users", user.uid, "contracts"));
        const querySnapshot = await getDocs(q);
        const fetchedContracts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Contracts fetched:", fetchedContracts);
        setContracts(fetchedContracts);
      } catch (error) {
        console.error("❌ Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, [user]);

  const handleEdit = (contractId) => {
    if (!contractId) {
      console.error("❌ Contract ID is missing!");
      return;
    }
    navigate(`/edit-contract/${contractId}`);
  };

  const handleDelete = async (contractId) => {
    if (!contractId) {
      alert("❌ Contract ID missing.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this contract?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "contracts", contractId));
      setContracts(contracts.filter(contract => contract.id !== contractId));
      alert("✅ Contract deleted successfully.");
    } catch (error) {
      console.error("❌ Error deleting contract:", error);
      alert("Failed to delete contract.");
    }
  };

  const handleDownloadPDF = (contract) => {
    const doc = new jsPDF();
    const maxLineWidth = 180;
    const marginLeft = 15;
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const splitText = doc.splitTextToSize(contract.contractText, maxLineWidth);

    splitText.forEach((line) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, marginLeft, y);
      y += 7;
    });

    // 🔥 Apply watermark if contract is not paid
    if (!contract.isPaid) {
      doc.setFontSize(30);
      doc.setTextColor(200, 200, 200);
      doc.text("ClauseBot AI - Free Version", 35, pageHeight / 2, { angle: 45 });
    }

    doc.save(`${contract.contractType}.pdf`);
  };

  const handleUpgrade = (contractId) => {
    navigate(`/payment?contractId=${contractId}`);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 min-h-screen">
        <h2 className="text-xl font-bold mb-6 text-center">ClauseBot AI</h2>
        <button
          onClick={() => navigate("/generate-contract")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mb-4 rounded-lg"
        >
          + New Contract
        </button>
        <button className="w-full bg-gray-700 text-white py-2 mb-4 rounded-lg" disabled>
          📂 My Contracts
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Saved Contracts</h1>

        {contracts.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-2">{contract.contractType}</h3>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(contract.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contract.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(contract)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                  >
                    📄 Download PDF
                  </button>
                </div>

                {!contract.isPaid && (
                  <button
                    onClick={() => handleUpgrade(contract.id)}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                  >
                    🚀 Upgrade to Remove Watermark
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No saved contracts found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
