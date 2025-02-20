import CodeSubmissionForm from "../components/CodeSubmissionForm";

const CodeReview = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-6 md:px-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          AI Code Review
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Submit your code below and receive valuable feedback from our AI.
        </p>
        <CodeSubmissionForm />
      </div>
    </div>
  );
};

export default CodeReview;
