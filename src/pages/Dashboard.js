import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { jsPDF } from "jspdf";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [contracts, setContracts] = useState([]);
  const [editingContract, setEditingContract] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchContracts();
    }
  }, [user]);

  const fetchContracts = async () => {
    if (!user) return;
    const contractsRef = collection(db, "users", user.uid, "contracts");
    const snapshot = await getDocs(contractsRef);
    const contractsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setContracts(contractsList);
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setUpdatedText(contract.contractText);
  };

  const handleSaveEdit = async () => {
    if (!editingContract) return;
    const contractRef = doc(db, "users", user.uid, "contracts", editingContract.id);

    await updateDoc(contractRef, {
      contractText: updatedText
    });

    setEditingContract(null);
    fetchContracts(); // Refresh contracts
    alert("Contract updated successfully!");
  };

  const handleDelete = async (contractId) => {
    const contractRef = doc(db, "users", user.uid, "contracts", contractId);
    await deleteDoc(contractRef);
    fetchContracts();
  };

  const handleDownload = (contract) => {
    if (!contract.contractText) {
      alert("Error: Contract text is empty or missing.");
      return;
    }

    const doc = new jsPDF();
    const maxLineWidth = 180;
    const marginLeft = 15;
    const pageHeight = doc.internal.pageSize.height;
    let y = 30;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    // Convert HTML content from ReactQuill to plain text
    const tempElement = document.createElement("div");
    tempElement.innerHTML = contract.contractText;
    const plainText = tempElement.innerText || tempElement.textContent;

    const splitText = doc.splitTextToSize(plainText, maxLineWidth);

    splitText.forEach((line) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, marginLeft, y);
      y += 7;
    });

    doc.save(`${contract.contractType.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Contracts</h1>

      {contracts.length === 0 ? (
        <p className="text-gray-400">No contracts saved yet.</p>
      ) : (
        contracts.map((contract) => (
          <div key={contract.id} className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg mb-4">
            <h2 className="text-xl font-bold mb-2">{contract.contractType}</h2>
            <p className="text-sm text-gray-300 mb-2">Created: {contract.createdAt?.toDate().toLocaleDateString()}</p>

            {editingContract?.id === contract.id ? (
              <ReactQuill
                theme="snow"
                value={updatedText}
                onChange={setUpdatedText}
                className="bg-white text-black rounded-lg"
              />
            ) : (
              <p className="text-white text-sm bg-gray-700 p-3 rounded">{contract.contractText.substring(0, 150)}...</p>
            )}

            <div className="flex justify-between mt-3">
              {editingContract?.id === contract.id ? (
                <button onClick={handleSaveEdit} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                  Save Changes
                </button>
              ) : (
                <button onClick={() => handleEdit(contract)} className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">
                  Edit Contract (Premium)
                </button>
              )}

              <button onClick={() => handleDownload(contract)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Download Contract
              </button>

              <button onClick={() => handleDelete(contract.id)} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <button onClick={() => navigate("/generate-contract")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-6">
        Generate New Contract
      </button>
    </div>
  );
};

export default Dashboard;
