const ConfirmationDialog = ({ message, yes, no }) => {
  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-[4px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-400 p-6 w-80 text-center">
        <div className="mb-4">
          <span className="text-yellow-500 text-4xl">❓</span>
        </div>
        <p className="text-lg mb-6 font-medium">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={yes}
            className="bg-green-800 text-white px-5 py-2 rounded hover:bg-green-600 transition cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={no}
            className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
