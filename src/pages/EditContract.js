import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditContract = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [contract, setContract] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchContract = async () => {
      try {
        const contractRef = doc(db, "users", user.uid, "contracts", contractId);
        const contractSnap = await getDoc(contractRef);

        if (contractSnap.exists()) {
          setContract(contractSnap.data().contractText || "");
        } else {
          setError("Contract not found!");
        }
      } catch (err) {
        console.error("Error fetching contract:", err);
        setError("Failed to load contract.");
      }
      setLoading(false);
    };

    fetchContract();
  }, [user, contractId]);

  // Auto-Save Feature: Saves the contract every 10 seconds
  useEffect(() => {
    if (!contract) return;
    const autoSave = setInterval(() => {
      handleSave();
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(autoSave);
  }, [contract]);

  const handleSave = async () => {
    if (!user || isSaving) return;
    setIsSaving(true);

    try {
      const contractRef = doc(db, "users", user.uid, "contracts", contractId);
      await updateDoc(contractRef, { contractText: contract });
      console.log("✅ Contract auto-saved.");
    } catch (error) {
      console.error("Error saving contract:", error);
    }

    setIsSaving(false);
  };

  if (loading) return <p className="text-white">Loading contract...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`min-h-screen ${isFullScreen ? "fixed inset-0 bg-gray-900 p-4 z-50" : "bg-gray-900"} text-white p-6`}>
      <h1 className="text-3xl font-bold mb-6">Edit Contract</h1>
      
      {/* Full-Screen Toggle Button */}
      <button 
        onClick={() => setIsFullScreen(!isFullScreen)} 
        className="bg-gray-600 text-white px-4 py-2 rounded-lg mb-4">
        {isFullScreen ? "Exit Full Screen" : "Full Screen Mode"}
      </button>

      <ReactQuill
        value={contract}
        onChange={setContract}
        className="bg-white text-black rounded-lg min-h-[400px]"
        theme="snow"
      />

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>

        <button
          onClick={handleSave}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditContract;
