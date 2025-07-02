const StatusDialog = ({ success, message, error, onClose }) => {
    return (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-[4px] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-400 p-6 w-80 text-center">
                <div className="mb-4">
                    {success ? (
                        <span className="text-green-600 text-4xl">✔️</span>
                    ) : (
                        <span className="text-red-600 text-4xl">❌</span>
                    )}
                </div>
                <p className="text-lg mb-4">{message}</p>
                {error && <p className="text-lg mb-4">Error : {error}</p>}


                <button
                    onClick={onClose}
                    className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default StatusDialog;
