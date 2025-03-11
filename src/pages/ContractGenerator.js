import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ContractGenerator = () => {
  const [user] = useAuthState(auth);
  const [contractType, setContractType] = useState("Rental Agreement");
  const [formData, setFormData] = useState({});
  const [generatedContract, setGeneratedContract] = useState("");
  const [loading, setLoading] = useState(false);
  const [editableContract, setEditableContract] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  // ✅ **ALL CONTRACT FIELDS RESTORED**
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
    setFormData({}); // Reset form when switching contract type
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
      console.error("Error generating contract:", error);
      setGeneratedContract("Failed to generate contract. Check API key and connection.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Generate a Contract</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <label className="block text-sm mb-2">Contract Type:</label>
        <select className="w-full p-2 mb-4 rounded bg-gray-700 text-white" value={contractType} onChange={(e) => setContractType(e.target.value)}>
          {Object.keys(contractFields).map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        {/* ✅ Restored contract input fields dynamically */}
        {contractFields[contractType].map((field) => (
          <div key={field}>
            <label className="block text-sm mb-2">{field}:</label>
            {field.toLowerCase().includes("date") ? (
              <DatePicker selected={formData[field] || null} onChange={(date) => handleDateChange(date, field)} className="w-full p-2 mb-4 rounded bg-gray-700 text-white" dateFormat="yyyy-MM-dd" />
            ) : (
              <input type="text" name={field} className="w-full p-2 mb-4 rounded bg-gray-700 text-white" value={formData[field] || ""} onChange={handleChange} />
            )}
          </div>
        ))}

        <button onClick={generateContract} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-4">
          {loading ? "Generating..." : "Generate Contract"}
        </button>

        {generatedContract && (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-bold mb-4">Generated Contract</h2>
            <ReactQuill value={editableContract} onChange={setEditableContract} className="bg-gray-800 text-white rounded-lg" />

            <div className="flex justify-between mt-4">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Save Contract (Premium)
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Download Contract
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractGenerator;
