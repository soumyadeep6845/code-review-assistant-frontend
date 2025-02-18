import CodeSubmissionForm from "../components/CodeSubmissionForm";

const CodeReview = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">AI Code Review</h1>
      <CodeSubmissionForm />
    </div>
  );
};

export default CodeReview;
