const ConfirmationDialog = ({ message, yes, no }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-400 p-6 w-80 text-center">
        <div className="mb-4">
          <span className="text-yellow-500 text-4xl">❓</span>
        </div>
        <p className="text-lg mb-6 font-medium">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={yes}
            className="bg-brand-700 hover:bg-brand-800 text-white px-5 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={no}
            className="bg-stone-100 text-stone-700 hover:bg-stone-200 px-5 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
