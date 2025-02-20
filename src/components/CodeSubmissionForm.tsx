import { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../api/ApiClient";
import { CodeSubmission } from "../types";

const CodeSubmissionForm = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Java");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!code) {
      toast.error("Please enter some code before submitting.");
      return;
    }

    setLoading(true);

    try {
      const userId = "user123"; // Mock user, replace with actual authentication later
      const payload: CodeSubmission = { userId, code, language };
  
      // Sending request to backend API
      const response = await apiClient.post<CodeSubmission>("/submit", payload);

       if (response.status === 200) {
        setReview(response.data.aiFeedback ?? "No feedback available.");
      toast.success("Code reviewed successfully!");
      console.log(response);
    } 
    else 
      toast.error("Unexpected response from server.");
    
  } catch (error) {
    console.error("Error submitting code:", error);
    toast.error("Failed to get review. Please try again.");
  } finally {
    setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Submit Your Code</h2>
      <textarea
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
        rows={6}
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="mb-4">
        <label className="text-lg text-gray-700 font-medium">Select Language</label>
        <select
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      </div>
      <button
        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Reviewing..." : "Submit Code"}
      </button>

      {review && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="font-semibold text-gray-800">AI Review Feedback:</h3>
          <p className="text-sm text-gray-700 mt-2">{review}</p>
        </div>
      )}
    </div>
  );
};

export default CodeSubmissionForm;
