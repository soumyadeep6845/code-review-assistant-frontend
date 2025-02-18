import { useState } from "react";
import { CodeSubmission } from "../types";
import { toast } from "react-toastify";
import { apiClient } from "../api/ApiClient";

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
      const userId = "user123"; // Can be replaced with Auth user ID
      const payload: CodeSubmission = { userId, code, language };

      const response = await apiClient.post<CodeSubmission>("/submit", payload);
      setReview(response.data.aiFeedback ?? "No feedback available");
      toast.success("Code reviewed successfully!");
    } catch (error) {
      toast.error("Failed to get review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Submit Your Code</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={6}
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <select
        className="mt-2 p-2 border rounded-md"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="JavaScript">JavaScript</option>
      </select>
      <button
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Reviewing..." : "Submit Code"}
      </button>
      {review && (
        <div className="mt-4 p-3 bg-white border rounded-md">
          <h3 className="font-semibold">AI Review Feedback:</h3>
          <p className="text-sm text-gray-700">{review}</p>
        </div>
      )}
    </div>
  );
};

export default CodeSubmissionForm;
