import { useState } from "react";

const AlgoPicker = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

    const algorithms = [
        "Random Forest",
        "Linear Regression",
        "Decision Tree",
    ];

    return (
        <div className="flex flex-row min-h-screen p-8 gap-8">
            <div className="flex flex-col w-1/2 justify-center items-center">
                <div className="w-96">
                    <select
                        value={selectedAlgorithm}
                        onChange={(e) => setSelectedAlgorithm(e.target.value)}
                        className="w-full p-4 mb-30 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500"
                    >
                        <option value="">Choose an algorithm...</option>
                        {algorithms.map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedAlgorithm}
                        className={`block w-full py-7 rounded-lg transition-colors text-center font-semibold ${
                            selectedAlgorithm
                                ? "bg-indigo-500 text-white text-2xl hover:bg-indigo-600 cursor-pointer"
                                : "bg-gray-300 text-gray-500 text-2xl cursor-not-allowed"
                        }`}
                    >
                        PROCEED
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-1/2 justify-center items-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 w-200 h-100 flex flex-col items-center justify-center text-center bg-white">
                    <p className="text-gray-600 text-lg font-semibold mb-2">Uploaded File</p>
                    <p className="text-gray-400 text-sm">No file uploaded yet</p>
                </div>
            </div>
        </div>
    );
}

export default AlgoPicker;