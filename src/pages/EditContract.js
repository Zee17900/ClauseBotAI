import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const EditContract = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      console.error("❌ User is not logged in.");
      return;
    }

    if (!contractId) {
      console.error("❌ Contract ID is missing.");
      setError("Invalid contract. Please try again.");
      setLoading(false);
      return;
    }

    const fetchContract = async () => {
      try {
        console.log("🔍 Fetching contract for ID:", contractId);

        // Correct Firestore path: Users > {userId} > Contracts > {contractId}
        const contractRef = doc(db, "users", user.uid, "contracts", contractId);
        const contractSnap = await getDoc(contractRef);

        if (contractSnap.exists()) {
          console.log("✅ Contract Found:", contractSnap.data());
          setContractText(contractSnap.data().contractText || "");
        } else {
          console.error("❌ Contract not found in Firestore.");
          setError("Contract not found.");
        }
      } catch (err) {
        console.error("❌ Error fetching contract:", err);
        setError("Failed to load contract.");
      }
      setLoading(false);
    };

    fetchContract();
  }, [user, contractId]);

  const handleSave = async () => {
    if (!user) return;

    try {
      if (!contractId) {
        alert("❌ Error: No contract ID provided.");
        return;
      }

      const contractRef = doc(db, "users", user.uid, "contracts", contractId);
      await updateDoc(contractRef, { contractText });
      alert("✅ Contract saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error saving contract:", error);
      alert("Failed to save contract.");
    }
  };

  if (loading) return <p className="text-white">⏳ Loading contract...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">✍️ Edit Contract</h1>

      <textarea
        value={contractText}
        onChange={(e) => setContractText(e.target.value)}
        className="w-full h-80 p-4 bg-gray-800 text-white rounded-lg"
      />

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          🔙 Back to Dashboard
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditContract;
