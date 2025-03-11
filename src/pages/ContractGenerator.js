import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const ContractGenerator = () => {
  const [user] = useAuthState(auth);
  const [contractType, setContractType] = useState("Rental Agreement");
  const [formData, setFormData] = useState({});
  const [generatedContract, setGeneratedContract] = useState("");
  const [loading, setLoading] = useState(false);
  const [editableContract, setEditableContract] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  // ✅ **Restored all contract fields**
  const contractFields = {
    "Rental Agreement": ["Landlord Name", "Tenant Name", "Property Address", "Monthly Rent", "Lease Start Date", "Lease End Date"],
    "Employment Agreement": ["Employer Name", "Employee Name", "Job Title", "Job Responsibilities", "Salary Amount", "Start Date", "Employment Type", "Termination Notice Period"],
    "Partnership Agreement": ["Partner 1 Name", "Partner 2 Name", "Business Name", "Business Address", "Profit Sharing Percentage", "Responsibilities of Each Partner", "Start Date", "Dissolution Terms"],
    "Service Contract": ["Service Provider Name", "Client Name", "Service Description", "Payment Terms", "Service Duration", "Termination Clause"],
    "Freelance Contract": ["Freelancer Name", "Client Name", "Project Description", "Payment Amount", "Project Deadline", "Rights and Ownership", "Termination Clause"],
    "Non-Disclosure Agreement (NDA)": ["Disclosing Party", "Receiving Party", "Purpose of NDA", "Confidentiality Duration", "Penalty for Breach"],
    "Sales Agreement": ["Seller Name", "Buyer Name", "Product/Service Description", "Price", "Payment Terms", "Delivery Date", "Return & Refund Policy"],
    "Consulting Agreement": ["Consultant Name", "Client Name", "Scope of Work", "Payment Structure", "Duration of Agreement", "Confidentiality Clause"],
    "Independent Contractor Agreement": ["Contractor Name", "Client Name", "Work Description", "Payment Details", "Work Completion Date", "Independent Status Clause"],
    "Loan Agreement": ["Lender Name", "Borrower Name", "Loan Amount", "Interest Rate", "Repayment Terms", "Loan Start Date", "Late Payment Penalties"],
  };

  useEffect(() => {
    console.log("Selected Contract Type:", contractType);
    setFormData({});
  }, [contractType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const generateContract = async () => {
    if (!user) {
      alert("You must be logged in to generate a contract.");
      return;
    }

    if (!process.env.REACT_APP_OPENAI_API_KEY) {
      alert("Error: OpenAI API key is missing. Check your .env file.");
      return;
    }

    console.log("🔍 Generating contract...");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: `You are a professional legal assistant specializing in contract drafting.` },
            { role: "user", content: `Generate a professional ${contractType} using these details:\n${Object.entries(formData).map(([key, value]) => `- ${key}: ${value}`).join("\n")}` },
          ],
          max_tokens: 700,
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.choices) {
        setGeneratedContract(response.data.choices[0].message.content.trim());
        setEditableContract(response.data.choices[0].message.content.trim());
        setIsSaved(false);
      } else {
        setGeneratedContract("Error generating contract. Try again.");
      }
    } catch (error) {
      console.error("❌ Error generating contract:", error);
      setGeneratedContract("Failed to generate contract. Check API key and connection.");
    }
    setLoading(false);
  };

  const saveContract = async (isPaid) => {
    if (!user) {
      alert("You must be logged in to save a contract.");
      return;
    }

    try {
      const contractRef = collection(db, "users", user.uid, "contracts");
      await addDoc(contractRef, {
        contractType,
        contractText: editableContract,
        isPaid,
        createdAt: new Date(),
      });

      setIsSaved(true);
      alert(isPaid ? "Contract saved without watermark!" : "Contract saved with watermark.");
      window.dispatchEvent(new Event("contractSaved"));
    } catch (error) {
      console.error("Error saving contract:", error);
      alert("Failed to save contract.");
    }
  };

  const downloadPDF = (isPaid) => {
    if (!user) {
      alert("You must be logged in to download a contract.");
      return;
    }

    const doc = new jsPDF();
    const maxLineWidth = 180;
    const marginLeft = 15;
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const splitText = doc.splitTextToSize(editableContract, maxLineWidth);

    splitText.forEach((line) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, marginLeft, y);
      y += 7;
    });

    if (!isPaid) {
      doc.setFontSize(30);
      doc.setTextColor(200, 200, 200);
      doc.text("ClauseBot AI - Free Version", 35, pageHeight / 2, { angle: 45 });
    }

    doc.save(`${contractType}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Generate a Contract</h1>
      <button onClick={generateContract} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-4">
        {loading ? "Generating..." : "Generate Contract"}
      </button>

      {generatedContract && (
        <div className="mt-6 w-full">
          <div className="flex justify-between mt-4">
            <button onClick={() => saveContract(false)} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
              Save Free (With Watermark)
            </button>
            <button onClick={() => downloadPDF(false)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Download Free (With Watermark)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractGenerator;
